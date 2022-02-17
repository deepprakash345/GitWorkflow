module.exports = {
    entryPoints: ['./src/index.ts'],
    out: 'docs',
    sort : ['alphabetical'],
    readme: 'none',
    cleanOutputDir: true,
    includeVersion: true,
    excludeExternals: true,
    excludePrivate : true,
    excludeProtected : true,
    disableSources: true,
    plugin: 'typedoc-plugin-markdown',
    hideBreadcrumbs: true,
}