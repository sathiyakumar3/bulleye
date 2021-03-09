"use strict";

// Class Definition
var KTLogin = function() {
    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';




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

            _handleFormForgot();

        }
    };
}();






// Class Initialization
jQuery(document).ready(function() {
    KTLogin.init();
});