var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
// output format form data
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
// module for persistence session
var mongoStore = require('connect-mongo')(session)
var port = process.env.PORT || 3000 
var app = express()
var dbUrl = 'mongodb://localhost/imooctest'
app.locals.moment = require('moment')
mongoose.connect(dbUrl)

app.set('views', './views/pages')
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

app.listen(port)
console.log('imooc started on port: ' + port)

// pre handle user
app.use(function(req, res, next){
	var _user = req.session.user
	if (_user) {
		app.locals.user = _user
	}
	return next()
})

require('./config/routes')(app)
