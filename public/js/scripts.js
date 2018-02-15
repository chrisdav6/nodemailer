$(function() {
  
  $('.countdown').countdown({
    date: "July 28, 2018 15:03:26"
  });
  
  //Show Form Submission Message
  $(".message").hide();
  
  $('form').submit( function(event) {
    var formId = this.id,
        form = this;
    $(".message").fadeIn().delay(1000).fadeOut();

    event.preventDefault();

    setTimeout( function () { 
        form.submit();
    }, 3000);
  });
   
});