"use client";
import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Users,
  FileText,
  ArrowRight,
  Lock,
  CheckCircle2,
  BarChart3,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans text-slate-900">

      {/* NAVBAR: Stick & Formal */}
      <nav className="sticky top-0 z-50 w-full bg-[#003D79] border-b border-[#002B55] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Area */}
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/10 rounded-sm backdrop-blur-sm">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg leading-tight tracking-tight">
                  ProcureFlow
                </span>
                <span className="text-[10px] text-blue-200 uppercase tracking-wider">
                  By PT XYZ Bank Tbk
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">Fitur Utama</a>
              <a href="#compliance" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">Keamanan & Kepatuhan</a>
              <a href="#contact" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">Bantuan</a>
            </div>

            {/* Login Action */}
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  className="bg-white text-[#003D79] hover:bg-blue-50 font-bold rounded-sm text-xs px-4 border border-transparent shadow-sm"
                >
                  Vendor Login
                </Button>
              </Link>
              <Link href="/login" className="hidden sm:block">
                <span className="text-xs font-semibold text-white/80 hover:text-white transition-colors">
                  Internal Staff &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION: Professional & Trustworthy */}
      <div className="relative bg-[#003D79] overflow-hidden">
        {/* Abstract Corporate Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/50 border border-blue-700 text-blue-100 text-xs font-medium mb-6 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
            <span>ISO 27001 Certified & OJK Compliant Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
            Sistem Pengadaan <br />
            <span className="text-blue-200">Terintegrasi & Transparan</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-10 leading-relaxed font-light">
            Portal satu pintu untuk pendaftaran rekanan, e-tendering, dan invoicing.
            Mewujudkan tata kelola perusahaan yang baik (GCG) dengan efisiensi digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href="/auth/register/vendor">
              <Button size="lg" className="h-12 px-8 bg-yellow-500 hover:bg-yellow-400 text-[#003D79] font-bold rounded-md shadow-lg shadow-blue-900/20 text-base">
                Daftar Jadi Rekanan
              </Button>
            </Link>
            <a href="#learn-more">
              <Button size="lg" variant="outline" className="h-12 px-8 border-white/30 text-white hover:bg-white/10 font-semibold rounded-md backdrop-blur-sm">
                Pelajari Prosedur
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex items-center justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-white text-xs font-semibold tracking-widest uppercase">Trusted Standard:</div>
            <div className="h-8 w-24 bg-white/10 rounded flex items-center justify-center text-white/50 text-[10px] font-mono">ISO 27001</div>
            <div className="h-8 w-24 bg-white/10 rounded flex items-center justify-center text-white/50 text-[10px] font-mono">PCI DSS</div>
            <div className="h-8 w-24 bg-white/10 rounded flex items-center justify-center text-white/50 text-[10px] font-mono">OJK REG</div>
          </div>
        </div>
      </div>

      {/* STATS SECTION: Credibility */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#003D79] mb-1">500+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Rekanan Aktif</div>
            </div>
            <div className="text-center pl-8">
              <div className="text-3xl font-bold text-[#003D79] mb-1">Rp 2.5T</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Nilai Transaksi</div>
            </div>
            <div className="text-center pl-8">
              <div className="text-3xl font-bold text-[#003D79] mb-1">100%</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Paperless</div>
            </div>
            <div className="text-center pl-8">
              <div className="text-3xl font-bold text-[#003D79] mb-1">24/7</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Sistem Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES / WHY US: Grid Layout */}
      <div id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengapa Bergabung dengan ProcureFlow?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Kami mengedepankan prinsip transparansi, akuntabilitas, dan keamanan dalam setiap proses pengadaan barang dan jasa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-md shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center mb-6 group-hover:bg-[#003D79] transition-colors">
                <Users className="w-6 h-6 text-[#003D79] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Manajemen Vendor Terpadu</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Proses KYC (Know Your Customer) dan due diligence vendor yang terdigitalisasi penuh. Update dokumen legal hanya dengan satu klik.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2" />
                  <span>Verifikasi Dokumen Otomatis</span>
                </li>
                <li className="flex items-center text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2" />
                  <span>Vendor Performance Scorecard</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-md shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center mb-6 group-hover:bg-[#003D79] transition-colors">
                <Globe className="w-6 h-6 text-[#003D79] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">E-Procurement & Tender</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Ikuti lelang pengadaan secara fair dan transparan. Dapatkan notifikasi real-time untuk setiap peluang baru dan status penawaran.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2" />
                  <span>RFQ Terbuka & Undangan</span>
                </li>
                <li className="flex items-center text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2" />
                  <span>Sistem Bidding Terenkripsi</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-md shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center mb-6 group-hover:bg-[#003D79] transition-colors">
                <ShieldCheck className="w-6 h-6 text-[#003D79] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Kepatuhan & Keamanan</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Platform kami didesain sesuai standar keamanan perbankan (ISO 27001) dan regulasi OJK untuk melindungi data sensitif Anda.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2" />
                  <span>Enkripsi Data End-to-End</span>
                </li>
                <li className="flex items-center text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2" />
                  <span>Audit Trail Lengkap</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS / FLOW */}
      <div className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Alur Pendaftaran Rekanan</h2>
            <p className="text-slate-600">Mudah, cepat, dan sepenuhnya digital.</p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-4">
                <div className="w-16 h-16 bg-[#003D79] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-white shadow-sm">1</div>
                <h4 className="font-bold text-slate-900 mb-2">Registrasi Online</h4>
                <p className="text-xs text-slate-500">Isi formulir dasar perusahaan dan kontak PIC.</p>
              </div>
              <div className="bg-white p-4">
                <div className="w-16 h-16 bg-white text-[#003D79] border-2 border-[#003D79] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-sm">2</div>
                <h4 className="font-bold text-slate-900 mb-2">Upload Dokumen</h4>
                <p className="text-xs text-slate-500">Unggah SIUP, NPWP, TDP, dan dokumen legal lainnya.</p>
              </div>
              <div className="bg-white p-4">
                <div className="w-16 h-16 bg-white text-[#003D79] border-2 border-[#003D79] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-sm">3</div>
                <h4 className="font-bold text-slate-900 mb-2">Verifikasi & KYC</h4>
                <p className="text-xs text-slate-500">Tim kami melakukan validasi data dan background check.</p>
              </div>
              <div className="bg-white p-4">
                <div className="w-16 h-16 bg-white text-[#003D79] border-2 border-[#003D79] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-sm">4</div>
                <h4 className="font-bold text-slate-900 mb-2">Aktif Berdtransaksi</h4>
                <p className="text-xs text-slate-500">Terima akun akses dan mulai ikuti tender pengadaan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER: Corporate Standard */}
      <footer className="bg-[#0B1120] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-8 h-8 text-blue-400" />
                <span className="font-bold text-2xl tracking-tight">ProcureFlow</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Sistem Informasi Pengadaan Barang dan Jasa PT XYZ Bank Tbk. Berkomitmen pada integritas dan inovasi berkelanjutan.
              </p>
              <div className="flex gap-4 mt-6">
                {/* Social Placeholders */}
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"><Globe className="w-4 h-4" /></div>
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"><Users className="w-4 h-4" /></div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Dukungan</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Panduan Rekanan</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Hubungi Kami</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pakta Integritas</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Whistleblowing System</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              &copy; 2026 PT XYZ Bank Tbk. Terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK).
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Lock className="w-3 h-3" />
              <span>256-bit SSL Encrypted Connection</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
