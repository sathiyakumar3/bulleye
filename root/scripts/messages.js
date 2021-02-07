function calc() {


    var check_box = document.getElementById("private_ch").checked;
    if (check_box) {
        add_all();
        document.getElementById("private_text").innerText = "- Public Mode";
    } else {
        add_members();
        document.getElementById("private_text").innerText = "- Private Mode";

    }

}


function search(ele, id) {

    if (event.key === 'Enter' && !isBlank(ele.value)) {
        var user = firebase.auth().currentUser;
        uid = user.uid;
        var timestamp = new Date();
        var value = {
            [timestamp]: {
                message: ele.value,
                user: uid,
            }
        };
        ele.value = "";
        const usersRef = db.collection("chats").doc(id);
        usersRef.update(value).then(function() {
                requestscount(false, "Message Saved", true);

            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

    }
}


function titlemessage() {

    var bool = 0;
    var io = setInterval(function() {
        bool++;
        switch (bool) {
            case 0:
                document.getElementById("title").innerHTML = '⠋';
                break;
            case 1:
                document.getElementById("title").innerHTML = '⠙';
                break;
            case 2:
                document.getElementById("title").innerHTML = '⠹';
                break;
            case 3:
                document.getElementById("title").innerHTML = '⠸';
                break;
            case 4:
                document.getElementById("title").innerHTML = '⠼';
                break;
            case 5:
                document.getElementById("title").innerHTML = '⠴';
                break;
            case 6:
                document.getElementById("title").innerHTML = '⠦';
                break;
            case 7:
                document.getElementById("title").innerHTML = '⠧';
                break;
            case 8:
                document.getElementById("title").innerHTML = '⠇';
                break;
            case 9:
                document.getElementById("title").innerHTML = '⠏';
                bool = 0;
                break;
            default:
                document.getElementById("title").innerHTML = "▁";
        }
    }, 150);


    setTimeout(function() {
        clearInterval(io);
        document.getElementById("title").innerHTML = "Chat App";
    }, 5000);
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
var requests = 0;
var cookiesused = 0;
var write_req = 0;

function requestscount(cookies, debug, write) {
    requests = requests + 1;
    if (cookies) {
        cookiesused = cookiesused + 1;
    }
    if (write) {
        write_req = write_req + 1;
    }

    var perce = write_req + " - Writes  | " + ((requests - write_req) - cookiesused) + " - Reads  | " + ((cookiesused / requests) * 100).toFixed(0) + "% - Data Recycled.";

    document.getElementById("datasaved").innerHTML = perce;


}


function find_user_info(user, info, datecheck) {

    var find = getCookie(user + ":" + info);
    return new Promise(function(resolve, reject) {
        if (find == "") {
            var results = "";
            var docRef = db.collection("users").doc(user);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    requestscount(false, user + ":" + info, false);
                    results = doc.data()[info];
                    //    console.log("Found in Database : " + results);
                    if (datecheck) {
                        var d = results.toDate();
                        setCookie(user + ":" + info, results.toDate());
                        d = new Date(d);
                        resolve(shortts(d));
                    } else {
                        setCookie(user + ":" + info, results);
                        resolve(results);
                    }
                } else {
                    reject("User doesn't exist.")
                }
            }).catch(function(error) {
                reject(error);
            });

        } else {

            requestscount(true, user + ":" + info, false);
            if (datecheck) {
                e = new Date(find);
                resolve(shortts(e));
            } else {
                resolve(find);
            }
        }
    });

}

function shortts(d) {
    return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}

function on_live_update() {

    var user = firebase.auth().currentUser;
    uid = user.uid;
    find_user_info(uid, 'name', false).then(function(username) {
        document.getElementById("myHeader").innerHTML = "Welcome back, <b>" + username + "</b>";
        add_members();
    }, function(error) {
        console.log(error);
        Swal.fire({
            title: 'Enter your name?',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Save',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                console.log(uid);
                return db.collection("users").doc(uid).set({ name: `${login}` })
                    .then(function() {
                        requestscount(false, "Name added", true);
                        document.getElementById("myHeader").innerHTML = "Welcome back, " + `${login}`;

                    })
                    .catch(function(error) {
                        Swal.fire({
                            title: 'We have a problem.',
                            text: error,
                            icon: 'error',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Try again?'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                on_live_update();
                            }
                        })


                        console.error("Error writing document: ", error);
                    });

            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            add_members();
        })
    });
}




