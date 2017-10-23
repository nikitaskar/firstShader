// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats
import OrbitControls from 'imports-loader?THREE=three!exports-loader?THREE.OrbitControls!three/examples/js/controls/OrbitControls' // eslint-disable-line import/no-webpack-loader-syntax
import vertShader from './shader.vert'
import fragShader from './shader.frag'

export default class App {

    constructor() {
        this.time = 0;
        this.container = document.querySelector( '#main' );
    	document.body.appendChild( this.container );

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 200 );
        this.camera.position.z = 200;

        this.controls = new OrbitControls(this.camera)

    	this.scene = new THREE.Scene();
        var starsGeometry = new THREE.Geometry();

       for ( var i = 0; i < 400000; i ++ )   {

            var star = new THREE.Vector3();
            this.alpha = Math.random()*(Math.PI*2)
            this.theta = Math.random()*(Math.PI)


    
            star.x = Math.cos(this.alpha)*Math.sin(this.theta)
            star.y = Math.sin(this.alpha)*Math.sin(this.theta)
            star.z = Math.cos(this.theta)

            

            starsGeometry.vertices.push( star );

        }

    
        var uniforms = {
            u_time: { type: "f", value: 1.0 },
        }

        this.starsMaterial = new THREE.ShaderMaterial( { 
            uniforms : uniforms,
            vertexShader: vertShader,
            fragmentShader: fragShader
         } );

        this.starField = new THREE.Points( starsGeometry, this.starsMaterial );
        this.scene.add( this.starField );


    	this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    	this.renderer.setPixelRatio( window.devicePixelRatio );
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    	this.container.appendChild( this.renderer.domElement );

    	window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();

        this.renderer.animate( this.render.bind(this) );
    }

    render() {
        this.time += 0.01;
        this.starsMaterial.uniforms.u_time.value = this.time;
    	this.renderer.render( this.scene, this.camera );
    }

    onWindowResize() {

    	this.camera.aspect = window.innerWidth / window.innerHeight;
    	this.camera.updateProjectionMatrix();
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}
