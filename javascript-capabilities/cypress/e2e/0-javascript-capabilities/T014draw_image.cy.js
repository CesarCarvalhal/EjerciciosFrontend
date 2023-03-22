import { downloadCanvasAreaTo, transformTemplateImageTo, generateSolidBackgroundImageTo } from './utils'

describe('draw_image', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/projects/asteroids.html');
      cy.reload(true);
    })
  
    it('issue14 spaceship is initially drawn', () => {
        const sourceImageUrl = '/projects/images/spaceship.png';
        const expectedImage = 'cypress/images/expected.png';

        /**
         * 1. Download 'template' image (e.g.: spaceship or asteroid) from localhost:8000/projects/images/X
         * 2. Stretch that image to expected width and height, apply desired background color and save it
         * 3. After visiting test url, download the canvas area cropped
         * 4. Compare both images with odiff. Is the differece < 2%? Pass!
         */
        transformTemplateImageTo(expectedImage, 51, 51, '#02248c', sourceImageUrl).then(() => {
            downloadCanvasAreaTo('cypress/images/canvasArea.png', 332, 191, 51, 51).then((filenameActual) => {
                const filenames = {
                    actual: filenameActual,
                    expected: expectedImage
                }
                cy.task('compare', { filenames }).then($test => {
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

    it('issue14 right space to the spaceship is empty', () => {
        const expectedImage = 'cypress/images/expected.png';

        generateSolidBackgroundImageTo(expectedImage, 51, 51, '#02248c').then(() => {
            downloadCanvasAreaTo('cypress/images/canvasArea.png', 332+51, 191, 51, 51).then((filenameActual) => {
                const filenames = {
                    actual: filenameActual,
                    expected: expectedImage
                }
                cy.task('compare', { filenames }).then($test => {
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

