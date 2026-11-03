import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// A small floating island with my home studio on it, and the three kinds of software I build
// (web, mobile, desktop) orbiting around it. Everything is generated in code: no models, no images.
// Studio lighting + bevelled shapes give it the look of a stylised Blender render.

const PALETTE = {
  grass: ['#7cc46a', '#6bb35a', '#8fd17a'],
  grassLip: '#4f9a45',
  soil: ['#a0612f', '#8b5427'],
  rock: ['#e4d3bd', '#d2bea3', '#bea78a'],
  plaster: '#fbf6ee',
  roof: '#ff5a1f',
  roofDark: '#d9481a',
  wood: '#7a5a3e',
  leaves: ['#3fa34d', '#5cbf5f', '#2f8a3e', '#7ad16b'],
  flowers: ['#ffffff', '#ff6fa8', '#ffc800', '#8a7dff', '#ff7a45'],
  indigo: '#4338ff',
  saffron: '#ffc800',
  water: '#2fb4ff',
}

const noise = (x, y, z) =>
  Math.sin(x * 2.1 + z * 1.3) * 0.5 + Math.sin(z * 3.7 - x * 1.1 + y * 2.0) * 0.3 + Math.sin(x * 5.3 + y * 4.1 + z * 2.9) * 0.15

// Faceted for terrain and rocks, soft and slightly glossy for everything man-made or alive.
const std = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, flatShading: true, ...extra })
const soft = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0, ...extra })
const rbox = (w, h, d, r, mat) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, r), mat)

function makeIsland() {
  const geo = new THREE.IcosahedronGeometry(1, 6)
  const pos = geo.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    const n = noise(v.x * 1.7, v.y * 1.7, v.z * 1.7)
    let { x, y, z } = v
    if (y >= 0) {
      y = y * 0.2 + n * 0.025
      x *= 1 + n * 0.05
      z *= 1 + n * 0.05
    } else {
      const t = 1 + y * 0.8
      x *= t * (1 + n * 0.16)
      z *= t * (1 + n * 0.16)
      y = y * 1.6 + n * 0.1
    }
    pos.setXYZ(i, x * 3.2, y, z * 2.25)
  }

  // One colour per triangle gives the hand-cut look; the rock below is banded like sediment.
  const colors = new Float32Array(pos.count * 3)
  const c = new THREE.Color()
  for (let i = 0; i < pos.count; i += 3) {
    const cy = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3
    const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3
    const pick = (arr) => arr[Math.abs(Math.floor((cx * 7 + cy * 13) * 10)) % arr.length]
    if (cy > 0.04) c.set(pick(PALETTE.grass))
    else if (cy > -0.03) c.set(PALETTE.grassLip)
    else if (cy > -0.32) c.set(pick(PALETTE.soil))
    else c.set(PALETTE.rock[Math.abs(Math.floor(cy * 6)) % PALETTE.rock.length])
    for (let k = 0; k < 3; k++) c.toArray(colors, (i + k) * 3)
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.computeVertexNormals()

  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1 }))
}

function canvasTexture(w, h, draw) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  draw(canvas.getContext('2d'), w, h)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeWindow(glass, withBox) {
  const g = new THREE.Group()
  const white = soft('#ffffff')
  g.add(rbox(0.27, 0.23, 0.04, 0.012, white))
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.17), glass)
  pane.position.z = 0.021
  g.add(pane)
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.17, 0.012), white)
  bar.position.z = 0.026
  const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.012, 0.012), white)
  bar2.position.z = 0.026
  g.add(bar, bar2)
  if (withBox) {
    const box = rbox(0.3, 0.06, 0.08, 0.015, soft('#b0703e'))
    box.position.set(0, -0.15, 0.05)
    g.add(box)
    for (let i = 0; i < 5; i++) {
      const f = new THREE.Mesh(new THREE.IcosahedronGeometry(0.03, 1), soft(PALETTE.flowers[(i + 1) % PALETTE.flowers.length]))
      f.position.set(-0.11 + i * 0.055, -0.1, 0.05 + (i % 2) * 0.015)
      g.add(f)
    }
  }
  return g
}

