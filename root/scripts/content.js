var global_data;

function load_page(url, l) {
    var l = l.split(',');
    global_data = l;

    $('#kt_content').load(url);
}