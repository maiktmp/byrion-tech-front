<template>
  <div>
    <main class="flex-grow p-6 md:p-12 max-w-4xl mx-auto w-full">
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-200">
          <i class="pi pi-building text-white text-3xl"></i>
        </div>
        <h1 class="text-4xl md:text-5xl font-black italic text-slate-900 uppercase tracking-tighter mb-4">Sobre <span class="text-cyan-600">Nosotros</span></h1>
        <p class="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
          Líderes en la distribución de refacciones de precisión para equipos de impresión industrial a nivel nacional.
        </p>
      </div>

      <div class="glass-card p-8 md:p-12 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 mb-12">
        <h2 class="text-2xl font-black italic text-slate-900 mb-4 uppercase tracking-tight">Nuestra Misión</h2>
        <p class="text-slate-600 leading-relaxed mb-8">
          En Byron Tech, entendemos que el tiempo de inactividad de una impresora industrial significa pérdida de ingresos. Nuestra misión es proveer refacciones críticas con la mayor rapidez y precisión posible, asegurando que tus operaciones nunca se detengan. Con más de una década de experiencia, seleccionamos cuidadosamente componentes OEM y de calidad certificada para garantizar el máximo rendimiento y durabilidad.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <div class="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
              <i class="pi pi-check-circle text-cyan-600 text-xl font-bold"></i>
            </div>
            <h3 class="font-black text-sm uppercase tracking-widest text-slate-900 mb-2">Calidad Insuperable</h3>
            <p class="text-xs text-slate-500 leading-relaxed">Trabajamos exclusivamente con fabricantes certificados ISO. Cada lote de refacciones, desde rodillos fusores hasta tarjetas lógicas, es sometido a rigurosas pruebas de estrés antes de ser ingresado a nuestro inventario.</p>
          </div>
          
          <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <div class="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
              <i class="pi pi-truck text-cyan-600 text-xl font-bold"></i>
            </div>
            <h3 class="font-black text-sm uppercase tracking-widest text-slate-900 mb-2">Logística de Élite</h3>
            <p class="text-xs text-slate-500 leading-relaxed">Contamos con un sistema de despacho automatizado que nos permite procesar y enviar el 98% de los pedidos el mismo día, garantizando entregas en 24-48 horas en cualquier parte del país.</p>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <NuxtLink to="/store">
          <Button label="Ir a la Tienda" class="!rounded-2xl !px-10 !py-4 !bg-slate-900 !text-white !border-none !font-black uppercase tracking-widest !shadow-xl hover:!scale-105 transition-all" />
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
import Button from 'primevue/button';
</script>
