function profit_loss_format(value) { if (value > 0) { return '<span class="label label-md label-primary label-pill label-inline mr-2">Profit</span>' } else { return '<span class="label label-md label-danger label-pill label-inline mr-2">Loss</span>' } }

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

function format_progress_bar(pecentage) { if (pecentage > 75) { return 'bg-danger'; } else if (pecentage > 50) { return 'bg-warning'; } else if (pecentage > 25) { return 'bg-primary'; } else { return 'bg-success'; } }

function getrandomstate() { var stateNo = KTUtil.getRandomInt(0, 7); var states = ['success', 'primary', 'danger', 'success', 'warning', 'dark', 'primary', 'info']; return states[stateNo]; }

function user_circle_gen(user_profile) {
    var html_div = "";
    Object.keys(user_profile).sort().map(function(key, index) {
        var myvar = '<div class="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="' + user_profile[key]['user_name'] + '">' + '<img alt="Pic" src="' + user_profile[key]['photo_url'] + '">' + '</div>';
        html_div = html_div + myvar;
    });
    return html_div
}

function get_user_info(user_id) {
    return new Promise(function(resolve, reject) {
        var user_Ref = db.collection("users");
        const user_details_prom = new Promise((resolve, reject) => {
            getoptdata(user_Ref, user_id).then(function(finalResult) {
                var user_email = finalResult.email;
                var user_name = finalResult.name;
                resolve({ user_email, user_name });
            }).catch((error) => {
                console.log(error);
                var user_email = 'Default';
                var user_name = 'Adminiate'
                resolve({ user_email, user_name });
            });
        });
        const user_image_prom = new Promise((resolve, reject) => { get_user_icon(user_id).then((url) => { resolve({ photo_url: url }); }).catch((error) => { resolve({ photo_url: error }); }); });
        return Promise.all([user_image_prom, user_details_prom]).then((values) => {
            var username = values[1]['user_name'];
            var email = values[1]['user_email'];
            var photo = values[0]['photo_url'];
            resolve(icon_nd_photo_name_email(photo, username, email));
        }).catch((error) => { reject(error); });
    });
}

function dnt4table(datetime) { var e = new Date(datetime); var html_div = '<span style="width: 110px;"><div class="font-weight-bolder text-primary mb-0">' + shortdate(e) + '</div><div class="text-muted">' + formatAMPM(e) + '</div></span>'; return html_div }

function icon_nd_name(icon, name) { var html_div = '<div class="d-flex align-items-center">' + '<div class="symbol symbol-50 symbol-light mr-4">' + '<span class="symbol-label">' + '<span class="svg-icon svg-icon-2x svg-icon-success">' + '<svg><use xlink:href="#' + icon + '"></use></svg>' + '</span>' + '</span>' + '</div>' + ' <div>' + '<a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">' + name + '</a>' + '</div>' + '</div>'; return html_div; }

function icon_nd_name_nd_description(icon, name, description) { var html_div = '<div class="d-flex align-items-center">' + '<div class="symbol symbol-40 symbol-light mr-4">' + '<span class="symbol-label">' + '<span class="svg-icon svg-icon-2x svg-icon-success">' + '<svg><use xlink:href="#' + icon + '"></use></svg>' + '</span>' + '</span>' + '</div>' + '<div class="ml-2">' + '<div class="text-dark-75 font-weight-bold line-height-sm">' + name + '</div>' + '<a href="#" class="font-size-sm text-dark-50 text-hover-primary">' + description + '</a>' + '</div></div>'; return html_div; }

function form_wal_type(wallet_type) {
    var html_div = "";
    if (wallet_type == 'Free') { html_div = '<span class="label label-lg label-danger label-pill label-inline mr-2">Personal Use</span>' }
    if (wallet_type == 'Premium') { html_div = '<span class="label label-lg label-success label-pill label-inline mr-2">Business Use</span>' }
    return html_div
}

