<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-inter">
    <!-- Navbar -->
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-4 h-16 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="p-2 bg-slate-50 rounded-xl hover:bg-slate-100">
          <i class="pi pi-arrow-left text-slate-600 text-xs"></i>
        </NuxtLink>
        <div class="flex flex-col">
          <h1 class="font-black italic text-slate-900 text-lg leading-none uppercase tracking-tighter">Byrion <span class="text-cyan-600">Admin</span></h1>
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">Dashboard Principal</span>
        </div>
      </div>
      <Button icon="pi pi-bars" text rounded class="!text-slate-900 !w-10 !h-10" @click="visible = true" />
    </header>

    <!-- Side Menu -->
    <Drawer v-model:visible="visible" header="Byrion Menu" class="!w-72 !rounded-r-[2rem]">
      <div class="flex flex-col gap-2 mt-4">
        <Button v-for="item in menuItems" :key="item.label" :label="item.label" :icon="item.icon" text :class="['!justify-start !rounded-2xl !py-4 !px-4 !font-bold !text-xs !uppercase !tracking-widest', item.active ? '!bg-cyan-50 !text-cyan-600' : '!text-slate-500']" @click="visible = false" />
      </div>
    </Drawer>

    <main class="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full">
      <!-- Search -->
      <div class="mb-8 group">
        <div class="relative flex items-center">
          <i class="pi pi-search absolute left-6 text-slate-400 group-focus-within:text-cyan-600 transition-colors z-10"></i>
          <InputText v-model="searchQuery" placeholder="NSS, Parte o Modelo de Impresora..." 
            class="w-full !pl-16 !pr-6 !py-6 !rounded-[2rem] !bg-white !border-none !shadow-xl !shadow-slate-200/50 !text-xs font-bold uppercase tracking-widest placeholder:text-slate-300 transition-all" />
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div class="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center">
          <div class="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center mb-3">
            <i class="pi pi-shopping-cart text-cyan-600"></i>
          </div>
          <span class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 italic">Pedidos Hoy</span>
          <div class="text-2xl font-black italic text-slate-900 leading-none">42</div>
        </div>
        <div class="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center">
          <div class="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-3">
            <i class="pi pi-exclamation-triangle text-red-600"></i>
          </div>
          <span class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 italic">Stock Bajo</span>
          <div class="text-2xl font-black italic text-slate-900 leading-none">05</div>
        </div>
        <div class="p-6 bg-slate-900 rounded-[2.5rem] shadow-xl flex flex-col items-center text-center">
          <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3">
            <i class="pi pi-chart-line text-cyan-400"></i>
          </div>
          <span class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-1 italic">Ventas Mes</span>
          <div class="text-2xl font-black italic text-white leading-none">$182K</div>
        </div>
      </div>

      <!-- Stock List -->
      <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 italic px-2">Inventario Crítico (Refacciones)</h2>
      <div class="space-y-4">
        <div v-for="part in parts" :key="part.id" @click="selectPart(part)"
          class="glass-card p-6 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm flex items-center justify-between active:scale-95 transition-all cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-cyan-600 font-black italic">
              <i :class="['pi', part.icon, 'text-xl']"></i>
            </div>
            <div>
              <h3 class="font-black italic text-slate-900 text-lg leading-none mb-1 tracking-tighter uppercase">{{ part.name }}</h3>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SKU: {{ part.sku }}</span>
                 <span class="text-[8px] px-2 py-0.5 rounded-full font-black bg-cyan-50 text-cyan-600 uppercase">{{ part.stock }} UNID</span>
              </div>
            </div>
          </div>
          <i class="pi pi-chevron-right text-slate-200"></i>
        </div>
      </div>

      <!-- Modal Detalle Parte -->
      <Dialog v-model:visible="showModal" modal header="Detalle de Refacción" :style="{ width: '90vw', maxWidth: '450px' }" class="!rounded-[2.5rem] !p-0">
        <template #header>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-100">
              <i class="pi pi-box text-white text-xl"></i>
            </div>
            <div>
              <h2 class="font-black italic text-slate-900 text-xl tracking-tighter uppercase leading-none">{{ selectedPart?.name }}</h2>
              <p class="text-[9px] font-black text-cyan-600 uppercase tracking-widest mt-1 italic">Ficha Técnica de Precisión</p>
            </div>
          </div>
        </template>
        <div class="p-6 space-y-6">
          <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
             <div class="flex items-center gap-3 mb-4">
               <i class="pi pi-info-circle text-cyan-600 font-bold"></i>
               <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Modelos Compatibles</span>
             </div>
             <p class="text-xs font-bold text-slate-700 leading-relaxed">{{ selectedPart?.compatibility }}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
             <div class="p-4 bg-white border border-slate-100 rounded-2xl text-center">
                <span class="text-[8px] font-black uppercase text-slate-400 tracking-widest block mb-1">Precio Unitario</span>
                <span class="text-xl font-black italic text-slate-900">${{ selectedPart?.price }}</span>
             </div>
             <div class="p-4 bg-white border border-slate-100 rounded-2xl text-center">
                <span class="text-[8px] font-black uppercase text-slate-400 tracking-widest block mb-1">Ubicación</span>
                <span class="text-xl font-black italic text-cyan-600 uppercase">{{ selectedPart?.rack }}</span>
             </div>
          </div>

          <Button label="Gestionar Pedido de Resurtido" class="w-full !rounded-2xl !py-5 !text-xs !font-black !bg-cyan-600 !text-white !border-none !shadow-2xl !shadow-cyan-100 uppercase tracking-[0.2em]" />
        </div>
      </Dialog>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Drawer from 'primevue/drawer';
import Dialog from 'primevue/dialog';

const visible = ref(false);
const showModal = ref(false);
const searchQuery = ref('');
const selectedPart = ref(null);

const selectPart = (part) => {
  selectedPart.value = part;
  showModal.value = true;
};

const menuItems = [
  { label: 'Dashboard', icon: 'pi pi-home', active: true },
  { label: 'Inventario', icon: 'pi pi-box', active: false },
  { label: 'Pedidos Pendientes', icon: 'pi pi-shopping-bag', active: false },
  { label: 'Garantías', icon: 'pi pi-shield', active: false },
];

const parts = [
  { id: 1, name: 'Rodillo Fusor Premium', sku: 'BYR-FUS-001', stock: 12, icon: 'pi-sync', compatibility: 'HP LaserJet Series 400, M402n, M404dw', price: '1,450.00', rack: 'A-12' },
  { id: 2, name: 'Cabezal de Impresión', sku: 'BYR-HED-088', stock: 3, icon: 'pi-table', compatibility: 'Epson WorkForce C5790, C5290, M5299', price: '4,800.00', rack: 'B-04' },
  { id: 3, name: 'Tarjeta Lógica V3', sku: 'BYR-LOG-X99', stock: 5, icon: 'pi-microchip', compatibility: 'Brother HL-L2350DW, HL-L2370DW', price: '3,200.00', rack: 'C-01' },
  { id: 4, name: 'Kit de Mantenimiento', sku: 'BYR-MNT-777', stock: 2, icon: 'pi-briefcase', compatibility: 'Lexmark MX711, MX811 Series', price: '6,400.00', rack: 'D-08' },
];
</script>
