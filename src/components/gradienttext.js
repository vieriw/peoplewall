import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import TWEEN from '@tweenjs/tween.js';

class GradientText{
    constructor(scene,VShader, FShader,  color1,color2,color3,slower) {
      this.scene = scene;
      this.slower= slower;
      this.FShader= FShader;
      this.VShader= VShader;
      this.ShaderMaterial = new THREE.ShaderMaterial( {
        uniforms: {
          uColor1 : { value:color1},
          uColor2 : { value:color2},
          uColor3 : { value:color3},
          uScene:{value:0.0},
          uAniTime: {value: 0.0 },
          uTime: {value: 0.0 },
          uTexture: {  value: null }, 
          resolution: { value: new THREE.Vector2() }
        },
        vertexShader: this.VShader,
        fragmentShader:this.FShader,
        transparent:true
      } );
      //this.geo = null;
      this.object= null;
      this.texture = new THREE.TextureLoader().load(
        'textures/aBW.png',
        (t)=>{
          
          this.ShaderMaterial.uniforms.uTexture.value= t
          // this.ShaderMaterial.uniforms.texture= this.texture
          this.init();
        } 
      );
    }
    init() {
      const bgPlaneGeometry = new THREE.PlaneBufferGeometry(2378, 266);
      this.object = new THREE.Mesh(  bgPlaneGeometry, this.ShaderMaterial);
      this.object.scale.set(1.0,1.0,1.0);
  
      this.scene.add( this.object );
      this.entryAnimate(new THREE.Vector3(-3500,0,0.2),new THREE.Vector3(460,0,0.2),new THREE.Vector3(3400,0,0.2))
    }
    entryAnimate( start,target,target2){
     
       this.object.position.copy(start)
       this.t1=new TWEEN.Tween(this.object.position)
       .delay(1400)
       .to( {x: target.x, y:target.y, z:target.z},3200 +this.slower)
       .easing(TWEEN.Easing.Quartic.InOut)
       .start()
       .onComplete( ()=> {
          tl2.delay(10800 +this.slower).start()
       })

       const tl2 = new TWEEN.Tween(this.object.position)
       .to({x: target2.x, y:target2.y, z:target2.z},2200 +this.slower)
        .easing(TWEEN.Easing.Quartic.InOut)
       
       
    }
    update(delta){
     // console.log("!")
     this.ShaderMaterial.uniforms.uTime.value+=delta;
    }
    fadeOut(){
      this.ShaderMaterial.uniforms.uScene.value=1.0;
      this.ShaderMaterial.uniforms.uAniTime.value= this.ShaderMaterial.uniforms.uTime.value
    }

    // addToScene=(content)=>{
    //   this.text= content;
    //   this.scene.add(this.text);
    //  //fthis.animate();
     
    // }
 


  }
    
  export { GradientText };