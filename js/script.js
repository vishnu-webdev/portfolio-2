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
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all the input fields before submitting!');
            return;
        }

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        submitBtn.innerText = "Sending...";
        submitBtn.style.pointerEvents = "none";

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
                    window.location.href = './thankyou.html';
                } else {
                    alert(res.message || "Something went wrong!");
                    submitBtn.innerText = "Send Message";
                    submitBtn.style.pointerEvents = "auto";
                }
            })
            .catch(error => {
                console.log(error);
                alert("Something went wrong!");
                submitBtn.innerText = "Send Message";
                submitBtn.style.pointerEvents = "auto";
            });
    });
}