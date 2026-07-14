'use client'

import { useEffect, useRef } from 'react'

// 1:1 port of Framer "Animated Shader 2.0" (FluidBackground), default Halftone style.
// GLSL is verbatim from the source module; Three.js scaffolding replaced with raw WebGL.

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform int uStyle;
uniform float uTime;
uniform vec2 uResolution;

uniform vec3 uChromeDark;  uniform vec3 uChromeMid;   uniform vec3 uChromeLight;
uniform vec3 uRibBase;     uniform vec3 uRibHigh1;    uniform vec3 uRibHigh2;
uniform vec3 uFinBase;     uniform vec3 uFinMid;      uniform vec3 uFinHigh;
uniform vec3 uAbyssBase;   uniform vec3 uAbyssMid;    uniform vec3 uAbyssHigh;
uniform vec3 uWebBase;     uniform vec3 uWebMid;      uniform vec3 uWebHigh;

uniform float uSpeed;
uniform float uScale;
uniform float uDistortion;
uniform float uBrightness;
uniform float uRefraction;

varying vec2 vUv;

float skewedTri(float x, float s) {
    float f = fract(x);
    float val = f < s ? (f / s) : (1.0 - (f - s) / (1.0 - s));
    return smoothstep(0.0, 1.0, val);
}

float mapChrome(vec2 p, float t) {
    float a = 0.6; mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    p = rot * p; p.x *= 0.35; p.y *= 1.4;
    float h = 0.0, amp = 1.0, freq = 1.8;
    vec2 q = p;
    for(int i = 0; i < 5; i++) {
        q += vec2(sin(q.y * 1.2 + t * 0.6), cos(q.x * 1.4 - t * 0.5)) * uDistortion * 0.15;
        h += sin(q.y * freq + t * 0.8) * amp;
        q *= 1.4;
        mat2 rot2 = mat2(cos(0.35), -sin(0.35), sin(0.35), cos(0.35));
        q = rot2 * q; amp *= 0.45;
    }
    return h;
}

float mapRibs(vec2 p, float t) {
    float a = -0.55; mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    vec2 q = rot * p;
    q.x += sin(q.y * 1.5 + t * 0.3) * 0.1 * uDistortion;
    q.x += sin(q.y * 3.0 - t * 0.2) * 0.05 * uDistortion;
    return sin(q.x * 25.0 * uScale) * 0.15;
}

float mapFins(vec2 p, float t) {
    float a = -0.6; mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    vec2 q = rot * p;
    q.x += sin(q.y * 1.2 + t * 0.25) * 0.2 * uDistortion;
    q.y += cos(q.x * 1.0 - t * 0.2) * 0.2 * uDistortion;
    float phase = q.x * 3.5 * uScale + sin(q.y * 2.0 * uScale) * 1.5;
    float fin = skewedTri(phase, 0.85);
    float pocketPhase = q.y * 4.0 * uScale + q.x * 2.0;
    float pocket = smoothstep(0.1, 0.9, sin(pocketPhase - t * 1.0) * 0.5 + 0.5);
    return (fin * mix(0.15, 1.0, pocket) + sin(q.x * 1.5) * 0.15) * 0.35;
}

float mapAbyss(vec2 p, float t) {
    vec2 q = p; float h = 0.0, amp = 1.0;
    q.x += sin(t * 0.2) * 0.5; q.y += cos(t * 0.15) * 0.5;
    for(int i = 0; i < 5; i++) {
        float angle = h * 2.5 + t * 0.4;
        q += vec2(cos(angle), sin(angle)) * 0.2 * uDistortion;
        h += sin(q.x * 1.4 + t * 0.3) * cos(q.y * 1.4 - t * 0.2) * amp;
        q *= 1.5; q = mat2(cos(0.6), -sin(0.6), sin(0.6), cos(0.6)) * q;
        amp *= 0.55;
    }
    return h;
}

