var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var Movie = require('./models/movie')
// output format form data
var bodyParser = require('body-parser')
var _ = require('underscore')
var port = process.env.PORT || 3000 
var app = express()
app.locals.moment = require('moment')
mongoose.connect('mongodb://localhost/imooctest')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)

console.log('imooc started on port: ' + port)

// index page
app.get('/', function(req, res){
	Movie.fetch(function(err,movies) {
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: '首页',
	      movies: movies
		})
	})
})

// detail page
app.get('/movie/:id', function(req, res){
	var id = req.params.id

	Movie.findById(id, function(err, movie){
		res.render('detail', {
			title: 'imooc详情页',
			movie: movie
		})
	})
})

// admin page
app.get('/admin/movie', function(req, res){
	res.render('admin', {
		title: 'imooc 录入页',
		movie: {
			doctor: '',
			country: '',
			title: '',
			year: '',
			poster: '',
			language: '',
			flash: '',
			summary: ''
		}
	})
})

// admin update movie
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id

	if(id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: movie.title,
				movie: movie
			})
		})
	}
})

// admin post movie
app.post('/admin/movie/new',function(req,res){
	var id = req.body.movie._id
	var movieObj = req.body.movie

	var _movie
  console.log('111111', id)
  console.log('222222', movieObj)
	if(id !=='undefined'){
		console.log('33333333')
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
			    }

			    res.redirect('/movie/'+_movie.id)
			})

		})
	}else{
		console.log('4444444')
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		})

		_movie.save(function(err,movie){
				if(err){
					console.log(err)
			    }

			    res.redirect('/movie/'+_movie.id)
			})
	}
})

// list page
app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}
		res.render('list', {
			title: 'imooc 列表页',
			movies: movies
		})
	})
	
})