"use strict";

function process_row(obj, html, total,user_profile,sel) {
    var html_div = "";
    var counter_c = 0;
    var keysSorted = Object.keys(obj).sort(function(a, b) { return obj[b] - obj[a] });
    Object.keys(keysSorted).sort().map(function(key, index) {
        counter_c++;
        if (counter_c <= 5) {
            switch(sel) {
                case 1:
                    html_div = html_div + get_cat_div(keysSorted[index], obj[keysSorted[index]], total);
                  break;
                case 2:
                    html_div = html_div + get_user_div(keysSorted[index], obj[keysSorted[index]], total,user_profile);
                  break;
                  case 3:
                    html_div = html_div + build_table(keysSorted[index], obj[keysSorted[index]], total,obj);
                  break;
                default:
                  // code block
              }
           
            
        }
    });
    document.getElementById(html).innerHTML = html_div;

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

            myvar = '<div class="symbol symbol-45 symbol-light-info mr-4 flex-shrink-0">' +
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
// Class definition
function get_cat_div(cat, value, total) {
    var pecentage = Math.round((value / total) * 100);
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
        '                <div class="progress-bar ' + state + '" role="progressbar" style="width: ' + pecentage + '%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>' +
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

function get_user_div(user, value, total,user_profile) {
    var pecentage = Math.round((value / total) * 100);
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

    var myvar = '<tr>' +
        '                                                <td class="pl-0">' +
        '                                                    <div class="symbol symbol-50 symbol-light mr-2 mt-2">' +
        '                                                        <span class="symbol-label">' +
        '																					<img src="'+user_profile[user]['photo_url']+'" class="h-75 align-self-end" alt="" />' +
        '																				</span>' +
        '                                                    </div>' +
        '                                                </td>' +
        '                                                <td class="pl-0">' +
        '                                                    <a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">'+user_profile[user]['user_name']+'</a>' +
        '                                                    <span class="text-muted font-weight-bold d-block">'+user_profile[user]['user_email']+'</span>' +
        '                                                </td>' +
        '                                                <td></td>' +
        '                                                <td class="text-right">' +
        '                                                    <span class="text-muted font-weight-bold d-block font-size-sm">Paid</span>' +
        '                                                    <span class="text-dark-75 font-weight-bolder d-block font-size-lg">Rs '+numberWithCommas(value)+'</span>' +
        '                                                </td>' +
        '                                                <td class="text-right">' +
        '                                                    <span class="font-weight-bolder text-warning">'+pecentage+' %</span>' +
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
function build_table(user, value, total,obj){
    var date = new Date(user);
    switch (obj[user]['payment']) {
        case 'Paid':           
            var myvar2 = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + obj[user]['description']  + '\', \'' + obj[user]['category']+ '\', \'' + obj[user]['amount'] + '\', \'' + user + '\', \'' + obj[user]['type']  + '\', \'' + 'Not Paid' + '\', \'' + obj[user]['user'] + '\')">' +
                '<span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Code\Error-circle.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '        <rect x="0" y="0" width="24" height="24"/>' +
                '        <path d="M12.0355339,10.6213203 L14.863961,7.79289322 C15.2544853,7.40236893 15.8876503,7.40236893 16.2781746,7.79289322 C16.6686989,8.18341751 16.6686989,8.81658249 16.2781746,9.20710678 L13.4497475,12.0355339 L16.2781746,14.863961 C16.6686989,15.2544853 16.6686989,15.8876503 16.2781746,16.2781746 C15.8876503,16.6686989 15.2544853,16.6686989 14.863961,16.2781746 L12.0355339,13.4497475 L9.20710678,16.2781746 C8.81658249,16.6686989 8.18341751,16.6686989 7.79289322,16.2781746 C7.40236893,15.8876503 7.40236893,15.2544853 7.79289322,14.863961 L10.6213203,12.0355339 L7.79289322,9.20710678 C7.40236893,8.81658249 7.40236893,8.18341751 7.79289322,7.79289322 C8.18341751,7.40236893 8.81658249,7.40236893 9.20710678,7.79289322 L12.0355339,10.6213203 Z" fill="#000000"/>' +
                '    </g>' +
                '</svg><!--end::Svg Icon--></span>' +
                '</a>';
            break;
        case 'Not Paid':
            
            var myvar2 = '<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm" onclick="update_entry(\'' + obj[user]['description'] + '\', \'' + obj[user]['category'] + '\', \'' + obj[user]['amount'] + '\', \'' + user + '\', \'' + obj[user]['type']  + '\', \'' + 'Paid' + '\', \'' + obj[user]['user'] + '\')">' +
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
var myvar = '<tr>'+
'                                        <td class="pl-0 py-8">'+
'                                            <div class="d-flex align-items-center">'+
get_cat_icon(obj[user]['category']) +                                             
'                                                <div>'+
'                                                    <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">'+obj[user]['description']+'</a>'+
'                                                    <span class="text-muted font-weight-bold d-block">'+obj[user]['category']+'</span>'+
'                                                </div>'+
'                                            </div>'+
'                                        </td>'+
'                                        <td>'+
'                                            <span class="text-dark-75 font-weight-bolder d-block font-size-lg">'+shortdate(date)+'</span>'+
'                                            <span class="text-muted font-weight-bold">'+shorttime(date)+'</span>'+
'                                        </td>'+
'                                        <td>'+
'                                            <span class="text-dark-75 font-weight-bolder d-block font-size-lg">Rs '+numberWithCommas(obj[user]['amount'])+'</span>'+
'                                            <span class="text-danger font-weight-bold">Not Paid</span>'+
'                                        </td>'+
'                                        <td>'+
'                                            <span class="text-dark-75 font-weight-bolder d-block font-size-lg">'+obj[user]['user_name']+'</span>'+
'                                            <span class="text-muted font-weight-bold">'+obj[user]['user_email']+'</span>'+
'                                        </td>'+                                 
'                                        <td class="text-centre">'+
myvar2+
'                                        </td>'+
'                                    </tr>';
	
return myvar
}

var wallet_Ref = '';
var chart = "";
var element = "";
var start_app = function() {
    var read_data = function(from, to, alltime) {
        var today = new Date().getTime();
        var pro_per = Math.round(((today - from) / (to - from)) * 100);
        if (pro_per > 100) {
            pro_per = 100;
        }
        _initTilesWidget20(pro_per);
        var data = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var cat = [];
        var cat_b = [];
        var cat_2 = [];
        var cat_3 = [];
        var not_paid_table =[];
        var user_profile =[];
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
        wallet_Ref.orderBy("last_updated").get()
            .then((querySnapshot) => {
                var items_counter = 0;
                var older = 0;
                querySnapshot.forEach((doc) => {
                    var items = querySnapshot.size;
                    var sum_income2 = 0;
                    var sum_expense2 = 0;
                    var re_sum_expense2 = 0;
                    var re_sum_income2 = 0;
                    wallet_Ref.doc(doc.id).onSnapshot(function(doc) {
                        items_counter++;
                        var arr = doc.data();
                        var rec_name = doc.id;
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
                                        var REC_description= values[2]['Description'];
                                        var REC_payment = values[2]['Payment'];
                                        var REC_repeated = values[2]['Repeated'];
                                        var REC_timestamp = values[2]['Timestamp'];
                                        var REC_user_email = values[1]['user_email'];
                                        var REC_user_name = values[1]['user_name'];
                                        var REC_user_photo = values[0]['photo_url'];
                                        
                                        
                                        if (!user_profile.hasOwnProperty([user_id])) {
                                            user_profile = {
                                                [user_id]:{                                            
                                                user_name:REC_user_name,
                                                user_email:REC_user_email,
                                                photo_url:REC_user_photo,
                                                }
                                        }
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
                                            not_paid_table.push({
                                                [REC_timestamp]:{                                            
                                                category:REC_category,
                                                amount:REC_amount,
                                                user_name:REC_user_name,
                                                user_email:REC_user_email,
                                                description:REC_description,
                                                user:REC_user,
                                                type:REC_type,
                                                payment:REC_payment

                                                }
                                        });
                                        }

                                        if (REC_repeated != 'once') {
                                            if (REC_type == 'Expense') {
                                                re_sum_expense = sum_expense + Number(REC_amount);
                                                re_sum_expense2 = sum_expense + Number(REC_amount);
                                            } else {
                                                re_sum_income = sum_income + Number(REC_amount);
                                                re_sum_income2 = sum_income + Number(REC_amount);
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
                            data.push(sum_income2 - sum_expense2);
                            data3.push(re_sum_income2 - re_sum_expense2);
                            data1.push(sum_income2);
                            data2.push(sum_expense2);
                            cat.push(rec_name);

                            if (items_counter == items) {

                                if (alltime) {
                                    _initDaterangepicker(first_day, last_day);
                                }
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

                                if ((re_sum_income - re_sum_expense) < 0) {
                                    document.getElementById("RC_balance_title").innerText = "Have Planned Excess Expense!";

                                    document.getElementById("RC_balance").innerText = " Rs " + numberWithCommas(re_sum_income - re_sum_expense);
                                    document.getElementById("RC_balance").classList.remove("text-success");
                                    document.getElementById("RC_balance").classList.add("text-warning");
                                    document.getElementById("RC_balance_bar").classList.remove("bg-success");
                                    document.getElementById("RC_balance_bar").classList.add("bg-warning");
                                    rc_net_pec = Math.round(((re_sum_expense - re_sum_income) / re_sum_expense) * 100);
                                } else {
                                    document.getElementById("RC_balance_title").innerText = "Savings Oriented Plan!";

                                    document.getElementById("RC_balance").innerText = " Rs " + numberWithCommas(re_sum_expense - re_sum_income);
                                    document.getElementById("RC_balance").classList.remove("text-warning");
                                    document.getElementById("RC_balance").classList.add("text-success");
                                    document.getElementById("RC_balance_bar").classList.remove("bg-warning");
                                    document.getElementById("RC_balance_bar").classList.add("bg-success");
                                    rc_net_pec = Math.round(((re_sum_income - re_sum_expense) / re_sum_income) * 100);
                                }

                                document.getElementById("RC_balance_per").innerHTML = rc_net_pec + " %";
                                document.getElementById("RC_balance_bar").style.width = rc_net_pec + "%";

                                document.getElementById("not_paid_text").innerHTML = 'Please note that the dashboard is generated based on all the paid transactions only.<br>There is a sum of <b class="text-danger"> Rs ' + numberWithCommas(not_paid_sum) + '</b> yet to tbe paid.'
                                document.getElementById("net_percent").innerHTML = net_pec + " %";
                                document.getElementById("net_percent_bar").style.width = net_pec + "%";


                                document.getElementById("sum_net_m").innerHTML = currency + numberWithCommas(sum_income - sum_expense);
                                document.getElementById("number_items").innerText = counter + " Entries";

                                document.getElementById("end_date").innerText = shortdateclean(first_day);
                                document.getElementById("start_date").innerText = shortdateclean(last_day);
                                _initChartsWidget3(data, data3, cat);
                                _initChartsWidget4(data1, data2, cat);
                                process_row(cat_b, "testtt", sum_expense,user_profile,1);
                                process_row(cat_2, "testtt2", sum_income,user_profile,1);
                                process_row(cat_3, "testtt3", sum_expense,user_profile,2);
                                console.log(not_paid_table);
                                process_row(not_paid_table, "table_23", sum_expense,user_profile,3);

                                
                            /*     var html_div3 = "";
                                var counter_c4 = 0;
                                var keysSorted3 = Object.keys(cat_3).sort(function(a, b) { return cat_3[b] - cat_3[a] });
                                Object.keys(keysSorted3).sort().map(function(key, index) {
                                    counter_c4++;
                                    if (counter_c4 <= 5) {
                                        html_div3 = html_div3 + get_user_div(keysSorted3[index], cat_3[keysSorted3[index]], sum_expense,user_profile);
                                    }
                                });
                               

                               
                                document.getElementById("testtt3").innerHTML = html_div3; */
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
        var all_f = new Date('1/1/1900').getTime();
        var all_l = new Date('1/1/2100').getTime();

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
            if (start == all_f) {
                read_data(start, end, true);
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
                'All time': [all_f, all_l]
            }
        }, cb);
        //  console.log(start);
        //  console.log(end);
        //  console.log(start2);
        //   console.log(end2);
        cb(start, end, '');

    }

    var _initTilesWidget20 = function(percentage) {
        var element = document.getElementById("kt_tiles_widget_20_chart");

        var range = $('#kt_dashboard_daterangepicker_title').html() + " " + $('#kt_dashboard_daterangepicker_date').html();
        var options = {
            series: [percentage],
            chart: {
                height: 250,
                type: 'radialBar',
                offsetY: 0
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,

                    hollow: {
                        margin: 0,
                        size: "70%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: true,
                            fontSize: "13px",
                            fontWeight: "400",
                            offsetY: -5,
                            color: KTApp.getSettings()['colors']['gray']['gray-300']
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['theme']['inverse']['primary'],
                            fontSize: "22px",
                            fontWeight: "bold",
                            offsetY: -40,
                            show: true
                        }
                    },
                    track: {
                        background: KTUtil.changeColor(KTApp.getSettings()['colors']['theme']['base']['primary'], -7),
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['inverse']['primary']],
            stroke: {
                lineCap: "round",
            },
            labels: [range]
        };
        if (chart != "") {
            //  $('#kt_datatable_2').KTDatatable().clear();
            chart.destroy();

        }
        chart = new ApexCharts(element, options);
        chart.render();
    }

    var _initChartsWidget3 = function(data, data1, cat) {
        if (element != "") {
            element.destroy();
        }
        element = document.getElementById("kt_charts_widget_3_chart");
        var options = {
            series: [{
                name: 'Net Income',
                data: data
            }, {
                name: 'Recurring Income',
                data: data1
            }],
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
                        return "$" + val + " thousands"
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

        var chart = new ApexCharts(element, options);
        chart.render();
    }
    var _initChartsWidget4 = function(data1, data2, cat) {
        var element = document.getElementById("kt_charts_widget_4_chart");

        if (!element) {
            return;
        }

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
                        return "Rs " + val + ""
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

        var chart = new ApexCharts(element, options);
        chart.render();
    }
    return {
        init: function() {
            //     read_data();
            var all_f = new Date('1/1/1900').getTime();
            var all_l = new Date('1/1/2100').getTime();
            _initDaterangepicker(all_f, all_l);
            //   _initChartsWidget3();
        },
    };
}();


jQuery(document).ready(function() {


    var wallet_id = global_data[0];
    var wallet_name = global_data[1];
    document.getElementById("wallet_title").innerText = wallet_name;

    wallet_Ref = db.collection("wallets").doc(wallet_id).collection('entries');
    start_app.init();
});
function update_entry(description, category, amount, timestamp, type, payment, user) {
    var timestamp = new Date(timestamp);
    var value = {
        [timestamp]: {
            "user": user,
            "Description": description,
            "Category": category,
            "Type": type,
            "Payment": payment,
            "Amount": amount,
            "Repeated": 'once',
        },
        last_updated: timestamp
    };
    var entry_id = monthts(timestamp);
    updateoptdata(wallet_Ref, entry_id, value);
}