class UpperArm
{
	constructor(arm, armMaterial, x, y ,z) {
		'use strict';
		
		geometry = new THREE.CubeGeometry(2, 7, 2);
		mesh = new THREE.Mesh(geometry, armMaterial);
		mesh.position.set(x, y, z);
		arm.add(mesh);
	}
}