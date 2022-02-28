import React from 'react'
import ReactJson from 'react-json-view'


export const PrettyJson  = function ({json, highlights}) {
    // removing undefined properties
    const cleanedJson = JSON.parse(JSON.stringify(json))
    if (typeof highlights === "undefined" || !(highlights instanceof Array)) {
        highlights = []
    }
    const collapse = (args) => {
        const {name, src, type, namespace} = args
        if (highlights.length == 0) {
            return namespace.length > 3
        } else {
            const fullName = namespace.slice(1).join(".")
            return highlights.some(highlight => !(highlight.startsWith(fullName)))
        }
    }
    return (
        <ReactJson indentWidth={2} src={cleanedJson} displayDataTypes={false} displayObjectSize={false}
                   name={null}
                   quotesOnKeys={false}
                   style={{
                       fontFamily: "",
                       fontSize: "13px"}
                   }
                   shouldCollapse={collapse}
                   groupArraysAfterLength={4}
                   collapseStringsAfterLength={15}
                   displayArrayKey={false}
        />);
}