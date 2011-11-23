// Create namespace so we don't pollute the global scope
var Twisti = {};
Twisti.baseAzimuth = 0;

(function() {
	var camera, scene, renderer, geometry, material, mesh;
	
	// initialize the three.js environment
	var init = function() {
		var frontMaterial = [new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture( 'front.jpg' )})];
		var backMaterial  = [new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture( 'back.jpg' )})];
		var sideMaterial  = [new THREE.MeshBasicMaterial({color:0xdddddd})];
		
		// Create an array of materials for each face of the mesh
		var materials = [];
		for ( var i = 0; i < 6; i ++ ) {
			switch(i) {
				case 4:
					materials.push(frontMaterial);
					break;
				case 5:
					materials.push(backMaterial);
					break;
				default:
					materials.push(sideMaterial);
					break;
			}
		}
		
		// Setup scene and camera
	    camera = new THREE.PerspectiveCamera( 35, 1, 1, 10000);
	    camera.position.z = 1000;
	    scene = new THREE.Scene();
	    
		// Create the mesh for our phone model
	    geometry = new THREE.CubeGeometry( 231, 450, 18, 1, 1, 1, materials );
	    mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
	    mesh.overdraw = true;
	    scene.add( mesh );
	
		// Create an HTML rendering element
	    renderer = new THREE.CanvasRenderer();
	    renderer.setSize( window.innerWidth, window.innerHeight );
	    document.body.appendChild( renderer.domElement );
	    
	    // Update phone mesh with sensor data from Titanium
	    Ti.App.addEventListener('app:updateRotation', function(e) {
	    	if (e.calibrate) {
	    		Twisti.baseAzimuth = -1 * e.azimuth;
	    	}
	    	mesh.rotation.x = -1 * e.pitch;
	    	mesh.rotation.y = -1 * (Twisti.baseAzimuth + e.azimuth);
	    	mesh.rotation.z = -1 * e.roll;
	    });
	};
	
	// Render loop
	var animate = function() {
	    requestAnimationFrame( animate );
	    renderer.render( scene, camera );
	};
	
	Twisti.createScene = function() {
		init();
		animate();
	};
})();

