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

