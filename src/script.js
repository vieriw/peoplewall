/////////////////////////////////////////////////////////////////////////
///// IMPORT
import './main.css'
import * as THREE from 'three'
//import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'
import { BgPlane} from './components/bgplane'; 
import { BgPlaneSpark} from './components/bgplanespark'; 
import { BgPlaneSpark2} from './components/bgplanespark2'; 
import { BgText} from './components/bgtext';
import { S1TitleText} from './components/s1titletext';
import { S2TitleText} from './components/s2titletext';
import { S2TitleRedText} from './components/s2titleredtext';
import { S1DescriptionText} from './components/s1descriptiontext';
import { S2DescriptionText} from './components/s2descriptiontext';
import { S2Description2Text} from './components/s2description2text';
import { GradientText} from './components/gradienttext';
import { BgSpark} from './components/bgspark';
import { S1BgMoon} from './components/s1bgmoon'; 
import { S2BgMoon} from './components/s2bgmoon'; 
import { GameObjectManager} from './components/gameobjectmanager'; 
import { Geometry} from './components/geometry';
import Config from './data/config';
import {
	setTimeout,
	setImmediate,
	setInterval
} from 'isomorphic-timers-promises';

const texts=[];
const clock = new THREE.Clock();
const settings = {
    color1: new THREE.Color(0x04072A),
    color2: new THREE.Color(0x151744), 
    color3: new THREE.Color(0x684C65),
    color4: new THREE.Color(0x608CFF),
    color5: new THREE.Color(0xFF008A),
    color6: new THREE.Color(0x9FBA59),
    currentScene:0,
    sceneLength:[10,10,10,10,10]
}
//color1: new THREE.Color(0x0A0E26),
//color2: new THREE.Color(0x41225B), 
//color3: new THREE.Color(0xB04953),
/////////////////////////////////////////////////////////////////////////
//// DRACO LOADER TO LOAD DRACO COMPRESSED MODELS FROM BLENDER
const dracoLoader = new DRACOLoader()
const loader = new GLTFLoader()

dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
dracoLoader.setDecoderConfig({ type: 'js' })
loader.setDRACOLoader(dracoLoader)

const vertexShader = require('./shaders/test.vert');
const fragmentShader = require('./shaders/test.frag');

const bgPlaneS1VShader = require('./shaders/bgPlane.vert');
const bgPlaneS1FShader = require('./shaders/bgPlaneFbm.frag');
const bgPlaneS2FShader = require('./shaders/bgPlane.frag');

const bgPlaneSparkFShader = require('./shaders/bgPlaneSpark.frag');
const bgGradientTextFShader = require('./shaders/bgGradientText.frag');

const bgCircleFShader = require('./shaders/bgCircle.frag');
const bgCircleVShader = require('./shaders/bgCircle.vert');

const bgMoonS2FShader = require('./shaders/s2BgMoon.frag');
const bgMoonS1FShader = require('./shaders/s1BgMoon.frag');
const bgMoonVShader = require('./shaders/bgMoon.vert');

/////////////////////////////////////////////////////////////////////////
///// DIV CONTAINER CREATION TO HOLD THREEJS EXPERIENCE
const container = document.createElement('div')
document.body.appendChild(container)

/////////////////////////////////////////////////////////////////////////
///// SCENE CREATION
const scene = new THREE.Scene()
scene.background = new THREE.Color('#ffffff')

/////////////////////////////////////////////////////////////////////////
///// RENDERER CONFIG
const renderer = new THREE.WebGLRenderer({ antialias: true}) // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight) // make it full screen
renderer.outputEncoding = THREE.sRGBEncoding // set color encoding
container.appendChild(renderer.domElement) // add the renderer to html div
const gameObjectManager = new GameObjectManager(scene);
/////////////////////////////////////////////////////////////////////////
///// CAMERAS CONFIG
// const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 200)
// camera.position.set(0,0,80)
// scene.add(camera)

const camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 100);
camera.position.set(0,0,15)
scene.add( camera );

/////////////////////////////////////////////////////////////////////////
///// MAKE EXPERIENCE FULL SCREEN
window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(2)
})

/////////////////////////////////////////////////////////////////////////
///// CREATE ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)

/////////////////////////////////////////////////////////////////////////
///// SCENE LIGHTS
const ambient = new THREE.AmbientLight(0xffffff, 0.82)
scene.add(ambient)
// const spotLight = new THREE.SpotLight( 0xffffff, 5 );
// spotLight.position.set( 25, 50, 25 );
// spotLight.angle = Math.PI / 6;
// spotLight.penumbra = 1;
// spotLight.decay = 2;
// spotLight.distance = 1100;
// //spotLight.map = textures[ 'disturb.jpg' ];

// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// spotLight.shadow.camera.near = 10;
// spotLight.shadow.camera.far = 2000;
// spotLight.shadow.focus = 1;
// scene.add( spotLight );

// const lightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( lightHelper );
// const sunLight = new THREE.DirectionalLight(0xe8c37b, 1.96)
// sunLight.position.set(-69,44,14)
// scene.add(sunLight)

/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODEL FROM BLENDER
loader.load('models/gltf/starter-scene.glb', function (gltf) {
   //scene.add(gltf.scene)
})

//const geometry = new Geometry(scene);
// geometry.make('plane')(15, 15, 10, 10);
// geometry.place([0, -10, 0], [Math.PI / 2, 0, 0]);
//const geometry = new Geometry(scene);

const circleShaderMaterial = new THREE.ShaderMaterial( {
	uniforms: {
        uColor1 : { value:settings.color4},
        uColor2 : { value:settings.color5},
        uScene:{value:0.0},
		uTime: {value: 0.0 },
		resolution: { value: new THREE.Vector2() }
	},
    vertexShader: bgCircleVShader,
    fragmentShader: bgCircleFShader
} );

circleShaderMaterial.transparent = true;

// const bgCircleGeometry = new THREE.PlaneBufferGeometry(1820, 1820);
// //const bgPlanematerial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
// const bgCircle = new THREE.Mesh(  bgCircleGeometry, circleShaderMaterial);
// scene.add( bgCircle );======
//bgCircle.position.set(-800, -300, 0.01);

const bgPlane= new BgPlane(scene, bgPlaneS1VShader,bgPlaneS1FShader,0.0, settings.color1, settings.color2,settings.color3);
gameObjectManager.addGameObject(bgPlane)

console.log('It will be printed 1-st');
async function scene1() {

//    console.log('bbbw');
   const bgText = new BgText(scene);
   
   const s1BgMoon = new  S1BgMoon(scene,bgMoonVShader, bgMoonS1FShader, new THREE.Color(0xffffff),new THREE.Color(0x265164));
   gameObjectManager.addGameObject(s1BgMoon)
   await setTimeout(5000);
   const s1TitleText = new S1TitleText(scene);
   const s1DescriptionText = new S1DescriptionText(scene);
   const gradientText = new GradientText(scene,bgPlaneS1VShader,bgGradientTextFShader, settings.color1, settings.color2,settings.color3);
   gameObjectManager.addGameObject(gradientText);
    



   await setTimeout(1000);
   console.log('It will be printed 4-rd with delay')
   scene2();
}

async function scene2() {
await setTimeout(9000);
    console.log('bgplanefadeout');
    await setTimeout(1000);

    bgPlane.fadeOut();

    const s2TitleText = new S2TitleText(scene);
    const s2TitleRedText = new S2TitleRedText(scene);
    const s2DescriptionText = new S2DescriptionText(scene);
    const s2Description2Text = new S2Description2Text(scene);
   const bgPlaneSpark= new BgPlaneSpark(scene, bgPlaneS1VShader,bgPlaneSparkFShader,-0.01, );
   gameObjectManager.addGameObject(bgPlaneSpark)
   const bgPlaneSpark2= new BgPlaneSpark2(scene, bgPlaneS1VShader,bgPlaneSparkFShader,-0.01, );
   gameObjectManager.addGameObject(bgPlaneSpark2)
   const bgSparks = new BgSpark(scene);
   gameObjectManager.addGameObject(bgSparks)

  // const bgPlane2= new BgPlane(scene, bgPlaneS1VShader,bgPlaneS2FShader,-0.01, settings.color1, settings.color2,settings.color3);
    //const bgPlane2= new BgPlane(scene, bgPlaneS1VShader,bgPlaneS2FShader,-0.01, settings.color1, settings.color2,settings.color3);
    // gameObjectManager.addGameObject(bgPlane2);
    console.log('removebgplane');
    // gameObjectManager.removeGameObject(bgPlane);
     await setTimeout(2000);
    const s2BgMoon = new  S2BgMoon(scene,bgMoonVShader, bgMoonS2FShader, settings.color4, settings.color5);
    gameObjectManager.addGameObject(s2BgMoon)
 
     //  const bgSparks = new BgSpark(scene);
 //   gameObjectManager.addGameObject(bgSparks)
    await setTimeout(3000);
   // gameObjectManager.removeGameObject(bgSparks)
 //   bgSparks.fadeOut(3000);
    await setTimeout(3000);
   // gameObjectManager.removeGameObject(bgSparks)

}

