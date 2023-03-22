import { generateSolidBackgroundImageTo } from './utils'

describe('endgame_image', () => {
  
    it('issue20 image', () => {
        const endgameComparisonImage = 'cypress/images/emptyBackgroundEndgame.png'
        generateSolidBackgroundImageTo(endgameComparisonImage, 640, 480, '#007667').then(() => {
            const filenames = {
                actual: 'www/projects/images/game_end.png',
                expected: endgameComparisonImage
            }
            cy.task('compare', { filenames }).then($test => {
                console.log($test); // Example: Object { match: false, reason: "pixel-diff", diffCount: 55612, diffPercentage: 88.9792 }
                expect($test.diffPercentage).to.be.lessThan(80);
            })
        });
    })

})
