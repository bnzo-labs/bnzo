import { Particle, Asteroid, Alien, Bullet, Explosion, Wave, GameConfig, GameState } from '../types/game';
import { RootState } from '../store';

export class GameLogic {
    private particles: Particle[] = [];
    private asteroids: Asteroid[] = [];
    private aliens: Alien[] = [];
    private bullets: Bullet[] = [];
    private explosions: Explosion[] = [];
    private waves: Wave[] = [];
    private config: GameConfig;
    private getState: () => RootState;

    constructor(config: GameConfig, getState: () => RootState) {
        this.config = config;
        this.getState = getState;
        this.initializeWaves();
    }

    private initializeWaves() {
        const colors = [
            'rgba(59, 130, 246, 0.1)',   // blue
            'rgba(139, 92, 246, 0.08)',  // purple
            'rgba(236, 72, 153, 0.06)',  // pink
            'rgba(6, 182, 212, 0.1)',    // cyan
            'rgba(16, 185, 129, 0.08)',  // emerald
            'rgba(245, 158, 11, 0.06)'   // amber
        ];

        for (let i = 0; i < 6; i++) {
            this.waves.push({
                amplitude: 30 + Math.random() * 50,
                frequency: 0.01 + Math.random() * 0.02,
                phase: Math.random() * Math.PI * 2,
                speed: 0.5 + Math.random() * 1.5,
                color: colors[i],
                opacity: 0.3 + Math.random() * 0.4,
                y: (this.config.canvasHeight / 6) * i + 100
            });
        }
    }

    updateConfig(newConfig: GameConfig) {
        const oldWidth = this.config.canvasWidth;
        const oldHeight = this.config.canvasHeight;

        this.config = { ...this.config, ...newConfig };

        // Only reinitialize waves if dimensions actually changed
        if (oldWidth !== newConfig.canvasWidth || oldHeight !== newConfig.canvasHeight) {
            this.initializeWaves();
        }
    }

