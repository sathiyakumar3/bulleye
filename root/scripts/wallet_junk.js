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
    const user_image_prom = new Promise((resolve, reject) => { get_user_icon(user_id).then((url) => { resolve({ photo_url: url }); }); });
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

var old_month = "";
var initialze_table = function(sum_income,sum_expense,sum_income2,sum_expense2) {
    KTApp.unblock('#kt_blockui_content');
    var options = {
        data: { type: 'local', source: table_data, serverPaging: false, serverFiltering: true, },
        destroy: true,
        info: false,
        layout: { scroll: false, footer: false, },
        pagination: false,
        responsive: true,
        rows: {           
            afterTemplate: function(row, data, index) {
                if (monthts(data['Timestamp']) != old_month) {
                    old_month = monthts(data['Timestamp']);
                    $(row).before('<span class="label label-xl  my-2 label-primary label-pill label-inline ">' +
                        old_month + '</span>' + '' + '<div class="separator separator-dashed"></div>');
                }
            },

        },
        columns: [/* {
                field: 'test',
                title: '#',
                width: 20,
                sortable: true,
                template: function(row) { return row.RecordID }
            }, */
            
            {
                field: 'RecordID',
                title: '#',
                sortable: false,
                width: 20,
                type: 'number',
                selector: {
                  class: '',
                },
                textAlign: 'center',
              },{
                field: 'User',
                title: 'User',    
                width: 40,              
                sortable: true,
                template: function(row) { return icon_nd_name_nd_description2(row.photo_url,row.user_name) }
            },{
                field: 'Timestamp',
                title: 'Date & Time',
                textAlign: 'left',
                width: 100,
                sortable: true,
                template: function(row) { var myvar = dnt4table(row.Timestamp); return myvar; },
            },
            
            {
                field: 'Category',
                title: 'Category & Description',
                sortable: true,
                width: 200,
                template: function(row) { return icon_nd_name_nd_description(get_cat_ic(row.Category), row.Description, row.Category); },
            },
         {
                field: 'Value of Total',
                title: 'Value of Total',
                textAlign: 'center',
             
                width: 200,
                template: function(row) {
                    var selet1 = '';
                    var selet2 = '';
                    var html_div ='';
                    switch(row.Type){
                        case 'Expense':
                            selet1 = sum_expense;
                            selet2 = sum_expense2;
                            break;
                          case 'Income':
                            selet1 = sum_income;
                            selet2 = sum_income2;
                            break;
                          default:                           
                    }
                    switch(row.Payment){
                        case 'Not Paid':
                            html_div = percentage_form(row.Amount, selet2, ' Rs');
                            break;
                          case 'Paid':
                            html_div = percentage_form(row.Amount, selet1, ' Rs');
                            break;
                          default:                               
                    }                        
                    return html_div ;
                 },
            } ,
             {
                field: 'Repeated',
                title: 'Repeated',
                textAlign: 'center',
                width: 100,
                sortable: true,
                template: function(row) { return format_repeat(row.Repeated); },
            },
            {
                field: 'Type2',
                title: 'Income',
                textAlign: 'center',
                width: 100,
                autoHide: false,
           
                template: function(row) { return payment_status_fomt(row.Type, row.Payment, row.Amount, 'Income', wallet_symbol) },
            },
            {
                field: 'Type',
                title: 'Expense',
                width: 100,
                textAlign: 'center',
                autoHide: false,

                template: function(row) { return payment_status_fomt(row.Type, row.Payment, row.Amount, 'Expense', wallet_symbol) },
            },
            {
                field: 'Actions',
                title: 'Actions',
                textAlign: 'center',
                width: 150,
                template: function(row) {; var myvar = paid_nt_paid_button(row.Payment, row.Description, row.Type, row.Category, row.Amount, row.Timestamp, row.user, row.Repeated, row.RecordID); var delete_button = delete_button1(row.Timestamp); var edit_button = edit_button3(row.Payment, row.Description, row.Type, row.Category, row.Amount, row.Timestamp, row.user, row.Repeated, row.RecordID); return '<div class="text-right">' + myvar + edit_button + delete_button + '</div>'; },
            }
        ],
        extensions: { checkbox: true, },
        search: { input: $('#kt_datatable_search_query_2'), key: 'generalSearch' },
    }
    if (datatable != "") {
        $('#kt_datatable_2').KTDatatable().empty();
        $('#kt_datatable_fetch_display_2').innerHTML = '';
        $('#kt_datatable_group_action_form_2').collapse('hide');
        $('#kt_datatable_selected_records_2').html(0);
        $('#kt_datatable_2').KTDatatable().destroy();
    }
    datatable = $('#kt_datatable_2').KTDatatable(options);

    $('#kt_datatable_search_status_2').on('change', function() {
        datatable.search($(this).val(), 'Payment');
        console.log($(this).val())
    });
    $('#kt_datatable_search_type_2').on('change', function() {
        datatable.search(format_repeat($(this).val()), 'Repeated');
        console.log(format_repeat($(this).val()))
    });

    $('#kt_datatable_search_status_2, #kt_datatable_search_type_2').selectpicker();

    datatable.on('datatable-on-click-checkbox', function(e) {
        var ids = datatable.checkbox().getSelectedId();
        console.log(ids);
        var count = ids.length;
        $('#kt_datatable_selected_records_2').html(count);
        if (count > 0) { $('#kt_datatable_group_action_form_2').collapse('show'); } else { $('#kt_datatable_group_action_form_2').collapse('hide'); }
    });
    $('[data-toggle="tooltip"]').tooltip();
}

