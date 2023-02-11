import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

class S2BgMoon{
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

      const bgMoonGeometry = new THREE.PlaneBufferGeometry(2820,2820);
      this.object= new THREE.Mesh(  bgMoonGeometry, this.moonShaderMaterial);
    

      // this.geo = new THREE.PlaneGeometry(10, 10, 2, 2);
      // const material =  new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
      // const mesh = new THREE.Mesh(this.geo, material);
      // mesh.position.set(0,0,1);
      this.scene.add(this.object);
     // this.scene.updateGroup.add(bgMoon)
    //  console.log(this.scene.updateGroup)
     this.entryAnimate(new THREE.Vector3(-2700,-1000,0.2),new THREE.Vector3(-1100,-890,0.2),new THREE.Vector3(-2700,-990,10.2) )
    }
    
    entryAnimate( start,target,target2){
      this.object.position.copy(start)
      //  console.log(this.sp1)
       this.t1=new TWEEN.Tween(this.object.position)
       .to( {x: target.x, y:target.y, z:target.z},8000+this.slower)
     //  .yoyo(true)
      // .repeat(Infinity)
       .easing(TWEEN.Easing.Quadratic.InOut)
       .start()
       .onComplete( ()=> {
          this.tl2.start()
       })

       
     this.tl2 = new TWEEN.Tween(this.object.position)
        .to({x: target.x-300, y:target.y-50, z:target.z},7000+this.slower)
         .easing(TWEEN.Easing.Quartic.InOut)
         .onComplete( ()=> {
           this.tl3.delay(0).start()
        })
 
      this.tl3 = new TWEEN.Tween(this.object.position)
        .to({x: target2.x, y:target2.y, z:target2.z},7000+this.slower)
         .easing(TWEEN.Easing.Quartic.InOut)
        
      
 
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

  export { S2BgMoon};