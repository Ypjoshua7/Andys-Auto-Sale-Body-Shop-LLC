// Andy's Auto Repair - Enhanced Application JavaScript
// Mobile-optimized with animations and sliders

let currentPage = 'home';
let currentFilters = {
    search: '',
    make: 'all',
    type: 'all',
    sort: 'newest'
};

// Hero slider images
const heroImages = [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1920'
];

// Gallery images
const galleryImages = [
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200',
    'https://images.unsplash.com/photo-1587836374551-dfa7e00f5eb2?w=1200',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200'
];

let heroSliderInterval;
let gallerySliderInterval;
let currentHeroSlide = 0;
let currentGallerySlide = 0;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    loadFooter();
    loadPage('home');
    setupEventListeners();
    initAnimations();
});

// Simple scroll animation
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// Navigation with Logo Support
function loadNavigation() {
    const navHTML = `
        <nav class="navbar">
            <div class="container nav-content">
                <a href="#" onclick="navigateTo('home')" class="logo">
                    <!-- Logo Image - Replace with your logo -->
                    <img src="logo.png" alt="Andy's Auto Repair" class="logo-image" onerror="this.style.display='none'">
                    <div class="logo-text">
                        <div class="logo-title">Andy's Auto Repair</div>
                        <div class="logo-subtitle">Quality & Service</div>
                    </div>
                </a>
                <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                    <i class="fas fa-bars"></i>
                </button>
                <ul class="nav-links" id="nav-links">
                    <li><a href="#" onclick="navigateTo('home')" class="nav-link"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="#" onclick="navigateTo('financing')" class="nav-link"><i class="fas fa-dollar-sign"></i> Financing</a></li>
                    <li><a href="#" onclick="navigateTo('bodyshop')" class="nav-link"><i class="fas fa-wrench"></i> Body Shop</a></li>
                    <li><a href="#" onclick="navigateTo('about')" class="nav-link"><i class="fas fa-info-circle"></i> About</a></li>
                    <li><a href="#" onclick="navigateTo('contact')" class="nav-link"><i class="fas fa-envelope"></i> Contact</a></li>
                </ul>
            </div>
        </nav>
    `;
    document.getElementById('nav-container').innerHTML = navHTML;
    updateActiveNav();
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#0A2240';
        navLinks.style.padding = '1rem';
    }
}

// Footer
function loadFooter() {
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3><i class="fas fa-car"></i> Andy's Auto Repair</h3>
                        <p>Quality vehicles, expert service, and flexible financing</p>
                    </div>
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <p><i class="fas fa-phone"></i> (737) 708-5302</p>
                        <p><i class="fas fa-envelope"></i> info@andyautorepair.com</p>
                        <p><i class="fas fa-map-marker-alt"></i> 903 Brandi Ln, Round Rock, TX 78681</p>
                    </div>
                    <div class="footer-section">
                        <h3>Hours</h3>
                        <p>Monday - Friday: 9AM - 7PM</p>
                        <p>Saturday: 9AM - 6PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                    <div class="footer-section">
                        <h3>Follow Us</h3>
                        <div style="display: flex; gap: 1rem; font-size: 1.5rem;">
                            <a href="#" style="color: #1E88E5;"><i class="fab fa-facebook"></i></a>
                            <a href="#" style="color: #1E88E5;"><i class="fab fa-instagram"></i></a>
                            <a href="#" style="color: #1E88E5;"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Andy's Auto Repair. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
    document.getElementById('footer-container').innerHTML = footerHTML;
}

// Hero Slider
function initHeroSlider() {
    const sliderContainer = document.getElementById('hero-slider');
    if (!sliderContainer) return;
    
    sliderContainer.innerHTML = heroImages.map((img, idx) => 
        `<div class="hero-slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${img}')"></div>`
    ).join('');
    
    clearInterval(heroSliderInterval);
    heroSliderInterval = setInterval(() => {
        const slides = document.querySelectorAll('.hero-slide');
        slides[currentHeroSlide].classList.remove('active');
        currentHeroSlide = (currentHeroSlide + 1) % slides.length;
        slides[currentHeroSlide].classList.add('active');
    }, 5000);
}

// Gallery Slider
function initGallerySlider() {
    const sliderContainer = document.getElementById('gallery-slider');
    const dotsContainer = document.getElementById('gallery-dots');
    if (!sliderContainer) return;
    
    sliderContainer.innerHTML = galleryImages.map((img, idx) => 
        `<div class="gallery-slide ${idx === 0 ? 'active' : ''}"><img src="${img}" alt="Gallery ${idx + 1}"></div>`
    ).join('');
    
    dotsContainer.innerHTML = galleryImages.map((_, idx) => 
        `<div class="gallery-dot ${idx === 0 ? 'active' : ''}" onclick="goToGallerySlide(${idx})"></div>`
    ).join('');
    
    clearInterval(gallerySliderInterval);
    gallerySliderInterval = setInterval(() => {
        nextGallerySlide();
    }, 3000);
}

