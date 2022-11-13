let favList = document.getElementById('fav-list');


// used local storage for the dishes saved in favourites and traversing on it for showing on the viewport

for(let i = 0; i< localStorage.length; i++){
    localStorage.getItem(localStorage.key(i));
    //console.log(localStorage.key(i));

let imgDiv = document.createElement('li');
let imgDish = document.createElement('img');
let favIcon = document.createElement('i');
let removeList = document.createElement('p');
removeList.style.marginLeft='88%';
removeList.style.marginTop= '-140px';
removeList.style.color= 'white';
removeList.style.fontSize='18px';
removeList.innerText='Remove from Favourites';

// favIcon.style.height='200px';
// favIcon.style.width='40px';


favIcon.setAttribute('class','fa-solid fa-heart');
imgDiv.setAttribute('class', 'image-container');
imgDish.setAttribute('class', 'image-id');
imgDish.setAttribute('src', localStorage.getItem(localStorage.key(i)));
imgDiv.appendChild(imgDish);


// favList.appendChild(imgDiv);


//creating an html alement to fetch the itemName through javascript
let foodName= document.createElement('p');
foodName.style.marginLeft='66%';
foodName.style.marginTop= '-73px';
foodName.style.color= 'white';
foodName.style.fontSize='40px';

foodName.innerText = localStorage.key(i);
imgDiv.appendChild(foodName);
favIcon.style.color= 'red';

//adding the nodes to the div 
imgDiv.appendChild(favIcon);
imgDiv.appendChild(removeList);
//appending the items in the main div
favList.appendChild(imgDiv);

// delete event to remove favourite items taht were stored persistently
favIcon.addEventListener('click', function(){
    localStorage.removeItem(foodName.innerText);
    location.reload();

});




}