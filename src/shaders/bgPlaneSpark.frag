precision highp float;

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
varying vec2 vUv;
const float PI = 3.1415926535897932384626433832795;

uniform vec2 resolution;
uniform float uTime;
uniform sampler2D uTexture;
vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = uTime*_speed;
       // _st.x -= fract(time)*2.0;
         _st.y -= fract(time)*2.0;
    // if( fract(time)>0.5 ){
    //     if (fract( _st.y * 0.5) > 0.5){
    //         _st.x += fract(time)*2.0;
    //     } else {
    //         _st.x -= fract(time)*2.0;
    //     }
    // } else {
    //     if (fract( _st.x * 0.5) > 0.5){
    //         _st.y += fract(time)*2.0;
    //     } else {
    //         _st.y -= fract(time)*2.0;
    //     }
    // }
    return fract(_st);
}

float circle(vec2 _st, float _radius){
    vec2 pos = vec2(0.5)-_st;
    return smoothstep(1.0-_radius,1.0-_radius+_radius*0.2,1.-dot(pos,pos)*3.14);
}
float rand(float n){return fract(sin(n) * 43758.5453123);}
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}
	
float noise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}
vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

void main () {
  // gl_FragColor = vec4(mix(uColor1, uColor2, vUv.x),1.0);
  // float aStepNoise= noise(uTime*0.3);
  // float bStepNoise= noise(uTime*0.2+0.4);
  // vec2 vUvR= rotate(vUv, sin (uTime*0.35)*0.1-0.1);

  // float b = fract(vUvR.x*0.75);
  // float step1 = 0.0;
  // float step2 = 0.6- aStepNoise*0.15;
  // float step3 = 0.8- bStepNoise*0.15;
  // float step4 = 1.0;
 
  // gl_FragColor =vec4(1.0,0.0,0.0,1.0);
  //  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  //   st.x *= u_resolution.x/u_resolution.y;
  vec2 st=vUv;
  //st.x *= resolution.x/resolution.y;
  // vec2 st1= st/0.58 + vec2(-0.34,-0.3);
  vec4 tex = texture2D(uTexture, st);

  // vec2 st2= st/0.98 + vec2(-1.34,-0.3);
  // vec4 tex2 = texture2D(uTexture, st2);
  // vec4 texSum= tex1+tex2;

  vec2 st4 = movingTiles(st,50.,0.5);
  vec3 color = vec3( circle(st4, 0.14 ) );
  // gl_FragColor = vec4(0.0);
  gl_FragColor = vec4(tex.rgb*color, tex.a*color.r*0.5);
  // gl_FragColor += vec4(vec3(1.0,0.,0.), color.r);

  //gl_FragColor =vec4(vUv.y,0.0,0.0,1.0);
 
}
