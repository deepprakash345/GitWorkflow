
export const renderItem = (mappings: any) => (item: any) => {
    const Comp = mappings[item.viewType];
    if (Comp === undefined) {
        return <div><h4>Undefined Element</h4><pre>{JSON.stringify(item, null, 2)}</pre></div>;
    }
    return <Comp field={item} />;
};
