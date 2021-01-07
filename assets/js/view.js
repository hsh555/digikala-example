(function () {
    "use stricts";

    window.app = window.app || {};

    window.app.view = {
        renderProductItem: renderProductItem,
        renderPagination: renderPagination
    };

    // this function create an element
    function createElement(tagName, objAttrs = null, content = null) {
        let element = document.createElement(tagName);
        for (let attr in objAttrs) {
            element.setAttribute(attr, objAttrs[attr]);
        }

        if (content instanceof Array) {
            for (let el of content) {
                element.appendChild(el);
            }
        } else if (content instanceof HTMLElement) {
            element.appendChild(content);
        } else {
            element.innerText = content;
        }

        return element;
    }

    // this function creates a product card
    function renderProductItem(titleProduct, imgProduct, rankProduct, rankCountProduct, priceProduct) {
        let imgElement = createElement('img', {
            src: imgProduct
        });

        let titleElement = createElement('p', { class: 'title' }, titleProduct);

        let rankStar = createElement('i', { class: 'fa fa-star' });
        let rankElement = createElement('span', { class: 'rank' }, `(${rankCountProduct})${rankProduct}`);
        rankElement.appendChild(rankStar);

        let priceElement = createElement('span', { class: 'price' }, priceProduct);
        priceElement.appendChild(createElement('span', { class: "toman" }, ' تومان'));

        let container = createElement('li', { class: 'product-item' }, [imgElement, titleElement, rankElement, priceElement]);

        return container;
    }

    // this function creates pagination
    function renderPagination(totalProducts, perPageItems, activePage) {
        // set count of pages of products
        let pages = Math.ceil(totalProducts / perPageItems);

        let pageItems = document.querySelector('.page-items');

        pageItems.innerHTML = '';

        // append page buttons to pagination
        for (let i = 1; i <= pages; i++) {
            if (i == activePage) {
                pageItems.appendChild(createElement('li', { class: 'active' }, createElement('a', { 'href': '#', 'data-page': i }, app.utils.toPersianNumber(i))));
            } else {
                pageItems.appendChild(createElement('li', {}, createElement('a', { 'href': '#', 'data-page': i }, app.utils.toPersianNumber(i))));
            }
        }

        // add forward button and back button to pagination
        let forwardBtn = createElement('li', { class: 'forward' }, createElement('a', { 'href': '#', 'data-page': 'forward' }, ">>"));
        document.querySelector('.page-items').appendChild(forwardBtn);
        let backBtn = createElement('li', { class: "back disable" }, createElement('a', { 'href': '#', 'data-page': 'back' }, "<<"));
        document.querySelector('.page-items').firstChild.before(backBtn);

        // active and disable forward button and back buttons
        if (pages > 1) {
            if (activePage == pages) {
                forwardBtn.classList.add('disable');
            }

            if (activePage != 1) {
                backBtn.classList.remove('disable');
            }
        }
    }

})();