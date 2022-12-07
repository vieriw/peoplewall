import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import TWEEN from '@tweenjs/tween.js';
class GradientText{
    constructor(scene) {
      this.scene = scene;
      //this.geo = null;
      this.texture = new THREE.TextureLoader().load(
       'textures/aBW.png',
        this.init()
      );
    }
   
    init() {
        const fontloader = new FontLoader();
      //  const scene= this.scene;
    
        fontloader.load( 'fonts/helvetiker_bold.typeface.json',    ( font )=> {
        
            //const color = 0xFD4362;
            const matLite = new THREE.MeshPhongMaterial( {
                color: new THREE.Color(0xFD4362),
                transparent: true,
              //  wireframe:true,
                opacity: 0.88,
                side: THREE.DoubleSide
            } );
            
            const message = 'a Better World';
            this.addText(font, matLite, message, 200,new THREE.Vector3(800,0,0.3))
            // const shapes = font.generateShapes( message, 500 );
            // const geometry = new THREE.ShapeGeometry( shapes );
            
          
            // // make shape ( N.B. edge view not visible )
        
        
             //text.settings= {startTime:10, endtime:0}
            
        } ); 
        
    }
    // addToScene=(content)=>{
    //   this.text= content;
    //   this.scene.add(this.text);
    //  //fthis.animate();
     
    // }
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
      this.animate();
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

    animate(){
      
      //this.object.position.set(-1200-Math.random() * 200, -Math.random() * 400,0.3)  
      // new TWEEN.Tween(  this.object.position)
      //   .to( { x:3200},9000)
      //   //.yoyo(false)
      //   //.repeat(Infinity)
      //   //.dynamic(true)
      //   .onComplete(()=>{
      //     this.animate();
      //   })
      //   .delay(10)
      //   .easing(TWEEN.Easing.
      //     Sinusoidal.In)
      //   .start()
    }

    update(delta){
      // console.log("!")
      //this.bgPlaneShaderMaterial.uniforms.uTime.value+=delta;
     }
     fadeOut(){
       this.bgPlaneShaderMaterial.uniforms.uScene.value=1.0;
       this.bgPlaneShaderMaterial.uniforms.uAniTime.value= this.bgPlaneShaderMaterial.uniforms.uTime.value;
     }


  }
    
  export { GradientText };