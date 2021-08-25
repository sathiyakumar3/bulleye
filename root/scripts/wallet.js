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

var monthly_income = 0;
var monthly_expense = 0;
var weekly_income = 0;
var weekly_expense =0;
var daily_income = 0;
var daily_expense =0;
var sum_income_2 = 0;
var sum_expense_2 = 0;

var start_app = function () {
    var run_wallet = function () {
        var data = date_filter(local_data, selected_end, selected_start);
        document.getElementById("welcome_message_2").innerHTML  = selected_start.format('MMM D') + ' - ' + selected_end.format('MMM D');
        document.getElementById("second_mes").innerText = new Date(selected_start).getFullYear();
    
        document.getElementById("month_ini").innerText = monthNames[new Date(selected_start).getMonth()];
        var user_profile = user_process(data);
        var user_sum = Object.keys(user_profile).length;
        var counter = Object.keys(data).length;
        var sum_income = data_process(data, { 'Payment': 'Paid', 'Type': 'Income' });
        var sum_expense = data_process(data, { 'Payment': 'Paid', 'Type': 'Expense' });
      //  var sum_income2 = data_process(data, { 'Payment': 'Not Paid', 'Type': 'Income' });//
      //  var sum_expense2 = data_process(data, { 'Payment': 'Not Paid', 'Type': 'Expense' });//        
/*         var monthly_income = data_process(data,  { 'Repeated': 'Monthly', 'Type': 'Income', 'Payment': 'Paid', });
        var monthly_expense = data_process(data, { 'Repeated': 'Monthly', 'Type': 'Expense', 'Payment': 'Paid', });
        var weekly_income = data_process(data,  { 'Repeated': 'Weekly', 'Type': 'Income', 'Payment': 'Paid', });
        var weekly_expense = data_process(data, { 'Repeated': 'Weekly', 'Type': 'Expense', 'Payment': 'Paid', });
        var daily_income = data_process(data,  { 'Repeated': 'Daily', 'Type': 'Income', 'Payment': 'Paid', });
        var daily_expense = data_process(data, { 'Repeated': 'Daily', 'Type': 'Expense', 'Payment': 'Paid', });*/ 

        monthly_income = data_process(data,  { 'Repeated': 'Monthly', 'Type': 'Income' });
        monthly_expense = data_process(data, { 'Repeated': 'Monthly', 'Type': 'Expense' });
        weekly_income = data_process(data,  { 'Repeated': 'Weekly', 'Type': 'Income' });
        weekly_expense = data_process(data, { 'Repeated': 'Weekly', 'Type': 'Expense' });
        daily_income = data_process(data,  { 'Repeated': 'Daily', 'Type': 'Income' });
        daily_expense = data_process(data, { 'Repeated': 'Daily', 'Type': 'Expense' });
        sum_income_2 = data_process(data, { 'Type': 'Income' });
        sum_expense_2 = data_process(data, { 'Type': 'Expense' });
        document.getElementById("number_items_2").innerText = counter + " Entries";
        var currency = '<span class="text-dark-50 font-weight-bold" id>' + wallet_symbol + ' ' + ' </span>';
        document.getElementById("sum_earnings").innerHTML = currency + numberWithCommas(sum_income);
        document.getElementById("sum_expenses").innerHTML = currency + numberWithCommas(sum_expense);
        if ((sum_income - sum_expense) < 0) {
            document.getElementById("sum_net").classList.remove("text-success"); 
             document.getElementById("sum_net").classList.add("text-danger");
             document.getElementById("month_indi2").classList.remove("bg-success");
             document.getElementById("month_indi2").classList.add("bg-danger");
        
             } else {
                document.getElementById("sum_net").classList.remove("text-danger");
                  document.getElementById("sum_net").classList.add("text-success"); 
                  document.getElementById("month_indi2").classList.remove("bg-danger");
                  document.getElementById("month_indi2").classList.add("bg-success");
                 
                }
        if (user_sum > 1) { document.getElementById("user_list_2").innerText = user_sum + " Users"; } else { document.getElementById("user_list_2").innerText = user_sum + " User"; }
        document.getElementById("sum_net").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
        document.getElementById("image_list_3").innerHTML = user_circle_gen(user_profile);
        table_data = check_RecordID(data);
  /*       console.log("Monthly I : "+monthly_income);
        console.log("Monthly E : "+monthly_expense);
        console.log("Weekly I : "+weekly_income);
        console.log("Weekly E : "+weekly_expense);
        console.log("Daily I : "+daily_income);
        console.log("Daily E: "+daily_expense);
        console.log("Once I : "+sum_income_2);
        console.log("Once E : "+sum_expense_2); */
        initTable2();
    }
    var read_data = function () {  
        get_wallet_data(wallet_id, wallet_entries).then(function (result) {
            local_data = result;       
            var outcome = date_process(result);
          //  selected_start = outcome[0];
          //  selected_end = outcome[1];
            var today = new Date();
            selected_start = new Date(today.getFullYear(), today.getMonth(), 1);
            selected_end = new Date(today.getFullYear(), today.getMonth() + 1, 0);     
            document.getElementById("month_liset").innerHTML =  create_month_list(outcome[2]);
            selected_start = moment(selected_start);
            selected_end = moment(selected_end);
            run_wallet();
        }).catch((error) => { console.log(error); });
    };

    var initTable2 = function () {
     

        KTApp.unblock('#kt_blockui_content');   
        var colums_select = [15, 9, 10, 11, 5, 13, 14, 12];
        var options = {
  /*           responsive: true,
            destroy: true,
            processing: true, */
        
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
                { data: "RecordID", "width": "5%" },
                { data: "Timestamp", "width": "5%" },
                { data: "doc_id", "width": "10%"},
                { data: "Payment" , "width": "17%"},
                { data: "Type", "width": "15%" },
                { data: "Recurring", "width": "10%" },
                { data: "Category", "width": "10%" },
                { data: "Category" , "width": "10%"},
                { data: "Category" , "width": "10%"},
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
                    visible: true,
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var selet1 = 0;
                        var selet2 = 0;
                        var text = full.Repeated;
                        var html_div = '';

/*                         console.log("Monthly I : "+monthly_income);
                        console.log("Monthly E : "+monthly_expense);
                        console.log("Weekly I : "+weekly_income);
                        console.log("Weekly E : "+weekly_expense);
                        console.log("Daily I : "+daily_income);
                        console.log("Daily E: "+daily_expense);
                        console.log("Once I : "+sum_income_2);
                        console.log("Once E : "+sum_expense_2); */
                        switch (full.Repeated) {
                            case 'Monthly':                            
                                selet1 = monthly_income;
                                selet2 = monthly_expense;
                                break;
                            case 'Weekly':
                                selet1 = weekly_income;
                                selet2 = weekly_expense;
                                break;
                            case 'Daily':
                                selet1 = daily_income;
                                selet2 = daily_expense;                             
                                break;
                            case 'Once':
                                selet1 = sum_income_2;
                                selet2 = sum_expense_2;
                                text = 'Total';
                                break;
                            default:
                        }
                     

                        switch (full.Type) {
                            case 'Expense':
                                html_div = percentage_form_custom(full.Amount, selet2, ' Rs',' of '+text,full.Type);
                            //    console.log("[EXPENSE] Value : "+full.Amount + " Total : "+selet2);
                              //  selet1 = sum_expense;
                             //   selet2 = sum_expense2;
                                break;
                            case 'Income':
                                html_div = percentage_form_custom(full.Amount, selet1, ' Rs',' of '+text,full.Type);
                         //       console.log("[INCOME] Value : "+full.Amount + " Total : "+selet1);
                             //   selet1 = sum_income;
                             //   selet2 = sum_income2;
                                break;
                            default:
                        }
                        // switch (full.Payment) {
                        //     case 'Not Paid':
                        //         html_div = percentage_form(full.Amount, selet2, ' Rs');
                        //         break;
                        //     case 'Paid':
                        //         html_div = percentage_form(full.Amount, selet1, ' Rs');
                        //         break;
                        //     default:
                        // }
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
                    className: "dt-center",
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return payment_status_fomt(full.Type, full.Payment, full.Amount, 'Income', wallet_symbol);
                    },
                },
                {
                    targets: 7,
                    title: 'Expense',
                    className: "dt-center",
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return payment_status_fomt(full.Type, full.Payment, full.Amount, 'Expense', wallet_symbol);
                    },
                },
                {
                    targets: 8,
                    title: 'Actions',
                    className: "dt-center",
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

/*         if (table_databale != "") {
            console.log("table destroedy");
            table_databale.off('change', '.group-checkable');
            table_databale.off('change', '.checkable');
            table_databale.destroy();
            selected_items = [];
            refresh_table_buttons();
        } */
        if (table_databale == "") {
            table_databale = $('#kt_datatable_22').DataTable(options);
        }else{
            table_databale.off('change', '.group-checkable');
            table_databale.off('change', '.checkable');
          //  table_databale.destroy();
            selected_items = [];
            refresh_table_buttons();
        }
        
      //  $('#my_table').DataTable().clear().rows.add(data).draw()
      table_databale.clear().rows.add(table_data).draw();
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
            on_month_call();
            start_app.refresh();
        },
        refresh_data: function(){
run_wallet();
        }
    };
}();
jQuery(document).ready(function () {
   // document.getElementById("kt_dashboard_daterangepicker_date").style.display = "none"; 
    wallet_id = global_data[0];
    user_id = global_data[2];
   // document.getElementById("welcome_message_2").innerText =  greetings() + global_data[1];  
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
            for (let i = 0; i < rows.data().length; i++) {
                local_data = arrayRemove(local_data, rows.data()[i]);
              }     
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
    document.getElementById('title_313').innerText = "Add to Wallet";
    document.getElementById('record_id').value = '';
    document.getElementById('add_edit_button').innerText = 'Add';
    $('select[name=form_catergory_2]').val('default');
    $('select[name=form_catergory_2]').selectpicker("refresh");

}
var bulk_table ="";
function add_bulk_entry_modal() {
    $('#edit_incex_form_modal_bulk').modal('toggle');
/*     var dataSet = [
        [ "8/23/2021  12:24:52 AM", "Monthly", "Car", "Leasing", "Expense", "43243" ],
        [ "8/22/2021  7:36:52 PM", "Once", "Car", "Loan", "Income", "43243" ],
        [ "8/22/2021  2:48:52 PM", "Monthly", "Productivity", "Broadband", "Expense", "432432" ],
        [ "8/22/2021  10:00:52 AM", "Once", "Family", "Sathees 4rd Instal", "Income", "543435" ],
        [ "8/22/2021  5:12:52 AM", "Once", "Productivity", "Cupboard 1st ", "Income", "6543" ]
    ];
    console.table(dataSet); */

}


    function uploadDealcsv () {}; 

  /*------ Method for read uploded csv file ------*/
  uploadDealcsv.prototype.getCsv = function(e) {
       
      let input = document.getElementById('dealCsv');
      input.addEventListener('change', function() {

        if (this.files && this.files[0]) {

            var myFile = this.files[0];
            var reader = new FileReader();
            
            reader.addEventListener('load', function (e) {
                
                let csvdata = e.target.result; 
                parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data 
            });
            
            reader.readAsBinaryString(myFile);
        }
      });
    }

    /*------- Method for parse csv data and display --------------*/
    uploadDealcsv.prototype.getParsecsvdata = function(data) {

        let parsedata = [];

        let newLinebrk = data.split("\n");
        for(let i = 0; i < newLinebrk.length; i++) {
console.log(newLinebrk[i]);
if(newLinebrk[i]!=null &&newLinebrk[i]!=undefined &&newLinebrk[i]!=''){
    parsedata.push(newLinebrk[i].split(","))
}
            //parsedata.push(newLinebrk[i].split(","))
        }
var dsa = "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
"<'row'<'col-sm-12'tr>>" +
"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
var options = {       
    data: parsedata,
/*             columns: [
        { title: "Date" },
        { title: "Recurring" },
        { title: "Category" },
        { title: "Description" },
        { title: "Type" },
        { title: "Payment" },
        { title: "Amount" }
    ], */
    dom: dsa,
    /* '<"top"lf>rt<"bottom"ip><"clear">', */
    columnDefs: [
        {
            targets: 0,
            orderable: false,
            render: function (data, type, full, meta) {
                return data;
            },
        },
        {
            targets: 1,
            title: 'User',
            orderable: false,
            render: function (data, type, full, meta) {
                return data.trim();

            },
        },
        {
            targets: 2,
            title: 'Date & Time',
            orderable: false,
            render: function (data, type, full, meta) {
                return data.trim();
            },
        },
        {
            targets: 3,
            title: 'Item',
            orderable: false,
            render: function (data, type, full, meta) {
                return data.trim();
            },
        },               
        {
            targets: 4,
            title: 'Recurring',
            className: "dt-center",
            orderable: false,
            render: function (data, type, full, meta) {
                return data;
            },
        },
                       
        {
            targets: 5,
            title: 'Payment',
            className: "dt-center",
            orderable: false,
            render: function (data, type, full, meta) {
                return data;
            },
        },
        {
            targets: 6,
            title: 'Amount',
            className: "dt-center",
            orderable: false,
            render: function (data, type, full, meta) {
                
                return data.match(/\d+/)[0] 
            },
        }
    ],
    
}
try {

      if (bulk_table == "") {
    
          bulk_table = $('#bulk_table').DataTable(options);                   
          document.getElementById("instru").style.display = "none";
      }else{
        bulk_table.clear().draw();
        bulk_table.rows.add(parsedata);
        bulk_table.columns.adjust().draw();
        document.getElementById("instru").style.display = "none";
      }

     
    }catch(err) {
        Swal.fire({
            icon: 'error',
            text :err.message,
            title: 'Ops',      
            footer: 'Please use the right sequence, seperated by commas.'
            
          }) 
          document.getElementById("instru").style.display = "block";         
          $('#bulk_table').DataTable().clear().destroy();
          bulk_table = "";
      }
    }

    var parseCsv = new uploadDealcsv();
    parseCsv.getCsv();
  


function save_bulk(){
    var new_cat =[];
var bulk_table_data = bulk_table.data();
var count = 5;

get_fulldata();
var main_data = table_databale.data();

add_to_local_table(user_id)
.then(function (result) {              
    for (var i = 0; i < count; i++) {
        var row_data =bulk_table_data[i];
      
        var timestamp =  new Date(row_data[0]);
        var category_r = row_data[2];
        var data = {
            Timestamp: timestamp,
            user: user_id,
            Description: row_data[3],
            Category: category_r,
            Type: row_data[4],
            Payment: row_data[5],
            RecordID: 1,
            Repeated: row_data[1],
            doc_id: monthts(timestamp),
            Amount: row_data[6]
        } 
        
      
         if (!newar.hasOwnProperty(category_r)&& !new_cat.includes(category_r))
         {   new_cat.push(category_r);
            var tst=  Date.now();
            var new_cat_list = {
                name: category_r,
                icon: "adminiate_sec_icon",
                created_by: user_id,
                created_on: tst
            }
          //  cat_icon_list = Object.assign(cat_icon_list, new_cat_list)
          cat_icon_list.push(new_cat_list);         
           // cat_table.push(new_cat_list);  
         /*   console.log(cat_icon_list);
            uptoptarray(wallet_Ref, wallet_id, 'categories', cat_icon_list).then(function() {
              

              
            }).catch((error) => {
                console.log(error);
            }); */
        } 

        main_data.push(Object.assign(data, result)); 
        local_data.push(Object.assign(data, result));    
        if(i==count-1){          


   
      $('#edit_incex_form_modal_bulk').modal('toggle');
      table_databale.clear().draw();                      
      table_databale.rows.add(main_data);
    table_databale.columns.adjust().draw(); 
    on_month_call(timestamp);
     save_updates();
   
  //   console.log(JSON.parse(local_docs[wallet_id]));

    
 /*     build_new_icons(new_cat).then(function(finalResult) { */
    if(new_cat.length!=0){
        updateoptdata(wallet_Ref, wallet_id, { 'categories': cat_icon_list }).then(function () {
            
                Swal.fire({
                    icon: 'success',
                    html :new_cat,
                    title: 'Below Categories were added',      
                    footer: 'You can change the icons at the settings menu.'
                    
                  })
                
           /*  }).catch((error) => {
                console.log(error);
            });  */
           
        }).catch((error) => {
            console.log(error);
        }); 
    }

     }   
    }    
})
.catch((error) => {
    console.log(error);
});   
}

function build_new_icons(obj) {
    console.log(obj);
        var promises = [];
        obj.forEach(element => {
           
                const user_details_prom = new Promise((resolve, reject) => {
                    var cat_name = obj[i]['name'];
var myvar = cat_name;
    resolve(myvar);
 });
                promises.push(user_details_prom);
           
       
        });
    
        return Promise.all(promises).then((values) => {
    
            return values;
        });
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
  
$('select[name=form_catergory_2]').val(category);

$('select[name=form_catergory_2]').selectpicker('refresh');


    document.getElementById('record_id').value = RecordID;
    $('#edit_incex_form_modal').modal('toggle');
    document.getElementById('example-number-input2').value = 1;



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
    document.getElementById('title_313').innerText = "Edit Entry";
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

function save_changes() {
    get_fulldata();

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
    var outcome = date_process(local_data);       
    document.getElementById("month_liset").innerHTML =  create_month_list(outcome[2]);
    on_month_call();
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
       // console.log(cat_icon_list);
        cat_icon_list.sort(sortOn("name"));
        for (let i = 0; i < cat_icon_list.length; i++) {
            newar[cat_icon_list[i]['name']] = cat_icon_list[i];
            var opt = document.createElement('option');
            opt.value = cat_icon_list[i]['name'];
            opt.innerHTML = cat_icon_list[i]['name'];
            select.appendChild(opt);
            if(i==(cat_icon_list.length-1)){
                $('select[name=form_catergory_2]').selectpicker('refresh');
            }

        }

    })).catch((error) => { console.error(error); });
   
}

