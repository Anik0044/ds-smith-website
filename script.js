// Simple JavaScript for e-commerce functionality

// Filter toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter toggle
    document.querySelectorAll('.filter-group h3').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.display === 'none') {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });

    // Add to cart functionality
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            showMessage(`${productName} er tilføjet til kurven! - ${productPrice}`, 'success');
            updateCartCounter();
        });
    });

    // Wishlist functionality
    document.querySelectorAll('.btn-outline').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fas')) {
                icon.classList.replace('fas', 'far');
                showMessage(`${productName} fjernet fra ønskeliste`, 'info');
            } else {
                icon.classList.replace('far', 'fas');
                showMessage(`${productName} tilføjet til ønskeliste`, 'success');
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    filterProducts(searchTerm);
                }
            }
        });
    }

    // Pagination
    document.querySelectorAll('.pagination a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.pagination a').forEach(a => {
                a.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});

// Filter products based on search term
function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    let foundProducts = 0;
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-title').textContent.toLowerCase();
        if (productName.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
            foundProducts++;
        } else {
            card.style.display = 'none';
        }
    });
    
    const productCount = document.querySelector('.products-header h1');
    if (productCount) {
        productCount.textContent = `Viser ${foundProducts} af 222 produkter`;
    }
    
    if (foundProducts === 0) {
        showMessage('Ingen produkter fundet med din søgning', 'warning');
    }
}

// Update cart counter
function updateCartCounter() {
    let cartCount = localStorage.getItem('cartCount') || 0;
    cartCount = parseInt(cartCount) + 1;
    localStorage.setItem('cartCount', cartCount);
    console.log(`Cart updated: ${cartCount} items`);
}

// Show message to user
function showMessage(message, type) {
    // Remove existing messages
    document.querySelectorAll('.message').forEach(msg => msg.remove());
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles for message
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'warning' ? '#e67e22' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (messageEl.parentElement) {
            messageEl.remove();
        }
    }, 4000);
}

// Add CSS for slideIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('E-commerce website loaded successfully!');