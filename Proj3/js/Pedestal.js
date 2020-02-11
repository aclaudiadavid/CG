class Pedestal{
    constructor(scene) {
        // Creating pedestal object
        this.pedestal = new THREE.Object3D;
        this.isPhong = true;
        this.isBasic = false;
        
        //creatin the mesh for the pedestal
        this.basicMesh = new THREE.MeshBasicMaterial({color: 0xc0c0c0, wireframe: false});
        this.lambeMesh = new THREE.MeshLambertMaterial({color: 0xc0c0c0, wireframe: false});
        this.phongMesh = new THREE.MeshPhongMaterial({color: 0xc0c0c0, wireframe: false});
        var geometry = new THREE.CubeGeometry(5, 14, 5);
        var mesh = new THREE.Mesh(geometry, this.phongMesh);

        this.pedestal.add(mesh);

        this.pedestal.position.set(22, 7, 8);

        scene.add(this.pedestal);
    }

    changeLambPhong(){
        if(!this.isBasic) {
            if(this.isPhong) {
                for(var i in this.pedestal.children) {
                    if(this.pedestal.children[i].type == "Mesh") {
                        this.pedestal.children[i].material = this.lambeMesh;
                    }
                }
            } else {
                for(var i in this.pedestal.children) {
                    if(this.pedestal.children[i].type == "Mesh") {
                        this.pedestal.children[i].material = this.phongMesh;
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
            for(var i in this.pedestal.children) {
                if(this.pedestal.children[i].type == "Mesh") {
                    this.pedestal.children[i].material = this.basicMesh;
                }
            }

            this.isBasic = true;
        }
    }
}