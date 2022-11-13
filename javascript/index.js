var search = document.getElementById("search-icon");
var image = document.getElementById("image");
var favourite = document.getElementById("fav-btn");

let foodName, imgURL;

var fetchfood = function () {
   sessionStorage.clear();


   // creating a http request to call the API and fetch responses
   var xhrRequest = new XMLHttpRequest();

   xhrRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + document.getElementById("searchbar").value, true);


   xhrRequest.onload = function () {
      console.log(document.getElementById("searchbar").value);
      console.log('https://www.themealdb.com/api/json/v1/1/search.php?s=' + document.getElementById("searchbar").value)

      let responseJSON = JSON.parse(xhrRequest.response);
      foodName = responseJSON.meals[0].strMeal;
      sessionStorage.setItem(foodName, true);
      console.log(responseJSON);

      imgURL = responseJSON.meals[0].strMealThumb;
      // console.log(imgURL[0].strMeal);
      // image.attr('src', imgURL);
      // var image = document.getElementById('image');
      image.setAttribute('src', imgURL);
   };

   xhrRequest.send();
};



if (search) {
   search.addEventListener('click', fetchfood);
}




// when key is pressed we insert elements for auto suggestions

let searchbox = document.getElementById("searchbar");
searchbox.addEventListener('keyup', function() {
   if (document.getElementById('suggestions-list').hasChildNodes) {

      while (document.getElementById('suggestions-list').firstChild) {
         document.getElementById('suggestions-list').firstChild.remove();
      }
   }


   var xhrRequest = new XMLHttpRequest();

   xhrRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + document.getElementById("searchbar").value, true);

   //let value = searchbox.value;
   xhrRequest.send();
   xhrRequest.onload = function () {

      let responseJSON = JSON.parse(xhrRequest.response);
      for (let i = 0; i <= 6; i++) {
         console.log(responseJSON);
         //adding a suggesttions list on the searchbar to ease the user to select an suggested item 

         let list = document.createElement('li');
         list.innerText = responseJSON.meals[i].strMeal;
         list.style.height = '20px';
         list.style.width = '100%';
         list.style.backgroundColor = 'white';
         list.style.fontSize = '16px';
         list.style.fontWeight = '600';
         list.style.textDecoration = 'none';


         list.addEventListener('mouseover', function () {
            list.style.backgroundColor = 'lightgrey';
            list.style.cursor = 'pointer';

         });

         list.addEventListener('mouseleave', function () {
            list.style.backgroundColor = 'white';

         });

         list.addEventListener('click', function () {
            searchbox.value = list.innerText;
            if (document.getElementById('suggestions-list').hasChildNodes) {

               while (document.getElementById('suggestions-list').firstChild) {
                  document.getElementById('suggestions-list').firstChild.remove();
               }
            }

         });


         document.getElementById('suggestions-list').appendChild(list);
      }
   }
});





//added event to change the colour of the favourite icon when clicked and to set the item in the local storage
if (document.getElementById("btn-2")) {
   document.getElementById("btn-2").addEventListener('click', function () {
      if (favourite.style.color === 'white') {
         favourite.style.color = 'red';
         
         localStorage.setItem(foodName, imgURL);
      }
      else {
         favourite.style.color = 'white';
         localStorage.removeItem(foodName);
      }

   });
}


