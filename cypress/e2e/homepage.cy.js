describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8888/');
  })

  it('Logo', () => {
    cy.getByData('logo').should('be.visible');
  })

  it('Currency options', () => {
    const selector = cy.get('#rate-selector');
    selector.should('be.visible');

    const currencySelector = cy.getByData('currency');
    currencySelector.children().get('p').should('contain', 'Select currency:');
    currencySelector.get('select').should('be.visible');
    currencySelector.get('select').children().get('option');
    
    const dateSelector = cy.getByData('date');
    dateSelector.children().get('p').should('contain', 'Enter the date:');
    dateSelector.get('input').should('be.visible');
    dateSelector.get('input').should('have.attr', 'type', 'date');

    selector.get('button');
  })

  it('Rates table', () => {
    const table = cy.getByData('rates-table');
    table.should('be.visible');
    const head = table.children().get('thead');
    const body = table.children().get('tbody');

    head.children().get('tr').children().get('th').should('have.length', 2);
    head.get('#table-date');
    head.get('#convertion-amount').should('have.attr', 'type', 'number');
    head.get('#convertion-amount').should('have.attr', 'placeholder', 'Amount to convert');  
    
    body.getByData('values');
    const value = body.getByData('values').first().children();
    value.should('have.length', 4);
    value.get('.code').should('contain', 'ARS');
    value.get('.flag').should('be.visible');
    value.get('.flag').children().get('img');
    value.get('.rate')
    value.get('.value')

  })
})