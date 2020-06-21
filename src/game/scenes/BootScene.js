import { Scene } from 'phaser'
import sky from '@/game/assets/sky.png'
import start from '@/game/assets/start.png'
import thudMp3 from '@/game/assets/thud.mp3'
import thudOgg from '@/game/assets/thud.ogg'
import bgMp3 from '@/game/assets/audio/bg.mp3'


export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('sky', sky);
    //this.load.image('star', star);
    this.load.image('startbutton', start);
    this.load.audio('thud', [thudMp3, thudOgg]);
    this.load.audio('bgm', [bgMp3]);
  }

  startButtonClicked () {
    console.log('clicked');
    this.sound.stopByKey('bgm')
    //this.sound.play('thud', { volume: 0.75 });
    this.scene.start('PlayScene');
  }
  create () {
    this.add.image(400,300,'sky');
    const startButton = this.add.sprite(400,300,'startbutton');
    this.add.text(130,150, 'hello');
    this.sound.play('bgm')

    startButton.setInteractive();
    startButton.on('pointerdown', () => {this.startButtonClicked()}, this);
    //this.scene.start('PlayScene')
  }
}
