function change()
{
	var check=first_name_check() && last_name_check() && email_check() && number_check();
	if(!check)
	{
		alert("check the fields");
		return false;
	}
	else
		return true;
}

function login_check()
{
    var check= email_check();
    if(!check){ alert("wrong"); return false;}
    else{return true;}
}

function validate()
{
	var check = email_check();
	if(!check)
	{ alert("wrong"); return false; }
	else
	 return true; 
}

function signup_check()
{
	var check=email_check() && number_check();
	if(!check) { alert("wrong"); return false; }
	else { return true; }
}

function first_name_check()
{
	var re=/^[a-zA-Z ]+$/;
	if((!$("#first_name").val().match(re)) || $("#first_name").val()==" " )
	{
        alert("enter valid First Name");
		$("#first_name").css("border","1px solid red");
		$("#first_name").focus();
        return false;
	}
    else
	{
		/*$("#name11").css("visibility","hidden");*/
		$("#first_name").css("border","1px solid #ccc");
		return true;
	}
}
function last_name_check()
{
    var re=/^[a-zA-Z ]+$/;
    if((!$("#last_name").val().match(re)) || $("#last_name").val()==" ")
        {
            alert("enter valid Last Name");
            $("#last_name").css("border","1px solid red");
            $('#last_name').focus();
            return false;
        }
	else
	{
		/*$("#name11").css("visibility","hidden");*/
		$("#last_name").css("border","1px solid #ccc");
		return true;
	}
}

function email_check()
{
	//var email=document.getElementById("student_Id");
	var re1 = /^[a-z]{1}[a-zA-Z0-9._-]+@[a-z0-9_]+\.[a-zA-Z]{2,3}$/;
	if((!$("#student_Id").val().match(re1)) || $("#student_Id").val()==" ")
	{
		/*$("#email1").css({"visibility":"visible","color":"red"});*/
		$("#student_Id").css("border","1px solid red");
        $("#student_Id").focus();
		return false;
	}
	else
	{
		/*$("#email1").css("visibility","hidden");*/
		$("#student_Id").css("border","1px solid #ccc");
		return true;
	}
}

function number_check()
{
    var re = /^(0|[1-9][0-9]*)$/;
	if($("#contact_no").val().length!=10 )
	{
		/*$("#number1").css({"visibility":"visible","color":"red"});*/
        alert("Enter 10 digits");
        $("#contact_no").css("border","1px solid red");
		$("#contact_no").focus();
        return false;
	}
    if(!$("#contact_no").val().match(re))
        {
            alert("Enter only numeric values");
        }
	else
	{
		/*$("#number1").css("visibility","hidden");*/
		$("#contact_no").css("border","1px solid #ccc");
		return true;
	}
}

/*function tenth_check()
{
	if($("#yop-10").val().length!=4)
	{ 
        $("#yop-10").css("border","2px solid red"); 
        return false;
    }
	else
    { 
        $("#yop-10").css("border","1px solid #ccc");
        return true; 
    }
}

function twelfth_check()
{
	if($("#yop-12").val().length!=4)
	{ 
        $("#yop-12").css("border","2px solid red"); 
        return false;
    }
	else
    { 
        $("#yop-12").css("border","1px solid #ccc");
        return true; 
    }
}

function grad_check()
{
	if($("#yop-grad").val().length!=4)
	{ 
        $("#yop-grad").css("border","2px solid red"); 
        return false;
    }
	else
    { 
        $("#yop-grad").css("border","1px solid #ccc");
        return true; 
    }
}

function pg_check()
{
	if($("#yop-pg").val().length!=4)
	{
        $("#yop-pg").css("border","2px solid red");
        return false;
    }
	else
    {
        $("#yop-pg").css("border","1px solid #ccc"); 
        return true; 
    }
}*/

/*function date_check()
{
	var dob=document.getElementById("date");
	var d=new Date(),
	month='' + (d.getMonth()+1),
	day=''+d.getDate(),
	year=d.getFullYear();
	if(month.length<2) month='0'+ month;
	if(day.length<2) day='0'+ day;
	var today=[year,month,day].join('-');

	if((dob.value==null) || (dob.value<="1900-08-28") || (dob.value>=today))
	{*/
	/*	$("#date").css({"visibility":"visible","color":"red"});
		$("#date_style").css("border","2px solid red");
		*//*return false;
	}
	else
	{
		/*$("#dob1").css("visibility","hidden");
		$("#date_style").css("border","none");
		*//*return true;
	}
}*/
