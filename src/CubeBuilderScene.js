
function CubeBuilderScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 0;
    /* short name of this scene, must be defined */
    this.NAME = 'cubeBuilder';

    this.cube_size = 4;
    this.cube_leg_thickness = 0.1;
    this.short_animaion_duration = 1000;
    this.long_animation_duration = 5000;
    this.line_animation_start = 0;
    this.rectangle_animation_start = 5000;
    this.rectangle_spin_animation_start = 10000;
    this.rectangle_solidify_animation_start = 15000;
    this.cube_animation_start = 16000;
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
        this.cubes[i].scale.set(0.1,0.1,0);
        this.scene.add(this.cubes[i]);
    }

    tmpCube = this.cubes[0];



    /* call cb when you are done loading! */
    cb();
}

CubeBuilderScene.prototype.reset = function(){
    /* reset all the variables! */

    this.camera.position.z = 9.2*GU;
}

CubeBuilderScene.prototype.update = function(){
    //Draw a vertical line starting up in the top left corner
    if(t>this.startTime && t<=this.startTime+this.rectangle_animation_start) {
        var cubesToScale = [0,2,4,6];
        for(var i=0;i<cubesToScale.length;i++) {
            this.cubes[cubesToScale[i]].position.y = 2*GU-t*4*GU/(this.long_animation_duration*2);
            this.cubes[cubesToScale[i]].scale.set(0.1, t*(this.cube_size+this.cube_leg_thickness)/this.long_animation_duration, 0);
        }
        var cubesToMove = [3,8,7,11]
        for(var i=0;i<cubesToMove.length;i++) {
            this.cubes[cubesToMove[i]].position.y = 2*GU-t*4*GU/(this.long_animation_duration);
        }
    }
    //Expand the line to a rectangle
    if(t>this.startTime+this.rectangle_animation_start && t<=this.startTime+this.rectangle_spin_animation_start) {
       var cubesToScale = [1,3,5,7];
        for(var i=0;i<cubesToScale.length;i++) {
            this.cubes[cubesToScale[i]].position.x = -2*GU+(t-this.long_animation_duration)*4*GU/(this.long_animation_duration*2);
            this.cubes[cubesToScale[i]].scale.set((t-this.long_animation_duration)*(this.cube_size+this.cube_leg_thickness)/this.long_animation_duration, 0.1, 0);
        }
        var cubesToMove = [2,10,11,6]
        for(var i=0;i<cubesToMove.length;i++) {
            this.cubes[cubesToMove[i]].position.x = -2*GU+(t-this.long_animation_duration)*4*GU/(this.long_animation_duration);
        }

        this.cubes[2].position.x = -2*GU+(t-this.long_animation_duration)*4*GU/(this.long_animation_duration);
    }
    //Spin the rectangle smoothly one round
    if(t>this.startTime+this.rectangle_spin_animation_start && t<=this.startTime+this.rectangle_solidify_animation_start) {
        this.camera.rotation.z = Math.PI*Math.cos((t-this.rectangle_spin_animation_start)/this.long_animation_duration*Math.PI);
    }
    //Make the rectangle solid
    if(t>this.startTime+this.rectangle_solidify_animation_start && t<=this.startTime+this.cube_animation_start) {
        var xcubes = [1,3,5,7];
        for(var i=0;i<xcubes.length;i++) {
            this.cubes[xcubes[i]].scale.set(this.cube_size+this.cube_leg_thickness,0.1,0.1*(t-this.rectangle_solidify_animation_start)/this.short_animaion_duration);
        }
        var ycubes = [0,2,4,6];
        for(var i=0;i<ycubes.length;i++) {
            this.cubes[ycubes[i]].scale.set(0.1,this.cube_size+this.cube_leg_thickness,0.1*(t-this.rectangle_solidify_animation_start)/this.short_animaion_duration);
        }
        var zcubes = [8,9,10,11];
        for(var i=0;i<zcubes.length;i++) {
            this.cubes[zcubes[i]].scale.set(0.1,0.1,0.1*(t-this.rectangle_solidify_animation_start)/this.short_animaion_duration);
        }
    }
    //Expand the rectangle to a cube
    if(t>this.startTime+this.cube_animation_start && t<=this.startTime+this.cube_animation_start+this.long_animation_duration) {
        var cubesToScale = [8,9,10,11];
        for(var i=0;i<cubesToScale.length;i++) {
            this.cubes[cubesToScale[i]].position.z = 2*GU-(t-this.cube_animation_start)*4*GU/(this.long_animation_duration*2);
            this.cubes[cubesToScale[i]].scale.set(0.1, 0.1, (t-this.cube_animation_start)*(this.cube_size+this.cube_leg_thickness)/this.long_animation_duration);
        }
        var cubesToMove = [4,5,6,7]
        for(var i=0;i<cubesToMove.length;i++) {
            this.cubes[cubesToMove[i]].position.z = 2*GU-(t-this.cube_animation_start)*4*GU/(this.long_animation_duration);
        }
        
    }
    /* do updatey stuff here */
}

CubeBuilderScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);

}
