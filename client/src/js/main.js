import { router } from './utils/router.js';

// Initialize the app
const app = {
    init: () => {
        // Initialize the router
        router.init();
    }
};

window.addEventListener('load', app.init);