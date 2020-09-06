const PORT = 900

const express = require('express')

const app = express()

const cors = require("cors")

const route = require('./routes/route')

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use('/api', route)


app.listen(PORT, () => {
    console.log('Rodando na porta', PORT)
})