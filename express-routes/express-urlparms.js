const express = require('express') 
const app = express() 
const bodyparser = require('body-parser')
app.use(bodyparser.json())

let profile = {
  username: 'chris',
  email: 'csmith@productventures.com',
  url: 'http://www.productventures.com'
}

app.get('/profile', (req, res)=>{
  res.send(profile)
})

app.post('/profile', (req, res) => {
  console.log(`[POST] ${req.body}`)
  profile.push(req.body);
  res.sendStatus(201)
})

app.put('/profile/:id', (req, res)=>{
  console.log(`[PUT] ${req.params.id} , ${req.body}`)
  Object.assign(profile[req.params.id], req.body)
  res.sendStatus(204)
})

app.delete('/profile/:id', (req, res)=>{
  profile.splice(req.params.id, 1);
  res.sendStatus(204)
})

app.listen(3000)