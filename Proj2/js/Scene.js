var actualCamera, camera1, camera2, camera3;
var isOrto = true;

var clock, delTatime;
var spaceUp = true;

var selectedCannon, cannon1, cannon2, cannon3, walls;
var isDefined = false;

var bullets = [];
var numbullets = 0;
var lastBullet;

var bulletAxis = false;

var scene, renderer;
var geometry, mesh;

function createScene() {
    'use strict';

    //Creating the scene
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    //Creating the cannons, the bullets and the walls
    placeCannons(scene);
    placeBullets(scene, numbullets);
    placeWalls(scene);
}

function placeCannons(scene) {
    'use strict';
    
    //Creating the cannons
    //Passes the scene, position(x,y,x), rotation and name
    cannon1 = new Cannon(scene, 0, 2, 2, "cannon1");
    cannon2 = new Cannon(scene, -10, 2, 2, "cannon2");
    cannon3 = new Cannon(scene, 10, 2, 2, "cannon3");
    selectedCannon = new Cannon(scene, 0, 2, 0, "selectedCannon");

    //takes selected cannon out od the scene
    scene.remove(scene.getObjectByName("selectedCannon", true));
    selectedCannon = cannon1;
    selectedCannon.changeColor();

    //Rotates the cannons in their initial positions
    cannon2.changeDirection(-20*(Math.PI/180));
    cannon3.changeDirection(20*(Math.PI/180));
}

function placeBullets(scene) {
    'use strict';
    
    //Random bullets already inside the walls
	var num = Math.floor(Math.random() * 6 + 1);
	for (var i = 1; i <= num; i++)
	{
		var x = Math.floor(Math.random() * 21) - 11 ;
		var y = 2;
		var z = Math.floor(Math.random() * 19) - 23;
		var direction = 0;
        bullets.push(new Bullet(scene, x, y, z, direction, numbullets));
        numbullets++;
    }
}

function placeWalls(scene) {
    walls = new Room(scene);
}

function createCamera() {
    //Creates the orthographic camera
    camera1 = new THREE.OrthographicCamera(window.innerWidth/ -15, window.innerWidth/ 15, window.innerHeight/ 15, window.innerHeight/ -15, 1, 1000);
    camera1.position.x = 0;
    camera1.position.y = 300;
    camera1.position.z = 0;
    camera1.lookAt(scene.position);
    
    //Creates the perspective camera
    camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera2.position.x = 50;
    camera2.position.y = 50;
    camera2.position.z = 50;
    camera2.lookAt(scene.position);

    //Creates the camera that follows bullets
    camera3 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    
	if(bullets.length > 0)
    {
        lastBullet = bullets[bullets.length-1].getBullet();
    }
    else
    {
        lastBullet = new THREE.Object3D;
        lastBullet.position.set(0, 2.5, -30);
    }
    camera3.position.set(lastBullet.position.x, lastBullet.position.y, lastBullet.position.z + 5);

    camera3.lookAt(lastBullet.position);

    //initializes the camera we are using
    actualCamera = camera1;
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
            actual_camera.aspect = window.innerWidth / window.innerHeight;
            actual_camera.updateProjectionMatrix();   
        }
    }

}

function keyDown(e) {
    'use strict';

    if (e.keyCode == 49) {
        actualCamera = camera1;
        isOrto = true;
    } else if (e.keyCode == 50) {
        actualCamera = camera2;
        isOrto = false;
    } else if (e.keyCode == 51) {
        actualCamera = camera3;
        isOrto = true;
    //Selecting cannons and changing colors
    } else if (e.keyCode == 81 || e.keyCode == 113) {
        if (selectedCannon) {
            selectedCannon.changeColor();
        }
        selectedCannon = cannon2;
        selectedCannon.changeColor();
    } else if (e.keyCode == 87 || e.keyCode == 119) {
        if (selectedCannon) {
            selectedCannon.changeColor();
        }
        selectedCannon = cannon1;
        selectedCannon.changeColor();
    } else if (e.keyCode == 69 || e.keyCode == 101) {
        if (selectedCannon) {
            selectedCannon.changeColor();
        }
        selectedCannon = cannon3;
        selectedCannon.changeColor();
    //Rotating selected cannon
    } else if (e.keyCode == 37) {
            var currentDirection = selectedCannon.currentDirection();
            currentDirection = currentDirection + 3*(Math.PI/180);  
            selectedCannon.changeDirection(currentDirection);
    } else if (e.keyCode == 39) {
            var currentDirection = selectedCannon.currentDirection();
            currentDirection = currentDirection - 3*(Math.PI/180);
            selectedCannon.changeDirection(currentDirection);
    //Firing cannon
    } else if (e.keyCode == 32 && spaceUp == true) {
        if (selectedCannon) {
            selectedCannon.fireBall(bulletAxis, numbullets);
            numbullets++;
            spaceUp = false;
        }
    //Toggle axes
    } else if (e.keyCode == 82 || e.keyCode == 114) {
        bullets.forEach(justAxis);
        bulletAxis = !bulletAxis;
    }
}

function keyUp(e)
{
	if (e.keyCode == 32)
	{
		spaceUp = true;
	}
}

function justAxis(ball)
{
	ball.toggleAxis();
}

function justMove(ball)
{
    checkCollisionWall(ball);
    ball.move();
}

function checkCollisionWall(ball) {
	var angle = ball.getDirection();
	var pi = Math.PI
    if ((ball.returnZ() - 1.75 <= -29) && (angle <= pi / 2) && (angle >= -pi / 2)) {
        ball.updateDirection(Math.PI - angle);
    }
	if ((ball.returnX() + 1.75 >= 13)/* && (angle <= 0) && (angle >= -pi)*/) {
        ball.updateDirection(-angle);
    }
	if (ball.returnX() - 1.75 <= -13) {
        ball.updateDirection(-angle);
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
	
	clock = new THREE.Clock(true);

    createScene();
    createCamera();

    window.addEventListener('keydown', keyDown);
	window.addEventListener('keyup', keyUp);
    window.addEventListener('resize', onResize); 
}

function update() {
    'use strict';

	if (bullets.length != 0)
		lastBullet = bullets[bullets.length-1].getBullet();

	delTatime = clock.getDelta();

	var len = bullets.length;
	var radius = 1.75;
	for (var i = 0; i < len; i++)
	{
		for (var j = i + 1; j < len; j++)
		{
			var xAxis = bullets[i].returnX() - bullets[j].returnX();
			var zAxis = bullets[i].returnZ() - bullets[j].returnZ();
			var distance = Math.sqrt(Math.pow(xAxis, 2) + Math.pow(zAxis, 2));
			if (distance <= 2 * radius)
			{
				var angle = Math.atan(xAxis / zAxis);
				if ((xAxis >= 0 && zAxis > 0) || (xAxis <= 0 && zAxis < 0))
				{
					bullets[i].updateDirection(angle);
					bullets[i].shoot();
					angle = Math.PI + angle;
					bullets[j].updateDirection(angle);
					bullets[j].shoot();
				}
				else
				{
					bullets[j].updateDirection(angle);
					bullets[j].shoot();
					angle = Math.PI + angle;
					bullets[i].updateDirection(angle);
					bullets[i].shoot();
				}
			}
		}
	}
    bullets.forEach(justMove);
    camera3.position.set(lastBullet.position.x, lastBullet.position.y, lastBullet.position.z + 5);
}

function animate(){
    'use strict';

    update();
    render();
    requestAnimationFrame(animate);
}