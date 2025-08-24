// Mobile footer accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const footerTitles = document.querySelectorAll('.footer-title');
    
    footerTitles.forEach(title => {
        title.addEventListener('click', function() {
            // Only work on mobile
            if (window.innerWidth <= 768) {
                const column = this.parentElement;
                const isActive = column.classList.contains('active');
                
                // Close all other columns
                document.querySelectorAll('.footer-column').forEach(col => {
                    col.classList.remove('active');
                });
                
                // Toggle current column
                if (!isActive) {
                    column.classList.add('active');
                }
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Remove active class on desktop
            document.querySelectorAll('.footer-column').forEach(col => {
                col.classList.remove('active');
            });
        }
    });
});