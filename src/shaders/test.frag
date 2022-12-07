precision highp float;

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

varying vec2 vUv;

uniform vec2 resolution;
uniform float uTime;

// You can edit these values to see your changes without a page refresh
const float size = 0.3;
const vec3 boxColor = vec3(0.950, 0.982, 0.470);
const vec3 bgColor = vec3(0.159, 0.164, 0.215);
const float speed = 5.9;

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

float getAngle(float uTime) {
  return sin(uTime * speed) * 0.8 + uTime * 1.3;
}

void main () {
  gl_FragColor = vec4(abs(sin(uTime)),0.0, 1.0,1.0);
}
