
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import TWEEN from '@tweenjs/tween.js';
class S5Description2Text{
    constructor(scene,slower) {
      this.scene = scene;
      this.slower= slower;
      //this.geo = null;
      this.object= new THREE.Group();
      this.init();
      this.fontSize=32;
    }
   
    init() {
        const fontloader = new FontLoader();
 
       // fontloader.load( 'fonts/Inter_Regular.json',    ( font )=> {
        fontloader.load( 'fonts/Inter_Tight_Regular.json',    ( font )=> {
        
          const matLite = new THREE.MeshBasicMaterial( {
              color: new THREE.Color(0xffffff),
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
      
      let message = "A huge";
      let shapes = font.generateShapes( message, this.fontSize );
      let geometry = new THREE.ShapeGeometry( shapes );
 
      this.object1 = new THREE.Mesh( geometry, material);
 
      this.object1.position.set(584,-420,0.4)
      this.object.add(this.object1);
  
      message = '     to everyone involved';
      shapes = font.generateShapes( message, this.fontSize );
      geometry = new THREE.ShapeGeometry( shapes );
      
      this.object2 = new THREE.Mesh( geometry, material);
      this.object2.position.set(950,-420,0.4)
      this.object.add(this.object2);
      
    }

    addBoldText =(font, material)=>{
      
      let message ="THANK YOU";
      let shapes = font.generateShapes( message, this.fontSize);
      let geometry = new THREE.ShapeGeometry( shapes );
      
      this.object4 = new THREE.Mesh( geometry, material);
 
      this.object4.position.set(730,-420,0.4)
      this.object.add(this.object4);
    
      this.scene.add(this.object);
      
       this.entryAnimate(new THREE.Vector3(3200,0,0.0),new THREE.Vector3(0,0,0.0),new THREE.Vector3(-3600,0,0.0))
     
    }
 
    entryAnimate(start,target,target2){
      //   console.log (this.object)
         this.object.position.copy(start)
         this.t1=new TWEEN.Tween(this.object.position)
         .delay(8000)
         .to( {x: target.x, y:target.y, z:target.z},4600+this.slower)
       //  .yoyo(true)
        // .repeat(Infinity)
         .easing(TWEEN.Easing.Quartic.InOut)
         .start()
         .onComplete( ()=> {
          
             tl2.delay(4000+this.slower*2).start()
         })
   
         const tl2 = new TWEEN.Tween(this.object.position)
         .to({x: target2.x, y:target2.y, z:target2.z},3600+this.slower)
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
    
  export { S5Description2Text };