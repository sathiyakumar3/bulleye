"use strict";
// Class definition
var tabler = [];
var datatable = "";
var selected_entry = "";
var wallet_Ref = "";


var start_app = function() {
    var read_data = function() {
        wallet_Ref.doc(selected_entry).onSnapshot(function(doc) {
            var arr = doc.data();
            delete arr["last_updated"];
            var counter = 0;
            var sum_expense = 0;
            var sum_income = 0;
            tabler = [];
            let promises = Object.keys(arr).sort().map(function(key, index) {
                counter++;
                var user_id = arr[key].user;
                var user_name;
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
                    console.log("ROW");
                    if (values[2]['Payment'] == 'Paid') {
                        if (values[2]['Type'] == 'Expense') {
                            sum_expense = sum_expense + Number(values[2]['Amount']);
                        } else {
                            sum_income = sum_income + Number(values[2]['Amount']);
                        }
                    }
                    return $.extend(values[0], values[1], values[2]);
                });
            });
            return Promise.all(promises).then((values) => {
                console.log("[Table] - Fetch");
                // tabler = values;

                var currency = '<span class="text-dark-50 font-weight-bold" id>Rs </span>';
                document.getElementById("sum_earnings").innerHTML = currency + numberWithCommas(sum_income);
                document.getElementById("sum_expenses").innerHTML = currency + numberWithCommas(sum_expense);
                if ((sum_income - sum_expense) < 0) {
                    document.getElementById("sum_net").classList.add("text-danger");
                } else {
                    document.getElementById("sum_net").classList.add("text-success");
                }
                document.getElementById("sum_net").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
                tabler = $.extend(tabler, values);
                initialze_table();
            });

        });
    };

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

    var initialze_table = function() {



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
            responsive: true,
            pagination: false,

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
                    width: 175,
                    sortable: true,
                    autoHide: true,
                    template: function(data) {

                        var icon = "";
                        if (data.photo_url == 'none') {
                            icon = ' <div class="symbol symbol-40 symbol-' + getrandomstate() + ' flex-shrink-0">' +
                                '<div class="symbol-label">' + data.user_name.substring(0, 1) + '</div></div>';

                        } else {
                            icon = '<div class="symbol symbol-40 flex-shrink-0">' +
                                '<div class="symbol-label" style="background-image: url(' + data.photo_url + ')"></div>' +
                                '</div>';
                        }
                        var ending = ' <div class="ml-2">' +
                            '<div class="text-dark-75 font-weight-bold line-height-sm">' + data.user_name + '</div>' +
                            '<a href="#" class="font-size-sm text-dark-50 text-hover-primary">' +
                            data.user_email + '</a>\
                        </div>\</div>';
                        return ('<div class="d-flex align-items-center">' + icon + ending);
                    }
                }, {
                    field: 'Category',
                    title: 'Category',
                    width: 200,
                    autoHide: false,
                    template: function(row) {
                        var myvar = '<div class="d-flex align-items-center">' +
                            '<div class="symbol symbol-40 symbol-success flex-shrink-0">' + get_cat_icon(row.Category) +
                            '</div>' +
                            '<div class="ml-2">' +
                            '<div class="text-dark-75 font-weight-bold line-height-sm">' + row.Description + '</div>' +
                            '<a href="#" class="font-size-sm text-dark-50 text-hover-primary">' + row.Category + '</a>' +
                            '</div></div>';
                        return myvar;
                    },
                }, {
                    field: 'Description',
                    title: 'Date & Time',
                    textAlign: 'center',
                    autoHide: false,
                    width: 100,
                    template: function(row) {
                        var datetime = row.Timestamp;
                        var e = new Date(datetime);
                        var myvar = '<span style="width: 110px;"><div class="font-weight-bolder text-primary mb-0">' + shortdate(e) + '</div><div class="text-muted">' + formatAMPM(e) + '</div></span>';

                        return myvar;
                    },
                }, {
                    field: 'Repeated',
                    title: 'Repeated',
                    width: 100,
                    autoHide: true,
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
                    template: function(row) {
                        if (row.Type == "Income") {
                            var test = '<div class="ml-2"><div class="text-dark-75 font-weight-bolder d-block font-size-lg">' + "Rs" + ' ' + numberWithCommas(row.Amount) +
                                '</div><a class="' + format_payment(row.Payment) + ' font-weight-bold">' + row.Payment + '</a></div>';
                            return test
                        } else {
                            return "";
                        }
                    },
                },

                {
                    field: 'Type',
                    title: 'Expense',
                    width: 100,
                    textAlign: 'center',
                    autoHide: false,
                    template: function(row) {
                        if (row.Type == "Expense") {
                            var test = '<div class="ml-2"><div class="text-dark-75 font-weight-bolder d-block font-size-lg">' + "Rs" + ' ' + numberWithCommas(row.Amount) +
                                '</div><a class="' + format_payment(row.Payment) + ' font-weight-bold">' + row.Payment + '</a></div>';
                            return test

                        } else {
                            return "";
                        }
                    },
                }, {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    textAlign: 'center',
                    autoHide: true,
                    template: function(row) {
                        var myvar = ''; // code block
                        var pay = "";
                        switch (row.Payment) {
                            case 'Paid':
                                pay = 'Not Paid';
                                myvar = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + row.Description + '\', \'' + row.Category + '\', \'' + row.Amount + '\', \'' + row.Timestamp + '\', \'' + row.Type + '\', \'' + pay + '\', \'' + row.user + '\')">' +
                                    '<span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Code\Error-circle.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                                    '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                                    '        <rect x="0" y="0" width="24" height="24"/>' +
                                    '        <path d="M12.0355339,10.6213203 L14.863961,7.79289322 C15.2544853,7.40236893 15.8876503,7.40236893 16.2781746,7.79289322 C16.6686989,8.18341751 16.6686989,8.81658249 16.2781746,9.20710678 L13.4497475,12.0355339 L16.2781746,14.863961 C16.6686989,15.2544853 16.6686989,15.8876503 16.2781746,16.2781746 C15.8876503,16.6686989 15.2544853,16.6686989 14.863961,16.2781746 L12.0355339,13.4497475 L9.20710678,16.2781746 C8.81658249,16.6686989 8.18341751,16.6686989 7.79289322,16.2781746 C7.40236893,15.8876503 7.40236893,15.2544853 7.79289322,14.863961 L10.6213203,12.0355339 L7.79289322,9.20710678 C7.40236893,8.81658249 7.40236893,8.18341751 7.79289322,7.79289322 C8.18341751,7.40236893 8.81658249,7.40236893 9.20710678,7.79289322 L12.0355339,10.6213203 Z" fill="#000000"/>' +
                                    '    </g>' +
                                    '</svg><!--end::Svg Icon--></span>' +
                                    '</a>';
                                break;
                            case 'Not Paid':
                                pay = 'Paid';
                                myvar = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + row.Description + '\', \'' + row.Category + '\', \'' + row.Amount + '\', \'' + row.Timestamp + '\', \'' + row.Type + '\', \'' + pay + '\', \'' + row.user + '\')">' +
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
                        var delete_button = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="entry_delete(\'' + row.Timestamp + '\')">' +
                            '        <span class="svg-icon svg-icon-md svg-icon-primary">' +
                            '            <!--begin::Svg Icon | path:assets/media/svg/icons/General/Trash.svg-->' +
                            '            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                            '                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                            '                    <rect x="0" y="0" width="24" height="24"></rect>' +
                            '                    <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>' +
                            '                    <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>' +
                            '                </g>' +
                            '            </svg>' +
                            '            <!--end::Svg Icon-->' +
                            '        </span>' +
                            '    </a>';


                        var edit_button = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3" onclick="edit_entry_modal(\'' + row.Description + '\', \'' + row.Category + '\', \'' + row.Amount + '\', \'' + row.Timestamp + '\', \'' + row.Type + '\', \'' + row.Payment + '\')">' +
                            '        <span class="svg-icon svg-icon-md svg-icon-primary">' +
                            '            <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Write.svg-->' +
                            '            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                            '                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                            '                    <rect x="0" y="0" width="24" height="24"></rect>' +
                            '                    <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path>' +
                            '                    <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>' +
                            '                </g>' +
                            '            </svg>' +
                            '            <!--end::Svg Icon-->' +
                            '        </span>' +
                            '    </a>';
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

    var edit_entry_From_validation = function() {
        FormValidation.formValidation(
            document.getElementById('edit_incex_form'), {
                fields: {
                    form_catergory_2: {
                        validators: {
                            notEmpty: {
                                message: 'Category is requried.'
                            }
                        }
                    },
                    form_description_2: {
                        validators: {
                            notEmpty: {
                                message: 'A description is required.'
                            },
                        }
                    },

                    form_amount_2: {
                        validators: {
                            notEmpty: {
                                message: 'An Amount is required.'
                            },
                        }
                    }

                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Validate fields when clicking the Submit button
                    submitButton: new FormValidation.plugins.SubmitButton(),

                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap({
                        eleInvalidClass: '',
                        eleValidClass: '',
                    })
                }
            }
        ).on('core.form.valid', function() {
            $('#edit_incex_form_modal').modal('toggle');
            var category = document.getElementById('edit_incex_form').querySelector('[name="form_catergory_2"]').value;
            var description = document.getElementById('edit_incex_form').querySelector('[name="form_description_2"]').value;
            var amount = document.getElementById('edit_incex_form').querySelector('[name="form_amount_2"]').value;
            var type = $('input[name="form_radios11_2"]:checked').val();
            var payment = $('input[name="radios11_2"]:checked').val();
            var user_id = document.getElementById("front_page_user_id").value;
            var given_date = $("#kt_datetimepicker_10").find("input").val();
            var timestamp = new Date(given_date);

            update_entry(description, category, amount, timestamp, type, payment, user_id);

        });
    }
    return {
        init: function() {

            read_data();

            edit_entry_From_validation();
            _initDaterangepicker();
        },
    };
}();


jQuery(document).ready(function() {
    var wallet_id = global_data[0];
    selected_entry = global_data[1];
    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');
    start_app.init();
});