const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu-oculto");

menuIcon.addEventListener("click", () => {
    menu.classList.toggle("open");
});



//series y peliculas

const showGrid = document.getElementById("show-grid");
const showSearch = document.getElementById("show-search");
const searchButton = document.getElementById("search-button");


if (showGrid && showSearch && searchButton) {




const createShowCard = (show) => {
    const card = document.createElement("article");
    card.classList.add("show-card");

    const info = document.createElement("section");
    info.classList.add("show-info");

    const title = document.createElement("h2");
    title.classList.add("show-title");
    title.textContent = show.name;

    const genresSpan = document.createElement("span");
    genresSpan.classList.add("show-genres");
    genresSpan.textContent = `Generos: ${show.genres.join(", ")}`;

    const yearSpan = document.createElement("span");
    yearSpan.classList.add("show-year");
    let premieredYear = "";
    if (show.premiered) {
        premieredYear = new Date(show.premiered).getFullYear();
    }
    yearSpan.textContent = `Año: ${premieredYear}`;


    info.appendChild(title);
    info.appendChild(genresSpan);
    info.appendChild(yearSpan);

    if (show.image && show.image.medium) {
        card.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%), url(${show.image.medium}) `;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
        card.style.height = "35em";
        
    }

   

    card.appendChild(info);
   
    

    return card;
    

    
    
};





const loadShows = async () => {
    const showGrid = document.getElementById("show-grid");
    try {
        const response = await axios.get("https://api.tvmaze.com/shows?page=1");
        const shows = response.data;
        showGrid.innerHTML = '';

        shows.forEach((show) => {
            const showCard = createShowCard(show);
            showGrid.appendChild(showCard);
        });
    } catch (error) {
        console.error("error al obtener show", error);
    }
    
};


document.addEventListener("DOMContentLoaded", loadShows);

const searchShow = async () => {
    const showName = document.getElementById('show-search').value.toLowerCase();
    if (showName) {
        try {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${showName}`);
            const results = response.data;
            const showGrid = document.getElementById('show-grid');
            showGrid.innerHTML = '';

            results.forEach(result => {
                const showCard = createShowCard(result.show);
                showGrid.appendChild(showCard); 
            });

        } catch (error) {
            console.error('erro al buscar', error);
        }

    }
};



document.getElementById("search-button").addEventListener("click", searchShow);
document.getElementById("show-search").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchShow();
    }
});



}






//busqueda por actores 


const actorGrid = document.getElementById("actor-grid");
const actorSearch = document.getElementById("actor-search");
const actorButton = document.getElementById("actor-button");


if (actorGrid && actorSearch && actorButton) {  



const createActorCard = (person) => {
    const actorCard = document.createElement("article");
    actorCard.classList.add("actor-card");

    const actorInfo = document.createElement("section");
    actorInfo.classList.add("actor-info");

    const actorTitle = document.createElement("h2");
    actorTitle.classList.add("actor-name");
    actorTitle.textContent = person.name;


    const actorCountry = document.createElement("span");
    actorCountry.classList.add("span-country")
    let actorCntry = "";
    if(person.country) {
        actorCntry =  (person.country.name);
    }
    actorCountry.textContent = `${actorCntry}`;


    const actorBirthday = document.createElement("span");
    actorBirthday.classList.add("actor-birthday");
    let actorBday = "";
    if (person.birthday) {
        actorBday =  (person.birthday);
    }
    actorBirthday.textContent = `Bday: ${actorBday}`;

    actorInfo.appendChild(actorTitle);
    actorInfo.appendChild(actorCountry);
    actorInfo.appendChild(actorBirthday);



    if (person.image && person.image.medium) {
        actorCard.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%), url(${person.image.medium}) `;
        actorCard.style.backgroundSize = "cover";
        actorCard.style.backgroundPosition = "center";
        actorCard.style.height = "35em";
        
    }

    actorCard.appendChild(actorInfo);
    return actorCard;
 
}



const loadActors = async () => {
    const actorGrid = document.getElementById("actor-grid");
    try {
        const response = await axios.get("https://api.tvmaze.com/search/people?q=query");
        const actors = response.data;

        actorGrid.innerHTML = '';

        actors.forEach((actor) => {
            const actorCard = createActorCard(actor);
            actorGrid.appendChild(actorCard);
        });
    } catch (error) {
        console.error("error al bucar actor", error);
    }
};

document.addEventListener("DOMContentLoaded", loadActors);


const searchActors = async () => {
    const searchName = document.getElementById ('actor-search').value.toLocaleLowerCase();
    if (searchName) {
        try {
            const response = await axios.get(`https://api.tvmaze.com/search/people?q=${searchName}`);
            const results = response.data;
            const actorGrid = document.getElementById('actor-grid');
            actorGrid.innerHTML = '';

            results.forEach(result => {
                const actorCard = createActorCard(result.person);
                actorGrid.appendChild(actorCard);

            });
        } catch (error) {
            console.error('errosss', error);
        }
    }
};


