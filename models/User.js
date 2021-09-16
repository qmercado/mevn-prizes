const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        /* fullname: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            required: false
        }, */
        dateCreated: {
            type: Date,
            default: Date.now()
        }
     }
)

const user = model('users', UserSchema)

module.exports = user