var canvas;
var ctx;
var orbitalCanvas;
var orbitalCtx;

function zAxisRotation(vector, angle) {
	var xPrime = (Math.cos(angle) * vector.x) - (Math.sin(angle) * vector.y);
	var yPrime = (Math.sin(angle) * vector.x) + (Math.cos(angle) * vector.y);

	return {
		x: xPrime,
		y: yPrime,
		z: vector.z
	};
}

class Orbitals {
	planets = [];

	constructor() {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		orbitalCanvas = document.getElementById("orbital-canvas");
		orbitalCtx = orbitalCanvas.getContext("2d");
	}

	addPlanet(planet) {
		if(planet instanceof Planet) {
			this.planets.push(planet);

		// If planet is an object, use it to create a new planet
		} else if(typeof planet === "object") {
			this.planets.push(new Planet(planet));
		}

		//@TODO return the planet
	}

	animate() {
		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw planets
		for(var planet of this.planets) {
			planet.draw();
		}

		requestAnimationFrame(this.animate.bind(this));
	}
}

class Planet {
	defaults = {
		// Position
		// Position
		x: null,
		y: null,
		z: null,

		// Velocity
		vx: 0,
		vy: 0,
		vz: 0,

		// Acceleration
		ax: 0,
		ay: 0,
		az: 0,

		// Orbit
		orbitRadius: {
			x: 200,
			y: 50,
			z: 100
		},

		// Orbit angle
		angle: 0,

		// Orbit speed
		orbitSpeed: 0.001,

		// Orbit change in angle per frame
		inclinationSpeed: 0,

		// Planet size
		size: 10,

		// Minimum planet size
		minSize: 3,

		// Orbit tilt
		orbitTilt: 0,

		// Planet color
		fillColor: "blue",

		// Orbital line color
		strokeColor: "blue"
	}

	constructor({...args}  = {}) {
		// Set default values
		for(var key in this.defaults) {
			this[key] = args[key] || this.defaults[key];
		}

		//// Calculate the range of z values for a full orbit
		//var maxZ = this.orbitRadius.z;
		//var minZ = -maxZ;

		//// Calculate the range of z values that the current orbitTilt could produce
		//var maxTiltZ = this.orbitRadius.z * Math.sin(this.orbitTilt);
		//var minTiltZ = -maxTiltZ;

		//// Calculate the amount that orbitTilt is contributing to the change in z values
		//var tiltOffset = (maxTiltZ - minTiltZ) / (maxZ - minZ);

		//// Adjust the size of the arc to account for the range of possible z values
		//var arcSize = this.size * (this.orbitRadius.z + Math.abs(maxZ));
		//var adjustedSize = arcSize / (1 - tiltOffset);

		//this.minZ = this.getMinZ(this.orbitRadius, this.orbitTilt);
		//this.maxPositiveZ = this.getMaxPositiveZ(this.orbitRadius, this.orbitTilt);
	}

	//// Calculate minimum z value
	//getMinZ(orbitRadius, orbitTilt) {
	//    var minZ = -this.orbitRadius.z * Math.sin(this.orbitTilt);

	//    return minZ;
	//}

	// Calculate the size of the arc, taking into account the z position and
	// the maximum positive z value
	//getArcSize(z, orbitRadius, orbitTilt) {
	//    var maxPositiveZ = getMaxPositiveZ(this.orbitRadius, this.orbitTilt);
	//    var arcSize = Math.max(0, z + maxPositiveZ);
	//    return arcSize;
	//}

	draw() {
		// Save planet state
		var prevPlanet = Object.assign({}, this);

		// Calculate the x and y coordinates of the planet's orbit
		var x = Math.sin(this.angle) * this.orbitRadius.x * Math.cos(this.orbitTilt);
		var y = Math.cos(this.angle) * this.orbitRadius.y;

		//var z = Math.sin(this.angle) * this.orbitRadius.z;
		var z = Math.sin(this.angle + Math.PI / 2) * this.orbitRadius.z;

		if(this.orbitTilt > 0) {
			z *= Math.sin(this.orbitTilt);
		}

		z -= this.orbitRadius.z / 2;

		this.x = x
		this.y = y;
		this.z = z;

		// Calculate size of planet
		var arcSize = Math.max(
			this.size * ((this.z + this.orbitRadius.z) / (this.orbitRadius.z * 2)),
			this.minSize
		);

		if(arcSize < 0) {
			//@TODO orbitTilt is making this very difficult to solve for me without just:
			arcSize = 0;
			//console.error("Arc size is negative for planet " + this);
		}

		// Draw planet
		ctx.beginPath();
		ctx.arc(
			this.x + canvas.width / 2,
			this.y + canvas.height / 2,
			arcSize,
			0,
			2 * Math.PI
		);
		ctx.fillStyle = this.fillColor;
		ctx.fill();

		// Progressively draw the orbit
		if(prevPlanet.x != null) { //@REVISIT
			orbitalCtx.beginPath();
			orbitalCtx.moveTo(prevPlanet.x + orbitalCanvas.width / 2, prevPlanet.y + orbitalCanvas.height / 2);
			orbitalCtx.lineTo(this.x + orbitalCanvas.width / 2, this.y + orbitalCanvas.height / 2);
			orbitalCtx.strokeStyle = this.strokeColor;
			orbitalCtx.stroke();
		}

		this.angle += this.orbitSpeed;
		//this.angle += 0.09; // request next animation frame
		this.orbitTilt += this.inclinationSpeed;
	}

	toString() {
		return "Planet " + this.x + ", " + this.y + ", " + this.z +
			" orbitRadius: " + this.orbitRadius.x + ", " + this.orbitRadius.y + ", " + this.orbitRadius.z;
	}
}

