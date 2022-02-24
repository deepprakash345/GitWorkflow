import React from 'react'
import ReactJson from 'react-json-view'


export const PrettyJson  = function ({json}) {
    return (
        <ReactJson indentWidth={2} src={json} displayDataTypes={false} displayObjectSize={false}
                   name={false}
                   quotesOnKeys={false}
                   style={{
                       fontFamily: "",
                       fontSize: "13px"}
                   }
                   collapsed={3}
                   groupArraysAfterLength={4}
                   collapseStringsAfterLength={15}
                   displayArrayKey={false}
        />);
}