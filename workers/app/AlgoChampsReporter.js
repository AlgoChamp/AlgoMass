class CustomReporter{
    constructor(globalConfig, reporterOptions, reporterContext){

    this.testResults = [];
        this._globalConfig = globalConfig;
        this._options = reporterOptions;
        this._context = reporterContext;
        this.results = [];
    }
    
    onTestCaseResult(test, testResult, aggregatedResult){
        /*
        Properties needed
        testResult
        */
       const regex = /Received:(.*)/gmi

       const results = testResult.title.split(' ')
       if (testResult.state === 'passed') this.results.push([testResult.status.trim(), results[1], results[1]])
       else {
        
        // console.log("The mess", testResult.failureMessages[0])
        const match = testResult.failureMessages[0].match(regex)
        this.results.push([testResult.status.trim(), results[1], match[0].replace('Received:','')])
    }
    }

    onRunComplete(testContext, aggregatedResults) {
        console.log(this.results)
    }


}

module.exports = CustomReporter;
