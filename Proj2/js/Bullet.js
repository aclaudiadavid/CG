class Bullet{
    constructor(scene, x, y, z, direction, numbullets) {
        'use strict';

        //Creating the bullet object
		this.bullet = new THREE.Object3D;
		this.outterBullet = new THREE.Object3D;
		this.name = numbullets;
		this.outterBullet.name = this.name;
        
        //Creating the mesh of the bullet
        this.material = new THREE.MeshBasicMaterial({color: 0x00ffa2, wireframe: false});
        var geometry = new THREE.SphereGeometry(1.75, 50);
        var mesh = new THREE.Mesh(geometry, this.material);
		
		this.speed = 0;
		this.axis = new THREE.AxisHelper(5);
		this.axis.visible = !this.axis.visible;
		mesh.add(this.axis);

		this.bullet.add(mesh);
		this.outterBullet.add(this.bullet);
        this.outterBullet.position.set(x, y, z);

        this.outterBullet.rotation.y = direction;
        scene.add(this.outterBullet);
    }
	
	getDirection()
	{
		return this.outterBullet.rotation.y;
	}

    updateDirection(degrees) {
       this.outterBullet.rotation.y = degrees;
    }

	shoot()
	{
		this.speed =  Math.random() * -2;
		this.move();
	}

    move() {
        'use strict'
        this.bullet.rotation.x = -this.speed * 10;
        this.outterBullet.translateZ(this.speed);
		if (this.outterBullet.position.z > 10)
		{
			this.removeFromScene();
		}
		if (this.speed < 0)
		{
			this.speed = this.speed + (0.5 * delTatime);
		}
		else
		{
			this.speed = 0;
        }
        
	}

	removeFromScene()
	{
		var index = bullets.indexOf(this);
			
		if (index > -1) {
			bullets.splice(index, 1);
		}

		var object = scene.getObjectByName(this.name);
		scene.remove(object);
	}
	
	toggleAxis() {
		this.axis.visible = !this.axis.visible;
	}

	returnX() {
		return this.outterBullet.position.x;
	}

	returnZ() {
		return this.outterBullet.position.z;
    }
    
    getBullet() {
        return this.outterBullet;
    }
}