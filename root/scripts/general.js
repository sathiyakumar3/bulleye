const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const monthNames_2 = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function shortdate(d) {
    return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" +
        d.getFullYear();
}

function month_year(d) {

    return (monthNames_2[d.getMonth()] + " , " + d.getFullYear());
}

function shortdateclean(d) {

    return ("0" + d.getDate()).slice(-2) + " " + monthNames[d.getMonth()] + " , " +
        d.getFullYear();
}

function monthts(d) {
    return (monthNames[d.getMonth()] + " " + d.getFullYear());
}

function shorttime(d) {
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}

function shortdatetimeclean(d) {
    return ("0" + d.getDate()).slice(-2) + " " + monthNames[d.getMonth()] + " , " + shorttime(d);
}

function numberWithCommas(x) {
x = Math.round(x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


    function nFormatter(num, digits) {
        const lookup = [
          { value: 1, symbol: "" },
          { value: 1e3, symbol: "k" },
          { value: 1e6, symbol: "M" },
          { value: 1e9, symbol: "G" },
          { value: 1e12, symbol: "T" },
          { value: 1e15, symbol: "P" },
          { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function(item) {
          return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
      }
      

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function shortts(d) {
    return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}

function rmelearray(i, actual) {
    delete actual[i];
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

function greetings(){
    var d = new Date();
var time = d.getHours();
var greet ='';

if (time < 12) {
    greet = ' Good Morning, ';
}
if (time >= 12 &&  time< 17) {
    greet = ' Good Afternoon, ';
}
if (time> 17) {
    greet = ' Good Evening, ';
}

return greet; 
}

function arrayRemove(arr, value) {     
    return arr.filter(function(ele){ 
     /*    console.log(ele);
        console.log(value); */
        return ele != value; 
    });
}
