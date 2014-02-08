function MinecraftScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime =52000;
    /* short name of this scene, must be defined */
    this.NAME = 'example';
}

MinecraftScene.prototype.init = function(cb){
    /* do loady stuff here */
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 20000);
    this.scene.add(this.camera);
    
    this.cube_size = 4;
    this.cube_leg_thickness = 0.35;
    this.cubes = new Array();
    this.signs = new Array();
    this.signs_added = false;

    this.initCoorArray();
    this.initLight();
    this.initCubes();
    camera = this.camera;
    /* call cb when you are done loading! */
    cb();
}

MinecraftScene.prototype.initCubes = function(cb){
    this.minecraft_texture = THREE.ImageUtils.loadTexture( 'res/wood.png' );
    this.minecraft_material = new THREE.MeshLambertMaterial({
                map: this.minecraft_texture
              });
    var extra_cube = new THREE.Mesh( new THREE.CubeGeometry(GU, GU, GU), this.minecraft_material);
    extra_cube.scale.set(this.cube_size+this.cube_leg_thickness*1.06,this.cube_size+this.cube_leg_thickness*1.06, this.cube_size+this.cube_leg_thickness*1.06);
    extra_cube.position.z = 0.1*GU;
    this.scene.add(extra_cube);
    for(var i=0;i<this.old_school_coordinates.length;i++) {
        this.cubes[i] = new THREE.Mesh( new THREE.CubeGeometry(GU, GU, GU), this.minecraft_material);
        this.cubes[i].scale.set(this.cube_size+this.cube_leg_thickness*1.04,this.cube_size+this.cube_leg_thickness*1.02, this.cube_size+this.cube_leg_thickness*1.02);
        this.scene.add(this.cubes[i]);
    }
    var sign_texture_images = [
        "sign_old_school.png",
        "sign_run.png",
        "sign_ninjadev.png",
        "sign_sigveseb.png"
            ];
    for(var i=0;i<sign_texture_images.length;i++) {
        console.log('res/' + sign_texture_images[i]);

        var sign_materials = [
            new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture('res/sign.png')
                }),
                new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture('res/sign.png')
                }),
                new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture('res/sign.png')
                }),
                new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture('res/sign.png')
                }),
                new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture('res/sign.png')
                }),
                new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture('res/' + sign_texture_images[i])
                })
        ];

        var sign_texture = THREE.ImageUtils.loadTexture( 'res/' + sign_texture_images[i] );
        var sign_material = new THREE.MeshLambertMaterial({
                map: sign_texture
              });
        this.signs[i] = new THREE.Mesh( new THREE.CubeGeometry(GU, GU, GU), new THREE.MeshFaceMaterial(sign_materials));
        this.signs[i].scale.set(this.cube_size+this.cube_leg_thickness*1.04,(this.cube_size+this.cube_leg_thickness*1.02)/2, (this.cube_size+this.cube_leg_thickness*1.02)/10);
        this.signs[i].position.x=((4-this.sign_coordinates[i][0])*GU*4.35);
        this.signs[i].position.y=-((4-this.sign_coordinates[i][2])*GU*4.35 - 10*GU);
        this.signs[i].position.z=((4-this.sign_coordinates[i][1])*GU*4.35 - 60*GU) + 2*GU;
        
    }
}
MinecraftScene.prototype.initLight = function() {
    var ambientLight = new THREE.AmbientLight(0xbbbbbb);
    this.scene.add(ambientLight);
}

MinecraftScene.prototype.reset = function(){
    /* reset all the variables! */
    this.camera.position.z = 9.2*GU;
}

