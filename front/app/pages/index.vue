<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden font-inter">
    <div class="absolute -top-24 -left-24 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>
    <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

    <div class="w-full max-w-md z-10 text-center">
      <div class="flex flex-col items-center mb-10">
        <div class="w-20 h-20 bg-cyan-600 rounded-[2.5rem] flex items-center justify-center shadow-lg shadow-cyan-200 mb-6">
          <i class="pi pi-print text-4xl text-white"></i>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">Byron <span class="text-cyan-600">Tech</span></h1>
        <p class="text-slate-500 font-medium italic">Sistemas de Impresión Industrial & Refacciones</p>
      </div>

      <div class="space-y-4">
        <NuxtLink to="/landing" class="w-full block">
          <Button label="Landing Page" icon="pi pi-desktop" class="w-full !rounded-3xl !py-6 !text-lg !font-bold !bg-cyan-600 !text-white !border-none !shadow-xl !shadow-cyan-100 hover:!scale-[1.02] active:!scale-95 transition-all" />
        </NuxtLink>

        <NuxtLink to="/store" class="w-full block">
          <Button label="Tienda E-commerce" icon="pi pi-shopping-cart" class="w-full !rounded-3xl !py-6 !text-lg !font-bold !bg-blue-600 !text-white !border-none !shadow-xl !shadow-blue-200 hover:!scale-[1.02] active:!scale-95 transition-all" />
        </NuxtLink>

        <NuxtLink to="/admin/dashboard" class="w-full block">
          <Button label="Acceso Administrador" icon="pi pi-lock" class="w-full !rounded-3xl !py-6 !text-lg !font-bold !bg-slate-900 !text-white !border-none !shadow-xl !shadow-slate-300 hover:!scale-[1.02] active:!scale-95 transition-all" />
        </NuxtLink>
      </div>

      <p class="mt-12 text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase italic">
        Powered by Byron Precision System © 2026
      </p>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
</script>
