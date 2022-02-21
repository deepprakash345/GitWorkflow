import {MetaDataJson} from '../../src/types';
import FormMetaData from '../../src/FormMetaData';

test('FormMetaData should return correct values', () => {
    const metadata:MetaDataJson = {
        'version' : '0.1',
        'grammar' : 'af-formcalc-1.0',
        'locale': 'en-us'
    };
    const f = new FormMetaData(metadata);
    expect(f.version).toEqual('0.1');
    expect(f.grammar).toEqual('af-formcalc-1.0');
    expect(f.locale).toEqual('en-us');
});