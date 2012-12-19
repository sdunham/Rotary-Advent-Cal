var curDate = new Date(); //Today's date
var month = curDate.getMonth(); //Zero-based month number the calendar is to be used (0=January, 1=February,..., 11=December).
var year = 2012; //4-digit year the calendar is to be used.
var numDays; //Number of days in the given month
var isLeap = new Date(year,1,29).getDate() == 29; //Is this a leap year?
var selected = 0; //Currently selected day
var position = 0; //Position of the selected day

$().ready(function() {
	//Prepopulate content section with "About" text
	$("#calendar #calContent #contentTitle").html(content[0].title);
	$("#calendar #calContent #contentText").html(content[0].text);
	$("#calendar #calContent #contentLink").hide();

	//Function to rotate the ring of circles left (counter clockwise)
	var leftArc = function(i,selectedPos) {
      return new $.path.arc({
        center: [292,185],	
    		radius: 348,	
    		start: 180-i*(360/(numDays+1)),
    		end: 180-i*(360/(numDays+1)) + (360/(numDays+1))*selectedPos,
    		dir: 1
      });
    }
	//Function to rotate the ring of circles right (clockwise)
	var rightArc = function(i,selectedPos) {
      return new $.path.arc({
        center: [285,185],	
    		radius: 348,	
    		start: 180-i*(360/(numDays+1)),
    		end: 180-i*(360/(numDays+1)) + (360/(numDays+1))*selectedPos,
    		dir: -1
      });
    }
	//Function to populate the content section
	var populateContent = function(){
		$("#calendar #calContent #contentTitle").html(content[selected].title);
		$("#calendar #calContent #contentText").html(content[selected].text);
		if(content[selected].link == ""){
			$("#calendar #calContent #contentLink").hide();
		}
		else{
			$("#calendar #calContent #contentLink").show();
			$("#calendar #calContent #contentLink").attr("href", content[selected].link);
		}
	}
	
	switch(month){
	//January
	case 0:
		numDays = 31;
		break;
	//February
	case 1:
		numDays = 28;
		break;
	//March
	case 2:
		numDays = 31;
		break;
	//April
	case 3:
		numDays = 30;
		break;
	//May
	case 4:
		numDays = 31;
		break;
	//June
	case 5:
		numDays = 30;
		break;
	//July
	case 6:
		numDays = 31;
		break;
	//August
	case 7:
		numDays = 31;
		break;
	//September
	case 8:
		numDays = 30;
		break;
	//October
	case 9:
		numDays = 31;
		break;
	//November
	case 10:
		numDays = 30;
		break;
	//December
	case 11:
		numDays = 31;
		break;
	default:
		numDays = 31;
	}
	
	//Override numdays if this is February and a leap year
	if(month == 1 && isLeap){
		numDays = 29;
	}
	
    //Generate ring of days
	for(var i=0; i<numDays+1; i++ ) {
		var path = leftArc(i,i);

		var css = { 
			width: 67.5, 
			height: 67.5, 
			marginLeft: -10, // offset the div, so center is at origin
			marginTop: -10 
		}
		//Days which the user has access to
		if((curDate.getMonth() == month && i <= curDate.getDate()) || curDate.getMonth() > month || curDate.getFullYear() > year){
			var $$ = $("<span class='pixel " + i + " adventAllowed hoverAllowed'>Day " + i + "</span>").css(css);
		}
		//Days which the user doesn't have access to yet
		else{
			var $$ = $("<span class='pixel " + i + "'>Day " + i + "</span>").css(css);
		}
		//About This Calendar (default starting point)
		if(i==0){
			var $$ = $("<span class='pixel " + i + " adventAllowed adventSelected hoverAllowed'>About</span>").css(css);
		}
		//Invalid days for this month (blank)
		if(i>numDays){
			var $$ = $("<span class='pixel " + i + "'></span>").css(css);
		}
		// initialize to start
		$$.css(path.css(1));
		$("#dayHolder").append($$);
    }
	//User clicks on one of the date circles
	$(".pixel").click(function(){
		selected = $.trim($(this).attr("class").substring(6,8));
		var i = 0;
		position = $(".pixel").index(this);
		var current = this;
		var dateAvailable = new Date(year,month,selected);
		//Clicked on a day they have access to
		if($(this).hasClass("adventAllowed")){
			//Hide content section (slide up)
			$("#calContent").slideUp('slow');
			$(".pixel").removeClass("adventSelected");
			$(".hoverAllowed").removeClass("hoverAllowed");
			$(this).addClass("adventSelected");
			//If it's in the right half of the circle animate left (counter clockwise), populate content, and slide the content section down
			if(position>= 0 && position <= 16){
			  $("#calendar .pixel").each(function() {
				  $(this).stop().animate({path: leftArc(i,position) }, 1500, function(){
					populateContent();
					$("#calContent").slideDown('slow');
					$(".adventAllowed").addClass("hoverAllowed");
				  });
				  i++;
			  });
			}
			//Otherwise animate right (clockwise), populate content, and slide the content section down
			else{
			  $("#calendar .pixel").each(function() {
				  $(this).stop().animate({path: rightArc(i,position) }, 1500, function(){
					populateContent();
					$("#calContent").slideDown('slow');
					$(".adventAllowed").addClass("hoverAllowed");
				  });
				  i++;
			  });
			}
			//Reorder the DOM to simplify next traversal
			$(".pixel").each(function(){
				var reorder = this;
				if(reorder === current){return false;}
				else{$(this).detach().appendTo("#dayHolder");}
			});
		}
		//Clicked on a day they don't have access to
		else{
			//Hide content section (slide up)
			$("#calContent").slideUp('slow', function(){
				$("#calendar #calContent #contentTitle").html("No Peeking!");
				//$("#calendar #calContent #contentText").html("This content will be available on " + month+1 + "-" + selected + "-" + year + ". Until then, feel free to explore any of the days which aren't greyed out.");
				$("#calendar #calContent #contentText").html("This content will be available on " + dateAvailable.toDateString() + ". Until then, feel free to explore any of the days which aren't greyed out.");
				$("#calendar #calContent #contentLink").hide();
				$("#calContent").slideDown('slow');
			});
		}
	});
});