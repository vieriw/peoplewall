precision highp float;

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

varying vec2 vUv;

uniform vec2 resolution;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;

float circle(in vec2 _st, in float _radius){
  vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

float circleBlur(in vec2 _st, in float _radius, in float _blur){
  vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*_blur),
                         _radius,
                         dot(dist,dist)*4.0);
}
void main () {
  
  float circleCanvas= circle(vUv,0.7);
 // if (circleCanvas<0.01) discard;
  vec2 st1 = vUv;
 
  vec2 translate =vec2(cos(uTime*0.5)*0.3+0.2,sin(uTime*0.7+0.0)*0.2-0.2);
  //translate= vec2(0.4,0.4);

  st1 += translate*0.7110;
  float circleHighlight1= circleBlur(st1,1.975,2.4);
   
 
  vec3 finalColor =  mix(uColor1,uColor2, circleHighlight1);
 // vec4 color1C =  vec4(uColor1*circleHighlight1, 1.*circleHighlight1);
  
 
 
  //finalColor= mix(color1C, vec4(1.0,0.0,0.0,1.0), 1.0-color1C.a);
  gl_FragColor=  vec4( 1.0,0.0,1.,circleBlur(vUv,0.7,0.72));
 gl_FragColor=  vec4( finalColor.rgb,circleBlur(vUv,0.7,1.72)*1.5);
  //gl_FragColor=  vec4( finalColor.rgb,1.0);
}
