class TargetStand
{
	constructor(target, material, x, y, z) {
		'use strict';

		geometry = new THREE.CylinderGeometry(3, 3, 11.5, 32);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		target.add(mesh);
	}
}