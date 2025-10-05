'use client'

import { useEffect, useRef } from 'react'
import { GameManager } from '../services/GameManager'
import { GameCallbacks } from '../types/game'

interface InteractiveBackgroundProps {
    onScoreUpdate?: (points: number) => void;
    onPlayModeToggle?: () => void;
}

export function InteractiveBackground({ onScoreUpdate, onPlayModeToggle }: InteractiveBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const gameManagerRef = useRef<GameManager | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const callbacks: GameCallbacks = {
            onScoreUpdate: (points: number) => {
                onScoreUpdate?.(points);
            },
            onPlayModeToggle: () => {
                onPlayModeToggle?.();
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        // Initialize canvas first
        resizeCanvas()

        // Initialize game manager after canvas is sized
        gameManagerRef.current = new GameManager(canvas, callbacks);

        // Start the game after a short delay to ensure Redux is ready
        setTimeout(() => {
            gameManagerRef.current?.start();
        }, 100);

        const handleMouseMove = (e: MouseEvent) => {
            gameManagerRef.current?.updateMousePosition(e.clientX, e.clientY)
        }

        const handleClick = (e: MouseEvent) => {
            gameManagerRef.current?.shootBullet(e.clientX, e.clientY)
        }

        const handleResize = () => {
            resizeCanvas()
            gameManagerRef.current?.resizeCanvas(canvas.width, canvas.height)
        }

        // Event listeners
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', handleResize)
        window.addEventListener('click', handleClick)

            // Expose playMode toggle function globally
            ; (window as Window & { togglePlayMode?: () => void }).togglePlayMode = () => {
                gameManagerRef.current?.togglePlayMode()
            }

            // Expose score update function globally
            ; (window as Window & { updateScore?: (points: number) => void }).updateScore = (points: number) => {
                onScoreUpdate?.(points)
            }

        return () => {
            gameManagerRef.current?.stop()
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('click', handleClick)
            delete (window as Window & { togglePlayMode?: () => void }).togglePlayMode
            delete (window as Window & { updateScore?: (points: number) => void }).updateScore
        }
    }, [onScoreUpdate, onPlayModeToggle])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-0"
            style={{ background: 'transparent' }}
        />
    )
}
