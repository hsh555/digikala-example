(function () {
    "use stricts";

    window.app = window.app || {};

    // show loading before load products
    document.getElementById('loading').style.display = 'block';

    // set active page
    let activePage = 1;

    // set count of products in each page
    let perPageItems = (window.screen.width <= 769) ? 24 : 28;

    let tbody = document.getElementById('products');

    // request to server to recive products
    fetch("https://5f8dfe3e4c15c40016a1e4f7.mockapi.io/shop/products")
        .then(response => {
            response = response.json();
            return response;
        })
        .then(response => {
            window.app.products = response;

            // show count of total products
            document.querySelector('.total-products').innerText = `${app.utils.toPersianNumber(response.length)} کالا`;

            // show products
            app.repository.showProducts(activePage, perPageItems);

            // show pagination
            app.view.renderPagination(app.products.length, perPageItems, activePage);

            // hide loading after load of products
            document.getElementById("loading").style.display = "none";

        });

    // change pages after click on pagination
    let pageItems = document.querySelector('.page-items');
    pageItems.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.tagName === 'A' || e.target.tagName === 'LI') {
            if (e.target.dataset.page === 'forward') {
                if (e.target.parentNode.classList[1] != 'disable') {
                    activePage++;
                    window.scrollTo(0, 0);
                }
            } else if (e.target.dataset.page === 'back') {
                if (e.target.parentNode.classList[1] != 'disable') {
                    activePage--;
                    window.scrollTo(0, 0);
                }

            } else {
                activePage = e.target.dataset.page;
                window.scrollTo(0, 0);
            }
            

            tbody.innerHTML = '';
            app.repository.showProducts(activePage, perPageItems, 0);
        }
    });

    // change sort item after click on each sort items
    let sortArea = document.querySelector('.sort-items');
    sortArea.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            activePage = 1;
            sortArea.childNodes.forEach(a => (a.tagName == 'A' ? a.classList.remove('active') : ''));
            if (e.target.classList['active']) {
                e.target.classList.remove('active');
            } else {
                e.target.classList.add('active');
            }
            tbody.innerHTML = '';
            app.repository.showProducts(activePage, perPageItems, e.target.dataset.sort)
        }
    });

})(); 