'use client';

import { useAuth } from '@/lib/AuthContext';
import { 
  Github, 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  Gift, 
  Calendar, 
  Lock
} from 'lucide-react';
import { useState } from 'react';
import Atropos from 'atropos/react';
import { cn } from '@/lib/utils';

export function LoginScreen() {
  const { startSignIn, signInWithTest } = useAuth();
  const [hoveredBtn, setHoveredBtn] = useState<'github' | 'google' | 'test' | null>(null);

  const features = [
    {
      icon: Gift,
      title: 'Curated Opportunities',
      desc: 'Get exclusive access to premium student developer packs, cloud credits, and software toolkeys.',
    },
    {
      icon: Calendar,
      title: 'Hackathons & Events',
      desc: 'Stay ahead with a synced calendar of global hackathons, workshops, and local developer meetups.',
    },
    {
      icon: Terminal,
      title: 'Simplified Internships',
      desc: 'Browse and track active internship opportunities direct from top repository feeds.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#030712] text-white flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* Deep Cyber-Ink Ambient Glow Anomalies */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)] blur-[140px] pointer-events-none z-0" />

      {/* Sleek Dot Grid Mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Product Intro */}
        <div className="lg:col-span-7 flex flex-col space-y-6 lg:pr-8 text-center lg:text-left">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#22d3ee] to-[#10b981] shadow-md shadow-cyan-500/25">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              StudentStack
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-100">
              The Developer Launchpad{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                for Students
              </span>
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Supercharge your student journey. Unlock tools, keep track of hackathons, find internships, and display your developer credentials in one hub.
            </p>
          </div>

          {/* Feature List (Glassmorphism 2.0 cards) */}
          <div className="hidden md:grid grid-cols-1 gap-4 max-w-xl mx-auto lg:mx-0 pt-4">
            {features.map((feat, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-[15px] transition-all hover:bg-white/[0.03] hover:border-white/[0.08]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-cyan-400">
                  <feat.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-zinc-200">{feat.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-medium">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Login Box wrapped in Atropos 3D Tilt */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <Atropos
            className="w-full rounded-3xl"
            highlight={true}
            shadow={true}
            shadowOffset={35}
            rotateTouch={true}
          >
            {/* Main Login Card container */}
            <div className="relative rounded-3xl p-8 flex flex-col overflow-hidden min-h-[440px]">
              
              {/* Background layer - Glassmorphism 2.0 at offset 0 */}
              <div 
                className="absolute inset-0 rounded-3xl glass-card-v2 transition-all duration-300 pointer-events-none z-0"
                data-atropos-offset="0"
              />

              {/* Security Lock Badge floating at offset 12 */}
              <div 
                className="absolute -top-2.5 right-6 flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 px-3 py-1 z-25 shadow-md"
                data-atropos-offset="12"
              >
                <Lock className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Secure OAuth</span>
              </div>

              {/* Login Card Contents floating at offset 5 */}
              <div className="relative z-10 flex flex-col flex-1" data-atropos-offset="5">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-zinc-100">Get Connected</h2>
                  <p className="text-xs text-zinc-400 mt-1 font-medium">Authenticate securely to sync your workspace</p>
                </div>

                {/* Login Buttons */}
                <div className="space-y-4 mb-6">
                  
                  {/* GitHub Button */}
                  <button
                    onClick={() => startSignIn('github')}
                    onMouseEnter={() => setHoveredBtn('github')}
                    onMouseLeave={() => setHoveredBtn(null)}
                    className={cn(
                      "w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md",
                      "border border-white/5 bg-[#24292f]/60 text-white hover:bg-[#24292f]/90 hover:border-white/10 hover:shadow-black/20"
                    )}
                  >
                    <Github className={cn("h-5 w-5 transition-transform", hoveredBtn === 'github' && "scale-110")} />
                    <span>Continue with GitHub</span>
                  </button>

                  {/* Google Button */}
                  <button
                    onClick={() => startSignIn('google')}
                    onMouseEnter={() => setHoveredBtn('google')}
                    onMouseLeave={() => setHoveredBtn(null)}
                    className={cn(
                      "w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md",
                      "border border-white/5 bg-white/[0.02] text-white hover:bg-white/[0.05] hover:border-white/10 hover:shadow-black/20"
                    )}
                  >
                    <svg className={cn("h-4 w-4 transition-transform", hoveredBtn === 'google' && "scale-110")} viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  {/* Separator */}
                  <div className="flex items-center gap-3 my-4">
                    <div className="h-[1px] flex-1 bg-white/[0.05]" />
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Or test the app</span>
                    <div className="h-[1px] flex-1 bg-white/[0.05]" />
                  </div>

                  {/* Test Access (Guest Developer) */}
                  <button
                    onClick={signInWithTest}
                    onMouseEnter={() => setHoveredBtn('test')}
                    onMouseLeave={() => setHoveredBtn(null)}
                    className={cn(
                      "w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md",
                      "border border-dashed border-white/10 bg-white/[0.01] text-zinc-400 hover:text-white hover:bg-gradient-to-r hover:from-[#10b981]/15 hover:to-[#22d3ee]/15 hover:border-emerald-500/30"
                    )}
                  >
                    <span>Continue as Guest Developer</span>
                    <ArrowRight className={cn("h-3.5 w-3.5 text-zinc-500 transition-transform", hoveredBtn === 'test' && "translate-x-1 text-cyan-400")} />
                  </button>

                </div>

                {/* Footer Trust Info */}
                <div className="mt-auto pt-4 border-t border-white/[0.04] flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-medium">
                  <Lock className="h-3 w-3 text-cyan-500/70" />
                  <span>Session data is stored in standard local cookies</span>
                </div>

              </div>

            </div>
          </Atropos>
        </div>

      </div>
    </div>
  );
}
