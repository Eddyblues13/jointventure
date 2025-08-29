function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileNav.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuBtn.querySelectorAll('span');
    if (mobileNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!menuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
        mobileNav.classList.remove('active');
        
        // Reset hamburger menu
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


        const images = [
            'img/Rectangle 136.png',
            'img/Rectangle 136.png',
            'img/Rectangle 136.png',
            'img/Rectangle 136.png'
        ];

        let currentImageIndex = 0;

        function selectImage(index) {
            currentImageIndex = index;
            updateMainImage();
            updateThumbnails();
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateMainImage();
            updateThumbnails();
        }

        function previousImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateMainImage();
            updateThumbnails();
        }

        function updateMainImage() {
            document.getElementById('mainImage').src = images[currentImageIndex];
        }

        function updateThumbnails() {
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentImageIndex);
            });
        }

        // Initialize
        updateMainImage();
        updateThumbnails();