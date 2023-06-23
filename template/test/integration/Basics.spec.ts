import { prepareAndVisit } from '../utils/utils';

describe('Initial rendering of application', () => {
    beforeEach(() => {
        prepareAndVisit();
    });

    it('should show table', () => {
        cy.get('.module-content').should('be.visible');
        cy.get('.panel-body').should('be.visible');
    });
});
