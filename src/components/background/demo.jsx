import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function DemoOne() {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black">
      <ShaderAnimation />
      <span className="absolute pointer-events-none z-10 text-center text-6xl md:text-8xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
        Shader Animation
      </span>
    </div>
  )
}