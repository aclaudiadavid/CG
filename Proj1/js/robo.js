var actual_camera, camera1, camera2, camera3, scene, renderer;

var geometry, base, arm, target, mesh;

var keyStrokes = {52: false, 49: false, 50: false, 51: false, 81: false, 113: false, 87: false, 119: false, 65: false, 97: false, 83: false, 115: false, 37: false, 38: false, 39: false, 40: false};
var rendering = false;
var released4 = true;

var clock;

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    
    scene.add(new THREE.AxisHelper(10));
    
    base = new Base(0, 4, 0, scene);
    arm = new Arm(0, 1, 0, scene);
    target = new Target(scene);
}

function onKeyDown(e) {
    'use strict';

    if (e.keyCode in keyStrokes) {
        keyStrokes[e.keyCode] = true;
    }
	
	render();
}

function onKeyUp(e) {
    'use strict';

    if (e.keyCode in keyStrokes) {
        keyStrokes[e.keyCode] = false;
		if (e.keyCode == 52 && released4 == false)
			released4 = true;
    }
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {

		actual_camera.left = window.innerWidth / -20;
		actual_camera.right = window.innerWidth / 20;
		actual_camera.top = window.innerHeight / 20;
		actual_camera.bottom = window.innerHeight / -20;
		
        actual_camera.aspect = window.innerWidth / window.innerHeight;
        actual_camera.updateProjectionMatrix();
    }
}

function render() {
    'use strict';
	
	renderer.render(scene, actual_camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
   
	clock = new THREE.Clock(true);

    createScene();
    camera1 = new THREE.OrthographicCamera(window.innerWidth / -20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / -20, 1, 1000);
    actual_camera = camera1;
    camera1.position.x = 0;
    camera1.position.y = 300;
    camera1.position.z = 0;
    camera1.lookAt(scene.position);
	
    camera2 = new THREE.OrthographicCamera(window.innerWidth / -20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / -20, 1, 1000);
    camera2.position.x = 300;
    camera2.position.y = 0;
    camera2.position.z = 0;
    camera2.lookAt(scene.position);
	
	camera3 = new THREE.OrthographicCamera(window.innerWidth / -20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / -20, 1, 1000);
    camera3.position.x = 0;
    camera3.position.y = 0;
    camera3.position.z = -300;
    camera3.lookAt(scene.position);

    render();
    
    window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function update()
{
    var key;
	var speed = 50;
	var distX = 0;
	var distZ = 0;
	
    var delTatime = clock.getDelta();
    
    for (key in keyStrokes)
    {
        if (key == 52 && keyStrokes[key] == true && released4 == true)
        {
            released4 = false;
			base.reverseWireframe();
			arm.reverseWireframe();
			target.reverseWireframe();
            keyStrokes[key] = false;
        }
        else if (key == 49 && keyStrokes[key] == true)
        {
            actual_camera = camera1;
            keyStrokes[key] = false;
        }
        else if (key == 50 && keyStrokes[key] == true)
        {
			actual_camera = camera2;
            keyStrokes[key] = false;
        }
        else if (key == 51 && keyStrokes[key] == true)
        {
            actual_camera = camera3;
            keyStrokes[key] = false;
        }
        else if ((key == 81 && keyStrokes[key] == true) || (key == 113 && keyStrokes[key] == true)) //making the arm move backwards
        {
            var localRotator = scene.getObjectByName("rotator", true);
            if (localRotator.rotation.x <= 44*(Math.PI/180)) {       
                localRotator.rotateX(3*(Math.PI/180));
            }
        }
        else if ((key == 87 && keyStrokes[key] == true) || (key == 119 && keyStrokes[key] == true)) //making the arm move forward
        {
            var localRotator = scene.getObjectByName("rotator", true);
            if (localRotator.rotation.x >= -44*(Math.PI/180)) {       
                localRotator.rotateX(-3*(Math.PI/180));
            }
        }
        else if ((key == 65 && keyStrokes[key] == true) || (key == 97 && keyStrokes[key] == true)) //Rotate left
        {
            var localRotator = scene.getObjectByName("sphere", true);
            localRotator.rotateY(3*(Math.PI/180));
        }
        else if ((key == 83 && keyStrokes[key] == true) || (key == 115 && keyStrokes[key] == true)) //rotate right
        {
            var localRotator = scene.getObjectByName("sphere", true);
            localRotator.rotateY(-3*(Math.PI/180));
        }
        else if (key == 38 && keyStrokes[key] == true) //forward
        {
            distZ -= speed;
        }
        else if (key == 40 && keyStrokes[key] == true) //backwards
        {
            distZ += speed;
        }
        else if (key == 37 && keyStrokes[key] == true) //left
        {
            distX -=speed;
        }
        else if (key == 39 && keyStrokes[key] == true) //right
        {
            distX += speed;
        }
    }
	
	var localBase = scene.getObjectByName("base", true);
	var norm = Math.sqrt(distX * distX + distZ * distZ);
	var quo = norm / speed;
	var spedX = distX / quo;
	var spedZ = distZ / quo;
	
	baseX = localBase.position.x;
	baseZ = localBase.position.z;
	
	if (spedX == NaN)
	{
		spedX = 0;
	}
	if (spedZ == NaN)
	{
		spedZ = 0;
	}
	localBase.position.x = baseX + distX * delTatime;
	localBase.position.z = baseZ + distZ * delTatime;
	
	//localBase.translateX(distX * delTatime);
	//localBase.translateZ(distZ * delTatime);
}

function animate() {
    'use strict';
    
	update();
	
    render();
	
	requestAnimationFrame(animate);
}
