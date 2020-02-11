var scene, renderer, camera, light, pointLight, isDL, isPL;
var keyStrokes = {83: false, 66: false, 68: false, 76: false, 80: false, 82: false, 87: false};
var released = {83: true, 66: true, 68: true, 76: true, 80: true, 82: true, 87: true};
var allObjects = [], menu;
var clock, delTatime, paused = false, moving = false;

function createScene() {
    'use strict';

    //Creating the scene
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(5));

    createLight();
    var board = new Board(scene);
    var dice = new Dice(scene);
    var ball = new Ball(scene);

    allObjects.push(board);
    allObjects.push(dice);
    allObjects.push(ball);7

    pauseMenu();
}

function pauseMenu() {
    menu = new THREE.Object3D;

    var loader = new THREE.TextureLoader();

    var geometry = new THREE.PlaneGeometry(25, 25);
    var mat = new THREE.MeshBasicMaterial({map: loader.load('images/pause.jpg'), visible: true, opacity: 0});
    console.log(mat);

    var mesh = new THREE.Mesh(geometry, mat);
    
    menu.add(mesh);

    menu.position.set(30, 30, 30);
    menu.rotation.x = -45*(Math.PI/180);
    menu.rotation.y = 40*(Math.PI/180);
    menu.rotation.z = 30*(Math.PI/180);

    //scene.add(menu);
}

function placeCamera() {
    'use strict';

    //perspective camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = 100;
    camera.lookAt(scene.position);
}

function createLight() {
    'use strict';

    light = new THREE.DirectionalLight(0xffffff, 0.2);
    light.position.set(-50, 50, -50);
    isDL = true;

    pointLight = new THREE.PointLight( 0xFFFDB6, 1.5, 75, 0.5);
    pointLight.position.set(15, 30, 15);
    isPL = true;

    scene.add(pointLight);
    scene.add(light);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();   
    }
}

function render() {
    'use strict';
	
	renderer.render(scene, camera);
}

function reset()
{
    moving = false;
    paused = false;
    clock = new THREE.Clock(true);
    released = {83: true, 66: true, 68: true, 76: true, 80: true, 82: true, 87: true};
    keyStrokes = {83: false, 66: false, 68: false, 76: false, 80: false, 82: false, 87: false};
    
    for(var obj in allObjects) {
        allObjects[obj].reset();
    }
    if (!isDL)
    {
        directionLight();
    }
    if(!isPL)
    {
        pointedLight();
    }

    scene.remove(menu);
}

function init() {
    'use strict';

    //Initializes the program
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

	clock = new THREE.Clock(true);

    createScene();
    placeCamera();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
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
		released[e.keyCode] = true;
    }
}

function timeSpan()
{
    time = clock.getDelta();
    if (paused == true)
    {
        time = time * 0;
    }
    return time;
}

function pointedLight()
{
    if(isPL)
    {
        scene.remove(pointLight);
    }
    else
    {
        scene.add(pointLight);
    }
    isPL = !isPL;
}

function directionLight()
{
    if(isDL)
    {
        scene.remove(light);
    }
    else
    {
        scene.add(light);
    }
    isDL = !isDL;
}

function update() {
    'use strict';
    
    for (var key in keyStrokes)
    {
        if (key == 68 && keyStrokes[key] == true && released[key] == true && paused == false)
        { //key D directional light
            directionLight();
            released[key] = false;
        }
        else if (key == 80 && keyStrokes[key] == true && released[key] == true && paused == false)
        { //key P pointLight
            pointedLight();
            released[key] = false;

        }
        else if (key == 87 && keyStrokes[key] == true && released[key] == true && paused == false)
        { //key W wireframe

            for(var obj in allObjects) {
                allObjects[obj].changeWireframe();
            }
            released[key] = false;
        }
        else if (key == 76 && keyStrokes[key] == true && released[key] == true && paused == false)
        { //key L
            for(var obj in allObjects) {
                allObjects[obj].changeBasic();
            }
            released[key] = false;
        }
        else if (key == 66 && keyStrokes[key] == true && released[key] == true && paused == false)
        { //key B
            moving = !moving;
            released[key] = false;
        }
        else if (key == 83 && keyStrokes[key] == true && released[key] == true)
        { //key S
            if(paused) {
                scene.remove(menu);
            } else {
                scene.add(menu);
            }

            paused = !paused;
            released[key] = false;
        }
        else if (key == 82 && keyStrokes[key] == true && released[key] == true && paused == true)
        { //key R
            //console.log("Here");
            
            reset();

            released[key] = false;
        }
    }
 
    delTatime = timeSpan();

    allObjects[1].rotateDice(delTatime);
    allObjects[2].rotateBall(moving, delTatime);
}

function animate() {
    'use strict';

    update();
    render();
    requestAnimationFrame(animate);
}