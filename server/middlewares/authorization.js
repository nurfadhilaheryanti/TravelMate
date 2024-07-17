// const {User, Cuisine} = require('../models')

// const authorizationStaff = async (req, res, next) => {
//   try {
//     //cek rolenya apa
//     const {authorId, role} = req.loginInfo
//     const {id} = req.params

//       const user = await User.findByPk(authorId)
//       if (!user) throw {name: 'Forbidden'} 
//       const cuisine = await Cuisine.findByPk(id)

//       if(!cuisine) throw {name: 'NotFound'}

//       if(cuisine.authorId !== user.id) throw {name: 'Forbidden'} 
//     next()
//   } catch (error) {
//     next(error)
//   }
// }


// const authorizationAdmin = async (req, res, next) => {
//   try {
//     //cek rolenya apa
//     const {role} = req.loginInfo
//     if (role !== 'Admin') throw {name : "Forbidden"}
//     next()
//   } catch (error) {
//     next(error)
//   }
// }



// module.exports = {authorizationStaff, authorizationAdmin}