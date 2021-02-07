var user_local;

function load_navi() {
    var myvar = '';


    return db.collection("wallets").where("users", "array-contains", "KDE7AEuIMrXEbKVoC8LlYXyXSBd2").get()
        .then((querySnapshot) => {
            const promises = []
            querySnapshot.forEach((doc) => {
                myvar = '';

                const promise = db.collection("wallets").doc(doc.id).collection('entries').get().then((querySnapshot) => {
                    var wallets_months = '';
                    console.log(querySnapshot.size);
                    const promises2 = []
                    const promise2 = querySnapshot.forEach((doc) => {
                        wallets_months = '<li class="menu-item" aria-haspopup="true">' +
                            '<a href="custom/apps/user/list-default.html" class="menu-link">' +
                            '<i class="menu-bullet menu-bullet-dot">' +
                            '<span></span>' +
                            '</i>' +
                            '<span class="menu-text">' + doc.id + ' </span>' +
                            '</a>' +
                            '</li>' + wallets_months;
                        // console.log("Reading..." + doc.id);

                    });

                    promises2.push(promise2);

                    Promise.all(promises2).then(results => {
                        console.log(wallets_months);

                        //  console.log('reading...' + doc.data().name);
                        myvar = myvar + '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
                            '                                            <a href="javascript:;" class="menu-link menu-toggle">' +
                            '                                                <i class="menu-bullet menu-bullet-line">' +
                            '														<span></span>' +
                            '													</i>' +
                            '                                                <span class="menu-text">' + doc.data().name + '</span>' +
                            '                                                <span class="menu-label">' +
                            '														<span class="label label-rounded label-primary">6</span>' +
                            '                                                </span>' +
                            '                                                <i class="menu-arrow"></i>' +
                            '                                            </a>' +
                            '                                            <div class="menu-submenu">' +
                            '                                                <i class="menu-arrow"></i>' +
                            '                                                <ul class="menu-subnav"> ' +
                            wallets_months + '                                                </ul>' +
                            '                                            </div>' +
                            '                                        </li>';
                        //   myvar = myvar + wallets_months;

                        //  console.log(myvar);
                        // document.getElementById("list_navi").innerHTML = myvar;
                        resolve(2);
                    })




                });
                promises.push(promise)
            });

            Promise.all(promises).then(results => {
                // continue processing here
                // results[0] is the result of the first promise in the promises array
                document.getElementById("list_navi").innerHTML = myvar;
                console.log(myvar);
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });


}

function get_user(user) {

    user_local = user;
    var docRef = db.collection("users");
    getoptdata(docRef, user.uid).then(function(finalResult) {

        document.getElementById("front_page_user_id").value = user.uid;

        document.getElementById("front_page_name_1").innerHTML = finalResult.name;
        document.getElementById("front_page_name_2").innerHTML = finalResult.name;
        document.getElementById("front_page_email_1").innerHTML = finalResult.email;
        get_user_icon(user_local.uid).then((url) => {
            image_add(url);
        }).catch((error) => {
            image_add(error);
        });
        var wallets_lst = finalResult.wallets; //obsolote


        console.log(finalResult.wallets);


        var wallet_name = '';
        //var wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');

        console.log("test");
        console.log(load_navi("KDE7AEuIMrXEbKVoC8LlYXyXSBd2"));









        /* 
                    myvar = myvar + '<li class="menu-item menu-item-parent" aria-haspopup="true">' +
                        '<span class="menu-link">' +
                        '<span class="menu-text">Wallets</span>' +
                        '</span></li>' + '<li class="menu-item menu-item-active" aria-haspopup="true">' +
                        '                                <a class="menu-link" onclick="load_page(\'content_pages/wallet.html\')">' +
                        '                                    <span class="svg-icon menu-icon">' +
                        '											<!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg-->' +
                        '											<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                        '												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                        '                                                    <rect x="0" y="0" width="24" height="24"/>' +
                        '        <path d="M4,4 L20,4 C21.1045695,4 22,4.8954305 22,6 L22,18 C22,19.1045695 21.1045695,20 20,20 L4,20 C2.8954305,20 2,19.1045695 2,18 L2,6 C2,4.8954305 2.8954305,4 4,4 Z" fill="#000000" opacity="0.3"/>' +
                        '        <path d="M18.5,11 L5.5,11 C4.67157288,11 4,11.6715729 4,12.5 L4,13 L8.58578644,13 C8.85100293,13 9.10535684,13.1053568 9.29289322,13.2928932 L10.2928932,14.2928932 C10.7456461,14.7456461 11.3597108,15 12,15 C12.6402892,15 13.2543539,14.7456461 13.7071068,14.2928932 L14.7071068,13.2928932 C14.8946432,13.1053568 15.1489971,13 15.4142136,13 L20,13 L20,12.5 C20,11.6715729 19.3284271,11 18.5,11 Z" fill="#000000"/>' +
                        '        <path d="M5.5,6 C4.67157288,6 4,6.67157288 4,7.5 L4,8 L20,8 L20,7.5 C20,6.67157288 19.3284271,6 18.5,6 L5.5,6 Z" fill="#000000"/>' +
                        '												</g>' +
                        '											</svg>' +
                        '											<!--end::Svg Icon-->' +
                        '										</span>' +
                        '                                    <span class="menu-text">Wallet</span>' +
                        '                                </a>' +
                        '                            </li>'; */




        //  load_page('content_pages/wallet.html', finalResult.wallets);
    }).catch((error) => {
        console.error(error);
    });

}


'use strict';



function image_add(url) {

    var myvar = '<div class="image-input image-input-empty image-input-outline" id="kt_image_5" style="background-image: url(' + url + ')">' +
        '                        <div class="image-input-wrapper"></div>' +
        '                        <label class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Change avatar">' +
        '                            <i class="fa fa-pen icon-sm text-muted"></i>' +
        '                            <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg">' +
        '                            <input type="hidden" name="profile_avatar_remove">' +
        '                        </label>' +
        '                        <span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" id="cancel_button" data-action="cancel" data-toggle="tooltip" title="" data-original-title="Cancel avatar">' +
        '                            <i class="ki ki-bold-close icon-xs text-muted"></i>' +
        '                        </span>' +
        '                        <span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="remove" data-toggle="tooltip" title="" data-original-title="Remove avatar">' +
        '                            <i class="ki ki-bold-close icon-xs text-muted"></i>' +
        '                        </span>' +
        '                    </div>';

    document.getElementById("imageframe").innerHTML = myvar;
    // Class definition
    var KTImageInputDemo = function() {
        // Private functions
        var initDemos = function() {

            // Example 5
            var avatar5 = new KTImageInput('kt_image_5');

            avatar5.on('change', function(imageInput) {


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
                        snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            const usersRef = db.collection("users");
                            var value = {
                                "photo_url": downloadURL

                            };
                            console.log("File available at", downloadURL);
                            updateoptdata(usersRef, user_local.uid, value);
                        });

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
            });

            avatar5.on('remove', function(imageInput) {

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

            });


        }

        return {
            // public functions
            init: function() {
                initDemos();
            }
        };
    }();

    KTUtil.ready(function() {
        KTImageInputDemo.init();
    });
}