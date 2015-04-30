

# get modules
fs = require 'fs'
http = require 'http'
util = require 'util'

# set variables
targetFile = './assets/big2.txt'

http.createServer((req, res) ->
  readable = fs.createReadStream targetFile

  readable.pipe res

  readable.on 'error', res.destroy.bind res
  res.on 'error', readable.destroy.bind res
  
  return
  
).listen 8080

http.createServer((req, res) ->
  fs.readFile targetFile, (err, result) ->
    res.end new Buffer result
).listen 8081

getMem = (msg)->
  memUsg = (process.memoryUsage().rss / (1024 * 1024)).toFixed(2)
  console.log "[#{new Date}] rss: #{memUsg} Mb"

garbageCollect = gc || ->

# setInterval(->
#   garbageCollect()
#   getMem()
#   return
# , 5000)

# wrk -t12 -c200 -d30s http://localhost:8000
# wrk -t12 -c200 -d30s http://localhost:8001
