"use strict";

function render(renderer, scene, camera) {
    requestAnimationFrame(function(){render(renderer, scene, camera)});
    renderer.render(scene, camera);
};

window.onload = function() {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);

    var ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );

    //scene.add( cube );

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    var loader = new THREE.OBJLoader( manager );
    loader.load( 'assets/obj/cube.obj', function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                //child.material.map = texture;
            }
        } );

        object.position.x = 0;
        object.position.y = 0;
        object.position.z = 0;
        scene.add( object );

    }, manager.onProgress);

    render(renderer, scene, camera);
};

