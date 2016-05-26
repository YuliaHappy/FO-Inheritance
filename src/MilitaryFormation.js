export default class {
	constructor(countCombatUnits) {	
		this.countCombatUnits = countCombatUnits;
	}
	countUnits() {
		return this.countCombatUnits;
	}
	manUp(countCombatUnits) {
		this.countCombatUnits += countCombatUnits;
	}
}