/* $(window).scroll(function() {
    if ($(this).scrollTop() > 50 ) {
        console.log("now");
        document.getElementById('add_transa').style.display = "block";
 
        
    } else {
        document.getElementById('add_transa').style.display = "none";
        console.log("later");
    }
}); */
   // Returns [32, 33, 40]

function checkAdult(date) {
  return date >=  new Date();
}
var month_buttons = [];
function create_month_list(outcome){
    outcome =outcome.sort(function(a,b){return a.getTime() - b.getTime()});
    var before =outcome.filter(function(a){return  a <  new Date()});
    var after = outcome.filter(function(a){return  a >=  new Date()});

    var l_list = '';
    var r_list ='';
    var text = '';
    var side_text = ''
var left_list ='';
var right_list ='';
var limit = 1;

    var today = new Date();
    var monthts_tod = monthts(today);
    month_buttons.push(monthts_tod);
  var base =  '<button type="button" id="'+monthts_tod+'_but"onclick="on_month_call(\''+today+'\')" class="btn btn-outline-secondary btn-dark"><b>'+monthts_tod+'</b></button> ';

  before.slice().reverse().forEach(element => {     
        var monthts_ele = monthts(element);
        if (monthts_ele!=monthts_tod){           
            text ='<button type="button" id="'+monthts_ele+'_but" onclick="on_month_call(\''+element+'\')" class="btn btn-outline-secondary">'+monthts_ele+'</button> ';
            side_text = '<a class="dropdown-item btn"  id="'+monthts_ele+'_but"  onclick="on_month_call(\''+element+'\')" >'+monthts_ele+'</a>';
            month_buttons.push(monthts_ele);                      
                if(limit>5){
                    left_list = left_list + side_text;
                }else{
                    l_list =  text+l_list;
                }
                limit++;    
        }
       });

       after.forEach(element => {     
        var monthts_ele = monthts(element);
        if (monthts_ele!=monthts_tod){           
            text ='<button type="button" id="'+monthts_ele+'_but" onclick="on_month_call(\''+element+'\')" class="btn btn-outline-secondary">'+monthts_ele+'</button> ';
            side_text = '<a class="dropdown-item btn"  id="'+monthts_ele+'_but"  onclick="on_month_call(\''+element+'\')" >'+monthts_ele+'</a>';
            month_buttons.push(monthts_ele);
                if(limit>5){
                    right_list = right_list + side_text;
                }else{
                    r_list =  r_list + text;
                }
                limit++;            
        }
       });
       return add_downdown(left_list)+ l_list+ base +r_list+ add_downdown(right_list);
} 

