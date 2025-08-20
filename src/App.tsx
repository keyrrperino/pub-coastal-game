import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import { MainMenu } from './game/scenes/MainMenu';

function App()
{
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const changeScene = () => {

        if(phaserRef.current)
        {     
            const scene = phaserRef.current.scene as MainMenu;
            
            if (scene)
            {
                scene.changeScene();
            }
        }
    }

    const moveSprite = () => {

        if(phaserRef.current)
        {

            const scene = phaserRef.current.scene as MainMenu;

            if (scene && scene.scene.key === 'MainMenu')
            {
                // Get the update logo position
                scene.moveLogo(({ x, y }) => {

                    setSpritePosition({ x, y });

                });
            }
        }

    }

    const addSprite = () => {

        if (phaserRef.current)
        {
            const scene = phaserRef.current.scene;

            if (scene)
            {
                // Add more stars
                const x = Phaser.Math.Between(64, scene.scale.width - 64);
                const y = Phaser.Math.Between(64, scene.scale.height - 64);
    
                //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
                const star = scene.add.sprite(x, y, 'star');
    
                //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
                //  You could, of course, do this from within the Phaser Scene code, but this is just an example
                //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
                scene.add.tween({
                    targets: star,
                    duration: 500 + Math.random() * 1000,
                    alpha: 0,
                    yoyo: true,
                    repeat: -1
                });
            }
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {

        setCanMoveSprite(scene.scene.key !== 'MainMenu');
        
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 p-4 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-primary mt-4">Remote Games</h1>
            
            <div className="game-wrapper bg-card rounded-lg shadow-xl overflow-hidden border border-border">
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            </div>
            
            <div className="controls-container mt-6 flex flex-wrap gap-4 justify-center">
                <div className="control-box bg-card p-4 rounded-lg shadow-md border border-border">
                    <button 
                        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors" 
                        onClick={changeScene}
                    >
                        Change Scene
                    </button>
                </div>
                
                <div className="control-box bg-card p-4 rounded-lg shadow-md border border-border">
                    <button 
                        disabled={canMoveSprite} 
                        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                        onClick={moveSprite}
                    >
                        Toggle Movement
                    </button>
                </div>
                
                <div className="control-box bg-card p-4 rounded-lg shadow-md border border-border">
                    <button 
                        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors" 
                        onClick={addSprite}
                    >
                        Add New Sprite
                    </button>
                </div>
                
                <div className="spritePosition bg-card p-4 rounded-lg shadow-md border border-border">
                    <h2 className="text-lg font-semibold mb-2">Sprite Position:</h2>
                    <pre className="bg-secondary/20 p-2 rounded-md">{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
                </div>
            </div>
        </div>
    )
}

export default App