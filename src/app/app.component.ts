import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { log } from 'console';
import * as THREE from 'three';
import { Vector3 } from 'three';
import Web3 from "web3";
import { ContractService } from './contact.service';
import { GameObjectService } from './services/game-object.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }
}
