"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/moving-border";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Building2, ShieldCheck, Zap, Globe, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-slate-950 relative flex flex-col antialiased">

      {/* Navbar Overlay */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            PT XYZ<span className="font-light text-slate-400"> E-PROCUREMENT</span>
          </span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Internal Staff
          </Link>
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Vendor Portal
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col justify-center items-center relative z-10 pt-20">

        {/* HERO SECTION */}
        <div className="max-w-4xl mx-auto p-4 text-center mt-10">
          <h1 className="relative z-10 text-5xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold tracking-tight">
            The Future of <br /> Enterprise Procurement
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-6 text-sm md:text-base relative z-10">
            Streamline your supply chain, automate vendor management, and gain real-time financial insights with PT XYZ's next-generation e-procurement platform.
          </p>

          <div className="flex gap-4 justify-center mt-8 relative z-10">
            <Link href="/login">
              <Button
                borderRadius="1.75rem"
                className="bg-slate-900 text-white border-slate-800 font-semibold"
              >
                Vendor Access
              </Button>
            </Link>
            <Link href="/login">
              <button className="h-16 w-40 rounded-full bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors border border-slate-700">
                Internal Login
              </button>
            </Link>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 mt-24 mb-20 relative z-10">
          <CardSpotlight className="flex flex-col items-start p-8">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 border border-blue-500/20">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Accelerated Workflows</h3>
            <p className="text-sm text-neutral-400">
              Reduce procurement cycle times by 40% with automated approval routing and instant purchase order generation.
            </p>
          </CardSpotlight>

          <CardSpotlight className="flex flex-col items-start p-8" color="#10b981">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 border border-emerald-500/20">
              <Globe className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Vendor Ecosystem</h3>
            <p className="text-sm text-neutral-400">
              A unified portal for 500+ vendors to manage RFQs, invoices, and performance scorecards transparently.
            </p>
          </CardSpotlight>

          <CardSpotlight className="flex flex-col items-start p-8" color="#f43f5e">
            <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center mb-4 border border-rose-500/20">
              <ShieldCheck className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Enterprise Compliance</h3>
            <p className="text-sm text-neutral-400">
              Built-in tax withholding (PPh/PPN), audit trails, and role-based access control (RBAC) specifically for Indonesian standards.
            </p>
          </CardSpotlight>
        </div>

      </div>

      {/* Background Effect */}
      <BackgroundBeams />

      <footer className="relative z-10 border-t border-white/5 bg-slate-950 py-8 text-center">
        <p className="text-slate-500 text-xs">
          &copy; 2026 PT XYZ Tbk. All rights reserved. Secured by NexusEngine.
        </p>
      </footer>
    </div>
  );
}
