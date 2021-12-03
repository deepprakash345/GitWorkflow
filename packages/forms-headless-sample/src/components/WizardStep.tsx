import { WizardStep as QWizardStep } from '@quarry/wizard'
import {FieldsetJson} from '@aemforms/forms-next-core';
import {FormContext} from "@aemforms/forms-next-react-bindings";
import React, {useContext} from 'react';
import {renderChildren, useRuleEngine} from "@aemforms/forms-next-react-bindings";
import {State} from "@aemforms/forms-next-core/lib";
const WizardStep = function (originalProps: State<FieldsetJson>) {
    const mappings = useContext(FormContext).mappings;
    const [props, handlers] = useRuleEngine(originalProps);

    if (props.visible) {
        return (<QWizardStep
            title={props.label?.value}>
            <React.Fragment key=".0">
                {renderChildren(props, mappings, handlers)}
            </React.Fragment>
        </QWizardStep>)
    }
};

export default WizardStep;