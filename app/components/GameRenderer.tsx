import { GameLogicRedux } from '../services/GameLogicRedux';
// Game types imported for future use
import { store, RootState } from '../store';

export class GameRenderer {
    private ctx: CanvasRenderingContext2D;
    private gameLogic: GameLogicRedux;
    private alienCache: Map<number, HTMLCanvasElement> = new Map();
    private lastAlienCacheTime: number = 0;

    constructor(canvas: HTMLCanvasElement, gameLogic: GameLogicRedux) {
        this.ctx = canvas.getContext('2d')!;
        this.gameLogic = gameLogic;
    }

    render() {
        this.clearCanvas();
        this.renderWaves();

        if ((store.getState() as RootState).game.playMode) {
            this.renderParticles();
            this.renderSpaceship();
            this.renderAsteroids();
            this.renderAliens();
            this.renderBullets();
            this.renderExplosions();
        }
    }

    private clearCanvas() {
        const config = this.gameLogic.getConfig();
        this.ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
    }

    private renderWaves() {
        const waves = this.gameLogic.getWaves();
        const gameState = (store.getState() as RootState).game;

        waves.forEach((wave) => {
            this.ctx.save();
            this.ctx.globalAlpha = wave.opacity;
            this.ctx.strokeStyle = wave.color;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();

            // Optimized: Increased step from 2 to 5 for fewer points
            for (let x = 0; x <= this.gameLogic.getConfig().canvasWidth; x += 5) {
                const y = wave.y +
                    Math.sin(x * wave.frequency + gameState.time * wave.speed + wave.phase) * wave.amplitude +
                    Math.sin(x * wave.frequency * 2 + gameState.time * wave.speed * 1.5) * wave.amplitude * 0.3;

                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }

            this.ctx.stroke();

            // Simplified fill - no gradient, just solid color
            this.ctx.fillStyle = wave.color;
            this.ctx.lineTo(this.gameLogic.getConfig().canvasWidth, this.gameLogic.getConfig().canvasHeight);
            this.ctx.lineTo(0, this.gameLogic.getConfig().canvasHeight);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.restore();
        });

        // Add floating water bubbles (optimized: reduced from 15 to 8)
        for (let i = 0; i < 8; i++) {
            const x = (gameState.time * 10 + i * 120) % (this.gameLogic.getConfig().canvasWidth + 30) - 15;
            const y = this.gameLogic.getConfig().canvasHeight / 2 + Math.sin(gameState.time * 1.2 + i) * 60 + Math.sin(gameState.time * 0.4 + i * 0.3) * 30;

            this.ctx.save();
            this.ctx.globalAlpha = 0.2 + Math.sin(gameState.time * 2 + i) * 0.1;
            this.ctx.fillStyle = 'rgba(147, 197, 253, 0.4)';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2 + Math.sin(gameState.time * 1.5 + i) * 1, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }

    private renderParticles() {
        const particles = this.gameLogic.getParticles();

        particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    private renderSpaceship() {
        const config = this.gameLogic.getConfig();
        const gameState = (store.getState() as RootState).game;
        const centerX = config.canvasWidth / 2;
        const centerY = this.gameLogic.getSpaceshipCenterY();
        const spaceshipSize = config.spaceshipSize;

        // Calculate spaceship rotation based on mouse position
        const angle = Math.atan2(gameState.mouseY - centerY, gameState.mouseX - centerX);

        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(angle);

        // Spaceship body
        this.ctx.fillStyle = '#3b82f6';
        this.ctx.beginPath();
        this.ctx.moveTo(spaceshipSize, 0);
        this.ctx.lineTo(-spaceshipSize * 0.8, -spaceshipSize * 0.4);
        this.ctx.lineTo(-spaceshipSize * 0.3, 0);
        this.ctx.lineTo(-spaceshipSize * 0.8, spaceshipSize * 0.4);
        this.ctx.closePath();
        this.ctx.fill();

        // Spaceship details
        this.ctx.fillStyle = '#1e40af';
        this.ctx.beginPath();
        this.ctx.moveTo(spaceshipSize * 0.7, 0);
        this.ctx.lineTo(-spaceshipSize * 0.2, -spaceshipSize * 0.2);
        this.ctx.lineTo(-spaceshipSize * 0.1, 0);
        this.ctx.lineTo(-spaceshipSize * 0.2, spaceshipSize * 0.2);
        this.ctx.closePath();
        this.ctx.fill();

        // Engine glow
        this.ctx.fillStyle = '#06b6d4';
        this.ctx.beginPath();
        this.ctx.ellipse(-spaceshipSize * 0.4, 0, spaceshipSize * 0.3, spaceshipSize * 0.1, 0, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    private renderAsteroids() {
        const asteroids = this.gameLogic.getAsteroids();

        asteroids.forEach((asteroid) => {
            this.ctx.save();
            this.ctx.translate(asteroid.x, asteroid.y);
            this.ctx.rotate(asteroid.rotation);
            this.ctx.globalAlpha = asteroid.opacity;

            // Optimized: Use solid color instead of gradient
            this.ctx.fillStyle = '#6b7280';
            this.ctx.beginPath();
            const points = 10; // Reduced from 12
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const radius = asteroid.size * (0.6 + Math.sin(angle * 3) * 0.2);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.fill();

            // Simplified highlight (one detail instead of three)
            this.ctx.fillStyle = '#9ca3af';
            this.ctx.beginPath();
            this.ctx.arc(-asteroid.size * 0.2, -asteroid.size * 0.2, asteroid.size * 0.2, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    private getAlienBaseCanvas(size: number): HTMLCanvasElement {
        const cacheKey = Math.round(size);

        if (!this.alienCache.has(cacheKey)) {
            const canvas = document.createElement('canvas');
            const padding = size * 0.5;
            canvas.width = (size * 2.5 + padding * 2);
            canvas.height = (size * 2 + padding * 2);
            const ctx = canvas.getContext('2d')!;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.translate(centerX, centerY);

            // Bottom UFO disc with gradient
            const discGradient = ctx.createRadialGradient(0, size * 0.1, 0, 0, size * 0.1, size * 1.2);
            discGradient.addColorStop(0, '#dc2626');
            discGradient.addColorStop(0.6, '#991b1b');
            discGradient.addColorStop(1, '#7f1d1d');

            ctx.fillStyle = discGradient;
            ctx.beginPath();
            ctx.ellipse(0, size * 0.1, size * 1.2, size * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();

            // Dark underside shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.ellipse(0, size * 0.2, size * 0.9, size * 0.3, 0, 0, Math.PI * 2);
            ctx.fill();

            // Middle disc section with metallic look
            const middleGradient = ctx.createLinearGradient(-size, 0, size, 0);
            middleGradient.addColorStop(0, '#b91c1c');
            middleGradient.addColorStop(0.5, '#ef4444');
            middleGradient.addColorStop(1, '#b91c1c');

            ctx.fillStyle = middleGradient;
            ctx.beginPath();
            ctx.ellipse(0, 0, size, size * 0.35, 0, 0, Math.PI * 2);
            ctx.fill();

            // Top dome with glass effect
            const domeGradient = ctx.createRadialGradient(
                -size * 0.2, -size * 0.3, 0,
                0, -size * 0.2, size * 0.6
            );
            domeGradient.addColorStop(0, 'rgba(147, 197, 253, 0.8)');
            domeGradient.addColorStop(0.5, 'rgba(96, 165, 250, 0.6)');
            domeGradient.addColorStop(1, 'rgba(59, 130, 246, 0.4)');

            ctx.fillStyle = domeGradient;
            ctx.beginPath();
            ctx.ellipse(0, -size * 0.2, size * 0.6, size * 0.5, 0, 0, Math.PI, true);
            ctx.fill();

            // Dome highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.ellipse(-size * 0.15, -size * 0.35, size * 0.25, size * 0.15, -0.3, 0, Math.PI * 2);
            ctx.fill();

            // Antenna
            ctx.strokeStyle = '#9ca3af';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, -size * 0.6);
            ctx.lineTo(0, -size * 0.85);
            ctx.stroke();

            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(0, -size * 0.9, size * 0.1, 0, Math.PI * 2);
            ctx.fill();

            this.alienCache.set(cacheKey, canvas);
        }

        return this.alienCache.get(cacheKey)!;
    }

    private renderAliens() {
        const aliens = this.gameLogic.getAliens();
        const gameState = (store.getState() as RootState).game;

        // Update cache only every 100ms if needed
        const now = Date.now();
        if (now - this.lastAlienCacheTime > 100 && this.alienCache.size > 10) {
            this.alienCache.clear();
            this.lastAlienCacheTime = now;
        }

        aliens.forEach(alien => {
            this.ctx.save();
            this.ctx.translate(alien.x, alien.y);
            this.ctx.globalAlpha = alien.opacity;

            // Draw cached base UFO
            const baseCanvas = this.getAlienBaseCanvas(alien.size);
            this.ctx.drawImage(baseCanvas, -baseCanvas.width / 2, -baseCanvas.height / 2);

            // Only animate lights (simplified - fewer lights, simpler rendering)
            const numLights = 6; // Reduced from 8
            const time = gameState.time;
            for (let i = 0; i < numLights; i++) {
                const angle = (i / numLights) * Math.PI * 2 + time * 2;
                const lightX = Math.cos(angle) * alien.size * 0.85;
                const lightY = Math.sin(angle) * alien.size * 0.3 + alien.size * 0.05;

                const pulseIntensity = 0.6 + Math.sin(time * 3 + i) * 0.4;

                // Simplified glow - single circle
                this.ctx.fillStyle = `rgba(251, 191, 36, ${0.6 * pulseIntensity})`;
                this.ctx.beginPath();
                this.ctx.arc(lightX, lightY, alien.size * 0.12, 0, Math.PI * 2);
                this.ctx.fill();
            }

            // Simplified antenna glow
            const antennaPulse = 0.7 + Math.sin(time * 4) * 0.3;
            this.ctx.fillStyle = `rgba(239, 68, 68, ${antennaPulse * 0.5})`;
            this.ctx.beginPath();
            this.ctx.arc(0, -alien.size * 0.9, alien.size * 0.15, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    private renderBullets() {
        const bullets = this.gameLogic.getBullets();

        bullets.forEach(bullet => {
            this.ctx.save();
            this.ctx.fillStyle = '#fbbf24';
            this.ctx.beginPath();
            this.ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    private renderExplosions() {
        const explosions = this.gameLogic.getExplosions();

        explosions.forEach(explosion => {
            this.ctx.save();
            this.ctx.globalAlpha = explosion.opacity;

            // Outer explosion ring
            this.ctx.strokeStyle = '#fbbf24';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(explosion.x, explosion.y, explosion.size, 0, Math.PI * 2);
            this.ctx.stroke();

            // Inner explosion fill
            this.ctx.fillStyle = '#ef4444';
            this.ctx.beginPath();
            this.ctx.arc(explosion.x, explosion.y, explosion.size * 0.7, 0, Math.PI * 2);
            this.ctx.fill();

            // Center bright spot
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(explosion.x, explosion.y, explosion.size * 0.3, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }
}
