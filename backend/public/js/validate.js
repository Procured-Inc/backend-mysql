function change()
{
	var check=name_check()  && date_check() && email_check() && number_check() && tenth_check() && twelfth_check() && grad_check() && pg_check();
	if(!check)
	{
		alert("wrong");
		return false;
	}
	else
	{
		alert("right");
		return true;
	}
}
function validate()
{
	var check = email_check();
	if(!check)
	{ alert("wrong"}; return false; }
	else
	{ alert("right"); return true; }
}

function name_check()
{
	var re=/^[a-zA-Z ]+$/;
	if((!$("#first_name").val().match(re)) || $("#first_name").val()==" " || $("#last_name").val().match(re) || $("#last_name").val()==" ")
	{
		/*$("#name11").css({"visibility":"visible", "color":"red"});
		$("#name").css("border","2px solid red");*/
		return false;
	}
	else
	{
		/*$("#name11").css("visibility","hidden");
		$("#name").css("border","none");*/
		return true;
	}
}

function date_check()
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
	{
	/*	$("#date").css({"visibility":"visible","color":"red"});
		$("#date_style").css("border","2px solid red");
		*/return false;
	}
	else
	{
		/*$("#dob1").css("visibility","hidden");
		$("#date_style").css("border","none");
		*/return true;
	}
}

function email_check()
{
	var email=document.getElementById("student_Id");
	var re1 = /^[a-z]{1}[a-zA-Z0-9._-]+@[a-z0-9_]+\.[a-zA-Z]{2,3}$/;
	if((!$("#student_Id").val().match(re1)) || $("#student_Id").val()==" ")
	{
		/*$("#email1").css({"visibility":"visible","color":"red"});
		$("#email").css("border","2px solid red");
		*/return false;
	}
	else
	{
		/*$("#email1").css("visibility","hidden");
		$("#email").css("border","none");
		*/return true;
	}
}
function number_check()
{
	if($("#contact_no").val().length!=10)
	{
		/*$("#number1").css({"visibility":"visible","color":"red"});
		$("#number").css("border","2px solid red");
		*/return false;
	}
	else
	{
		/*$("#number1").css("visibility","hidden");
		$("#number").css("border","none");
		*/return true;
	}
}
function tenth_check()
{
	if($("#yop-10").val().length!=4)
	{ return false; }
	else { return true; }
}

function twelfth_check()
{
	if($("#yop-12").val().length!=4)
	{ return false; }
	else { return true; }
}

function grad_check()
{
	if($("#yop-grad").val().length!=4)
	{ return false; }
	else { return true; }
}

function pg_check()
{
	if($("#yop-pg").val().length!=4)
	{ return false; }
	else { return true; }
}