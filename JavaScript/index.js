
var last = document.querySelector(".last");
var wrap = document.querySelector(".wrap");
var wrapid = document.querySelector("#wrap");
var num = Math.ceil(Math.random()*20)-1;

addphoto();
sortphoto(num);
var data = data;
function addphoto(){
    var tel = wrapid.innerHTML;
    var html = [];
    var nav = [];
    for( var i = 0; i < data.length; i++){
        var _html = tel
                     .replace("{{index}}", data[i].index)
                     .replace("{{path}}",  data[i].path)
                     .replace("{{title}}", data[i].title)
                     .replace("{{description}}", data[i].disc);
        html.push(_html); 
        nav.push(
            '<span id="nav_' + data[i].index +'" ' + 'class="i iconfont font">&nbsp;</span>'
        );            
    }
    html.push('<div class="nav">' + nav.join("") + "</div>");
    wrapid.innerHTML = html.join('');
    sortphoto(num);
}

var tem;
function turn () {
    initi();
    var ele = this.className;
    var a = this.id.split("_")[1];
    var nav1 = document.getElementById("nav_" + a);
    nav1.className += " icurrent ";
     if(!/photoCenter/.test(ele)){
         return sortphoto(a-1);
     }

    if(/photoFront/.test(ele)){
        ele = ele.replace("photoFront" , "photoBack");
        nav1.className += " iback ";
    }else{
        ele = ele.replace("photoBack" , "photoFront");
         nav1.className += " icurrent ";
    }
    return this.className = ele;
}
    var photo = document.querySelectorAll(".photo");
    var nas ;
    for(var i = 0; i < photo.length; i++){
        photo[i].nas = i;
        photo[i].onclick = turn;
    }
     var nav = document.querySelectorAll(".i");
    for(var i = 0 ; i < nav.length ; i++){
       nav[i].tem = i;
    //    alert(tem);
        nav[i].onclick = function () {
            //alert(this.tem);
            if(!/photoCenter/.test(photo[this.tem].className)){
                initi();
                this.className += " icurrent ";
                return sortphoto(this.tem);
            }       
            photo[this.tem].click();
            //initi();
            var iclass = this.className;
            if(/icurrent/.test(iclass)){
                 iclass = iclass.replace("icurrent" , "iback");
            }else{
                iclass += " icurrent";
                this.className = iclass;
            }
            
        }

    }
    function initi(){
        var nav = document.querySelectorAll(".i");
        for(var i = 0 ; i < nav.length ; i++){
                 nav[i].className = nav[i].className.replace(/\s*icurrent\s*/ , " ");
                 nav[i].className = nav[i].className.replace(/\s*iback\s*/ , " ");
         }  
    }



function range(){
        var range = {left:{x:[] , y:[]}, right:{x:[] , y:[]}};
        var wrap = document.querySelector("#wrap");
        var photo = document.querySelectorAll(".photo")[0];
        var _wrap = {w:wrap.clientWidth, h:wrap.clientHeight};
        var _photo = {w:photo.clientWidth, h:photo.clientHeight};
        range.wrap = _wrap;
        range.photo = _photo;
        range.left.x = [0  , _wrap.w / 2];
        range.left.y = [wrap.style.top - _photo.h / 2 , _wrap.h + _photo.h    ];
        range.right.x = [_wrap.w / 2 + _photo.w , _wrap.w-_photo.w/2 ];
        range.right.y = [wrap.style.top - _photo.h / 2 , _wrap.h + _photo.h   ];
        return range;
}

function lim(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);
    var diff = max - min;

    var number = Math.round(Math.random() * diff + min);
    return number;
}

function sortphoto(n){
        var _photo = document.querySelectorAll(".photo");
        var photos = [];
    for(var i = 0; i < _photo.length; i++){
        
        _photo[i].className = _photo[i].className.replace(/\s*photoCenter\s*/ , ' ');
        _photo[i].className = _photo[i].className.replace(/\s*photoFront\s*/ , ' ');
        _photo[i].className = _photo[i].className.replace(/\s*photoBack\s*/ , ' ');
        _photo[i].className += " photoFront "; 
        _photo[i].style.left = "";
        _photo[i].style.top = "";
        _photo[i].style.transform = "rotate(360deg) scale(1.3)";
        
        photos.push(_photo[i]);
    }
        console.log(photos);
        var photo_center = document.getElementById("photo_"+n);
        photo_center = photos.splice(n , 1)[0];
        photo_center.className += " photoCenter";
        var photo_left = photos.splice(0 , Math.ceil(photos.length/2));
        var photo_right = photos;
        var ranges = range();
        for(var i = 0; i < photo_left.length; i++){
            var photo = photo_left[i];
            photo.style.left = lim(ranges.left.x) + "px";
            photo.style.top = lim(ranges.left.y) + "px";
            photo.style.transform = "rotate(" + lim([-100, 100]) + "deg) ";
        }
        for(var i = 0; i < photo_right.length; i++){
            var photo = photo_right[i];
            photo.style.left = lim(ranges.right.x) + "px";
            photo.style.top = lim(ranges.right.y) + "px";
            photo.style.transform = "rotate(" + lim([-90, 90]) + "deg)";
        }
        // var nav = document.getElementById("nav_" + n);
        // nav.className += "i_current";
        

}
