module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]__[local]--[hash:base64:5]'
                }
              },
              'postcss-loader'
            ]
          }
        ]
      }
    ]
  }
}