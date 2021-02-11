
function entry_delete(key) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            var entry_id = monthts(new Date(key));
            console.log(key);
            console.log(entry_id);
            deloptfeild(wallet_Ref, entry_id, key).then(function() {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }
    })


}

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
    console.log(payment);
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

}

function add_entry_modal() {
    $('#edit_incex_form_modal').modal('toggle');
    $('#edit_cat_selec').selectpicker();
    document.getElementById('edit_incex_form').querySelector('[name="form_description_2"]').value = "";
    document.getElementById('edit_incex_form').querySelector('[name="form_amount_2"]').value = "";
    document.getElementById("expense_radio").checked = true;
    document.getElementById("paid_radio").checked = true;
    $('#kt_datetimepicker_10').datetimepicker('clear');
    $('#kt_datetimepicker_10').datetimepicker('destroy');
    $('#kt_datetimepicker_10').datetimepicker({
        defaultDate: new Date(),
    });

}

function update_selected(update) {
    var ids = datatable.checkbox().getSelectedId();
    for (var i = 0; i < ids.length; i++) {
        var data = datatable.dataSet[ids[i] - 1];
        var description = data.Description;
        var category = data.Category;
        var amount = data.Amount;
        var timestamp = data.Timestamp;
        var type = data.Type;
        var payment = data.Payment;
        var user = data.user;
        switch (update) {
            case "Not Paid":
                payment = "Not Paid";
                break;
            case "Paid":
                payment = "Paid";
                break;
            case "Income":
                type = "Income";
                break;
            case "Expense":
                type = "Expense";
                break;
            default:
        }
        update_entry(description, category, amount, timestamp, type, payment, user);
    }
};

function delete_selected() {

    Swal.fire({
        title: 'Are you sure?',
        text: "You are about to delete the selected.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete!'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log(1);
            var ids = datatable.checkbox().getSelectedId();
            for (var i = 0; i < ids.length; i++) {
                var data = datatable.dataSet[ids[i] - 1];
                var timestamp = data.Timestamp;
                var entry_id = monthts(new Date(timestamp));
                console.log(2);
                deloptfeild(wallet_Ref, entry_id, timestamp).then(function() { console.log("done"); });






            }

        }
    })

};



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
function format_progress_bar(pecentage){
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

