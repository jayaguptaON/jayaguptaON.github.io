// const BREEDS_URL = 'https://dog.ceo/api/breeds/image/random';

//  function addDog() {
//      fetch(BREEDS_URL) //this is AJAX
//      .then(function(response) {
//          return response.json();
//      })
//      .then(function(data) {
//          const img = document.createElement('img');
//          img.src = data.message;
//          img.alt = 'Cute dog';
        
//          document.querySelector('.doggos').appendChild(img);
//      })
// }

// document.querySelector('.add-dog').addEventListener('click', addDog);

//Make dropdown menu
const BREEDSLIST_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');

fetch(BREEDSLIST_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const breedsArray = Object.keys(data.message);

        for (let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement('option');
            option.value = breedsArray[i];
            option.innerText = (breedsArray[i]).charAt(0).toUpperCase() + (breedsArray[i]).slice(1);
            select.appendChild(option);
        }
    })

//Get image from dropdown menu and show loading spinner
const img = document.querySelector('.dog-image');
const spinner = document.querySelector('.spinner');

function getNewDog(imageURL) {
    img.classList.remove("show");
    spinner.classList.add("show");
    fetch(imageURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        img.src = data.message; 
    })
}

img.addEventListener("load", function() {
    spinner.classList.remove("show");
    img.classList.add("show");
})

select.addEventListener("change", function(event) {
    let imageURL = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
    getNewDog(imageURL);
}); 