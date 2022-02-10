module.exports = {
    entryPoints: ['src'],
    entryPointStrategy : 'Expand',
    out: 'target/docs',
    sort : ['alphabetical'],
    readme: 'none',
    cleanOutputDir: true,
    includeVersion: true,
    excludeExternals: true,
    disableSources: true,
    plugin: 'typedoc-plugin-markdown',
    hideBreadcrumbs: true,
}