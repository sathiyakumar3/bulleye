function setCookie(cookieName, cookieValue) {
    var d = new Date();
    d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cookieName + "=" +
        cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
var c=0;
var d=0;

function data_comp(x){
    switch(x) {
        case 'c':
            c++;
          break;
        case 'd':
            d++;
          break;
        default:
       
      }
    //  document.getElementById("data_compressor").innerHTML = percentage_form(c, c+d,d+ ' of ')
}
function getoptdata(docRef, id) {
    var find = getCookie(id);
    return new Promise(function(resolve, reject) {
        if (find == "") {
            var results = "";
            docRef.doc(id).get().then(function(doc) {       
                data_comp('d');      
                if (doc.exists) {
                    console.log("[R] - " + docRef + " - " + id);
                    results = doc.data();
                    str = JSON.stringify(results);
                    setCookie(id, str);
                    resolve(results);
                } else {
                    reject("Document doesn't exist.");
                }
            }).catch(function(error) {
                reject(error);
            });
        } else {
            data_comp('c'); 
            resolve(JSON.parse(find));
        }
    });
}


function addoptdata(docRef, data) {
    return new Promise(function(resolve, reject) {
        docRef.add(data)
            .then((doc) => {
                var str = JSON.stringify(data);
                setCookie(doc.id, str);
                console.log("Document written with ID: ", doc.id);
                resolve(doc.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                reject(error);
            });
    });
}



function setoptdata(docRef, id, data) {
    str = JSON.stringify(data);
    setCookie(id, str);
    return new Promise(function(resolve, reject) {
        // Add a new document in collection "cities"
        docRef.doc(id).set(data)
            .then(function() {
                console.log("[W] - " + docRef + " - " + id);
                resolve("success");
            })
            .catch(function(error) {

                reject(error);
            });
    });
}


function deloptfeild(docRef, id, field) {
    var find = getCookie(id);
    delete find[field];
    setCookie(id, find);
    return new Promise(function(resolve, reject) {
        docRef.doc(id).update({
                [field]: firebase.firestore.FieldValue.delete()
            }).then(function() {
                console.log("[U] - " + docRef + " - " + id);
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error deleteing Feild: ", error);
                reject(error);
            });
    });
}


// Remove the 'capital' field from the document
var user_icon_list = {};

function get_user_icon(user_id) {
    const ref = firebase.storage().ref().child('users/' + user_id);
    return new Promise(function(resolve, reject) {
        if (user_icon_list.hasOwnProperty(user_id)) {
            var find = user_icon_list[user_id];
            data_comp('c'); 
            resolve(find);
        } else {
            console.log("[I] - " + user_id);
           
            ref.getDownloadURL()
                .then((url) => {
                    data_comp('d'); 
                    user_icon_list[user_id] = url;
                    resolve(url);
                }).catch((error) => {
                    // console.log(error);
                    reject("assets/media/users/blank.png");
                });
        }
    });
}





function updateoptdata(docRef, id, data) {


    return new Promise(function(resolve, reject) {
        /*         getoptdata(docRef, id).then(function(arr) {
                    var obj = Object.assign({}, arr, data);
                    var str = JSON.stringify(obj);
                    setCookie(id, str); */

        docRef.doc(id).update(data)
            .then(function() {
                var find = getCookie(id);
                find = JSON.parse(find);               
                var finalobj1 = {};
                for (var _obj in find) finalobj1[_obj] = find[_obj];
                for (var _obj in data) finalobj1[_obj] = data[_obj];
                find = finalobj1;             
                var str = JSON.stringify(find);
                setCookie(id, str);
                console.log("[U2] - " + docRef + " - " + id);
                resolve("success");
            })
            .catch(function(error) {

                reject(error);
            });

        /*     }).catch(function(error) {

                reject(error);
            }); */
    });
}

function deloptdoc(docRef, id) {

    return new Promise(function(resolve, reject) {
        docRef.doc(id).delete().then(function() {
                console.log("[U] - " + docRef + " - " + id);
                eraseCookie(id);
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error updating array: ", error);
                reject(error);
            });
    });
}



function uptoptarray(docRef, id, arrayname, data) {
    return new Promise(function(resolve, reject) {

        docRef.doc(id).update({
                [arrayname]: firebase.firestore.FieldValue.arrayUnion(data)
            }).then(function() {
                var find = getCookie(id);
                find = JSON.parse(find);
                find[[arrayname]].push(data);
                var str = JSON.stringify(find);
                setCookie(id, str);
                console.log("[U] - " + docRef + " - " + id);
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error updating array: ", error);
                reject(error);
            });

    });
}



function deltoptarray(docRef, id, arrayname, item, data) {
    return new Promise(function(resolve, reject) {

        docRef.doc(id).update({
                [arrayname]: firebase.firestore.FieldValue.arrayRemove(data[item])
            }).then(function() {
                var find = getCookie(id);
                find = JSON.parse(find);

                find[[arrayname]] = rmelearray(item, find[[arrayname]]);
                var str = JSON.stringify(find);
                setCookie(id, str);

                console.log("[U] - " + docRef + " - " + id);
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error updating array: ", error);
                reject(error);
            });
    });
}