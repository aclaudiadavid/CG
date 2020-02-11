class Wall{
    constructor(scene) {
        // Creating wall object
        this.wall = new THREE.Object3D;
        this.mesh = [];
        this.isPhong = true;
        this.isBasic = false;
        
        //creatin the mesh for the walls
        this.basicMesh = new THREE.MeshBasicMaterial({color: 0xFFCC00, wireframe: false});
        this.lambeMesh = new THREE.MeshLambertMaterial({color: 0xFFCC00, wireframe: false});
        this.phongMesh = new THREE.MeshPhongMaterial({color: 0xFFCC00, wireframe: false});
        var geometry = new THREE.CubeGeometry(80, 50, 1);
        var mesh1 = new THREE.Mesh(geometry, this.basicMesh);
        var mesh2 = new THREE.Mesh(geometry, this.lambeMesh);
        var mesh3 = new THREE.Mesh(geometry, this.phongMesh);

        this.mesh.push(mesh1);
        this.mesh.push(mesh2);
        this.mesh.push(mesh3);

        this.wall.add(mesh3);

        this.wall.position.set(0, 25, 0);

        scene.add(this.wall);
    }

    changeLambPhong(){
        if(!this.isBasic) {
            if(this.isPhong) {
                for(var i in this.wall.children) {
                    if(this.wall.children[i].type == "Mesh") {
                        this.wall.children[i].material = this.lambeMesh;
                    }
                }
            } else {
                for(var i in this.wall.children) {
                    if(this.wall.children[i].type == "Mesh") {
                        this.wall.children[i].material = this.phongMesh;
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
            for(var i in this.wall.children) {
                if(this.wall.children[i].type == "Mesh") {
                    this.wall.children[i].material = this.basicMesh;
                }
            }

            this.isBasic = true;
        }
    }
}