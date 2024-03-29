
currency_convertor = {
    AED: 'د.إ',
    AFN: '؋',
    ALL: 'L',
    AMD: '֏',
    ANG: 'ƒ',
    AOA: 'Kz',
    ARS: '$',
    AUD: '$',
    AWG: 'ƒ',
    AZN: '₼',
    BAM: 'KM',
    BBD: '$',
    BDT: '৳',
    BGN: 'лв',
    BHD: '.د.ب',
    BIF: 'FBu',
    BMD: '$',
    BND: '$',
    BOB: '$b',
    BOV: 'BOV',
    BRL: 'R$',
    BSD: '$',
    BTC: '₿',
    BTN: 'Nu.',
    BWP: 'P',
    BYN: 'Br',
    BYR: 'Br',
    BZD: 'BZ$',
    CAD: '$',
    CDF: 'FC',
    CHE: 'CHE',
    CHF: 'CHF',
    CHW: 'CHW',
    CLF: 'CLF',
    CLP: '$',
    CNY: '¥',
    COP: '$',
    COU: 'COU',
    CRC: '₡',
    CUC: '$',
    CUP: '₱',
    CVE: '$',
    CZK: 'Kč',
    DJF: 'Fdj',
    DKK: 'kr',
    DOP: 'RD$',
    DZD: 'دج',
    EEK: 'kr',
    EGP: '£',
    ERN: 'Nfk',
    ETB: 'Br',
    ETH: 'Ξ',
    EUR: '€',
    FJD: '$',
    FKP: '£',
    GBP: '£',
    GEL: '₾',
    GGP: '£',
    GHC: '₵',
    GHS: 'GH₵',
    GIP: '£',
    GMD: 'D',
    GNF: 'FG',
    GTQ: 'Q',
    GYD: '$',
    HKD: '$',
    HNL: 'L',
    HRK: 'kn',
    HTG: 'G',
    HUF: 'Ft',
    IDR: 'Rp',
    ILS: '₪',
    IMP: '£',
    INR: '₹',
    IQD: 'ع.د',
    IRR: '﷼',
    ISK: 'kr',
    JEP: '£',
    JMD: 'J$',
    JOD: 'JD',
    JPY: '¥',
    KES: 'KSh',
    KGS: 'лв',
    KHR: '៛',
    KMF: 'CF',
    KPW: '₩',
    KRW: '₩',
    KWD: 'KD',
    KYD: '$',
    KZT: '₸',
    LAK: '₭',
    LBP: '£',
    LKR: '₨',
    LRD: '$',
    LSL: 'M',
    LTC: 'Ł',
    LTL: 'Lt',
    LVL: 'Ls',
    LYD: 'LD',
    MAD: 'MAD',
    MDL: 'lei',
    MGA: 'Ar',
    MKD: 'ден',
    MMK: 'K',
    MNT: '₮',
    MOP: 'MOP$',
    MRO: 'UM',
    MRU: 'UM',
    MUR: '₨',
    MVR: 'Rf',
    MWK: 'MK',
    MXN: '$',
    MXV: 'MXV',
    MYR: 'RM',
    MZN: 'MT',
    NAD: '$',
    NGN: '₦',
    NIO: 'C$',
    NOK: 'kr',
    NPR: '₨',
    NZD: '$',
    OMR: '﷼',
    PAB: 'B/.',
    PEN: 'S/.',
    PGK: 'K',
    PHP: '₱',
    PKR: '₨',
    PLN: 'zł',
    PYG: 'Gs',
    QAR: '﷼',
    RMB: '￥',
    RON: 'lei',
    RSD: 'Дин.',
    RUB: '₽',
    RWF: 'R₣',
    SAR: '﷼',
    SBD: '$',
    SCR: '₨',
    SDG: 'ج.س.',
    SEK: 'kr',
    SGD: 'S$',
    SHP: '£',
    SLL: 'Le',
    SOS: 'S',
    SRD: '$',
    SSP: '£',
    STD: 'Db',
    STN: 'Db',
    SVC: '$',
    SYP: '£',
    SZL: 'E',
    THB: '฿',
    TJS: 'SM',
    TMT: 'T',
    TND: 'د.ت',
    TOP: 'T$',
    TRL: '₤',
    TRY: '₺',
    TTD: 'TT$',
    TVD: '$',
    TWD: 'NT$',
    TZS: 'TSh',
    UAH: '₴',
    UGX: 'USh',
    USD: '$',
    UYI: 'UYI',
    UYU: '$U',
    UYW: 'UYW',
    UZS: 'лв',
    VEF: 'Bs',
    VES: 'Bs.S',
    VND: '₫',
    VUV: 'VT',
    WST: 'WS$',
    XAF: 'FCFA',
    XBT: 'Ƀ',
    XCD: '$',
    XOF: 'CFA',
    XPF: '₣',
    XSU: 'Sucre',
    XUA: 'XUA',
    YER: '﷼',
    ZAR: 'R',
    ZMW: 'ZK',
    ZWD: 'Z$',
    ZWL: '$'
}







