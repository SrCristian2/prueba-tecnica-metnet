<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <button
        @click="$emit('create')"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        <Plus class="w-4 h-4 mr-2" />
        Nueva Tarea
      </button>
      <div class="flex items-center gap-2">
        <Filter class="w-4 h-4 text-gray-400" />
        <span class="text-sm font-medium text-gray-700 mr-2">Filtrar:</span>
        <div class="flex rounded-lg border border-gray-300 overflow-hidden">
          <button
            @click="$emit('filter', 'todas')"
            :class="[
              'px-3 py-1.5 text-xs font-medium transition-colors duration-200',
              filter === 'todas' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            Todas ({{ getFilterCount('todas') }})
          </button>
          <button
            @click="$emit('filter', 'PENDING')"
            :class="[
              'px-3 py-1.5 text-xs font-medium border-l border-gray-300 transition-colors duration-200',
              filter === 'PENDING' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            Pendientes ({{ getFilterCount('PENDING') }})
          </button>
          <button
            @click="$emit('filter', 'COMPLETED')"
            :class="[
              'px-3 py-1.5 text-xs font-medium border-l border-gray-300 transition-colors duration-200',
              filter === 'COMPLETED' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            Completadas ({{ getFilterCount('COMPLETED') }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Filter } from 'lucide-vue-next';
import type { FilterStatus } from '../App.vue';

defineProps<{
  filter: FilterStatus;
  getFilterCount: (type: FilterStatus) => number;
}>();

defineEmits<{
  (e: 'create'): void;
  (e: 'filter', val: FilterStatus): void;
}>();
</script>