function addtochatlist(chat_id, groupname, datestring, context) {
    var myvar = '<li class="person" data-chat="person1" onclick="' + context + '(\'' + chat_id + '\')">' +
        '                                            <div class="user">' +
        '                                                <img src="https://www.bootdey.com/img/Content/avatar/avatar2.png" alt="Retail Admin">' +
        '                                                <span class="status busy"></span>' +
        '                                            </div>' +
        '                                            <p class="name-time">' +
        '                                                <span class="name" id="tst">' + groupname + '</span>' +
        '                                                <span class="time">' + datestring + '</span>' +
        '                                            </p>' +
        '                                        </li>';

    document.getElementById('chats').innerHTML = document.getElementById('chats').innerHTML + myvar;
}


function priv_addtochatlist(user_name, chat_id, context) {
    find_user_info(user_name, 'name', false).then(function(groupname) {
            find_user_info(user_name, 'last_message', true).then(function(datestring) {
                    addtochatlist(chat_id, groupname, datestring, context);
                },
                function(error) { /* handle an error */ console.log(error); }
            );
        },
        function(error) { console.log(error); /* handle an error */ }
    );
}


function add_all() {
    var user = firebase.auth().currentUser;
    uid = user.uid;

    var user_chat_Ref = db.collection("users")
    user_chat_Ref.get()
        .then(function(querySnapshot) {

            document.getElementById('chats').innerHTML = "";
            querySnapshot.forEach(function(doc) {
                if (doc.id != uid) {
                    requestscount(false, "all users for chat_adding", false);
                    var name = doc.data().name;
                    var last_message = doc.data().last_message.toDate();
                    var e = new Date(last_message);
                    var s = shortts(e);
                    addtochatlist(doc.id, name, s, "check_user");
                }

            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        })
}

function check_user(other_userid) {
    var user = firebase.auth().currentUser;
    uid = user.uid;
    var user_chat_Ref = db.collection("chats").where("members", 'array-contains', [uid, other_userid]);
    user_chat_Ref.get()
        .then(function(querySnapshot) {
            if (querySnapshot.size == 0) {

                console.log("loading.");
                var docRef = db.collection("users").doc(other_userid);

                docRef.get().then(function(doc) {
                    intiate_chat(doc);
                    console.log("loading.2");
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });


            }
            querySnapshot.forEach(function(doc) {
                load_chat(doc.id);
                console.log("loading32.");
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        })

}


function add_members() {

    var loaded = false;

    var user = firebase.auth().currentUser;
    uid = user.uid;
    var user_chat_Ref = db.collection("chats").where("members", 'array-contains', uid);
    user_chat_Ref.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                document.getElementById('chats').innerHTML = "";
                requestscount(false, "all chat where the users belongs", false);
                var list = doc.data().members;
                var nos = list.length;
                var chat_id = doc.id;
                var groupname = doc.data().name;
                var datestring = " (Group)";
                if (nos == 2) {
                    if (list[0] != uid) {
                        user_name = list[0];
                        priv_addtochatlist(user_name, chat_id, "load_chat");
                    } else {
                        user_name = list[1];
                        priv_addtochatlist(user_name, chat_id, "load_chat");
                    }
                } else {
                    groupname = doc.data().name;
                    addtochatlist(chat_id, groupname, datestring, "load_chat");
                }

                if (!loaded) {
                    load_chat(chat_id);
                    loaded = true;
                }



            });
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            })

            Toast.fire({
                type: 'success',
                title: 'Signed in successfully'
            });


        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        })
}

function messageedite(key, chat_id) {

    var inpit = '<li class="chat-left"><span class="changeName"> ' + key + ' </span> </li>';
    Swal.fire({
        title: "Received/Sent at: ",
        html: key,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            chat_delete(key, chat_id);
        }
    })
}

function add_chat(chat_box, user, message, username, key, chat_id, timestamp) {

    var current_user = firebase.auth().currentUser;
    uid = current_user.uid;

    if (user == uid) {
        chat_box = '<li class="chat-left" onclick="messageedite(\'' + timestamp + '\',\'' + chat_id + '\')">' +
            '                                            <div class="chat-avatar"">' +
            '                                                <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin">' +
            '                                                <div class="chat-name">' + username + '</div>' +
            '                                            </div>' +
            '                                            <div class="chat-text">' + message + '</div>' +
            '                                            <div class="chat-hour">' + key + ' <span class="fa fa-check-circle"></span></div>' +
            '                                        </li>';
    } else {
        chat_box =
            '                                        <li class="chat-right" onclick="messageedite(\'' + timestamp + '\',\'' + chat_id + '\')">' +
            '                                            <div class="chat-hour">' + key + ' <span class="fa fa-check-circle"></span></div>' +
            '                                            <div class="chat-text">' +
            '                                                <br> ' + message + '</div>' +
            '                                            <div class="chat-avatar">' +
            '                                                <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin">' +
            '                                                <div class="chat-name">' + username + '</div>' +
            '                                            </div>' +
            '                                        </li>';

    }

    document.getElementById('chat_box').innerHTML = document.getElementById('chat_box').innerHTML + chat_box;
    var element = document.getElementById('main_chat');
    element.scrollTop = element.scrollHeight - element.clientHeight;
}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs +
        ':' + mins + ':' + secs + '.' + ms;
}

