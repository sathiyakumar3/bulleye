//////////////////////////////////////////  LOCAL COOKIE    /////////////////////////////////////////////////////////////////////////////////////

function setCookie(cookieName, cookieValue) {
  var d = new Date();
  d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
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
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
//////////////////////////////////////////  LOCAL DATABASE   /////////////////////////////////////////////////////////////////////////////////////
var local_docs = [];

var c = 0;
var d = 0;

function setCookie_local(cookieName, cookieValue) {
  local_docs[cookieName] = cookieValue;
}
function updateCookie_local(cookieName,feild,cookieValue) {
    local_docs[cookieName][feild] = cookieValue;
  }

function getCookie_local(cookieName) {
  if (local_docs.hasOwnProperty(cookieName)) {
    c++;
    document.getElementById("data_compressor").innerHTML = percentage_form(
      d,
      c + d,
      d + " of ",false
    );
    return local_docs[cookieName];
  } else {
    d++;
    document.getElementById("data_compressor").innerHTML = percentage_form(
      d,
      c + d,
      d + " of ",false
    );
    return "";
  }
}

function eraseCookie_local(name) {
  delete arr[name];
}

/////////////////////////////////// LOCAL ICON DATABASE ////////////////////////////////////////
var user_icon_list = {};
user_icon_list["Adminiate"] = "assets/media/users/blank.png";
function get_user_icon(user_id) {
  const ref = firebase
    .storage()
    .ref()
    .child("users/" + user_id);
  return new Promise(function (resolve, reject) {
    if (user_icon_list.hasOwnProperty(user_id)) {
      var find = user_icon_list[user_id];
      resolve(find);
    } else {
      ref
        .getDownloadURL()
        .then((url) => {
          user_icon_list[user_id] = url;
          resolve(url);
        })
        .catch((error) => {
          user_icon_list[user_id] = "assets/media/users/blank.png";
          resolve("assets/media/users/blank.png");
        });
    }
  });
}

//////////////////////////////////////////  CLOUD DATABASE    ////////////////////////////////////////////////////////

// Read Doc
function getoptdata(docRef, id) {
  var find = getCookie_local(id);
  return new Promise(function (resolve, reject) {
    if (find == "") {
      var results = "";
      docRef
        .doc(id)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            results = doc.data();
            var str = JSON.stringify(results);
            setCookie_local(id, str);
            resolve(results);
          } else {
            reject("Document doesn't exist.");
          }
        })
        .catch(function (error) {
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
  return new Promise(function (resolve, reject) {
    docRef
      .add(data)
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
  return new Promise(function (resolve, reject) {
    docRef
      .doc(id)
      .set(data)
      .then(function () {
        var str = JSON.stringify(data);
        setCookie_local(id, str);
        resolve("success");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
        reject(error);
      });
  });
}

// Delete Feild
function deloptfeild(docRef, id, field) {
  return new Promise(function (resolve, reject) {
    docRef
      .doc(id)
      .update({
        [field]: firebase.firestore.FieldValue.delete(),
      })
      .then(function () {
        var find = getCookie_local(id);
        delete find[field];
        setCookie_local(id, find);
        resolve("success");
      })
      .catch(function (error) {
        console.error("Error deleteing Feild: ", error);
        reject(error);
      });
  });
}

// Update Doc
function updateoptdata(docRef, id, data) {
  return new Promise(function (resolve, reject) {
    var find = getCookie_local(id);
    docRef.doc(id)
      .update(data)
      .then(function () {
        if (find != "") {
          find = JSON.parse(find);
      //    console.log(data);
     /*      var finalobj1 = {};
        for (var _obj in find) finalobj1[_obj] = find[_obj];
         for (var _obj in data) {find[_obj] = data[_obj]};
        find = finalobj1; */
        find =Object.assign(find, data)
          var str = JSON.stringify(find);
          setCookie_local(id, str);
    //      console.log(str);
        } else {
          var str = JSON.stringify(data);
          setCookie_local(id, str);
        }
        resolve("success");
      })
      .catch(function (error) {
        console.error("Error updating data: ", error);
        reject(error);
      });
  });
}

// Delete Doc
function deloptdoc(docRef, id) {
  return new Promise(function (resolve, reject) {
    docRef
      .doc(id)
      .delete()
      .then(function () {
        eraseCookie_local(id);
        resolve("success");
      })
      .catch(function (error) {
        console.error("Error deleting document: ", error);
        reject(error);
      });
  });
}

// Update Array
function uptoptarray(docRef, id, arrayname, data) {
  return new Promise(function (resolve, reject) {
    docRef
      .doc(id)
      .update({
        [arrayname]: firebase.firestore.FieldValue.arrayUnion(data),
      })
      .then(function () {
        var find = getCookie_local(id);
        find = JSON.parse(find);
        find[[arrayname]].push(data);
        var str = JSON.stringify(find);    
        setCookie_local(id, str);
        resolve("success");
      })
      .catch(function (error) {
        console.error("Error updating array: ", error);
        reject(error);
      });
  });
}

// Delete Array
function deltoptarray(docRef, id, arrayname, item, data) {
  return new Promise(function (resolve, reject) {
    docRef
      .doc(id)
      .update({
        [arrayname]: firebase.firestore.FieldValue.arrayRemove(data[item]),
      })
      .then(function () {
        var find = getCookie_local(id);
        find = JSON.parse(find);
        find[[arrayname]] = rmelearray(item, find[[arrayname]]);
        var str = JSON.stringify(find);
        setCookie_local(id, str);
        resolve("success");
      })
      .catch(function (error) {
        console.error("Error deleting array: ", error);
        reject(error);
      });
  });
}

////////////////// Application Specific ////////////////////////////////

// add user info to data
function add_to_local_table(user_id) {
  return new Promise(function (resolve, reject) {
    var user_name = "";
    var user_email = "";
    var photo_url = "";

    getoptdata(user_Ref, user_id)
      .then(function (finalResult) {
        user_email = finalResult.email;
        user_name = finalResult.name;
        get_user_icon(user_id)
          .then((url) => {
            photo_url = url;
            var data2 = {
              user_name: user_name,
              user_email: user_email,
              photo_url: photo_url,
              user_id: user_id,
            };
            resolve(data2);
          })
          .catch((error) => {
            photo_url = "none";
            var data2 = {
              user_name: user_name,
              user_email: user_email,
              photo_url: photo_url,
              user_id: user_id,
            };
            resolve(data2);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

// get feedbacks
async function get_changes() {
  let feedbacks = await db
    .collection("feedbacks")
    .orderBy("last_updated")
    .limit(50)
    .get();
  var data = [];
  var counter = 1;
  var promises_wallet = [];
  feedbacks.forEach((doc) => {
    var str = JSON.stringify(doc.data());
    setCookie_local(doc.id, str);
    d++;
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
      };
      add_to_local_table(user_id)
        .then(function (result) {
          data.push(Object.assign(data2, result));
          resolve(result);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
    promises_wallet.push(promise2);
  });
  return await Promise.all(promises_wallet).then((values) => {
    return data;
  });
}

// get user_info
async function load_navi(user_id) {
  let wallet_list = await db
    .collection("wallets")
    .where("users", "array-contains", user_id)
    .limit(6)
    .get();

  var promise_3_FOLDER = [];
  wallet_list.forEach((doc) => {
    var str = JSON.stringify(doc.data());
    setCookie_local(doc.id, str);
    d++;

    const promise_3 = new Promise((resolve, reject) => {
      var wallet_id = doc.id;
      var wallet_name = doc.data().name;
      var wallet_type = doc.data().type;
      var wallet_description = doc.data().description;
      var wallet_owner = doc.data().owner;
      var wallet_location = doc.data().location;
      var wallet_currency = doc.data().currency;
      var promise_1_FOLDER = [];
      var user_list = doc.data().users;
      const promise_2 = new Promise((resolve, reject) => {
        user_list.forEach(function (entry) {
          const promise_1 = new Promise((resolve, reject) => {
            add_to_local_table(entry)
              .then(function (result) {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          });
          promise_1_FOLDER.push(promise_1);
        });
        return Promise.all(promise_1_FOLDER).then((values) => {
          resolve(values);
        });
      });
      return promise_2.then((values) => {
        var n_size = user_list.length;
        var tabl = {
          users: values,
          users_size: n_size,
          wallet_id: wallet_id,
          wallet_name: wallet_name,
          wallet_type: wallet_type,
          wallet_description: wallet_description,
          wallet_location: wallet_location,
          wallet_owner: wallet_owner,
          wallet_currency: wallet_currency,
        };
        resolve(tabl);
      });
    });
    promise_3_FOLDER.push(promise_3);
  });

  return Promise.all(promise_3_FOLDER).then((values) => {
    return values;
  });
}

// get wallet_entries
async function get_wallet_data(wallet_id, wallet_entries) {
  var data = [];
  let all_entries_doc_promise = [];
  let all_wallet_doc_promise = [];
  wallet_entries.forEach((entry_doc) => {
    let each_wallet_subdoc_promise = getoptdata(db.collection("wallets").doc(wallet_id).collection("entries"),entry_doc)
      .then(function (arr) {
        delete arr["last_updated"];
    
        Object.keys(arr).map(function (key, index) {
          const each_entry_promise = new Promise((resolve, reject) => {
            var timestamp = new Date(key);
            var user_id = arr[key].user;
            var doc_id = monthts(timestamp);
            var data2 = {
              user: user_id,
              Description: arr[key].Description,
              Category: arr[key].Category,
              Type: arr[key].Type,
              Payment: arr[key].Payment,
              Amount: arr[key].Amount,
              Repeated: arr[key].Repeated,
              Timestamp: new Date(timestamp),
              doc_id: doc_id,
            };
            add_to_local_table(user_id)
              .then(function (result) {
                data.push(Object.assign(data2, result));
                resolve(result);
              })
              .catch((error) => {
                reject(error);
                console.log(error);
              });
          });
          all_entries_doc_promise.push(each_entry_promise);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    all_wallet_doc_promise.push(each_wallet_subdoc_promise);
  });
  return await Promise.all(all_wallet_doc_promise).then((results) => {
    return Promise.all(all_entries_doc_promise).then((results) => {
      return data;
    });
  });
}

// sync wallet_entries
async function sync_wallet_entries(wallet_id) {
  let entry_list = await db
    .collection("wallets")
    .doc(wallet_id)
    .collection("entries")
    .orderBy("last_updated")
    .get();
  var array = [];
  entry_list.forEach((doc) => {
    array.push(doc.id);
  });
  var data = {
    entries: array,
  };
  return new Promise(function (resolve, reject) {
    updateoptdata(db.collection("wallets"), wallet_id, data)
      .then(function () {
        Swal.fire("Refresh Table", "Refreshed Table Successfully", "success");
        resolve("success");
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
