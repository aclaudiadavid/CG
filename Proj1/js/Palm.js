class Palm
{
	constructor(attachment, handMaterial, x, y, z)
	{
		'use strict';
		
		var palmGeo = new THREE.CubeGeometry(6, 6, 0.2);
		mesh = new THREE.Mesh(palmGeo, handMaterial);
		mesh.position.set(x, y, z);
		attachment.add(mesh);
	}
}