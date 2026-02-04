"use client";

import React, { useState, useEffect } from 'react';
import { Search, DollarSign, TrendingUp, Users, BarChart3, Share2, Download } from 'lucide-react';

export default function WebsiteValueCalculator() {
  // --- STATE MANAGEMENT ---
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Core Metrics (Defaults set to 0)
  const [monthlyVisitors, setMonthlyVisitors] = useState(10000);
  const [rpm, setRpm] = useState(15); // Revenue per 1000 visitors
  const [multiple, setMultiple] = useState(30); // Monthly multiple (24x - 40x is standard)

  // --- THE LOGIC ---
  // Math: (Visitors / 1000) * RPM = Monthly Revenue
  // Valuation = Monthly Revenue * Multiple
  const monthlyRevenue = (monthlyVisitors / 1000) * rpm;
  const dailyRevenue = monthlyRevenue / 30;
  const yearlyRevenue = monthlyRevenue * 12;
  const websiteValue = monthlyRevenue * multiple;

  // Format currency helper
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format number helper
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
  };

  // Simulate API Call / Calculation
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    
    // Simulate a network delay for "Scanning" effect
    setTimeout(() => {
      // In a real app, you would fetch API data here.
      // For this demo, we randomize visitors to show it works.
      const randomVisitors = Math.floor(Math.random() * (50000 - 5000 + 1) + 5000);
      setMonthlyVisitors(randomVisitors);
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="w-full border-b border-white/10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-emerald-400" size={24} />
            <span className="font-bold text-lg tracking-tight">SiteWorth<span className="text-emerald-400">.io</span></span>
          </div>
          <div className="text-sm text-slate-400">Free Valuation Tool</div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            What is your website <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">worth?</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Instantly calculate the market value of any website using our real-time revenue algorithm.
          </p>
        </div>

        {/* --- INPUT CARD --- */}
        <div className="w-full max-w-2xl relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <form onSubmit={handleCalculate} className="relative bg-slate-900 border border-white/10 rounded-xl p-2 flex items-center shadow-2xl">
            <div className="pl-4 text-slate-400">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="example.com" 
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 text-lg h-12 px-4 outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold h-12 px-8 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Calculate'}
            </button>
          </form>
        </div>

        {/* --- RESULTS DASHBOARD --- */}
        {showResults && (
          <div className="w-full mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* VALUATION HEADER */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20">
                Est. Market Price
              </div>
              <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-2xl">
                {formatMoney(websiteValue)}
              </h2>
              <p className="text-slate-400 mt-2">Based on current traffic metrics</p>
            </div>

            {/* INTERACTIVE CONTROLS (The "Stand Out" Feature) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              
              {/* Traffic Slider */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users size={18} className="text-blue-400"/>
                    <span className="font-medium">Monthly Visitors</span>
                  </div>
                  <span className="text-xl font-bold text-white">{formatNumber(monthlyVisitors)}</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="1000000" 
                  step="1000"
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>1k</span>
                  <span>1M</span>
                </div>
              </div>

              {/* Monetization Slider */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <BarChart3 size={18} className="text-purple-400"/>
                    <span className="font-medium">Revenue Per 1k (RPM)</span>
                  </div>
                  <span className="text-xl font-bold text-white">${rpm}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  step="0.5"
                  value={rpm}
                  onChange={(e) => setRpm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                 <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>Adsense ($2)</span>
                  <span>SaaS/Affiliate ($50)</span>
                </div>
              </div>
            </div>

            {/* INCOME BREAKDOWN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-slate-900 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-emerald-500/30 transition-colors">
                <span className="text-slate-500 text-sm mb-1 uppercase tracking-wider">Daily Income</span>
                <span className="text-2xl font-bold text-white">{formatMoney(dailyRevenue)}</span>
              </div>
              <div className="bg-slate-900 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-emerald-500/30 transition-colors relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                <span className="text-slate-500 text-sm mb-1 uppercase tracking-wider">Monthly Income</span>
                <span className="text-2xl font-bold text-white">{formatMoney(monthlyRevenue)}</span>
              </div>
              <div className="bg-slate-900 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-emerald-500/30 transition-colors">
                <span className="text-slate-500 text-sm mb-1 uppercase tracking-wider">Yearly Income</span>
                <span className="text-2xl font-bold text-white">{formatMoney(yearlyRevenue)}</span>
              </div>
            </div>

            {/* ACTION BUTTONS (Certificate Feature) */}
            <div className="flex justify-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                    <Download size={18} />
                    Download Certificate
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 border border-white/10 transition-colors">
                    <Share2 size={18} />
                    Share Result
                </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
