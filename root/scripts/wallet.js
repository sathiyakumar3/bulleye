"use strict";
var user_id;
var wallet_Ref = "";
var user_Ref = db.collection("users");

var wallet_id = "";
var wallet_name = '';
var wallet_description = '';
var wallet_type = '';
var wallet_owner = '';
var wallet_location = '';
var wallet_currency = '';
var wallet_symbol = '';

var datetime_loaded = false;
var selected_start = new Date('1/1/1900').getTime();
var selected_end = new Date('1/1/2100').getTime();
var local_data;
var table_data;
var datatable = "";

var start_app = function() {
    var run_wallet = function() {

        var data = date_filter(local_data, selected_end, selected_start);
        data = sort_obj(data, 'Timestamp');
        var user_profile = user_process(data);
        var user_sum = Object.keys(user_profile).length;
        var counter = Object.keys(data).length;
        var sum_income = data_process(data, { 'Payment': 'Paid', 'Type': 'Income' });
        var sum_expense = data_process(data, { 'Payment': 'Paid', 'Type': 'Expense' });
        document.getElementById("number_items_2").innerText = counter + " Entries";
        var currency = '<span class="text-dark-50 font-weight-bold" id>' + wallet_symbol + ' ' + ' </span>';
        document.getElementById("sum_earnings").innerHTML = currency + numberWithCommas(sum_income);
        document.getElementById("sum_expenses").innerHTML = currency + numberWithCommas(sum_expense);
        if ((sum_income - sum_expense) < 0) { document.getElementById("sum_net").classList.add("text-danger"); } else { document.getElementById("sum_net").classList.add("text-success"); }
        if (user_sum > 1) { document.getElementById("user_list_2").innerText = user_sum + " Users"; } else { document.getElementById("user_list_2").innerText = user_sum + " User"; }
        document.getElementById("sum_net").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
        document.getElementById("image_list_3").innerHTML = user_circle_gen(user_profile);
        table_data = check_RecordID(data);
        initialze_table();
    }
    var read_data = function(force_flag) {
        get_wallet_data(wallet_id, force_flag).then(function(result) {
            local_data = result;
            var outcome = date_process(result);
            selected_start = outcome[0];
            selected_end = outcome[1];
            /*    selected_start =selected_start.setHours(0, 0, 0, 0);
               selected_end = selected_end.setHours(23, 59, 59, 999); */

            _initDaterangepicker();
        }).catch((error) => { console.log(error); });
    };
    var _initDaterangepicker = function() {
        if ($('#kt_dashboard_daterangepicker').length == 0) { return; }
        selected_start = moment(selected_start);
        selected_end = moment(selected_end);
        var picker = $('#kt_dashboard_daterangepicker');

        function cb(start, end, label) {
            var title = '';
            var range = '';
            if ((end - start) < 100 || label == 'Today') {
                title = 'Today:';
                range = start.format('MMM D');
            } else if (label == 'Yesterday') {
                title = 'Yesterday:';
                range = start.format('MMM D');
            } else { range = start.format('MMM D') + ' - ' + end.format('MMM D'); }
            $('#kt_dashboard_daterangepicker_date').html(range);
            $('#kt_dashboard_daterangepicker_title').html(title);

            selected_start = start;
            selected_end = end;
            run_wallet();
        }
        picker.daterangepicker({ direction: KTUtil.isRTL(), startDate: selected_start, endDate: selected_end, opens: 'left', applyClass: 'btn-primary', cancelClass: 'btn-light-primary', ranges: { 'Today': [moment(), moment()], 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')], 'Last 7 Days': [moment().subtract(6, 'days'), moment()], 'Last 30 Days': [moment().subtract(29, 'days'), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')], 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')], 'All time': [selected_start, selected_end] } }, cb);
        cb(selected_start, selected_end, '');
    }
    var old_month = "";
    var initialze_table = function() {

        var options = {
            data: { type: 'local', source: table_data, serverPaging: false, serverFiltering: true, },
            destroy: true,
            info: false,
            layout: { scroll: false, footer: false, },
            pagination: false,
            rows: {
                afterTemplate: function(row, data, index) {
                    if (monthts(data['Timestamp']) != old_month) {
                        old_month = monthts(data['Timestamp']);
                        $(row).before('<span class="label label-xl  my-2 label-primary label-pill label-inline ">' +
                            old_month + '</span>' + '' + '<div class="separator separator-dashed"></div>');
                    }
                },

            },
            columns: [{
                    field: 'test',
                    title: '',
                    width: 20,
                    sortable: true,
                    template: function(row) { return row.RecordID }
                },
                { field: 'RecordID',      title: '',sortable: false, width: 20, selector: { class: '' }, textAlign: 'center', },
                {
                    field: 'User',
                    title: 'User',
                    width: 185,
                    sortable: true,
                    template: function(row) { return icon_nd_photo_name_email(row.photo_url, row.user_name, row.user_email); }
                },
                {
                    field: 'Category',
                    title: 'Category & Description',
                    sortable: true,
                    width: 250,
                    template: function(row) { return icon_nd_name_nd_description(get_cat_ic(row.Category), row.Description, row.Category); },
                },
                {
                    field: 'Timestamp',
                    title: 'Date & Time',
                    textAlign: 'center',

                    width: 100,
                    sortable: true,
                    template: function(row) { var myvar = dnt4table(row.Timestamp); return myvar; },
                }, {
                    field: 'Repeated',
                    title: 'Repeated',
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
                    sortable: false,
                    textAlign: 'center',

                  
                    template: function(row) {; var myvar = paid_nt_paid_button(row.Payment, row.Description, row.Type, row.Category, row.Amount, row.Timestamp, row.user, row.Repeated, row.RecordID); var delete_button = delete_button1(row.Timestamp); var edit_button = edit_button3(row.Payment, row.Description, row.Type, row.Category, row.Amount, row.Timestamp, row.user, row.Repeated, row.RecordID); return '<div class="text-right pr-0">' + myvar + edit_button + delete_button + '</div>'; },
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
            var count = ids.length;
            $('#kt_datatable_selected_records_2').html(count);
            if (count > 0) { $('#kt_datatable_group_action_form_2').collapse('show'); } else { $('#kt_datatable_group_action_form_2').collapse('hide'); }
        });
    }

    return {
        init: function() {
            read_data(false);
        },
        refresh: function() {

            read_data(true);
        },
    };
}();
jQuery(document).ready(function() {
    wallet_id = global_data[0];
    wallet_name = global_data[1];
    user_id = global_data[2];
    wallet_type = global_data[3];
    wallet_description = global_data[4];
    wallet_owner = global_data[5];
    wallet_location = global_data[6];
    wallet_currency = global_data[7];

    wallet_symbol = currency_convertor[wallet_currency];
    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');

    cat2combo(wallet_id);

    document.getElementById("form_currency").innerText = wallet_symbol;
    document.getElementById("t_wallet_name").innerText = wallet_name;

    var wallet_type = global_data[3];
    document.getElementById("t_wallet_type").innerHTML = form_wal_type(wallet_type);
    start_app.init();
});



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

function delete_selected() {
    Swal.fire({ title: 'Are you sure?', text: "You are about to delete the selected.", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Delete!' }).then((result) => {
        if (result.isConfirmed) {
            var ids = datatable.checkbox().getSelectedId();
            for (var i = 0; i < ids.length; i++) {
                var data = table_data[ids[i] - 1];
                var timestamp = data.Timestamp;
                del(timestamp, ids.length, i).then(function() {}).catch((error) => { console.log(error); })
            }
        }
    })
};

function del(timestamp, num_of_repeat, i) {
    return new Promise(function(resolve, reject) {
        let myPromise = new Promise(function(resolve, reject) {
            timestamp = new Date(timestamp);
            var entry_id = monthts(timestamp);
            deloptfeild(wallet_Ref, entry_id, timestamp).then(function() { resolve("success"); }).catch((error) => {
                console.log("Error getting documents: ", error);
                reject(error);
            });
        });
        myPromise.then(function(value) {
            swalfire(i, num_of_repeat);
            if (i == (num_of_repeat - 1)) {
                console.log('REFresh');
                start_app.refresh();
            }
            resolve('succeess');
        }, function(error) { reject(error); });
    });
}

function update_selected(update) {
    var ids = datatable.checkbox().getSelectedId();

    for (var i = 0; i < ids.length; i++) {
        var data = table_data[ids[i] - 1];

        var description = data.Description;
        var category = data.Category;
        var amount = data.Amount;
        var timestamp = data.Timestamp;
        var type = data.Type;
        var repeat = data.Repeated;
        var payment = data.Payment;
        var user = data.user;
        switch (update) {
            case "Not Paid":
                payment = "Not Paid";
                break;
            case "Paid":
                payment = "Paid";
                break;
            case "Income":
                type = "Income";
                break;
            case "Expense":
                type = "Expense";
                break;
            default:
        }
        update_entry(description, category, amount, timestamp, type, payment, user, repeat, ids.length, i).then(function() {}).catch((error) => { console.log(error); });
    }
};


function update_entry(description, category, amount, timestamp2, type, payment, user, repeat, num_of_repeat, i) {

    var timestamp = new Date(timestamp2);
    let myPromise = new Promise(function(resolve, reject) {
        var value = {
            [timestamp]: { "user": user, "Description": description, "Category": category, "Type": type, "Payment": payment, "Amount": amount, "Repeated": repeat, },
            last_updated: timestamp
        };
        var entry_id = monthts(timestamp);

        updateoptdata(wallet_Ref, entry_id, value).then(function() { resolve('sucess'); }).catch((error) => {
            console.log(error);
            console.log(error.code);
            if (error == 'Document doesn\'t exist.' || error.code == 'not-found') { setoptdata(wallet_Ref, entry_id, value).then(function() { resolve('sucess'); }).catch((error) => { reject(error); }); }
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