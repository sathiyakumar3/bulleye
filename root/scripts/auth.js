function sign_in() {
    var email = getCookie("email");
    var password = getCookie("password");
    var email_old = getCookie("email_old");
    if (email == "") {
        Swal.fire({

            html: '<input id="swal-input1" class="swal2-input" placeholder="email address" value=' + email_old + '>' +
                '<input id="swal-input2" type="password" class="swal2-input" placeholder="password">' +
                '<input type="checkbox" id="remember_me" name="vehicle3" value="Boat">' +
                '<label for="vehicle3"> Remember me </label><br>',
            inputAttributes: {
                autocapitalize: 'off'
            },
            allowOutsideClick: false,

            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Sign in',
            denyButtonText: `Sign up`,
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                return true
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {

                email = (document.getElementById('swal-input1').value);
                password = document.getElementById('swal-input2').value;
                remember_me = document.getElementById('remember_me').checked;
                firebase_signin(email, password, remember_me);
            } else if (result.isDenied) {
                email = document.getElementById('swal-input1').value;
                password = document.getElementById('swal-input2').value;
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        //EMAIL VERIFICATON 
                        on_live_update();
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        Swal.fire({
                            icon: 'error',
                            title: "Sign up",
                            html: error.code + error.message,
                        })
                    });
            }
        })
    } else {
        firebase_signin(email, password, false);
    }

}

function firebase_signin(email, password, remember_me) {

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            if (remember_me) {
                setCookie("email", email);
                setCookie("password", password);
            }

            on_live_update();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // sign_in();
            Swal.fire({
                icon: 'error',
                title: "Sign in",
                html: error.code + error.message,
            })
            Swal.fire({
                title: 'Can not sign in.',
                text: error.code + error.message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Try again?'
            }).then((result) => {
                if (result.isConfirmed) {
                    sign_in();
                }
            })

        });
}

function firebase_signout() {

    firebase.auth().signOut().then(() => {
        var email = getCookie("email");
        var password = getCookie("password");
        setCookie("email_old", email);
        setCookie("password_old", password);
        setCookie("email", "");
        setCookie("password", "");
        location.reload();
    }).catch((error) => {
        // An error happened.
    });
}