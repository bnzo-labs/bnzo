import { GameLogicRedux } from '../services/GameLogicRedux';
// Game types imported for future use
import { store, RootState } from '../store';

export class GameRenderer {
    private ctx: CanvasRenderingContext2D;
    private gameLogic: GameLogicRedux;

    constructor(canvas: HTMLCanvasElement, gameLogic: GameLogicRedux) {
        this.ctx = canvas.getContext('2d')!;
        this.gameLogic = gameLogic;
    }

    render() {
        this.clearCanvas();
        this.renderWaves();
        this.renderParticles();
        this.renderSpaceship();

        if ((store.getState() as RootState).game.playMode) {
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

            for (let x = 0; x <= this.gameLogic.getConfig().canvasWidth; x += 2) {
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

            // Add gradient fill
            const gradient = this.ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, wave.y + wave.amplitude);
            gradient.addColorStop(0, wave.color.replace('0.1', '0.05').replace('0.08', '0.04').replace('0.06', '0.03'));
            gradient.addColorStop(0.5, wave.color);
            gradient.addColorStop(1, wave.color.replace('0.1', '0.05').replace('0.08', '0.04').replace('0.06', '0.03'));

            this.ctx.fillStyle = gradient;
            this.ctx.lineTo(this.gameLogic.getConfig().canvasWidth, this.gameLogic.getConfig().canvasHeight);
            this.ctx.lineTo(0, this.gameLogic.getConfig().canvasHeight);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.restore();
        });

        // Add floating water bubbles
        for (let i = 0; i < 15; i++) {
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

            // Create gradient for asteroid
            const gradient = this.ctx.createRadialGradient(
                -asteroid.size * 0.3, -asteroid.size * 0.3, 0,
                0, 0, asteroid.size
            );
            gradient.addColorStop(0, '#9ca3af');
            gradient.addColorStop(0.5, '#6b7280');
            gradient.addColorStop(1, '#4b5563');

            // Draw irregular asteroid shape with better design
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            const points = 12;
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

            // Add asteroid highlights and details
            this.ctx.fillStyle = '#d1d5db';
            this.ctx.beginPath();
            this.ctx.arc(-asteroid.size * 0.25, -asteroid.size * 0.25, asteroid.size * 0.15, 0, Math.PI * 2);
            this.ctx.fill();

            // Add some crater details
            this.ctx.fillStyle = '#4b5563';
            this.ctx.beginPath();
            this.ctx.arc(asteroid.size * 0.2, asteroid.size * 0.1, asteroid.size * 0.08, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(-asteroid.size * 0.1, asteroid.size * 0.2, asteroid.size * 0.06, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    private renderAliens() {
        const aliens = this.gameLogic.getAliens();

        aliens.forEach(alien => {
            this.ctx.save();
            this.ctx.translate(alien.x, alien.y);
            this.ctx.globalAlpha = alien.opacity;

            // Alien body
            this.ctx.fillStyle = '#ef4444';
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, alien.size, alien.size * 0.8, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Alien eyes
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(-alien.size * 0.3, -alien.size * 0.2, alien.size * 0.15, 0, Math.PI * 2);
            this.ctx.arc(alien.size * 0.3, -alien.size * 0.2, alien.size * 0.15, 0, Math.PI * 2);
            this.ctx.fill();

            // Alien pupils
            this.ctx.fillStyle = '#000000';
            this.ctx.beginPath();
            this.ctx.arc(-alien.size * 0.3, -alien.size * 0.2, alien.size * 0.08, 0, Math.PI * 2);
            this.ctx.arc(alien.size * 0.3, -alien.size * 0.2, alien.size * 0.08, 0, Math.PI * 2);
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
