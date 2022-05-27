/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

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