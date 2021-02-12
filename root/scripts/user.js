var user_local;
var user_Ref = db.collection("users");

function menu_subitems(name, link) {
    return new Promise(function(resolve, reject) {
        var vari = '<li class="menu-item" aria-haspopup="true" >' +
            '<a class="menu-link" onclick="load_page(\'content_pages/wallet.html\',\'' + link + '\')">' +
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

function load_navi() {
    return new Promise(function(resolve, reject) {
        db.collection("wallets").where("users", "array-contains", user_local.uid).get()
            .then((querySnapshot) => {
                var promises_wallet = [];
                querySnapshot.forEach((doc) => {
                    const promise2 = new Promise((resolve, reject) => {
                        var wallet_id = doc.id;
                        var wallet_name = doc.data().name;
                        var promises_users = [];
                        var promises_records = [];
                        var user_list = doc.data().users;
                        const get_users = new Promise((resolve, reject) => {
                            user_list.forEach(function(entry) {
                                const promise = new Promise((resolve, reject) => {
                                    getoptdata(user_Ref, entry).then(function(finalResult) {
                                        menu_subitems(finalResult.name, finalResult.name).then((results) => {
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
                        const get_months = new Promise((resolve, reject) => {
                            db.collection("wallets").doc(doc.id).collection('entries').get().then((querySnapshot) => {

                                querySnapshot.forEach((doc) => {
                                    var month_data = [wallet_id, doc.id];
                                    const promise = new Promise((resolve, reject) => {
                                        //  resolve(doc.id);
                                        menu_subitems(doc.id, month_data).then((results) => {
                                            resolve(results);
                                        }).catch((error) => {
                                            console.log(error);
                                            reject(error);
                                        });
                                    });
                                    promises_records.push(promise);
                                });
                                return Promise.all(promises_records).then((values) => {
                                    // console.log(values);
                                    resolve(values);
                                });
                            });
                        });
                        return Promise.all([get_months, get_users]).then((values) => {
                            var m_size = values[0].length;
                            var n_size = values[1].length;
                            var m = values[0].join('')
                            var u = values[1].join('')
                            var tabl = {
                                months: m,
                                users: u,
                                months_size: m_size,
                                users_size: n_size,
                                wallet_id: wallet_id,
                                wallet_name: wallet_name
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






/* 
    <li class="menu-item menu-item-active" aria-haspopup="true">
    <a class="menu-link" onclick="load_page('content_pages/wallet_dashboard.html')">
        <span class="svg-icon menu-icon">
                <!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg-->
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24"/>
                        <path d="M4.00246329,12.2004927 L13,14 L13,4.06189375 C16.9463116,4.55399184 20,7.92038235 20,12 C20,16.418278 16.418278,20 12,20 C7.64874861,20 4.10886412,16.5261253 4.00246329,12.2004927 Z" fill="#000000" opacity="0.3"/>
                        <path d="M3.0603968,10.0120794 C3.54712466,6.05992157 6.91622084,3 11,3 L11,11.6 L3.0603968,10.0120794 Z" fill="#000000"/>
                    </g>
                </svg>
                <!--end::Svg Icon-->
            </span>
        <span class="menu-text">Home</span>
    </a>
</li>
<li class="menu-item menu-item-active" aria-haspopup="true">
    <a class="menu-link" onclick="load_page('content_pages/wallet.html')">
        <span class="svg-icon menu-icon">
                <!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg-->
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24"/>
<path d="M4,4 L20,4 C21.1045695,4 22,4.8954305 22,6 L22,18 C22,19.1045695 21.1045695,20 20,20 L4,20 C2.8954305,20 2,19.1045695 2,18 L2,6 C2,4.8954305 2.8954305,4 4,4 Z" fill="#000000" opacity="0.3"/>
<path d="M18.5,11 L5.5,11 C4.67157288,11 4,11.6715729 4,12.5 L4,13 L8.58578644,13 C8.85100293,13 9.10535684,13.1053568 9.29289322,13.2928932 L10.2928932,14.2928932 C10.7456461,14.7456461 11.3597108,15 12,15 C12.6402892,15 13.2543539,14.7456461 13.7071068,14.2928932 L14.7071068,13.2928932 C14.8946432,13.1053568 15.1489971,13 15.4142136,13 L20,13 L20,12.5 C20,11.6715729 19.3284271,11 18.5,11 Z" fill="#000000"/>
<path d="M5.5,6 C4.67157288,6 4,6.67157288 4,7.5 L4,8 L20,8 L20,7.5 C20,6.67157288 19.3284271,6 18.5,6 L5.5,6 Z" fill="#000000"/>
                    </g>
                </svg>
                <!--end::Svg Icon-->
            </span>
        <span class="menu-text">Wallet</span>
    </a>
</li>


<li class="menu-section">
    <h4 class="menu-text">Secondary Wallets</h4>
    <i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li> */

function generate_navi(data, p_wallet) {

    var starting = '<li class="menu-item menu-item-active" aria-haspopup="true">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/wallet_dashboard.html\',\'' + p_wallet.name + '\')">' +
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
        '<span class="menu-text">Dashboard</span>' +
        '</a>' +
        '</li>' + '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
        '<a href="javascript:;" class="menu-link menu-toggle">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Files/Upload.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +

        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '        <rect x="0" y="0" width="24" height="24"/>' +
        '        <rect fill="#000000" opacity="0.3" x="4" y="4" width="4" height="4" rx="1"/>' +
        '        <path d="M5,10 L7,10 C7.55228475,10 8,10.4477153 8,11 L8,13 C8,13.5522847 7.55228475,14 7,14 L5,14 C4.44771525,14 4,13.5522847 4,13 L4,11 C4,10.4477153 4.44771525,10 5,10 Z M11,4 L13,4 C13.5522847,4 14,4.44771525 14,5 L14,7 C14,7.55228475 13.5522847,8 13,8 L11,8 C10.4477153,8 10,7.55228475 10,7 L10,5 C10,4.44771525 10.4477153,4 11,4 Z M11,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,13 C14,13.5522847 13.5522847,14 13,14 L11,14 C10.4477153,14 10,13.5522847 10,13 L10,11 C10,10.4477153 10.4477153,10 11,10 Z M17,4 L19,4 C19.5522847,4 20,4.44771525 20,5 L20,7 C20,7.55228475 19.5522847,8 19,8 L17,8 C16.4477153,8 16,7.55228475 16,7 L16,5 C16,4.44771525 16.4477153,4 17,4 Z M17,10 L19,10 C19.5522847,10 20,10.4477153 20,11 L20,13 C20,13.5522847 19.5522847,14 19,14 L17,14 C16.4477153,14 16,13.5522847 16,13 L16,11 C16,10.4477153 16.4477153,10 17,10 Z M5,16 L7,16 C7.55228475,16 8,16.4477153 8,17 L8,19 C8,19.5522847 7.55228475,20 7,20 L5,20 C4.44771525,20 4,19.5522847 4,19 L4,17 C4,16.4477153 4.44771525,16 5,16 Z M11,16 L13,16 C13.5522847,16 14,16.4477153 14,17 L14,19 C14,19.5522847 13.5522847,20 13,20 L11,20 C10.4477153,20 10,19.5522847 10,19 L10,17 C10,16.4477153 10.4477153,16 11,16 Z M17,16 L19,16 C19.5522847,16 20,16.4477153 20,17 L20,19 C20,19.5522847 19.5522847,20 19,20 L17,20 C16.4477153,20 16,19.5522847 16,19 L16,17 C16,16.4477153 16.4477153,16 17,16 Z" fill="#000000"/>' +
        '    </g>' +

        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">Records</span>' +
        '<i class="menu-arrow"></i>' +
        '</a>' +
        '<div class="menu-submenu" kt-hidden-height="120" style="display: none; overflow: hidden;">' +
        '<i class="menu-arrow"></i>' +
        '<ul class="menu-subnav">' + 756 +
        '</ul>' +
        '</div>' +
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
        '<span class="label label-rounded label-primary">' + 765 + '</span>' +
        '</span>' +
        '<i class="menu-arrow"></i>' +
        '</a>' +
        '<div class="menu-submenu" kt-hidden-height="120" style="display: none; overflow: hidden;">' +
        '<i class="menu-arrow"></i>' +
        '<ul class="menu-subnav">' + 765 +
        '</ul>' +
        '</div>' +
        '</li>' +
        '<li class="menu-item" aria-haspopup="true">' +
        '<a target="_blank" href="https://preview.keenthemes.com/metronic/demo1/builder.html" class="menu-link">' +
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
    var navi = "";
    for (let i = 0; i < data.length; i++) {
        var users_list = data[i]['users'];
        var months_list = data[i]['months'];
        var wallet_id = data[i]['wallet_id'];
        var wallet_name = data[i]['wallet_name'];
        var months_size = data[i]['months_size'];
        var users_size = data[i]['users_size'];
        var month_data = [wallet_id, wallet_name];



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
            '        <ul class="menu-subnav">' +
            '<li class="menu-item menu-item-active" aria-haspopup="true">' +
            '<a class="menu-link" onclick="load_page(\'content_pages/wallet_dashboard.html\',\'' + month_data + '\')">' +
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
            '<span class="menu-text">Dashboard</span>' +
            '</a>' +
            '</li>' +
            '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
            '<a href="javascript:;" class="menu-link menu-toggle">' +
            '<span class="svg-icon menu-icon">' +
            '<!--begin::Svg Icon | path:assets/media/svg/icons/Files/Upload.svg-->' +
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +

            '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
            '        <rect x="0" y="0" width="24" height="24"/>' +
            '        <rect fill="#000000" opacity="0.3" x="4" y="4" width="4" height="4" rx="1"/>' +
            '        <path d="M5,10 L7,10 C7.55228475,10 8,10.4477153 8,11 L8,13 C8,13.5522847 7.55228475,14 7,14 L5,14 C4.44771525,14 4,13.5522847 4,13 L4,11 C4,10.4477153 4.44771525,10 5,10 Z M11,4 L13,4 C13.5522847,4 14,4.44771525 14,5 L14,7 C14,7.55228475 13.5522847,8 13,8 L11,8 C10.4477153,8 10,7.55228475 10,7 L10,5 C10,4.44771525 10.4477153,4 11,4 Z M11,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,13 C14,13.5522847 13.5522847,14 13,14 L11,14 C10.4477153,14 10,13.5522847 10,13 L10,11 C10,10.4477153 10.4477153,10 11,10 Z M17,4 L19,4 C19.5522847,4 20,4.44771525 20,5 L20,7 C20,7.55228475 19.5522847,8 19,8 L17,8 C16.4477153,8 16,7.55228475 16,7 L16,5 C16,4.44771525 16.4477153,4 17,4 Z M17,10 L19,10 C19.5522847,10 20,10.4477153 20,11 L20,13 C20,13.5522847 19.5522847,14 19,14 L17,14 C16.4477153,14 16,13.5522847 16,13 L16,11 C16,10.4477153 16.4477153,10 17,10 Z M5,16 L7,16 C7.55228475,16 8,16.4477153 8,17 L8,19 C8,19.5522847 7.55228475,20 7,20 L5,20 C4.44771525,20 4,19.5522847 4,19 L4,17 C4,16.4477153 4.44771525,16 5,16 Z M11,16 L13,16 C13.5522847,16 14,16.4477153 14,17 L14,19 C14,19.5522847 13.5522847,20 13,20 L11,20 C10.4477153,20 10,19.5522847 10,19 L10,17 C10,16.4477153 10.4477153,16 11,16 Z M17,16 L19,16 C19.5522847,16 20,16.4477153 20,17 L20,19 C20,19.5522847 19.5522847,20 19,20 L17,20 C16.4477153,20 16,19.5522847 16,19 L16,17 C16,16.4477153 16.4477153,16 17,16 Z" fill="#000000"/>' +
            '    </g>' +

            '</svg>' +
            '<!--end::Svg Icon-->' +
            '</span>' +
            '<span class="menu-text">Records</span>' +
            '<span class="menu-label">' +
            '<span class="label label-rounded label-primary">' + months_size + '</span>' +
            '</span>' +
            '<i class="menu-arrow"></i>' +
            '</a>' +
            '<div class="menu-submenu" kt-hidden-height="120" style="display: none; overflow: hidden;">' +
            '<i class="menu-arrow"></i>' +
            '<ul class="menu-subnav">' + months_list +
            '</ul>' +
            '</div>' +
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
            '<ul class="menu-subnav">' + users_list +
            '</ul>' +
            '</div>' +
            '</li>' +
            '<li class="menu-item" aria-haspopup="true">' +
            '<a target="_blank" href="https://preview.keenthemes.com/metronic/demo1/builder.html" class="menu-link">' +
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
            '</li>' +
            '</li></ul>' +
            '    </div>' +
            '    ' +
            '</li>';
        navi = my_wallet + navi;
    }

    var ending = '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
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
        '<span class="menu-text">Add Wallets</span>' +
        '</a>' +
        '</li><li class="menu-section">' +
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

    document.getElementById("list_navi").innerHTML = starting + navi + ending;
}

function get_user(user) {
    user_local = user;
    var docRef = db.collection("users");
    var walRef = db.collection("wallets");
    getoptdata(docRef, user.uid).then((function(finalResult) {

        document.getElementById("front_page_user_id").value = user.uid;

        document.getElementById("front_page_name_1").innerHTML = finalResult.name;
        document.getElementById("front_page_name_2").innerHTML = finalResult.name;
        document.getElementById("front_page_email_1").innerHTML = finalResult.email;

        get_user_icon(user_local.uid).then((url) => {
            image_add(url);
        }).catch((error) => {
            image_add(error);
            console.log(error);
        });


        getoptdata(walRef, finalResult.primary_wallet).then((function(pri_wal_data) {
            console.log(pri_wal_data);
            load_navi().then(function(data) {
                generate_navi(data, pri_wal_data);
            }).catch((error) => {
                console.log(error);

            });
        })).catch((error) => {
            console.error(error);
        });

    })).catch((error) => {
        console.error(error);
    });

}




'use strict';



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
    // Class definition
    var KTImageInputDemo = (function() {
        // Private functions
        var initDemos = function() {

            // Example 5
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

                        /*  ref.getDownloadURL()
                            .then((url) => {
                                console.log(url);
                        
                               
                                console.log(value);
                               // updateoptdata(usersRef, user_local.uid, value);

                            }).catch((error) => {                              
                                console.log(error);
                            });
 */

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
                        ref.delete().then(() => {
                            // File deleted successfully
                        }).catch((error) => {
                            // Uh-oh, an error occurred!
                        });
                    }
                });

            }));


        }

        return {
            // public functions
            init: function() {
                initDemos();
            }
        };
    })();

    KTUtil.ready((function() {
        KTImageInputDemo.init();
    }));
}