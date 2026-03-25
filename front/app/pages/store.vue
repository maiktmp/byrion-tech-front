<template>
  <div class="flex flex-col min-h-screen">
    <!-- Page Header (Internal) -->
    <section class="bg-white border-b border-slate-100 py-12 px-6">
      <div class="max-w-7xl mx-auto w-full">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 class="text-4xl font-black italic text-slate-900 uppercase tracking-tighter leading-none mb-3">
              Catálogo de <span class="text-cyan-600">Refacciones</span>
            </h2>
            <p class="text-slate-500 font-medium italic">Encuentra piezas de precisión para tus sistemas de impresión industrial.</p>
          </div>
          <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
            <span class="text-cyan-600">Store</span>
            <i class="pi pi-chevron-right text-[8px]"></i>
            <span>Productos</span>
            <i class="pi pi-chevron-right text-[8px]"></i>
            <span class="text-slate-900">{{ filteredProducts.length }} Resultados</span>
          </div>
        </div>
      </div>
    </section>

    <main class="p-6 md:p-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-10">
      
      <!-- Sidebar Filters (Desktop) -->
      <aside class="hidden lg:block w-72 flex-shrink-0">
        <div class="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 sticky top-28">
          <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-8 flex items-center gap-3 italic">
            <i class="pi pi-sliders-h text-cyan-600"></i> Parámetros
          </h3>
          
          <div class="space-y-8">
            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Presupuesto</label>
              <div class="flex items-center gap-3">
                <InputText v-model="filterMinPrice" type="number" placeholder="Min" class="w-full !rounded-2xl !bg-slate-50 !border-none !text-[10px] !font-bold !py-4 px-4" />
                <InputText v-model="filterMaxPrice" type="number" placeholder="Max" class="w-full !rounded-2xl !bg-slate-50 !border-none !text-[10px] !font-bold !py-4 px-4" />
              </div>
            </div>
            
            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Fabricante</label>
              <InputText v-model="filterBrand" placeholder="Ej. BYRON-TECH" class="w-full !rounded-2xl !bg-slate-50 !border-none !text-[10px] !font-bold !py-4 px-4 uppercase" />
            </div>

            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Compatibilidad</label>
              <InputText v-model="filterModel" placeholder="Ej. Zebra ZT410" class="w-full !rounded-2xl !bg-slate-50 !border-none !text-[10px] !font-bold !py-4 px-4" />
            </div>
            
            <Button label="Restablecer" @click="clearFilters" text class="w-full !text-[10px] !font-black !uppercase !tracking-[0.2em] !text-red-500 mt-4" />
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-grow space-y-8">
        <!-- Search & View Options -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="relative flex items-center flex-grow">
            <i class="pi pi-search absolute left-6 text-slate-400 z-10 text-sm"></i>
            <InputText v-model="searchQuery" placeholder="Buscar por nombre o descripción..." 
              class="w-full !pl-16 !pr-6 !py-6 !rounded-[2.5rem] !bg-white !border-none !shadow-sm !text-[11px] font-bold uppercase tracking-widest transition-all focus:!ring-2 focus:!ring-cyan-500/20" />
          </div>
          <div class="flex gap-2">
            <Button icon="pi pi-filter" @click="mobileFilters = true" class="lg:hidden !rounded-2xl !w-16 !h-16 !bg-slate-900 !border-none !text-white shadow-lg" />
            <Button icon="pi pi-sort-alt" class="!rounded-2xl !w-16 !h-16 !bg-white !border-slate-100 !text-slate-400 shadow-sm" />
          </div>
        </div>

        <!-- Products Grid -->
        <div v-if="pending" class="flex justify-center py-24">
          <div class="relative w-16 h-16">
            <div class="absolute inset-0 border-4 border-cyan-100 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-cyan-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
        
        <div v-else-if="filteredProducts.length === 0" class="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm">
          <div class="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <i class="pi pi-search-plus text-3xl text-slate-300"></i>
          </div>
          <h3 class="text-lg font-black italic text-slate-900 uppercase tracking-tighter mb-2">Sin coincidencias</h3>
          <p class="text-slate-400 text-sm font-medium italic">Intenta ajustar tus filtros de búsqueda.</p>
          <Button label="Ver todo el catálogo" @click="clearFilters" text class="mt-6 !text-[10px] !font-black !uppercase !tracking-[0.2em] !text-cyan-600" />
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          <div v-for="product in filteredProducts" :key="product.id" 
            @click="openDetails(product)"
            class="group bg-white border border-slate-100 rounded-[3rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer flex flex-col relative">
            
            <!-- Image Container -->
            <div class="h-64 overflow-hidden relative bg-slate-50 flex items-center justify-center">
              <img :src="product.image || 'https://via.placeholder.com/400x300?text=Sin+Imagen'" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="part">
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <!-- Badge -->
              <div class="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm">
                <span class="text-[9px] font-black text-cyan-600 uppercase italic tracking-widest">{{ product.brand }}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-8 flex flex-col flex-grow">
              <div class="flex justify-between items-start mb-4">
                <h3 class="font-black italic text-slate-900 text-xl leading-none uppercase tracking-tighter group-hover:text-cyan-600 transition-colors">{{ product.name }}</h3>
              </div>
              
              <div class="flex items-center gap-2 mb-4">
                <span class="text-lg font-black text-slate-900 italic tracking-tighter">${{ product.price }}</span>
                <span class="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] italic ml-1">MXN</span>
              </div>

              <div class="bg-slate-50 rounded-2xl p-4 mb-8">
                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1 italic">Compatibilidad</span>
                <p class="text-[10px] text-slate-600 font-bold uppercase leading-tight line-clamp-2 italic">{{ product.compatibility }}</p>
              </div>

              <Button label="Ver Especificaciones" icon="pi pi-arrow-right" iconPos="right"
                class="w-full !rounded-2xl !py-5 !text-[10px] !font-black !bg-slate-900 !text-white !border-none uppercase tracking-[0.2em] group-hover:!bg-cyan-600 transition-colors" />
            </div>
            
            <!-- Quick Action Hover -->
            <div class="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-4 group-hover:translate-x-0">
               <Button icon="pi pi-shopping-cart" class="!rounded-xl !w-12 !h-12 !bg-cyan-600 !text-white !border-none shadow-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Mobile Filter Drawer -->
    <Drawer v-model:visible="mobileFilters" position="right" header="Filtros de Búsqueda" class="!w-80 !rounded-l-[3rem]">
      <div class="p-4 space-y-8 mt-6">
        <div class="space-y-3">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Presupuesto</label>
          <div class="flex items-center gap-3">
            <InputText v-model="filterMinPrice" type="number" placeholder="Min" class="w-full !rounded-2xl !bg-slate-50 !border-none !text-[10px] !font-bold !py-4 px-4" />
            <InputText v-model="filterMaxPrice" type="number" placeholder="Max" class="w-full !rounded-2xl !bg-slate-50 !border-none !text-[10px] !font-bold !py-4 px-4" />
          </div>
        </div>
        
        <div class="space-y-3">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Fabricante</label>
          <InputText v-model="filterBrand" placeholder="Ej. BYRON-TECH" class="w-full !rounded-2xl !bg-slate-50 !border-none !text-[10px] !font-bold !py-4 px-4 uppercase" />
        </div>

        <div class="space-y-3">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Compatibilidad</label>
          <InputText v-model="filterModel" placeholder="Ej. Zebra ZT410" class="w-full !rounded-2xl !bg-slate-50 !border-none !text-[10px] !font-bold !py-4 px-4" />
        </div>
        
        <div class="pt-6 space-y-3">
          <Button label="Aplicar Filtros" @click="mobileFilters = false" class="w-full !rounded-2xl !py-5 !bg-cyan-600 !text-white !border-none !font-black uppercase tracking-widest shadow-xl shadow-cyan-100" />
          <Button label="Limpiar Todo" @click="clearFilters" text class="w-full !text-[10px] !font-black !uppercase !tracking-widest !text-red-500" />
        </div>
      </div>
    </Drawer>

    <!-- Product Detail Modal (Premium) -->
    <Dialog v-model:visible="showDetails" modal :style="{ width: '95vw', maxWidth: '600px' }" class="!rounded-[3rem] !p-0 !overflow-hidden border-none shadow-2xl">
      <div class="flex flex-col">
        <!-- Modal Hero -->
        <div class="h-80 relative overflow-hidden bg-slate-100 flex items-center justify-center">
          <img :src="selectedProduct?.image || 'https://via.placeholder.com/400x300?text=Sin+Imagen'" class="w-full h-full object-cover" alt="detail">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          <div class="absolute bottom-8 left-8 right-8">
            <span class="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-2 block italic">Especificaciones Técnicas</span>
            <h2 class="font-black italic text-white text-3xl tracking-tighter uppercase leading-none">{{ selectedProduct?.name }}</h2>
          </div>
          <Button icon="pi pi-times" @click="showDetails = false" text rounded class="absolute top-6 right-6 !text-white !bg-black/20 !backdrop-blur-md" />
        </div>

        <!-- Modal Content -->
        <div class="p-10 space-y-10 bg-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600">
                <i class="pi pi-shield text-2xl"></i>
              </div>
              <div>
                <p class="text-lg font-black text-slate-900 italic tracking-tighter">${{ selectedProduct?.price }} <span class="text-xs text-slate-400 not-italic ml-1">MXN</span></p>
                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Garantía BYRON Precision</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1 italic">Estado</span>
              <span class="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg uppercase tracking-wider">En Stock</span>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 italic">Descripción Detallada</h4>
            <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
              <p class="text-sm font-bold text-slate-600 leading-relaxed italic">{{ selectedProduct?.description }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="p-6 bg-white border border-slate-100 rounded-[2rem] flex flex-col gap-1">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Compatibilidad</span>
              <span class="text-xs font-black text-slate-900 uppercase italic">{{ selectedProduct?.compatibility }}</span>
            </div>
            <div class="p-6 bg-white border border-slate-100 rounded-[2rem] flex flex-col gap-1">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Disponibilidad</span>
              <span class="text-xs font-black text-slate-900 uppercase italic">{{ selectedProduct?.stock }} Unidades</span>
            </div>
          </div>

          <div class="flex gap-4 pt-4">
            <Button icon="pi pi-share-alt" text class="!w-20 !h-20 !rounded-[2rem] !bg-slate-50 !text-slate-400" />
            <Button label="Agregar al Carrito" icon="pi pi-shopping-cart" 
              class="flex-grow !rounded-[2rem] !py-6 !text-xs !font-black !bg-cyan-600 !text-white !border-none !shadow-2xl !shadow-cyan-100 uppercase tracking-[0.2em]" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

import { ref, computed } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Drawer from 'primevue/drawer';

const { data: products, pending } = useFetch('/api/products');

const showDetails = ref(false);
const selectedProduct = ref(null);
const mobileFilters = ref(false);

const searchQuery = ref('');
const filterMinPrice = ref('');
const filterMaxPrice = ref('');
const filterBrand = ref('');
const filterModel = ref('');

const clearFilters = () => {
  searchQuery.value = '';
  filterMinPrice.value = '';
  filterMaxPrice.value = '';
  filterBrand.value = '';
  filterModel.value = '';
};

const filteredProducts = computed(() => {
  if (!products.value) return [];
  
  return products.value.filter(p => {
    const nameMatch = p.name ? p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) : false;
    const descMatch = p.description ? p.description.toLowerCase().includes(searchQuery.value.toLowerCase()) : false;
    const matchSearch = nameMatch || descMatch;
    
    const price = parseFloat(p.price);
    const min = filterMinPrice.value ? parseFloat(filterMinPrice.value) : 0;
    const max = filterMaxPrice.value ? parseFloat(filterMaxPrice.value) : Infinity;
    const matchPrice = price >= min && price <= max;
    
    const brandMatch = p.brand ? p.brand.toLowerCase().includes(filterBrand.value.toLowerCase()) : true;
    const matchBrand = filterBrand.value ? brandMatch : true;
    
    const compatibilityMatch = p.compatibility ? p.compatibility.toLowerCase().includes(filterModel.value.toLowerCase()) : true;
    const matchModel = filterModel.value ? compatibilityMatch : true;
    
    return matchSearch && matchPrice && matchBrand && matchModel;
  });
});

const openDetails = (product) => {
  selectedProduct.value = product;
  showDetails.value = true;
};
</script>

<style scoped>
:deep(.p-dialog-header) { display: none !important; }
:deep(.p-dialog-content) { padding: 0 !important; }
</style>
