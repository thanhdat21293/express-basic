# Express demo

Cài đặt express

```json
npm i --save express
```

## Body parser

Cài đặt

```json
npm i --save body-parser
```

Sử dụng body-parser để nhận được dữ liệu với phương thức POST
```javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true 
}))
```

## Serve static resource

Khai báo thư mục sử dụng cho frontend như: js, images, css, font,..

```javascript
app.use('/public', express.static('public'))
```

Như vậy nếu thư mục public như này:

```json
 public
   ├── css
   ├── js
   ├── fonts
   └── images
       ├── hoa.png
       └── la.jpg
```

Thì đường dẫn ảnh sẽ là:

```html
<img src="/images/hoa.png">
<img src="/images/la.jpg">
```

## Set up router

#### Cách 1:

```javascript
app.get('/', (req, res) => {
    res.send('Hello world!')
});
```

#### Cách 2: Dùng router trong express 4

```javascript
router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello world! 1')
});
return router
```

## Gán đường dẫn mặc định

```javascript
const user = require('./routes/user')(express);
app.use('/user', user)
```

Ví dụ:

Router trong file /routers/user.js có dạng:

```javascript
router.get('/', (req, res) => {
    res.send('Hello world! 1')
});
router.get('/1', (req, res) => {
    res.send('User 1')
});
```

Thì khi đó đường dẫn sẽ là:

```json
http://localhost:3000/user => Hello world! 1
http://localhost:3000/user/1 => User 1
```

## SESSION

Cài đặt

```json
npm i --save express-session
```

Cấu hình

```javascript
app.use(session({
  cookie: { maxAge: (3600 * 1000), secure: false },
  secret: 'JackCodeHammer'
}));
```

- secret (Bắt buộc)[String | mảng]: dùng để đăng ký cookie session ID

- cookie: Cấu hình cho cookie

## Nunjucks

Cài đặt

```json
npm i --save nunjucks
```

Cấu hình

```javascript
nunjucks.configure('views', {
	autoescape: true,
	cache: false,
	express: app,
	watch: true
})
```




