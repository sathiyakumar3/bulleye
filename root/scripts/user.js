var user_local;

function load_navi() {    
    db.collection("wallets").where("users", "array-contains", user_local.uid).get()
        .then((querySnapshot) => {
            const promises = []
            querySnapshot.forEach((doc) => {
                var myvar = '';
                const promise = db.collection("wallets").doc(doc.id).collection('entries').get().then((querySnapshot) => {
                    var wallets_months = '';
                    var size = querySnapshot.size
                    const promises2 = []
                    const promise2 = querySnapshot.forEach((doc) => {
                             wallets_months = '                                            <li class="menu-item" aria-haspopup="true">'+
                            '                                                <a href="crud/file-upload/dropzonejs.html" class="menu-link">'+
                            '                                                    <i class="menu-bullet menu-bullet-dot">'+
                            '                                                            <span></span>'+
                            '                                                        </i>'+
                            '                                                    <span class="menu-text">'+doc.id+'</span>'+
                            '                                                    <span class="menu-label">'+
                            '                                                            <span class="label label-danger label-inline">new</span>'+
                            '                                                    </span>'+
                            '                                                </a>'+
                            '                                            </li>'+wallets_months;
                        // console.log("Reading..." + doc.id);

                    });

                    promises2.push(promise2);

                    Promise.all(promises2).then(results => {
                        //console.log(wallets_months);

                        //  console.log('reading...' + doc.data().name);
                        myvar = '<li class="menu-section">'+
                        '                                <h4 class="menu-text">'+doc.data().name+'</h4>'+
                        '                                <i class="menu-icon ki ki-bold-more-hor icon-md"></i>'+
                        '                            </li>'+                        
 '<li class="menu-item menu-item-active" aria-haspopup="true">'+
'                                <a class="menu-link" onclick="load_page(\'content_pages/wallet_dashboard.html\',\''+doc.id+'\')">'+
'                                    <span class="svg-icon menu-icon">'+
'											<!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg-->'+
'											<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">'+
'												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
'                                                    <rect x="0" y="0" width="24" height="24"/>'+
'                                                    <path d="M4.00246329,12.2004927 L13,14 L13,4.06189375 C16.9463116,4.55399184 20,7.92038235 20,12 C20,16.418278 16.418278,20 12,20 C7.64874861,20 4.10886412,16.5261253 4.00246329,12.2004927 Z" fill="#000000" opacity="0.3"/>'+
'                                                    <path d="M3.0603968,10.0120794 C3.54712466,6.05992157 6.91622084,3 11,3 L11,11.6 L3.0603968,10.0120794 Z" fill="#000000"/>'+
'												</g>'+
'											</svg>'+
'											<!--end::Svg Icon-->'+
'										</span>'+
'                                    <span class="menu-text">Dashboard</span>'+
'                                </a>'+
'                            </li>'+	

'                                <li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">'+
'                                    <a href="javascript:;" class="menu-link menu-toggle">'+
'                                        <span class="svg-icon menu-icon">'+
'                                                <!--begin::Svg Icon | path:assets/media/svg/icons/Files/Upload.svg-->'+
'                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">'+
'                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
'                                                        <rect x="0" y="0" width="24" height="24"></rect>'+
'                                                        <path d="M2,13 C2,12.5 2.5,12 3,12 C3.5,12 4,12.5 4,13 C4,13.3333333 4,15 4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 C2,15 2,13.3333333 2,13 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>'+
'                                                        <rect fill="#000000" opacity="0.3" x="11" y="2" width="2" height="14" rx="1"></rect>'+
'                                                        <path d="M12.0362375,3.37797611 L7.70710678,7.70710678 C7.31658249,8.09763107 6.68341751,8.09763107 6.29289322,7.70710678 C5.90236893,7.31658249 5.90236893,6.68341751 6.29289322,6.29289322 L11.2928932,1.29289322 C11.6689749,0.916811528 12.2736364,0.900910387 12.6689647,1.25670585 L17.6689647,5.75670585 C18.0794748,6.12616487 18.1127532,6.75845471 17.7432941,7.16896473 C17.3738351,7.57947475 16.7415453,7.61275317 16.3310353,7.24329415 L12.0362375,3.37797611 Z" fill="#000000" fill-rule="nonzero"></path>'+
'                                                    </g>'+
'                                                </svg>'+
'                                                <!--end::Svg Icon-->'+
'                                            </span>'+
'                                        <span class="menu-text">Records</span>'+
'<span class="menu-label">'+
'														<span class="label label-rounded label-primary">'+size+'</span>'+
'													</span>'+
	

'                                        <i class="menu-arrow"></i>'+
'                                    </a>'+
'                                    <div class="menu-submenu" kt-hidden-height="120" style="display: none; overflow: hidden;">'+
'                                        <i class="menu-arrow"></i>'+
'                                        <ul class="menu-subnav">'+wallets_months+
'                                        </ul>'+
'                                    </div>'+
'                                </li>'+
                        '                                <li class="menu-item" aria-haspopup="true">'+
                        '                                    <a target="_blank" href="https://preview.keenthemes.com/metronic/demo1/builder.html" class="menu-link">'+
                        '                                        <span class="svg-icon menu-icon">'+
                        '                                                <!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->'+
                        '                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">'+
                        '                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
                        '                                                        <rect x="0" y="0" width="24" height="24"></rect>'+
                        '                                                        <path d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z" fill="#000000"></path>'+
                        '                                                        <rect fill="#000000" opacity="0.3" transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)" x="16.3255682" y="2.94551858" width="3" height="18" rx="1"></rect>'+
                        '                                                    </g>'+
                        '                                                </svg>'+
                        '                                                <!--end::Svg Icon-->'+
                        '                                            </span>'+
                        '                                        <span class="menu-text">Settings</span>'+
                        '                                    </a>'+
                        '                                </li>'+

                        '                            </li>';
                        //   myvar = myvar + wallets_months;

document.getElementById("list_navi").innerHTML = document.getElementById("list_navi").innerHTML +myvar;
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
              //  document.getElementById("list_navi").innerHTML = document.getElementById("list_navi").innerHTML +myvar;
              
var myvar2 =  '<li class="menu-section">'+
'                                <h4 class="menu-text">Files</h4>'+
'                                <i class="menu-icon ki ki-bold-more-hor icon-md"></i>'+
'                            </li><li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">'+
'                                <a class="menu-link" onclick="load_page(\'content_pages/content_2.html\')">'+
'                                    <span class="svg-icon menu-icon">'+
'											<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->'+
'											<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">'+
'												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
'													<rect x="0" y="0" width="24" height="24" />'+
'													<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />'+
'													<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />'+
'												</g>'+
'											</svg>'+
'											<!--end::Svg Icon-->'+
'										</span>'+
'                                    <span class="menu-text">Add Wallets</span>'+
''+
'                                </a>'+
''+
'                            </li>';
	

document.getElementById("list_navi").innerHTML = document.getElementById("list_navi").innerHTML +myvar2;
                
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
        load_navi();
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