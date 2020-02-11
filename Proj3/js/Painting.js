class Painting{
    constructor(scene) {

        //Creating the painting object
        this.painting = new THREE.Object3D;
        this.painting.name = "painting";
        this.isPhong = true;
        this.isBasic = false;

        this.createFrame();
        this.createBackdrop();
        this.createSquares(-13.5, 7.5, 0.5);
        this.createSquares(-13.5, 4.5, 0.5);
        this.createSquares(-13.5, 1.5, 0.5);
        this.createSquares(-13.5, -1.5, 0.5);
        this.createSquares(-13.5, -4.5, 0.5);
        this.createSquares(-13.5, -7.5, 0.5);
        this.createSquares(-10.5, 7.5, 0.5);
        this.createSquares(-10.5, 4.5, 0.5);
        this.createSquares(-10.5, 1.5, 0.5);
        this.createSquares(-10.5, -1.5, 0.5);
        this.createSquares(-10.5, -4.5, 0.5);
        this.createSquares(-10.5, -7.5, 0.5);
        this.createSquares(-7.5, 7.5, 0.5);
        this.createSquares(-7.5, 4.5, 0.5);
        this.createSquares(-7.5, 1.5, 0.5);
        this.createSquares(-7.5, -1.5, 0.5);
        this.createSquares(-7.5, -4.5, 0.5);
        this.createSquares(-7.5, -7.5, 0.5);
        this.createSquares(-4.5, 7.5, 0.5);
        this.createSquares(-4.5, 4.5, 0.5);
        this.createSquares(-4.5, 1.5, 0.5);
        this.createSquares(-4.5, -1.5, 0.5);
        this.createSquares(-4.5, -4.5, 0.5);
        this.createSquares(-4.5, -7.5, 0.5);
        this.createSquares(-1.5, 7.5, 0.5);
        this.createSquares(-1.5, 4.5, 0.5);
        this.createSquares(-1.5, 1.5, 0.5);
        this.createSquares(-1.5, -1.5, 0.5);
        this.createSquares(-1.5, -4.5, 0.5);
        this.createSquares(-1.5, -7.5, 0.5);
        this.createSquares(1.5, 7.5, 0.5);
        this.createSquares(1.5, 4.5, 0.5);
        this.createSquares(1.5, 1.5, 0.5);
        this.createSquares(1.5, -1.5, 0.5);
        this.createSquares(1.5, -4.5, 0.5);
        this.createSquares(1.5, -7.5, 0.5);
        this.createSquares(4.5, 7.5, 0.5);
        this.createSquares(4.5, 4.5, 0.5);
        this.createSquares(4.5, 1.5, 0.5);
        this.createSquares(4.5, -1.5, 0.5);
        this.createSquares(4.5, -4.5, 0.5);
        this.createSquares(4.5, -7.5, 0.5);
        this.createSquares(7.5, 7.5, 0.5);
        this.createSquares(7.5, 4.5, 0.5);
        this.createSquares(7.5, 1.5, 0.5);
        this.createSquares(7.5, -1.5, 0.5);
        this.createSquares(7.5, -4.5, 0.5);
        this.createSquares(7.5, -7.5, 0.5);
        this.createSquares(10.5, 7.5, 0.5);
        this.createSquares(10.5, 4.5, 0.5);
        this.createSquares(10.5, 1.5, 0.5);
        this.createSquares(10.5, -1.5, 0.5);
        this.createSquares(10.5, -4.5, 0.5);
        this.createSquares(10.5, -7.5, 0.5);
        this.createSquares(13.5, 7.5, 0.5);
        this.createSquares(13.5, 4.5, 0.5);
        this.createSquares(13.5, 1.5, 0.5);
        this.createSquares(13.5, -1.5, 0.5);
        this.createSquares(13.5, -4.5, 0.5);
        this.createSquares(13.5, -7.5, 0.5);
        this.createCircles(-12, 6, 1.5);
        this.createCircles(-9, 6, 1.5);
        this.createCircles(-6, 6, 1.5);
        this.createCircles(-3, 6, 1.5);
        this.createCircles(0, 6, 1.5);
        this.createCircles(3, 6, 1.5);
        this.createCircles(6, 6, 1.5);
        this.createCircles(9, 6, 1.5);
        this.createCircles(12, 6, 1.5);
        this.createCircles(-12, 3, 1.5);
        this.createCircles(-9, 3, 1.5);
        this.createCircles(-6, 3, 1.5);
        this.createCircles(-3, 3, 1.5);
        this.createCircles(0, 3, 1.5);
        this.createCircles(3, 3, 1.5);
        this.createCircles(6, 3, 1.5);
        this.createCircles(9, 3, 1.5);
        this.createCircles(12, 3, 1.5);
        this.createCircles(-12, 0, 1.5);
        this.createCircles(-9, 0, 1.5);
        this.createCircles(-6, 0, 1.5);
        this.createCircles(-3, 0, 1.5);
        this.createCircles(0, 0, 1.5);
        this.createCircles(3, 0, 1.5);
        this.createCircles(6, 0, 1.5);
        this.createCircles(9, 0, 1.5);
        this.createCircles(12, 0, 1.5);
        this.createCircles(-12, -3, 1.5);
        this.createCircles(-9, -3, 1.5);
        this.createCircles(-6, -3, 1.5);
        this.createCircles(-3, -3, 1.5);
        this.createCircles(0, -3, 1.5);
        this.createCircles(3, -3, 1.5);
        this.createCircles(6, -3, 1.5);
        this.createCircles(9, -3, 1.5);
        this.createCircles(12, -3, 1.5);
        this.createCircles(-12, -6, 1.5);
        this.createCircles(-9, -6, 1.5);
        this.createCircles(-6, -6, 1.5);
        this.createCircles(-3, -6, 1.5);
        this.createCircles(0, -6, 1.5);
        this.createCircles(3, -6, 1.5);
        this.createCircles(6, -6, 1.5);
        this.createCircles(9, -6, 1.5);
        this.createCircles(12, -6, 1.5);
        

        this.painting.position.set(0,25,0);

        scene.add(this.painting);
    }

    createFrame() {
        var material = new THREE.MeshBasicMaterial({color: 0x421010, wireframe: false});
        var geometry = new THREE.CubeGeometry(31.5, 20, 2);
        var mesh = new THREE.Mesh(geometry, material);

        this.painting.add(mesh);
    }

    createBackdrop() {
        var material = new THREE.MeshBasicMaterial({color: 0xa4a9af});
        var geometry = new THREE.CubeGeometry(29, 17.5, 3);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = "back";

        this.painting.add(mesh);
    }

    createSquares(x, y ,z) {
        var material = new THREE.MeshBasicMaterial({color: 0x000000});
        var geometry = new THREE.CubeGeometry(2, 2, 2);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = "square";

        mesh.position.set(x, y, z);
        this.painting.add(mesh);
    }

    createCircles(x, y ,z) {
        var material = new THREE.MeshBasicMaterial({color: 0xffffff});
        var geometry = new THREE.CircleGeometry(0.8, 10);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = "circle";

        mesh.position.set(x, y, z);
        this.painting.add(mesh);
    }

    changeLambPhong(){
        if(!this.isBasic) {
            if(this.isPhong) {
                for(var i in this.painting.children) {
                    if(this.painting.children[i].type == "Mesh") {
                        if(this.painting.children[i].name == "square") {
                            this.painting.children[i].material = new THREE.MeshLambertMaterial({color: 0x000000});
                        } else if(this.painting.children[i].name == "circle") {
                            this.painting.children[i].material = new THREE.MeshLambertMaterial({color: 0xffffff});
                        } else if(this.painting.children[i].name == "back") {
                            this.painting.children[i].material = new THREE.MeshLambertMaterial({color: 0xa4a9af});
                        } else {
                            this.painting.children[i].material = new THREE.MeshLambertMaterial({color: 0x421010});
                        }
                    }
                }
            } else {
                for(var i in this.painting.children) {
                    if(this.painting.children[i].type == "Mesh") {
                        if(this.painting.children[i].name == "square") {
                            this.painting.children[i].material = new THREE.MeshPhongMaterial({color: 0x000000});
                        } else if(this.painting.children[i].name == "circle") {
                            this.painting.children[i].material = new THREE.MeshPhongMaterial({color: 0xffffff});
                        } else if(this.painting.children[i].name == "back") {
                            this.painting.children[i].material = new THREE.MeshPhongMaterial({color: 0xa4a9af});
                        } else {
                            this.painting.children[i].material = new THREE.MeshPhongMaterial({color: 0x421010});
                        }
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
            for(var i in this.painting.children) {
                if(this.painting.children[i].type == "Mesh") {
                    if(this.painting.children[i].name == "square") {
                        this.painting.children[i].material = new THREE.MeshBasicMaterial({color: 0x000000});
                    } else if(this.painting.children[i].name == "circle") {
                        this.painting.children[i].material = new THREE.MeshBasicMaterial({color: 0xffffff});
                    } else if(this.painting.children[i].name == "back") {
                        this.painting.children[i].material = new THREE.MeshBasicMaterial({color: 0xa4a9af});
                    } else {
                        this.painting.children[i].material = new THREE.MeshBasicMaterial({color: 0x421010});
                    }
                }
            }

            this.isBasic = true;
        }
    }
}