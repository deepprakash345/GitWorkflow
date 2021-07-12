import { FormModel } from "../../Types";

export const oneFieldForm: FormModel = {
    items: [{
        type: "string",
        viewType : "text",
        name :"name"
    }] 
}

export const formWithPanel: FormModel = {
    items: [{
        type: "string",
        viewType : "text",
        name :"name"
    }, {
        type: "object",
        name: "address",
        items: [{
            type: "number",
            viewType : "numericEdit",
            name: "zip"
        }]
    }] 
}

export const panelWithoutBinding: FormModel = {
    items: [{
        type: "string",
        viewType : "text",
        name :"name"
    }, {
        items: [{
            type: "number",
            viewType : "numericEdit",
            name: "zip"
        }]
    }] 
}