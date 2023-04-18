

const { userModel, nameFinder, emailFinder, hashFinder } = require('./mongoose/mongo')
const express = require('express')
const router = express.Router()
// const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const salt = 10;

const JWT_SIGNETURE = 'g7NRDSQQFWIOx1Lt1WdT3tiY7MP8oVbNVJ5nkNYLgotKe8sTl0'
// const db = require('./config/realtimeseason')
const { validationResult, body, } = require('express-validator')
// const loginchecker = require('./checkers/loginchecker')
// const regchecker = require('./checkers/regchecker')
// const getid = require('./checkers/idgetter')
// const idset = require('./checkers/idset')







// router.get('/', async function (req, res) {
//    // console.log(req.sessionStore.ge})

//    if (!req.session.user) {
//       res.render('register', {
//          val: '',
//          alert: ''

//       })

//    } else {

//       try {
//        const  email = await req.session.user.email

//         const sessioncookie = await db.firestore().collection('web game').doc(email).get('email').then(async e => {


//             req.session.user = { username: e.data().username, password: e.data().password, role: e.data().role, email: e.data().email }


//          })


//       } catch (error) {

//          console.log(error)
//       }

//       res.render('home', {
//          user: req.session.user.username,
//          role: req.session.user
//       })

//    }

// })


// router.get('/login', (req, res) => {
//    if (!req.session.user) {
//       res.render("login", {
//          alert: '',

//       })
//    } else {
//       res.render('home', {
//          user: req.session.user.email,
//          role: req.session.user
//       })

//    }

// })


// //admin panel route

// router.post('/admin/secure/panel', (req, res) => {
//    if (req.session.user.role === 'user') {
//       res.redirect('/')
//    } else if (req.session.user.role === 'admin') {
//       res.render('admin/admin', {
//          alert: '',
//          username: '',
//          email: '',
//          password: '',
//          role: '',
//          session: req.session.user,
//          user: req.session.user.username

//       })
//    } else if (req.session.user.role === 'moderator') {
//       res.render('admin/admin', {
//          alert: '',
//          username: '',
//          email: '',
//          password: '',
//          role: '',
//          session: req.session.user,
//          user: req.session.user.username

//       })

//    }



//    router.post('/admin_check',

//       check('dbemail').not().isEmpty().withMessage("email can not be empty")
//          .isEmail().withMessage('not a valid email').custom((value, { req }) => {
//             if (value === 'rudro@gmail.com') {
//                throw new Error('top secret info')
//             }

//             return true;
//          }).custom( async (value, {req})=>{
//             await db.firestore().collection('web game').doc(value).get('email').then(async e => {
//                if(!e.data()){
//                   throw new Error('does not exist')
//              } else if(req.session.user.role === e.data().role){
//                  throw new Error('u dont have access to change his details')
//                }else if (req.session.user.role === 'moderator' && e.data().role === 'admin' ){
//                   throw new Error('u dont have access to change his details')
//                }else if (req.session.user.role === 'admin' && e.data().role === 'admin' ){
//                   throw new Error('u dont have access to change his details')
//                }
//             })
//             return true;
//          }),




//       (req, res) => {


//          function flasher(perm) {


//             res.render('admin/admin', {
//                alert: perm,
//                username: '',
//                email: '',
//                password: '',
//                role: '',
//                session: req.session.user
//             })
//             return res.status(400)
//          }


//          const errors = validationResult(req)

//          if (!errors.isEmpty()) {

//             for (var i = 0; i < 1; i++) {
//                flasher(errors.array()[i])

//             }
//          } else {

//             function setterdetails(name, email, password, role) {
//                res.render('admin/admin', {
//                   alert: '',
//                   username: name,
//                   email: email,
//                   password: password,
//                   role: role,
//                   session: req.session.user,
//                   user: ''

//                   ,
//                })

//             }

//             getid(req, res, flasher, setterdetails)

//          }











//       })


// })










// router.post('/ressign',

//    check('dbgetusername').not().isEmpty().withMessage('empty error'),
//    check('dbgetemail').not().isEmpty().withMessage('empty error'),
//    check('dbgetpassword').not().isEmpty().withMessage('empty error'),
//    check('dbgetrole').custom((value, { req }) => {
//       if (req.session.user.role === 'moderator') {


//       } else if (value === '') {
//          throw new Error('empty error')
//       }

//       return true;
//    })

//    , (req, res) => {




//       const errors = validationResult(req)

//       function flasher(perm) {
//          res.render('admin/admin', {
//             alert: perm,
//             username: '',
//             email: '',
//             password: '',
//             role: '',
//             user: '',
//             session: req.session.user
//          })

//       }
//          if (!errors.isEmpty()) {


//             for (var i = 0; i < 1; i++) {
//                flasher(errors.array()[i])

//             }
//          }else{


//             idset(req, res, flasher)


//          }


//    })








// router.get('*', (req, res)=>{
//    res.redirect('/')
// })


router.post('/register',

   body('username').not().isEmpty().withMessage('fill every details').custom(async (value, { req }) => {

      if (await nameFinder(value)) {
         throw new Error('username already taken')
      }
      return true;
   }),

   body('eaddress').not().isEmpty().withMessage("fill every details")
      .isEmail().withMessage('not a valid email').custom(async (value, { req }) => {
         if (await emailFinder(value)) {
            throw new Error('email already in use')
         }
         return true
      }),
   // password must be at least 5 chars long
   body('password').not().isEmpty().withMessage("fill every details").isLength({ min: 8 }).withMessage('password must be 8 letter long')
      .isLength({ max: 30 }).withMessage("password should not be more than 30letter"),

   body('cpassword').not().isEmpty().withMessage('confirm your password').custom((value, { req }) => {
      if (value !== req.body.password) {
         throw new Error('password does not match')
      }

      return true;
   }),




   async (req, res) => {


      const errors = validationResult(req);

      if (!errors.isEmpty()) {

         for (var i = 0; i < 1; i++) {

            return res.status(400).json({ errors: errors.array()[i] });
            // res.send(errors.array().[i])

         }
      } else {

         
         const hash = await bcrypt.hash(req.body.password, salt,)
         const user = userModel({
            name: req.body.username,
            email: req.body.eaddress,
            password: hash
         })

         user.save()

            const data = {
               user: {
                  user: user.id
               }
            }
            const authtoken = jwt.sign(data, JWT_SIGNETURE)
            
         return res.json({ success: 'registered', authtoken}) 




      }
   })










router.post('/login',
   // username must be an email
   body('username').not().isEmpty().withMessage("username or password is empty").custom(async (value, { req }) => {

      if (await nameFinder(value) === false) {
         throw new Error('name or password must be wrong')
      }
      return true;
   }),
   // password must be at least 5 chars long
   body('password').not().isEmpty().withMessage("email or password is empty"),



   async (req, res) => {






      const errors = validationResult(req);

      if (!errors.isEmpty()) {

         for (var i = 0; i < 1; i++) {
            return res.status(400).json({ errors: errors.array()[i] })

         }

      }

      try {
         bcrypt.compare(req.body.password, await hashFinder(req.body.username), function (err, result) {
            if (result === true) {
               return res.status(200).json({ success: 'logged in' })
            } else {
               return res.status(400).json({ error: 'email or password must be wrong' })
            }
         });

      } catch (error) {
         return error
      }










      // else {

      //    return res.status(200).json({ success: "logged in" });

      // }



   }


);


// router.post('/logout', (req, res) => {
//    req.session.destroy()
//    res.redirect('/login')

// })



// router.get('*', (req, res) => {
//    res.redirect('/')
// })





module.exports = router;