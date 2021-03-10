"use strict";
// Class definition
var user_Ref = db.collection("users");
var updates_data = [];
var feedback_table = '';
var updates = function() {


  
    var init_table = function() {
        KTApp.unblock('#kt_blockui_content');
        if (feedback_table != "") {
            $('#kt_datatable').KTDatatable().empty();
            $('#kt_datatable').KTDatatable().destroy();
        }
        feedback_table = $('#kt_datatable').KTDatatable({

            data: {
                type: 'local',
                source: updates_data,

                serverFiltering: true,
                serverSorting: true,
            },
            pagination: false,
            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: true,



            search: {
                input: $('#kt_subheader_search_form'),
                delay: 400,
                key: 'generalSearch'
            },
            /*        doc_id: doc_id,
                   created_on: created_on,
                   last_updated: last_updated,
                   title: title,
                   message: message,
                   status: status,
                   user_id: user_id,
                   user_email: user_email,
                   user_name: user_name */
            // columns definition
            columns: [{
                    field: 'doc_id',
                    title: '#',
                    sortable: 'asc',
                    width: 40,
                    type: 'number',
                    selector: false,
                    textAlign: 'left',
                    template: function(data) {
                      
                        return '<span class="font-weight-bolder">' + data.counter + '</span>';
                    }
                }, {
                    field: 'User',
                    title: 'User',
                    width: 185,
                    sortable: true,
                    template: function(row) { return icon_nd_photo_name_email(row.photo_url, row.user_name, row.user_email); }
                }, {
                    field: 'message',
                    title: 'Message',
                    width: 250,
                    template: function(row) {
                        return div_message(row.message);
                    }
                },
                {
                    field: 'created_on',
                    title: 'Created On',
                    textAlign: 'center',
                    autoHide: false,
                    width: 100,
                    sortable: true,
                    template: function(row) { var myvar = dnt4table(row.created_on); return myvar; },
                }, {
                    field: 'status',
                    title: 'Status',
                    width: 100,
                    template: function(row) {
                        return format_update_status(row.status);
                    }
                },
                {
                    field: 'last_updated',
                    title: 'Last Updated',
                    textAlign: 'center',
                    autoHide: false,
                    width: 100,
                    sortable: true,
                    template: function(row) { var myvar = dnt4table(row.last_updated); return myvar; },
                },
                {
                    field: 'comment',
                    title: 'Admin\'s Comment',
                    textAlign: 'left',
                    autoHide: false,
                    width: 150,
                    sortable: true,
                    template: function(row) { return row.comment },
                },

                {
                    field: 'Actions',
                    title: ' ',
                    textAlign: 'center',
                    autoHide: false,
                    width: 50,
                    sortable: true,
                    template: function(row) { return update_feedback(row.doc_id, row.status, row.comment) },
                }
            ]
        });
    };
  


    var add_new_feedback_From_validation = function() {
        FormValidation.formValidation(
            document.getElementById('add_new_feedback_form'), {
                fields: {
                    message: {
                        validators: {
                            notEmpty: {
                                message: 'A comment is requried.'
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
            $('#add_new_request').modal('toggle');
            var message = document.getElementById('add_new_feedback_form').querySelector('[name="message"]').value;


            var user_id = document.getElementById('front_page_user_id').value;
            var timestamp = Date.now();
            var data = {
                message: message,
                created_on: timestamp,
                last_updated: timestamp,
                status: 'Under Review',
                user_id: user_id,
                comment: 'Thanks for your Feedback, I will get back to you ASAP.'
            }


            var feedback_Ref = db.collection("feedbacks")
            addoptdata(feedback_Ref, data).then(function(docid) {
                
                Swal.fire({
                  icon: 'success',
                  title: 'Thank you!',
                  text: 'We will get back to you asap.'
                })
                updates.refresh();


            }).catch((error) => {
                console.log(error);
            });
        });
    }
    var edit_feedback_From_validation = function() {
        FormValidation.formValidation(
            document.getElementById('edit_feedback_form'), {
                fields: {
                    comment_edit: {
                        validators: {
                            notEmpty: {
                                message: 'A comment is requried.'
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
            $('#edit_request').modal('toggle');
           
            var comment = document.getElementById('comment_edit').value;
           var status =document.getElementById('status_edit').value;
          var doc_id  =document.getElementById('doc_id').value;
            var timestamp = Date.now();
            var data = {
                last_updated: timestamp,
                status: status,
                comment: comment,
            }


            var feedback_Ref = db.collection("feedbacks")
            updateoptdata(feedback_Ref,doc_id, data).then(function(docid) {
                updates.refresh();
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    var read_feedbacks = function() {
        get_changes().then((function(data) { //
            updates_data = data;
            document.getElementById('items_total').innerText = Object.keys(updates_data).length + " Items";

            init_table();
        })).catch((error) => {
            console.error(error);
        });
    }
    return {
        // public functions
        init: function() {
            KTApp.block('#kt_blockui_content', {
                overlayColor: '#1e1e2d',
                opacity: 0,
                state: 'primary',
                message: 'Fetching Feedbacks...'
            });
        
            read_feedbacks();
            add_new_feedback_From_validation();
            edit_feedback_From_validation();

        },
        refresh: function() {

            read_feedbacks();
        },
    };
}();

jQuery(document).ready(function() {
    document.getElementById("t_wallet_name").innerText = "Feedback List";
    updates.init();
});

function edit_form_modal(doc_id, status, comment) {

    $('#edit_request').modal('toggle');
    document.getElementById('comment_edit').value = comment;
    document.getElementById('status_edit').value = status;
    document.getElementById('doc_id').value = doc_id;
    
}