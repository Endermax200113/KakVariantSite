//Нужный скрипт

var docWidth = window.innerWidth;
var docHeight = window.innerHeight;
var deviceSmall = docWidth < 320;
var deviceMobile = docWidth <= 480 && docWidth >= 320;
var deviceTablet = docWidth <= 768 && docWidth > 480;
var deviceLaptop = docWidth <= 1200 && docWidth > 768;
var deviceComp = docWidth <= 1920 && docWidth > 1200;
var device2K = docWidth <= 2560 && docWidth > 1920;
var device4K = docWidth <= 4096 && docWidth > 2560;
var deviceBig = docWidth > 4096;

$(document).ready(function() {
	$(window).on("resize", function() {
		docWidth = window.innerWidth;
		docHeight = window.innerHeight;
		
		deviceSmall = docWidth < 320;
		deviceMobile = docWidth <= 480 && docWidth >= 320;
		deviceTablet = docWidth <= 768 && docWidth > 480;
		deviceLaptop = docWidth <= 1200 && docWidth > 768;
		deviceComp = docWidth <= 1920 && docWidth > 1200;
		device2K = docWidth <= 2560 && docWidth > 1920;
		device4K = docWidth <= 4096 && docWidth > 2560;
		deviceBig = docWidth > 4096;
	});
});

function testFunction(num) {
	if (num !== undefined) alert("Функция успешно работает! Номер проверки -> " + num);
	else alert("Функция успешно работает!");
}

function testConsole(num) {
	if (num !== undefined) console.log("Функция успешно работает! Номер проверки -> " + num);
	else console.log("Функция успешно работает!");
}

/*
	Полный пример: [ https://kakvariant.ru/descServ.php?isTrue=true&val=0#test ]

	URL      -- Полная ссылка на текущий сайта [ https://kakvariant.ru/descServ.php?isTrue=true&val=0#test ]
	Protocol -- Протокол сайта [ https: ]
	Host     -- Имя сайта [ kakvaruant.ru ]
	Path     -- Путь к странице [ /descServ.php ]
	Values   -- Значения из URL [ ?isTrue=true&val=0 ]
	Hash     -- ID элемента, с помощью которого перемещается страница либо вверх, либо вниз [ #test ]
*/

function getURL() {return location.href;}
function getURLProtocol() {return location.protocol;}
function getURLHost() {return location.host;}
function getURLPath() {return location.pathname;}
function getURLValues() {return location.search;}
function getURLHash() {return location.hash;}

function isURL(url) {return location.href == url;}
function isURLProtocol(pr) {return location.protocol == pr;}
function isURLHost(host) {return location.host == host;}
function isURLPath(path) {return location.pathname == path;}
function isURLValues(vals) {return location.search == vals;}
function isURLHash(hash) {return location.hash == hash;}

function setURL(url) {location.href = url;}
function setURLProtocol(pr) {location.protocol = pr;}
function setURLHost(host) {location.host = host;}
function setURLPath(path) {location.pathname = path;}
function setURLValues(vals) {location.search = vals;}
function setURLHash(hash) {location.hash = hash;}


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


//Меню

var centerStrip = $(".h-center-strip");
var showMenu = false;
var lastClickedMenu;

$(document).ready(function(e) {
	preparate(true);
});

