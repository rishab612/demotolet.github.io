import { db } from './firebaseConfig.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Populate form fields from URL parameters if available
        populateFormFieldsFromURL();

        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Hide all messages initially
            document.querySelectorAll('.success-message, .error-message').forEach(msg => msg.style.display = 'none');

            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation
            let valid = true;
            if (!fullName) {
                showError('fullNameError', 'Please enter your full name.');
                valid = false;
            }
            if (!email || !validateEmail(email)) {
                showError('emailError', 'Please enter a valid email address.');
                valid = false;
            }
            if (!phone) {
                showError('phoneError', 'Please enter your phone number.');
                valid = false;
            }
            if (!message) {
                showError('messageError', 'Please enter your message.');
                valid = false;
            }

            if (valid) {
                // Show spinner
                const button = document.getElementById('submitButton');
                button.querySelector('.button-text').style.display = 'none';
                button.querySelector('.button-spinner').style.display = 'inline-block';

                try {
                    // Save to Firebase
                    await addDoc(collection(db, 'contacts'), {
                        fullName: fullName,
                        email: email,
                        phone: phone,
                        message: message,
                        timestamp: new Date()
                    });
                    showSuccess('successMessage', 'Your message has been sent successfully!');
                    contactForm.reset();
                } catch (error) {
                    console.error("Error adding document: ", error);
                    showError('formSubmitError', 'Unable to send your message. Please try again.');
                } finally {
                    // Hide spinner
                    button.querySelector('.button-text').style.display = 'inline-block';
                    button.querySelector('.button-spinner').style.display = 'none';
                }
            }
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function showError(id, message) {
            const element = document.getElementById(id);
            element.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            element.style.display = 'flex';
        }

        function showSuccess(id, message) {
            const element = document.getElementById(id);
            element.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
            element.style.display = 'flex';
        }

        function populateFormFieldsFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            document.getElementById('fullName').value = urlParams.get('fullName') || '';
            document.getElementById('email').value = urlParams.get('email') || '';
            document.getElementById('phone').value = urlParams.get('phone') || '';
            document.getElementById('message').value = urlParams.get('message') || '';
        }
    } else {
        console.error('Contact form element not found.');
    }
});
