module.exports = {
  entry: './client/app/index.jsx',

  output: {
    path: './client/build/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', 'index.jsx', 'index.js', '.css']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: '6to5'      },
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
