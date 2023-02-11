import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import TWEEN from '@tweenjs/tween.js';
class S2TitleRedText{
    constructor(scene,slower) {
      this.scene = scene;
      this.slower= slower;
      //this.geo = null;
      this.object= new THREE.Group();
      this.init();
      
    }
   
    init() {
        const fontloader = new FontLoader();
 
      // fontloader.load( 'fonts/Inter_Regular.json',    ( font )=> {
        fontloader.load( 'fonts/Inter_Bold.json',    ( font )=> {
        
            const matLite = new THREE.MeshBasicMaterial( {
                 color: new THREE.Color(0xFF3E3E),
                
                transparent: false,
                opacity: 1.0,
                side: THREE.DoubleSide
            } );

            
            this.addText(font, matLite)
            
        } ); 
        
    }
 
    addText =(font, material)=>{
      
      let message = 'Welcome';
      let shapes = font.generateShapes( message, 72 );
      let geometry = new THREE.ShapeGeometry( shapes );
      geometry.computeBoundingBox();
     let xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    geometry.translate( xMid,0, 0 );
      this.object1 = new THREE.Mesh( geometry, material);
 
      this.object1.position.set(0,260,0.4)
    
      this.object.add(this.object1);
  
    //   message = 'Better  Bank  for';
    //   shapes = font.generateShapes( message, 144 );
    //   geometry = new THREE.ShapeGeometry( shapes );
    //   geometry.computeBoundingBox();
    // // xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    // // geometry.translate( xMid, -50, 0 );
    //   this.object2 = new THREE.Mesh( geometry, material);
    //   this.object2.position.set(-821,168,0.4)
    //   this.object.add(this.object2);
    //   console.log(this.object)   
    
      this.scene.add(this.object);
      this.entryAnimate(new THREE.Vector3(-3200,0,0.0),new THREE.Vector3(0,0,0.0),new THREE.Vector3(3600,0,0.0))
     // this.entryAnimate();
    }
 
    entryAnimate(start,target,target2){
      //   console.log (this.object)
         this.object.position.copy(start)
         this.t1=new TWEEN.Tween(this.object.position)
         .delay(2000)
         .to( {x: target.x, y:target.y, z:target.z},4200+this.slower)
       //  .yoyo(true)
        // .repeat(Infinity)
         .easing(TWEEN.Easing.Quartic.InOut)
         .start()
         .onComplete( ()=> {
             tl2.delay(8000+this.slower*2).start()
         })
   
         const tl2 = new TWEEN.Tween(this.object.position)
         .to({x: target2.x, y:target2.y, z:target2.z},4800+this.slower)
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
    
  export { S2TitleRedText };