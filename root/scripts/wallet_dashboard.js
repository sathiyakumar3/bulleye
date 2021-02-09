"use strict";

// Class definition

var wallet_Ref = '';
var start = moment();
var end = moment();

var start_app = function() {

    var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    /*     wallet_Ref.where('last_updated', '>', firstDay).where('last_updated', '<', lastDay)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());


                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

     */

    var today = new Date().getTime(); // 1501653935994
    var from = new Date("02/08/2017").getTime(); // gives 1486492200000
    var to = new Date("05/08/2023").getTime();

    if (today >= from && today <= to) {
        // your code goes here
        console.log("peep peep");
    }

    var read_data = function() {
        var today = new Date();
        var entry_id = monthts(today);
        var counter = 0;
        var sum_expense = 0;
        var sum_income = 0;
        var first_day = "";
        var last_day = "";
        var promises = [];
        wallet_Ref.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    wallet_Ref.doc(doc.id).onSnapshot(function(doc) {
                        var arr = doc.data();
                        delete arr["last_updated"];

                        Object.keys(arr).sort().map(function(key, index) {
                            const promises8 = new Promise((resolve, reject) => {
                                counter++;
                                var user_id = arr[key].user;
                                var user_Ref = db.collection("users");
                                var datetime = new Date(key);

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

                                    if (values[2]['Payment'] == 'Paid') {
                                        if (values[2]['Type'] == 'Expense') {
                                            sum_expense = sum_expense + Number(values[2]['Amount']);
                                        } else {
                                            sum_income = sum_income + Number(values[2]['Amount']);
                                        }
                                    }
                                    var datetime = values[2]['Timestamp'];
                                    if (first_day == "" || datetime < first_day) {
                                        first_day = datetime;
                                    }
                                    if (last_day == "" || datetime > last_day) {
                                        last_day = datetime;
                                    }
                                    resolve($.extend(values[0], values[1], values[2]));
                                });
                            });
                            promises.push(promises8);
                        });
                        Promise.all(promises).then((values) => {
                            var currency = '<span class="text-dark-50 font-weight-bold" id>Rs </span>';
                            document.getElementById("sum_earnings_m").innerHTML = currency + numberWithCommas(sum_income);
                            document.getElementById("sum_expenses_m").innerHTML = currency + numberWithCommas(sum_expense);
                            if ((sum_income - sum_expense) < 0) {
                                document.getElementById("sum_net_m").classList.add("text-danger");
                            } else {
                                document.getElementById("sum_net_m").classList.add("text-success");
                            }
                            document.getElementById("sum_net_m").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
                            document.getElementById("number_items").innerText = counter + " Entries";
                            console.log("done")
                            document.getElementById("end_date").innerText = shortdateclean(first_day);
                            document.getElementById("start_date").innerText = shortdateclean(last_day);
                            console.log(first_day);
                            console.log(last_day);
                            start = moment(first_day);
                            end = moment(last_day);
                            _initDaterangepicker();
                            resolve("sucess");
                        });
                    });

                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
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
        var start2 = moment();
        var end2 = moment();

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

    return {
        init: function() {
            read_data();
            intwidgets();

        },
    };
}();


jQuery(document).ready(function() {


    var wallet_id = global_data[0];
    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');
    start_app.init();
});