import Field from '../../Field';

test('a field should add all the default values in its json', () => {
    const f = new Field({':id' : 'someid'});
    expect(f.json()).toEqual({
        ':id' : 'someid',
        ':visible' : true,
        ':readOnly' : false,
        ':enabled' : true
    });
});

test('a field should set the value correctly in its json from default value', () => {
    const f = new Field({':id' : 'someid', ':default' : 'test'});
    expect(f.json()).toEqual({
        ':id' : 'someid',
        ':visible' : true,
        ':readOnly' : false,
        ':enabled' : true,
        ':default' : 'test',
        ':value' : 'test'
    });
});