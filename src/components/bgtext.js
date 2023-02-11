import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import TWEEN from '@tweenjs/tween.js';
class BgText{
    constructor(scene,slower) {
      this.scene = scene;
       this.slower=slower;
      //this.geo = null;
      this.init();
    }
   
    init() {
        const fontloader = new FontLoader();
      //  const scene= this.scene;
     fontloader.load( 'fonts/Roboto_Bold.json',    ( font )=> {
     // fontloader.load( 'fonts/Roboto_Light_Regular.json',    ( font )=> {
       // fontloader.load( 'fonts/Inter_Tight_Light_Regular.json',    ( font )=> { 
            const color = 0x006699;
            const matLite = new THREE.MeshBasicMaterial( {
                color: new THREE.Color(0x9BA4AB),
                transparent: true,
                opacity: 0.08,
                side: THREE.DoubleSide
            } );

            const message = '#BBBW';
            this.addText(font, matLite, message, 600,new THREE.Vector3(-1800,0,0.3))
            // const shapes = font.generateShapes( message, 500 );
            // const geometry = new THREE.ShapeGeometry( shapes );
            
            // geometry.computeBoundingBox();
            // const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
            // geometry.translate( xMid, -50, 0 );
          
            // // make shape ( N.B. edge view not visible )
        
        
             //text.settings= {startTime:10, endtime:0}
            
        } ); 
        
    }

    addText=(font, material, message, size,position)=>{
     
      const shapes = font.generateShapes( message, size);
     
      const geometry = new THREE.ShapeGeometry( shapes );
      geometry.computeBoundingBox();
      const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
      geometry.translate( xMid, -50, 0 );

      this.object = new THREE.Mesh( geometry, material);
     
      this.object.position.copy(position)
    //  this.addToScene( text);
      this.scene.add(this.object);
      this.entryAnimate(new THREE.Vector3(3400,0,0.0),new THREE.Vector3(3400,0,0.0))
    }
    // make(type) {
    //   if(type === 'plane') {
    //     return (width, height, widthSegments = 1, heightSegments = 1) => {
    //       this.geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    //     };
    //   }
  
    //   if(type === 'sphere') {
    //     return (radius, widthSegments = 32, heightSegments = 32) => {
    //       this.geo = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    //     };
    //   }
    // }
  
    // place(position, rotation) {
    //   const material =  new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    //   const mesh = new THREE.Mesh(this.geo, material);
  
    //   // Use ES6 spread to set position and rotation from passed in array
    //   mesh.position.set(...position);
    //   mesh.rotation.set(...rotation);
  
    // //   if(Config.shadow.enabled) {
    // //     mesh.receiveShadow = true;
    // //   }
  
    //   this.scene.add(mesh);
    // }

 

    entryAnimate(target,target2){
      //   console.log (this.object)
      this.object.position.set(-3400-Math.random() * 200, -Math.random() * 400,0.3)  
         this.t1=new TWEEN.Tween(this.object.position)
         .delay(600)
         .to( {x: target.x},11000+this.slower)
       //  .easing(TWEEN.Easing.Sinusoidal.In)
         .easing(TWEEN.Easing.Linear.None)
         
         .start()
         .onComplete( ()=> {
             this.object.position.set(-3400-Math.random() * 200, -Math.random() * 400,0.3) 
             tl2.delay(this.slower/2).start()
      })
      const tl2 = new TWEEN.Tween(this.object.position)
      .to({x: target2.x},10000+this.slower)
      .easing(TWEEN.Easing.Linear.None)
       .onComplete( ()=> {
        this.object.position.set(-3400-Math.random() * 200, -Math.random() * 400,0.3) 
        //tl3.delay(600).start()
        })

      const tl3 = new TWEEN.Tween(this.object.position)
       .to({x: target2.x},5000)
       .easing(TWEEN.Easing.Sinusoidal.In)



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
    
  export { BgText };