<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-inter">
    <!-- Navbar -->
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-4 h-16 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/dashboard" class="p-2 bg-slate-50 rounded-xl hover:bg-slate-100">
          <i class="pi pi-arrow-left text-slate-600 text-xs"></i>
        </NuxtLink>
        <div class="flex flex-col">
          <h1 class="font-black italic text-slate-900 text-lg leading-none uppercase tracking-tighter">Byron <span class="text-cyan-600">Admin</span></h1>
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">Gestión de Inventario</span>
        </div>
      </div>
      <Button icon="pi pi-plus" class="!rounded-xl !bg-cyan-600 !text-white !border-none !w-10 !h-10 shadow-lg shadow-cyan-100" @click="openNew" />
    </header>

    <main class="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full">
      <div v-if="pending" class="flex justify-center py-20">
        <i class="pi pi-spin pi-spinner text-4xl text-cyan-600"></i>
      </div>

      <div v-else class="space-y-4">
        <div v-for="part in products" :key="part.id"
          class="glass-card p-6 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm flex items-center justify-between active:scale-95 transition-all">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-cyan-600">
              <img v-if="part.image" :src="part.image" class="w-full h-full object-cover rounded-[1.5rem]" />
              <i v-else class="pi pi-box text-xl"></i>
            </div>
            <div>
              <h3 class="font-black italic text-slate-900 text-lg leading-none mb-1 tracking-tighter uppercase">{{ part.name }}</h3>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SKU: {{ part.brand }}</span>
                 <span class="text-[8px] px-2 py-0.5 rounded-full font-black bg-cyan-50 text-cyan-600 uppercase">{{ part.stock }} UNID</span>
              </div>
            </div>
          </div>
          <Button icon="pi pi-trash" severity="danger" text rounded @click="deleteProduct(part.id)" />
        </div>
      </div>
    </main>

    <!-- Dialog para Nuevo Producto -->
    <Dialog v-model:visible="productDialog" modal header="Nuevo Producto" :style="{ width: '90vw', maxWidth: '450px' }" class="!rounded-[2.5rem]">
      <div class="p-4 space-y-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2">Nombre del Producto</label>
          <InputText v-model="product.name" class="w-full !rounded-2xl !bg-slate-50 !border-none !py-4" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase text-slate-400 ml-2">Precio</label>
            <InputText v-model="product.price" type="number" class="w-full !rounded-2xl !bg-slate-50 !border-none !py-4" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase text-slate-400 ml-2">Stock</label>
            <InputText v-model="product.stock" type="number" class="w-full !rounded-2xl !bg-slate-50 !border-none !py-4" />
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2">Compatibilidad</label>
          <InputText v-model="product.compatibility" class="w-full !rounded-2xl !bg-slate-50 !border-none !py-4" />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2">URL Imagen</label>
          <InputText v-model="product.image" class="w-full !rounded-2xl !bg-slate-50 !border-none !py-4" placeholder="https://..." />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2">Descripción</label>
          <Textarea v-model="product.description" rows="3" class="w-full !rounded-2xl !bg-slate-50 !border-none !py-4" />
        </div>
        
        <Button label="Guardar Producto" icon="pi pi-check" @click="saveProduct" 
          class="w-full !rounded-2xl !py-5 !bg-cyan-600 !text-white !border-none !font-black uppercase tracking-widest shadow-xl shadow-cyan-100" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';

const { data: products, pending, refresh } = useFetch('/api/products');

const productDialog = ref(false);
const product = ref({
  name: '',
  price: '',
  stock: '',
  brand: 'BYRON-GEN',
  compatibility: '',
  image: '',
  description: ''
});

const openNew = () => {
  product.value = { brand: 'BYRON-GEN' };
  productDialog.value = true;
};

const saveProduct = async () => {
  await $fetch('/api/products', {
    method: 'POST',
    body: product.value
  });
  productDialog.value = false;
  refresh();
};

const deleteProduct = async (id) => {
  await $fetch(`/api/products?id=${id}`, {
    method: 'DELETE'
  });
  refresh();
};
</script>
