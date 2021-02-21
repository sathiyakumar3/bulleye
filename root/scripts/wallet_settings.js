var wallet_Ref = "";
var wallet_id = "";
var cat_table;
var user_table;
var user_id;
var user_Ref = db.collection("users");

function change_icon(d) {

    document.getElementById("icon_text").value = d;
    document.getElementById("sel_icon").innerHTML = '<svg><use xlink:href="#' + d + '"></use></svg>';
}

function input_icon() {
    console.log('YEa');
    table_icons.style.display = "block";
}




function build_cat_table(obj) {

    var promises = [];
    for (let i = 0; i < obj.length; i++) {

        const user_details_prom = new Promise((resolve, reject) => {
            var icon_name = obj[i]['icon'];
            var cat_name = obj[i]['name'];
            var datetime = obj[i]['created_on'];
            var created_by = obj[i]['created_by'];
            get_user_info(created_by).then((function(doc) { //
                var delete_button = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="del_cat(\'' + i + '\')">' +
                    '        <span class="svg-icon svg-icon-md svg-icon-primary">' +
                    '            <!--begin::Svg Icon | path:assets/media/svg/icons/General/Trash.svg-->' +
                    '            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                    '                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                    '                    <rect x="0" y="0" width="24" height="24"></rect>' +
                    '                    <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>' +
                    '                    <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>' +
                    '                </g>' +
                    '            </svg>' +
                    '            <!--end::Svg Icon-->' +
                    '        </span>' +
                    '    </a>';
                var myvar = '<tr>' + '<td>' + icon_nd_name(icon_name, cat_name) + ' </td>' +
                    ' <td>' + dnt4table(datetime) + '</td>' +
                    '  <td>' + doc + '</td>' +
                    '                                            <td class="text-center">' +
                    '<div class="text-right">' + delete_button + '</div>' +
                    '                                            </td>' +
                    '                                        </tr>';

                resolve(myvar);
            })).catch((error) => {
                console.error(error);
            });
        });
        promises.push(user_details_prom);
    }

    return Promise.all(promises).then((values) => {

        return values
    });
}

function build_user_table(obj) {
    var promises = [];
    for (let i = 0; i < obj.length; i++) {

        const user_details_prom = new Promise((resolve, reject) => {
            var user = obj[i];

            var docRef = db.collection("users");
            /*        getoptdata(docRef,user).then((function(finalResult) {
        
             
                var name = finalResult.name;               
                var email = finalResult.email;
                var contact_no = finalResult.contact_no;

        
                get_user_icon(user_local.uid).then((url) => {
                    image_add(url);
                }).catch((error) => {
                    image_add(error);
                    console.log(error);
                });
                load_navi().then(function(data) {
                    generate_navi(data, finalResult.primary_wallet);
                }).catch((error) => {
                    console.log(error);
                });
        
        
            })).catch((error) => {
                console.error(error);
            });
 */


            get_user_info(user).then((function(doc) { //
                var delete_button = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="del_user(\'' + i + '\')">' +
                    '        <span class="svg-icon svg-icon-md svg-icon-primary">' +
                    '            <!--begin::Svg Icon | path:assets/media/svg/icons/General/Trash.svg-->' +
                    '            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                    '                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                    '                    <rect x="0" y="0" width="24" height="24"></rect>' +
                    '                    <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>' +
                    '                    <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>' +
                    '                </g>' +
                    '            </svg>' +
                    '            <!--end::Svg Icon-->' +
                    '        </span>' +
                    '    </a>';
                var myvar = '<tr>' +

                    '  <td>' + doc + '</td>' +
                    '                                            <td class="text-center">' +
                    '<div class="text-right">' + delete_button + '</div>' +
                    '                                            </td>' +
                    '                                        </tr>';

                resolve(myvar);
            })).catch((error) => {
                console.error(error);
            });
        });
        promises.push(user_details_prom);
    }

    return Promise.all(promises).then((values) => {

        return values
    });
}