document.getElementById("actor-button").addEventListener("click", searchActors);
document.getElementById("actor-search").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchActors();
    }
});

}






//generos de pelicula y serie

const genreGrid = document.getElementById("genre-grid");
const genreSearch = document.getElementById("genre-search");
const genreButton = document.getElementById("genre-button");

if (genreGrid && genreSearch && genreButton) {

    const createGenreCard = (show) => {
        const card = document.createElement("article");
        card.classList.add("genre-card");

        const info = document.createElement("section");
        info.classList.add("show-info");

        const title = document.createElement("h2");
        title.classList.add("show-title");
        title.textContent = show.genre;
        title.textContent = show.genres.join(", ");

        const genresSpan = document.createElement("span");
        genresSpan.classList.add("show-genres");
        genresSpan.textContent = show.name;

        const yearSpan = document.createElement("span");
        yearSpan.classList.add("show-year");
        let premieredYear = "";
        if (show.premiered) {
            premieredYear = new Date(show.premiered).getFullYear();
        }
        yearSpan.textContent = `Año: ${premieredYear}`;


        info.appendChild(title);
        info.appendChild(genresSpan);
        info.appendChild(yearSpan);



        if (show.image && show.image.medium) {
            card.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%), url(${show.image.medium}) `;
            card.style.backgroundSize = "cover";
            card.style.backgroundPosition = "center";
            card.style.height = "35em";
            
        }
       
    
        card.appendChild(info);
       
        
    
        return card;

            


        };

        const loadGenre = async () => {
            const genreGrid = document.getElementById("genre-grid");
            try {
                const response = await axios.get("https://api.tvmaze.com/shows?page=5");
                const shows = response.data;
                genreGrid.innerHTML = '';
        
                shows.forEach((show) => {
                    const genreCard = createGenreCard(show);
                    genreGrid.appendChild(genreCard);
                });
            } catch (error) {
                console.error("error al obtener show", error);
            }
            
        };
        
        document.addEventListener("DOMContentLoaded", loadGenre);
        




        const searchGenre = async () => {
            const genreName = document.getElementById('genre-search').value.toLowerCase();
            if (genreName) {
                try {
                    const response = await axios.get(`https://api.tvmaze.com/shows?page=3`);
                    const results = response.data;
                    const filtredGenre = results.filter(show =>
                        show.genres.some(g => g.toLocaleLowerCase() == genreName)
                    );
                    const genreGrid = document.getElementById('genre-grid');
                    genreGrid.innerHTML = '';
        
                    filtredGenre.forEach(show => {
                        const genreCard = createGenreCard(show);
                        genreGrid.appendChild(genreCard);
                    }); 
        
                } catch (error) {
                    console.error('erro al buscar', error);
                }
        
            }
        };
        
        
        document.getElementById("genre-button").addEventListener("click", searchGenre);
        document.getElementById("genre-search").addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                searchGenre();
            }
        });
        
        
        
        


}




