class Examples {
	constructor() {
		this.orbitals = new Orbitals();
		this.orbitals.animate();

		var selectElement = document.getElementById("example-select");
		selectElement.addEventListener("change", this.selectExample.bind(this));
	}

	selectExample(event) {
		var example = event.target.value;

		switch(example) {
			case "fake-planet-layers": {
				this.generateFakePlanetLayers();
			} break;

			case "dancing-vertices": {
				this.generateDancingVertices();
			} break;

			case "orbit-cube": {
				this.generateOrbitCube();
			} break;

			case "perpendicular-ellipses": {
				this.generatePerpendicularEllipses();
			} break;

			case "orbital-eye": {
				this.generateOrbitalEye();
			} break;

			case "galactic-body": {
				this.generateFakePlanetLayers();
				//this.generateOrbitCube();
				this.generateDancingVertices();
				this.generatePerpendicularEllipses();
				this.generateOrbitalEye();
			} break;

			case "random": {
				this.generateRandomPlanets();
			} break;
		}
	}

	generateFakePlanetLayers() {
		var planetCount = 8;
		for(var i = 0; i < planetCount; i++) {
			var orbitRadius = {
				x: 50 + (i * 10),
				y: 50 + (i * 10),
				z: 50 + (i * 50)
			};

			var size = 10;
			var orbitTilt = 0.1;

			// Playing with orbit speed is fun
			var orbitSpeed = 0.6;

			// Playing with inclination speed is fun
			var inclinationSpeed = 0.003;
			var color = "hsl(" + (360 / planetCount * i) + ", 100%, 50%)";

			this.orbitals.addPlanet({
				size: size,
				orbitRadius: orbitRadius,
				orbitTilt: orbitTilt,
				orbitSpeed: orbitSpeed,
				inclinationSpeed: inclinationSpeed,
				fillColor: color,
				strokeColor: color
			});
		}
	}

	generateDancingVertices() {
		var planetCount = 16;
		for(var i = 0; i < planetCount; i++) {
			var orbitRadius = {
				x: 150,
				y: 50,
				z: 150
			};

			orbitRadius = zAxisRotation(orbitRadius, Math.PI*2 * (i / planetCount));

			this.orbitals.addPlanet({
				size: 10,
				orbitRadius: orbitRadius,
				//orbitTilt: 0.1,
				orbitSpeed: 0.01,
				inclinationSpeed: 0.005,
				fillColor: "blue",
				strokeColor: "red"
			});
		}
	}

	generateOrbitCube() {
		var planetCount = 8;
		for(var i = 0; i < planetCount; i++) {
			var orbitRadius = {
				x: 50,
				y: 150,
				z: 250
			};

			orbitRadius = zAxisRotation(orbitRadius, (Math.PI) * (i / planetCount));

			this.orbitals.addPlanet({
				size: 10,
				orbitRadius: orbitRadius,
				orbitTilt: 0.1,
				orbitSpeed: 0.05,
				inclinationSpeed: 0.001,
				fillColor: "blue",
				strokeColor: "blue"
			});
		}
	}

	generatePerpendicularEllipses() {
		var planetCount = 8;
		for(var i = 0; i < planetCount; i++) {
			var orbitRadius = {
				x: 150,
				y: 50,
				z: 150
			};

			orbitRadius = zAxisRotation(orbitRadius, Math.PI*2 * (i / planetCount));

			this.orbitals.addPlanet({
				size: 10,
				orbitRadius: orbitRadius,
				orbitTilt: 0.1,
				orbitSpeed: 0.05,
				inclinationSpeed: 0.001,
				fillColor: "blue",
				strokeColor: "blue"
			});
		}
	}

	generateOrbitalEye() {
		var planetCount = 8;
		for(var i = 0; i < planetCount; i++) {
			var orbitRadius = {
				x: i * 50,
				y: 50,
				z: i * 50
			};

			var size = 10;
			var orbitTilt = 0.1;
			var orbitSpeed = 0.05;
			var inclinationSpeed = 0.001;
			var color = "hsl(" + (360 / planetCount * i) + ", 100%, 50%)";

			this.orbitals.addPlanet({
				size: size,
				orbitRadius: orbitRadius,
				orbitTilt: orbitTilt,
				orbitSpeed: orbitSpeed,
				inclinationSpeed: inclinationSpeed,
				fillColor: color,
				strokeColor: color
			});

			//@TODO add a white orbital line to break up colors
		}
	}

	generateInterestingSphere() {
		this.orbitals.addPlanet({
			size: 10,
			orbitSpeed: 0.05,
			inclinationSpeed: 0.06,
			fillColor: "blue",
			strokeColor: "red",

			orbitRadius: {
				x: 100,
				y: 100,
				z: 100
			},
		});
	}

	generateRandomPlanets() {
		var planetCount = 8;
		var sizeRange = {
			min: 10,
			max: 40
		};

		var orbitRadiusRange = {
			min: {
				x: 100,
				y: 50,
				z: 100
			},
			max: {
				x: 200,
				y: 100,
				z: 200
			}
		};

		var orbitTiltRange = {
			min: 0.1,
			max: 0.4
		};

		var orbitSpeedRange = {
			min: 0.005,
			max: 0.09
		};

		var colors = ["blue", "red", "green", "orange", "purple", "aqua",
			"maroon", "lime", "teal", "navy", "fuchsia", "olive", "gray"];

		for(var i = 0; i < planetCount; i++) {
			var orbitRadius = {
				x: Math.random() * (orbitRadiusRange.max.x - orbitRadiusRange.min.x) + orbitRadiusRange.min.x,
				y: Math.random() * (orbitRadiusRange.max.y - orbitRadiusRange.min.y) + orbitRadiusRange.min.y,
				z: Math.random() * (orbitRadiusRange.max.z - orbitRadiusRange.min.z) + orbitRadiusRange.min.z
			};

			var size = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
			var orbitTilt = Math.random() * (orbitTiltRange.max - orbitTiltRange.min) + orbitTiltRange.min;
			var orbitSpeed = Math.random() * (orbitSpeedRange.max - orbitSpeedRange.min) + orbitSpeedRange.min;
			var color = colors[Math.floor(Math.random() * colors.length)];

			this.orbitals.addPlanet({
				size: size,
				orbitRadius: orbitRadius,
				orbitTilt: orbitTilt,
				orbitSpeed: orbitSpeed,
				fillColor: color,
				strokeColor: color
			});
		}

		//for(var i = 0; i < planetCount; i++) {
		//    var orbitRadius = {
		//        x: Math.random() * maxRadius.x,
		//        y: Math.random() * maxRadius.y,
		//        z: Math.random() * maxRadius.z
		//    };

		//    var size = Math.random() * (maxSize - minSize) + minSize;
		//    var orbitTilt = Math.random() * (maxTilt - minTilt) + minTilt;
		//    //var inclinationSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
		//    var orbitSpeed = Math.random() * (maxOrbitSpeed - minOrbitSpeed) + minOrbitSpeed;
		//    var color = colors[Math.floor(Math.random() * colors.length)];

		//    this.orbitals.addPlanet({
		//        size: size,
		//        orbitRadius: orbitRadius,
		//        orbitTilt: orbitTilt,
		//        //inclinationSpeed: inclinationSpeed,
		//        orbitSpeed: orbitSpeed,
		//        fillColor: color,
		//        strokeColor: color
		//    }));
		//}
	}
}

window.onload = function() {
	var examples = new Examples();
}
