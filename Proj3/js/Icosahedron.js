const numPoints = 12;
const numEdges = 20;
const edgeSize = 2;

class Icosahedron
{
    constructor (scene, x, y, z)
    {
            this.ico = new THREE.Object3D();
            this.ico.name = "ico";
            this.isPhong = true;
            this.isBasic = false;

            this.basicMesh = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: false});
            this.lambeMesh = new THREE.MeshLambertMaterial({color: 0xFF0000, wireframe: false});
            this.phongMesh = new THREE.MeshPhongMaterial({color: 0xFF0000, wireframe: false});

            var geometry = new THREE.Geometry();

            var fi = (1 + Math.sqrt(5)) / 2;
            var v = [];
            var f = [];
            var edge = [];
            var rad = 2 * Math.PI / 10;
            var coord;
            var rnd;

            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3(-1, fi, 0 ).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3( 1, fi, 0 ).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3(-1, -fi, 0).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3( 1, -fi, 0).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3( 0, -1, fi).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3( 0, 1, fi ).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3(0, -1, -fi).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3( 0, 1, -fi).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3( fi, 0, -1).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3( fi, 0, 1 ).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3(-fi, 0, -1).multiplyScalar(edgeSize).addScalar(rnd));
            rnd = Math.random();
            geometry.vertices.push(new THREE.Vector3( -fi, 0, 1).multiplyScalar(edgeSize).addScalar(rnd));

            geometry.computeVertexNormals();
            
            geometry.faces.push( new THREE.Face3( 0, 11, 5));
            geometry.faces.push( new THREE.Face3( 0, 5, 1 ));
            geometry.faces.push( new THREE.Face3( 0, 1, 7 ));
            geometry.faces.push( new THREE.Face3( 0, 7, 10));
            geometry.faces.push( new THREE.Face3( 0, 10, 11));
            geometry.faces.push( new THREE.Face3( 1, 5, 9 ));
            geometry.faces.push( new THREE.Face3( 5, 11, 4));
            geometry.faces.push( new THREE.Face3( 11, 10, 2 ));
            geometry.faces.push( new THREE.Face3( 10, 7, 6));
            geometry.faces.push( new THREE.Face3( 7, 1, 8 ));
            geometry.faces.push( new THREE.Face3( 3, 9, 4 ));
            geometry.faces.push( new THREE.Face3( 3, 4, 2));
            geometry.faces.push( new THREE.Face3( 3, 2, 6 ));
            geometry.faces.push( new THREE.Face3( 3, 6, 8));
            geometry.faces.push( new THREE.Face3( 3, 8, 9 ));
            geometry.faces.push( new THREE.Face3( 4, 9, 5 ));
            geometry.faces.push( new THREE.Face3( 2, 4, 11));
            geometry.faces.push( new THREE.Face3( 6, 2, 10));
            geometry.faces.push( new THREE.Face3( 8, 6, 7 ));
            geometry.faces.push( new THREE.Face3( 9, 8, 1 ));

            geometry.computeFaceNormals();

            var mesh = new THREE.Mesh(geometry, this.phongMesh);

            this.ico.add(mesh);

            
            this.ico.position.x = x;
            this.ico.position.y = y;
            this.ico.position.z = z;

            scene.add(this.ico);
    }

    changeLambPhong(){
        if(!this.isBasic) {
            if(this.isPhong) {
                for(var i in this.ico.children) {
                    if(this.ico.children[i].type == "Mesh") {
                        this.ico.children[i].material = this.lambeMesh;
                    }
                }
            } else {
                for(var i in this.ico.children) {
                    if(this.ico.children[i].type == "Mesh") {
                        this.ico.children[i].material = this.phongMesh;
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
            for(var i in this.ico.children) {
                if(this.ico.children[i].type == "Mesh") {
                    this.ico.children[i].material = this.basicMesh;
                }
            }

            this.isBasic = true;
        }
    }
}