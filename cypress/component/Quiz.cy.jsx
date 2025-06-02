import Quiz from '../../client/src/components/Quiz'

describe('<Quiz />', () => {
    it('should render a start button on open', () => {
        cy.mount(<Quiz />);
        cy.contains('button', 'Start Quiz').should('be.visible');
      });

    it('should display a question and four choices when start button clicked.', () => {
      cy.mount(<Quiz />);
      cy.contains('button', 'Start Quiz').click();
      cy.get('h2').should('be.visible');
      cy.get('.mt-3').find('button').should('have.length', 4);
    })

    it('should allow you to complete the quiz', () => {
      cy.mount(<Quiz />);
      cy.contains('button', 'Start Quiz').click();

      for (let i = 0; i < 10; i++){
        cy.get('button').contains('1').click();
      }

      cy.get('h2').contains('Quiz Completed').should('be.visible');
      cy.get('.alert').contains('Your score:').should('be.visible');
      cy.get('button').contains('Take New Quiz').should('be.visible');          
    });

    it('should restart the quiz when you click Take New Quiz', () => {
      cy.mount(<Quiz />);
      cy.contains('button', 'Start Quiz').click();

      for (let i = 0; i < 10; i++){
        cy.get('button').contains('1').click();
      }
      
      cy.get('button').contains('Take New Quiz').click();

      cy.get('h2').should('be.visible');
      cy.get('.mt-3').find('button').should('have.length', 4);
    });

    it('should show your score when you complete the quiz', () => {
      cy.mount(<Quiz />);
      cy.contains('button', 'Start Quiz').click();

      for (let i = 0; i < 10; i++){
        cy.get('button').contains('1').click();
      }

      cy.get('.alert')
        .invoke('text')
        .then((text) => {
          const match = text.match(/Your score:\s*(\d+)\/10/);
          expect(match).to.not.be.null;
          const score = match ? parseInt(match[1], 10) : 0;
          expect(score).to.be.within(0, 10);
        });
      });
});