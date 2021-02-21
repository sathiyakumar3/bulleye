var user_local;
var user_Ref = db.collection("users");

function menu_subitems(name, link) {
    return new Promise(function(resolve, reject) {
        var vari = '<li class="menu-item" aria-haspopup="true" >' +
            '<a class="menu-link" onclick="get_user_profile(\'' + link + '\')">' +
            '<i class="menu-bullet menu-bullet-dot">' +
            '<span></span>' +
            '</i>' +
            '<span class="menu-text">' + name + '</span>' +
            '<span class="menu-label">' +
            '<span class="label label-danger label-inline">new</span>' +
            '</span>' +
            '</a>' +
            '</li>';
        resolve(vari);
    });
}

function prof_pic(image) {
    var html_div = '<div class="symbol-label" style="background-image:url(' + image + ')"></div>'
    '<i class="symbol-badge bg-success"></i>';
    return html_div
}

function get_user_profile(user) {
    $('#check_users').modal('toggle');
    var user_Ref = db.collection("users");

    getoptdata(user_Ref, user).then((function(doc) {

        document.getElementById("prof_name").innerText = doc.name;
        document.getElementById("prof_desig").innerText = doc.name;
        document.getElementById("prof_email").innerText = doc.email;
        document.getElementById("prof_contact").innerText = doc.contact_no;
        document.getElementById("prof_loca").innerText = doc.country;


        get_user_icon(user).then((url) => {
            document.getElementById("image_prof3").innerHTML = prof_pic(url);

        }).catch((error) => {
            document.getElementById("image_prof3").innerHTML = prof_pic(error);
            console.log(error);
        });



    })).catch((error) => {
        console.error(error);
    });
}

