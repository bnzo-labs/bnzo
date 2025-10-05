import { GameLogicRedux } from './GameLogicRedux';
import { GameRenderer } from '../components/GameRenderer';
import { GameConfig, GameCallbacks } from '../types/game';
import { store } from '../store';
import { updateMousePosition, updateTime, updateCanvasSize, togglePlayMode } from '../store/gameSlice';

export class GameManager {
    private gameLogic: GameLogicRedux;
    private gameRenderer: GameRenderer | null = null;
    private animationId: number | null = null;
    private callbacks: GameCallbacks;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, callbacks: GameCallbacks) {
        this.canvas = canvas;

        const config: GameConfig = {
            canvasWidth: canvas.width,
            canvasHeight: canvas.height,
            spaceshipSize: 20,
            spaceshipOffsetY: 80
        };

        this.gameLogic = new GameLogicRedux(config, () => store.getState());
        this.gameRenderer = new GameRenderer(canvas, this.gameLogic);
        this.callbacks = callbacks;

        // Initialize Redux state after a short delay
        setTimeout(() => {
            this.initializeReduxState(canvas.width, canvas.height);
        }, 50);
    }

    private initializeReduxState(width: number, height: number) {
        try {
            store.dispatch(updateCanvasSize({ width, height }));
            store.dispatch(updateMousePosition({ x: width / 2, y: height / 2 }));
        } catch (error) {
            console.warn('Redux store not ready yet, will initialize later:', error);
            // Retry after a short delay
            setTimeout(() => {
                try {
                    store.dispatch(updateCanvasSize({ width, height }));
                    store.dispatch(updateMousePosition({ x: width / 2, y: height / 2 }));
                } catch (retryError) {
                    console.error('Failed to initialize Redux state:', retryError);
                }
            }, 100);
        }
    }

    start() {
        this.animate();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    private animate() {
        store.dispatch(updateTime(Date.now() * 0.001)); // Convert to seconds
        this.gameLogic.update();
        this.gameRenderer?.render();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateMousePosition(x: number, y: number) {
        store.dispatch(updateMousePosition({ x, y }));
    }

    togglePlayMode() {
        const currentState = (store.getState() as { game: { playMode: boolean } }).game;
        const newPlayMode = !currentState.playMode;

        store.dispatch(togglePlayMode());

        if (!newPlayMode) {
            this.gameLogic.clearGameObjects();
        }

        this.callbacks.onPlayModeToggle();
    }

    shootBullet(targetX: number, targetY: number) {
        const gameState = (store.getState() as { game: { playMode: boolean } }).game;
        if (!gameState.playMode) return;

        const config = this.gameLogic.getConfig();
        const centerX = config.canvasWidth / 2;
        const centerY = this.gameLogic.getSpaceshipCenterY();

        this.gameLogic.shootBullet(centerX, centerY, targetX, targetY);
    }

    resizeCanvas(width: number, height: number) {
        const config = this.gameLogic.getConfig();
        config.canvasWidth = width;
        config.canvasHeight = height;

        // Update Redux state
        store.dispatch(updateCanvasSize({ width, height }));

        // Update the existing game logic with new dimensions
        this.gameLogic.updateConfig(config);

        // Update the renderer with the same canvas
        this.gameRenderer = new GameRenderer(this.canvas, this.gameLogic);
    }

}
