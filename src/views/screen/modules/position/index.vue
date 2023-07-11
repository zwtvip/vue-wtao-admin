<template>
  <div>
    <p>
      left: <b>{{ record.x }}</b>
    </p>
    <p>
      top: <b>{{ record.y }}</b>
    </p>
    <p>
      width: <b>{{ record.w }}</b>
    </p>
    <p>
      height: <b>{{ record.h }}</b>
    </p>
  </div>
</template>

<script lang="ts" setup name="Position">
defineProps({
  record: {
    type: Object,
    default: () => {}
  }
})
</script>
