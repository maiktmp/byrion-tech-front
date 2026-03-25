<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-inter">
    <!-- Navbar Premium -->
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-6 h-20 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="p-2 bg-slate-50 rounded-xl">
          <i class="pi pi-home text-slate-600 text-xs"></i>
        </NuxtLink>
        <div>
          <h1 class="font-black italic text-slate-900 text-xl leading-none uppercase tracking-tighter">Byron <span class="text-cyan-600">Admin</span></h1>
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 italic leading-none">Global Dashboard</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <Button icon="pi pi-cog" text rounded severity="secondary" />
        <Avatar image="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" shape="circle" class="!border-2 !border-cyan-100 !w-10 !h-10" />
      </div>
    </header>

    <main class="p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8">
      
      <!-- Welcome Section -->
      <section class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-3xl font-black italic text-slate-900 uppercase tracking-tighter leading-none">Resumen <span class="text-cyan-600">Operativo</span></h2>
          <p class="text-slate-500 font-medium italic mt-2">Bienvenido de nuevo, Administrador. Aquí está la actividad de hoy.</p>
        </div>
        <NuxtLink to="/admin/inventory">
          <Button label="Gestionar Inventario" icon="pi pi-box" class="!rounded-2xl !px-8 !py-4 !bg-cyan-600 !text-white !border-none !font-black uppercase tracking-widest text-[10px] shadow-xl shadow-cyan-100" />
        </NuxtLink>
      </section>

      <!-- KPI Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="kpi in kpis" :key="kpi.label" class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
          <div :class="['absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-500', kpi.color]">
            <i :class="['pi', kpi.icon, 'text-8xl']"></i>
          </div>
          <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mb-4', kpi.bg]">
            <i :class="['pi', kpi.icon, kpi.color]"></i>
          </div>
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 italic block">{{ kpi.label }}</span>
          <div class="text-3xl font-black italic text-slate-900 tracking-tighter">{{ kpi.value }}</div>
          <div class="mt-2 flex items-center gap-1.5">
            <span class="text-[10px] font-black text-emerald-500">{{ kpi.trend }}</span>
            <span class="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">vs ayer</span>
          </div>
        </div>
      </div>

      <!-- Real-Time Activity & Chart Simulation -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Activity List -->
        <div class="lg:col-span-5 bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-xs font-black text-slate-900 uppercase tracking-[0.3em] italic">Pedidos Recientes</h3>
            <i class="pi pi-sync text-slate-300"></i>
          </div>
          <div class="space-y-6">
            <div v-for="order in orders" :key="order.id" class="flex items-center gap-4 group">
              <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                <i class="pi pi-shopping-bag text-slate-400 group-hover:text-cyan-600"></i>
              </div>
              <div class="flex-grow">
                <p class="text-sm font-black text-slate-900 leading-none mb-1">#{{ order.id }} - {{ order.client }}</p>
                <p class="text-[10px] font-bold text-slate-400 uppercase italic tracking-wider">{{ order.time }}</p>
              </div>
              <span class="text-xs font-black italic text-slate-900 tracking-tighter">${{ order.total }}</span>
            </div>
          </div>
          <Button label="Ver Historial Completo" text class="w-full mt-10 !text-[10px] !font-black !uppercase !tracking-[0.2em] !text-cyan-600" />
        </div>

        <!-- Performance Graph (CSS Mockup) -->
        <div class="lg:col-span-7 bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <div class="relative z-10">
            <h3 class="text-xs font-black uppercase tracking-[0.3em] text-cyan-400 mb-2 italic">Rendimiento Semanal</h3>
            <div class="text-4xl font-black italic tracking-tighter mb-10">$14,200.00 <span class="text-sm text-emerald-400 font-bold ml-2 tracking-normal uppercase">+12%</span></div>
            
            <div class="flex items-end justify-between gap-4 h-48">
              <div v-for="(val, index) in [40, 70, 55, 90, 60, 85, 100]" :key="index" class="flex flex-col items-center flex-grow gap-4">
                <div class="w-full bg-cyan-600/20 rounded-t-xl group relative cursor-help" :style="{ height: val + '%' }">
                  <div class="absolute inset-0 bg-cyan-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] px-2 py-1 rounded-lg font-black opacity-0 group-hover:opacity-100 transition-opacity">
                    {{ val }}%
                  </div>
                </div>
                <span class="text-[9px] font-black text-slate-500 uppercase tracking-tighter italic">{{ ['L', 'M', 'M', 'J', 'V', 'S', 'D'][index] }}</span>
              </div>
            </div>
          </div>
          <i class="pi pi-chart-bar absolute -right-8 -bottom-8 text-[15rem] text-white/5 rotate-12 pointer-events-none"></i>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});
import { ref } from 'vue';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';

const kpis = [
  { label: 'Ventas Totales', value: '$42.8K', trend: '+15.4%', icon: 'pi-dollar', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { label: 'Pedidos Activos', value: '18', trend: '+2', icon: 'pi-shopping-cart', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Stock Crítico', value: '05', trend: '-1', icon: 'pi-exclamation-triangle', color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Clientes Nuevos', value: '12', trend: '+4', icon: 'pi-users', color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const orders = [
  { id: '8452', client: 'Graficos del Norte', time: 'Hace 12 minutos', total: '1,450.00' },
  { id: '8451', client: 'Elena Rodriguez', time: 'Hace 45 minutos', total: '3,800.00' },
  { id: '8450', client: 'Imprenta Velo', time: 'Hoy 10:20 AM', total: '12,400.00' },
  { id: '8449', client: 'Residencial Aurea', time: 'Ayer', total: '450.00' },
];
</script>
