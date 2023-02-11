import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

class DotSpark{
    constructor(scene,VShader, FShader, z) {
      this.scene = scene;
  
      this.dimensionScale= 8;
      this.imgWidth=128;
      this.imgHeight=128;
      
      this.density=2.0;
      this.densityMul= this.density*this.density;

      this.sampleWidth= this.imgWidth/this.density;
      this.sampleHeight= this.imgHeight/this.density;

      console.log( this.sampleWidth)
      this.width= this.dimension;
      this.height= this.dimension;
     
     
      this.FShader= FShader;
      this.VShader= VShader;
      this.z= z;

      this.ShaderMaterial = new THREE.RawShaderMaterial( {
        uniforms: {
          uScene:{value:0.0},
          uAniTime: {value: 0.0 },
          uTime: {value: 0.0 },
          transparency:{value:0.2 },
          uTexture: {  value: null }, 
          resolution: { value: new THREE.Vector2(3.648,1.2) },
          uRandom: { value: 1.0 },
          uDepth: { value: 2.0 },
          uSize: { value:  this.density },
          uTextureSize: { value: new THREE.Vector2(this.imgWidth, this.imgHeight) },
          uTouch: { value: null },
        },
        vertexShader: this.VShader,
        fragmentShader:this.FShader,
        transparent:true,
      //  depthTest: false,
			
      } );
      this.texture = new THREE.TextureLoader().load(
        'textures/Spark512.png',
       // 'textures/x.png',
        
        (t)=>{
          //console.log(t)
          this.ShaderMaterial.uniforms.uTexture.value= t
          // this.ShaderMaterial.uniforms.texture= this.texture
          this.object= null;
          this.init(true);
        } 
      );
      //this.geo = null;
  
    }
    init(discard) {
      this.numPoints = this.sampleWidth * this.sampleHeight;
      let numVisible = this.numPoints;
      let threshold = 0;
      let originalColors;
      if (discard) {
        // discard pixels darker than threshold #22
        numVisible = 0;
        threshold = 34;
  
        const img = this.texture.image;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        canvas.width = this.imgWidth;
        canvas.height = this.imgHeight;
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, 0, this.imgWidth, this.imgHeight * -1);
  
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        originalColors = Float32Array.from(imgData.data);
      
        for (let i = 0; i < this.sampleHeight; i++) {
          for (let j = 0; j< this.sampleWidth; j++) {
         //  if (originalColors[i *4*this.density*this.density*this.sampleWidth  + j*4* this.density + 0] > threshold) numVisible++;
           if (originalColors[4*this.density *(i *this.imgWidth  + j) + 0] > threshold) numVisible++;
          //if (originalColors[i * 4  + 0] > threshold) numVisible++;
          }
        }
          console.log('numVisible', numVisible, this.numPoints);
      }
      const geometry = new THREE.InstancedBufferGeometry();
      // const bgPlaneGeometry = new THREE.PlaneBufferGeometry(this.width,this.height);
     // positions
      const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
      positions.setXYZ(0, -0.5,  0.5,  0.0);
      positions.setXYZ(1,  0.5,  0.5,  0.0);
      positions.setXYZ(2, -0.5, -0.5,  0.0);
      positions.setXYZ(3,  0.5, -0.5,  0.0);
      geometry.setAttribute('position', positions);

		  // uvs
      const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
      uvs.setXYZ(0,  0.0,  0.0);
      uvs.setXYZ(1,  1.0,  0.0);
      uvs.setXYZ(2,  0.0,  1.0);
      uvs.setXYZ(3,  1.0,  1.0);
      geometry.setAttribute('uv', uvs);

      // index
      geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([ 0, 2, 1, 2, 3, 1 ]), 1));

     // const indices = new Uint16Array(numVisible);
      const indices = new Float32Array(numVisible * 3);
      const offsets = new Float32Array(numVisible * 3);
      const angles = new Float32Array(numVisible);

      // for (let i = 0, j = 0; i < this.numPoints; i++) {
      //   if (discard && originalColors[i * 4* this.density  + 0] <= threshold) continue;
      //  // console.log("!")
      //   offsets[j * 3 + 0] = i % this.imgWidth*this.density;
      //   offsets[j * 3 + 1] = Math.floor(i / this.imgWidth)*this.density;

      //   indices[j] = i;

      //   angles[j] = Math.random() * Math.PI;

      //   j++;
      // }
      let k=0;
      for (let i = 0; i < this.sampleHeight; i++) {
        for (let j = 0;j < this.sampleWidth; j++) {
        if (discard && originalColors[4*this.density *(i *this.imgWidth  + j)  + 0] <= threshold) continue;
        // console.log("!")
        //console.log(k)
        offsets[k * 3 + 0] = j *this.density;
        offsets[k * 3 + 1] = i* this.density;
       // indices[k] = i;
        indices[k * 3 + 0] = j/ this.sampleWidth;
        indices[k * 3 + 1] = i/this.sampleHeight;
        indices[k * 3 + 2] = (j+i*this.sampleHeight)/(this.sampleHeight* this.sampleWidth);
        angles[k] = Math.random() * Math.PI;
        k++;
        }
      }
		geometry.setAttribute('pindex', new THREE.InstancedBufferAttribute(indices, 3, false));
		geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3, false));
		geometry.setAttribute('angle', new THREE.InstancedBufferAttribute(angles, 1, false));
  
    
     
      this.object = new THREE.Mesh( geometry , this.ShaderMaterial  );
    //  this.object2 = new THREE.Mesh( bgPlaneGeometry , this.ShaderMaterial  );  
     this.object.position.set(-1200,-40,0)
    //  this.object.scale.set(this.density,this.density,this.density);
      this.object.scale.set(4.5,4.5,4.5);
      this.scene.add( this.object );
    //  this.scene.add( this.object2 );
     // this.entryAnimate(new THREE.Vector3(3400,0,0.0),new THREE.Vector3(3400,0,0.0))
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

  export { DotSpark};