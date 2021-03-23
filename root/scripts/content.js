var global_data;
var unsaved_flag = false;

function load_page(url, l) {
    if(!unsaved_flag){

        load_p(url, l);
    }else{
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                save_changes();   
                load_p(url, l);   
            } else if (result.isDenied) {
                load_p(url, l);
            }
          });
    }
   
}
function just_load_page(url) {  
    $('#kt_content').load(url);
}



 function load_p(url, l){
    var l = l.split(',');
    global_data = l;
    $('#kt_content').load(url);
 }

 window.onbeforeunload = function(){     
    if(unsaved_flag){
     save_changes();
     let timerInterval
     Swal.fire({
       title: 'Saving unsaved work.',
       html: 'See you soon.',
       timer: 2000,
       timerProgressBar: true,
       didOpen: () => {
         Swal.showLoading()
         timerInterval = setInterval(() => {
           const content = Swal.getContent()
           if (content) {
             const b = content.querySelector('b')
             if (b) {
               b.textContent = Swal.getTimerLeft()
             }
           }
         }, 100)
       },
       willClose: () => {
         clearInterval(timerInterval)
       }
     }).then((result) => {
       /* Read more about handling dismissals below */
       if (result.dismiss === Swal.DismissReason.timer) {
         console.log('I was closed by the timer')
       }
     });
    }
  }