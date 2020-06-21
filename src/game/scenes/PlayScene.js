import { Scene } from 'phaser'
import bgimg1 from '@/game/assets/background1.jpg'
import congratulations from '@/game/assets/background2.jpg'
import bullet from '@/game/assets/star.png'
import ground from '@/game/assets/groundd.png'
import shoot from '@/game/assets/shoot.png'
import button from '@/game/assets/button.png'

import pronounciation from '@/game/assets/audio/1.mp3'
import audio1 from '@/game/assets/audio/sound1.wav'
import audioButton from '@/game/assets/audio/button.mp3'
import audioSuccess from '@/game/assets/audio/correct.mp3'

// normally these should be part of attributs of wordList
// passed from Game.vue
import img0 from '@/game/assets/1.png'
import img1 from '@/game/assets/2.png'
import img2 from '@/game/assets/3.png'
import img3 from '@/game/assets/4.png'
import img4 from '@/game/assets/5.png'
export default class PlayScene extends Scene {
  constructor(words) {
    super({ key: 'PlayScene' })
    this.wordList = words
    this.cursors = null
    this.player = null
    this.shoot = false
    this.myBullets = null
    this.num = 1
    this.try = 0
  }

  preload() {
    // 导入背景 弹弓 成功提示 子弹
    // this.load.image(key,url)
    this.load.image('bgimg1', bgimg1);
    this.load.image('sky2', congratulations);
    //  game.load.image('end', 'assets/end.jpg');

    this.load.image('bullet', bullet);
    this.load.image('ground', ground)


    //game.load.image('success', 'assets/con.png');
    // load.spritesheet(key, url, {frameWidth, frameHeight})
    this.load.spritesheet('shoot', shoot, { frameWidth: 110, frameHeight: 146 });

    //导入汉字
    this.load.image('0', img0);
    this.load.image('1', img1);
    this.load.image('2', img2);
    this.load.image('3', img3);
    this.load.image('4', img4);

    //导入按钮
    this.load.image('soundbutton', button);
    //game.load.image('startbutton', 'assets/start.png');
    //game.load.image('startbutton2', 'assets/start2.png');

    //导入发音
    // pronounciation should get the audio of the word num
    this.load.audio('1', [pronounciation]);
    this.load.audio('2', [audio1]);
    this.load.audio('button', [audioButton]);
    this.load.audio('success', [audioSuccess]);
  }

  playSound() {
    this.sound.play('1')
  }

  //碰撞函数
  collectCharacter (bullet, character) {
    this.sound.play('success');
    //判断碰撞到的汉字与发音对应的编号是否相同
    if (character.key === this.num) {
      // go to next scene
      // 设置一个新的scene
    } else {
      bullet.destroy();
      //判断是否尝试3次，3次过后失败
      console.log(this.try)
      this.try = this.try + 1;
      if (this.try >= 3) {
        // go to failure scene
      } else {
        this.shoot = false
      }
    }
  }

  create() {
    this.sound.play('1')

    var bgimg = this.add.sprite(400, 300, 'bgimg1')
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    bgimg.x = screenCenterX
    bgimg.y = screenCenterY
    bgimg.height = 600
    bgimg.width = 800
    bgimg.smoothed = false

    var text1 = this.add.text(this.cameras.main.worldView.x + 16, this.cameras.main.worldView.y + 40, 'Click', { fontSize: '32px', fill: '#000' })

    const soundButton = this.add.sprite(text1.originX + text1.displayWidth * 1.5, text1.y + text1.displayHeight / 2, 'soundbutton')
    soundButton.setInteractive()
    soundButton.on('pointerdown', () => { this.playSound() }, this);
    this.add.text(text1.originX + text1.displayWidth * 2, text1.y, 'to listen again:', { fontSize: '32px', fill: '#000' })
    //this.add.text(400, 300, this.wordList)

    //const platforms = this.physics.add.staticGroup()
    //platforms.create(this.cameras.main.width, this.cameras.main.height, 'ground')

    this.player = this.physics.add.sprite(100, this.cameras.main.height - 300, 'shoot')
    this.player.setCollideWorldBounds(true)
    this.player.setBounceY(0.3)
    this.player.setGravityY(300)
    this.player.body.onWorldBounds = true // enable worldbounds collision event

    this.cursors = this.input.keyboard.createCursorKeys();

    /*     var wordTexts = []
        for (i = 0; i < this.wordList.length; i++) {
          wordTexts.push(this.add.text)
        } */
    var i;
    this.characters = this.physics.add.group()
    for (i = 1; i < this.wordList.length; i++) {
      this.characters.create(150 * i, 200, i)
    }

    //this.myBullets = this.physics.add.group()

    // overlap(object1, object2 [, collideCallback] [, processCallback] [, callbackContext])
    //this.physics.add.overlap(this.myBullets, this.characters, this.collectCharacter, null, this)
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    }
    else {
      this.player.setVelocityX(0);
    }

    var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if (spaceKey.isDown && !this.shoot) {
      this.shoot = true;
      var myBullet = this.physics.add.image(this.player.x, this.player.y - 20, 'bullet');
      myBullet.setVelocityY(-200);
      this.physics.add.overlap(myBullet, this.characters, this.collectCharacter, null, this)
      //this.myBullets.add(myBullet);
    }
  }
}
