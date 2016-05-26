import MilitaryFormation from './MilitaryFormation';
import {checkCombatUnitsForInit, checkCombatUnitsForManUp, completion} 
	from './utils/utils';

/*Рота*/
export default class Coy extends MilitaryFormation {	
	constructor(combatUnits) {	
		let range = {from: 50, before: 100};
		let desiredTypes = ["Platoon"];
		let wastedTypes = ["Coy", "Battalion"];		
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