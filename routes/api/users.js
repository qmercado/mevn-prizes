const { Router, response } = require('express')
const bcrypt = require('bcrypt')
const User = require('../../models/User')
const router = Router()
const jwt = require('jsonwebtoken')
const saltRounds = 10

router.get('/', async (req, res) => {
  try {
      const users = await User.find()
      if (!users) throw new Error('You may have entered an invalid username and password.')
      const sorted = users.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      res.status(200).json(sorted)
  } catch (err) {
      res.status(500).json({message: err.message })
  }
  
})

router.post('/register', async (req, res) => {

  const { username, password } = req.body
  const existingUser = await User.findOne({ username })
  
  if (existingUser) {
    return res.json({ err: 'user already exists' }).status(401)
  } else {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      password: hashedPassword
    })
    await user.save();
    res.json(user).status(201)
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const { _id, password: userPassword } = await User.findOne({ username })
  const match = await bcrypt.compare(password, userPassword)
  if (match) {
    const token = await jwt.sign({ username, _id }, 'secret')
    return res.json({ token })
  }
  res.status(401)
})

module.exports = router;