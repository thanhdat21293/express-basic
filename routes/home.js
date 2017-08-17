const User = require('../models/m_users')
// module.exports = (app) => {
//     app.get('/', (req, res) => {
//         res.send('Hello world!')
//     });
// };
let shop = [
    {
        id: 'SP1',
        title: 'Card title 1',
        content: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: 5000
    },
    {
        id: 'SP2',
        title: 'Card title 2',
        content: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: 2500
    },
    {
        id: 'SP3',
        title: 'Card title 3',
        content: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: 1000
    },
    {
        id: 'SP4',
        title: 'Card title 4',
        content: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: 3100
    },
    {
        id: 'SP5',
        title: 'Card title 5',
        content: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: 48000
    },
    {
        id: 'SP6',
        title: 'Card title 6',
        content: 'Some quick example text to build on the card title and make up the bulk of the card content.',
        price: 33000
    }
];
module.exports = (express) => {
    router = express.Router();

    // router.get('/', (req, res) => {
    //     res.send('Hello world! 1')
    // });

    router.get('/', (req, res) => {
        let user = req.session.user || 'guest'
        res.render('index', {
            user: user
        })
    });

    router.post('/signup', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        if(password[0] !== password[1]){
            res.json({msgErr: 'Mật khẩu không trùng nhau.'})
        }else{
            User.checkUser(username)
                .then((data) => {
                    if(data.length > 0) {
                        res.json({msgErr: 'Username đã tồn tại.'})
                    }else{
                        User.insertUser(username, password[0])
                            .then(() => {
                                res.json({msg: 'Đăng ký thành công.'})
                            })
                            .catch(err => {
                                res.json({msgErr: err.message})
                            })
                    }
                })
                .catch(err => {
                    res.json({msgErr: err.message})
                })
        }
    });

    router.post('/login', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        User.checkLogin(username, password)
            .then(data => {
                req.session.user = data.username
                res.json({msg: 'Đăng nhập thành công.'})
            })
            .catch(err => {
                res.json({msgErr: err.message})
            })

    });

    router.get('/shop', (req, res) => {
        let q = req.query.addtocart;
        if(q !== undefined || q > 0){
            if(req.session.cart[q]) {
                req.session.cart[q] += 1;
            }else {
                req.session.cart[q] = 1;
            }
        }
        res.render('shop', {
            data: shop,
            cart: req.session
        })
    });

    router.get('/cart', (req, res) => {
        let data = [];
        let cart = req.session.cart;
        shop.map(item => {
            if(cart[item.id]) {
                data.push(item)
            }
        });
        res.render('cart', {
            data: data,
            cart: req.session.cart
        })
    });

    //req.params
    //req.query
    //req.body
    router.get('/data', (req, res) => {
        console.log(req.query)
    });

    return router
};