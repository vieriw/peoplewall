import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

class BgPlaneSpark{
    constructor(scene,VShader, FShader, z) {
      this.scene = scene;
      this.FShader= FShader;
      this.VShader= VShader;
      this.z= z;
      this.ShaderMaterial = new THREE.ShaderMaterial( {
        uniforms: {
          uScene:{value:0.0},
          uAniTime: {value: 0.0 },
          uTime: {value: 0.0 },
          transparency:{value: 0.2 },
          uTexture: {  value: null }, 
          resolution: { value: new THREE.Vector2(3.648,1.2) }
        },
        vertexShader: this.VShader,
        fragmentShader:this.FShader,
        transparent:true
      } );
      this.texture = new THREE.TextureLoader().load(
        'textures/Spark512.png',
        (t)=>{
          //console.log(t)
          this.ShaderMaterial.uniforms.uTexture.value= t
          // this.ShaderMaterial.uniforms.texture= this.texture
          this.object= null;
          this.init();
        } 
      );
      //this.geo = null;
  
    }
    init() {
      const bgPlaneGeometry = new THREE.PlaneBufferGeometry(2048, 2048);
      this.object = new THREE.Mesh(  bgPlaneGeometry, this.ShaderMaterial );
      this.object.position.z=this.z;
      this.object.scale.set(0.4,0.4,0.4);
      this.scene.add( this.object );
      this.entryAnimate(new THREE.Vector3(3400,0,0.0),new THREE.Vector3(3400,0,0.0))
    }

    entryAnimate(target,target2){
      //   console.log (this.object)
      this.object.position.set(-2400-Math.random() * 200, -Math.random() * 0,0.3)  
         this.t1=new TWEEN.Tween(this.object.position)
         .delay(10)
         .to( {x: target.x},8000)
       .easing(TWEEN.Easing.Sinusoidal.In)
      // .easing(TWEEN.Easing.Linear.None)
         
         .start()
         .onComplete( ()=> {
             this.object.position.set(-2400-Math.random() * 200, -Math.random() * 400,0.3) 
             tl2.delay(600).start()
      })
      const tl2 = new TWEEN.Tween(this.object.position)
      .to({x: target2.x},6000)
      .easing(TWEEN.Easing.Linear.None)
       .onComplete( ()=> {
           this.object.position.set(-3400-Math.random() * 200, -Math.random() * 400,0.3) 
    //    tl3.delay(600).start()
        })

      // const tl3 = new TWEEN.Tween(this.object.position)
      //  .to({x: target2.x},5000)
      //  .easing(TWEEN.Easing.Sinusoidal.In)



    }
    update(delta){
     // console.log("!")
      this.ShaderMaterial.uniforms.uTime.value+=delta;
    }
    fadeOut(){
      this.ShaderMaterial.uniforms.uScene.value=1.0;
      this.ShaderMaterial.uniforms.uAniTime.value= this.ShaderMaterial.uniforms.uTime.value
    }
  
  }

  export { BgPlaneSpark};