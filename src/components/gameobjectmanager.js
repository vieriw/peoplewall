import * as THREE from 'three';

class GameObjectManager {
  constructor(scene) {
    this.gameObjects = []//new SafeArray();
    this.scene = scene;
  }
  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
//    return gameObject;
  }
  removeGameObject(gameObject) {
   // this.gameObjects.remove(gameObject);
    this.gameObjects=this.gameObjects.filter(item => item !== gameObject)
    this.scene.remove(gameObject.object);
  }
  update(delta) {
    this.gameObjects.forEach(gameObject => gameObject.update(delta));
  }
}

export { GameObjectManager};