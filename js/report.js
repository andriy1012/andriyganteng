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
