// Dropdown hypotesis accordion
const accordion = document.querySelector('.accordion');
const items = accordion.querySelectorAll('li');

items.forEach((item) => {
  const input = item.querySelector('input[type="radio"]');
  const label = item.querySelector('label');
  const content = item.querySelector('.content');

  input.addEventListener('click', () => {
    items.forEach((otherItem) => {
      if (otherItem!== item) {
        otherItem.querySelector('.content').style.maxHeight = '0';
      }
    });

    if (content.style.maxHeight === '0px') {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = '0';
    }
  });
});

// Feedback
const form = document.querySelector('.form-login');
const emailInput = document.querySelector('input[type="email"]');
const feedbackInput = document.querySelector('textarea');
const sendBtn = document.querySelector('.send-btn');

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const feedback = feedbackInput.value;

  if (email && feedback) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('feedback', feedback);

    const json = JSON.stringify(Object.fromEntries(formData));
    alert(json);

    emailInput.value = '';
    feedbackInput.value = '';
  } else {
    alert('Please fill in all fields');
  }
});
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());

app.post('/send-email', (req, res) => {
  const { email, feedback } = req.body;

  // Create a transporter object using Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'your-smtp-server.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'your-email-address',
      pass: 'your-email-password',
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'your-email-address',
    to: email,
    subject: 'Feedback from Website',
    text: feedback,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.json({ message: 'Email sent successfully' });
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});