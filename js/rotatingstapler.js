// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

import * as THREE from'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';
 

function init() {
    

    const scene = new THREE.Scene();
    // const box = new THREE.Mesh(
    //     new THREE.BoxGeometry(50, 50, 50),
    //     new THREE.MeshLambertMaterial({ color: 0xff0000 })
    //     );;
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    const width = 1800;
    const height = 1800;
    const light = new THREE.DirectionalLight(0xffffff, 3);;
    const ambient = new THREE.AmbientLight(0xffffff);;
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    const gridHelper = new THREE.GridHelper(300, 50);
    const lightHelper = new THREE.DirectionalLightHelper(light, 20);

    var stapler;
    var stapler2;

    // box.position.set(0, 0, 0);
    // scene.add(box);
    
    light.position.set(0, 20, 200);
    light.castShadow = true;
    scene.add(light);
    scene.add(ambient);

    scene.background = new THREE.Color(0xffffff);
    
    camera.position.set(200, 100, 300);
    camera.lookAt(scene.position);

    
    // scene.add(gridHelper);
    // scene.add(lightHelper);

    








    // var urls = [
    //     '../models/environment.png', '../models/environment.png',
    //     '../models/environment.png', '../models/environment.png',
    //     '../models/environment.png', '../models/environment.png'
    //   ];
    // //テクスチャの読み込み
    // var textureCube = THREE.ImageUtils.loadTextureCube ( urls , THREE.CubeReflectionMapping );

    // var material = new THREE.MeshPhongMaterial( { 
    //     color:0xFF0000,
    //     envMap: textureCube, //環境マッピング
    //     reflectivity: 1.0,  //反射率
    //     combine: THREE.MultiplyOperation //演算方法
    // });










    const loader = new GLTFLoader();
    
    loader.load(
        '../models/screwscatter.glb',
        (object) => {
            stapler = object.scene;
            scene.add( object.scene );
            object.scene.scale.set(20,20,20);
            object.scene.rotation.z = .6;
            object.scene.rotation.x = .6;
            object.scene.rotation.y = Math.random() * 100;

            // if (object.isMesh) {
            //     object.material = material;
            //   }
            // object.scene.traverse( function( node ) {
            // if ( node.isMesh ) {
            //     node.castShadow = true; 
            //     node.receiveShadow = true;
            // }
            // } );

        }
    )
    
    // const material = new THREE.MeshToonMaterial({color: 0x6699FF});


    // loader.load(
    //     '../models/stapler.glb',
    //     (object) => {
    //         stapler2 = object.scene;
    //         scene.add( object.scene );
    //         object.scene.scale.set(30,30,30);
    //         object.scene.position.set(-200,-200,-200);
    //         object.scene.rotation.z = .6;
    //         object.scene.rotation.x = .6;
    //     }
    // )
    
    
    // document.getElementById('stage').appendChild(renderer.domElement);
    const canvasElement = document.querySelector('#stage');
    const renderer = new THREE.WebGLRenderer({ canvas: canvasElement});
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff);
    // renderer.setPixelRatio(0.4);
    renderer.setPixelRatio(0.5);
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    
    function render() {
        requestAnimationFrame(render);
        
        stapler.rotation.y += 0.0005;
        // stapler2.rotation.y += 0.02;

        // setTimeout( function() {

        //     requestAnimationFrame( animate );
    
        // }, 1000 / 30 );

        renderer.render(scene, camera);
    }
    render();
    
}
