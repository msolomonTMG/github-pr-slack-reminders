const 
  express = require('express');
var app = express();
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
module.exports = app;

console.log('I am awake :)')
