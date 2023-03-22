import { downloadCanvasAreaTo, generateSolidBackgroundImageTo } from './utils'

describe('generating_asteroids_ii', () => {
    const afterMovementAccuracy = 50;
    const asteroidSize = 85;
    const shipSize = 51;
    let parameter1;
    let parameter2;

    beforeEach(() => {
        const fakeBackground = 'fakeShipBackground.png'
        generateSolidBackgroundImageTo('cypress/fixtures/' + fakeBackground, shipSize, shipSize, '#02248c').then(() => {
            // The spaceship.png has been intercepted and replaced by a background-color square ON PURPOSE
            // so that it does not interfere with PHASE 1 in tests
            cy.intercept('GET', 'http://localhost:8000/projects/images/spaceship.png', { fixture: fakeBackground })

            // The asteroid.png has been intercepted and replaced by a white square ON PURPOSE
            // because that makes it easier to verify its position
            cy.intercept('GET', 'http://localhost:8000/projects/images/asteroid.png', { fixture: 'asteroidWhite.png' })

            cy.visit('http://localhost:8000/projects/asteroids.html?inmortal=true');
            cy.reload(true);
        });
    })
  
    it('issue19 asteroid in 2.6 seconds is correct', () => {
        testRandomAsteroidIsThereAfter(2.6);
    })  

    it('issue19 asteroid in 2.8 seconds is correct', () => {
        testRandomAsteroidIsThereAfter(2.8);
    })

    it('issue19 asteroid in 3 seconds is correct', () => {
        testRandomAsteroidIsThereAfter(3);
    })

    function testRandomAsteroidIsThereAfter(time) {
        const MAX_RETRIES = 200;
        let retriesCount = 0;
        const preExecution = () => {
            retriesCount++;
            const spaceship = {x: 332, y: 191, size: shipSize};
            const targetLocation = calculateTargetLocationFromLogs(time);
            // A valid asteroid is:
            // * Totally within visible canvas (after N seconds)
            // * Not around original ship location (won't screw image comparison and won't finish game early)
            const isXInCanvas = (targetLocation.x > 0) && (targetLocation.x < 640 - asteroidSize);
            const isYInCanvas = (targetLocation.y > 0) && (targetLocation.y < 480 - asteroidSize);
            const isColliding = calculateRectCollision({x: spaceship.x, y: spaceship.y},
                                                       {x: spaceship.x + spaceship.size, y: spaceship.y + spaceship.size},
                                                       {x: targetLocation.x, y: targetLocation.y},
                                                       {x: targetLocation.x + asteroidSize, y: targetLocation.y + asteroidSize});
            return {x: targetLocation.x, y: targetLocation.y, valid: isXInCanvas && isYInCanvas && !isColliding} 
        }
        const doTest = () => {
            visitPageWithConsoleStub().then(() => {
                const preResult = preExecution();
                if (preResult.valid === true) {
                    cy.log('A valid asteroid has been generated with target position (' + preResult.x + ', ' + preResult.y + ') after ' + time + ' seconds of travel after ' + retriesCount + ' retries');
                    const targetX = preResult.x;
                    const targetY = preResult.y;

                    // PHASE 1: Check that asteroid destination in N seconds is initially background-colored 
                    checkThatLocationHasColor(targetX, targetY, '#02248c');

                    cy.wait(time * 1000);

                    // PHASE 2: Check that target location shows now white, which, should be the asteroid
                    checkThatLocationHasColor(targetX, targetY, '#ffffff', afterMovementAccuracy);

                } else {
                    expect(retriesCount).to.be.lt(MAX_RETRIES);
                    // Repeat test
                    // Hope for random numbers to generate a valid first asteroid
                    doTest();
                }
            })
        }

        doTest();
    }

    function visitPageWithConsoleStub() {
        return cy.visit('http://localhost:8000/projects/asteroids.html?inmortal=true', {
            onBeforeLoad (win) {
                cy.stub(win.console, 'log', (x) => {
                    if(x.includes('velX')) {
                        parameter1 = x
                    }
                    if(x.includes('velY')) {
                        parameter2 = x
                    }
                }).as("consoleLog").log(false);
            },
        })
    }

    function calculateTargetLocationFromLogs(time) {
        const velX = parseInt(parameter1.substring(5));
        const velY = parseInt(parameter2.substring(5));
        expect(velX).to.be.a('number');
        expect(velY).to.be.a('number');
        const startingX = 640;
        const startingY = 480;
        let targetX = startingX + velX * time
        let targetY = startingY + velY * time
        if (targetX > 640) {
            targetX -= (640 + asteroidSize)
        } else if (targetX < -asteroidSize) {
            targetX += 640 + asteroidSize
        } else if (targetY > 480) {
            targetY -= (480 + asteroidSize)
        } else if (targetY < -asteroidSize) {
            targetY += 480 + asteroidSize
        }
        return {
            x: targetX,
            y: targetY
        }
    }

    function calculateRectCollision(l1, r1, l2, r2) {
        // https://www.geeksforgeeks.org/find-two-rectangles-overlap/
        if (l1.x > r2.x || l2.x > r1.x) {
            return false;
        }
        if (r1.y > l2.y || r2.y > l1.y) {
            return false;
        }
        return true;
    }

    function checkThatLocationHasColor(x, y, color, accuracy = 2) {
        const expectedImage = 'cypress/images/expected.png';
        generateSolidBackgroundImageTo(expectedImage, asteroidSize, asteroidSize, color).then(() => {
            downloadCanvasAreaTo('cypress/images/canvasArea.png', x, y, asteroidSize, asteroidSize).then((filenameActual) => {
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
