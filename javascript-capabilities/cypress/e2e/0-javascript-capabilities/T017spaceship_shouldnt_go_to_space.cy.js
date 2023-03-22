import { downloadCanvasAreaTo, generateSolidBackgroundImageTo } from './utils'

describe('please dont go dear space person', () => {
    const spaceshipSize = 51;

    beforeEach(() => {
        const fakeBackground = 'fakeAsteroidBackground.png'
        generateSolidBackgroundImageTo('cypress/fixtures/' + fakeBackground, 85, 85, '#02248c').then(() => {
            // The asteroid.png has been intercepted and replaced by a background-color square ON PURPOSE
            // so that it does not interfere with comparisons
            cy.intercept('GET', 'http://localhost:8000/projects/images/asteroid.png', { fixture: fakeBackground })

            // The spaceship.png has been intercepted and replaced by a white square ON PURPOSE
            // because that makes it easier to verify its position
            cy.intercept('GET', 'http://localhost:8000/projects/images/spaceship.png', { fixture: 'spaceshipWhite.png' })

            cy.visit('http://localhost:8000/projects/asteroids.html?inmortal=true');
            cy.reload(true);
        });
    })
  
    it('issue17 spaceship correctly moves right and doesnt exit canvas', () => {

        // PHASE 1: Check that spaceship (white) is initially in its place
        checkThatLocationHasColor(332, 191, '#ffffff');

        // PHASE 2: Check that target location (after pressing right for 1 sec) is initially background-colored
        checkThatLocationHasColor(640-spaceshipSize, 191, '#02248c');

        // PHASE 3: Move
        cy.window().trigger('keydown', { keyCode: 68});
        cy.wait(6000);
        cy.window().trigger('keyup', { keyCode: 68});

        // PHASE 4: Check that initial location for spaceship is now background-colored
        checkThatLocationHasColor(332, 191, '#02248c');

        // PHASE 5: Check that target location has the spaceship (white)
        checkThatLocationHasColor(640-spaceshipSize, 191, '#ffffff');
    })

    it('issue17 spaceship correctly moves left and doesnt exit canvas', () => {

        // PHASE 1: Check that spaceship (white) is initially in its place
        checkThatLocationHasColor(332, 191, '#ffffff');

        // PHASE 2: Check that target location (after pressing right for 1 sec) is initially background-colored
        checkThatLocationHasColor(0, 191, '#02248c');

        // PHASE 3: Move
        cy.window().trigger('keydown', { keyCode: 65});
        cy.wait(6000);
        cy.window().trigger('keyup', { keyCode: 65});

        // PHASE 4: Check that initial location for spaceship is now background-colored
        checkThatLocationHasColor(332, 191, '#02248c');

        // PHASE 5: Check that target location has the spaceship (white)
        checkThatLocationHasColor(0, 191, '#ffffff');
    })

    it('issue17 spaceship correctly moves up and doesnt exit canvas', () => {

        // PHASE 1: Check that spaceship (white) is initially in its place
        checkThatLocationHasColor(332, 191, '#ffffff');

        // PHASE 2: Check that target location (after pressing right for 1 sec) is initially background-colored
        checkThatLocationHasColor(332, 0, '#02248c');

        // PHASE 3: Move
        cy.window().trigger('keydown', { keyCode: 87});
        cy.wait(6000);
        cy.window().trigger('keyup', { keyCode: 87});

        // PHASE 4: Check that initial location for spaceship is now background-colored
        checkThatLocationHasColor(332, 191, '#02248c');

        // PHASE 5: Check that target location has the spaceship (white)
        checkThatLocationHasColor(332, 0, '#ffffff');
    })

    it('issue17 spaceship correctly moves down and doesnt exit canvas', () => {

        // PHASE 1: Check that spaceship (white) is initially in its place
        checkThatLocationHasColor(332, 191, '#ffffff');

        // PHASE 2: Check that target location (after pressing right for 1 sec) is initially background-colored
        checkThatLocationHasColor(332, 480-spaceshipSize, '#02248c');

        // PHASE 3: Move
        cy.window().trigger('keydown', { keyCode: 83});
        cy.wait(6000);
        cy.window().trigger('keyup', { keyCode: 83});

        // PHASE 4: Check that initial location for spaceship is now background-colored
        checkThatLocationHasColor(332, 191, '#02248c');

        // PHASE 5: Check that target location has the spaceship (white)
        checkThatLocationHasColor(332, 480-spaceshipSize, '#ffffff');
    })

    function checkThatLocationHasColor(x, y, color, accuracy = 5) {
        const expectedImage = 'cypress/images/expected.png';
        generateSolidBackgroundImageTo(expectedImage, spaceshipSize, spaceshipSize, color).then(() => {
            downloadCanvasAreaTo('cypress/images/canvasArea.png', x, y, spaceshipSize, spaceshipSize).then((filenameActual) => {
                const filenames = {
                    actual: filenameActual,
                    expected: expectedImage
                }
                cy.task('compare', { filenames }).then($test => {
                    console.log($test); // Example: Object { match: false, reason: "pixel-diff", diffCount: 55612, diffPercentage: 88.9792 }
                    if ($test.match != true) {
                        expect($test.diffPercentage).to.be.lessThan(accuracy);
                    } else {
                        expect(true).to.be.eq(true); // Full match!
                    }
                })
            })
        })
    }
})



