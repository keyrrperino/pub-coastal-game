import Phaser from 'phaser';
import { EventBus } from '../EventBus';
import { GameState, GameElement } from '@/lib/gameRoom';

export class CoastalPubScene extends Phaser.Scene {
    private trees: Phaser.GameObjects.Group;
    private islands: Phaser.GameObjects.Group;
    private waterBodies: Phaser.GameObjects.Group;
    
    private treeCount: number = 0;
    private islandCount: number = 0;
    private waterCount: number = 0;
    
    private treeCountText: Phaser.GameObjects.Text;
    private islandCountText: Phaser.GameObjects.Text;
    private waterCountText: Phaser.GameObjects.Text;
    
    private elementMap: Map<string, Phaser.GameObjects.GameObject[]> = new Map();

    constructor() {
        super('CoastalPubScene');
    }

    preload() {
        // Create simple colored rectangles as placeholders for sprites
        this.load.image('tree', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
        this.load.image('island', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
        this.load.image('water', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
    }

    create() {
        const gameWidth = this.game.config.width as number;
        const gameHeight = this.game.config.height as number;

        // Create groups for each element type
        this.trees = this.add.group();
        this.islands = this.add.group();
        this.waterBodies = this.add.group();

        // Create UI text for counts
        this.treeCountText = this.add.text(20, 20, 'Trees: 0', {
            fontSize: '24px',
            color: '#228B22',
            stroke: '#fff',
            strokeThickness: 2
        });

        this.islandCountText = this.add.text(20, 60, 'Islands: 0', {
            fontSize: '24px',
            color: '#8B4513',
            stroke: '#fff',
            strokeThickness: 2
        });

        this.waterCountText = this.add.text(20, 100, 'Water: 0', {
            fontSize: '24px',
            color: '#4169E1',
            stroke: '#fff',
            strokeThickness: 2
        });

        // Add title
        this.add.text(gameWidth / 2, 30, 'Coastal Pub', {
            fontSize: '36px',
            color: '#2F4F4F',
            stroke: '#fff',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Add instructions
        this.add.text(gameWidth / 2, gameHeight - 40, 'Use the buttons below to add elements to your coastal scene', {
            fontSize: '18px',
            color: '#2F4F4F',
            stroke: '#fff',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Emit scene ready event
        EventBus.emit('current-scene-ready', this);
    }

    public syncGameState(gameState: GameState) {
        // Clear existing elements
        this.clearAllElements();
        
        // Update counts
        this.treeCount = gameState.treeCount || 0;
        this.islandCount = gameState.islandCount || 0;
        this.waterCount = gameState.waterCount || 0;
        
        // Recreate elements from state (check if elements array exists)
        if (gameState.elements && Array.isArray(gameState.elements)) {
            gameState.elements.forEach(element => {
                this.createElementFromData(element);
            });
        }
        
        // Update display
        this.updateAllDisplays();
    }
    
    private clearAllElements() {
        this.trees.clear(true, true);
        this.islands.clear(true, true);
        this.waterBodies.clear(true, true);
        this.elementMap.clear();
    }
    
    private createElementFromData(element: GameElement) {
        const gameObjects: Phaser.GameObjects.GameObject[] = [];
        
        if (element.type === 'tree') {
            const tree = this.add.circle(element.x, element.y, 20, 0x228B22);
            tree.setStrokeStyle(3, 0x006400);
            tree.setScale(element.scale);
            
            const trunk = this.add.rectangle(element.x, element.y + 25, 8, 20, 0x8B4513);
            trunk.setScale(element.scale);
            
            this.trees.add(tree);
            this.trees.add(trunk);
            
            gameObjects.push(tree, trunk);
        } else if (element.type === 'island') {
            const island = this.add.ellipse(element.x, element.y, 60, 40, 0xDEB887);
            island.setStrokeStyle(2, 0x8B7355);
            island.setScale(element.scale);
            
            this.islands.add(island);
            gameObjects.push(island);
        } else if (element.type === 'water') {
            const water = this.add.ellipse(element.x, element.y, 80, 50, 0x4169E1, 0.7);
            water.setStrokeStyle(2, 0x0000CD);
            water.setScale(element.scale);
            
            this.waterBodies.add(water);
            gameObjects.push(water);
            
            // Add wave animation
            this.tweens.add({
                targets: water,
                scaleX: element.scale * 1.1,
                scaleY: element.scale * 0.9,
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
        
        this.elementMap.set(element.id, gameObjects);
    }
    
    private updateAllDisplays() {
        this.treeCountText.setText(`Trees: ${this.treeCount}`);
        this.islandCountText.setText(`Islands: ${this.islandCount}`);
        this.waterCountText.setText(`Water: ${this.waterCount}`);
    }

    public getRandomPosition(type: 'tree' | 'island' | 'water'): { x: number, y: number } {
        const gameWidth = this.game.config.width as number;
        const gameHeight = this.game.config.height as number;
        
        switch (type) {
            case 'tree':
                return {
                    x: Phaser.Math.Between(50, gameWidth - 50),
                    y: Phaser.Math.Between(150, gameHeight - 150)
                };
            case 'island':
                return {
                    x: Phaser.Math.Between(80, gameWidth - 80),
                    y: Phaser.Math.Between(180, gameHeight - 120)
                };
            case 'water':
                return {
                    x: Phaser.Math.Between(60, gameWidth - 60),
                    y: Phaser.Math.Between(160, gameHeight - 100)
                };
        }
    }
}