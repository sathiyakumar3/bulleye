function myselected() {
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

function myselected3() {
    var category = document.getElementById('edit_cat_selec').value;  
    document.getElementById('sel_icon_add').innerHTML = '<svg><use xlink:href="#'+get_cat_ic(category)+ '"></use></svg>';
}

function update_entry(description, category, amount, timestamp2, type, payment, user, repeat) {
    return new Promise(function(resolve, reject) {
        var timestamp = new Date(timestamp2);
        var value = {
            [timestamp]: {
                "user": user,
                "Description": description,
                "Category": category,
                "Type": type,
                "Payment": payment,
                "Amount": amount,
                "Repeated": repeat,
            },
            last_updated: timestamp
        };
        var entry_id = monthts(timestamp);
        updateoptdata(wallet_Ref, entry_id, value).then(function() {
            resolve('sucess');
        }).catch((error) => {
            if (error == 'Document doesn\'t exist.') {
                setoptdata(wallet_Ref, entry_id, value).then(function() {
                    resolve('sucess');
                }).catch((error) => {
                    reject(error);
                });
            }
        });
    });
}

function sendtoupdate(description, category, amount, timestamp, type, payment, user_id, repeat) {
    update_entry(description, category, amount, timestamp, type, payment, user_id, repeat).then(function() {
        start_app.refresh();
    }).catch((error) => {
        console.log(error);
    });
}


function edit_entry_modal(description, category, amount, timestamp, type, payment) {
    $('#edit_incex_form_modal').modal('toggle');
    $('#edit_cat_selec').selectpicker('val', category);
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
    $('#kt_datetimepicker_10').datetimepicker({ defaultDate: new Date(timestamp), disable: true });


    document.getElementById('title_33').innerText = "Edit Entry"
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

    $('#kt_datetimepicker_10').datetimepicker({ defaultDate: new Date(), enable: true });
    document.getElementById('title_33').innerText = "Add to Wallet"
}

function name_intials(str) {
    var acronym;
    if (str.trim().indexOf(' ') != -1) {
        var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
        acronym = matches.join('').substring(0, 2)
    } else {
        acronym = str.substring(0, 2)
    }
    return acronym;
}

function get_cat_icon(opt) {
    var myvar = "";

    switch (opt) {
        case "Shopping":

            myvar = '<div class="symbol symbol-45 symbol-light-info mr-4 flex-shrink-0">' +
                '                                            <div class="symbol-label">' +
                '                                                <span class="svg-icon svg-icon-lg svg-icon-info">' +
                '                                                    <!--begin::Svg Icon | path:assets/media/svg/icons/Shopping/Cart3.svg-->' +
                '                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '                                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '                                                            <rect x="0" y="0" width="24" height="24"></rect>' +
                '                                                            <path d="M12,4.56204994 L7.76822128,9.6401844 C7.4146572,10.0644613 6.7840925,10.1217854 6.3598156,9.76822128 C5.9355387,9.4146572 5.87821464,8.7840925 6.23177872,8.3598156 L11.2317787,2.3598156 C11.6315738,1.88006147 12.3684262,1.88006147 12.7682213,2.3598156 L17.7682213,8.3598156 C18.1217854,8.7840925 18.0644613,9.4146572 17.6401844,9.76822128 C17.2159075,10.1217854 16.5853428,10.0644613 16.2317787,9.6401844 L12,4.56204994 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>' +
                '                                                            <path d="M3.5,9 L20.5,9 C21.0522847,9 21.5,9.44771525 21.5,10 C21.5,10.132026 21.4738562,10.2627452 21.4230769,10.3846154 L17.7692308,19.1538462 C17.3034221,20.271787 16.2111026,21 15,21 L9,21 C7.78889745,21 6.6965779,20.271787 6.23076923,19.1538462 L2.57692308,10.3846154 C2.36450587,9.87481408 2.60558331,9.28934029 3.11538462,9.07692308 C3.23725479,9.02614384 3.36797398,9 3.5,9 Z M12,17 C13.1045695,17 14,16.1045695 14,15 C14,13.8954305 13.1045695,13 12,13 C10.8954305,13 10,13.8954305 10,15 C10,16.1045695 10.8954305,17 12,17 Z" fill="#000000"></path>' +
                '                                                        </g>' +
                '                                                    </svg>' +
                '                                                    <!--end::Svg Icon-->' +
                '                                                </span>' +
                '                                            </div>' +
                '                                        </div>';


            break;
        case "Meals":





            myvar = '<div class="symbol symbol-45 symbol-light-info mr-4 flex-shrink-0">' +
                '                                            <div class="symbol-label">' +
                '                                                <span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Cooking\KnifeAndFork2.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '                                                        <rect x="0" y="0" width="24" height="24"/>' +
                '                                                        <path d="M3.98842709,3.05999994 L11.0594949,10.1310678 L8.23106778,12.9594949 L3.98842709,8.71685419 C2.42632992,7.15475703 2.42632992,4.62209711 3.98842709,3.05999994 Z" fill="#000000"/>' +
                '                                                        <path d="M17.7539614,3.90710683 L14.8885998,7.40921548 C14.7088587,7.62889898 14.7248259,7.94903916 14.9255342,8.14974752 C15.1262426,8.35045587 15.4463828,8.36642306 15.6660663,8.18668201 L19.1681749,5.32132039 L19.8752817,6.02842717 L17.0099201,9.53053582 C16.830179,9.75021933 16.8461462,10.0703595 17.0468546,10.2710679 C17.2475629,10.4717762 17.5677031,10.4877434 17.7873866,10.3080024 L21.2894953,7.44264073 L21.9966021,8.14974752 L18.8146215,11.331728 C17.4477865,12.6985631 15.2317091,12.6985631 13.8648741,11.331728 C12.4980391,9.96489301 12.4980391,7.74881558 13.8648741,6.38198056 L17.0468546,3.20000005 L17.7539614,3.90710683 Z" fill="#000000"/>' +
                '                                                        <path d="M11.0753788,13.9246212 C11.4715437,14.3207861 11.4876245,14.9579589 11.1119478,15.3736034 L6.14184561,20.8724683 C5.61370242,21.4567999 4.71186338,21.5023497 4.12753173,20.9742065 C4.10973311,20.9581194 4.09234327,20.9415857 4.0753788,20.9246212 C3.51843234,20.3676747 3.51843234,19.4646861 4.0753788,18.9077397 C4.09234327,18.8907752 4.10973311,18.8742415 4.12753173,18.8581544 L9.62639662,13.8880522 C10.0420411,13.5123755 10.6792139,13.5284563 11.0753788,13.9246212 Z" fill="#000000" opacity="0.3"/>' +
                '                                                        <path d="M13.0754022,13.9246212 C13.4715671,13.5284563 14.1087399,13.5123755 14.5243844,13.8880522 L20.0232493,18.8581544 C20.0410479,18.8742415 20.0584377,18.8907752 20.0754022,18.9077397 C20.6323487,19.4646861 20.6323487,20.3676747 20.0754022,20.9246212 C20.0584377,20.9415857 20.0410479,20.9581194 20.0232493,20.9742065 C19.4389176,21.5023497 18.5370786,21.4567999 18.0089354,20.8724683 L13.0388332,15.3736034 C12.6631565,14.9579589 12.6792373,14.3207861 13.0754022,13.9246212 Z" fill="#000000" opacity="0.3"/>' +
                '                                                    </g>' +
                '                                                </svg><!--end::Svg Icon--></span>' +
                '                                            </div>' +
                '                                        </div>';


            break;
        case "Lodging":

            myvar = '<div class="symbol symbol-60 symbol-light-info mr-4 flex-shrink-0">' +
                '                                            <div class="symbol-label">' +
                '                                                <span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Home\Home.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '                                                        <rect x="0" y="0" width="24" height="24"/>' +
                '                                                        <path d="M3.95709826,8.41510662 L11.47855,3.81866389 C11.7986624,3.62303967 12.2013376,3.62303967 12.52145,3.81866389 L20.0429,8.41510557 C20.6374094,8.77841684 21,9.42493654 21,10.1216692 L21,19.0000642 C21,20.1046337 20.1045695,21.0000642 19,21.0000642 L4.99998155,21.0000673 C3.89541205,21.0000673 2.99998155,20.1046368 2.99998155,19.0000673 L2.99999828,10.1216672 C2.99999935,9.42493561 3.36258984,8.77841732 3.95709826,8.41510662 Z M10,13 C9.44771525,13 9,13.4477153 9,14 L9,17 C9,17.5522847 9.44771525,18 10,18 L14,18 C14.5522847,18 15,17.5522847 15,17 L15,14 C15,13.4477153 14.5522847,13 14,13 L10,13 Z" fill="#000000"/>' +
                '                                                    </g>' +
                '                                                </svg><!--end::Svg Icon--></span>' +
                '                                            </div>' +
                '                                        </div>';


            break;
        case "Friends":

            myvar = '<div class="symbol symbol-45 symbol-light-info mr-4 flex-shrink-0">' +
                '                                            <div class="symbol-label">' +
                '                                                <span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Communication\Group.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '                                                        <polygon points="0 0 24 0 24 24 0 24"/>' +
                '                                                        <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>' +
                '                                                        <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero"/>' +
                '                                                    </g>' +
                '                                                </svg><!--end::Svg Icon--></span>' +
                '                                            </div>' +
                '                                        </div>';


            break;
        case "Family":


            myvar = '<div class="symbol symbol-45 symbol-light-info mr-4 flex-shrink-0">' +
                '                                            <div class="symbol-label">' +
                '                                                <span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\General\Star.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '                                                        <polygon points="0 0 24 0 24 24 0 24"/>' +
                '                                                        <path d="M12,18 L7.91561963,20.1472858 C7.42677504,20.4042866 6.82214789,20.2163401 6.56514708,19.7274955 C6.46280801,19.5328351 6.42749334,19.309867 6.46467018,19.0931094 L7.24471742,14.545085 L3.94038429,11.3241562 C3.54490071,10.938655 3.5368084,10.3055417 3.92230962,9.91005817 C4.07581822,9.75257453 4.27696063,9.65008735 4.49459766,9.61846284 L9.06107374,8.95491503 L11.1032639,4.81698575 C11.3476862,4.32173209 11.9473121,4.11839309 12.4425657,4.36281539 C12.6397783,4.46014562 12.7994058,4.61977315 12.8967361,4.81698575 L14.9389263,8.95491503 L19.5054023,9.61846284 C20.0519472,9.69788046 20.4306287,10.2053233 20.351211,10.7518682 C20.3195865,10.9695052 20.2170993,11.1706476 20.0596157,11.3241562 L16.7552826,14.545085 L17.5353298,19.0931094 C17.6286908,19.6374458 17.263103,20.1544017 16.7187666,20.2477627 C16.5020089,20.2849396 16.2790408,20.2496249 16.0843804,20.1472858 L12,18 Z" fill="#000000"/>' +
                '                                                    </g>' +
                '                                                </svg><!--end::Svg Icon--></span>' +
                '                                            </div>' +
                '                                        </div>';


            break;
        default:
            myvar = '<div class="symbol symbol-45 symbol-light-info mr-4 flex-shrink-0">' +
                '                                            <div class="symbol-label">' +
                '                                                <span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\General\Star.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '                                                        <polygon points="0 0 24 0 24 24 0 24"/>' +
                '                                                        <path d="M12,18 L7.91561963,20.1472858 C7.42677504,20.4042866 6.82214789,20.2163401 6.56514708,19.7274955 C6.46280801,19.5328351 6.42749334,19.309867 6.46467018,19.0931094 L7.24471742,14.545085 L3.94038429,11.3241562 C3.54490071,10.938655 3.5368084,10.3055417 3.92230962,9.91005817 C4.07581822,9.75257453 4.27696063,9.65008735 4.49459766,9.61846284 L9.06107374,8.95491503 L11.1032639,4.81698575 C11.3476862,4.32173209 11.9473121,4.11839309 12.4425657,4.36281539 C12.6397783,4.46014562 12.7994058,4.61977315 12.8967361,4.81698575 L14.9389263,8.95491503 L19.5054023,9.61846284 C20.0519472,9.69788046 20.4306287,10.2053233 20.351211,10.7518682 C20.3195865,10.9695052 20.2170993,11.1706476 20.0596157,11.3241562 L16.7552826,14.545085 L17.5353298,19.0931094 C17.6286908,19.6374458 17.263103,20.1544017 16.7187666,20.2477627 C16.5020089,20.2849396 16.2790408,20.2496249 16.0843804,20.1472858 L12,18 Z" fill="#000000"/>' +
                '                                                    </g>' +
                '                                                </svg><!--end::Svg Icon--></span>' +
                '                                            </div>' +
                '                                        </div>';
            break;
    }

    return myvar;
}

function getrandomstate() {
    var stateNo = KTUtil.getRandomInt(0, 7);
    var states = [
        'success',
        'primary',
        'danger',
        'success',
        'warning',
        'dark',
        'primary',
        'info'
    ];

    return states[stateNo];
}

function format_repeat(freq) {
    switch (freq) {
        case 'Monthly':
            return '<span class="label label-lg font-weight-bold label-light-success label-inline">Monthly</span>';
            break;
        case 'Weekly':
            return '<span class="label label-lg font-weight-bold label-light-danger label-inline">Weekly</span>';
            break;
        case 'Daily':
            return '<span class="label label-lg font-weight-bold label-light-primary label-inline">Daily</span>';
            break;
        case 'Yearly':
            return '<span class="label label-lg font-weight-bold label-light-success label-inline">Yearly</span>';
            break;
        case 'Quaterly':
            return '<span class="label label-lg font-weight-bold label-light-info label-inline">Quaterly</span>';
            break;
        case 'Once':
            return '<span class="label label-lg font-weight-bold label-light-danger label-inline">Once</span>';
            break;
        case 'On Hold':
            return '<span class="label label-lg font-weight-bold label-light-warning label-inline">On Hold</span>';
            break;
        default:
            return '<span class="label label-lg font-weight-bold label-light-danger label-inline">Once</span>';
    }
}

function format_payment(pay) {
    switch (pay) {
        case 'Paid':
            return 'text-success';
            break;
        case 'Not Paid':
            return 'text-danger';
            break;
        default:
            return 'text-danger';
    }
}

function format_progress_bar(pecentage) {
    var state = 'bg-info';
    if (pecentage > 75) {
        state = 'bg-error';
    } else if (pecentage > 50) {
        state = 'bg-warning';
    } else if (pecentage > 25) {
        state = 'bg-success';
    } else {
        state = 'bg-info';
    }
    return state
}


function sort_obj(obj, key) {
    obj.sort(function(a, b) {
        var c = new Date(a[key]);
        var d = new Date(b[key]);
        return c - d;
    });
    return obj;
}

var cat_icon_list = {};
var newar = [];

function cat2combo(wallet_id) {

    document.getElementById("edit_cat_selec").innerHTML = "";
    var wallet_base_Ref = db.collection("wallets");
    var select = document.getElementById('edit_cat_selec');
    getoptdata(wallet_base_Ref, wallet_id).then((function(doc) {
        cat_icon_list = doc.categories;
        console.log(doc);
        for (let i = 0; i < cat_icon_list.length; i++) {
            newar[cat_icon_list[i]['name']] = cat_icon_list[i];
            var opt = document.createElement('option');
            opt.value = cat_icon_list[i]['name'];
            opt.innerHTML = cat_icon_list[i]['name'];
            select.appendChild(opt);
        }
    })).catch((error) => {
        console.error(error);
    });
}

function get_cat_ic(name) {
    if (newar.hasOwnProperty(name)) {
        return newar[name]['icon'];
    } else {
        return 'garden'
    }
}

function user_circle_gen(user_profile) {
    var html_div = "";
    Object.keys(user_profile).sort().map(function(key, index) {
        var myvar = '<div class="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="' + user_profile[key]['user_name'] + '">' +
            '<img alt="Pic" src="' + user_profile[key]['photo_url'] + '">' +
            '</div>';
        html_div = html_div + myvar;
    });
    return html_div
}

/////////////////////////////////////////////////////////////////
/* Table Elements */
////////////////////////////////////////////////////////////////

function dnt4table(datetime) {

    var e = new Date(datetime);
    var html_div = '<span style="width: 110px;"><div class="font-weight-bolder text-primary mb-0">' + shortdate(e) + '</div><div class="text-muted">' + formatAMPM(e) + '</div></span>';
    return html_div
}

function icon_nd_name(icon, name) {
    var html_div =
        '<div class="d-flex align-items-center">' +
        '<div class="symbol symbol-50 symbol-light mr-4">' +
        '<span class="symbol-label">' +
        '<span class="svg-icon svg-icon-2x svg-icon-success">' +
        '<svg><use xlink:href="#' + icon + '"></use></svg>' +
        '</span>' +
        '</span>' +
        '</div>' +
        ' <div>' +
        '<a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">' + name + '</a>' +
        '</div>' +
        '</div>';
    return html_div;
}


function icon_nd_name_nd_description(icon, name, description) {
    var html_div =
        '<div class="d-flex align-items-center">' +
        '<div class="symbol symbol-50 symbol-light mr-4">' +
        '<span class="symbol-label">' +
        '<span class="svg-icon svg-icon-2x svg-icon-success">' +
        '<svg><use xlink:href="#' + icon + '"></use></svg>' +
        '</span>' +
        '</span>' +
        '</div>' +
        '<div class="ml-2">' +
        '<div class="text-dark-75 font-weight-bold line-height-sm">' + name + '</div>' +
        '<a href="#" class="font-size-sm text-dark-50 text-hover-primary">' + description + '</a>' +
        '</div></div>';
    return html_div;
}


function icon_nd_photo_name_email(photo, username, email) {
    var icon = "";
    if (photo == 'none') {
        icon = ' <div class="symbol symbol-40 symbol-' + getrandomstate() + ' flex-shrink-0">' +
            '<div class="symbol-label">' + username.substring(0, 1) + '</div></div>';

    } else {
        icon = '<div class="symbol symbol-40 flex-shrink-0">' +
            '<div class="symbol-label" style="background-image: url(' + photo + ')"></div>' +
            '</div>';
    }
    var ending = ' <div class="ml-2">' +
        '<div class="text-dark-75 font-weight-bold line-height-sm">' + username + '</div>' +
        '<a href="#" class="font-size-sm text-dark-50 text-hover-primary">' +
        email + '</a>\
    </div>\</div>';
    return ('<div class="d-flex align-items-center">' + icon + ending);
}

function payment_status_fomt(type, payment, amount, int_type) {
    if (type == int_type) {
        return '<div class="ml-2"><div class="text-dark-75 font-weight-bolder d-block font-size-lg">' + "Rs" + ' ' + numberWithCommas(amount) +
            '</div><a class="' + format_payment(payment) + ' font-weight-bold">' + payment + '</a></div>';
    } else {
        return ""
    }

}

function percentage_form(value, total) {
    var pecentage = Math.round((value / total) * 100);
    var html_div = '<div class="d-flex flex-column w-100 mr-2">' +
        '<div class="d-flex align-items-center justify-content-between mb-2">' +
        '<span class="text-muted mr-2 font-size-sm font-weight-bold">' + pecentage + '%</span>' +
        '<span class="text-muted font-size-sm font-weight-bold">Rs ' + numberWithCommas(value) + '</span>' +
        '</div>' +
        '<div class="progress progress-xs w-100">' +
        '<div class="progress-bar ' + format_progress_bar(pecentage) + '" role="progressbar" style="width: ' + pecentage + '%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>' +
        '</div>' +
        '</div>';
    return html_div
}

function dummy_button() {
    var html_div = '<a href="#" class="btn btn-icon btn-light btn-sm">' +
        '<span class="svg-icon svg-icon-md svg-icon-success">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Arrow-right.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '<polygon points="0 0 24 0 24 24 0 24" />' +
        '<rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1" />' +
        '<path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)" />' +
        '</g>' +
        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' + '</a>';
    return html_div
}

function paid_nt_paid_button(payment, description, type, category, amount, timestamp, user, repeat) {
    switch (payment) {
        case 'Paid':
            var pay = 'Not Paid';
            return '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="sendtoupdate(\'' + description + '\', \'' + category + '\', \'' + amount + '\', \'' + timestamp + '\', \'' + type + '\', \'' + pay + '\', \'' + user + '\', \'' + repeat + '\')">' +
                '<span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Code\Error-circle.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '        <rect x="0" y="0" width="24" height="24"/>' +
                '        <path d="M12.0355339,10.6213203 L14.863961,7.79289322 C15.2544853,7.40236893 15.8876503,7.40236893 16.2781746,7.79289322 C16.6686989,8.18341751 16.6686989,8.81658249 16.2781746,9.20710678 L13.4497475,12.0355339 L16.2781746,14.863961 C16.6686989,15.2544853 16.6686989,15.8876503 16.2781746,16.2781746 C15.8876503,16.6686989 15.2544853,16.6686989 14.863961,16.2781746 L12.0355339,13.4497475 L9.20710678,16.2781746 C8.81658249,16.6686989 8.18341751,16.6686989 7.79289322,16.2781746 C7.40236893,15.8876503 7.40236893,15.2544853 7.79289322,14.863961 L10.6213203,12.0355339 L7.79289322,9.20710678 C7.40236893,8.81658249 7.40236893,8.18341751 7.79289322,7.79289322 C8.18341751,7.40236893 8.81658249,7.40236893 9.20710678,7.79289322 L12.0355339,10.6213203 Z" fill="#000000"/>' +
                '    </g>' +
                '</svg><!--end::Svg Icon--></span>' +
                '</a>';
            break;
        case 'Not Paid':
            var pay = 'Paid';
            return '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="sendtoupdate(\'' + description + '\', \'' + category + '\', \'' + amount + '\', \'' + timestamp + '\', \'' + type + '\', \'' + pay + '\', \'' + user + '\', \'' + repeat + '\')">' +
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
}

function delete_button1(timestamp) {
    return '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="entry_delete(\'' + timestamp + '\')">' +
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
}

function edit_button3(payment, description, type, category, amount, timestamp) {
    return '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3" onclick="edit_entry_modal(\'' + description + '\', \'' + category + '\', \'' + amount + '\', \'' + timestamp + '\', \'' + type + '\', \'' + payment + '\')">' +
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
}