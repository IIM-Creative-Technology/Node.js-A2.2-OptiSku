import express from 'express'
const router = express.Router()
let currentFName = ""
let currentLName = ""
let currentEmail = ""

export default router.get('/', (req,res) => {
    res.json({
        firstName: currentFName,
        lastName: currentLName,
        email: currentEmail
    })
})

router.post('/', (req,res) => {
    // console.log(req.body.firstName)
    currentFName = req.body.firstName
    currentLName = req.body.lastName
    currentEmail = req.body.email
    res.json({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })
})