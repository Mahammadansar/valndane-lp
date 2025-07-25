$(document).ready(function(){
        $('#send_message').click(function(e){
            
            //Stop form submission & check the validation
            e.preventDefault();
            
            // Variable declaration
            var error = false;
            var name = $('#name').val();
            var email = $('#email').val();
            
            $('#name,#email,#message').click(function(){
                $(this).removeClass("error_input");
            });
            
            // Form field validation
            if(name.length == 0){
                var error = true;
                $('#name').addClass("error_input");
            }else{
                $('#name').removeClass("error_input");
            }
            if(email.length == 0 || email.indexOf('@') == '-1'){
                var error = true;
                $('#email').addClass("error_input");
            }else{
                $('#email').removeClass("error_input");
            }
            // If there is no validation error, next to process the mail function
            if(error == false){
               // Disable submit button just after the form processed 1st time successfully.
                $('#send_message').attr({'disabled' : 'true', 'value' : 'Sending...' });
                
                /* Post Ajax function of jQuery to get all the data from the submission of the form as soon as the form sends the values to booking.php*/
                $.post("booking.php", $("#booking_form").serialize(),function(result){
                    //Check the result set from booking.php file.
                    if(result == 'sent'){
                        //If the email is sent successfully, remove the submit button
                         $('#booking_form').remove();
                        //Display the success message
                        $('#success_message_col').fadeIn(500);
                    }else{
                        //Display the error message
                        $('#mail_fail').fadeIn(500);
                        // Enable the submit button again
                        $('#send_message').removeAttr('disabled').attr('value', 'Send The Message');
                    }
                });
            }
        });    
    });