function access_restric_error() { Swal.fire({ icon: 'error', title: 'Access Restricted', html: 'Not available for ' + form_wal_type('Free'), }) }



function name_intials(str) {
    var acronym;
    if (str.trim().indexOf(' ') != -1) {
        var matches = str.match(/\b(\w)/g);
        acronym = matches.join('').substring(0, 2)
    } else { acronym = str.substring(0, 2) }
    return acronym.toUpperCase();
}

function sort_obj(obj, key) {
    obj.sort(function (a, b) {
        var c = new Date(a[key]);
        var d = new Date(b[key]);
        return c - d;
    });
    return obj;
}

function sortOn(property) { return function (a, b) { if (a[property] < b[property]) { return -1; } else if (a[property] > b[property]) { return 1; } else { return 0; } } }
var cat_icon_list = [];
var newar = [];

function get_cat_ic(name) { if (newar.hasOwnProperty(name)) { return newar[name]['icon']; } else { return 'adminiate_sec_icon' } }


function data_process(data, find) {
    var sum = 0;
    Object.keys(data).map(function (key, index) {
        var check = 0;
        Object.keys(find).sort().map(function (key2, index2) { if (find[key2].includes(data[key][key2])) { check++; } });
        if (check == Object.keys(find).length) { sum = Number(data[key]['Amount']) + sum; }
    });
    return sum
}

function cat_process(data) {
    data = sort_obj(data, 'Timestamp');
    var cat = [];
    Object.keys(data).map(function (key, index) {
        var mts = monthts(data[key]['Timestamp']);
        if (!cat.includes(mts)) { cat.push(mts); }
    });
    return cat
}

function user_process(data) {
    var user_profile = [];
    Object.keys(data).map(function (key, index) {
        var REC_user = data[key]['user'];
        var REC_user_email = data[key]['user_email'];
        var REC_user_name = data[key]['user_name'];
        var REC_user_photo = data[key]['photo_url'];
        if (!user_profile.hasOwnProperty(REC_user)) {
            user_profile = {
                [REC_user]: { user_name: REC_user_name, user_email: REC_user_email, photo_url: REC_user_photo, }
            }
        }
    });
    return user_profile
}

function date_process(data) {
    data = sort_obj(data, 'Timestamp');
    var first_day = "";
    var last_day = "";
    var month_list = [];
    var month_list_2 = [];
    Object.keys(data).map(function (key, index) {
        var datetime = data[key]['Timestamp'];
        if(!month_list.includes(monthts(datetime))){
            month_list.push(monthts(datetime));
            month_list_2.push(datetime);
        }
        if (first_day == "" || datetime < first_day) { first_day = datetime }
        if (last_day == "" || datetime > last_day) { last_day = datetime }
    });
    var results = [first_day, last_day,month_list_2];
    
    return results;
}

