const maxSpeed = 50;
const minSpeed = 0;
const accel = 25;

class Ball{
    constructor(scene) {
        this.isBasic = false;
        this.speed = 2;
        this.isWired = false;

        this.ball = new THREE.Object3D;
        this.rotator = new THREE.Object3D;
        
        this.geometry = new THREE.SphereGeometry(6, 16, 16);
        var loader = new THREE.TextureLoader();
        var monaLisa = new loader.load('images/monaLisa.jpg');

        this.matBasic = new THREE.MeshBasicMaterial({map: monaLisa, wireframe: false});
        this.matPhong = new THREE.MeshPhongMaterial({map: monaLisa, specularMap: loader.load('Specular.png'), wireframe: false, shininess: 100});

        this.mesh = new THREE.Mesh(this.geometry, this.matPhong);
        this.ball.add(this.mesh);

        this.ball.position.set(32, 6, 0);
        this.rotator.add(this.ball);

        scene.add(this.rotator);
    }

    changeBasic() {
        for(var i in this.ball.children) {
            if(this.ball.children[i].type == "Mesh") {
                if (this.ball.children[i].material == this.matPhong) {
                    this.ball.children[i].material = this.matBasic;
                } else {
                    this.ball.children[i].material = this.matPhong;
                }
            }
        }
        this.isBasic = !this.isBasic;
    }

    changeWireframe() {
        this.matBasic.wireframe = !this.matBasic.wireframe;
        this.matPhong.wireframe = !this.matPhong.wireframe;
        this.isWired = !this.isWired;
    }

    rotateBall(speedUp, time) {
        if (speedUp == true){
            this.speed = this.speed + (accel * time);
            if (this.speed >= maxSpeed)
            {
                this.speed = maxSpeed;
            }
        }
        else
        {
            this.speed = this.speed - (accel * time);
            if (this.speed <= minSpeed)
            {
                this.speed = minSpeed;
            }
        }
        this.rotator.rotation.y = this.rotator.rotation.y + this.speed*(Math.PI/180) * time;
        this.ball.rotation.y = this.ball.rotation.y + this.speed*(Math.PI/180) * time;
    }

    reset()
    {
        this.speed = 2;
        this.rotator.rotation.y = 0;
        if (this.isWired)
        {
            this.changeWireframe();
        }
        if (this.isBasic)
        {
            this.changeBasic();
        }
    }
}