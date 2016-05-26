import MilitaryFormation from '../MilitaryFormation';

export function checkCombatUnitsForInit(combatUnits, range, desiredTypes, wastedTypes) {		
	/*проверка на вхождение в диапозон*/
	if (range.from > completion(combatUnits) || range.before < completion(combatUnits)) {
		throw new RangeError();
	}
	/*проверка на вид боевых единиц*/
	if (!checkFormation(combatUnits, desiredTypes, wastedTypes)) {
		throw new TypeError();
	}
}

export function checkCombatUnitsForManUp(combatUnits, countCombatUnits, range, desiredTypes, wastedTypes) {
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

export function completion(combatUnits) {
	return combatUnits.reduce(function(prev, unit) {
		if (!(unit instanceof MilitaryFormation)) {
			return prev + 1;
		}
		return prev + unit.countUnits();
	}, 0);
}