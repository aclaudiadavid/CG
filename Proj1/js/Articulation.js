class Articulation
{
	constructor(rotator, Material, x, y, z) {
    geometry = new THREE.SphereGeometry(2, 5, 5);
    mesh = new THREE.Mesh(geometry, Material);
    mesh.position.set(x, y, z);
    rotator.add(mesh);
}
}