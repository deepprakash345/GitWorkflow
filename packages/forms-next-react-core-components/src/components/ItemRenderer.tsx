import Form from '@adobe/forms-next-core/lib/Form';

export const renderItem = (mappings: any, form: Form) => (item: any) => {
    const Comp = mappings[item[':type']];
    if (Comp === undefined) {
        return <div><h4>Undefined Element</h4><pre>{JSON.stringify(item, null, 2)}</pre></div>;
    }
    item.mappings = mappings;
    item.form = form;
    return <Comp {...item} />;
};
