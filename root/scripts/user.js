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
                        var wallet_owner = doc.data().owner;
                        var wallet_location = doc.data().location;
                        var wallet_currency = doc.data().currency;
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
                                wallet_description: wallet_description,
                                wallet_location: wallet_location,
                                wallet_owner: wallet_owner,
                                wallet_currency: wallet_currency
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

function build_trend(month_data, type) {

    if (type == 'Premium') {
        var html_div = '<li class="menu-item" aria-haspopup="true">' +
            '<a class="menu-link" onclick="load_page(\'content_pages/wallet_trends.html\',\'' + month_data + '\')">' +
            '<span class="svg-icon menu-icon">' +
            '<svg><use xlink:href="#pie_chart"></use></svg>' +
            '</span>' +
            '<span class="menu-text">Trends</span>' +
            '</a>' +
            '</li>';
        return html_div
    }
    if (type == 'Free') {
        var myvar = '<span class="svg-icon menu-icon svg-icon-danger">' + '<svg><use xlink:href="#locked"></use></svg></span>';
        var html_div = '<li class="menu-item" aria-haspopup="true">' +
            '<a class="menu-link" onclick="access_restric_error()">' +
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
            '<span class="menu-text">Trends</span>' + myvar +
            '</a>' +
            '</li>';
        return html_div
    }
}


