var AsciiShader = {

    uniforms: {
        tAscii: {type:'t', value: THREE.ImageUtils.loadTexture('res/ascii.png')},
        tDiffuse: { type: 't', value: null }
    },

    vertexShader: [
        "varying vec2 vUv;",
        
        "void main() {",
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}",
    ""].join("\n"),

    fragmentShader: [
        "uniform sampler2D tDiffuse;",
        "uniform sampler2D tAscii;",
        "varying vec2 vUv;",
        
        "void main() {",
            "float w = 100.;",
            "vec2 ratio = vec2(16.,9.)*w/16.;",
            "vec4 texel = vec4(1.);",
            "texel = 0.1 + 0.9*texture2D( tDiffuse, floor(vUv*ratio) / ratio);",
            "float gray = (texel.x + texel.y + texel.z)/3.01;",
            "gray = floor(gray*8.)/8.;",
            "gl_FragColor = texel * texture2D(tAscii, vec2(",
                "gray + (vUv.x-floor(vUv.x*ratio.x)/ratio.x) / (1./ratio.x) * 1./8.,",
                "7./8. + (vUv.y-floor(vUv.y*ratio.y)/ratio.y) / 8. * ratio.y",
            "));",
        "}",
    ""].join("\n")
}

///AsciiShader.uniforms.ascii.value.wrapS = AsciiShader.uniforms.ascii.value.wrapT = THREE.RepeatWrapping; 
