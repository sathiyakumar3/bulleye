var global_data;
var unsaved_flag = false;

function active_panels(c){
  
  for (let i = 0; i < page_counter; i++) {
    var myEle = document.getElementById("menu_"+i);
    if(myEle){
    if(i==(c-1)){
      myEle.classList.add("menu-item-active");
    }else{
      
      myEle.classList.remove("menu-item-active");
    }
  }
  }
}



function load_page(c,url, l) {
  active_panels(c);


 // document.getElementById("div1").classList.remove("classToBeRemoved");
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
                unsaved_flag = false;
                save_changes();   
                load_p(url, l);   
            } else if (result.isDenied) {
                unsaved_flag = false;
                load_p(url, l);
            }
          });
    }
   
}
function just_load_page(c,url) {  
  console.log(c);
    $('#kt_content').load(url);
}



 function load_p(url, l){
    var l = l.split(',');
    global_data = l;


   // $('.active').removeClass('active');
   // $('.active').addClass('active');

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