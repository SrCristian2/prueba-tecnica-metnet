<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative"
  >
    <div
      v-if="loading"
      class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10"
    >
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
        <div
          class="w-4 h-4 bg-blue-600 rounded-full animate-pulse"
          style="animation-delay: 0.2s"
        ></div>
        <div
          class="w-4 h-4 bg-blue-600 rounded-full animate-pulse"
          style="animation-delay: 0.4s"
        ></div>
      </div>
    </div>
    <div class="overflow-x-auto pb-28">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Título
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Descripción
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Estado
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="tasks.length === 0">
            <td :colspan="5" class="px-6 py-12 text-center">
              <div class="text-gray-500">
                <p class="text-lg font-medium">No hay tareas</p>
                <p class="text-sm mt-1">
                  {{ emptyMessage }}
                </p>
              </div>
            </td>
          </tr>
          <tr
            v-for="task in tasks"
            :key="task._id"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ task._id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">
                {{ task.title }}
              </div>
            </td>
            <td class="px-6 py-4 relative">
              <div
                class="text-sm text-gray-500 max-w-xs cursor-help"
                @mouseenter="$emit('hover', task._id)"
                @mouseleave="$emit('hover', null)"
              >
                <template v-if="task.description">
                  <span class="block truncate">
                    {{ truncateText(task.description) }}
                  </span>
                  <div
                    v-if="
                      hoveredTaskId === task._id && task.description.length > 50
                    "
                    class="absolute z-20 left-0 top-full mt-2 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg max-w-sm whitespace-normal break-words"
                  >
                    {{ task.description }}
                    <div
                      class="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900"
                    ></div>
                  </div>
                </template>
                <template v-else>
                  <span class="italic text-gray-400">Sin descripción</span>
                </template>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button class="transition-transform duration-200 hover:scale-105">
                <span
                  v-if="task.status === 'COMPLETED'"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  <Check class="w-3 h-3 mr-1" />
                  Completada
                </span>
                <span
                  v-else-if="task.status === 'PENDING'"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                >
                  <Clock class="w-3 h-3 mr-1" />
                  Pendiente
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700"
                >
                  Estado desconocido
                </span>
              </button>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="$emit('edit', task)"
                  class="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  title="Editar tarea"
                >
                  <Edit class="w-4 h-4" />
                </button>
                <button
                  @click="$emit('delete', task._id)"
                  class="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Eliminar tarea"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit, Trash2, Check, Clock } from "lucide-vue-next";
import type { Task } from "../App.vue";
import { computed } from "vue";

const props = defineProps<{
  tasks: Task[];
  loading: boolean;
  hoveredTaskId: number | null;
  filter: string;
  truncateText: (text: string, maxLength?: number) => string;
}>();

defineEmits<{
  (e: "edit", task: Task): void;
  (e: "delete", id: number): void;
  (e: "hover", id: number | null): void;
}>();

const emptyMessage = computed(() => {
  if (props.filter === "todas") return "Comienza creando tu primera tarea";
  return `No hay tareas ${
    props.filter === "pendiente" ? "pendientes" : "completadas"
  }`;
});
</script>
