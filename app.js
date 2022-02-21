const express = require('express');
const app = express();
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
//app.use(methodOverride('_method'))

const plannerRoutes = require('./routes/planner')

const yelp = require('yelp-fusion')

const apiKey = '1dTgDkb9wviaRzrO8lkUYpLNZDwKiTXaA1hA244ln2oHLBBWE9_jqdn_lksJn5jVgXBAhwueXqwBADSNGqnLLR4r7163c3FHRgZ7L4ih1g6hv7jCptvbOakV2u_1YXYx'



const client = yelp.client(apiKey);



app.get('/', (req, res) => {
    res.render('home')
  })

  // Render the planner form
app.get('/form', (req, res) => {

  res.render('plannerForm')
})


  app.post("/planner", (req, res) =>{
   // console.log(req.body)

   
    const searchRequest = {
      term: 'restaurants',
      location: req.body.location,
     // latitude: '43.75760726547434',
     // longitude: '-79.59891379095171',
      radius: req.body.distance,
      sort_by: 'rating',
      limit: 5
    
    };

    //limit 20
    //create an array of top 5
    //delete one 

client.search(searchRequest)
.then((response) => {
  
 // console.log(response.jsonBody.businesses[1].categories);
app.locals.resturaunts = response.jsonBody.businesses

 res.render('plan')
})
.catch((error) => {
  console.log(error);
  
})

  }) 

  app.post('/planner/:j' ,  (req, res) => {
    const i= +req.params.j 
const resturaunt =  req.app.locals.resturaunts[i]
console.log(resturaunt)
  
  
//console.log(resturaunt)
res.render('show', {resturaunt})


})

//  app.get("/plannerTest", (req, res) =>{
//    console.log(req.app.locals)
 // res.render('test')
//  })

  //app.use("/planner", plannerRoutes);


app.listen(3000, () => {
    console.log(`Serving on port 3000`)
})