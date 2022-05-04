import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContractService } from 'src/app/contact.service';
import { GameObjectService } from 'src/app/services/game-object.service';
import * as THREE from 'three';

@Component({
  selector: 'app-three-js-map',
  templateUrl: './three-js-map.component.html',
  styleUrls: ['./three-js-map.component.scss']
})
export class ThreeJsMapComponent implements OnInit {


  @ViewChild('canvas') canvasRef: ElementRef | undefined; 
  constructor(private contact: ContractService, private gameObj: GameObjectService) {
  }

  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  cameraZoom = 0;
  
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }
  sizeX = 50;
  sizeZ = 50
  enableLine = false;

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector3();
  camPoint = new THREE.Vector3(0,10,0);
  data = {
    name: "test"
  };
  blockCount = 0;

  ngOnInit(): void {
  }

  enableBlackground = false;
  randomcolor = false;

  private createScene() {   
    this.scene = this.gameObj.createScene(this.enableBlackground ? "/assets/texture.jpg" : "#666666", false);
    let startx = Math.ceil(this.sizeX / 2) * -1;
    let startz = Math.ceil(this.sizeZ / 2) * -1;;
    let endx = Math.ceil(this.sizeX / 2)
    let endz = Math.ceil(this.sizeZ / 2)
    console.log(startx,startz);
    let row = 1;
    let column = 1;
    let lineColor = this.enableLine ? "#000000" : "";
    for (let i = startx;i < endx;i++) {
      for (let j = startz;j < endz;j++) {
        var randomColor = this.randomcolor ? Math.floor(Math.random()*16777215).toString(16).toString() : "66ff66"
        randomColor = randomColor.padEnd(6,"000000")
        let plant = this.gameObj.createObject(1, "#"+randomColor, i,j, {"name": row+"-"+column},lineColor);
        this.scene.add(plant)
        column++;
        this.blockCount++;
      }
      row++;
      column=1;
    }
    let aspectRatio = this.getAspectRatio();
    this.camera = this.gameObj.createCamera(aspectRatio);
  
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }
  evClick(ev:any) {
    //console.log(ev)
    let bounding = this.canvasRef?.nativeElement.getBoundingClientRect();
    //console.log(bounding);
    this.pointer.x = ( ev.clientX / (this.canvas.clientWidth + (bounding.left*2)) ) * 2 - 1;
    this.pointer.y = - ( ev.clientY / (this.canvas.clientHeight + (bounding.top*2)) ) * 2 + 1;
    //console.log(this.pointer);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    this.raycaster.params ={
      Mesh: {},
      Line: { threshold: 0 },
      LOD: {},
      Points: { threshold: 0 },
      Sprite: {}
    }

    const intersects = this.raycaster.intersectObjects( this.scene.children );
    for ( let i = 0; i < intersects.length; i ++ ) {
      let focusObject: any = intersects[i]; 
      //console.log(focusObject.object.parent);
      let objectPos = null;
      if (focusObject.object.parent) {
        objectPos = focusObject.object.parent.position;
      } else {
        objectPos = focusObject.object.position;
      }
      if (focusObject.object.blockData) {
        this.data = focusObject.object.blockData
      } else {
        this.data = {
          name: "test"
        };
      }
      console.log(this.data);
      //focusObject.object.material.color.set( 0xff0000 );
      // this.camPoint = object.object.position;
      this.camPoint = new THREE.Vector3(objectPos.x, this.camera.position.y, objectPos.z)
    }

  }
  evScroll(ev:any) {
    let ySize = this.camera.position.y
    if (ev.wheelDelta > 0) {
      ySize-= ySize*0.5;
    } else {
      ySize+= ySize*0.5;
      this.camera.zoom = 0.5;
    }
    this.cameraZoom = ySize;
    this.camPoint = new THREE.Vector3(this.camera.position.x,ySize ,this.camera.position.z)
  }
  cameraUpdate() {
    this.camera.position.lerp(this.camPoint, 0.03);
    this.cameraZoom = this.camera.position.y
    //this.camera.lookAt(this.camPoint);
  }
  startRenderingLoop() {
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
    }
    
    this.renderer=new THREE.WebGLRenderer({canvas:this.canvas})
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight);
    this.renderer.setAnimationLoop(() => {
      //this.animeteCube();
      //this.cameraRole()
      this.cameraUpdate();
      this.renderer.render(this.scene, this.camera);
    });
  }
  reRender() {
    this.blockCount = 0;
    this.createScene();
    this.startRenderingLoop();
  }
  stop() {
    this.renderer.setAnimationLoop(null);
  }

  ngAfterViewInit() {
    // this.createScene();
    // this.startRenderingLoop();
  }

  testContact() {
    this.contact.loadWeb3();
  }
  testStore() {
    this.contact.useStore();
  }
  testRetrieve() {
    this.contact.useRetrieve();
  }

}
