class Mood{
    constructor(scene) {

        this.light = new THREE.DirectionalLight(0xFFFFFF, 1);

        this.light.name = "DLight";

        this.light.position.set(0, 15, 20);
        
        this.target = new THREE.Object3D();
        this.target.position.set(0, 20, 0);
        this.light.target = this.target;

        scene.add(this.light);
    }

    addToScene(scene)
    {
        scene.add(this.light);
    }

    removeFromScene(scene)
    {
        var object = scene.getObjectByName(this.light.name);
		scene.remove(object);
    }
}