function icon_nd_photo_name_email(photo, username, email) {
    var icon = "";
    if (photo == 'none') { icon = ' <div class="symbol symbol-40 symbol-' + getrandomstate() + ' flex-shrink-0">' + '<div class="symbol-label">' + username.substring(0, 1) + '</div></div>'; } else { icon = '<div class="symbol symbol-40 flex-shrink-0">' + '<div class="symbol-label" style="background-image: url(' + photo + ')"></div>' + '</div>'; }
    var ending = ' <div class="ml-2">' + '<div class="text-dark-75 font-weight-bold line-height-sm">' + username + '</div>' + '<a href="#" class="font-size-sm text-dark-50 text-hover-primary">' +
        email + '</a>   </div>\</div>';
    return ('<div class="d-flex align-items-center">' + icon + ending);
}

function payment_status_fomt(type, payment, amount, int_type) { if (type == int_type) { return '<div class="ml-2"><div class="text-dark-75 font-weight-bolder d-block font-size-lg">' + "Rs" + ' ' + numberWithCommas(amount) + '</div><a class="' + format_payment(payment) + ' font-weight-bold">' + payment + '</a></div>'; } else { return "" } }

function set_sum(html_div, sum) { document.getElementById(html_div).innerText = " Rs " + numberWithCommas(sum); }

function percentage_form(value, total, item) {
    if (value == 0) { var pecentage = 0; } else {
        var pecentage = Math.round((value / total) * 100);
    }
    if (pecentage > 100) { var pc = '<span class="text-danger mr-2 font-size-sm font-weight-bold"> - ' + (pecentage - 100) + '%</span>'; } else { var pc = '<span class="text-muted mr-2 font-size-sm font-weight-bold">' + pecentage + '%</span>'; }
    var html_div = '<div class="d-flex flex-column w-100 mr-2">' + '<div class="d-flex align-items-center justify-content-between mb-2">' +
        pc + '<span class="text-muted font-size-sm font-weight-bold">' + item + ' ' + numberWithCommas(value) + '</span>' + '</div>' + '<div class="progress progress-xs w-100">' + '<div class="progress-bar ' + format_progress_bar(pecentage) + '" role="progressbar" style="width: ' + pecentage + '%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>' + '</div>' + '</div>';
    return html_div
}

function paid_format(flag, html_tag) {
    var text = "";
    if (flag) { text = "Not Paid*"; } else { text = "Paid" };
    document.getElementById(html_tag).innerText = text;
    document.getElementById(html_tag).className = format_payment(text) + " font-weight-bold";
}

function dummy_button() { var html_div = '<a href="#" class="btn btn-icon btn-light btn-sm">' + '<span class="svg-icon svg-icon-md svg-icon-success">' + '<!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Arrow-right.svg-->' + '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' + '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<polygon points="0 0 24 0 24 24 0 24" />' + '<rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1" />' + '<path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)" />' + '</g>' + '</svg>' + '<!--end::Svg Icon-->' + '</span>' + '</a>'; return html_div }

