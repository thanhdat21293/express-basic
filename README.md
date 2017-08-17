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
});
app.engine('html', nunjucks.render);
app.set('view engine', 'html')
```

## Đăng ký / Đăng nhập

Sử dụng jQuery để lấy dữ liệu trong form

Sử dụng axios để gửi dữ liệu lên server mà không phải reload lại trang

```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

Sử dụng jQuery().serialize() để lấy dữ liệu trong form

Nhớ là các input, select, textarea,.. trong form phải có name nhé

```javascript
let formData = jQuery('form#formsignup').serialize();
```

Dùng axios gửi dữ liệu lên server

- then: Nếu thành công thì thực thi câu lệnh bên trong

- catch: Nếu thất bại thì thực thi câu lệnh bên trong
```javascript
axios.post('URL', {})..
axios.get('URL', {})..
axios.put('URL', {})..
axios.delete('URL', {})..
```

Khi đó server sẽ hứng request tương ứng

```javascript
router.post('URL', (req, res) => {});
router.get('URL', (req, res) => {});
router.put('URL', (req, res) => {});
router.delete('URL', (req, res) => {});
```

Dữ liệu trả về nên là jSon, array, string, number.

```javascript
res.json({});
res.send('');
```

Client nhận được dữ liệu và dùng dữ liệu đó để hiển thị ra.

## Cart

Mỗi 1 request sẽ kiểm tra nếu k có session.cart thì gán nó bằng mảng object rỗng
```javascript
app.use((req, res, next) => {
    if(!req.session.cart) {
    	req.session.cart = {};
	}
    next()
})
```

Khi add to cart đường dẫn có dạng (Có nhiều dạng khác nhau nhưng ở đây mình gửi lên server dạng query)

```json
http://localhost:3000/?addtocart=IDSP
```

Khi đó ở server sẽ hứng request và xử lý

```javascript
let q = req.query.addtocart; // Lấy query
if(q !== undefined || q > 0){ //Nếu dữ liệu có giá trị và > 0 thì
    if(req.session.cart[q]) { // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        req.session.cart[q] += 1; // Có rồi thì + thêm 1
    }else {
        req.session.cart[q] = 1; // Chưa có thì thêm và gán giá trị  = 1
    }
}
```

Object cart sẽ có dạng kiểu như này

```json
{
SP1: 1,
SP2: 2,
SP3: 3
}
```

Khi có object thì ở server cart lấy dữ liệu các sản phẩm trong cart rồi hiển thị ra frontend.

=========================== HẾT ===========================