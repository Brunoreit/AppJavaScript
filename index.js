const { select, input, checkbox } = require('@inquirer/prompts')

let meta = { // "estrutura" da meta no meu programa
    value: 'meta exemplo',
    checked: false,
}


let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta: "})

    if(meta.length == 0){
        console.log("A meta não pode ser vazia.")
        return
    }    

    metas.push({value: meta, checked: false})
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "use as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false, //tira as instruções em inglês no terminal
    })

    // sistema para ler cada meta e ver se o que o usuário digitou
    // condiz com o que ele está lendo e poder "marcar" (transformar true).
    // caso contrario deixará falso mesmo
    metas.forEach((m) => {
        m.checked = false //deixa todas as metas "falsas" para corrigir o problema
                          //de marcar e depois desmarcar, mas ele não "atualizar" de marcado para desmarcado.
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada. ")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

    console.log('Meta(s) marcadas como concluída(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => { //"filter filtra para colocar em "realizadas"
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log('Não existem metas realizadas!')
        return
    }

    await select({
        message:"Metas realizadas",
        choices: [...realizadas]

    })
}

const start = async () => {
    
    while(true){

        const opcao = await select({
            message: "Menu >",
            choices: [

                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"

                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"

                },
                {
                    name: "Sair",
                    value: "sair"

                }
            ]
        })


        switch(opcao) {

            case "cadastrar":
                await cadastrarMeta()
                break

            case "listar":
                await listarMetas()
                break
            
            case "realizadas":
                await metasRealizadas()
                break

            case "sair":
                console.log("Encerrando programa...")
                return


        }
    }
}

start()