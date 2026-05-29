"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
    const containerRef = useRef(null)
    const sceneRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current

        // Vertex shader
        const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

        // Fragment shader
        const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359
 
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mouse;
      uniform float hover;
      uniform float scale;
 
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;
 
        // 1. Dynamic mouse interactive magnetic warp
        float distToMouse = length(uv - mouse);
        vec2 warpedUv = uv - normalize(uv - mouse) * (0.045 / (distToMouse + 0.18)) * hover;
 
        // 2. Scale coordinate space dynamically (grow & shrink)
        vec2 scaledUv = warpedUv / max(0.01, scale);
 
        // 3. Dynamic interactive aura glow following the cursor
        float mouseGlow = (0.012 / (distToMouse + 0.08)) * hover;
 
        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(scaledUv) + mod(scaledUv.x+scaledUv.y, 0.2));
          }
          // Blend interactive auroral cursor glow into the red-orange spectra
          if (j == 0) color[j] += mouseGlow * 1.5;
          if (j == 1) color[j] += mouseGlow * 0.6;
        }
        
        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `
 
        // Initialize Three.js scene
        const camera = new THREE.Camera()
        camera.position.z = 1
 
        const scene = new THREE.Scene()
        const geometry = new THREE.PlaneGeometry(2, 2)
 
        const uniforms = {
            time: { type: "f", value: 1.0 },
            resolution: { type: "v2", value: new THREE.Vector2() },
            mouse: { type: "v2", value: new THREE.Vector2(0.0, 0.0) },
            hover: { type: "f", value: 0.0 },
            scale: { type: "f", value: 0.0 },
        }
 
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        })
 
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
 
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
 
        container.appendChild(renderer.domElement)
 
        // Handle resize dynamically with viewport fallback on desktop
        const handleResize = () => {
            let width = container.clientWidth
            let height = container.clientHeight
 
            // On desktop, fallback to window viewport size to guarantee perfect round circles (no layout/scroll stretching)
            if (window.innerWidth > 980) {
                width = window.innerWidth
                height = window.innerHeight
            } else {
                if (!height || height < 100) {
                    width = window.innerWidth
                    height = window.innerHeight
                }
            }
 
            // Enforce positive, non-zero dimensions to prevent division-by-zero WebGL NaN failures
            width = Math.max(1, width || window.innerWidth || 800)
            height = Math.max(1, height || window.innerHeight || 600)
 
            renderer.setSize(width, height)
            uniforms.resolution.value.x = Math.max(1.0, renderer.domElement.width)
            uniforms.resolution.value.y = Math.max(1.0, renderer.domElement.height)
        }
 
        // Use ResizeObserver for accurate element bounds tracking
        const resizeObserver = new ResizeObserver(() => {
            handleResize()
        })
        resizeObserver.observe(container)
 
        // Listen to window resize events as a robust fallback
        window.addEventListener("resize", handleResize, false)
 
        // Delayed initial resize to bypass any initial layout engine delays
        const timerId = setTimeout(handleResize, 100)
 
        // Dynamic mouse and scroll state tracking
        const parentElement = container.parentElement || container
        const targetMouse = new THREE.Vector2(0.0, 0.0)
        const currentMouse = new THREE.Vector2(0.0, 0.0)
        
        let targetHover = 0.0
        let currentHover = 0.0
        
        let currentScale = 0.0
 
        const handleMouseMove = (e) => {
            const rect = parentElement.getBoundingClientRect()
            const aspect = rect.width / Math.max(1.0, rect.height)
            const x = ((e.clientX - rect.left) / Math.max(1.0, rect.width)) * 2.0 - 1.0
            const y = -(((e.clientY - rect.top) / Math.max(1.0, rect.height)) * 2.0 - 1.0)
            
            targetMouse.x = x * aspect
            targetMouse.y = y
            targetHover = 1.0
        }
 
        const handleMouseLeave = () => {
            targetHover = 0.0
        }
 
        parentElement.addEventListener("mousemove", handleMouseMove, { passive: true })
        parentElement.addEventListener("mouseleave", handleMouseLeave, { passive: true })
 
        // Animation loop
        const animate = () => {
            const animationId = requestAnimationFrame(animate)
            uniforms.time.value += 0.05
 
            // 1. Smoothly interpolate mouse coordinate (lerp)
            currentMouse.x += (targetMouse.x - currentMouse.x) * 0.1
            currentMouse.y += (targetMouse.y - currentMouse.y) * 0.1
            uniforms.mouse.value.copy(currentMouse)
 
            // 2. Smoothly interpolate hover state transition
            currentHover += (targetHover - currentHover) * 0.1
            uniforms.hover.value = currentHover
 
            // 3. Calculate scroll visibility reveal progress (Grow & Shrink)
            const rect = parentElement.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const visibleHeight = Math.max(0, viewportHeight - rect.top)
            
            const scrollProgress = rect.bottom < 0
                ? 0.0
                : rect.height > 0
                    // Reaches full scale when 55% of the viewport is scroll-revealed
                    ? Math.min(1.0, visibleHeight / (viewportHeight * 0.55))
                    : 1.0
 
            const targetScaleVal = targetHover > 0.5
                ? 1.22 * scrollProgress + Math.sin(uniforms.time.value * 0.04) * 0.04 * scrollProgress
                : scrollProgress
 
            currentScale += (targetScaleVal - currentScale) * 0.06
            uniforms.scale.value = Math.max(0.0, currentScale)
 
            renderer.render(scene, camera)
 
            if (sceneRef.current) {
                sceneRef.current.animationId = animationId
            }
        }
 
        // Store scene references for cleanup
        sceneRef.current = {
            camera,
            scene,
            renderer,
            uniforms,
            animationId: 0,
        }
 
        // Start animation
        animate()
 
        // Cleanup function
        return () => {
            resizeObserver.disconnect()
            window.removeEventListener("resize", handleResize)
            clearTimeout(timerId)
            parentElement.removeEventListener("mousemove", handleMouseMove)
            parentElement.removeEventListener("mouseleave", handleMouseLeave)
 
            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId)
 
                if (container && sceneRef.current.renderer.domElement) {
                    container.removeChild(sceneRef.current.renderer.domElement)
                }
 
                sceneRef.current.renderer.dispose()
                geometry.dispose()
                material.dispose()
            }
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full"
            style={{
                background: "#000",
                overflow: "hidden",
            }}
        />
    )
}
