document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const responseDiv = document.getElementById('form-response');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (response.ok) {
                responseDiv.textContent = 'Thank you! Your request has been received. We will contact you soon.';
                responseDiv.style.color = '#4caf50'; // Green
                form.reset();
            } else {
                responseDiv.textContent = 'Error: ' + result.message;
                responseDiv.style.color = '#f44336'; // Red
            }
        } catch (error) {
            responseDiv.textContent = 'Failed to connect to the server. Please try again later.';
            responseDiv.style.color = '#f44336'; // Red
            console.error('Error:', error);
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
