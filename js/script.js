"use strict"
var myVar;
var rec = [];
let flagRec = true;
let kInfo=1;

function records() {
	let divRec = document.querySelector("#rec");
	divRec.innerHTML = "";
	let name = document.createElement("div");
	name.innerText = "Таблица рекордов";
	divRec.appendChild(name);
	for (let i = 0; i < rec.length; i++) {
		let newDiv = document.createElement("div");
		newDiv.innerText = `${i+1}. Имя:${rec[i].name} Количество очков:${rec[i].value}`;
		divRec.appendChild(newDiv);
	}
}
var ajaxHandlerScript = "http://fe.it-academy.by/TestAjax2.php";
var pass = Math.random();
let sl = new URLSearchParams();
sl.append('f', 'READ');
sl.append('n', 'SYANTOVICH_SEABATLE_RECORDS');

var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";


function fetchrRec(){
	fetch(ajaxHandlerScript, {
		method: 'post',
		body: sl
	})
	.then(response => response.json())
	.then(data => {
		rec = JSON.parse(data.result);
		console.log(rec);
		records();
	})
	.catch(error => {
		alert("Неудалось загрузить данные. Попробую еще раз чере минутку");
		setTimeout(fetchrRec,61000);
	});
}
fetchrRec();


function detectswipe() {
	var swipe_det = new Object();
	swipe_det.sX = 0;
	swipe_det.sY = 0;
	swipe_det.eX = 0;
	swipe_det.eY = 0;
	var min_x = 30; //min x swipe for horizontal swipe
	var max_x = 30; //max x difference for vertical swipe
	var min_y = 50; //min y swipe for vertical swipe
	var max_y = 60; //max y difference for horizontal swipe
	var direc = "";
	document.addEventListener('touchstart', function (e) {
		if (flagRec) {
			var t = e.touches[0];
			swipe_det.sX = t.screenX;
			swipe_det.sY = t.screenY;
		}

	}, false);
	document.addEventListener('touchmove', function (e) {
		if (flagRec) {
			e.preventDefault();
			var t = e.touches[0];
			swipe_det.eX = t.screenX;
			swipe_det.eY = t.screenY;
		}

	}, false);
	document.addEventListener('touchend', function (e) {
		if (flagRec) {
			if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
				if (swipe_det.eX > swipe_det.sX) direc = "r";
				else direc = "l";
			}
			//vertical detection
			else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
				if (swipe_det.eY > swipe_det.sY) direc = "d";
				else direc = "u";
			}

			if (direc != "") {
				let divRec = document.querySelector("#rec"),
				divRul= document.querySelector("#rul");
				if (direc == "l") {
					if (divRec.className != "firstR") {
						divRec.classList.add("l");
						divRec.classList.remove("r");
						setTimeout(() => {
							divRec.style.display = "none";
						}, 1020)
					}

				}
				if (direc == "r") {
					divRec.classList.remove("firstR");
					divRec.classList.add("r");
					divRec.classList.remove("l");

					divRec.style.display = "flex";


				}
				if (direc == "u") {
					if (divRul.className != "firstL") {
						
					divRul.classList.add("u");
					divRul.classList.remove("d");
					setTimeout(() => {
						divRul.style.display = "none";
					}, 1020)}

				}
				if (direc == "d") {
					divRul.classList.remove("firstL");
					divRul.style.display = "block";
					divRul.classList.add("d");
					divRul.classList.remove("u");
					
				}
			}
		}
		//horizontal detection

		direc = "";
		swipe_det.sX = 0;
		swipe_det.sY = 0;
		swipe_det.eX = 0;
		swipe_det.eY = 0;
	}, false);
}
detectswipe();

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

// родительский контейнер с инструкцией
const instruction = document.getElementById('instruction');
// контейнер, в котором будут размещаться корабли, предназначенные для перетаскивания
// на игровое поле
const shipsCollection = document.getElementById('ships_collection');
// контейнер с набором кораблей, предназначенных для перетаскивания
// на игровое поле
const initialShips = document.querySelector('.wrap + .initial-ships');
// контейнер с заголовком
const toptext = document.getElementById('text_top');
// кнопка начала игры
const buttonPlay = document.getElementById('play');
// кнопка перезапуска игры
const buttonNewGame = document.getElementById('newgame');

