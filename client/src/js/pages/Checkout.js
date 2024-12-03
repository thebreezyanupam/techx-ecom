import { router } from '../utils/router.js';
import { cartService } from '../services/cart.service.js';
import { authService } from '../services/auth.service.js';

const Checkout = {
    render: async () => {
        // Check if user is logged in
        if (!authService.isLoggedIn()) {
            localStorage.setItem('checkoutPending', 'true');
            router.navigate('/login');
            return '';
        }

        const cart = cartService.getCart();
        const total = cartService.getTotal();

        if (cart.length === 0) {
            router.navigate('/cart');
            return '';
        }

        return `
            <div class="max-w-3xl mx-auto px-4 py-12">
                <h1 class="text-3xl font-bold mb-8">Checkout</h1>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Billing Information -->
                    <div>
                        <h2 class="text-xl font-semibold mb-4">Billing Information</h2>
                        <form id="checkout-form" class="space-y-4">
                            <div>
                                <label class="block text-gray-700 mb-2" for="name">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                    value="${authService.getUser()?.name || ''}"
                                >
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 mb-2" for="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                    value="${authService.getUser()?.email || ''}"
                                >
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 mb-2" for="address">Address</label>
                                <input 
                                    type="text" 
                                    id="address" 
                                    class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                >
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-gray-700 mb-2" for="city">City</label>
                                    <input 
                                        type="text" 
                                        id="city" 
                                        class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        required
                                    >
                                </div>
                                <div>
                                    <label class="block text-gray-700 mb-2" for="postal">Postal Code</label>
                                    <input 
                                        type="text" 
                                        id="postal" 
                                        class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        required
                                    >
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 mb-2" for="card">Card Number</label>
                                <input 
                                    type="text" 
                                    id="card" 
                                    class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                    placeholder="4242 4242 4242 4242"
                                >
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-gray-700 mb-2" for="expiry">Expiry Date</label>
                                    <input 
                                        type="text" 
                                        id="expiry" 
                                        class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        required
                                        placeholder="MM/YY"
                                    >
                                </div>
                                <div>
                                    <label class="block text-gray-700 mb-2" for="cvv">CVV</label>
                                    <input 
                                        type="text" 
                                        id="cvv" 
                                        class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        required
                                        placeholder="123"
                                    >
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Order Summary -->
                    <div>
                        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
                        <div class="bg-gray-50 rounded-lg p-6">
                            <div class="space-y-4">
                                ${cart.map(item => `
                                    <div class="flex justify-between">
                                        <div>
                                            <p class="font-medium">${item.title}</p>
                                            <p class="text-sm text-gray-600">Quantity: ${item.quantity}</p>
                                        </div>
                                        <p class="font-medium">$${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                `).join('')}
                                
                                <div class="border-t pt-4 mt-4">
                                    <div class="flex justify-between font-semibold">
                                        <p>Total</p>
                                        <p>$${total.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button 
                            id="place-order"
                            class="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors mt-6"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        const form = document.getElementById('checkout-form');
        const placeOrderBtn = document.getElementById('place-order');

        if (form && placeOrderBtn) {
            placeOrderBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                try {
                    // Here you would normally process the payment
                    // For now, we'll just simulate a successful order
                    
                    // Clear the cart
                    cartService.clearCart();
                    
                    // Show success message
                    alert('Order placed successfully!');
                    
                    // Redirect to home
                    router.navigate('/');
                } catch (error) {
                    console.error('Checkout error:', error);
                    alert('Failed to place order. Please try again.');
                }
            });
        }
    }
};

export default Checkout; 