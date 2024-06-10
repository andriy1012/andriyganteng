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
function sendMail() {
  var params = {
    email: document.getElementById("Email").value,
    message: document.getElementById("feedback").value,
  };

  const serviceID = "service_f4k1kht";
  const templateID = "template_ymgnkek";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("Email").value = "";
        document.getElementById("feedback").value = "";
        console.log(res);
        alert("Your message sent successfully!!")

    })
    .catch(err=>console.log(err));

}