"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F4F7F9] text-[#112C3E] font-sans antialiased">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#EAF1F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3e4fea] flex items-center justify-center text-white font-extrabold text-xl shadow-md">
              M
            </div>
            <span className="font-bold text-2xl text-[#112C3E] tracking-tight font-space">MediaHub</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#112C3E]">
            <div
              className="relative group cursor-pointer flex items-center gap-1.5 hover:text-[#677F9B] transition"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span>Solutions</span>
              <ChevronDownIcon className="w-3.5 h-3.5 text-[#677F9B]" />

              {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl border border-[#EAF1F6] py-2 z-50">
                  <Link href="/solutions" className="block px-4 py-2 hover:bg-[#F5F8FA]">Marketing</Link>
                  <Link href="/solutions" className="block px-4 py-2 hover:bg-[#F5F8FA]">For Advertisers</Link>
                  <Link href="/solutions" className="block px-4 py-2 hover:bg-[#F5F8FA]">For Brands</Link>
                  <Link href="/solutions" className="block px-4 py-2 hover:bg-[#F5F8FA]">For Agencies</Link>
                </div>
              )}
            </div>

            <Link href="/blog" className="hover:text-[#677F9B] transition">
              Blog
            </Link>
            <Link href="/faq" className="hover:text-[#677F9B] transition">
              FAQ
            </Link>

            <div
              className="relative group cursor-pointer flex items-center gap-1.5 hover:text-[#677F9B] transition"
              onMouseEnter={() => setActiveDropdown("podcasts")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span>Podcasts</span>
              <ChevronDownIcon className="w-3.5 h-3.5 text-[#677F9B]" />

              {activeDropdown === "podcasts" && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl border border-[#EAF1F6] py-2 z-50">
                  <Link href="/podcasts" className="block px-4 py-2 hover:bg-[#F5F8FA]">Media Kit</Link>
                  <Link href="/podcasts" className="block px-4 py-2 hover:bg-[#F5F8FA]">Podcast Library</Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="hover:text-[#677F9B] transition">
              Contact us
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full border border-[#112C3E] text-[#112C3E] font-semibold text-[15px] hover:bg-[#EAF1F6] transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 rounded-full bg-[#112C3E] text-white font-semibold text-[15px] hover:opacity-90 transition shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#112C3E] hover:bg-[#EAF1F6]"
          >
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#EAF1F6] px-6 py-6 space-y-4">
            <Link href="/solutions" className="block text-lg font-medium text-[#112C3E]">Solutions</Link>
            <Link href="/blog" className="block text-lg font-medium text-[#112C3E]">Blog</Link>
            <Link href="/faq" className="block text-lg font-medium text-[#112C3E]">FAQ</Link>
            <Link href="/podcasts" className="block text-lg font-medium text-[#112C3E]">Podcasts</Link>
            <Link href="/contact" className="block text-lg font-medium text-[#112C3E]">Contact us</Link>
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/login" className="w-full text-center py-3 rounded-full border border-[#112C3E] font-semibold">
                Login
              </Link>
              <Link href="/register" className="w-full text-center py-3 rounded-full bg-[#112C3E] text-white font-semibold">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-bold leading-[1.05] tracking-tight text-[#112C3E]">
                <span className="text-[#3E4FEA]">Digital PR</span> &<br />
                Blog & Guest Posting Service
              </h1>

              <div className="space-y-3 text-lg sm:text-xl text-[#677F9B]">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-5 h-5 rounded-full bg-[#8CF08A] flex items-center justify-center text-[#112C3E]">
                    ✓
                  </div>
                  <span className="font-medium text-[#112C3E]">SEO, PR Distribution & Blog Posting</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-5 h-5 rounded-full bg-[#8CF08A] flex items-center justify-center text-[#112C3E]">
                    ✓
                  </div>
                  <span className="font-medium text-[#112C3E]">Turn your content into revenue!</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#112C3E] text-white font-semibold text-lg flex items-center justify-center gap-3 hover:bg-[#2632A3] transition shadow-lg group"
                >
                  <span>Sign Up for Free</span>
                  <div className="w-8 h-8 rounded-full bg-[#8CF08A] flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowUpRightIcon className="w-4 h-4 text-[#112C3E]" />
                  </div>
                </Link>
              </div>

              <div className="pt-8 flex items-center justify-center lg:justify-start gap-3 text-sm text-[#677F9B]">
                <div className="w-8 h-12 rounded-full border-2 border-[#677F9B] flex items-start justify-center p-1">
                  <div className="w-1.5 h-3 bg-[#677F9B] rounded-full animate-bounce mt-1"></div>
                </div>
                <span>Scroll down to learn more</span>
              </div>
            </div>

            {/* Right Metrics Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#EAF1F6] relative space-y-8">
                {/* Metric 1 */}
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-[#8CF08A] text-[#112C3E] rounded-full text-xs font-bold">
                    +15k last month
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-extrabold text-[#112C3E] tracking-tight">150k</span>
                    <span className="text-2xl font-semibold text-[#112C3E]">Unique websites</span>
                  </div>
                </div>

                <hr className="border-[#EAF1F6]" />

                {/* Metric 2 */}
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-[#E2E6F8] text-[#3E4FEA] rounded-full text-xs font-bold">
                    +10k last month
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-extrabold text-[#112C3E] tracking-tight">45k</span>
                    <span className="text-xl font-semibold text-[#112C3E] leading-tight">
                      Real Customers Reviews<br />about Websites
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fast, Friendly & Secure Section */}
      <section className="py-24 bg-[#F4F7F9]">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-3xl sm:text-[40px] font-bold text-center text-[#112c3e] tracking-tight mb-16">
            The Fast, Friendly & Secure Guest Posting Process
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Card 1: Choose from 150k+ */}
            <div className="bg-white rounded-[40px] p-10 lg:p-12 shadow-sm border border-[#eaf1f6] flex flex-col justify-between min-h-[520px]">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-[28px] font-bold text-[#112c3e] leading-snug tracking-tight">
                  Choose from 150K+ Platforms<br />and Filter by Actual Metrics
                </h3>
              </div>

              {/* Graphic Mockup (Match Adsy) */}
              <div className="relative h-[280px] bg-white rounded-2xl border border-[#eaf1f6] mt-8 flex items-center justify-center overflow-hidden">
                {/* Search Bar Input */}
                <div className="absolute top-6 left-6 right-6 h-[54px] rounded-xl border border-[#dcdce5] bg-white px-5 flex items-center justify-between shadow-sm">
                  <div className="w-4 h-4 rounded-full border-2 border-[#112c3e] opacity-35"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#112c3e] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#112c3e] rounded-full"></div>
                  </div>
                </div>

                {/* Filter Icon Badge (Absolute Center) */}
                <div className="absolute z-10 w-[72px] h-[72px] rounded-full bg-[#677f9b] flex items-center justify-center shadow-lg border-4 border-white text-white">
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M3 4h18v2L14 12v7l-4 3v-10L3 6V4z" />
                  </svg>
                </div>

                {/* Moz / Amazon / Semrush / GA Logo Nodes */}
                <div className="absolute left-8 bottom-28 w-[64px] h-[64px] rounded-full bg-white shadow-md border border-[#eaf1f6] flex items-center justify-center text-orange-500 font-extrabold text-2xl">
                  a
                </div>
                <div className="absolute right-20 top-28 w-[58px] h-[58px] rounded-full bg-white shadow-md border border-[#eaf1f6] flex items-center justify-center text-red-500 font-bold text-lg">
                  🔥
                </div>
                <div className="absolute left-28 bottom-8 w-[72px] h-[72px] rounded-full bg-white shadow-md border border-[#eaf1f6] flex items-center justify-center text-[#3e4fea] font-bold text-sm tracking-tight">
                  MOZ
                </div>
                <div className="absolute right-8 bottom-16 w-[56px] h-[56px] rounded-full bg-white shadow-md border border-[#eaf1f6] flex items-center justify-center text-amber-500 font-bold text-lg">
                  📊
                </div>
              </div>
            </div>

            {/* Card 2: Custom Organization of Interfaces */}
            <div className="bg-white rounded-[40px] p-10 lg:p-12 shadow-sm border border-[#eaf1f6] flex flex-col justify-between min-h-[520px] relative overflow-hidden">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-[28px] font-bold text-[#112c3e] leading-snug tracking-tight">
                  Custom Organization of<br />Interfaces
                </h3>
                <ul className="space-y-2 pt-2 text-[#677f9b] text-base font-medium">
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#369f17] font-extrabold text-sm">✓</span>
                    <span>Custom Website Lists</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#369f17] font-extrabold text-sm">✓</span>
                    <span>Custom Inventory Metrics</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#369f17] font-extrabold text-sm">✓</span>
                    <span>Set & Create Filter Subscriptions</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#369f17] font-extrabold text-sm">✓</span>
                    <span>Import / Export Data</span>
                  </li>
                </ul>
              </div>

              {/* Notify button & list ui */}
              <div className="mt-8 space-y-3 relative z-10">
                <button className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl border border-[#dcdce5] text-xs font-semibold text-[#677f9b] bg-white hover:bg-[#f4f7f9] transition">
                  <span>🔔</span> Notify about new sites
                </button>

                {/* 3 Mock Rows with Blue progress lines */}
                <div className="space-y-2.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-3 rounded-xl border border-[#eaf1f6] flex items-center justify-between shadow-sm">
                      <span className="text-xs font-semibold text-[#3e4fea]">https://</span>
                      <div className="w-[120px] sm:w-[160px] h-1.5 bg-[#3e4fea] rounded-full mx-2"></div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#d9ddff] inline-block"></span>
                        <span className="w-5 h-5 rounded-full bg-[#d6f5d0] inline-block"></span>
                        {i > 1 && <span className="w-5 h-5 rounded-full bg-[#fddde5] inline-block"></span>}
                        <span className="text-amber-400 text-sm">★</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overlapping Blue Gear Badge */}
                <div className="absolute right-0 top-[-60px] w-24 h-24 rounded-full bg-[#3e4fea] flex items-center justify-center shadow-xl text-white transform rotate-12">
                  <svg className="w-12 h-12 fill-white animate-spin-slow" viewBox="0 0 24 24">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Card 3 - Automatic Content Check after Guest Post Publication */}
          <div className="max-w-[600px] bg-white rounded-[40px] p-10 lg:p-12 shadow-sm border border-[#eaf1f6] min-h-[460px] mx-auto flex flex-col justify-between">
            <div className="space-y-4 mb-6">
              <h3 className="text-2xl sm:text-[28px] font-bold text-[#112c3e] tracking-tight">
                Automatic Content Check after<br />Guest Post Publication
              </h3>
            </div>

            {/* Timeline UI Diagram */}
            <div className="relative border-t border-[#eaf1f6] pt-10 pb-4">
              {/* Date Markers */}
              <div className="flex justify-between text-xs text-[#677f9b] font-semibold mb-6 px-2">
                <span>1 Jan</span>
                <span>10</span>
                <span className="relative z-10 px-2 py-1 bg-[#3e4fea] text-white rounded-full text-[10px]">15</span>
                <span>20</span>
              </div>

              {/* Vertical dotted track lines */}
              <div className="absolute inset-0 flex justify-between px-6 pointer-events-none opacity-20">
                <div className="border-r border-dashed border-[#112c3e] h-full"></div>
                <div className="border-r border-dashed border-[#112c3e] h-full"></div>
                <div className="border-r-2 border-solid border-[#3e4fea] h-full"></div>
                <div className="border-r border-dashed border-[#112c3e] h-full"></div>
              </div>

              {/* Timeline pills */}
              <div className="space-y-4 relative z-10">
                <div className="flex">
                  <div className="bg-[#8cf08a] text-[#112c3e] font-semibold text-xs py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-sm ml-2">
                    <span>✓</span> Post checked
                  </div>
                </div>
                <div className="flex justify-center pr-12">
                  <div className="bg-[#e2e6f8] text-[#3e4fea] font-semibold text-xs py-1.5 px-4 rounded-full shadow-sm">
                    Google Index Control
                  </div>
                </div>
                <div className="flex justify-end pr-16">
                  <div className="bg-[#8cf08a] text-[#112c3e] font-semibold text-xs py-1.5 px-4 rounded-full shadow-sm">
                    Post check
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#e2e6f8] text-[#3e4fea] font-semibold text-xs py-1.5 px-4 rounded-full shadow-sm mr-8">
                    Google Index Control
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Place Button Centered */}
          <div className="flex justify-center mt-12">
            <Link
              href="/register"
              className="inline-flex items-center justify-between gap-6 pl-8 pr-3 py-3.5 rounded-full bg-[#112c3e] text-white font-bold text-[15px] hover:bg-[#2632a3] transition group shadow-md"
            >
              <span>Place Guest Posts Securely</span>
              <div className="w-10 h-10 rounded-full bg-[#8cf08a] flex items-center justify-center text-[#112c3e] group-hover:rotate-45 transition-transform">
                <svg className="w-5 h-5 fill-[#112c3e]" viewBox="0 0 26 18">
                  <path d="M24 9L25.0444 10.0767C25.3356 9.79415 25.5 9.40573 25.5 9C25.5 8.59427 25.3356 8.20585 25.0444 7.92335L24 9ZM15.7396 14.9233C15.145 15.5002 15.1305 16.4498 15.7073 17.0444C16.2842 17.639 17.2338 17.6535 17.8284 17.0767L15.7396 14.9233ZM17.8284 0.923348C17.2338 0.346529 16.2842 0.360958 15.7073 0.955576C15.1305 1.55019 15.145 2.49983 15.7396 3.07665L17.8284 0.923348ZM2 7.5C1.17157 7.5 0.5 8.17157 0.5 9C0.5 9.82843 1.17157 10.5 2 10.5L2 7.5ZM22.9556 7.92335L15.7396 14.9233L17.8284 17.0767L25.0444 10.0767L22.9556 7.92335ZM15.7396 3.07665L22.9556 10.0767L25.0444 7.92335L17.8284 0.923348L15.7396 3.07665ZM24 7.5L2 7.5L2 10.5L24 10.5L24 7.5Z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Bottom Left Badge & Carousel */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:flex items-center gap-3 bg-white pl-2 pr-4 py-2 rounded-full shadow-lg border border-[#eaf1f6]">
        <div className="w-10 h-10 rounded-full bg-[#369f17] text-white flex items-center justify-center font-bold text-sm">
          ★ 4.5<span className="text-[10px] font-normal opacity-80">/5</span>
        </div>
        <span className="text-sm font-bold text-[#112c3e] flex items-center gap-2">
          <span className="text-[#ed254e] font-extrabold">G2</span> Review
        </span>
        <div className="flex gap-1 ml-2 border-l border-[#eaf1f6] pl-3">
          <button className="w-7 h-7 rounded-full border border-[#dcdce5] flex items-center justify-center hover:bg-[#f4f7f9]">
            <ChevronLeftIcon className="w-4 h-4 text-[#677f9b]" />
          </button>
          <button className="w-7 h-7 rounded-full border border-[#dcdce5] flex items-center justify-center hover:bg-[#f4f7f9]">
            <ChevronRightIcon className="w-4 h-4 text-[#677f9b]" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Right Help Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-[#eaf1f6] text-xs font-medium text-[#112c3e]">
          <button className="text-[#677f9b] hover:text-[#112c3e] mr-1">✕</button>
          <span>Hi. Need any help?</span>
        </div>
        <div className="bg-white p-2 rounded-full shadow-xl border border-[#eaf1f6] flex gap-2">
          <button className="w-12 h-12 rounded-full bg-[#8cf08a] text-[#112c3e] flex items-center justify-center hover:scale-105 transition">
            <PhoneIcon className="w-5 h-5 text-[#112c3e]" />
          </button>
          <button className="w-12 h-12 rounded-full bg-[#8cf08a] text-[#112c3e] flex items-center justify-center hover:scale-105 transition">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#112c3e]" />
          </button>
        </div>
      </div>

      {/* Feature Grid: What You Get */}
      <section className="py-20 bg-[#F4F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-center text-[#112C3E]">
            What You Get with Adsy Blog Posting Service
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Box 1 */}
            <div className="bg-[#8CF08A] rounded-3xl p-8 flex flex-col justify-between min-h-[300px] text-[#112C3E]">
              <div className="w-12 h-12 rounded-xl bg-[#112C3E] text-white flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2 mt-8">
                <h3 className="text-2xl font-bold">Moz DA, Ahrefs DR, GA Traffic</h3>
                <p className="text-sm opacity-80">
                  All the needed professional metrics for better posts placement & SEO results
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-[#8CF08A] rounded-3xl p-8 flex flex-col justify-between min-h-[300px] text-[#112C3E]">
              <div className="w-12 h-12 rounded-xl bg-[#112C3E] text-white flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2 mt-8">
                <h3 className="text-2xl font-bold">Guarantees for advertisers</h3>
                <p className="text-sm opacity-80">
                  Adsy monitors the presence of links, and provides task execution control
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-[#8CF08A] rounded-3xl p-8 flex flex-col justify-between min-h-[300px] text-[#112C3E]">
              <div className="w-12 h-12 rounded-xl bg-[#112C3E] text-white flex items-center justify-center">
                <HandThumbUpIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2 mt-8">
                <h3 className="text-2xl font-bold">Your feedback turned into features</h3>
                <p className="text-sm opacity-80">
                  Adsy is always happy to hear your feedback that actually influences what features we add
                </p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-[#8CF08A] rounded-3xl p-8 flex flex-col justify-between min-h-[300px] text-[#112C3E]">
              <div className="w-12 h-12 rounded-xl bg-[#112C3E] text-[#8CF08A] flex items-center justify-center">
                <PencilSquareIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2 mt-8">
                <h3 className="text-2xl font-bold">Content placement</h3>
                <p className="text-sm opacity-80">
                  Easily place your content on chosen sites with real traffic and active audience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section (Dark Navy Banner) */}
      <section className="bg-[#112C3E] py-24 text-white overflow-hidden relative select-none">
        <div className="max-w-[1440px] mx-auto text-center space-y-12">
          {/* Header */}
          <div className="flex items-center justify-center gap-2.5 text-[#f5a723] font-medium text-lg sm:text-xl">
            <span className="text-xl">🌾</span>
            <h2 className="text-[#f4f7f9] font-bold text-3xl sm:text-[40px] tracking-tight font-space">Our Awards</h2>
            <span className="text-xl">🌾</span>
          </div>

          {/* Infinite Scrolling Ticker Area */}
          <div className="space-y-8 pt-4 relative">
            {/* Ticker Row 1 (Left Moving) */}
            <div className="w-full overflow-hidden whitespace-nowrap flex py-1">
              <div className="flex gap-12 items-center text-5xl sm:text-6xl lg:text-[76px] font-black tracking-normal animate-marquee-left leading-none uppercase select-none">
                {/* Segment 1 */}
                <span className="text-stroke">ATIVE ADVERTISING)</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-slate-500 text-lg font-bold text-slate-100 normal-case">
                  Netty <span className="text-emerald-400 font-mono">&lt;/&gt;</span> Awards
                </span>
                <span className="text-stroke">MARKETING (BEST US</span>
                {/* Segment 2 */}
                <span className="text-stroke">ATIVE ADVERTISING)</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-slate-500 text-lg font-bold text-slate-100 normal-case">
                  Netty <span className="text-emerald-400 font-mono">&lt;/&gt;</span> Awards
                </span>
                <span className="text-stroke">MARKETING (BEST US</span>
                {/* Segment 3 */}
                <span className="text-stroke">ATIVE ADVERTISING)</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-slate-500 text-lg font-bold text-slate-100 normal-case">
                  Netty <span className="text-emerald-400 font-mono">&lt;/&gt;</span> Awards
                </span>
                <span className="text-stroke">MARKETING (BEST US</span>
              </div>
            </div>

            {/* Ticker Row 2 (Right Moving) */}
            <div className="w-full overflow-hidden whitespace-nowrap flex py-1">
              <div className="flex gap-12 items-center text-5xl sm:text-6xl lg:text-[76px] font-black tracking-normal animate-marquee-right leading-none uppercase select-none">
                {/* Segment 1 */}
                <span className="text-white">NG</span>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-yellow-500 text-sm font-extrabold text-yellow-500">
                  ⚡ US SEARCH AWARDS
                </span>
                <span className="text-white">BEST USE OF CONTENT MARKETING</span>
                {/* Segment 2 */}
                <span className="text-white">NG</span>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-yellow-500 text-sm font-extrabold text-yellow-500">
                  ⚡ US SEARCH AWARDS
                </span>
                <span className="text-white">BEST USE OF CONTENT MARKETING</span>
                {/* Segment 3 */}
                <span className="text-white">NG</span>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-yellow-500 text-sm font-extrabold text-yellow-500">
                  ⚡ US SEARCH AWARDS
                </span>
                <span className="text-white">BEST USE OF CONTENT MARKETING</span>
              </div>
            </div>

            {/* Ticker Row 3 (Left Moving) */}
            <div className="w-full overflow-hidden whitespace-nowrap flex py-1">
              <div className="flex gap-12 items-center text-5xl sm:text-6xl lg:text-[76px] font-black tracking-normal animate-marquee-left leading-none uppercase select-none">
                {/* Segment 1 */}
                <span className="text-stroke">MARKETING: LARGE</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-[#8cf08a] text-sm font-extrabold text-[#8cf08a]">
                  ⚡ GLOBAL SEARCH AWARDS
                </span>
                <span className="text-stroke">BEST USE OF CONTENT</span>
                {/* Segment 2 */}
                <span className="text-stroke">MARKETING: LARGE</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-[#8cf08a] text-sm font-extrabold text-[#8cf08a]">
                  ⚡ GLOBAL SEARCH AWARDS
                </span>
                <span className="text-stroke">BEST USE OF CONTENT</span>
                {/* Segment 3 */}
                <span className="text-stroke">MARKETING: LARGE</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-[#8cf08a] text-sm font-extrabold text-[#8cf08a]">
                  ⚡ GLOBAL SEARCH AWARDS
                </span>
                <span className="text-stroke">BEST USE OF CONTENT</span>
              </div>
            </div>

            {/* Ticker Row 4 (Right Moving) */}
            <div className="w-full overflow-hidden whitespace-nowrap flex py-1">
              <div className="flex gap-12 items-center text-5xl sm:text-6xl lg:text-[76px] font-black tracking-normal animate-marquee-right leading-none uppercase select-none">
                {/* Segment 1 */}
                <span className="text-white">AR</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-sky-400 text-sm font-extrabold text-sky-400">
                  ↑ GLOBAL DIGITAL EXCELLENCE AWARDS
                </span>
                <span className="text-white">STANDOUT CONTENT AGENCY OF THE</span>
                {/* Segment 2 */}
                <span className="text-white">AR</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-sky-400 text-sm font-extrabold text-sky-400">
                  ↑ GLOBAL DIGITAL EXCELLENCE AWARDS
                </span>
                <span className="text-white">STANDOUT CONTENT AGENCY OF THE</span>
                {/* Segment 3 */}
                <span className="text-white">AR</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-sky-400 text-sm font-extrabold text-sky-400">
                  ↑ GLOBAL DIGITAL EXCELLENCE AWARDS
                </span>
                <span className="text-white">STANDOUT CONTENT AGENCY OF THE</span>
              </div>
            </div>

            {/* Ticker Row 5 (Left Moving) */}
            <div className="w-full overflow-hidden whitespace-nowrap flex py-1">
              <div className="flex gap-12 items-center text-5xl sm:text-6xl lg:text-[76px] font-black tracking-normal animate-marquee-left leading-none uppercase select-none">
                {/* Segment 1 */}
                <span className="text-stroke">ETING INTEGRATION</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 bg-white text-rose-500 rounded-full text-base font-extrabold shadow-sm normal-case">
                  <span className="text-[#3e4fea]">cma</span> <span className="text-orange-500">cma</span> content marketing awards
                </span>
                <span className="text-stroke">BEST PAID ADVERTI</span>
                {/* Segment 2 */}
                <span className="text-stroke">ETING INTEGRATION</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 bg-white text-rose-500 rounded-full text-base font-extrabold shadow-sm normal-case">
                  <span className="text-[#3e4fea]">cma</span> <span className="text-orange-500">cma</span> content marketing awards
                </span>
                <span className="text-stroke">BEST PAID ADVERTI</span>
                {/* Segment 3 */}
                <span className="text-stroke">ETING INTEGRATION</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 bg-white text-rose-500 rounded-full text-base font-extrabold shadow-sm normal-case">
                  <span className="text-[#3e4fea]">cma</span> <span className="text-orange-500">cma</span> content marketing awards
                </span>
                <span className="text-stroke">BEST PAID ADVERTI</span>
              </div>
            </div>

            {/* Ticker Row 6 (Right Moving) */}
            <div className="w-full overflow-hidden whitespace-nowrap flex py-1">
              <div className="flex gap-12 items-center text-5xl sm:text-6xl lg:text-[76px] font-black tracking-normal animate-marquee-right leading-none uppercase select-none">
                {/* Segment 1 */}
                <span className="text-white">AL</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 bg-white text-[#112c3e] rounded-full text-base font-extrabold shadow-sm normal-case">
                  <span className="text-blue-600 font-mono">ECDMA</span> GLOBAL AWARDS
                </span>
                <span className="text-white">SILVER IN CONTENT MARKETING PROF</span>
                {/* Segment 2 */}
                <span className="text-white">AL</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 bg-white text-[#112c3e] rounded-full text-base font-extrabold shadow-sm normal-case">
                  <span className="text-blue-600 font-mono">ECDMA</span> GLOBAL AWARDS
                </span>
                <span className="text-white">SILVER IN CONTENT MARKETING PROF</span>
                {/* Segment 3 */}
                <span className="text-white">AL</span>
                <span className="inline-flex items-center gap-2 px-6 py-2 bg-white text-[#112c3e] rounded-full text-base font-extrabold shadow-sm normal-case">
                  <span className="text-blue-600 font-mono">ECDMA</span> GLOBAL AWARDS
                </span>
                <span className="text-white">SILVER IN CONTENT MARKETING PROF</span>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Keyframes */}
        <style>{`
          .text-stroke {
            color: transparent;
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.45);
          }
          @keyframes marquee-l {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.3333%, 0, 0); }
          }
          @keyframes marquee-r {
            0% { transform: translate3d(-33.3333%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .animate-marquee-left {
            display: inline-flex;
            animation: marquee-l 20s linear infinite;
            width: max-content;
          }
          .animate-marquee-right {
            display: inline-flex;
            animation: marquee-r 20s linear infinite;
            width: max-content;
          }
        `}</style>
      </section>

      {/* Choose Sites by Actual Metrics Section */}
      <section className="py-24 bg-[#F4F7F9]">
        <div className="max-w-[1240px] mx-auto px-6 space-y-12">
          {/* Header & Sub-badge */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-[44px] font-bold text-[#112c3e] leading-tight tracking-tight font-space max-w-2xl mx-auto">
              Choose Sites<br />by Actual Metrics &amp;<br />Submit a Guest Post
            </h2>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#d6f5d0] text-[#112c3e] rounded-full text-xs sm:text-sm font-semibold shadow-sm">
              <span>With automatic WhatsApp/email inventory updates reminder</span>
              <span className="w-2.5 h-2.5 bg-[#112c3e] rounded-full inline-block animate-ping"></span>
            </div>
          </div>

          {/* Metrics Dashboard Layout */}
          <div className="max-w-[860px] mx-auto space-y-8">
            {/* Domain Tab Selector & Carousel Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="px-6 py-2.5 rounded-full bg-[#3e4fea] text-white font-bold text-base tracking-wide shadow-md">
                https://techbullion.com
              </span>
              <div className="flex items-center gap-4">
                {/* Dots */}
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#112c3e]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dcdce5]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dcdce5]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dcdce5]"></span>
                </div>
                {/* Navigation arrows */}
                <div className="flex gap-1">
                  <button className="w-8 h-8 rounded-full border border-[#dcdce5] bg-white flex items-center justify-center text-[#677f9b] hover:bg-slate-100 transition shadow-sm">
                    ‹
                  </button>
                  <button className="w-8 h-8 rounded-full border border-[#dcdce5] bg-white flex items-center justify-center text-[#677f9b] hover:bg-slate-100 transition shadow-sm">
                    ›
                  </button>
                </div>
              </div>
            </div>

            {/* Metrics Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Box 1 */}
              <div className="bg-white rounded-3xl p-8 border border-[#eaf1f6] text-center shadow-sm flex flex-col justify-center min-h-[140px]">
                <span className="text-4xl font-extrabold text-[#112c3e] tracking-tight">16K</span>
                <span className="text-xs font-semibold text-[#677f9b] mt-1 flex items-center justify-center gap-1.5 uppercase tracking-wide">
                  <span className="text-orange-500 font-bold">a</span> Ahrefs Organic Traffic
                </span>
              </div>

              {/* Box 2 */}
              <div className="bg-white rounded-3xl p-8 border border-[#eaf1f6] text-center shadow-sm flex flex-col justify-center min-h-[140px]">
                <span className="text-4xl font-extrabold text-[#112c3e] tracking-tight">361K</span>
                <span className="text-xs font-semibold text-[#677f9b] mt-1 flex items-center justify-center gap-1.5 uppercase tracking-wide">
                  <span className="text-blue-500">◑</span> Similarweb Traffic
                </span>
              </div>

              {/* Box 3 */}
              <div className="bg-white rounded-3xl p-8 border border-[#eaf1f6] text-center shadow-sm flex flex-col justify-center min-h-[140px]">
                <span className="text-4xl font-extrabold text-[#112c3e] tracking-tight">74</span>
                <span className="text-xs font-semibold text-[#677f9b] mt-1 flex items-center justify-center gap-1.5 uppercase tracking-wide">
                  <span className="text-[#3e4fea] font-bold">M</span> Moz Domain Authority
                </span>
              </div>

              {/* Box 4 */}
              <div className="bg-white rounded-3xl p-8 border border-[#eaf1f6] text-center shadow-sm flex flex-col justify-center min-h-[140px]">
                <span className="text-4xl font-extrabold text-[#112c3e] tracking-tight">43</span>
                <span className="text-xs font-semibold text-[#677f9b] mt-1 flex items-center justify-center gap-1.5 uppercase tracking-wide">
                  <span className="text-red-500 font-bold">🔥</span> Semrush Authority Score
                </span>
              </div>

              {/* Box 5 */}
              <div className="bg-white rounded-3xl p-8 border border-[#eaf1f6] text-center shadow-sm flex flex-col justify-center min-h-[140px]">
                <span className="text-4xl font-extrabold text-[#112c3e] tracking-tight">81</span>
                <span className="text-xs font-semibold text-[#677f9b] mt-1 flex items-center justify-center gap-1.5 uppercase tracking-wide">
                  <span className="text-orange-500 font-bold">a</span> Ahrefs Domain Rank
                </span>
              </div>

              {/* Box 6 */}
              <div className="bg-white rounded-3xl p-8 border border-[#eaf1f6] text-center shadow-sm flex flex-col justify-center min-h-[140px]">
                <span className="text-[28px] font-extrabold text-[#112c3e] tracking-tight">English</span>
                <span className="text-xs font-semibold text-[#677f9b] mt-1 uppercase tracking-wide">
                  Language
                </span>
              </div>

              {/* Box 7 (Countries Row spanning 1 col) */}
              <div className="bg-white rounded-3xl p-8 border border-[#eaf1f6] text-center shadow-sm flex flex-col justify-center items-center min-h-[140px]">
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl">🇺🇸</span>
                    <span className="text-[10px] text-[#677f9b] mt-1 font-bold">223k</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl">🇵🇰</span>
                    <span className="text-[10px] text-[#677f9b] mt-1 font-bold">171k</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#677f9b] mt-2 uppercase tracking-wide">
                  Countries
                </span>
              </div>

              {/* Box 8 (Category Matching Row spanning 2 cols) */}
              <div className="bg-white rounded-3xl p-8 border border-[#eaf1f6] text-center shadow-sm flex flex-col justify-center md:col-span-2 min-h-[140px]">
                <span className="text-2xl font-extrabold text-[#112c3e] tracking-tight">
                  Finance, Technology, Internet
                </span>
                <span className="text-xs font-semibold text-[#677f9b] mt-1.5 uppercase tracking-wide">
                  Category Matching
                </span>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="flex justify-center mt-6">
              <Link
                href="/register"
                className="inline-flex items-center gap-6 pl-8 pr-3 py-3 rounded-full bg-[#112c3e] text-white font-bold text-[15px] hover:bg-[#2632a3] transition group shadow-md"
              >
                <span>Get started</span>
                <div className="w-9 h-9 rounded-full bg-[#8cf08a] flex items-center justify-center text-[#112c3e] group-hover:rotate-45 transition-transform">
                  <svg className="w-4 h-4 fill-[#112c3e]" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fast-Growing International Platforms Section */}
      <section className="py-24 bg-white overflow-hidden relative border-t border-[#eaf1f6]">
        <div className="max-w-[1240px] mx-auto px-6 space-y-12">
          {/* Header */}
          <div className="text-center pt-8">
            <h2 className="text-3xl sm:text-[40px] font-bold text-[#112c3e] tracking-tight font-space">
              Fast-Growing International Platforms
            </h2>
          </div>

          {/* Dotted World Map & Floating Region Cards Container */}
          <div className="relative min-h-[500px] w-full flex items-center justify-center">
            {/* Styled World Map Graphic (Grid/Dot Pattern Mockup) */}
            <div className="absolute inset-0 opacity-[0.06] flex items-center justify-center pointer-events-none select-none">
              <svg className="w-full h-full max-w-[900px] max-h-[440px]" viewBox="0 0 1000 500" fill="currentColor">
                <defs>
                  <pattern id="dot-pattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="6" cy="6" r="2.5" fill="#112c3e" />
                  </pattern>
                </defs>
                <rect width="1000" height="500" fill="url(#dot-pattern)" />
              </svg>
            </div>

            {/* Layout Cards */}
            <div className="relative z-10 w-full max-w-[960px] min-h-[420px] flex flex-col md:block gap-6">
              
              {/* Card 1: North America (United States / Canada) */}
              <div className="md:absolute left-[8%] top-[25%] bg-white rounded-3xl p-6 shadow-lg border border-[#eaf1f6] w-full md:w-[260px] transform hover:-translate-y-1 transition duration-300">
                <div className="flex gap-2 text-2xl mb-2.5">
                  <span>🇺🇸</span>
                  <span>🇨🇦</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#112c3e] text-base flex items-center justify-between gap-2 flex-wrap">
                    <span>United States</span>
                    <span className="text-[10px] font-bold bg-[#d6f5d0] text-[#112c3e] px-2 py-0.5 rounded-full">+10k last month</span>
                  </h3>
                  <p className="font-bold text-[#112c3e] text-base">Canada</p>
                  <p className="text-xs font-semibold text-[#677f9b] uppercase tracking-wider pt-1">North America</p>
                </div>
              </div>

              {/* Card 2: Europe */}
              <div className="md:absolute right-[35%] top-[10%] bg-white rounded-3xl p-6 shadow-lg border border-[#eaf1f6] w-full md:w-[260px] transform hover:-translate-y-1 transition duration-300">
                <div className="flex gap-1.5 text-2xl mb-2.5">
                  <span>🇬🇧</span>
                  <span>🇪🇸</span>
                  <span>🇮🇹</span>
                  <span>🇩🇪</span>
                  <span>🇫🇷</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#112c3e] text-base leading-snug">
                    United Kingdom, Germany, France, Italy, Spain
                  </h3>
                  <p className="text-xs font-semibold text-[#677f9b] uppercase tracking-wider pt-1">Europe</p>
                </div>
              </div>

              {/* Card 3: Asia (UAE) */}
              <div className="md:absolute left-[40%] top-[55%] bg-white rounded-3xl p-6 shadow-lg border border-[#eaf1f6] w-full md:w-[240px] transform hover:-translate-y-1 transition duration-300">
                <div className="text-2xl mb-2.5">
                  <span>🇦🇪</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#112c3e] text-base">United Arab Emirates</h3>
                  <p className="text-xs font-semibold text-[#677f9b] uppercase tracking-wider pt-1">Asia</p>
                </div>
              </div>

              {/* Card 4: Oceania (Australia) */}
              <div className="md:absolute right-[10%] top-[65%] bg-white rounded-3xl p-6 shadow-lg border border-[#eaf1f6] w-full md:w-[200px] transform hover:-translate-y-1 transition duration-300">
                <div className="text-2xl mb-2.5">
                  <span>🇦🇺</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#112c3e] text-base">Australia</h3>
                  <p className="text-xs font-semibold text-[#677f9b] uppercase tracking-wider pt-1">Oceania</p>
                </div>
              </div>

              {/* Card 5: Other Countries */}
              <div className="md:absolute left-[44%] bottom-[-10px] bg-white rounded-3xl px-6 py-4 shadow-lg border border-[#eaf1f6] w-full md:w-[200px] text-center transform hover:-translate-y-1 transition duration-300">
                <span className="font-bold text-[#112c3e] text-base flex items-center justify-center gap-2">
                  Other Countries
                  <span className="text-[10px] font-bold bg-[#e2e6f8] text-[#3e4fea] px-2 py-0.5 rounded-full">+10k</span>
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started Sign-Up Section */}
      <section className="py-24 bg-[#F4F7F9] border-t border-[#eaf1f6] text-center relative select-none">
        <div className="max-w-[700px] mx-auto px-6 space-y-8">
          <h2 className="text-3xl sm:text-[42px] font-bold text-[#112c3e] tracking-tight font-space">
            Ready to Get Started?
          </h2>
          <p className="text-sm sm:text-base text-[#677f9b] font-medium leading-relaxed max-w-lg mx-auto">
            Place your content on <span className="text-[#3e4fea]">quality sites</span> without a fuss.<br />
            You are one click away!
          </p>

          {/* Email input field */}
          <div className="max-w-[480px] mx-auto flex flex-col sm:flex-row items-center gap-2 bg-[#f4f7f9] p-1.5 rounded-full border border-[#dcdce5] bg-white">
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent px-5 py-3 outline-none text-[#112c3e] placeholder-[#677f9b] text-[15px]"
            />
            <button className="w-full sm:w-auto whitespace-nowrap bg-[#112c3e] text-white hover:bg-[#2632a3] transition rounded-full px-6 py-3 font-bold text-sm flex items-center justify-center gap-2">
              <span>Sign Up for Free</span>
              <span>→</span>
            </button>
          </div>

          {/* Mock reCAPTCHA Card */}
          <div className="flex justify-center pt-2">
            <div className="w-[300px] bg-white rounded border border-[#dcdce5] p-3 flex items-center justify-between text-left shadow-sm">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="recaptcha-mock" className="w-6 h-6 border-[#dcdce5] rounded cursor-pointer accent-emerald-500" />
                <label htmlFor="recaptcha-mock" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  I'm not a robot
                </label>
              </div>
              <div className="flex flex-col items-center justify-center text-[8px] text-slate-400">
                <span className="text-lg">🔄</span>
                <span>reCAPTCHA</span>
              </div>
            </div>
          </div>

          {/* OR separator */}
          <div className="text-xs font-semibold text-[#677f9b] uppercase tracking-widest pt-2">
            or continue with
          </div>

          {/* Google & Facebook Auth Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="flex items-center justify-center gap-2.5 px-8 py-3 bg-white border border-[#dcdce5] hover:bg-slate-50 transition rounded-full w-full sm:w-auto font-bold text-[15px] text-[#112c3e] shadow-sm">
              <span className="text-lg">G</span>
              <span>Sign Up</span>
            </button>
            <button className="flex items-center justify-center gap-2.5 px-8 py-3 bg-[#3b5998] hover:bg-[#2d4373] transition text-white rounded-full w-full sm:w-auto font-bold text-[15px] shadow-sm">
              <span className="text-lg">f</span>
              <span>Sign Up</span>
            </button>
          </div>

          {/* Terms info */}
          <div className="text-[11px] text-[#677f9b] font-medium">
            By signing up, you agree to our <Link href="/terms" className="underline hover:text-[#112c3e]">Terms and Conditions</Link> and <Link href="/privacy" className="underline hover:text-[#112c3e]">Privacy Policy</Link>
          </div>
        </div>
      </section>

      {/* Styled Adsy Footer Section */}
      <footer className="bg-[#F4F7F9] py-16 select-none border-t border-[#eaf1f6]">
        <div className="max-w-[1240px] mx-auto px-6 space-y-10">
          
          {/* Top Row: Links & Card Icons (Left) + Social Circles & Address (Right) */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
            
            {/* Left Block: Links + Credit Cards */}
            <div className="space-y-6 flex-1">
              {/* Links */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 font-semibold text-[15px] text-[#112c3e]">
                <Link href="/api-service" className="hover:text-[#3e4fea]">API Service</Link>
                <Link href="/adsy-checker" className="hover:text-[#3e4fea]">Adsy Checker</Link>
                <Link href="/managed-services" className="hover:text-[#3e4fea]">Managed Services</Link>
                <Link href="/referral" className="hover:text-[#3e4fea]">Referral program</Link>
                <div className="relative group inline-flex items-center gap-1 cursor-pointer hover:text-[#3e4fea]">
                  <span>Additional services</span>
                  <span className="text-[10px]">▼</span>
                </div>
              </div>

              {/* Credit Card SVGs / Styled Labels */}
              <div className="flex items-center gap-4 text-[#112c3e] font-extrabold text-sm tracking-wider">
                <span className="text-[#1a1f71] text-xl font-black italic">VISA</span>
                <div className="flex gap-0.5 items-center">
                  <span className="w-4 h-4 rounded-full bg-[#eb001b] opacity-90"></span>
                  <span className="w-4 h-4 rounded-full bg-[#f79e1b] opacity-90 -ml-2"></span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#eb001b]"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#00a2e0] -ml-2.5"></span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 lowercase tracking-normal">maestro</span>
                </div>
                <span className="bg-[#0070d2] text-white px-2 py-0.5 text-[9px] rounded font-bold uppercase tracking-tight">AMEX</span>
              </div>
            </div>

            {/* Right Block: Social Buttons + Address */}
            <div className="flex flex-col items-start lg:items-end gap-5">
              {/* Colorful Circle Socials */}
              <div className="flex gap-2.5">
                {/* Telegram (Light Blue) */}
                <span className="w-9 h-9 rounded-full bg-[#24A1DE] text-white flex items-center justify-center font-bold text-sm hover:scale-105 transition cursor-pointer">
                  t
                </span>
                {/* Facebook (Dark Blue) */}
                <span className="w-9 h-9 rounded-full bg-[#3b5998] text-white flex items-center justify-center font-bold text-sm hover:scale-105 transition cursor-pointer">
                  f
                </span>
                {/* Twitter / X (Black) */}
                <span className="w-9 h-9 rounded-full bg-[#000000] text-white flex items-center justify-center font-bold text-sm hover:scale-105 transition cursor-pointer">
                  𝕏
                </span>
                {/* LinkedIn (Blue) */}
                <span className="w-9 h-9 rounded-full bg-[#0077b5] text-white flex items-center justify-center font-bold text-sm hover:scale-105 transition cursor-pointer">
                  in
                </span>
                {/* YouTube (Red) */}
                <span className="w-9 h-9 rounded-full bg-[#ff0000] text-white flex items-center justify-center font-bold text-sm hover:scale-105 transition cursor-pointer">
                  y
                </span>
                {/* Spotify (Green) */}
                <span className="w-9 h-9 rounded-full bg-[#1ED760] text-white flex items-center justify-center font-bold text-sm hover:scale-105 transition cursor-pointer">
                  s
                </span>
              </div>

              {/* Delaware Address */}
              <div className="text-[#677f9b] text-[13px] font-medium text-left lg:text-right space-y-0.5">
                <p>16192 Coastal Highway</p>
                <p>Lewes, Delaware 19958, USA</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Center-Aligned Policy Links */}
          <div className="border-t border-[#eaf1f6] pt-6 flex justify-center text-[13px] font-semibold text-[#677f9b] gap-3">
            <Link href="/terms" className="hover:text-[#112c3e]">Terms and Conditions</Link>
            <span className="text-slate-300">|</span>
            <Link href="/privacy" className="hover:text-[#112c3e]">Privacy Policy</Link>
          </div>
        </div>
      </footer>

      {/* Back to top absolute floating arrow button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-[180px] sm:left-[220px] z-40 w-10 h-10 rounded-full border border-[#eaf1f6] bg-white flex items-center justify-center text-[#677f9b] shadow-lg hover:bg-slate-100 transition"
        title="Back to Top"
      >
        ↑
      </button>
    </div>
  );
}

