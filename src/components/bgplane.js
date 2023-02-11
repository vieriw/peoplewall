import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

class BgPlane{
    constructor(scene,VShader, FShader, z, color1,color2,color3) {
      this.scene = scene;
      this.FShader= FShader;
      this.VShader= VShader;
      this.z= z;
      this.bgPlaneShaderMaterial = new THREE.ShaderMaterial( {
        uniforms: {
          uColor1 : { value:color1},
          uColor2 : { value:color2},
          uColor3 : { value:color3},
          uScene:{value:0.0},
          uAniTime: {value: 0.0 },
          uTime: {value: 0.0 },
          resolution: { value: new THREE.Vector2() }
        },
        vertexShader: this.VShader,
        fragmentShader:this.FShader
      } );
      //this.geo = null;
      this.object= null;
      this.init();
    }
    init() {
      const bgPlaneGeometry = new THREE.PlaneBufferGeometry(3648, 1200);
      this.object = new THREE.Mesh(  bgPlaneGeometry, this.bgPlaneShaderMaterial );
      this.object.position.z=this.z;
   
      this.scene.add( this.object );
      
    }

    update(delta){
     // console.log("!")
      this.bgPlaneShaderMaterial.uniforms.uTime.value+=delta;
    }
    fadeOut(){
      this.bgPlaneShaderMaterial.uniforms.uScene.value=1.0;
      this.bgPlaneShaderMaterial.uniforms.uAniTime.value= this.bgPlaneShaderMaterial.uniforms.uTime.value
    }
  
  }

  export { BgPlane};