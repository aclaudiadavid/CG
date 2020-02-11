class ForeArm
{
	constructor(arm, armMaterial, x, y, z) {
		'use strict';

		new Articulation(arm, armMaterial, x, y, z + 2);

		geometry = new THREE.CubeGeometry(2, 8, 2);
		mesh = new THREE.Mesh(geometry, armMaterial);
		mesh.rotateX(90*(Math.PI/180))
		mesh.position.set(x, y, z - 2.5);
		arm.add(mesh);
	}
}