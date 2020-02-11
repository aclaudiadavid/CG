class Base
{
	constructor(x, y, z, scene) {
		'use strict';
		
		var base = new THREE.Object3D();
		base.name = "base";
		
		this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true});
		geometry = new THREE.CubeGeometry(16, 4, 16);
		mesh = new THREE.Mesh(geometry, this.material);
		
		base.add(mesh);
		base.position.set(x, y, z);
		
		this.createWheel(base, this.material, 7, -1, 7);
		this.createWheel(base, this.material, 7, -1, -7);
		this.createWheel(base, this.material, -7, -1, 7);
		this.createWheel(base, this.material, -7, -1, -7);

		scene.add(base);

		base.position.x = x;
		base.position.y = y;
		base.position.z = z;
	}

	createWheel(base, material, x, y, z) {
		'use strict';
		
		var geometry = new THREE.SphereGeometry(1, 5, 5);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y -2, z);
		base.add(mesh);
	}
	
	reverseWireframe()
	{
		this.material.wireframe = !this.material.wireframe;
	}
}