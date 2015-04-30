
Sequelize = require 'sequelize'
seq = new Sequelize 'seq', 'seq', 'seq',
    dialect: 'mysql'
    port: 3306
    define:
      charset: 'utf8'

Book = seq.define 'book',
  author: Sequelize.STRING
  title:
    type: Sequelize.STRING
    allowNull: false
  ISBN:
    type: Sequelize.INTEGER(11).UNSIGNED
    allowNull: false
  kind:
    type: Sequelize.ENUM
    values: ['history', 'computer']
, tableName: 'books'

Person = seq.define 'user',
  name:
    type: Sequelize.STRING
    allowNull: false
  age: Sequelize.INTEGER(10).UNSIGNED
  address: Sequelize.STRING
, tableName: 'users'

seq.sync
  force: true
.complete (err)->
  if !!err
    console.log "unable to connecto to the database #{err}"
  else
    console.log "connection has benn established successflly"
    Book.create
      author: "Hoon"
      title: "Node.js"
      ISBN: 400
      kind: 'history'
    .success (result)->
      console.log result.values
      Book.create
        author: "Hoon1"
        title: "angular.js"
        ISBN: 401
        kind: 'computer'
