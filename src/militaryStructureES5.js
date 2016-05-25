function MilitaryFormation(countCombatUnits) {
	this.countCombatUnits = countCombatUnits;
}
MilitaryFormation.prototype.countUnits = function() {
	return this.countCombatUnits;
}
MilitaryFormation.prototype.manUp = function(countCombatUnits) {
	this.countCombatUnits += countCombatUnits;
}

/*Взвод*/
export function Platoon(combatUnits) {	
	let range = {from: 10, before: 50};
	let desiredTypes = [];
	let wastedTypes = ["Platoon", "Coy", "Battalion"];		
	checkCombatUnitsForInit(combatUnits, range, desiredTypes, wastedTypes);	
	MilitaryFormation.call(this, completion(combatUnits));
	this.range = range;
	this.desiredTypes = desiredTypes;
	this.wastedTypes = wastedTypes;
}
Platoon.prototype = Object.create(MilitaryFormation.prototype);
Platoon.prototype.constructor = Platoon;
Platoon.prototype.manUp = function(combatUnits) {
	checkCombatUnitsForManUp(combatUnits, this.countCombatUnits, this.range, 
		this.desiredTypes, this.wastedTypes);
	MilitaryFormation.prototype.manUp.call(this, completion(combatUnits));
}

/*Рота*/
export function Coy(combatUnits) {	
	let range = {from: 50, before: 100};
	let desiredTypes = ["Platoon"];
	let wastedTypes = ["Coy", "Battalion"];		
	checkCombatUnitsForInit(combatUnits, range, desiredTypes, wastedTypes);	
	MilitaryFormation.call(this, completion(combatUnits));
	this.range = range;
	this.desiredTypes = desiredTypes;
	this.wastedTypes = wastedTypes;
}
Coy.prototype = Object.create(MilitaryFormation.prototype);
Coy.prototype.constructor = Coy;
Coy.prototype.manUp = function(combatUnits) {
	checkCombatUnitsForManUp(combatUnits, this.countCombatUnits, this.range, 
		this.desiredTypes, this.wastedTypes);
	MilitaryFormation.prototype.manUp.call(this, completion(combatUnits));
}

/*Батальон*/
export function Battalion(combatUnits) {	
	let range = {from: 400, before: 800};
	let desiredTypes = ["Platoon", "Coy"];
	let wastedTypes = ["Battalion"];		
	checkCombatUnitsForInit(combatUnits, range, desiredTypes, wastedTypes);	
	MilitaryFormation.call(this, completion(combatUnits));
	this.range = range;
	this.desiredTypes = desiredTypes;
	this.wastedTypes = wastedTypes;
}
Battalion.prototype = Object.create(MilitaryFormation.prototype);
Battalion.prototype.constructor = Battalion;
Battalion.prototype.manUp = function(combatUnits) {
	checkCombatUnitsForManUp(combatUnits, this.countCombatUnits, this.range, 
		this.desiredTypes, this.wastedTypes);
	MilitaryFormation.prototype.manUp.call(this, completion(combatUnits));
}

function checkCombatUnitsForInit(combatUnits, range, desiredTypes, wastedTypes) {		
	/*проверка на вхождение в диапозон*/
	if (range.from > completion(combatUnits) || range.before < completion(combatUnits)) {
		throw new RangeError();
	}
	/*проверка на вид боевых единиц*/
	if (!checkFormation(combatUnits, desiredTypes, wastedTypes)) {
		throw new TypeError();
	}
}

function checkCombatUnitsForManUp(combatUnits, countCombatUnits, range, desiredTypes, wastedTypes) {
	/*проверка на вид боевых единиц*/
	if (!checkFormation(combatUnits, desiredTypes, wastedTypes)) {
		throw new TypeError();
	}
	/*проверка на вхождение в диапозон при доукомплектовки*/
	if (countCombatUnits + completion(combatUnits) > range.before) {
		throw new RangeError("combat units is too large!");
	}
}

function checkFormation(combatUnits, desiredTypes, wasteTypes) {
	return combatUnits.every(function(combatUnit) {
		let isDesired = desiredTypes.length == 0 ? true : 
		desiredTypes.some(function(type) {
			return type == combatUnit.constructor.name;
		});
		let isNotWaste = wasteTypes.length == 0 ? true : 
		wasteTypes.every(function(type) {
			return type != combatUnit.constructor.name;
		});
		return isDesired && isNotWaste;
	});
}

function completion(combatUnits) {
	return combatUnits.reduce(function(prev, unit) {
		if (!(unit instanceof MilitaryFormation)) {
			return prev + 1;
		}
		return prev + unit.countUnits();
	}, 0);
}