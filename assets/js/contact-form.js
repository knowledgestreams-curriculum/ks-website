// Get the form element
var thisForm = document.querySelector('#contact-us-form');

// Add a submit event listener
thisForm.addEventListener('submit', function (e) {
     // Prevent the form from submitting
     e.preventDefault();

     thisForm.querySelector('.loading').classList.add('d-block');
     thisForm.querySelector('.error-message').classList.remove('d-block');
     thisForm.querySelector('.sent-message').classList.remove('d-block');

     // Create a new FormData object
     var formData = new FormData(thisForm);

     // Convert the form data to a JSON object
     var data = {};
     formData.forEach(function (value, key) {
          data[key] = value;
     });

     // Send the data to Firebase
     var database = firebase.database();
     const newRef = database.ref('form-responses').push(data);

     newRef.then(function () {
          thisForm.querySelector('.loading').classList.remove('d-block');
          thisForm.querySelector('.error-message').classList.remove('d-block');
          thisForm.querySelector('.sent-message').classList.add('d-block');
     }).catch(function (error) {
          thisForm.querySelector('.loading').classList.remove('d-block');
          thisForm.querySelector('.error-message').innerHTML = "Failed to send a message. Please try later or send an email at info@knowledge.tech";
          thisForm.querySelector('.error-message').classList.add('d-block');
     });
});
