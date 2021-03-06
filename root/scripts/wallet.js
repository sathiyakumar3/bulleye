"use strict";


var user_id;
var wallet_Ref_entries = "";
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
var wallet_entries = '';



var datetime_loaded = false;
var selected_start = new Date('1/1/1900').getTime();
var selected_end = new Date('1/1/2100').getTime();
var local_data;
var table_data;
var datatable = "";
var selected_items = [];
var table_databale = '';

var start_app = function () {
    var run_wallet = function () {

        var data = date_filter(local_data, selected_end, selected_start);

        var user_profile = user_process(data);
        var user_sum = Object.keys(user_profile).length;
        var counter = Object.keys(data).length;
        var sum_income = data_process(data, { 'Payment': 'Paid', 'Type': 'Income' });
        var sum_expense = data_process(data, { 'Payment': 'Paid', 'Type': 'Expense' });
        var sum_income2 = data_process(data, { 'Payment': 'Not Paid', 'Type': 'Income' });
        var sum_expense2 = data_process(data, { 'Payment': 'Not Paid', 'Type': 'Expense' });
        document.getElementById("number_items_2").innerText = counter + " Entries";
        var currency = '<span class="text-dark-50 font-weight-bold" id>' + wallet_symbol + ' ' + ' </span>';
        document.getElementById("sum_earnings").innerHTML = currency + numberWithCommas(sum_income);
        document.getElementById("sum_expenses").innerHTML = currency + numberWithCommas(sum_expense);
        if ((sum_income - sum_expense) < 0) { document.getElementById("sum_net").classList.add("text-danger"); } else { document.getElementById("sum_net").classList.add("text-success"); }
        if (user_sum > 1) { document.getElementById("user_list_2").innerText = user_sum + " Users"; } else { document.getElementById("user_list_2").innerText = user_sum + " User"; }
        document.getElementById("sum_net").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
        document.getElementById("image_list_3").innerHTML = user_circle_gen(user_profile);
        table_data = check_RecordID(data);

        initTable2(sum_income, sum_expense, sum_income2, sum_expense2);
    }
    var read_data = function () {
        console.log('[DATA FETCH ] - ' + new Date());
        get_wallet_data(wallet_id, wallet_entries).then(function (result) {
            local_data = result;

            console.log('[DATA  GOT ] - ' + new Date());
          
            var outcome = date_process(result);


            selected_start = outcome[0];
            selected_end = outcome[1];
            /*    selected_start =selected_start.setHours(0, 0, 0, 0);
               selected_end = selected_end.setHours(23, 59, 59, 999); */
              var cat = cat_process(local_data);
               
               const d_income_prom = new Promise((resolve, reject) => {
                   get_data(local_data, { 'Type': ['Income'] }, cat).then(function(result) {
                       resolve(result);
                   }).catch((error) => {
                       console.log(error);
                       reject(error);
                   });
               });
               const d_expense_prom = new Promise((resolve, reject) => {
                   get_data(local_data, { 'Type': ['Expense'] }, cat).then(function(result) {
                       resolve(result);
                   }).catch((error) => {
                       console.log(error);
                       reject(error);
                   });
               });
               Promise.all([d_income_prom, d_expense_prom]).then((values) => {
                 var  d_income = values[0];
                 var  d_expense = values[1];
                   build_timeline(cat,d_expense,d_income)
                //    console.log(d_income);
                //    console.log(d_expense);
               }).catch((error) => {
                   console.log("Error getting documents: ", error);
                   reject(error);
               });
            _initDaterangepicker();
        }).catch((error) => { console.log(error); });
    };
    var _initDaterangepicker = function () {
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
    var initTable2 = function (sum_income, sum_expense, sum_income2, sum_expense2) {
    
        KTApp.unblock('#kt_blockui_content');
        console.log('[TABLE FETCH ] - ' + new Date());
        console.log(table_data);
        var colums_select = [15, 9, 10, 11, 5, 13, 14, 12];
        if (table_databale != "") {
            table_databale.off('change', '.group-checkable');
            table_databale.off('change', '.checkable');
            table_databale.destroy();
            selected_items = [];
            refresh_table_buttons();
        }


        var options = {
            responsive: true,
            destroy: true,
            processing: true,
            data: table_data,
            dom: `<'row hide'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'lp>>`,
            bInfo: false,
            paging: false,
            buttons: [
                {
                    extend: 'copyHtml5',
                    exportOptions: {
                        columns: colums_select
                    }
                },
                {
                    extend: 'excelHtml5',
                    exportOptions: {
                        columns: colums_select
                    }
                },
                {
                    extend: 'pdfHtml5',
                    title: 'Name : ' + wallet_name,
                    messageTop: 'Description : ' + wallet_description + '\n' + 'Currency : ' + wallet_currency,
                    messageBottom: '\n' + 'Powered by Adminiate.com',
                    exportOptions: {

                        columns: colums_select
                    }
                },
            ],
            order: [[16, 'asc']],

            columns: [
                { data: "RecordID" },
                { data: "Timestamp" },
                { data: "doc_id" },
                { data: "Payment" },
                { data: "Type" },
                { data: "Category" },
                { data: "Category" },
                { data: "Category" },
                { data: "Category" },
                { data: "user_name" },
                { data: "Category" },
                { data: "Description" },
                { data: "Type" },
                { data: "Amount" },
                { data: "Amount" },
                { data: "Timestamp" },
                { data: "Timestamp" }
            ],

            select: {
                style: 'multi',
                selector: 'td:first-child .checkable',
            },
            headerCallback: function (thead, data, start, end, display) {
                thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="checkbox checkbox-single checkbox-solid checkbox-primary mb-0">
                        <input type="checkbox" value="" class="group-checkable"/>
                        <span></span>
                    </label>`;
            },

            columnDefs: [
                {
                    targets: 0,
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '<label class="checkbox checkbox-single checkbox-primary mb-0">' +
                            '<input type="checkbox" value="' + full.RecordID + '" class="checkable"/>' +
                            '<span></span>' +
                            '</label>';
                    },
                },
                {
                    targets: 1,
                    title: 'User',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return icon_nd_name_nd_description2(full.photo_url, full.user_name);

                    },
                },
                {
                    targets: 2,
                    title: 'Date & Time',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return dnt4table(full.Timestamp);
                    },
                },
                {
                    targets: 3,
                    title: 'Item',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return icon_nd_name_nd_description(get_cat_ic(full.Category), full.Description, full.Category);

                    },
                },

                {
                    targets: 4,
                    title: 'Proportion',
                    visible: false,
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var selet1 = '';
                        var selet2 = '';
                        var html_div = '';
                        switch (full.Type) {
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
                        switch (full.Payment) {
                            case 'Not Paid':
                                html_div = percentage_form(full.Amount, selet2, ' Rs');
                                break;
                            case 'Paid':
                                html_div = percentage_form(full.Amount, selet1, ' Rs');
                                break;
                            default:
                        }
                        return html_div;
                    },
                },
                {
                    targets: 5,
                    title: 'Recurring',
                    className: "dt-center",
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return format_repeat(full.Repeated);
                    },
                },
                {
                    targets: 6,
                    title: 'Income',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return payment_status_fomt(full.Type, full.Payment, full.Amount, 'Income', wallet_symbol);
                    },
                },
                {
                    targets: 7,
                    title: 'Expense',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return payment_status_fomt(full.Type, full.Payment, full.Amount, 'Expense', wallet_symbol);
                    },
                },
                {
                    targets: 8,
                    title: 'Actions',
                    orderable: false,
                    render: function (data, type, full, meta) {

                        var myvar = paid_nt_paid_button(meta.row, full.Payment);
                        //     var delete_button = delete_button1(meta.row);
                        var edit_button = edit_button3(meta.row);
                        return '<div class="text-center">' + myvar + edit_button + '</div>';
                    },
                },
                {
                    targets: 9,
                    title: 'User',
                    orderable: false,
                    visible: false,
                    searchable: false,
                    render: function (data, type, full, meta) {
                        return full.user_name;
                    },
                },
                {
                    targets: 10,
                    title: 'Category',
                    orderable: false,
                    visible: false,
                    searchable: false,
                    render: function (data, type, full, meta) {
                        return full.Category;
                    },
                },

                {
                    targets: 11,
                    title: 'Description',
                    orderable: false,
                    visible: false,
                    searchable: false,
                    render: function (data, type, full, meta) {
                        return full.Description;
                    },

                },

                {
                    targets: 12,
                    title: 'Status',
                    orderable: false,
                    visible: false,
                    searchable: false,
                    render: function (data, type, full, meta) {
                        return full.Payment;
                    },

                },
                {
                    targets: 13,
                    title: 'Income',
                    orderable: false,
                    visible: false,
                    searchable: false,
                    render: function (data, type, full, meta) {
                        if (full.Type == 'Income') { return full.Amount } else {
                            return '';
                        };
                    },

                },
                {
                    targets: 14,
                    title: 'Expense',
                    orderable: false,
                    visible: false,
                    searchable: false,
                    render: function (data, type, full, meta) {
                        if (full.Type == 'Expense') { return full.Amount } else {
                            return '';
                        };
                    },

                },

                {
                    targets: 15,
                    title: 'Timestamp',
                    orderable: false,
                    visible: false,
                    searchable: false,
                    render: function (data, type, full, meta) {
                        var ts = shortdate(full.Timestamp) + ' ' + formatAMPM(full.Timestamp);
                        return ts
                    },

                },

                {
                    targets: 16,
                    title: 'For Sorting',

                    visible: false,
                    searchable: false,
                    render: function (data, type, full, meta) {
                        return full.Timestamp
                    },

                },
            ],
        };
        if (enable_months) {
            options['rowGroup'] = {
                dataSrc: function (row) {
                    var html_div = '<span class="label label-xl label-primary label-pill label-inline">' +
                        row.doc_id + '</span>';
                    return html_div;
                }
            };
        }
        table_databale = $('#kt_datatable_22').DataTable(options);


        table_databale.on('change', '.group-checkable', function () {
            var set = $(this).closest('table').find('td:first-child .checkable');
            var checked = $(this).is(':checked');
            $(set).each(function () {
                if (checked) {
                    selected_items.push($(this).val());
                    $(this).prop('checked', true);
                    table_databale.rows($(this).closest('tr')).select();
                }
                else {
                    selected_items.remove_item_from_array($(this).val());
                    $(this).prop('checked', false);
                    table_databale.rows($(this).closest('tr')).deselect();
                }
            });
            refresh_table_buttons();
        });

        table_databale.on('change', '.checkable', function () {
            var checked = $(this).is(':checked');
            var value = $(this).val();
            if (checked) {
                selected_items.push(value);
                table_databale.rows($(this).closest('tr')).select();
            }
            else {
                selected_items.remove_item_from_array(value);
            }
            refresh_table_buttons();

        });
        console.log('[TABLE IINTIZED ] - ' + new Date());
     
    };



    return {
        init: function () {
            KTApp.block('#kt_blockui_content', {
                overlayColor: '#1e1e2d',
                opacity: 0,
                state: 'primary',
                message: 'Fetching Entries...'
            });

            read_data();
        },
        refresh: function () {
            KTApp.block('#kt_blockui_content', {
                overlayColor: '#1e1e2d',
                opacity: 0,
                state: 'primary',
                message: 'Fetching Entries...'
            });
            read_data();
        },
        entries_sync: function () {
            sync_wallet_entries();
            start_app.refresh();
        }
    };
}();
jQuery(document).ready(function () {

    wallet_id = global_data[0];
    user_id = global_data[2];

    wallet_Ref_entries = db.collection("wallets").doc(wallet_id).collection('entries');
    wallet_Ref = db.collection("wallets");
    getoptdata(wallet_Ref, wallet_id).then(function (doc) {
        wallet_name = doc.name;
        wallet_type = doc.type;
        wallet_description = doc.description;
        wallet_owner = doc.owner;
        wallet_location = doc.location;
        wallet_currency = doc.currency;
        wallet_entries = doc.entries;
        wallet_symbol = currency_convertor[wallet_currency];
        document.getElementById("form_currency").innerText = wallet_symbol;
        document.getElementById("t_wallet_name").innerHTML ='<a  class="btn btn-dark btn-shadow  font-weight-bold  px-6 py-3" style = "text-transform:uppercase;">'+wallet_name+'</a>' ;
        cat2combo(wallet_id);
        start_app.init();
    }).catch((error) => {
        console.log(error);
    });
});
$('#kt_datatable_group_action_form_3').collapse('show');
function refresh_table_buttons() {
    var count = selected_items.length;
    $('#kt_datatable_selected_records_2').html(count);
    if (count > 0) {
        $('#kt_datatable_group_action_form_2').collapse('show');

    } else {

        $('#kt_datatable_group_action_form_2').collapse('hide');
    }
}




//delete selected_items
function delete_selected() {
    Swal.fire({
        title: 'Are you sure?',
        text: "Selected rows will be deleted.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            var rows = table_databale.rows('.selected');
            rows.remove().draw();
            var main_data = table_databale.data();
            table_databale.clear().draw();
            table_databale.rows.add(main_data);
            table_databale.columns.adjust().draw();
            save_updates();
            Swal.fire(
                'Deleted!',
                'The items have been deleted.',
                'success'
            )
        }
    });
};

function update_paid_not(sel_item) {
    selected_items = [];
    refresh_table_buttons();
    var main_data = table_databale.data();
    var data = main_data[sel_item];
    var payment = data.Payment;
    switch (payment) {
        case 'Not Paid':
            payment = "Paid";
            break;
        case 'Paid':
            payment = "Not Paid";
            break;
        default:
    }
    data.Payment = payment;
    main_data[sel_item] = data;
    table_databale.clear().draw();
    table_databale.rows.add(main_data);
    table_databale.columns.adjust().draw();
    save_updates();
}

function add_entry_modal() {
    $('#edit_incex_form_modal').modal('toggle');
    $('#edit_cat_selec').selectpicker('refresh');
    document.getElementById('edit_incex_form').querySelector('[name="form_description_2"]').value = "";
    document.getElementById('edit_incex_form').querySelector('[name="form_amount_2"]').value = "";
    document.getElementById("expense_radio").checked = true;
    document.getElementById("paid_radio").checked = true;
    $('#kt_datetimepicker_10').datetimepicker('clear');
    $('#kt_datetimepicker_10').datetimepicker('destroy');
    $('#kt_datetimepicker_10').datetimepicker({ defaultDate: new Date(), format: 'MM/DD/YYYY hh:mm:ss A', enable: true });
    document.getElementById('title_33').innerText = "Add to Wallet";
    document.getElementById('record_id').value = '';
    document.getElementById('add_edit_button').innerText = 'Add';

}
function edit_entry_modal(sel) {
    selected_items = [];
    refresh_table_buttons();
    selected_items.push(sel);
    var main_data = table_databale.data();
    var sel_data = main_data[sel];
    var description = sel_data.Description;
    var category = sel_data.Category;
    var amount = sel_data.Amount
    var timestamp = sel_data.Timestamp;
    var type = sel_data.Type;
    var payment = sel_data.Payment;
    var repeat = sel_data.Repeated;
    var RecordID = sel_data.RecordID;

    document.getElementById('record_id').value = RecordID;
    $('#edit_incex_form_modal').modal('toggle');
    document.getElementById('example-number-input2').value = 1;
    $('select[name=form_catergory_2]').val(category);
    $('.selectpicker').selectpicker('refresh');
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
    document.getElementById('title_33').innerText = "Edit Entry";
    document.getElementById('add_edit_button').innerText = 'Edit';
}

// update selected_items 
function update_selected(update) {
    var ids = selected_items;
    var main_data = table_databale.data();
    for (var i = 0; i < ids.length; i++) {
        var sel_item = ids[i] - 1;
        var data = main_data[sel_item];
        var type = data.Type;
        var payment = data.Payment;
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
        data.Payment = payment;
        data.Type = type;
        main_data[sel_item] = data;
    }
    table_databale.clear().draw();
    table_databale.rows.add(main_data);
    table_databale.columns.adjust().draw();
    save_updates();

};

function save_updates() {
    unsaved_flag = true;
    $('#save_changes_unit').collapse('show');
    //  save_changes();
    selected_items = [];
    refresh_table_buttons();
}

function sync_wallet_entries() {
    var results = table_databale.data();
    for (var i = 0; i < results.length; i++) {
        var data = results[i];
      
        var timestamp = new Date(data.Timestamp);
        var entry = monthts(timestamp);
        if (!wallet_entries.includes(entry)) {
            wallet_entries.push(entry);
        }
    }


}

function build_timeline(cat,d_expense,d_income) {
    var myvar = '';
    var teser ='';
/*     console.log(cat);
    console.log(d_expense);
    console.log(d_income); */
    var d_netcome = [];
    for (var i = 0; i < cat.length; i++) {
        var teser = '<button type="button" class="btn btn-primary btn-lg btn-block">'+cat[i]+ ' - '+wallet_currency+' '+(Number(d_income[i])-Number(d_expense[i]))+'</button>'+teser;																		
       var ccd = '<div class="d-flex flex-wrap align-items-center justify-content-between w-100">'+ 
       '																	<div class="d-flex flex-column align-items-cente py-2 w-75">'+
       '																		<a href="#" class="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1">'+(Number(d_expense[i])-Number(d_income[i]))+'  </a>'+wallet_currency+'</a>'+
       '																		<span class="text-muted font-weight-bold">Profit</span>'+   
       '																	</div>'+
       '																	<span class="label label-lg label-light-primary label-inline font-weight-bold py-4">Closed</span>'+
       '																</div>';
           
       
        var myvar = '<div class="timeline-item align-items-start">'+
        '														<div class="timeline-label font-weight-bolder text-dark-75 font-size-lg">'+cat[i]+'</div>'+
        '														<div class="timeline-badge">'+
        '															<i class="fa fa-genderless text-warning icon-xl"></i>'+
        '														</div>'+teser+
        '													</div>'+myvar;
 
       

        
        d_netcome.push((Number(d_income[i])-Number(d_expense[i])));

    }
    console.log(myvar);

  document.getElementById('timeline_menu').innerHTML = teser;
  
 
    var element = document.getElementById("kt_tiles_widget_8_chart");
    var height = parseInt(KTUtil.css(element, 'height'));
    var color = KTUtil.hasAttr(element, 'data-color') ? KTUtil.attr(element, 'data-color') : 'danger';

    if (!element) {
        return;
    }

    var options = {
        series: [{
            name: 'Net Profit',
            data: d_netcome
        }],
        chart: {
            type: 'area',
            height: 150,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {},
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'solid'
        },
        stroke: {
            curve: 'smooth',
            show: true,
            width: 3,
            colors: [KTApp.getSettings()['colors']['theme']['base'][color]]
        },
        xaxis: {
            categories: cat,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false,
                style: {
                    colors: KTApp.getSettings()['colors']['gray']['gray-500'],
                    fontSize: '12px',
                    fontFamily: KTApp.getSettings()['font-family']
                }
            },
            crosshairs: {
                show: false,
                position: 'front',
                stroke: {
                    color: KTApp.getSettings()['colors']['gray']['gray-300'],
                    width: 1,
                    dashArray: 3
                }
            },
            tooltip: {
                enabled: true,
                formatter: undefined,
                offsetY: 0,
                style: {
                    fontSize: '12px',
                    fontFamily: KTApp.getSettings()['font-family']
                }
            }
        },
        yaxis: {
            min: 0,
            max: 10000,
            labels: {
                show: false,
                style: {
                    colors: KTApp.getSettings()['colors']['gray']['gray-500'],
                    fontSize: '12px',
                    fontFamily: KTApp.getSettings()['font-family']
                }
            }
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0
                }
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0
                }
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none',
                    value: 0
                }
            }
        },
        tooltip: {
            style: {
                fontSize: '12px',
                fontFamily: KTApp.getSettings()['font-family']
            },
            y: {
                formatter: function (val) {
                    return "$" + val + " thousands"
                }
            }
        },
        colors: [KTApp.getSettings()['colors']['theme']['light'][color]],
        markers: {
            colors: [KTApp.getSettings()['colors']['theme']['light'][color]],
            strokeColor: [KTApp.getSettings()['colors']['theme']['base'][color]],
            strokeWidth: 3
        },
        padding: {
            top: 0,
            bottom: 0
        }
    };

    var chart = new ApexCharts(element, options);
    chart.render();


}

function save_changes() {
    sync_wallet_entries();
    var results = table_databale.data();
    for (var i = 0; i < wallet_entries.length; i++) {
        var entry_id = wallet_entries[i];
        var data = get_selected_month_data(results, entry_id);
        setoptdata(wallet_Ref_entries, entry_id, data).then(function () {
            updateoptdata(wallet_Ref, wallet_id, { 'entries': wallet_entries }).then(function () {
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    $('#save_changes_unit').collapse('hide');
    unsaved_flag = false;
    selected_items = [];
    refresh_table_buttons();
}

function external_table_btn(x) {
    switch (x) {
        case 'pdf':
            table_databale.button('2').trigger();
            break;
        case 'copy':
            table_databale.button('0').trigger();
            break;
        case 'excel':
            table_databale.button('1').trigger();
            break;
        default:
        // code block
    }
}

$('#search_id').keyup(function () {
    table_databale.search($(this).val()).draw();
})

var enable_months = false;
function monthview() {
    if (enable_months) {
        document.getElementById('id_month_text').innerText = "Enable Month View";
        enable_months = false;
        start_app.refresh();
    } else {
        document.getElementById('id_month_text').innerText = "Disable Month View";
        enable_months = true;
        start_app.refresh();
    }
};

function selected_repeat() {
    var selected_repeated = document.getElementById('repeat_selection').value;
    var text = "";
    switch (selected_repeated) {
        case 'Monthly':
            document.getElementById('recommended').style.display = "block";
            document.getElementById('example-number-input2').disabled = false;
            text = 'Months';
            break;
        case 'Weekly':
            document.getElementById('recommended').style.display = "block";
            document.getElementById('example-number-input2').disabled = false;
            text = 'Weeks';
            break;
        case 'Daily':
            document.getElementById('recommended').style.display = "block";
            document.getElementById('example-number-input2').disabled = false;
            text = 'Days';
            break;
        case 'Once':
            document.getElementById('recommended').style.display = "none";
            document.getElementById('example-number-input2').disabled = true;
            document.getElementById('example-number-input2').value = 1;
            text = 'Time';
            break;
        default:
            document.getElementById('recommended').style.display = "block";
            document.getElementById('example-number-input2').disabled = false;
            text = 'Time';
    }
    document.getElementById('selected_repeated').innerText = text;
}

function selected_category() {
    var category = document.getElementById('edit_cat_selec').value;
    document.getElementById('sel_icon_add').innerHTML = '<svg><use xlink:href="#' + get_cat_ic(category) + '"></use></svg>';
}


function cat2combo(wallet_id) {
    document.getElementById("edit_cat_selec").innerHTML = "";
    var wallet_base_Ref = db.collection("wallets");
    var select = document.getElementById('edit_cat_selec');
    getoptdata(wallet_base_Ref, wallet_id).then((function (doc) {
        cat_icon_list = doc.categories;
        cat_icon_list.sort(sortOn("name"));
        for (let i = 0; i < cat_icon_list.length; i++) {
            newar[cat_icon_list[i]['name']] = cat_icon_list[i];
            var opt = document.createElement('option');
            opt.value = cat_icon_list[i]['name'];
            opt.innerHTML = cat_icon_list[i]['name'];
            select.appendChild(opt);
        }
    })).catch((error) => { console.error(error); });
}