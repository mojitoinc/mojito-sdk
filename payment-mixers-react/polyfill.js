const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running command '${command}': ${error}`);
      return;
    }
    console.log(stdout);
    callback();
  });
}

// Install required packages
runCommand('yarn add --dev crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process react-app-rewired zlib', () => {
  // Create config-overrides.js file
  const configOverridesContent = `
    const webpack = require("webpack");

    module.exports = function override(config) {
      const fallback = config.resolve.fallback || {};
      Object.assign(fallback, {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url")
      });
      config.resolve.fallback = fallback;
      config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        }),
      ]);
      config.ignoreWarnings = [/Failed to parse source map/];
      config.module.rules.push({
        test: /\.(js|mjs|jsx)$/,
        enforce: "pre",
        loader: require.resolve("source-map-loader"),
        resolve: {
          fullySpecified: false,
        },
      });
      return config;
    };
  `;
  fs.writeFileSync('config-overrides.js', configOverridesContent);

  // Update package.json with the "browser" field
  const packageJsonPath = 'package.json';
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent);
  packageJson.browser = {
    path: false,
    stream: false,
    assert: false,
    http: false,
    https: false,
    url: false,
    zlib: false,
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Update package.json scripts
  runCommand('yarn add --dev react-app-rewired', () => {
    fs.writeFileSync(packageJsonPath, JSON.stringify({
      ...packageJson,
      scripts: {
        start: 'react-app-rewired start',
        build: 'node setup-script.js && react-app-rewired build',
        test: 'react-app-rewired test',
        setup: 'node setup-script.js',
      },
    }, null, 2));

    // Cleanup
    runCommand('rm -rf node_modules', () => {
      runCommand('yarn install', () => {
        // Modify zlib.js file after yarn install
        const zlibFilePath = path.join('node_modules', 'zlib', 'lib', 'zlib.js');
        const zlibFileContent = fs.readFileSync(zlibFilePath, 'utf-8');
        const modifiedZlibContent = zlibFileContent.replace('module.exports = require(\'./zlib_bindings\');', 'module.exports = require(\'zlib\');');
        fs.writeFileSync(zlibFilePath, modifiedZlibContent);
        console.log('Setup completed successfully.');
      });
    });
  });
});
