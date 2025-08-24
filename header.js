// Mobile hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Add mobile menu toggle functionality here if needed
            console.log('Mobile menu clicked');
        });
    }
    
    // Form select styling and functionality
    const selects = document.querySelectorAll('.form-select');
    
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#333';
            } else {
                this.style.color = '#666';
            }
        });
    });
    
    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const selects = document.querySelectorAll('.form-select');
            const values = Array.from(selects).map(select => select.value);
            
            console.log('Search clicked with values:', values);
            
            // Add search functionality here
            alert('Search functionality would be implemented here');
        });
    }
});