const {
  BugsnagSourceMapUploaderPlugin,
  BugsnagBuildReporterPlugin
} = require('webpack-bugsnag-plugins');

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: ''
        // pathname: '/account123/**',
      }
    ]
  },
  productionBrowserSourceMaps: true,
  webpack(config, { buildId }) {
    // Upload source maps on production build
    if (
      process.env.NEXT_PUBLIC_BUGSNAG_API_KEY &&
      process.env.NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new BugsnagBuildReporterPlugin(
          {
            apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
            appVersion: buildId,
            releaseStage: process.env.NODE_ENV
          },
          { logLevel: 'debug' }
        ),
        new BugsnagSourceMapUploaderPlugin({
          apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
          appVersion: buildId,
          overwrite: true
        })
      );
    }

    return config;
  }
};
