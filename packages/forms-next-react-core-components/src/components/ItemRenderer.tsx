
export const renderItem = (mappings: any) => (item: any) => {
    const Comp = mappings[item[':type']];
    if (Comp === undefined) {
        return <div><h4>Undefined Element</h4><pre>{JSON.stringify(item, null, 2)}</pre></div>;
    }
    item.mappings = mappings;
    return <Comp {...item} />;
};
