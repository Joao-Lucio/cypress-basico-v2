// Caso o arquivo fique muito extenso, pode ser criado outro arquivo, mas não esquecer de da o import desse 
// arquivo no index.js

// ================ Comandos customizados =======================================
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){ // Nome da função e o que ela irá fazer
    cy.get('#firstName').type('Joao') // Pego o campo (#firstName) e escrevo Joao
    cy.get('#lastName').type('Almeida') // Pego o campo (#lastName) e escrevo Almeida
    cy.get('#email').type('joao.silva@pigz.com') // Pego o campo (#email) e escrevo joao.silva@pigz,com.br
    cy.get('#open-text-area').type('Teste') // Pego o campo (#open-text-area) e escrevo Teste
    //cy.get('button[type="submit"]').click() // Pego um buttom do type submit e realizo a ação de click
    cy.contains('button','Enviar').click() // Digo qual selector CSS eu quero pegar, o segundo paramentro é o texto desse selector
})