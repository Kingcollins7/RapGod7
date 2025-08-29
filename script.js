 const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    hamburger.addEventListener('click', () => {
      menu.classList.toggle('show');
      hamburger.classList.toggle('active');
    });


    document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = this;
    const formMessage = document.getElementById('form-message');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (name === '' || email === '' || subject === '' || message === '') {
        formMessage.textContent = 'Please fill out all fields.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        return;
    }

    if (!validateEmail(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        return;
    }

    // Submit form to Formspree via AJAX
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            form.reset(); // Clear form
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Failed to send message.');
            });
        }
    })
    .catch(error => {
        formMessage.textContent = error.message || 'An error occurred. Please try again later.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
