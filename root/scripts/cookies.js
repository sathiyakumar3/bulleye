//////////////////////////////////////////  LOCAL COOKIE    /////////////////////////////////////////////////////////////////////////////////////

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
//////////////////////////////////////////  WEB COOKIE    /////////////////////////////////////////////////////////////////////////////////////
var local_docs = [];

var c = 0;
var d = 0;

function setCookie_local(cookieName, cookieValue) {
    local_docs[cookieName]=cookieValue;
}

function getCookie_local(cookieName) {
    if(local_docs.hasOwnProperty(cookieName)){
        c++;
        document.getElementById("data_compressor").innerHTML = percentage_form(d, c + d, d + ' of ');
        return  local_docs[cookieName];
    }else{
        d++;
        document.getElementById("data_compressor").innerHTML = percentage_form(d, c + d, d + ' of ');
        return  ''
    }
    
}

function eraseCookie_local(name) {
    delete arr[name];
}


/////////////////////////////////// ICON DATABASE LAYER////////////////////////////////////////
var user_icon_list = {};
function get_user_icon(user_id) {
    const ref = firebase.storage().ref().child('users/' + user_id);
    return new Promise(function(resolve, reject) {
        if (user_icon_list.hasOwnProperty(user_id)) {
            var find = user_icon_list[user_id];         
            resolve(find);
        } else {
            ref.getDownloadURL()
                .then((url) => {                
                    user_icon_list[user_id] = url;
                    resolve(url);
                }).catch((error) => {
                    reject("assets/media/users/blank.png");
                });
        }
    });
}

//////////////////////////////////////////  FIREBASE LAYER    ////////////////////////////////////////////////////////




// Read Doc
function getoptdata(docRef, id) {
    var find = getCookie_local(id);
    return new Promise(function(resolve, reject) {
        if (find == "") {
            var results = "";
            docRef.doc(id).get().then(function(doc) {
                if (doc.exists) {
                    results = doc.data();
                    var str = JSON.stringify(results);
                    setCookie_local(id, str);
                    resolve(results);
                } else {                  
                    reject("Document doesn't exist.");
                }
            }).catch(function(error) {
                console.error("Error reading document: ", error);
                reject(error);
            });
        } else {
            resolve(JSON.parse(find));
        }
    });
}

