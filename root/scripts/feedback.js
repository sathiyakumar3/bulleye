"use strict";
// Class definition
var user_Ref = db.collection("users");

var feedback_Ref = db.collection("feedbacks");
var feedback_table = '';
var sep_data =[];

function format_timeline(photo,name,message,date_time,status,comment){
  
  var html_div =  '<div class="timeline-item">'+
'                                <div class="timeline-media">'+
'                                    <img alt="Pic" src="' + photo + '">'+
'                                </div>'+
'                                <div class="timeline-content">'+
'                                    <div class="d-flex align-items-center justify-content-between mb-3">'+
'                                        <div class="mr-2">'+
'                                            <a href="#" class="text-dark-75 text-hover-primary font-weight-bold">'+name+'</a>'+
'                                            <span class="text-muted ml-2">'+shortdatetimeclean(new Date(date_time))+'</span>&nbsp;&nbsp;'+format_update_status(status)+
'                                        </div>'+
'                                      '+
'                                    </div>'+
'                                    <p class="p-0">'+message+'</p>'+
'                                    <p class="p-0" Admin : >'+comment+'</p>'+

'                                </div>'+
'                            </div>'
return html_div
}

function build_timeline(data) {
   var html_div = '';
    Object.keys(data).map(function(key, index) {
    
        html_div=format_timeline(data[key]['photo_url'],data[key]['user_name'],data[key]['message'],data[key]['last_updated'],data[key]['status'],data[key]['comment'])+html_div;
     
    });
    return html_div;
}
var updates = function() {

    var init_table = function(x,y) {
      
        if (feedback_table != "") {
            $(x).KTDatatable().empty();     
            $(x).KTDatatable().destroy();
        }
      
        feedback_table = $(x).KTDatatable({
 
             data: {
                 type: 'local',
                 source: y,
 
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
 
 
 
          
               columns: [{
                     field: 'doc_id',
                     title: '#',
                     sortable: 'asc',
                     width: 40,
                     type: 'number',
                   
                     textAlign: 'left',
                     template: function(data) {
                       
                         return '<span class="font-weight-bolder">' + data.counter + '</span>';
                     }
                 }, {
                     field: 'User',
                     title: 'User',
                     width: 170,
                     sortable: true,
                     template: function(row) { return photo_nd_name(row.photo_url, row.user_name); }
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
                document.getElementById('add_new_feedback_form').reset();
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



            updateoptdata(feedback_Ref,doc_id, data).then(function(docid) {
                Swal.fire({
                    icon: 'success',
                    title: 'Saved Successfully!',               
                  })
                updates.refresh();
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    var read_feedbacks = function() {
        get_changes().then((function(data) { //
          //  updates_data = data;
          document.getElementById('items_total').innerText = Object.keys(data).length + " Items";
            sep_data = sep_completed(data);

         KTApp.unblock('#kt_blockui_content');
     
            updates.run1();
           
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
        run1:function(){
            init_table('#kt_datatable',sep_data[0]);
        },
        run2:function(){
            init_table('#kt_datatable',sep_data[1]);
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

function sep_completed(data) {
    var data_only_del = [];
    var data_without_del = [];
    Object.keys(data).map(function(key, index) {
        if(data[key]['status']=='Delivered' || data[key]['status'] == 'Declined'){
        
        }else{
            data_without_del.push(data[key]);
        }
        data_only_del.push(data[key]);
     
    });
    return [data_without_del, data_only_del];
}
function delete_feedback(){
    $('#edit_request').modal('toggle');
   var doc_id  =document.getElementById('doc_id').value;
    deloptdoc(feedback_Ref,doc_id).then((function(data) { 

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
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted Successfully!',               
                  })
                  updates.refresh();
            }
          })



     
    })).catch((error) => {
        console.error(error);
    });
}

$('#enable_all').change(function() {
    if($(this).is(":checked")) {
        updates.run2();
        console.log("Checked");
    }else{
        updates.run1();
        console.log(" NOT Checked");
    }
     
});