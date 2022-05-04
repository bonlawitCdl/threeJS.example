import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-map',
  templateUrl: './canvas-map.component.html',
  styleUrls: ['./canvas-map.component.scss']
})
export class CanvasMapComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef', {static: false}) canvasRef!: ElementRef<HTMLCanvasElement>;
  context:any = null;
  canvas:any;
  tempCenterX= 0;
  tempCenterY= 0;
  cameraZoom = 1
  cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }
  isDragging = false
  dragStart = { x: 0, y: 0 }
  initialPinchDistance = null;
  lastZoom = this.cameraZoom;
  MAX_ZOOM = 5
  MIN_ZOOM = 0.1
  SCROLL_SENSITIVITY =  0.0005
  image = new Image();
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.tempCenterX = this.canvas.width / 2;
    this.tempCenterY = this.canvas.height / 2;

    this.draw()
  }
  draw() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
    this.context.translate( window.innerWidth / 2, window.innerHeight / 2 )
    this.context.scale(this.cameraZoom, this.cameraZoom)
    this.context.translate( -window.innerWidth / 2 + this.cameraOffset.x, -window.innerHeight / 2 + this.cameraOffset.y )
    this.context.clearRect(0,0, window.innerWidth, window.innerHeight)

    this.genBlock();
    requestAnimationFrame(() => this.draw())
  }
  genBlock() {
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
    let blockRow = 200;
    let blockCol = 200;
    let row = 1;
    let column = 1;
    if (!this.image.src) {
      let imCtx = document.createElement("canvas").getContext("2d");
      if (imCtx) {
        imCtx.canvas.width = blockCol * 10;
        imCtx.canvas.height = blockRow * 10
        for (let i = 0;i < blockRow;i++) {
          for (let j = 0;j < blockCol;j++) {
            this.createBlock(imCtx,i,j,1,row + "-" + column)
            column++;
          }
          row++;
          column=1;
        }
        this.image.src = imCtx.canvas.toDataURL("image/png");
        imCtx = null;
      }
    } else {
      // console.log(">>image saved")
      let posDX = blockCol * 10 / 2 * -1
      let posDY = blockRow * 10 / 2 * -1
      this.context.drawImage(this.image, 0, 0, 200*10, 200*10, posDX, posDY, 200*10, 200*10);
    }
  }
  createBlock(context:any, posX:number, posY:number, size:number, name:string) {
    let sizeCal = size * 10;
    let posStartX = posX*10;
    let posStertY = posY*10;
    context.fillStyle = "#66ff66";
    context.fillRect(posStartX, posStertY, sizeCal ,sizeCal);
    context.strokeRect(posStartX, posStertY, sizeCal ,sizeCal);
  }
  getEventLocation(e: any){
    if (e.touches && e.touches.length == 1)
    {
        return { x:e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY)
    {
        return { x: e.clientX, y: e.clientY }
    }
  }

  onPointerDown(e:any) {
      this.isDragging = true
      this.dragStart.x = this.getEventLocation(e)?.x/this.cameraZoom - this.cameraOffset.x
      this.dragStart.y = this.getEventLocation(e)?.y/this.cameraZoom - this.cameraOffset.y
  }
  onPointerUp(e:any){
    this.isDragging = false
    this.initialPinchDistance = null
    this.lastZoom = this.cameraZoom
  }
  onPointerMove(e:any) {
    if (this.isDragging) {
        this.cameraOffset.x = this.getEventLocation(e)?.x/this.cameraZoom - this.dragStart.x
        this.cameraOffset.y = this.getEventLocation(e)?.y/this.cameraZoom - this.dragStart.y
    }
  }

  zoom(ev:any) {
    //console.log(ev.wheelDelta)
    this.adjustZoom(ev.deltaY * this.SCROLL_SENSITIVITY)
    // if (ev.wheelDelta > 0) {
    //   this.cameraZoom += 0.01;
    // } else {
    //   this.cameraZoom -= 0.01;
    // }
    // this.context.scale(this.cameraZoom, this.cameraZoom)
  }

  adjustZoom(zoomAmount: number, zoomFactor:any = null) {
    if (!this.isDragging) {
      if (zoomAmount){
          this.cameraZoom += zoomAmount
      } else if (zoomFactor) {
          // console.log(zoomFactor)
          this.cameraZoom = zoomFactor* this.lastZoom
      }
      this.cameraZoom = Math.min( this.cameraZoom, this.MAX_ZOOM )
      this.cameraZoom = Math.max( this.cameraZoom, this.MIN_ZOOM )
    }
  }

}
