//Главный скрипт

var globalVar = {
	mainVideo: {},
	sizeTestSpeed: 4995374,
	speedMbps: 0,
	date: new Date()
};

$(window).on("beforeunload", function() {
	// if (isURLPath("/")) $(window).scrollTop(0);
});

$(document).ready(function() {
	console.log("© КакВариант 2020-" + globalVar.date.getFullYear());
	$("#copyrightYear").html($("#copyrightYear").html() + globalVar.date.getFullYear());

	setFixHeader(spotTypePage());
	setListenerPlayVideoOnPort();
	/*if (isURLPath("/")) animateMainVideo(true);
	else animateMainVideo(false);*/
});

/*$(window).on("mousedown", e => {
	let x = e.pageX - 12;
	let y = e.pageY - 12;

	$("#touch").css({
		left: x + "px",
		top: y + "px"
	});
})*/

/*function spotSpeedNet() {
	let startTime, endTime;
	let download = new Image();
	
	download.onload = () => {
		endTime = (new Date()).getTime();
		showResults();
		animateVideo();
	}

	startTime = (new Date()).getTime();
	let cacheBuster = "?nnn=" + startTime;
	download.src = getURLProtocol() + "//" + getURLHost() + "/img/testSpeed.jpg" + cacheBuster;

	function showResults() {
		let duration = (endTime - startTime) / 1000;
		let bitsLoaded = globalVar.sizeTestSpeed * 8;
		let speedBps = (bitsLoaded / duration);
		let speedKbps = (speedBps / 1024);
		let speedMbps = (speedKbps / 1024);

		globalVar.speedMbps = speedMbps;
	}

	function animateVideo() {
		
	}
}*/

function setListenerPlayVideoOnPort() {
	$(".block").each(function(i, el) {
		$(".block").eq(i).on("mouseenter", function(e) {
			$(".block>video").play();
		});

		$(".block").eq(i).on("mouseleave", function(e) {
			$(".block>video").pause();
		});
	});
}

function setFixHeader(type) {
	/*if (type == 0) $(".h").removeClass("fixed");
	else*/ if (!$(".h").is(".fixed")) $(".h").addClass(".fixed");
}

function spotTypePage() {
	if (isURLPath("/")) return 0;
	else if (isURLPath("/portfolio")) return 1;
	else if (isURLPath("/services")) return 2;
	else return -1;
}

