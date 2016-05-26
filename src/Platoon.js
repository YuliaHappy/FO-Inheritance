import MilitaryFormation from './MilitaryFormation';
import {checkCombatUnitsForInit, checkCombatUnitsForManUp, completion} 
	from './utils/utils';

/*Взвод*/
export default class Platoon extends MilitaryFormation {
	constructor(combatUnits) {	
		let range = {from: 10, before: 50};
		let desiredTypes = [];
		let wastedTypes = ["Platoon", "Coy", "Battalion"];		
		checkCombatUnitsForInit(combatUnits, range, desiredTypes, wastedTypes);	
		super(completion(combatUnits));
		this.range = range;
		this.desiredTypes = desiredTypes;
		this.wastedTypes = wastedTypes;
	}
	manUp(combatUnits) {
		checkCombatUnitsForManUp(combatUnits, this.countCombatUnits, this.range, 
			this.desiredTypes, this.wastedTypes);
		super.manUp(completion(combatUnits));
	}
}