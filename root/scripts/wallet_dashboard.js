"use strict";
var tabler = [];
var wallet_Ref = '';
var chart = "";
var element = "";
var selected_start;
var selected_end;
var datetime_loaded = false;
var chat_elements = [];
var tips_enabled = false;


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
                case 3:
                    html_div = html_div + build_table(key, obj);
                    break;
                default:
                    // code block
            }
        }
    });

    document.getElementById(html).innerHTML = html_div;

}

function build_category_widget(cat, value, total) {
    var myvar = '<tr>' +
        '    <td class="pl-0" style="min-width: 150px">' + icon_nd_name(get_cat_ic(cat), cat) +
        '    </td>' +
        '    <td>' + percentage_form(value, total, 'Rs') +
        '    </td>' +
        '    <td class="text-right pr-0">' +
        dummy_button() +
        '    </td>' +
        '</tr>';
    return myvar
}

function build_user_widget(user, value, total, user_profile) {
    var myvar = '<tr>' +
        '<td class="pl-0">' + icon_nd_photo_name_email(user_profile[user]['photo_url'], user_profile[user]['user_name'], user_profile[user]['user_email']) + '</td>' +
        '<td></td>' +
        '<td>' + payment_status_fomt('dummy', 'Paid', value, 'dummy') +
        ' </td>' +
        '<td class="text-right">' + percentage_form(value, total, 'Rs') +
        '</td>' +
        '<td class="text-right pr-0">' + dummy_button() +
        ' </td>' +
        '</tr>';
    return myvar
}