function date_filter(data, to, from) {
    to = new Date(to);
    from = new Date(from);

    var new_data = [];
    Object.keys(data).map(function (key, index) {
        var datetime = data[key]['Timestamp'];
        if (datetime <= to && datetime >= from) {
            new_data.push(data[key]);
        }
    });
    return new_data;
}

function get_selected_month_data(data, item) {
    var new_data = {};
    Object.keys(data).map(function (key, index) {

        var datetime = new Date(data[key]['Timestamp']);
        if (datetime != null) {
            if (item == monthts(datetime)) {
                /*  var value = {
                   [datetime]: data[key]            
                 }  
                   new_data.push(value); */
                new_data[datetime] = data[key];
            }
        }

    });
    return new_data;
}

function delete_item(data, item) {
    var new_data = [];
    Object.keys(data).map(function (key, index) {
        var datetime = new Date(data[key]['Timestamp']);
        item = new Date(item);
        if (moment(item) - moment(datetime) != 0) { new_data.push(data[key]); }
    });
    return new_data;
}


function check_RecordID(data) {

    var counter = 0;
    Object.keys(data).map(function (key, index) {
        if (data[key]['Timestamp'] != null) {
            counter++;
            data[key]['RecordID'] = counter;
        }

    });
    return data;
}

function get_available_data(data, find, search) {
    //  data = sort_obj(data, 'Timestamp');
    var chart = [];
    var size = Object.keys(search).length;
    Object.keys(data).map(function (key, index) {
        var month = data[key][find];
        var search_flag = 0;
        Object.keys(search).sort().map(function (key2, index2) {

            if (search[key2].includes(data[key][key2])) {
                search_flag++;
            }
        });

        if (search_flag == size) {

            if (!chart.hasOwnProperty(month)) {
                chart[month] = Number(data[key]['Amount']);
            } else {
                chart[month] = Number(data[key]['Amount']) + chart[month];
            }
        }
    });

    return chart
}



function get_data(data, search, cat) {
    return new Promise(function (resolve, reject) {
        var chart = chart_reset(cat);
        var size = Object.keys(search).length;
        Object.keys(data).map(function (key, index) {
            var month = data[key]['doc_id'];
            var search_flag = 0;
            Object.keys(search).sort().map(function (key2, index2) {
                if (search[key2].includes(data[key][key2])) {
                    search_flag++;
                }
            });
            if (search_flag == size) {
                chart[month] = Number(data[key]['Amount']) + chart[month];
            }
        });
        resolve(extract_data(cat, chart))
    });

}

function chart_reset(cat) {
    var data = [];
    for (var i = 0; i < cat.length; i++) {
        data[cat[i]] = 0;
    }
    return data
}

function chart_subraction(data, data1) {
    var result = [];
    var chart = [];
    if (Object.keys(data).length > Object.keys(data1).length) { chart = data; } else { chart = data1; }
    var val1 = 0;
    var val2 = 0;
    Object.keys(chart).map(function (key, index) {
        if (data.hasOwnProperty(key)) { val1 = data[key]; } else { val1 = 0; }
        if (data1.hasOwnProperty(key)) { val2 = data1[key]; } else { val2 = 0; }
        result[key] = val1 - val2;
    });
    return result
}

function extract_data(cat, data) {
    var chart = [];
    for (var i = 0; i < cat.length; i++) {
        chart.push(data[cat[i]]);
    }
    return chart
}


function extract_net_data(data) {
    var chart = [];
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        var sum = data[i] + sum;
        chart.push(sum);
    }
    return chart
}

function data_for_pie(data) {
    var data_set = [];
    var cat_set = [];
    Object.keys(data).map(function (key, index) {
        data_set.push(data[key]);
        cat_set.push(key);
    });
    return [data_set, cat_set];
}

Array.prototype.remove_item_from_array = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

