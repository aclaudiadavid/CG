class Cannon{
    constructor(scene, x, y, z, name) {
        'use strict';

        //saving the position of the cannon
        this.x = x;
        this.y = y;
        this.z = z;

        //creating the cannon object
        this.cannon = new THREE.Object3D;
        this.cannon.name = name;

        //Creating the mesh of the base cannon
        this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false});
        var geometry = new THREE.CylinderGeometry(2, 2, 5, 32);
        mesh = new THREE.Mesh(geometry, this.material)

        mesh.rotation.x = (Math.PI * 90) / 180;

        //Adding the cannon to the scene and creating the wheels
        this.cannon.add(mesh);

        this.createWheels(this.cannon, this.material, -2.5, -1, 0);
        this.createWheels(this.cannon, this.material, +2.5, -1, 0);

        this.cannon.position.set(x, y, z);

        scene.add(this.cannon);
    }

    createWheels(cannon, material, x, y, z) {
        'use strict';

        //Creating the wheels of the cannon and adding them to the scene
        var geometry = new THREE.CylinderGeometry(1, 1, 1, 50);
        var mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.z = (Math.PI * 90) / 180;

        mesh.position.set(x, y, z);

        cannon.add(mesh);
    }

    createBullet(scene, bool, numbullets) {
        'use strict';
        //Creating the bullet object
        this.bullet = new Bullet(scene, this.x, this.y, this.z, this.currentDirection(), numbullets);
		bullets.push(this.bullet);
        if (bool) {
            this.bullet.toggleAxis();
        }
        return this.bullet;
    }

    changeColor() {
        'use strict'

        //blue if not selected (0x0000ff)
        //red if selected (0xff0000)
        if(this.material.color.getHex() == 0x0000ff) {
            this.material.color.set(0xff0000);
        } else {
            this.material.color.set(0x0000ff);
        }
    }

    changeDirection(degrees) {
        'use strict'

        //Updates the current direction
        this.cannon.rotation.y = degrees;
    }

    currentDirection() {
        'use strict'

        //Returns the current direction;
        return this.cannon.rotation.y;
    }

    fireBall(bool, numbullets) {
        'use strict'

		this.createBullet(scene, bool, numbullets);
        this.bullet.shoot();
    }
}