function OpeningScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime =0;
    /* short name of this scene, must be defined */
    this.NAME = 'opening';
}

OpeningScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    var width = 640;
    var height = 320;
    this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    //this.scene.add(this.camera);

    this.abellan_type_speed = 100;
    this.welcome_to_type_speed = 600;
    this.caret_frequency = 520;
    this.welcome_delay = 3000;
    this.to_delay = 1500;
    this.to_type_time = 10600;
    this.abellan_delay = 14400;

    this.intro_string = "welcome to";
    this.abellan_strings = new Array();
    this.abellan_strings[0] = [" $$$$$$\\  $$\\     ","            $$\\ $$","\\                 ","          "];
    this.abellan_strings[1] = ["$$  __$$\\ $$ |    ","            $$ |$$"," |                ","          "];
    this.abellan_strings[2] = ["$$ /  $$ |$$$$$$$\\","   $$$$$$\\  $$ |$$"," |       $$$$$$\\  ","$$$$$$$\\  "];
    this.abellan_strings[3] = ["$$$$$$$$ |$$  __$$","\\ $$  __$$\\ $$ |$$"," |       \\____$$\\ ","$$  __$$\\ "];
    this.abellan_strings[4] = ["$$  __$$ |$$ |  $$"," |$$$$$$$$ |$$ |$$"," |       $$$$$$$ |","$$ |  $$ |"];
    this.abellan_strings[5] = ["$$ |  $$ |$$ |  $$"," |$$   ____|$$ |$$"," |      $$  __$$ |","$$ |  $$ |"];
    this.abellan_strings[6] = ["$$ |  $$ |$$$$$$$ "," |\\$$$$$$$\\ $$ |$$","$$$$$$\\ \\$$$$$$$ |","$$ |  $$ |"];
    this.abellan_strings[7] = ["\\__|  \\__|\\_______","/  \\_______|\\__|\\_","_______| \\_______|","\\__|  \\__|"];

    this.abellan_text_meshes = new Array();
    this.abellan_canvases = new Array();
    for(var i=0;i<8;i++) {
        this.abellan_text_meshes[i] = new Array();
        this.abellan_canvases[i] = new Array();
    }
    
    /* call cb when you are done loading! */
    cb();
}

OpeningScene.prototype.reset = function(){
    /* reset all the variables! */
    this.camera.position.z = 300;
}

OpeningScene.prototype.update = function(){
    if((t%this.caret_frequency)==0 || (t%this.welcome_to_type_speed)==0) {
        console.log("updateIntro");
        this.scene.remove(this.intro_text_mesh);
        this.intro_canvas = document.createElement('canvas');
        this.intro_canvas.getContext('2d').font = "30px consolas";
        this.intro_canvas.getContext('2d').fillStyle = "rgba(255,255,255,1)";
        var string_to_show = "";
        if(t<this.to_type_time) {
            string_to_show = this.intro_string.substring(0,Math.min(Math.floor((t-this.welcome_delay)/800),this.intro_string.length-3));
        } else {
            string_to_show = this.intro_string.substring(0,Math.min(Math.floor((t-this.welcome_delay-this.to_delay)/800),this.intro_string.length));
        }
        if(t%(this.welcome_to_type_speed*2)<this.welcome_to_type_speed) string_to_show += "_";
        this.intro_canvas.getContext('2d').fillText(string_to_show, 0, 30);
        this.intro_text_texture = new THREE.Texture(this.intro_canvas); 
        this.intro_text_texture.needsUpdate = true;
        this.intro_text_material = new THREE.MeshBasicMaterial( {map: this.intro_text_texture, side:THREE.DoubleSide } );
        this.intro_text_material.transparent = true;
        this.intro_text_mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(this.intro_canvas.width, this.intro_canvas.height),
                this.intro_text_material
                );
        this.intro_text_mesh.position.set(-264, 138,0);
        this.intro_text_mesh.scale.set(0.35,0.3,0.3);
        this.scene.add( this.intro_text_mesh );
    }
    if((t%this.abellan_type_speed)==0) {
        console.log("updateAbelLan");
        for(var j=0;j<this.abellan_strings[0].length;j++) {
            for(var i=0;i<this.abellan_strings.length;i++) {
                
                this.scene.remove(this.abellan_text_meshes[i][j]);
                //renderer.deallocateObject(this.abellan_text_meshes[i][j]);
                this.abellan_canvases[i][j] = document.createElement('canvas');
                this.abellan_canvases[i][j].getContext('2d').font = "30px consolas";
                this.abellan_canvases[i][j].getContext('2d').fillStyle = "rgba(255,255,255,1)";
                this.string_to_show = "";
                var string_to_show = this.abellan_strings[i][j].substring(0,Math.min(Math.floor((t-this.abellan_delay-j*this.abellan_type_speed*this.abellan_strings[i][0].length)/this.abellan_type_speed),this.abellan_strings[i][j].length));
                this.abellan_canvases[i][j].getContext('2d').fillText(string_to_show, 0, 30);
                var abellan_text_texture = new THREE.Texture(this.abellan_canvases[i][j]); 
                abellan_text_texture.needsUpdate = true;
                abellan_text_material = new THREE.MeshBasicMaterial( {map: abellan_text_texture, side:THREE.DoubleSide } );
                abellan_text_material.transparent = true;
                this.abellan_text_meshes[i][j] = new THREE.Mesh(
                        new THREE.PlaneGeometry(this.abellan_canvases[i][j].width, this.abellan_canvases[i][j].height),
                        abellan_text_material
                        );
                this.abellan_text_meshes[i][j].position.set(-125+100*j, 20-i*8,0);
                this.abellan_text_meshes[i][j].scale.set(0.35,0.3,0.3);
                this.scene.add( this.abellan_text_meshes[i][j] );
            }
        }
    }

    /* do updatey stuff here */
}

OpeningScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);

}
