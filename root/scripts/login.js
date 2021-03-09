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
        var form = KTUtil.getById('kt_login_singin_form');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_login_singin_form_submit_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        username: {
                            validators: {
                                notEmpty: {
                                    message: 'Username is required'
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
                            //	eleInvalidClass: '', // Repace with uncomment to hide bootstrap validation icons
                            //	eleValidClass: '',   // Repace with uncomment to hide bootstrap validation icons
                        })
                    }
                }
            )
            .on('core.form.valid', function() {
                // Show loading state on button
                KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Please wait");

                // Simulate Ajax request
                /* 				setTimeout(function() {
                					KTUtil.btnRelease(formSubmitButton);
                				}, 2000);
                 */
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
                        KTUtil.btnRelease(formSubmitButton);
                        Swal.fire({
                            icon: 'error',
                            title: "Login Error",
                            text: errorMessage,
                            footer: '<a href="custom/pages/login/signup.html" >Do you want to create an account?</a>'
                        })
                    });

                // Form Validation & Ajax Submission: https://formvalidation.io/guide/examples/using-ajax-to-submit-the-form

                /* 		        FormValidation.utils.fetch(formSubmitUrl, {
                		            method: 'POST',
                					dataType: 'json',
                		            params: {
                		                name: form.querySelector('[name="username"]').value,
                		                email: form.querySelector('[name="password"]').value,
                		            },
                		        }).then(function(response) { // Return valid JSON
                					// Release button
                					KTUtil.btnRelease(formSubmitButton);
                					console.log("Sent!");
                					if (response && typeof response === 'object' && response.status && response.status == 'success') {
                						Swal.fire({
                			                text: "All is cool! Now you submit this form",
                			                icon: "success",
                			                buttonsStyling: false,
                							confirmButtonText: "Ok, got it!",
                							customClass: {
                								confirmButton: "btn font-weight-bold btn-light-primary"
                							}
                			            }).then(function() {
                							KTUtil.scrollTop();
                						});
                					} else {
                						Swal.fire({
                			                text: "Sorry, something went wrong, please try again.",
                			                icon: "error",
                			                buttonsStyling: false,
                							confirmButtonText: "Ok, got it!",
                							customClass: {
                								confirmButton: "btn font-weight-bold btn-light-primary"
                							}
                			            }).then(function() {
                							KTUtil.scrollTop();
                						});
                					}
                		        }); */

            })
            .on('core.form.invalid', function() {
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



    var _handleFormForgot = function() {
        var form = KTUtil.getById('kt_login_forgot_form');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_login_forgot_form_submit_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        email: {
                            validators: {
                                notEmpty: {
                                    message: 'Email is required'
                                },
                                emailAddress: {
                                    message: 'The value is not a valid email address'
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                        bootstrap: new FormValidation.plugins.Bootstrap({
                            //	eleInvalidClass: '', // Repace with uncomment to hide bootstrap validation icons
                            //	eleValidClass: '',   // Repace with uncomment to hide bootstrap validation icons
                        })
                    }
                }
            )
            .on('core.form.valid', function() {
                // Show loading state on button
                KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Please wait");


                var emailAddress = form.querySelector('[name="email"]').value;

                firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
                    Swal.fire({
                        icon: 'success',
                        title: 'Password Reset',
                        text: 'A reset email has been sent to ' + emailAddress,
                    })
                    KTUtil.btnRelease(formSubmitButton);
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    KTUtil.btnRelease(formSubmitButton);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Reset Error',
                        text: errorMessage,
                    })
                });




            })
            .on('core.form.invalid', function() {
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
            restore_credentials();
            _handleFormSignin();
            _handleFormForgot();

        }
    };
}();






// Class Initialization
jQuery(document).ready(function() {
    KTLogin.init();
});