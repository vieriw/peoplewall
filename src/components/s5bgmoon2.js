import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

class S5BgMoon2{
    constructor(scene, VShader,FShader,color1,color2,slower) {
      this.scene = scene;
      this.slower= slower;
      this.VShader= VShader;
      this.FShader= FShader;
      this.moonShaderMaterial = new THREE.ShaderMaterial( {
        uniforms: {
          uColor1 : { value:color1},
          uColor2 : { value:color2},
          uScene:{value:0.0},
          uTime: {value: 0.0 },
          transparency:{value: 0.65 },
          isFade:{value:0.0},
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
   
      const bgMoonGeometry = new THREE.PlaneBufferGeometry(1440,1440);

      this.object= new THREE.Mesh(  bgMoonGeometry, this.moonShaderMaterial);
     // this.object.position.set(-300,500,0.2)
 
      this.scene.add(this.object);
      this.entryAnimate(new THREE.Vector3(-900,1000,0.2),new THREE.Vector3(-300,500,0.2),new THREE.Vector3(-600,1000,0.2) )
    }
    
    entryAnimate( start,target,target2){
      this.object.position.copy(start)
      //  console.log(this.sp1)
       this.t1=new TWEEN.Tween(this.object.position)
       .to( {x: target.x, y:target.y, z:target.z},4000+this.slower)
     //  .yoyo(true)
      // .repeat(Infinity)
       .easing(TWEEN.Easing.Quartic.InOut)
       .start()
       .onComplete( ()=> {
          this.tl2.delay(4000+this.slower).start()
       })

       this.tl2 = new TWEEN.Tween(this.object.position)
       .to({x: target.x-300, y:target.y-50, z:target.z},12000+this.slower)
        .easing(TWEEN.Easing.Quartic.InOut)
       
        .onComplete( ()=> {
          this.tl3.delay(0).start()
       })

       this.tl3 = new TWEEN.Tween(this.object.position)
       .to({x: target2.x, y:target2.y, z:target2.z},1000+this.slower)
        .easing(TWEEN.Easing.Quartic.InOut)
       
        .onComplete( ()=> {
          this.moonShaderMaterial.uniforms.isFade.value= this.moonShaderMaterial.uniforms.uTime.value;
       })

    
      
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

  export { S5BgMoon2};