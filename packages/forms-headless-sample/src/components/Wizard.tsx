import { Wizard as QWizard } from '@quarry/wizard'
import {FieldsetJson} from '@adobe/forms-next-core';
import formContext from '@adobe/forms-next-react-core-components/lib/react-mapper/FormContext';
import React, {useContext} from 'react';
import {renderChildren, renderIfVisible} from '@adobe/forms-next-react-core-components/lib/react-mapper/utils';
import {useRuleEngine} from '@adobe/forms-next-react-core-components/lib/react-mapper/hooks';
const Wizard = function (originalProps: FieldsetJson) {
    const mappings = useContext(formContext).mappings;
    const [props] = useRuleEngine<FieldsetJson, string>(originalProps);

    return renderIfVisible(props,(<QWizard cancelLabel="Cancel"
                                           confirmLabel="Confirm"
                                           mode="fullscreen"
                                           open
                                           title={props.title}
                                           onClose={function noRefCheck(){}}>
        {renderChildren(props, mappings)}
    </QWizard>));
};

export default Wizard;