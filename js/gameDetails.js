export class GameDetails {
    constructor() {
        this.headerImg = document.querySelector(".header-img");
        this.navbarContainer = document.querySelector(".navbar-container");
        this.allGames = document.querySelector(".games");
        this.details = document.querySelector(".details");
    }

    getDetails(id) {
        document.querySelector(".loading").classList.replace("d-none", "d-block");
        let api = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'dc0a53ad6dmshabe56e077d63030p1530a5jsn87cf719ecc75',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        fetch(api, options).then(res => res.json()).then(data => {
            this.details.innerHTML = `
        <div class="container position-relative">
            <i class="fa-solid fa-xmark m-3 fs-3 position-absolute top-0 end-0 tran"></i>
            <h3 class="fs-2">Game Details</h3>
            <div class="row mt-4">
                <div class="col-md-4">
                    <img src="${data.thumbnail}" alt="" class="w-100">
                </div>
                <div class="col-md-8">
                    <p class="fs-3">Title: ${data.title}</p>
                    <p>Category: <span class="bg-info text-dark ms-2 rounded-2 px-1">${data.genre}</span></p>
                    <p>Platform: <span class="bg-info text-dark ms-2 rounded-2 px-1">${data.platform}</span></p>
                    <p>Status: <span class="bg-info text-dark ms-2 rounded-2 px-1">${data.status}</span></p>
                    <p class="fs-sm">
                        ${data.description}
                    </p>
                    <button class="btn btn-outline-warning fs-5"><a href="${data.game_url}" target="_blank" class="">Show Game</a></button>
                </div>
            </div>
        </div>
            `;

            document.querySelector(".fa-xmark").addEventListener("click", () => {
                this.headerImg.classList.remove("d-none");
                this.navbarContainer.classList.remove("d-none");
                this.allGames.classList.remove("d-none");
                this.details.classList.replace("d-block", "d-none");
            });

            this.headerImg.classList.add("d-none");
            this.navbarContainer.classList.add("d-none");
            this.allGames.classList.add("d-none");
            this.details.classList.replace("d-none", "d-block");

            setTimeout(() => {
                document.querySelector(".loading").classList.replace("d-block", "d-none");
            }, 500);
        })
    }
}