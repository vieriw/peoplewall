import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import TWEEN from '@tweenjs/tween.js';
class S1DescriptionText{
    constructor(scene,slower) {
      this.scene = scene;
      this.slower= slower;
      //this.geo = null;
      this.object= new THREE.Group();
      this.init();
      this.fontSize=42;
    }
   
    init() {
        const fontloader = new FontLoader();
 
      // fontloader.load( 'fonts/Inter_Regular.json',    ( font )=> {
        fontloader.load( 'fonts/Inter_Tight_Light_Regular.json',    ( font )=> {
        
            const matLite = new THREE.MeshBasicMaterial( {
                color: new THREE.Color(0x9BA4AB),
                transparent: false,
                side: THREE.FrontSide
            } );
            this.addText(font, matLite)
        } ); 

        fontloader.load( 'fonts/Inter_Tight_Bold.json',    ( font )=> { 
            const matLite = new THREE.MeshBasicMaterial( {
                color: new THREE.Color(0xffffff),
                transparent:false,
                side:  THREE.FrontSide
            } );      
            this.addBoldText(font, matLite)    
        } ); 
    }
    
    addText =(font, material)=>{
      
      let message = 'Global Finance names DBS';
      let shapes = font.generateShapes( message, this.fontSize );
      let geometry = new THREE.ShapeGeometry( shapes );
      this.object1 = new THREE.Mesh( geometry, material);
 
      this.object1.position.set(-633,-300,0.4)
      this.object.add(this.object1);
  
      message = ' for second time in three years DBS';
      shapes = font.generateShapes( message, this.fontSize );
      geometry = new THREE.ShapeGeometry( shapes );
      this.object2 = new THREE.Mesh( geometry, material);
      this.object2.position.set(716,-300,0.4)
      this.object.add(this.object2);
      
      message = "also Singapore's most valuable brand for the eighth year running (Yay!!!) ";
      shapes = font.generateShapes( message, this.fontSize );
      geometry = new THREE.ShapeGeometry( shapes );
      this.object3 = new THREE.Mesh( geometry, material);
      this.object3.position.set(-633,-380,0.4)
      this.object.add(this.object3);

      
    }

    addBoldText =(font, material)=>{
      
      let message ="'Best Bank in the World'";
      let shapes = font.generateShapes( message, this.fontSize);
      let geometry = new THREE.ShapeGeometry( shapes );
      geometry.computeBoundingBox();
     // let xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    // geometry.translate( xMid, -50, 0 );
      this.object4 = new THREE.Mesh( geometry, material);
 
      this.object4.position.set(70,-300,0.4)
      this.object.add(this.object4);
    
      this.scene.add(this.object);

      this.entryAnimate(new THREE.Vector3(3200,0,0.0),new THREE.Vector3(0,0,0.0),new THREE.Vector3(-3600,0,0.0))
     // this.entryAnimate();
    }

    entryAnimate(start,target,target2){
   //   console.log (this.object)
      this.object.position.copy(start)
      this.t1=new TWEEN.Tween(this.object.position)
      .delay(1000)
      .to( {x: target.x, y:target.y, z:target.z},3200+this.slower)
    //  .yoyo(true)
     // .repeat(Infinity)
      .easing(TWEEN.Easing.Quartic.InOut)
      .start()
      .onComplete( ()=> {
       
          tl2.delay(10000+this.slower).start()
      })

      const tl2 = new TWEEN.Tween(this.object.position)
      .to({x: target2.x, y:target2.y, z:target2.z},3200+this.slower)
       .easing(TWEEN.Easing.Quartic.InOut)
       
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
    
  export { S1DescriptionText};