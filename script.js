// Appel à l'api par code postal
let searchResult = document.getElementById("searchResult");
let apiCallByZipCode = function (code) {
    let urlCityCode = `https://geo.api.gouv.fr/communes?codePostal=${code}`;
    
    fetch(urlCityCode)
        .then(response => response.json()
            .then((data) => {
                // Je boucle sur toutes les villes correspondantes au zipCode saisi
                for (let i = 0; i < data.length; i++) {
                    //console.log(data[i].nom);

                    // Je créé les li dans la ul
                    let cityNameList = document.createElement("ul");
                    //cityNameList.setAttribute("id", "cityName"+data[i].nom);
                    cityNameList.setAttribute("class", "cityName");
                    searchResult.appendChild(cityNameList);
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(data[i].nom + ", population: " + data[i].population + " habitants"));
                    li.setAttribute("id", "city"+data[i].nom);
                    cityNameList.appendChild(li);
                } 
            })
        ).catch(err => console.log('Erreur ' + err));
}

// appel à l'api par nom de ville
let apiCallByCityName = function (cityName) {
    let urlCityName = `https://geo.api.gouv.fr/communes?nom=${cityName}`;

    fetch(urlCityName)
        .then(response => response.json()
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    console.log(data)
                    let cityNameList = document.createElement("ul");
                    cityNameList.setAttribute("class", "cityName");
                    searchResult.appendChild(cityNameList);
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(data[i].nom + ", département: " + data[i].codeDepartement+ ", population: " + data[i].population + " habitants"));
                    li.setAttribute("id", "city" + data[i].nom);
                    cityNameList.appendChild(li);
                }
            })
        ).catch(err => console.log('Erreur ' + err));
}


// Ecouteur d'événement sur la soumission du formulaire au click du btn
let btnSearch = document.getElementById("btnSearch");
let zipCode = document.getElementById("zipCode");
let cityName = document.getElementById("cityName");

btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    // Permet de vider la liste des villes retournées précédemment avant d'en retourner une nouvelle
    while (searchResult.lastChild) {
        searchResult.removeChild(searchResult.lastChild);
    }
    apiCallByZipCode(zipCode.value);
    apiCallByCityName(cityName.value);
})

