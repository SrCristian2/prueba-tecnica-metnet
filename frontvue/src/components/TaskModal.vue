<template>
  <div v-if="isModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
    <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ editingTask ? 'Editar Tarea' : 'Nueva Tarea' }}
        </h3>
        <button
          @click="$emit('close')"
          class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
      <form @submit.prevent="$emit('submit')" class="p-6">
        <div class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              type="text"
              id="title"
              v-model="formData.title"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Ingresa el título de la tarea"
              required
            />
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
              placeholder="Describe la tarea (opcional)"
            />
          </div>
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              id="status"
              v-model="formData.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="PENDING">Pendiente</option>
              <option value="COMPLETED">Completada</option>
            </select>
          </div>
        </div>
        <div class="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="loading || !formData.title.trim()"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {{ loading ? 'Guardando...' : editingTask ? 'Actualizar' : 'Crear' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';
import type { Task } from '../App.vue';

defineProps<{
  isModalOpen: boolean;
  editingTask: Task | null;
  formData: { title: string; description: string; status: 'PENDING' | 'COMPLETED' };
  loading: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'submit'): void;
}>();
</script>
