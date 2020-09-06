// Update with your config settings.

const {client, database, user, password} = require('./.env')

module.exports = {


    client: client,
    connection: {
      database: database,
      user:  user,
      password: password
    

    }
}
