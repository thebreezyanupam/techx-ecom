import { router } from '../utils/router.js';
import { authService } from '../services/auth.service.js';

const Register = {
    render: async () => {
        // Redirect if already logged in
        if (authService.isLoggedIn()) {
            router.navigate('/');
            return '';
        }

        return `
            <div class="max-w-md mx-auto px-4 py-12">
                <h1 class="text-3xl font-bold mb-8 text-center">Create Account</h1>
                <form id="register-form" class="bg-white rounded-xl shadow-lg p-8">
                    <div id="error-message" class="hidden mb-4 p-3 bg-red-100 text-red-700 rounded-lg"></div>
                    
                    <div class="mb-6">
                        <label class="block text-gray-700 mb-2" for="name">
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        >
                    </div>

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
                            minlength="6"
                        >
                    </div>

                    <button 
                        type="submit" 
                        class="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        Create Account
                    </button>

                    <p class="mt-4 text-center text-gray-600">
                        Already have an account? 
                        <a href="/login" class="text-blue-600 hover:text-blue-800">Login</a>
                    </p>
                </form>
            </div>
        `;
    },

    init: () => {
        const form = document.getElementById('register-form');
        const errorMessage = document.getElementById('error-message');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                try {
                    await authService.register({ name, email, password });
                    
                    // Update navbar with user info
                    authService.updateNavbar();
                    
                    // Redirect to home or checkout if pending
                    const checkoutPending = localStorage.getItem('checkoutPending');
                    if (checkoutPending) {
                        localStorage.removeItem('checkoutPending');
                        router.navigate('/checkout');
                    } else {
                        router.navigate('/');
                    }
                } catch (error) {
                    errorMessage.textContent = error.message || 'Registration failed. Please try again.';
                    errorMessage.classList.remove('hidden');
                }
            });
        }
    }
};

export default Register; 