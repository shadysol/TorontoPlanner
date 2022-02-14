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
  term: 'food',
  latitude: '43.75760726547434',
  longitude: '-79.59891379095171',
  radius: 2000,
  sort_by: 'rating'

};

const client = yelp.client(apiKey);





app.get('/', (req, res) => {
    res.render('home')
  })

app.get('/planner', (req, res) => {

    res.render('plannerForm', )
  })

  app.post('/plannerForm', (req, res) => {


    client.search(searchRequest)
  .then((response) => {
    console.log(response.jsonBody);
  })
  .catch((error) => {
    console.log(error);
  });
    //res.render('plannerForm', )
  })



 



app.listen(3000, () => {
    console.log(`Serving on port 3000`)
})