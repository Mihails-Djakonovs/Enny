const menu = document.querySelector('.menu__body');
const menuBtn = document.querySelector('.menu__btn');
const body = document.body;

if (menu && menuBtn) {
    menuBtn.addEventListener('click', e => {
        menu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        body.classList.toggle('lock');
    });

    menu.addEventListener('click', e => {
        if (e.target.classList.contains('menu__body')) {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.classList.remove('lock');
        }
    });

    menu.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.classList.remove('lock');
        });
    });
}

const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();

        const blockID = anchor.getAttribute('href').substring(1);

        // Проверяем, существует ли элемент с таким ID на странице
        const targetElement = document.getElementById(blockID);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // Если элемент не найден, переходим по ссылке
            window.location.href = anchor.getAttribute('href');
        }
    });
});