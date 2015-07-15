$(function() {

	var startTime = $.now();
	var sectionInterval = 100;
	var lastScrollTop = 0;
	var maxScrollTop = 0;
	var totalScrollAmount = 0;
	var startTime = (new Date()).getTime()
	var docHeight = $(document).height();
	var winHeight = $(window).height();
	var signupTime = null;
	var sections = {};

	/** Instantiates. */
	var initializeSections = function() {
		$(".metric-section").each(function() {
			sections[$(this).attr('id')] = 0;
		});
	};

	/** Formats and displays collected metrics. */
	var showMetrics = function() {

		if(signupTime) {
			formattedSignupClick = formatTimeSpan(signupTime);
		}
		else {
			formattedSignupClick = "not clicked";
		}

		var metricsMessage = ("Percentage Scrolled: {0}%\n" +
			"Total Distance Scrolled: {1}px\n" + 
			"Time Before Clicking Signup: {2}\n" +
			"Time Spent on Page {3}\n" +
			"Time Spent On Sections: \n{4}").supplant([
				roundToPlace(maxScrollTop / (docHeight - winHeight) * 100, 2),
				totalScrollAmount,
				formattedSignupClick,
				formatTimeSpan($.now() - startTime),
				formatObj(sections, formatTimeSpan)
			]);

		console.log(metricsMessage);
		return false;
	};

	/* Save the time elapsed when the user clicks the Call To Action */
	var registerCallToAction = function() {
		if(!signupTime) {
			signupTime = $.now() - startTime;
		}
		return false;
	};

	/** Updates the total amount scrolled and the maximum scroll distance */
	var updateScrollMetrics = function() {

		var scrollTop = $(window).scrollTop();

		// update max scroll top
		if(scrollTop > maxScrollTop) {
			maxScrollTop = scrollTop;
		}

		totalScrollAmount += Math.abs(scrollTop - lastScrollTop);
		lastScrollTop = scrollTop;
	};

	var gatherSectionMetrics = function() {
		var closest = getClosestTo($(".metric-section"), $(window).scrollTop());
		var id = closest.attr('id');
		sections[id] += sectionInterval;

		//$('.highlight').removeClass('highlight');
		//closest.addClass('highlight');
	};

		// Get the context of the canvas element we want to select
	var ctx = document.getElementById("myChart").getContext("2d");
	var myNewChart = new Chart(ctx).PolarArea(data);


	$("#metrics-button").click(showMetrics);
	$(".call-to-action").click(registerCallToAction);
	$(window).scroll(updateScrollMetrics);
	setInterval(gatherSectionMetrics, sectionInterval);
	initializeSections();

});



// Skills:
// event handling
// element offset
// math/data manipulation
// timers

// Background
// As the founder of a new startup, you are obsessed with metrics and want to measure every time your user blinks and correlate it with your conversion rate. Since the product owner thinks that prompting the user to access their web cam for this purpose might not be the best idea you are stuck just gathering metrics of their browsing experience through simple activity on the page such as scrolls and clicks. You are to write a script that you can add to any web page which provides advanced metrics on the user's behavior.

// Requirements
// Write a script that reports on several different aspects of the user's browsing behavior. You should be able to add this script to any web page. Since the metrics depend on scrolling, create a long, one-page landing page prototype to test this on.

// Add a button with position: fixed that the user can click to view the metrics collected so far. Metrics collection should be paused when this happens, and resumed afterwards. You can display the results in a manner of your choice (alert, lightbox, etc).

// Information Collected
// What percentage of the page was viewed
// Total Distance Scrolled
// Time before clicking Sign Up
// Time spent on page
// Time spent on each section of the page
// Bonus I: Visual Report
// Display the results of the metrics collection in a compelling visual format (graphs! and charts!)