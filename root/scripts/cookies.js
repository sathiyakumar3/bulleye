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

function getoptdata(docRef, id) {
    var find = getCookie(id);

    return new Promise(function(resolve, reject) {
        if (find == "") {
            var results = "";
            docRef.doc(id).get().then(function(doc) {
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
            resolve(JSON.parse(find));
        }
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
            resolve(find);
        } else {
            console.log("[I] - " + user_id);
            ref.getDownloadURL()
                .then((url) => {
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
    getoptdata(docRef, id).then(function(arr) {
        var obj = Object.assign({}, arr, data);
        var str = JSON.stringify(obj);
        setCookie(id, str);
       
            docRef.doc(id).update(data)
                .then(function() {
                    console.log("[U2] - " + docRef + " - " + id);
                    resolve("success");
                })
                .catch(function(error) {
                   
                    reject(error);
                });
      
    }).catch(function(error) {
      
        reject(error);
    });
});
}