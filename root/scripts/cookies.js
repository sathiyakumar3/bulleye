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
                    console.log("Reading from database");
                    results = doc.data();
                    str = JSON.stringify(results);

                    setCookie(id, str);
                    resolve(results);
                } else {
                    reject("User doesn't exist.");
                }
            }).catch(function(error) {
                reject(error);
            });
        } else {
            console.log("Reading from Cookies");
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
                console.log("Document successfully written!");
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                reject(error);
            });
    });
}

function updateoptdata(docRef, id, data) {
    str = JSON.stringify(data);
    setCookie(id, str);
    return new Promise(function(resolve, reject) {
        // Add a new document in collection "cities"
        docRef.doc(id).update(data)
            .then(function() {
                console.log("Document successfully written!");
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                reject(error);
            });
    });
}

function tes123t() {
    console.log("Yea!");
}