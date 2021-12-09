"use strict"
console.log(document.querySelectorAll(".nn"));
location.hash=encodeURIComponent("menu");
  window.onhashchange=switchToStateFromURLHash;
let SPAState;
console.log(document.querySelectorAll(".nn"));
  function switchToStateFromURLHash() {
    var URLHash=window.location.hash;

    // убираем из закладки УРЛа решётку
    // (по-хорошему надо ещё убирать восклицательный знак, если есть)
    var stateStr=URLHash.substr(1);

    if ( stateStr!="" ) { // если закладка непустая, читаем из неё состояние и отображаем
		SPAState=stateStr; // для фото нужна ещё вторая часть закладки - номер фото
    }
    else{SPAState='menu';} // иначе показываем главную страницу}
	console.log(SPAState);
    console.log('Новое состояние приложения:');
	document.getElementById("menuShow").style.display="none";
	document.getElementById("gameShow").style.display="none";
	document.getElementById("ruleShow").style.display="none";
	document.getElementById("recordsShow").style.display="none";
    // обновляем вариабельную часть страницы под текущее состояние
	
    switch ( SPAState ) {
      case 'menu':
        document.getElementById("menuShow").style.display="flex";
        break;
      case 'game':
        document.getElementById("gameShow").style.display="flex";
        break;
      case 'rule':
        document.getElementById("ruleShow").style.display="block";
        break;
		case 'records':
		document.getElementById("recordsShow").style.display="flex";
        break;
		default:
			console.log(1);
			break;
    }

  }

  function switchToState(el) {
	let newHash=el.id.slice(0,-1);
	console.log(newHash);
    location.hash=encodeURIComponent(newHash);
  }


var myVar;
var rec = [];
let flagRec = true;
let kInfo = 1;
let wrap= document.querySelector(".wrap");
var hammertimeSwipe = new Hammer(wrap);
hammertimeSwipe.get('swipe').set({
	direction: Hammer.DIRECTION_ALL
});
document.getElementById("menuShow").querySelectorAll("button").forEach(e=>{
e.addEventListener("click",()=>{switchToState(e);});
});

function records() {
	let divRec = document.querySelector("#rec");
	divRec.innerHTML = "";
	let divRecShow=document.querySelector("#recordsShow");
	divRecShow.innerHTML = "";
	let name = document.createElement("div");
	name.innerText = "Таблица рекордов";
	divRec.appendChild(name);
	for (let i = 0; i < rec.length; i++) {
		let newDiv = document.createElement("div");
		newDiv.innerText = `${i+1}. Имя:${rec[i].name} Количество очков:${rec[i].value}`;
		divRec.appendChild(newDiv);
	}
	divRecShow.appendChild(name);
	for (let i = 0; i < rec.length; i++) {
		let newDiv = document.createElement("div");
		newDiv.innerText = `${i+1}. Имя:${rec[i].name} Количество очков:${rec[i].value}`;
		divRecShow.appendChild(newDiv);
	}
}
var ajaxHandlerScript = "http://fe.it-academy.by/TestAjax2.php";
var pass = Math.random();
let sl = new URLSearchParams();
sl.append('f', 'READ');
sl.append('n', 'SYANTOVICH_SEABATLE_RECORDS');

var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";


