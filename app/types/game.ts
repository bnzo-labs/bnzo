export interface GameObject {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    opacity: number;
}

export interface Particle extends GameObject {
    size: number;
    color: string;
}

export interface Asteroid extends GameObject {
    size: number;
    rotation: number;
    rotationSpeed: number;
}

export interface Alien extends GameObject {
    size: number;
    shootTimer: number;
}

export interface Bullet extends GameObject {
    life: number;
    maxLife: number;
    isPlayerBullet: boolean; // Track if bullet is from player or alien
}

export interface Explosion {
    x: number;
    y: number;
    size: number;
    life: number;
    maxLife: number;
    opacity: number;
}

export interface Wave {
    amplitude: number;
    frequency: number;
    phase: number;
    speed: number;
    color: string;
    opacity: number;
    y: number;
}

export interface GameState {
    playMode: boolean;
    score: number;
    mouseX: number;
    mouseY: number;
    prevMouseX: number;
    prevMouseY: number;
    isMouseMoving: boolean;
    time: number;
    spaceshipAnimationProgress: number; // 0 to 1, for animating spaceship to center
}

export interface GameConfig {
    canvasWidth: number;
    canvasHeight: number;
    spaceshipSize: number;
    spaceshipOffsetY: number; // Offset when not in play mode
}

export interface GameCallbacks {
    onScoreUpdate: (points: number) => void;
    onPlayModeToggle: () => void;
}
