const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

const submitBtn = document.getElementById('submitBtn');
const contactForm = document.getElementById('contactForm');

if (submitBtn && contactForm) {
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Check if inputs are filled
        if (!name || !email || !message) {
            alert('Please fill out all the input fields before submitting!');
            return;
        }

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        // Send data to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status === 200) {
                // Successfully sent email, now redirect to your local thankyou page
                window.location.href = './thankyou.html';
            } else {
                alert(res.message || "Something went wrong!");
            }
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        });
    });
}