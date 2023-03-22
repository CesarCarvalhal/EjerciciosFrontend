const { compare } = require('odiff-bin')

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // https://glebbahmutov.com/blog/canvas-testing/
      on('task', {
        async compare({ filenames, options }) {
          console.log(
            'comparing expected image %s to the actual image %s',
            filenames.expected,
            filenames.actual,
          )
          if (options) {
            console.log('odiff options %o', options)
          }
          const started = +new Date()
    
          const result = await compare(filenames.expected, filenames.actual, 'diff.png', options)
          const finished = +new Date()
          const elapsed = finished - started
          console.log('odiff took %dms', elapsed)
    
          console.log(result)
          return result
        },
      })
    },
  },
};
