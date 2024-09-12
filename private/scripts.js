let currentIndex = 0;
let slides = document.querySelectorAll('.slide');
let indicators = document.querySelectorAll('.indicator');
let slider = document.querySelector('.slider');
let isPlaying = true;
let intervalId = setInterval(nextSlide, 3000); // Automatically slides every 3 seconds
let isTransitioning = false; // To prevent multiple transitions at once
let pausePlayBtn = document.getElementById('pausePlayBtn');

// Function to update the slider position and active indicator
function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Function to go to the next slide
function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    setTimeout(() => { isTransitioning = false; }, 500);
}

// Function to go to the previous slide
function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    setTimeout(() => { isTransitioning = false; }, 500);
}

// Function to toggle between pause and play
function pausePlay() {
    if (isPlaying) {
        clearInterval(intervalId); // Stop the automatic sliding
        pausePlayBtn.innerHTML = '▶'; // Change the button to the play icon
    } else {
        intervalId = setInterval(nextSlide, 3000); // Resume automatic sliding
        pausePlayBtn.innerHTML = '&#10074;&#10074;'; // Change to the pause icon
    }
    isPlaying = !isPlaying;
}

// Show pause/play button when the user clicks on the slider (but not on next/prev buttons)
function showPauseButton() {
    pausePlayBtn.style.display = 'block'; // Show the button
    clearTimeout(hideTimeout); // Clear previous timeout if there was any
    hideTimeout = setTimeout(() => {
        pausePlayBtn.style.display = 'none'; // Hide the button after 3 seconds
    }, 3000); // Hide the button after 3 seconds of inactivity
}

// Add event listeners for the back and next buttons
document.querySelector('.next').addEventListener('click', () => {
    clearInterval(intervalId);
    nextSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    clearInterval(intervalId);
    prevSlide();
});

// Detect clicks on the slider area (excluding the next and prev buttons)
slider.addEventListener('click', (event) => {
    if (!event.target.classList.contains('prev') && !event.target.classList.contains('next')) {
        showPauseButton();
    }
});

// Automatically hide the pause button after 3 seconds of inactivity
let hideTimeout;

// Function to show the loading spinner
function showLoadingSpinner() {
  document.getElementById('loading-spinner').style.display = 'flex';
}

// Attach event listeners to all links
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function(event) {
      showLoadingSpinner();
      // Give some time for the spinner to show before navigating
      setTimeout(() => {
          window.location.href = this.href;
      }, 500); // You can adjust the delay as per your requirement
      event.preventDefault(); // Prevent immediate navigation
  });
});

// For cases where page loads directly
window.onload = function() {
  document.getElementById('loading-spinner').style.display = 'none'; // Hide spinner when page is fully loaded
};
