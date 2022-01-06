const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias['~/src'] = path.resolve(__dirname, '../src')
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'sass-loader',
        {
          loader: "sass-resources-loader",
          options: {
            resources: [
              "src/style/index.scss",
            ]
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
}