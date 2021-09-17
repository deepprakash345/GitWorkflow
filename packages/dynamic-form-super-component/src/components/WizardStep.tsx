import { WizardStep as QWizardStep } from '@quarry/wizard'
import {FieldsetJson} from '@adobe/forms-next-core';
import formContext from '@adobe/forms-next-react-core-components/lib/react-mapper/FormContext';
import React, {useContext} from 'react';
import {renderChildren, renderIfVisible} from '@adobe/forms-next-react-core-components/lib/react-mapper/utils';
import {useRuleEngine} from '@adobe/forms-next-react-core-components/lib/react-mapper/hooks';
const WizardStep = function (originalProps: FieldsetJson) {
    const mappings = useContext(formContext).mappings;
    const [props] = useRuleEngine<FieldsetJson, string>(originalProps);

    return renderIfVisible(props,(<QWizardStep
                                           title={props[":title"]}>
        <React.Fragment key=".0">
            {renderChildren(props, mappings)}
        </React.Fragment>
    </QWizardStep>));
};

export default WizardStep;