const divFilmes = document.querySelector('.movies');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const filtroFilme = document.querySelector('.input');

const highlightVideo = document.querySelector('.highlight__video');
const videoYoutube = document.querySelector('.highlight__video-link');
const videoTitulo = document.querySelector('.highlight__title');
const videoAvaliacao = document.querySelector('.highlight__rating');
const videoGenres = document.querySelector('.highlight__genres');
const videoLaunch = document.querySelector('.highlight__launch');
const videoDescricao = document.querySelector('.highlight__description');

const divModal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal__title');
const modalImg = document.querySelector('.modal__img');
const modalDescription = document.querySelector('.modal__description');
const modalAverage = document.querySelector('.modal__average');
const modalClose = document.querySelector('.modal__close');
const modalGenre1 = document.querySelector('.modal__genre1');
const modalGenre2 = document.querySelector('.modal__genre2');
const modalGenre3 = document.querySelector('.modal__genre3');
const btnTema = document.querySelector('.btn-theme');

const url = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR'
let catalogoFilmes = [];
let procurarFilmes = [];


const filme = async () => {
    const resposta = await fetch(url);
    const body = await resposta.json();
    catalogoFilmes = body.results;
    procurarFilmes = catalogoFilmes;
};

const criandoFilme = async (start, end) => {
    divFilmes.innerHTML = '';
    const arrayFilmes = procurarFilmes.slice(start, end);

    arrayFilmes.forEach((elemento) => {
        const movie = document.createElement('div');
        movie.classList.add('movie');
        movie.style.backgroundImage = `url(${elemento.poster_path})`;

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie__info');

        const spanTitle = document.createElement('span');
        spanTitle.classList.add('movie__title');
        spanTitle.textContent = elemento.title;

        const spanRating = document.createElement('span');
        spanRating.classList.add('movie__rating');
        spanRating.textContent = elemento.vote_average;

        const img = document.createElement('img');
        img.src = './assets/estrela.svg';

        movieInfo.appendChild(img);
        movieInfo.appendChild(spanTitle);
        movieInfo.appendChild(spanRating);

        movie.append(movieInfo);
        divFilmes.append(movie);


        const detalheFilme = async (endPoint) => {
            const resposta = await fetch(endPoint);
            const body = await resposta.json();
            generoDetalhe = body;
        };
        arrayFilmes.forEach((elemento) => {

            movie.addEventListener('click', (event) => {
                let endPoint = "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/" + elemento.id + "?language=pt-BR";
                detalheFilme(endPoint).then(() => {

                    if (event.target.children[0].children[1].textContent === elemento.title) {

                        modalTitle.textContent = elemento.title;
                        modalDescription.textContent = elemento.overview;
                        modalAverage.textContent = elemento.vote_average;
                        modalImg.src = elemento.backdrop_path;
                        modalGenre1.textContent = generoDetalhe.genres[0]["name"];
                        modalGenre2.textContent = generoDetalhe.genres[1]["name"];
                        modalGenre3.textContent = generoDetalhe.genres[2]["name"];
                    };

                    divModal.classList.remove('hidden');
                });
            });
        });
    });

    modalClose.addEventListener('click', () => {
        divModal.classList.add('hidden');
    });
};


let start = 0;
let end = 6;

const prevPag = async () => {
    const resposta = await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR')
    const body = await resposta.json();

    btnPrev.addEventListener('click', () => {

        start -= 6;
        end -= 6;
        if (start < 0) {
            start = 12;
            end = 18;
        };
        criandoFilme(start, end);
    });
};

const nextPag = async () => {
    const resposta = await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR');
    const body = await resposta.json();

    btnNext.addEventListener('click', () => {

        start += 6;
        end += 6;
        if (end > 18) {
            start = 0;
            end = 6;
        };
        criandoFilme(start, end);
    });
};

const iniciandoPaginacao = async () => {
    await filme();
    await criandoFilme(0, 6);
    await nextPag();
    await prevPag();
};

iniciandoPaginacao();

filtroFilme.addEventListener('keyup', async (evento) => {
    let nomeFilme = filtroFilme.value;
    const filtroUrl = `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${nomeFilme}`;
    const resposta = await fetch(filtroUrl);
    const body = await resposta.json();

    if (filtroFilme.value !== '' && evento.key === 'Enter') {
        procurarFilmes = [];
        body.results.forEach((elemento) => {
            if (elemento.title.toLowerCase().includes(filtroFilme.value.toLowerCase())) {
                procurarFilmes.push(elemento);
                filtroFilme.value = '';
            };
        });
        criandoFilme(0, 6);
    } else {
        iniciandoPaginacao();
    };

});


const filmeDoDia = async () => {
    const respostaVideoGeral = await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR')
    const bodyVideo = await respostaVideoGeral.json();

    highlightVideo.style.backgroundImage = `url(${bodyVideo.backdrop_path})`;
    highlightVideo.style.backgroundSize = '100%';
    videoTitulo.textContent = bodyVideo.title;
    videoAvaliacao.textContent = bodyVideo.vote_average;
    videoDescricao.textContent = bodyVideo.overview;
    videoGenres.textContent = `${bodyVideo.genres[0]["name"]}, ${bodyVideo.genres[1]["name"]}, ${bodyVideo.genres[2]["name"]}`;
    videoLaunch.textContent = bodyVideo.release_date;


    const respostaVideoYoutube = await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR');
    const bodyYoutube = await respostaVideoYoutube.json();

    videoYoutube.href = `https://www.youtube.com/watch?v=${bodyYoutube.results[1].key}`;

};

filmeDoDia();
