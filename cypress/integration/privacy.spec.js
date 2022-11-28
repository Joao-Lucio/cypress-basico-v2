Cypress._.times(5,function(){
    it('testa a pagina da politica de privacidade de forma independente',function(){
        cy.visit('./src/privacy.html')
    
        cy.contains('Talking About Testing') // passo um texto
                .should('be.visible') // verifico se ele esta visivel na pagina
    })
})