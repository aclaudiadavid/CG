class Board{
    constructor(scene) {
        this.isBasic = false;
        this.isWired = false;

        this.board = new THREE.Object3D;
        
        this.geometry = new THREE.BoxGeometry(100, 2, 100);

        var loader = new THREE.TextureLoader();
        var boardTexture = new loader.load('images/chessboard.png');
        var boardBump = new loader.load('images/SpecularMap.png');

        this.matBasic = new THREE.MeshBasicMaterial({map: boardTexture, wireframe: false});
        this.matPhong = new THREE.MeshStandardMaterial({map: boardTexture, bumpMap: boardBump, wireframe: false});

        this.mesh = new THREE.Mesh(this.geometry, this.matPhong);
        this.board.add(this.mesh);

        this.board.position.set(0,0,0);

        scene.add(this.board);
    }

    changeBasic() {
        for(var i in this.board.children) {
            if(this.board.children[i].type == "Mesh") {
                if (this.board.children[i].material == this.matPhong) {
                    this.board.children[i].material = this.matBasic;
                } else {
                    this.board.children[i].material = this.matPhong;
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

    reset()
    {
        this.board.position.set(0,0,0);
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