const express = require('express')
const app = express()
const port = 5000;
// const ref = require('./config/realtimeseason')
// const session = require("express-session")
// const store = new session.MemoryStore()
const flash = require('express-flash')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// const FirebaseStore = require('connect-session-firebase')(session);
const cors = require('cors');

// const exphbs = require('express-handlebars');
// const helpers = require("./components/helper")

// app.engine('.hbs', exphbs.engine({
//   helpers: helpers
// }));



app.set('view engine', 'ejs',);
app.set('views', path.join(__dirname, './views'));
app.set("trust proxy", 1); 

// for(let helper in helpers){
//   exphbs.create(helper, helpers)
// }
// exphbs.engine(reg)

const routes = require('./rts')

app.use(cors({
    origin: ['http://localhost:3000','https://53a4-103-218-237-57.ngrok-free.app']
}));
app.use(urlencodedParser)
app.use(flash())
app.use(cookieParser());
// app.use(session({
//   store: new FirebaseStore({
//     database: ref.database()
//   }),

// secret: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
// cookie: {maxAge: 1296000000},
// saveUninitialized: false,
// resave: false,



// }))
app.use(routes)
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})