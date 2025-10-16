import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
    playMode: boolean;
    score: number;
    mouseX: number;
    mouseY: number;
    prevMouseX: number;
    prevMouseY: number;
    isMouseMoving: boolean;
    time: number;
    canvasWidth: number;
    canvasHeight: number;
    spaceshipAnimationProgress: number;
    spaceshipX: number;
    spaceshipY: number;
}

const initialState: GameState = {
    playMode: false,
    score: 0,
    mouseX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    mouseY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    prevMouseX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    prevMouseY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    isMouseMoving: false,
    time: 0,
    canvasWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    canvasHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    spaceshipAnimationProgress: 0,
    spaceshipX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    spaceshipY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        togglePlayMode: (state) => {
            state.playMode = !state.playMode;
            if (state.playMode) {
                state.score = 0; // Reset score when entering play mode
            }
        },
        updateScore: (state, action: PayloadAction<number>) => {
            state.score += action.payload;
        },
        updateMousePosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
            state.prevMouseX = state.mouseX;
            state.prevMouseY = state.mouseY;
            state.mouseX = action.payload.x;
            state.mouseY = action.payload.y;
            state.isMouseMoving = true;
        },
        updateTime: (state, action: PayloadAction<number>) => {
            state.time = action.payload;
        },
        updateCanvasSize: (state, action: PayloadAction<{ width: number; height: number }>) => {
            state.canvasWidth = action.payload.width;
            state.canvasHeight = action.payload.height;
        },
        setMouseMoving: (state, action: PayloadAction<boolean>) => {
            state.isMouseMoving = action.payload;
        },
        updateSpaceshipAnimation: (state, action: PayloadAction<number>) => {
            state.spaceshipAnimationProgress = action.payload;
        },
        updateSpaceshipPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
            state.spaceshipX = action.payload.x;
            state.spaceshipY = action.payload.y;
        },
    },
});

export const {
    togglePlayMode,
    updateScore,
    updateMousePosition,
    updateTime,
    updateCanvasSize,
    setMouseMoving,
    updateSpaceshipAnimation,
    updateSpaceshipPosition,
} = gameSlice.actions;

export default gameSlice.reducer;
