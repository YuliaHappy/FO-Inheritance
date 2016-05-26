import MilitaryFormation from './MilitaryFormation';
import {checkCombatUnitsForInit, checkCombatUnitsForManUp, completion} 
	from './utils/utils';

/*Батальон*/
export default class Battalion extends MilitaryFormation {
	constructor(combatUnits) {	
		let range = {from: 400, before: 800};
		let desiredTypes = ["Platoon", "Coy"];
		let wastedTypes = ["Battalion"];		
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