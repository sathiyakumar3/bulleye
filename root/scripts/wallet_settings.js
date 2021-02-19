var wallet_Ref = "";
var wallet_id = "";
var user_local = "";
var cat_table;

function change_icon(d) {
   
    document.getElementById("icon_text").value = d;
    document.getElementById("sel_icon").innerHTML = '<svg><use xlink:href="#' + d + '"></use></svg>';
}

function input_icon() {
    console.log('YEa');
    table_icons.style.display = "block";
}

function build_table(obj) {

    var user_Ref = db.collection("users");


    var promises = [];
    for (let i = 0; i < obj.length; i++) {
        var created_by = obj[i]['created_by'];
        const user_details_prom = new Promise((resolve, reject) => {
            getoptdata(user_Ref, created_by).then(function(finalResult) {
                var icon_name = obj[i]['icon'];
                var cat_name = obj[i]['name'];
                var datetime = obj[i]['created_on'];
                var data = obj[i];

                var user_email = finalResult.email;
                var user_name = finalResult.name;

                get_user_icon(user_local).then((url) => {

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
                        '  <td>' + icon_nd_photo_name_email(url, user_name, user_email) + '</td>' +
                        '                                            <td class="text-center">' +
                        '<div class="text-right">' + delete_button + '</div>' +
                        '                                            </td>' +
                        '                                        </tr>';
                    resolve(myvar);
                }).catch((error) => {
                    resolve({ photo_url: 'none' });
                });
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
        promises.push(user_details_prom);
    }

    return Promise.all(promises).then((values) => {

        return values
    });


}

function del_cat(i) {
    deltoptarray(wallet_Ref, wallet_id, 'categories', i, cat_table).then(function() {
        cat_table = rmelearray(i, cat_table)
        refresh_table();
    }).catch((error) => {
        console.log(error);
    });
}

function refresh_table() {

    build_table(cat_table).then(function(finalResult) {
        document.getElementById("cat_table").innerHTML = finalResult;
    }).catch((error) => {
        console.log(error);
    });
}

var start_app = function() {

    var load_cat = function() {
        getoptdata(wallet_Ref, wallet_id).then((function(doc) { //  console.log(doc);
            cat_table = doc.categories;
            refresh_table();
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
            var username = document.getElementById("front_page_user_id").value
            var name = document.getElementById('add_cat_form').querySelector('[name="cat_name_form"]').value;
            var icon = document.getElementById('add_cat_form').querySelector('[name="cat_icon_form"]').value;
            var timestamp = Date.now();
            var data = {
                name: name,
                icon: icon,
                created_by: username,
                created_on: timestamp
            }
            cat_table.push(data);
            uptoptarray(wallet_Ref, wallet_id, 'categories', data).then(function() {
                $('#add_cat_modal').modal('toggle');

                refresh_table();
            }).catch((error) => {
                console.log(error);
            });
        });
    }
    return {
        init: function() {
            load_cat();
            add_cat_validation();
        },
        refresh: function() {},
    };
}();




jQuery(document).ready(function() {
    wallet_id = global_data[0];
    wallet_Ref = db.collection("wallets");

    user_local = global_data[2];


    var wallet_name = global_data[1];
    document.getElementById("t_wallet_name").innerText = wallet_name;
    document.getElementById("t_wallet_id").innerText = wallet_id;
    start_app.init();
});