function add_downdown(list){
    if(list!=''){
        return '<div class="btn-group" role="group">'+
        '<button id="btnGroupVerticalDrop1" type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</button>'+
        '<div class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop1">'+
        list+'</div></div>';
               }else{
                   return '';
               }
}
var last_call = new Date();

function on_month_call(date){
    
    if(date==''||date==undefined){
        date= last_call;
    }
  var  monthts_ele = monthts(new Date(date));
 month_buttons.forEach(element => {
if(monthts_ele!=element){
    if(document.getElementById(element+'_but')){
    document.getElementById(element+'_but').classList.remove("btn-dark");
    }
}   
 });
 if(document.getElementById(monthts_ele+'_but')){
    document.getElementById(monthts_ele+'_but').classList.add("btn-dark"); 
    last_call = new Date(date); 
  }else{
    last_call = new Date();    
    document.getElementById(monthts(last_call)+'_but').classList.add("btn-dark"); 
  }    
selected_start = new Date(last_call.getFullYear(), last_call.getMonth(), 1);
selected_end = new Date(last_call.getFullYear(), last_call.getMonth() + 1, 0);
selected_start = moment(selected_start);
selected_end = moment(selected_end);
start_app.refresh_data();
}

function get_fulldata(){
selected_start = new Date('1/1/1900').getTime();
selected_end = new Date('1/1/2100').getTime();
selected_start = moment(selected_start);
selected_end = moment(selected_end);
start_app.refresh_data();
}