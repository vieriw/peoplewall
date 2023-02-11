precision highp float;

uniform sampler2D uTexture;

varying vec2 vPUv;
varying vec2 vUv;
varying float vAlpha;
void main() {
	vec4 color = vec4(1.0);
	vec2 uv = vUv;
	vec2 puv = vPUv;

	// pixel color
	vec4 colA = texture2D(uTexture, puv);

	// greyscale
	//float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
	//vec4 colB =  colA.r>0.0? vec4(1.0,0.0,0.0,1.0):vec4(0.0,1.0,0.0,1.0);
	//vec4 colB = vec4(grey, grey, grey, 1.0);

	// circle
	float border = 0.3;
	float radius = 0.5;
	float dist = radius - distance(uv, vec2(0.5));
	float t = smoothstep(0.0, border, dist);

 
	// final color
	//color = colB;
	//color.a = t*0.4*vAlpha;
	color.a = t*0.4* vAlpha;
	// color.a = t*0.9;
	gl_FragColor = color;//vec4(color.r*vAlpha,color.g,color.b, color.a);
	//gl_FragColor = vec4(1.0,0.0,1.0,1.0);
}