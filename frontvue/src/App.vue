<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeaderSection />
      <TaskActions
        :filter="filter"
        :getFilterCount="getFilterCount"
        @create="openCreateModal"
        @filter="setFilter"
      />
      <TaskTable
        :tasks="filteredTasks"
        :loading="loading"
        :hoveredTaskId="hoveredTaskId"
        :filter="filter"
        :truncateText="truncateText"
        @edit="openEditModal"
        @delete="deleteTask"
        @hover="(val) => (hoveredTaskId = val)"
      />
      <TaskModal
        :isModalOpen="isModalOpen"
        :editingTask="editingTask"
        :formData="formData"
        :loading="loading"
        @close="closeModal"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderSection from "./components/HeaderSection.vue";
import TaskActions from "./components/TaskActions.vue";
import TaskTable from "./components/TaskTable.vue";
import TaskModal from "./components/TaskModal.vue";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
}

type FilterStatus = "todas" | "PENDING" | "COMPLETED";

const tasks = ref<Task[]>([]);
const filteredTasks = ref<Task[]>([]);
const isModalOpen = ref(false);
const editingTask = ref<Task | null>(null);
const filter = ref<FilterStatus>("todas");
const loading = ref(false);
const hoveredTaskId = ref<number | null>(null);

const formData = reactive({
  title: "",
  description: "",
  status: "PENDING" as "PENDING" | "COMPLETED",
});

const loadTasks = async () => {
  try {
    const { data } = await axios.get("/tasks");
    tasks.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  loadTasks();
});

const setFilter = (val: FilterStatus) => {
  filter.value = val;
};

const openCreateModal = () => {
  editingTask.value = null;
  formData.title = "";
  formData.description = "";
  formData.status = "PENDING";
  isModalOpen.value = true;
};

const openEditModal = (task: Task) => {
  editingTask.value = task;
  formData.title = task.title;
  formData.description = task.description || "";
  formData.status = task.status;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingTask.value = null;
  formData.title = "";
  formData.description = "";
  formData.status = "PENDING";
};

const handleSubmit = async () => {
  if (!formData.title.trim()) return;
  loading.value = true;
  try {
    const method = editingTask.value ? "put" : "post";
    const url = editingTask.value
      ? `/tasks/${editingTask.value._id}`
      : "/tasks";
    await axios[method](url, formData);
    await loadTasks();
    closeModal();
  } catch (error) {
    console.error("Error saving task:", error);
    alert("Error al guardar la tarea");
  } finally {
    loading.value = false;
  }
};

const deleteTask = async (id: number) => {
  try {
    const result = await Swal.fire({
      title: "Eliminar tarea",
      text: "¿Estás seguro de que deseas eliminar esta tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    });
    if (result.isConfirmed) {
      loading.value = true;
      const { data } = await axios.delete(`/tasks/${id}`);
      await Swal.fire({
        title: "¡Eliminado!",
        text: data.message,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      await loadTasks();
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  } finally {
    loading.value = false;
  }
};

const getFilterCount = (filterType: FilterStatus) => {
  if (filterType === "todas") return tasks.value.length;
  return tasks.value.filter((task) => task.status === filterType).length;
};

const truncateText = (text: string, maxLength: number = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

watch(
  [tasks, filter],
  () => {
    if (filter.value === "todas") {
      filteredTasks.value = tasks.value;
    } else {
      filteredTasks.value = tasks.value.filter(
        (task) => task.status === filter.value
      );
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
