document.querySelectorAll("body.menu-company-directory").addEventListener("load", doctorReplaceText);
function doctorReplaceText() {
    var orignalstring = document.querySelectorAll('.wf-list-name a');
        if(orignalstring !== null){
            [].forEach.call(orignalstring, function (el) {
                if(el.innerHTML.includes("Dr ")){
                  el.innerHTML = el.innerHTML.replace("Dr ","Dr. ")
                }
              });
        }
}
function initialize() {
doctorReplaceText();
}
window.onload = initialize;