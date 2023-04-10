describe('User journey', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8888/');
    });

    it('User can select a currency and a date and see the rates', () => {
        cy.get('#rate-selector').as('container');
        cy.getByData('currency').get('select').as('currency');
        cy.getByData('date').as('date');

        cy.get('@currency').select('USD');
        cy.get('@date').get('#date-input').type('2020-01-01');
        cy.get('@container').get('button').click();

        cy.get('#table-date').should('contain', '2020-01-01');

        cy.getByData('rates-table').as('table');
        cy.get('@table').children().get('tbody').as('body');

        cy.get('@body').getByData('values').eq(2).should('have.class', 'bg-zinc-200');
    });

    it('User can convert an amount', () => {
        cy.get('#convertion-amount').as('selector');
        cy.getByData('rates-table').as('table');
        cy.get('@table').children().get('tbody').as('body');

        cy.get('@selector').type('100');
        cy.get('@body')
            .getByData('values')
            .eq(0)
            .should('have.class', 'bg-zinc-200');
        cy.get('@body')
            .getByData('values')
            .eq(0)
            .children()
            .get('.value')
            .should('contain', '100.0000');
    });
});
