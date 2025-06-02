import { mockState } from '../support/utils/helpers';

describe('Tech Quiz Cycle', () => {
    context('Quiz Setup',() => {
        beforeEach(() => {
            cy.intercept("GET", '/api/questions/random', {
                statusCode: 200,
                body: mockState,
            }).as('getRandomQuestion');
            cy.visit('/');
            cy.contains('button', 'Start Quiz').click();
        });

        it('should GET a random question and render that question to the page when Start Quiz button is pressed', () => {
            cy.wait('@getRandomQuestion').its('response.statusCode').should('eq', 200);
            cy.get('h2').should('contain', mockState[0].question);
            cy.get('.alert').first().should('contain', mockState[0].answers[0].text)
            cy.get('.alert').eq(1).should('contain', mockState[0].answers[1].text)
            cy.get('.alert').eq(2).should('contain', mockState[0].answers[2].text)
            cy.get('.alert').eq(3).should('contain', mockState[0].answers[3].text)
        })

        it('should GET a random question and render that question to the page when Take New Quiz button is pressed', () => {
            for (let i = 0; i < 10; i++){
                cy.get('button').contains('1').click();
              }
            cy.get('button').contains('Take New Quiz').click();
            
            cy.wait('@getRandomQuestion').its('response.statusCode').should('eq', 200);
            cy.get('h2').should('contain', mockState[0].question);
            cy.get('.alert').first().should('contain', mockState[0].answers[0].text)
            cy.get('.alert').eq(1).should('contain', mockState[0].answers[1].text)
            cy.get('.alert').eq(2).should('contain', mockState[0].answers[2].text)
            cy.get('.alert').eq(3).should('contain', mockState[0].answers[3].text)
        })       
    });
});