MinecraftScene.prototype.update = function(){
    /* do updatey stuff here */
    this.t = t - this.startTime;
    if(this.t<12000) {
        console.log("hit")
        for(var i=0;i<this.old_school_coordinates.length;i++) {
            var random_number_x = 0.25+(i%20)/10*(i%2+i%3+i%4)/3;
            var random_number_y = 0.25+((i-10)%20)/10*(i%2+i%3+i%4)/3;
            var cube_t = Math.min(Math.max(this.t-i*60,0),5000);
            this.cubes[i].position.x=((4-this.old_school_coordinates[i][0])*GU*4.35)*(Math.pow(cube_t,random_number_x)/Math.pow(5000,random_number_x));
            this.cubes[i].position.y=-((4-this.old_school_coordinates[i][2])*GU*4.35 - 10*GU)*(cube_t/5000);
            this.cubes[i].position.z=((4-this.old_school_coordinates[i][1])*GU*4.35 - 60*GU)*(Math.pow(cube_t,random_number_y)/Math.pow(5000,random_number_y));
        }
    } else {
        console.log(this.t.toString());
    }
    if(this.t>0 && this.t<2000) {
        this.camera.position.z = 9.2*GU+(this.t)*GU/300;
    }
    if(this.t>2000 && this.t<12000) {
        this.camera.position.x = -(this.t-2000)*GU/250;
        this.camera.position.y = (this.t-2000)*GU/2000
        this.camera.lookAt(new THREE.Vector3(0,0,((this.t-2000)/10000)*-60*GU));

        //{x: -3153.68, y: 0, z: 1248.1999999999998

    }

    if(this.t>9000 && !this.signs_added) {
        for(var i=0;i<this.signs.length;i++) {
            this.scene.add(this.signs[i]);
        }
        this.signs_added = true;
    }

    if(this.t>12000 && this.t<16000) {
        this.camera.lookAt(new THREE.Vector3(0,0,-60*GU));
    }
    if(this.t>6000 && this.t<12000) {
        var old_z = 9.2*GU+(2000)*GU/300;
        var new_z = -90*GU;
        var ratio = (this.t-6000)/6000;
        this.camera.position.z = new_z*ratio+old_z*(1-ratio);
    }
    if(this.t>12000 && this.t<16000) {
        var old_x = -40*GU;
        var new_x = -4.35*2*GU;
        var ratio = (this.t-12000)/4000;
        this.camera.position.x = new_x*ratio+old_x*(1-ratio);
    }
    if(this.t>16000 && this.t<20000) {
        var old_z = -90*GU;
        var new_z = -80*GU;
        var ratio = (this.t-16000)/4000;
        this.camera.position.z = new_z*ratio+old_z*(1-ratio);
        var old_x = 0;
        var new_x = -4.35*2*GU;
        this.camera.lookAt(new THREE.Vector3(new_x*ratio+old_x*(1-ratio),0,-60*GU));
        var old_y = GU;
        var new_y = 0;
        var ratio = (this.t-16000)/4000;
        this.camera.position.y = new_y*ratio+old_y*(1-ratio);
    }
}

MinecraftScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);
}

MinecraftScene.prototype.initCoorArray = function(){
    this.old_school_coordinates = [
    [0,0,0],
    [0,1,0],
    [0,2,0],
    [0,3,0],
    [0,4,0],
    [0,5,0],
    [0,6,0],
    [1,6,0],
    [2,6,0],
    [3,6,0],
    [4,6,0],
    [5,6,0],
    [7,6,0],
    [8,6,0],
    [8,5,0],
    [8,4,0],
    [8,3,0],
    [8,2,0],
    [8,1,0],
    [8,0,0],
    [7,0,0],
    [6,0,0],
    [5,0,0],
    [4,0,0],
    [3,0,0],
    [2,0,0],
    [1,0,0],
    [0,0,1],
    [0,1,1],
    [0,2,1],
    [0,3,1],
    [0,4,1],
    [0,5,1],
    [0,6,1],
    [1,6,1],
    [2,6,1],
    [3,6,1],
    [4,6,1],
    [5,6,1],
    [7,6,1],
    [8,6,1],
    [8,5,1],
    [8,4,1],
    [8,3,1],
    [8,2,1],
    [8,1,1],
    [8,0,1],
    [7,0,1],
    [6,0,1],
    [5,0,1],
    [4,0,1],
    [3,0,1],
    [2,0,1],
    [1,0,1],
    [0,0,2],
    [0,1,2],
    [0,2,2],
    [0,3,2],
    [0,4,2],
    [0,5,2],
    [0,6,2],
    [1,6,2],
    [2,6,2],
    [3,6,2],
    [4,6,2],
    [5,6,2],
    [6,6,2],
    [7,6,2],
    [8,6,2],
    [8,5,2],
    [8,4,2],
    [8,3,2],
    [8,2,2],
    [8,1,2],
    [8,0,2],
    [7,0,2],
    [6,0,2],
    [5,0,2],
    [4,0,2],
    [3,0,2],
    [2,0,2],
    [1,0,2],
    [1,1,3],
    [1,2,3],
    [1,3,3],
    [1,4,3],
    [1,5,3],
    [2,5,3],
    [3,5,3],
    [4,5,3],
    [5,5,3],
    [6,5,3],
    [7,5,3],
    [7,4,3],
    [7,3,3],
    [7,2,3],
    [7,1,3],
    [6,1,3],
    [5,1,3],
    [4,1,3],
    [3,1,3],
    [2,1,3],
    [2,2,4],
    [2,3,4],
    [2,4,4],
    [3,4,4],
    [4,4,4],
    [5,4,4],
    [6,4,4],
    [6,3,4],
    [6,2,4],
    [5,2,4],
    [4,2,4],
    [3,2,4],
    [3,3,5],
    [4,3,5],
    [5,3,5]
        ];
    this.sign_coordinates = [
    [6,7,2],
    [4,7,2],
    [4,7,1],
    [4,7,0]
    ]
}
