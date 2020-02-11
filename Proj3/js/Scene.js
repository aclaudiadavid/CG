var actualCamera, camera1, camera2, spotlight = [], light;
var isOrto = false;

var released1 = true, released2 = true, released3 = true, released4 = true, releasedq = true, releasedw = true, releasede= true;
var keyStrokes = {49: false, 50: false, 51: false, 52: false, 53: false, 54: false, 69: false, 81: false, 87: false};

var isDL = true;
var allObjects= [];
var names = ["floor", "wall", "painting", "pedestral", "icosahedron", "lightcreator"];
var wall, floor, painting, pedestral, icosahedron;

var scene, renderer;

function createScene() {
    'use strict';

    //Creating the scene
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    //Creating the room
    floor = new Floor(scene);
    wall = new Wall(scene);

    //Creating the art
    painting = new Painting(scene);
    pedestral = new Pedestal(scene);

    icosahedron = new Icosahedron(scene, 22, 18, 8);
    
    allObjects.push(floor);
    allObjects.push(wall);
    allObjects.push(painting);
    allObjects.push(pedestral);
    allObjects.push(icosahedron);
}

function placeCamera() {
    'use strict';
    //Creates the perspective camera
    camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera1.position.x = 100;
    camera1.position.y = 100;
    camera1.position.z = 100;
    camera1.lookAt(scene.position);
    
    //Creates the orthographic camera
    camera2 = new THREE.OrthographicCamera(window.innerWidth/ -20, window.innerWidth/ 20, window.innerHeight/ 20, window.innerHeight/ -20, 1, 1000);
    camera2.position.x = 0;
    camera2.position.y = 15;
    camera2.position.z = 15;
    camera2.lookAt(new THREE.Vector3(0,15,0));
    //camera.lookAt(scene.position);

    actualCamera = camera1;
}

function createLight() {
    spotlight[0] = new LightCreator(scene, -5, 15, 30, "painting");
    spotlight[1] = new LightCreator(scene, 20, 15, 30, "painting");
    spotlight[2] = new LightCreator(scene, 25, 15, 30, "ico");
    spotlight[3] = new LightCreator(scene, 35, 15, 30, "ico");

    spotlight[0].changeDirection(-25);
    spotlight[1].changeDirection(25);
    spotlight[2].changeDirection(-25);
    spotlight[3].changeDirection(25);
    
    spotlight[2].changeLightIntensity(0);
    spotlight[3].changeLightIntensity(0);
    spotlight[2].lighton = false;
    spotlight[3].lighton = false;

    light = new Mood(scene);

    allObjects.push(spotlight[0]);
    allObjects.push(spotlight[1]);
    allObjects.push(spotlight[2]);
    allObjects.push(spotlight[3]);
}

function onKeyDown(e) {
    'use strict';

    if (e.keyCode in keyStrokes) {
        keyStrokes[e.keyCode] = true;
    }
    
}

function onKeyUp(e) {
    'use strict';

    if (e.keyCode in keyStrokes) {
        keyStrokes[e.keyCode] = false;
		if (e.keyCode == 49 && released1 == false)
			released1 = true;
        if (e.keyCode == 50 && released2 == false)
            released2 = true;
        if (e.keyCode == 51 && released3 == false)
            released3 = true;
        if (e.keyCode == 52 && released4 == false)
            released4 = true;
        if (e.keyCode == 69 && releasede == false)
            releasede = true;
        if (e.keyCode == 81 && releasedq == false)
            releasedq = true;
        if (e.keyCode == 87 && releasedw == false)
            releasedw = true;
    }
}

function render() {
    'use strict';
	
	renderer.render(scene, actualCamera);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    //if the camera is orthogonal it's treated differently
    if(isOrto) {
        if (window.innerHeight > 0 && window.innerWidth > 0) {

            actualCamera.left = window.innerWidth / -15;
            actualCamera.right = window.innerWidth / 15;
            actualCamera.top = window.innerHeight / 15;
            actualCamera.bottom = window.innerHeight / -15;
            
            actualCamera.aspect = window.innerWidth / window.innerHeight;
            actualCamera.updateProjectionMatrix();
        }
    } else {
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (window.innerHeight > 0 && window.innerWidth > 0) {
            actualCamera.aspect = window.innerWidth / window.innerHeight;
            actualCamera.updateProjectionMatrix();   
        }
    }
}

function init() {
    'use strict';

    //Initializes the program
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    placeCamera();
    createLight();
  
    window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function update() {
    'use strict';
    for (var key in keyStrokes)
    {
        if (key == 53 && keyStrokes[key] == true)
        {
            actualCamera = camera1;
            isOrto = false;
        }
        else if (key == 54 && keyStrokes[key] == true)
        {
            actualCamera = camera2;
            isOrto = true;
        }
        else if (key == 49 && keyStrokes[key] == true && released1 == true)
        {
            if(spotlight[0].lighton) {
                spotlight[0].changeLightIntensity(0);
                spotlight[0].lighton = false;
            } else {
                spotlight[0].changeLightIntensity(0.5);
                spotlight[0].lighton = true;
            }
            released1 = false;
        }
        else if (key == 50 && keyStrokes[key] == true && released2 == true)
        {
            if(spotlight[1].lighton) {
                spotlight[1].changeLightIntensity(0);
                spotlight[1].lighton = false;
            } else {
                spotlight[1].changeLightIntensity(0.5);
                spotlight[1].lighton = true;
            }
            released2 = false;
        }
        else if (key == 51 && keyStrokes[key] == true && released3 == true)
        {
            if(spotlight[2].lighton) {
                spotlight[2].changeLightIntensity(0);
                spotlight[2].lighton = false;
            } else {
                spotlight[2].changeLightIntensity(0.5);
                spotlight[2].lighton = true;
            }
            released3 = false;
        }
        else if (key == 52 && keyStrokes[key] == true && released4 == true)
        {
            if(spotlight[3].lighton) {
                spotlight[3].changeLightIntensity(0);
                spotlight[3].lighton = false;
            } else {
                spotlight[3].changeLightIntensity(0.5);
                spotlight[3].lighton = true;
            }
            released4 = false;
        }
        else if (key == 69 && keyStrokes[key] == true && releasede == true)
        {
            /* TRATAMENTO DA TECLA "E" AQUI */
            for(var obj in allObjects) {
                allObjects[obj].changeLambPhong();
            }
            
            releasede = false;
        }
        else if (key == 81 && keyStrokes[key] == true && releasedq == true)
        {
            /* TRATAMENTO DA TECLA "Q" AQUI */
            if(isDL)
            {
                light.removeFromScene(scene);
            }
            else
            {
                light.addToScene(scene);
            }
            isDL = !isDL;

            releasedq = false;
        }
        else if (key == 87 && keyStrokes[key] == true && releasedw == true)
        {
            /* TRATAMENTO DA TECLA "W" AQUI */
            for(var obj in allObjects) {
                allObjects[obj].changeBasic();
            }

            releasedw = false;
        }
    }
}

function animate(){
    'use strict';

    update();
    render();
    requestAnimationFrame(animate);
}