function del_wall() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You are about to delete this wallet.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deloptdoc(wallet_Ref, wallet_id).then(function() {
                get_user(user_local);
                Swal.fire(
                    'Deleted!',
                    'The wallet has been deleted.',
                    'success'
                )
            }).catch((error) => {
                console.log(error);
            });

        }
    })

}

function pin_wall() {
    console.log('22');
    var data = {
        primary_wallet: wallet_id
    }
    updateoptdata(user_Ref, user_id, data).then(function(finalResult) {
        get_user(user_local);
        Swal.fire(
            'Success!',
            'This wallet was made your primary.',
            'success'
        );
    }).catch((error) => {
        console.log(error);
    });

}


function del_cat(i) {
    deltoptarray(wallet_Ref, wallet_id, 'categories', i, cat_table).then(function() {
        cat_table = rmelearray(i, cat_table)
        refresh_cat_table();
    }).catch((error) => {
        console.log(error);
    });
}



function del_user(i) {
    deltoptarray(wallet_Ref, wallet_id, 'users', i, user_table).then(function() {
        user_table = rmelearray(i, user_table)
        refresh_user_table();
    }).catch((error) => {
        console.log(error);
    });
}

function refresh_cat_table() {
    build_cat_table(cat_table).then(function(finalResult) {
        document.getElementById("cat_table").innerHTML = finalResult;
    }).catch((error) => {
        console.log(error);
    });
}

function refresh_user_table() {
    build_user_table(user_table).then(function(finalResult) {
        document.getElementById("user_table").innerHTML = finalResult;
    }).catch((error) => {
        console.log(error);
    });
}