// получаем экземпляр игрового поля игрока
// экземпляр игрового поля только регистрируем
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
		this.k=1;
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
		this.score=0;
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
		kInfo=1;
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

		//от и до не включительно по х
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

		//от и до не включительно по y
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
		console.log(obj);
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
			// записываем координаты корабля в двумерный массив игрового поля
			// теперь наглядно должно быть видно, зачем мы создавали два
			// коэффициента направления палуб
			// если коэффициент равен 1, то соответствующая координата будет
			// увеличиваться при каждой итерации
			// если равен нулю, то координата будет оставаться неизменной
			// таким способом мы очень сократили и унифицировали код
			let i = y + k * ky,
				j = x + k * kx;

			// значение 1, записанное в ячейку двумерного массива, говорит о том, что
			// по данным координатам находится палуба некого корабля
			player.matrix[i][j] = 1;
			// записываем координаты палубы
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
			this.player.updateInfo[kInfo]={
				"lastX":x,
				"lastY":y,
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
	toptext.style.backgroundColor = "white";
	toptext.innerHTML = 'Счет: 0';
	pcArea = new Area(pcArea_field);
	pcArea.cleanField();
	pcArea.randomLocation();
	flagStart = true;
	if (!control) control = new Controller();
	// запускаем игру
	control.init();
});


document.getElementById('type_placement').addEventListener('click', function (e) {
	flagRec = false;
	// используем делегирование основанное на всплытии событий
	if (e.target.tagName != 'SPAN') return;

	// если мы уже создали эскадру ранее, то видна кнопка начала игры
	// скроем её на время повторной расстановки кораблей
	buttonPlay.hidden = true;
	// очищаем игровое поле игрока перед повторной расстановкой кораблей
	myArea.cleanField();

	// очищаем клон объекта с набором кораблей
	let initialShipsClone = '';
	// способ расстановки кораблей на игровом поле
	const type = e.target.dataset.target;
	
	// создаём литеральный объект typeGeneration
	// каждому свойству литерального объекта соответствует функция
	// в которой вызывается рандомная или ручная расстановка кораблей
	const typeGeneration = {
		random() {
			// скрываем контейнер с кораблями, предназначенными для перетаскивания
			// на игровое поле
			shipsCollection.hidden = true;
			// вызов ф-ии рандомно расставляющей корабли для экземпляра игрока
			myArea.randomLocation();
		},
		manually() {
			// определяем видимость набора кораблей
			let value = !shipsCollection.hidden;

			// если в контейнере, кроме информационной строки, находится набор
			// кораблей, то удаляем его
			if (shipsCollection.children.length > 1) {
				shipsCollection.removeChild(shipsCollection.lastChild);
			}

			// если набор кораблей при клике на псевдоссылку был невидим, то
			// клнируем его, переносим в игровой контейнер и выводим на экран
			if (!value) {

				initialShipsClone = initialShips.cloneNode(true);
				shipsCollection.appendChild(initialShipsClone);
				initialShipsClone.hidden = false;
			}

			// в зависимости от полученного значения value показываем или скрываем
			// блок с набором кораблей
			shipsCollection.hidden = value;

		}
	};
	// вызов функции литерального объекта в зависимости
	// от способа расстановки кораблей
	typeGeneration[type]();

	// создаём экземпляр класса, отвечающего за перетаскивание
	// и редактирование положения кораблей
	const placement = new Placement();
	// устанавливаем обработчики событий
	placement.setObserver();
});
class Placement {
	// объект с координатами стророн игрового поля

	constructor() {
		// объект перетаскивамого корабля
		this.dragObject = {};
		// флаг нажатия на левую кнопку мыши
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
		myArea_field.addEventListener('dblclick', this.rotationShip.bind(this));
		flagHandPos = true;
	}

	onMouseDown(EO) {
		EO = EO || window.event;
		this.areaCoords = getCoordinate(myArea_field);
		// если нажата не левая кнопка мыши или игра уже запущена

		let mouseTouch = EO.which == 1 || EO.type == "touchstart";
		EO.preventDefault();
		if (!mouseTouch || flagStart) return;



		// проверяем, что нажатие произошло над кораблём
		const el = EO.target.closest('.ship');
		if (!el) return;

		this.pressed = true;

		// переносимый объект и его свойства
		this.dragObject = {
			el,
			parent: el.parentElement,
			next: el.nextElementSibling,
			// координаты, с которых начат перенос
			downX: EO.pageX || EO.targetTouches[0].clientX,
			downY: EO.pageY || EO.targetTouches[0].clientY,
			// координаты 'left' и 'top' используются при редактировании
			// положения корабля на игровом поле
			left: el.offsetLeft,
			top: el.offsetTop,
			// горизонтальное положение корабля
			ky: 0,
			kx: 1
		};

		// редактируем положение корабля на игровом поле
		// проверяем, что корабль находится на поле игрока
		if (el.parentElement === myArea_field) {
			const name = el.id;
			// запоминаем текущее направление расположения палуб
			this.dragObject.ky = myArea.infoship[name].ky;
			this.dragObject.kx = myArea.infoship[name].kx;
		}

	}

