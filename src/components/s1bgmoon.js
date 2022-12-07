import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

class S1BgMoon{
    constructor(scene, VShader,FShader,color1,color2) {
      this.scene = scene;
      this.VShader= VShader;
      this.FShader= FShader;
      this.moonShaderMaterial = new THREE.ShaderMaterial( {
        uniforms: {
          uColor1 : { value:color1},
          uColor2 : { value:color2},
          uScene:{value:0.0},
          uTime: {value: 0.0 },
          transparency:{value: 0.2 },
          resolution: { value: new THREE.Vector2() }
        },
          vertexShader: this.VShader,
          fragmentShader: this.FShader,
          transparent:true
      } );
      //this.geo = null;
      this.init();
    }
    init() {

      const bgMoonGeometry = new THREE.PlaneBufferGeometry(2020,2020);
      this.object= new THREE.Mesh(  bgMoonGeometry, this.moonShaderMaterial);
    
    
    //   this.object.position.set(1700,-800,0.1)
      this.scene.add(this.object);
     // this.scene.updateGroup.add(bgMoon)
    //  console.log(this.scene.updateGroup)
      this.entryAnimate(new THREE.Vector3(3500,-1000,0.1),new THREE.Vector3(1700,-800,0.1),new THREE.Vector3(3500,-1000,0.1) )
    }
    
    entryAnimate( start,target,target2){
      this.object.position.copy(start)
      //  console.log(this.sp1)
       this.t1=new TWEEN.Tween(this.object.position)
       .delay(1000)
       .to( {x: target.x, y:target.y, z:target.z},8000)
     //  .yoyo(true)
      // .repeat(Infinity)
       .easing(TWEEN.Easing.Quadratic.InOut)
       .start()
       .onComplete( ()=> {
        
          this.tl2.delay(8000).start()
       })

       this.tl2 = new TWEEN.Tween(this.object.position)
       .to({x: target2.x, y:target2.y, z:target2.z},2000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        // .yoyo(true)
        // .repeat(Infinity)
      
    }
    update(delta){
     // console.log("!")
      this.moonShaderMaterial.uniforms.uTime.value+=delta;
    }
    fadeOut(){
      this.tl2.stop();
      this.tl3 = new TWEEN.Tween(this.object.position)
      .to({x: -3000, y:-1200, z:0.0},4000)
      .easing(TWEEN.Easing.Quadratic.InOut)
     
      // this.bgPlaneShaderMaterial.uniforms.uAniTime.value= this.bgPlaneShaderMaterial.uniforms.uTime.value;
     }
  }

  export { S1BgMoon};