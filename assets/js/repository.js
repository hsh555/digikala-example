(function () {
    "use stricts";

    window.app = window.app || {};

    window.app.products = [];

    window.app.repository = {
        getProductsByPage: getProductsByPage,
        showProducts: showProducts
    };

    // get products by page
    function getProductsByPage(pageNumber, perPageItem) {
        return app.products.slice((pageNumber - 1) * perPageItem, pageNumber * perPageItem);
    }

    // this function sort products according to each sort item
    function productsSortBy(n) {
        if (n == 1) {
            app.products.sort((a, b) => a.id - b.id);
        } else if (n == 2) {
            app.products.sort((a, b) => a.views - b.views);
        } else if (n == 3) {
            app.products.sort((a, b) => b.sold - a.sold);
        } else if (n == 4) {
            app.products.sort((a, b) => b.rankAverage - a.rankAverage);
        } else if (n == 5) {
            app.products.sort((a, b) => a.price - b.price);
        } else if (n == 6) {
            app.products.sort((a, b) => b.price - a.price);
        }
    }

    // show product function
    function showProducts(activePage, perPageItems, dataSort) {
        // before show products sort them by sort item
        productsSortBy(dataSort);

        var productsElement = document.getElementById('products');

        // create product cards and add them to product area
        for (item of app.repository.getProductsByPage(activePage, perPageItems)) {
            productsElement.appendChild(app.view.renderProductItem(
                item.title,
                item.img,
                app.utils.toPersianNumber(item.rankAverage),
                app.utils.toPersianNumber(item.rankCount),
                app.utils.toPersianNumber(item.price),
                item.views
            ));

        }
        app.repository.getProductsByPage(activePage, perPageItems);
        app.view.renderPagination(app.products.length, perPageItems, activePage);
    }
})();