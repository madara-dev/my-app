

const { userModel, nameFinder, emailFinder, hashFinder } = require('./mongoose/mongo')
const express = require('express')
const router = express.Router()
// const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const salt = 10;

const JWT_SIGNETURE = 'sign'
// const db = require('./config/realtimeseason')
const { validationResult, body, } = require('express-validator')


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
         // let Authid = []


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
    
         res.json({success: 'logged in', authtoken})

         




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