<template>
  <div :id="containerId" v-if="downloaded" />
  <div class="placeholder" v-else>Downloading ...</div>
</template>


<script>
export default {
  name: "Game",
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: "game-container",
      backgrounds: [
        { image: require("@/game/assets/background1.jpg") },
        { image: require("@/game/assets/state2.jpg") }
      ],
      words: ["一", "二", "三", "四", "五"]
    };
  },
  async mounted() {
    const game = await import(/* webpackChunkName: "game" */ "@/game/game");
    this.downloaded = true;
    this.$nextTick(() => {
      this.gameInstance = game.launch(
        this.containerId,
        this.backgrounds,
        this.words
      );
    });
  },
  destroyed() {
    this.gameInstance.destroy(false);
  }
};
</script>


<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: "Courier New", Courier, monospace;
}
</style>
