import { Platoon } from "../src/militaryStructureES6";
import { Coy } from "../src/militaryStructureES6";
import { Battalion } from "../src/militaryStructureES6";

chai.config.includeStack = true;

let expect = chai.expect;

describe("Military structure ES6", function () {
	/*Platoon*/
	var platoon1 = new Platoon(new Array(25).fill("Human"));
	it("Create platoon", function () {
		expect(platoon1.countUnits()).to.be.equal(25);
	});
	it("Create platoon, false count people less 10", function() {
		expect(function() {
			new Platoon(new Array(5).fill("Human"));
		}).to.throw(RangeError);
	});
	it("Create platoon, false count people more 50", function() {
		expect(function() {
			new Platoon(new Array(55).fill("Human"));
		}).to.throw(RangeError);
	});
	it("Man up platoon, true count", function() {
		platoon1.manUp(new Array(10).fill("new Human"));
		expect(platoon1.countUnits()).to.be.equal(35);
	});
	it("Man up platoon, false count", function() {
		expect(function() {
			platoon1.manUp(new Array(30).fill("new Human"));
		}).to.throw(RangeError);
	});	
	/*Coy*/
	var platoon2 = new Platoon(new Array(50).fill("Human"));
	var coy1 = new Coy([platoon1, platoon2]);
	it("Create coy", function () {
		expect(coy1.countUnits()).to.be.equal(75);
	});
	it("Create coy, false count people less 50", function() {
		expect(function() {
			new Coy([platoon1]);
		}).to.throw(RangeError);
	});
	it("Create coy, false count people more 100", function() {
		var platoon3 = new Platoon(new Array(50).fill("Human"));
		expect(function() {
			new Coy([platoon1, platoon2, platoon3]);
		}).to.throw(RangeError);
	});	
	it("Create coy, array contains notplatoon", function() {
		expect(function() {
			new Coy(new Array(60).fill("Human"));
		}).to.throw(TypeError);
	});
	it("Create coy, array contains battalion", function() {
		var coy2 = new Coy([new Platoon(new Array(50).fill("Human")), 
			new Platoon(new Array(50).fill("Human"))]);
		expect(function() {
			new Coy(new Battalion([coy2, coy2, coy2, coy2, coy2]));
		}).to.throw(TypeError);
	});
	it("Man up coy, true count", function() {
		coy1.manUp([new Platoon(new Array(10).fill("Human"))]);
		expect(coy1.countUnits()).to.be.equal(85);
	});
	it("Man up coy, false count", function() {
		expect(function() {
			coy1.manUp([new Platoon(new Array(50).fill("Human"))]);
		}).to.throw(RangeError);
	});		
	it("Man up coy, array contains notplatoon", function() {
		expect(function() {
			coy1.manUp(new Array(10).fill("Human"));
		}).to.throw(TypeError);
	});	
	/*Battalion*/
	var coy2 = new Coy([new Platoon(new Array(50).fill("Human")), 
		new Platoon(new Array(50).fill("Human"))]);
	var battalion = new Battalion([coy1, coy2, coy2, coy2, coy2]);
	it("Create battalion", function () {
		expect(battalion.countUnits()).to.be.equal(475);
	});
	it("Create battalion, false count people less 400", function() {
		expect(function() {
			new Battalion([coy1, coy2, coy2, coy2]);
		}).to.throw(RangeError);
	});
	it("Create battalion, false count people more 800", function() {
		expect(function() {
			new Battalion([coy1, coy2, coy2, coy2, coy2, coy2, coy2, coy2, coy2, coy2]);
		}).to.throw(RangeError);
	});	
	it("Create battalion, array contains notplatoon and notcoy", function() {
		expect(function() {
			new Battalion(new Array(560).fill("Human"));
		}).to.throw(TypeError);
	});
	it("Man up battalion, true count", function() {
		battalion.manUp([coy2]);
		expect(battalion.countUnits()).to.be.equal(575);
	});
	it("Man up battalion, false count", function() {
		expect(function() {
			battalion.manUp([coy2, coy2, coy2, coy2]);
		}).to.throw(RangeError);
	});		
	it("Man up battalion, array contains notplatoon and notcoy", function() {
		expect(function() {
			battalion.manUp(new Array(10).fill("Human"));
		}).to.throw(TypeError);
	});	
});