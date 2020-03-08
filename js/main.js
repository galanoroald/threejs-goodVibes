//SCENE
var scene = new THREE.Scene();

//CAMERA
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
//RENDERER
//full screen renderer
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setClearColor('#2f9964');
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

//OBJECTS
var light = new THREE.PointLight(0x71acff, 1);
var alight = new THREE.AmbientLight(0xffffff, 0.5);

var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshStandardMaterial({
    color: 0xefefef, 
    side: THREE.FrontSide,
});
var bg = new THREE.MeshBasicMaterial({
    color: '#0000ff', 
    side: THREE.FrontSide,
});
var mesh = new THREE.Mesh(boxGeometry, material);

var geometry = new THREE.PlaneBufferGeometry (4, 4);
var plane = new THREE.Mesh( geometry, bg );

//OBJECT SETTINGS
light.position.set(5, 0, 0); 
mesh.position.set(0, 0, -3);
plane.position.set(0, 0, -10);

//OBJECT ADD SCENE
// scene.add(mesh)
scene.add(light);
scene.add(alight);
scene.add(plane);

var model;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('./model/monkey.mtl', function (materials){
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./model/monkey.obj', function (object){
        scene.add(object);

        model = object;

        // model = new THREE.Mesh(object, material);
        //scene.add(model);
        object.position.z = -3;
    });
});



var r = 0, g = 0, b = 1;

var render = function () {
    requestAnimationFrame (render);

    model.rotation.y += 0.01;
    plane.rotation.z += 0.01 / 4;

    if(b >= 1 && g <= 0){
        r += 0.01;
    }

    if(r >= 1 && g <= 0){
        b -= 0.01;
    }

    if(r >= 1 && b <= 0){
        g += 0.01;
    }

    if(g >= 1 && b <= 0){
        r -= 0.01;
    }

    if(g >= 1 && r <= 0){
        b += 0.01;
    }

    if(b >= 1 && r <= 0){
        g -= 0.01;
    }

    plane.material.color.r = r;
    plane.material.color.g = g;
    plane.material.color.b = b;


    

    renderer.render(scene, camera);
}

render();
        