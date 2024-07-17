const { User } = require('../models')
const axios = require('axios')
const { compare } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class AuthController {

  static async register(req, res, next) {
    try {
      // console.log(req.body);
      const { email, password, username, fullName, gender, dob } = req.body
      const user = await User.create({ email, password, username, fullName, gender, dob })

      res.status(201).json({
        message: 'Success create new user',
        id: user.id,
        email: user.email
      })
    } catch (error) {
      console.log(error);
      next(error) //400
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email || !password) throw { name: "InvalidLogin" } //401

      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) throw { name: "LoginError" } //401

      if (!compare(password, user.password)) throw { name: "LoginError" }

      const payload = {
        id: user.id,
        email: user.email,
      }
      console.log(payload)
      
      const token = signToken(payload)
      // console.log(token);

      res.status(200).json({
        token,
        email: user.email, 
        id: user.id
      })

    } catch (error) {
      next(error)
    }
  }

  static async googleLogin(req, res, next) {
    try {
        const { token } = req.headers
        const client = new OAuth2Client();

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        // console.log(payload)

        const [user, created] = await User.findOrCreate({
            where: {
                email: payload.email
            },
            defaults: {
                fullName: payload.name,
                username:"xx",
                gender: 'female',
                dob: "2020-11-01",
                email: payload.email,
                password: "password_google",
                imgUrl: "https://i.pinimg.com/736x/3e/66/aa/3e66aa5ecb96e60573a8bca17799c5d1.jpg"
            },
            hooks: false
        })

        const access_token = signToken({
            id: user.id,
            email: user.email,
        })

        res.status(200).json({ access_token })
    } catch (err) {
        console.log(err);
        next(err)
    }
}


}

module.exports = AuthController