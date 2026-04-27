import { useState, useRef, useEffect, useCallback } from 'react';
import { useGameState, PHASES } from '../context/GameStateContext';
import { PORTFOLIO_DATA } from '../data';
import * as gameAudio from '../utils/gameAudio';
import SignalPurge from './SignalPurge';
import './HiddenTerminal.css';

// ── Boot sequence lines with staggered typewriter ──
const BOOT_LINES = [
  { text: '0xA0: ESTABLISHING SECURE PIPE...', delay: 0 },
  { text: '0xA1: MOUNTING /dev/portfolio...', delay: 400 },
  { text: '0xA2: VERIFYING KERNEL INTEGRITY... OK', delay: 900 },
  { text: '0xA3: LOADING OPERATOR PROFILE...', delay: 1500 },
  { text: '0xA4: SESSION READY.', delay: 2000 },
];

function getWelcomeLines(hasWon, hasElevated) {
  if (hasWon) {
    return [
      { text: PORTFOLIO_DATA.hiddenContent.elevatedGreeting, type: 'primary' },
      { text: 'ACCESS_LEVEL: ELEVATED', type: 'system' },
      { text: "Type 'help' to explore declassified nodes.", type: 'system' },
    ];
  }
  if (hasElevated) {
    return [
      { text: 'TERMINAL_SESSION RESTORED.', type: 'system' },
      { text: 'ACCESS_LEVEL: ELEVATED', type: 'system' },
      { text: "Type 'sudo access_game' to re-enter the ritual.", type: 'system' },
    ];
  }
  return [
    { text: "Type 'help' for available commands.", type: 'system' },
  ];
}

