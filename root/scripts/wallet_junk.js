function process_row(obj, html, total, user_profile, sel) {
    var html_div = "";
    var counter_c = 0;
    var keysSorted = Object.keys(obj).sort(function(a, b) { return obj[b] - obj[a] });
    Object.keys(keysSorted).sort().map(function(key, index) {
        counter_c++;
        if (counter_c <= 5 || sel == 3) {
            switch (sel) {
                case 1:
                    html_div = html_div + build_category_widget(keysSorted[index], obj[keysSorted[index]], total);
                    break;
                case 2:
                    html_div = html_div + build_user_widget(keysSorted[index], obj[keysSorted[index]], total, user_profile);
                    break;
                default:
            }
        }
    });
    document.getElementById(html).innerHTML = html_div;
}

function build_category_widget(cat, value, total) {
    var myvar = '<tr>' + '    <td class="pl-0" style="min-width: 150px">' + icon_nd_name(get_cat_ic(cat), cat) + '    </td>' + '    <td>' + percentage_form(value, total, 'Rs') + '    </td>' + '    <td class="text-right pr-0">' +
        dummy_button() + '    </td>' + '</tr>';
    return myvar
}

function build_user_widget(user, value, total, user_profile) { var myvar = '<tr>' + '<td class="pl-0">' + icon_nd_photo_name_email(user_profile[user]['photo_url'], user_profile[user]['user_name'], user_profile[user]['user_email']) + '</td>' + '<td></td>' + '<td>' + payment_status_fomt('dummy', 'Paid', value, 'dummy') + ' </td>' + '<td class="text-right">' + percentage_form(value, total, 'Rs') + '</td>' + '<td class="text-right pr-0">' + dummy_button() + ' </td>' + '</tr>'; return myvar }
var flag_expand = true;


async function get_wallet_data(wallet_id, force_flag) {
    if (last_wallet_id != wallet_id || force_flag) {
        console.log("sending new data");
        let entries = await db.collection("wallets").doc(wallet_id).collection('entries').orderBy("last_updated").get();
        var data = [];
        let all_wallet_doc_promise = [];
        entries.forEach((entry_doc) => {

            let entry_id = entry_doc.id

            let each_wallet_subdoc_promise = db.collection("wallets").doc(wallet_id).collection('entries').doc(entry_id).get().then((entries) => {
                let getSubProjectsPromises = [];

                var arr = entries.data();
                delete arr["last_updated"];
                Object.keys(arr).map(function(key, index) {
                    const each_entry_promise = new Promise((resolve, reject) => {
                        var user_id = arr[key].user;
                        add_to_local_table(user_id, arr[key].Description, arr[key].Category, arr[key].Type, arr[key].Payment, arr[key].Amount, arr[key].Repeated, new Date(key)).then(function(result) {
                            data.push(result);
                            resolve(result);
                        }).catch((error) => {
                            console.log(error);
                        });
                    });
                    getSubProjectsPromises.push(each_entry_promise);
                });
                return Promise.all(getSubProjectsPromises);
            });
            all_wallet_doc_promise.push(each_wallet_subdoc_promise);
        });
        return await Promise.all(all_wallet_doc_promise).then((subProjectSnapshots) => {

            last_result = data;
            last_wallet_id = wallet_id;

            return data
        });
    } else {
        console.log("sending old data");
        return last_result
    }
}


function get_wallet_data2(wallet_id, force_flag) {
    if (last_wallet_id != wallet_id || force_flag) {
        console.log("sending new data");
        let entries = db.collection("wallets").doc(wallet_id).collection('entries').orderBy("last_updated");


        var data = [];
        let all_wallet_doc_promise = [];
        entries.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((entry_doc) => {

                    let entry_id = entry_doc.id

                    let each_wallet_subdoc_promise = db.collection("wallets").doc(wallet_id).collection('entries').doc(entry_id).get().then((entries) => {
                        let getSubProjectsPromises = [];

                        var arr = entries.data();
                        delete arr["last_updated"];
                        Object.keys(arr).map(function(key, index) {
                            const each_entry_promise = new Promise((resolve, reject) => {
                                var user_id = arr[key].user;
                                add_to_local_table(user_id, arr[key].Description, arr[key].Category, arr[key].Type, arr[key].Payment, arr[key].Amount, arr[key].Repeated, new Date(key)).then(function(result) {
                                    data.push(result);
                                    resolve(result);
                                }).catch((error) => {
                                    console.log(error);
                                });
                            });
                            getSubProjectsPromises.push(each_entry_promise);
                        });
                        return Promise.all(getSubProjectsPromises);
                    });
                    all_wallet_doc_promise.push(each_wallet_subdoc_promise);
                });
            });
        return Promise.all(all_wallet_doc_promise).then((subProjectSnapshots) => {

            last_result = data;
            last_wallet_id = wallet_id;

            return data
        });
    } else {
        console.log("sending old data");
        return last_result
    }
}

async function get_wallet_data(wallet_id, force_flag) {
    if (last_wallet_id != wallet_id || force_flag) {
        console.log("sending new data");
        let entries = await db.collection("wallets").doc(wallet_id).collection('entries').orderBy("last_updated").get();
        var data = [];
        let all_wallet_doc_promise = [];
        entries.forEach((entry_doc) => {
          
                   
            let entry_id = entry_doc.id

            let each_wallet_subdoc_promise = db.collection("wallets").doc(wallet_id).collection('entries').doc(entry_id).get().then((entries) => {
                let all_entries_doc_promise = [];

                var arr = entries.data();
                delete arr["last_updated"];
                Object.keys(arr).map(function(key, index) {
                    const each_entry_promise = new Promise((resolve, reject) => {
                        var user_id = arr[key].user;
                        add_to_local_table(user_id, arr[key].Description, arr[key].Category, arr[key].Type, arr[key].Payment, arr[key].Amount, arr[key].Repeated, new Date(key)).then(function(result) {
                            data.push(result);
                            console.log('[A] : '+result)
                            resolve(result);
                        }).catch((error) => {
                            console.log(error);
                        });
                    });
                    all_entries_doc_promise.push(each_entry_promise);
                });
                return Promise.all(all_entries_doc_promise);
            });
            all_wallet_doc_promise.push(each_wallet_subdoc_promise);
        });
        return await Promise.all(all_wallet_doc_promise).then((subProjectSnapshots) => {

            last_result = data;
            last_wallet_id = wallet_id;

            return data
        });
    } else {
        console.log("sending old data");
        return last_result
    }
}

function add_to_local_table(user_id, description, category, type, payment, amount, selected_repeated, timestamp) {
    return new Promise(function(resolve, reject) {
    const user_image_prom = new Promise((resolve, reject) => { get_user_icon(user_id).then((url) => { resolve({ photo_url: url }); }).catch((error) => { resolve({ photo_url: 'none' }); }); });
    const user_details_prom = new Promise((resolve, reject) => {
        getoptdata(user_Ref, user_id).then(function(finalResult) {
            var user_email = finalResult.email;
            var user_name = finalResult.name;
            resolve({ user_email, user_name });
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
  
         Promise.all([user_image_prom, user_details_prom]).then((values) => {
            var doc_id = monthts(timestamp);
            var data = { user: user_id, Description: description, Category: category, Type: type, Payment: payment, Amount: amount, Repeated: selected_repeated, user_name: values[1]['user_name'], user_email: values[1]['user_email'], photo_url: values[0]['photo_url'], Timestamp: new Date(timestamp), doc_id: doc_id }
            resolve(data);
        }).catch((error) => {
            console.log("Error getting documents: ", error);
            reject(error);
        });
    });
}

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