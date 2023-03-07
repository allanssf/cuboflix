const btnTheme = document.querySelector('.btn-theme');
const logo = document.querySelector('#logo');
const btnEsq = document.querySelector('.btn-prev');
const btnDir = document.querySelector('.btn-next');
const btnFechar = document.querySelector('.modal__close');
const root = document.querySelector(':root');



function alterarTema() {
    const currentTheme = localStorage.getItem('theme');

    if (!currentTheme || currentTheme === 'light') {
        logo.src = '/assets/logo.svg';
        btnTheme.src = 'assets/dark-mode.svg';
        btnEsq.src = '/assets/arrow-left-light.svg';
        btnDir.src = '/assets/arrow-right-light.svg';
        btnFechar.src = '/assets/close.svg';


        root.style.setProperty('--background', '#1B2028');
        root.style.setProperty('--input-color', '#FFFFFF');
        root.style.setProperty('--text-color', '#FFFFFF');
        root.style.setProperty('--bg-secondary', '#2D3440');
        root.style.setProperty('--rating-color', '#f1c40f');
        root.style.setProperty('--bg-modal', 'pink');
        return;
    }

    logo.src = '/assets/logo-dark.png';
    btnTheme.src = 'assets/light-mode.svg';
    btnEsq.src = '/assets/arrow-left-dark.svg';
    btnDir.src = '/assets/arrow-right-dark.svg';
    btnFechar.src = '/assets/close-dark.svg';

    root.style.setProperty('--background', '#fff');
    root.style.setProperty('--input-color', '#979797');
    root.style.setProperty('--text-color', '#1b2028');
    root.style.setProperty('--bg-secondary', '#ededed');
    root.style.setProperty('--rating-color', '#f1c40f');
    root.style.setProperty('--bg-modal', '#ededed');
}

alterarTema();

btnTheme.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme');

    if (!currentTheme || currentTheme === 'light') {
        localStorage.setItem('theme', 'dark');
        alterarTema();
        return;
    }

    localStorage.setItem('theme', 'light');
    alterarTema();
});