export default function HiddenTerminal() {
  const { state, dispatch } = useGameState();
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState([]);
  const [verifyStep, setVerifyStep] = useState(0);
  const [booted, setBooted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const logContainerRef = useRef(null);
  const inputRef = useRef(null);
  const bootedSessionRef = useRef(false); // track across renders

  // ── Boot sequence on first open ──
  useEffect(() => {
    if (!state.terminalOpen) return;
    if (bootedSessionRef.current) {
      // Already booted this session — just refocus
      setBooted(true);
      return;
    }
    bootedSessionRef.current = true;
    setBooted(false);
    setLogs([]);

    // Stagger boot lines
    BOOT_LINES.forEach((line) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { text: line.text, type: 'system' }]);
      }, line.delay);
    });

    // After boot, add welcome lines
    const bootEndDelay = BOOT_LINES[BOOT_LINES.length - 1].delay + 600;
    setTimeout(() => {
      const welcome = getWelcomeLines(state.hasWon, state.hasElevated);
      setLogs(prev => [
        ...prev,
        { text: '─────────────────────────────────', type: 'system' },
        ...welcome,
      ]);
      setBooted(true);
    }, bootEndDelay);
  }, [state.terminalOpen, state.hasWon, state.hasElevated]);

  // ── Auto-focus input ──
  useEffect(() => {
    if (state.terminalOpen && booted && inputRef.current && state.phase !== PHASES.GAME_ACTIVE) {
      inputRef.current.focus();
    }
  }, [state.terminalOpen, booted, state.phase]);

  // ── Auto-scroll logs ──
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text, type = 'primary') => {
    setLogs(prev => [...prev, { text, type }]);
  };

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    addLog(`> ${cmd}`, 'user');

    if (state.phase === PHASES.VERIFYING) {
      handleVerification(command);
      return;
    }

    switch (command) {
      case 'help':
        addLog('');
        addLog('AVAILABLE COMMANDS:', 'primary');
        addLog('  help              Show this menu');
        addLog('  ls                List directory nodes');
        addLog('  whoami            Display session identity');
        addLog('  clear             Clear terminal output');
        addLog('  sudo access_game  [ENCRYPTED] Initiate system purification');
        if (state.hasWon) {
          addLog('  resume_classified [DECLASSIFIED] View personnel file', 'primary');
          addLog('  dev_notes         [DECLASSIFIED] View designer archive', 'primary');
        }
        addLog('');
        break;

      case 'ls':
        addLog('');
        addLog('DIRECTORY: /home/operator/portfolio');
        addLog('  drwx  projects/');
        addLog('  drwx  skills/');
        addLog('  -rw-  about.sys');
        if (state.hasWon) {
          addLog(`  -r--  ${PORTFOLIO_DATA.hiddenContent.hiddenProject.id}.bin  [DECLASSIFIED]`, 'primary');
        }
        addLog('');
        break;

      case 'whoami':
        addLog('');
        addLog(`OPERATOR: ${PORTFOLIO_DATA.operator.name}`);
        addLog(`STATUS:   ${state.hasElevated ? 'ELEVATED' : 'STANDARD_ACCESS'}`);
        addLog(`SESSION:  ${new Date().toISOString().split('T')[0]}`);
        addLog('');
        break;

      case 'clear':
        setLogs([]);
        break;

      case 'sudo access_game':
        if (state.hasWon) {
          addLog('SYSTEM ALREADY PURGED. RE-INITIALIZING RITUAL...', 'system');
          setTimeout(() => startGameTransition(), 1000);
        } else if (state.hasElevated) {
          addLog('VERIFICATION CACHED. LOADING PURGE SEQUENCE...', 'system');
          setTimeout(() => startGameTransition(), 800);
        } else {
          dispatch({ type: 'START_VERIFICATION' });
          setVerifyStep(0);
          addLog('');
          addLog('WARNING: ELEVATED ACCESS REQUIRED.', 'error');
          addLog('INITIATING PERSONALITY_RESONANCE_SCAN...', 'system');
          addLog('');
          setTimeout(() => {
            addLog(`QUERY_01: ${PORTFOLIO_DATA.verificationQuestions[0].prompt}`, 'primary');
          }, 800);
        }
        break;

      case 'resume_classified':
        if (state.hasWon) {
          addLog('');
          addLog(`── ${PORTFOLIO_DATA.hiddenContent.classifiedResume.title} ──`, 'primary');
          PORTFOLIO_DATA.hiddenContent.classifiedResume.entries.forEach(e => addLog(`  ${e}`));
          addLog('');
        } else {
          addLog('ERROR: ACCESS_DENIED. Insufficient clearance.', 'error');
        }
        break;

      case 'dev_notes':
        if (state.hasWon) {
          addLog('');
          addLog(`── ${PORTFOLIO_DATA.hiddenContent.devNotes.title} ──`, 'primary');
          PORTFOLIO_DATA.hiddenContent.devNotes.entries.forEach(n => {
            addLog(`  [${n.title}]`, 'primary');
            addLog(`    ${n.content}`);
          });
          addLog('');
        } else {
          addLog('ERROR: ACCESS_DENIED. Insufficient clearance.', 'error');
        }
        break;

      case 'retry':
        if (state.hasElevated) {
          addLog('RE-INITIALIZING PURGE SEQUENCE...', 'system');
          setTimeout(() => startGameTransition(), 800);
        } else {
          addLog("ERROR: Run 'sudo access_game' first.", 'error');
        }
        break;

      default:
        if (command) {
          addLog(`command not found: ${command}`, 'error');
        }
    }
  };

  const handleVerification = (answer) => {
    const question = PORTFOLIO_DATA.verificationQuestions[verifyStep];
    const isResonant = question.resonantKeywords.some(k => answer.includes(k));

    const response = isResonant ? question.responses.resonant : question.responses.fallback;
    addLog(`  ${response}`, isResonant ? 'primary' : 'system');

    if (verifyStep < PORTFOLIO_DATA.verificationQuestions.length - 1) {
      const nextStep = verifyStep + 1;
      setVerifyStep(nextStep);
      setTimeout(() => {
        addLog('');
        addLog(`QUERY_0${nextStep + 1}: ${PORTFOLIO_DATA.verificationQuestions[nextStep].prompt}`, 'primary');
      }, 600);
    } else {
      addLog('');
      addLog('VERIFICATION_COMPLETE.', 'system');
      addLog('LOADING PURGE_SEQUENCE...', 'system');
      setTimeout(() => {
        dispatch({ type: 'VERIFICATION_COMPLETE' });
        gameAudio.playGlitchSound();
        setTimeout(() => startGameTransition(), 800);
      }, 1200);
    }
  };

  const startGameTransition = () => {
    setTransitioning(true);
    // Brief glitch-out animation, then start game
    setTimeout(() => {
      dispatch({ type: 'START_GAME' });
      setTransitioning(false);
    }, 800);
  };

  const handleWin = useCallback(() => {
    dispatch({ type: 'GAME_WON' });
    dispatch({ type: 'RETURN_TO_TERMINAL' });
    setLogs(prev => [...prev,
      { text: '', type: 'system' },
      { text: '═══════════════════════════════════', type: 'system' },
      { text: 'SIGNAL_PURGE: COMPLETE', type: 'primary' },
      { text: 'SYSTEM_INTEGRITY: 100%', type: 'system' },
      { text: 'ELEVATED_ACCESS: GRANTED', type: 'primary' },
      { text: "NEW NODES DECLASSIFIED. Type 'help' to explore.", type: 'system' },
      { text: '═══════════════════════════════════', type: 'system' },
    ]);
  }, [dispatch]);

  const handleFail = useCallback(() => {
    dispatch({ type: 'GAME_FAILED' });
    dispatch({ type: 'RETURN_TO_TERMINAL' });
    setLogs(prev => [...prev,
      { text: '', type: 'system' },
      { text: 'ERROR 0xFF01: SYSTEM_COMPROMISED', type: 'error' },
      { text: 'SIGNAL_PURGE: FAILED', type: 'error' },
      { text: "Type 'retry' to re-initialize.", type: 'system' },
    ]);
  }, [dispatch]);

  const handleKeyInput = (e) => {
    // Only play key sound for printable characters
    if (e.key.length === 1) {
      gameAudio.playTerminalKey();
    }
  };

  if (!state.terminalOpen) return null;

  const promptPath = state.hasElevated ? 'operator@portfolio:~/elevated' : 'operator@portfolio:~';
  const promptChar = state.hasElevated ? '#' : '$';
  const showInput = booted && state.phase !== PHASES.GAME_ACTIVE;

  return (
    <div className={`terminal-overlay ${state.terminalOpen ? 'open' : ''}`}>

      {/* Mobile Guard */}
      <div className="terminal-mobile-warning">
        <span className="material-symbols-outlined" style={{ fontSize: 48 }}>desktop_windows</span>
        <h2>TERMINAL_LOCKED</h2>
        <p>This interface requires elevated hardware protocols. Access via desktop terminal to proceed.</p>
        <button onClick={() => dispatch({ type: 'CLOSE_TERMINAL' })}>[ CLOSE ]</button>
      </div>

      {/* Header Bar */}
      <div className="terminal-header">
        <div className="terminal-title">
          <span className="material-symbols-outlined" style={{ fontSize: 14, opacity: 0.6 }}>terminal</span>
          TERMINAL_SESSION.exe
        </div>
        <div className="terminal-window-controls">
          <div className="terminal-window-dot"></div>
          <div className="terminal-window-dot"></div>
          <div
            className="terminal-window-dot close"
            onClick={() => dispatch({ type: 'CLOSE_TERMINAL' })}
            title="Close terminal"
          ></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className={`terminal-body ${transitioning ? 'terminal-glitch-out' : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="terminal-logs" ref={logContainerRef}>
          {logs.map((log, i) => (
            <div key={i} className={`log-entry ${log.type}`}>{log.text}</div>
          ))}
          {/* Idle cursor when no input active */}
          {!showInput && !transitioning && state.phase !== PHASES.GAME_ACTIVE && (
            <span className="terminal-cursor"></span>
          )}
        </div>

        {showInput && (
          <form
            onSubmit={(e) => { e.preventDefault(); handleCommand(inputValue); setInputValue(''); }}
            className="terminal-input-line"
          >
            <span className="prompt">{promptChar}</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyInput}
              autoFocus
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="off"
            />
            <span className="terminal-cursor"></span>
          </form>
        )}
      </div>

      {/* Status Bar */}
      <div className="terminal-status-bar">
        <span>{promptPath}</span>
        <span>
          {state.phase === PHASES.VERIFYING ? 'SCAN_ACTIVE' :
           state.phase === PHASES.GAME_ACTIVE ? 'PURGE_ACTIVE' :
           'IDLE'}
        </span>
      </div>

      {/* Game Canvas */}
      {state.phase === PHASES.GAME_ACTIVE && (
        <div className="game-canvas-container">
          <SignalPurge onWin={handleWin} onFail={handleFail} />
        </div>
      )}
    </div>
  );
}