function reset_chat(id) {


    var docRef = db.collection("chats").doc(id);

    docRef.get().then(function(doc) {
        requestscount(false, "Read for Reset", false);
        var arr = doc.data();
        document.getElementById('chat_box').innerHTML = "";
        var yourArray = arr["members"];
        var name = doc.data().name;
        // Add a new document in collection "cities"
        docRef.set({
                members: yourArray,
                name: name
            })
            .then(function() {
                requestscount(false, "Messages Reset", true);
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });


    }).catch(function(error) {
        console.log("Error getting document:", error);
    });





}



function chat_delete(key, chat_id) {

    var user = firebase.auth().currentUser;
    uid = user.uid;
    var docRef = db.collection("chats").doc(chat_id);

    docRef.get().then(function(doc) {
        requestscount(false, "Read for chat message delete", false);
        var arr = doc.data();

        var item = arr[key];
        if (item["user"] == uid) {
            document.getElementById('chat_box').innerHTML = "";
            delete arr[key];

            docRef.set(arr)
                .then(function() {
                    requestscount(false, "Messages Reset", true);
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'You are not Authorized.',
                text: 'You can delete only your messages.',
            })
        }


    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}


function load_chat(id) {
    var chat_box = "";
    var text_input = '<textarea class="form-control" rows="3" placeholder="Type your message here..." onkeydown="search(this,\'' + id + '\')"></textarea><button class="btn warning alignright"onclick="reset_chat(\'' + id + '\')">Reset</button>'

    document.getElementById('text_input').innerHTML = text_input;
    const chat_Ref = db.collection("chats").doc(id);
    chat_Ref.onSnapshot(function(doc) {
        titlemessage();
        requestscount(false, "load the particular chat :" + id, false);
        var arr = doc.data();
        document.getElementById('chat_box').innerHTML = "";
        var yourArray = arr["members"];
        document.getElementById('name_list').innerText = "";
        yourArray.forEach(function(arrayItem) {
            find_user_info(arrayItem, 'name', false).then(function(username) {
                document.getElementById('name_list').innerText = document.getElementById('name_list').innerText + " , " + username;
            }, function(error) { console.log(error); /* handle an error */ });

        });


        delete arr["members"];
        delete arr["name"];

        var chat_id = doc.id;
        Object.keys(arr).sort().map(function(key, index) {
            var user_chat = arr[key].user;
            var message_chat = arr[key].message;

            var d = new Date(key);

            find_user_info(user_chat, 'name', false).then(function(username) {

                    add_chat(chat_box, user_chat, message_chat, username, shortts(d), chat_id, key);

                },
                function(error) { console.log(error); /* handle an error */ }
            );


        });
    });

}

function searchuser() {
    var search = document.getElementById('searchtext').value;

    db.collection("users").where("name", "==", search)
        .get()
        .then(function(querySnapshot) {
            var size = querySnapshot.size;

            if (size == 0) {
                Swal.fire({
                    title: 'No users found',
                    text: "Do you want to search again?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.isConfirmed) {
                        searchuser()
                    }
                })
            }
            querySnapshot.forEach(function(doc) {

                intiate_chat(doc);

            });
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

function intiate_chat(doc) {
    requestscount(false, "Searched for :" + search, false);
    find_user_info(doc.id, 'name', false).then(function(username) {
        Swal.fire({
            title: 'Add to Chat',
            text: "Start Chat with " + username + " ?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Start'
        }).then((result) => {
            if (result.isConfirmed) {
                var user = firebase.auth().currentUser;
                uid = user.uid;
                var members = [doc.id, user.uid];
                db.collection("chats").add({
                        members: members,
                        name: "default"
                    })
                    .then(function(docRef) {
                        requestscount(false, "Chat Initiated.", true);
                        console.log("Success adding document: ", docRef.id);
                    })
                    .catch(function(error) {
                        console.log("Error adding document: ", error);
                    });
            }
        })

    }, function(error) {
        console.log(error);
    });
}