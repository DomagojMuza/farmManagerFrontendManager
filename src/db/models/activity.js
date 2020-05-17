const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    description:{
        type: String,
        trim: true,
        minlength: 10,
        required: [true, 'Enter description'],
    },
    expense: {
        type: Number,
        default: 0,
        validate(val){
            if(val < 0){
                throw new Error('Exense cannot have negative value')
            }
        }
    },
    scheduledAt:{
        type: Date,
        default: Date.now()
    },
    reminder:{
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User' //sa kojim modelom se povezuje
    },
    field:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field' //sa kojim modelom se povezuje
    }
},{
    timestamps: true
})

ActivitySchema.pre('save', async function(next){
    const activity = this
    activity.description = activity.description.replace(/  +/g, ' ');

    next()
})

const Activity = new mongoose.model('Activity', ActivitySchema)

module.exports = {Activity};