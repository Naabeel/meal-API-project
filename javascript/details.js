// fetching all the required varables/fields to add interactions,functionalities and events
var image = document.getElementById("pic");
var dishName = document.getElementById("dish-name");
var category = document.getElementById("dish-category");
var cuisine = document.getElementById("dish-cuisine");
var recipeLink = document.getElementById("youtube-link");

var recipe = document.getElementById("cooking-directions");
var ingredients = document.getElementById("ingredients-list");
var responseJSON;

//let foodName;

// using session storage to show the details of dish searched on homepage
if (sessionStorage.length == 2) {
    foodName = sessionStorage.key(1);
} else {
    foodName = sessionStorage.key(0);
}

console.log(foodName);


// creating a new http request and fetching the meal  API
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + foodName);
xhr.send();

xhr.onload = function () {
    // collecting  json responses from API
    responseJSON = JSON.parse(xhr.response);
    console.log(responseJSON);
    var imgURL = responseJSON.meals[0].strMealThumb;
    image.setAttribute('src', imgURL);

    dishName.innerText = responseJSON.meals[0].strMeal;
    category.innerText = responseJSON.meals[0].strCategory;
    cuisine.innerHTML = responseJSON.meals[0].strArea;
    recipeLink.innerHTML = responseJSON.meals[0].strYoutube;
    recipe.innerText = responseJSON.meals[0].strInstructions;

    var linkYT = responseJSON.meals[0].strYoutube;
    recipeLink.setAttribute('href', linkYT);
    recipeLink.setAttribute('target', '_blank');

    //  for(let i = 0;   ; i++)
    // let i = 0;

    // while (responseJSON.meals[0].strIngredient + i != "") {
    //     console.log(responseJSON.meals[0].strIngredient + i );
    //     i++;
    // }

    // list of ingredients
    var meal = responseJSON.meals[0];
     var strIngredient = Object.keys(meal).filter((nb) => nb.includes("strIngredient")).reduce((obj, nb) => {
        //console.log(Object);
        return Object.assign(obj, {
         [nb]: meal[nb]});
        }, {});
      if(Object.values(strIngredient) != ''){
    //   console.log(Object.values(ing));
    };

 





    // getting all the ingredients measure 
    var quantity = Object.keys(meal).filter((nb) => nb.includes("strMeasure")).reduce((obj, nb) => {

        return Object.assign(obj, {
            [nb]: meal[nb]});
        }, {});

            if(Object.values(quantity) != ''){
            console.log(Object.values(quantity));
          };




          // adding all the Ingredients and Measure of ingredients in the list
    for (let name in Object.values(strIngredient)) {
        if(Object.values(strIngredient)[name] != "" && Object.values(strIngredient)[name] != null){
            let element = document.createElement('li');
            element.style.width = "100%";
            element.style.fontSize = "1.2em"
            element.style.marginBottom = "25px";
            element.innerText = Object.values(strIngredient)[name] + "  ----  " + Object.values(quantity)[name];
            ingredients.appendChild(element);
            //console.log(Object.values(strIngredient)[name]);
        }
        
    }


};

