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