const { Router, response } = require('express')

const PrizeItem = require('../../models/PrizeItem')

const router = Router()

// Get Prizes
router.get('/', async (req, res) => {
    try {
        const prizeItems = await PrizeItem.find()
        if (!prizeItems) throw new Error('No available prize item.')
        const sorted = prizeItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
    
})

// Get Prize By ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const prizeItem = await PrizeItem.findById(id)
        if (!prizeItem) throw new Error('Invalid prize item ID.')
        res.status(200).json(prizeItem)

    } catch (err) {
        res.status(500).json({message: err.message })
    }
})


// Add Prize Item
router.post('/', async (req, res) => {
    const newPrizeItem = new PrizeItem(req.body)
    try {
        const addedPrizeItem = await newPrizeItem.save()
        if (!addedPrizeItem) throw new Error('Something went wrong adding prize item.')
        res.status(200).json(addedPrizeItem)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
})

// Update Prize Item
router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await PrizeItem.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('Something went wrong updating prize item.')
        const updatedPrizeItem = { ...response._doc, ...req.body }
        res.status(200).json(updatedPrizeItem)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
})

// Delete Prize Item
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleted = await PrizeItem.findByIdAndDelete(id)
        if (!deleted) throw new Error('Something went wrong updating prize item.')
        res.status(200).json(deleted)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
})

module.exports = router