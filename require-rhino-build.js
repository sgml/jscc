({
    "mainConfigFile": "./require-rhino-config.js",
    "paths": {
        "jscc/namespace": "jscc/namespaceClosure"
    },
    "optimize": "closure",
    "preserveLicenseComments": false,
    "generateSourceMaps": true,
    "closure": {
        "CompilerOptions": {
            "language": com.google.javascript.jscomp.CompilerOptions.LanguageMode.ECMASCRIPT5,
            "checkSymbols": true,
            "checkTypes": true,
            "newTypeInference": true
        },
        "CompilationLevel": "ADVANCED_OPTIMIZATIONS",
        "loggingLevel": "FINE",
        "externExportsPath": "./externs.js"
    },
    "name": "jscc",
    "wrap": {
        "startFile": ["typedef.js", "lib/jscc/io/io.js", "lib/jscc/log/log.js", "lib/jscc/bitset/bitset.js"],
        "endFile": ["exports.js"]
    },
    "out": "./jscc-rhino.js",
    "logLevel": 2
})