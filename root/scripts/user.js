var user_local;
var user_Ref = db.collection("users");

function menu_subitems(vari, name, link) {
    return new Promise(function(resolve, reject) {
        vari = '<li class="menu-item" aria-haspopup="true" >' +
            '<a class="menu-link" onclick="load_page(\'content_pages/wallet.html\',\'' + link + '\')">' +
            '<i class="menu-bullet menu-bullet-dot">' +
            '<span></span>' +
            '</i>' +
            '<span class="menu-text">' + name + '</span>' +
            '<span class="menu-label">' +
            '<span class="label label-danger label-inline">new</span>' +
            '</span>' +
            '</a>' +
            '</li>' +
            vari;
        resolve(vari);
    });
}

function load_navi() {
    return new Promise(function(resolve, reject) {
        var results = [];
        db.collection("wallets").where("users", "array-contains", user_local.uid).get()
            .then((querySnapshot) => {

                var promises_wallet = [];
                querySnapshot.forEach((doc) => {
                    const promise2 = new Promise((resolve, reject) => {
                        var wallet_id = doc.id;
                        var promises_users = [];
                        var promises_records = [];
                        var user_list = doc.data().users;
                        const get_users = new Promise((resolve, reject) => {
                            user_list.forEach(function(entry) {
                                const promise = new Promise((resolve, reject) => {
                                    getoptdata(user_Ref, entry).then(function(finalResult) {
                                        resolve(finalResult.name);
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
                        const get_months = new Promise((resolve, reject) => {
                            db.collection("wallets").doc(doc.id).collection('entries').get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    const promise = new Promise((resolve, reject) => {
                                        resolve(doc.id);
                                    });
                                    promises_records.push(promise);
                                });
                                return Promise.all(promises_records).then((values) => {
                                    // console.log(values);
                                    resolve(values);
                                });
                            });
                        });
                        return Promise.all([get_months, get_users]).then((values) => {
                            var tabl = {
                                months: values[0],
                                users: values[1],
                                wallet_id: wallet_id
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

function get_user(user) {
    user_local = user;
    var docRef = db.collection("users");
    getoptdata(docRef, user.uid).then((function(finalResult) {

        document.getElementById("front_page_user_id").value = user.uid;

        document.getElementById("front_page_name_1").innerHTML = finalResult.name;
        document.getElementById("front_page_name_2").innerHTML = finalResult.name;
        document.getElementById("front_page_email_1").innerHTML = finalResult.email;
        get_user_icon(user_local.uid).then((url) => {
            image_add(url);
        }).catch((error) => {
            image_add(error);
        });
        //  var new = load_navi();

        load_navi().then(function(finalResult) {



            Object.keys(finalResult).map(function(key, index) {
                console.log(finalResult[key]);
            });
        }).catch((error) => {
            console.log(error);
            // cons(error);
        });
    })).catch((error) => {
        console.error(error);
    });

}


'use strict';



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
    // Class definition
    var KTImageInputDemo = (function() {
        // Private functions
        var initDemos = function() {

            // Example 5
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

                        /*  ref.getDownloadURL()
                            .then((url) => {
                                console.log(url);
                        
                               
                                console.log(value);
                               // updateoptdata(usersRef, user_local.uid, value);

                            }).catch((error) => {                              
                                console.log(error);
                            });
 */

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
                        ref.delete().then(() => {
                            // File deleted successfully
                        }).catch((error) => {
                            // Uh-oh, an error occurred!
                        });
                    }
                });

            }));


        }

        return {
            // public functions
            init: function() {
                initDemos();
            }
        };
    })();

    KTUtil.ready((function() {
        KTImageInputDemo.init();
    }));
}