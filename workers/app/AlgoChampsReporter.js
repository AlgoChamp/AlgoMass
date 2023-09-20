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
        this.results.push(testResult.status.trim())
    }

    onRunComplete(testContext, aggregatedResults) {
        console.log(this.results)
    }


}

module.exports = CustomReporter;
