class Floor{
    constructor(scene) {
        // Creating floor object
        this.floor = new THREE.Object3D;
        this.isPhong = true;
        this.isBasic = false;
        
        //creatin the mesh for the walls
        this.basicMesh = new THREE.MeshBasicMaterial({color: 0xFFCC00, wireframe: false});
        this.lambeMesh = new THREE.MeshLambertMaterial({color: 0xFFCC00, wireframe: false});
        this.phongMesh = new THREE.MeshPhongMaterial({color: 0xFFCC00, wireframe: false});
        var geometry = new THREE.CubeGeometry(1, 50, 30);
        var mesh = new THREE.Mesh(geometry, this.phongMesh);

        this.floor.add(mesh);

        mesh.rotation.z = 90*(Math.PI/180);

        this.floor.position.set(0, 0, 15);

        scene.add(this.floor);
    }

    changeLambPhong(){
        if(!this.isBasic) {
            if(this.isPhong) {
                for(var i in this.floor.children) {
                    if(this.floor.children[i].type == "Mesh") {
                        this.floor.children[i].material = this.lambeMesh;
                    }
                }
            } else {
                for(var i in this.floor.children) {
                    if(this.floor.children[i].type == "Mesh") {
                        this.floor.children[i].material = this.phongMesh;
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
            for(var i in this.floor.children) {
                if(this.floor.children[i].type == "Mesh") {
                    this.floor.children[i].material = this.basicMesh;
                }
            }

            this.isBasic = true;
        }
    }
}