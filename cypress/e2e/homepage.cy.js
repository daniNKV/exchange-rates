// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('Homepage', () => {
    it('Logo', () => {
        cy.getByData('logo').should('be.visible');
    });

    it('Currency options', () => {
        cy.get('#rate-selector').should('be.visible').as('container');

        cy.getByData('currency').as('currencySelector');
        cy.get('@currencySelector').children().get('p').should('contain', 'Select currency:');
        cy.get('@currencySelector').get('select').should('be.visible');
        cy.get('@currencySelector').get('select').children().get('option');

        cy.getByData('date').as('dateSelector');
        cy.get('@dateselector').children().get('p').should('contain', 'Enter the date:');
        cy.get('@dateselector').get('input').should('be.visible');
        cy.get('@dateselector').get('input').should('have.attr', 'type', 'date');

        cy.get('@container').get('button');
    });

    it('Rates table', () => {
        cy.getByData('rates-table').should('be.visible').children()
            .as('table');
        cy.get('@table').get('thead')
            .as('head');
        cy.get('@table').get('tbody')
            .as('body');

        cy.get('@table')
            .get('tr').children()
            .get('th')
            .should('have.length', 2);
        cy.get('@table').get('#table-date');
        cy.get('@table').get('#convertion-amount').should('have.attr', 'type', 'number');
        cy.get('@table').get('#convertion-amount').should('have.attr', 'placeholder', 'Amount to convert');

        cy.get('@body').getByData('values');
        cy.get('@body').getByData('values').first().children()
            .as('value');
        cy.get('@value').should('have.length', 4);
        cy.get('@value').get('.code').should('contain', 'ARS');
        cy.get('@value').get('.flag').should('be.visible');
        cy.get('@value').get('.flag').children().get('img');
        cy.get('@value').get('.rate');
        cy.get('@value').get('.value');
    });
});
