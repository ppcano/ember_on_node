var express = require('express');
var gleak = require('gleak');
var assetManager = require('connect-assetmanager');


var assetManagerGroups = {
    'js': {
        'route': /\/public\/app.js/
        , 'path': './lib/'
        , 'dataType': 'javascript'
        , 'files': [
            'app.js',
            'views/main_view.js'
        ]
    }
};

var app = express.createServer(
); 



app.use( express.logger('":method :url" :status') );
app.use( express.favicon() );
app.use( express.bodyParser() );
app.use( assetManager(assetManagerGroups) ); // on development reload each time


app.configure('development', function(){

  app.use( gleak.middleware() );
  app.use( require('node-make-asset-pipeline')({asset: 'assets', monitors: [ { name: 'ember', watch: 'packages/ember.js/packages' } ]}) );


});





app.get('/index.html', function(req, res){ // Supply your index file
  res.sendfile(__dirname +'/index.html');
});

// for testing purporse
app.get('/', function(req, res){ // Supply your index file
  res.sendfile(__dirname +'/index.html');
});

/* delegates to make-asset-pipeline
app.get('/assets/:assetfile', function(req, res){ // Supply your styles file
  
  res.sendfile(__dirname +'/assets/'+req.params.assetfile);
});
*/

app.get('/css/:css', function(req, res){ // Supply your styles file
  
  res.sendfile(__dirname +'/css/'+req.params.css);
});

app.get('/vendor/:css', function(req, res){ // Supply your styles file
  
  res.sendfile(__dirname +'/vendor/'+req.params.css);
});


var port = process.env.PORT || 3000;

console.log('server will be listening at '+port);
app.listen(port); 

// TODO: error handling
