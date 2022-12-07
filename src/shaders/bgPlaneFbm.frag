precision highp float;

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
varying vec2 vUv;

uniform vec2 resolution;
uniform float uTime;
uniform float uAniTime;
uniform float uScene;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

float colormap_red(float x) {
    if (x < 0.0) {
        return 54.0 / 255.0;
    } else if (x < 20049.0 / 82979.0) {
        return (829.79 * x + 54.51) / 255.0;
    } else {
        return 1.0;
    }
}

float colormap_green(float x) {
    if (x < 20049.0 / 82979.0) {
        return 0.0;
    } else if (x < 327013.0 / 810990.0) {
        return (8546482679670.0 / 10875673217.0 * x - 2064961390770.0 / 10875673217.0) / 255.0;
    } else if (x <= 1.0) {
        return (103806720.0 / 483977.0 * x + 19607415.0 / 483977.0) / 255.0;
    } else {
        return 1.0;
    }
}

float colormap_blue(float x) {
    if (x < 0.0) {
        return 54.0 / 255.0;
    } else if (x < 7249.0 / 82979.0) {
        return (829.79 * x + 54.51) / 255.0;
    } else if (x < 20049.0 / 82979.0) {
        return 127.0 / 255.0;
    } else if (x < 327013.0 / 810990.0) {
        return (792.02249341361393720147485376583 * x - 64.364790735602331034989206222672) / 255.0;
    } else {
        return 1.0;
    }
}

vec4 colormap(float x) {
    return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0);
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
float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}
const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );

float fbm( vec2 p )
{
    float f = 0.0;
    f += 0.500000*noise( p+uTime*0.1  ); p = mtx*p*2.02;
    f += 0.031250*noise( p ); p = mtx*p*1.01;
    f += 0.150000*noise( p ); p = mtx*p*2.03;
    //f += 0.125000*noise( p ); p = mtx*p*2.01;
 //   f += 0.062500*noise( p ); p = mtx*p*2.04;
  //  f += 0.015625*noise( p + sin(iTime) );

    //return f/0.531250;
     return f/.71250;
}

float pattern( in vec2 p )
{
 // return fbm( p + fbm( p + fbm( p ) ) );
    return fbm( p + fbm( p ) );
 //    return fbm( p);

}

void main () {
  // gl_FragColor = vec4(mix(uColor1, uColor2, vUv.x),1.0);

  float step1 = 0.3;
  float step2= 0.4;
  float iTime= uTime*1.0;
  //vec2 tUV= vec2(vUv.x+ iTime*0.16, vUv.y*0.3+iTime*0.023);
 // vec2 tUV= vec2(vUv.x, vUv.y*0.3);
 // vec2 xUV= tUV *vec2(2.0,1.0)*2.0;
 //float shade = pattern(xUV );
 vec2 _vUv=vUv;
  float xnoise;
  if (uScene>=0.5){     
    float t= uTime-uAniTime;
    // _vU(v= rotate(vUv, 1.3*smoothstep(0.0, .5, uTime));
   // _vUv= rotate(vUv, -t);
   
    _vUv= vec2(vUv.x,vUv.y+t*0.03);
  }else
  {
     float tempy= min(0.0, -1.2 + pow(uTime,0.32)*0.75);
     float tempx= min(0.0, -1.0 + pow(uTime,0.28)*0.65);

     xnoise= fbm(vUv*0.3)*tempx;
     _vUv= vec2(vUv.x,vUv.y +tempy);
  }
  // vec3 color = mix(uColor1, uColor2, smoothstep(step1, step2, shade));
  // color = mix(color, uColor3, smoothstep(step2, step3,shade));
  // color = mix(color, uColor1, smoothstep(step3, step4, shade));

 // gl_FragColor = vec4(colormap(shade).rgb, shade);
 //   gl_FragColor = vec4(mix(uColor1, uColor3, shade),1.0);
 //vec3 uColorR= vec3(0.592,0.208,0.349);
  vec3 uColorR= vec3( 0.376,0.549,1.);

 vec3 uColorB= vec3(0.0,0.0,1.0);
 vec3 uColorD= vec3(0.0,0.0,0.0);
 float a= vUv.y;
 // vec3 color;
  // if (a< 0.3){
  // color = mix(uColorD, uColorR, smoothstep(0.0, 0.3, vUv.y));
  // }
  // else{
  // color = mix(uColorR, uColorB, smoothstep(step1,1.0,vUv.y)*4.0);   
  // }
  vec3 colorRU= mix(uColorR, uColor3, min(1.0,uTime*0.15));
  vec3 color = mix(colorRU, uColor2, smoothstep(0.0, step1, _vUv.y+xnoise-0.1));
  color = mix(color, uColor1, smoothstep(step1, 1.0, _vUv.y));
 
  
  gl_FragColor=vec4(color,1.0);
//  float weight= 0.5+0.5*sin(vUv.y*14.0+uTime*1.);
//  vec3 colorRange=  mix(_color1, _color2,weight);
//  vec3 finalC=  mix(_color2, colorRange, smoothstep(vUv.y-0.1,vUv.y+0.1, 0.3));
//  gl_FragColor =vec4(finalC,1.0);
 
  //gl_FragColor =vec4(vUv.y,0.0,0.0,1.0);
 
}
