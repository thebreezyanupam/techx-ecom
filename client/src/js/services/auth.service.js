class AuthService {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('user')) || null;
        this.API_URL = 'http://localhost:3001/api';
    }

    async register({ name, email, password }) {
        try {
            console.log('Sending registration request to:', `${this.API_URL}/auth/register`);
            console.log('With data:', { name, email, password });

            const response = await fetch(`${this.API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Response text:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                throw new Error('Server response was not valid JSON: ' + responseText);
            }

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            this.user = data.user;
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('token', data.token);
            
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }

            const data = await response.json();
            this.user = data.user;
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('token', data.token);
            
            return true;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    logout() {
        this.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('checkoutPending');
        this.updateNavbar();
    }

    isLoggedIn() {
        return !!this.user;
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    updateNavbar() {
        const loginLink = document.querySelector('.nav-link[href="/login"]');
        
        if (this.isLoggedIn()) {
            if (loginLink) {
                const emailInitial = this.user.email.charAt(0).toUpperCase();
                loginLink.removeAttribute('href');
                
                loginLink.innerHTML = `
                    <div class="relative">
                        <button id="profile-button" class="flex items-center space-x-2 focus:outline-none">
                            <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                ${emailInitial}
                            </div>
                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        
                        <!-- Dropdown Menu -->
                        <div id="profile-dropdown" class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 hidden z-50">
                            <div class="px-4 py-2 border-b">
                                <p class="text-sm font-medium text-gray-900 truncate" title="${this.user.email}">
                                    ${this.user.email}
                                </p>
                            </div>
                            
                            <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dropdown-item">
                                <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Profile
                            </a>
                            
                            <a href="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dropdown-item">
                                <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                                Orders
                            </a>
                            
                            <button id="logout-btn" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                `;

                const profileButton = document.getElementById('profile-button');
                const dropdown = document.getElementById('profile-dropdown');

                if (profileButton && dropdown) {
                    // Toggle dropdown on profile button click
                    profileButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('hidden');
                    });

                    // Handle dropdown item clicks
                    dropdown.addEventListener('click', (e) => {
                        const dropdownItem = e.target.closest('.dropdown-item');
                        if (dropdownItem) {
                            e.preventDefault();
                            const href = dropdownItem.getAttribute('href');
                            dropdown.classList.add('hidden');
                            window.history.pushState({}, '', href);
                            const navEvent = new PopStateEvent('popstate');
                            window.dispatchEvent(navEvent);
                        }
                    });

                    // Close dropdown when clicking outside
                    document.addEventListener('click', (e) => {
                        if (!dropdown.contains(e.target) && !profileButton.contains(e.target)) {
                            dropdown.classList.add('hidden');
                        }
                    });
                }
            }
        } else {
            if (loginLink) {
                loginLink.setAttribute('href', '/login');
                loginLink.innerHTML = 'Login';
            }
        }
    }
}

export const authService = new AuthService();

// Update navbar on page load
document.addEventListener('DOMContentLoaded', () => {
    authService.updateNavbar();
});

// Handle logout clicks
document.addEventListener('click', (e) => {
    const logoutBtn = e.target.closest('#logout-btn');
    if (logoutBtn) {
        e.preventDefault();
        e.stopPropagation();
        authService.logout();
        window.location.href = '/';
    }
}); 