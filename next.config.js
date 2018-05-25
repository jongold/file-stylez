const webpack = require('webpack');

if (process.env.NODE_ENV !== 'production') {
  require('now-env');
}

const nextConfig = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.AUTH_URL': JSON.stringify(process.env.AUTH_URL),
      }),
    );

    return config;
  },
};

const withAwesomeTypescript = require('next-awesome-typescript');
module.exports = withAwesomeTypescript(nextConfig);