	onMouseMove(e) {
		
		e = e || window.event;
		if (!this.pressed || !this.dragObject.el) return;
		e.preventDefault();

		// получаем координаты сторон клона корабля
		let {
			left,
			right,
			top,
			bottom
		} = getCoordinate(this.dragObject.el);

		// если клона ещё не существует, создаём его
		if (!this.clone) {
			// получаем количество палуб у перемещаемого корабля
			this.kolpalub = Placement.getCloneDecks(this.dragObject.el);
			// создаём клон, используя ранее полученные координаты его сторон
			this.clone = this.creatClone({
				left,
				right,
				top,
				bottom
			}) || null;
			// если по каким-то причинам клон создать не удалось, выходим из функции
			if (!this.clone) return;

			// вычисляем сдвиг курсора по координатам X и Y
			this.shiftX = this.dragObject.downX - left;
			this.shiftY = this.dragObject.downY - top;
			// z-index нужен для позиционирования клона над всеми элементами DOM
			this.clone.style.zIndex = '1000';
			// перемещаем клон в BODY
			document.body.appendChild(this.clone);

			// удаляем устаревший экземпляр корабля, если он существует
			// используется при редактировании положения корабля
			this.removeShipFromInfo(this.clone);
		}

		// координаты клона относительно BODY с учётом сдвига курсора
		// относительно верней левой точки
		let newX=e.pageX || e.targetTouches[0].clientX;
		let newY=e.pageY || e.targetTouches[0].clientY;
		let currentLeft = Math.round(newX - this.shiftX),
			currentTop = Math.round(newY - this.shiftY);
			/* console.log(e.targetTouches[0].screenX+" 1 "+e.targetTouches[0].screenY)
			console.log(this.shiftX+" 3 "+this.shiftY) */
		this.clone.style.left = `${currentLeft}px`;
		this.clone.style.top = `${currentTop}px`;

		// проверяем, что клон находится в пределах игрового поля, с учётом
		// небольших погрешностей (14px)
		if (left >= this.areaCoords.left - myVar*1.607 && right <= this.areaCoords.right + myVar*1.607 && top >= this.areaCoords.top - myVar*1.607 && bottom <= this.areaCoords.bottom + myVar*3) {
			// клон находится в пределах игрового поля,
			// подсвечиваем его контур зелёным цветом
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
				// в соседних клетках находятся ранее установленные корабли,
				// подсвечиваем его контур красным цветом
				this.clone.classList.remove('success');
				this.clone.classList.add('unsuccess');
			}
		} else {
			// клон находится за пределами игрового поля,
			// подсвечиваем его контур красным цветом
			this.clone.classList.remove('success');
			this.clone.classList.add('unsuccess');
		}
		console.log(myArea.matrix)
	}

	onMouseUp(e) {
		this.pressed = false;
		// если клона не существует
		if (!this.clone) return;

		// если координаты клона невалидны, возвращаем его на место,
		// откуда был начат перенос
		if (this.clone.classList.contains('unsuccess')) {
			this.clone.classList.remove('unsuccess');
			sound.mustnot();
			this.clone.rollback();
		} else {
			// создаём экземпляр нового корабля, исходя
			// из окончательных координат клона 
			this.createShipAfterMoving();
		}

		// удаляем объекты 'clone' и 'dragObject'
		this.removeClone();
		console.log(myArea.matrix)
	}

	rotationShip(e) {
		// запрещаем появление контекстного меню
		e.preventDefault();
		if (e.which != 3 || flagStart) return;

		const el = e.target.closest('.ship');
		const name = el.id;

		// нет смысла вращать однопалубный корабль
		if (myArea.infoship[name].kolpalub == 1) return;

		// объект с текущими коэффициентами и координатами корабля
		const obj = {
			ky: (myArea.infoship[name].ky == 0) ? 1 : 0,
			kx: (myArea.infoship[name].kx == 0) ? 1 : 0,
			x: myArea.infoship[name].x,
			y: myArea.infoship[name].y
		};
		// очищаем данные о редактируемом корабле
		const kolpalub = myArea.infoship[name].arrkolpalub.length;
		this.removeShipFromInfo(el);
		myArea.field.removeChild(el);

		// проверяем валидность координат после поворота
		// если координаты не валидны, возвращаем старые коэффициенты
		// направления положения корабля
		const result = myArea.check(obj, kolpalub);
		if (!result) {
			obj.ky = (obj.ky == 0) ? 1 : 0;
			obj.kx = (obj.kx == 0) ? 1 : 0;
		}

		// добавляем в объект свойства нового корабля
		obj.shipname = name;
		obj.kolpalub = kolpalub;

		// создаём экземпляр нового корабля
		const ship = new Ship(myArea, obj);
		ship.showShip();

		// кратковременно подсвечиваем рамку корабля красным цветом
		if (!result) {
			const el = document.getElementById(name);
			el.classList.add('unsuccess');
			sound.must_not();
			setTimeout(() => {
				el.classList.remove('unsuccess');
			}, 750);
		}
	}

	creatClone() {
		const clone = this.dragObject.el;
		const oldPosition = this.dragObject;

		clone.rollback = () => {
			// редактиование положения корабля
			// получаем родительский элемент и
			// возвращаем корабль на исходное место на игровом поле
			if (oldPosition.parent == myArea_field) {
				clone.style.left = `${oldPosition.left}px`;
				clone.style.top = `${oldPosition.top}px`;
				clone.style.zIndex = '';
				oldPosition.parent.insertBefore(clone, oldPosition.next);
				this.createShipAfterMoving();
			} else {
				// возвращаем корабль в контейнер 'shipsCollection'
				clone.removeAttribute('style');
				oldPosition.parent.insertBefore(clone, oldPosition.next);
			}
		};
		return clone;
	}

	removeClone() {
		delete this.clone;
		this.dragObject = {};
	}

	createShipAfterMoving() {
		// получаем координаты, пересчитанные относительно игрового поля
		const coords = getCoordinate(this.clone);
		let {
			left,
			top,
			x,
			y
		} = this.getCoordsCloneInMatrix(coords);
		this.clone.style.left = `${left}px`;
		this.clone.style.top = `${top}px`;
		// переносим клон внутрь игрового поля
		myArea_field.appendChild(this.clone);
		
		this.clone.classList.remove('success');
		for (let keys in myArea.updateInfo) {
			let tf=myArea.updateInfo[keys]["field"] == this.dragObject.el
			if (tf) {
				delete myArea.updateInfo[keys];
				myArea.updateInfo[kInfo]={
					"lastX":x,
					"lastY":y,
					"field":this.dragObject.el
				};
				kInfo++;
				
				
				
			}
		}
		// создаём объект со свойствами нового корабля
		const options = {
			shipname: this.clone.id,
			x,
			y,
			ky: this.dragObject.ky,
			kx: this.dragObject.kx,
			kolpalub: this.kolpalub
		};

		// создаём экземпляр нового корабля
		const ship = new Ship(myArea, options);
		ship.showShip();
		// теперь в игровом поле находится сам корабль, поэтому его клон удаляем из DOM
		myArea_field.removeChild(this.clone);
	}

	getCoordsCloneInMatrix({
		left,
		right,
		top,
		bottom
	} = coords) {
		// вычисляем разницу координат соотвествующих сторон
		// клона и игрового поля
		let computedLeft = left - this.areaCoords.left,
			computedRight = right - this.areaCoords.right,
			computedTop = top - this.areaCoords.top,
			computedBottom = bottom - this.areaCoords.bottom;

		// создаём объект, куда поместим итоговые значения
		const obj = {};

		// в результате выполнения условия, убираем неточности позиционирования клона
		let ft = (computedTop < 0) ? 0 : (computedBottom > myArea.sizeArea) ? myArea.sizeArea - myArea.sizeShip : computedTop;
		let fl = (computedLeft < 0) ? 0 : (computedRight > myArea.sizeArea) ? myArea.sizeArea - myArea.sizeShip * this.kolpalub : computedLeft;

		obj.top = Math.round(ft / myArea.sizeShip) * myArea.sizeShip;
		obj.left = Math.round(fl / myArea.sizeShip) * myArea.sizeShip;

		// переводим значение в координатах матрицы
		
		obj.y = Math.round(obj.top / myArea.sizeShip);
		obj.x = Math.round(obj.left / myArea.sizeShip);
		console.log(obj.y+" "+obj.x);
		console.log(obj.top+" "+myArea.sizeShip)
		return obj;
	}

	removeShipFromInfo(el) {
		// имя редактируемого корабля
		const name = el.id;
		// если корабля с таким именем не существует,
		// прекращаем работу функции
		if (!myArea.infoship[name]) return;

		// получаем массив с координатами палуб корабля и
		// записываем в него нули, что означает - пустое место
		let arr = myArea.infoship[name].arrkolpalub;
		for (let coords of arr) {
			const [x, y] = coords;
			myArea.matrix[x][y] = 0;
		}
		// удаляем всю информацию о корабле из массива эскадры
		delete myArea.infoship[name];
	}
}

