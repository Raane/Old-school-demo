function OpeningScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime =0;
    /* short name of this scene, must be defined */
    this.NAME = 'opening';
}

OpeningScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    //this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    var width = 640;
    var height = 320;
    this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    this.scene.add(this.camera);

    this.intro_string = "welcome to";
    this.abellan_strings = new Array();
    this.abellan_strings.add(" $$$$$$\  $$\                 $$\ $$\                           ");
    this.abellan_strings.add("$$  __$$\ $$ |                $$ |$$ |                          ");
    this.abellan_strings.add("$$ /  $$ |$$$$$$$\   $$$$$$\  $$ |$$ |       $$$$$$\  $$$$$$$\  ");
    this.abellan_strings.add("$$$$$$$$ |$$  __$$\ $$  __$$\ $$ |$$ |       \____$$\ $$  __$$\ ");
    this.abellan_strings.add("$$  __$$ |$$ |  $$ |$$$$$$$$ |$$ |$$ |       $$$$$$$ |$$ |  $$ |");
    this.abellan_strings.add("$$ |  $$ |$$ |  $$ |$$   ____|$$ |$$ |      $$  __$$ |$$ |  $$ |");
    this.abellan_strings.add("$$ |  $$ |$$$$$$$  |\$$$$$$$\ $$ |$$$$$$$$\ \$$$$$$$ |$$ |  $$ |");
    this.abellan_strings.add("\__|  \__|\_______/  \_______|\__|\________| \_______|\__|  \__|");

    /*this.text_canvases = new Array();
    for(var i=0;i<1;i++) {
        this.text_canvases[i] = document.createElement('canvas');
        this.text_canvases[i].getContext('2d').font = "30px consolas";
        this.text_canvases[i].getContext('2d').fillStyle = "rgba(255,255,255,1)";
        this.text_canvases[i].getContext('2d').fillText(this.intro_string, 0, 30);
        var texture1 = new THREE.Texture(this.text_canvases[i]); 
        texture1.needsUpdate = true;
        var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
        material1.transparent = true;
        mesh1 = new THREE.Mesh(
            new THREE.PlaneGeometry(this.text_canvases[i].width, this.text_canvases[i].height),
            material1
            );
        mesh1.position.set(-273, 138,0);
        mesh1.scale.set(0.3,0.3,0.3);
//        this.scene.add( mesh1 );
    }*/

    /* call cb when you are done loading! */
    cb();
}

OpeningScene.prototype.reset = function(){
    /* reset all the variables! */
    this.camera.position.z = 300;
}

OpeningScene.prototype.update = function(){
    this.scene.remove(this.intro_text_mesh);
    this.intro_canvas = document.createElement('canvas');
    this.intro_canvas.getContext('2d').font = "30px consolas";
    this.intro_canvas.getContext('2d').fillStyle = "rgba(255,255,255,1)";
    var string_to_show = "";
    if(t<11800) {
        string_to_show = this.intro_string.substring(0,Math.min(Math.floor((t-4000)/800),this.intro_string.length-3));
    } else {
        string_to_show = this.intro_string.substring(0,Math.min(Math.floor((t-6000)/800),this.intro_string.length));
    }
    if(t%(530*2)<530) string_to_show += "_";
    this.intro_canvas.getContext('2d').fillText(string_to_show, 0, 30);
    this.intro_text_texture = new THREE.Texture(this.intro_canvas); 
    this.intro_text_texture.needsUpdate = true;
    this.intro_text_material = new THREE.MeshBasicMaterial( {map: this.intro_text_texture, side:THREE.DoubleSide } );
    this.intro_text_material.transparent = true;
    this.intro_text_mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(this.intro_canvas.width, this.intro_canvas.height),
            this.intro_text_material
            );
    this.intro_text_mesh.position.set(-273, 138,0);
    this.intro_text_mesh.scale.set(0.3,0.3,0.3);
    this.scene.add( this.intro_text_mesh );
/*
    for(var i=0;i<this.abellan_strings.length;i++) {
        this.scene.remove(this.abellan_text_meshes[i]);
        var abellan_canvas = document.createElement('canvas');
        abellan_canvas.getContext('2d').font = "30px consolas";
        abellan_canvas.getContext('2d').fillStyle = "rgba(255,255,255,1)";
        this.string_to_show = "";
        if(t<11800) {
            string_to_show = this.abellan_string.substring(0,Math.min(Math.floor((t-4000)/800),this.abellan_string.length-3));
        } else {
            string_to_show = this.abellan_string.substring(0,Math.min(Math.floor((t-6000)/800),this.abellan_string.length));
        }
        if(t%(530*2)<530) string_to_show += "_";
        abellan_canvas.getContext('2d').fillText(string_to_show, 0, 30);
        var abellan_text_texture = new THREE.Texture(this.abellan_canvas); 
        abellan_text_texture.needsUpdate = true;
        abellan_text_material = new THREE.MeshBasicMaterial( {map: this.abellan_text_texture, side:THREE.DoubleSide } );
        abellan_text_material.transparent = true;
        this.abellan_text_meshes[i] = new THREE.Mesh(
                new THREE.PlaneGeometry(this.abellan_canvases[i].width, this.abellan_canvases[i].height),
                this.abellan_text_material
                );
        this.abellan_text_meshes[i].position.set(-273, 138,0);
        this.abellan_text_meshes[i].scale.set(0.3,0.3,0.3);
        this.scene.add( this.abellan_text_meshes[i] );
*/
    }


    /* do updatey stuff here */
}

OpeningScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);

}
