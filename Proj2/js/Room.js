class Room{
    constructor(scene) {
        // Creating 3 different wall objects
        var backWall = new THREE.Object3D;
        var leftWall = new THREE.Object3D;
        var rightWall = new THREE.Object3D;
        backWall.name = "backwall";
        leftWall.name = "leftwall";
        rightWall.name = "rightwall";

        //creatin the mesh for the walls
        var material = new THREE.MeshBasicMaterial({color: 0xFFCC00, wireframe: false});
        var geometry = new THREE.CubeGeometry(30, 5, 2);
        var mesh = new THREE.Mesh(geometry, material);
        var mesh2 = new THREE.Mesh(geometry, material);
        var mesh3 = new THREE.Mesh(geometry, material);

        mesh2.rotation.y = 90*(Math.PI/180);
        mesh3.rotation.y = 90*(Math.PI/180);

        backWall.add(mesh);
        leftWall.add(mesh2);
        rightWall.add(mesh3);

        backWall.position.set(0, 2.5, -30);
        leftWall.position.set(-14, 2.5, -16);
        rightWall.position.set(14, 2.5, -16);

        scene.add(backWall);
        scene.add(leftWall);
        scene.add(rightWall);
    }
}