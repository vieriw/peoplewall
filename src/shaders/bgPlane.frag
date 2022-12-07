precision highp float;

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
varying vec2 vUv;

uniform vec2 resolution;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
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
  float aStepNoise= noise(uTime*0.3);
  float bStepNoise= noise(uTime*0.2+0.4);
  vec2 vUvR= rotate(vUv, sin (uTime*0.35)*0.1-0.1);

  float b = fract(vUvR.x*0.75);
  float step1 = 0.0;
  float step2 = 0.6- aStepNoise*0.15;
  float step3 = 0.8- bStepNoise*0.15;
  float step4 = 1.0;
 

  vec3 color = mix(uColor1, uColor2, smoothstep(step1, step2, b));
  color = mix(color, uColor3, smoothstep(step2, step3, b));
  color = mix(color, uColor1, smoothstep(step3, step4, b));
  
   gl_FragColor =vec4(color,1.0);
//gl_FragColor =vec4(0.0,1.0,0.0,1.0);
  //gl_FragColor =vec4(vUv.y,0.0,0.0,1.0);
 
}