function makeHouse() {
  const g = new THREE.Group()
  const plaster = soft(PALETTE.plaster)
  const roofMat = soft(PALETTE.roof, { roughness: 0.45 })

  const plinth = rbox(1.36, 0.1, 1.06, 0.03, soft('#d8cdbd'))
  plinth.position.y = 0.05
  const body = rbox(1.25, 0.8, 0.95, 0.035, plaster)
  body.position.y = 0.5
  g.add(plinth, body)

  // Gable walls, then two roof slabs with an overhang and a ridge cap.
  const base = 0.9
  const rise = 0.5
  const half = 0.66
  const shape = new THREE.Shape()
  shape.moveTo(-half, 0)
  shape.lineTo(half, 0)
  shape.lineTo(0, rise)
  shape.closePath()
  const gableGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.95, bevelEnabled: false })
  gableGeo.translate(0, 0, -0.475)
  const gable = new THREE.Mesh(gableGeo, plaster)
  gable.position.y = base
  g.add(gable)

  const a = Math.atan2(rise, half)
  const L = Math.hypot(half, rise) + 0.15
  const down = new THREE.Vector2(-Math.cos(a), -Math.sin(a))
  const normal = new THREE.Vector2(-Math.sin(a), Math.cos(a))
  const slabPos = (dist, lift) =>
    new THREE.Vector2(0, base + rise).add(down.clone().multiplyScalar(dist)).add(normal.clone().multiplyScalar(lift))
  for (const side of [1, -1]) {
    const p = slabPos(L / 2, 0.035)
    const slab = rbox(L, 0.07, 1.18, 0.025, roofMat)
    slab.position.set(p.x * side, p.y, 0)
    slab.rotation.z = a * side
    g.add(slab)
  }
  const ridge = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.2, 14), soft(PALETTE.roofDark))
  ridge.rotation.x = Math.PI / 2
  ridge.position.y = base + rise + 0.06
  g.add(ridge)

  // Solar panel on the slab facing the camera: the studio runs on sunshine.
  const solarTex = canvasTexture(128, 160, (ctx, w, h) => {
    ctx.fillStyle = '#1b237a'
    ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = 'rgba(160, 175, 255, 0.55)'
    ctx.lineWidth = 2
    for (let x = 0; x <= w; x += w / 4) ctx.strokeRect(x, -2, 0, h + 4)
    for (let y = 0; y <= h; y += h / 5) ctx.strokeRect(-2, y, w + 4, 0)
  })
  const sp = slabPos(0.48, 0.085)
  const solar = rbox(0.42, 0.025, 0.5, 0.008, new THREE.MeshStandardMaterial({ map: solarTex, roughness: 0.25, metalness: 0.4 }))
  solar.position.set(sp.x, sp.y, 0.16)
  solar.rotation.z = a
  g.add(solar)

  const chimney = rbox(0.17, 0.52, 0.17, 0.02, soft(PALETTE.roofDark))
  chimney.position.set(0.36, base + 0.36, -0.22)
  const cap = rbox(0.22, 0.05, 0.22, 0.015, soft('#3a3b48'))
  cap.position.set(0.36, base + 0.64, -0.22)
  g.add(chimney, cap)

  // Indigo front door with a gold knob and a little awning
  const door = rbox(0.25, 0.42, 0.05, 0.02, soft(PALETTE.indigo, { roughness: 0.35 }))
  door.position.set(-0.08, 0.31, 0.48)
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 8), soft(PALETTE.saffron, { metalness: 0.8, roughness: 0.25 }))
  knob.position.set(0.0, 0.3, 0.515)
  const awning = rbox(0.38, 0.03, 0.17, 0.01, roofMat)
  awning.position.set(-0.08, 0.6, 0.55)
  awning.rotation.x = 0.28
  g.add(door, knob, awning)

  const glass = new THREE.MeshStandardMaterial({ color: '#ffe8c2', emissive: '#ffb65c', emissiveIntensity: 1.4, roughness: 0.2 })
  for (const [x, y, z, ry, box] of [
    [-0.42, 0.56, 0.476, 0, true],
    [0.36, 0.56, 0.476, 0, true],
    [0.626, 0.56, 0.05, Math.PI / 2, false],
    [-0.626, 0.56, -0.1, -Math.PI / 2, false],
  ]) {
    const w = makeWindow(glass, box)
    w.position.set(x, y, z)
    w.rotation.y = ry
    g.add(w)
  }

  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 14, 10),
    new THREE.MeshStandardMaterial({ color: '#fff3d6', emissive: '#ffcf7a', emissiveIntensity: 2.2 })
  )
  lamp.position.set(0.13, 0.6, 0.5)
  g.add(lamp)

  const step = rbox(0.38, 0.06, 0.18, 0.015, soft('#e3dacb'))
  step.position.set(-0.08, 0.03, 0.6)
  g.add(step)

  // Round shrubs hugging the front corners
  for (const [x, z, s] of [
    [0.6, 0.6, 1],
    [-0.62, 0.58, 0.85],
    [0.7, -0.3, 0.75],
  ]) {
    ;[
      [0, 0.09, 0, 0.12],
      [0.1, 0.07, 0.03, 0.09],
      [-0.09, 0.06, 0.02, 0.08],
    ].forEach(([bx, by, bz, r], i) => {
      const b = new THREE.Mesh(new THREE.IcosahedronGeometry(r * s, 2), soft(PALETTE.leaves[i % 4]))
      b.position.set(x + bx * s, by * s, z + bz * s)
      g.add(b)
    })
  }

  return { group: g, chimneyTop: new THREE.Vector3(0.36, base + 0.7, -0.22) }
}

function makeTree(kind, scale) {
  const g = new THREE.Group()
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.065, 0.44, 8), soft(PALETTE.wood))
  trunk.position.y = 0.22
  g.add(trunk)
  if (kind === 'pine') {
    ;[0.36, 0.28, 0.19].forEach((r, i) => {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(r, 0.42, 10), soft(PALETTE.leaves[i % 3]))
      cone.position.y = 0.42 + i * 0.22
      g.add(cone)
    })
  } else {
    ;[
      [0, 0.62, 0, 0.34],
      [0.17, 0.74, 0.06, 0.25],
      [-0.15, 0.72, -0.06, 0.24],
      [0.02, 0.88, -0.02, 0.2],
    ].forEach(([x, y, z, r], i) => {
      const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 2), soft(PALETTE.leaves[(i + 1) % 4]))
      blob.position.set(x, y, z)
      g.add(blob)
    })
  }
  g.scale.setScalar(scale)
  return g
}

