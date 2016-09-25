function Init () 
        {
            if (document.hasFocus)
                setInterval ("CheckFocus ()", 200);
            else
                alert ("Your browser does not support the hasFocus method");
        }
     var i=0;
        function CheckFocus ()
        {
       
            var info = document.getElementById ("info");
            if (document.hasFocus())
            {
                info.innerHTML = "The document has the focus." + (i++);
             //   alert("warning");
                //console.log(i);
                //window.open("/test");
            }
            else 
            {
                info.innerHTML = "The document doesn't have the focus."; 
            }
        }
