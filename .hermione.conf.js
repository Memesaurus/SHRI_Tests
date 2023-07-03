module.exports = {
  sets: {
    desktop: {
      files: "src/test/hermione",
    },
  },

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080,
      },
      retry: 1,
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
