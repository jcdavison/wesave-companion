// Generated by CoffeeScript 1.6.3
(function() {
  var app, bodyParser, buildTransaction, cors, createTransaction, db, dbLocation, express, mongodb, mongojs, transactions, url;

  express = require('express');

  cors = require('cors');

  bodyParser = require('body-parser');

  url = require('url');

  app = express();

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(cors());

  app.set('port', process.env.PORT || 5000);

  app.use(express["static"](__dirname + '/public'));

  mongodb = require('mongodb');

  mongojs = require('mongojs');

  dbLocation = process.env.MONGOLAB_URI || 'mongodb://localhost/wesave-companion';

  db = mongojs(dbLocation);

  transactions = db.collection('transactions');

  transactions.ensureIndex({
    "item_id": 1
  }, {
    unique: true
  });

  app.get('/', function(request, response) {
    return response.send('heyyyy yahhhhh!');
  });

  app.post('/transactions', function(req, resp) {
    var transaction;
    transaction = buildTransaction(req.query);
    createTransaction(transaction);
    resp.status = 200;
    return resp.send('ok');
  });

  app.get('/transactions', function(request, response) {
    var _this = this;
    return transactions.find(function(error, docs) {
      return response.send({
        docs: docs
      });
    });
  });

  createTransaction = function(transaction, user) {
    var _this = this;
    return transactions.insert(transaction, function(err, doc) {
      if (err) {
        return err;
      }
      if (doc) {
        return doc;
      }
    });
  };

  buildTransaction = function(transactionData) {
    return {
      user_id: transactionData['user_id'],
      item_id: transactionData['item_id'],
      date: transactionData['date'],
      amount: transactionData['amount']
    };
  };

  app.listen(app.get('port'), function() {
    return console.log('node is running on localhost:' + app.get('port'));
  });

}).call(this);