function makeDesk() {
  const g = new THREE.Group()
  const woodMat = soft('#c8925a')
  const top = rbox(0.66, 0.045, 0.38, 0.015, woodMat)
  top.position.y = 0.32
  g.add(top)
  for (const [x, z] of [
    [-0.28, -0.15],
    [0.28, -0.15],
    [-0.28, 0.15],
    [0.28, 0.15],
  ]) {
    const leg = rbox(0.035, 0.3, 0.035, 0.01, woodMat)
    leg.position.set(x, 0.15, z)
    g.add(leg)
  }

  const alu = soft('#d9d6d0', { metalness: 0.6, roughness: 0.3 })
  const base = rbox(0.3, 0.016, 0.2, 0.006, alu)
  base.position.set(0, 0.35, 0.03)
  g.add(base)
  const lid = new THREE.Group()
  const shell = rbox(0.3, 0.2, 0.012, 0.005, alu)
  shell.position.y = 0.1
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.27, 0.17),
    new THREE.MeshStandardMaterial({ color: '#eef0ff', emissive: '#8f88ff', emissiveIntensity: 0.9 })
  )
  screen.position.set(0, 0.1, 0.007)
  lid.add(shell, screen)
  lid.position.set(0, 0.357, -0.07)
  lid.rotation.x = -0.28
  g.add(lid)

  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.026, 0.065, 16), soft('#ffffff'))
  mug.position.set(0.23, 0.375, 0.06)
  const chai = new THREE.Mesh(new THREE.CircleGeometry(0.026, 16), soft('#b07a4a'))
  chai.rotation.x = -Math.PI / 2
  chai.position.set(0.23, 0.405, 0.06)
  g.add(mug, chai)

  // Indigo chair, pulled out a little
  const chairMat = soft(PALETTE.indigo, { roughness: 0.4 })
  const seat = rbox(0.22, 0.035, 0.2, 0.012, chairMat)
  seat.position.set(0.02, 0.2, 0.32)
  const back = rbox(0.22, 0.2, 0.03, 0.012, chairMat)
  back.position.set(0.02, 0.32, 0.42)
  back.rotation.x = -0.12
  g.add(seat, back)
  for (const [x, z] of [
    [-0.07, 0.24],
    [0.11, 0.24],
    [-0.07, 0.4],
    [0.11, 0.4],
  ]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.2, 6), soft('#23233a'))
    leg.position.set(x, 0.1, z)
    g.add(leg)
  }

  // Striped parasol: saffron and white segments
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.92, 8), soft('#f4f1ea'))
  pole.position.set(-0.42, 0.46, -0.08)
  const canopyGeo = new THREE.ConeGeometry(0.55, 0.2, 12, 1, true).toNonIndexed()
  const cpos = canopyGeo.attributes.position
  const ccol = new Float32Array(cpos.count * 3)
  const white = new THREE.Color('#ffffff')
  const sun = new THREE.Color(PALETTE.saffron)
  for (let i = 0; i < cpos.count; i += 3) {
    const cx = (cpos.getX(i) + cpos.getX(i + 1) + cpos.getX(i + 2)) / 3
    const cz = (cpos.getZ(i) + cpos.getZ(i + 1) + cpos.getZ(i + 2)) / 3
    const seg = Math.floor(((Math.atan2(cz, cx) + Math.PI) / (Math.PI * 2)) * 12)
    for (let k = 0; k < 3; k++) (seg % 2 ? white : sun).toArray(ccol, (i + k) * 3)
  }
  canopyGeo.setAttribute('color', new THREE.BufferAttribute(ccol, 3))
  const canopy = new THREE.Mesh(canopyGeo, soft('#ffffff', { vertexColors: true, side: THREE.DoubleSide }))
  canopy.position.set(-0.42, 0.94, -0.08)
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 8), soft(PALETTE.roof))
  tip.position.set(-0.42, 1.05, -0.08)
  g.add(pole, canopy, tip)
  return g
}

function makeMushroom() {
  const g = new THREE.Group()
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.03, 0.08, 10), soft('#fbf3e4'))
  stem.position.y = 0.04
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.065, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), soft('#ff3b4a', { roughness: 0.35 }))
  cap.position.y = 0.075
  g.add(stem, cap)
  for (const [x, y, z] of [
    [0.03, 0.125, 0.02],
    [-0.03, 0.115, 0.03],
    [0.0, 0.13, -0.03],
  ]) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 6), soft('#ffffff'))
    dot.position.set(x, y, z)
    g.add(dot)
  }
  return g
}

