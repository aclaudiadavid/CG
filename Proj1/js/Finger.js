class Finger
{
	constructor(attachment, handMaterial, x, y, z)
	{
		'use strict';
		
		var fingGeo = new THREE.CubeGeometry(1, 1, 4);
		mesh = new THREE.Mesh(fingGeo, handMaterial);
		mesh.position.set(x, y, z);
		attachment.add(mesh);
	}
}