scene1();


renderer.domElement.addEventListener('dblclick', onDoubleClick, false)
function onDoubleClick(event) {
  //  console.log(texts[0].settings.startTime)
    // new TWEEN.Tween(texts[0].position)
    //         .to(
    //             {
    //                 // x: p.x,
    //                 y: p.y + 3,
    //                 // z: p.z,
    //             },
    //             250
    //         )
    //         //.delay (1000)
    //         .easing(TWEEN.Easing.Cubic.Out)
    //         //.onUpdate(() => render())
    //         .start()
    //         .onComplete(() => {
    //             new TWEEN.Tween(sceneMeshes[1].position)
    //                 .to(
    //                     {
    //                         // x: p.x,
    //                         y: p.y + 1,
    //                         // z: p.z,
    //                     },
    //                     250
    //                 )
    //                 //.delay (250)
    //                 .easing(TWEEN.Easing.Bounce.Out)
    //                 //.onUpdate(() => render())
    //                 .start()
    //         })
}
/////////////////////////////////////////////////////////////////////////
//// INTRO CAMERA ANIMATION USING TWEEN
function introAnimation() {
    controls.enabled = false //disable orbit controls to animate the camera
    
    new TWEEN.Tween(camera.position.set(26,4,-35 )).to({ // from camera position
        x: 16, //desired x position to go
        y: 50, //desired y position to go
        z: -0.1 //desired z position to go
    }, 6500) // time take to animate
    .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
    .onComplete(function () { //on finish animation
        controls.enabled = true //enable orbit controls
        setOrbitControlsLimits() //enable controls limits
        TWEEN.remove(this) // remove the animation from memory
    })
}
//introAnimation() // call intro animation on start

/////////////////////////////////////////////////////////////////////////
//// DEFINE ORBIT CONTROLS LIMITS
function setOrbitControlsLimits(){
    controls.enableDamping = true
    controls.dampingFactor = 0.04
    controls.minDistance = 35
    controls.maxDistance = 60
    controls.enableRotate = true
    controls.enableZoom = true
    controls.maxPolarAngle = Math.PI /2.5
}

/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION
function rendeLoop() {
    TWEEN.update() // update animations

    let delta = clock.getDelta();
   // if (bgMoon) bgMoon.update(delta);
    gameObjectManager.update(delta)
  //  scene.delta= delta;
 
    //bgPlaneShaderMaterial.uniforms.uTime.value+=delta;
    circleShaderMaterial.uniforms.uTime.value+=delta;
    controls.update() // update orbit controls
 //   bgPlaneShaderMaterial.uniforms.uColor2.value= new THREE.Color(1, 1, 0);
    renderer.render(scene, camera) // render the scene using the camera
    requestAnimationFrame(rendeLoop) //loop the render function
    
}

rendeLoop() //start rendering

// const gui = new GUI()
// const params=  {color1: settings.color1.getHex(),
//                 color2: settings.color2.getHex(),
//                 color3: settings.color3.getHex(),
//                 color4: settings.color4.getHex(),
//                 color5: settings.color5.getHex(),
//                 color6: settings.color6.getHex(),
//                 currentScene: settings.currentScene}
// const controlUpdate = function () {
// 	let colorObj1 =  new THREE.Color( params.color1 )
// 	let colorObj2 = new THREE.Color( params.color2 )
// 	let colorObj3 = new THREE.Color( params.color3 )
//     let colorObj4 = new THREE.Color( params.color4 )
//     let colorObj5 = new THREE.Color( params.color5 )
//     let colorObj6 = new THREE.Color( params.color6 )
// 	settings.color1.set(colorObj1)
// 	settings.color2.set(colorObj2)
// 	settings.color3.set(colorObj3)
//     settings.color4.set(colorObj4)
//     settings.color5.set(colorObj5)
//     settings.color6.set(colorObj6)
// }

// gui.addColor(params,'color1').name('color1').onChange(controlUpdate)
// gui.addColor(params,'color2').name('color2').onChange(controlUpdate)
// gui.addColor(params,'color3').name('color3').onChange(controlUpdate)
// gui.addColor(params,'color4').name('color4-c').onChange(controlUpdate)
// gui.addColor(params,'color5').name('color5-c').onChange(controlUpdate)
// gui.addColor(params,'color6').name('color6-c').onChange(controlUpdate)
// gui.add(settings, 'currentScene').min(0).max(4).step(1).name('currentScene')