<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
  <TresMesh>
    <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
    <TresMeshBasicMaterial />
  </TresMesh>
  <TresAmbientLight :intensity="1" />
</template>