function paid_nt_paid_button(payment, description, type, category, amount, timestamp, user, repeat, RecordID) {
    switch (payment) {
        case 'Paid':
            var pay = 'Not Paid';
            return '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + description + '\', \'' + category + '\', \'' + amount + '\', \'' + timestamp + '\', \'' + type + '\', \'' + pay + '\', \'' + user + '\', \'' + repeat + '\', \'' + 1 + '\', \'' + 0 + '\', \'' + RecordID + '\')">' + '<span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Code\Error-circle.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' + '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '        <rect x="0" y="0" width="24" height="24"/>' + '        <path d="M12.0355339,10.6213203 L14.863961,7.79289322 C15.2544853,7.40236893 15.8876503,7.40236893 16.2781746,7.79289322 C16.6686989,8.18341751 16.6686989,8.81658249 16.2781746,9.20710678 L13.4497475,12.0355339 L16.2781746,14.863961 C16.6686989,15.2544853 16.6686989,15.8876503 16.2781746,16.2781746 C15.8876503,16.6686989 15.2544853,16.6686989 14.863961,16.2781746 L12.0355339,13.4497475 L9.20710678,16.2781746 C8.81658249,16.6686989 8.18341751,16.6686989 7.79289322,16.2781746 C7.40236893,15.8876503 7.40236893,15.2544853 7.79289322,14.863961 L10.6213203,12.0355339 L7.79289322,9.20710678 C7.40236893,8.81658249 7.40236893,8.18341751 7.79289322,7.79289322 C8.18341751,7.40236893 8.81658249,7.40236893 9.20710678,7.79289322 L12.0355339,10.6213203 Z" fill="#000000"/>' + '    </g>' + '</svg><!--end::Svg Icon--></span>' + '</a>';
            break;
        case 'Not Paid':
            var pay = 'Paid';
            return '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + description + '\', \'' + category + '\', \'' + amount + '\', \'' + timestamp + '\', \'' + type + '\', \'' + pay + '\', \'' + user + '\', \'' + repeat + '\', \'' + 1 + '\', \'' + 0 + '\', \'' + RecordID + '\')">' + '<span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Code\Done-circle.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' + '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '        <rect x="0" y="0" width="24" height="24"/>' + '        <path d="M16.7689447,7.81768175 C17.1457787,7.41393107 17.7785676,7.39211077 18.1823183,7.76894473 C18.5860689,8.1457787 18.6078892,8.77856757 18.2310553,9.18231825 L11.2310553,16.6823183 C10.8654446,17.0740439 10.2560456,17.107974 9.84920863,16.7592566 L6.34920863,13.7592566 C5.92988278,13.3998345 5.88132125,12.7685345 6.2407434,12.3492086 C6.60016555,11.9298828 7.23146553,11.8813212 7.65079137,12.2407434 L10.4229928,14.616916 L16.7689447,7.81768175 Z" fill="#000000" fill-rule="nonzero"/>' + '    </g>' + '</svg><!--end::Svg Icon--></span>' + '</a>';
            break;
        default:
    }
}

function delete_button1(timestamp) { return '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="entry_delete(\'' + timestamp + '\', ' + 1 + ', ' + 0 + ')">' + '        <span class="svg-icon svg-icon-md svg-icon-primary">' + '            <!--begin::Svg Icon | path:assets/media/svg/icons/General/Trash.svg-->' + '            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' + '                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '                    <rect x="0" y="0" width="24" height="24"></rect>' + '                    <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>' + '                    <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>' + '                </g>' + '            </svg>' + '            <!--end::Svg Icon-->' + '        </span>' + '    </a>'; }

function edit_button3(payment, description, type, category, amount, timestamp, user, repeat, RecordID) { return '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3" onclick="edit_entry_modal(\'' + description + '\', \'' + category + '\', \'' + amount + '\', \'' + timestamp + '\', \'' + type + '\', \'' + payment + '\', \'' + repeat + '\', \'' + RecordID + '\')">' + '        <span class="svg-icon svg-icon-md svg-icon-primary">' + '            <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Write.svg-->' + '            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' + '                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '                    <rect x="0" y="0" width="24" height="24"></rect>' + '                    <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path>' + '                    <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>' + '                </g>' + '            </svg>' + '            <!--end::Svg Icon-->' + '        </span>' + '    </a>'; }

function swalfire(i, num_of_repeat) {
    if (i != 0) {
        console.log(i + " of " + num_of_repeat);
        var dt = percentage_form(i, num_of_repeat - 1, 'Items');
        document.getElementById('progres_par').innerHTML = dt;
    } else {
        console.log('started');
        Swal.fire({ title: 'Please Wait', html: '<div id=\"progres_par\" >' + percentage_form(0, 0, 'Items') + '</div>', showConfirmButton: false, });
    }
    if (i == (num_of_repeat - 1)) {
        console.log('closed');
        Swal.fire({ showConfirmButton: false, }).close();
    }
}