function makeLampPost() {
  const g = new THREE.Group()
  const ink = soft('#23233a', { metalness: 0.4, roughness: 0.4 })
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.024, 0.6, 8), ink)
  pole.position.y = 0.3
  const head = rbox(0.09, 0.03, 0.09, 0.01, ink)
  head.position.y = 0.71
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 14, 10),
    new THREE.MeshStandardMaterial({ color: '#fff3d6', emissive: '#ffcf7a', emissiveIntensity: 2.4 })
  )
  bulb.position.y = 0.655
  g.add(pole, head, bulb)
  return g
}

function makeBird() {
  const g = new THREE.Group()
  const mat = soft('#23233a')
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), mat)
  body.scale.set(0.8, 0.8, 1.7)
  g.add(body)
  const wings = [1, -1].map((side) => {
    const geo = new THREE.BoxGeometry(0.16, 0.008, 0.06)
    geo.translate(0.08 * side, 0, 0)
    const w = new THREE.Mesh(geo, mat)
    w.userData.side = side
    g.add(w)
    return w
  })
  return { group: g, wings }
}

function roundRect(ctx, x, y, w, h, r, fill) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.fillStyle = fill
  ctx.fill()
}

// Little app screens drawn on a canvas. They float around the island.
function makeScreen(kind) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const S = 2
  if (kind === 'phone') {
    canvas.width = 240 * S
    canvas.height = 470 * S
    ctx.scale(S, S)
    roundRect(ctx, 0, 0, 240, 470, 40, '#171717')
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(9, 9, 222, 452, 32)
    ctx.clip()
    ctx.fillStyle = '#ece7dc'
    ctx.fillRect(9, 9, 222, 452)
    ctx.strokeStyle = '#fffaf2'
    ctx.lineWidth = 14
    ;[110, 230, 330].forEach((y) => {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(240, y)
      ctx.stroke()
    })
    ;[70, 165].forEach((x) => {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, 470)
      ctx.stroke()
    })
    roundRect(ctx, 92, 130, 52, 80, 6, '#d6e2cc')
    ctx.strokeStyle = '#ff5a1f'
    ctx.lineWidth = 6
    ctx.setLineDash([3, 10])
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(70, 440)
    ctx.lineTo(70, 230)
    ctx.lineTo(165, 230)
    ctx.lineTo(165, 110)
    ctx.lineTo(215, 110)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = '#ff5a1f'
    ctx.beginPath()
    ctx.arc(165, 180, 11, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 4
    ctx.stroke()
    roundRect(ctx, 22, 350, 196, 96, 18, '#ffffff')
    ctx.fillStyle = '#8a8780'
    ctx.font = '500 13px ui-monospace, monospace'
    ctx.fillText('BUS 04 · ROUTE B', 38, 378)
    ctx.fillStyle = '#121212'
    ctx.font = '600 24px system-ui, sans-serif'
    ctx.fillText('3 min away', 38, 410)
    roundRect(ctx, 38, 424, 164, 6, 3, '#eeeae2')
    roundRect(ctx, 38, 424, 110, 6, 3, '#ff5a1f')
    ctx.restore()
    roundRect(ctx, 88, 18, 64, 16, 8, '#171717')
  } else if (kind === 'web') {
    canvas.width = 520 * S
    canvas.height = 340 * S
    ctx.scale(S, S)
    roundRect(ctx, 0, 0, 520, 340, 22, '#ffffff')
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(0, 0, 520, 340, 22)
    ctx.clip()
    ctx.fillStyle = '#f2f0eb'
    ctx.fillRect(0, 0, 520, 38)
    ;['#ff5a1f', '#d8d3c9', '#d8d3c9'].forEach((col, i) => {
      ctx.fillStyle = col
      ctx.beginPath()
      ctx.arc(22 + i * 18, 19, 5.5, 0, Math.PI * 2)
      ctx.fill()
    })
    roundRect(ctx, 200, 10, 120, 18, 6, '#ffffff')
    ctx.fillStyle = '#8a8780'
    ctx.font = '12px ui-monospace, monospace'
    ctx.fillText('school.app', 226, 23)
    ctx.fillStyle = '#f6f4ef'
    ctx.fillRect(0, 38, 100, 302)
    for (let i = 0; i < 6; i++) roundRect(ctx, 16, 60 + i * 26, i === 1 ? 70 : 56, 9, 4, i === 1 ? '#4338ff' : '#e2ded5')
    ;[0, 1, 2].forEach((i) => {
      roundRect(ctx, 118 + i * 132, 56, 120, 62, 10, '#faf9f6')
      roundRect(ctx, 132 + i * 132, 72, 60, 12, 4, '#121212')
      roundRect(ctx, 132 + i * 132, 94, 86, 7, 3, '#dcd8cf')
    })
    const bars = [52, 80, 64, 110, 90, 128, 100, 142, 120]
    bars.forEach((h, i) => roundRect(ctx, 126 + i * 42, 300 - h, 28, h, 5, i % 3 === 2 ? '#4338ff' : '#c9c4ff'))
    ctx.restore()
  } else {
    canvas.width = 480 * S
    canvas.height = 330 * S
    ctx.scale(S, S)
    roundRect(ctx, 0, 0, 480, 330, 14, '#ffffff')
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(0, 0, 480, 330, 14)
    ctx.clip()
    ctx.fillStyle = '#4338ff'
    ctx.fillRect(0, 0, 480, 36)
    ctx.fillStyle = '#ffffff'
    ctx.font = '600 14px system-ui, sans-serif'
    ctx.fillText('Billing · Counter 1', 16, 23)
    ;[0, 1, 2].forEach((i) => roundRect(ctx, 410 + i * 20, 14, 10, 8, 2, 'rgba(255,255,255,0.6)'))
    roundRect(ctx, 16, 52, 448, 22, 6, '#e6eef7')
    for (let r = 0; r < 6; r++) {
      const y = 88 + r * 30
      roundRect(ctx, 22, y, 150 + ((r * 37) % 60), 9, 4, '#dcd8cf')
      roundRect(ctx, 250, y, 50, 9, 4, '#e7e3db')
      roundRect(ctx, 370, y, 70, 9, 4, '#cfcbc2')
      ctx.fillStyle = '#eeeae3'
      ctx.fillRect(16, y + 19, 448, 1)
    }
    ctx.fillStyle = '#f3f6fa'
    ctx.fillRect(0, 280, 480, 50)
    ctx.fillStyle = '#121212'
    ctx.font = '600 18px system-ui, sans-serif'
    ctx.fillText('Total  ₹ 1,248.00', 18, 311)
    roundRect(ctx, 348, 292, 116, 28, 14, '#4338ff')
    ctx.restore()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return { tex, aspect: canvas.width / canvas.height }
}

