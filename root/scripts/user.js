var user_local;
var user_Ref = db.collection("users");

function menu_subitems(name, link) {
    return new Promise(function(resolve, reject) {
        var vari = '<li class="menu-item" aria-haspopup="true" >' +
            '<a class="menu-link" onclick="get_user_profile(\'' + link + '\')">' +
            '<i class="menu-bullet menu-bullet-dot">' +
            '<span></span>' +
            '</i>' +
            '<span class="menu-text">' + name + '</span>' +
            '<span class="menu-label">' +
            '<span class="label label-danger label-inline">new</span>' +
            '</span>' +
            '</a>' +
            '</li>';
        resolve(vari);
    });
}

function prof_pic(image) {
    var html_div = '<div class="symbol-label" style="background-image:url(' + image + ')"></div>'
    '<i class="symbol-badge bg-success"></i>';
    return html_div
}

function get_user_profile(user) {
    $('#check_users').modal('toggle');
    var user_Ref = db.collection("users");

    getoptdata(user_Ref, user).then((function(doc) {

        document.getElementById("prof_name").innerText = doc.name;
        document.getElementById("prof_desig").innerText = doc.name;
        document.getElementById("prof_email").innerText = doc.email;
        document.getElementById("prof_contact").innerText = doc.contact_no;
        document.getElementById("prof_loca").innerText = doc.country;


        get_user_icon(user).then((url) => {
            document.getElementById("image_prof3").innerHTML = prof_pic(url);

        }).catch((error) => {
            document.getElementById("image_prof3").innerHTML = prof_pic(error);
            console.log(error);
        });



    })).catch((error) => {
        console.error(error);
    });
}

