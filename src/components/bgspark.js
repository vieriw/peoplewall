import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { Vector3 } from 'three';

class BgSpark{
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
        .load( 'textures/spark512.png',  ( imageBitmap )=> {
          const texture = new THREE.CanvasTexture( imageBitmap );
          const material = new THREE.MeshBasicMaterial( { map: texture, transparent:true } );
          /* ImageBitmap should be disposed when done with it
             Can't be done until it's actually uploaded to WebGLTexture */
          // imageBitmap.close();
          this.addSparks(  material );
        }, function ( p ) {
          console.log( p );
        }, function ( e ) {
          console.log( e );
        } );
       
    }
    addSparks  = (material ) =>{
      
      const sparkGeometry = new THREE.PlaneGeometry(120, 120);
      const sp1= new Vector3(-1200,-250,0.1) 
      this.addSpark (sparkGeometry,material,sp1,0.9)
      const sp2= new Vector3(1500,150,0.1) 
      this.addSpark (sparkGeometry,material,sp2,0.4 )
      const sp3= new Vector3(1000,-350,0.1) 
      this.addSpark (sparkGeometry,material,sp3,0.2 )
    //  this.animate();
       this.scene.add( this.object)
     //  console.log(this.object)
      // this.entryAnimate( this.sp1, new THREE.Vector3(1.0,1.0,1.0))
    }

    addSpark = (sparkGeometry,material,pos,scaleBase) =>{
      const spark = new THREE.Mesh(  sparkGeometry, material  );
      spark.position.set( pos.x-Math.random() * 200+100 , pos.y+Math.random() * 20 - 10,0.1 );
      spark.scale.set(0.00,0.00,0.00);
      spark.posBase= pos
      spark.scaleBase= scaleBase
      this.object.add( spark );
      const duration=1200+Math.random()*1600
      const scale= Math.random()*0.2+ scaleBase;
      this.entryAnimate( spark, Math.random()*600,duration ,new THREE.Vector3(scale,scale,scale))

    }
    sparkUpdate(spark){
      spark.position.set( spark.posBase.x-Math.random() * 400+200, spark.posBase.y+Math.random() * 200 - 100,0.1 );
      const duration=1600+Math.random()*2400*spark.scaleBase
      const scale= Math.random()*0.2+spark.scaleBase;
      this.entryAnimate2(spark, 200+this.slower/2, duration, new THREE.Vector3(scale,scale,scale) )
    }
    entryAnimate( scaleObject,delay,duration,scale1){
      this.s1= new TWEEN.Tween( scaleObject.scale)
      .delay(1000+delay)
      .to( {x:  scale1.x, y:scale1.y, z:scale1.z},duration+this.slower/3)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .yoyo(true)
      .repeat(1)
      .onComplete( ()=> {
         this.sparkUpdate(scaleObject);
        //this.object.remove(scaleObject)
        //console.log(this.game)
       })
      // this.object.position.copy(start)
      // this.t1=new TWEEN.Tween(this.object.position)
      // .delay(1400)
      // .to( {x: target.x, y:target.y, z:target.z},1800)
      // .easing(TWEEN.Easing.Quadratic.Out)
      // .start()
      // .onComplete( ()=> {
      //    tl2.delay(8800).start()
      // })
      // const tl2 = new TWEEN.Tween(this.object.position)
      // .to({x: target2.x, y:target2.y, z:target2.z},1600)
      //  .easing(TWEEN.Easing.Quadratic.InOu
      
   }
   entryAnimate2( scaleObject,delay,duration,scale1){
    this.s1= new TWEEN.Tween( scaleObject.scale)
    .delay(1000+delay)
    .to( {x:  scale1.x, y:scale1.y, z:scale1.z},duration+this.slower/3)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start()
    .yoyo(true)
    .repeat(1)
  
    // this.object.position.copy(start)
    // this.t1=new TWEEN.Tween(this.object.position)
    // .delay(1400)
    // .to( {x: target.x, y:target.y, z:target.z},1800)
    // .easing(TWEEN.Easing.Quadratic.Out)
    // .start()
    // .onComplete( ()=> {
    //    tl2.delay(8800).start()
    // })
    // const tl2 = new TWEEN.Tween(this.object.position)
    // .to({x: target2.x, y:target2.y, z:target2.z},1600)
    //  .easing(TWEEN.Easing.Quadratic.InOu
    
 }



    update(delta) {
       
    }
    fadeOut(){
      this.t1.stop()
    }
  }

  export { BgSpark };