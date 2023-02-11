precision highp float;

attribute vec3 pindex;
attribute vec3 position;
attribute vec3 offset;
attribute vec2 uv;
attribute float angle;
attribute float timeDiff;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uScene;
uniform float uTime;
uniform float uAniTime;
uniform float uRandom;
uniform float uDepth;
uniform float uSize;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform sampler2D uTouch;

varying vec2 vPUv;
varying vec2 vUv;
varying float vAlpha;

float random(float n) {
	return fract(sin(n) * 43758.5453123*uRandom);
}
vec3 permute(vec3 x) { return mod(((x*34.0+uRandom*4.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
void main() {
	vUv = uv;
 
	// particle uv
	vec2 puv = offset.xy / uTextureSize;
	vPUv = puv;

	// pixel color
	// vec4 colA = texture2D(uTexture, puv);
	// float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;

	// displacement
	vec3 displaced = offset;
	// center
	displaced.xy -= uTextureSize * 0.5;
    vec3 target=displaced; 
	vec3 randomPos= displaced;
	
	randomPos.xy += 140.0*vec2(random(pindex.z) - 0.5, random(offset.x + pindex.z) - 0.5) ;
    float rndz = (random(pindex.z) + snoise(vec2(pindex.z * 0.1, uTime * 0.1)));
	// displaced.z +=  (random(pindex) * 2.0 * uDepth);


	//float timeNoise=  snoise(vec2(pindex * 0.1, uTime * 0.1));
	//float minTime=  sin(uTime*0.5+ +pindex * 0.0+timeNoise*0.0)*0.01+1.4;
	//displaced= mix(randomPos, target, min(minTime,uTime* 0.2));
   // displaced= mix(randomPos, target, -0.4+ pow(uTime,0.3)*0.6);
   //time difference

 	float a= timeDiff+1.4;
	float b= timeDiff+1.0;
  	float dipslacedTl=0.0;
    if (uScene<0.5){
		dipslacedTl= -0.4-timeDiff+ min(a,pow(uTime*0.2,1.34));
	}else{
		dipslacedTl=  1.0- min(b,pow((uTime-uAniTime)*0.1,1.64));
	}

	//float parTime= min(1.0, uTime*0.1) ;
    //displaced= mix(randomPos, target, dipslacedTl);
	displaced=mix(randomPos, target, dipslacedTl);

	//displaced.xy+= 60.0*vec2(random(pindex.z+30.)-0.5 , random(offset.x+pindex.z*3.0 )  - 0.5)* parTime;
	// touch
	// float t = texture2D(uTouch, puv).r;
	 //displaced.z += t * 20.0 * rndz;
	displaced.x += cos(angle) * (1.0-  dipslacedTl)*  10.0 ;
    displaced.y += sin(angle) * (1.0-  dipslacedTl) *10.0 ;

	// particle size
	// float psize = (snoise_1_2(vec2(uTime, pindex) * 0.5) + 2.0);
	// psize *= max(grey, 0.2);
	float timePass= sin((pindex.x+pindex.y)*3.14/2.0 + uTime*0.25+1.1);
	//float test=step(0.999,dipslacedTl);
    vAlpha = 2.0+timePass*dipslacedTl*0.7;
	if (uScene>0.5){
		vAlpha-= pow((uTime-uAniTime)*0.12,2.2);
	}
	//vAlpha+=  dipslacedTl ;
	vAlpha*= min(1.0,uTime*1.5+0.0);
	float vSize= timePass*0.5+0.5 ;
	//float show= step(vAlpha,0.8)
  	float psize=uSize* 1.0 + uSize*2.0*vSize;

	
 
	// final position
	vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
	mvPosition.xyz += position * psize;
	vec4 finalPosition = projectionMatrix * mvPosition;

	gl_Position = finalPosition;
// gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}