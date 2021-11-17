import {getFileSizeInBytes} from '../../src/utils/FormUtils';


test('get file size in bytes from human readable file size', () => {
    expect(getFileSizeInBytes('2KB')).toEqual(2048);
    expect(getFileSizeInBytes('2')).toEqual(2048);
    expect(getFileSizeInBytes('2MB')).toEqual(2097152);
    expect(getFileSizeInBytes('2.')).toEqual(0);
});