function nextGallerySlide() {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    slides[currentGallerySlide].classList.remove('active');
    dots[currentGallerySlide].classList.remove('active');
    
    currentGallerySlide = (currentGallerySlide + 1) % slides.length;
    
    slides[currentGallerySlide].classList.add('active');
    dots[currentGallerySlide].classList.add('active');
}

function goToGallerySlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    slides[currentGallerySlide].classList.remove('active');
    dots[currentGallerySlide].classList.remove('active');
    
    currentGallerySlide = index;
    
    slides[currentGallerySlide].classList.add('active');
    dots[currentGallerySlide].classList.add('active');
}

// Page Navigation
function navigateTo(page) {
    currentPage = page;
    loadPage(page);
    updateActiveNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu
    const navLinks = document.getElementById('nav-links');
    if (window.innerWidth <= 1024) {
        navLinks.style.display = 'none';
    }
}

function switchLanguage(targetPage) {
    navigateTo(targetPage);
}

function loadPage(page) {
    const mainContent = document.getElementById('main-content');
    
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            mainContent.innerHTML = html;
            
            if (page.includes('home')) {
                initHomePage();
                initHeroSlider();
                initGallerySlider();
                initContactForm();
                initCharacterCounter();
            } else if (page.includes('contact')) {
                initContactPage();
                initCharacterCounter();
            } else if (page.includes('financing')) {
                initFinancingPage();
            }
            
            initAnimations();
        })
        .catch(err => {
            mainContent.innerHTML = '<div class="container"><h1>Page not found</h1></div>';
        });
}

function updateActiveNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const basePage = currentPage.replace('-spanish', '');
    const activeLink = document.querySelector(`[onclick="navigateTo('${basePage}')"]`);
    if (activeLink) activeLink.classList.add('active');
}

// Character Counter for Textarea
function initCharacterCounter() {
    const textarea = document.getElementById('contact-message');
    const counter = document.getElementById('char-counter');
    if (textarea && counter) {
        textarea.addEventListener('input', () => {
            counter.textContent = textarea.value.length;
        });
    }
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('home-contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    alert('Thank you! Your message has been received. We will contact you soon at ' + data.phone);
    e.target.reset();
    
    const counter = document.getElementById('char-counter');
    if (counter) counter.textContent = '0';
}

// Home Page Functions
function initHomePage() {
    loadVehicleGrid();
    populateFilters();
    
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value;
            applyFilters();
        });
    }
}

function scrollToInventory() {
    const section = document.getElementById('inventory-section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Vehicle Functions (keep existing functions from previous code)
function loadVehicleGrid() {
    const grid = document.getElementById('vehicle-grid');
    if (!grid) return;
    
    const vehicles = getFilteredVehicles();
    
    if (vehicles.length === 0) {
        grid.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">No vehicles found</p>';
        return;
    }
    
    grid.innerHTML = vehicles.map(vehicle => `
        <div class="vehicle-card" onclick="showVehicleModal(${vehicle.id})">
            <img src="${vehicle.image}" alt="${vehicle.year} ${vehicle.make} ${vehicle.model}" class="vehicle-image">
            <div class="vehicle-info">
                <h3 class="vehicle-title">${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
                <p class="vehicle-price">$${vehicle.price.toLocaleString()}</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; color: #C0C0C0; font-size: 0.9rem; margin-bottom: 1rem;">
                    <span><i class="fas fa-tachometer-alt"></i> ${vehicle.mileage.toLocaleString()} miles</span>
                    <span><i class="fas fa-cog"></i> ${vehicle.transmission}</span>
                    <span><i class="fas fa-car"></i> ${vehicle.body_type}</span>
                    <span><i class="fas fa-gas-pump"></i> ${vehicle.fuel_type}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%;"><i class="fas fa-eye"></i> View Details</button>
            </div>
        </div>
    `).join('');
    
    updateResultsCount(vehicles.length);
}

function populateFilters() {
    const vehicles = getVehicles();
    const makes = [...new Set(vehicles.map(v => v.make))].sort();
    
    const makeFilter = document.getElementById('make-filter');
    if (makeFilter) {
        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeFilter.appendChild(option);
        });
    }
}

