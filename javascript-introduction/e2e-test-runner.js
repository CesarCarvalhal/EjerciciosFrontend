const cypress = require('cypress')
// https://nodejs.dev/learn/writing-files-with-nodejs
const fs = require('fs')

cypress.run({
    spec: './cypress/e2e/0-javascript-introduction/*.js',
    browser: 'firefox',
})
.then((results) => {
    console.log(results);
    require('child_process').exec('git rev-parse HEAD', (err, stdout) => {
        // https://stackoverflow.com/questions/25582820/remove-new-line-in-javascript-code-in-string
        const commitSha = stdout.replace(/[\n\r]/g, '');
        const totalTests = results.totalTests;
        const totalPassed = results.totalPassed;
        const fraction =  totalPassed / totalTests;
        const mark = fraction * 10;
        const jsonResult = '{' +
        '\n"terminacion_ejecucion": "' + formattedDate() + '",' +
        '\n"commit_info": "' + commitSha + '",' +
        '\n"tests_ejecutados": "' + totalTests + '",' +
        '\n"tests_exitosos": "' + totalPassed + '",' +
        '\n"fraccion": "' + fraction + '",' +
        '\n"nota": "' + mark + '",' +
        '\n"comentario": "' + scoreRanking(mark) + '"\n}';

        
      fs.writeFile('cypress/results/results.json', jsonResult, err => {
          if (err) {
             console.error(err)
         }
      })
    });
})
.catch((err) => {
    console.error(err)
    fs.writeFile('cypress/results/error.json', err, err => {
        if (err) {
            console.error(err)
        }
    })
})

function formattedDate() {
    const currentDate = new Date();
    const cDay = currentDate.getDate();
    const cMonth = currentDate.getMonth() + 1;
    const cYear = currentDate.getFullYear();
    const time = currentDate.getHours() + " (h), " + 
    currentDate.getMinutes() + " (m), " + 
    currentDate.getSeconds() + " (s)";
    return time + ' - ' + cDay + '/' + cMonth + '/' + cYear;
}

function scoreRanking(score) {
    if (score === 10) {
        return "EXCELENTE";
    } else if (score >= 9) {
        return "SOBRESALIENTE";
    } else if (score >= 8) {
        return "NOTABLE";
    } else if (score >= 7) {
        return "NOTABLE BAJO";
    } else if (score >= 6) {
        return "BIEN";
    } else if (score >= 5) {
        return "SUFICIENTE";
    } else if (score >= 3) {
        return "INSUFICIENTE";
    } else if (score >= 2) {
        return "DEFICIENTE";
    } else {
        return "MUY DEFICIENTE";
    }
}
