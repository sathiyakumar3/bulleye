"use strict";
var user_id;
var user_photo;
var user_name;
var wallet_Ref = '';
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

var wallet_entries = '';

var flag_expand = true;

function expand_shrink() {


    var myvar2 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '                                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '                                                            <polygon points="0 0 24 0 24 24 0 24"/>' +
        '                                                            <path d="M8.2928955,3.20710089 C7.90237121,2.8165766 7.90237121,2.18341162 8.2928955,1.79288733 C8.6834198,1.40236304 9.31658478,1.40236304 9.70710907,1.79288733 L15.7071091,7.79288733 C16.085688,8.17146626 16.0989336,8.7810527 15.7371564,9.17571874 L10.2371564,15.1757187 C9.86396402,15.5828377 9.23139665,15.6103407 8.82427766,15.2371482 C8.41715867,14.8639558 8.38965574,14.2313885 8.76284815,13.8242695 L13.6158645,8.53006986 L8.2928955,3.20710089 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 8.499997) scale(-1, -1) rotate(-90.000000) translate(-12.000003, -8.499997) "/>' +
        '                                                            <path d="M6.70710678,19.2071045 C6.31658249,19.5976288 5.68341751,19.5976288 5.29289322,19.2071045 C4.90236893,18.8165802 4.90236893,18.1834152 5.29289322,17.7928909 L11.2928932,11.7928909 C11.6714722,11.414312 12.2810586,11.4010664 12.6757246,11.7628436 L18.6757246,17.2628436 C19.0828436,17.636036 19.1103465,18.2686034 18.7371541,18.6757223 C18.3639617,19.0828413 17.7313944,19.1103443 17.3242754,18.7371519 L12.0300757,13.8841355 L6.70710678,19.2071045 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" transform="translate(12.000003, 15.499997) scale(-1, -1) rotate(-360.000000) translate(-12.000003, -15.499997) "/>' +
        '                                                        </g>' +
        '                                                    </svg>';


    var myvar3 = '<!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-02-01-052524/theme/html/demo1/dist/../src/media/svg/icons/Navigation/Angle-double-up.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '        <polygon points="0 0 24 0 24 24 0 24"/>' +
        '        <path d="M8.2928955,10.2071068 C7.90237121,9.81658249 7.90237121,9.18341751 8.2928955,8.79289322 C8.6834198,8.40236893 9.31658478,8.40236893 9.70710907,8.79289322 L15.7071091,14.7928932 C16.085688,15.1714722 16.0989336,15.7810586 15.7371564,16.1757246 L10.2371564,22.1757246 C9.86396402,22.5828436 9.23139665,22.6103465 8.82427766,22.2371541 C8.41715867,21.8639617 8.38965574,21.2313944 8.76284815,20.8242754 L13.6158645,15.5300757 L8.2928955,10.2071068 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 15.500003) scale(-1, 1) rotate(-90.000000) translate(-12.000003, -15.500003) "/>' +
        '        <path d="M6.70710678,12.2071104 C6.31658249,12.5976347 5.68341751,12.5976347 5.29289322,12.2071104 C4.90236893,11.8165861 4.90236893,11.1834211 5.29289322,10.7928968 L11.2928932,4.79289682 C11.6714722,4.41431789 12.2810586,4.40107226 12.6757246,4.76284946 L18.6757246,10.2628495 C19.0828436,10.6360419 19.1103465,11.2686092 18.7371541,11.6757282 C18.3639617,12.0828472 17.7313944,12.1103502 17.3242754,11.7371577 L12.0300757,6.88414142 L6.70710678,12.2071104 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" transform="translate(12.000003, 8.500003) scale(-1, 1) rotate(-360.000000) translate(-12.000003, -8.500003) "/>' +
        '    </g>' +
        '</svg><!--end::Svg Icon-->';
    if (flag_expand) {
        document.getElementById("expandicon").innerHTML = myvar3;
    //    $('#trans_1').collapse("show");
        $('#trans_2').collapse("show");
        $('#trans_3').collapse("show");
        $('#trans_4').collapse("show");
        $('#trans_5').collapse("show");

        flag_expand = false;
    } else {
        document.getElementById("expandicon").innerHTML = myvar2;
      //  $('#trans_1').collapse("hide");
        $('#trans_2').collapse("hide");
        $('#trans_3').collapse("hide");
        $('#trans_4').collapse("hide");
        $('#trans_5').collapse("hide");
        flag_expand = true;
    }



}


