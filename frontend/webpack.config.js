const path = require('path');

module.exports = {
  entry: {
    contentg: './src/contentg.js',
    main: './src/GT.js',
    signin: './src/signin.js',
    background: './src/background.js',
    adminPage:'./src/adminPage.js' 
  },
  output: {
    filename:'[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
    
  },
  module: {
    rules: [
      {
        test: /\.js$/, // look for JavaScript files
        exclude: /(node_modules|dist|popup_images)/, // exclude the node_modules,popup_images and dist directories
        
      }]},

  mode: 'development',
  watch: true
};
