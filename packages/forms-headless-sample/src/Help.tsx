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

import {
    ActionButton,
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    Heading,
    TextArea
} from "@adobe/react-spectrum";
import HelpIcon from '@spectrum-icons/workflow/Help';
import React from "react";

const formPage = "https://author-p9552-e11552-cmstg.adobeaemcloud.com/editor.html/content/core-components-examples/library.html"
const damPage = "https://author-p9552-e11552-cmstg.adobeaemcloud.com/assets.html/content/dam"
const devConsole = "https://dev-console-ns-team-aem-cm-stg-n3460.ethos14-stage-va7.dev.adobeaemcloud.com/#release-cm-p9552-e11552"
const Help = function () {
    return <DialogTrigger type="modal">
        <ActionButton><HelpIcon/></ActionButton>
        {(close) => (
            <Dialog>
                <Heading>Usage Instructions</Heading>
                <Divider />
                <Content>
                    <p>The links work only with the Headless demo AEM Instance. For your custom instance you may need to
                    change the URL</p>
                    <Divider />
                    <h1>Create the JSON markup to represent your form</h1>
                    <p>Navigate to the wiki page and write the JSON as per the wiki. Some samples are provided here</p>
                    <h1>Upload the JSON in AEM</h1>
                    <p>Navigate to <a href={damPage} target={"_blank"} rel="noreferrer"> AEM Assets</a> and upload the json</p>
                    <h1>Create a Form in AEM</h1>
                    <p>Navigate to <a href={formPage} target={"_blank"} rel="noreferrer"> AEM Page</a> and
                        Insert the Form Container Component and choose the JSON file uploaded in Assets</p>
                    <h1>Get a developer Token</h1>
                    <p>Navigate to <a href={devConsole} target={"_blank"} rel="noreferrer"> Developer Console</a> and
                        get a token to authorize this APP to access AEM</p>
                </Content>
                <ButtonGroup>
                    <Button variant="secondary" onPress={close}>
                        OK
                    </Button>
                </ButtonGroup>
            </Dialog>
        )}
    </DialogTrigger>
}

export default Help