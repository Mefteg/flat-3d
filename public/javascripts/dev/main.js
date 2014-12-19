"use strict";

function loop(renderer, scene, camera) {
    requestAnimationFrame(function(){loop(renderer, scene, camera)});
    update(scene, camera);
    render(renderer, scene, camera);
};

function update(scene, camera) {

};

function render(renderer, scene, camera) {
    renderer.render(scene, camera);
};

window.onload = function() {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 15;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);

    var ambient = new THREE.AmbientLight(0xffffff);
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
    loader.load( 'assets/obj/tree.obj', function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                //child.material.map = texture;
                child.material.ambient.setRGB(1, 0, 0);
                console.log(child.material);
                child.material.diffuse = 0xff0000;
            }
        }
    );

    object.position.x = 0;
    object.position.y = 0;
    object.position.z = 0;
    scene.add( object );

    }, manager.onProgress);

    var loaderCube = new THREE.OBJLoader( manager );
    loaderCube.load( 'assets/obj/cube.obj', function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                //child.material.map = texture;
                //child.material.ambient.setRGB(1, 0, 0);
                console.log(child.material);
                //child.material.diffuse = 0xff0000;
            }
        }
    );

    object.position.x = 5;
    object.position.y = 0;
    object.position.z = 0;
    scene.add( object );

    }, manager.onProgress);

    var listener = new window.keypress.Listener();
    listener.register_many(
        [
            {
                "keys": "left",
                "on_keydown": function() {
                    camera.position.x -= 1;
                }
            },
            {
                "keys": "right",
                "on_keydown": function() {
                    camera.position.x += 1;
                }
            },
            {
                "keys": "up",
                "on_keydown": function() {
                    camera.position.y += 1;
                }
            },
            {
                "keys": "down",
                "on_keydown": function() {
                    camera.position.y -= 1;
                }
            }
        ]
    );

    loop(renderer, scene, camera);
};

