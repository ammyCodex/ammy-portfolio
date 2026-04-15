import React, { useEffect, useRef } from 'react'

const CYAN = 'rgba(34, 211, 238,'
const MAGENTA = 'rgba(232, 121, 249,'
const EMERALD = 'rgba(52, 211, 153,'

function buildGraph(cw, ch, nodeCount) {
  const nodes = []
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * cw,
      y: Math.random() * ch,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      phase: Math.random() * Math.PI * 2,
      layer: Math.random() < 0.35 ? 1 : 0,
    })
  }

  const edges = []
  const seen = new Set()
  const maxLinks = 4
  for (let i = 0; i < nodes.length; i++) {
    const dists = []
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      dists.push({ j, d: Math.hypot(dx, dy) })
    }
    dists.sort((a, b) => a.d - b.d)
    for (let k = 0; k < maxLinks && k < dists.length; k++) {
      const a = Math.min(i, dists[k].j)
      const b = Math.max(i, dists[k].j)
      const key = `${a}-${b}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push({ a, b, pulse: Math.random() })
    }
  }
  return { nodes, edges }
}

function drawTechGrid(ctx, cw, ch, t) {
  const step = 56
  const drift = (t * 12) % step
  const chDraw = Math.min(ch, Math.max(typeof window !== 'undefined' ? window.innerHeight * 2.2 : ch, 1400))
  ctx.save()
  ctx.strokeStyle = `rgba(34, 211, 238, ${0.045 + 0.02 * Math.sin(t * 0.4)})`
  ctx.lineWidth = 0.5
  for (let x = -step + drift; x < cw + step; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, chDraw)
    ctx.stroke()
  }
  for (let y = -step + drift * 0.7; y < chDraw + step; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(cw, y)
    ctx.stroke()
  }
  const dotStep = step * 2
  let dots = 0
  const maxDots = 420
  for (let x = dotStep / 2; x < cw && dots < maxDots; x += dotStep) {
    for (let y = dotStep / 2; y < chDraw && dots < maxDots; y += dotStep) {
      ctx.fillStyle = `rgba(148, 163, 184, ${0.1 + 0.07 * Math.sin(t * 0.9 + x * 0.01 + y * 0.01)})`
      ctx.beginPath()
      ctx.arc(x, y, 1.1, 0, Math.PI * 2)
      ctx.fill()
      dots++
    }
  }
  ctx.restore()
}

function drawEdgeGlow(ctx, na, nb, len, flow, alpha, t, edgeIdx) {
  const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y)
  grad.addColorStop(0, `${CYAN}${alpha})`)
  grad.addColorStop(0.45, `${MAGENTA}${alpha * 0.72})`)
  grad.addColorStop(1, `${EMERALD}${alpha * 0.55})`)

  ctx.strokeStyle = `${CYAN}${alpha * 0.22})`
  ctx.lineWidth = 3.2
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(na.x, na.y)
  ctx.lineTo(nb.x, nb.y)
  ctx.stroke()

  ctx.strokeStyle = grad
  ctx.lineWidth = 0.65 + 0.45 * flow
  ctx.beginPath()
  ctx.moveTo(na.x, na.y)
  ctx.lineTo(nb.x, nb.y)
  ctx.stroke()

  if (edgeIdx % 2 === 0 && len > 40) {
    const u = (t * 0.22 + edgeIdx * 0.17) % 1
    const px = na.x + (nb.x - na.x) * u
    const py = na.y + (nb.y - na.y) * u
    ctx.beginPath()
    ctx.arc(px, py, 2.8, 0, Math.PI * 2)
    ctx.fillStyle = `${CYAN}${0.35 + 0.25 * flow})`
    ctx.fill()
    ctx.beginPath()
    ctx.arc(px, py, 1.1, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.globalAlpha = 0.35
    ctx.fill()
    ctx.globalAlpha = 1
  }
}

function drawNodes(ctx, nodes, t, pulse) {
  for (const n of nodes) {
    const glow = 0.22 + 0.2 * Math.sin(t * 2.1 + n.phase)
    const r = 2.8 + glow * (n.layer ? 1.1 : 0.7)

    ctx.beginPath()
    ctx.arc(n.x, n.y, r + 4, 0, Math.PI * 2)
    ctx.fillStyle = `${CYAN}${0.06 + pulse * 0.04})`
    ctx.fill()

    ctx.beginPath()
    ctx.arc(n.x, n.y, r + 1.2, 0, Math.PI * 2)
    ctx.fillStyle = `${MAGENTA}${0.12 + glow * 0.08})`
    ctx.fill()

    ctx.beginPath()
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
    ctx.fillStyle = `${CYAN}${0.38 + pulse * 0.18})`
    ctx.fill()

    ctx.beginPath()
    ctx.arc(n.x, n.y, 1.15, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(248, 250, 252, ${0.55 + 0.2 * Math.sin(t * 3 + n.phase)})`
    ctx.fill()
  }
}