let myArea = new Area(myArea_field);
window.addEventListener("resize", e => {
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
		myArea.sizeArea =pcArea.sizeArea= (myVar * 37.887).toFixed(3);
		myArea.sizeShip = pcArea.sizeArea= (myVar * 3.789).toFixed(3);
		let svg = document.querySelectorAll(".svg");
		svg.forEach(e => {
			e.setAttribute("width", (11.481 * myVar).toFixed(3));
			e.setAttribute("height", (11.481 * myVar).toFixed(3));
		});
		let o=myArea_field;
		let {
			left,
			top,
			right,
			bottom
		} = getCoordinate(myArea_field);
		myArea_field.left=left;
		myArea_field.top=top;
		myArea_field.right=right;
		myArea_field.bottom=bottom;
		let {
			lefte,
			tope,
			righte,
			bottome
		} = getCoordinate(pcArea_field);
		pcArea_field.left=lefte;
		pcArea_field.top=tope;
		pcArea_field.right=righte;
		pcArea_field.bottom=bottome;

	
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

	// удаление ненужных координат из массива
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
		const y = Math.trunc((e.pageY - self.top-myVar*0.0263157894736842) / myArea.sizeShip);
		const x = Math.trunc((e.pageX - self.left-myVar*0.0263157894736842) / myArea.sizeShip);
		return [y, x];
	}
	checkUseless(coords, f) {
		if (pcArea.matrix[coords[0]][coords[1]] > 1) {
			return false;
		}
		const icons = this.enemy.field.querySelectorAll('.shaded-cell');
		if (icons.length == 0) return true;

		for (let icon of icons) {
			// получаем координаты иконки и сравниваем их с аргументом функции
			const [x, y] = Controller.getCoordsIcon(icon);
			if (coords[0] == x && coords[1] == y) {
				// если координаты иконки и координаты полученные в аргументе совпали,
				// проверяем, какая функция вызвала функцию checkUselessCell
				if (f == 1) {
					// удаляем маркер пустой клетки
					for (let keys in myArea.updateInfo) {
						if (myArea.updateInfo[keys]["field"] == icon) {
							delete myArea.updateInfo[keys];
						}
					}
					icon.remove();

				} else {
					// на 0.5s окрашиваем маркер в красный цвет
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
		// экземпляр игрового поля на котором будет размещена иконка
		const field = enemy.field;
		// небольшая задержка при формировании иконок промаха и попадания
		if (iconClass === 'dot' || iconClass === 'red-cross') {
			let i = 1;
			if(iconClass === 'red-cross'){
				sound.fire();
			}
			if(iconClass === 'dot'){
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
			// создание элемента и добавление ему класса и стилей
			const span = document.createElement('span');
			span.className = `icon-field ${iconClass}`;
			span.style.left = x * myArea.sizeShip + "px";
			span.style.top = y * myArea.sizeShip + "px";
			if (i == 1) {
				myArea.updateInfo[`icon-field${x}${y}${(enemy==myArea)?'m':'p'}`]={
					"lastX":x,
				"lastY":y,
				"field": span
				};
				
			}

			// размещаем иконку на игровом поле
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
		// устанавливаем иконку промаха и записываем промах в матрицу
		this.showIcons(this.enemy, [y, x], 'dot');
		this.enemy.matrix[x][y] = 3;
this.player.k=1;
		// определяем статус игроков
		if (this.player === myArea) {
			text = 'Вы промахнулись. Стреляет компьютер.';
			this.player = pcArea;
			this.enemy = myArea;
			flagPcShots = true;
			setTimeout(() => this.shot(), 2000);
		} else {
			text = 'Компьютер промахнулся. Ваш выстрел.';
			if (this.coordsArounf.length == 0 && this.temporaryShip.hits > 0) {
				// корабль потоплен, отмечаем useless cell вокруг него
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
				
				this.enemy.score=this.enemy.score+(10*this.player.k);
				this.player.k++;
				toptext.innerText=`Счет: ${pcArea.score-myArea.score}`;
				
				dataShip.life--;
				console.log(this.enemy.score);
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
			// отмечаем клетки по диагонали, где точно не может стоять корабль
			coords = [
				[x - 1, y - 1],
				[x - 1, y + 1],
				[x + 1, y - 1],
				[x + 1, y + 1]
			];
			// проверяем и отмечаем полученные координаты клеток
			this.markUselessCell(coords);
			// формируем координаты обстрела вокруг попадания
			coords = [
				[x - 1, y],
				[x + 1, y],
				[x, y - 1],
				[x, y + 1]
			];
			this.setCoordsAroundHit(x, y, coords);
			this.isShipSunk();

			// после небольшой задержки, компьютер делает новый выстрел
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
		// удаляем полученные координаты из всех массивов
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

			// координаты за пределами игрового поля
			if (x < 0 || x > 9 || y < 0 || y > 9) continue;
			// по этим координатам в матрице уже прописан промах или маркер пустой клетки
			if (myArea.matrix[y][x] == 2 || myArea.matrix[y][x] == 3) continue;
			// прописываем значение, соответствующее маркеру пустой клетки
			myArea.matrix[y][x] = 2;
			// вывоим маркеры пустых клеток по полученным координатам
			// для того, чтобы маркеры выводились поочерёдно, при каждой итерации
			// увеличиваем задержку перед выводом маркера

			this.showIcons(myArea, [x, y], 'shaded-cell');
			// удаляем полученные координаты из всех массивов
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

		// массив пустой, значит это первое попадание в данный корабль
		if (firstHit.length == 0) {
			this.temporaryShip.firstHit = [x, y];
			// второе попадание, т.к. оба коэффициента равны 0
		} else if (kx == 0 && ky == 0) {
			// зная координаты первого и второго попадания,
			// можно вычислить направление расположение корабля
			this.temporaryShip.kx = ((firstHit[0] - x) == 0) ? 1 : 0;
			this.temporaryShip.ky = Math.abs(this.temporaryShip.kx - 1);
		}
		// проверяем корректность полученных координат обстрела
		for (let coord of coords) {
			x = coord[0];
			y = coord[1];
			// координаты за пределами игрового поля

			if (x < 0 || x > 9 || y < 0 || y > 9) continue;
			// по данным координатам установлен промах или маркер пустой клетки
			if (myArea.matrix[x][y] != 0 && myArea.matrix[x][y] != 1) continue;
			// валидные координаты добавляем в массив
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
		// присваиваем переменным соответствующие значения из объекта tempShip
		const {
			hits,
			kx,
			ky,
			x0,
			y0
		} = this.temporaryShip;

		let coords;

		// рассчитываем координаты пустых клеток
		// однопалубный корабль
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
var sound={
	fire(){
		
			let audio = new Audio(); // Создаём новый элемент Audio
			audio.src = '../sounds/fire.mp3'; // Указываем путь к звуку "клика"
			audio.autoplay = true; // Автоматически запускаем	  
	},
	gameover(){
		
		let audio = new Audio(); // Создаём новый элемент Audio
		audio.src = '../sounds/gameover.mp3'; // Указываем путь к звуку "клика"
		audio.autoplay = true; // Автоматически запускаем	  
},
gamewon(){
		
	let audio = new Audio(); // Создаём новый элемент Audio
	audio.src = '../sounds/game-won.mp3'; // Указываем путь к звуку "клика"
	audio.autoplay = true; // Автоматически запускаем	  
},
pencil(){
		
	let audio = new Audio(); // Создаём новый элемент Audio
	audio.src = '../sounds/pencil.mp3'; // Указываем путь к звуку "клика"
	audio.autoplay = true; // Автоматически запускаем	  
},
water(){
		
	let audio = new Audio(); // Создаём новый элемент Audio
	audio.src = '../sounds/water.mp3'; // Указываем путь к звуку "клика"
	audio.autoplay = true; // Автоматически запускаем	  
},
mustnot(){
		
	let audio = new Audio(); // Создаём новый элемент Audio
	audio.src = '../sounds/must_not.mp3'; // Указываем путь к звуку "клика"
	audio.autoplay = true; // Автоматически запускаем	  
},
shaded(){
	let audio = new Audio(); // Создаём новый элемент Audio
	audio.src = '../sounds/shaded_placed.mp3'; // Указываем путь к звуку "клика"
	audio.autoplay = true; // Автоматически запускаем	
}

};