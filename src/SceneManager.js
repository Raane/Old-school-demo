function SceneManager(){
    this.scenes = {};
    this.activeScene = null;
    this.activeKey = '';
    this.activeSceneIndex = -1;
    this.sortedScenes = [];
}

SceneManager.prototype.addScene = function(scene){
    this.scenes[scene.NAME] = scene; 
    this.sortedScenes.push(scene);
};


SceneManager.prototype.initScenes = function(cb){
    var numberOfScenes = 0;
    for(var scene in this.scenes){numberOfScenes++;}
    function initcb(){
        if(!--numberOfScenes){
            cb();
        }
    }
    this.sortedScenes = this.sortedScenes.sort(function(a,b){ return a.startTime - b.startTime; });
    for(var scene in this.scenes){
        this.scenes[scene].init(initcb);
    }
};

SceneManager.prototype.jumpToScene = function(key, dontResetMusic){
    this.activeKey = key;
    this.activeScene = this.scenes[key];
    this.activeScene.reset();
    for(var i=0;i<this.sortedScenes.length;i++){
        if(this.activeScene == this.sortedScenes[i]){
            break;
        }
    }
    this.activeSceneIndex = i;
    if(!dontResetMusic){
        old_time = t = _t = this.activeScene.startTime;
        dt = 0;
        music.currentTime = this.activeScene.startTime / 1000;
    }
};

SceneManager.prototype.update = function(){
    this.activeSceneIndex + 1 < this.sortedScenes.length && this.sortedScenes[this.activeSceneIndex+1].update();
    this.activeScene.update();
    if(this.activeSceneIndex + 1 < this.sortedScenes.length &&
       this.sortedScenes[this.activeSceneIndex+1].startTime <= t){
        this.jumpToScene(this.sortedScenes[this.activeSceneIndex+1].NAME, 'dont reset music');
    }
};

SceneManager.prototype.render = function(){
    this.activeSceneIndex + 1 < this.sortedScenes.length && this.sortedScenes[this.activeSceneIndex+1].render();
    this.activeScene.render();
};

SceneManager.prototype.warmup = function(){
    renderer.domElement.style.opacity = 0;
    for(var scene in this.scenes){
        this.scenes[scene].update();
    }
};
