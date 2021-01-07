(function () {
    // responsive codes

    "use strics";

    let openMenuElement = document.querySelector('.menu-icon');
    let closeMenuElement = document.querySelector('.menu-close');
    let navElement = document.querySelector('.nav');

    // show vertical nav if user clicked on open menu button
    openMenuElement.onclick = function () {
        openMenuElement.style.display = 'none';
        if (window.screen.width <= 769) {
            navElement.style.width = '35%';
        }
        if (window.screen.width <= 426) {
            navElement.style.width = '80%';
        }
        closeMenuElement.style.display = 'block';
    }

    // hide vertical nav if user clicked on close menu button
    closeMenuElement.onclick = function () {
        closeMenuElement.style.display = 'none';
        navElement.style.width = '0';
        openMenuElement.style.display = 'block';
    }

    // hide close menu button and open menu element and change nav
    window.onresize = function () {
        closeMenuElement.style.display = 'none';
        openMenuElement.style.display = 'none';
        if (window.screen.width <= 769) {
            openMenuElement.style.display = 'block';
            navElement.style.width = '0';
        } else {
            navElement.style.width = '100%';
        }
    }
}
)();