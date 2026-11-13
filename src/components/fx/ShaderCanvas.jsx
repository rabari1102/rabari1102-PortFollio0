import { useEffect, useRef } from 'react'

// The slow "signal" glow behind the hero. Plain WebGL, no library: one full-screen triangle and
// a fragment shader that domain-warps noise into drifting ribbons of light.
//
// It is deliberately cheap and deliberately optional:
//  - it only starts on wide screens (phones keep the CSS gradient underneath, .glow-fallback),
//  - it waits until the browser is idle, so it never competes with the page becoming usable,
//  - it renders at about half resolution (it is a soft gradient, nobody can tell),
//  - it stops when scrolled out of view or when the tab is hidden,
//  - it draws one still frame for visitors who ask for reduced motion,
//  - and it is skipped when the visitor has asked their browser to save data.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uBg;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform float uGain;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y) * 1.35;
  vec2 m = vec2(uMouse.x * asp, uMouse.y) * 1.35;
  float t = uTime * 0.05;

  // The pointer bends the flow a little, like a hand through smoke.
  vec2 d = p - m;
  float lens = exp(-dot(d, d) * 2.4);
  p += d * lens * 0.22;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t * 1.3)));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.7),
                fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 0.5));
  float f = fbm(p + 2.6 * r);

  vec3 col = uBg;
  col = mix(col, uA, smoothstep(0.30, 0.72, f) * 0.60);
  col = mix(col, uB, smoothstep(0.46, 0.86, f) * clamp(length(q), 0.0, 1.0) * 0.62);
  col = mix(col, uC, smoothstep(0.70, 1.0, f) * r.x * 0.42);
  col += uB * lens * 0.07;

  // Keep the left side and the bottom calm so the headline stays readable.
  float mask = smoothstep(0.05, 0.95, uv.x * 0.80 + uv.y * 0.38);
  mask *= smoothstep(0.0, 0.42, uv.y);
  col = mix(uBg, col, mask * uGain);

  gl_FragColor = vec4(col, 1.0);
}
`

const toRgb = (css) => {
  const m = css.match(/\d+(\.\d+)?/g)
  return m ? m.slice(0, 3).map((n) => Number(n) / 255) : [0, 0, 0]
}

export default function ShaderCanvas({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(min-width: 900px)').matches || navigator.connection?.saveData) return
    let stop = () => {}
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 400))
    const cancelIdle = window.cancelIdleCallback || clearTimeout
    const handle = idle(() => (stop = start(ref.current) || stop), { timeout: 1500 })
    return () => {
      cancelIdle(handle)
      stop()
    }
  }, [])

  return <canvas ref={ref} className={`shader ${className}`} aria-hidden="true" />
}

// Sets up WebGL on the canvas and returns a function that tears it all down again.
function start(canvas) {
  if (!canvas) return
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
  if (!gl) return

  const compile = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
  }
  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return
  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const U = Object.fromEntries(['uRes', 'uTime', 'uMouse', 'uBg', 'uA', 'uB', 'uC', 'uGain'].map((n) => [n, gl.getUniformLocation(prog, n)]))

  // Colours come from the CSS theme, so the canvas follows the light / dark toggle.
  const probe = document.createElement('span')
  probe.style.display = 'none'
  canvas.parentNode.appendChild(probe)
  const readColor = (name) => {
    probe.style.color = `var(${name})`
    return toRgb(getComputedStyle(probe).color)
  }
  const syncTheme = () => {
    gl.uniform3fv(U.uBg, readColor('--bg'))
    gl.uniform3fv(U.uA, readColor('--glow-1'))
    gl.uniform3fv(U.uB, readColor('--glow-2'))
    gl.uniform3fv(U.uC, readColor('--glow-3'))
    gl.uniform1f(U.uGain, document.documentElement.dataset.theme === 'light' ? 0.8 : 0.9)
  }
  syncTheme()

  const resize = () => {
    const scale = Math.min(window.devicePixelRatio || 1, 1) * 0.55
    const w = Math.max(2, Math.round(canvas.clientWidth * scale))
    const h = Math.max(2, Math.round(canvas.clientHeight * scale))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
    gl.uniform2f(U.uRes, w, h)
  }

  const mouse = { x: 0.72, y: 0.6, tx: 0.72, ty: 0.6 }
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect()
    mouse.tx = (e.clientX - r.left) / r.width
    mouse.ty = 1 - (e.clientY - r.top) / r.height
  }

  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const start = performance.now()
  let raf = 0
  let visible = true

  const draw = () => {
    mouse.x += (mouse.tx - mouse.x) * 0.045
    mouse.y += (mouse.ty - mouse.y) * 0.045
    gl.uniform1f(U.uTime, still ? 14 : 14 + (performance.now() - start) / 1000)
    gl.uniform2f(U.uMouse, mouse.x, mouse.y)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  const loop = () => {
    draw()
    raf = requestAnimationFrame(loop)
  }
  const play = () => {
    cancelAnimationFrame(raf)
    if (still) draw()
    else if (visible && !document.hidden) raf = requestAnimationFrame(loop)
  }

  resize()
  canvas.classList.add('is-live')
  play()

  const ro = new ResizeObserver(() => {
    resize()
    if (still) draw()
  })
  ro.observe(canvas)
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    play()
  })
  io.observe(canvas)
  const mo = new MutationObserver(() => {
    syncTheme()
    if (still) draw()
  })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  document.addEventListener('visibilitychange', play)
  window.addEventListener('pointermove', onMove, { passive: true })

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    mo.disconnect()
    document.removeEventListener('visibilitychange', play)
    window.removeEventListener('pointermove', onMove)
    probe.remove()
    canvas.classList.remove('is-live')
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}
