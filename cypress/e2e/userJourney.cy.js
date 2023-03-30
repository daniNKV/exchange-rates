describe('User journey', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8888/');
    })
    
    it('User can select a currency and a date and see the rates', () => {
        const selector = cy.get('#rate-selector');
        const currencySelector = cy.getByData('currency');
        const dateSelector = cy.getByData('date');

        
        currencySelector.get('select').select('USD');
        dateSelector.get('#date-input').type('2020-01-01')
        selector.get('button').click();
        
        cy.get('#table-date').should('contain', '2020-01-01');

        const table = cy.getByData('rates-table');
        const body = table.children().get('tbody');

        body.getByData('values').eq(2).should('have.class', 'bg-zinc-200');

    })

    it('User can convert an amount', () => {
        const selector = cy.get('#convertion-amount');
        const table = cy.getByData('rates-table');
        const body = table.children().get('tbody');

        selector.type('100');
        body.getByData('values').eq(0).should('have.class', 'bg-zinc-200');
        body.getByData('values').eq(0).children().get('.value').should('contain', '100.0000')

    })
})