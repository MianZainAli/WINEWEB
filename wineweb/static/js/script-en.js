const stripe = Stripe('pk_test_51NvaioKUQgF63I9Q0PdCaaBsQp3jY9nawjR3WL4dMUZu5uDWOciJMTX5uGZmongt3468h5s4JABQVYNG663JMZtr00bHTF2hIK');

document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the checkout button
    const checkoutButton = document.getElementById('checkout-button');

    // Add event listener to the checkout button
    checkoutButton.addEventListener('click', function () {
        // Get reference to the privacy checkbox
        const privacyCheckbox = document.getElementById('privacyCheck');

        // Check if privacy checkbox is checked
        if (!privacyCheckbox.checked) {
            // If checkbox is not checked, show an alert and return
            alert('Please accept the privacy policy.');
            return; // Stop further execution
        }

        // Prepare request headers
        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        // Call the Flask endpoint to create a Checkout session
        fetch('https://foodie-56c41215e495.herokuapp.com/lavineria/create-checkout-session', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                customer_email: $('#inputMail').val(),
                customer_name: $('#inputName').val(),
                customer_surname: $('#inputSurname').val(),
                customer_phone: $('#inputPhone').val(),
                customer_news: $('#commercialCheck').val(),
                customer_privacy: $('#privacyCheck').val(),
                customer_turn: $('#customer_turn').val(),
                customer_date: $('#customer_date').val(),
                customer_people: $('#customer_people').val(),
                customer_table: $('#table_number').val(),
                customer_note: $('#inputNote').val()
            }),
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (session) {
            // Redirect to the Stripe Checkout session URL
            return stripe.redirectToCheckout({ sessionId: session.sessionId });
        })
        .then(function (result) {
            // Handle any errors that might occur during redirection
            if (result.error) {
                console.error('Error:', result.error.message);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
    });
});



$('.button-table').on('click', function (){
    $('#exampleModalLabel').text("Tavolo " + $(this).attr('data-number'))
    $('#table_number').val($(this).attr('data-number'))

    $('#inputPeople').val(parseInt($(this).attr('data-min-people')))
    $('#inputPeople').attr('min', parseInt($(this).attr('data-min-people')))
    $('#inputPeople').attr('max', parseInt($(this).attr('data-max-people')))
    $('#exampleModal').modal('show')
})


document.addEventListener("DOMContentLoaded", function () {
    var myCarousel = new bootstrap.Carousel(document.getElementById("carouselExampleFade"), {
        interval: false, // Set to false to disable automatic scrolling
    });
});



$(document).ready(function () {
  // Initialize the wizard
  var wizard = $("#example-basic").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "none",
    autoFocus: true,
    stepsOrientation: "vertical",
  });

  // Array to hold disabled dates
  var disabledDates = [];

  // Fetch disabled dates from the backend
  $.ajax({
    url: 'https://foodie-56c41215e495.herokuapp.com/lavineria/festivita', // Replace with your actual backend URL
    method: 'GET',
    success: function (response) {
      console.log("Response from backend:", response); // Log the full response
      
      // Check if the response contains a data array and extract the disabled dates
      if (response.data && Array.isArray(response.data)) {
        disabledDates = response.data.map(item => item.days); // Extracting 'days' values
        console.log("Disabled Dates Array:", disabledDates); // Log the disabled dates array
      } else {
        console.error("Unexpected response format:", response);
      }

      // Initialize the datepicker with the disabled dates
      initializeDatepicker(disabledDates);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching disabled dates:", error);
    }
  });

  // Function to initialize the datepicker
  function initializeDatepicker(disabledDates) {
    $('#datepickerContainer').datepicker({
      format: 'dd/mm/yyyy', // Display format for the datepicker
      autoclose: true,
      startDate: '+1d', // Start from tomorrow
      language: 'en', // Set language to English
      todayHighlight: false, // Highlight today's date
      beforeShowDay: function (date) { // Function to disable specific dates
        // Format the date for comparison as mm-dd
        var month = ('0' + (date.getMonth() + 1)).slice(-2); // Month in mm format
        var day = ('0' + date.getDate()).slice(-2); // Day in dd format
        var formattedDate = month + '-' + day; // Combine to mm-dd for comparison

        // Debugging log to see which dates are being checked
        console.log("Checking date:", formattedDate);

        // Check if the formatted date is in the disabledDates array
        const isDisabled = disabledDates.includes(formattedDate);
        console.log("Is Disabled:", isDisabled);

        // Return whether the date is enabled
        return {
          enabled: !isDisabled,
          classes: isDisabled ? 'disabled-date' : '',
          tooltip: isDisabled ? 'Non disponibile' : ''
        }; // [isEnabled, class]
      }
    }).on('changeDate', function (e) {
      var selectedDate = e.format(); // Get selected date in dd/mm/yyyy format
      $('#customer_date').val(selectedDate);
      var table = $('#table_number').val();
      var shop = $('#shop_number').val(); 

      // Fetch available turns from the backend
      $.ajax({
        url: 'https://foodie-56c41215e495.herokuapp.com/lavineria/api/turns/data',
        method: 'POST',
        data: { selectedDate: selectedDate, table: table, shop: shop }, // Data to send to the backend
        success: function (response) {
          console.log("Available turns response:", response); // Log the response
          $('#section_hour').empty();
          $('#section_people').empty();

          // Populate available turns
          for (var key in response) {
            if (response.hasOwnProperty(key)) {
              var element = response[key];
              var button = $('<button>', {
                text: element.turn_description,
                class: 'btn btn-primary m-1 btn-turn',
                'data-value': element.turn_id,
              });
              $('#section_hour').append(button);
            }
          }

          // Populate number of people buttons based on first available turn
          var firstTurnKey = Object.keys(response)[0];
          if (firstTurnKey) {
            var firstTurn = response[firstTurnKey];
            for (let i = firstTurn.table_min; i <= firstTurn.table_max; i++) {
              var button_people = $('<button>', {
                text: i,
                class: 'btn btn-primary m-1 btn-people',
              });
              $('#section_people').append(button_people);
            }
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching turns data:", error);
        }
      });

      // Show step 2 in the wizard
      wizard.steps("next");

      // Update step display
      setTimeout(function () {
        $("#example-basic-t-0").html('<span class="number">1.</span><b> ' + selectedDate + '</b>');
      }, 100);
    });

    // Handle click events on buttons inside #section_hour
    $('#section_hour').on('click', '.btn-turn', function () {
      $("#example-basic-t-1").html('<span class="number">2.</span><b> ' + $(this).text() + '</b>');
      $('#customer_turn').val($(this).data('value'));
      wizard.steps("next");
    });

    // Handle click events on buttons inside #section_people
    $('#section_people').on('click', '.btn-people', function () {
      $("#example-basic-t-2").html('<span class="number">3.</span><b> ' + $(this).text() + '</b>');
      $('#customer_people').val($(this).text());
      wizard.steps("next");
    });
  }
});







