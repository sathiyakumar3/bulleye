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
                '<span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Code\Error-circle.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '        <rect x="0" y="0" width="24" height="24"/>' +
                '        <path d="M12.0355339,10.6213203 L14.863961,7.79289322 C15.2544853,7.40236893 15.8876503,7.40236893 16.2781746,7.79289322 C16.6686989,8.18341751 16.6686989,8.81658249 16.2781746,9.20710678 L13.4497475,12.0355339 L16.2781746,14.863961 C16.6686989,15.2544853 16.6686989,15.8876503 16.2781746,16.2781746 C15.8876503,16.6686989 15.2544853,16.6686989 14.863961,16.2781746 L12.0355339,13.4497475 L9.20710678,16.2781746 C8.81658249,16.6686989 8.18341751,16.6686989 7.79289322,16.2781746 C7.40236893,15.8876503 7.40236893,15.2544853 7.79289322,14.863961 L10.6213203,12.0355339 L7.79289322,9.20710678 C7.40236893,8.81658249 7.40236893,8.18341751 7.79289322,7.79289322 C8.18341751,7.40236893 8.81658249,7.40236893 9.20710678,7.79289322 L12.0355339,10.6213203 Z" fill="#000000"/>' +
                '    </g>' +
                '</svg><!--end::Svg Icon--></span>' +
                '</a>';
            break;
        case 'Not Paid':

            var myvar2 = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + obj[user]['Description'] + '\', \'' + obj[user]['Category'] + '\', \'' + obj[user]['Amount'] + '\', \'' + obj[user]['Timestamp'] + '\', \'' + obj[user]['Type'] + '\', \'' + 'Paid' + '\', \'' + obj[user]['user'] + '\', \'' + obj[user]['Repeated'] + '\');update_tabler(\'' + obj[user]['Timestamp'] + '\', \'' + 'Paid' + '\')">' +
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

function enable_tips() {

    document.getElementById("tips_board").style.display = "none";
}

