// Inspiration and tools from: https://glebbahmutov.com/blog/canvas-testing/

export const downloadCanvasAreaTo = (filename, x, y, width, height) => {
    expect(filename).to.be.a('string')
    expect(x).to.be.a('number')
    expect(y).to.be.a('number')
    expect(width).to.be.a('number')
    expect(height).to.be.a('number')
  
    // the simplest way is to grab the data url and use
    // https://on.cypress.io/writefile to save PNG file
    return cy.get('canvas').then(($sourceCanvas) => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage($sourceCanvas[0], x, y, width, height, 0, 0, width, height);
        const url = tempCanvas.toDataURL()
        const data = url.replace(/^data:image\/png;base64,/, '')
        cy.writeFile(filename, data, 'base64')
        cy.wrap(filename)
    })
}

export const transformTemplateImageTo = (filename, width, height, backgroundColor, sourceUrl) => {
    expect(filename).to.be.a('string')
    expect(width).to.be.a('number')
    expect(height).to.be.a('number')

    const image = new Image();
    image.onerror = () => {
        // Error loading template image
        expect(false).to.be.eq(true);
    }
    image.src = sourceUrl;
    return cy.wait(250).then(() => {  // FIX-ME: Better way of doing this
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext("2d");
                
        tempCtx.fillStyle = backgroundColor;
        tempCtx.fillRect(0, 0, width, height);
        tempCtx.drawImage(image, 0, 0, width, height);
        const url = tempCanvas.toDataURL()
        const data = url.replace(/^data:image\/png;base64,/, '')
        cy.writeFile(filename, data, 'base64')
        cy.wrap(filename)
    });
}

export const generateSolidBackgroundImageTo = (filename, width, height, backgroundColor) => {
    expect(filename).to.be.a('string')
    expect(width).to.be.a('number')
    expect(height).to.be.a('number')

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");
                
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, width, height);
    const url = tempCanvas.toDataURL()
    const data = url.replace(/^data:image\/png;base64,/, '')
    cy.writeFile(filename, data, 'base64')
    return cy.wrap(filename)
}