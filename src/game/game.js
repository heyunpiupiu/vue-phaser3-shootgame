import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'


function launch(containerId, backgrounds, words) {
  var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    //scene: [BootScene, PlayScene]
  })
  game.scene.add('BootScene', BootScene);
  var i = 0;
/*   for (bgimg in backgrounds) {
    console.log(bgimg.img)
    game.scene.add('PlayScene'+i, new PlayScene(bgimg.image, words));
    i++
  } */
  game.scene.add('PlayScene', new PlayScene(words));
  game.scene.start('BootScene');
  return game;
}

export default launch
export { launch }