var start_app = function() {
    var run_dashboard = function() {
        var data = date_filter(local_data, selected_end, selected_start);

        // var user_profile = user_process(data);
        // var user_sum = Object.keys(user_profile).length;


        //     var currency = '<span class="text-dark-50 font-weight-bold" id>'
        //     wallet_symbol + ' </span>';
        //      document.getElementById("sum_earnings_m").innerHTML = currency + numberWithCommas(sum_income);
        //   document.getElementById("sum_expenses_m").innerHTML = currency + numberWithCommas(sum_expense);


        // document.getElementById("sum_net_m").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
        //  document.getElementById("number_items").innerText = Object.keys(data).length + " Entries";


        /*         document.getElementById("image_list").innerHTML = user_circle_gen(user_profile);
                if (user_sum > 1) { document.getElementById("user_list_md").innerText = user_sum + " Users"; } else { document.getElementById("user_list_md").innerText = user_sum + " User"; } */


        var current_income = data_process(data, { 'Payment': 'Paid', 'Type': 'Income' });
        set_sum('current_income', wallet_symbol, current_income);
        var current_expense = data_process(data, { 'Payment': 'Paid', 'Type': 'Expense' });
        set_sum('current_expense', wallet_symbol, current_expense);
        var current_net = current_income - current_expense;
        if ((current_income - current_expense) < 0) {
            document.getElementById("net_percent_title").innerText = "Have Spent Excess! "
            document.getElementById("sum_net_m").classList.remove("text-success");
            document.getElementById("sum_net_m").classList.add("text-danger");
            document.getElementById("net_percent_bar").classList.remove("bg-success");
            document.getElementById("net_percent_bar").classList.add("bg-warning");

        } else {
            document.getElementById("sum_net_m").classList.remove("text-danger");
            document.getElementById("sum_net_m").classList.add("text-success");
            document.getElementById("net_percent_bar").classList.remove("bg-warning");
            document.getElementById("net_percent_bar").classList.add("bg-success");
            document.getElementById("net_percent_title").innerText = "Saved!";

        }
        var net_perc = Math.round((Math.abs(current_net) / current_income) * 100);
        document.getElementById("net_percent").innerHTML = net_perc + " %";
        document.getElementById("net_percent_bar").style.width = net_perc + "%";


        document.getElementById("current_net2").innerText = current_net;
        document.getElementById("widget_cb").innerText = wallet_symbol + ' ' + numberWithCommas(current_net);
        set_sum('current_net', wallet_symbol, current_net);
        document.getElementById("cur_progress").innerHTML = percentage_form(current_net, current_income, wallet_symbol,true);
        document.getElementById("cur_pl").innerHTML = profit_loss_format(current_net);
////////////
        var rec_income = data_process(data, { 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Income', 'Payment': 'Paid', });
        set_sum('rec_income', wallet_symbol, rec_income);
        var rec_expense = data_process(data, { 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Expense', 'Payment': 'Paid', });
        set_sum('rec_expense', wallet_symbol, rec_expense);
        var rec_net = rec_income - rec_expense;
        document.getElementById("widget_rb").innerText = wallet_symbol + ' ' + numberWithCommas(rec_net);     
        set_sum('rec_net', wallet_symbol, rec_net);
        document.getElementById("rec_progress").innerHTML = percentage_form(rec_net, rec_income, wallet_symbol,true);
        document.getElementById("rec_pl").innerHTML = profit_loss_format(rec_net);
       
        var non_income = rec_net + data_process(data, { 'Repeated': ['Once'], 'Type': 'Income', 'Payment': 'Paid', });
//var non_income = current_income - rec_income;

        set_sum('non_income', wallet_symbol, non_income);
      var non_expense = data_process(data, { 'Repeated': ['Once'], 'Type': 'Expense', 'Payment': 'Paid', });
    // var non_expense = current_expense - rec_expense;
        set_sum('non_expense', wallet_symbol, non_expense);
        var non_net = non_income - non_expense;
        document.getElementById("widget_ob").innerText = wallet_symbol + ' ' + numberWithCommas(non_net);
    
        set_sum('non_net', wallet_symbol, non_net);
        document.getElementById("non_progress").innerHTML = percentage_form(non_net, non_income, wallet_symbol,true);
        document.getElementById("non_pl").innerHTML = profit_loss_format(non_net);
        ////////////

        var fin_income = data_process(data, { 'Type': 'Income' });  
        set_sum('fin_income', wallet_symbol, fin_income);
        var fin_expense = data_process(data, { 'Type': 'Expense' });
        set_sum('fin_expense', wallet_symbol, fin_expense);
        var fin_net = fin_income - fin_expense;  
        document.getElementById("final_balance").innerHTML = '<strong>'+wallet_symbol + ' ' + numberWithCommas(fin_net)+'</strong>';
        document.getElementById("widget_fb").innerText = wallet_symbol + ' ' + numberWithCommas(fin_net);
        set_sum('fin_net', wallet_symbol, fin_net);

        
if(fin_net==current_net){
    $('#trans_1').collapse("hide");
    $('#trans_5').collapse("show");
}else{
    $('#trans_1').collapse("show");
    $('#trans_5').collapse("hide");
}
        

   ////////////
        document.getElementById("total_progress").innerHTML = percentage_form(fin_net, fin_income, wallet_symbol,true);
        document.getElementById("fin_pl").innerHTML = profit_loss_format(fin_net);
    
        var data66 = data_for_pie(get_available_data(data, 'Category', { 'Type': 'Income' }));
        piechart_123(data66[0], data66[1], "kt_pie_chart_cat_i");
        var data77 = data_for_pie(get_available_data(data, 'Category', { 'Type': 'Expense' }));
        piechart_123(data77[0], data77[1], "kt_pie_chart_cat_e");
        KTApp.unblock('#kt_blockui_content');

    }
    var run_cat = function() {

        var cat = cat_process(local_data);
        var wallet_base_Ref = db.collection("wallets");
        var series1 = [];
        var series2 = [];
        getoptdata(wallet_base_Ref, wallet_id).then((function(doc) {
            var cat_icon_list = doc.categories;
            cat_icon_list.sort(sortOn("name"));
            for (let i = 0; i < cat_icon_list.length; i++) {
                newar[cat_icon_list[i]['name']] = cat_icon_list[i];

                const income_series_prom = new Promise((resolve, reject) => {
                    get_data(local_data, { 'Category': cat_icon_list[i]['name'], 'Type': 'Income' }, cat).then(function(result) {

                        resolve(result);
                    }).catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                });
                const expense_series_prom = new Promise((resolve, reject) => {
                    get_data(local_data, { 'Category': cat_icon_list[i]['name'], 'Type': 'Expense' }, cat).then(function(result) {

                        resolve(result);
                    }).catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                });

                Promise.all([income_series_prom, expense_series_prom]).then((values) => {
                
                    series1.push({ name: cat_icon_list[i]['name'], type: 'column', data: values[0] })
                    series2.push({ name: cat_icon_list[i]['name'], type: 'column', data: values[1] })
                }).catch((error) => {
                    console.log("Error getting documents: ", error);
                    reject(error);
                });

            }
        })).catch((error) => { console.error(error); });


  

       _init_main_chart_4(series1, cat, 'kt_main_chart_3', false);
      _init_main_chart_4(series2, cat, 'kt_main_chart_4', false);
   //    _init_main_chart_4(series1, cat, 'kt_main_chart_3', false);
   //   _init_main_chart_4(series2, cat, 'kt_main_chart_4', false);

       
    }

    var run_trends = function() {
        
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

     /*    const d_re_income_prom = new Promise((resolve, reject) => {
            get_data(local_data, { 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Income' }, cat).then(function(result) {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });

        const d_re_expense_prom = new Promise((resolve, reject) => {
            get_data(local_data, { 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Expense' }, cat).then(function(result) {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });

        const d_on_income_prom = new Promise((resolve, reject) => {
            get_data(local_data, { 'Repeated': ['Once'], 'Type': 'Income' }, cat).then(function(result) {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });

        const d_on_expense_prom = new Promise((resolve, reject) => {
            get_data(local_data, { 'Repeated': ['Once'], 'Type': 'Expense' }, cat).then(function(result) {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        }); */

        Promise.all([d_income_prom, d_expense_prom]).then((values) => {
            var d_income = values[0];
            var d_expense = values[1];
            var d_netincome = chart_subraction(d_income, d_expense);
        //    var d_re_income = values[2];
         //   var d_re_expense = values[3];
       //     var d_on_income = values[4];
       //     var d_on_expense = values[5];
       
           // _init_main_chart_4([{ name: 'Other', type: 'column', data: d_on_income }, { name: 'Recurring', type: 'column', data: d_re_income }], cat, 'kt_main_chart_cat_income', false);
         //  _init_main_chart_4([{ name: 'Other', type: 'column', data: d_on_expense }, { name: 'Recurring', type: 'column', data: d_re_expense }], cat, 'kt_main_chart_cat_expense', false);
      //      _init_main_chart(d_income, d_expense, cat);
            _initTilesWidget20(d_income, d_expense, extract_net_data(d_netincome), cat);
            _initDaterangepicker();
            run_cat();
        }).catch((error) => {
            console.log("Error getting documents: ", error);
            reject(error);
        });

    }
    var read_data = function(force_flag) {
 
        if(wallet_entries!=undefined){
            get_wallet_data(wallet_id,wallet_entries).then(function(result) {

                local_data = sort_obj(result, 'Timestamp');
                var entries_size = Object.keys(local_data).length;
    
                if (entries_size > 0) {
                    var outcome = date_process(result);
                    selected_start = outcome[0];
                    selected_end = outcome[1];
    
    
                    run_trends();
                } else {
                    KTApp.unblock('#kt_blockui_content');
    
    
                    var myvar = '<div class="col-lg-12"><div class="card card-custom p-6 mb-8 mb-lg-0"><div class="card-body"><div class="row"><div class="col-sm-7">  <img src="assets/media/logos/logo-4.png" class="max-h-70px" alt=""><h2 class="text-dark mb-4"><p></p><p></p>Welcome, It\'s fresh & empty!</h2><p class="text-dark-50 font-size-lg">You cant control, what you cant measure.  </p></div><div class="col-sm-5 d-flex align-items-center justify-content-sm-end"><a  class="btn font-weight-bolder text-uppercase font-size-lg btn-success py-3 px-6" onclick="go_to_wallet_entries()">Add your first Entry</a></div></div></div></div></div>';
                    KTApp.block_null('#kt_blockui_content', {
                        overlayColor: '#F3F6F9',
                        message: myvar,
                        opacity: 1,
                    });
                }
    
    
    
            }).catch((error) => { console.log(error); });
    
        }else{
            var myvar = '<div class="col-lg-12"><div class="card card-custom p-6 mb-8 mb-lg-0"><div class="card-body"><div class="row"><div class="col-sm-7">  <img src="assets/media/logos/logo-4.png" class="max-h-70px" alt=""><h2 class="text-dark mb-4"><p></p><p></p>Welcome, It\'s fresh & empty!</h2><p class="text-dark-50 font-size-lg">You cant control, what you cant measure.  </p></div><div class="col-sm-5 d-flex align-items-center justify-content-sm-end"><a  class="btn font-weight-bolder text-uppercase font-size-lg dance btn-success py-3 px-6" onclick="go_to_wallet_entries()">Add your first Entry</a></div></div></div></div></div>';
            KTApp.block_null('#kt_blockui_content', {
                overlayColor: '#F3F6F9',
                message: myvar,
                opacity: 1,
            });
        }

    
    };


    var _initDaterangepicker = function() {
        if ($('#kt_dashboard_daterangepicker').length == 0) { return; }
        selected_start = moment(selected_start);
        selected_end = moment(selected_end);
        var picker = $('#kt_dashboard_daterangepicker');
        document.getElementById("end_date").innerText = selected_start.format('MMM D , YYYY');
        document.getElementById("start_date").innerText = selected_end.format('MMM D , YYYY');


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
            run_dashboard();
        }
        picker.daterangepicker({ direction: KTUtil.isRTL(), startDate: selected_start, endDate: selected_end, opens: 'left', applyClass: 'btn-primary', cancelClass: 'btn-light-primary', ranges: { 'Today': [moment(), moment()], 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')], 'Last 7 Days': [moment().subtract(6, 'days'), moment()], 'Last 30 Days': [moment().subtract(29, 'days'), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')], 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')], 'All time': [selected_start, selected_end] } }, cb);
        cb(selected_start, selected_end, '');
    }
    var _initTilesWidget20 = function(data, data1, data2, cat) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = { series: [{name: 'Income', type: 'column',data: data },
             { name: 'Expense', type: 'column', data: data1 },
              { name: 'Net', type: 'line', data: data2 }],
               chart: { height: '350px', type: 'line', stacked: false }, 
               dataLabels: { enabled: false }, 
               stroke: { width: [1, 1, 4] },
               xaxis: { categories: cat, }, 
               yaxis: [{ 
                seriesName: 'Income',
                   axisTicks: { show: true, }, 
                   axisBorder: { show: true, color: primary }, 
                     labels: { style: { colors: primary, } , formatter: (value) => { return nFormatter(value, 0) } }, 
                     title: { text: wallet_currency, style: { color: primary, } }, 
              //  tooltip: { enabled: true }
             }, 
             { 
                 seriesName: 'Income',
                 show: false,
     /*             axisTicks: { show: true, }, 
                 axisBorder: { show: true, color: success },
                 labels: { style: { colors: success, },formatter: (value) => { return numberWithCommas(value) } },
                 title: { text: "Expense", style: { color: success,} }, */
                
                },

                 {
                seriesName: 'Net Revenue', 
                opposite: true,
                axisTicks: { show: true, }, axisBorder: { show: true, color: warning }, 
                labels: { style: { colors: warning, },   formatter: (value) => { return nFormatter(value, 0) }, },
                title: { text: "Net", style: { color: warning, } } }
                 
                 , ], 
                 tooltip: {

                 style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] },
                  y: { formatter: function(val) { return wallet_symbol + ' ' + numberWithCommas(val); } } }, legend: { horizontalAlign: 'left', offsetX: 40 } };
        generate_chart("kt_main_chart", options);
    }
    var piechart_123 = function(data_set, cat_set, html_div) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = { series: data_set, chart: { type: 'pie', height: 375,width: '100%' }, labels: cat_set, 
        responsive: [{ options: { legend: { position: 'bottom' } } }],
        colors: ["#FF4560", "#F9CE1D", "#13D8AA", "#546E7A", "#FA4443", "#662E9B", "#F46036", "#EA3546", "#5A2A27", "#2983FF","#775DD0", "#FF9800", "#A5978B", "#FD6A6A", "#69D2E7", "#C5D86D", "#E2C044", "#43BCCD", "#C4BBAF", "#00B1F2"]
         , tooltip: { style: { fontSize: '12px',
          fontFamily: KTApp.getSettings()['font-family'] }, y: { formatter: function(val) { 
              return wallet_symbol + ' ' + numberWithCommas(val); } } }, breakpoint: 480, 
              legend: { show: true, position: 'bottom', horizontalAlign: 'center',       onItemClick: {
          toggleDataSeries: true
      },
      onItemHover: {
          highlightDataSeries: true
      },} };
        generate_chart(html_div, options);
    }

    var _init_main_chart_4 = function(series, cat, html_div, colours_flag) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = {
            series: series,
            stroke: { show: true, curve: 'smooth', lineCap: 'butt', width: 0.1, dashArray: 0, },
            chart: { height: 350, stacked: true, toolbar: { show: false }, zoom: { enabled: true } },
            legend: {
                show: true,
                position: 'bottom', 
                showForNullSeries: false,
                showForZeroSeries: false,
                offsetX: -10, offsetY: 0 
              },
            responsive: [{
                 breakpoint: 480,
               }],
            plotOptions: { bar: { borderRadius: 8, horizontal: false, }, },
            xaxis: { categories: cat }, 
            yaxis: { 
                labels: { 
                    style: { colors: KTApp.getSettings()['colors']['gray']['gray-500'],
                     fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] }
                     , formatter: (value) => { return nFormatter(value, 0) }
                    
                    } 
                    
                    },
            dataLabels: {
                enabled: false,
                offsetY: -20,
                style: { fontSize: '12px', colors: ["#304758"] },
                formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                    if (seriesIndex === ((w.config.series.length) - parseInt(1)))
                        return wallet_symbol + ' ' + numberWithCommas(w.globals.stackedSeriesTotals[dataPointIndex]);
                    return "";
                },
            },
            tooltip: {     
        
                style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] },
                y: { formatter: function(val) { 
                    if(val!=0){
                        return wallet_symbol + ' ' + numberWithCommas(val); }}
                     }
            },
            fill: { opacity: 1 },
            colors: ["#FF4560", "#F9CE1D", "#13D8AA", "#546E7A", "#FA4443", "#662E9B", "#F46036", "#EA3546", "#5A2A27", "#2983FF","#775DD0", "#FF9800", "#A5978B", "#FD6A6A", "#69D2E7", "#C5D86D", "#E2C044", "#43BCCD", "#C4BBAF", "#00B1F2"]
         //   colors: ["#775DD0", "#FF9800", "#A5978B", "#FD6A6A", "#69D2E7", "#C5D86D", "#E2C044", "#43BCCD", "#C4BBAF", "#00B1F2"]
        };
