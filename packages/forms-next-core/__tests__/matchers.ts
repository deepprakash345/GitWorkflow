export const filterTestTable = <T extends {f?: boolean, x?: boolean}>(tests: T[]) : T[] => {
    let testsToRun = tests.filter(t => t.f);
    if (testsToRun.length == 0) {
        testsToRun = tests.filter(t => !t.x);
    }
    return testsToRun;
};