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

// appel à l'pai par numéro de département
let apiCallByDepartment = function (department) {
    let urlDepartment = `https://geo.api.gouv.fr/departements/${department}/communes`;

    fetch(urlDepartment)
        .then(response => response.json()
            .then((data) => {
                // Afficher le nombre de communes dans la département
                let count = document.createElement("h3");
                count.appendChild(document.createTextNode("Le département compte " + data.length + " communes."))
                searchResult.prepend(count);

                // for (let i = 0; i < data.length; i++) {
                //     // Créé une liste avec les data retournées
                //     let cityNameList = document.createElement("ul");
                //     cityNameList.setAttribute("class", "cityName");
                //     searchResult.appendChild(cityNameList);
                //     let li = document.createElement("li");
                //     li.appendChild(document.createTextNode(data[i].nom + ", population: " + data[i].population + " habitants"));
                //     li.setAttribute("id", "city" + data[i].nom);
                //     cityNameList.appendChild(li);
                // }

                // créé un select avec les data retournées
                let cityNameSelect = document.createElement("select");

                for (let i = 0; i < data.length; i++) {
                    let option = new Option(data[i].nom);
                    let cityNameLower = data[i].nom.toLowerCase();
                    option.setAttribute("id", cityNameLower);
                    option.setAttribute("value", cityNameLower);
                    cityNameSelect.options[cityNameSelect.options.length] = option;
                }
                searchResult.appendChild(cityNameSelect);
                
                // Retourne les infos de la ville au click de son nom dans le select
                let citySelector = document.querySelector("select");
                citySelector?.addEventListener("change", () => {
                    //console.log(citySelector.value);

                    // Appel de la fonction retournant les infos de la ville
                    apiCallByCityName(citySelector.value);
                })
            })         
    ).catch(err => console.log('Erreur ' + err));
}

// Ecouteur d'événement sur la soumission du formulaire au click du btn
let btnSearch = document.getElementById("btnSearch");
let zipCode = document.getElementById("zipCode");
let cityName = document.getElementById("cityName");
let departmentNumber = document.getElementById("departmentNumber");

btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    // Permet de vider la liste des villes retournées précédemment avant d'en retourner une nouvelle
    while (searchResult.lastChild) {
        searchResult.removeChild(searchResult.lastChild);
    }
    apiCallByZipCode(zipCode.value);
    apiCallByCityName(cityName.value);
    apiCallByDepartment(departmentNumber.value)
})