/* 
         if (colours_flag) {
            options['colors'] = [success, primary, warning, info];
        }  */
        generate_chart(html_div, options)
    }
/*     var _init_main_chart = function(data1, data2, cat) {
        console.log(data1);
        console.log(data2);
        var options = {
            series: [{ name: 'Income', data: data1 }, { name: 'Expense', data: data2 }],
            chart: { type: 'area', height: 350, toolbar: { show: false } },
            plotOptions: {},
            legend: { show: false },
            dataLabels: { enabled: false },
            fill: { type: 'solid', opacity: 1 },
            stroke: { curve: 'smooth' },
            xaxis: { categories: cat, axisBorder: { show: false, }, axisTicks: { show: false }, labels: { style: { colors: KTApp.getSettings()['colors']['gray']['gray-500'], fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] } }, crosshairs: { position: 'front', stroke: { color: KTApp.getSettings()['colors']['theme']['light']['success'], width: 1, dashArray: 3 } }, tooltip: { enabled: true, formatter: undefined, offsetY: 0, style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] } } },
            yaxis: { 
                labels: { 
                    style: { colors: KTApp.getSettings()['colors']['gray']['gray-500'],
                     fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] }
                     , formatter: (value) => { return nFormatter(value, 0) }
                    
                    } 
                    
                    },
            states: { normal: { filter: { type: 'none', value: 0 } }, hover: { filter: { type: 'none', value: 0 } }, active: { allowMultipleDataPointsSelection: false, filter: { type: 'none', value: 0 } } },
            tooltip: {
                style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] },
                y: {
                    formatter: function(val) {
                        return wallet_symbol + ' ' +
                            numberWithCommas(val);
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['success'], KTApp.getSettings()['colors']['theme']['base']['warning']],
            grid: { borderColor: KTApp.getSettings()['colors']['gray']['gray-200'], strokeDashArray: 4, yaxis: { lines: { show: true } } },
            markers: { colors: [KTApp.getSettings()['colors']['theme']['light']['success'], KTApp.getSettings()['colors']['theme']['light']['warning']], strokeColor: [KTApp.getSettings()['colors']['theme']['light']['success'], KTApp.getSettings()['colors']['theme']['light']['warning']], strokeWidth: 3 }
        };
        generate_chart("kt_main_chart_trends", options)
    } */

    return {
        init: function() {
            KTApp.block('#kt_blockui_content', {
                overlayColor: '#1e1e2d',
                opacity: 0,
                state: 'primary',
                message: 'Fetching Entries...'
            });
        
            read_data();

        },
        refresh: function() {
            KTApp.block('#kt_blockui_content', {
                overlayColor: '#1e1e2d',
                opacity: 0,
                state: 'primary',
                message: 'Fetching Entries...'
            });
        
            read_data();
        },
        cat: function() {
            run_cat();
        },
    };
}();
jQuery(document).ready(function() {
    wallet_id = global_data[0];
    user_id = global_data[2];  
    user_name = global_data[1];  
    user_photo =   global_data[3];  
    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');
    getoptdata(wallet_Ref, wallet_id).then(function(doc) {
        wallet_name = doc.name;
        wallet_type = doc.type;
        wallet_description = doc.description;
        wallet_owner = doc.owner;
        wallet_location = doc.location;
        wallet_currency = doc.currency;
        wallet_entries = doc.entries; 
        wallet_symbol = currency_convertor[wallet_currency];
        document.getElementById("wallet_cur").innerText = wallet_currency;
        document.getElementById("welcome_photo").innerHTML = '<div class="symbol-label" style="background-image:url('+user_photo+')"></div>'
        

     //   document.getElementById("form_currency").innerText = wallet_symbol;
      /*   getoptdata(user_Ref, wallet_owner).then(function(finalResult) {
            user_name = finalResult.name;
         document.getElementById("owrner_fp").innerText = user_name;
        }).catch((error) => { console.log(error); }); */
    
        document.getElementById("location_fp").innerText = wallet_location;
        document.getElementById("t_wallet_name").innerHTML ='<a  class="btn btn-dark btn-shadow  font-weight-bold  px-6 py-3" style = "text-transform:uppercase;">'+wallet_name+'</a>' ;
        //wallet_name.toUpperCase();
        document.getElementById("t_wallet_id").innerText = wallet_id;
         document.getElementById("wallet_title").innerText = wallet_description;

    //    document.getElementById("wallet_init").innerText = wallet_symbol
    
        document.getElementById("t_wallet_type").innerHTML = form_wal_type(wallet_type);
        start_app.init();
      }).catch((error) => {
          console.log(error);       
     });

     
    
     document.getElementById("welcome_message").innerText =  greetings() + global_data[1];


 
   
});