function enable_tips2() {
    tips_enabled = true;
    var expression = 1;
    var default_message = '<div class="card card-custom wave wave-animate-slow wave-primary mb-8 mb-lg-0">' +
        '											<div class="card-body">' +
        '												<div class="d-flex align-items-center p-5">' +
        '													<div class="mr-6">' +
        '														<span class="svg-icon svg-icon-primary svg-icon-4x">' +
        '															<!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Home/Mirror.svg-->' +
        '															<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '																<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '																	<rect x="0" y="0" width="24" height="24"></rect>' +
        '																	<path d="M13,17.0484323 L13,18 L14,18 C15.1045695,18 16,18.8954305 16,20 L8,20 C8,18.8954305 8.8954305,18 10,18 L11,18 L11,17.0482312 C6.89844817,16.5925472 3.58685702,13.3691811 3.07555009,9.22038742 C3.00799634,8.67224972 3.3975866,8.17313318 3.94572429,8.10557943 C4.49386199,8.03802567 4.99297853,8.42761593 5.06053229,8.97575363 C5.4896663,12.4577884 8.46049164,15.1035129 12.0008191,15.1035129 C15.577644,15.1035129 18.5681939,12.4043008 18.9524872,8.87772126 C19.0123158,8.32868667 19.505897,7.93210686 20.0549316,7.99193546 C20.6039661,8.05176407 21.000546,8.54534521 20.9407173,9.09437981 C20.4824216,13.3000638 17.1471597,16.5885839 13,17.0484323 Z" fill="#000000" fill-rule="nonzero"></path>' +
        '																	<path d="M12,14 C8.6862915,14 6,11.3137085 6,8 C6,4.6862915 8.6862915,2 12,2 C15.3137085,2 18,4.6862915 18,8 C18,11.3137085 15.3137085,14 12,14 Z M8.81595773,7.80077353 C8.79067542,7.43921955 8.47708263,7.16661749 8.11552864,7.19189981 C7.75397465,7.21718213 7.4813726,7.53077492 7.50665492,7.89232891 C7.62279197,9.55316612 8.39667037,10.8635466 9.79502238,11.7671393 C10.099435,11.9638458 10.5056723,11.8765328 10.7023788,11.5721203 C10.8990854,11.2677077 10.8117724,10.8614704 10.5073598,10.6647638 C9.4559885,9.98538454 8.90327706,9.04949813 8.81595773,7.80077353 Z" fill="#000000" opacity="0.3"></path>' +
        '																</g>' +
        '															</svg>' +
        '															<!--end::Svg Icon-->' +
        '														</span>' +
        '													</div>' +
        '													<div class="d-flex flex-column">' +
        '														<a href="#" class="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3">Get Started</a>' +
        '														<div class="text-dark-75">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy since the 1500s.</div>' +
        '													</div>' +
        '												</div>' +
        '											</div>' +
        '										</div>';
    // document.getElementById("tips_board").innerHTML = default_message;
    var myvar = '';
    setInterval(function() {

        switch (expression) {
            case 1:
                myvar = '<div class="card card-custom wave wave-animate-fast wave-success">' +
                    '											<div class="card-body">' +
                    '												<div class="d-flex align-items-center p-5">' +
                    '													<div class="mr-6">' +
                    '														<span class="svg-icon svg-icon-success svg-icon-4x">' +
                    '															<!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Design/Sketch.svg-->' +
                    '															<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                    '																<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                    '																	<rect x="0" y="0" width="24" height="24"></rect>' +
                    '																	<polygon fill="#000000" opacity="0.3" points="5 3 19 3 23 8 1 8"></polygon>' +
                    '																	<polygon fill="#000000" points="23 8 12 20 1 8"></polygon>' +
                    '																</g>' +
                    '															</svg>' +
                    '															<!--end::Svg Icon-->' +
                    '														</span>' +
                    '													</div>' +
                    '													<div class="d-flex flex-column">' +
                    '														<a href="#" class="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3">User Guide</a>' +
                    '														<div class="text-dark-75">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy since the 1500s.</div>' +
                    '													</div>' +
                    '												</div>' +
                    '											</div>' +
                    '										</div>';

                expression++;
                break;
            case 2:

                myvar = '<div class="card card-custom wave wave-animate-slow mb-8 mb-lg-0">' +
                    '											<div class="card-body">' +
                    '												<div class="d-flex align-items-center p-5">' +
                    '													<div class="mr-6">' +
                    '														<span class="svg-icon svg-icon-warning svg-icon-4x">' +
                    '															<!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Shopping/Chart-bar1.svg-->' +
                    '															<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                    '																<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                    '																	<rect x="0" y="0" width="24" height="24"></rect>' +
                    '																	<rect fill="#000000" opacity="0.3" x="12" y="4" width="3" height="13" rx="1.5"></rect>' +
                    '																	<rect fill="#000000" opacity="0.3" x="7" y="9" width="3" height="8" rx="1.5"></rect>' +
                    '																	<path d="M5,19 L20,19 C20.5522847,19 21,19.4477153 21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 C4.55228475,3 5,3.44771525 5,4 L5,19 Z" fill="#000000" fill-rule="nonzero"></path>' +
                    '																	<rect fill="#000000" opacity="0.3" x="17" y="11" width="3" height="6" rx="1.5"></rect>' +
                    '																</g>' +
                    '															</svg>' +
                    '															<!--end::Svg Icon-->' +
                    '														</span>' +
                    '													</div>' +
                    '													<div class="d-flex flex-column">' +
                    '														<a href="#" class="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3">Get Started</a>' +
                    '														<div class="text-dark-75">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy since the 1500s.</div>' +
                    '													</div>' +
                    '												</div>' +
                    '											</div>' +
                    '										</div>';

                expression++;
                break;

            case 3:

                var myvar = '<div class="card card-custom wave wave-animate-slower mb-8 mb-lg-0">' +
                    '											<div class="card-body">' +
                    '												<div class="d-flex align-items-center p-5">' +
                    '													<div class="mr-6">' +
                    '														<span class="svg-icon svg-icon-success svg-icon-4x">' +
                    '															<!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Shopping/Settings.svg-->' +
                    '															<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                    '																<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                    '																	<rect opacity="0.200000003" x="0" y="0" width="24" height="24"></rect>' +
                    '																	<path d="M4.5,7 L9.5,7 C10.3284271,7 11,7.67157288 11,8.5 C11,9.32842712 10.3284271,10 9.5,10 L4.5,10 C3.67157288,10 3,9.32842712 3,8.5 C3,7.67157288 3.67157288,7 4.5,7 Z M13.5,15 L18.5,15 C19.3284271,15 20,15.6715729 20,16.5 C20,17.3284271 19.3284271,18 18.5,18 L13.5,18 C12.6715729,18 12,17.3284271 12,16.5 C12,15.6715729 12.6715729,15 13.5,15 Z" fill="#000000" opacity="0.3"></path>' +
                    '																	<path d="M17,11 C15.3431458,11 14,9.65685425 14,8 C14,6.34314575 15.3431458,5 17,5 C18.6568542,5 20,6.34314575 20,8 C20,9.65685425 18.6568542,11 17,11 Z M6,19 C4.34314575,19 3,17.6568542 3,16 C3,14.3431458 4.34314575,13 6,13 C7.65685425,13 9,14.3431458 9,16 C9,17.6568542 7.65685425,19 6,19 Z" fill="#000000"></path>' +
                    '																</g>' +
                    '															</svg>' +
                    '															<!--end::Svg Icon-->' +
                    '														</span>' +
                    '													</div>' +
                    '													<div class="d-flex flex-column">' +
                    '														<a href="#" class="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3">Tutorials</a>' +
                    '														<div class="text-dark-75">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy since the 1500s.</div>' +
                    '													</div>' +
                    '												</div>' +
                    '											</div>' +
                    '										</div>';
                expression++;
                break;
            case 4:

                myvar = default_message;
                expression = 1;
                break;

            default:
                expression = 1;
                // code block
        }

        //    document.getElementById("tips_board").innerHTML = myvar;
    }, 10 * 1000);

}