    createParticle(x: number, y: number, vx: number, vy: number, color: string = '#06b6d4') {
        this.particles.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            vx: vx + (Math.random() - 0.5) * 2,
            vy: vy + (Math.random() - 0.5) * 2,
            size: Math.random() * 2 + 1,
            color,
            life: 0,
            maxLife: Math.random() * 30 + 20,
            opacity: 0.8 + Math.random() * 0.2
        });
    }

    createAsteroid() {
        const side = Math.floor(Math.random() * 4);
        let x = 0, y = 0, vx = 0, vy = 0;

        switch (side) {
            case 0: // Top
                x = Math.random() * this.config.canvasWidth;
                y = -50;
                vx = (Math.random() - 0.5) * 2;
                vy = Math.random() * 2 + 1;
                break;
            case 1: // Right
                x = this.config.canvasWidth + 50;
                y = Math.random() * this.config.canvasHeight;
                vx = -(Math.random() * 2 + 1);
                vy = (Math.random() - 0.5) * 2;
                break;
            case 2: // Bottom
                x = Math.random() * this.config.canvasWidth;
                y = this.config.canvasHeight + 50;
                vx = (Math.random() - 0.5) * 2;
                vy = -(Math.random() * 2 + 1);
                break;
            case 3: // Left
                x = -50;
                y = Math.random() * this.config.canvasHeight;
                vx = Math.random() * 2 + 1;
                vy = (Math.random() - 0.5) * 2;
                break;
        }

        const asteroid = {
            x, y, vx, vy,
            size: Math.random() * 20 + 10,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            life: 0,
            maxLife: 1000,
            opacity: 0.8 + Math.random() * 0.2
        };

        this.asteroids.push(asteroid);
    }

    createAlien() {
        const side = Math.floor(Math.random() * 4);
        let x = 0, y = 0, vx = 0, vy = 0;

        switch (side) {
            case 0: // Top
                x = Math.random() * this.config.canvasWidth;
                y = -50;
                vx = (Math.random() - 0.5) * 1.5;
                vy = Math.random() * 1.5 + 0.5;
                break;
            case 1: // Right
                x = this.config.canvasWidth + 50;
                y = Math.random() * this.config.canvasHeight;
                vx = -(Math.random() * 1.5 + 0.5);
                vy = (Math.random() - 0.5) * 1.5;
                break;
            case 2: // Bottom
                x = Math.random() * this.config.canvasWidth;
                y = this.config.canvasHeight + 50;
                vx = (Math.random() - 0.5) * 1.5;
                vy = -(Math.random() * 1.5 + 0.5);
                break;
            case 3: // Left
                x = -50;
                y = Math.random() * this.config.canvasHeight;
                vx = Math.random() * 1.5 + 0.5;
                vy = (Math.random() - 0.5) * 1.5;
                break;
        }

        this.aliens.push({
            x, y, vx, vy,
            size: Math.random() * 15 + 8,
            life: 0,
            maxLife: 1500,
            opacity: 0.9 + Math.random() * 0.1,
            shootTimer: Math.random() * 100
        });
    }

    shootBullet(fromX: number, fromY: number, targetX: number, targetY: number, isPlayerBullet: boolean = false) {
        const dx = targetX - fromX;
        const dy = targetY - fromY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 8;

        this.bullets.push({
            x: fromX,
            y: fromY,
            vx: (dx / distance) * speed,
            vy: (dy / distance) * speed,
            life: 0,
            maxLife: 100,
            opacity: 1,
            isPlayerBullet
        });
    }

    createExplosion(x: number, y: number, size: number) {
        this.explosions.push({
            x, y, size,
            life: 0,
            maxLife: 30,
            opacity: 1
        });
    }

    update() {
        const gameState = this.getState().game;

        // Simple debug log every 60 frames (about once per second)
        if (Math.floor(gameState.time * 60) % 60 === 0) {
        }

        this.updateWaves();
        this.updateParticles();

        if (gameState.playMode) {
            this.spawnEnemies();
            this.updateAsteroids();
            this.updateAliens();
            this.updateBullets();
            this.checkCollisions();
            this.updateExplosions();
        }
    }

    private updateWaves() {
        const centerX = this.config.canvasWidth / 2;
        const centerY = this.getSpaceshipCenterY();
        const gameState = this.getState().game;
        const mouseDistanceFromCenter = Math.sqrt(
            Math.pow(gameState.mouseX - centerX, 2) +
            Math.pow(gameState.mouseY - centerY, 2)
        );
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const movementSpeed = (mouseDistanceFromCenter / maxDistance) * 2;

        const mouseAngle = Math.atan2(gameState.mouseY - centerY, gameState.mouseX - centerX);
        const movementX = Math.cos(mouseAngle) * movementSpeed;

        this.waves.forEach(wave => {
            wave.phase += wave.speed * 0.01 + (movementX * 0.03);
        });
    }

    private updateParticles() {
        const centerX = this.config.canvasWidth / 2;
        const centerY = this.getSpaceshipCenterY();
        const gameState = this.getState().game;
        const mouseDistanceFromCenter = Math.sqrt(
            Math.pow(gameState.mouseX - centerX, 2) +
            Math.pow(gameState.mouseY - centerY, 2)
        );
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const movementSpeed = (mouseDistanceFromCenter / maxDistance) * 2;

        if (movementSpeed > 0.1) {
            const mouseAngle = Math.atan2(gameState.mouseY - centerY, gameState.mouseX - centerX);
            const particleCount = Math.floor(movementSpeed * 3) + 1;

            for (let i = 0; i < particleCount; i++) {
                if (Math.random() < 0.8) {
                    const particleX = centerX - Math.cos(mouseAngle) * 25 + (Math.random() - 0.5) * 10;
                    const particleY = centerY - Math.sin(mouseAngle) * 25 + (Math.random() - 0.5) * 10;
                    const particleVx = -Math.cos(mouseAngle) * movementSpeed * 2 + (Math.random() - 0.5) * 2;
                    const particleVy = -Math.sin(mouseAngle) * movementSpeed * 2 + (Math.random() - 0.5) * 2;

                    this.createParticle(particleX, particleY, particleVx, particleVy);
                }
            }
        }

        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life++;
            particle.opacity = Math.max(0, particle.opacity - 0.01);

            if (particle.life > particle.maxLife || particle.opacity <= 0) {
                this.particles.splice(index, 1);
            }
        });
    }

    private spawnEnemies() {
        // Force create an asteroid every 60 frames for testing
        const gameState = this.getState().game;
        if (Math.floor(gameState.time * 60) % 60 === 0 && this.asteroids.length === 0) {
            this.createAsteroid();
        }

        if (Math.random() < 0.02) {
            this.createAsteroid();
        }
        if (Math.random() < 0.01) {
            this.createAlien();
        }
    }

    private updateAsteroids() {
        this.asteroids.forEach((asteroid, index) => {
            asteroid.x += asteroid.vx;
            asteroid.y += asteroid.vy;
            asteroid.rotation += asteroid.rotationSpeed;
            asteroid.life++;

            // Debug first asteroid position
            if (index === 0 && Math.floor(this.getState().game.time * 60) % 60 === 0) {
            }

            if (asteroid.life > asteroid.maxLife ||
                asteroid.x < -100 || asteroid.x > this.config.canvasWidth + 100 ||
                asteroid.y < -100 || asteroid.y > this.config.canvasHeight + 100) {
                this.asteroids.splice(index, 1);
            }
        });
    }

    private updateAliens() {
        const spaceshipCenterX = this.config.canvasWidth / 2;
        const spaceshipCenterY = this.getSpaceshipCenterY();

        this.aliens.forEach((alien, index) => {
            alien.x += alien.vx;
            alien.y += alien.vy;
            alien.life++;
            alien.shootTimer++;

            if (alien.shootTimer > 60) {
                this.shootBullet(alien.x, alien.y, spaceshipCenterX, spaceshipCenterY);
                alien.shootTimer = 0;
            }

            if (alien.life > alien.maxLife ||
                alien.x < -100 || alien.x > this.config.canvasWidth + 100 ||
                alien.y < -100 || alien.y > this.config.canvasHeight + 100) {
                this.aliens.splice(index, 1);
            }
        });
    }

    private updateBullets() {
        this.bullets.forEach((bullet, index) => {
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;
            bullet.life++;

            if (bullet.life > bullet.maxLife ||
                bullet.x < -50 || bullet.x > this.config.canvasWidth + 50 ||
                bullet.y < -50 || bullet.y > this.config.canvasHeight + 50) {
                this.bullets.splice(index, 1);
            }
        });
    }

    private checkCollisions() {
        // Check bullet-asteroid collisions
        for (let bulletIndex = this.bullets.length - 1; bulletIndex >= 0; bulletIndex--) {
            for (let asteroidIndex = this.asteroids.length - 1; asteroidIndex >= 0; asteroidIndex--) {
                const bullet = this.bullets[bulletIndex];
                const asteroid = this.asteroids[asteroidIndex];
                const distance = Math.sqrt(
                    Math.pow(bullet.x - asteroid.x, 2) +
                    Math.pow(bullet.y - asteroid.y, 2)
                );
                if (distance < asteroid.size + 5) {
                    this.createExplosion(asteroid.x, asteroid.y, asteroid.size);
                    this.bullets.splice(bulletIndex, 1);
                    this.asteroids.splice(asteroidIndex, 1);
                    // Trigger score update for asteroid (10 points)
                    if (typeof window !== 'undefined') {
                        const windowWithScore = window as Window & { onScoreUpdate?: (points: number) => void };
                        if (windowWithScore.onScoreUpdate) {
                            windowWithScore.onScoreUpdate(10);
                        }
                    }
                    break; // Exit inner loop since bullet is destroyed
                }
            }
        }

        // Check bullet-alien collisions
        for (let bulletIndex = this.bullets.length - 1; bulletIndex >= 0; bulletIndex--) {
            for (let alienIndex = this.aliens.length - 1; alienIndex >= 0; alienIndex--) {
                const bullet = this.bullets[bulletIndex];
                const alien = this.aliens[alienIndex];
                const distance = Math.sqrt(
                    Math.pow(bullet.x - alien.x, 2) +
                    Math.pow(bullet.y - alien.y, 2)
                );
                if (distance < alien.size + 5) {
                    this.createExplosion(alien.x, alien.y, alien.size);
                    this.bullets.splice(bulletIndex, 1);
                    this.aliens.splice(alienIndex, 1);
                    // Trigger score update for alien (20 points)
                    if (typeof window !== 'undefined') {
                        const windowWithScore = window as Window & { onScoreUpdate?: (points: number) => void };
                        if (windowWithScore.onScoreUpdate) {
                            windowWithScore.onScoreUpdate(20);
                        }
                    }
                    break; // Exit inner loop since bullet is destroyed
                }
            }
        }
    }

    private updateExplosions() {
        this.explosions.forEach((explosion, index) => {
            explosion.life++;
            explosion.size += 2;
            explosion.opacity = Math.max(0, 1 - (explosion.life / explosion.maxLife));

            if (explosion.life > explosion.maxLife) {
                this.explosions.splice(index, 1);
            }
        });
    }

    private getSpaceshipCenterY(): number {
        const gameState = this.getState().game;
        return gameState.playMode ? this.config.canvasHeight / 2 : this.config.canvasHeight / 2 + this.config.spaceshipOffsetY;
    }

    clearGameObjects() {
        this.asteroids.length = 0;
        this.aliens.length = 0;
        this.bullets.length = 0;
        this.explosions.length = 0;
    }

    // Getters for renderer
    getParticles(): Particle[] { return this.particles; }
    getAsteroids(): Asteroid[] { return this.asteroids; }
    getAliens(): Alien[] { return this.aliens; }
    getBullets(): Bullet[] { return this.bullets; }
    getExplosions(): Explosion[] { return this.explosions; }
    getWaves(): Wave[] { return this.waves; }
    getGameState(): GameState { return this.getState().game; }
    getConfig(): GameConfig { return this.config; }
}
