const express = require('express');

const knex = require('../database')

module.exports = {
    async insertMoney(req,res) { // passar req.params do id para salvar

        const {users_idusers} = req.params

        const money = 
        {nome: req.body.nome,
             valor: req.body.valor,
              users_idusers: users_idusers
            }

        await knex.insert(money).where('users_idusers', users_idusers).table('carteira').then(response => {
            console.log(response)

            res.status(200).send({response})

        }).catch(err => {
            console.log(err)

            res.status(400).send({err})

        })
    },
    async insertMoney2(req,res) {

        const money = {nome, valor, users_idusers} = req.body
        
        await knex.insert(money).table('carteira').then(response => {
            console.log(response)

            res.status(200).send({response})

        }).catch(err => {
            console.log(err)

            res.status(400).send({err})

        })
},
async insertQuery(req,res) { // passar req.params do id para salvar

    const {users_idusers} = req.query

    const money = 
    {nome: req.body.nome,
         valor: req.body.valor,
          users_idusers: users_idusers
        }

    await knex.insert(money).where('users_idusers', users_idusers).table('carteira').then(response => {
        console.log(response)

        res.status(200).send({response})

    }).catch(err => {
        console.log(err)

        res.status(400).send({err})

    })
},

}
