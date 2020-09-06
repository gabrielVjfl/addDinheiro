const express = require('express')

const knex = require('../database')

const bcrypt = require('bcryptjs')

const passwordHash = require('password-hash')

const jwt = require('jsonwebtoken')

const {authSecret} = require('./secret.env')

function gerarToken(params = {}) {
    return jwt.sign(params, authSecret, {
          expiresIn: 86400
    })
 }

module.exports = {
    async insertUser(req,res) {

        const errorsInsertUsers = []
        const sucInsertUsers = []
        
        console.log(errorsInsertUsers)
        
        // VALIDAÇÕES -- REQ.BODY
        
        if(req.body.password.length < 6 || req.body.password == "") {
            res.status(400).send({errPassSignup: 'A Senha tem que ter mais do que 5 caracteres'})
            errorsInsertUsers.push('A senha tem que ter mais do que 5 caracteres')
        }
        else if(req.body.nome_user.length < 3 || req.body.nome_user == "") {
              res.status(400).send({errNomeSignup: 'O nome tem que ter no minimo 3 caracteres'})
              errorsInsertUsers.push("O nome tem que ter no minimo 3 caracteres")
        }
        else {

        const salt = await bcrypt.genSalt()

      //  const hashPassword = await bcrypt.hash(req.body.password, 10)

     const hash = await bcrypt.hash(req.body.password, salt)
     //  password = hash

   


            const users = {
                 nome_user: req.body.nome_user,
                 email: req.body.email,
                 password: hash,
            }
        
            const {exists} = await knex.select().table('users').where('email', req.body.email)
            .count('* AS exists').first()
        
            if(exists) {
                res.status(400).send("Email ja cadastrado no nosso sistema")
            }
        
            else {
              await knex.insert(users).table('users').then(response => {
                    console.log(response)
        
                    res.status(200).send({users, token: gerarToken({id: users.idusers})})
                   
        
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send({err: 'Ocorreu um erro'})
                })
    }
    }
},
  async login(req,res) {
    const  {email, password} = req.body

try {
     // ver se tem email cadastrado
     let users = await knex.select().table('users').where({email}).first()


     if(!users) {
     res.status(400).send({err: 'Usuario não encontrado!'})
    }
   
  bcrypt.compare(password, users, (err, batem) => {
      if(batem) {
          res.status(200).send({suc: 'Senha valida'})
      }
      else {
          res.status(400).send({err: 'Senha invalida'})
      }
  })

    
    }

   catch(err) {
    
     return res.status(400).send({err: "Não deu"})
 }
    

},

     async select(req,res) {
     
        await knex.select(['idusers', 'nome_user', 'email', 'carteira.nome', 'carteira.valor'])
        .table('users').innerJoin('carteira', 'carteira.users_idusers', 'users.idusers')
        .then(response => {
            console.log(response)
            res.status(200).send({response})

        }).catch(err => {
            console.log(err)
            res.status(400).send({err})
        })
},
async selectTotal(req,res) {

    const {idusers} = req.params
     
    await knex.select(['idusers', 'nome_user', 'email', 'carteira.nome', 'carteira.valor'])
    .table('users').innerJoin('carteira', 'carteira.users_idusers', 'users.idusers')
    .where('idusers', idusers)
    .then(response => {
        console.log(response)
        res.status(200).send({response})

    }).catch(err => {
        console.log(err)
        res.status(400).send({err})
    })
},
async selectQuery(req,res) {

    const {idusers} = req.query
     
    await knex.select(['idusers', 'nome_user', 'email', 'carteira.nome', 'carteira.valor'])
    .table('users').innerJoin('carteira', 'carteira.users_idusers', 'users.idusers')
    .where('idusers', idusers)
    .then(response => {
        console.log(response)
        res.status(200).send({response})

    }).catch(err => {
        console.log(err)
        res.status(400).send({err})
    })
},
async emails(req,res) {
    await knex.select('email').table('users').then(response => {
        console.log(response)
        res.status(400).send(response)


    }).catch(err => {
        console.log(err)
        res.status(200).send(err)
    })
}

}