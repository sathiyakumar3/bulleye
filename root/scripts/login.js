"use strict";

// Class Definition
var KTLogin = function() {
    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    var restore_credentials = function() {
        var email = getCookie('em');
        var ps = getCookie('ps');
        var rm = getCookie('rm');

        if (rm) {
            if (email != '' && ps != '') {
                document.getElementById("username").value = email;
                document.getElementById("password").value = ps;

            }
            document.getElementById("rememberme").checked = true;
        } else {
            document.getElementById("rememberme").checked = false;
        }

        const checkbox = document.getElementById('rememberme')

        checkbox.addEventListener('change', (event) => {
            if (!event.currentTarget.checked) {
                eraseCookie('rm');
                eraseCookie('em');
                eraseCookie('pw');
            }
        })

    }
    var _handleFormSignin = function() {
        var form = KTUtil.getById('kt_login_singin_form2');
        //var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_login_singin_form_submit_button');

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        username: {
                            validators: {
                                notEmpty: {
                                    message: 'Email is required'
                                }
                              
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: 'Password is required'
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                        bootstrap: new FormValidation.plugins.Bootstrap({
                        })
                    }
                }
            ).on('core.form.valid', function() {

                KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Please wait");
                var email = form.querySelector('[name="username"]').value;
                var password = form.querySelector('[name="password"]').value;
                var rememberme = document.getElementById("rememberme").checked
                if (rememberme) {
                    setCookie('em', email);
                    setCookie('ps', password)
                    setCookie('rm', rememberme)
                }

                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        KTUtil.btnRelease(formSubmitButton);
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        form.reset();
                        KTUtil.btnRelease(formSubmitButton);
                        Swal.fire({
                            icon: 'error',
                            title: "Login Error",
                            text: errorMessage,
                            footer: '<a href="custom/pages/login/signup.html" >Do you want to create an account?</a>'
                        })
                    });  

            }).on('core.form.invalid', function() {
                form.reset();
                Swal.fire({
                    text: "Sorry, looks like there are some errors detected, please try again.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() {
                    KTUtil.scrollTop();
                });
            });
    }





    // Public Functions
    return {
        init: function() {
         
            _handleFormSignin();
            restore_credentials();
        }
    };
}();



// Class Initialization
jQuery(document).ready(function() {
    KTLogin.init();
});