function load_navi() {
    return new Promise(function(resolve, reject) {
        db.collection("wallets").where("users", "array-contains", user_local.uid).get()
            .then((querySnapshot) => {
                var promises_wallet = [];
                querySnapshot.forEach((doc) => {
                    const promise2 = new Promise((resolve, reject) => {
                        var wallet_id = doc.id;
                        var wallet_name = doc.data().name;
                        var wallet_type = doc.data().type;
                        var wallet_description = doc.data().description;
                        var wallet_owner = doc.data().owner;
                        var wallet_location = doc.data().location;
                        var promises_users = [];
                        var user_list = doc.data().users;
                        const get_users = new Promise((resolve, reject) => {
                            user_list.forEach(function(entry) {
                                const promise = new Promise((resolve, reject) => {
                                    getoptdata(user_Ref, entry).then(function(finalResult) {
                                        menu_subitems(finalResult.name, entry).then((results) => {
                                            resolve(results);
                                        }).catch((error) => {
                                            console.log(error);
                                            reject(error);
                                        });
                                        //   resolve();
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                });
                                promises_users.push(promise);
                            });
                            return Promise.all(promises_users).then((values) => {
                                resolve(values);
                            });
                        });
                        return Promise.all([get_users]).then((values) => {
                            var n_size = user_list.length;
                            var u = values.join('');
                            var tabl = {
                                users: u,
                                users_size: n_size,
                                wallet_id: wallet_id,
                                wallet_name: wallet_name,
                                wallet_type: wallet_type,
                                wallet_description: wallet_description,
                                wallet_location: wallet_location,
                                wallet_owner: wallet_owner
                            }
                            resolve(tabl);
                        });
                    });
                    promises_wallet.push(promise2);
                });

                return Promise.all(promises_wallet).then((values) => {
                    resolve(values);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    });
}

function build_trend(month_data, type) {

    if (type == 'Premium') {
        var html_div = '<li class="menu-item" aria-haspopup="true">' +
            '<a class="menu-link" onclick="load_page(\'content_pages/wallet_trends.html\',\'' + month_data + '\')">' +
            '<span class="svg-icon menu-icon">' +
            '<svg><use xlink:href="#pie_chart"></use></svg>' +
            '</span>' +
            '<span class="menu-text">Trends</span>' +
            '</a>' +
            '</li>';
        return html_div
    }
    if (type == 'Free') {
        var myvar = '<span class="svg-icon menu-icon svg-icon-danger">' + '<svg><use xlink:href="#locked"></use></svg></span>';
        var html_div = '<li class="menu-item" aria-haspopup="true">' +
            '<a class="menu-link" onclick="access_restric_error()">' +
            '<span class="svg-icon menu-icon">' +
            '<!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg-->' +
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
            '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
            '<rect x="0" y="0" width="24" height="24"/>' +
            '<path d="M4.00246329,12.2004927 L13,14 L13,4.06189375 C16.9463116,4.55399184 20,7.92038235 20,12 C20,16.418278 16.418278,20 12,20 C7.64874861,20 4.10886412,16.5261253 4.00246329,12.2004927 Z" fill="#000000" opacity="0.3"/>' +
            '<path d="M3.0603968,10.0120794 C3.54712466,6.05992157 6.91622084,3 11,3 L11,11.6 L3.0603968,10.0120794 Z" fill="#000000"/>' +
            '</g>' +
            '</svg>' +
            '<!--end::Svg Icon-->' +
            '</span>' +
            '<span class="menu-text">Trends</span>' + myvar +
            '</a>' +
            '</li>';
        return html_div
    }
}



function build_site(month_data, users_size, users_list, type) {
    var html_div = '<li class="menu-item menu-item-active" aria-haspopup="true">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/wallet_dashboard.html\',\'' + month_data + '\')">' +
        '<span class="svg-icon menu-icon">' +
        '<svg><use xlink:href="#display"></use></svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">Dashboard</span>' +
        '</a>' +
        '</li>' + '<li class="menu-item" aria-haspopup="true">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/wallet.html\',\'' + month_data + '\')">' +
        '<span class="svg-icon menu-icon">' +
        '<svg><use xlink:href="#six_dots"></use></svg>' +
        '</span>' +
        '<span class="menu-text">Work Sheet</span>' +
        '</a>' +
        '</li>' + build_trend(month_data, type) +
        '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
        '<a href="javascript:;" class="menu-link menu-toggle">' +
        '<span class="svg-icon menu-icon">' +
        '<svg><use xlink:href="#users"></use></svg>' +
        '</span>' +
        '<span class="menu-text">Users</span>' +
        '<span class="menu-label">' +
        '<span class="label label-rounded label-primary">' + users_size + '</span>' +
        '</span>' +
        '<i class="menu-arrow"></i>' +
        '</a>' +
        '<div class="menu-submenu" kt-hidden-height="120" style="display: none; overflow: hidden;">' +
        '<i class="menu-arrow"></i>' +
        '<ul class="menu-subnav">' + users_list.replace(/,/g, " ") +
        '</ul>' +
        '</div>' +
        '</li>' +
        '<li class="menu-item" aria-haspopup="true">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/wallet_settings.html\',\'' + month_data + '\')">' +
        '<span class="svg-icon menu-icon">' +
        '<svg><use xlink:href="#settings"></use></svg>' +
        '</span>' +
        '<span class="menu-text">Settings</span>' +
        ' </a>' +
        '</li>';
    return html_div
}

function generate_navi(data, p_wallet) {

    var starting = "";
    var navi = "";
    for (let i = 0; i < data.length; i++) {
        var users_list = data[i]['users'];
        var months_list = 123;
        var wallet_id = data[i]['wallet_id'];
        var wallet_name = data[i]['wallet_name'];
        var wallet_type = data[i]['wallet_type'];
        var users_size = data[i]['users_size'];
        var wallet_description = data[i]['wallet_description'];
        var wallet_owner = data[i]['wallet_owner'];
        var wallet_location = data[i]['wallet_location'];


        var month_data = wallet_id + "," + wallet_name + "," + user_local.uid + "," + wallet_type + "," + wallet_description + "," + wallet_owner + "," + wallet_location;

        if (wallet_id != p_wallet) {
            var my_wallet = '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
                '    <a href="javascript:;" class="menu-link menu-toggle">' +
                '        <span class="svg-icon menu-icon">' +
                '<svg><use xlink:href="#sidemenu"></use></svg>' +
                '            </span>' +
                '        <span class="menu-text">' + wallet_name + '</span>' +
                '<span class="menu-label">' +

                '</span>' +
                '        <i class="menu-arrow"></i>' +
                '    </a>' +
                '    <div class="menu-submenu">' +
                '        <i class="menu-arrow"></i>' +
                '        <ul class="menu-subnav">' + build_site(month_data, users_size, users_list, wallet_type) + '</ul>' +
                '    </div>' +
                '    ' +
                '</li>';
            navi = my_wallet + navi;
        } else {
            load_page('content_pages/wallet_dashboard.html', month_data);
            starting = build_site(month_data, users_size, users_list, wallet_type) +
                '<li class="menu-section">' +
                '<h4 class="menu-text">Secondary Wallets</h4>' +
                '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
                '</li>';
        }
    }

    var ending = '<li class="menu-section">' +
        '<h4 class="menu-text">Others</h4>' +
        '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
        '</li><li class="menu-item menu-item-active" aria-haspopup="true"><a class="menu-link" data-toggle="modal" data-target="#add_new_wallet">' +
        '<span class="svg-icon menu-icon"><svg><use xlink:href="#foursquare"></use></svg></span><span class="menu-text">Add New Wallet</span></a></li>' +
        '<li class="menu-section">' +
        '<h4 class="menu-text">Others</h4>' +
        '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
        '</li><li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/content_2.html\')">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '<rect x="0" y="0" width="24" height="24" />' +
        '<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />' +
        '<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />' +
        '</g>' +
        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">About Us</span>' +
        '</a>' +
        '</li>';

    document.getElementById("list_navi").innerHTML = starting + navi + ending


}

function get_user(user) {
    user_local = user;
    getoptdata(user_Ref, user_local.uid).then((function(finalResult) {

        document.getElementById("front_page_user_id").value = user.uid;
        document.getElementById("front_page_name_1").innerHTML = finalResult.name;
        document.getElementById("front_page_name_2").innerHTML = finalResult.name;
        document.getElementById("front_page_email_1").innerHTML = finalResult.email;
        document.getElementById("ad_wal_loc_id").value = finalResult.name;

        get_user_icon(user_local.uid).then((url) => {
            image_add(url);
        }).catch((error) => {
            image_add(error);
            console.log(error);
        });
        load_navi().then(function(data) {
            generate_navi(data, finalResult.primary_wallet);

            if (data.length == 0) {
                $('#add_new_wallet').modal('toggle');
            }
        }).catch((error) => {
            console.log(error);
        });


    })).catch((error) => {
        console.error(error);
    });

}

function image_add(url) {

    var myvar = '<div class="image-input image-input-empty image-input-outline" id="kt_image_5" style="background-image: url(' + url + ')">' +
        '<div class="image-input-wrapper"></div>' +
        '<label class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Change avatar">' +
        '<i class="fa fa-pen icon-sm text-muted"></i>' +
        ' <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg">' +
        '<input type="hidden" name="profile_avatar_remove">' +
        '</label>' +
        '<span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" id="cancel_button" data-action="cancel" data-toggle="tooltip" title="" data-original-title="Cancel avatar">' +
        '<i class="ki ki-bold-close icon-xs text-muted"></i>' +
        '</span>' +
        '<span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="remove" data-toggle="tooltip" title="" data-original-title="Remove avatar">' +
        ' <i class="ki ki-bold-close icon-xs text-muted"></i>' +
        '</span>' +
        ' </div>';

    document.getElementById("imageframe").innerHTML = myvar;
    var KTImageInputDemo = (function() {
        var start_app_main = function() {
            var avatar5 = new KTImageInput('kt_image_5');
            avatar5.on('change', (function(imageInput) {
                var size = imageInput.input.files[0].size
                console.log(size);
                if (size > 1000000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'This image can not be used.',
                        text: 'Please use images below 1 MB.',
                    });
                } else {

                    const ref = firebase.storage().ref().child('users/' + user_local.uid);
                    var message = imageInput.src;
                    ref.putString(message, 'data_url').then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((function(downloadURL) {
                            const usersRef = db.collection("users");
                            var value = {
                                "photo_url": downloadURL

                            };
                            console.log("File available at", downloadURL);
                            updateoptdata(usersRef, user_local.uid, value);
                        }));

                    }).catch((error) => {
                        console.error(error);
                    });


                }
            }));

            avatar5.on('remove', (function(imageInput) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const ref = firebase.storage().ref().child('users/' + user_local.uid);
                        ref.delete().then(() => {}).catch((error) => {
                            console.log(error);
                        });
                    }
                });

            }));


        }

        var add_new_wallet_From_validation = function() {
            FormValidation.formValidation(
                document.getElementById('add_new_wallet_form'), {
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
                $('#add_new_wallet').modal('toggle');
                var name = document.getElementById('add_new_wallet_form').querySelector('[name="ad_wal_name"]').value;
                var description = document.getElementById('add_new_wallet_form').querySelector('[name="ad_wal_desc"]').value;
                var location = document.getElementById('add_new_wallet_form').querySelector('[name="ad_wal_loc"]').value;
                var type = $('input[name="wallet_form_type"]:checked').val();
                var user = user_local.uid;
                var timestamp = Date.now();
                var categories = [{
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'transportation',
                    name: 'Transportation'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'gift',
                    name: 'Gift'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'education',
                    name: 'Education'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'insurance',
                    name: 'Insurance'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'office',
                    name: 'Office'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'travel',
                    name: 'Travel'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'entertainment',
                    name: 'Entertainment'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'garden',
                    name: 'Garden'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'meal',
                    name: 'Food'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'power',
                    name: 'Electricity'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'shopping',
                    name: 'Shopping'
                }]
                var data = {
                    name: name,
                    description: description,
                    location,
                    location,
                    type: type,
                    owner: user,
                    users: [user],
                    categories: categories
                }

                var wallet_Ref = db.collection("wallets")
                addoptdata(wallet_Ref, data).then(function(docid) {

                    var data = {
                        primary_wallet: docid
                    }

                    update_primary_wall(data).then(function(docid) {

                        get_user(user_local);
                    }).catch((error) => {
                        console.log(error);
                    });

                }).catch((error) => {
                    console.log(error);
                });
            });
        }




        var edit_entry_From_validation = function() {
            FormValidation.formValidation(
                document.getElementById('edit_incex_form'), {
                    fields: {
                        form_catergory_2: {
                            validators: {
                                notEmpty: {
                                    message: 'Category is requried.'
                                }
                            }
                        },
                        form_description_2: {
                            validators: {
                                notEmpty: {
                                    message: 'A description is required.'
                                },
                            }
                        },

                        form_amount_2: {
                            validators: {
                                notEmpty: {
                                    message: 'An Amount is required.'
                                },
                            }
                        },
                        repeat_numbrs: {
                            validators: {
                                between: {
                                    min: 0,
                                    max: 30,
                                    message: 'The number must be between 0 and 30'
                                }
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
                $('#edit_incex_form_modal').modal('toggle');
                var category = document.getElementById('edit_incex_form').querySelector('[name="form_catergory_2"]').value;
                var description = document.getElementById('edit_incex_form').querySelector('[name="form_description_2"]').value;
                var amount = document.getElementById('edit_incex_form').querySelector('[name="form_amount_2"]').value;
                var type = $('input[name="form_radios11_2"]:checked').val();
                var payment = $('input[name="radios11_2"]:checked').val();
                var user_id = document.getElementById("front_page_user_id").value;
                var given_date = $("#kt_datetimepicker_10").find("input").val();
                var timestamp = new Date(given_date);
                var selected_repeated = document.getElementById('repeat_selection').value;
                var num_of_repeat = document.getElementById('example-number-input2').value;

                for (i = 0; i < num_of_repeat; i++) {
                    update_entry(description, category, amount, timestamp, type, payment, user_id, selected_repeated).then(function() {}).catch((error) => {
                        console.log(error);
                    });
                    switch (selected_repeated) {
                        case 'Monthly':
                            timestamp.setMonth(timestamp.getMonth() + 1);
                            break;
                        case 'Weekly':
                            timestamp.setDate(timestamp.getDate() + 7);
                            break;
                        case 'Daily':
                            timestamp.setDate(timestamp.getDate() + 1);
                            break;
                        default:

                    }
                    if (i == (num_of_repeat - 1)) {
                        start_app.refresh();
                    }
                }
            });
        }
        return {
            // public functions
            init: function() {
                start_app_main();
                edit_entry_From_validation();
                add_new_wallet_From_validation();
            }
        };
    })();

    KTUtil.ready((function() {
        KTImageInputDemo.init();
    }));
}