class LightCreator{
    constructor(scene, x, y, z, name) {
        'use strict';

        //saving the position of the spotlight
        this.x = x;
        this.y = y;
        this.z = z;

        //creating the spotlight object
        this.lightCreator = new THREE.Object3D;
        this.lightOn = true;
        this.isPhong = true;
        this.isBasic = false;

        //Creating mesh
        this.basicMesh = new THREE.MeshBasicMaterial({color: 0x000099, wireframe: false});
        this.lambeMesh = new THREE.MeshLambertMaterial({color: 0x000099, wireframe: false});
        this.phongMesh = new THREE.MeshPhongMaterial({color: 0x000099, wireframe: false});
        var geometry = new THREE.SphereGeometry(2, 10, 10);
        var mesh = new THREE.Mesh(geometry, this.phongMesh)

        //Adding the spotlight to the scene and creating the cone
        this.lightCreator.add(mesh);

        this.createCone(this.lightCreator, this.material, 0, 1, -2);
        this.lightCreator.position.set(x, y, z);

        scene.add(this.lightCreator);

        //creating light
        this.light = new THREE.SpotLight(0xffffff);
        this.light.position.set(x, y, z);
        this.light.castShadow = true;

        this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;

        this.light.power = 0.5 * Math.PI;

        this.light.target = scene.getObjectByName(name, true);

        this.light.shadow.camera.near = 500;
        this.light.shadow.camera.far = 4000;
        this.light.shadow.camera.fov = 30;

        scene.add(this.light);
    }

    createCone(lightCreator, material, x, y, z) {
        'use strict';

        //Creating the cone of the spotlight and adding to scene
        this.basicMesh = new THREE.MeshBasicMaterial({color: 0x000099, wireframe: false});
        this.lambeMesh = new THREE.MeshLambertMaterial({color: 0x000099, wireframe: false});
        this.phongMesh = new THREE.MeshPhongMaterial({color: 0x000099, wireframe: false});
        var geometry = new THREE.ConeGeometry(2, 3, 10);
        var mesh = new THREE.Mesh(geometry, this.phongMesh);

        mesh.rotation.x = 90*(Math.PI/180);
        mesh.position.set(x, y, z);
        

        lightCreator.add(mesh);
    }

    createLight(x, y, z) {
    }

    changeDirection(angle) {
        this.lightCreator.rotation.y = angle*(Math.PI/180);
        //this.light.rotation.y = angle*(Math.PI/180);
    }

    changeLightIntensity(value) {
        this.light.power = value*Math.PI;
    }

    changeLambPhong(){
        if(!this.isBasic) {
            if(this.isPhong) {
                for(var i in this.lightCreator.children) {
                    if(this.lightCreator.children[i].type == "Mesh") {
                        this.lightCreator.children[i].material = this.lambeMesh;
                    }
                }
            } else {
                for(var i in this.lightCreator.children) {
                    if(this.lightCreator.children[i].type == "Mesh") {
                        this.lightCreator.children[i].material = this.phongMesh;
                    }
                }
            }
        } 

        if(this.isPhong) {
            this.isPhong = false;
        } else {
            this.isPhong = true;
        }
    }

    changeBasic() {
        if(this.isBasic) {
            this.isBasic = false;
            this.isPhong = !this.isPhong;
            this.changeLambPhong();
        } else {
            for(var i in this.lightCreator.children) {
                if(this.lightCreator.children[i].type == "Mesh") {
                    this.lightCreator.children[i].material = this.basicMesh;
                }
            }

            this.isBasic = true;
        }
    }
}