function getFilteredVehicles() {
    let vehicles = getVehicles();
    
    if (currentFilters.search) {
        const search = currentFilters.search.toLowerCase();
        vehicles = vehicles.filter(v => 
            v.make.toLowerCase().includes(search) ||
            v.model.toLowerCase().includes(search) ||
            v.year.toString().includes(search)
        );
    }
    
    if (currentFilters.make !== 'all') {
        vehicles = vehicles.filter(v => v.make === currentFilters.make);
    }
    
    if (currentFilters.type !== 'all') {
        vehicles = vehicles.filter(v => v.body_type === currentFilters.type);
    }
    
    if (currentFilters.sort === 'price-low') {
        vehicles.sort((a, b) => a.price - b.price);
    } else if (currentFilters.sort === 'price-high') {
        vehicles.sort((a, b) => b.price - a.price);
    } else {
        vehicles.sort((a, b) => b.id - a.id);
    }
    
    return vehicles;
}

function applyFilters() {
    currentFilters.make = document.getElementById('make-filter')?.value || 'all';
    currentFilters.type = document.getElementById('type-filter')?.value || 'all';
    currentFilters.sort = document.getElementById('sort-filter')?.value || 'newest';
    loadVehicleGrid();
}

function clearFilters() {
    currentFilters = { search: '', make: 'all', type: 'all', sort: 'newest' };
    if (document.getElementById('search')) document.getElementById('search').value = '';
    if (document.getElementById('make-filter')) document.getElementById('make-filter').value = 'all';
    if (document.getElementById('type-filter')) document.getElementById('type-filter').value = 'all';
    if (document.getElementById('sort-filter')) document.getElementById('sort-filter').value = 'newest';
    loadVehicleGrid();
}

function updateResultsCount(count) {
    const resultsDiv = document.getElementById('results-count');
    if (resultsDiv) {
        resultsDiv.innerHTML = `<i class="fas fa-car"></i> Showing ${count} vehicle${count !== 1 ? 's' : ''}`;
    }
}

// Vehicle Modal (keep existing from previous code)
function showVehicleModal(vehicleId) {
    const vehicles = getVehicles();
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;
    
    const modalHTML = `
        <div class="modal active" id="vehicle-modal" onclick="closeModalOnOutside(event)">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">&times;</button>
                <img src="${vehicle.image}" alt="${vehicle.year} ${vehicle.make} ${vehicle.model}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 2rem;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
                <p style="font-size: 2rem; color: #1E88E5; font-weight: bold; margin-bottom: 2rem;">$${vehicle.price.toLocaleString()}</p>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0;">
                    <div style="background: rgba(30,136,229,0.1); padding: 1rem; border-radius: 8px;">
                        <div style="color: #C0C0C0; font-size: 0.9rem;">Mileage</div>
                        <div style="font-weight: bold; font-size: 1.1rem;">${vehicle.mileage.toLocaleString()} mi</div>
                    </div>
                    <div style="background: rgba(30,136,229,0.1); padding: 1rem; border-radius: 8px;">
                        <div style="color: #C0C0C0; font-size: 0.9rem;">Transmission</div>
                        <div style="font-weight: bold; font-size: 1.1rem;">${vehicle.transmission}</div>
                    </div>
                    <div style="background: rgba(30,136,229,0.1); padding: 1rem; border-radius: 8px;">
                        <div style="color: #C0C0C0; font-size: 0.9rem;">Fuel Type</div>
                        <div style="font-weight: bold; font-size: 1.1rem;">${vehicle.fuel_type}</div>
                    </div>
                </div>
                
                <div style="margin: 2rem 0;">
                    <h3 style="margin-bottom: 1rem;">Features</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
                        ${vehicle.features.map(f => `<div><i class="fas fa-check" style="color: #1E88E5;"></i> ${f}</div>`).join('')}
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <a href="tel:737-708-5302" class="btn btn-primary" style="flex: 1; text-align: center;"><i class="fas fa-phone"></i> Call: (737) 708-5302</a>
                    <a href="mailto:info@andyautorepair.com" class="btn btn-outline" style="flex: 1; text-align: center;"><i class="fas fa-envelope"></i> Email Us</a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeModal() {
    const modal = document.getElementById('vehicle-modal');
    if (modal) modal.remove();
}

function closeModalOnOutside(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
}

// Contact & Financing Form
function initContactPage() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function initFinancingPage() {
    const form = document.getElementById('financing-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
    
    // Responsive menu handler
    window.addEventListener('resize', () => {
        const navLinks = document.getElementById('nav-links');
        if (window.innerWidth > 1024 && navLinks) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
        }
    });
}

// Modal Styles
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(10, 34, 64, 0.95);
        z-index: 2000;
        overflow-y: auto;
    }
    .modal.active {
        display: block;
    }
    .modal-content {
        max-width: 900px;
        margin: 2rem auto;
        background: linear-gradient(135deg, #1A2845 0%, #0F3058 100%);
        border: 1px solid rgba(30, 136, 229, 0.3);
        border-radius: 12px;
        padding: 2rem;
        position: relative;
    }
    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: #FFFFFF;
        font-size: 2rem;
        cursor: pointer;
    }
`;
document.head.appendChild(modalStyle);