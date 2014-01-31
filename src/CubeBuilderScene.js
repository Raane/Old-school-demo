function CubeBuilderScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 0;
    /* short name of this scene, must be defined */
    this.NAME = 'cubeBuilder';
}

CubeBuilderScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    this.scene.add(this.camera);

    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});
    var material = new THREE.MeshBasicMaterial( { color: 0x666666, wireframe: true, wireframeLinewidth: 4 } );

    this.sphere = new THREE.Mesh( new THREE.SphereGeometry(
        50, 16, 16), material);

    glob = this.sphere;

    this.scene.add(this.sphere);


    /* call cb when you are done loading! */
    cb();
}

CubeBuilderScene.prototype.reset = function(){
    /* reset all the variables! */

    this.camera.position.z = 300;
}

CubeBuilderScene.prototype.update = function(){
    this.sphere.rotation.x = Math.sin(t/100);
    /* do updatey stuff here */
}

CubeBuilderScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);

}
