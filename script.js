
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        const submitBtn = document.getElementById('submitBtn');

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formMessage.classList.remove('show');

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.status === 200) {
                    // Success
                    formMessage.textContent = '✅ Message sent successfully! We\'ll get back to you soon.';
                    formMessage.className = 'form-message success show';
                    contactForm.reset();
                } else {
                    // Error
                    formMessage.textContent = '❌ ' + (data.message || 'Something went wrong. Please try again.');
                    formMessage.className = 'form-message error show';
                }
            } catch (error) {
                // Network error
                formMessage.textContent = '❌ Network error. Please check your connection and try again.';
                formMessage.className = 'form-message error show';
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.remove('show');
                }, 5000);
            }
        });