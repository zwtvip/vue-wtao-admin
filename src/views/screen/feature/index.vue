<template>
  <Particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="options" />
</template>

<script lang="ts" setup name="ParticlesFeatures">
import { loadFull } from 'tsparticles'
import options from '@/utils/particles'

const particlesInit = async (engine) => {
  await loadFull(engine)
}

const particlesLoaded = async () => {
  // console.log('Particles container loaded', container);
}
</script>
