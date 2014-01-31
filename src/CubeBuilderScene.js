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

    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: false, wireframeLinewidth: 4000 } );

    this.cubes = new Array();
    
    for(var i=0;i<12;i++) {
        this.cubes[i] = new THREE.Mesh( new THREE.CubeGeometry(
        GU, GU, GU), material);
        this.cubes[i].position.x = -2*GU;
        this.cubes[i].position.y = 2*GU;
        this.cubes[i].position.z = 2*GU;
        this.cubes[i].scale.set(0.1,0.1,0.0001);
        this.scene.add(this.cubes[i]);
    }

    tmpCube = this.cubes[0];



    /* call cb when you are done loading! */
    cb();
}

CubeBuilderScene.prototype.reset = function(){
    /* reset all the variables! */

    this.camera.position.z = 8*GU;
}

CubeBuilderScene.prototype.update = function(){
    if(t>this.startTime && t<this.startTime+5000) {
        var cubesToScale = [0,2,4,6];
        for(var i=0;i<cubesToScale.length;i++) {
            this.cubes[cubesToScale[i]].position.y = 2*GU-t*4*GU/(5000*2);
            this.cubes[cubesToScale[i]].scale.set(0.1, t*4.1/5000, 0.0001);
        }
        var cubesToMove = [3,8,7,11]
        for(var i=0;i<cubesToMove.length;i++) {
            this.cubes[cubesToMove[i]].position.y = 2*GU-t*4*GU/(5000);
        }
    }
    if(t>this.startTime+5000 && t<this.startTime+10000) {
        var cubesToScale = [1,3,5,7];
        for(var i=0;i<cubesToScale.length;i++) {
            this.cubes[cubesToScale[i]].position.x = -2*GU+(t-5000)*4*GU/(5000*2);
            this.cubes[cubesToScale[i]].scale.set((t-5000)*4.1/5000, 0.1, 0.0001);
        }
        var cubesToMove = [2,10,11,6]
        for(var i=0;i<cubesToMove.length;i++) {
            this.cubes[cubesToMove[i]].position.x = -2*GU+(t-5000)*4*GU/(5000);
        }

        this.cubes[2].position.x = -2*GU+(t-5000)*4*GU/(5000);
    }
    if(t>this.startTime+10000 && t<this.startTime+15000) {

    }
    /* do updatey stuff here */
}

CubeBuilderScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);

}
