"use strict";

var wallet_Ref = '';


var wallet_id = "";
var datetime_loaded = false;




function process_row(obj, html) {

    var html_div = "";
    var counter_c = 0;
    var keysSorted = Object.keys(obj).sort(function(a, b) { return obj[b] - obj[a] });
    Object.keys(keysSorted).sort().map(function(key, index) {
        counter_c++;
        if (counter_c <= 5) {
            html_div = html_div + build_table(key, obj);
        }
    });

    document.getElementById(html).innerHTML = html_div;

}




function build_table(user, obj) {
    var date = new Date(obj[user]['Timestamp']);
    switch (obj[user]['Payment']) {
        case 'Paid':
            var myvar2 = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + obj[user]['Description'] + '\', \'' + obj[user]['Category'] + '\', \'' + obj[user]['Amount'] + '\', \'' + obj[user]['Timestamp'] + '\', \'' + obj[user]['Type'] + '\', \'' + 'Not Paid' + '\', \'' + obj[user]['user'] + '\');update_tabler(\'' + obj[user]['Timestamp'] + '\', \'' + 'Not Paid' + '\')">' +
                '<span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Code\Error-circle.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '        <rect x="0" y="0" width="24" height="24"/>' +
                '        <path d="M12.0355339,10.6213203 L14.863961,7.79289322 C15.2544853,7.40236893 15.8876503,7.40236893 16.2781746,7.79289322 C16.6686989,8.18341751 16.6686989,8.81658249 16.2781746,9.20710678 L13.4497475,12.0355339 L16.2781746,14.863961 C16.6686989,15.2544853 16.6686989,15.8876503 16.2781746,16.2781746 C15.8876503,16.6686989 15.2544853,16.6686989 14.863961,16.2781746 L12.0355339,13.4497475 L9.20710678,16.2781746 C8.81658249,16.6686989 8.18341751,16.6686989 7.79289322,16.2781746 C7.40236893,15.8876503 7.40236893,15.2544853 7.79289322,14.863961 L10.6213203,12.0355339 L7.79289322,9.20710678 C7.40236893,8.81658249 7.40236893,8.18341751 7.79289322,7.79289322 C8.18341751,7.40236893 8.81658249,7.40236893 9.20710678,7.79289322 L12.0355339,10.6213203 Z" fill="#000000"/>' +
                '    </g>' +
                '</svg><!--end::Svg Icon--></span>' +
                '</a>';
            break;
        case 'Not Paid':

            var myvar2 = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + obj[user]['Description'] + '\', \'' + obj[user]['Category'] + '\', \'' + obj[user]['Amount'] + '\', \'' + obj[user]['Timestamp'] + '\', \'' + obj[user]['Type'] + '\', \'' + 'Paid' + '\', \'' + obj[user]['user'] + '\');update_tabler(\'' + obj[user]['Timestamp'] + '\', \'' + 'Paid' + '\')">' +
                '<span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Code\Done-circle.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '        <rect x="0" y="0" width="24" height="24"/>' +

                '        <path d="M16.7689447,7.81768175 C17.1457787,7.41393107 17.7785676,7.39211077 18.1823183,7.76894473 C18.5860689,8.1457787 18.6078892,8.77856757 18.2310553,9.18231825 L11.2310553,16.6823183 C10.8654446,17.0740439 10.2560456,17.107974 9.84920863,16.7592566 L6.34920863,13.7592566 C5.92988278,13.3998345 5.88132125,12.7685345 6.2407434,12.3492086 C6.60016555,11.9298828 7.23146553,11.8813212 7.65079137,12.2407434 L10.4229928,14.616916 L16.7689447,7.81768175 Z" fill="#000000" fill-rule="nonzero"/>' +
                '    </g>' +
                '</svg><!--end::Svg Icon--></span>' +
                '</a>';
            break;
        default:
    }
    var income = "";
    var expense = "";
    if (obj[user]['Type'] == 'Income') {
        income = '<div class="ml-2"><div class="text-dark-75 font-weight-bolder d-block font-size-lg">' + "Rs" + ' ' + numberWithCommas(obj[user]['Amount']) +
            '</div><a class="' + format_payment(obj[user]['Payment']) + ' font-weight-bold">' + obj[user]['Payment'] + '</a></div>';
        expense = "";
    } else {
        expense = '<div class="ml-2"><div class="text-dark-75 font-weight-bolder d-block font-size-lg">' + "Rs" + ' ' + numberWithCommas(obj[user]['Amount']) +
            '</div><a class="' + format_payment(obj[user]['Payment']) + ' font-weight-bold">' + obj[user]['Payment'] + '</a></div>';
        income = "";
    }
    var myvar = '<tr>' +
        '                                        <td class="pl-0 py-8">' +
        '                                            <div class="d-flex align-items-center">' +
        get_cat_icon(obj[user]['Category']) +
        '                                                <div>' +
        '                                                    <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">' + obj[user]['Description'] + '</a>' +
        '                                                    <span class="text-muted font-weight-bold d-block">' + obj[user]['Category'] + '</span>' +
        '                                                </div>' +
        '                                            </div>' +
        '                                        </td>' +



        '<td class="datatable-cell-center datatable-cell" data-field="Description" data-autohide-disabled="false" aria-label="erwer">' +
        '<span style="width: 100px;"><span style="width: 110px;"><div class="font-weight-bolder text-primary mb-0">' + shortdate(date) +
        '</div><div class="text-muted">' + shorttime(date) + '</div></span></span></td>' +


        '                                        <td>' + income +
        '                                        </td>' +
        '                                        <td>' + expense +
        '                                        </td>' +

        '                                        <td class="text-centre">' +
        myvar2 +
        '                                        </td>' +
        '                                    </tr>';

    return myvar
}

