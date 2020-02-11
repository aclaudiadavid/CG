class Target
{
	constructor(scene)
	{
		'use strict';

		var target = new THREE.Object3D();
		target.name = "target";
		this.material = new THREE.MeshBasicMaterial({ color: 0x6600cc, wireframe: true});
		
		new TargetStand(target, this.material, 0, 5, -30);
		new TargetTorus(target, this.material, 0, 13, -30);

		scene.add(target);
	}
	
	reverseWireframe()
	{
		this.material.wireframe = !this.material.wireframe;
	}
}