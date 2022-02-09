module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      staticDistDir: "./packages/performance-testing/build",
      settings: {
        chromeFlags: "--disable-gpu --no-sandbox --headless"
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { "minScore": 0.5 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 1 }]
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};