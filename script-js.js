document.addEventListener('DOMContentLoaded', function() {
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-grid-card');
    
    if(filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in the same group
                const parentDiv = this.parentElement;
                parentDiv.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter values for both category and tech
                const categoryFilter = document.querySelector('.filter-category .filter-btn.active').getAttribute('data-filter');
                const techFilter = document.querySelector('.filter-tech .filter-btn.active').getAttribute('data-filter');
                
                // Filter projects
                filterProjects(categoryFilter, techFilter);
            });
        });
    }
    
    // Function to filter projects based on category and tech
    function filterProjects(category, tech) {
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTech = card.getAttribute('data-tech');
            
            const categoryMatch = category === 'all' || cardCategory === category;
            const techMatch = tech === 'all' || cardTech === tech;
            
            if(categoryMatch && techMatch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Blog category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if(categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all category buttons
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get selected category
                const category = this.getAttribute('data-category');
                
                // Filter blog posts
                filterBlogPosts(category);
            });
        });
    }
    
    // Function to filter blog posts
    function filterBlogPosts(category) {
        blogCards.forEach(card => {
            if(category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Blog search functionality
    const searchInput = document.querySelector('.blog-search input');
    const searchButton = document.querySelector('.blog-search button');
    
    if(searchInput && searchButton) {
        searchButton.addEventListener('click', searchBlog);
        searchInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                searchBlog();
            }
        });
        
        function searchBlog() {
            const searchTerm = searchInput.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                
                if(title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Reset category buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector('.category-btn[data-category="all"]').classList.add('active');
        }
    }
    
    // Mobile navigation toggle
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navToggle.setAttribute('aria-label', 'Toggle Navigation');
    
    const navElement = document.querySelector('nav');
    
    if(navElement) {
        const headerElement = document.querySelector('header');
        headerElement.appendChild(navToggle);
        
        navToggle.addEventListener('click', function() {
            navElement.classList.toggle('nav-open');
            this.classList.toggle('nav-open');
            
            if(this.classList.contains('nav-open')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if(targetId !== '#') {
                e.preventDefault();
                
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation when elements come into view
    const animatedElements = document.querySelectorAll('.project-card, .project-grid-card, .skill-category');
    
    if(animatedElements.length > 0) {
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        // Add animation class to elements in viewport on load
        animatedElements.forEach(element => {
            if(isInViewport(element)) {
                element.classList.add('animate-in');
            }
        });
        
        // Add animation class to elements as they enter viewport on scroll
        window.addEventListener('scroll', function() {
            animatedElements.forEach(element => {
                if(isInViewport(element) && !element.classList.contains('animate-in')) {
                    element.classList.add('animate-in');
                }
            });
        });
    }
});
