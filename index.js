const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const session = require('express-session');
const nunjucks = require('nunjucks')

app.use(session({
    cookie: { maxAge: (3600 * 1000), secure: false },
    secret: 'test',
    resave: false,
    saveUninitialized: true,
}));
app.use((req, res, next) => {
    if(!req.session.cart) {
    	req.session.cart = {};
	}
    next()
})
nunjucks.configure('views', {
	autoescape: true,
	cache: false,
	express: app,
	watch: true
})
app.engine('html', nunjucks.render)
app.set('view engine', 'html')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true  //value of parameter can be any type https://expressjs.com/en/resources/middleware/body-parser.html
}));
app.use('/public', express.static('public'))


// require('./routes/home')(app)

//Dùng Router trong express 4 rồi mount nó vào đường dẫn /person
 const home = require('./routes/home')(express)
 app.use('/', home)

const user = require('./routes/user')(express)
app.use('/user', user)



//------------Listen at port -------------------
const server = app.listen(3001, function () {
	console.log('Example app listening on port 3001!')
})


//------------Error Handling Middleware----------
app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Error: ' + err.message)
})