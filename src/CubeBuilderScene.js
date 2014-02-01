
function CubeBuilderScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 15000;
    /* short name of this scene, must be defined */
    this.NAME = 'cubeBuilder';

    this.cube_size = 4;
    this.cube_leg_thickness = 0.35;
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

    this.initAsciiShader();
    this.initCubes();

    /* call cb when you are done loading! */
    cb();
}

CubeBuilderScene.prototype.initCubes = function() {
    // Load the cubes
    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: false, wireframeLinewidth: 4000 } );
    this.cubes = new Array();
    for(var i=0;i<12;i++) {
        this.cubes[i] = new THREE.Mesh( new THREE.CubeGeometry(
        GU, GU, GU), material);
        this.cubes[i].position.x = -this.cube_size/2*GU;
        this.cubes[i].position.y = this.cube_size/2*GU;
        this.cubes[i].position.z = this.cube_size/2*GU;
        this.cubes[i].scale.set(this.cube_leg_thickness,this.cube_leg_thickness,0);
        this.scene.add(this.cubes[i]);
    }
}

CubeBuilderScene.prototype.initAsciiShader = function() {
    this.composer = new THREE.EffectComposer(renderer, RENDERTARGET);
    this.composer.addPass( new THREE.RenderPass(this.scene, this.camera));
    var effect = new THREE.ShaderPass(AsciiShader);
    effect.renderToScreen = true;
    this.composer.addPass(effect);
}

CubeBuilderScene.prototype.reset = function(){
    /* reset all the variables! */

    this.camera.position.z = 9.2*GU;
}

CubeBuilderScene.prototype.update = function(){
    this.t = t - this.startTime;
    //Draw a vertical line starting up in the top left corner
    if(this.t>0 && this.t<=this.rectangle_animation_start) {
        var cubesToScale = [0,2,4,6];
        for(var i=0;i<cubesToScale.length;i++) {
            this.cubes[cubesToScale[i]].position.y = this.cube_size/2*GU-this.t*this.cube_size*GU/(this.long_animation_duration*2);
            this.cubes[cubesToScale[i]].scale.set(this.cube_leg_thickness, this.t*(this.cube_size+this.cube_leg_thickness)/this.long_animation_duration, 0);
        }
        var cubesToMove = [3,8,7,11]
        for(var i=0;i<cubesToMove.length;i++) {
            this.cubes[cubesToMove[i]].position.y = this.cube_size/2*GU-this.t*this.cube_size*GU/(this.long_animation_duration);
        }
    }
    //Expand the line to a rectangle
    if(this.t>this.rectangle_animation_start && this.t<=this.rectangle_spin_animation_start) {
       var cubesToScale = [1,3,5,7];
        for(var i=0;i<cubesToScale.length;i++) {
            this.cubes[cubesToScale[i]].position.x = -this.cube_size/2*GU+(this.t-this.long_animation_duration)*this.cube_size*GU/(this.long_animation_duration*2);
            this.cubes[cubesToScale[i]].scale.set((this.t-this.long_animation_duration)*(this.cube_size+this.cube_leg_thickness)/this.long_animation_duration, this.cube_leg_thickness, 0);
        }
        var cubesToMove = [2,10,11,6]
        for(var i=0;i<cubesToMove.length;i++) {
            this.cubes[cubesToMove[i]].position.x = -this.cube_size/2*GU+(this.t-this.long_animation_duration)*this.cube_size*GU/(this.long_animation_duration);
        }

        this.cubes[2].position.x = -this.cube_size/2*GU+(this.t-this.long_animation_duration)*this.cube_size*GU/(this.long_animation_duration);
    }
    //Spin the rectangle smoothly one round
    if(this.t>this.rectangle_spin_animation_start && this.t<=this.rectangle_solidify_animation_start) {
        this.camera.rotation.z = Math.PI*Math.cos((this.t-this.rectangle_spin_animation_start)/this.long_animation_duration*Math.PI);
    }
    //Make the rectangle solid
    if(this.t>this.rectangle_solidify_animation_start && this.t<=this.cube_animation_start) {
        var xcubes = [1,3,5,7];
        for(var i=0;i<xcubes.length;i++) {
            this.cubes[xcubes[i]].scale.set(this.cube_size+this.cube_leg_thickness,this.cube_leg_thickness,this.cube_leg_thickness*(this.t-this.rectangle_solidify_animation_start)/this.short_animaion_duration);
        }
        var ycubes = [0,2,4,6];
        for(var i=0;i<ycubes.length;i++) {
            this.cubes[ycubes[i]].scale.set(this.cube_leg_thickness,this.cube_size+this.cube_leg_thickness,this.cube_leg_thickness*(this.t-this.rectangle_solidify_animation_start)/this.short_animaion_duration);
        }
        var zcubes = [8,9,10,11];
        for(var i=0;i<zcubes.length;i++) {
            this.cubes[zcubes[i]].scale.set(this.cube_leg_thickness,this.cube_leg_thickness,this.cube_leg_thickness*(this.t-this.rectangle_solidify_animation_start)/this.short_animaion_duration);
        }
    }
    //Expand the rectangle to a cube
    if(this.t>this.cube_animation_start && this.t<=this.cube_animation_start+this.long_animation_duration) {
        var cubesToScale = [8,9,10,11];
        for(var i=0;i<cubesToScale.length;i++) {
            this.cubes[cubesToScale[i]].position.z = this.cube_size/2*GU-(this.t-this.cube_animation_start)*this.cube_size*GU/(this.long_animation_duration*2);
            this.cubes[cubesToScale[i]].scale.set(this.cube_leg_thickness, this.cube_leg_thickness, (this.t-this.cube_animation_start)*(this.cube_size+this.cube_leg_thickness)/this.long_animation_duration);
        }
        var cubesToMove = [4,5,6,7]
        for(var i=0;i<cubesToMove.length;i++) {
            this.cubes[cubesToMove[i]].position.z = this.cube_size/2*GU-(this.t-this.cube_animation_start)*this.cube_size*GU/(this.long_animation_duration);
        }
        
    }
    /* do updatey stuff here */
}

CubeBuilderScene.prototype.render = function(){
    /* do rendery stuff here */
    //renderer.render(this.scene, this.camera);
    this.composer.render();

}