function go_to_wallet_entries(){
    var month_data = wallet_id + "," + user_name + "," + user_id + "," + user_photo;
    load_p('content_pages/wallet.html', month_data);
}


function check_balance() {
    Swal.fire({
        title: 'Enter Actual Balance: ',
        input: 'number',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Check',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            return `${login}`
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {

            var balance = Number(document.getElementById('current_net2').innerText) - Number(`${result.value}`);
            Swal.fire({
                title: 'Difference',
                text: balance
            })
        }
    })
}
function update_entry(description, category, amount, timestamp2, type, payment, user, repeat, num_of_repeat, i) {

    var timestamp = new Date(timestamp2);
    let myPromise = new Promise(function(resolve, reject) {
        var value = {
            [timestamp]: { "user": user, "Description": description, "Category": category, "Type": type, "Payment": payment, "Amount": amount, "Repeated": repeat, },
            last_updated: timestamp
        };
        var entry_id = monthts(timestamp);

        updateoptdata(wallet_Ref_entries, entry_id, value).then(function() { resolve('sucess'); }).catch((error) => {
            console.log(error);
            console.log(error.code);
            if (error == 'Document doesn\'t exist.' || error.code == 'not-found') { 

                setoptdata(wallet_Ref_entries, entry_id, value).then(function() {
                    uptoptarray(wallet_Ref, wallet_id, 'entries', entry_id).then(function() {
                        resolve('sucess'); 
                    }).catch((error) => {
                        console.log(error);
                    });
    
                    
                    
                  
          
               
            }).catch((error) => { reject(error); }); }
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
/* function update_entry(description, category, amount, timestamp2, type, payment, user, repeat, num_of_repeat, i) {

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
} */

var chat_elements = [];
var generate_chart = function(div_id, options) {
 
    var element = document.getElementById(div_id);
   
    var chart = new ApexCharts(element, options);
    if (chat_elements.hasOwnProperty(div_id)) {
     
        chat_elements[div_id].destroy();
        chart.render();
    } else {
     
        chat_elements[div_id] = chart;
        chart.render();
    }
}
