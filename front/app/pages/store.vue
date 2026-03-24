<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-inter pb-20">
    <!-- Header E-commerce -->
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-6 h-20 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="p-2 bg-slate-50 rounded-xl hover:bg-slate-100">
          <i class="pi pi-arrow-left text-slate-600 text-xs"></i>
        </NuxtLink>
        <div class="flex flex-col">
          <h1 class="font-black italic text-slate-900 text-xl leading-none uppercase tracking-tighter">Byron <span class="text-cyan-600">Store</span></h1>
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">Refacciones de Precisión</span>
        </div>
      </div>
      <div class="relative">
        <Button icon="pi pi-shopping-cart" text rounded class="!text-slate-900 !w-12 !h-12 !bg-slate-50" />
        <span class="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">2</span>
      </div>
    </header>

    <main class="p-6 max-w-5xl mx-auto w-full">
      <!-- Search & Categories -->
      <div class="mb-8">
        <div class="relative flex items-center mb-6">
          <i class="pi pi-search absolute left-6 text-slate-400 z-10"></i>
          <InputText v-model="searchQuery" placeholder="Buscar refacción o modelo..." 
            class="w-full !pl-16 !pr-6 !py-6 !rounded-[2.5rem] !bg-white !border-none !shadow-xl !shadow-slate-200/50 !text-xs font-bold uppercase tracking-widest transition-all" />
        </div>
        
        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Button v-for="cat in categories" :key="cat" :label="cat" 
            :class="['!rounded-2xl !px-6 !py-3 !text-[10px] !font-black !uppercase !tracking-widest !border-none !whitespace-nowrap', cat === activeCat ? '!bg-cyan-600 !text-white shadow-lg shadow-cyan-100' : '!bg-white !text-slate-400 shadow-sm']"
            @click="activeCat = cat" />
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div v-for="product in products" :key="product.id" 
          @click="openDetails(product)"
          class="glass-card rounded-[3rem] bg-white border border-slate-100 overflow-hidden group active:scale-95 transition-all cursor-pointer shadow-xl shadow-slate-200/50">
          <div class="h-56 overflow-hidden relative">
            <img :src="product.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="part">
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-cyan-600 shadow-sm uppercase italic">
              {{ product.brand }}
            </div>
          </div>
          <div class="p-8">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-black italic text-slate-900 text-xl leading-tight uppercase tracking-tighter">{{ product.name }}</h3>
              <span class="text-xs font-black text-cyan-600 italic tracking-tighter">${{ product.price }}</span>
            </div>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Comp: {{ product.compatibility }}</p>
            <Button label="Ver Detalles" icon="pi pi-plus" class="w-full !rounded-2xl !py-4 !text-[10px] !font-black !bg-slate-900 !text-white !border-none uppercase tracking-widest" />
          </div>
        </div>
      </div>
    </main>

    <!-- Product Detail Modal -->
    <Dialog v-model:visible="showDetails" modal :style="{ width: '95vw', maxWidth: '500px' }" class="!rounded-[3rem] !p-0 !overflow-hidden">
      <template #header>
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600">
             <i class="pi pi-cog text-xl"></i>
          </div>
          <div>
            <h2 class="font-black italic text-slate-900 text-xl tracking-tighter uppercase leading-none">{{ selectedProduct?.name }}</h2>
            <p class="text-[10px] font-black text-cyan-600 uppercase tracking-widest mt-1 italic">Especificaciones Técnicas</p>
          </div>
        </div>
      </template>

      <div class="flex flex-col">
        <img :src="selectedProduct?.image" class="w-full h-64 object-cover" alt="detail">
        <div class="p-8 space-y-8">
          <div class="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100">
            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 italic">Descripción del Producto</h4>
            <p class="text-sm font-bold text-slate-700 leading-relaxed">{{ selectedProduct?.description }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-5 bg-white border border-slate-100 rounded-3xl">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1 italic">Disponibilidad</span>
              <span class="text-sm font-black text-emerald-600 uppercase">{{ selectedProduct?.stock }} Unidades</span>
            </div>
            <div class="p-5 bg-white border border-slate-100 rounded-3xl">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1 italic">Condición</span>
              <span class="text-sm font-black text-cyan-600 uppercase">OEM Nuevo</span>
            </div>
          </div>

          <div class="flex gap-4">
            <Button icon="pi pi-heart" text class="!w-16 !h-16 !rounded-[1.5rem] !bg-slate-50 !text-slate-400" />
            <Button label="Añadir al Carrito" icon="pi pi-shopping-cart" 
              class="flex-grow !rounded-[1.5rem] !py-5 !text-xs !font-black !bg-cyan-600 !text-white !border-none !shadow-2xl !shadow-cyan-100 uppercase tracking-widest" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';

const searchQuery = ref('');
const activeCat = ref('Láser');
const showDetails = ref(false);
const selectedProduct = ref(null);

const categories = ['Láser', 'Inyección', 'Térmica', 'Plotters', 'Escáneres'];

const products = [
  { 
    id: 1, 
    name: 'Rodillo Fusor Pro', 
    brand: 'BYR-PREMIUM',
    price: '1,250.00', 
    compatibility: 'HP M402, M404, M426', 
    stock: 24,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop',
    description: 'Componente crítico de alta precisión diseñado para soportar temperaturas de hasta 220°C. Recubrimiento de teflón industrial para una fijación perfecta del tóner.'
  },
  { 
    id: 2, 
    name: 'Cabezal Térmico XP', 
    brand: 'BYR-TECH',
    price: '3,800.00', 
    compatibility: 'Zebra ZT410, ZT411', 
    stock: 8,
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=600&auto=format&fit=crop',
    description: 'Cabezal de impresión térmica de 203 DPI. Diseñado para impresión de etiquetas de alta densidad con resistencia al desgaste abrasivo.'
  },
  { 
    id: 3, 
    name: 'Tarjeta Madre V9', 
    brand: 'BYR-CORE',
    price: '5,400.00', 
    compatibility: 'Epson L-Series, L3110', 
    stock: 5,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
    description: 'Mainboard original con firmware actualizado. Incluye protección contra picos de voltaje y puertos de comunicación blindados.'
  },
  { 
    id: 4, 
    name: 'Kit de Engranajes', 
    brand: 'BYR-DRIVE',
    price: '450.00', 
    compatibility: 'Samsung ML-1610, 2010', 
    stock: 42,
    image: 'https://images.unsplash.com/photo-1530124560676-4cb079457b66?q=80&w=600&auto=format&fit=crop',
    description: 'Tren de engranajes fabricado en polímero de alta densidad reforzado. Reduce el ruido operativo y asegura un arrastre de papel constante.'
  }
];

const openDetails = (product) => {
  selectedProduct.value = product;
  showDetails.value = true;
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
:deep(.p-dialog-header) { padding: 1.5rem !important; border-bottom: 1px solid #f1f5f9; }
:deep(.p-dialog-content) { padding: 0 !important; }
</style>
