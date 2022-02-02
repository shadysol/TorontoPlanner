const express = require('express');
const { home } = require('nodemon/lib/utils');
const app = express();
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('home')
  })

app.get('/planner', (req, res) => {

    res.render('plannerForm', )
  })

app.post('/plannerForm', (req, res) => {
  const test = req.body.location
  console.log(test)
 // res.render('show',{location})
 //console.log({location})
} )

app.listen(3000, () => {
    console.log(`Serving on port 3000`)
})