var start_app = function() {

    var load_cat = function() {
        getoptdata(wallet_Ref, wallet_id).then((function(doc) { //  console.log(doc);

            document.getElementById('edit_name_form').value = doc.name;
            document.getElementById('edit_desc_form').value = doc.description;
            document.getElementById('edit_loc_form').value = doc.location;
            switch (doc.type) {
                case 'Premium':
                    document.getElementById("premium_radio").checked = true;
                    break;
                case 'Free':
                    document.getElementById("free_radio").checked = true;
                    break;
                default:
            }


            document.getElementById('edit_id_form').value = wallet_id;
            get_user_info(doc.owner).then((function(doc) { // console.log(doc);
                document.getElementById('edit_owner_form').innerHTML = doc;

            })).catch((error) => {
                console.error(error);
            });
            //       $('input[name="edit_wallet_form"]:checked').val() = doc.type;


            user_table = doc.users;
            cat_table = doc.categories;
            refresh_cat_table();
            refresh_user_table();
        })).catch((error) => {
            console.error(error);
        });
    }

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
            var timestamp = Date.now();
            var data = {
                name: name,
                icon: icon,
                created_by: user_id,
                created_on: timestamp
            }
            cat_table.push(data);
            uptoptarray(wallet_Ref, wallet_id, 'categories', data).then(function() {
                $('#add_cat_modal').modal('toggle');

                refresh_cat_table();
            }).catch((error) => {
                console.log(error);
            });
        });
    }



    var edit_new_wallet_From_validation = function() {
        FormValidation.formValidation(
            document.getElementById('edit_wallet_form'), {
                fields: {
                    ad_wal_name: {
                        validators: {
                            notEmpty: {
                                message: 'A name is requried.'
                            }
                        }
                    },
                    ad_wal_desc: {
                        validators: {
                            notEmpty: {
                                message: 'A description is required.'
                            },
                        }
                    },

                    ad_wal_loc: {
                        validators: {
                            notEmpty: {
                                message: 'A location is required.'
                            },
                        }
                    }

                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    bootstrap: new FormValidation.plugins.Bootstrap({
                        eleInvalidClass: '',
                        eleValidClass: '',
                    })
                }
            }
        ).on('core.form.valid', function() {

            var name = document.getElementById('edit_wallet_form').querySelector('[name="ad_wal_name"]').value;

            var description = document.getElementById('edit_wallet_form').querySelector('[name="ad_wal_desc"]').value;

            var location = document.getElementById('edit_wallet_form').querySelector('[name="ad_wal_loc"]').value;
            var type = $('input[name="wallet_form_type2"]:checked').val();

            console.log(type);
            var id2 = document.getElementById('edit_wallet_form').querySelector('[name="edit_id_form"]').value;

            var data = {
                name: name,
                description: description,
                location: location,
                type: type,
            }
            console.log(data);
            var wallet_Ref = db.collection("wallets")
            updateoptdata(wallet_Ref, id2, data).then(function() {
                get_user(user_local);
            }).catch((error) => {
                console.log(error);
            });


            /* 
                            var wallet_Ref = db.collection("wallets")
                            set(wallet_Ref, data).then(function() {
                                get_user(user_local);
                            }).catch((error) => {
                                console.log(error);
                            }); */
        });
    }




    var add_user_From_validation = function() {
        FormValidation.formValidation(
            document.getElementById('add_user_form'), {
                fields: {
                    add_user_email: {
                        validators: {
                            notEmpty: {
                                message: 'A name is requried.'
                            },
                            emailAddress: {
                                message: 'Please enter a valid email address.'
                            }
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    bootstrap: new FormValidation.plugins.Bootstrap({
                        eleInvalidClass: '',
                        eleValidClass: '',
                    })
                }
            }
        ).on('core.form.valid', function() {

            var email = document.getElementById('add_user_form').querySelector('[name="add_user_email"]').value;
            console.log(email);
            db.collection("users").where("email", "==", email)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.size == 0) {

                        var myvar = '<span class="btn btn-light-danger btn-sm font-weight-bold btn-upper btn-text">No Users Found.</span>';
                        document.getElementById('found_user').innerHTML = myvar;

                    }
                    querySnapshot.forEach((doc) => {
                        var new_user = doc.id;
                        get_user_info(new_user).then((function(doc) {

                            $('#add_user_modal').modal('toggle');
                            document.getElementById('add_user_form').querySelector('[name="add_user_email"]').value = "";
                            document.getElementById('found_user').innerHTML = "";
                            if (user_table.includes(new_user)) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',

                                    text: 'The user is already included!',
                                })
                            } else {
                                Swal.fire({
                                    title: 'User Found!',
                                    icon: 'warning',
                                    html: doc,
                                    showCancelButton: true,
                                    confirmButtonColor: '#d33',
                                    cancelButtonColor: '#3085d6',
                                    confirmButtonText: 'Give access!'
                                }).then((result) => {
                                    if (result.isConfirmed) {

                                        user_table.push(new_user);
                                        uptoptarray(wallet_Ref, wallet_id, 'users', new_user).then(function() {

                                            Swal.fire(
                                                'Success!',
                                                'The user has been successfully added.',
                                                'success'
                                            )
                                            refresh_user_table();
                                        }).catch((error) => {
                                            console.log(error);
                                        });

                                    }
                                })
                            }





                        })).catch((error) => {
                            console.error(error);
                        });


                        console.log(doc.id, " => ", doc.data());
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

        });
    }
    return {
        init: function() {
            load_cat();
            add_cat_validation();
            edit_new_wallet_From_validation();
            add_user_From_validation();
        },
        refresh: function() {},
    };
}();



jQuery(document).ready(function() {
    wallet_id = global_data[0];
    wallet_Ref = db.collection("wallets");
    user_id = global_data[2];
    var wallet_name = global_data[1];
    var wallet_type = global_data[3];
    document.getElementById("t_wallet_name").innerText = wallet_name.toUpperCase();
    document.getElementById("t_wallet_id").innerText = wallet_id;
    var wallet_type = global_data[3];
    document.getElementById("t_wallet_type").innerText = wallet_type;
    start_app.init();
});