'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//     const html = `
//     <article class="country">
//     <img class="country__img" src=${data.flags.svg} />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}M people</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</</p>
//     </div>
//   </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend',html);
//     countriesContainer.style.opacity = 1;
// })
// };

// getCountryData('portugal');
// getCountryData('usa');
const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
    <img class="country__img" src=${data.flags.svg} />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
      <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</</p>
    </div>
  </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend',html);};

/*
const getCountryAndNeighbour = function (country) {


// AJAX call :xmlhttprequest
const request = new XMLHttpRequest();
request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
request.send();      
 
request.addEventListener('load',function(){
    // console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if(!neighbour) return;
    
    // AJAX call country 1
    const request2 = new XMLHttpRequest();
    request2.open('GET',`https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
     request2.addEventListener('load',function(){  
        const data2 = JSON.parse(this.responseText);
        console.log(data2);

        renderCountry(data2[0],'neighbour');
     });
    });

};

//abcd  

getCountryAndNeighbour('usa');

//callback hell
setTimeout(() => {
    console.log('1 second passed');
    setTimeout(() => {
        console.log('2 second passed');
        setTimeout(() => {
            console.log('3 second passed');
            setTimeout(() => {
                console.log('4 second passed');
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);

*/

// const request = new XMLHttpRequest();
// request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
// request.send();

//new way

// const getCountryData = function (country) {

//     fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response)
//     {
//         console.log(response);
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//         renderCountry(data[0]);
//     })
// };

//more simplified way

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}  

const getCountryData = function (country) {

    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
        response => response.json(), 
            )
    .then(data => { renderCountry(data[0])
        
        const neighbour = data[0].borders[0];
        if(!neighbour) return; 

        // Country 2
        return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);  
    })
    .then(response => response.json())  
    .then(data => renderCountry(data[0],'neighbour'))
    .catch(err => {
        console.error(`${err} 💥💥💥`)
        renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(()=> {
        countriesContainer.style.opacity = 1;
    })
};
//test
// getCountryData('portugal');
// getCountryData('bharat');


btn.addEventListener('click', function () {
    getCountryData('bharat');
});