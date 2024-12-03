import { router } from '../utils/router.js';
import { authService } from '../services/auth.service.js';

const Login = {
    render: async () => {
        // Redirect if already logged in
        if (authService.isLoggedIn()) {
            router.navigate('/');
            return '';
        }

        return `
            <div class="max-w-md mx-auto px-4 py-12">
                <h1 class="text-3xl font-bold mb-8 text-center">Login</h1>
                <form id="login-form" class="bg-white rounded-xl shadow-lg p-8">
                    <div id="error-message" class="hidden mb-4 p-3 bg-red-100 text-red-700 rounded-lg"></div>
                    
                    <div class="mb-6">
                        <label class="block text-gray-700 mb-2" for="email">
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        >
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 mb-2" for="password">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        >
                    </div>
                    <button 
                        type="submit" 
                        class="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                    <p class="mt-4 text-center text-gray-600">
                        Don't have an account? 
                        <a href="/register" class="text-blue-600 hover:text-blue-800">Register</a>
                    </p>
                </form>
            </div>
        `;
    },

    init: () => {
        const form = document.getElementById('login-form');
        const errorMessage = document.getElementById('error-message');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                try {
                    await authService.login(email, password);
                    
                    // Update navbar with user info
                    authService.updateNavbar();
                    
                    // Check if user was trying to checkout
                    const checkoutPending = localStorage.getItem('checkoutPending');
                    if (checkoutPending) {
                        localStorage.removeItem('checkoutPending');
                        router.navigate('/checkout');
                    } else {
                        router.navigate('/');
                    }
                } catch (error) {
                    errorMessage.textContent = error.message || 'Login failed. Please try again.';
                    errorMessage.classList.remove('hidden');
                }
            });
        }
    }
};

export default Login; 