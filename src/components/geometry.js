import * as THREE from 'three';

class Geometry{
//export default class Geometry {
    constructor(scene) {
      this.scene = scene;
      //this.geo = null;
      this.init();
    }
    init() {

      this.geo = new THREE.PlaneGeometry(10, 10, 2, 2);
      const material =  new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
      const mesh = new THREE.Mesh(this.geo, material);
      mesh.position.set(0,0,1);
      this.scene.add(mesh);
     
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
    //   //mesh.position.set(...position);
    //   mesh.rotation.set(...rotation);
  
    // //   if(Config.shadow.enabled) {
    // //     mesh.receiveShadow = true;
    // //   }
  
    //   this.scene.add(mesh);
    // }
  }

  export { Geometry };