function remove_not_paid(array) {
    var obj = [];
    Object.keys(array).sort().map(function(key, index) {
        if (array[key]['Payment'] == 'Not Paid') {
            obj.push(array[key]);
        };
    });
    return obj;
}






function data_for_pie(data) {
    var data_set = [];
    var cat_set = [];

    Object.keys(data).sort().map(function(key, index) {
        data_set.push(data[key]);
        cat_set.push(key);
    });
    return [data_set, cat_set];
}

function update_tabler(timestamp, payment) {
    Object.keys(tabler).sort().map(function(key, index) {
        var ts = new Date(tabler[key]['Timestamp']);
        var ts2 = new Date(timestamp);
        if (ts - ts2 == 0) {
            tabler[key]['Payment'] = payment;
        }
    });
    process_row(tabler, "table_23");
    start_app.refresh();
}




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
    var read_data = function(from, to, first_time) {



        get_wallet_data(wallet_id, from, to).then(function(finalResult) {

            run_trends(first_time, finalResult);


        }).catch((error) => {
            console.log(error);
        });
    };
    var datetime_loaded = false;
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
                read_data(start, end, false);
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
        //  console.log(start);
        //  console.log(end);
        //  console.log(start2);
        //   console.log(end2);
        cb(start, end, '');

    }

    var _initTilesWidget20 = function(data, data1, data2, label, cat) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = {
            series: [{
                name: 'Income',
                type: 'column',
                data: extract_data(data)
            }, {
                name: 'Expense',
                type: 'column',
                data: extract_data(data1)
            }, {
                name: 'Net',
                type: 'line',
                data: extract_data(data2)
            }],
            chart: {
                height: '350px',
                type: 'line',
                stacked: false
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [1, 1, 4]
            },

            xaxis: {
                categories: cat,
            },
            yaxis: [{
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: primary
                    },
                    labels: {
                        style: {
                            colors: primary,
                        }
                    },
                    title: {
                        text: "Income",
                        style: {
                            color: primary,
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                {
                    seriesName: 'Income',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: success
                    },
                    labels: {
                        style: {
                            colors: success,
                        }
                    },
                    title: {
                        text: "Expense",
                        style: {
                            color: success,
                        }
                    },
                },
                {
                    seriesName: 'Net Revenue',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: warning
                    },
                    labels: {
                        style: {
                            colors: warning,
                        },
                    },
                    title: {
                        text: "Revenue",
                        style: {
                            color: warning,
                        }
                    }
                },
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60
                },
                style: {
                    fontSize: '12px',
                    fontFamily: KTApp.getSettings()['font-family']
                },
                y: {
                    formatter: function(val) {
                        return "Rs " + numberWithCommas(val);
                    }
                }
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            }
        };



        generate_chart("kt_main_chart_trends", options);
    }

    var piechart_123 = function(data_set, cat_set, html_div) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = {
            series: data_set,
            chart: {
                type: 'pie',
                width: '100%'
            },
            labels: cat_set,
            responsive: [{

                options: {

                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: [info, danger, warning, success, primary],
            tooltip: {
                style: {
                    fontSize: '12px',
                    fontFamily: KTApp.getSettings()['font-family']
                },
                y: {
                    formatter: function(val) {
                        return "Rs " + numberWithCommas(val);
                    }
                }
            },
            breakpoint: 480,
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
            }
        };


        generate_chart(html_div, options);
    }

    var _init_main_chart_3 = function(data, data1, cat) {

        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';

        var options = {
            series: [{
                name: 'Non-Recurring',
                type: 'column',
                data: extract_data(data)
            }, {
                name: 'Recurring',
                type: 'column',
                data: extract_data(data1)
            }],
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',

                width: 0.1,
                dashArray: 0,
            },
            chart: {

                height: 350,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },

            colors: [success, primary, warning],
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    horizontal: false,
                },
            },
            xaxis: {

                categories: cat
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                },
                formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                    if (seriesIndex === ((w.config.series.length) - parseInt(1)))
                        return "Rs " + numberWithCommas(w.globals.stackedSeriesTotals[dataPointIndex]);
                    return "";
                }
            },
            tooltip: {
                style: {
                    fontSize: '12px',
                    fontFamily: KTApp.getSettings()['font-family']
                },
                y: {
                    formatter: function(val) {
                        return "Rs " + numberWithCommas(val);
                    }
                }
            },
            fill: {
                opacity: 1
            }
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
            series: [{
                name: 'Non-Recurring',
                type: 'column',
                data: extract_data(data)
            }, {
                name: 'Recurring',
                type: 'column',
                data: extract_data(data1)
            }],
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',

                width: 0.1,
                dashArray: 0,
            },
            chart: {
                height: 350,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },

            colors: [success, primary, warning],
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    horizontal: false,
                },
            },
            xaxis: {

                categories: cat
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                },
                formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                    if (seriesIndex === ((w.config.series.length) - parseInt(1)))
                        return "Rs " + numberWithCommas(w.globals.stackedSeriesTotals[dataPointIndex]);
                    return "";
                },
            },
            tooltip: {
                style: {
                    fontSize: '12px',
                    fontFamily: KTApp.getSettings()['font-family']
                },
                y: {
                    formatter: function(val) {
                        return "Rs " + numberWithCommas(val);
                    }
                }
            },
            fill: {
                opacity: 1
            }
        };





        generate_chart("kt_main_chart_4", options)
    }
    var _init_main_chart = function(data1, data2, cat) {


        var options = {
            series: [{
                name: 'Income',
                data: extract_data(data1)
            }, {
                name: 'Expense',
                data: extract_data(data2)
            }],
            chart: {
                type: 'area',
                height: 350,
                toolbar: {
                    show: false
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
                type: 'solid',
                opacity: 1
            },
            stroke: {
                curve: 'smooth'
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
                    style: {
                        colors: KTApp.getSettings()['colors']['gray']['gray-500'],
                        fontSize: '12px',
                        fontFamily: KTApp.getSettings()['font-family']
                    }
                },
                crosshairs: {
                    position: 'front',
                    stroke: {
                        color: KTApp.getSettings()['colors']['theme']['light']['success'],
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
                labels: {
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
                    formatter: function(val) {
                        return "Rs " + numberWithCommas(val);
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['success'], KTApp.getSettings()['colors']['theme']['base']['warning']],
            grid: {
                borderColor: KTApp.getSettings()['colors']['gray']['gray-200'],
                strokeDashArray: 4,
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            markers: {
                colors: [KTApp.getSettings()['colors']['theme']['light']['success'], KTApp.getSettings()['colors']['theme']['light']['warning']],
                strokeColor: [KTApp.getSettings()['colors']['theme']['light']['success'], KTApp.getSettings()['colors']['theme']['light']['warning']],
                strokeWidth: 3
            }
        };
        generate_chart("kt_main_chart", options)

    }





    return {
        init: function() {
            var selected_start = new Date('1/1/1900').getTime();
            var selected_end = new Date('1/1/2100').getTime();
            read_data(selected_start, selected_end, true);


        },
        refresh: function() {
            read_data(selected_start, selected_end, false);
        },

    };
}();


jQuery(document).ready(function() {
    wallet_id = global_data[0];
    var wallet_name = global_data[1];


    document.getElementById("t_wallet_name").innerText = wallet_name.toUpperCase();
    //  document.getElementById("t_wallet_id").innerText = wallet_id;
    // document.getElementById("wallet_title").innerText = wallet_name;
    var wallet_type = global_data[3];
    document.getElementById("t_wallet_type").innerHTML = form_wal_type(wallet_type);
    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');
    start_app.init();
});

function data_for_pie(data) {
    var data_set = [];
    var cat_set = [];

    Object.keys(data).sort().map(function(key, index) {
        data_set.push(data[key]);
        cat_set.push(key);

    });

    return [data_set, cat_set]

}