function makeCloud() {
  const g = new THREE.Group()
  const mat = soft('#ffffff', { roughness: 0.95, transparent: true, opacity: 0.96 })
  ;[
    [0, 0, 0, 0.55],
    [0.5, -0.08, 0.1, 0.42],
    [-0.5, -0.1, 0, 0.4],
    [0.2, 0.22, -0.1, 0.4],
    [-0.2, 0.15, 0.15, 0.34],
  ].forEach(([x, y, z, r]) => {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 3), mat)
    m.position.set(x, y, z)
    g.add(m)
  })
  g.scale.y = 0.8
  return g
}

export default function HeroScene({ onReady }) {
  const mount = useRef(null)

  useEffect(() => {
    const el = mount.current
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return // No WebGL: the hero still works, it just has no island.
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NeutralToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)

    // A soft studio environment for reflections, plus a warm key and a violet rim light.
    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const envRT = pmrem.fromScene(room, 0.04)
    room.dispose?.()
    pmrem.dispose()
    scene.environment = envRT.texture
    scene.environmentIntensity = 0.55

    scene.add(new THREE.HemisphereLight(0xffffff, 0xe6dccb, 1.0))
    const sun = new THREE.DirectionalLight(0xfff0dc, 2.5)
    sun.position.set(4, 8, 5)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    Object.assign(sun.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 25 })
    sun.shadow.bias = -0.0004
    sun.shadow.normalBias = 0.02
    scene.add(sun)
    const rim = new THREE.DirectionalLight(0xb9a8ff, 1.3)
    rim.position.set(-5, 3, -6)
    scene.add(rim)

    let seed = 7
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647

    const world = new THREE.Group()
    scene.add(world)

    const island = makeIsland()
    world.add(island)

    // Find the ground height anywhere on the island by casting a ray straight down.
    const ray = new THREE.Raycaster()
    const down = new THREE.Vector3(0, -1, 0)
    const hitGround = (x, z) => {
      ray.set(new THREE.Vector3(x, 5, z), down)
      return ray.intersectObject(island)[0]
    }
    const ground = (x, z) => hitGround(x, z)?.point.y ?? 0
    const place = (obj, x, z, lift = 0) => {
      obj.position.set(x, ground(x, z) + lift, z)
      world.add(obj)
      return obj
    }

    const { group: house, chimneyTop } = makeHouse()
    place(house, -0.45, -0.1, -0.03)
    house.rotation.y = 0.12

    const desk = place(makeDesk(), 1.15, 0.5, -0.02)
    desk.rotation.y = -0.5

    ;[
      ['round', -2.15, -0.45, 1.05],
      ['pine', -2.6, 0.55, 0.75],
      ['round', 0.95, -0.95, 0.95],
      ['pine', 2.2, -0.15, 1.1],
      ['round', 2.05, 0.95, 0.6],
      ['pine', -1.35, -1.25, 0.8],
      ['round', 0.15, -1.45, 0.7],
      ['pine', 2.6, 0.6, 0.6],
    ].forEach(([kind, x, z, s]) => {
      place(makeTree(kind, s), x, z, -0.02).rotation.y = x * 2
    })

    ;[
      [-1.9, -0.05, 1],
      [0.72, -0.7, 0.8],
      [2.0, 0.3, 1.1],
      [-2.2, 1.05, 0.8],
    ].forEach(([x, z, s]) => place(makeMushroom(), x, z).scale.setScalar(s))

    place(makeLampPost(), 0.12, 1.3)

    ;[
      [-0.95, 1.55, 0.13],
      [1.7, -0.75, 0.1],
      [2.45, 1.2, 0.08],
      [-2.8, -0.2, 0.09],
    ].forEach(([x, z, r]) => {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), std('#cfc8bd'))
      rock.scale.y = 0.7
      place(rock, x, z, r * 0.3)
    })

    // Stepping stones from the door
    const stoneMat = soft('#e3dacb', { roughness: 0.8 })
    for (let i = 0; i < 4; i++) {
      const x = -0.5 + i * 0.05
      const z = 0.62 + i * 0.27
      place(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.03, 12), stoneMat), x, z, 0.005)
    }

    // Pond with lily pads, a stream to the edge and a waterfall pouring off the island
    const water = new THREE.MeshPhysicalMaterial({ color: PALETTE.water, roughness: 0.06, clearcoat: 1, transparent: true, opacity: 0.92 })
    const pond = { x: -1.55, z: 0.95, rx: 0.5, rz: 0.35 }
    let pondY = -Infinity
    for (let a = 0; a < 8; a++) {
      pondY = Math.max(pondY, ground(pond.x + Math.cos(a) * pond.rx, pond.z + Math.sin(a) * pond.rz))
    }
    const pondMesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.05, 40), water)
    pondMesh.scale.set(pond.rx, 1, pond.rz)
    pondMesh.position.set(pond.x, pondY + 0.005, pond.z)
    pondMesh.userData.noShadow = true
    world.add(pondMesh)
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2
      if (a > 1.2 && a < 1.9) continue // gap where the stream leaves
      const r = 0.045 + rnd() * 0.03
      const s = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), std(i % 2 ? '#d8d1c6' : '#c4bcb0'))
      s.position.set(pond.x + Math.cos(a) * (pond.rx + 0.04), pondY + 0.02, pond.z + Math.sin(a) * (pond.rz + 0.04))
      world.add(s)
    }
    ;[
      [-1.7, 0.88, true],
      [-1.42, 1.02, false],
      [-1.62, 1.1, false],
    ].forEach(([x, z, bloom]) => {
      const pad = new THREE.Mesh(new THREE.CircleGeometry(0.07, 14, 0.3, Math.PI * 1.8), soft('#3fa34d', { side: THREE.DoubleSide }))
      pad.rotation.x = -Math.PI / 2
      pad.position.set(x, pondY + 0.033, z)
      world.add(pad)
      if (bloom) {
        const f = new THREE.Mesh(new THREE.IcosahedronGeometry(0.035, 1), soft('#ff6fa8'))
        f.position.set(x, pondY + 0.055, z)
        world.add(f)
      }
    })

    const fallX = -1.6
    let edgeZ = pond.z
    while (edgeZ < 3 && hitGround(fallX, edgeZ + 0.03)) edgeZ += 0.03
    const streamStart = new THREE.Vector2(pond.x, pond.z + pond.rz * 0.8)
    const streamEnd = new THREE.Vector2(fallX, edgeZ - 0.02)
    for (let i = 0; i <= 7; i++) {
      const p = streamStart.clone().lerp(streamEnd, i / 7)
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.03, 14), water)
      seg.position.set(p.x, ground(p.x, p.y) + 0.012, p.y)
      seg.userData.noShadow = true
      world.add(seg)
    }

    const waterTex = canvasTexture(64, 256, (ctx, w, h) => {
      ctx.fillStyle = '#5fc8ff'
      ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < 46; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.35 + rnd() * 0.55})`
        ctx.fillRect(rnd() * w, rnd() * h, 2 + rnd() * 4, 18 + rnd() * 60)
      }
    })
    waterTex.wrapS = waterTex.wrapT = THREE.RepeatWrapping
    const fadeTex = canvasTexture(4, 128, (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#fff')
      grad.addColorStop(0.55, '#fff')
      grad.addColorStop(1, '#000')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
    })
    fadeTex.colorSpace = THREE.NoColorSpace
    const fallTop = ground(fallX, edgeZ - 0.04) + 0.01
    const fallH = 1.6
    const fall = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.15, fallH, 20, 1, true),
      new THREE.MeshBasicMaterial({ map: waterTex, alphaMap: fadeTex, transparent: true, depthWrite: false, side: THREE.DoubleSide })
    )
    fall.position.set(fallX, fallTop - fallH / 2, edgeZ + 0.08)
    fall.userData.noShadow = true
    world.add(fall)
    const mistMat = soft('#ffffff', { transparent: true, opacity: 0.6, roughness: 1 })
    const mist = Array.from({ length: 5 }, (_, i) => {
      const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.09, 2), mistMat.clone())
      m.userData.offset = i / 5
      m.userData.noShadow = true
      world.add(m)
      return m
    })
    const mistBase = new THREE.Vector3(fallX, fallTop - fallH * 0.62, edgeZ + 0.08)

    // Wildflowers and grass tufts, scattered wherever there is nothing else
    const free = (x, z) => {
      const inHouse = x > -1.25 && x < 0.35 && z > -0.8 && z < 0.8
      const inDesk = Math.hypot(x - 1.05, z - 0.45) < 0.6
      const inPond = ((x - pond.x) / (pond.rx + 0.12)) ** 2 + ((z - pond.z) / (pond.rz + 0.12)) ** 2 < 1
      const inStream = Math.abs(x - fallX) < 0.16 && z > pond.z
      return !(inHouse || inDesk || inPond || inStream)
    }
    const scatter = (count, geo, mat, colorAt, lift, randomSpin) => {
      const mesh = new THREE.InstancedMesh(geo, mat, count)
      const m4 = new THREE.Matrix4()
      const q = new THREE.Quaternion()
      const s = new THREE.Vector3()
      const p = new THREE.Vector3()
      const col = new THREE.Color()
      let placed = 0
      while (placed < count) {
        const a = rnd() * Math.PI * 2
        const r = Math.sqrt(rnd())
        const x = Math.cos(a) * r * 2.9
        const z = Math.sin(a) * r * 2.0
        if (!free(x, z)) continue
        q.setFromEuler(new THREE.Euler(randomSpin ? (rnd() - 0.5) * 0.5 : 0, rnd() * 6, randomSpin ? (rnd() - 0.5) * 0.5 : 0))
        s.setScalar(0.7 + rnd() * 0.6)
        m4.compose(p.set(x, ground(x, z) + lift, z), q, s)
        mesh.setMatrixAt(placed, m4)
        if (colorAt) mesh.setColorAt(placed, col.set(colorAt(placed)))
        placed++
      }
      world.add(mesh)
      return mesh
    }
    scatter(110, new THREE.IcosahedronGeometry(0.034, 1), soft('#ffffff'), (i) => PALETTE.flowers[i % PALETTE.flowers.length], 0.025, false)
    const tuftColors = [PALETTE.leaves[1], PALETTE.leaves[3], PALETTE.leaves[0]]
    scatter(180, new THREE.ConeGeometry(0.022, 0.1, 4), soft('#ffffff'), (i) => tuftColors[i % 3], 0.04, true)

    // Rock chunks floating under the island, and a few roots
    const debris = [
      [3.3, -0.7, 0.4, 0.22],
      [-3.4, -1.1, -0.3, 0.18],
      [2.4, -1.6, -1.2, 0.14],
      [-2.0, -1.8, 1.0, 0.12],
      [0.8, -2.2, 1.6, 0.1],
    ].map(([x, y, z, r], i) => {
      const chunk = new THREE.Group()
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), std(PALETTE.rock[i % 3]))
      rock.scale.y = 1.3
      const turf = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.85, r * 0.9, r * 0.25, 7), std(PALETTE.grass[i % 3]))
      turf.position.y = r * 1.05
      chunk.add(rock, turf)
      chunk.position.set(x, y, z)
      chunk.userData.y = y
      world.add(chunk)
      return chunk
    })
    const rootMat = std('#8a6a48')
    for (let i = 0; i < 7; i++) {
      const root = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.6 + (i % 3) * 0.3, 5), rootMat)
      const a = (i / 7) * Math.PI * 2 + 0.4
      root.position.set(Math.cos(a) * 0.9, -1.2 - (i % 2) * 0.2, Math.sin(a) * 0.6)
      root.rotation.set(Math.PI + Math.sin(i) * 0.3, 0, Math.cos(i) * 0.3)
      world.add(root)
    }

    world.traverse((o) => {
      if (!o.isMesh) return
      o.castShadow = !o.userData.noShadow
      o.receiveShadow = true
    })

    // Chimney smoke
    const smokeMat = soft('#ffffff', { transparent: true, opacity: 0.8, roughness: 1 })
    const smoke = Array.from({ length: 5 }, (_, i) => {
      const s = new THREE.Mesh(new THREE.IcosahedronGeometry(0.08, 2), smokeMat.clone())
      s.userData.offset = i / 5
      house.add(s)
      return s
    })

    // Floating app screens
    const screens = ['web', 'phone', 'desktop'].map((kind, i) => {
      const { tex, aspect } = makeScreen(kind)
      const h = kind === 'phone' ? 1.45 : 1.0
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(h * aspect, h),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, side: THREE.DoubleSide })
      )
      mesh.userData = { base: (i / 3) * Math.PI * 2 + 0.6, height: 1.2 + (i % 2) * 0.55 }
      world.add(mesh)
      return mesh
    })

    const clouds = [
      [-3.4, -1.0, 1.0, 0.75],
      [3.6, -0.7, -0.4, 0.6],
      [2.6, 2.4, -1.8, 0.45],
    ].map(([x, y, z, s]) => {
      const c = makeCloud()
      c.position.set(x, y, z)
      c.scale.multiplyScalar(s)
      c.userData.y = y
      scene.add(c)
      return c
    })

    const birds = [0, 1, 2].map((i) => {
      const b = makeBird()
      b.group.userData = { phase: i * 2.1, radius: 3.3 + i * 0.35, height: 2.1 + (i % 2) * 0.45 }
      scene.add(b.group)
      return b
    })

    // Pollen drifting up
    const pollenGeo = new THREE.BufferGeometry()
    const pollenPos = new Float32Array(70 * 3)
    for (let i = 0; i < 70; i++) {
      pollenPos[i * 3] = (rnd() - 0.5) * 8
      pollenPos[i * 3 + 1] = rnd() * 4 - 1
      pollenPos[i * 3 + 2] = (rnd() - 0.5) * 5
    }
    pollenGeo.setAttribute('position', new THREE.BufferAttribute(pollenPos, 3))
    const pollen = new THREE.Points(pollenGeo, new THREE.PointsMaterial({ color: '#ffb400', size: 0.045, transparent: true, opacity: 0.75 }))
    scene.add(pollen)

    // Layout: on wide screens the island sits on the right so the headline has room on the left.
    let offsetX = 0
    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      const aspect = w / h
      camera.aspect = aspect
      const wide = aspect > 1.25
      const visibleH = wide ? 7.8 : Math.max(6.2, 7.9 / aspect)
      const dist = visibleH / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      offsetX = wide ? visibleH * aspect * 0.21 : 0
      camera.position.set(-offsetX, dist * 0.27, dist)
      camera.lookAt(-offsetX, 0.35, 0)
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    // Pointer parallax + drag to spin
    const pointer = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    let dragging = false
    let lastX = 0
    let spin = 0
    let spinVel = 0
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
      if (dragging) {
        spinVel = (e.clientX - lastX) * 0.006
        spin += spinVel
        lastX = e.clientX
      }
    }
    const onDown = (e) => {
      dragging = true
      lastX = e.clientX
      el.classList.add('is-dragging')
    }
    const onUp = () => {
      dragging = false
      el.classList.remove('is-dragging')
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    renderer.domElement.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(el)

    const clock = new THREE.Clock()
    const camWorld = new THREE.Vector3()
    let raf
    let first = true

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible && !first) return
      const t = reduced ? 2 : clock.getElapsedTime()

      if (!dragging) {
        spin += spinVel
        spinVel *= 0.95
      }
      smooth.x += (pointer.x - smooth.x) * 0.04
      smooth.y += (pointer.y - smooth.y) * 0.04

      world.rotation.y = -0.35 + Math.sin(t * 0.12) * 0.35 + spin + smooth.x * 0.22
      world.rotation.x = 0.04 + smooth.y * 0.05
      world.position.y = Math.sin(t * 0.8) * 0.07

      world.updateMatrixWorld()
      camera.getWorldPosition(camWorld)
      screens.forEach((s, i) => {
        const a = s.userData.base + t * 0.14
        s.position.set(Math.cos(a) * 3.9, s.userData.height + Math.sin(t * 0.9 + i * 2) * 0.12, Math.sin(a) * 2.9)
        s.lookAt(camWorld)
      })

      smoke.forEach((s) => {
        const p = (t * 0.25 + s.userData.offset) % 1
        s.position.set(chimneyTop.x + Math.sin(p * 6) * 0.05, chimneyTop.y + p * 0.9, chimneyTop.z)
        s.scale.setScalar(0.6 + p * 1.6)
        s.material.opacity = 0.75 * (1 - p)
      })

      waterTex.offset.y = (t * 0.9) % 1
      mist.forEach((m, i) => {
        const p = (t * 0.35 + m.userData.offset) % 1
        m.position.set(mistBase.x + Math.sin(i * 2.4) * 0.12 * p, mistBase.y - p * 0.35, mistBase.z + Math.cos(i * 1.7) * 0.1 * p)
        m.scale.setScalar(0.5 + p * 1.3)
        m.material.opacity = 0.55 * (1 - p)
      })

      debris.forEach((d, i) => {
        d.position.y = d.userData.y + Math.sin(t * 0.7 + i * 1.3) * 0.08
        d.rotation.y = t * 0.15 * (i % 2 ? 1 : -1)
      })

      clouds.forEach((c, i) => {
        c.position.y = c.userData.y + Math.sin(t * 0.5 + i) * 0.12
        c.rotation.y = t * 0.05 * (i % 2 ? 1 : -1)
      })

      birds.forEach(({ group, wings }) => {
        const { phase, radius, height } = group.userData
        const a = phase + t * 0.32
        group.position.set(Math.cos(a) * radius, height + Math.sin(t * 1.3 + phase) * 0.15, Math.sin(a) * radius * 0.75)
        group.rotation.y = -a
        group.rotation.z = -0.25
        const flap = Math.sin(t * 11 + phase) * 0.6
        wings.forEach((w) => (w.rotation.z = flap * w.userData.side))
      })

      const pp = pollenGeo.attributes.position
      for (let i = 0; i < pp.count; i++) {
        let y = pp.getY(i) + 0.004
        if (y > 3.2) y = -1
        pp.setY(i, y)
      }
      pp.needsUpdate = true

      renderer.render(scene, camera)
      if (first) {
        first = false
        el.classList.add('is-ready')
        onReady?.()
      }
      if (reduced) cancelAnimationFrame(raf)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      scene.traverse((o) => {
        o.geometry?.dispose()
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []
        mats.forEach((m) => {
          m.map?.dispose()
          m.alphaMap?.dispose()
          m.dispose()
        })
      })
      envRT.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [onReady])

  return <div className="hero-scene" ref={mount} aria-hidden="true" />
}
