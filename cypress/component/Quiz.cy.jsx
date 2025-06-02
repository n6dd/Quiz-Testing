import Quiz from '../../client/src/components/Quiz';

describe('Testing Quiz Component', () => {

  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: '/api/questions/random', 
    }, {
      fixture: 'questions.json',
      statusCode: 200
    }).as('getQuestions');  
  });
  
  
  it('renders the Quiz component to the Browser and we see a button', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
    cy.get('[data-cy="quiz-start"]').should('exist');
    
  });

  it('starts the Quiz', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('h2').contains('What is the capital of France?').should('be.visible');
    
  });

  it('shows our completion component', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('h2').contains('What is the capital of France?').should('be.visible');
    cy.get('button').contains('1').click();
    cy.get('h2').contains('Quiz Completed').should('be.visible');
  });


})