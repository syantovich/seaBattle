"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener("load", function () {

	window.onhashchange = switchToStateFromURLHash;
	var SPAState = void 0;

	function switchToStateFromURLHash() {
		var URLHash = window.location.hash;

		// убираем из закладки УРЛа решётку
		// (по-хорошему надо ещё убирать восклицательный знак, если есть)
		var stateStr = URLHash.substr(1);

		if (stateStr != "") {
			// если закладка непустая, читаем из неё состояние и отображаем
			SPAState = stateStr; // для фото нужна ещё вторая часть закладки - номер фото
		} else {
			SPAState = 'menu';
		} // иначе показываем главную страницу}

		document.getElementById("menuShow").style.display = "none";
		document.getElementById("gameShow").style.display = "none";
		document.getElementById("ruleShow").style.display = "none";
		document.getElementById("recordsShow").style.display = "none";
		// обновляем вариабельную часть страницы под текущее состояние

		switch (SPAState) {
			case 'menu':
				document.getElementById("menuShow").style.display = "flex";
				break;
			case 'game':
				document.getElementById("gameShow").style.display = "flex";
				break;
			case 'rule':
				document.getElementById("ruleShow").style.display = "block";
				break;
			case 'records':
				document.getElementById("recordsShow").style.display = "flex";
				break;

		}
	}
	switchToStateFromURLHash();

	function switchToState(el) {
		var newHash = el.id.slice(0, -1);
		location.hash = encodeURIComponent(newHash);
	}
	var rulseicon = document.getElementById("rulei");
	var recordsi = document.getElementById("recordsi");
	var gamei = document.getElementById("gamei");
	var music = document.getElementById("musicicon");
	music.addEventListener("click", function () {
		flagSoundOn = !flagSoundOn;
		var on = music.querySelector(".on");
		var off = music.querySelector(".off");
		if (flagSoundOn) {
			on.style.display = "block";
			off.style.display = "none";
		} else {
			off.style.display = "block";
			on.style.display = "none";
		}
	});

	rulseicon.addEventListener("click", function () {
		return switchToState(rulseicon);
	});
	recordsi.addEventListener("click", function () {
		return switchToState(recordsi);
	});
	gamei.addEventListener("click", function () {
		return switchToState(gamei);
	});

	var myVar;
	var rec = [];
	var flagRec = true;
	var flagSoundOn = true;
	var pcWin = false;
	var kInfo = 1;
	var wrap = document.querySelector(".wrap");
	var hammertimeSwipeH = new Hammer(wrap);
	hammertimeSwipeH.get('swipe').set({
		direction: Hammer.DIRECTION_HORIZONTAL
	});
	var hammertimeSwipeV = new Hammer(wrap);
	hammertimeSwipeV.get('swipe').set({
		direction: Hammer.DIRECTION_VERTICAL
	});
	document.getElementById("menuShow").querySelectorAll("button").forEach(function (e) {
		e.addEventListener("click", function () {
			switchToState(e);
		});
	});

	function records() {
		var divRec = document.querySelector("#rec");
		divRec.innerHTML = "";
		var divRecShow = document.querySelector("#recordsShow");
		divRecShow.innerHTML = "";
		var name = document.createElement("div");
		name.innerText = "Таблица рекордов";
		divRec.appendChild(name);
		for (var i = 0; i < rec.length; i++) {
			var newDiv = document.createElement("div");
			newDiv.innerText = i + 1 + ". \u0418\u043C\u044F:" + rec[i].name + " \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0447\u043A\u043E\u0432:" + rec[i].value;
			divRec.appendChild(newDiv);
		}
		divRecShow.appendChild(name);
		for (var _i = 0; _i < rec.length; _i++) {
			var _newDiv = document.createElement("div");
			_newDiv.innerText = _i + 1 + ". \u0418\u043C\u044F:" + rec[_i].name + " \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0447\u043A\u043E\u0432:" + rec[_i].value;
			divRecShow.appendChild(_newDiv);
		}
	}
	var ajaxHandlerScript = "http://fe.it-academy.by/TestAjax2.php";
	var pass = Math.random();
	var sl = new URLSearchParams();
	sl.append('f', 'READ');
	sl.append('n', 'SYANTOVICH_SEABATLE_RECORDS');

	var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";

	function fetchrRec() {
		fetch(ajaxHandlerScript, {
			method: 'post',
			body: sl
		}).then(function (response) {
			return response.json();
		}).then(function (data) {
			rec = JSON.parse(data.result);
			records();
		}).catch(function (error) {
			alert("Неудалось загрузить данные. Попробую еще раз чере минутку");
			setTimeout(fetchrRec, 61000);
		});
	}

	function checkRec(score) {
		var sp = new URLSearchParams();
		sp.append('f', 'LOCKGET');
		sp.append('n', 'SYANTOVICH_SEABATLE_RECORDS');
		sp.append("p", pass);

		function load(score) {
			fetch(ajaxHandlerScript, {
				method: 'post',
				body: sp
			}).then(function (response) {
				return response.json();
			}).then(function (data) {
				rec = JSON.parse(data.result);

				delete rec[0].score;
				rec[0].value = 2640;
				records();
				checkScore();
			}).catch(function (error) {
				alert("Неудалось загрузить данные. Попробую еще раз чере минутку");
				setTimeout(load, 61000);
			});
		}

		function checkScore(score) {
			for (var i = 0; i < rec.length; i++) {
				if (rec[i].value < scrore) {
					rec.splice(i, 0, {
						name: prompt("Введите ваше имя"),
						value: scrore
					});
					rec.pop();
					records();
					break;
				}
			}
			unload();
		}

		function unload() {
			var sd = new URLSearchParams();
			sd.append('f', 'UPDATE');
			sd.append('n', 'SYANTOVICH_SEABATLE_RECORDS');
			sd.append("p", pass);
			sd.append("v", JSON.stringify(rec));
			fetch(ajaxHandlerScript, {
				method: 'post',
				body: sd
			}).then(function (response) {
				return response;
			}).then(function (data) {
				console.log("Успешно");
			}).catch(function (error) {
				alert("Неудалось загрузить данные. Попробую еще раз чере минутку");
				setTimeout(unload, 61000);
			});
		}
		load();
	}
	fetchrRec();
	hammertimeSwipeH.on('swipe', function (ev) {
		if (flagRec) {
			var divRec = document.querySelector("#rec");
			var direc = ev.direction;
			switch (direc) {
				case 4:
					{
						if (divRec.className != "firstR") {
							divRec.classList.add("l");
							divRec.classList.remove("r");
							setTimeout(function () {
								divRec.style.display = "none";
							}, 1020);
						}
					}
					break;
				case 2:
					{
						divRec.classList.remove("firstR");
						divRec.classList.add("r");
						divRec.classList.remove("l");

						divRec.style.display = "flex";
						break;
					}
			}
		}
	});

	/*
 0 - пустое место
 1 - палуба корабля
 2 - клетка рядом с кораблём
 3 - обстрелянная клетка
 4 - попадание в палубу
 */
	/*      x-строка
 		y-столбец
  */
	var flagStart = false;

	var flagHandPos = false;

	var flagController = false;

	var flagPcShots = true;

	var flagListener = false;

	var myArea_field = document.querySelector("#myArea");

	var pcArea_field = document.querySelector("#pcArea");

	var instruction = document.getElementById('instruction');

	var shipsCollection = document.getElementById('ships_collection');

	var initialShips = document.querySelector('.wrap + .initial-ships');

	var toptext = document.getElementById('text_top');

	var buttonPlay = document.getElementById('play');

	var buttonNewGame = document.getElementById('newgame');

	var pcArea = {};

	var control = null;

	function getCoordinate(field) {
		var _field$getBoundingCli = field.getBoundingClientRect(),
		    left = _field$getBoundingCli.left,
		    top = _field$getBoundingCli.top,
		    right = _field$getBoundingCli.right,
		    bottom = _field$getBoundingCli.bottom;

		return {
			left: left,
			top: top,
			right: right,
			bottom: bottom
		};
	}

	var Area = function () {
		function Area(field) {
			_classCallCheck(this, Area);

			myVar = getComputedStyle(document.querySelector("#icons")).getPropertyValue("left").slice(0, -2) / 4;
			this.sizeArea = (myVar * 37.887).toFixed(3);
			this.sizeShip = (myVar * 3.789).toFixed(3);
			var svg = document.querySelectorAll(".svg");
			svg.forEach(function (e) {
				e.setAttribute("width", (8 * myVar).toFixed(3));
				e.setAttribute("height", (8 * myVar).toFixed(3));
			});
			this.k = 1;
			this.matrix = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
			this.infoship = {};

			this.score = 0;
			this.updateInfo = {};
			this.field = field;

			var _getCoordinate = getCoordinate(field),
			    left = _getCoordinate.left,
			    top = _getCoordinate.top,
			    right = _getCoordinate.right,
			    bottom = _getCoordinate.bottom;

			this.left = left;
			this.right = right;
			this.top = top;
			this.bottom = bottom;
		}

		_createClass(Area, [{
			key: "cleanField",
			value: function cleanField() {

				while (this.field.firstChild) {
					this.field.removeChild(this.field.firstChild);
				}
				this.updateInfo = {};
				kInfo = 1;
				this.infoship = {};
				this.matrix = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
			}
		}, {
			key: "randomLocation",
			value: function randomLocation() {
				for (var key in Area.allShips) {
					var kolpalub = Area.allShips[key][1];
					var kolInMap = Area.allShips[key][0];
					for (var i = 0; i < kolInMap; i++) {
						var name = key + ("" + (i + 1));
						var obj = this.getCoords(kolpalub);
						obj.kolpalub = kolpalub;
						obj.shipname = name;
						var ship = new Ship(this, obj);

						ship.showShip();
					}
				}
			}
		}, {
			key: "getCoords",
			value: function getCoords(kolpalub) {
				var kx = Area.random(1);
				var ky = Math.abs(kx - 1);
				var x = void 0,
				    y = void 0;
				if (kx == 0) {
					x = Area.random(10 - kolpalub);
					y = Area.random(9);
				} else {
					x = Area.random(9);
					y = Area.random(10 - kolpalub);
				}
				var obj = {
					x: x,
					y: y,
					ky: ky,
					kx: kx
				};
				var validCoords = this.check(obj, kolpalub);
				if (!validCoords) {
					return this.getCoords(kolpalub);
				}
				return obj;
			}
		}, {
			key: "check",
			value: function check(obj, kolpalub) {
				var q = this.matrix;

				var x = obj.x,
				    y = obj.y,
				    ky = obj.ky,
				    kx = obj.kx;

				var fromX = void 0,
				    fromY = void 0,
				    toX = void 0,
				    toY = void 0;

				fromX = x == 0 ? x : x - 1;
				if (x + kx * kolpalub == 10 && ky == 0) {
					toX = 10;
				} else {
					if (x + kx * kolpalub < 10 && ky == 0) {
						toX = x + kx * kolpalub + 1;
					} else {
						if (kx == 0 && x == 9) {
							toX = 10;
						} else {
							if (kx == 0 && x < 9) {
								toX = x + 2;
							}
						}
					}
				}

				fromY = y == 0 ? y : y - 1;
				if (y + ky * kolpalub == 10 && kx == 0) {
					toY = 10;
				} else {
					if (y + ky * kolpalub < 10 && kx == 0) {
						toY = y + ky * kolpalub + 1;
					} else {
						if (ky == 0 && y == 9) {
							toY = 10;
						} else {
							if (ky == 0 && y < 9) {
								toY = y + 2;
							}
						}
					}
				}

				if (toX === undefined || toY === undefined) return false;
				for (var i = fromY; i < toY; i++) {
					for (var j = fromX; j < toX; j++) {
						if (this.matrix[i][j] == 1) {
							return false;
						}
					}
				}

				return true;
			}
		}], [{
			key: "random",
			value: function random(n) {
				return Math.floor(Math.random() * (n + 1));
			}
		}]);

		return Area;
	}();

	Area.allShips = {
		four: [1, 4],
		three: [2, 3],
		two: [3, 2],
		one: [4, 1]
	};

	var Ship = function () {
		function Ship(self, _ref) {
			var x = _ref.x,
			    y = _ref.y,
			    ky = _ref.ky,
			    kx = _ref.kx,
			    kolpalub = _ref.kolpalub,
			    shipname = _ref.shipname;

			_classCallCheck(this, Ship);

			this.player = self == myArea ? myArea : pcArea;
			this.field = self.field;
			this.x = x;
			this.y = y;
			this.kx = kx;
			this.ky = ky;
			this.shipname = shipname;
			this.kolpalub = kolpalub;
			this.arrkolpalub = [];
		}

		_createClass(Ship, [{
			key: "showShip",
			value: function showShip() {
				var player = this.player,
				    field = this.field,
				    shipname = this.shipname,
				    kolpalub = this.kolpalub,
				    x = this.x,
				    y = this.y,
				    ky = this.ky,
				    kx = this.kx,
				    life = this.life,
				    arrkolpalub = this.arrkolpalub,
				    _k = this.k,
				    k = _k === undefined ? 0 : _k;

				life = kolpalub;
				while (k < kolpalub) {
					var i = y + k * ky,
					    j = x + k * kx;

					player.matrix[i][j] = 1;

					arrkolpalub.push([i, j]);
					k++;
				}
				player.infoship[shipname] = {
					arrkolpalub: arrkolpalub,
					life: life,
					x: x,
					y: y,
					ky: ky,
					kx: kx
				};

				if (this.player == myArea) {
					var div = document.createElement("div");
					var name = this.shipname.slice(0, -1);
					var vertical = this.kx == 0 ? "vertical" : "";
					div.id = this.shipname;
					div.style.left = myArea.sizeShip * this.x + "px";
					div.style.top = myArea.sizeShip * this.y + "px";
					div.className = "ship " + vertical + " " + name;
					this.player.updateInfo[kInfo] = {
						"lastX": x,
						"lastY": y,
						"field": div
					};
					kInfo++;
					this.field.appendChild(div);
					if (Object.keys(this.player.infoship).length == 10) {
						buttonPlay.hidden = false;
					}
				}
			}
		}]);

		return Ship;
	}();

	buttonPlay.addEventListener("click", function (e) {
		flagRec = true;
		e = e || window.event;
		e.target.hidden = true;
		instruction.hidden = true;
		pcArea_field.parentElement.hidden = false;
		var s = !myArea.score ? 0 : pcArea.score - myArea.score;
		toptext.innerHTML = "\u0421\u0447\u0435\u0442: " + s;
		pcArea = new Area(pcArea_field);
		pcArea.cleanField();
		pcArea.randomLocation();
		flagStart = true;
		if (!control) control = new Controller();

		control.init();
	});
	buttonNewGame.addEventListener('click', function (e) {
		buttonNewGame.hidden = true;
		pcArea_field.parentElement.hidden = true;
		instruction.hidden = false;
		myArea.cleanField();
		toptext.innerHTML = 'Расстановка кораблей';
		if (pcWin) {
			pcArea.score = 0;
			myArea.score = 0;
		}

		Controller.infoship.innerHTML = '';

		flagStart = false;
		flagPcShots = false;

		control.coordsRandom = [];
		control.coordsArounf = [];
		control.coordrsFixed = [];
		control.removeTemporary();
	});

	document.getElementById('type_placement').addEventListener('click', function (e) {
		flagRec = false;

		if (e.target.tagName != 'SPAN') return;

		buttonPlay.hidden = true;

		myArea.cleanField();

		var initialShipsClone = '';

		var type = e.target.dataset.target;

		var typeGeneration = {
			random: function random() {

				shipsCollection.hidden = true;

				myArea.randomLocation();
			},
			manually: function manually() {

				var value = !shipsCollection.hidden;

				if (shipsCollection.children.length > 0) {
					shipsCollection.removeChild(shipsCollection.lastChild);
				}

				if (!value) {

					initialShipsClone = initialShips.cloneNode(true);
					shipsCollection.appendChild(initialShipsClone);
					initialShipsClone.hidden = false;
				}

				shipsCollection.hidden = value;
			}
		};

		typeGeneration[type]();

		var placement = new Placement();

		placement.setObserver();
	});

	var Placement = function () {
		function Placement() {
			_classCallCheck(this, Placement);

			this.dragObject = {};

			this.pressed = false;
			this.areaCoords = getCoordinate(myArea_field);
		}

		_createClass(Placement, [{
			key: "setObserver",
			value: function setObserver() {
				var _this = this;

				if (flagHandPos) return;
				if (flagListener) return;
				document.addEventListener('mousedown', this.onMouseDown.bind(this));
				document.addEventListener('mousemove', this.onMouseMove.bind(this));
				document.addEventListener('mouseup', this.onMouseUp.bind(this));
				document.addEventListener('touchstart', this.onMouseDown.bind(this));
				document.addEventListener('touchmove', this.onMouseMove.bind(this));
				document.addEventListener('touchend', this.onMouseUp.bind(this));
				myArea_field.addEventListener('contextmenu', this.rotationShip.bind(this));
				hammertimeSwipeV.on("swipe", function (EO) {

					var el = _this.lastName;
					if (!el) return;
					_this.rotationShip.bind(_this)(EO);
				});
				flagListener = true;
			}
		}, {
			key: "onMouseDown",
			value: function onMouseDown(EO) {
				EO = EO || window.event;
				this.areaCoords = getCoordinate(myArea_field);

				var mouseTouch = EO.which == 1 || EO.type == "touchstart";
				EO.preventDefault();
				if (!mouseTouch) this.lastName = "";
				if (!mouseTouch || flagStart) return;

				var el = EO.target.closest('.ship');
				if (!el) return;

				this.pressed = true;

				this.dragObject = {
					el: el,
					parent: el.parentElement,
					next: el.nextElementSibling,

					downX: EO.pageX || EO.targetTouches[0].clientX,
					downY: EO.pageY || EO.targetTouches[0].clientY,

					left: el.offsetLeft,
					top: el.offsetTop,

					ky: 0,
					kx: 1
				};

				if (el.parentElement === myArea_field) {
					var name = el.id;

					this.dragObject.ky = myArea.infoship[name].ky;
					this.dragObject.kx = myArea.infoship[name].kx;
				}
			}
		}, {
			key: "onMouseMove",
			value: function onMouseMove(e) {

				e = e || window.event;
				if (!this.pressed || !this.dragObject.el) return;
				e.preventDefault();

				var _getCoordinate2 = getCoordinate(this.dragObject.el),
				    left = _getCoordinate2.left,
				    right = _getCoordinate2.right,
				    top = _getCoordinate2.top,
				    bottom = _getCoordinate2.bottom;

				if (!this.clone) {

					this.kolpalub = Placement.getCloneDecks(this.dragObject.el);

					this.clone = this.creatClone({
						left: left,
						right: right,
						top: top,
						bottom: bottom
					}) || null;

					if (!this.clone) return;

					this.shiftX = this.dragObject.downX - left;
					this.shiftY = this.dragObject.downY - top;

					this.clone.style.zIndex = '1000';

					document.body.appendChild(this.clone);

					this.removeShipFromInfo(this.clone);
				}

				var newX = e.pageX || e.targetTouches[0].clientX;
				var newY = e.pageY || e.targetTouches[0].clientY;
				var currentLeft = Math.round(newX - this.shiftX),
				    currentTop = Math.round(newY - this.shiftY);

				this.clone.style.left = currentLeft + "px";
				this.clone.style.top = currentTop + "px";

				if (left >= this.areaCoords.left - myVar * 1.607 && right <= this.areaCoords.right + myVar * 1.607 && top >= this.areaCoords.top - myVar * 1.607 && bottom <= this.areaCoords.bottom + myVar * 3) {

					this.clone.classList.remove('unsuccess');
					this.clone.classList.add('success');

					var _getCoordsCloneInMatr = this.getCoordsCloneInMatrix({
						left: left,
						right: right,
						top: top,
						bottom: bottom
					}),
					    x = _getCoordsCloneInMatr.x,
					    y = _getCoordsCloneInMatr.y;

					var obj = {
						x: x,
						y: y,
						ky: this.dragObject.ky,
						kx: this.dragObject.kx
					};

					var result = myArea.check(obj, this.kolpalub);

					if (!result) {

						this.clone.classList.remove('success');
						this.clone.classList.add('unsuccess');
					}
				} else {

					this.clone.classList.remove('success');
					this.clone.classList.add('unsuccess');
				}
			}
		}, {
			key: "onMouseUp",
			value: function onMouseUp(e) {
				this.pressed = false;
				if (!this.clone) return;

				if (this.clone.classList.contains('unsuccess')) {
					this.clone.classList.remove('unsuccess');
					sound.must();
					this.clone.rollback();
				} else {
					this.createShipAfterMoving();
				}

				this.lastName = this.clone.id;
				this.removeClone();
			}
		}, {
			key: "rotationShip",
			value: function rotationShip(e) {
				e.preventDefault();
				var ft = e.which == 3 || e.type == "swipe";
				if (!ft || flagStart) return;

				var el = e.target.closest('.ship') || document.getElementById("" + this.lastName);
				var name = el.id;

				if (myArea.infoship[name].kolpalub == 1) return;

				var obj = {
					ky: myArea.infoship[name].ky == 0 ? 1 : 0,
					kx: myArea.infoship[name].kx == 0 ? 1 : 0,
					x: myArea.infoship[name].x,
					y: myArea.infoship[name].y
				};
				var kolpalub = myArea.infoship[name].arrkolpalub.length;
				this.removeShipFromInfo(el);
				myArea.field.removeChild(el);

				var result = myArea.check(obj, kolpalub);
				if (!result) {
					obj.ky = obj.ky == 0 ? 1 : 0;
					obj.kx = obj.kx == 0 ? 1 : 0;
				}

				obj.shipname = name;
				obj.kolpalub = kolpalub;

				var ship = new Ship(myArea, obj);
				ship.showShip();

				if (!result) {
					var _el = document.getElementById(name);
					_el.classList.add('unsuccess');
					sound.must();
					setTimeout(function () {
						_el.classList.remove('unsuccess');
					}, 750);
				}
			}
		}, {
			key: "creatClone",
			value: function creatClone() {
				var _this2 = this;

				var clone = this.dragObject.el;
				var oldPosition = this.dragObject;

				clone.rollback = function () {

					if (oldPosition.parent == myArea_field) {
						clone.style.left = oldPosition.left + "px";
						clone.style.top = oldPosition.top + "px";
						clone.style.zIndex = '';
						oldPosition.parent.insertBefore(clone, oldPosition.next);
						_this2.createShipAfterMoving();
					} else {

						clone.removeAttribute('style');
						oldPosition.parent.insertBefore(clone, oldPosition.next);
					}
				};
				return clone;
			}
		}, {
			key: "removeClone",
			value: function removeClone() {
				this.dragObject = {};
				delete this.clone;
			}
		}, {
			key: "createShipAfterMoving",
			value: function createShipAfterMoving() {

				var coords = getCoordinate(this.clone);

				var _getCoordsCloneInMatr2 = this.getCoordsCloneInMatrix(coords),
				    left = _getCoordsCloneInMatr2.left,
				    top = _getCoordsCloneInMatr2.top,
				    x = _getCoordsCloneInMatr2.x,
				    y = _getCoordsCloneInMatr2.y;

				this.clone.style.left = left + "px";
				this.clone.style.top = top + "px";

				myArea_field.appendChild(this.clone);

				this.clone.classList.remove('success');
				for (var keys in myArea.updateInfo) {
					var tf = myArea.updateInfo[keys]["field"] == this.dragObject.el;
					if (tf) {
						delete myArea.updateInfo[keys];
						myArea.updateInfo[kInfo] = {
							"lastX": x,
							"lastY": y,
							"field": this.dragObject.el
						};
						kInfo++;
					}
				}

				var options = {
					shipname: this.clone.id,
					x: x,
					y: y,
					ky: this.dragObject.ky,
					kx: this.dragObject.kx,
					kolpalub: this.kolpalub
				};

				var ship = new Ship(myArea, options);
				ship.showShip();

				myArea_field.removeChild(this.clone);
			}
		}, {
			key: "getCoordsCloneInMatrix",
			value: function getCoordsCloneInMatrix() {
				var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : coords,
				    left = _ref2.left,
				    right = _ref2.right,
				    top = _ref2.top,
				    bottom = _ref2.bottom;

				var computedLeft = left - this.areaCoords.left,
				    computedRight = right - this.areaCoords.right,
				    computedTop = top - this.areaCoords.top,
				    computedBottom = bottom - this.areaCoords.bottom;

				var obj = {};

				var ft = computedTop < 0 ? 0 : computedBottom > myArea.sizeArea ? myArea.sizeArea - myArea.sizeShip : computedTop;
				var fl = computedLeft < 0 ? 0 : computedRight > myArea.sizeArea ? myArea.sizeArea - myArea.sizeShip * this.kolpalub : computedLeft;

				obj.top = Math.round(ft / myArea.sizeShip) * myArea.sizeShip;
				obj.left = Math.round(fl / myArea.sizeShip) * myArea.sizeShip;

				obj.y = Math.round(obj.top / myArea.sizeShip);
				obj.x = Math.round(obj.left / myArea.sizeShip);

				return obj;
			}
		}, {
			key: "removeShipFromInfo",
			value: function removeShipFromInfo(el) {

				var name = el.id;

				if (!myArea.infoship[name]) return;

				var arr = myArea.infoship[name].arrkolpalub;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _coords = _step.value;

						var _coords2 = _slicedToArray(_coords, 2),
						    x = _coords2[0],
						    y = _coords2[1];

						myArea.matrix[x][y] = 0;
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				delete myArea.infoship[name];
			}
		}]);

		return Placement;
	}();

	Placement.getCloneDecks = function (el) {
		var type = el.id.slice(0, -1);
		return Area.allShips[type][1];
	};

	var myArea = new Area(myArea_field);
	window.addEventListener("orientationchange", function () {
		Controller.updateSize();
	});
	window.addEventListener("resize", function (e) {
		Controller.updateSize();
	});

	var Controller = function () {
		function Controller() {
			_classCallCheck(this, Controller);

			this.player = "";
			this.enemy = "";
			this.coordsRandom = [];
			this.coordsArounf = [];
			this.coordrsFixed = [];
			this.removeTemporary();
		}

		_createClass(Controller, [{
			key: "removeTemporary",
			value: function removeTemporary() {
				this.temporaryShip = {
					hits: 0,
					firstHit: [],
					kx: 0,
					ky: 0
				};
			}
		}, {
			key: "init",
			value: function init() {
				var _this3 = this;

				var random = Area.random(1);
				this.player = random == 0 ? myArea : pcArea;
				flagPcShots = random == 1 ? true : false;
				this.enemy = random == 1 ? myArea : pcArea;
				this.setCoordsShot();
				if (!flagController) {
					pcArea_field.addEventListener('click', this.shot.bind(this));
					pcArea_field.addEventListener("contextmenu", this.empty.bind(this));
					if (random == 1) {
						setTimeout(function () {
							return _this3.shot();
						}, 2000);
					}

					if (random == 0) {
						Controller.infoship.innerText = "Вы стреляете первым!";
					} else {
						Controller.infoship.innerText = "Увы, но первым стреляет компьютер";
					}
				}
			}
		}, {
			key: "empty",
			value: function empty(e) {
				e = e || window.event;
				e.preventDefault();

				var _getCoordinate3 = getCoordinate(this.enemy.field),
				    left = _getCoordinate3.left,
				    top = _getCoordinate3.top,
				    right = _getCoordinate3.right,
				    bottom = _getCoordinate3.bottom;

				this.enemy.left = left;
				this.enemy.right = right;
				this.enemy.top = top;
				this.enemy.bottom = bottom;
				if (e.which != 3 || flagPcShots) {
					return;
				}

				var _coordsInMatrix = this.coordsInMatrix(e, pcArea),
				    _coordsInMatrix2 = _slicedToArray(_coordsInMatrix, 2),
				    y = _coordsInMatrix2[0],
				    x = _coordsInMatrix2[1];

				var check = this.checkUseless([y, x], 1);
				if (check) {
					this.showIcons(this.enemy, [x, y], 'shaded-cell');
				}
			}
		}, {
			key: "coordsInMatrix",
			value: function coordsInMatrix(e, self) {
				var y = Math.trunc((e.pageY - self.top - myVar * 0.0263157894736842) / myArea.sizeShip);
				var x = Math.trunc((e.pageX - self.left - myVar * 0.0263157894736842) / myArea.sizeShip);
				return [y, x];
			}
		}, {
			key: "checkUseless",
			value: function checkUseless(coords, f) {
				if (pcArea.matrix[coords[0]][coords[1]] > 1) {
					return false;
				}
				var icons = this.enemy.field.querySelectorAll('.shaded-cell');
				if (icons.length == 0) return true;

				var _loop = function _loop(icon) {
					var _Controller$getCoords = Controller.getCoordsIcon(icon),
					    _Controller$getCoords2 = _slicedToArray(_Controller$getCoords, 2),
					    x = _Controller$getCoords2[0],
					    y = _Controller$getCoords2[1];

					if (coords[0] == x && coords[1] == y) {

						if (f == 1) {

							for (var keys in myArea.updateInfo) {
								if (myArea.updateInfo[keys]["field"] == icon) {
									delete myArea.updateInfo[keys];
								}
							}
							icon.remove();
						} else {

							icon.classList.add('shaded-cell_red');
							sound.shaded();
							setTimeout(function () {
								icon.classList.remove('shaded-cell_red');
							}, 500);
						}
						return {
							v: false
						};
					}
				};

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = icons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var icon = _step2.value;

						var _ret = _loop(icon);

						if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				return true;
			}
		}, {
			key: "showIcons",
			value: function showIcons(enemy, _ref3, iconClass) {
				var _ref4 = _slicedToArray(_ref3, 2),
				    x = _ref4[0],
				    y = _ref4[1];

				var field = enemy.field;

				if (iconClass === 'dot' || iconClass === 'red-cross') {
					var i = 1;
					if (iconClass === 'red-cross') {
						sound.fire();
					}
					if (iconClass === 'dot') {
						sound.water();
					}
					setTimeout(function () {
						return fn(i);
					}, 400);
				} else {
					var _i2 = 0;
					if (iconClass === 'shaded-cell') {
						_i2 = 1;
						sound.pencil();
					};
					fn(_i2);
				}

				function fn(i) {

					var span = document.createElement('span');
					span.className = "icon-field " + iconClass;
					span.style.left = x * myArea.sizeShip + "px";
					span.style.top = y * myArea.sizeShip + "px";
					if (i == 1) {
						myArea.updateInfo["icon-field" + x + y + (enemy == myArea ? 'm' : 'p')] = {
							"lastX": x,
							"lastY": y,
							"field": span
						};
					}

					field.appendChild(span);
				}
			}
		}, {
			key: "shot",
			value: function shot(e) {
				if (this.player == pcArea) {
					flagPcShots = true;
				}
				e = e || window.event;

				var _getCoordinate4 = getCoordinate(this.enemy.field),
				    left = _getCoordinate4.left,
				    top = _getCoordinate4.top,
				    right = _getCoordinate4.right,
				    bottom = _getCoordinate4.bottom;

				this.enemy.left = left;
				this.enemy.right = right;
				this.enemy.top = top;
				this.enemy.bottom = bottom;
				var x = void 0,
				    y = void 0;
				if (e !== undefined) {
					if (e.which != 1 || flagPcShots) return;

					var _coordsInMatrix3 = this.coordsInMatrix(e, this.enemy);

					var _coordsInMatrix4 = _slicedToArray(_coordsInMatrix3, 2);

					y = _coordsInMatrix4[0];
					x = _coordsInMatrix4[1];

					var check = this.checkUseless([y, x]);
					if (!check) return;
					this.showExplosion(x, y);
				} else {
					var _getCoordsForShot = this.getCoordsForShot();

					var _getCoordsForShot2 = _slicedToArray(_getCoordsForShot, 2);

					x = _getCoordsForShot2[0];
					y = _getCoordsForShot2[1];

					this.showExplosion(x, y);
				}

				var v = this.enemy.matrix[y][x];

				switch (v) {
					case 0:
						// промах
						this.miss(y, x);
						break;
					case 1:
						// попадание
						this.hit(y, x);
						flagPcShots = false;
						break;
					case 3: // повторный обстрел
					case 4:
						Controller.infoship.innerText = 'По этим координатам вы уже стреляли!';
						flagPcShots = false;
						break;
				}
			}
		}, {
			key: "showExplosion",
			value: function showExplosion(x, y) {

				this.showIcons(this.enemy, [x, y], 'explosion');
				var explosion = this.enemy.field.querySelector('.explosion');
				explosion.classList.add('active');
				setTimeout(function () {
					return explosion.remove();
				}, 430);
			}
		}, {
			key: "miss",
			value: function miss(x, y) {
				var _this4 = this;

				var text = '';

				this.showIcons(this.enemy, [y, x], 'dot');
				this.enemy.matrix[x][y] = 3;
				this.player.k = 1;

				if (this.player === myArea) {
					text = 'Вы промахнулись. Стреляет компьютер.';
					this.player = pcArea;
					this.enemy = myArea;
					flagPcShots = true;
					setTimeout(function () {
						return _this4.shot();
					}, 2000);
				} else {
					text = 'Компьютер промахнулся. Ваш выстрел.';
					if (this.coordsArounf.length == 0 && this.temporaryShip.hits > 0) {

						this.markUselessCellAroundShip();
						this.removeTemporary();
					}
					this.player = myArea;
					this.enemy = pcArea;
					flagPcShots = false;
				}
				setTimeout(function () {
					return Controller.infoship.innerText = text;
				}, 400);
			}
		}, {
			key: "hit",
			value: function hit(x, y) {
				var _this5 = this;

				var text = '';
				this.showIcons(this.enemy, [y, x], 'red-cross');
				this.enemy.matrix[x][y] = 4;
				text = this.player === myArea ? 'Поздравляем! Вы попали. Ваш выстрел.' : 'Компьютер попал в ваш корабль. Выстрел компьютера';
				setTimeout(function () {
					return Controller.infoship.innerText = text;
				}, 400);
				for (var name in this.enemy.infoship) {
					var dataShip = this.enemy.infoship[name];

					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;

					try {
						for (var _iterator3 = dataShip.arrkolpalub[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var value = _step3.value;

							if (value[0] != x || value[1] != y) continue;

							this.enemy.score = this.enemy.score + 10 * this.player.k;
							this.player.k++;
							toptext.innerText = "\u0421\u0447\u0435\u0442: " + (pcArea.score - myArea.score);

							dataShip.life--;
							if (dataShip.life > 0) break;

							if (this.enemy === myArea) {
								this.temporaryShip.x0 = dataShip.x;
								this.temporaryShip.y0 = dataShip.y;
							}
							delete this.enemy.infoship[name];
							break;
						}
					} catch (err) {
						_didIteratorError3 = true;
						_iteratorError3 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion3 && _iterator3.return) {
								_iterator3.return();
							}
						} finally {
							if (_didIteratorError3) {
								throw _iteratorError3;
							}
						}
					}
				}
				if (Object.keys(this.enemy.infoship).length == 0) {
					if (this.enemy === myArea) {
						text = 'К сожалению, вы проиграли. Нажмите продолжить для новой игры!';
						sound.gameover();
						checkRec(pcArea.score - myArea.score);
						pcWin = true;
						myArea.score = 0;
						buttonNewGame.hidden = false;
					} else {
						text = 'Поздравляем! Вы выиграли!Нажмите продолжить для дальнейшей игры!';
						sound.gamewon();
						pcWin = false;
						myArea.score = myArea.score - pcArea.score;
						buttonNewGame.hidden = false;
					}
					Controller.infoship.innerText = text;
					buttonNewGame.hidden = false;
				} else if (this.enemy === myArea) {
					var _coords3 = void 0;
					this.temporaryShip.hits++;

					_coords3 = [[x - 1, y - 1], [x - 1, y + 1], [x + 1, y - 1], [x + 1, y + 1]];

					this.markUselessCell(_coords3);

					_coords3 = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
					this.setCoordsAroundHit(x, y, _coords3);
					this.isShipSunk();

					setTimeout(function () {
						return _this5.shot();
					}, 2000);
				}
			}
		}, {
			key: "setCoordsShot",
			value: function setCoordsShot() {
				for (var i = 0; i < 10; i++) {
					for (var j = 0; j < 10; j++) {
						this.coordsRandom.push([i, j]);
					}
				}
				this.coordsRandom.sort(function (a, b) {
					return Math.random() - 0.5;
				});
				var x = void 0,
				    y = void 0;
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = Controller.startShot[1][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var arr = _step4.value;

						x = arr[0];
						y = arr[1];
						while (x >= 0 && x <= 9 && y <= 9) {
							this.coordrsFixed.push([x, y]);
							x = x >= 0 && x <= 9 ? x : x < 0 ? 0 : 9;
							y = y <= 9 ? y : 9;
							x--;
							y++;
						};
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}

				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					for (var _iterator5 = Controller.startShot[0][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var _arr = _step5.value;

						x = _arr[0];
						y = _arr[1];
						while (x <= 9 && y <= 9) {
							this.coordrsFixed.push([x, y]);
							x = x <= 9 ? x : 9;
							y = y <= 9 ? y : 9;
							x++;
							y++;
						}
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5.return) {
							_iterator5.return();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}

				this.coordrsFixed = this.coordrsFixed.reverse();
			}
		}, {
			key: "getCoordsForShot",
			value: function getCoordsForShot() {
				var coords = this.coordsArounf.length > 0 ? this.coordsArounf.pop() : this.coordrsFixed.length > 0 ? this.coordrsFixed.pop() : this.coordsRandom.pop();

				this.removeCoordsFromArrays(coords);
				return coords;
			}
		}, {
			key: "removeCoordsFromArrays",
			value: function removeCoordsFromArrays(coords) {
				if (this.coordsArounf.length > 0) {
					this.coordsArounf = Controller.removeElementArray(this.coordsArounf, coords);
				}
				if (this.coordrsFixed.length > 0) {
					this.coordrsFixed = Controller.removeElementArray(this.coordrsFixed, coords);
				}
				this.coordsRandom = Controller.removeElementArray(this.coordsRandom, coords);
			}
		}, {
			key: "markUselessCell",
			value: function markUselessCell(coords) {
				var n = 1,
				    x = void 0,
				    y = void 0;

				var _iteratorNormalCompletion6 = true;
				var _didIteratorError6 = false;
				var _iteratorError6 = undefined;

				try {
					for (var _iterator6 = coords[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
						var coord = _step6.value;

						y = coord[0];
						x = coord[1];

						if (x < 0 || x > 9 || y < 0 || y > 9) continue;

						if (myArea.matrix[y][x] == 2 || myArea.matrix[y][x] == 3) continue;

						myArea.matrix[y][x] = 2;

						this.showIcons(myArea, [x, y], 'shaded-cell');

						this.removeCoordsFromArrays([x, y]);
						n++;
					}
				} catch (err) {
					_didIteratorError6 = true;
					_iteratorError6 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion6 && _iterator6.return) {
							_iterator6.return();
						}
					} finally {
						if (_didIteratorError6) {
							throw _iteratorError6;
						}
					}
				}
			}
		}, {
			key: "setCoordsAroundHit",
			value: function setCoordsAroundHit(x, y, coords) {
				var _temporaryShip = this.temporaryShip,
				    firstHit = _temporaryShip.firstHit,
				    kx = _temporaryShip.kx,
				    ky = _temporaryShip.ky;


				if (firstHit.length == 0) {
					this.temporaryShip.firstHit = [x, y];
				} else if (kx == 0 && ky == 0) {

					this.temporaryShip.kx = firstHit[0] - x == 0 ? 1 : 0;
					this.temporaryShip.ky = Math.abs(this.temporaryShip.kx - 1);
				}

				var _iteratorNormalCompletion7 = true;
				var _didIteratorError7 = false;
				var _iteratorError7 = undefined;

				try {
					for (var _iterator7 = coords[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
						var coord = _step7.value;

						x = coord[0];
						y = coord[1];

						if (x < 0 || x > 9 || y < 0 || y > 9) continue;

						if (myArea.matrix[x][y] != 0 && myArea.matrix[x][y] != 1) continue;

						this.coordsArounf.push([y, x]);
					}
				} catch (err) {
					_didIteratorError7 = true;
					_iteratorError7 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion7 && _iterator7.return) {
							_iterator7.return();
						}
					} finally {
						if (_didIteratorError7) {
							throw _iteratorError7;
						}
					}
				}
			}
		}, {
			key: "isShipSunk",
			value: function isShipSunk() {
				var max = 0;
				for (var keys in myArea.infoship) {

					max = Math.max(myArea.infoship[keys].arrkolpalub.length, max);
				}

				if (this.temporaryShip.hits >= max || this.coordsArounf.length == 0) {
					this.markUselessCellAroundShip();
					this.coordsArounf = [];
					this.removeTemporary();
				}
			}
		}, {
			key: "markUselessCellAroundShip",
			value: function markUselessCellAroundShip() {
				var _temporaryShip2 = this.temporaryShip,
				    hits = _temporaryShip2.hits,
				    kx = _temporaryShip2.kx,
				    ky = _temporaryShip2.ky,
				    x0 = _temporaryShip2.x0,
				    y0 = _temporaryShip2.y0;


				var coords = void 0;

				if (this.temporaryShip.hits == 1) {
					coords = [
					// верхняя
					[y0, x0 - 1],
					// нижняя
					[y0, x0 + 1],
					// левая
					[y0 - 1, x0],
					// правая
					[y0 + 1, x0]];
					// многопалубный корабль
				} else {
					coords = [
					// левая / верхняя
					[y0 - ky, x0 - kx],
					// правая / нижняя
					[y0 + ky * hits, x0 + kx * hits]];
				}
				this.markUselessCell(coords);
			}
		}], [{
			key: "updateSize",
			value: function updateSize() {
				myVar = getComputedStyle(document.querySelector("#icons")).getPropertyValue("left").slice(0, -2) / 4;
				myArea.sizeArea = pcArea.sizeArea = (myVar * 37.887).toFixed(3);
				myArea.sizeShip = pcArea.sizeArea = (myVar * 3.789).toFixed(3);
				var svg = document.querySelectorAll(".svg");
				svg.forEach(function (e) {
					e.setAttribute("width", (8 * myVar).toFixed(3));
					e.setAttribute("height", (8 * myVar).toFixed(3));
				});
				var o = myArea_field;

				var _getCoordinate5 = getCoordinate(myArea_field),
				    left = _getCoordinate5.left,
				    top = _getCoordinate5.top,
				    right = _getCoordinate5.right,
				    bottom = _getCoordinate5.bottom;

				myArea_field.left = left;
				myArea_field.top = top;
				myArea_field.right = right;
				myArea_field.bottom = bottom;

				var _getCoordinate6 = getCoordinate(pcArea_field),
				    lefte = _getCoordinate6.lefte,
				    tope = _getCoordinate6.tope,
				    righte = _getCoordinate6.righte,
				    bottome = _getCoordinate6.bottome;

				pcArea_field.left = lefte;
				pcArea_field.top = tope;
				pcArea_field.right = righte;
				pcArea_field.bottom = bottome;

				for (var keys in myArea.updateInfo) {
					myArea.updateInfo[keys]["field"].style.left = myArea.sizeShip * myArea.updateInfo[keys]["lastX"] + "px";
					myArea.updateInfo[keys]["field"].style.top = myArea.sizeShip * myArea.updateInfo[keys]["lastY"] + "px";
				}
			}
		}, {
			key: "getCoordsIcon",
			value: function getCoordsIcon(el) {
				var y = Math.trunc(el.style.top.slice(0, -2) / myArea.sizeShip);
				var x = Math.trunc(el.style.left.slice(0, -2) / myArea.sizeShip);
				return [y, x];
			}
		}]);

		return Controller;
	}();

	///////////////Sounds


	Controller.infoship = document.getElementById("service_text");
	Controller.startShot = [[[6, 0], [2, 0], [0, 2], [0, 6]], [[3, 0], [7, 0], [9, 2], [9, 6]]];

	Controller.removeElementArray = function (arr, _ref5) {
		var _ref6 = _slicedToArray(_ref5, 2),
		    x = _ref6[0],
		    y = _ref6[1];

		return arr.filter(function (item) {
			return item[0] != x || item[1] != y;
		});
	};

	var sound = {
		fire: function fire() {
			if (flagSoundOn) {
				window.navigator.vibrate([100, 50, 100, 50]);
				var audio = new Audio();
				audio.src = '../sounds/fire.mp3';
				audio.autoplay = true;
			}
		},
		gameover: function gameover() {
			if (flagSoundOn) {
				var audio = new Audio();
				audio.src = '../sounds/gameover.mp3';
				audio.autoplay = true;
			}
		},
		gamewon: function gamewon() {
			if (flagSoundOn) {
				var audio = new Audio();
				audio.src = '../sounds/game-won.mp3';
				audio.autoplay = true;
			}
		},
		pencil: function pencil() {
			if (flagSoundOn) {
				var audio = new Audio();
				audio.src = '../sounds/pencil.mp3';
				audio.autoplay = true;
			}
		},
		water: function water() {
			window.navigator.vibrate(500);
			if (flagSoundOn) {
				var audio = new Audio();
				audio.src = '../sounds/water.mp3';
				audio.autoplay = true;
			}
		},
		must: function must() {
			if (flagSoundOn) {
				var audio = new Audio();
				audio.src = '../sounds/must_not.mp3';
				audio.autoplay = true;
			}
		},
		shaded: function shaded() {
			if (flagSoundOn) {
				var audio = new Audio();
				audio.src = '../sounds/shaded_placed.mp3';
				audio.autoplay = true;
			}
		}
	};
	window.addEventListener("beforeunload", function (e) {
		e = e || window.event;
		if (Object.keys(myArea.infoship).length || myArea.score) {
			e.returnValue = "Ваш прогресс не сохраниться ,вы уверены выйти?";
		}
	});
});
