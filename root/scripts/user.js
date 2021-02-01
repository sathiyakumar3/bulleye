var user_local;

function get_user(user) {

    user_local = user;
    var docRef = db.collection("users");
    getoptdata(docRef, user.uid).then(function(finalResult) {

        document.getElementById("front_page_user_id").value = user.uid;
        console.log(document.getElementById("front_page_user_id").value);
        document.getElementById("front_page_name_1").innerHTML = finalResult.name;
        document.getElementById("front_page_name_2").innerHTML = finalResult.name;
        document.getElementById("front_page_email_1").innerHTML = finalResult.email;
        const ref = firebase.storage().ref().child('users/' + user_local.uid);
        ref.getDownloadURL()
            .then((url) => {
                console.log(url);
                image_add(url);
            }).catch((error) => {
                console.error(error);
                image_add('assets/media/users/blank.png');
            });
    }).catch((error) => {
        console.error(error);
    });

}


'use strict';


function test() {
    //  console.log($('#kt_datatable_2').KTDatatable().data());
    // $("#cancel_button").trigger("click");
    //  document.getElementById("cancel_button").click();


}

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
                    ref.putString(message, 'data_url').then((snapshot) => {}).catch((error) => {
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