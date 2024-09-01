<template>
  <section class="flex flex-col gap-4">
    <UserForm @create="addRow" />
    <AgGridVue
      :resetRowDataOnUpdate="true"
      :autoSizeStrategy="tableSizeOptions"
      :rowData="tableData"
      :columnDefs="tableHead"
      class="ag-theme-quartz h-100 w-200"
      @grid-ready="onGridReady"
    />
    <UserLogger v-if="logs.length" :logs="logs" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import type {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { type TableData, getRandomUsers } from '../api/api';
import UserForm from '../components/app/UserForm.vue';
import UserLogger, { type ILog } from '../components/app/UserLogger.vue';

const gridApi = ref<null | GridApi>(null);
const tableSizeOptions = ref({
  type: 'fitGridWidth',
  defaultMinWidth: 100,
  defaultMaxWidth: 100,
  columnLimits: [
    {
      colId: 'email',
      minWidth: 250,
      maxWidth: 250,
    },
  ],
});

const tableHead = ref<ColDef[]>([
  { field: 'name' },
  { field: 'gender' },
  { field: 'email' },
  { field: 'age' },
  { field: 'action', cellRenderer: deleteRender },
]);

const tableData = ref<TableData[]>([]);
const logs = ref<ILog[]>([]);

function deleteRender(params: ICellRendererParams): HTMLElement {
  const link = document.createElement('span');
  link.innerText = 'удалить';
  link.style.color = 'red';
  link.style.textDecoration = 'underline';
  link.style.cursor = 'pointer';

  link.addEventListener('click', () => {
    deleteRow(params.node.rowIndex, params.node.data.name as string);
  });
  return link;
}

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api;
};

const addLog = (content: string) => {
  logs.value.unshift({
    id: logs.value.length + 1,
    text: content,
  });
};

const deleteRow = (index: number | null, name: string) => {
  if (index === null || !gridApi.value) return;
  tableData.value.splice(index, 1);
  gridApi.value.setGridOption('rowData', tableData.value);
  addLog(`Удалён пользователь "${name}" `);
};

const addRow = (row: TableData) => {
  if (!gridApi.value) return;
  tableData.value.push({ ...row });
  gridApi.value.setGridOption('rowData', tableData.value);
  addLog(`Добавлен пользователь "${row.name}" `);
};

onMounted(async () => {
  tableData.value = await getRandomUsers();
});
</script>
