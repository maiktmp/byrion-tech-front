<template>
  <div class="min-h-screen bg-slate-50">
    <section class="relative h-[45vh] flex items-center justify-center overflow-hidden primary-gradient">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 30px 30px;"></div>
      <div class="z-10 text-center p-6">
        <NuxtLink to="/" class="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4 font-bold text-[10px] uppercase tracking-[0.2em]">
          <i class="pi pi-arrow-left mr-2"></i> Inicio
        </NuxtLink>
        <h1 class="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">
          Byrion <span class="text-cyan-200">Refacciones</span>
        </h1>
        <p class="text-white/90 font-medium italic max-w-sm mx-auto text-sm leading-relaxed">
          Calidad certificada para prolongar la vida útil de tus equipos de impresión de alta gama.
        </p>
      </div>
    </section>

    <div class="max-w-5xl mx-auto -mt-16 p-6 space-y-8 relative z-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="glass-card p-10 rounded-[3rem] bg-white">
          <div class="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
            <i class="pi pi-cog text-cyan-600 text-2xl font-black animate-spin-slow"></i>
          </div>
          <h2 class="text-2xl font-black italic text-slate-900 uppercase mb-4 tracking-tighter leading-none">Precisión <br><span class="text-cyan-600">Mecánica</span></h2>
          <p class="text-slate-500 font-medium text-sm leading-relaxed">
            Todas nuestras refacciones están fabricadas con tolerancias micrométricas para asegurar la compatibilidad total con marcas líderes.
          </p>
        </div>

        <div class="glass-card p-10 rounded-[3rem] secondary-gradient border-none">
          <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
            <i class="pi pi-shield text-white text-2xl"></i>
          </div>
          <h2 class="text-2xl font-black italic text-white uppercase mb-4 tracking-tighter leading-none">Garantía <br><span class="text-cyan-400">Certificada</span></h2>
          <p class="text-white/80 font-medium text-sm leading-relaxed italic">
            Ofrecemos hasta 12 meses de garantía en rodillos fusores, cabezales y tarjetas lógicas. Tu inversión está protegida.
          </p>
        </div>
      </div>

      <section class="p-12 bg-white rounded-[3rem] shadow-2xl shadow-slate-200 text-center">
        <h3 class="text-[10px] font-black text-cyan-600 uppercase tracking-[0.4em] mb-10 italic underline underline-offset-8">¿Por qué Byrion?</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label">
            <div class="text-3xl font-black text-slate-900 italic tracking-tighter mb-1">{{ stat.value }}</div>
            <div class="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-tight">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <section class="bg-cyan-600 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-cyan-100 overflow-hidden relative">
        <div class="z-10 text-center md:text-left">
          <h2 class="text-3xl font-black italic uppercase tracking-tighter mb-2 leading-none">Stock Inmediato</h2>
          <p class="text-cyan-100 font-bold italic text-sm">Más de 5,000 refacciones listas para envío hoy mismo.</p>
        </div>
        <Button label="Ver Catálogo" class="z-10 !rounded-2xl !px-12 !py-5 !bg-white !text-cyan-600 !font-black !border-none !shadow-2xl hover:!scale-105 active:!scale-95 transition-all uppercase tracking-widest text-xs" />
        <i class="pi pi-box absolute -right-4 -bottom-4 text-[12rem] text-cyan-500/20 rotate-12"></i>
      </section>

      <footer class="text-center pb-12">
        <p class="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 italic">Byrion Precision Tech | Refacciones Premium</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
const stats = [
  { value: '24H', label: 'Envío Nacional' },
  { value: '99%', label: 'Compatibilidad' },
  { value: '+10K', label: 'Clientes' },
  { value: 'ISO', label: 'Certificación' }
];
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 10s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
