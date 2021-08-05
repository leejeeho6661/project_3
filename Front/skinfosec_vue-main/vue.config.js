
var path = require('path');

module.exports = {
  outputDir : path.resolve('../sk_back/public'),
  devServer : {
    // host: '172.31.36.155',
    // port: 8080,
    // public: 'ec2-54-215-158-166.us-west-1.compute.amazonaws.com:8080',
    proxy : {
      '/api':{
        target: 'http://www.kilhyomin.com/api',
        changeOrigin: true,
        pathRewrite:{
          "^api" : ''
        }
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  lintOnSave: false
}