function build_table(user, obj) {
    var date = new Date(obj[user]['Timestamp']);
    switch (obj[user]['Payment']) {
        case 'Paid':
            var myvar2 = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + obj[user]['Description'] + '\', \'' + obj[user]['Category'] + '\', \'' + obj[user]['Amount'] + '\', \'' + obj[user]['Timestamp'] + '\', \'' + obj[user]['Type'] + '\', \'' + 'Not Paid' + '\', \'' + obj[user]['user'] + '\', \'' + obj[user]['Repeated'] + '\');update_tabler(\'' + obj[user]['Timestamp'] + '\', \'' + 'Not Paid' + '\')">' +
                '<span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Code\Error-circle.svg--> <svg><use xlink:href="#cross"></use></svg></span>' +
                '</a>';
            break;
        case 'Not Paid':

            var myvar2 = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + obj[user]['Description'] + '\', \'' + obj[user]['Category'] + '\', \'' + obj[user]['Amount'] + '\', \'' + obj[user]['Timestamp'] + '\', \'' + obj[user]['Type'] + '\', \'' + 'Paid' + '\', \'' + obj[user]['user'] + '\', \'' + obj[user]['Repeated'] + '\');update_tabler(\'' + obj[user]['Timestamp'] + '\', \'' + 'Paid' + '\')">' +
                '<span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Code\Done-circle.svg--> <svg><use xlink:href="#tick"></use></svg></span>' +
                '</a>';
            break;
        default:
    }

    var myvar = '<tr>' +
        '<td class="pl-0 py-8">' +
        '<div class="d-flex align-items-center">' +
        icon_nd_name_nd_description(get_cat_ic(obj[user]['Category']), obj[user]['Category'], obj[user]['Description']) +
        '</div>' +
        '</td>' +
        '<td>' + dnt4table(obj[user]['Timestamp']) + '</td>' + '<td>' + payment_status_fomt(obj[user]['Type'], obj[user]['Payment'], obj[user]['Amount'], 'Income') +
        '</td>' +
        '<td>' + payment_status_fomt(obj[user]['Type'], obj[user]['Payment'], obj[user]['Amount'], 'Expense') +
        '</td>' +
        '<td class="text-centre">' +
        myvar2 +
        '</td>' +
        '</tr>';

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



function update_tabler(timestamp, payment) {
    Object.keys(tabler).sort().map(function(key, index) {
        var ts = new Date(tabler[key]['Timestamp']);
        var ts2 = new Date(timestamp);
        if (ts - ts2 == 0) {
            tabler[key]['Payment'] = payment;
        }
    });
    process_row(tabler, "table_23", '', '', 3);
    start_app.refresh();
}


function profit_loss_format(value) {
    if (value > 0) {
        return '<span class="label label-md label-primary label-pill label-inline mr-2">Profit</span>'
    } else {
        return '<span class="label label-md label-danger label-pill label-inline mr-2">Loss</span>'
    }

}




var start_app = function() {
    var read_data = function(from, to, first_time) {

        selected_start = from;
        selected_end = to;

        var user_profile = [];
        var user_sum = 0;
        var counter = 0;
        var sum_expense = 0;
        var sum_income = 0;

        var not_paid_sum = 0;
        var first_day = "";
        var last_day = "";
        var promises = [];
        var net_pec = 0;


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
                                        var REC_category = values[2]['Category'];
                                        var REC_amount = values[2]['Amount'];
                                        var REC_user = values[2]['user'];
                                        var REC_type = values[2]['Type'];
                                        var REC_description = values[2]['Description'];
                                        var REC_payment = values[2]['Payment'];
                                        var REC_repeated = values[2]['Repeated'];
                                        var REC_timestamp = values[2]['Timestamp'];
                                        var REC_user_email = values[1]['user_email'];
                                        var REC_user_name = values[1]['user_name'];
                                        var REC_user_photo = values[0]['photo_url'];

                                        if (!user_profile.hasOwnProperty([user_id])) {
                                            user_profile = {
                                                [user_id]: {
                                                    user_name: REC_user_name,
                                                    user_email: REC_user_email,
                                                    photo_url: REC_user_photo,
                                                }
                                            }
                                            user_sum++;
                                        }
                                        var datetime = REC_timestamp;
                                        if (first_day == "" || datetime < first_day) {
                                            first_day = REC_timestamp;
                                        }
                                        if (last_day == "" || datetime > last_day) {
                                            last_day = REC_timestamp;
                                        }

                                        resolve($.extend(values[0], values[1], values[2]));

                                    });

                                });
                                promises.push(promises8);
                            }
                        });

                        Promise.all(promises).then((values) => {

                            if (items_counter == items) {
                                tabler = $.extend(tabler, values);
                                sum_income = data_process(tabler, { 'Payment': 'Paid', 'Type': 'Income' });
                                sum_expense = data_process(tabler, { 'Payment': 'Paid', 'Type': 'Expense' });
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
                                document.getElementById("number_items").innerText = Object.keys(tabler).length + " Entries";

                                document.getElementById("end_date").innerText = shortdateclean(first_day);
                                document.getElementById("start_date").innerText = shortdateclean(last_day);



                                process_row(chart_process(tabler, 'Category', { 'Type': 'Income' }), "testtt", sum_income, user_profile, 1);
                                process_row(chart_process(tabler, 'Category', { 'Type': 'Expense' }), "testtt2", sum_expense, user_profile, 1);
                                process_row(chart_process(tabler, 'user', { 'Type': 'Income' }), "testtt3", sum_income, user_profile, 2);
                                process_row(chart_process(tabler, 'user', { 'Type': 'Expense' }), "testtt4", sum_expense, user_profile, 2);
                                document.getElementById("image_list").innerHTML = user_circle_gen(user_profile);


                                if (user_sum > 1) {
                                    document.getElementById("user_list_md").innerText = user_sum + " Users";
                                } else {
                                    document.getElementById("user_list_md").innerText = user_sum + " User";
                                }




                                var current_income = data_process(tabler, { 'Payment': 'Paid', 'Type': 'Income' });
                                set_sum('current_income', current_income);
                                var current_expense = data_process(tabler, { 'Payment': 'Paid', 'Type': 'Expense' });
                                set_sum('current_expense', current_expense);
                                var current_net = current_income - current_expense;
                                set_sum('current_net', current_net);
                                document.getElementById("cur_progress").innerHTML = percentage_form(current_net, current_income, 'Rs');
                                document.getElementById("cur_pl").innerHTML = profit_loss_format(current_net);

                                var rec_income = data_process(tabler, { 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Income' });
                                set_sum('rec_income', rec_income);
                                var rec_expense = data_process(tabler, { 'Repeated': ['Monthly', 'Daily', 'Weekly'], 'Type': 'Expense' });
                                set_sum('rec_expense', rec_expense);
                                var rec_net = rec_income - rec_expense;
                                set_sum('rec_net', rec_net);
                                document.getElementById("rec_progress").innerHTML = percentage_form(rec_net, rec_income, 'Rs');
                                document.getElementById("rec_pl").innerHTML = profit_loss_format(rec_net);

                                var non_income = data_process(tabler, { 'Repeated': 'Once', 'Type': 'Income' });
                                set_sum('non_income', non_income);
                                var non_expense = data_process(tabler, { 'Repeated': 'Once', 'Type': 'Expense' });
                                set_sum('non_expense', current_expense);
                                var non_net = non_income - non_expense;
                                set_sum('non_net', non_net);
                                document.getElementById("non_progress").innerHTML = percentage_form(non_net, non_income, 'Rs');
                                document.getElementById("non_pl").innerHTML = profit_loss_format(non_net);

                                var fin_income = data_process(tabler, { 'Type': 'Income' });
                                set_sum('fin_income', fin_income);
                                var fin_expense = data_process(tabler, { 'Type': 'Expense' });
                                set_sum('fin_expense', fin_expense);
                                var fin_net = fin_income - fin_expense;
                                set_sum('fin_net', fin_net);
                                document.getElementById("total_progress").innerHTML = percentage_form(fin_net, fin_income, 'Rs');
                                document.getElementById("fin_pl").innerHTML = profit_loss_format(fin_net);





                                tabler = remove_not_paid(tabler);
                                console.log(tabler);
                                process_row(tabler, "table_23", '', '', 3);

                                if (first_time) {
                                    to = new Date(last_day.getFullYear(), last_day.getMonth() + 1, 0);;
                                    _initDaterangepicker(first_day, to);
                                    from = first_day;

                                }

                                var today2 = new Date();
                                var difference = today2 - from;
                                var diff_days_1 = Math.ceil(difference / (1000 * 3600 * 24));
                                var net_income_rate = (sum_income - sum_expense) / diff_days_1;
                                var difference2 = to - today2;
                                var diff_days_2 = Math.ceil(difference2 / (1000 * 3600 * 24));
                                var net_income_pred = Math.round((diff_days_2 * net_income_rate) + (sum_income - sum_expense));
                                document.getElementById("predict").innerText = " Rs " + numberWithCommas(net_income_pred);

                                var ac_percentage = Math.round(difference / (difference2 + difference) * 100);

                                document.getElementById("pred_ac").innerText = ac_percentage + " %";
                                document.getElementById("pred_ac_bar").className = 'progress-bar ' + format_progress_bar(ac_percentage);
                                document.getElementById("pred_ac_bar").style.width = ac_percentage + "%";

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

        cb(start, end, '');

    }

    var generate_chart = function(div_id, options) {
        var element = document.getElementById(div_id);
        if (!element) {
            return;
        }
        var chart = new ApexCharts(element, options);
        if (chat_elements.hasOwnProperty(div_id)) {
            chat_elements[div_id].destroy();
            chart.render();
        } else {
            chat_elements[div_id] = chart;
            chart.render();
        }
    }



    return {
        init: function() {
            selected_start = new Date('1/1/1900').getTime();
            selected_end = new Date('1/1/2100').getTime();
            read_data(selected_start, selected_end, true);
        },
        refresh: function() {
            read_data(selected_start, selected_end, false);
        },

    };
}();




jQuery(document).ready(function() {
    var wallet_id = global_data[0];
    var wallet_name = global_data[1];
    var wallet_description = global_data[4];
    var wallet_type = global_data[3];
    var wallet_owner = global_data[5];
    var wallet_location = global_data[6];
    cat2combo(wallet_id);
    var user_Ref = db.collection("users");
    getoptdata(user_Ref, wallet_owner).then(function(finalResult) {
        var user_name = finalResult.name;
        document.getElementById("owrner_fp").innerText = user_name;
    }).catch((error) => {
        console.log(error);
    });

    document.getElementById("location_fp").innerText = wallet_location;
    document.getElementById("t_wallet_name").innerText = wallet_name.toUpperCase();
    document.getElementById("t_wallet_id").innerText = wallet_id;
    document.getElementById("wallet_title").innerText = wallet_description;
    document.getElementById("wallet_init").innerText = name_intials(wallet_name);
    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');
    document.getElementById("t_wallet_type").innerHTML = form_wal_type(wallet_type);




    start_app.init();
});