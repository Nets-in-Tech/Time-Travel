// State management
const state = {
    currentYear: 2026,
    currentTime: 'present',
    currentSlide: 0,
    isZooming: false
};

// Year data with characteristics
const yearData = {
    1990: {
        title: 'Automation',
        description: 'The years have started working on the automations you know',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
        slides: [
            {
                title: 'Industrial Revolution',
                description: 'Early automation systems begin transforming manufacturing',
                image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
            },
            {
                title: 'Computer Networks',
                description: 'The foundation of modern connectivity is established',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
            },
            {
                title: 'Personal Computing',
                description: 'Computers become accessible to everyday users',
                image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
            },
            {
                title: 'Digital Communication',
                description: 'New ways of connecting people across distances emerge',
                image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop'
            }
        ]
    },
    2026: {
        title: 'AI Integration',
        description: 'Artificial intelligence becomes seamlessly integrated into daily life',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
        slides: [
            {
                title: 'Smart Assistants',
                description: 'AI assistants help manage our daily tasks and decisions',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
            },
            {
                title: 'Autonomous Systems',
                description: 'Self-driving vehicles and automated services become common',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
            },
            {
                title: 'Virtual Reality',
                description: 'Immersive experiences blur the line between digital and physical',
                image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop'
            },
            {
                title: 'Quantum Computing',
                description: 'Breakthrough computing power opens new possibilities',
                image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop'
            }
        ]
    },
    2040: {
        title: 'Future Vision',
        description: 'Technology reaches new heights of integration and capability',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
        slides: [
            {
                title: 'Neural Interfaces',
                description: 'Direct brain-computer interfaces enable new forms of interaction',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
            },
            {
                title: 'Space Exploration',
                description: 'Humanity expands beyond Earth with advanced space technology',
                image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop'
            },
            {
                title: 'Sustainable Tech',
                description: 'Clean energy and eco-friendly solutions dominate',
                image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop'
            },
            {
                title: 'Global Connectivity',
                description: 'Instant communication connects every corner of the world',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
            }
        ]
    }
};

// DOM Elements
const telescopeScene = document.getElementById('telescope-scene');
const circularScene = document.getElementById('circular-scene');
const yearSelector = document.getElementById('year-selector');
const yearItems = document.querySelectorAll('.year-item');
const pastBtn = document.getElementById('past-btn');
const presentBtn = document.getElementById('present-btn');
const futureBtn = document.getElementById('future-btn');
const glimpseBtn = document.getElementById('glimpse-btn');
const telescopeWrapper = document.querySelector('.telescope-wrapper');
const circularContent = document.getElementById('circular-content');
const slideIndicators = document.getElementById('slide-indicators');
const prevSlideBtn = document.getElementById('prev-slide');
const nextSlideBtn = document.getElementById('next-slide');
const offGlimpseBtn = document.getElementById('off-glimpse-btn');
const forwardLabel = document.querySelector('.forward-label');
const backwardLabel = document.querySelector('.backward-label');

// Initialize
function init() {
    setupEventListeners();
    updateYearDisplay();
}

