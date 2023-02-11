import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { Vector3 } from 'three';

class ProjectCase2{
//export default class Geometry {
    constructor(scene,slower) {
      this.scene = scene;
      this.slower= slower;
      this.object = new THREE.Group();
      this.init();
    }

    init() {
      const scene= this.scene;
      this.addImageBitmap();
    }

    addImageBitmap() {
      new THREE.ImageBitmapLoader()
        .setOptions( { imageOrientation: 'flipY' } )
        .load( 'textures/placeholder2.png',  ( imageBitmap )=> { 
          const texture = new THREE.CanvasTexture( imageBitmap );
      
          
          const material = new THREE.MeshBasicMaterial( { map: texture, transparent:true, side:THREE.FrontSide} );
          /* ImageBitmap should be disposed when done with it
             Can't be done until it's actually uploaded to WebGLTexture */
          // imageBitmap.close();
          this.addShowcases(  material );
        }, function ( p ) {
         // console.log( p );
        }, function ( e ) {
         // console.log( e );
        } );
       
    }
    addShowcases  = (material ) =>{
      
      const geometry = new THREE.PlaneGeometry(2400, 2400);
      const case1= new Vector3( -624,-50,0.6) 
      this.addShowcase (geometry,material,case1)
 
    //  this.animate();
       this.scene.add( this.object)
    
    }

    addShowcase = (geometry,material,pos) =>{
      const caseGeometry = new THREE.Mesh(  geometry, material  );
   
      caseGeometry.position.set( pos.x , pos.y,pos.z );
      caseGeometry.posBase= pos

      this.object.add( caseGeometry );
       
      this.entryAnimate(new THREE.Vector3(-2600,0,0.0),new THREE.Vector3(0,0,0.0),new THREE.Vector3(-2600,0,0.0))

    }
 
    entryAnimate(start,target,target2){
      //   console.log (this.object)
         this.object.position.copy(start)
         this.t1=new TWEEN.Tween(this.object.position)
         .delay(3000)
         .to( {x: target.x, y:target.y, z:target.z},3600+this.slower)
       //  .yoyo(true)
        // .repeat(Infinity)
         .easing(TWEEN.Easing.Quartic.InOut)
         .start()
         .onComplete( ()=> {
          
             tl2.delay( 10000+this.slower*2).start()
         })
   
         const tl2 = new TWEEN.Tween(this.object.position)
         .to({x: target2.x, y:target2.y, z:target2.z},3600+this.slower)
          .easing(TWEEN.Easing.Quartic.InOut)
       }
    update(delta) {
       
    }
    fadeOut(){
      this.t1.stop()
    }
  }

  export { ProjectCase2};