import resumePdf from './assets/Mahmoud_Elsayed_Unity_Resume.pdf';
import profileImg from './assets/portfolio_image.jpg';

export const PORTFOLIO_DATA = {
  // Global Operator Data
  operator: {
    name: "OPERATOR_042",
    status: "STATUS: OPERATIONAL",
    id: "ID_OP_042",
    resumeUrl: resumePdf,
  },

  // Home Page Data
  home: {
    title: "M_a_h_m_o_u_d// DEV",
    subtitle: "GAME DEVELOPER",
    bio: "Building gameplay systems where mechanics and meaning evolve together.",
  },

  // Personnel Profile (About)
  about: {
    image: profileImg,
    dataEntry01: {
      label: "UNIT_DESIGNATION",
      value: "GAME DEVELOPER"
    },
    dataEntry02: {
      label: "OPERATIONAL_FOCUS",
      value: "GAMEPLAY SYSTEMS & MULTIPLAYER"
    },
    biography: [
      "Unity Game Developer focused on building responsive gameplay systems, multiplayer interactions, and scalable mechanics using C#. Experience includes Unity Netcode, event-driven architecture, and performance-oriented design.",
      "Developed multiple projects ranging from psychological puzzle games to multiplayer systems and experimental gameplay prototypes. Work emphasizes how mechanics shape player perception, not just interaction."
    ],
    lastUpdated: "CYCLE_2026.4"
  },

  // System Status (Skills)
  skills: {
    efficiency: 88, // Overall performance %
    list: [
      { name: "Unity", pct: 95 },
      { name: "C#", pct: 90 },
      { name: "Game Systems", pct: 85 },
      { name: "UI/UX", pct: 80 },
      { name: "Shaders", pct: 70 },
    ]
  },

  // Data Archive (Projects)
  projects: [
    {
      id: "001",
      title: "WHAT_CAN_GO_PONG?",
      category: "Arcade",
      status: "ACTIVE", // ACTIVE or ARCHIVED
      image: "https://img.itch.zone/aW1nLzI1NzY3ODA4LnBuZw==/315x250%23c/TtD6I1.png",
      detail: {
        cycle: "2026.2",
        classType: "SYSTEM_DECONSTRUCTION",
        overview: "A narrative meta-arcade experiment where a simple Pong prototype is continuously modified until it collapses under its own complexity.",
        objective: "Explore how iterative 'good ideas' can destroy core gameplay clarity when no system is ever removed.",
        operatorRole: "Event Systems Engineer / UI / UX /",
        techStack: ["Unity Engine", "C#", "Event-Driven Architecture"],
        detailImage: "https://img.itch.zone/aW1nLzI1NTY2MDg2LnBuZw==/original/6E3sE%2B.png",
        anomalyReport: "Feature creep caused exponential system interactions, breaking original gameplay identity.",
        resolution: "Complete system collapse.",
        // Game execution fields
        embedUrl: "https://itch.io/embed-upload/17298481?color=143A5E",
        itchUrl: "https://birdbox774.itch.io/defintel",
        controls: [
          { key: "WASD", action: "STEER" },
          { key: "SPACE", action: "BRAKE" },
          { key: "SHIFT", action: "BOOST" },
          { key: "R", action: "RESET" }
        ],
        gamepadSupported: true,
        systemRequirements: "DESKTOP_ONLY",
        estimatedLoadTime: "30-60s"
      }
    },
    {
      id: "002",
      title: "LOGIC_RIFTT",
      category: "Puzzle",
      status: "ARCHIVED",
      image: "https://img.itch.zone/aW1nLzI1MzU1ODU2LnBuZw==/315x250%23c/xiABBz.png",
      detail: {
        cycle: "2026.2",
        classType: "PERCEPTION_ENGINE",
        overview: "A psychological puzzle game where rules remain constant — but perception distorts how they are understood.",
        objective: "Design puzzles that challenge interpretation rather than execution speed.",
        operatorRole: "Systems Designer",
        techStack: ["Unity", "C#"],
        detailImage: "https://i.postimg.cc/76h5mPhy/logic-Rift.png",
        anomalyReport: "Players relied on brute-force logic instead of perception shifts.",
        resolution: "Introduced deceptive feedback loops and misleading visual cues.",
        // Game execution fields
        embedUrl: "https://itch.io/embed-upload/17299350?color=333333",  // Replace with your actual itch.io embed URL
        itchUrl: "https://birdbox774.itch.io/logic-rift",
        controls: [
          { key: "WASD", action: "MOVE" },
          { key: "E", action: "INTERACT" },
          { key: "SPACE", action: "JUMP" }
        ],
        gamepadSupported: true,
        systemRequirements: "DESKTOP_ONLY",
        estimatedLoadTime: "30-60s"
      }
    },
    {
      id: "003",
      title: "UNDERT_THE_TREE",
      category: "Platformer",
      status: "ACTIVE",
      image: "https://img.itch.zone/aW1nLzI0NjQ4NDA4LnBuZw==/315x250%23c/iVfoUq.png",
      detail: {
        cycle: "2025.12",
        classType: "DUAL_STATE_SYSTEM",
        overview: "A vertical survival platformer where two characters share one body, forcing constant mid-air decision making.",
        objective: "Create mechanical tension through character switching and asymmetric abilities.",
        operatorRole: "Solo Developer",
        techStack: ["Unity", "C#", "Cinemachine", "Shader Graph"],
        detailImage: "https://i.postimg.cc/CLBjw7F1/Screenshot-2026-04-26-140837.png",
        anomalyReport: "Switch mechanic felt optional during early testing.",
        resolution: "Designed levels that require mid-air switching for survival.",
        // Game execution fields — NO WEB BUILD for this project
        embedUrl: "https://itch.io/embed-upload/17308014?color=333333",
        itchUrl: "https://birdbox774.itch.io/underthetreeprototype",
        controls: [
          { key: "WASD", action: "MOVE" },
          { key: "SPACE", action: "JUMP" },
          { key: "E", action: "SWITCH CHARACTER" }
        ],
        gamepadSupported: true,
        systemRequirements: "DESKTOP_ONLY",
        estimatedLoadTime: "60-120s"
      }
    },
    {
      id: "004",
      title: "BIC_BRICK_BREAD_2",
      category: "Multiplayer Board Game",
      status: "ACTIVE",
      image: "https://img.itch.zone/aW1nLzI1NzY3ODc0LnBuZw==/315x250%23c/D6kT3S.png",
      detail: {
        cycle: "2026.2",
        classType: "MULTIPLAYER_BOARD_Engine",
        overview: "A multiplayer board game platform focused on creating and experimenting with dynamic rule systems.",
        objective: "Allow players to design and play custom board game modes with flexible mechanics.",
        operatorRole: "Multiplayer Systems Developer",
        techStack: ["Unity", "C#", "Unity Netcode"],
        detailImage: "https://i.postimg.cc/85vS1xnp/Screenshot-2026-02-23-171506.png",
        anomalyReport: "Static rule sets reduced replayability.",
        resolution: "Developed modular rule system supporting dynamic game modes.",
        // Game execution fields
        embedUrl: "https://itch.io/embed-upload/17308524?color=E9D8A6",  // Replace with your actual itch.io embed URL
        itchUrl: "https://birdbox774.itch.io/bic-brick-bread-2",
        controls: [
          { key: "MOUSE", action: "NAVIGATE" },
          { key: "ESCAPE", action: "EXIT" },
        ],
        gamepadSupported: false,
        systemRequirements: "DESKTOP_ONLY",
        estimatedLoadTime: "45-90s"
      }
    }
  ],

  // Project Log (Career Timeline)
  projectLog: [
    {
      id: "LOG_01",
      date: "CYCLE_2026.1 - PRESENT",
      role: "SENIOR GAME DEVELOPER",
      company: "YORHA SYSTEMS",
      historyText: "Leading the development of experimental gameplay mechanics and multiplayer synchronization systems. Focused on optimizing network performance and player interaction fidelity.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      id: "LOG_02",
      date: "CYCLE_2025.4 - 2025.12",
      role: "SYSTEMS ENGINEER",
      company: "BUNKER_TECH",
      historyText: "Architected core systems for state-driven puzzles and procedural environment generation. Improved asset loading efficiency by 40% using custom serialization methods.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      id: "LOG_03",
      date: "CYCLE_2024.2 - 2025.3",
      role: "JUNIOR DEVELOPER",
      company: "RESISTANCE_CAMP",
      historyText: "Implemented UI/UX components and localized gameplay systems. Collaborated with designers to translate complex mechanics into intuitive player feedback loops.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=400"
    }
  ],

  // Terminal Session (Contact)
  contact: {
    links: [
      { name: "EMAIL", url: "mailto:mahmodelsayed882@gmail.com", icon: "mail" },
      { name: "GITHUB", url: "https://github.com/birdbox219", icon: "code" },
      { name: "LINKEDIN", url: "https://www.linkedin.com/in/mahmoud-e-292b52322/", icon: "work" },
      { name: "ITCH.IO", url: "https://birdbox774.itch.io/", icon: "gamepad" },
      { name: "YOUTUBE", url: "https://www.youtube.com/@mahmodelsayed6199", icon: "smart_display" }
    ]
  }
};
