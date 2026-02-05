function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim() || 'Contact Form Submission';
      const message = contactForm.message.value.trim();

      if (!name) {
        alert('Please enter your name.');
        contactForm.name.focus();
        return;
      }

      if (!email) {
        alert('Please enter your email address.');
        contactForm.email.focus();
        return;
      }

      if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        contactForm.email.focus();
        return;
      }

      if (!message) {
        alert('Please enter a message.');
        contactForm.message.focus();
        return;
      }

      // Create mailto link with form data
      const mailtoLink = `mailto:Leah.vickyhomes@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show confirmation message
      alert('Your email client will open with the message pre-filled. Please send the email from your email client.');

      // Reset form
      contactForm.reset();
    });
  }
});
