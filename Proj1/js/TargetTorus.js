class TargetTorus
{
	constructor(target, material, x, y, z) {
		'use strict';

		geometry = new THREE.TorusGeometry(3, 1.5, 15, 15);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y+2, z);
		target.add(mesh);
	}
}