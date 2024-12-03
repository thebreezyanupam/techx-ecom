import './styles/home.css';
import { ProductsService } from '../api/products.service.js';
import { showLoading, hideLoading } from '../utils/loading.js';

const Home = {
    render: async () => {
        try {
            showLoading();
            const products = await ProductsService.getAllProducts();
            hideLoading();

            return `
                <!-- Hero/News Section -->
                <div class="bg-blue-600 text-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <h1 class="text-4xl font-bold mb-8 text-center">Latest Tech News</h1>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                                <span class="text-blue-200 text-sm">New Release</span>
                                <h2 class="text-xl font-semibold mt-2 mb-3">iPhone 15 Pro Max: A Photography Powerhouse</h2>
                                <p class="text-blue-100">Experience professional-grade photography with the all-new iPhone 15 Pro Max's advanced camera system.</p>
                            </div>

                            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                                <span class="text-blue-200 text-sm">Tech Update</span>
                                <h2 class="text-xl font-semibold mt-2 mb-3">Samsung's Revolutionary Foldable Display</h2>
                                <p class="text-blue-100">Samsung unveils next-generation foldable technology with improved durability and enhanced user experience.</p>
                            </div>

                            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                                <span class="text-blue-200 text-sm">Coming Soon</span>
                                <h2 class="text-xl font-semibold mt-2 mb-3">PlayStation 6: The Future of Gaming</h2>
                                <p class="text-blue-100">Sony teases next-gen console with groundbreaking features and unprecedented gaming performance.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Featured Products Section -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 class="text-3xl font-bold text-center mb-12">Featured Products</h2>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        ${products.filter(product => product.featured).map(product => `
                            <a 
                                href="/products/${product.id}" 
                                class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div class="h-48 p-4 bg-gray-100">
                                    <img 
                                        src="${product.image}" 
                                        alt="${product.title}"
                                        class="w-full h-full object-contain"
                                    >
                                </div>
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold mb-2 line-clamp-2">${product.title}</h3>
                                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">${product.description}</p>
                                    <div class="flex justify-between items-center">
                                        <span class="text-xl font-bold text-blue-600">$${product.price}</span>
                                        <span class="text-blue-600 hover:text-blue-800">
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            </a>
                        `).join('')}
                    </div>

                    <div class="text-center mt-12">
                        <a 
                            href="/products" 
                            class="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
                        >
                            View All Products
                        </a>
                    </div>
                </div>

                <!-- Newsletter Section -->
                <div class="bg-gray-100">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div class="text-center">
                            <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
                            <p class="text-gray-600 mb-8">Subscribe to our newsletter for the latest tech news and exclusive offers.</p>
                            <form class="max-w-md mx-auto flex gap-4">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    class="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                >
                                <button 
                                    type="submit" 
                                    class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error rendering home:', error);
            return `
                <div class="max-w-7xl mx-auto px-4 py-12 text-center">
                    <p class="text-red-600">Failed to load products. Please try again later.</p>
                </div>
            `;
        }
    },

    init: () => {
        // Handle newsletter subscription
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                alert(`Thank you for subscribing! We'll send updates to ${email}`);
                form.reset();
            });
        }
    }
};

export default Home;