// Intelligence - passar o mouse em cima do metodo e ele diz o que o metodo faz, retorna
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() { // describe - define a suíte de testes
    
    const THREE_SECONDS_IM_MS = 3000

    beforeEach(function(){
        cy.visit('./src/index.html') // visitar pagina
    })
    it('verifica o título da aplicação', function() { // it - define um caso de teste
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') // pegou o title da pagina, .should para verificar se é igual
    })

    // .only diz que quer fazer somente aquele caso de teste

    it('preencher os campos obrigatorios e envia o formulario', function(){ 

        cy.clock() // congelo o relogio do navegador

        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste' // uma variavel
        
        cy.get('#firstName').type('Joao') // Pego o campo (#firstName) e escrevo Joao
        cy.get('#lastName').type('Almeida') // Pego o campo (#lastName) e escrevo Almeida
        cy.get('#email').type('joao.silva@pigz.com.br') // Pego o campo (#email) e escrevo joao.silva@pigz.com.br
        //cy.get('#open-text-area').type('Teste') // Pego o campo (#open-text-area) e escrevo Teste
        cy.get('#open-text-area').type(longText,{delay:0}) // Pego o campo (#open-text-area), primeiro argumento é o texto a ser digitado e o segundo argumento é o objeto de option com a propriedade de delay com valor 0, rodando o teste mais rapido
        //cy.get('button[type="submit"]').click() // Pego um buttom do type submit e realizo a ação de click
        cy.contains('button', 'Enviar').click() // Digo qual selector CSS eu quero pegar, o segundo paramentro é o texto desse selector
        cy.get('.success').should('be.visible') // Pego uma classe .sucesso e verifico se ela está visivel 

        cy.tick(THREE_SECONDS_IM_MS) // avanço o tempo do relogio do navegador
        cy.get('.success').should('not.be.visible') // verifico se mensagem desapareceu
    })

    it('exibe mensagem de erro ao submeter o formulario com um email com a formatação invalida', function(){
        
        cy.clock() // paro o tempo do relogio do navegador

        cy.get('#firstName').type('Joao') // Pego o campo (#firstName) e escrevo Joao
        cy.get('#lastName').type('Almeida') // Pego o campo (#lastName) e escrevo Almeida
        cy.get('#email').type('joao.silva@pigz,com') // Pego o campo (#email) e escrevo joao.silva@pigz,com.br
        cy.get('#open-text-area').type('Teste') // Pego o campo (#open-text-area) e escrevo Teste
        //cy.get('button[type="submit"]').click() // Pego um buttom do type submit e realizo a ação de click
        cy.contains('button','Enviar').click() // Digo qual selector CSS eu quero pegar, o segundo paramentro é o texto desse selector
        cy.get('.error').should('be.visible') // Pego uma classe .error e verifico se ela está visivel

        cy.tick(THREE_SECONDS_IM_MS) // avanço o tempo
        cy.get('.error').should('not.be.visible') // verifico se mensagem sumiu
    })

    it('campo telefone continua vazio quando preenchido com valor não numerico', function(){
        cy.get('#phone') // Pegar o componente que tem o id phone
            .type('saasadasa') // digito no campo esse texto
            .should('have.value','')  // verifico se o campo está vazio
    })

    Cypress._.times(5,function(){ // Realizar o bloco de teste abaixo 5 vezes - Metodo usado para confirmar que o sistema é estavel
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        
            cy.clock() // paro o tempo do relogio do navegador
            
            cy.get('#firstName').type('Joao') // Pego o campo (#firstName) e escrevo Joao
            cy.get('#lastName').type('Almeida') // Pego o campo (#lastName) e escrevo Almeida
            cy.get('#email').type('joao.silva@pigz.com') // Pego o campo (#email) e escrevo joao.silva@pigz,com.br
            cy.get('#phone-checkbox').click() // Pego o campo (#phone-checkbox) e realizo click nele, marcando a opção
            cy.get('#open-text-area').type('Teste') // Pego o campo (#open-text-area) e escrevo Teste
            //cy.get('button[type="submit"]').click() // Pego um buttom do type submit e realizo a ação de click
            cy.contains('button','Enviar').click() // Digo qual selector CSS eu quero pegar, o segundo paramentro é o texto desse selector
            cy.get('.error').should('be.visible') // Pego uma classe .error e verifico se ela está visivel
        
            cy.tick(THREE_SECONDS_IM_MS) // avanço o tempo
            cy.get('.error').should('not.be.visible') // verifico se mensagem sumiu
        
        })
    })

    it('preenche os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName') // Pega o elemento
            .type('João') // Digita a string no elemento
            .should('have.value', 'João') // verifica se a string é igual ao elemento digitado no campo
            .clear() // Limpa campo
            .should('have.value','') // verifica se campo está limpo
        cy.get('#lastName')
            .type('Lucio')
            .should('have.value', 'Lucio')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('joao.silva@pigz.com.br')
            .should('have.value', 'joao.silva@pigz.com.br')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('95999192994')
            .should('have.value', '95999192994')
            .clear()
            .should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){

        cy.clock() // paro o tempo

        //cy.get('button[type="submit"]').click() // Pego um buttom do type submit e realizo a ação de click
        cy.contains('button','Enviar').click() // Digo qual selector CSS eu quero pegar, o segundo paramentro é o texto desse selector
        cy.get('.error').should('be.visible') // verifico se mensagem de error foi exibida
    
        cy.tick(THREE_SECONDS_IM_MS) // avanço o tempo
        cy.get('.error').should('not.be.visible') // verifico se mensagem sumiu
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){

        cy.clock() // paro o tempo
        cy.fillMandatoryFieldsAndSubmit() // chamo uma função chamada fillMandatoryFieldsAndSubmit() criada dentro do arquivo commands.js - arquivo usado para criação de blocos de codigos que podem ser reutilizadas

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IM_MS) // avanço o tempo
        cy.get('.success').should('not.be.visible') // verifico se mensagem sumiu
    })

    it('seleciona um produto (Youtube) por seu texto', function(){
 
        // === Como podemos pegar um componente selecte ===
        // cy.get('select').select('Blog') // Seleção pelo texto Blog
        //cy.get('select').select('youtube') // Seleção pelo value youtube
        //cy.get('select').select(1) // Seleção pelo índice 1
        cy.get('#product')
            .select('YouTube')// Seleção pelo texto YouTube
            .should('have.value','youtube')
    })

    it('seleciona um produto (Mentoria) por seu (value)', function(){
 
        cy.get('#product')
            .select('mentoria') // Seleção pelo value mentoria
            .should('have.value','mentoria')
    })


    it('seleciona um produto (Blog) por seu (indece)', function(){
 
        cy.get('#product')
            .select(1) // Seleção pelo índice 1
            .should('have.value','blog')
    })

    it('marcar o tipo de atendimento "Feddback"',function(){
        cy.get('input[type="radio"][value="feedback"]') // Pegando um input do type radio com o value feedback 
            .check() // Marco ele
            .should('have.value','feedback') // verifico se o objeto marcado é o objeto com o value feedback
    })

    it('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]') // Pego todos os input do type radio, ele retorna uma array com esses objetos
            .should('have.length',3) // verifico se o tamanho é 3
            .each(function($elementos){ // Iterar através de uma estrutura semelhante a matriz - no caso aqui o array pego no cy.get - dei o nome a esse array de $elementos
                cy.wrap($elementos) // empacota um item do array elementos
                    .check() // Marca esse item
                    .should('be.checked') // verifico se o item foi marcado
            })
    })

    it('marca ambos checkboxes, depois desmarca o ultimo',function(){
        cy.get('input[type="checkbox"]') // Pego os itens do objeto do type checkbox, retorna um array
            .check() // marcos todos os itens - com um check() em objeto do type checkbox, todos os elementos são marcados
            .should('be.checked') // verifico se os itens estão marcados
            .last() // pego o ultimo elemento
            .uncheck() // desmarco ele
            .should('not.be.checked') // verifico se o elemento está desmarcado
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        
        cy.clock() // paro o tempo do navegador
        
        cy.get('#firstName').type('Joao') // Pego o campo (#firstName) e escrevo Joao
        cy.get('#lastName').type('Almeida') // Pego o campo (#lastName) e escrevo Almeida
        cy.get('#email').type('joao.silva@pigz.com') // Pego o campo (#email) e escrevo joao.silva@pigz,com.br
        cy.get('#phone-checkbox').check() // Pego o campo (#phone-checkbox) e realizo check() nele, marcando a opção
        cy.get('#open-text-area').type('Teste') // Pego o campo (#open-text-area) e escrevo Teste
        //cy.get('button[type="submit"]').click() // Pego um buttom do type submit e realizo a ação de click
        cy.contains('button','Enviar').click() // Digo qual selector CSS eu quero pegar, o segundo paramentro é o texto desse selector
        cy.get('.error').should('be.visible') // Pego uma classe .error e verifico se ela está visivel
    
        cy.tick(THREE_SECONDS_IM_MS) // avanço o tempo
        cy.get('.error').should('not.be.visible') // verifico se mensagem sumiu
    })

    it('seleciona um arquivo da pasta fixtures',function(){
      cy.get('input[type="file"]#file-upload') // pegando um input do type file que tenha o id file-upload - poderia deixar sem o id, mas colocando id deixa mais espercifico qual elemento pegar 
        .should('not.have.value') // verifica que não tem nenhum valor ainda
        .selectFile('./cypress/fixtures/example.json') // fazendo upload do arquivo com o caminho ./cypress/fixtures/example.json
        .should(function($arquivo){ // passo por paremetro pra função o elemento obtido no cy.get
            //console.log($arquivo) // exibo o console.log do input para verificar o caminho para obter o nome do arquivo
            expect($arquivo[0].files[0].name).to.equal('example.json') // verificação do elemento 0, que o objeto files dele também é um array pegando o elemento 0.name desse arquivo e verico se o name é igual
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]#file-upload') // pegando um input do type file que tenha o id file-upload - poderia deixar sem o id, mas colocando id deixa mais espercifico qual elemento pegar 
        .should('not.have.value') // verifica que não tem nenhum valor ainda
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) // fazendo upload do arquivo com o caminho ./cypress/fixtures/example.json, o segundo parametro simula o usuario arrastando o arquivo para fazer o upload
        .should(function($arquivo){ // passo por paremetro pra função o elemento obtido no cy.get
            //console.log($arquivo) // exibo o console.log do input para verificar o caminho para obter o nome do arquivo
            expect($arquivo[0].files[0].name).to.equal('example.json') // verificação do elemento 0, que o objeto files dele também é um array pegando o elemento 0.name desse arquivo e verico se o name é igual
        })
    })

    it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias',function(){
        cy.fixture('example.json').as('sampleFile') // estou dando um alias ao arquivo de nome example
        cy.get('input[type="file"]') // pego o input do type file
            .selectFile('@sampleFile') // passo o alias do arquivo que eu quero que seja selecionado
            .should(function($arquivo){ // passo por paremetro pra função o elemento obtido no cy.get
                expect($arquivo[0].files[0].name).to.equal('example.json') // verificação do elemento 0, que o objeto files dele também é um array pegando o elemento 0.name desse arquivo e verico se o name é igual
            })
    })

    it('verifica se a politica de privacidade abre em outra aba sem a necessidade de um click',function(){
        cy.get('#privacy a') // pegando uma ancora que esta dentro de uma div com o id privacy
            .should('have.attr','target','_blank') // verifico se o target dele é _blank que significa que irá abrir em outra aba
    })

    it('acessa a pagina da politica de privacidade removendo o target e então',function(){
        cy.get('#privacy a')
            .invoke('removeAttr','target') // removo o target do elemento, assim ao realizar o click() a pagina ira abrir na mesma pagina em que o cypress esta
            .click()
    
        cy.contains('Talking About Testing') // passo um texto
            .should('be.visible') // verifico se ele esta visivel na pagina
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success') // pego o elemento da classe .success
          .should('not.be.visible') // verifico se não está visivel
          .invoke('show') // forço ele aparecer
          .should('be.visible') // verifico se está visivel
          .and('contain', 'Mensagem enviada com sucesso.') // e se contem a mensagem 'Mensagem enviada com sucesso.'
          .invoke('hide') // escondo o elemento
          .should('not.be.visible') // verifico se elemento sumiu
        
        cy.get('.error')// pego o elemento da classe .error
          .should('not.be.visible')// verifico se não está visivel
          .invoke('show')// forço ele aparecer
          .should('be.visible')// verifico se está visivel
          .and('contain', 'Valide os campos obrigatórios!')// e se contem a mensagem 'Valide os campos obrigatórios!'
          .invoke('hide')// escondo o elemento
          .should('not.be.visible')// verifico se elemento sumiu
      })

      it('preenche a area de texto usando o comando invoke', function(){
        const longtext = Cypress._.repeat('0123456789',20) // criar uma string com 200 caracteres, vai repedir aquela string numerica 20 vezes
        
        cy.get('#open-text-area') // Pego a area
            .invoke('val',longtext) // seta no val do open-text-area o longtext
            .should('have.value',longtext) // verifico se a variavel foi setada
    })

    it('faz uma requisição HTTP',function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html') // com o request é possivel fazer requisição a nivel de rede
            .should(function(response){ // verificação onde passa um função que recebe a reposta da requisição 'response'
                console.log(response) // log do objeto
                const { status, statusText, body } = response // desistruturando o status, statusText, body
                expect(status).to.equal(200) // verifico se o status é 200
                expect(statusText).to.equal('OK') // verifico se o statusText é OK
                expect(body).to.include('CAC TAT') // verifico se no body contem o CAC TAT
            })
    })

    it.only('encontra o gato escondido', function(){
        cy.get('#cat') // pego o objeto com o id #cat
            .invoke('show') // forço ele a aparecer
            .should('be.visible') // verifico se ele esta visivel

        cy.get('#title') // pego o title
            .invoke('text','CAT TAT') // altero o text dele

        cy.get('#subtitle') // pego o subtitle
            .invoke('text','Eu amo gatos!') // altero o texto dele
    })

  })
  