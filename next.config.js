const {
  BugsnagSourceMapUploaderPlugin,
  BugsnagBuildReporterPlugin
} = require('webpack-bugsnag-plugins');

module.exports = {
  productionBrowserSourceMaps: true,
  webpack(config, { buildId, isServer, webpack }) {
    // Avoid including '@bugsnag/plugin-aws-lambda' module in the client side bundle
    // See https://arunoda.me/blog/ssr-and-server-only-modules
    // if (!isServer) {
    //   config.plugins.push(
    //     new webpack.IgnorePlugin({
    //       resourceRegExp: /@bugsnag\/plugin-aws-lambda/
    //     })
    //   );
    // }

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
          // publicPath: 'https://timothy-caish.vercel.app/_next/',
          overwrite: true
        })
      );
    }

    return config;
  }
};
