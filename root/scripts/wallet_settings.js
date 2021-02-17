"use strict";
var HOST_URL = "https://preview.keenthemes.com/metronic/theme/html/tools/preview";
var wallet_Ref = "";
var wallet_id = "";

function test3(d) {

    console.log(d);

    document.getElementById("icon_text").value = d;
    document.getElementById("sel_icon").innerHTML = '<svg><use xlink:href="#' + d + '"></use></svg>      ';
}

function input_icon() {
    console.log('YEa');
    table_icons.style.display = "block";
}
var start_app = function() {


    var add_cat_validation = function() {
        FormValidation.formValidation(
            document.getElementById('add_cat_form'), {
                fields: {
                    cat_name_form: {
                        validators: {
                            notEmpty: {
                                message: 'A Name is required.'
                            }
                        }
                    },
                    cat_icon_form: {
                        validators: {
                            notEmpty: {
                                message: 'An icon is required.'
                            }
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Validate fields when clicking the Submit button
                    submitButton: new FormValidation.plugins.SubmitButton(),

                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap({
                        eleInvalidClass: '',
                        eleValidClass: '',
                    })
                }
            }
        ).on('core.form.valid', function() {

            var name = document.getElementById('add_cat_form').querySelector('[name="cat_name_form"]').value;
            var icon = document.getElementById('add_cat_form').querySelector('[name="cat_icon_form"]').value;
            var data = {
                name: name,
                icon: icon
            }
            console.log(data);

            addoptdata(wallet_Ref.collection('categories'), data).then(function() {
                console.log('sucess');
            }).catch((error) => {
                console.log(error);
            });


        });
    }


    return {
        init: function() {

            add_cat_validation();
        },
        refresh: function() {

        },

    };
}();




jQuery(document).ready(function() {
    wallet_id = global_data[0];
    var wallet_name = global_data[1];
    console.log(wallet_name);
    document.getElementById("t_wallet_name").innerText = wallet_name;
    document.getElementById("t_wallet_id").innerText = wallet_id;
    wallet_Ref = db.collection("wallets").doc(wallet_id);
    start_app.init();
});