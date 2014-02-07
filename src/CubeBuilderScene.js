
function CubeBuilderScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 23000;
    /* short name of this scene, must be defined */
    this.NAME = 'cubeBuilder';

    this.cube_size = 4;
    this.cube_leg_thickness = 0.35;
    this.short_animaion_duration = 1000;
    this.medium_animation_duration = 3000;
    this.long_animation_duration = 5000;
    this.line_animation_start = 0;
    this.rectangle_animation_start = 5000;
    this.rectangle_spin_animation_start = 10000;
    this.rectangle_solidify_animation_start = 15000;
    this.cube_animation_start = 16000;
    this.cube_spin_animation_start = 21000;
    this.cube_spin_animation_start2 = 23000;
    this.minecraft_cover_time = 23600;
    this.minecraft_cube_time = 24320;
    this.cube_spin_animation_start3 = 26000;
    this.cover_add_time = 27499;

    this.covered = false;
    this.minecraft_covered = false;
    this.minecraft_cubed = false;
}

CubeBuilderScene.prototype.init = function(cb){
    /* do loady stuff here */
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    this.scene.add(this.camera);

    this.initAsciiShader();
    this.initCubes();
    this.initLight();

    /* call cb when you are done loading! */
    cb();
}

CubeBuilderScene.prototype.initCubes = function() {
    // Load the cubes
    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: false, wireframeLinewidth: 4000 } );
    this.cubes = new Array();
    this.complete_cube = new THREE.Object3D();
    this.scene.add(this.complete_cube);
    for(var i=0;i<12;i++) {
        this.cubes[i] = new THREE.Mesh( new THREE.CubeGeometry(
        GU, GU, GU), material);
        this.cubes[i].position.x = -this.cube_size/2*GU;
        this.cubes[i].position.y = this.cube_size/2*GU;
        this.cubes[i].position.z = this.cube_size/2*GU;
        this.cubes[i].scale.set(this.cube_leg_thickness,this.cube_leg_thickness,0);
        this.complete_cube.add(this.cubes[i]);
    }
    
    
    this.minecraft_texture = THREE.ImageUtils.loadTexture( 'res/wood.png' );
    this.minecraft_material = new THREE.MeshLambertMaterial({
                map: this.minecraft_texture
              });
    this.minecraft_cover = new THREE.Mesh( new THREE.CubeGeometry(GU, GU, GU), this.minecraft_material);
    this.minecraft_cover.scale.set(0,this.cube_size+this.cube_leg_thickness, this.cube_size+this.cube_leg_thickness);
    this.minecraft_cover.position.x = (this.cube_size+this.cube_leg_thickness)/2*1.04*GU;

    this.minecraft_cube = new THREE.Mesh( new THREE.CubeGeometry(GU, GU, GU), this.minecraft_material);
    this.minecraft_cube.scale.set(this.cube_size+this.cube_leg_thickness*1.04,this.cube_size+this.cube_leg_thickness*1.02, this.cube_size+this.cube_leg_thickness*1.02);
//    this.minecraft_cover.position.x = (this.cube_size+this.cube_leg_thickness)/2*1.01*GU;

    var black_material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: false, wireframeLinewidth: 4000 } );
    this.black_cover = new THREE.Mesh( new THREE.CubeGeometry(
    GU, GU, GU), black_material);
    this.black_cover.scale.set(0,this.cube_size+this.cube_leg_thickness, this.cube_size+this.cube_leg_thickness);
    this.black_cover.position.x = (this.cube_size+this.cube_leg_thickness)/2*1.08*GU;
}

CubeBuilderScene.prototype.initAsciiShader = function() {
    this.composer = new THREE.EffectComposer(renderer, RENDERTARGET);
    this.composer.addPass( new THREE.RenderPass(this.scene, this.camera));
    var effect = new THREE.ShaderPass(AsciiShader);
    effect.renderToScreen = true;
    this.composer.addPass(effect);
}

CubeBuilderScene.prototype.initLight = function() {
    var ambientLight = new THREE.AmbientLight(0xbbbbbb);
    this.scene.add(ambientLight);
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
        this.camera.rotation.z = Math.PI-Math.PI*Math.cos((this.t-this.rectangle_spin_animation_start)/this.long_animation_duration*Math.PI);
        this.complete_cube.rotation.y = (Math.PI - Math.PI*Math.cos((this.t-this.rectangle_spin_animation_start)/this.long_animation_duration*Math.PI))/4;

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
    //Spin the cube on one axes
    if(this.t>this.cube_spin_animation_start && this.t<=this.cube_spin_animation_start+this.long_animation_duration) {
        this.complete_cube.rotation.y = Math.PI - Math.PI*Math.cos((this.t-this.cube_spin_animation_start)/this.long_animation_duration*Math.PI);
    }
    //Spin the cube on three axii
    if(this.t>this.cube_spin_animation_start2 && this.t<=this.cube_spin_animation_start2+this.medium_animation_duration) {
        this.complete_cube.rotation.x = Math.PI - Math.PI*Math.cos((this.t-this.cube_spin_animation_start2)/this.medium_animation_duration*Math.PI/2);
        this.complete_cube.rotation.z = Math.PI - Math.PI*Math.cos((this.t-this.cube_spin_animation_start2)/this.medium_animation_duration*Math.PI/2);
    }
    //Spin the cube on one axis
    if(this.t>this.cube_spin_animation_start3 && this.t<=this.cube_spin_animation_start3+this.medium_animation_duration) {
        this.complete_cube.rotation.y = Math.PI - Math.PI*Math.cos((this.t-this.cube_spin_animation_start3)/this.medium_animation_duration*Math.PI);
    }
    //Add a minecraft cover to a hidden side of the cube
    if(this.t>this.minecraft_cover_time && !this.minecraft_covered) {
        this.complete_cube.add(this.minecraft_cover);
        this.minecraft_covered = true;
    }
    //Cover the white cube in a minecraft cube
    if(this.t>this.minecraft_cube_time && !this.minecraft_cubed) {
        this.complete_cube.add(this.minecraft_cube);
        this.minecraft_cubed = true;
        //This is to hide the white cube inside, as it sometimes will glitch through
        for(var i=0;i<this.cubes.length;i++) {
            this.cubes[i].scale.set(0,0,0);;
        }
    }
    //Add a black cover to the cube to hide the transition to real graphics
    if(this.t>this.cover_add_time && !this.covered) {
        this.complete_cube.add(this.black_cover);
        this.covered = true;
        this.complete_cube.remove(this.minecraft_cover);
    }
}

CubeBuilderScene.prototype.render = function(){
    /* do rendery stuff here */
    if(this.t<this.cover_add_time+this.long_animation_duration/10) {
        this.composer.render();
    } else {
        renderer.render(this.scene, this.camera);
    }

}
