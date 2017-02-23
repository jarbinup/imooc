var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000 
var app = express()

app.set('views', './views/pages') // she zhi shi tu de gen mu lu
app.set('view engine', 'jade') // she zhi mo ren de mo ban yin qing 
// app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc started on port: ' + port)

// index page
app.get('/', function(req, res){
	res.render('index', {
		title: 'shouye',
      movies: [{
      	title: 'jixiezhanjing',
      	_id: 1,
      	poster: 'http://upload-images.jianshu.io/upload_images/1983849-616fe498b6981042.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      },{
      	title: 'jixiezhanjing',
      	_id: 2,
      	poster: 'http://upload-images.jianshu.io/upload_images/1983849-616fe498b6981042.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      },{
      	title: 'jixiezhanjing',
      	_id: 3,
      	poster: 'http://upload-images.jianshu.io/upload_images/1983849-616fe498b6981042.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      },{
      	title: 'jixiezhanjing',
      	_id: 4,
      	poster: 'http://upload-images.jianshu.io/upload_images/1983849-616fe498b6981042.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      },{
      	title: 'jixiezhanjing',
      	_id: 5,
      	poster: 'http://upload-images.jianshu.io/upload_images/1983849-616fe498b6981042.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      },{
      	title: 'jixiezhanjing',
      	_id: 6,
      	poster: 'http://upload-images.jianshu.io/upload_images/1983849-616fe498b6981042.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      }]
	})
})

// detail page
app.get('/movie/:id', function(req, res){
	res.render('detail', {
		title: 'imooc xiangqingye',
    movie: {
    	doctor: '123',
    	country: 'CN',
    	title: 'jixiezhanjing',
    	year: 2014,
    	poster: 'http://upload-images.jianshu.io/upload_images/1983849-616fe498b6981042.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    	language: 'chinese',
    	flash: 'http://player.youku.com/player.php/sid/xNjA1Njc0NTUy/v.swf',
    	summary: 'wsdcwefcrfrcrcrcrcrrcrcrcr'
    }
	})
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
	res.render('list', {
		title: 'imooc liebiaoye',
		movies: [{
			title: 'jixiezhanjing',
			_id: 1,
			doctor: 'sdfvsd',
			country: 'CN',
			year: 2014,
			poster: 'http://upload-images.jianshu.io/upload_images/1983849-616fe498b6981042.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
			language: 'chinese',
			flash: 'http://player.youku.com/player.php/sid/xNjA1Njc0NTUy/v.swf',
    	summary: 'wsdcwefcrfrcrcrcrcrrcrcrcr'
		}]
	})
})