function build_site(month_data, users_size, users_list, type) {

    var html_div = '<li class="menu-item menu-item-active" aria-haspopup="true">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/wallet_dashboard.html\',\'' + month_data + '\')">' +
        '<span class="svg-icon menu-icon">' +
        '<svg><use xlink:href="#pie_chart"></use></svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">Dashboard</span>' +
        '</a>' +
        '</li>' + '<li class="menu-item" aria-haspopup="true">' +
        '<a class="menu-link" onclick="load_page(\'content_pages/wallet.html\',\'' + month_data + '\')">' +
        '<span class="svg-icon menu-icon">' +
        '<svg><use xlink:href="#cal"></use></svg>' +
        '</span>' +
        '<span class="menu-text">Balance Sheet</span>' +
        '</a>' +
        '</li>' +
        //build_trend(month_data, type) +
        '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
        '<a href="javascript:;" class="menu-link menu-toggle">' +
        '<span class="svg-icon menu-icon">' +
        '<svg><use xlink:href="#users"></use></svg>' +
        '</span>' +
        '<span class="menu-text">Users</span>' +
        '<span class="menu-label">' +
        '<span class="label label-rounded label-success">' + users_size + '</span>' +
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
        '<svg><use xlink:href="#settings"></use></svg>' +
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
        var wallet_id = data[i]['wallet_id'];
        var wallet_name = data[i]['wallet_name'];
        var wallet_type = data[i]['wallet_type'];
        var users_size = data[i]['users_size'];
        var wallet_description = data[i]['wallet_description'];
        var wallet_owner = data[i]['wallet_owner'];
        var wallet_location = data[i]['wallet_location'];
        var wallet_currency = data[i]['wallet_currency'];

        var month_data = wallet_id + "," + wallet_name + "," + user_local.uid + "," + wallet_type + "," + wallet_description + "," + wallet_owner + "," + wallet_location + ',' + wallet_currency;

        if (wallet_id != p_wallet) {
            var my_wallet = '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
                '    <a href="javascript:;" class="menu-link menu-toggle">' +
                '        <span class="svg-icon menu-icon">' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
                '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
                '        <rect x="0" y="0" width="24" height="24"/>'+
                '        <path d="M3,4 L20,4 C20.5522847,4 21,4.44771525 21,5 L21,7 C21,7.55228475 20.5522847,8 20,8 L3,8 C2.44771525,8 2,7.55228475 2,7 L2,5 C2,4.44771525 2.44771525,4 3,4 Z M10,10 L20,10 C20.5522847,10 21,10.4477153 21,11 L21,13 C21,13.5522847 20.5522847,14 20,14 L10,14 C9.44771525,14 9,13.5522847 9,13 L9,11 C9,10.4477153 9.44771525,10 10,10 Z M10,16 L20,16 C20.5522847,16 21,16.4477153 21,17 L21,19 C21,19.5522847 20.5522847,20 20,20 L10,20 C9.44771525,20 9,19.5522847 9,19 L9,17 C9,16.4477153 9.44771525,16 10,16 Z" fill="#000000"/>'+
                '        <rect fill="#000000" opacity="0.3" x="2" y="10" width="5" height="10" rx="1"/>'+
                '    </g>'
                    
                 +
                '</svg>' +
                '            </span>' +
                '        <span class="menu-text">' + wallet_name + '</span>' +
                '<span class="menu-label">' +

                '</span>' +
                '        <i class="menu-arrow"></i>' +
                '    </a>' +
                '    <div class="menu-submenu">' +
                '        <i class="menu-arrow"></i>' +
                '        <ul class="menu-subnav">' + build_site(month_data, users_size, users_list, wallet_type) + '</ul>' +
                '    </div>' +
                '    ' +
                '</li>';
            navi = my_wallet + navi;
        } else {
            load_page('content_pages/wallet_dashboard.html', month_data);
           // just_load_page('content_pages/the_team.html');
            starting = '<li class="menu-section">' +
                '<h4 class="menu-text text-white">' + wallet_name + '</h4>' +
                '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
                '</li>' + build_site(month_data, users_size, users_list, wallet_type) +
                '<li class="menu-section">' +
                '<h4 class="menu-text">Secondary Wallets</h4>' +
                '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
                '</li>';
        }
    }

    var add_new_wallet  = '<li class="menu-section">' +
        '<h4 class="menu-text">Others</h4>' +
        '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
        '</li><li class="menu-item menu-item" aria-haspopup="true"><a class="menu-link" data-toggle="modal" data-target="#add_new_wallet">' +
        '<span class="svg-icon menu-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
        '													<rect x="0" y="0" width="24" height="24"></rect>'+
        '													<path d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z" fill="#000000" opacity="0.3"></path>'+
        '													<path d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z" fill="#000000"></path>'+
        '												</g>'+
        '</svg></span><span class="menu-text">Add New Wallet</span></a></li>' +
        '<li class="menu-section">' +
        '<h4 class="menu-text">Others</h4>' +
        '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
        '</li>';

        var about = '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
        '<a class="menu-link" onclick="just_load_page(\'content_pages/about_us.html\')">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
        '        <polygon points="0 0 24 0 24 24 0 24"/>'+
        '        <path d="M12,18 L7.91561963,20.1472858 C7.42677504,20.4042866 6.82214789,20.2163401 6.56514708,19.7274955 C6.46280801,19.5328351 6.42749334,19.309867 6.46467018,19.0931094 L7.24471742,14.545085 L3.94038429,11.3241562 C3.54490071,10.938655 3.5368084,10.3055417 3.92230962,9.91005817 C4.07581822,9.75257453 4.27696063,9.65008735 4.49459766,9.61846284 L9.06107374,8.95491503 L11.1032639,4.81698575 C11.3476862,4.32173209 11.9473121,4.11839309 12.4425657,4.36281539 C12.6397783,4.46014562 12.7994058,4.61977315 12.8967361,4.81698575 L14.9389263,8.95491503 L19.5054023,9.61846284 C20.0519472,9.69788046 20.4306287,10.2053233 20.351211,10.7518682 C20.3195865,10.9695052 20.2170993,11.1706476 20.0596157,11.3241562 L16.7552826,14.545085 L17.5353298,19.0931094 C17.6286908,19.6374458 17.263103,20.1544017 16.7187666,20.2477627 C16.5020089,20.2849396 16.2790408,20.2496249 16.0843804,20.1472858 L12,18 Z" fill="#000000"/>'+
        '    </g>'+  '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">About</span>' +
        '</a>' +
        '</li>';

        var feedback = '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
        '<a class="menu-link" onclick="just_load_page(\'content_pages/feedback.html\')">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
        '        <polygon points="0 0 24 0 24 24 0 24"/>'+
        '        <path d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z" fill="#000000" fill-rule="nonzero"/>'+
        '    </g>'+
        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">Feedback</span>' +
        '</a>' +
        '</li>';
      var team =  '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
        '<a class="menu-link" onclick="just_load_page(\'content_pages/the_team.html\')">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
        '        <rect x="0" y="0" width="24" height="24"/>' +
        '        <path d="M8,4 L21,4 C21.5522847,4 22,4.44771525 22,5 L22,16 C22,18.209139 20.209139,20 18,20 L11,20 C8.790861,20 7,18.209139 7,16 L7,5 C7,4.44771525 7.44771525,4 8,4 Z" fill="#000000" opacity="0.3"/>' +
        '        <path d="M7,7 L7,9 L5,9 C4.44771525,9 4,9.44771525 4,10 L4,12 C4,12.5522847 4.44771525,13 5,13 L7,13 L7,15 L5,15 C3.34314575,15 2,13.6568542 2,12 L2,10 C2,8.34314575 3.34314575,7 5,7 L7,7 Z" fill="#000000" fill-rule="nonzero"/>' +
        '        <rect fill="#000000" opacity="0.3" x="18" y="7" width="2" height="8" rx="1"/>' +
        '    </g>' +  '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">Developer</span>' +
        '</a>' +
        '</li>';     
          
        
      var faq = '<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">' +
        '<a class="menu-link" onclick="just_load_page(\'content_pages/faq.html\')">' +
        '<span class="svg-icon menu-icon">' +
        '<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->' +
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
        '        <rect x="0" y="0" width="24" height="24"/>'+
        '        <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"/>'+
        '        <path d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z" fill="#000000"/>'+
        '    </g>' +

        '</svg>' +
        '<!--end::Svg Icon-->' +
        '</span>' +
        '<span class="menu-text">FAQ</span>' +
        '</a>' +
        '</li>';

    document.getElementById("list_navi").innerHTML = starting + navi +add_new_wallet+ about+team+faq+feedback;


}

