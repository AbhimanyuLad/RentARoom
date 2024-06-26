const axios = require('axios');

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


let map;

function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
    // mapTypeId: "terrain"
  });

  new google.maps.Marker({
    position: {lat: -34.397, lng: 150.644},
    map: map,
    label:"A",
    title:"ne",
    draggable: false,
    animation: google.maps.Animation.DROP
  })


}





