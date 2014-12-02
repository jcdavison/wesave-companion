express = require('express')
cors = require('cors')
bodyParser = require('body-parser')
url = require('url')

app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.set 'port', process.env.PORT || 5000
app.use express.static(__dirname + '/public')

mongodb = require('mongodb')
mongojs = require('mongojs')
dbLocation = process.env.MONGOLAB_URI || 'mongodb://localhost/wesave-companion'; 
db = mongojs(dbLocation)
transactions = db.collection 'transactions'
transactions.ensureIndex({"item_id": 1}, {unique: true})

app.get '/', (request, response) -> 
  response.send 'heyyyy yahhhhh!'

app.post '/transactions', (req, resp) ->
  transaction = buildTransaction req.query
  createTransaction transaction
  resp.status = 200
  resp.send 'ok'

app.get '/transactions', (request, response) ->
  transactions.find (error, docs) =>
    response.send docs: docs

createTransaction = (transaction, user) ->
  transactions.insert transaction, (err, doc) =>
    return err if err
    return doc if doc 

buildTransaction = (transactionData) ->
  user_id: transactionData['user_id'], item_id: transactionData['item_id'], date: transactionData['date'], amount: transactionData['amount']

app.listen app.get('port'), () ->
  console.log 'node is running on localhost:' + app.get 'port'
