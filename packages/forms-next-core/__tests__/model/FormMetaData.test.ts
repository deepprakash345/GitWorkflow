import {MetaDataJson} from '../../src/types';
import FormMetaData from '../../src/FormMetaData';

test('FormMetaData should return correct values', () => {
    const metadata:MetaDataJson = {
        'action' : '/some/url',
        'version' : '0.1',
        'grammarVersion' : 'af-formcalc-1.0',
        'locale': 'en-us',
        'dataUrl': '/some/url'
    };
    const f = new FormMetaData(metadata);
    expect(f.action).toEqual('/some/url');
    expect(f.version).toEqual('0.1');
    expect(f.grammarVersion).toEqual('af-formcalc-1.0');
    expect(f.locale).toEqual('en-us');
    expect(f.dataUrl).toEqual('/some/url');
});