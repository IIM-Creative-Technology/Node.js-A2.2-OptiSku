import express from 'express'
const router = express.Router()

export default router.get('/', (req,res) => {
    res.json({
        firstName: "Opti",
        lastName: "Skuu",
        email: "optiskuu@gmail.com"
    })
})

router.post('/', (req,res) => {
    console.log(req.body)
})