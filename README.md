Rotary Advent Calendar
=================
An advent-style calendar with a UI inspired by rotary phones
Demo: http://sdunham.github.com/Rotary-Advent-Cal/

## How to include on your website

**Insert this markup within the <head> section of a page:**
```<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="scripts/jquery.path.js"></script>
<script src="scripts/calendar_content.js"></script>
<script src="scripts/rotary_calendar.js"></script>```

**Insert this markup within the <body> section of a page:**
```<div id="calendar">
	<div id="calContent">
		<h2 id="contentTitle"></h2>
		<p id="contentText"></p>
		<p><a id="contentLink" href="#" style="display:none;">Learn More >></a></p>
	</div>
	<div id="dayHolder"></div>
</div>```

## How to select a month for the calendar to run

The default behavior is to construct a calendar for the current month. This means that the calnedar will "reset" itself once a new month begins. To run the calendar for a specific month, update the month variable in rotary_calendar.js to the zero-based number of the month you want (i.e. 0=January, 1=February,..., 11=December).

## How to edit the calendar data

Calendar data is stored as an array of objects located in the calendar_content.js. Each of these objects contains a title, text, and an optional "Learn More" URL. Update this data to change what your calendar displays