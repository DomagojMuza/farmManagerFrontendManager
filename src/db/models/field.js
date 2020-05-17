const mongoose = require('mongoose');


const FieldSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Enter name'],
        trim: true
    },
    area: {
        type: Number,
        required: [true, 'Enter area'],
        trim: true,
        validate(val) {
            if(val <= 0){
                throw new Error("Field area must be greater than zero!")
            }
        }
    },
    unit: {
        type: String,
        required: [true, 'Enter unit'],
    },
    culture: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
})

// FieldSchema.virtual('fieldActivities', {
//     ref: 'Activity',
//     localField: '_id',
//     foreignField: 'field'
// })

const Field = mongoose.model('Field', FieldSchema)


module.exports = {Field}