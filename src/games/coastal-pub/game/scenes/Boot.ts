import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // Load any assets that need to be available globally
    }

    create() {
        this.scene.start('CoastalPubScene');
    }
}