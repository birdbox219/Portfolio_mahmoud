import { createContext, useContext, useReducer, useEffect } from 'react';

const GameStateContext = createContext();

export const useGameState = () => useContext(GameStateContext);

// ── State phases ──
export const PHASES = {
  DORMANT: 'DORMANT',
  GLITCH_TRIGGERED: 'GLITCH_TRIGGERED',
  TERMINAL_OPEN: 'TERMINAL_OPEN',
  VERIFYING: 'VERIFYING',
  ELEVATED: 'ELEVATED',
  GAME_ACTIVE: 'GAME_ACTIVE',
  GAME_WON: 'GAME_WON',
  GAME_FAILED: 'GAME_FAILED',
  TERMINAL_ELEVATED: 'TERMINAL_ELEVATED',
};

function getInitialState() {
  const hasWon = localStorage.getItem('signal_purge_complete') === 'true';
  const sessionElevated = sessionStorage.getItem('sp_elevated') === 'true';
  return {
    phase: PHASES.DORMANT,
    terminalOpen: false,
    hasElevated: sessionElevated || hasWon,
    hasWon,
    glitchActive: false,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'TRIGGER_GLITCH':
      return { ...state, glitchActive: true };
    case 'CLEAR_GLITCH':
      return { ...state, glitchActive: false };
    case 'TOGGLE_TERMINAL':
      return {
        ...state,
        terminalOpen: !state.terminalOpen,
        phase: !state.terminalOpen
          ? (state.hasElevated ? PHASES.TERMINAL_ELEVATED : PHASES.TERMINAL_OPEN)
          : PHASES.DORMANT,
      };
    case 'OPEN_TERMINAL':
      return {
        ...state,
        terminalOpen: true,
        phase: state.hasElevated ? PHASES.TERMINAL_ELEVATED : PHASES.TERMINAL_OPEN,
      };
    case 'CLOSE_TERMINAL':
      return { ...state, terminalOpen: false, phase: PHASES.DORMANT };
    case 'START_VERIFICATION':
      return { ...state, phase: PHASES.VERIFYING };
    case 'VERIFICATION_COMPLETE':
      sessionStorage.setItem('sp_elevated', 'true');
      return { ...state, phase: PHASES.ELEVATED, hasElevated: true };
    case 'START_GAME':
      return { ...state, phase: PHASES.GAME_ACTIVE };
    case 'GAME_WON':
      localStorage.setItem('signal_purge_complete', 'true');
      return { ...state, phase: PHASES.GAME_WON, hasWon: true };
    case 'GAME_FAILED':
      return { ...state, phase: PHASES.GAME_FAILED };
    case 'RETURN_TO_TERMINAL':
      return { ...state, phase: PHASES.TERMINAL_ELEVATED };
    default:
      return state;
  }
}

export function GameStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, getInitialState);

  // ── Global "sudo" sequence detector ──
  useEffect(() => {
    let buffer = '';
    let timeout;

    const handler = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      clearTimeout(timeout);
      buffer += e.key.toLowerCase();
      if (buffer.length > 10) buffer = buffer.slice(-10);

      if (buffer.includes('sudo')) {
        buffer = '';
        dispatch({ type: 'TRIGGER_GLITCH' });
        setTimeout(() => dispatch({ type: 'CLEAR_GLITCH' }), 600);
      }

      timeout = setTimeout(() => { buffer = ''; }, 2000);
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      clearTimeout(timeout);
    };
  }, []);

  // ── Ctrl+` terminal toggle + Escape to close ──
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_TERMINAL' });
        return;
      }
      // Escape closes terminal — but NOT during active game
      if (e.key === 'Escape' && state.terminalOpen && state.phase !== PHASES.GAME_ACTIVE) {
        dispatch({ type: 'CLOSE_TERMINAL' });
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state.terminalOpen, state.phase]);

  const value = { state, dispatch };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}
