import { GameDetails } from "./gameDetails.js";

export class Games {
    constructor() {
        this.allNavCategories = document.getElementsByClassName("nav-link");
        Array.from(this.allNavCategories).forEach((element) => {
            element.addEventListener("click", () => {
                Array.from(element.parentNode.children).forEach(child => {
                    child.classList.remove("active");
                });
                element.classList.add("active");
                this.getGames(element.innerHTML).bind(this);
            });
        });

        this.allGames = document.querySelector(".all-games");
    }

    getGames(category) {
        document.querySelector(".loading").classList.add("d-block");
        document.querySelector(".loading").classList.remove("d-none");
        let api = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'dc0a53ad6dmshabe56e077d63030p1530a5jsn87cf719ecc75',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        fetch(api, options).then(res => res.json()).then(games => {
            let allGames = "";
            games.forEach(game => {
                const gameCard = `
             <div class="p-3 col-md-3">
              <div class="card p-3" id=${game.id}>
                <img src=${game.thumbnail} class="card-img-top" alt="...">
                <div class="card-body">
                    <div class="card-body-top text-white mb-3 d-flex justify-content-between align-items-center">
                        <div>${game.title}</div>
                        <button class="btn text-white free">Free</button>
                    </div>
                    <p class="card-text text-center">${game.short_description.slice(0, 50)}...</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <span class="rounded-4">${game.genre}</span>
                    <span class="rounded-4">${game.platform}</span>
                </div>
              </div>
             </div>
                `
                allGames += gameCard;

            });

            this.allGames.innerHTML = allGames;
            Array.from(document.querySelectorAll(".card")).forEach(card => {
                card.addEventListener("click", () => {
                    this.handleCardClick(card.id)
                })
            });

            setTimeout(() => {
                document.querySelector(".loading").classList.add("d-none");
                document.querySelector(".loading").classList.remove("d-block");
            }, 500);

        })
    }

    handleCardClick(id) {
        let gameDetails = new GameDetails();
        gameDetails.getDetails(id);
    }

}