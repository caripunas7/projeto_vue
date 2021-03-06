const app = Vue.createApp({
    data(){
        return{
            bloco:{
                inicio:true,
                idade:false,
                cambio:false,
                diaSemana:false,
                desconto:false,
              

            },
            mensagem: {
                idade : "Cálculo da idade a partir do ano de nascimento inserido pelo usuário",
                cambio: "Cálculo do valor em reais a partir de um valor em dólar e cotação inserida pelo usuário",
                diaSemana : "Exibir o dia da semana a partir de uma data inserida pelo usuário",
                desconto : "Calcular  o  resultado  a  partir  de  um  valor  base  e  o percentual de desconto indicados pelo usuário"
            },
            textoInicial:'Ola, Seja Bem Vinde ao Nosso Sistema',
            campoIdade:'',
            resultado:'',
            info:'',
            dolar:'',
            cotacao:'',
            data:'',
            statusTooltip: false, // verificar se o tooltip já foi ativado
            valor:'',
            porcentagem:'',
            


        }

    },
    methods:{
        verificarLink(classe){
            //console.log(classe[1])
            let itens = classe[1]//classe é um parametro que irá conter um vetor com as classes da tag na qaual a função etá sendo chamada.

           // for..in permite percorrer um objeto
            for(elementos in this.bloco){
                //console.log(elementos)
                if(itens == elementos){
                  this.bloco[elementos] = true
                  this.textoInicial = this.mensagem[elementos]
                  this.resultado = "" // resetando as informações
                  this.info = ""


                }
                else{
                    this.bloco[elementos] = false
                }

            }

        },
        calcularIdade(){
            let anoAtual = new Date().getFullYear()
           if(this.validarIdade()){

           }
            let resposta = anoAtual - this.campoIdade
            console.log(resposta)
            this.resultado = `Você possui ${resposta} anos `
        },
        validarIdade(){
            if(this.campoIdade < 1900 || this.campoIdade > 2050){
                this.info = "Você precisa informar um valor entre 1900 e 2050"
                this.resultado = ""
                return false// significa que inseriu um valor errado

            }
            else{
                this.info=""
                return true

            }

        },
        converterDolar(){
            let padrao = /^[0-9]+(\.([0-9]{2}))?$/
            if(padrao.test(this.dolar) && padrao.test(this.cotacao)){
                let resposta = this.dolar * this.cotacao
                this.resultado = `U$${this.dolar} convertido para Real é R$${resposta}`
                this.info=""
            }
            else{
                this.info = "Informe apenas números inteiros ou separados por ponto com 2 casas decimais"
                this.resultado =""

            }
        },
        verificarDiaSemana(){
            let dias = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"]
            let diaSemana = new Date(this.data).getDay()//getday retorna o dia da semana sendo 0 para segunda e 6 para domingo.
            if(this.data != ""){
                this.resultado = `Essa data é ${dias[diaSemana]}`
                this.info=""
            }
            else{
                this.info="Informe uma data válida"
                this.resultado=""
            }
            
           
        },
        ativarTooltip(){
          if(!this.statusTooltip){
            const diaSemana = document.querySelector('#diaSemana')
            const tooltip = new bootstrap.Tooltip(diaSemana)
            this.statusTooltip = true 
          }
            
        },
        calcularDesconto(){
            let padrao = /^[0-9]+(\.([0-9]{2}))?$/
            if(padrao.test(this.valor) && padrao.test(this.porcentagem)){
                let resul = this.valor * (this.porcentagem/100)
                this.resultado = ` O valor de desconto é igual a R$${resul} `
                this.info=""
            }
            else{
                this.info = "Informe apenas números inteiros ou separados por ponto com 2 casas decimais"
                this.resultado =""

            }
        }
        
    }


})

app.mount("#app")