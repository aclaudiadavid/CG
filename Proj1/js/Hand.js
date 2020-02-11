class Hand
{
	constructor(arm, x, y, z)
	{
		'use strict';
		
		var hand = new THREE.Object3D();
		hand.name = "hand";
		var palm = new THREE.Object3D();
		palm.name = "palm";
		var fingers = new THREE.Object3D();
		fingers.name = "fingers";
		
		this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true});
		
		new Articulation(hand, this.material, x, y, z);
		
		new Palm(palm, this.material, 0, 13, -12);
		
		new Finger(fingers, this.material, 0, 15.5, -14);
		new Finger(fingers, this.material, 0, 10.5, -14);
		
		scene.add(hand);
		scene.add(palm);
		scene.add(fingers);
		
		palm.add(fingers);
		hand.add(palm);

		arm.add(hand);
	}
	
	reverseWireframe()
	{
		this.material.wireframe = !this.material.wireframe;
	}
}