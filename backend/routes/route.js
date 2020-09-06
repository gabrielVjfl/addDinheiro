const express = require('express')

const userController = require('../controllers/userControllers')
const dinheiroControllers = require('../controllers/dinheiroController')

const route = express()


route.post('/users/insert', userController.insertUser)
route.post('/money/insert/:users_idusers', dinheiroControllers.insertMoney)
route.post('/money/insert2', dinheiroControllers.insertMoney2)
route.post('/money/insertquery', dinheiroControllers.insertQuery)
route.get('/users/dinheiro', userController.select)
route.get('/users/dinheiroTotal/:idusers', userController.selectTotal)
 route.post('/users/login', userController.login)
route.get('/users/dinheiroTotal/', userController.selectQuery)
route.get('/users/email', userController.emails)
module.exports = route