function data_for_pie(data) {
    var data_set = [];
    var cat_set = [];

    Object.keys(data).sort().map(function(key, index) {
        data_set.push(data[key]);
        cat_set.push(key);

    });

    return [data_set, cat_set]

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

function paid_format(flag, html_tag) {
    var text = "";
    if (flag) {
        text = "Not Paid*";
    } else {
        text = "Paid"
    };
    document.getElementById(html_tag).innerText = text;
    document.getElementById(html_tag).className = format_payment(text) + " font-weight-bold";

}

var start_app = function() {
    var read_data = function(from, to, first_time) {

        selected_start = from;
        selected_end = to;
        var d_netincome = [];
        var d_income = [];
        var d_expense = [];
        var d_re_income = [];
        var d_re_expense = [];

        var d_on_income = [];
        var d_on_expense = [];
        var data4 = [];
        var data5 = [];

        var cat = [];
        var cat_b = [];
        var cat_2 = [];
        var cat_3 = [];
        var user_profile = [];
        var user_sum = 0;
        var counter = 0;
        var sum_expense = 0;
        var sum_income = 0;
        var re_sum_expense = 0;
        var re_sum_income = 0;
        var not_paid_sum = 0;
        var first_day = "";
        var last_day = "";
        var promises = [];
        var net_pec = 0;
        var rc_net_pec = 0;

        var p_i_flag = false;
        var p_e_flag = false;
        var up_i_flag = false;
        var up_e_flag = false;
        var p_counter = 0;
        var up_counter = 0;

        wallet_Ref.orderBy("last_updated").get()
            .then((querySnapshot) => {
                var items_counter = 0;
                querySnapshot.forEach((doc) => {
                    var items = querySnapshot.size;
                    var sum_income2 = 0;
                    var sum_expense2 = 0;

                    wallet_Ref.doc(doc.id).onSnapshot(function(doc) {
                        items_counter++;
                        var arr = doc.data();
                        var rec_name = doc.id;
                        delete arr["last_updated"];
                        var re_sum_expense2 = 0;
                        var re_sum_income2 = 0;
                        var on_sum_expense2 = 0;
                        var on_sum_income2 = 0;
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


                                        if (!cat_b.hasOwnProperty([REC_category])) {
                                            cat_b[REC_category] = 0;
                                        }
                                        if (!cat_3.hasOwnProperty([REC_user])) {
                                            cat_3[REC_user] = 0;
                                        }

                                        if (REC_payment == 'Paid') {
                                            if (REC_type == 'Expense') {
                                                sum_expense = sum_expense + Number(REC_amount);
                                                sum_expense2 = sum_expense2 + Number(REC_amount);
                                                cat_b[REC_category] = Number(cat_b[REC_category]) + Number(REC_amount);
                                                cat_3[REC_user] = Number(cat_3[REC_user]) + Number(REC_amount);
                                            } else {
                                                sum_income = sum_income + Number(REC_amount);
                                                sum_income2 = sum_income2 + Number(REC_amount);
                                                cat_2[REC_category] = Number(cat_b[REC_category]) + Number(REC_amount);
                                            }
                                        } else {
                                            not_paid_sum = not_paid_sum + Number(REC_amount);
                                        }



                                        if (REC_repeated != 'Once') {
                                            if (REC_type == 'Expense') {
                                                re_sum_expense = re_sum_expense + Number(REC_amount);
                                                re_sum_expense2 = re_sum_expense2 + Number(REC_amount);
                                                if (REC_payment == 'Not Paid') {
                                                    p_e_flag = true;
                                                }
                                            } else {
                                                re_sum_income = re_sum_income + Number(REC_amount);
                                                re_sum_income2 = re_sum_income2 + Number(REC_amount);
                                                if (REC_payment == 'Not Paid') {
                                                    p_i_flag = true;
                                                }
                                            }
                                            up_counter++;
                                        } else {
                                            if (REC_type == 'Expense') {
                                                on_sum_expense2 = on_sum_expense2 + Number(REC_amount);
                                                if (REC_payment == 'Not Paid') {
                                                    up_e_flag = true;
                                                }
                                            } else {
                                                on_sum_income2 = on_sum_income2 + Number(REC_amount);
                                                if (REC_payment == 'Not Paid') {
                                                    up_i_flag = true;
                                                }
                                            }
                                            p_counter++;
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
                            d_income.push(sum_income2);
                            d_expense.push(sum_expense2);
                            d_netincome.push(sum_income2 - sum_expense2);


                            d_re_income.push(re_sum_income2);
                            d_re_expense.push(re_sum_expense2);



                            d_on_income.push(on_sum_income2);
                            d_on_expense.push(on_sum_expense2);



                            cat.push(rec_name);




                            if (items_counter == items) {


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


                                if (document.getElementById("not_paid_text") !== null) {
                                    document.getElementById("not_paid_text").innerHTML = 'Please note that the dashboard is generated based on all the paid transactions only.<br>There is a sum of <b class="text-danger"> Rs ' + numberWithCommas(not_paid_sum) + '</b> yet to tbe paid.'

                                }

                                document.getElementById("net_percent").innerHTML = net_pec + " %";
                                document.getElementById("net_percent_bar").style.width = net_pec + "%";


                                document.getElementById("sum_net_m").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
                                document.getElementById("number_items").innerText = counter + " Entries";

                                document.getElementById("end_date").innerText = shortdateclean(first_day);
                                document.getElementById("start_date").innerText = shortdateclean(last_day);


                                process_row(cat_b, "testtt", sum_expense, user_profile, 1);
                                process_row(cat_2, "testtt2", sum_income, user_profile, 1);
                                if (user_sum > 1) {
                                    document.getElementById("user_list_md").innerText = user_sum + " Users";
                                } else {
                                    document.getElementById("user_list_md").innerText = user_sum + " User";
                                }

                                process_row(cat_3, "testtt3", sum_expense, user_profile, 2);
                                document.getElementById("image_list").innerHTML = user_circle_gen(user_profile);
                                var data66 = data_for_pie(cat_2);
                                piechart_123(data66[0], data66[1]);
                                tabler = $.extend(tabler, values);
                                tabler = remove_not_paid(tabler);
                                process_row(tabler, "table_23", '', '', 3);



                                document.getElementById("p_income").innerText = " Rs " + numberWithCommas(re_sum_income);
                                document.getElementById("p_expense").innerText = " Rs " + numberWithCommas(re_sum_expense);
                                document.getElementById("p_net").innerText = " Rs " + numberWithCommas(re_sum_income - re_sum_expense);

                                document.getElementById("up_income").innerText = " Rs " + numberWithCommas(sum_income - re_sum_income);
                                document.getElementById("up_expense").innerText = " Rs " + numberWithCommas(sum_expense - re_sum_expense);
                                document.getElementById("up_net").innerText = " Rs " + numberWithCommas((sum_income - re_sum_income) - (sum_expense - re_sum_expense));
                                var p_percentage = Math.round((re_sum_income - re_sum_expense) / (sum_income - sum_expense) * 100)

                                document.getElementById("p_pecent_bar").style.width = p_percentage + "%";
                                document.getElementById("up_pecent_bar").style.width = (100 - p_percentage) + "%";

                                document.getElementById("p_pecent_bar").className = 'progress-bar ' + format_progress_bar(p_percentage);
                                document.getElementById("up_pecent_bar").className = 'progress-bar ' + format_progress_bar(p_percentage - 100);



                                document.getElementById("p_pecent").innerText = p_percentage + " %";
                                document.getElementById("up_pecent").innerText = (100 - p_percentage) + " %";


                                document.getElementById("p_entires").innerText = p_counter + ' entires';
                                document.getElementById("up_entires").innerText = up_counter + ' entires';

                                paid_format(p_i_flag, "p_i_flag");
                                paid_format(p_e_flag, "p_e_flag");
                                paid_format(up_i_flag, "up_i_flag");
                                paid_format(up_e_flag, "up_e_flag");

                                if (first_time) {
                                    to = new Date(last_day.getFullYear(), last_day.getMonth() + 1, 0);;
                                    _initDaterangepicker(first_day, to);
                                    _init_main_chart_2(d_netincome, d_re_income, cat);
                                    _init_main_chart_3(d_on_income, d_re_income, d_income, cat);
                                    _init_main_chart_4(d_on_expense, d_re_expense, d_expense, cat);
                                    _init_main_chart(d_income, d_expense, cat); // CORREC                                


                                    from = first_day;
                                    //  console.log(new Date(last_day));
                                }

                                if (not_paid_sum == 0) {
                                    // enable_tips();

                                    document.getElementById("tips_board").style.display = "none";
                                } else {
                                    document.getElementById("tips_board").style.display = "block";
                                }
                                var today2 = new Date();

                                var difference = today2 - from;
                                var diff_days_1 = Math.ceil(difference / (1000 * 3600 * 24));
                                var net_income_rate = (sum_income - sum_expense) / diff_days_1;
                                var difference2 = to - today2;
                                var diff_days_2 = Math.ceil(difference2 / (1000 * 3600 * 24));
                                var net_income_pred = Math.round((diff_days_2 * net_income_rate) + (sum_income - sum_expense));
                                document.getElementById("predict").innerText = " Rs " + numberWithCommas(net_income_pred);
                                //  document.getElementById("range_id").innerText ="By "+ shortdateclean(to);
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

            document.getElementById("range_id").innerText = $('#kt_dashboard_daterangepicker_title').html() + " " + $('#kt_dashboard_daterangepicker_date').html();

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
    var piechart_123 = function(data_set, cat_set) {
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


        generate_chart("kt_pie_chart_cat", options);
    }
    var _init_main_chart_2 = function(data, data1, cat) {

        var options = {
            series: [{
                name: 'Balance',
                data: data
            }, ],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: ['30%'],
                    endingShape: 'rounded'
                },
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
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
            fill: {
                opacity: 1
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
            colors: [KTApp.getSettings()['colors']['theme']['base']['success'], KTApp.getSettings()['colors']['gray']['gray-300']],
            grid: {
                borderColor: KTApp.getSettings()['colors']['gray']['gray-200'],
                strokeDashArray: 4,
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            }
        };
        generate_chart("kt_main_chart_2", options)
    }
    var _init_main_chart_3 = function(data, data1, data2, cat) {

        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';

        var options = {
            series: [{
                name: 'Occational',
                type: 'column',
                data: data
            }, {
                name: 'Recurring',
                type: 'column',
                data: data1
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
    var _init_main_chart_4 = function(data, data1, data2, cat) {

        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';

        var options = {
            series: [{
                name: 'Occational',
                type: 'column',
                data: data
            }, {
                name: 'Recurring',
                type: 'column',
                data: data1
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
                data: data1
            }, {
                name: 'Expense',
                data: data2
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