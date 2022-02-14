const express = require('express');
const app = express();
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));


const yelp = require('yelp-fusion')

const apiKey = '1dTgDkb9wviaRzrO8lkUYpLNZDwKiTXaA1hA244ln2oHLBBWE9_jqdn_lksJn5jVgXBAhwueXqwBADSNGqnLLR4r7163c3FHRgZ7L4ih1g6hv7jCptvbOakV2u_1YXYx'

const searchRequest = {
  term: 'restaurants',
  location: '7 Grenville Street, Toronto',
 // latitude: '43.75760726547434',
 // longitude: '-79.59891379095171',
  radius: 500,
  sort_by: 'rating',
  limit: 5

};

const client = yelp.client(apiKey);





app.get('/', (req, res) => {
    res.render('home')
  })

app.get('/planner', (req, res) => {

    res.render('plannerForm', )
  })

  app.post('/planner', (req, res) => {


    client.search(searchRequest)
  .then((response) => {
    var resturaunts = [];
    console.log(response.jsonBody.businesses[1].categories);
     resturaunts = response.jsonBody.businesses
    res.render('plan', {resturaunts})
  })
  .catch((error) => {
    console.log(error);
  });
   
  })



 



app.listen(3000, () => {
    console.log(`Serving on port 3000`)
})