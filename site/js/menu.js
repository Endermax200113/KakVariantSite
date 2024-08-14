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