export default function NeuralNetworkBackground() {
  const canvasRef = useRef(null)
  const graphRef = useRef({ nodes: [], edges: [] })
  const rafRef = useRef(0)
  const sizeRef = useRef({ cw: 0, ch: 0, dpr: 1 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cw = window.innerWidth
      const ch = Math.max(
        window.innerHeight,
        document.documentElement?.scrollHeight || window.innerHeight
      )
      sizeRef.current = { cw, ch, dpr }
      canvas.width = Math.floor(cw * dpr)
      canvas.height = Math.floor(ch * dpr)
      canvas.style.width = `${cw}px`
      canvas.style.height = `${ch}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = cw < 480 ? 36 : cw < 768 ? 48 : cw < 1200 ? 62 : 78
      graphRef.current = buildGraph(cw, ch, count)
    }

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    const drawStatic = () => {
      const { cw, ch } = sizeRef.current
      const { nodes, edges } = graphRef.current
      if (!nodes.length) return
      ctx.clearRect(0, 0, cw, ch)
      ctx.fillStyle = 'rgba(3, 7, 18, 0.25)'
      ctx.fillRect(0, 0, cw, ch)
      drawTechGrid(ctx, cw, ch, 0)
      for (let ei = 0; ei < edges.length; ei++) {
        const { a, b } = edges[ei]
        const na = nodes[a]
        const nb = nodes[b]
        if (!na || !nb) continue
        const len = Math.hypot(nb.x - na.x, nb.y - na.y)
        const alpha = Math.max(0.05, 0.13 * (1 - Math.min(len / 420, 0.9)))
        drawEdgeGlow(ctx, na, nb, len, 0.6, alpha, 0, ei)
      }
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `${CYAN}${0.28})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.1, 0, Math.PI * 2)
        ctx.fillStyle = `${MAGENTA}${0.42})`
        ctx.fill()
      }
    }

    layout()

    if (reduceMotion) {
      drawStatic()
      const ro = new ResizeObserver(() => {
        layout()
        drawStatic()
      })
      ro.observe(document.documentElement)
      const onResize = () => {
        layout()
        drawStatic()
      }
      window.addEventListener('resize', onResize)
      return () => {
        window.removeEventListener('resize', onResize)
        ro.disconnect()
      }
    }

    const ro = new ResizeObserver(() => layout())
    ro.observe(document.documentElement)
    window.addEventListener('resize', layout)

    let t0 = performance.now()
    const draw = (now) => {
      const t = (now - t0) / 1000
      const { cw, ch } = sizeRef.current
      const { nodes, edges } = graphRef.current
      if (!nodes.length) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, cw, ch)
      ctx.fillStyle = 'rgba(3, 7, 18, 0.22)'
      ctx.fillRect(0, 0, cw, ch)
      drawTechGrid(ctx, cw, ch, t)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x <= 0 || n.x >= cw) n.vx *= -1
        if (n.y <= 0 || n.y >= ch) n.vy *= -1
        n.x = Math.max(1, Math.min(cw - 1, n.x))
        n.y = Math.max(1, Math.min(ch - 1, n.y))
      }

      const pulse = 0.35 + 0.2 * Math.sin(t * 0.82)

      edges.forEach(({ a, b }, ei) => {
        const na = nodes[a]
        const nb = nodes[b]
        if (!na || !nb) return
        const len = Math.hypot(nb.x - na.x, nb.y - na.y)
        const flow = 0.5 + 0.5 * Math.sin(t * 1.38 + (a + b) * 0.09 + na.phase)
        const alpha = Math.max(0.04, (0.11 + 0.1 * flow) * (1 - Math.min(len / 420, 0.9)))
        drawEdgeGlow(ctx, na, nb, len, flow, alpha, t, ei)
      })

      drawNodes(ctx, nodes, t, pulse)

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', layout)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 min-h-full w-full opacity-[0.52] contrast-[1.05]"
      style={{
        mixBlendMode: 'screen',
        filter: 'saturate(1.15)',
      }}
    />
  )
}
