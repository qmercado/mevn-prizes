const { Schema, model } = require('mongoose')

const PrizeItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
     }
)

const PrizeItem = model('prizeitems', PrizeItemSchema)

module.exports = PrizeItem