function preparate(start) {
	if (isURLPath("/")) {
		setTimeout(setStripPage, 200, 1);

		$(".h-center>nav>ul>li>a").eq(1).on("click", function(e) {
			setStripPage(2);
			setAjaxMenu(2);
		});
		$(".h-center>nav>ul>li>a").eq(2).on("click", function(e) {
			setStripPage(3);
			setAjaxMenu(3);
		});
		$(".h-right-menu-bg>ul>li>a").eq(1).on("click", function(e) {
			setAjaxMenu(2);
			setShowMenu(false);
		});
		$(".h-right-menu-bg>ul>li>a").eq(2).on("click", function(e) {
			setAjaxMenu(3);
			setShowMenu(false);
		});
	} else if (isURLPath("/services") || isURLPath("/services.html")) {
		setTimeout(setStripPage, 200, 2);

		$(".h-center>nav>ul>li>a").eq(0).on("click", function(e) {
			setStripPage(1);
			setAjaxMenu(1);
		});
		$(".h-center>nav>ul>li>a").eq(2).on("click", function(e) {
			setStripPage(3);
			setAjaxMenu(3);
		});
		$(".h-right-menu-bg>ul>li>a").eq(0).on("click", function(e) {
			setAjaxMenu(1);
			setShowMenu(false);
		});
		$(".h-right-menu-bg>ul>li>a").eq(2).on("click", function(e) {
			setAjaxMenu(3);
			setShowMenu(false);
		});
	} else if (isURLPath("/about") || isURLPath("/about.html")) {
		setTimeout(setStripPage, 200, 3);

		$(".h-center>nav>ul>li>a").eq(0).on("click", function(e) {
			setStripPage(1);
			setAjaxMenu(1);
		});
		$(".h-center>nav>ul>li>a").eq(1).on("click", function(e) {
			setStripPage(2);
			setAjaxMenu(2);
		});
		$(".h-right-menu-bg>ul>li>a").eq(0).on("click", function(e) {
			setAjaxMenu(1);
			setShowMenu(false);
		});
		$(".h-right-menu-bg>ul>li>a").eq(1).on("click", function(e) {
			setAjaxMenu(2);
			setShowMenu(false);
		});
	}

	if (start) {
		$(document).on("click", ".h-right-menu", function(e) {setShowMenu(!showMenu)});
		/*$(".h-right-menu-bg").off("click");
		$(".h-right-menu-bg>ul").off("click");*/
		lastClickedMenu = new Date();
	}
}

/*window.onpopstate = e => {
	history.go(getURL());
}*/

function setAjaxMenu(page) {
	let html = getURLPath();

	if (!html.endsWith(".html")) {
		if (page == 1) {
			history.pushState({page: 1}, "", "/");

			$.ajax({
				type: "POST",
				url: "/php/ajax.php",
				data: {flag: "pagePort"},
				success: function(r) {$("main").html(r)}
			});

			$(".h-center>nav>ul>li").removeClass("here");
			$(".h-center>nav>ul>li").eq(0).addClass("here");

			setOffClickMenu();
			preparate(false);
		} else if (page == 2) {
			history.pushState({page: 2}, "", "/services");

			$.ajax({
				type: "POST",
				url: "/php/ajax.php",
				data: {flag: "pageServ"},
				success: function(r) {$("main").html(r)}
			});

			$(".h-center>nav>ul>li").removeClass("here");
			$(".h-center>nav>ul>li").eq(1).addClass("here");

			setOffClickMenu();
			preparate(false);
		} else if (page == 3) {
			history.pushState({page: 3}, "", "/about");

			$.ajax({
				type: "POST",
				url: "/php/ajax.php",
				data: {flag: "pageAbout"},
				success: function(r) {$("main").html(r)}
			});

			$(".h-center>nav>ul>li").removeClass("here");
			$(".h-center>nav>ul>li").eq(2).addClass("here");

			setOffClickMenu();
			preparate(false);
		}

		function setOffClickMenu() {
			$(".h-center>nav>ul>li>a").eq(0).off("click");
			$(".h-center>nav>ul>li>a").eq(1).off("click");
			$(".h-center>nav>ul>li>a").eq(2).off("click");

			$(".h-right-menu-bg>ul>li>a").eq(0).off("click");
			$(".h-right-menu-bg>ul>li>a").eq(1).off("click");
			$(".h-right-menu-bg>ul>li>a").eq(2).off("click");
		}
	}
}

$(window).on("resize", function(e) {
	if (isURLPath("/")) setStripPage(1);
	else if (isURLPath("/services") || isURLPath("/services.html")) setStripPage(2);
	else if (isURLPath("/about") || isURLPath("/about.html")) setStripPage(3);

	if (showMenu && docWidth > 768) setShowMenu(false);
});

function setShowMenu(open) {
	let date = new Date();
	let time1 = date.getTime();
	let time2 = lastClickedMenu.getTime();
	let totalTime = time1 - time2;

	if (totalTime > 300) {
		lastClickedMenu = date;

		if (open) {
			$(".h-right-menu-img").addClass("show");
			$(".h-right-menu-bg").addClass("show");
			$(".h-left-img").addClass("menu-show");
			$(".h-right-menu-bg>ul").addClass("show");
			setTimeout(function(e) {
				$(".h-right-menu-bg>ul>li").addClass("show");
				$(".h-right-menu-bg>ul>li>a").addClass("show");
			}, 10);

			showMenu = true;
		} else {
			$(".h-right-menu-img").removeClass("show");
			$(".h-right-menu-bg").removeClass("show");
			$(".h-left-img").removeClass("menu-show");
			$(".h-right-menu-bg>ul>li").removeClass("show");
			setTimeout(function(e) {
				$(".h-right-menu-bg>ul>li>a").removeClass("show");
				$(".h-right-menu-bg>ul").removeClass("show");
			}, 300);

			showMenu = false;
		}
	}
}

