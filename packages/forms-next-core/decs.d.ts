declare module '@aemforms/json-formula' {
    export function jsonFormula(
        json,
        globals,
        expression,
        customFunctions = {},
        stringToNumber,
        debug = [],
        language = 'en-US'
    ): unknown;
    export class Formula {
        constructor(
            expression,
            customFunctions = {},
            stringToNumber,
            globalNames: Array<string>,
            debug = [],
            language = 'en-US'
        )

        search(json, globals)
    }
}