var data =          
['2VK6nZLGeoMreLiS3T5c',
'7dXv1ciUxSDkIrUGDBje',
'AbXO8AP2ST1yJee3AIXX',
'Bz0wok8BYoI7DDJkrvOr',
'CClzfdfHEX6hbJaVXF5x',
'H3D6taJCkOVNxETuehVf',
'JxVTE92jNJbLAcOfkc8H',
'N5ERuybhQG0EbkheJcWH',
'T7oAhdxVnvVBbI3Glt2T',
'XVVOQn0uFvGP18YGGIRY',
'g4HuKHCKdd86l22eqtEj',
'gKslYwg6XDQSIBY0N6Oe',
'js95dohALlyBDdElBFmG',
'pci8eOv2A8eSH01LlQuK',
'sMexJvahMZ5KWo6mCdsZ',
'vFvjqJDsLjtuZ5Zp3w2B',
'w1UM8nR4mZdRlRaDLN4h']
data.forEach(function(item, index, array) {
    sync_wallet_entries(item);
  })


  updateoptdata(wallet_Ref_entries, entry_id, data).then(function() {          
}).catch((error) => {
        console.log(error);
        if (error == 'Document doesn\'t exist.' || error.code == 'not-found') { 
            setoptdata(wallet_Ref_entries, entry_id, data).then(function() {
                uptoptarray(wallet_Ref, wallet_id, 'entries', entry_id).then(function() {                         
                }).catch((error) => {
                    console.log(error);
                });                
                
        }).catch((error) => { 
            console.log(error);
             reject(error); }); }
    });   

    
///////////Osolite
function delete_selected1() {
    Swal.fire({ title: 'Are you sure?', text: "You are about to delete the selected.", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Delete!' }).then((result) => {
        if (result.isConfirmed) {
            var ids = selected_items;
            for (var i = 0; i < ids.length; i++) {
                var data = table_data[ids[i] - 1];
                var timestamp = data.Timestamp;
                del(timestamp, ids.length, i).then(function () { }).catch((error) => { console.log(error); })
            }
        }
    })
};
function del(timestamp, num_of_repeat, i) {
    return new Promise(function (resolve, reject) {
        let myPromise = new Promise(function (resolve, reject) {
            timestamp = new Date(timestamp);
            var entry_id = monthts(timestamp);
            deloptfeild(wallet_Ref_entries, entry_id, timestamp).then(function () { resolve("success"); }).catch((error) => {
                console.log("Error getting documents: ", error);
                reject(error);
            });
        });
        myPromise.then(function (value) {
            swalfire(i, num_of_repeat);
            if (i == (num_of_repeat - 1)) {
                console.log('REFresh');
                start_app.refresh();
            }
            resolve('succeess');
        }, function (error) { reject(error); });
    });
}


///////////Osolite
function update_entry1(description, category, amount, timestamp2, type, payment, user, repeat, num_of_repeat, i) {





       var timestamp = new Date(timestamp2);
        let myPromise = new Promise(function(resolve, reject) {
            var value = {
                [timestamp]: { "user": user, "Description": description, "Category": category, "Type": type, "Payment": payment, "Amount": amount, "Repeated": repeat, },
                last_updated: timestamp
            };
            var entry_id = monthts(timestamp);

            updateoptdata(wallet_Ref_entries, entry_id, value).then(function() { resolve('sucess'); }).catch((error) => {
                console.log(error);
                if (error == 'Document doesn\'t exist.' || error.code == 'not-found') { 

                    setoptdata(wallet_Ref_entries, entry_id, value).then(function() {
                        uptoptarray(wallet_Ref, wallet_id, 'entries', entry_id).then(function() {
                            resolve('sucess'); 
                        }).catch((error) => {
                            console.log(error);
                        });






                }).catch((error) => { 
                    console.log(error);
                     reject(error); }); }
            });
        });
        return new Promise(function(resolve, reject) {
            myPromise.then(function(value) {
                swalfire(i, num_of_repeat);
                if (i == (num_of_repeat - 1)) {
                    start_app.refresh();
                }
                resolve('sucess');
            }, function(error) { reject(error); });
        }); 


}

function edit_entry_modal(description, category, amount, timestamp, type, payment, repeat, RecordID) {

    document.getElementById('record_id').value = RecordID;
    $('#edit_incex_form_modal').modal('toggle');
    document.getElementById('example-number-input2').value = 1;
    $('#edit_cat_selec').selectpicker('val', category);
    document.getElementById('edit_incex_form').querySelector('[name="form_description_2"]').value = description;
    document.getElementById('edit_incex_form').querySelector('[name="form_amount_2"]').value = amount;
    switch (type) {
        case 'Expense':
            document.getElementById("expense_radio").checked = true;
            break;
        case 'Income':
            document.getElementById("income_radio").checked = true;
            break;
        default:
    }
    switch (payment) {
        case 'Not Paid':
            document.getElementById("not_paid_radio").checked = true;
            break;
        case 'Paid':
            document.getElementById("paid_radio").checked = true;
            break;
        default:
    }
    $('#kt_datetimepicker_10').datetimepicker('clear');
    $('#kt_datetimepicker_10').datetimepicker('destroy');
    $('#kt_datetimepicker_10').datetimepicker({ defaultDate: new Date(timestamp), format: 'MM/DD/YYYY hh:mm:ss A', disable: true });
    document.getElementById('repeat_selection').value = repeat;
    document.getElementById('title_33').innerText = "Edit Entry"
} 

function entry_delete(timestamp, num_of_repeat, i) {
    Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!' }).then((result) => { if (result.isConfirmed) { del(timestamp, num_of_repeat, i); } })
}

