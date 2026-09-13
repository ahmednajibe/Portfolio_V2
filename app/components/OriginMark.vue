<template>
  <div class="origin-mark" :title="origin === '4d' ? 'Built at 4D' : 'Freelance project'">
    <span class="avatar-stack">
      <img src="/images/avatar.png" alt="Ahmed Najiebe" class="avatar-me" loading="lazy" decoding="async" />
      <span v-if="origin === '4d'" class="avatar-co">
        <img src="/images/brands/4d.png" alt="4D" loading="lazy" decoding="async" />
      </span>
    </span>
    <span class="origin-label">{{ origin === '4d' ? 'At 4D' : 'Freelance' }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ origin: '4d' | 'freelance' }>()
</script>

<style scoped>
.origin-mark {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(5, 8, 22, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 99px;
  padding: 3px 9px 3px 3px;
}
.avatar-stack {
  display: flex;
  align-items: center;
}
.avatar-me {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 1.5px solid #050816;
}
.avatar-co {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -7px;
  border: 1.5px solid #050816;
  overflow: hidden;
}
.avatar-co img {
  width: 13px;
  height: 13px;
  object-fit: contain;
}
.origin-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
}
</style>
