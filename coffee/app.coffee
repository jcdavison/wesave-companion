express = require 'express'
app = express()

app.set 'port', process.env.PORT || 5000
app.use express.static(__dirname + '/public')

app.get '/', (request, response) -> 
  response.send 'heyyyy yahhhhh!'

app.listen(app.get('port'), () ->
  console.log 'node is running on localhost:' + app.get 'port')
