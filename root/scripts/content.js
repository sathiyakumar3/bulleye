function load_page(url, data) {
    if (data) {
        document.getElementById("page_data").value = data;

    }

    $('#kt_content').load(url);

}