function fetchrRec() {
	fetch(ajaxHandlerScript, {
			method: 'post',
			body: sl
		})
		.then(response => response.json())
		.then(data => {
			rec = JSON.parse(data.result);
			records();
		})
		.catch(error => {
			alert("Неудалось загрузить данные. Попробую еще раз чере минутку");
			setTimeout(fetchrRec, 61000);
		});
}
fetchrRec();
hammertimeSwipe.on('swipe', function (ev) {

	ev.preventDefault();

			let divRec = document.querySelector("#rec");
			let direc = ev.direction;
			switch (direc) {
			case 4: {
				if (divRec.className != "firstR") {
					divRec.classList.add("l");
					divRec.classList.remove("r");
					setTimeout(() => {
						divRec.style.display = "none";
					}, 1020);
				}
			}
			break;
			case 2: {
				divRec.classList.remove("firstR");
				divRec.classList.add("r");
				divRec.classList.remove("l");

				divRec.style.display = "flex";
				break;
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
		let flagStart = false;

		let flagHandPos = false;

		let flagController = false;

		let flagPcShots = true;

		let myArea_field = document.querySelector("#myArea");

		let pcArea_field = document.querySelector("#pcArea");


		const instruction = document.getElementById('instruction');

		const shipsCollection = document.getElementById('ships_collection');

		const initialShips = document.querySelector('.wrap + .initial-ships');

		const toptext = document.getElementById('text_top');

		const buttonPlay = document.getElementById('play');

		const buttonNewGame = document.getElementById('newgame');


		var pcArea = {};

		let control = null;

		function getCoordinate(field) {
			let {
				left,
				top,
				right,
				bottom
			} = field.getBoundingClientRect();
			return {
				left,
				top,
				right,
				bottom
			};
		}

		class Area {
			constructor(field) {
				myVar = getComputedStyle(document.querySelector("#icons")).getPropertyValue("left").slice(0, -2) / 4;
				this.sizeArea = (myVar * 37.887).toFixed(3);
				this.sizeShip = (myVar * 3.789).toFixed(3);
				let svg = document.querySelectorAll(".svg");
				svg.forEach(e => {
					e.setAttribute("width", (11.481 * myVar).toFixed(3));
					e.setAttribute("height", (11.481 * myVar).toFixed(3));
				});
				this.k = 1;
				this.matrix = [
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				];
				this.infoship = {};
				this.score = 0;
				this.updateInfo = {};
				this.field = field;
				let {
					left,
					top,
					right,
					bottom
				} = getCoordinate(field);
				this.left = left;
				this.right = right;
				this.top = top;
				this.bottom = bottom;
			}


			static allShips = { //ключ имя корабля, значение массив 1-ый элемент количество на карте , 2-ой количество палуб
				four: [1, 4],
				three: [2, 3],
				two: [3, 2],
				one: [4, 1]
			};
			static random(n) {
				return Math.floor(Math.random() * (n + 1));
			}
			cleanField() {

				while (this.field.firstChild) {
					this.field.removeChild(this.field.firstChild);
				}
				this.updateInfo = {};
				kInfo = 1;
				this.infoship = {};
				this.matrix = [
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				];
			}

			randomLocation() {
				for (let key in Area.allShips) {
					let kolpalub = Area.allShips[key][1];
					let kolInMap = Area.allShips[key][0];
					for (let i = 0; i < kolInMap; i++) {
						let name = key + `${i+1}`;
						let obj = this.getCoords(kolpalub);
						obj.kolpalub = kolpalub;
						obj.shipname = name;
						let ship = new Ship(this, obj);

						ship.showShip();
					}
				}

			}
			getCoords(kolpalub) {
				let kx = Area.random(1);
				let ky = Math.abs(kx - 1);
				let x, y;
				if (kx == 0) {
					x = Area.random(10 - kolpalub);
					y = Area.random(9);
				} else {
					x = Area.random(9);
					y = Area.random(10 - kolpalub);
				}
				let obj = {
					x,
					y,
					ky,
					kx
				};
				const validCoords = this.check(obj, kolpalub);
				if (!validCoords) {
					return this.getCoords(kolpalub);
				}
				return obj;
			}
			check(obj, kolpalub) {
				let q = this.matrix;


				let {
					x,
					y,
					ky,
					kx
				} = obj;
				let fromX,
					fromY,
					toX,
					toY;


				fromX = (x == 0) ? x : x - 1;
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

				fromY = (y == 0) ? y : y - 1;
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
				for (let i = fromY; i < toY; i++) {
					for (let j = fromX; j < toX; j++) {
						if (this.matrix[i][j] == 1) {
							return false;
						}
					}
				}

				return true;

			}
		}
		class Ship {
			constructor(self, {
				x,
				y,
				ky,
				kx,
				kolpalub,
				shipname
			}) {
				this.player = (self == myArea) ? myArea : pcArea;
				this.field = self.field;
				this.x = x;
				this.y = y;
				this.kx = kx;
				this.ky = ky;
				this.shipname = shipname;
				this.kolpalub = kolpalub;
				this.arrkolpalub = [];
			}
			showShip() {
				let {
					player,
					field,
					shipname,
					kolpalub,
					x,
					y,
					ky,
					kx,
					life,
					arrkolpalub,
					k = 0
				} = this;
				life = kolpalub;
				while (k < kolpalub) {
					let i = y + k * ky,
						j = x + k * kx;

					player.matrix[i][j] = 1;

					arrkolpalub.push([i, j]);
					k++;
				}
				player.infoship[shipname] = {
					arrkolpalub,
					life,
					x,
					y,
					ky,
					kx
				};

				if (this.player == myArea) {
					let div = document.createElement("div");
					let name = this.shipname.slice(0, -1);
					let vertical = (this.kx == 0) ? "vertical" : "";
					div.id = this.shipname;
					div.style.left = myArea.sizeShip * this.x + "px";
					div.style.top = myArea.sizeShip * this.y + "px";
					div.className = `ship ${vertical} ${name}`;
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
		}
		buttonPlay.addEventListener("click", (e) => {
			flagRec = true;
			e = e || window.event;
			e.target.hidden = true;
			instruction.hidden = true;
			pcArea_field.parentElement.hidden = false;
			toptext.innerHTML = 'Счет: 0';
			pcArea = new Area(pcArea_field);
			pcArea.cleanField();
			pcArea.randomLocation();
			flagStart = true;
			if (!control) control = new Controller();

			control.init();
		});


		document.getElementById('type_placement').addEventListener('click', function (e) {
			flagRec = false;

			if (e.target.tagName != 'SPAN') return;

			buttonPlay.hidden = true;

			myArea.cleanField();


			let initialShipsClone = '';

			const type = e.target.dataset.target;


			const typeGeneration = {
				random() {

					shipsCollection.hidden = true;

					myArea.randomLocation();
				},
				manually() {

					let value = !shipsCollection.hidden;

					if (shipsCollection.children.length > 1) {
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

			const placement = new Placement();

			placement.setObserver();
		}); class Placement {


			constructor() {

				this.dragObject = {};

				this.pressed = false;
				this.areaCoords = getCoordinate(myArea_field);
			}
			static getCloneDecks = el => {
				const type = el.id.slice(0, -1);
				return Area.allShips[type][1];
			}
			setObserver() {
				if (flagHandPos) return;
				document.addEventListener('mousedown', this.onMouseDown.bind(this));
				document.addEventListener('mousemove', this.onMouseMove.bind(this));
				document.addEventListener('mouseup', this.onMouseUp.bind(this));
				document.addEventListener('touchstart', this.onMouseDown.bind(this));
				document.addEventListener('touchmove', this.onMouseMove.bind(this));
				document.addEventListener('touchend', this.onMouseUp.bind(this));
				myArea_field.addEventListener('contextmenu', this.rotationShip.bind(this));
				var mc = new Hammer.Manager(myArea_field);
				mc.add(new Hammer.Swipe({
					event: 'a',
					pointers: 2,
					direction: 2
				}));


				mc.on("a", function (ev) {
					alert("left 2");
				});
				var hammertimeRotate = new Hammer(myArea_field);
				hammertimeRotate.on('doubletap', this.rotationShip.bind(this));
				flagHandPos = true;
			}

			onMouseDown(EO) {
				EO = EO || window.event;
				this.areaCoords = getCoordinate(myArea_field);


				let mouseTouch = EO.which == 1 || EO.type == "touchstart";
				EO.preventDefault();
				if(!mouseTouch) this.dragObject={};
				if (!mouseTouch || flagStart) return;

				const el = EO.target.closest('.ship');
				if (!el) return;

				this.pressed = true;

				this.dragObject = {
					el,
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
					const name = el.id;


					console.log(this.dragObject);
					console.log(myArea);
					this.dragObject.ky = myArea.infoship[name].ky;
					this.dragObject.kx = myArea.infoship[name].kx;
				}

			}

			onMouseMove(e) {

				e = e || window.event;
				if (!this.pressed || !this.dragObject.el) return;
				e.preventDefault();

				let {
					left,
					right,
					top,
					bottom
				} = getCoordinate(this.dragObject.el);


				if (!this.clone) {

					this.kolpalub = Placement.getCloneDecks(this.dragObject.el);

					this.clone = this.creatClone({
						left,
						right,
						top,
						bottom
					}) || null;

					if (!this.clone) return;

					this.shiftX = this.dragObject.downX - left;
					this.shiftY = this.dragObject.downY - top;

					this.clone.style.zIndex = '1000';

					document.body.appendChild(this.clone);


					this.removeShipFromInfo(this.clone);
				}


				let newX = e.pageX || e.targetTouches[0].clientX;
				let newY = e.pageY || e.targetTouches[0].clientY;
				let currentLeft = Math.round(newX - this.shiftX),
					currentTop = Math.round(newY - this.shiftY);

				this.clone.style.left = `${currentLeft}px`;
				this.clone.style.top = `${currentTop}px`;


				if (left >= this.areaCoords.left - myVar * 1.607 && right <= this.areaCoords.right + myVar * 1.607 && top >= this.areaCoords.top - myVar * 1.607 && bottom <= this.areaCoords.bottom + myVar * 3) {

					this.clone.classList.remove('unsuccess');
					this.clone.classList.add('success');

					const {
						x,
						y
					} = this.getCoordsCloneInMatrix({
						left,
						right,
						top,
						bottom
					});
					const obj = {
						x,
						y,
						ky: this.dragObject.ky,
						kx: this.dragObject.kx
					};

					const result = myArea.check(obj, this.kolpalub);

					if (!result) {

						this.clone.classList.remove('success');
						this.clone.classList.add('unsuccess');
					}
				} else {

					this.clone.classList.remove('success');
					this.clone.classList.add('unsuccess');
				}

			}

			onMouseUp(e) {
				this.pressed = false;
				if (!this.clone) return;

				if (this.clone.classList.contains('unsuccess')) {
					this.clone.classList.remove('unsuccess');
					sound.must();
					this.clone.rollback();
				} else {
					this.createShipAfterMoving();
				}

				this.removeClone();
				console.log(this.dragObject);
			}

			rotationShip(e) {
				e.preventDefault();
				let ft= e.which == 3||  e.type=="doubletap";
				if (!ft || flagStart) return;

				const el = e.target.closest('.ship');
				const name = el.id;

				if (myArea.infoship[name].kolpalub == 1) return;

				const obj = {
					ky: (myArea.infoship[name].ky == 0) ? 1 : 0,
					kx: (myArea.infoship[name].kx == 0) ? 1 : 0,
					x: myArea.infoship[name].x,
					y: myArea.infoship[name].y
				};
				const kolpalub = myArea.infoship[name].arrkolpalub.length;
				this.removeShipFromInfo(el);
				myArea.field.removeChild(el);

				const result = myArea.check(obj, kolpalub);
				if (!result) {
					obj.ky = (obj.ky == 0) ? 1 : 0;
					obj.kx = (obj.kx == 0) ? 1 : 0;
				}

				obj.shipname = name;
				obj.kolpalub = kolpalub;


				const ship = new Ship(myArea, obj);
				ship.showShip();


				if (!result) {
					const el = document.getElementById(name);
					el.classList.add('unsuccess');
					sound.must();
					setTimeout(() => {
						el.classList.remove('unsuccess');
					}, 750);
				}
			}

			creatClone() {
				const clone = this.dragObject.el;
				const oldPosition = this.dragObject;

				clone.rollback = () => {

					if (oldPosition.parent == myArea_field) {
						clone.style.left = `${oldPosition.left}px`;
						clone.style.top = `${oldPosition.top}px`;
						clone.style.zIndex = '';
						oldPosition.parent.insertBefore(clone, oldPosition.next);
						this.createShipAfterMoving();
					} else {

						clone.removeAttribute('style');
						oldPosition.parent.insertBefore(clone, oldPosition.next);
					}
				};
				return clone;
			}

			removeClone() {
				delete this.clone;
			}

			createShipAfterMoving() {

				const coords = getCoordinate(this.clone);
				let {
					left,
					top,
					x,
					y
				} = this.getCoordsCloneInMatrix(coords);
				this.clone.style.left = `${left}px`;
				this.clone.style.top = `${top}px`;

				myArea_field.appendChild(this.clone);

				this.clone.classList.remove('success');
				for (let keys in myArea.updateInfo) {
					let tf = myArea.updateInfo[keys]["field"] == this.dragObject.el
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

				const options = {
					shipname: this.clone.id,
					x,
					y,
					ky: this.dragObject.ky,
					kx: this.dragObject.kx,
					kolpalub: this.kolpalub
				};


				const ship = new Ship(myArea, options);
				ship.showShip();

				myArea_field.removeChild(this.clone);
			}

			getCoordsCloneInMatrix({
				left,
				right,
				top,
				bottom
			} = coords) {

				let computedLeft = left - this.areaCoords.left,
					computedRight = right - this.areaCoords.right,
					computedTop = top - this.areaCoords.top,
					computedBottom = bottom - this.areaCoords.bottom;


				const obj = {};


				let ft = (computedTop < 0) ? 0 : (computedBottom > myArea.sizeArea) ? myArea.sizeArea - myArea.sizeShip : computedTop;
				let fl = (computedLeft < 0) ? 0 : (computedRight > myArea.sizeArea) ? myArea.sizeArea - myArea.sizeShip * this.kolpalub : computedLeft;

				obj.top = Math.round(ft / myArea.sizeShip) * myArea.sizeShip;
				obj.left = Math.round(fl / myArea.sizeShip) * myArea.sizeShip;



				obj.y = Math.round(obj.top / myArea.sizeShip);
				obj.x = Math.round(obj.left / myArea.sizeShip);

				return obj;
			}

			removeShipFromInfo(el) {

				const name = el.id;

				if (!myArea.infoship[name]) return;


				let arr = myArea.infoship[name].arrkolpalub;
				for (let coords of arr) {
					const [x, y] = coords;
					myArea.matrix[x][y] = 0;
				}

				delete myArea.infoship[name];
			}
		}

		let myArea = new Area(myArea_field); window.addEventListener("resize", e => {
			Controller.updateSize();

		});

		class Controller {
			static infoship = document.getElementById("service_text");
			static startShot = [
				[
					[6, 0],
					[2, 0],
					[0, 2],
					[0, 6]
				],
				[
					[3, 0],
					[7, 0],
					[9, 2],
					[9, 6]
				]
			];
			static removeElementArray = (arr, [x, y]) => {
				return arr.filter(item => item[0] != x || item[1] != y);
			}


			constructor() {
				this.player = "";
				this.enemy = "";
				this.coordsRandom = [];
				this.coordsArounf = [];
				this.coordrsFixed = [];
				this.removeTemporary();
			}
			static updateSize() {
				myVar = getComputedStyle(document.querySelector("#icons")).getPropertyValue("left").slice(0, -2) / 4;
				myArea.sizeArea = pcArea.sizeArea = (myVar * 37.887).toFixed(3);
				myArea.sizeShip = pcArea.sizeArea = (myVar * 3.789).toFixed(3);
				let svg = document.querySelectorAll(".svg");
				svg.forEach(e => {
					e.setAttribute("width", (11.481 * myVar).toFixed(3));
					e.setAttribute("height", (11.481 * myVar).toFixed(3));
				});
				let o = myArea_field;
				let {
					left,
					top,
					right,
					bottom
				} = getCoordinate(myArea_field);
				myArea_field.left = left;
				myArea_field.top = top;
				myArea_field.right = right;
				myArea_field.bottom = bottom;
				let {
					lefte,
					tope,
					righte,
					bottome
				} = getCoordinate(pcArea_field);
				pcArea_field.left = lefte;
				pcArea_field.top = tope;
				pcArea_field.right = righte;
				pcArea_field.bottom = bottome;


				for (let keys in myArea.updateInfo) {
					myArea.updateInfo[keys]["field"].style.left = myArea.sizeShip * myArea.updateInfo[keys]["lastX"] + "px";
					myArea.updateInfo[keys]["field"].style.top = myArea.sizeShip * myArea.updateInfo[keys]["lastY"] + "px";
				}
			}
			removeTemporary() {
				this.temporaryShip = {
					hits: 0,
					firstHit: [],
					kx: 0,
					ky: 0
				};
			}
			static getCoordsIcon(el) {
				const y = Math.trunc(el.style.top.slice(0, -2) / myArea.sizeShip);
				const x = Math.trunc(el.style.left.slice(0, -2) / myArea.sizeShip);
				return [y, x];
			}


			init() {
				const random = Area.random(1);
				this.player = (random == 0) ? myArea : pcArea;
				flagPcShots = (random == 1) ? true : false;
				this.enemy = (random == 1) ? myArea : pcArea;
				this.setCoordsShot();
				if (!flagController) {
					pcArea_field.addEventListener('click', this.shot.bind(this));
					pcArea_field.addEventListener("contextmenu", this.empty.bind(this));
					if (random == 1) {
						setTimeout(() => this.shot(), 2000);
					}

					if (random == 0) {
						Controller.infoship.innerText = "Вы стреляете первым!";
					} else {
						Controller.infoship.innerText = "Увы, но первым стреляет компьютер";
					}
				}
			}
			empty(e) {
				e = e || window.event;
				e.preventDefault();
				let {
					left,
					top,
					right,
					bottom
				} = getCoordinate(this.enemy.field);
				this.enemy.left = left;
				this.enemy.right = right;
				this.enemy.top = top;
				this.enemy.bottom = bottom;
				if (e.which != 3 || flagPcShots) {
					return;
				}
				let [y, x] = this.coordsInMatrix(e, pcArea);
				let check = this.checkUseless([y, x], 1);
				if (check) {
					this.showIcons(this.enemy, [x, y], 'shaded-cell');
				}
			}
			coordsInMatrix(e, self) {
				const y = Math.trunc((e.pageY - self.top - myVar * 0.0263157894736842) / myArea.sizeShip);
				const x = Math.trunc((e.pageX - self.left - myVar * 0.0263157894736842) / myArea.sizeShip);
				return [y, x];
			}
			checkUseless(coords, f) {
				if (pcArea.matrix[coords[0]][coords[1]] > 1) {
					return false;
				}
				const icons = this.enemy.field.querySelectorAll('.shaded-cell');
				if (icons.length == 0) return true;

				for (let icon of icons) {

					const [x, y] = Controller.getCoordsIcon(icon);
					if (coords[0] == x && coords[1] == y) {

						if (f == 1) {

							for (let keys in myArea.updateInfo) {
								if (myArea.updateInfo[keys]["field"] == icon) {
									delete myArea.updateInfo[keys];
								}
							}
							icon.remove();

						} else {

							icon.classList.add('shaded-cell_red');
							sound.shaded();
							setTimeout(() => {
								icon.classList.remove('shaded-cell_red')
							}, 500);
						}
						return false;
					}
				}
				return true;
			}
			showIcons(enemy, [x, y], iconClass) {

				const field = enemy.field;

				if (iconClass === 'dot' || iconClass === 'red-cross') {
					let i = 1;
					if (iconClass === 'red-cross') {
						sound.fire();
					}
					if (iconClass === 'dot') {
						sound.water();
					}
					setTimeout(() => fn(i), 400);
				} else {
					let i = 0;
					if (iconClass === 'shaded-cell') {
						i = 1
						sound.pencil();
					};
					fn(i);
				}

				function fn(i) {

					const span = document.createElement('span');
					span.className = `icon-field ${iconClass}`;
					span.style.left = x * myArea.sizeShip + "px";
					span.style.top = y * myArea.sizeShip + "px";
					if (i == 1) {
						myArea.updateInfo[`icon-field${x}${y}${(enemy==myArea)?'m':'p'}`] = {
							"lastX": x,
							"lastY": y,
							"field": span
						};

					}


					field.appendChild(span);
				}
			}
			shot(e) {
				if (this.player == pcArea) {
					flagPcShots = true;
				}
				e = e || window.event;
				let {
					left,
					top,
					right,
					bottom
				} = getCoordinate(this.enemy.field);
				this.enemy.left = left;
				this.enemy.right = right;
				this.enemy.top = top;
				this.enemy.bottom = bottom;
				let x,
					y;
				if (e !== undefined) {
					if (e.which != 1 || flagPcShots) return;
					[y, x] = this.coordsInMatrix(e, this.enemy);
					let check = this.checkUseless([y, x]);
					if (!check) return;
					this.showExplosion(x, y);
				} else {
					([x, y] = this.getCoordsForShot());
					this.showExplosion(x, y);
				}


				const v = this.enemy.matrix[y][x];

				switch (v) {
					case 0: // промах
						this.miss(y, x);
						break;
					case 1: // попадание
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
			showExplosion(x, y) {

				this.showIcons(this.enemy, [x, y], 'explosion');
				const explosion = this.enemy.field.querySelector('.explosion');
				explosion.classList.add('active');
				setTimeout(() => explosion.remove(), 430);
			}
			miss(x, y) {
				let text = '';

				this.showIcons(this.enemy, [y, x], 'dot');
				this.enemy.matrix[x][y] = 3;
				this.player.k = 1;

				if (this.player === myArea) {
					text = 'Вы промахнулись. Стреляет компьютер.';
					this.player = pcArea;
					this.enemy = myArea;
					flagPcShots = true;
					setTimeout(() => this.shot(), 2000);
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
				setTimeout(() => Controller.infoship.innerText = text, 400);
			}
			hit(x, y) {
				let text = '';
				this.showIcons(this.enemy, [y, x], 'red-cross');
				this.enemy.matrix[x][y] = 4;
				text = (this.player === myArea) ? 'Поздравляем! Вы попали. Ваш выстрел.' : 'Компьютер попал в ваш корабль. Выстрел компьютера';
				setTimeout(() => Controller.infoship.innerText = text, 400);
				for (let name in this.enemy.infoship) {
					const dataShip = this.enemy.infoship[name];

					for (let value of dataShip.arrkolpalub) {
						if (value[0] != x || value[1] != y) continue;

						this.enemy.score = this.enemy.score + (10 * this.player.k);
						this.player.k++;
						toptext.innerText = `Счет: ${pcArea.score-myArea.score}`;

						dataShip.life--;
						if (dataShip.life > 0) break;

						if (this.enemy === myArea) {
							this.temporaryShip.x0 = dataShip.x;
							this.temporaryShip.y0 = dataShip.y;
						}
						delete this.enemy.infoship[name];
						break;
					}
				}
				if (Object.keys(this.enemy.infoship).length == 0) {
					if (this.enemy === myArea) {
						text = 'К сожалению, вы проиграли.';
						for (let name in pcArea.infoship) {
							const infoOneShip = pcArea.infoship[name];
							Ship.showShip(pcArea, name, infoOneShip.x, infoOneShip.y, infoOneShip.kx);
						}
					} else {
						text = 'Поздравляем! Вы выиграли!';
					}
					Controller.infoship.innerText = text;
					buttonNewGame.hidden = false;

				} else if (this.enemy === myArea) {
					let coords;
					this.temporaryShip.hits++;

					coords = [
						[x - 1, y - 1],
						[x - 1, y + 1],
						[x + 1, y - 1],
						[x + 1, y + 1]
					];

					this.markUselessCell(coords);

					coords = [
						[x - 1, y],
						[x + 1, y],
						[x, y - 1],
						[x, y + 1]
					];
					this.setCoordsAroundHit(x, y, coords);
					this.isShipSunk();


					setTimeout(() => this.shot(), 2000);

				}
			}
			setCoordsShot() {
				for (let i = 0; i < 10; i++) {
					for (let j = 0; j < 10; j++) {
						this.coordsRandom.push([i, j]);
					}
				}
				this.coordsRandom.sort((a, b) => Math.random() - 0.5);
				let x,
					y;
				for (let arr of Controller.startShot[1]) {
					x = arr[0];
					y = arr[1];
					while (x >= 0 && x <= 9 && y <= 9) {
						this.coordrsFixed.push([x, y]);
						x = (x >= 0 && x <= 9) ? x : (x < 0) ? 0 : 9;
						y = (y <= 9) ? y : 9;
						x--;
						y++;
					};
				}
				for (let arr of Controller.startShot[0]) {
					x = arr[0];
					y = arr[1];
					while (x <= 9 && y <= 9) {
						this.coordrsFixed.push([x, y]);
						x = (x <= 9) ? x : 9;
						y = (y <= 9) ? y : 9;
						x++;
						y++;
					}
				}

				this.coordrsFixed = this.coordrsFixed.reverse();
			}
			getCoordsForShot() {
				const coords = (this.coordsArounf.length > 0) ? this.coordsArounf.pop() : (this.coordrsFixed.length > 0) ? this.coordrsFixed.pop() : this.coordsRandom.pop();

				this.removeCoordsFromArrays(coords);
				return coords;
			}
			removeCoordsFromArrays(coords) {
				if (this.coordsArounf.length > 0) {
					this.coordsArounf = Controller.removeElementArray(this.coordsArounf, coords);
				}
				if (this.coordrsFixed.length > 0) {
					this.coordrsFixed = Controller.removeElementArray(this.coordrsFixed, coords);
				}
				this.coordsRandom = Controller.removeElementArray(this.coordsRandom, coords);
			}
			markUselessCell(coords) {
				let n = 1,
					x, y;

				for (let coord of coords) {
					y = coord[0];
					x = coord[1];


					if (x < 0 || x > 9 || y < 0 || y > 9) continue;

					if (myArea.matrix[y][x] == 2 || myArea.matrix[y][x] == 3) continue;

					myArea.matrix[y][x] = 2;


					this.showIcons(myArea, [x, y], 'shaded-cell');

					this.removeCoordsFromArrays([x, y]);
					n++;
				}
			}
			setCoordsAroundHit(x, y, coords) {
				let {
					firstHit,
					kx,
					ky
				} = this.temporaryShip;


				if (firstHit.length == 0) {
					this.temporaryShip.firstHit = [x, y];

				} else if (kx == 0 && ky == 0) {

					this.temporaryShip.kx = ((firstHit[0] - x) == 0) ? 1 : 0;
					this.temporaryShip.ky = Math.abs(this.temporaryShip.kx - 1);
				}

				for (let coord of coords) {
					x = coord[0];
					y = coord[1];


					if (x < 0 || x > 9 || y < 0 || y > 9) continue;

					if (myArea.matrix[x][y] != 0 && myArea.matrix[x][y] != 1) continue;

					this.coordsArounf.push([y, x]);
				}
			}
			isShipSunk() {
				let max = 0;
				for (let keys in myArea.infoship) {
					max = Math.max(myArea.infoship[keys].kolpalub, max);
				}
				if (this.temporaryShip.hits >= max || this.coordsArounf.length == 0) {
					this.markUselessCellAroundShip();
					this.coordsArounf = [];
					this.removeTemporary();
				}
			}
			markUselessCellAroundShip() {

				const {
					hits,
					kx,
					ky,
					x0,
					y0
				} = this.temporaryShip;

				let coords;

				if (this.temporaryShip.hits == 1) {
					coords = [
						// верхняя
						[y0, x0 - 1],
						// нижняя
						[y0, x0 + 1],
						// левая
						[y0 - 1, x0],
						// правая
						[y0 + 1, x0]
					];
					// многопалубный корабль
				} else {
					coords = [
						// левая / верхняя
						[y0 - ky, x0 - kx],
						// правая / нижняя
						[y0 + ky * hits, x0 + kx * hits]
					];
				}
				this.markUselessCell(coords);
			}

		}

		///////////////Sounds
		var sound = {
			fire() {

				let audio = new Audio();
				audio.src = '../sounds/fire.mp3';
				audio.autoplay = true;
			},
			gameover() {

				let audio = new Audio();
				audio.src = '../sounds/gameover.mp3';
				audio.autoplay = true;
			},
			gamewon() {

				let audio = new Audio();
				audio.src = '../sounds/game-won.mp3';
				audio.autoplay = true;
			},
			pencil() {

				let audio = new Audio();
				audio.src = '../sounds/pencil.mp3';
				audio.autoplay = true;
			},
			water() {

				let audio = new Audio();
				audio.src = '../sounds/water.mp3';
				audio.autoplay = true;
			},
			must() {

				let audio = new Audio();
				audio.src = '../sounds/must_not.mp3';
				audio.autoplay = true;
			},
			shaded() {
				let audio = new Audio();
				audio.src = '../sounds/shaded_placed.mp3';
				audio.autoplay = true;
			}

		};