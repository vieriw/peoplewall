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
uniform sampler2D uTexture;
vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}
void main () {
  vec3 uColor4= vec3(1.,0.361,0.361);
  vec3 uColor5= vec3(0.992,0.22,0.4);
  vec3 uColor6= vec3(1.,0.722,0.722);
  // vec3 uColor4= vec3(1.,0.361,0.361);
  // vec3 uColor5= vec3(0.0,0.0,1.0);
  // vec3 uColor6= vec3(0.0,0.0,0.0);
  float step1= 0.4;
  float step2= 0.8;
  //float step2= 0.98;
  vec2 _vUv=vec2( vUv.x, vUv.y);
  //_vUv= rotate(_vUv, 0.5);
  _vUv*=0.6;
  _vUv.x-= 0.2*uTime;
 
  _vUv= rotate(_vUv, 0.4);
   _vUv = fract(_vUv);
  vec3 color = mix(uColor4, uColor5, smoothstep(0.0, step1, _vUv.x));
  color = mix(color, uColor6, smoothstep(step1, step2, _vUv.x));
  color = mix(color, uColor4, smoothstep(step2, 1.0, _vUv.x));
  gl_FragColor=vec4(color,1.0) ;
  vec4 tex = texture2D(uTexture, vUv);
   gl_FragColor =vec4(tex.rgb*color, tex.a);
  
 // gl_FragColor =vec4(vUv.y,0.0,0.0,1.0);
 
}
