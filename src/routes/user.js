// const express = require('express');
// const {User} = require('../db/models/user.js'); 
// const {auth} = require('../middleware/auth'); 
// const jwt = require('jsonwebtoken'); 
// const bcrypt = require('bcryptjs'); 
// // const {PasswordReset} = require('package'); '../email/mail'

// const UserRouter = new express.Router()


// UserRouter.post('/users', async (req, res)=>{
//     const user = new User(req.body)
//     try {
//         await user.save()
//         const token = await user.generateAuthToken()
//         res.status(201).send({user, token})
//     } catch (error) {
//         res.status(406).send({ error: error.message})
//     }
// })

// UserRouter.post('/users/login', async (req, res) =>{
//     try {
//         const user = await User.findByCredentials(req.body.email, req.body.password)
//         const token = await user.generateAuthToken()
//         res.send({user, token})
//     } catch (error) {
//         res.status(406).send({ error: error.message})
//     }
// })


// // UserRouter.get('/users/me', auth, async (req, res) =>{
// //     res.send(req.user)
// // })

// UserRouter.patch('/users/me', auth, async (req, res) =>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates= ["password"];
//     const isValidOperation = updates.every((update) =>{
//         return allowedUpdates.includes(update)
//     })
//     if(!isValidOperation){
//         return res.status(400).send("Invalid")
//     }
//     try {
//         updates.forEach((update) => req.user[update] = req.body[update])
//         await req.user.save()
//         res.send(req.user)
//     } catch (error) {
//         res.status(400).send({ error: error.message})
//     }
// })

// UserRouter.delete('/users/me', auth, async (req, res) =>{

//     try {
//         await req.user.remove()
//         res.send(req.user)
//     } catch (error) {
//         res.status(500).send({ error: error.message})
//     }
// })


// UserRouter.post('/users/passreset', async (req, res) =>{
//     console.log(req.body);
//     try {
//         const user = await User.findOne({email: req.body.email})
//         if(!user){
//             return res.status(404).send("User with this email does not exist")
//         }
//         const token = jwt.sign({ _id: user._id.toString()}, 'webappprojekt', {expiresIn: '1h'})
//         await PasswordReset(req.body.email, token)
//         return res.status(200).send("Check your email inbox")
//     } catch (error) {
//         return res.status(400).send(error) 
//     }
    
// })

// UserRouter.post('/users/passreset/:token', async (req, res) =>{
//     console.log(req.body.password);
//     try {
//         const decoded = jwt.verify(req.params.token, 'webappprojekt')
//         const user = await User.findOne({_id: decoded._id})
//         if(!user){
//             throw new Error()
//         }
//         user.password = req.body.password
//         console.log("user pass", user.password);
//         await user.save()
//         return res.status(201).send(user) 
//     } catch (error) {
//         return res.status(400).send({ error: error.message})
//     }
// })




// exports = {UserRouter}