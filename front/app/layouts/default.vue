<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-inter">
    <!-- Persistent Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-6 h-20 shadow-sm flex items-center justify-center">
      <div class="max-w-7xl w-full flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="p-2 bg-slate-50 rounded-xl hover:bg-slate-100">
            <i class="pi pi-arrow-left text-slate-600 text-xs"></i>
          </NuxtLink>
          <div class="flex flex-col">
            <h1 class="font-black italic text-slate-900 text-xl leading-none uppercase tracking-tighter">Byron <span class="text-cyan-600">Store</span></h1>
            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">Refacciones de Precisión</span>
          </div>
        </div>
        
        <!-- Top Navigation (Desktop) -->
        <nav class="hidden md:flex items-center bg-slate-50/50 p-1 rounded-2xl border border-slate-100/50">
          <NuxtLink to="/store" 
            :class="['px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-xl italic', 
            $route.path === '/store' ? 'bg-white text-cyan-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600']">
            Home
          </NuxtLink>
          <NuxtLink to="/nosotros" 
            :class="['px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-xl italic', 
            $route.path === '/nosotros' ? 'bg-white text-cyan-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600']">
            Nosotros
          </NuxtLink>
          <NuxtLink to="/faqs" 
            :class="['px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-xl italic', 
            $route.path === '/faqs' ? 'bg-white text-cyan-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600']">
            FAQs
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <!-- Mobile Nav Menu Toggle -->
          <Button icon="pi pi-bars" text rounded class="md:hidden !text-slate-900 !w-10 !h-10" @click="mobileNav = true" />
          <div class="relative">
            <Button icon="pi pi-shopping-cart" text rounded class="!text-slate-900 !w-12 !h-12 !bg-slate-50" />
            <span class="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">0</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Nav Drawer -->
    <Drawer v-model:visible="mobileNav" header="Menú Principal" class="!w-72 !rounded-r-[2rem]">
      <div class="flex flex-col gap-2 mt-4">
        <NuxtLink to="/store" @click="mobileNav = false" :class="['flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 text-slate-700 font-bold uppercase tracking-widest text-xs', $route.path === '/store' ? 'bg-cyan-50 text-cyan-600' : '']">
          <i class="pi pi-home"></i> Home
        </NuxtLink>
        <NuxtLink to="/nosotros" @click="mobileNav = false" :class="['flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 text-slate-700 font-bold uppercase tracking-widest text-xs text-left w-full', $route.path === '/nosotros' ? 'bg-cyan-50 text-cyan-600' : '']">
          <i class="pi pi-users"></i> Nosotros
        </NuxtLink>
        <NuxtLink to="/faqs" @click="mobileNav = false" :class="['flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 text-slate-700 font-bold uppercase tracking-widest text-xs text-left w-full', $route.path === '/faqs' ? 'bg-cyan-50 text-cyan-600' : '']">
          <i class="pi pi-question-circle"></i> FAQs
        </NuxtLink>
      </div>
    </Drawer>

    <!-- Page Content -->
    <slot />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';

const mobileNav = ref(false);
</script>

<style scoped>
/* No styles needed here, main.css handles global styles */
</style>
