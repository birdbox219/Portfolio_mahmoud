export const PORTFOLIO_DATA = {
  // Global Operator Data
  operator: {
    name: "OPERATOR_042",
    status: "STATUS: OPERATIONAL",
    id: "ID_OP_042",
    resumeUrl: "/resume.pdf", // PLACEHOLDER: Add your resume.pdf to the public folder
  },

  // Home Page Data
  home: {
    title: "M_a_h_m_o_u_d// DEV",
    subtitle: "GAME DEVELOPER",
    bio: "Crafting digital experiences through technical precision and artistic intent.",
  },

  // Personnel Profile (About)
  about: {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb3oqYrohHM1mhQTCUxCWvuwnIDFePgVmH-BdQXdGxNpebOhe1uSBGY1MkFt3Scae-DisUP9axtWfOKsjyo7Fiy1yCMQyHSudaPTWCsld9mnVoNFKtyF-Jg_10jsIbLwNNg69AoBUXKYLG6_JUOOsiFiit6BL2R8qISB01FexaFUDpVrGrqAyHeKpXakWR3t5PvG-Bonp8l_X7PDQM6p1AzgHCKZxUFUtEiszSXIriSvMBAU3KMF4imfrwwRAUGW6BthAPnicCUZo",
    dataEntry01: {
      label: "UNIT_DESIGNATION",
      value: "GAME DEVELOPER"
    },
    dataEntry02: {
      label: "OPERATIONAL_FOCUS",
      value: "IMMERSIVE_SYSTEMS"
    },
    biography: [
      "Specialized in the architecture and deployment of high-fidelity immersive environments. Initial directives focused on foundational system stability and establishing core logic pathways for human-machine interfacing protocols.",
      "Previous operational cycles include extensive deployments in spatial computing domains, optimizing rendering pipelines for minimal latency feedback loops. Current standing objective emphasizes the synthesis of tactical analog aesthetics with robust digital infrastructure to ensure persistent, reliable user interactions across variable network states."
    ],
    lastUpdated: "CYBER_EPOCH_994"
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
      category: "Platfromer",
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
          { key: "E", action: "SWICH CHARACTER" }
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
        operatorRole: "ultiplayer Systems Developer",
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

  // Terminal Session (Contact)
  contact: {
    links: [
      { name: "EMAIL", url: "mailto:operator@automata.os", icon: "mail" },
      { name: "GITHUB", url: "https://github.com/", icon: "code" },
      { name: "LINKEDIN", url: "https://linkedin.com/", icon: "work" },
      { name: "FACEBOOK", url: "https://birdbox774.itch.io/", icon: "gamepad" }
    ]
  }
};
