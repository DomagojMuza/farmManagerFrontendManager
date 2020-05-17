const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Field} = require('../models/field')
const {Activity} = require('../models/activity')

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Enter email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Enter password'],
        trim: true,
        minlength: [8, 'Password too short'],
        validate(val){
            if(val.toLowerCase().includes('password')){
                throw new Error("Your password cannot conatain 'password'")
            }
        }
    },
    username:{
        type: String,
        unique: true,
        required: [true, 'Enter username'],
        trim: true,
        lowercase: true,
        minlength: [5, 'Username too short'],
        validate(val){
            if(val.toLowerCase().includes('username')){
                throw new Error("'Your username cannot conatain 'username'")
            }
        }
    },
}, {
    timestamps: true
})

//virtualno polje za fields koje se nalazi na useru
UserSchema.virtual('fields',{
    ref: 'Field', //veza prema kojem modelu
    localField: '_id', //preko kojeg atributa se povezuju, field sprema _id usera, znaci preko _id-a
    foreignField: 'owner' //naziv atributa u Field koji sadrži _id korisnika
})

UserSchema.virtual('activities', {
    ref: 'Activity',
    localField: '_id',
    foreignField: 'owner'
})


UserSchema.methods.generateAuthToken = async function(){
    const user = this
    console.log("GEN TOKEN", user._id);
    const token = jwt.sign({ _id: user._id.toString()}, 'webappprojekt', {expiresIn: '10h'})
    return token
}

UserSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject

}


UserSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    console.log(password);
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch);
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

//Hesirana lozinka prije save-a
UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) 
        next(new Error('User with this email already exists'));
    else next(error);
});

UserSchema.pre('remove', async function(next){
    const user = this
    await Field.deleteMany({owner: user._id})
    await Activity.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', UserSchema)


exports = {User}