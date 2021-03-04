"use strict";
var wallet_Ref = '';
var wallet_id = "";
var datetime_loaded = false;
var selected_start = new Date('1/1/1900').getTime();
var selected_end = new Date('1/1/2100').getTime();


var start_app = function() {
    var run_trends = function(first_time, tabler) {
        var first_day = date_process(tabler)[0];
        var last_day = date_process(tabler)[1];
        var cat = cat_process(tabler);
        var label = monthts(first_day) + " - " + monthts(last_day);
        var d_income = chart_process(tabler, 'doc_id', { 'Type': 'Income' });
        var d_expense = chart_process(tabler, 'doc_id', { 'Type': 'Expense' });
        var d_netincome = chart_subraction(d_income, d_expense);
        var d_re_income = chart_process(tabler, 'doc_id', { 'Type': 'Income', 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Income' });
        var d_re_expense = chart_process(tabler, 'doc_id', { 'Type': 'Expense', 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Income' });
        var d_on_income = chart_process(tabler, 'doc_id', { 'Type': 'Income', 'Repeated': 'Once', 'Type': 'Income' });
        var d_on_expense = chart_process(tabler, 'doc_id', { 'Type': 'Expense', 'Repeated': 'Once', 'Type': 'Income' });
        var data66 = data_for_pie(chart_process(tabler, 'Category', { 'Type': 'Income' }));
        piechart_123(data66[0], data66[1], "kt_pie_chart_cat");
        var data77 = data_for_pie(chart_process(tabler, 'Category', { 'Type': 'Expense' }));
        piechart_123(data77[0], data77[1], "kt_pie_chart_cat_e");
        if (first_time) {
            _init_main_chart_3(d_on_income, d_re_income, cat);
            _init_main_chart_4(d_on_expense, d_re_expense, cat);
            _init_main_chart(d_income, d_expense, cat);
            _initTilesWidget20(d_income, d_expense, d_netincome, label, cat);
            _initDaterangepicker(first_day, last_day);
        }
    }
    var read_data = function(from, to, first_time, force) { get_wallet_data(wallet_id, from, to, force).then(function(finalResult) { run_trends(first_time, finalResult); }).catch((error) => { console.log(error); }); };
    var datetime_loaded = false;
    var _initDaterangepicker = function(start, end) {
        if ($('#kt_dashboard_daterangepicker').length == 0) { return; }
        start = moment(start);
        end = moment(end);
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
            if (datetime_loaded == false) { datetime_loaded = true; } else { read_data(start, end, false); }
        }
        picker.daterangepicker({ direction: KTUtil.isRTL(), startDate: start, endDate: end, opens: 'left', applyClass: 'btn-primary', cancelClass: 'btn-light-primary', ranges: { 'Today': [moment(), moment()], 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')], 'Last 7 Days': [moment().subtract(6, 'days'), moment()], 'Last 30 Days': [moment().subtract(29, 'days'), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')], 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')], 'All time': [start, end] } }, cb);
        cb(start, end, '');
    }
    var _initTilesWidget20 = function(data, data1, data2, label, cat) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = { series: [{ name: 'Income', type: 'column', data: extract_data(data) }, { name: 'Expense', type: 'column', data: extract_data(data1) }, { name: 'Net', type: 'line', data: extract_data(data2) }], chart: { height: '350px', type: 'line', stacked: false }, dataLabels: { enabled: false }, stroke: { width: [1, 1, 4] }, xaxis: { categories: cat, }, yaxis: [{ axisTicks: { show: true, }, axisBorder: { show: true, color: primary }, labels: { style: { colors: primary, } }, title: { text: "Income", style: { color: primary, } }, tooltip: { enabled: true } }, { seriesName: 'Income', opposite: true, axisTicks: { show: true, }, axisBorder: { show: true, color: success }, labels: { style: { colors: success, } }, title: { text: "Expense", style: { color: success, } }, }, { seriesName: 'Net Revenue', opposite: true, axisTicks: { show: true, }, axisBorder: { show: true, color: warning }, labels: { style: { colors: warning, }, }, title: { text: "Revenue", style: { color: warning, } } }, ], tooltip: { fixed: { enabled: true, position: 'topLeft', offsetY: 30, offsetX: 60 }, style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] }, y: { formatter: function(val) { return "Rs " + numberWithCommas(val); } } }, legend: { horizontalAlign: 'left', offsetX: 40 } };
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
    var _init_main_chart_3 = function(data, data1, cat) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = {
            series: [{ name: 'Non-Recurring', type: 'column', data: extract_data(data) }, { name: 'Recurring', type: 'column', data: extract_data(data1) }],
            stroke: { show: true, curve: 'smooth', lineCap: 'butt', width: 0.1, dashArray: 0, },
            chart: { height: 350, stacked: true, toolbar: { show: true }, zoom: { enabled: true } },
            colors: [success, primary, warning],
            responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
            plotOptions: { bar: { borderRadius: 8, horizontal: false, }, },
            xaxis: { categories: cat },
            legend: { position: 'right', offsetY: 40 },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: { fontSize: '12px', colors: ["#304758"] },
                formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                    if (seriesIndex === ((w.config.series.length) - parseInt(1)))
                        return "Rs " + numberWithCommas(w.globals.stackedSeriesTotals[dataPointIndex]);
                    return "";
                }
            },
            tooltip: { style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] }, y: { formatter: function(val) { return "Rs " + numberWithCommas(val); } } },
            fill: { opacity: 1 }
        };
        generate_chart("kt_main_chart_3", options)
    }
    var _init_main_chart_4 = function(data, data1, cat) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = {
            series: [{ name: 'Non-Recurring', type: 'column', data: extract_data(data) }, { name: 'Recurring', type: 'column', data: extract_data(data1) }],
            stroke: { show: true, curve: 'smooth', lineCap: 'butt', width: 0.1, dashArray: 0, },
            chart: { height: 350, stacked: true, toolbar: { show: true }, zoom: { enabled: true } },
            colors: [success, primary, warning],
            responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
            plotOptions: { bar: { borderRadius: 8, horizontal: false, }, },
            xaxis: { categories: cat },
            legend: { position: 'right', offsetY: 40 },
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
            tooltip: { style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] }, y: { formatter: function(val) { return "Rs " + numberWithCommas(val); } } },
            fill: { opacity: 1 }
        };
        generate_chart("kt_main_chart_4", options)
    }
    var _init_main_chart = function(data1, data2, cat) {
        var options = { series: [{ name: 'Income', data: extract_data(data1) }, { name: 'Expense', data: extract_data(data2) }], chart: { type: 'area', height: 350, toolbar: { show: false } }, plotOptions: {}, legend: { show: false }, dataLabels: { enabled: false }, fill: { type: 'solid', opacity: 1 }, stroke: { curve: 'smooth' }, xaxis: { categories: cat, axisBorder: { show: false, }, axisTicks: { show: false }, labels: { style: { colors: KTApp.getSettings()['colors']['gray']['gray-500'], fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] } }, crosshairs: { position: 'front', stroke: { color: KTApp.getSettings()['colors']['theme']['light']['success'], width: 1, dashArray: 3 } }, tooltip: { enabled: true, formatter: undefined, offsetY: 0, style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] } } }, yaxis: { labels: { style: { colors: KTApp.getSettings()['colors']['gray']['gray-500'], fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] } } }, states: { normal: { filter: { type: 'none', value: 0 } }, hover: { filter: { type: 'none', value: 0 } }, active: { allowMultipleDataPointsSelection: false, filter: { type: 'none', value: 0 } } }, tooltip: { style: { fontSize: '12px', fontFamily: KTApp.getSettings()['font-family'] }, y: { formatter: function(val) { return "Rs " + numberWithCommas(val); } } }, colors: [KTApp.getSettings()['colors']['theme']['base']['success'], KTApp.getSettings()['colors']['theme']['base']['warning']], grid: { borderColor: KTApp.getSettings()['colors']['gray']['gray-200'], strokeDashArray: 4, yaxis: { lines: { show: true } } }, markers: { colors: [KTApp.getSettings()['colors']['theme']['light']['success'], KTApp.getSettings()['colors']['theme']['light']['warning']], strokeColor: [KTApp.getSettings()['colors']['theme']['light']['success'], KTApp.getSettings()['colors']['theme']['light']['warning']], strokeWidth: 3 } };
        generate_chart("kt_main_chart", options)
    }
    return { init: function() { read_data(selected_start, selected_end, true, false); }, refresh: function() { read_data(selected_start, selected_end, false, true); }, };
}();
jQuery(document).ready(function() {
    wallet_id = global_data[0];
    var wallet_name = global_data[1];
    document.getElementById("t_wallet_name").innerText = wallet_name.toUpperCase();
    var wallet_type = global_data[3];
    document.getElementById("t_wallet_type").innerHTML = form_wal_type(wallet_type);
    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');
    start_app.init();
});