function get_user(user) {
    user_local = user;
    getoptdata(user_Ref, user_local.uid).then((function(finalResult) {
        
        document.getElementById("init_name").innerHTML = name_intials(finalResult.name);
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
            var wal_siz = Object.keys(data).length;
            console.log(wal_siz);
            if (wal_siz <= 0) {
                document.getElementById("list_navi").innerHTML = '<li class="menu-section">' +
                    '<h4 class="menu-text">You have no wallets.</h4>' +
                    '<i class="menu-icon ki ki-bold-more-hor icon-md"></i>' +
                    '</li>';

                var myvar = '<div class="col-lg-12"><div class="card card-custom p-6 mb-8 mb-lg-0"><div class="card-body"><div class="row"><div class="col-sm-7">  <img src="assets/media/logos/logo-4.png" class="max-h-70px" alt=""><h2 class="text-dark mb-4"><p></p><p></p>Welcome, It\'s fresh & empty!</h2><p class="text-dark-50 font-size-lg">You cant control, what you cant measure.  </p></div><div class="col-sm-5 d-flex align-items-center justify-content-sm-end"><a  class="btn font-weight-bolder text-uppercase font-size-lg btn-success py-3 px-6" data-toggle="modal" data-target="#add_new_wallet">Crete your first Wallet</a></div></div></div></div></div>';
                KTApp.block_null('#kt_content', {
                    overlayColor: '#F3F6F9',
                    message: myvar,
                    opacity: 1,
                });
            } else {
                KTApp.unblock('#kt_content');
                generate_navi(data, finalResult.primary_wallet);
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
                }];
                var currency = document.getElementById('add_new_wallet_form').querySelector('[name="currency"]').value;
                var data = {
                    name: name,
                    description: description,
                    location,
                    location,
                    type: type,
                    owner: user,
                    users: [user],
                    categories: categories,
                    currency: currency
                }


                var wallet_Ref = db.collection("wallets")
                addoptdata(wallet_Ref, data).then(function(docid) {

                    var data = {
                        primary_wallet: docid
                    }

                    updateoptdata(user_Ref, user_local.uid, data).then(function(finalResult) {
                        document.getElementById('add_new_wallet_form').reset();
                        get_user(user_local);
                    }).catch((error) => {
                        console.log(error);
                    });



                }).catch((error) => {
                    console.log(error);
                });
            });
        }

        var edit_entry_From_validation = function() {
            FormValidation.formValidation(document.getElementById('edit_incex_form'), { fields: { form_catergory_2: { validators: { notEmpty: { message: 'Category is requried.' } } }, form_description_2: { validators: { notEmpty: { message: 'A description is required.' }, } }, form_amount_2: { validators: { notEmpty: { message: 'An Amount is required.' }, } }, repeat_numbrs: { validators: { between: { min: 0, max: 30, message: 'The number must be between 0 and 30' } } } }, plugins: { trigger: new FormValidation.plugins.Trigger(), submitButton: new FormValidation.plugins.SubmitButton(), bootstrap: new FormValidation.plugins.Bootstrap({ eleInvalidClass: '', eleValidClass: '', }) } }).on('core.form.valid', function() {
                $('#edit_incex_form_modal').modal('toggle');
                var category = document.getElementById('edit_incex_form').querySelector('[name="form_catergory_2"]').value;
                var description = document.getElementById('edit_incex_form').querySelector('[name="form_description_2"]').value;
                var amount = document.getElementById('edit_incex_form').querySelector('[name="form_amount_2"]').value;
                var type = $('input[name="form_radios11_2"]:checked').val();
                var payment = $('input[name="radios11_2"]:checked').val();

                var given_date = $("#kt_datetimepicker_10").find("input").val();
                var timestamp = new Date(given_date);
                var selected_repeated = document.getElementById('repeat_selection').value;
                var num_of_repeat = document.getElementById('example-number-input2').value;

                for (var i = 0; i < num_of_repeat; i++) {
                    update_entry(description, category, amount, timestamp, type, payment, user_id, selected_repeated, num_of_repeat, i).then(function() {}).catch((error) => { console.log(error); });
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