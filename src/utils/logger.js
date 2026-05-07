// 📁 src/utils/logger.js

function getCallerInfo() {
    try {
        const err = new Error();
        const stack = err.stack.split("\n");

        // Find first line that is NOT logger file
        let callerLine;
        for (let i = 2; i < stack.length; i++) {
            if (!stack[i].includes("logger.js")) {
                callerLine = stack[i];
                break;
            }
        }

        let fileName = "unknown-file";
        let functionName = "anonymous";

        if (callerLine) {
            // Extract file name
            const fileMatch = callerLine.match(/\((.*):\d+:\d+\)/);
            if (fileMatch) {
                const fullPath = fileMatch[1];
                fileName = fullPath.split("\\").pop().split("/").pop();
            }

            // Extract function name
            const fnMatch = callerLine.trim().match(/at (.*?) \(/);
            if (fnMatch && fnMatch[1]) {
                functionName = fnMatch[1];
            }
        }

        return { fileName, functionName };
    } catch {
        return { fileName: "unknown-file", functionName: "anonymous" };
    }
}

function log(message) {
    try {
        const { fileName, functionName } = getCallerInfo();

        console.log(`Date & Time : ${new Date().toISOString()}`);
        console.log(`File        : ${fileName}`);

        console.log(`Message     : ${message}`);
        console.log("\n\n"); // 2 empty lines
    } catch { }
}

function error(message) {
    try {
        const { fileName, functionName } = getCallerInfo();

        console.error(`Date & Time : ${new Date().toISOString()}`);
        console.error(`File        : ${fileName}`);

        console.error(`Error       : ${message}`);
        console.error("\n\n");
    } catch { }
}

module.exports = { log, error };