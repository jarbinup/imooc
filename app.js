var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000 
var app = express()

mongoose.connect('mongodb://localhost/imooc')
app.set('views', './views/pages') // she zhi shi tu de gen mu lu
app.set('view engine', 'jade') // she zhi mo ren de mo ban yin qing 
// app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc started on port: ' + port)

// index page
app.get('/', function(req, res){
	Movie.fetch(function(err,movies) {
		if (err) {
			console.log(err)
		}
	})
	res.render('index', {
		title: 'shouye',
      movies: movies
	})
})

// detail page
app.get('/movie/:id', function(req, res){
	var id = req.pqrams.id

	Movie.findById(id, function(err, movie){
		res.render('detail', {
		title: 'imooc' + movie.title,
		movie: movie
		})
	})
})

// admin update movie
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id

	if(id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc udate',
				movie: movie
			})
		})
	}
})
// admin post movie
app.post('/admin/movie/new', function(res, req){
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie

	if(id !== 'undefined'){
		Movie.findById(id, function(err, movie){
			if (err) {
				cconsolr.log(err)
			} 

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if(err) {
					console.log(err)
				}

				res.redrect('/movie/' + movie._id)
			})
		})
	} else{
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

		_movie.save(function(err, movie){
			if(err) {
				console.log(err)
			}

			res.redrect('/movie/' + movie._id)
		})
	}
})
// admin page
app.get('/admin/movie', function(req, res){
	res.render('admin', {
		title: 'imooc luruye',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
})

// list page
app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}
	})
	res.render('list', {
		title: 'imooc liebiaoye',
		movies: movies
	})
})