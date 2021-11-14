import {FieldJson, FieldsetJson, FormJson, translationProps} from '@aemforms/forms-next-core';
import {TRANSLATION_ID, TRANSLATION_TOKEN} from '@aemforms/forms-next-core/lib/utils/TranslationUtils';


export const getTranslationMessages = (input: FieldJson | FieldsetJson | FormJson | any) : any => {
    return Object.keys(input).reduce((acc, curr) => {
        const objValue = input[curr];
        let ret = null;
        if(objValue && objValue instanceof Object) {
            ret = getTranslationMessages(objValue);
        } else if(objValue && objValue instanceof Array) {
            ret = getTranslationMessages(objValue[0]);
        } else {
            const f1 = input;
            if (TRANSLATION_ID in f1) {
                let idObj = f1[TRANSLATION_ID];
                ret = translationProps.reduce((a, prop) => {
                    let localRet = {};
                    // only if value exists, add to translation object
                    if (f1[prop] && idObj[prop]) {
                        // in case of array, add each properties in the translation object
                        // for example, enumNames and enum
                        if (f1[prop] instanceof Array) {
                            f1[prop].forEach((item: any, index: any) => {
                                let key : string = `${idObj[prop]}${TRANSLATION_TOKEN}${index}`;
                                // @ts-ignore
                                localRet[key] = { // create react-intl message
                                    'id': key,
                                    'defaultMessage': item
                                };
                            });
                        } else {
                            let key : string = idObj[prop];
                            // @ts-ignore
                            localRet[key] = { // create react-intl message
                                'id': key,
                                'defaultMessage': f1[prop]
                            };
                        }
                    }
                    return Object.assign(a, localRet);
                }, {});
            }
        }
        return Object.assign(acc, ret);
    }, {});
};
