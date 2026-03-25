<template>
  <div>
    <main class="flex-grow p-6 md:p-12 max-w-4xl mx-auto w-full">
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-300">
          <i class="pi pi-question-circle text-cyan-400 text-3xl"></i>
        </div>
        <h1 class="text-4xl md:text-5xl font-black italic text-slate-900 uppercase tracking-tighter mb-4">Preguntas <span class="text-cyan-600">Frecuentes</span></h1>
        <p class="text-slate-500 font-medium text-lg max-w-xl mx-auto">Resuelve tus dudas sobre envíos, garantías y compatibilidad al instante.</p>
      </div>

      <div class="space-y-6">
        <div class="glass-card p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 class="flex items-center gap-3 text-lg font-black text-slate-900 uppercase mb-3">
            <i class="pi pi-shield text-cyan-600"></i> ¿Tienen garantía las refacciones?
          </h3>
          <p class="text-slate-600 leading-relaxed text-sm">
            Absolutamente. Todas nuestras piezas, sean mecánicas o electrónicas, cuentan con una garantía estándar de 12 meses contra cualquier defecto de fabricación. El proceso de reclamo es directo desde tu panel de usuario.
          </p>
        </div>

        <div class="glass-card p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 class="flex items-center gap-3 text-lg font-black text-slate-900 uppercase mb-3">
            <i class="pi pi-search text-cyan-600"></i> ¿Cómo verifico la compatibilidad?
          </h3>
          <p class="text-slate-600 leading-relaxed text-sm">
            En la ficha de cada producto listamos los modelos exactos compatibles. Si tienes dudas con una versión específica, te sugerimos utilizar nuestro filtro avanzado en la tienda o preguntar directamente a nuestro Asistente de IA (Byron Link).
          </p>
        </div>

        <div class="glass-card p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 class="flex items-center gap-3 text-lg font-black text-slate-900 uppercase mb-3">
            <i class="pi pi-globe text-cyan-600"></i> ¿Hacen envíos internacionales?
          </h3>
          <p class="text-slate-600 leading-relaxed text-sm">
            Actualmente nuestra red logística primaria opera con envíos exprés a nivel nacional (todo México), garantizando entregas en 24-48 horas. Para pedidos de gran volumen al extranjero, es necesario contactar a un asesor comercial.
          </p>
        </div>
        
        <div class="glass-card p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 class="flex items-center gap-3 text-lg font-black text-slate-900 uppercase mb-3">
            <i class="pi pi-file-invoice text-cyan-600"></i> ¿Emiten factura fiscal?
          </h3>
          <p class="text-slate-600 leading-relaxed text-sm">
            Sí, todos nuestros precios incluyen IVA. Una vez procesado tu pago, podrás descargar tu factura CFDI 4.0 de forma automática desde la sección de pedidos en tu cuenta.
          </p>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <NuxtLink to="/store">
          <Button label="Volver a la Tienda" class="!rounded-2xl !px-10 !py-4 !bg-cyan-600 !text-white !border-none !font-black uppercase tracking-widest !shadow-xl hover:!scale-105 transition-all" />
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
