document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            mirror: false
        });
    } else {
        console.error("AOS is not defined. Please include the AOS script (https://unpkg.com/aos@2.3.1/dist/aos.js) in your HTML.");
    }

    // Shoe display navigation
    const shoeDisplay = document.querySelector('.shoe-display');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (shoeDisplay && prevBtn && nextBtn) {
        const scrollDistance = () => {
            const shoeBox = document.querySelector('.shoe-box');
            return shoeBox ? shoeBox.offsetWidth + 30 : 330;
        };
        prevBtn.addEventListener('click', () => {
            shoeDisplay.scrollBy({ left: -scrollDistance(), behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            shoeDisplay.scrollBy({ left: scrollDistance(), behavior: 'smooth' });
        });
    }

    // Product card interactions
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        const viewDetailsBtn = card.querySelector('.view-details');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Product details will be displayed here.');
            });
        }
        const addToCartBtn = card.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const productName = card.querySelector('.product-name').textContent;
                const notification = document.createElement('div');
                notification.className = 'cart-notification';
                notification.textContent = `${productName} added to cart!`;
                document.body.appendChild(notification);
                setTimeout(() => {
                    notification.style.opacity = '1';
                    notification.style.transform = 'translateY(0)';
                }, 10);
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            });
        }
        const wishlistBtn = card.querySelector('.wishlist');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                const icon = this.querySelector('i');
                if (this.classList.contains('active')) {
                    icon.className = 'bx bxs-heart';
                    this.style.backgroundColor = '#ffcdd2';
                    icon.style.color = '#e53935';
                } else {
                    icon.className = 'bx bx-heart';
                    this.style.backgroundColor = '';
                    icon.style.color = '';
                }
            });
        }
    });

    // Dynamically add cart notification style if not already present
    if (!document.getElementById('cart-style')) {
        const cartStyle = document.createElement('style');
        cartStyle.id = 'cart-style';
        cartStyle.textContent = `
            .cart-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background-color: #f36100;
                color: white;
                padding: 12px 20px;
                border-radius: 4px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                z-index: 1001;
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(cartStyle);
    }

    // Search functionality
    const searchForm = document.querySelector('.search-group');
    if (searchForm) {
        const searchInput = searchForm.querySelector('input');
        const searchButton = searchForm.querySelector('button');
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleSearch(searchInput.value);
        });
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(this.value);
            }
        });
        function handleSearch(query) {
            if (query.trim() !== '') {
                const productCards = document.querySelectorAll('.product-card');
                let foundProducts = 0;
                productCards.forEach(card => {
                    const productName = card.querySelector('.product-name').textContent.toLowerCase();
                    const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
                    if (productName.includes(query.toLowerCase()) || productCategory.includes(query.toLowerCase())) {
                        card.style.display = 'block';
                        foundProducts++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                const existingMessage = document.querySelector('.search-results-message');
                if (existingMessage) existingMessage.remove();
                const searchMessage = document.createElement('div');
                searchMessage.className = 'search-results-message';
                searchMessage.textContent = `Found ${foundProducts} products for "${query}"`;
                searchMessage.style.textAlign = 'center';
                searchMessage.style.margin = '2rem 0';
                searchMessage.style.fontSize = '1.2rem';
                searchMessage.style.color = '#555';
                const firstSection = document.querySelector('.product-section');
                if (firstSection) {
                    firstSection.parentNode.insertBefore(searchMessage, firstSection);
                }
                const clearButton = document.createElement('button');
                clearButton.textContent = 'Clear Search';
                clearButton.className = 'clear-search-btn';
                clearButton.style.display = 'block';
                clearButton.style.margin = '1rem auto';
                clearButton.style.padding = '10px 15px';
                clearButton.style.border = 'none';
                clearButton.style.backgroundColor = '#f36100';
                clearButton.style.color = 'white';
                clearButton.style.fontSize = '1rem';
                clearButton.style.cursor = 'pointer';
                clearButton.style.borderRadius = '5px';
                clearButton.addEventListener('click', function () {
                    searchInput.value = '';
                    productCards.forEach(card => card.style.display = 'block');
                    searchMessage.remove();
                    clearButton.remove();
                });
                searchMessage.appendChild(clearButton);
                if (firstSection) {
                    firstSection.parentNode.insertBefore(searchMessage, firstSection.nextSibling);
                }
            }
        }
    }
});
