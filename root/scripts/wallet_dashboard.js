"use strict";
// Class definition

var wallet_Ref = '';


var KTDatatableRecordSelectionDemo = function() {
    var read_data = function() {
        var today = new Date();
        var entry_id = monthts(today);
        wallet_Ref.doc(entry_id).onSnapshot(function(doc) {
            var arr = doc.data();
            delete arr["last_updated"];
            var counter = 0;
            var sum_expense = 0;
            var sum_income = 0;
            var first_day = "";
            var last_day = "";
            let promises = Object.keys(arr).sort().map(function(key, index) {
                counter++;
                var user_id = arr[key].user;
                var user_Ref = db.collection("users");;
                var user_email;
                const user_image_prom = new Promise((resolve, reject) => {
                    get_user_icon(user_id).then((url) => {
                        resolve({ photo_url: url });
                    }).catch((error) => {
                        resolve({ photo_url: 'none' });
                    });
                });

                const user_details_prom = new Promise((resolve, reject) => {
                    getoptdata(user_Ref, user_id).then(function(finalResult) {
                        user_email = finalResult.email;
                        user_name = finalResult.name;
                        resolve({ user_email, user_name });
                    }).catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                });

                const wallet_details_prom = {
                    RecordID: counter,
                    user: arr[key].user,
                    Description: arr[key].Description,
                    Category: arr[key].Category,
                    Type: arr[key].Type,
                    Amount: arr[key].Amount,
                    Payment: arr[key].Payment,
                    Repeated: arr[key].Repeated,
                    Timestamp: new Date(key),
                };
                return Promise.all([user_image_prom, user_details_prom, wallet_details_prom]).then((values) => {
                    console.log("[DASHBOARD] - Fetch");
                    if (values[2]['Payment'] == 'Paid') {
                        if (values[2]['Type'] == 'Expense') {
                            sum_expense = sum_expense + Number(values[2]['Amount']);
                        } else {
                            sum_income = sum_income + Number(values[2]['Amount']);
                        }
                    }
                    last_day = values[2]['Timestamp'];
                    if (first_day == "") {
                        first_day = values[2]['Timestamp'];
                    }
                    return $.extend(values[0], values[1], values[2]);
                });
            });
            return Promise.all(promises).then((values) => {


                var currency = '<span class="text-dark-50 font-weight-bold" id>Rs </span>';
                document.getElementById("sum_earnings_m").innerHTML = currency + numberWithCommas(sum_income);
                document.getElementById("sum_expenses_m").innerHTML = currency + numberWithCommas(sum_expense);
                console.log(1233);
                if ((sum_income - sum_expense) < 0) {
                    document.getElementById("sum_net_m").classList.add("text-danger");
                } else {
                    document.getElementById("sum_net_m").classList.add("text-success");
                }
                document.getElementById("sum_net_m").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
                document.getElementById("end_date").innerText = shortdateclean(last_day);
                document.getElementById("start_date").innerText = shortdateclean(first_day);
                document.getElementById("number_items").innerText = counter + " Entries";

            });

        });
    };

    var intwidgets = function() {
        /*         $('#kt_datetimepicker_9').datetimepicker({
                    defaultDate: new Date(),
                }); */
    }

    var _initDaterangepicker = function() {
        if ($('#kt_dashboard_daterangepicker').length == 0) {
            return;
        }
        var picker = $('#kt_dashboard_daterangepicker');
        var start = moment();
        var end = moment();

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
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end, '');
    }

    return {
        init: function() {
            read_data();
            intwidgets();
            _initDaterangepicker();
        },
    };
}();


jQuery(document).ready(function() {
    var wallet_id = document.getElementById("page_data").value;
    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries')
    KTDatatableRecordSelectionDemo.init();
});