// Setup event listeners
function setupEventListeners() {
    // Time navigation buttons
    pastBtn.addEventListener('click', () => handleTimeSelection('past'));
    presentBtn.addEventListener('click', () => handleTimeSelection('present'));
    futureBtn.addEventListener('click', () => handleTimeSelection('future'));
    
    // Glimpse button
    glimpseBtn.addEventListener('click', handleGlimpse);
    
    // Slide navigation
    prevSlideBtn.addEventListener('click', () => navigateSlide(-1));
    nextSlideBtn.addEventListener('click', () => navigateSlide(1));
    
    // Forward/Backward navigation
    forwardLabel.addEventListener('click', handleForward);
    backwardLabel.addEventListener('click', handleBackward);
    
    // Off glimpse button
    offGlimpseBtn.addEventListener('click', handleOffGlimpse);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

// Handle time selection
function handleTimeSelection(time) {
    if (state.isZooming) return;
    
    state.currentTime = time;
    
    // Update button states
    [pastBtn, presentBtn, futureBtn].forEach(btn => {
        btn.classList.remove('active', 'pressed');
    });
    
    const activeBtn = document.getElementById(`${time}-btn`);
    activeBtn.classList.add('active');
    
    // Add pressed effect
    activeBtn.classList.add('pressed');
    setTimeout(() => {
        activeBtn.classList.remove('pressed');
    }, 200);
    
    // Update year based on time selection
    let targetYear;
    switch(time) {
        case 'past':
            targetYear = 1990;
            break;
        case 'present':
            targetYear = 2026;
            break;
        case 'future':
            targetYear = 2040;
            break;
    }
    
    state.currentYear = targetYear;
    updateYearDisplay();
}

// Update year display with scrolling animation
function updateYearDisplay() {
    // Remove active class from all items
    yearItems.forEach((item) => {
        item.classList.remove('active');
    });
    
    // Find and activate the current year
    const activeItem = Array.from(yearItems).find(
        item => parseInt(item.dataset.year) === state.currentYear
    );
    
    if (activeItem) {
        activeItem.classList.add('active');
        
        // Calculate scroll position based on time selection
        let scrollPosition = 0;
        const yearIndex = Array.from(yearItems).findIndex(
            item => parseInt(item.dataset.year) === state.currentYear
        );
        
        // Scroll positions: 0% (top), 33.33% (middle), 66.66% (bottom)
        if (state.currentTime === 'past') {
            // Show 1990 at top
            scrollPosition = 0;
        } else if (state.currentTime === 'future') {
            // Show 2040 at bottom (scroll down)
            scrollPosition = 66.66;
        } else {
            // Show 2026 in middle
            scrollPosition = 33.33;
        }
        
        yearSelector.style.transform = `translateY(-${scrollPosition}%)`;
    }
}

// Handle glimpse button click
function handleGlimpse() {
    if (state.isZooming) return;
    
    state.isZooming = true;
    glimpseBtn.disabled = true;
    
    // Add zoom class to telescope
    telescopeWrapper.classList.add('zooming');
    
    // Wait for zoom animation, then transition to circular scene
    setTimeout(() => {
        telescopeScene.classList.remove('active');
        circularScene.classList.add('active');
        loadCircularContent();
        state.isZooming = false;
    }, 2000);
}

// Load circular content based on current year
function loadCircularContent() {
    const data = yearData[state.currentYear];
    if (!data) return;
    
    circularContent.innerHTML = '';
    slideIndicators.innerHTML = '';
    
    // Create slides
    data.slides.forEach((slideData, index) => {
        const slide = document.createElement('div');
        slide.className = `slide year-${state.currentYear}`;
        if (index === 0) slide.classList.add('active');
        
        slide.innerHTML = `
            <h2 class="slide-title">${slideData.title}</h2>
            <p class="slide-description">${slideData.description}</p>
            <img src="${slideData.image}" alt="${slideData.title}" class="slide-image" onerror="this.style.display='none'">
        `;
        
        circularContent.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        slideIndicators.appendChild(indicator);
    });
    
    state.currentSlide = 0;
    updateCircularFrame();
}

// Navigate slides
function navigateSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    const newIndex = state.currentSlide + direction;
    
    if (newIndex >= 0 && newIndex < slides.length) {
        slides[state.currentSlide].classList.remove('active');
        slides[state.currentSlide].classList.add(direction > 0 ? 'prev' : 'next');
        
        state.currentSlide = newIndex;
        
        slides[state.currentSlide].classList.remove('prev', 'next');
        slides[state.currentSlide].classList.add('active');
        
        updateSlideIndicators();
    }
}

// Go to specific slide
function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index < 0 || index >= slides.length) return;
    
    slides[state.currentSlide].classList.remove('active');
    state.currentSlide = index;
    slides[state.currentSlide].classList.add('active');
    
    updateSlideIndicators();
}

// Update slide indicators
function updateSlideIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === state.currentSlide);
    });
}

// Update circular frame background color
function updateCircularFrame() {
    const circularFrame = document.getElementById('circular-frame');
    // Remove all year classes
    circularFrame.classList.remove('year-1990', 'year-2026', 'year-2040');
    // Add current year class
    circularFrame.classList.add(`year-${state.currentYear}`);
}

// Handle forward navigation (next year)
function handleForward() {
    const years = [1990, 2026, 2040];
    const currentIndex = years.indexOf(state.currentYear);
    
    if (currentIndex < years.length - 1) {
        state.currentYear = years[currentIndex + 1];
        updateYearFromCircular();
    }
}

// Handle backward navigation (previous year)
function handleBackward() {
    const years = [1990, 2026, 2040];
    const currentIndex = years.indexOf(state.currentYear);
    
    if (currentIndex > 0) {
        state.currentYear = years[currentIndex - 1];
        updateYearFromCircular();
    }
}

// Update year from circular scene
function updateYearFromCircular() {
    loadCircularContent();
    updateCircularFrame();
    
    // Update time button state
    let time;
    if (state.currentYear === 1990) time = 'past';
    else if (state.currentYear === 2026) time = 'present';
    else time = 'future';
    
    state.currentTime = time;
    [pastBtn, presentBtn, futureBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${time}-btn`).classList.add('active');
}

// Handle off glimpse (return to telescope scene)
function handleOffGlimpse() {
    circularScene.classList.remove('active');
    telescopeScene.classList.add('active');
    
    // Reset telescope zoom
    telescopeWrapper.classList.remove('zooming');
    glimpseBtn.disabled = false;
}

// Keyboard navigation
function handleKeyboard(e) {
    if (circularScene.classList.contains('active')) {
        switch(e.key) {
            case 'ArrowLeft':
                navigateSlide(-1);
                break;
            case 'ArrowRight':
                navigateSlide(1);
                break;
            case 'Escape':
                handleOffGlimpse();
                break;
        }
    } else if (telescopeScene.classList.contains('active')) {
        switch(e.key) {
            case '1':
                handleTimeSelection('past');
                break;
            case '2':
                handleTimeSelection('present');
                break;
            case '3':
                handleTimeSelection('future');
                break;
            case 'Enter':
            case ' ':
                if (!state.isZooming) handleGlimpse();
                break;
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