function setStripPage(name) {
	if (name == 1) {
		let size = "" + 
			($(".h-center>nav>ul>li>a").eq(name - 1).width() + 
			parseInt($(".h-center>nav>ul>li>a").eq(name - 1).css("padding-left")) * 2) + 
			"px";
		let start = "" + 
			parseInt($(".h-center>nav>ul>li").eq(name - 1).css("margin-left")) +
			"px";

		centerStrip.css({
			width: size,
			left: start,
			display: "initial"
		});
	} else if (name == 2) {
		let size = "" +
			($(".h-center>nav>ul>li>a").eq(name - 1).width() +
			parseInt($(".h-center>nav>ul>li>a").eq(name - 1).css("padding-left")) * 2) +
			"px";
		let start = "" +
			(parseInt($(".h-center>nav>ul>li").eq(name - 1).css("margin-left")) +
			$(".h-center>nav>ul>li>a").eq(name - 2).width() +
			parseInt($(".h-center>nav>ul>li>a").eq(name - 2).css("padding-left")) * 2 +
			parseInt($(".h-center>nav>ul>li").eq(name - 2).css("margin-left")) * 2) +
			"px";

		centerStrip.css({
			width: size,
			left: start,
			display: "initial"
		});
	} else if (name == 3) {
		let size = "" +
			($(".h-center>nav>ul>li>a").eq(name - 1).width() +
			parseInt($(".h-center>nav>ul>li>a").eq(name - 1).css("padding-left")) * 2) +
			"px";
		let start = "" +
			($(".h-center>nav>ul>li>a").eq(name - 3).width() +
			parseInt($(".h-center>nav>ul>li>a").eq(name - 3).css("padding-left")) * 2 +
			parseInt($(".h-center>nav>ul>li").eq(name - 3).css("margin-left")) * 2 +
			$(".h-center>nav>ul>li>a").eq(name - 2).width() +
			parseInt($(".h-center>nav>ul>li>a").eq(name - 2).css("padding-left")) * 2 +
			parseInt($(".h-center>nav>ul>li").eq(name - 2).css("margin-left")) * 2 +
			parseInt($(".h-center>nav>ul>li").eq(name - 1).css("margin-left"))) + 
			"px";

		centerStrip.css({
			width: size,
			left: start,
			display: "initial"
		});
	} else console.error("Неправильно поставлен аргумент " + name + " в функции setStripPage()");
}
//Видео во время скролла на главной странице
function animateMainVideo(animate) {
	// var listImg = [];
	let frameCount = 950;
	
	let canDraw; 

	let imageCache = new function() {
		let me = this;

		let cache = [];
		let root = document.location.href.split("/");

		root.pop();
		root = root.join("") + "/";

		me.push = function(src, loadEvent) {
			if (!src.match(/^http/)) src = root + src;

			let item = new Image();

			if (cache[src] && loadEvent) loadEvent(src);
			else {
				if (loadEvent) {
					item.onload = loadEvent;
					item.onerror = loadEvent;
				}

				cache[src] = item;
			}

			item.src = src;
		};

		me.pushArray = function(arr, imgLoadEvent, imgsLoadEvent) {
			let numLoaded = 0;
			let arrSize = arr.length;

			for (let i = 0; i < arrSize; i++) {
				me.push(arr[i], function(e) {
					if (imgLoadEvent) imgLoadEvent(e);
					numLoaded++;
					if (numLoaded == arrSize) setTimeout(imgsLoadEvent, 1, e);
				});
			}
		};
	}();

	let setFrame = function() {
		if (canDraw) {
			let index = getFrame();

			requestAnimationFrame(function() {updateImage(index + 1)});
		} else {
			animateMainVideo(false);
			return;
		}
	}

	let currentFrame = function(i) {("video/main " + i.toString().padStart(3, '0') + ".jpg")};

	let updateImage = function(i) {
		if (i >= frameCount) return;

		// img = listImg[i];
		img = globalVar.mainVideo[i];
		// console.log(img, draw, draw.get(0), draw.get(0).width);
		ctx.drawImage(img, 0, 0, draw.get(0).width, draw.get(0).height);
	}

	let listFrames = [0];

	if (animate) {
		var draw = $(".sec1-draw");
		var scroll = $(".sec1-scroll");

		canDraw = !(!isURLPath("/") || deviceSmall || deviceMobile || deviceTablet || deviceLaptop);
		
		if (!canDraw) {
			animateMainVideo(false);
			return;
		}
		var ctx = draw.get(0).getContext("2d");

		let mFrom = 1;
		let loaded = 1;
		let preloadImages = async function(from, to) {
			for (let i = from; i < to; i++) {
				let img = new Image();
				img.src = currentFrame(i);
				// listImg[i] = img;
				globalVar.mainVideo[i] = img;
				loaded++;
			}

			setContinueLoadOnScroll(to, to + 200);

			// console.log("Загружено ->", loaded);
		}

		var img = new Image();
		img.src = currentFrame(1);
		// listImg[1] = img;
		globalVar.mainVideo[1] = img;

		$(window).on("scroll.mainVideo", setFrame);
		img.onload = setSizeArea;
		$(window).on("resize.mainVideo", setSizeArea);

		function setSizeArea() {
			if (!canDraw) {
				animateMainVideo(false);
				return;
			}

			let hH = $(".h").eq(0).height();
			let hF = $(".f").eq(0).height();

			draw.attr({
				height: img.height,
				width: img.width
			});

			draw.css({
				height: "calc(100vh - " + hH + "px)",
				"margin-top": hH + "px"
			});

			scroll.css("height", (frameCount * 15) + "px");

			ctx.drawImage(img, 0, 0, draw.get(0).width, draw.get(0).height);
		}

		function setContinueLoadOnScroll(from, to) {
			let func = () => {
				let index = getFrame();
				let scr = $(window).scrollTop();

				//Старый код
				/*console.log(index, from, to);
				console.log(index > from - 25, listFrames.indexOf(to + 25) == -1, to + 50 <= frameCount + 50, from - 25, to + 25);

				if (index > from - 25 && listFrames.indexOf(to + 25) == -1) {
					if (to + 50 <= frameCount + 50) {
						setTimeout(() => {
							preloadImages(from, to);
							setCacheImage(from, to);
						}, 0);

						listFrames.push(from);
						console.log(listFrames);
					} else {
						if (loaded != frameCount) {
							setTimeout(() => {
								preloadImages(from, frameCount);
								setCacheImage(from, frameCount);
							}, 0);

							listFrames.push(from);
							$(window).off(".mainVideoLoad");
							console.log(listFrames);
						}
					}
				}	*/

				// console.log(index, from, to);
				// console.log(index >= from - 100, listFrames.indexOf(from) == -1, index + 200 <= frameCount, to, to + 200);

				if (index >= from - 100 && listFrames.indexOf(from) == -1) {
					if (index + 300 < frameCount) {
						setTimeout(() => {
							preloadImages(from, to);
							setCacheImage(from, to);
						}, 0);

						listFrames.push(from);
						// console.log(listFrames);
					} else {
						setTimeout(() => {
							preloadImages(from, frameCount);
							setCacheImage(from, frameCount);
						}, 0);

						listFrames.push(from);
						// console.log(listFrames);
						$(window).off(".mainVideoLoad");
					}
				}
			}

			$(window).off(".mainVideoLoad");
			$(window).on("scroll.mainVideoLoad", func);
		}

		function getFrame() {
			let scrollTop = $(window).scrollTop();
			let endScroll = document.documentElement.scrollHeight - docHeight;
			let scrollFraction = scrollTop / endScroll;
			let index = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));

			return index;
		}

		function turnToArr(from, to) {
			let arr = [];
			for (let i = from; i < to; i++) arr.push(globalVar.mainVideo[i].src);
			return arr;
		}

		function setCacheImage(from, to) {
			imageCache.pushArray(turnToArr(from, to), 
				() => {},
				() => {});
		}

		setTimeout(() => {
			preloadImages(1, 200);
			setCacheImage(1, 200);
		}, 0);
	} else {
		$(window).off(".mainVideo");
		$(window).off(".mainVideoLoad");
	}
}

