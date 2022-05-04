import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContractService } from './contact.service';
import { GameObjectService } from './services/game-object.service';
import { CanvasMapComponent } from './lab/canvas-map/canvas-map.component';
import { ThreeJsMapComponent } from './lab/three-js-map/three-js-map.component';
import { LabHomeaComponent } from './lab/lab-homea/lab-homea.component';
import { RouterModule, Routes } from '@angular/router';
import { AframeMapComponent } from './lab/aframe-map/aframe-map.component';
const routes: Routes = [
  { path: '', component: LabHomeaComponent },
  { path: 'canvas', component: CanvasMapComponent },
  { path: 'threeJs', component: ThreeJsMapComponent },
  { path: 'aFrame', component: AframeMapComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CanvasMapComponent,
    ThreeJsMapComponent,
    LabHomeaComponent,
    AframeMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ContractService,GameObjectService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
