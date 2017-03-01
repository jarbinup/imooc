var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var logger = require('express-logger')
var port = process.env.PORT || 3000 
var app = express()
var dbUrl = 'mongodb://localhost/imooctest'

mongoose.connect(dbUrl)

app.locals.moment = require('moment')
app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(cookieParser())
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({	
	secret: 'imooc',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}))
// pre handle user
app.use(function(req, res, next){
	var _user = req.session.user
	if (_user) {
		app.locals.user = _user
	}
	next()
})

if ('development' === app.get('env')) {
  app.set('showStackError', true)
  app.use(logger({
  	path: 'logger.txt'
  }))
  app.locals.pretty = true
  mongoose.set('debug', true)
}
require('./config/routes')(app)

app.listen(port)
console.log('imooc started on port: ' + port)
