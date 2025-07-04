import { EventBus } from '../EventBus';

interface PipeSprite extends Phaser.Physics.Arcade.Sprite {
    scored: boolean;
}

export class FlappyBirdScene extends Phaser.Scene {
    private bird!: Phaser.Physics.Arcade.Sprite;
    private pipes!: Phaser.Physics.Arcade.Group;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private isGameOver: boolean = false;
    private pipeTimer!: Phaser.Time.TimerEvent;
    private background!: Phaser.GameObjects.TileSprite;
    private ground!: Phaser.GameObjects.TileSprite;
    private gameOverText!: Phaser.GameObjects.Text;
    private restartText!: Phaser.GameObjects.Text;

    constructor() {
        super('FlappyBirdScene');
    }

    preload() {
        this.load.svg('bird', 'assets/bird.svg');
        this.load.svg('pipe', 'assets/pipe.svg');
        this.load.svg('background', 'assets/background.svg');
        this.load.svg('ground', 'assets/ground.svg');
    }

    create() {
        // Reset game state
        this.isGameOver = false;
        this.score = 0;
        
        // Set up the game world
        this.physics.world.setBounds(0, 0, 800, 600);
        
        // Create background
        this.background = this.add.tileSprite(400, 300, 800, 600, 'background');
        this.background.setScrollFactor(0);
        
        // Create ground
        this.ground = this.add.tileSprite(400, 580, 800, 40, 'ground');
        this.physics.add.existing(this.ground, true);
        
        // Create bird
        this.bird = this.physics.add.sprite(100, 300, 'bird');
        this.bird.setScale(0.5);
        this.bird.setCollideWorldBounds(true);
        
        // Create pipes group
        this.pipes = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        
        // Set up score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', { 
            fontSize: '32px', 
            color: '#000',
            stroke: '#fff',
            strokeThickness: 4
        });
        
        // Set up input
        this.input.on('pointerdown', () => {
            if (!this.isGameOver) {
                this.bird.setVelocityY(-400);
            } else {
                this.restartGame();
            }
        });

        // Start spawning pipes
        this.pipeTimer = this.time.addEvent({
            delay: 1500,
            callback: this.spawnPipe,
            callbackScope: this,
            loop: true
        });

        // Emit scene ready event
        EventBus.emit('current-scene-ready', this);
    }

    update() {
        if (this.isGameOver) return;

        // Scroll background and ground
        this.background.tilePositionX += 2;
        this.ground.tilePositionX += 4;

        // Rotate bird based on velocity
        if (this.bird.body && this.bird.body.velocity.y < 0) {
            this.bird.angle = -20;
        } else {
            this.bird.angle = 90;
        }

        // Check for collisions
        this.physics.overlap(this.bird, this.pipes, this.handleGameOver, undefined, this);
        this.physics.overlap(this.bird, this.ground, this.handleGameOver, undefined, this);

        // Update score
        this.pipes.getChildren().forEach((pipe) => {
            const pipeSprite = pipe as PipeSprite;
            if (pipeSprite.getBounds().right < this.bird.x && !pipeSprite.scored) {
                pipeSprite.scored = true;
                this.increaseScore();
            }
        });
    }

    private spawnPipe() {
        const gap = 200;
        const pipeHeight = 400;
        const pipeWidth = 80;
        const x = this.game.config.width as number;
        const y = Phaser.Math.Between(100, 400);

        // Create top pipe
        const topPipe = this.pipes.create(x, y - gap/2 - pipeHeight/2, 'pipe') as PipeSprite;
        topPipe.setOrigin(0.5, 0.5);
        topPipe.setFlipY(true);
        topPipe.setImmovable(true);
        topPipe.setGravity(0);
        topPipe.scored = false;

        // Create bottom pipe
        const bottomPipe = this.pipes.create(x, y + gap/2 + pipeHeight/2, 'pipe') as PipeSprite;
        bottomPipe.setOrigin(0.5, 0.5);
        bottomPipe.setImmovable(true);
        bottomPipe.setGravity(0);
        bottomPipe.scored = false;

        // Move pipes
        this.tweens.add({
            targets: [topPipe, bottomPipe],
            x: -pipeWidth,
            duration: 5000,
            ease: 'Linear',
            onComplete: () => {
                topPipe.destroy();
                bottomPipe.destroy();
            }
        });
    }

    private increaseScore() {
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    private handleGameOver() {
        if (this.isGameOver) return; // Prevent multiple game over triggers
        
        this.isGameOver = true;
        this.physics.pause();
        this.bird.setTint(0xff0000);
        this.pipeTimer.remove();
        
        this.gameOverText = this.add.text(400, 250, 'Game Over', {
            fontSize: '64px',
            color: '#000',
            stroke: '#fff',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.restartText = this.add.text(400, 350, 'Click to Restart', {
            fontSize: '32px',
            color: '#000',
            stroke: '#fff',
            strokeThickness: 4
        }).setOrigin(0.5);
    }

    private restartGame() {
        // Clean up
        this.pipes.clear(true, true);
        this.gameOverText?.destroy();
        this.restartText?.destroy();
        
        // Restart the scene
        this.scene.restart();
    }
} 