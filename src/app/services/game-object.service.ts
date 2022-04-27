import { Injectable } from '@angular/core';
import * as Three from 'three';
import { MeshLine, MeshLineMaterial } from 'three.meshline'
import { ColorRepresentation } from 'three';
import { isHexString } from 'ethers/lib/utils';

@Injectable({
  providedIn: 'root'
})
export class GameObjectService {

  constructor() {}

  createObject (size: number, color: ColorRepresentation, posX: number, posZ: number, data: any, lineColor: string = "") {
    let geometry = new Three.PlaneGeometry( size, size );
    let material = new Three.MeshBasicMaterial( {color: color, side: Three.DoubleSide} );
    let planObject = new Three.Mesh(geometry, material);
    let instantGroup = new Three.Group();
    (planObject as any).blockData = data;
    instantGroup.add(planObject);
    if (lineColor.length > 0) {
      const materialLine = new MeshLineMaterial({color:lineColor,  lineWidth :0.2});
      const points = [];
      points.push( new Three.Vector3( -0.5, -0.5, -0.01 ) );
      points.push( new Three.Vector3( 0.5, -0.5, -0.01 ) );
      points.push( new Three.Vector3( 0.5, 0.5, -0.01 ) );
      points.push( new Three.Vector3( -0.5, 0.5, -0.01 ) );
      points.push( new Three.Vector3( -0.5, -0.5, -0.01 ) );
      let geometryLine = new Three.BufferGeometry().setFromPoints( points );
      let line = new MeshLine();
      line.setGeometry(geometryLine);
      let mesh = new Three.Mesh(line, materialLine);    
      instantGroup.add(mesh);
    }
    instantGroup.position.x = posX;
    instantGroup.position.z = posZ;
    instantGroup.rotation.x = Math.PI / 2;;
    return instantGroup;
  }
  createScene(background: string, fog: boolean) {
    let scene = new Three.Scene();
    if (background.match("jpg|png")) {
      scene.background = new Three.TextureLoader().load(background);
    } else if (background.match("^#.{6}$")) {
      scene.background = new Three.Color(background)
    }
    return scene;
  }
  createCamera(ratio: number) {
    let nearClipingPlane:number = 1;
    let farClippingplann: number = 500;
    let camera = new Three.PerspectiveCamera(50, ratio, nearClipingPlane, farClippingplann );
    camera.position.y = 120;
    camera.rotation.x = Math.PI / 2 * -1
    return camera;
  }
}
