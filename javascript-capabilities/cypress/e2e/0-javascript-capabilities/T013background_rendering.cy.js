import { downloadCanvasAreaTo, generateSolidBackgroundImageTo } from './utils'

describe('background', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/projects/asteroids.html');
      cy.reload(true);
    })
  
    it('issue13 test', () => {
        const expectedImage = 'cypress/images/expected.png';
        const width = 640;
        const height = 100;

        generateSolidBackgroundImageTo(expectedImage, width, height, "#02248c").then(() => {
            downloadCanvasAreaTo('cypress/images/canvasArea.png', 0, 0, width, height).then((filenameActual) => {
                const filenames = {
                    actual: filenameActual,
                    expected: expectedImage
                }
                cy.task('compare', { filenames: filenames, options: { threshold: 0.01 }}).then($test => {
                    console.log($test); // Example: Object { match: false, reason: "pixel-diff", diffCount: 55612, diffPercentage: 88.9792 }
                    if ($test.match != true) {
                        expect($test.diffPercentage).to.be.lessThan(2);
                    } else {
                        expect(true).to.be.eq(true); // Full match!
                    }
                })
            })
    
        })
    })
})

