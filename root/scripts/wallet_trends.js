"use strict";
var tabler = [];
var wallet_Ref = '';
var chart = "";
var element = "";

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
                    html_div = html_div + get_cat_div(keysSorted[index], obj[keysSorted[index]], total);
                    break;
                case 2:
                    html_div = html_div + get_user_div(keysSorted[index], obj[keysSorted[index]], total, user_profile);
                    break;
                case 3:
                    html_div = html_div + build_table(key, obj);
                    break;
                case 4:
                    html_div = html_div + user_circle_gen(keysSorted[index], obj[keysSorted[index]], total, user_profile);
                    break;
                default:
                    // code block
            }
        }
    });

    document.getElementById(html).innerHTML = html_div;

}

function get_cat_div(cat, value, total) {
    var pecentage = Math.round((value / total) * 100);

    var myvar = '<tr>' +
        '    <th class="pl-0 py-5">' + get_cat_icon(cat) +
        '    </th>' +
        '    <td class="pl-0">' +
        '        <a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">' + cat + '</a>' +
        '        <span class="text-muted font-weight-bold d-block">Amazing Templates</span>' +
        '    </td>' +
        '    <td>' +
        '        <div class="d-flex flex-column w-100 mr-2">' +
        '            <div class="d-flex align-items-center justify-content-between mb-2">' +
        '                <span class="text-muted mr-2 font-size-sm font-weight-bold">' + pecentage + '%</span>' +
        '                <span class="text-muted font-size-sm font-weight-bold">Rs ' + numberWithCommas(value) + '</span>' +
        '            </div>' +
        '            <div class="progress progress-xs w-100">' +
        '                <div class="progress-bar ' + format_progress_bar(pecentage) + '" role="progressbar" style="width: ' + pecentage + '%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>' +
        '            </div>' +
        '        </div>' +
        '    </td>' +
        '    <td class="text-right pr-0">' +
        '        <a href="#" class="btn btn-icon btn-light btn-sm">' +
        '                                                        <span class="svg-icon svg-icon-md svg-icon-success">' +
        '                                                            <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Arrow-right.svg-->' +
        '                                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '                                                                    <polygon points="0 0 24 0 24 24 0 24" />' +
        '                                                                    <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1" />' +
        '                                                                    <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)" />' +
        '                                                                </g>' +
        '                                                            </svg>' +
        '                                                            <!--end::Svg Icon-->' +
        '                                                        </span>' + '        </a>' +
        '    </td>' +
        '</tr>';

    return myvar
}

function get_user_div(user, value, total, user_profile) {
    var pecentage = Math.round((value / total) * 100);
    var myvar = '<tr>' +
        '                                                <td class="pl-0">' +
        '                                                    <div class="symbol symbol-50 symbol-light mr-2 mt-2">' +
        '                                                        <span class="symbol-label">' +
        '																					<img src="' + user_profile[user]['photo_url'] + '" class="h-75 align-self-end" alt="" />' +
        '																				</span>' +
        '                                                    </div>' +
        '                                                </td>' +
        '                                                <td class="pl-0">' +
        '                                                    <a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">' + user_profile[user]['user_name'] + '</a>' +
        '                                                    <span class="text-muted font-weight-bold d-block">' + user_profile[user]['user_email'] + '</span>' +
        '                                                </td>' +
        '                                                <td></td>' +
        '                                                <td class="text-right">' +
        '                                                    <span class="text-muted font-weight-bold d-block font-size-sm">Paid</span>' +
        '                                                    <span class="text-dark-75 font-weight-bolder d-block font-size-lg">Rs ' + numberWithCommas(value) + '</span>' +
        '                                                </td>' +
        '                                                <td class="text-right">' +
        '                                                    <span class="font-weight-bolder text-warning">' + pecentage + ' %</span>' +
        '                                                </td>' +
        '                                                <td class="text-right pr-0">' +
        '                                                    <a href="#" class="btn btn-icon btn-light btn-sm">' +
        '                                                        <span class="svg-icon svg-icon-md svg-icon-success">' +
        '																					<!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Arrow-right.svg-->' +
        '																					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '																						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '																							<polygon points="0 0 24 0 24 24 0 24" />' +
        '																							<rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1" />' +
        '																							<path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)" />' +
        '																						</g>' +
        '																					</svg>' +
        '																					<!--end::Svg Icon-->' +
        '																				</span>' +
        '                                                    </a>' +
        '                                                </td>' +
        '                                            </tr>';


    return myvar
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

function user_circle_gen(user, value, total, user_profile) {

    var myvar = '<div class="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="' + user_profile[user]['user_name'] + '">' +
        '<img alt="Pic" src="' + user_profile[user]['photo_url'] + '">' +
        '</div>';
    return myvar
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
var selected_start;
var selected_end;
var start_app = function() {
    var read_data = function(from, to) {
        selected_start = from;
        selected_end = to;

        var d_netincome = [];
        var d_income = [];
        var d_expense = [];
        var d_re_income = [];
        var d_re_expense = [];

        var d_on_income = [];
        var d_on_expense = [];

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

        wallet_Ref.orderBy("last_updated").get()
            .then((querySnapshot) => {
                var items_counter = 0;
                querySnapshot.forEach((doc) => {
                    var items = querySnapshot.size;
                    var sum_income2 = 0;
                    var sum_expense2 = 0;


                    wallet_Ref.doc(doc.id).onSnapshot(function(doc) {
                        items_counter++;
                        console.log(items_counter);
                        var arr = doc.data();
                        var rec_name = doc.id;
                        delete arr["last_updated"];
                        var re_sum_expense2 = 0;
                        var re_sum_income2 = 0;
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


                                        if (REC_repeated != 'once') {
                                            if (REC_type == 'Expense') {
                                                re_sum_expense = re_sum_expense + Number(REC_amount);
                                                re_sum_expense2 = re_sum_expense2 + Number(REC_amount);

                                            } else {
                                                re_sum_income = re_sum_income + Number(REC_amount);
                                                re_sum_income2 = re_sum_income2 + Number(REC_amount);

                                            }

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

                            d_on_income.push(sum_income2 - re_sum_income2);
                            d_on_expense.push(sum_expense2 - re_sum_expense2);


                            cat.push(rec_name);

                            var label = monthts(first_day) + " - " + monthts(last_day);

                            if (items_counter == items) {
                                _initTilesWidget20(d_income, d_expense, d_netincome, cat, label);
                                console.log("launch")


                            }
                            resolve("sucess");
                        });


                    });
                })

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };


    var _initTilesWidget20 = function(data, data1, data2, cat, label) {
        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
        var options = {
            series: [{
                name: 'Income',
                type: 'column',
                data: data
            }, {
                name: 'Expense',
                type: 'column',
                data: data1
            }, {
                name: 'Net',
                type: 'line',
                data: data2
            }],
            chart: {
                height: 'auto',
                type: 'line',
                stacked: false
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [1, 1, 4]
            },
            title: {
                text: label,
                align: 'left',
                offsetX: 110
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
            var selected_start = new Date('1/1/1900').getTime();
            var selected_end = new Date('1/1/2100').getTime();
            read_data(selected_start, selected_end);


        },
        refresh: function() {
            read_data(selected_start, selected_end);
        },

    };
}();


jQuery(document).ready(function() {
    var wallet_id = global_data[0];
    var wallet_name = global_data[1];


    document.getElementById("t_wallet_name").innerText = wallet_name;
    document.getElementById("t_wallet_id").innerText = wallet_id;
    // document.getElementById("wallet_title").innerText = wallet_name;

    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');
    start_app.init();
});