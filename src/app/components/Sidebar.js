'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Grid, Sparkles, Flame, Tag, Layers, Star, ShoppingBag, Truck, ShieldCheck, Headphones, Smartphone, Heart, Package } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Image from 'next/image';

export default function Sidebar({ className = '' }) {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedCategory, setSelectedCategory, setSelectedProduct } = useStore();

  const menuItems = [
    {
      name: 'Home',
      icon: Home,
      active: pathname === '/' || pathname === '',
      action: () => {
        setSelectedProduct(null);
        setSelectedCategory('ALL');
        router.push('/');
      },
    },
    {
      name: 'Categories',
      icon: Grid,
      active: pathname?.startsWith('/categories'),
      action: () => {
        setSelectedProduct(null);
        setSelectedCategory('ALL');
        router.push('/categories');
      },
    },
    {
      name: 'Cart',
      icon: ShoppingBag,
      active: pathname?.startsWith('/cart'),
      action: () => {
        setSelectedProduct(null);
        router.push('/cart');
      },
    },
    { name: 'Wishlist', icon: Heart, active: pathname?.startsWith('/wishlist'), action: () => { setSelectedProduct(null); setSelectedCategory('ALL'); router.push('/wishlist'); } },
    { name: 'My Orders', icon: Package, active: pathname?.startsWith('/orders'), action: () => { setSelectedProduct(null); setSelectedCategory('ALL'); router.push('/orders'); } },
    { name: 'Offers', icon: Tag, active: pathname?.startsWith('/offers'), action: () => { setSelectedProduct(null); setSelectedCategory('ALL'); router.push('/offers'); } },
    { name: 'Collections', icon: Layers, active: pathname?.startsWith('/collections'), action: () => { setSelectedProduct(null); setSelectedCategory('ALL'); router.push('/collections'); } },
    { name: 'Contact', icon: Headphones, active: pathname?.startsWith('/contact'), action: () => { setSelectedProduct(null); setSelectedCategory('ALL'); router.push('/contact'); } },
  ];

  const valueProps = [
    { title: 'Free Shipping', desc: 'On orders over Rs 3000', icon: Truck },
    { title: 'Easy Returns', desc: '14 days return policy', icon: Headphones },
    { title: 'Secure Payment', desc: '100% secure checkout', icon: ShieldCheck },
    { title: '24/7 Support', desc: 'We are here to help', icon: Smartphone },
  ];

  return (
    <aside className={`w-72 bg-white border-r border-zinc-200 flex flex-col h-full py-6 px-5 overflow-y-auto no-scrollbar text-black ${className}`}>
      
      {/* Brand logo - Solid Bold Branding */}
      <div className="flex items-center gap-2.5 pb-6 border-b border-zinc-150 cursor-pointer" onClick={() => { setSelectedProduct(null); setSelectedCategory('ALL'); router.push('/'); }}>
        <div className="h-9.5 w-9.5 bg-linear-to-tr from-pink-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">
          V
        </div>
        <span className="text-2xl font-black tracking-tight text-zinc-950">vdgfashion</span>
      </div>

      {/* Menu links - Clean E-commerce Semibold hierarchy */}
      <nav className="mt-6 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={item.action}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[14.5px] font-semibold transition-all ${
                item.active
                  ? 'bg-rose-50 text-[#e11d48] font-bold'
                  : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
              }`}
            >
              <Icon className={`h-5 w-5 ${item.active ? 'text-[#e11d48]' : 'text-zinc-400 group-hover:text-black'}`} />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Static Promo card - Tall Vertical card matching mockup design */}
      <div className="relative overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#5b34f1] via-[#6a3ff7] to-[#bb4dff] p-4 text-white mt-5 mb-5 vdgfashion-card-shadow w-full min-h-[205px] shrink-0 flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-radial-gradient from-white/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col justify-start h-full max-w-[52%] text-white py-0.5">
          <span className="font-serif italic text-[#ffd54f] text-[22px] font-medium tracking-wide leading-none">Summer</span>
          <span className="text-[42px] font-black tracking-tighter text-white uppercase -mt-0.5 leading-[0.9]">SALE</span>
          
          <div className="mt-3 flex flex-col items-start leading-none">
            <span className="text-[10px] font-extrabold uppercase text-zinc-200 tracking-wider">UP TO</span>
            <span className="text-[50px] font-black text-white leading-none my-0.5 tracking-tighter">50%</span>
            <span className="text-[11px] font-extrabold uppercase text-zinc-200 tracking-wider">OFF</span>
          </div>

          <button
            onClick={() => { setSelectedProduct(null); setSelectedCategory('ALL'); }}
            className="mt-4 self-start bg-white text-zinc-950 px-4 py-2 rounded-full text-[9px] font-black tracking-wide transition-all hover:scale-105 shadow-sm shrink-0"
          >
            Shop Now
          </button>
        </div>

        {/* Absolute product model cutout */}
        <div className="absolute bottom-0 right-0 h-full w-[56%] pointer-events-none">
          <div className="relative h-full w-full">
            <Image 
              src="/products/promo_model.png" 
              alt="Promo Model" 
              fill 
              className="object-contain object-bottom-right scale-104 translate-y-[2px]" 
            />
          </div>
        </div>
      </div>

      {/* Value props grid - Highly readable contrast */}
      <div className="space-y-3.5 border-t border-zinc-150 pt-5 mt-2">
        {valueProps.map((prop, idx) => {
          const PropIcon = prop.icon;
          return (
            <div key={idx} className="flex gap-3 items-center">
              <div className="h-8.5 w-8.5 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100 shrink-0">
                <PropIcon className="h-4 w-4 text-zinc-400" />
              </div>
              <div>
                <h5 className="text-[12px] font-bold text-zinc-800 leading-tight">{prop.title}</h5>
                <p className="text-[10px] text-zinc-400 leading-tight mt-0.5 font-normal">{prop.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </aside>
  );
}
