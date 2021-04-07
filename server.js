require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const axios = require('axios');
const app = express();
let flag = false;
let recipesArray;
let recipesIng;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));






app.get('/',(req, res)=>{

            //SECRET=4f3b3dc8919940b7af9fa18b69a03ebf  - API KEY CODE .env file
            let urlName =`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SECRET}`;
            
            axios.get(urlName)
          .then(function(response){
            recipesArray = response.data.recipes[0];
            recipesIng = response.data.recipes[0].extendedIngredients;
              res.render('recipes', {rec: recipesArray, ing: recipesIng, clk: flag});
              flag=false;
        })
          .catch(function(error){
              console.log(error);
          });
        }
);
app.post('/peek',(req, res)=>{
  console.log('click');
  flag=true;
  res.redirect('/');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
