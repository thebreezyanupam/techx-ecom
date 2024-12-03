import Home from '../pages/Home.js';
import Products from '../pages/Products.js';
import ProductDetail from '../pages/ProductDetail.js';
import Cart from '../pages/Cart.js';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';
import Checkout from '../pages/Checkout.js';
import Orders from '../pages/Orders.js';

const routes = {
    '/': Home,
    '/products': Products,
    '/cart': Cart,
    '/login': Login,
    '/register': Register,
    '/checkout': Checkout,
    '/orders': Orders
};

export const router = {
    init: () => {
        window.addEventListener('popstate', () => router.navigate(window.location.pathname));
        
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
                e.preventDefault();
                const link = e.target.matches('.nav-link') ? e.target : e.target.closest('.nav-link');
                const path = link.getAttribute('href');
                router.navigate(path);
            }
        });

        router.navigate(window.location.pathname);
    },

    navigate: async (path) => {
        let page;
        if (path.startsWith('/products/')) {
            page = ProductDetail;
        } else {
            page = routes[path] || routes['/'];
        }

        const main = document.getElementById('main-content');
        main.innerHTML = await page.render();
        page.init?.();
        window.scrollTo(0, 0);
    }
};