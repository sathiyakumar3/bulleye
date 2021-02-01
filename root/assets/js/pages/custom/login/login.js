"use strict";

// Class Definition
var KTLogin = function() {
    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

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

    var _handleFormSignup = function() {
        // Base elements
        var wizardEl = KTUtil.getById('kt_login');
        var form = KTUtil.getById('kt_login_signup_form');
        var wizardObj;
        var validations = [];

        if (!form) {
            return;
        }

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        // Step 1
        validations.push(FormValidation.formValidation(
            form, {
                fields: {
                    su_email: {
                        validators: {
                            notEmpty: {
                                message: 'Email is required'
                            },
                            emailAddress: {
                                message: 'Please enter a valid email address'
                            }
                        }
                    },
                    su_password: {
                        validators: {
                            notEmpty: {
                                message: 'Password is required'
                            }
                        }
                    }

                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap({
                        //eleInvalidClass: '',
                        eleValidClass: '',
                    })
                }
            }
        ));

        // Step 2
        validations.push(FormValidation.formValidation(
            form, {
                fields: {

                    su_country: {
                        validators: {
                            notEmpty: {
                                message: 'Country is required'
                            }
                        }
                    },

                    su_name: {
                        validators: {
                            notEmpty: {
                                message: 'A Name is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap({
                        //eleInvalidClass: '',
                        eleValidClass: '',
                    })
                }
            }
        ));

        // Initialize form wizard
        wizardObj = new KTWizard(wizardEl, {
            startStep: 1, // initial active step number
            clickableSteps: false // allow step clicking
        });

        // Validation before going to next page
        wizardObj.on('change', function(wizard) {
            if (wizard.getStep() > wizard.getNewStep()) {
                return; // Skip if stepped back
            }

            // Validate form before change wizard step
            var validator = validations[wizard.getStep() - 1]; // get validator for currnt step

            if (validator) {
                validator.validate().then(function(status) {
                    if (status == 'Valid') {
                        wizard.goTo(wizard.getNewStep());
                        KTUtil.getById("sum_email").value = form.querySelector('[name="su_email"]').value;
                        KTUtil.getById("sum_password").value = form.querySelector('[name="su_password"]').value;
                        KTUtil.getById("sum_name").innerHTML = form.querySelector('[name="su_name"]').value;
                        KTUtil.getById("sum_gender").innerHTML = form.querySelector('[name="su_gender"]').value;
                        KTUtil.getById("sum_contactno").innerHTML = form.querySelector('[name="su_contactno"]').value;
                        KTUtil.getById("sum_country").innerHTML = form.querySelector('[name="su_country"]').value;

                        KTUtil.scrollTop();
                    } else {
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light"
                            }
                        }).then(function() {
                            KTUtil.scrollTop();
                        });
                    }
                });
            }

            return false; // Do not change wizard step, further action will be handled by he validator
        });

        // Change event
        wizardObj.on('changed', function(wizard) {
            KTUtil.scrollTop();
        });

        // Submit event
        wizardObj.on('submit', function(wizard) {
            Swal.fire({
                text: "All is good! Please confirm the form submission.",
                icon: "success",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, submit!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-primary",
                    cancelButton: "btn font-weight-bold btn-default"
                }
            }).then(function(result) {
                if (result.value) {
                    var su_email = form.querySelector('[name="su_email"]').value;
                    var su_password = form.querySelector('[name="su_password"]').value;
                    var su_name = form.querySelector('[name="su_name"]').value;
                    var su_gender = form.querySelector('[name="su_gender"]').value;
                    var su_contactno = form.querySelector('[name="su_contactno"]').value;
                    var su_country = form.querySelector('[name="su_country"]').value;
                    create_account(su_email, su_password, su_name, su_gender, su_contactno, su_country);







                    //    form.submit(); // Submit form





                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Your form has not been submitted!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-primary",
                        }
                    });
                }
            });
        });
    }

    // Public Functions
    return {
        init: function() {
            _handleFormSignin();
            _handleFormForgot();
            _handleFormSignup();
        }
    };
}();

function create_account(su_email, su_password, su_name, su_gender, su_contactno, su_country) {

    Swal.fire({
        title: "Please wait...",
        html: "<p id=\"das\">Adding user.</p>",
        allowEscapeKey: false,
        allowOutsideClick: false,

        onOpen: () => {
            swal.showLoading();
        }
    });

    firebase.auth().createUserWithEmailAndPassword(su_email, su_password)
        .then((userCredential) => {

            var user = userCredential.user;
            document.getElementById("das").innerText = " User Created.";
            firebase.auth().signInWithEmailAndPassword(su_email, su_password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    document.getElementById("das").innerText = "Fetching other details.";
                    user.updateProfile({
                        displayName: su_name,
                    }).then(function() {

                        document.getElementById("das").innerText = "Saved Successfully!";
                        db.collection("users").doc(user.uid).set({
                                name: su_name,
                                gender: su_gender,
                                contact_no: su_contactno,
                                country: su_country,
                                email: su_email
                            })
                            .then(function() {
                                document.getElementById("das").innerText = "Sending Email verification...";
                                user.sendEmailVerification().then(function() {
                                    Swal.fire({
                                            title: 'User account created successfully!',
                                            text: "Check your email for verification.",
                                            icon: 'success',
                                            confirmButtonColor: '#d33',
                                            confirmButtonText: 'Okay'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                firebase.auth().signOut().then(() => {
                                                    // Sign-out successful.
                                                    window.location = "signin.html";
                                                }).catch((error) => {
                                                    // An error happened.
                                                });

                                            }
                                        })
                                        //window.location = "signin.html";
                                }).catch(function(error) {
                                    console.error("Error  document: ", error);
                                });


                            })
                            .catch(function(error) {
                                console.error("Error  document: ", error);
                            });
                    }).catch(function(error) {
                        console.error("Error  document: ", error);
                    });


                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                });







        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });
}




// Class Initialization
jQuery(document).ready(function() {
    KTLogin.init();
});