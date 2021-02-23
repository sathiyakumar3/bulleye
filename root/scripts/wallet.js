"use strict";
// Class definition

var datatable = "";

var wallet_Ref = "";
var selected_start;
var selected_end;
var datetime_loaded = false;



var start_app = function() {
    var read_data2 = function(from, to, first_time) {
        selected_start = from;
        selected_end = to;
        var first_day = "";
        var last_day = "";
        var promises = [];
        var tabler = [];
        var user_sum = 0;
        var user_profile = [];
        var counter = 0;
        var sum_expense = 0;
        var sum_income = 0;
        wallet_Ref.orderBy("last_updated").get()
            .then((querySnapshot) => {
                var items_counter = 0;
                querySnapshot.forEach((doc) => {
                    var items = querySnapshot.size;
                    wallet_Ref.doc(doc.id).onSnapshot(function(doc) {
                        items_counter++;
                        var arr = doc.data();
                        delete arr["last_updated"];

                        Object.keys(arr).sort().map(function(key, index) {
                            var today = new Date(key).getTime();
                            if (today >= from && today <= to) {
                                const promises8 = new Promise((resolve, reject) => {
                                    counter++;
                                    var user_id = arr[key].user;
                                    var user_Ref = db.collection("users");

                                    const user_image_prom = new Promise((resolve, reject) => {
                                        get_user_icon(user_id).then((url) => {
                                            resolve({ photo_url: url });
                                        }).catch((error) => {
                                            resolve({ photo_url: 'none' });
                                        });
                                    });

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

                                    const wallet_details_prom = new Promise((resolve, reject) => {
                                        resolve({
                                            RecordID: counter,
                                            user: arr[key].user,
                                            Description: arr[key].Description,
                                            Category: arr[key].Category,
                                            Type: arr[key].Type,
                                            Amount: arr[key].Amount,
                                            Payment: arr[key].Payment,
                                            Repeated: arr[key].Repeated,
                                            Timestamp: new Date(key),
                                        });
                                    });

                                    Promise.all([user_image_prom, user_details_prom, wallet_details_prom]).then((values) => {
                                        var datetime = values[2]['Timestamp'];
                                        if (first_day == "" || datetime < first_day) {
                                            first_day = datetime;
                                        }
                                        if (last_day == "" || datetime > last_day) {
                                            last_day = datetime;
                                        }

                                        if (values[2]['Payment'] == 'Paid') {
                                            if (values[2]['Type'] == 'Expense') {
                                                sum_expense = sum_expense + Number(values[2]['Amount']);
                                            } else {
                                                sum_income = sum_income + Number(values[2]['Amount']);
                                            }
                                        }
                                        if (!user_profile.hasOwnProperty([user_id])) {
                                            user_profile = {
                                                [user_id]: {
                                                    user_name: values[1]['user_email'],
                                                    user_email: values[1]['user_email'],
                                                    photo_url: values[0]['photo_url'],
                                                }
                                            }
                                            user_sum++;
                                        }
                                        resolve($.extend(values[0], values[1], values[2]));

                                    });

                                });
                                promises.push(promises8);
                            }
                        });

                        Promise.all(promises).then((values) => {
                            if (items_counter == items) {
                                document.getElementById("number_items_2").innerText = counter + " Entries";
                                var currency = '<span class="text-dark-50 font-weight-bold" id>Rs </span>';
                                document.getElementById("sum_earnings").innerHTML = currency + numberWithCommas(sum_income);
                                document.getElementById("sum_expenses").innerHTML = currency + numberWithCommas(sum_expense);
                                if ((sum_income - sum_expense) < 0) {
                                    document.getElementById("sum_net").classList.add("text-danger");
                                } else {
                                    document.getElementById("sum_net").classList.add("text-success");
                                }
                                if (user_sum > 1) {
                                    document.getElementById("user_list_2").innerText = user_sum + " Users";
                                } else {
                                    document.getElementById("user_list_2").innerText = user_sum + " User";
                                }
                                document.getElementById("sum_net").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
                                document.getElementById("image_list_3").innerHTML = user_circle_gen(user_profile);

                                tabler = $.extend(tabler, values);

                                initialze_table(sort_obj(tabler, 'Timestamp'));
                                // process_row(tabler);
                                if (first_time) {
                                    _initDaterangepicker(first_day, last_day);
                                }
                            }
                            resolve("sucess");
                        });


                    });
                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };


    var _initDaterangepicker = function(start, end) {
        if ($('#kt_dashboard_daterangepicker').length == 0) {
            return;
        }
        start = moment(start);
        end = moment(end);

        var picker = $('#kt_dashboard_daterangepicker');
        // var all_f = new Date('1/1/1900').getTime();
        // var all_l = new Date('1/1/2100').getTime();

        function cb(start, end, label) {
            var title = '';
            var range = '';

            if ((end - start) < 100 || label == 'Today') {
                title = 'Today:';
                range = start.format('MMM D');

            } else if (label == 'Yesterday') {
                title = 'Yesterday:';
                range = start.format('MMM D');
            } else {
                range = start.format('MMM D') + ' - ' + end.format('MMM D');
            }


            $('#kt_dashboard_daterangepicker_date').html(range);
            $('#kt_dashboard_daterangepicker_title').html(title);
            if (datetime_loaded == false) {
                datetime_loaded = true;
            } else {
                read_data2(start, end, false);
            }


        }


        picker.daterangepicker({
            direction: KTUtil.isRTL(),
            startDate: start,
            endDate: end,
            opens: 'left',
            applyClass: 'btn-primary',
            cancelClass: 'btn-light-primary',
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'All time': [start, end]
            }
        }, cb);
        cb(start, end, '');

    }
    var old_month = "";
    var initialze_table = function(tabler) {
        var options = {
            data: {
                type: 'local',
                source: tabler,
                serverPaging: false,
                serverFiltering: true,
                serverSorting: true,
            },
            destroy: true,
            info: false,

            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and
                footer: false, // display/hide footer

            },
            // column sorting
            sortable: true,

            pagination: false,
            rowGroup: {
                dataSrc: 4,
            },
            rows: {
                afterTemplate: function(row, data, index) {

                    /*  if (7 == data['RecordID']) {
                        $('td:eq(4)', row).html('<tr class="group"><td colspan="10">' + 'Monday!' + '</td></tr>');
                        console.log(row + " : " + index);
                        $(row).before(
                            '<tr class="group"><td colspan="10">' + 'Hey' + '</td></tr>',
                        );

                    }

                    if (7 == data['RecordID']) {
                        $('td:eq(4)', row).html('<tr class="group"><td colspan="10">' + 'Monday!' + '</td></tr>');
                        console.log(row + " : " + index);
                        $(row).before(
                            '<tr class="group"><td colspan="10">' + 'Hey' + '</td></tr>',
                        );

                    }
 */











                    if (monthts(data['Timestamp']) != old_month) {
                        old_month = monthts(data['Timestamp']);
                        console.log(old_month);
                        $(row).before(

                            '<span class="label label-xl  my-3 label-primary label-pill label-inline mr-2">' +
                            old_month + '</span>' +
                            '' + '<div class="separator separator-dashed"></div>'
                        );

                    }

                }
            },
            // columns definition
            columns: [{
                    field: 'RecordID',
                    title: '#',
                    sortable: false,
                    width: 20,
                    selector: {
                        class: ''
                    },
                    textAlign: 'center',
                }, {
                    field: 'User',
                    title: 'User',
                    width: 185,
                    sortable: true,

                    template: function(row) {
                        /*        get_user_info(row.user).then((function(doc) { // console.log(doc);\
                                   console.log(row.user);
                                   console.log(doc);
                                   return doc;

                               })).catch((error) => {
                                   console.error(error);
                               }); */
                        return icon_nd_photo_name_email(row.photo_url, row.user_name, row.user_email);

                    }
                }, {
                    field: 'Category',
                    title: 'Category',

                    width: 250,
                    sortable: true,
                    template: function(row) {

                        return icon_nd_name_nd_description(get_cat_ic(row.Category), row.Description, row.Category);
                    },
                }, {
                    field: 'Description',
                    title: 'Date & Time',
                    textAlign: 'center',
                    autoHide: false,
                    width: 100,
                    sortable: true,
                    template: function(row) {

                        var myvar = dnt4table(row.Timestamp);
                        return myvar;
                    },
                }, {
                    field: 'Repeated',
                    title: 'Repeated',


                    sortable: true,
                    template: function(row) {
                        return format_repeat(row.Repeated);
                    },
                },

                {
                    field: 'Type2',
                    title: 'Income',
                    textAlign: 'center',
                    width: 100,
                    autoHide: false,
                    sortable: true,
                    template: function(row) {
                        return payment_status_fomt(row.Type, row.Payment, row.Amount, 'Income')
                    },
                },

                {
                    field: 'Type',
                    title: 'Expense',
                    width: 100,
                    textAlign: 'center',
                    autoHide: false,
                    sortable: true,
                    template: function(row) {
                        return payment_status_fomt(row.Type, row.Payment, row.Amount, 'Expense')

                    },
                }, {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    textAlign: 'center',
                    overflow: false,
                    autoHide: false,
                    template: function(row) {; // code block

                        var myvar = paid_nt_paid_button(row.Payment, row.Description, row.Type, row.Category, row.Amount, row.Timestamp, row.user, row.Repeated);
                        var delete_button = delete_button1(row.Timestamp);
                        var edit_button = edit_button3(row.Payment, row.Description, row.Type, row.Category, row.Amount, row.Timestamp, row.user, row.Repeated);
                        return '<div class="text-right pr-0">' + myvar + edit_button + delete_button + '</div>';
                    },
                }
            ],
            extensions: {
                // boolean or object (extension options)
                checkbox: true,

            },
            search: {
                input: $('#kt_datatable_search_query_2'),
                key: 'generalSearch'
            },

        }


        if (datatable != "") {
            //  $('#kt_datatable_2').KTDatatable().clear();
            $('#kt_datatable_2').KTDatatable().destroy();

        }
        datatable = $('#kt_datatable_2').KTDatatable(options);



        $('#kt_datatable_search_status_2').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_datatable_search_type_2').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_datatable_search_status_2, #kt_datatable_search_type_2').selectpicker();

        datatable.on(
            'datatable-on-click-checkbox',
            function(e) {
                var ids = datatable.checkbox().getSelectedId();
                var count = ids.length;

                $('#kt_datatable_selected_records_2').html(count);

                if (count > 0) {
                    $('#kt_datatable_group_action_form_2').collapse('show');
                } else {
                    $('#kt_datatable_group_action_form_2').collapse('hide');
                }
            });



        $('#kt_datatable_fetch_modal_2').on('show.bs.modal', function(e) {
            var ids = datatable.checkbox().getSelectedId();
            var c = document.createDocumentFragment();
            for (var i = 0; i < ids.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('data-id', ids[i]);
                li.innerHTML = 'Selected record ID: ' + ids[i];
                c.appendChild(li);
            }
            $('#kt_datatable_fetch_display_2').append(c);
        }).on('hide.bs.modal', function(e) {
            $('#kt_datatable_fetch_display_2').empty();
        });

    }


    return {
        init: function() {
            selected_start = new Date('1/1/1900').getTime();
            selected_end = new Date('1/1/2100').getTime();
            read_data2(selected_start, selected_end, true);

        },
        refresh: function() {
            read_data2(selected_start, selected_end, false);
        },

    };
}();



jQuery(document).ready(function() {
    var wallet_id = global_data[0];
    var wallet_name = global_data[1];
    cat2combo(wallet_id);
    document.getElementById("t_wallet_name").innerText = wallet_name.toUpperCase();
    //  document.getElementById("t_wallet_id").innerText = wallet_id;
    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');
    var wallet_type = global_data[3];
    document.getElementById("t_wallet_type").innerHTML = form_wal_type(wallet_type);
    start_app.init();
});



function delete_selected() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You are about to delete the selected.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete!'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log(1);
            var ids = datatable.checkbox().getSelectedId();
            for (var i = 0; i < ids.length; i++) {
                var data = datatable.dataSet[ids[i] - 1];
                var timestamp = data.Timestamp;
                var entry_id = monthts(new Date(timestamp));
                deloptfeild(wallet_Ref, entry_id, timestamp).then(function() {});
                if (i == (ids.length - 1)) {
                    start_app.refresh();
                }
            }
        }
    })

};

function update_selected(update) {
    var ids = datatable.checkbox().getSelectedId();
    for (var i = 0; i < ids.length; i++) {
        var data = datatable.dataSet[ids[i] - 1];
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
        update_entry(description, category, amount, timestamp, type, payment, user, repeat).then(function() {

        }).catch((error) => {
            console.log(error);
        });
        if (i == (ids.length - 1)) {
            start_app.refresh();
        }

    }

};


function entry_delete(key) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            var entry_id = monthts(new Date(key));

            deloptfeild(wallet_Ref, entry_id, key).then(function() {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    start_app.refresh();
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }
    })


}