function load_navi() {
    return new Promise(function(resolve, reject) {
        db.collection("wallets").where("users", "array-contains", user_local.uid).get()
            .then((querySnapshot) => {
                var promises_wallet = [];
                querySnapshot.forEach((doc) => {
                    const promise2 = new Promise((resolve, reject) => {
                        var wallet_id = doc.id;
                        var wallet_name = doc.data().name;
                        var wallet_type = doc.data().type;
                        var wallet_description = doc.data().description;
                        var promises_users = [];
                        var user_list = doc.data().users;
                        const get_users = new Promise((resolve, reject) => {
                            user_list.forEach(function(entry) {
                                const promise = new Promise((resolve, reject) => {
                                    getoptdata(user_Ref, entry).then(function(finalResult) {
                                        menu_subitems(finalResult.name, entry).then((results) => {
                                            resolve(results);
                                        }).catch((error) => {
                                            console.log(error);
                                            reject(error);
                                        });
                                        //   resolve();
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                });
                                promises_users.push(promise);
                            });
                            return Promise.all(promises_users).then((values) => {
                                resolve(values);
                            });
                        });
                        return Promise.all([get_users]).then((values) => {
                            var n_size = user_list.length;
                            var u = values.join('');
                            var tabl = {
                                users: u,
                                users_size: n_size,
                                wallet_id: wallet_id,
                                wallet_name: wallet_name,
                                wallet_type: wallet_type,
                                wallet_description: wallet_description
                            }
                            resolve(tabl);
                        });
                    });
                    promises_wallet.push(promise2);
                });

                return Promise.all(promises_wallet).then((values) => {
                    resolve(values);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    });
}

function build_site(month_data, users_size, users_list) {
    var html_div = '<li class="menu-item menu-item-active" aria-haspopup="true">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/wallet_dashboard.html\',\'' + month_data + '\')">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '        <rect x="0" y="0" width="24" height="24"/>' +
        '        <polygon fill="#000000" opacity="0.3" points="5 7 5 15 19 15 19 7"/>' +
        '        <path d="M11,19 L11,16 C11,15.4477153 11.4477153,15 12,15 C12.5522847,15 13,15.4477153 13,16 L13,19 L14.5,19 C14.7761424,19 15,19.2238576 15,19.5 C15,19.7761424 14.7761424,20 14.5,20 L9.5,20 C9.22385763,20 9,19.7761424 9,19.5 C9,19.2238576 9.22385763,19 9.5,19 L11,19 Z" fill="#000000" opacity="0.3"/>' +
        '        <path d="M5,7 L5,15 L19,15 L19,7 L5,7 Z M5.25,5 L18.75,5 C19.9926407,5 21,5.8954305 21,7 L21,15 C21,16.1045695 19.9926407,17 18.75,17 L5.25,17 C4.00735931,17 3,16.1045695 3,15 L3,7 C3,5.8954305 4.00735931,5 5.25,5 Z" fill="#000000" fill-rule="nonzero"/>' +
        '    </g>' +
        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">Dashboard</span>' +
        '</a>' +
        '</li>' + '<li class="menu-item" aria-haspopup="true">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/wallet.html\',\'' + month_data + '\')">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '        <rect x="0" y="0" width="24" height="24"/>' +
        '        <rect fill="#000000" opacity="0.3" x="4" y="4" width="4" height="4" rx="1"/>' +
        '        <path d="M5,10 L7,10 C7.55228475,10 8,10.4477153 8,11 L8,13 C8,13.5522847 7.55228475,14 7,14 L5,14 C4.44771525,14 4,13.5522847 4,13 L4,11 C4,10.4477153 4.44771525,10 5,10 Z M11,4 L13,4 C13.5522847,4 14,4.44771525 14,5 L14,7 C14,7.55228475 13.5522847,8 13,8 L11,8 C10.4477153,8 10,7.55228475 10,7 L10,5 C10,4.44771525 10.4477153,4 11,4 Z M11,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,13 C14,13.5522847 13.5522847,14 13,14 L11,14 C10.4477153,14 10,13.5522847 10,13 L10,11 C10,10.4477153 10.4477153,10 11,10 Z M17,4 L19,4 C19.5522847,4 20,4.44771525 20,5 L20,7 C20,7.55228475 19.5522847,8 19,8 L17,8 C16.4477153,8 16,7.55228475 16,7 L16,5 C16,4.44771525 16.4477153,4 17,4 Z M17,10 L19,10 C19.5522847,10 20,10.4477153 20,11 L20,13 C20,13.5522847 19.5522847,14 19,14 L17,14 C16.4477153,14 16,13.5522847 16,13 L16,11 C16,10.4477153 16.4477153,10 17,10 Z M5,16 L7,16 C7.55228475,16 8,16.4477153 8,17 L8,19 C8,19.5522847 7.55228475,20 7,20 L5,20 C4.44771525,20 4,19.5522847 4,19 L4,17 C4,16.4477153 4.44771525,16 5,16 Z M11,16 L13,16 C13.5522847,16 14,16.4477153 14,17 L14,19 C14,19.5522847 13.5522847,20 13,20 L11,20 C10.4477153,20 10,19.5522847 10,19 L10,17 C10,16.4477153 10.4477153,16 11,16 Z M17,16 L19,16 C19.5522847,16 20,16.4477153 20,17 L20,19 C20,19.5522847 19.5522847,20 19,20 L17,20 C16.4477153,20 16,19.5522847 16,19 L16,17 C16,16.4477153 16.4477153,16 17,16 Z" fill="#000000"/>' +
        '    </g>' +
        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">Work Sheet</span>' +
        '</a>' +
        '</li>' + '<li class="menu-item" aria-haspopup="true">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/wallet_trends.html\',\'' + month_data + '\')">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '<rect x="0" y="0" width="24" height="24"/>' +
        '<path d="M4.00246329,12.2004927 L13,14 L13,4.06189375 C16.9463116,4.55399184 20,7.92038235 20,12 C20,16.418278 16.418278,20 12,20 C7.64874861,20 4.10886412,16.5261253 4.00246329,12.2004927 Z" fill="#000000" opacity="0.3"/>' +
        '<path d="M3.0603968,10.0120794 C3.54712466,6.05992157 6.91622084,3 11,3 L11,11.6 L3.0603968,10.0120794 Z" fill="#000000"/>' +
        '</g>' +
        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">Trends</span>' +
        '</a>' +
        '</li>' +

        '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
        '<a href="javascript:;" class="menu-link menu-toggle">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Files/Upload.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '        <polygon points="0 0 24 0 24 24 0 24"/>' +
        '        <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>' +
        '        <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero"/>' +
        '    </g>' +
        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">Users</span>' +
        '<span class="menu-label">' +
        '<span class="label label-rounded label-primary">' + users_size + '</span>' +
        '</span>' +
        '<i class="menu-arrow"></i>' +
        '</a>' +
        '<div class="menu-submenu" kt-hidden-height="120" style="display: none; overflow: hidden;">' +
        '<i class="menu-arrow"></i>' +
        '<ul class="menu-subnav">' + users_list.replace(/,/g, " ") +
        '</ul>' +
        '</div>' +
        '</li>' +



        '<li class="menu-item" aria-haspopup="true">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/wallet_settings.html\',\'' + month_data + '\')">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '        <rect x="0" y="0" width="24" height="24"/>' +
        '        <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000"/>' +
        '        <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3"/>' +
        '    </g>' +
        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">Settings</span>' +
        ' </a>' +
        '</li>';
    return html_div
}

function generate_navi(data, p_wallet) {

    var starting = "";
    var navi = "";
    for (let i = 0; i < data.length; i++) {
        var users_list = data[i]['users'];
        var months_list = 123;
        var wallet_id = data[i]['wallet_id'];
        var wallet_name = data[i]['wallet_name'];
        var wallet_type = data[i]['wallet_type'];
        var users_size = data[i]['users_size'];
        var wallet_description = data[i]['wallet_description'];
        var month_data = wallet_id + "," + wallet_name + "," + user_local.uid + "," + wallet_type + "," + wallet_description;

        if (wallet_id != p_wallet) {
            var my_wallet = '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
                '    <a href="javascript:;" class="menu-link menu-toggle">' +
                '        <span class="svg-icon menu-icon">' +
                '                <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-left-panel-2.svg-->' +
                '                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '                        <rect x="0" y="0" width="24" height="24" />' +
                '                        <path d="M10,4 L21,4 C21.5522847,4 22,4.44771525 22,5 L22,7 C22,7.55228475 21.5522847,8 21,8 L10,8 C9.44771525,8 9,7.55228475 9,7 L9,5 C9,4.44771525 9.44771525,4 10,4 Z M10,10 L21,10 C21.5522847,10 22,10.4477153 22,11 L22,13 C22,13.5522847 21.5522847,14 21,14 L10,14 C9.44771525,14 9,13.5522847 9,13 L9,11 C9,10.4477153 9.44771525,10 10,10 Z M10,16 L21,16 C21.5522847,16 22,16.4477153 22,17 L22,19 C22,19.5522847 21.5522847,20 21,20 L10,20 C9.44771525,20 9,19.5522847 9,19 L9,17 C9,16.4477153 9.44771525,16 10,16 Z" fill="#000000" />' +
                '                        <rect fill="#000000" opacity="0.3" x="2" y="4" width="5" height="16" rx="1" />' +
                '                    </g>' +
                '                </svg>' +
                '                <!--end::Svg Icon-->' +
                '            </span>' +
                '        <span class="menu-text">' + wallet_name + '</span>' +
                '        <i class="menu-arrow"></i>' +
                '    </a>' +
                '    <div class="menu-submenu">' +
                '        <i class="menu-arrow"></i>' +
                '        <ul class="menu-subnav">' + build_site(month_data, users_size, users_list) + '</ul>' +
                '    </div>' +
                '    ' +
                '</li>';
            navi = my_wallet + navi;
        } else {
            load_page('content_pages/wallet_dashboard.html', month_data);
            starting = build_site(month_data, users_size, users_list) +
                '<li class="menu-section">' +
                '<h4 class="menu-text">Secondary Wallets</h4>' +
                '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
                '</li>';
        }
    }

    var myvar = '<li class="menu-item menu-item-active" aria-haspopup="true"><a class="menu-link" data-toggle="modal" data-target="#add_new_wallet">' +
        '<span class="svg-icon menu-icon"><!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg--><svg xmlns="http://www.w3.org/2000/svg" ' +
        'xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '<rect x="0" y="0" width="24" height="24" />' +
        '<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />' +
        '<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />' +
        '</g>' +
        '</svg><!--end::Svg Icon--></span><span class="menu-text">Dashboard</span></a></li>';


    var ending = '<li class="menu-section">' +
        '<h4 class="menu-text">Others</h4>' +
        '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
        '</li><li class="menu-item menu-item-active" aria-haspopup="true"><a class="menu-link" data-toggle="modal" data-target="#add_new_wallet">' +
        '<span class="svg-icon menu-icon"><!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg--><svg xmlns="http://www.w3.org/2000/svg" ' +
        'xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '<rect x="0" y="0" width="24" height="24" />' +
        '<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />' +
        '<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />' +
        '</g>' +
        '</svg><!--end::Svg Icon--></span><span class="menu-text">Add New Wallet</span></a></li>' +
        '<li class="menu-section">' +
        '<h4 class="menu-text">Others</h4>' +
        '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
        '</li><li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/content_2.html\')">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '<rect x="0" y="0" width="24" height="24" />' +
        '<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />' +
        '<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />' +
        '</g>' +
        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">About Us</span>' +
        '</a>' +
        '</li>';

    document.getElementById("list_navi").innerHTML = starting + navi + ending


}

function get_user(user) {
    user_local = user;
    getoptdata(user_Ref, user_local.uid).then((function(finalResult) {

        document.getElementById("front_page_user_id").value = user.uid;
        document.getElementById("front_page_name_1").innerHTML = finalResult.name;
        document.getElementById("front_page_name_2").innerHTML = finalResult.name;
        document.getElementById("front_page_email_1").innerHTML = finalResult.email;
        document.getElementById("ad_wal_loc_id").value = finalResult.name;

        get_user_icon(user_local.uid).then((url) => {
            image_add(url);
        }).catch((error) => {
            image_add(error);
            console.log(error);
        });
        load_navi().then(function(data) {
            generate_navi(data, finalResult.primary_wallet);

            if (data.length == 0) {
                $('#add_new_wallet').modal('toggle');
            }
        }).catch((error) => {
            console.log(error);
        });


    })).catch((error) => {
        console.error(error);
    });

}

function image_add(url) {

    var myvar = '<div class="image-input image-input-empty image-input-outline" id="kt_image_5" style="background-image: url(' + url + ')">' +
        '<div class="image-input-wrapper"></div>' +
        '<label class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Change avatar">' +
        '<i class="fa fa-pen icon-sm text-muted"></i>' +
        ' <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg">' +
        '<input type="hidden" name="profile_avatar_remove">' +
        '</label>' +
        '<span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" id="cancel_button" data-action="cancel" data-toggle="tooltip" title="" data-original-title="Cancel avatar">' +
        '<i class="ki ki-bold-close icon-xs text-muted"></i>' +
        '</span>' +
        '<span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="remove" data-toggle="tooltip" title="" data-original-title="Remove avatar">' +
        ' <i class="ki ki-bold-close icon-xs text-muted"></i>' +
        '</span>' +
        ' </div>';

    document.getElementById("imageframe").innerHTML = myvar;
    var KTImageInputDemo = (function() {
        var start_app_main = function() {
            var avatar5 = new KTImageInput('kt_image_5');
            avatar5.on('change', (function(imageInput) {
                var size = imageInput.input.files[0].size
                console.log(size);
                if (size > 1000000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'This image can not be used.',
                        text: 'Please use images below 1 MB.',
                    });
                } else {

                    const ref = firebase.storage().ref().child('users/' + user_local.uid);
                    var message = imageInput.src;
                    ref.putString(message, 'data_url').then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((function(downloadURL) {
                            const usersRef = db.collection("users");
                            var value = {
                                "photo_url": downloadURL

                            };
                            console.log("File available at", downloadURL);
                            updateoptdata(usersRef, user_local.uid, value);
                        }));

                    }).catch((error) => {
                        console.error(error);
                    });


                }
            }));

            avatar5.on('remove', (function(imageInput) {
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
                        const ref = firebase.storage().ref().child('users/' + user_local.uid);
                        ref.delete().then(() => {}).catch((error) => {
                            console.log(error);
                        });
                    }
                });

            }));


        }

        var add_new_wallet_From_validation = function() {
            FormValidation.formValidation(
                document.getElementById('add_new_wallet_form'), {
                    fields: {
                        ad_wal_name: {
                            validators: {
                                notEmpty: {
                                    message: 'A name is requried.'
                                }
                            }
                        },
                        ad_wal_desc: {
                            validators: {
                                notEmpty: {
                                    message: 'A description is required.'
                                },
                            }
                        },

                        ad_wal_loc: {
                            validators: {
                                notEmpty: {
                                    message: 'A location is required.'
                                },
                            }
                        }

                    },

                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        bootstrap: new FormValidation.plugins.Bootstrap({
                            eleInvalidClass: '',
                            eleValidClass: '',
                        })
                    }
                }
            ).on('core.form.valid', function() {            
                $('#add_new_wallet').modal('toggle');
                var name = document.getElementById('add_new_wallet_form').querySelector('[name="ad_wal_name"]').value;
                var description = document.getElementById('add_new_wallet_form').querySelector('[name="ad_wal_desc"]').value;
                var location = document.getElementById('add_new_wallet_form').querySelector('[name="ad_wal_loc"]').value;
                var type = $('input[name="wallet_form_type"]:checked').val();
                var user = user_local.uid;
                var timestamp = Date.now();
                var categories = [{
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'transportation',
                    name: 'Transportation'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'gift',
                    name: 'Gift'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'education',
                    name: 'Education'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'insurance',
                    name: 'Insurance'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'office',
                    name: 'Office'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'travel',
                    name: 'Travel'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'entertainment',
                    name: 'Entertainment'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'garden',
                    name: 'Garden'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'meal',
                    name: 'Food'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'power',
                    name: 'Electricity'
                }, {
                    created_on: timestamp,
                    created_by: 'Adminiate',
                    icon: 'shopping',
                    name: 'Shopping'
                }]
                var data = {
                    name: name,
                    description: description,
                    location,
                    location,
                    type: type,
                    owner: user,
                    users: [user],
                    categories: categories
                }

                var wallet_Ref = db.collection("wallets")
                addoptdata(wallet_Ref, data).then(function(docid) {

                    var data = {
                        primary_wallet: docid
                    }

                    updateoptdata(user_Ref, user, data).then(function(finalResult) {
                        get_user(user_local);
                        Swal.fire(
                            'Congratulations!',
                            'You just added your first wallet!',
                            'success'
                        );
                    }).catch((error) => {
                        console.log(error);
                    });




                    get_user(user_local);




                }).catch((error) => {
                    console.log(error);
                });
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
                        },
                        repeat_numbrs: {
                            validators: {
                                between: {
                                    min: 0,
                                    max: 30,
                                    message: 'The number must be between 0 and 30'
                                }
                            }
                        }

                    },

                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
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
                var selected_repeated = document.getElementById('repeat_selection').value;
                var num_of_repeat = document.getElementById('example-number-input2').value;

                for (i = 0; i < num_of_repeat; i++) {
                    update_entry(description, category, amount, timestamp, type, payment, user_id, selected_repeated).then(function() {}).catch((error) => {
                        console.log(error);
                    });
                    switch (selected_repeated) {
                        case 'Monthly':
                            timestamp.setMonth(timestamp.getMonth() + 1);
                            break;
                        case 'Weekly':
                            timestamp.setDate(timestamp.getDate() + 7);
                            break;
                        case 'Daily':
                            timestamp.setDate(timestamp.getDate() + 1);
                            break;
                        default:

                    }
                    if (i == (num_of_repeat - 1)) {
                        start_app.refresh();
                    }
                }
            });
        }
        return {
            // public functions
            init: function() {
                start_app_main();
                edit_entry_From_validation();
                add_new_wallet_From_validation();
            }
        };
    })();

    KTUtil.ready((function() {
        KTImageInputDemo.init();
    }));
}