describe('Quiz Component Functionality', () => {
    beforeEach(() => {
        cy.visit('/'); 
    });

    it('renders the Quiz component and displays the start button', () => {
        cy.get('button').contains('Start Quiz').should('be.visible');
        cy.get('[data-cy="quiz-start"]').should('exist');
    });


    it('starts the quiz and runs the question set', () => {
        cy.get('button').contains('Start Quiz').click();
        for(let i = 0; i < 10; i++) {
            cy.wait(2000); 
            cy.get('button').contains('1').click();
        }
        cy.get('h2').contains('Quiz Completed').should('be.visible');
        cy.get('button').contains('Take New Quiz').should('be.visible');
    });
    
    it('it restarts the quiz when the Take New Quiz button is pressed', () => {
        cy.get('button').contains('Start Quiz').click();
        for(let i = 0; i < 10; i++) {
            cy.wait(2000); 
            cy.get('button').contains('1').click();
        }
        cy.get('h2').contains('Quiz Completed').should('be.visible');
        cy.get('button').contains('Take New Quiz').should('be.visible');
        cy.get('button').contains('Take New Quiz').click();
        cy.get('.card').should('exist');
    });
})