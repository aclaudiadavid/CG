class Dice{
    constructor(scene) {
        this.isBasic = false;
        this.speed = 15;
        this.isWired = false;

        this.dice = new THREE.Object3D;
        this.rotator = new THREE.Object3D;
        
        this.geometry = new THREE.BoxGeometry(8, 8, 8);

        var loader = new THREE.TextureLoader();

        var diceImages = [new loader.load('images/diceOne.png'), new loader.load('images/diceTwo.png'),new loader.load('images/diceThree.png'),new loader.load('images/diceFour.png'),new loader.load('images/diceFive.png'),new loader.load('images/diceSix.png')]
        var diceNormal = [new loader.load('images/face1Normal.png'), new loader.load('images/face2Normal.png'),new loader.load('images/face3Normal.png'),new loader.load('images/face4Normal.png'),new loader.load('images/face5Normal.png'),new loader.load('images/face6Normal.png')]
        this.matBasic = [];
        this.matPhong = [];
        this.isPhong = true;

        for(var i in diceImages) {
            this.matBasic[i] = new THREE.MeshBasicMaterial({map: diceImages[i], wireframe: false});
            this.matPhong[i] = new THREE.MeshStandardMaterial({map: diceImages[i], bumpMap: diceNormal[i], wireframe: false});
        }

        //this.matBasic = new THREE.MeshBasicMaterial({map: diceImages, wireframe: false});
        //this.matPhong = new THREE.MeshPhongMaterial({color: 0xFFFFFF, wireframe: false});

        this.meshPhongFace = new THREE.MeshFaceMaterial(this.matPhong);
        this.meshBasicFace = new THREE.MeshFaceMaterial(this.matBasic);

        this.mesh = new THREE.Mesh(this.geometry, this.meshPhongFace);
        this.dice.add(this.mesh);

        this.height = 8*Math.sqrt(3,2);
        this.rotator.position.set(0, this.height, 0);
        this.dice.position.set(0, 0, 0);
        this.dice.rotation.z = Math.PI/4;
        this.dice.rotation.x = Math.atan(Math.sqrt(1/2));

        this.rotator.add(this.dice);
        scene.add(this.rotator);
    }

    changeBasic() {
        this.dice.rotation.z = 0;
        this.dice.rotation.x = 0;

        for(var i in this.dice.children) {
            if(this.dice.children[i].type == "Mesh") {
                this.dice.remove(this.dice.children[i]);
            }
        }

        if(this.isPhong) {
            this.mesh = new THREE.Mesh(this.geometry, this.meshBasicFace);
        } else {
            this.mesh = new THREE.Mesh(this.geometry, this.meshPhongFace);
        }

        this.dice.add(this.mesh);

        this.rotator.position.set(0, this.height, 0);
        this.dice.position.set(0, 0, 0);
        this.dice.rotation.z = Math.PI/4;
        this.dice.rotation.x = Math.atan(Math.sqrt(1/2));
        this.rotator.rotation.y = this.rotator.rotation.y + this.speed*(Math.PI/180);

        this.isPhong = !this.isPhong;
        this.isBasic = !this.isBasic;
    }

    changeWireframe() {
        for (var i in this.matPhong) {
            this.matBasic[i].wireframe = !this.matBasic[i].wireframe;
            this.matPhong[i].wireframe = !this.matPhong[i].wireframe;
        }
        this.isWired = !this.isWired;
    }

    rotateDice(time) {
        this.rotator.rotation.y = this.rotator.rotation.y + this.speed*(Math.PI/180) * time; 
    }

    reset()
    {
        this.speed = 15;

        this.height = 8*Math.sqrt(3,2);
        this.rotator.position.set(0, this.height, 0);
        this.rotator.rotation.y = 0;
        this.dice.position.set(0, 0, 0);
        this.dice.rotation.z = Math.PI/4;
        this.dice.rotation.x = Math.atan(Math.sqrt(1/2));
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