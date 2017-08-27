import { Component, ViewChild , ElementRef}  from '@angular/core';
import * as THREE 					from 'three';


import { SettingsService }  		from '../../shared/settings.service';

@Component({
  selector: 'game-3D',
  templateUrl: './game.3D.component.html',
  styleUrls: ['./game.3D.component.css']
})
export class Game3DComponent {

  private fps: 		number = 0;
	private targetFPS:	number = 30;
	private delta:		number = 0;

	private renderer: 	THREE.WebGLRenderer;
	private camera: 	THREE.PerspectiveCamera;
	private scene: 		THREE.Scene;

	private meshes: 	any;
	private lastFrame: 	number = 0;
	private interval: 	number;
	private gameRuning: boolean = false;

	//statistics
	private showFPS:			boolean = false;
	private enabelAntialiasing: boolean = true;

	@ViewChild('canvas') private canvas:ElementRef;

	//private subs: Subscription[] = new Array<Subscription>();

	constructor(
		//public serviceKeyboardEvents: 	serviceKeyboardEvents,
		public serviceSettings:	SettingsService
		) {

    this.loadSettings();
  }
  logDebug(msg:string) {
    console.log(msg);
  }
	loadSettings() {
		console.log('load settings');
		//this.targetFPS 	= this.serviceSettings.targetFPS;
		this.interval 	= Number((this.targetFPS/1000).toFixed(4));

		//if (this.gameRuning && this.serviceSettings.enabelAntialiasing != this.enabelAntialiasing) {
			//this.enabelAntialiasing == this.serviceSettings.enabelAntialiasing;
			//this.enabelAntialiasing ? console.log('disable antialising') : console.log('enable antialising') 
			//this.ngAfterViewInit();
		//}

		console.log('settings Loaded');
	}

	ngAfterViewInit() {
		console.log('init rendering');

		// Set the scene size.
		const WIDTH = window.innerWidth;
		const HEIGHT = window.innerHeight;

		// Set some camera attributes.
		const VIEW_ANGLE = 60;
		const ASPECT 	 = WIDTH / HEIGHT;
		const NEAR 		 = 0.1;
		const FAR 		 = 7000;


		window.addEventListener('resize', _=> {
			this.resizeRenderer();
		});

		if (!this.camera) {
			this.camera = new THREE.PerspectiveCamera(
				VIEW_ANGLE,
				ASPECT,
				NEAR,
				FAR
			);
			this.camera.position.z += 3000;
		}
		

		this.setupRenderer();
		this.resizeRenderer();
		this.buildScene();

		requestAnimationFrame(_=>this.update());
	}


	setupRenderer(){

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas.nativeElement,
			//antialias: this.serviceSettings.enabelAntialiasing
		});

		this.renderer.setClearColor(0x222222);
		this.renderer.setPixelRatio(window.devicePixelRatio);
	}


	buildScene() {
		this.scene = new THREE.Scene();

		var light 	= new THREE.AmbientLight(0xffffff,0.5);
		var light1 	= new THREE.PointLight(0xffffff,0.5);

		this.scene.add(light,light1);

		var geometry = new THREE.SphereGeometry(1000, 24, 24);
		var material = new THREE.MeshLambertMaterial({color: 0x349D4B, wireframe: true});

		this.meshes = new Map();

		this.meshes.set('planet01',new THREE.Mesh(geometry, material));
		this.meshes.get('planet01').position.set(0,0,0);


		this.meshes.set('planet02',new THREE.Mesh(geometry, material));
		this.meshes.get('planet02').position.set(-1900, 0, 0);
		this.meshes.get('planet02').scale.x = 0.5;
		this.meshes.get('planet02').scale.y = 0.5;
		this.meshes.get('planet02').scale.z = 0.5;

		var electron:THREE.mesh = this.meshes.get('planet02');

		var plane = new THREE.Plane();
		var point = new THREE.Vector3();

		electron.angle = new THREE.Vector3(0, 10, 0).normalize();
		electron.orbitSpeed = 0.001;
		plane.normal.copy(electron.angle);
		point.set(Math.random(), Math.random(), Math.random());
		plane.projectPoint(point, electron.position);
		electron.position.setLength(1900);
		electron.position.applyAxisAngle(electron.angle, Math.random() / 10);
		electron.position.add(this.meshes.get('planet01').position);

		console.log(this.meshes.keys());
		
		Array.from(this.meshes.keys()).forEach((key)=> {
			console.log('add mesh: '+key);
			this.scene.add(this.meshes.get(key));
		});
	}


	moveForward(){
		this.camera.position.z -= 10;
		//console.log('move forward');
	}

	moveBackward(){
		this.camera.position.z += 10;
		//console.log('move backward');
	}

	resizeRenderer(
		width: number = window.innerWidth,
		height: number =  window.innerHeight,
		renderer: THREE.WebGLRenderer = this.renderer,
	) {
		renderer.setSize(width, height);
		if (this.camera) {
			this.camera.aspect = (width/height);
			this.camera.updateProjectionMatrix();
		}
	}

	update () {
		// Schedule the next frame.
		this.meshes.get('planet01').rotation.y += 0.001;

		this.meshes.get('planet02').rotation.y += 0.0001;

		this.meshes.get('planet02').position.sub(
			this.meshes.get('planet01').position
		);

		this.meshes.get('planet02').position.applyAxisAngle(
			this.meshes.get('planet02').angle, 
			this.meshes.get('planet02').orbitSpeed
		);

		this.meshes.get('planet02').position.add(
			this.meshes.get('planet01').position
		);


		let now: number = Date.now();

		this.delta = (new Date().getTime() - this.lastFrame)/1000;
	
		if (this.delta > this.interval) {
			// Draw!
			this.renderer.render(this.scene, this.camera);
			this.lastFrame =  new Date().getTime();
			this.fps = Number((1/this.delta).toFixed(2));
			this.gameRuning = true;
		}
		requestAnimationFrame(this.update.bind(this));
	}
}
