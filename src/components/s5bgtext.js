import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import TWEEN from '@tweenjs/tween.js';
class S5BgText{
    constructor(scene,slower) {
      this.scene = scene;
      this.slower= slower;
      //this.geo = null;
      this.object= new THREE.Group();
      this.fontSize=500;
      
      this.init();
      
    }
   
    init() {
        const fontloader = new FontLoader();
      //  const scene= this.scene;
    // fontloader.load( 'fonts/helvetiker_bold.typeface.json',    ( font )=> {
     fontloader.load( 'fonts/Roboto_Bold.json',    ( font )=> {
            const matLite = new THREE.MeshBasicMaterial( {
                color: new THREE.Color(0x9BA4AB),
                transparent: true,
                opacity: 0.08,
                side: THREE.DoubleSide
            } );  
            this.addText(font, matLite);// message, 600,new THREE.Vector3(-1800,0,0.3))
            // const shapes = font.generateShapes( message, 500 );
        } ); 
        
    }

    addText=(font, material)=>{
   
      let message = 'OUR';
      let shapes = font.generateShapes( message, this.fontSize );
      let geometry = new THREE.ShapeGeometry( shapes );
      geometry.computeBoundingBox();
      let xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
      geometry.translate( xMid,0, 0 );
      this.object1 = new THREE.Mesh( geometry, material);
 
      this.object1.position.set(1000,130,0.3)
      this.object.add(this.object1);

      message = 'WORK';
      shapes = font.generateShapes( message, this.fontSize );
      geometry = new THREE.ShapeGeometry( shapes );
      geometry.computeBoundingBox();
      xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
      geometry.translate( xMid,0, 0 );
      this.object2 = new THREE.Mesh( geometry, material);
      this.object2.position.set(700,-600,0.3)
      this.object.add(this.object2);
      this.object.renderOrder=0;
    //  this.addToScene( text);
      this.scene.add(this.object);
      this.entryAnimate(new THREE.Vector3(2400,0,0.0),new THREE.Vector3(0,0,0.0),new THREE.Vector3(-4000,0,0.0))
      
    }

    entryAnimate(start,target,target2){
   //   console.log (this.object)
      this.object.position.copy(start)
      this.t1=new TWEEN.Tween(this.object.position)
      .delay(0+this.slower/4)
      .to( {x: target.x, y:target.y, z:target.z},200 +this.slower)
    //  .yoyo(true)
     // .repeat(Infinity)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onComplete( ()=> {
       
          tl2.delay(18000+this.slower*2).start()
      })

      const tl2 = new TWEEN.Tween(this.object.position)
      .to({x: target2.x, y:target2.y, z:target2.z},3400+this.slower)
       .easing(TWEEN.Easing.Quadratic.InOut)
       
    }

    update(delta){
      // console.log("!")
     // this.bgPlaneShaderMaterial.uniforms.uTime.value+=delta;
     }
     fadeOut(){
      // this.bgPlaneShaderMaterial.uniforms.uScene.value=1.0;
      // this.bgPlaneShaderMaterial.uniforms.uAniTime.value= this.bgPlaneShaderMaterial.uniforms.uTime.value;
     }


  }
    
  export {S5BgText };