float mapWeb(vec2 p, float t) {
    vec2 q = p;
    q += vec2(t * 0.15, -t * 0.1);
    float h = 0.0;
    float amp = 1.0;
    for(int i = 0; i < 3; i++) {
        float warpX = sin(q.y * 1.2 + t * 0.8) * uDistortion * 0.3;
        float warpY = cos(q.x * 1.1 - t * 0.6) * uDistortion * 0.3;
        q += vec2(warpX, warpY);
        h += sin(q.x * 1.5) * cos(q.y * 1.5) * amp;
        q = mat2(cos(0.6), -sin(0.6), sin(0.6), cos(0.6)) * q * 1.4;
        amp *= 0.5;
    }
    return h;
}

void main() {
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;
    p *= uScale;

    float t = uTime * uSpeed * 0.5;
    vec3 finalColor = vec3(0.0);

    if (uStyle == 0) {
        float h = mapChrome(p, t);
        vec2 eps = vec2(0.01, 0.0);
        float nx = mapChrome(p + eps.xy, t) - h;
        float ny = mapChrome(p + eps.yx, t) - h;
        vec3 normal = normalize(vec3(nx, ny, 0.008));
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 ref = reflect(-viewDir, normal);
        ref.xy += normal.xy * uRefraction * 0.05;

        float topLight = smoothstep(0.1, 0.7, ref.y);
        float bottomLight = smoothstep(-0.2, -0.6, ref.y) * 0.2;
        float sideLight1 = smoothstep(0.6, 0.9, ref.x) * 0.4;
        float sideLight2 = smoothstep(0.6, 0.9, -ref.x) * 0.2;
        float lightTube = smoothstep(0.9, 0.98, sin(ref.y * 12.0)) * 0.5;
        float totalReflection = topLight + bottomLight + sideLight1 + sideLight2 + lightTube;

        vec3 color = mix(uChromeDark, uChromeMid, smoothstep(-0.8, 0.8, h));
        color = mix(color, uChromeLight, smoothstep(0.3, 1.1, totalReflection));

        vec3 halfDir = normalize(normalize(vec3(0.5, 1.5, 1.0)) + viewDir);
        color += uChromeLight * pow(max(dot(normal, halfDir), 0.0), 80.0) * uBrightness;

        color *= mix(0.15, 1.0, smoothstep(-1.2, 1.0, h));
        color *= smoothstep(1.0, 0.2, length(vUv - 0.5) * 0.7);
        finalColor = color;

    } else if (uStyle == 1) {
        float h = mapRibs(p, t);
        vec2 eps = vec2(0.01, 0.0);
        float nx = mapRibs(p + eps.xy, t) - h;
        float ny = mapRibs(p + eps.yx, t) - h;
        vec3 normal = normalize(vec3(nx, ny, 0.03));
        vec3 viewDir = vec3(0.0, 0.0, 1.0);

        vec3 color = uRibBase;
        float areaOrange = smoothstep(1.5, -0.5, p.x + p.y);
        float areaBlue = smoothstep(-1.5, 0.5, p.x + p.y);

        color += uRibHigh2 * smoothstep(0.0, 0.8, -normal.x) * areaOrange * 2.0;
        color += uRibHigh1 * smoothstep(0.0, 0.8, normal.x) * areaBlue * 2.0;

        vec3 halfDir = normalize(normalize(vec3(0.5, 0.5, 1.0)) + viewDir);
        color += vec3(1.0) * pow(max(dot(normal, halfDir), 0.0), 50.0) * uBrightness * 0.5;

        color *= mix(0.1, 1.0, smoothstep(-0.15, 0.15, h));
        color *= smoothstep(1.2, 0.2, length(vUv - 0.5) * 0.8);
        finalColor = color;

    } else if (uStyle == 2) {
        float h = mapFins(p, t);
        vec2 eps = vec2(0.01, 0.0);
        float nx = mapFins(p + eps.xy, t) - h;
        float ny = mapFins(p + eps.yx, t) - h;
        vec3 normal = normalize(vec3(nx, ny, 0.05));
        vec3 viewDir = vec3(0.0, 0.0, 1.0);

        vec3 lightDir1 = normalize(vec3(-0.8, 1.0, 0.8));
        float diff1 = max(dot(normal, lightDir1), 0.0);
        vec3 color = mix(uFinBase, uFinMid, smoothstep(-0.05, 0.35, h + diff1 * 0.3));
        color = mix(color, uFinHigh, smoothstep(0.5, 0.95, diff1));

        color += uFinHigh * pow(max(dot(normal, normalize(lightDir1 + viewDir)), 0.0), 40.0) * uBrightness * 0.8;
        color += mix(uFinMid, vec3(1.0), 0.5) * pow(max(dot(normal, normalize(normalize(vec3(1.0, -1.0, 0.4)) + viewDir)), 0.0), 20.0) * uBrightness * 0.3;

        color *= mix(0.15, 1.0, smoothstep(0.0, 0.12, h));
        color *= smoothstep(1.3, 0.2, length(vUv - 0.5) * 0.8);
        finalColor = color;

    } else if (uStyle == 3) {
        float h = mapAbyss(p, t);
        vec2 eps = vec2(0.01, 0.0);
        float nx = mapAbyss(p + eps.xy, t) - h;
        float ny = mapAbyss(p + eps.yx, t) - h;
        vec3 normal = normalize(vec3(nx, ny, 0.2));

        vec2 rUV = p + normal.xy * uRefraction * 0.1;
        vec2 gUV = p + normal.xy * uRefraction * 0.05;
        vec2 bUV = p;

        float hR = mapAbyss(rUV, t);
        float hG = mapAbyss(gUV, t);
        float hB = mapAbyss(bUV, t);

        vec3 color = uAbyssBase;
        float avgH = (hR + hG + hB) / 3.0;
        color = mix(color, uAbyssMid, smoothstep(-0.5, 0.5, avgH));

        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir = normalize(normalize(vec3(0.5, 0.8, 1.0)) + viewDir);
        float spec = pow(max(dot(normal, halfDir), 0.0), 30.0);

        color += uAbyssHigh * vec3(smoothstep(0.1, 1.0, hR), smoothstep(0.1, 1.0, hG), smoothstep(0.1, 1.0, hB)) * uBrightness * 0.8;
        color += vec3(1.0) * spec * uBrightness * 0.3;

        color *= mix(0.1, 1.0, smoothstep(-0.8, 0.4, avgH));
        color *= smoothstep(1.3, 0.1, length(vUv - 0.5) * 0.8);
        finalColor = color;

    } else {
        // --- 4: HALFTONE ---
        float h = mapWeb(p, t);

        float luma = smoothstep(-1.2, 1.2, h);
        luma = pow(luma, 1.5);
        luma = smoothstep(0.0, 0.9, luma);

        vec2 screenUv = vUv * uResolution;

        float angle = 0.785398;
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        vec2 grid = rot * screenUv;

        float freq = 1.2;
        grid *= freq;

        float dotPattern = (sin(grid.x) + sin(grid.y)) * 0.5;
        dotPattern = dotPattern * 0.5 + 0.5;

        float aa = 0.05;
        float mask = smoothstep(dotPattern - aa, dotPattern + aa, luma);

        vec3 color = mix(uWebBase, uWebMid, smoothstep(0.0, 0.6, luma));
        color = mix(color, uWebHigh, mask);

        color += uWebHigh * smoothstep(0.7, 1.0, luma) * 0.15;

        color *= smoothstep(1.5, 0.1, length(vUv - 0.5) * 0.9);
        finalColor = color * uBrightness;
    }

    gl_FragColor = vec4(finalColor, 1.0);
}
`

// Exact defaults from the Framer module, locked to the Chrome style
const DEFAULTS = {
  style: 0,
  // Midtones/highlights dialed down from the Framer defaults (#2a2a2a / #ffffff)
  // so white body text stays readable over the liquid metal.
  chromeDark: '#000000', chromeMid: '#161616', chromeLight: '#8a8a8a',
  ribBase: '#110a2b', ribHigh1: '#00b3ff', ribHigh2: '#ff4d00',
  finBase: '#0a1157', finMid: '#0a3bcc', finHigh: '#7cf0d8',
  abyssBase: '#000508', abyssMid: '#003328', abyssHigh: '#29ffd4',
  webBase: '#0a1319', webMid: '#505f7f', webHigh: '#e0daee',
  speed: 0.3, scale: 1, distortion: 2.5, brightness: 0.8, refraction: 1,
}

// THREE.Color converts sRGB hex to linear working space before uploading;
// replicate that so the rendered tones match the Framer original exactly.
function hexToLinear(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  const srgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => c / 255)
  return srgb.map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  ) as [number, number, number]
}

export function PixelPattern() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const canvas = document.createElement('canvas')
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    container.appendChild(canvas)

    const gl =
      canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }) || canvas.getContext('experimental-webgl')
    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      container.removeChild(canvas)
      return
    }

    const pixelRatio = Math.min(window.devicePixelRatio, 2)
    let width = container.clientWidth
    let height = container.clientHeight

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
    gl.linkProgram(program)
    gl.useProgram(program)

    // Fullscreen quad (equivalent of PlaneGeometry(2,2) + Ortho camera)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )
    const positionLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(program, name)

    // Static uniforms — exact defaults from the Framer component
    gl.uniform1i(u('uStyle'), DEFAULTS.style)
    gl.uniform3fv(u('uChromeDark'), hexToLinear(DEFAULTS.chromeDark))
    gl.uniform3fv(u('uChromeMid'), hexToLinear(DEFAULTS.chromeMid))
    gl.uniform3fv(u('uChromeLight'), hexToLinear(DEFAULTS.chromeLight))
    gl.uniform3fv(u('uRibBase'), hexToLinear(DEFAULTS.ribBase))
    gl.uniform3fv(u('uRibHigh1'), hexToLinear(DEFAULTS.ribHigh1))
    gl.uniform3fv(u('uRibHigh2'), hexToLinear(DEFAULTS.ribHigh2))
    gl.uniform3fv(u('uFinBase'), hexToLinear(DEFAULTS.finBase))
    gl.uniform3fv(u('uFinMid'), hexToLinear(DEFAULTS.finMid))
    gl.uniform3fv(u('uFinHigh'), hexToLinear(DEFAULTS.finHigh))
    gl.uniform3fv(u('uAbyssBase'), hexToLinear(DEFAULTS.abyssBase))
    gl.uniform3fv(u('uAbyssMid'), hexToLinear(DEFAULTS.abyssMid))
    gl.uniform3fv(u('uAbyssHigh'), hexToLinear(DEFAULTS.abyssHigh))
    gl.uniform3fv(u('uWebBase'), hexToLinear(DEFAULTS.webBase))
    gl.uniform3fv(u('uWebMid'), hexToLinear(DEFAULTS.webMid))
    gl.uniform3fv(u('uWebHigh'), hexToLinear(DEFAULTS.webHigh))
    gl.uniform1f(u('uSpeed'), DEFAULTS.speed)
    gl.uniform1f(u('uScale'), DEFAULTS.scale)
    gl.uniform1f(u('uDistortion'), DEFAULTS.distortion)
    gl.uniform1f(u('uBrightness'), DEFAULTS.brightness)
    gl.uniform1f(u('uRefraction'), DEFAULTS.refraction)

    const uTime = u('uTime')
    const uResolution = u('uResolution')

    const setSize = () => {
      canvas.width = Math.max(1, Math.floor(width * pixelRatio))
      canvas.height = Math.max(1, Math.floor(height * pixelRatio))
      gl.viewport(0, 0, canvas.width, canvas.height)
      // Framer passes logical (CSS) size — keeps halftone dot frequency identical
      gl.uniform2f(uResolution, width, height)
    }
    setSize()

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width
        height = entry.contentRect.height
        setSize()
      }
    })
    resizeObserver.observe(container)

    // Viewport gating (performance) — same as the original
    let isIntersecting = true
    const intersectionObserver = new IntersectionObserver((entries) => {
      isIntersecting = entries[0].isIntersecting
    })
    intersectionObserver.observe(container)

    const start = performance.now()
    let frameId: number

    const draw = () => {
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!isIntersecting) return
      draw()
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      const ext = gl.getExtension('WEBGL_lose_context')
      ext?.loseContext()
      if (container.contains(canvas)) container.removeChild(canvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        ref={mountRef}
        className="absolute inset-0"
        style={{ backgroundColor: '#000' }}
      />
      {/* Dark scrim so text stays readable over the shader's bright highlights */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  )
}
