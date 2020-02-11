class Arm
{
	constructor(x, y, z, scene) {
		'use strict';

		var rotator = new THREE.Object3D();
		rotator.name = "rotator";
		var arm = new THREE.Object3D();
		arm.name = "arm";
		var sphere = new THREE.Object3D();
		sphere.name = "sphere";

		this.material = new THREE.MeshBasicMaterial({ color: 0x008000, wireframe: true});

		this.createBaseSphere(sphere, 0, 2, 0);
		new Articulation(rotator, this.material, 0, 4, 0)
		new UpperArm(arm, this.material, 0, 8, 0);
		new ForeArm(arm, this.material, 0, 13, -2);
		
		scene.add(sphere);
		scene.add(rotator);
		scene.add(arm);

		rotator.position.x = x;
		rotator.position.y = y;
		rotator.position.z = z;

		arm.position.x = 0;
		arm.position.y = 0;
		arm.position.z = 0;

		rotator.add(arm);
		sphere.add(rotator);

		var localBase = scene.getObjectByName("base", true);
		localBase.add(sphere);

		this.hand = new Hand(arm, 0, 13, -10);
	}
	
	createBaseSphere(base, x, y, z) {
	'use strict';

	var geometry = new THREE.SphereBufferGeometry(5, 8, 6, 0, 2*Math.PI, 0, 0.5 * Math.PI)
	var mesh = new THREE.Mesh(geometry, this.material);
	mesh.position.set(x, y, z);
	base.add(mesh);
	}
	
	reverseWireframe()
	{
		this.material.wireframe = !this.material.wireframe;
		this.hand.reverseWireframe();
	}
}