import Platoon from "../src/Platoon";
import Coy from "../src/Coy";
import Battalion from "../src/Battalion";

chai.config.includeStack = true;

let expect = chai.expect;

describe("Military structure ES6", function () {	
	/*Platoon*/
	describe("Test platoon", function() {
		describe("Test create", function() {
			it("Create platoon", function () {
				var platoon = new Platoon(new Array(25).fill("Human"));
				expect(platoon.countUnits()).to.be.equal(25);
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
		});
		describe("Test man up", function() {
			it("Man up platoon, true count", function() {
				var platoon = new Platoon(new Array(25).fill("Human"));
				platoon.manUp(new Array(10).fill("new Human"));
				expect(platoon.countUnits()).to.be.equal(35);
			});
			it("Man up platoon, false count", function() {
				var platoon = new Platoon(new Array(25).fill("Human"));
				expect(function() {
					platoon.manUp(new Array(30).fill("new Human"));
				}).to.throw(RangeError);
			});	
		});
	});
	
	/*Coy*/
	describe("Test coy", function() {
		describe("Test create", function() {
			it("Create coy", function () {
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(25).fill("Human"))
				]);
				expect(coy.countUnits()).to.be.equal(75);
			});
			it("Create coy, false count people less 50", function() {
				expect(function() {
					new Coy([new Platoon(new Array(25).fill("Human"))]);
				}).to.throw(RangeError);
			});
			it("Create coy, false count people more 100", function() {
				var platoon = new Platoon(new Array(50).fill("Human"));
				expect(function() {
					new Coy([platoon, platoon, platoon]);
				}).to.throw(RangeError);
			});	
			it("Create coy, array contains notplatoon", function() {
				expect(function() {
					new Coy(new Array(60).fill("Human"));
				}).to.throw(TypeError);
			});
			it("Create coy, array contains battalion", function() {
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(50).fill("Human"))
				]);
				expect(function() {
					new Coy(new Battalion([coy, coy, coy, coy, coy]));
				}).to.throw(TypeError);
			});
		});
		describe("Test man up", function() {
			it("Man up coy, true count", function() {
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(25).fill("Human"))
				]);
				coy.manUp([new Platoon(new Array(10).fill("Human"))]);
				expect(coy.countUnits()).to.be.equal(85);
			});
			it("Man up coy, false count", function() {
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(25).fill("Human"))
				]);
				expect(function() {
					coy.manUp([new Platoon(new Array(50).fill("Human"))]);
				}).to.throw(RangeError);
			});		
			it("Man up coy, array contains notplatoon", function() {
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(25).fill("Human"))
				]);
				expect(function() {
					coy.manUp(new Array(10).fill("Human"));
				}).to.throw(TypeError);
			});	
		});		
	});
	
	/*Battalion*/
	describe("Test battalion", function() {
		describe("Test create", function() {
			it("Create battalion", function () {
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(50).fill("Human"))
				]);		
				var battalion = new Battalion([coy, coy, coy, coy, coy]);
				expect(battalion.countUnits()).to.be.equal(500);
			});
			it("Create battalion, false count people less 400", function() {			
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(50).fill("Human"))
				]);	
				expect(function() {
					new Battalion([coy, coy, coy]);
				}).to.throw(RangeError);
			});
			it("Create battalion, false count people more 800", function() {			
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(50).fill("Human"))
				]);	
				expect(function() {
					new Battalion([coy, coy, coy, coy, coy, coy, coy, coy, coy]);
				}).to.throw(RangeError);
			});	
			it("Create battalion, array contains notplatoon and notcoy", function() {
				expect(function() {
					new Battalion(new Array(560).fill("Human"));
				}).to.throw(TypeError);
			});
		});	
		describe("Test man up", function() {
			it("Man up battalion, true count", function() {			
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(50).fill("Human"))
				]);		
				var battalion = new Battalion([coy, coy, coy, coy]);
				battalion.manUp([coy]);
				expect(battalion.countUnits()).to.be.equal(500);
			});
			it("Man up battalion, false count", function() {
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(50).fill("Human"))
				]);		
				var battalion = new Battalion([coy, coy, coy, coy, coy]);
				expect(function() {
					battalion.manUp([coy, coy, coy, coy]);
				}).to.throw(RangeError);
			});		
			it("Man up battalion, array contains notplatoon and notcoy", function() {
				var coy = new Coy([
					new Platoon(new Array(50).fill("Human")), 
					new Platoon(new Array(50).fill("Human"))
				]);		
				var battalion = new Battalion([coy, coy, coy, coy, coy]);
				expect(function() {
					battalion.manUp(new Array(10).fill("Human"));
				}).to.throw(TypeError);
			});	
		});
	});	
});