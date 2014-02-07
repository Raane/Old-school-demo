FRAME_LENGTH = 20;
DIRTY = true;
_t = t = 0;
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
        window.setTimeout(callback, 0);
    };
})();
window.makeFullscreen = function(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
};

function loop(){
    _t = music.currentTime*1000;
    dt += (_t-old_time);
    old_time = music.currentTime*1000;
    while(dt >= FRAME_LENGTH){
        sm.update();
        t += 20;
        dt-= FRAME_LENGTH;
        DIRTY = true;
    }

    if(DIRTY){
        sm.render();
        DIRTY = false;
    }

    if (!music.ended){
        requestAnimFrame(loop);
    }
}

function start(){
    old_time = 0;
    dt = 0;

    sm = new SceneManager();
    sm.addScene(new OpeningScene());
    sm.addScene(new CubeBuilderScene());
    sm.addScene(new MinecraftScene());
    sm.initScenes(function(){
        sm.warmup();
        readytostart();
    });
}

function readytostart(){
    var wb = document.createElement('div');
    wb.setAttribute('class', 'p-wrapper');
    wb.setAttribute('id', 'startText');
    var b = document.createElement('p');
    b.innerHTML = "Go to fullscreen, then press ENTER to start!";
    var disclaimer = document.createElement('h6');
    disclaimer.innerHTML = "Made by:<br>run";
    b.appendChild(disclaimer);
    b.setAttribute('style', 'z-index: 999');
    wb.appendChild(b);
    document.body.appendChild(wb);
}

function actuallystart(){
    music.play();
    sm.jumpToScene('opening');
    renderer.domElement.style.opacity = 1;
    setTimeout(loop, 0);
}

function bootstrap(){
    document.addEventListener("keydown",function(e){
        if(e.keyCode == /*ENTER*/ 13) {
            document.body.removeChild(document.getElementById('startText'));
            if (notChrome) document.body.removeChild(document.getElementById('notChrome'));
            if (runLocally) document.body.removeChild(document.getElementById('runLocally'));
            setTimeout(actuallystart, 100);
        }

        if(e.keyCode == /*ESC*/ 27){
            window.open('', '_self', ''); //bug fix
            window.close(); 
        }

        if(e.keyCode == /*R*/ 82){
            sm.jumpToScene(sm.activeKey);
        }

        if(e.keyCode == /*LEFT*/ 37){
            sm.jumpToScene(sm.sortedScenes[sm.activeSceneIndex - 1].NAME);
        }

        if(e.keyCode == /*RIGHT*/ 39){
            sm.jumpToScene(sm.sortedScenes[sm.activeSceneIndex + 1].NAME);
        }

        if(e.keyCode == /*SPACE*/ 32){
            music.paused ? music.play() : music.pause();
        }

        if(e.keyCode == /*PLUS*/ 187){
            music.playbackRate *= 1.1;
        }

        if(e.keyCode == /*MINUS*/ 189){
            music.playbackRate /= 1.1;
        }

        if(e.keyCode == /*ZERO*/ 48){
            music.playbackRate = 1;
        }

        if(e.keyCode == /*M*/ 77){
            music.muted = !music.muted;
        }
    });

    renderer = new THREE.WebGLRenderer({ maxLights: 10,antialias:true}); 
    renderer.setClearColor(0x000000, 1);
    renderer.sortObjects = false;
    resize();
    document.body.appendChild(renderer.domElement);
    music = document.getElementById("music");
    setTimeout(start,0);
}


function resize(){
    if(window.innerWidth/window.innerHeight > 16/9){
        GU = (window.innerHeight/9);
        }else{
        GU = (window.innerWidth/16);
    }
    renderer.setSize(16*GU, 9*GU);
    renderer.domElement.style.zIndex = 10;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";
    RENDERTARGET = new THREE.WebGLRenderTarget( 16*GU, 9*GU, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat,
        stencilBuffer: false
    });
}

window.onresize = resize;