// Add Doc
function addoptdata(docRef, data) {
    return new Promise(function(resolve, reject) {
        docRef.add(data)
            .then((doc) => {
                var str = JSON.stringify(data);
                setCookie_local(doc.id, str);
                resolve(doc.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                reject(error);
            });
    });
}

// Set Doc
function setoptdata(docRef, id, data) {
    return new Promise(function(resolve, reject) {
        docRef.doc(id).set(data)
            .then(function() {
                var str = JSON.stringify(data);
                setCookie_local(id, str);
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                reject(error);
            });
    });
}

// Delete Feild
function deloptfeild(docRef, id, field) {
    return new Promise(function(resolve, reject) {
        docRef.doc(id).update({
                [field]: firebase.firestore.FieldValue.delete()
            }).then(function() {
                var find = getCookie_local(id);
                delete find[field];
                setCookie_local(id, find);
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error deleteing Feild: ", error);
                reject(error);
            });
    });
}

// Update Doc
function updateoptdata(docRef, id, data) {
    return new Promise(function(resolve, reject) {
        var find = getCookie_local(id);
        docRef.doc(id).update(data)
            .then(function() {
                if (find != '') {
                    find = JSON.parse(find);
                    var finalobj1 = {};
                    for (var _obj in find) finalobj1[_obj] = find[_obj];
                    for (var _obj in data) finalobj1[_obj] = data[_obj];
                    find = finalobj1;
                    var str = JSON.stringify(find);
                    setCookie_local(id, str);
                } else {
                    var str = JSON.stringify(data);
                    setCookie_local(id, str);
                }
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error updating data: ", error);
                reject(error);
            });
    });
}

// Delete Doc
function deloptdoc(docRef, id) {
    return new Promise(function(resolve, reject) {
        docRef.doc(id).delete().then(function() {
                eraseCookie_local(id);
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error deleting document: ", error);
                reject(error);
            });
    });
}

// Update Array
function uptoptarray(docRef, id, arrayname, data) {
    return new Promise(function(resolve, reject) {
        docRef.doc(id).update({
                [arrayname]: firebase.firestore.FieldValue.arrayUnion(data)
            }).then(function() {
                var find = getCookie_local(id);
                find = JSON.parse(find);
                find[[arrayname]].push(data);
                var str = JSON.stringify(find);
                setCookie_local(id, str);
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error updating array: ", error);
                reject(error);
            });

    });
}

// Delete Array
function deltoptarray(docRef, id, arrayname, item, data) {
    return new Promise(function(resolve, reject) {
        docRef.doc(id).update({
                [arrayname]: firebase.firestore.FieldValue.arrayRemove(data[item])
            }).then(function() {
                var find = getCookie_local(id);
                find = JSON.parse(find);
                find[[arrayname]] = rmelearray(item, find[[arrayname]]);
                var str = JSON.stringify(find);
                setCookie_local(id, str);
                resolve("success");
            })
            .catch(function(error) {
                console.error("Error deleting array: ", error);
                reject(error);
            });
    });
}

////////////////// Application Specific ////////////////////////////////
var last_wallet_id = "";
var last_result = "";


function add_to_local_table(user_id, data) {
    return new Promise(function(resolve, reject) {
        var user_name = '';
        var user_email ='';
        var photo_url= '';
  
    getoptdata(user_Ref, user_id).then(function(finalResult) {
        user_email = finalResult.email;
        user_name = finalResult.name;
        get_user_icon(user_id).then((url) => { photo_url= url;
            var data2 = { user_name: user_name, user_email: user_email, photo_url: photo_url}          
            resolve(Object.assign(data,data2));
             }).catch((error) => {  photo_url= 'none'; 
             var data2 = { user_name: user_name, user_email: user_email, photo_url: photo_url}          
             resolve(Object.assign(data,data2));
               });
    }).catch((error) => {
         console.log(error);       
    });

    });
}

async function get_wallet_data(wallet_id, force_flag) {
  if (last_wallet_id != wallet_id || force_flag) {
        console.log("sending new data");
        let entries = await db.collection("wallets").doc(wallet_id).collection('entries').orderBy("last_updated").get();
      
        var data = [];
      //  let all_wallet_doc_promise = [];
        let all_entries_doc_promise = [];
        entries.forEach((entry_doc) => {  
          //  let entry_id = entry_doc.id
         //   console.log(entry_doc.data());
      //    var wall_r =db.collection("wallets").doc(wallet_id).collection('entries');          
          //  let each_wallet_subdoc_promise =   getoptdata(wall_r, entry_id).then(function(entries) {
              
                var arr = entry_doc.data();
                delete arr["last_updated"];
                Object.keys(arr).map(function(key, index) {
                    const each_entry_promise = new Promise((resolve, reject) => {
                        var timestamp = new Date(key)
                        var user_id = arr[key].user;
                        var doc_id = monthts(timestamp);
                        var data2 = { user: user_id, Description: arr[key].Description, Category: arr[key].Category, Type: arr[key].Type, Payment: arr[key].Payment, Amount: arr[key].Amount, Repeated: arr[key].Repeated,Timestamp: new Date(timestamp), doc_id: doc_id}
                        add_to_local_table(user_id, data2).then(function(result) {
                            data.push(result);
                            resolve(result);
                        }).catch((error) => {
                            reject(error);
                            console.log(error);
                        });
                    });
                    all_entries_doc_promise.push(each_entry_promise);
                });
              //  return Promise.all(all_entries_doc_promise);
          
           // all_wallet_doc_promise.push(each_wallet_subdoc_promise);
        });
        return await Promise.all(all_entries_doc_promise).then((subProjectSnapshots) => {

            last_result = data;
            last_wallet_id = wallet_id;

            return data
        });
    } else {
        console.log("sending old data");
        return last_result
    } 
}

async function get_changes() {
var data =[];
        let feedbacks = await db.collection("feedbacks").orderBy("last_updated").limit(50).get();
                var counter = 1;               
                var promises_wallet = [];

                feedbacks.forEach((doc) => {
                    const promise2 = new Promise((resolve, reject) => {
                        var doc_id = doc.id;
                        var created_on = doc.data().created_on;
                        var last_updated = doc.data().last_updated;
                        var message = doc.data().message;
                        var status = doc.data().status;
                        var user_id = doc.data().user_id;
                        var comment = doc.data().comment;
                        var data2 = {
                            counter: counter++,
                            doc_id: doc_id,
                            created_on: created_on,
                            last_updated: last_updated,
                            message: message,
                            status: status,
                            comment: comment,                          
                        }
                        add_to_local_table(user_id, data2).then(function(result) {
                            data.push(result);                                                  
                            resolve(result);
                        }).catch((error) => {
                            reject(error);
                            console.log(error);
                        });     
                    });
                    promises_wallet.push(promise2);
            });
            return await Promise.all(promises_wallet).then((values) => {
             
                return data
            });
   
}
