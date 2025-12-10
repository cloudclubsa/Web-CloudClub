document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('organizersGrid');
    const wrapper = document.querySelector('.carousel-wrapper');
    const dotsContainer = document.getElementById('dotsContainer');
    const btnPrev = document.querySelector('.arrow-btn.prev');
    const btnNext = document.querySelector('.arrow-btn.next');

    if (!grid || !wrapper) return;

    function getItemStep() {
        const card = grid.querySelector('.organizer-card');
        if (!card) return 0;
        
        const gridStyle = window.getComputedStyle(grid);
        const gap = parseFloat(gridStyle.getPropertyValue('gap')) || 0;
        
        return card.offsetWidth + gap;
    }

    function getVisibleItemsCount() {
        const gridWidth = grid.clientWidth;
        const itemStep = getItemStep();
        if (itemStep === 0) return 0;
        
        return Math.floor((gridWidth + 1) / itemStep);
    }

    function getMaxIndex() {
        const totalCards = grid.querySelectorAll('.organizer-card').length;
        const visibleCards = getVisibleItemsCount();
        
        return Math.max(0, totalCards - visibleCards);
    }

    function updateCarouselState() {
        const maxIndex = getMaxIndex();
        
        if (maxIndex > 0) {
            wrapper.classList.add('carousel-active');
            setupDots(maxIndex);
        } else {
            wrapper.classList.remove('carousel-active');
            dotsContainer.innerHTML = '';
        }
    }

    function setupDots(maxIndex) {
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                scrollToIndex(i);
            });

            dotsContainer.appendChild(dot);
        }
    }

    function scrollToIndex(index) {
        const itemStep = getItemStep();
        grid.scrollTo({ left: index * itemStep, behavior: 'smooth' });
    }

    function updateActiveDot() {
        const itemStep = getItemStep();
        if (itemStep === 0) return;

        const currentScroll = grid.scrollLeft;
        let activeIndex = Math.round(currentScroll / itemStep);

        const maxIndex = getMaxIndex();
        if (activeIndex > maxIndex) activeIndex = maxIndex;

        const dots = document.querySelectorAll('.dot');
        dots.forEach((d, index) => {
            if (index === activeIndex) {
                d.classList.add('active');
            } else {
                d.classList.remove('active');
            }
        });
    }

    function handleScroll(direction) {
        const itemStep = getItemStep();
        const currentScroll = grid.scrollLeft;
        const maxIndex = getMaxIndex();
        
        let currentIndex = Math.round(currentScroll / itemStep);
        let nextIndex;

        if (direction === 'next') {
            nextIndex = currentIndex + 1;
            if (nextIndex > maxIndex) nextIndex = 0;
        } else {
            nextIndex = currentIndex - 1;
            if (nextIndex < 0) nextIndex = maxIndex;
        }

        scrollToIndex(nextIndex);
    }

    // --- EVENT LISTENERS ---
    
    if (btnNext) btnNext.addEventListener('click', () => handleScroll('next'));
    if (btnPrev) btnPrev.addEventListener('click', () => handleScroll('prev'));

    grid.addEventListener('scroll', () => {
        requestAnimationFrame(updateActiveDot);
    });

    window.addEventListener('resize', () => {
        updateCarouselState();
        updateActiveDot(); 
    });

    setTimeout(updateCarouselState, 100);
});