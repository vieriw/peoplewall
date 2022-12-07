import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import TWEEN from '@tweenjs/tween.js';
class S2DescriptionText{
    constructor(scene) {
      this.scene = scene;
      //this.geo = null;
      this.object= new THREE.Group();
      this.init();
      this.fontSize=40;
    }
   
    init() {
        const fontloader = new FontLoader();
        fontloader.load( 'fonts/Inter_Tight_Light_Regular.json',    ( font )=> {
            const matLite = new THREE.MeshBasicMaterial( {
                color: new THREE.Color(0x575C60),
                transparent: true,
                side: THREE.FrontSide
            } );
            this.addText(font, matLite)
        } ); 
 
    }
    
    addText =(font, material)=>{
      
      let message = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do';
      let shapes = font.generateShapes( message, this.fontSize );
      let geometry = new THREE.ShapeGeometry( shapes );
      geometry.computeBoundingBox();
      let xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
      geometry.translate( xMid,0, 0 );
      this.object1 = new THREE.Mesh( geometry, material);
 
      this.object1.position.set(0,-80,0.4)
      this.object.add(this.object1);
  
      message = 'eiusmod tempor incididunt ut labore.';
      shapes = font.generateShapes( message, this.fontSize );
      geometry = new THREE.ShapeGeometry( shapes );
      geometry.computeBoundingBox();
      xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
      geometry.translate( xMid,0, 0 );
      this.object2 = new THREE.Mesh( geometry, material);
      this.object2.position.set(0,-150,0.4)
      this.object.add(this.object2);
      
      this.scene.add(this.object);

      this.entryAnimate(new THREE.Vector3(3200,0,0.0),new THREE.Vector3(0,0,0.0),new THREE.Vector3(-3200,0,0.0))
      
    }

    entryAnimate(start,target,target2){
   //   console.log (this.object)
      this.object.position.copy(start)
      this.t1=new TWEEN.Tween(this.object.position)
      .delay(2000)
      .to( {x: target.x, y:target.y, z:target.z},1800)
    //  .yoyo(true)
     // .repeat(Infinity)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete( ()=> {
       
          tl2.delay(8000).start()
      })

      const tl2 = new TWEEN.Tween(this.object.position)
      .to({x: target2.x, y:target2.y, z:target2.z},1600)
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
    
  export { S2DescriptionText};