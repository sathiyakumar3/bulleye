"use strict";
var wallet_Ref = '';
var wallet_id = "";
var datetime_loaded = false;
var selected_start = new Date('1/1/1900').getTime();
var selected_end = new Date('1/1/2100').getTime();
var local_data;

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
        $('#trans_1').collapse("show");
        $('#trans_2').collapse("show");
        $('#trans_3').collapse("show");
        flag_expand = false;
    } else {
        document.getElementById("expandicon").innerHTML = myvar2;
        $('#trans_1').collapse("hide");
        $('#trans_2').collapse("hide");
        $('#trans_3').collapse("hide");
        flag_expand = true;
    }



}



var start_app = function() {
    var run_dashboard = function() {
        var data = date_filter(local_data, selected_end, selected_start); 
        var user_profile = user_process(data);
        var user_sum = Object.keys(user_profile).length;
        var net_pec = 0;
        var sum_income = data_process(data, { 'Payment': 'Paid', 'Type': 'Income' });
        var sum_expense = data_process(data, { 'Payment': 'Paid', 'Type': 'Expense' });
        var currency = '<span class="text-dark-50 font-weight-bold" id>Rs </span>';
        document.getElementById("sum_earnings_m").innerHTML = currency + numberWithCommas(sum_income);
        document.getElementById("sum_expenses_m").innerHTML = currency + numberWithCommas(sum_expense);
        if ((sum_income - sum_expense) < 0) {
            document.getElementById("net_percent_title").innerText = "Have Spent Excess! "
            document.getElementById("sum_net_m").classList.remove("text-success");
            document.getElementById("sum_net_m").classList.add("text-danger");
            document.getElementById("net_percent_bar").classList.remove("bg-success");
            document.getElementById("net_percent_bar").classList.add("bg-warning");
            net_pec = Math.round(((sum_expense - sum_income) / sum_expense) * 100);
        } else {
            document.getElementById("sum_net_m").classList.remove("text-danger");
            document.getElementById("sum_net_m").classList.add("text-success");
            document.getElementById("net_percent_bar").classList.remove("bg-warning");
            document.getElementById("net_percent_bar").classList.add("bg-success");
            document.getElementById("net_percent_title").innerText = "Saved!";
            net_pec = Math.round(((sum_income - sum_expense) / sum_income) * 100);
        }
        document.getElementById("net_percent").innerHTML = net_pec + " %";
        document.getElementById("net_percent_bar").style.width = net_pec + "%";
        document.getElementById("sum_net_m").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
        document.getElementById("number_items").innerText = Object.keys(data).length + " Entries";
 

        document.getElementById("image_list").innerHTML = user_circle_gen(user_profile);
        if (user_sum > 1) { document.getElementById("user_list_md").innerText = user_sum + " Users"; } else { document.getElementById("user_list_md").innerText = user_sum + " User"; }
        var current_income = data_process(data, { 'Payment': 'Paid', 'Type': 'Income' });
        set_sum('current_income', current_income);
        var current_expense = data_process(data, { 'Payment': 'Paid', 'Type': 'Expense' });
        set_sum('current_expense', current_expense);
        var current_net = current_income - current_expense;
        document.getElementById("widget_cb").innerText = 'Rs ' +numberWithCommas(current_net);
        set_sum('current_net', current_net);
        document.getElementById("cur_progress").innerHTML = percentage_form(current_net, current_income, 'Rs');
        document.getElementById("cur_pl").innerHTML = profit_loss_format(current_net);
        var rec_income = data_process(data, { 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Income' });
        set_sum('rec_income', rec_income);
        var rec_expense = data_process(data, { 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Expense' });
        set_sum('rec_expense', rec_expense);
        var rec_net = rec_income - rec_expense;
        document.getElementById("widget_rb").innerText = 'Rs ' +numberWithCommas(rec_net);
        set_sum('rec_net', rec_net);
        document.getElementById("rec_progress").innerHTML = percentage_form(rec_net, rec_income, 'Rs');
        document.getElementById("rec_pl").innerHTML = profit_loss_format(rec_net);
        var non_income = rec_net;
        set_sum('non_income', non_income);
        var non_expense = data_process(data, { 'Repeated': 'Once', 'Type': 'Expense' });
        set_sum('non_expense', current_expense);
        var non_net = non_income - non_expense;
        document.getElementById("widget_ob").innerText = 'Rs ' +numberWithCommas(non_net);
        set_sum('non_net', non_net);
        document.getElementById("non_progress").innerHTML = percentage_form(non_net, non_income, 'Rs');
        document.getElementById("non_pl").innerHTML = profit_loss_format(non_net);
        var fin_income = data_process(data, { 'Type': 'Income' });
        set_sum('fin_income', fin_income);
        var fin_expense = data_process(data, { 'Type': 'Expense' });
        set_sum('fin_expense', fin_expense);
        var fin_net = fin_income - fin_expense;
        document.getElementById("widget_fb").innerText = 'Rs ' +numberWithCommas(fin_net);
        set_sum('fin_net', fin_net);
        document.getElementById("total_progress").innerHTML = percentage_form(fin_net, fin_income, 'Rs');
        document.getElementById("fin_pl").innerHTML = profit_loss_format(fin_net);
   var data66 = data_for_pie(get_available_data(data, 'Category', { 'Type': 'Income' }));
        piechart_123(data66[0], data66[1], "kt_pie_chart_cat");
        var data77 = data_for_pie(get_available_data(data, 'Category', { 'Type': 'Expense' }));
        piechart_123(data77[0], data77[1], "kt_pie_chart_cat_e"); 

    }
    var run_cat= function(){
    
        var cat = cat_process(local_data);
        var wallet_base_Ref = db.collection("wallets");
        var series1 = [];
        var series2 = [];
        getoptdata(wallet_base_Ref, wallet_id).then((function(doc) {
            var cat_icon_list = doc.categories;
            cat_icon_list.sort(sortOn("name"));
            for (let i = 0; i < cat_icon_list.length; i++) {
                newar[cat_icon_list[i]['name']] = cat_icon_list[i];
                var name = cat_icon_list[i]['name'];
                var da1 =  get_data(local_data,{ 'Category': name ,'Type': 'Income' },cat);
                var da2 =  get_data(local_data,{ 'Category': name ,'Type': 'Expense' },cat);
                series1.push({ name: name, type: 'column', data: da1 })
                series2.push({ name: name, type: 'column', data: da2 })
            }
        })).catch((error) => { console.error(error); });
      
     _init_main_chart_4( series1, cat,'kt_main_chart_cat_income',false);
     _init_main_chart_4( series2, cat,'kt_main_chart_cat_expense',false);    
    }
    var run_trends = function() {
           
        var cat = cat_process(local_data);    
     var d_income = get_data(local_data,  { 'Type': ['Income'] },cat);
     var d_expense = get_data(local_data, { 'Type': ['Expense'] },cat);
     var d_netincome = chart_subraction(d_income, d_expense);
        var d_re_income = get_data(local_data,  { 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Income' },cat);
   var d_re_expense = get_data(local_data, { 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Expense' },cat);
     var d_on_income = get_data(local_data,{ 'Repeated': ['Once'] ,'Type': 'Income' },cat);
    var d_on_expense = get_data(local_data,{ 'Repeated': ['Once'] ,'Type': 'Expense' },cat);   
     _init_main_chart_4( [{ name: 'Other', type: 'column', data: d_on_income }, { name: 'Recurring', type: 'column', data: d_re_income }], cat,'kt_main_chart_3',true);
     _init_main_chart_4( [{ name: 'Other', type: 'column', data: d_on_expense }, { name: 'Recurring', type: 'column', data: d_re_expense }], cat,'kt_main_chart_4',true);
     _init_main_chart(extract_net_data(d_income), extract_net_data(d_expense), cat);
       _initTilesWidget20(d_income, d_expense, extract_net_data(d_netincome), cat); 

    }
    var read_data = function(force_flag) {

        get_wallet_data(wallet_id, force_flag).then(function(result) {
     
            local_data = sort_obj(result, 'Timestamp');
          
            var outcome = date_process(result);
        selected_start = outcome[0];
         selected_end = outcome[1];
  
            _initDaterangepicker();
            run_trends();
        }).catch((error) => { console.log(error); });
   
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
        var options = { series: [{ name: 'Income', type: 'column', data: data }, { name: 'Expense', type: 'column', data: data1 }, { name: 'Net', type: 'line', data: data2 }], chart: { height: '350px', type: 'line', stacked: false }, dataLabels: { enabled: false }, stroke: { width: [1, 1, 4] }, xaxis: { categories: cat, }, yaxis: [{ axisTicks: { show: true, }, axisBorder: { show: true, color: primary }, labels: { style: { colors: primary, } }, title: { text: "Income", style: { color: primary, } }, tooltip: { enabled: true } }, { seriesName: 'Income', opposite: true, axisTicks: { show: true, }, axisBorder: { show: true, color: success }, labels: { style: { colors: success, } }, title: { text: "Expense", style: { color: success, } }, }, { seriesName: 'Net Revenue', opposite: true, axisTicks: { show: true, }, axisBorder: { show: true, color: warning }, labels: { style: { colors: warning, }, }, title: { text: "Revenue", style: { color: warning, } } }, ], tooltip: { fixed: { enabled: true, position: 'topLeft', offsetY: 30, offsetX: 60 }, style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] }, y: { formatter: function(val) { return "Rs " + numberWithCommas(val); } } }, legend: { horizontalAlign: 'left', offsetX: 40 } };
        generate_chart("kt_main_chart_trends", options);
    }
    var piechart_123 = function(data_set, cat_set, html_div) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = { series: data_set, chart: { type: 'pie', width: '100%' }, labels: cat_set, responsive: [{ options: { legend: { position: 'bottom' } } }], colors: [info, danger, warning, success, primary], tooltip: { style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] }, y: { formatter: function(val) { return "Rs " + numberWithCommas(val); } } }, breakpoint: 480, legend: { show: true, position: 'bottom', horizontalAlign: 'center', } };
        generate_chart(html_div, options);
    }

    var _init_main_chart_4 = function(series, cat,html_div,colours_flag) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = {
            series: series,
            stroke: { show: true, curve: 'smooth', lineCap: 'butt', width: 0.1, dashArray: 0, },
            chart: { height: 350, stacked: true, toolbar: { show: false }, zoom: { enabled: true } },
         
            responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
            plotOptions: { bar: { borderRadius: 8, horizontal: false, }, },
            xaxis: { categories: cat },
       
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: { fontSize: '12px', colors: ["#304758"] },
                formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                    if (seriesIndex === ((w.config.series.length) - parseInt(1)))
                        return "Rs " + numberWithCommas(w.globals.stackedSeriesTotals[dataPointIndex]);
                    return "";
                },
            },
            tooltip: { style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] },
             y: { formatter: function(val) { return "Rs " + numberWithCommas(val); } } },
            fill: { opacity: 1 }
        };
      
        if(colours_flag){
           options['colors'] = [success, primary, warning,info];
        }
        generate_chart(html_div, options)
    }
    var _init_main_chart = function(data1, data2, cat) {
        var options = { series: [{ name: 'Income', data: data1 }, { name: 'Expense', data: data2 }], chart: { type: 'area', height: 350, toolbar: { show: false } }, plotOptions: {}, legend: { show: false }, dataLabels: { enabled: false }, fill: { type: 'solid', opacity: 1 }, stroke: { curve: 'smooth' }, xaxis: { categories: cat, axisBorder: { show: false, }, axisTicks: { show: false }, labels: { style: { colors: KTApp.getSettings()['colors']['gray']['gray-500'], fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] } }, crosshairs: { position: 'front', stroke: { color: KTApp.getSettings()['colors']['theme']['light']['success'], width: 1, dashArray: 3 } }, tooltip: { enabled: true, formatter: undefined, offsetY: 0, style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] } } }, yaxis: { labels: { style: { colors: KTApp.getSettings()['colors']['gray']['gray-500'], fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] } } }, states: { normal: { filter: { type: 'none', value: 0 } }, hover: { filter: { type: 'none', value: 0 } }, active: { allowMultipleDataPointsSelection: false, filter: { type: 'none', value: 0 } } }, tooltip: { style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] }, y: { formatter: function(val) { return "Rs " + numberWithCommas(val); } } }, colors: [KTApp.getSettings()['colors']['theme']['base']['success'], KTApp.getSettings()['colors']['theme']['base']['warning']], grid: { borderColor: KTApp.getSettings()['colors']['gray']['gray-200'], strokeDashArray: 4, yaxis: { lines: { show: true } } }, markers: { colors: [KTApp.getSettings()['colors']['theme']['light']['success'], KTApp.getSettings()['colors']['theme']['light']['warning']], strokeColor: [KTApp.getSettings()['colors']['theme']['light']['success'], KTApp.getSettings()['colors']['theme']['light']['warning']], strokeWidth: 3 } };
        generate_chart("kt_main_chart", options)
    }

    return {
        init: function() {
            read_data(false);

        },
        refresh: function() {
            read_data(true);
        },
        cat: function() {
          run_cat();
        },
    };
}();
jQuery(document).ready(function() {
    wallet_id = global_data[0];
    var wallet_name = global_data[1];
    var wallet_description = global_data[4];
    var wallet_type = global_data[3];
    var wallet_owner = global_data[5];
    var wallet_location = global_data[6];
    var user_Ref = db.collection("users");
    getoptdata(user_Ref, wallet_owner).then(function(finalResult) {
        var user_name = finalResult.name;
        document.getElementById("owrner_fp").innerText = user_name;
    }).catch((error) => { console.log(error); });
    document.getElementById("location_fp").innerText = wallet_location;
    document.getElementById("t_wallet_name").innerText = wallet_name.toUpperCase();
    document.getElementById("t_wallet_id").innerText = wallet_id;
    document.getElementById("wallet_title").innerText = wallet_description;
    document.getElementById("wallet_init").innerText = name_intials(wallet_name);
    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');
    document.getElementById("t_wallet_type").innerHTML = form_wal_type(wallet_type);
    start_app.init();
});