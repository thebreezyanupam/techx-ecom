import { cartService } from '../services/cart.service.js';
import { router } from '../utils/router.js';
import { authService } from '../services/auth.service.js';

const Cart = {
    render: async () => {
        const cart = cartService.getCart();
        const total = cartService.getTotal();

        if (cart.length === 0) {
            return `
                <div class="max-w-7xl mx-auto px-4 py-12 text-center">
                    <h1 class="text-3xl font-bold mb-8">Your Cart</h1>
                    <p class="text-gray-600 mb-8">Your cart is empty</p>
                    <a href="/products" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                        Continue Shopping
                    </a>
                </div>
            `;
        }

        return `
            <div class="max-w-7xl mx-auto px-4 py-12">
                <h1 class="text-3xl font-bold mb-8">Your Cart</h1>
                <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    ${cart.map(item => `
                        <div class="flex items-center p-6 border-b border-gray-200">
                            <img src="${item.image}" alt="${item.title}" class="w-24 h-24 object-cover rounded-lg">
                            <div class="flex-1 ml-6">
                                <h3 class="text-lg font-semibold">${item.title}</h3>
                                <p class="text-gray-600">$${item.price}</p>
                            </div>
                            <div class="flex items-center">
                                <button 
                                    class="quantity-btn decrease px-3 py-1 border rounded-l"
                                    data-product-id="${item.id}"
                                >-</button>
                                <input 
                                    type="number" 
                                    value="${item.quantity}" 
                                    min="1" 
                                    class="quantity-input w-16 px-3 py-1 border-t border-b text-center"
                                    data-product-id="${item.id}"
                                >
                                <button 
                                    class="quantity-btn increase px-3 py-1 border rounded-r"
                                    data-product-id="${item.id}"
                                >+</button>
                            </div>
                            <div class="ml-6 w-24 text-right">
                                $${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button 
                                class="remove-item ml-6 text-red-600 hover:text-red-800"
                                data-product-id="${item.id}"
                            >
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <div class="flex justify-between items-center mb-8">
                    <div class="text-2xl font-bold">
                        Total: $${total.toFixed(2)}
                    </div>
                    <button id="checkout-btn" class="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        `;
    },

    init: () => {
        // Handle quantity changes
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quantity-btn')) {
                const productId = parseInt(e.target.dataset.productId);
                const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
                let quantity = parseInt(input.value);

                if (e.target.classList.contains('decrease')) {
                    quantity = Math.max(0, quantity - 1);
                } else if (e.target.classList.contains('increase')) {
                    quantity += 1;
                }

                cartService.updateQuantity(productId, quantity);
                router.navigate('/cart');
            }

            if (e.target.classList.contains('remove-item')) {
                const productId = parseInt(e.target.dataset.productId);
                cartService.removeFromCart(productId);
                router.navigate('/cart');
            }

            if (e.target.id === 'checkout-btn') {
                if (!authService.isLoggedIn()) {
                    localStorage.setItem('checkoutPending', 'true');
                    router.navigate('/login');
                } else {
                    router.navigate('/checkout');
                }
            }
        });

        // Handle quantity input changes
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const productId = parseInt(e.target.dataset.productId);
                const quantity = parseInt(e.target.value);
                cartService.updateQuantity(productId, quantity);
                router.navigate('/cart');
            }
        });
    }
};

export default Cart;