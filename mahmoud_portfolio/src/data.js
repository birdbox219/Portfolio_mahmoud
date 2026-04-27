import resumePdf from './assets/Mahmoud_Elsayed_Unity_Resume.pdf';
import profileImg from './assets/portfolio_image.jpg';
import log2Img from './assets/LOGO_2.webp';
import log3Img from './assets/Log_3_image.jpg';
import log4Img from './assets/LOG_4_updated.webp';

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
      date: "CYCLE_2026.3 - PRESENT",
      role: "Game developer intern",
      company: "Al Arcade Studio ",
      historyText: "After getting first place On a game jam competition for multiplayer XO i managed to join Al Arcade Studio as a game developer intern in 2026",
      image: "https://scontent.fcai19-7.fna.fbcdn.net/v/t39.30808-6/456448375_477343695145102_5825519036298640859_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEP3jZ9tvT1etnUNInvk5rywVWKMbLqJyLBVYoxsuonInRfMY8Wr3KF2JEFqcWeHS1KT3qoSAISoFKoORVfwbCV&_nc_ohc=al9ZXnPT6x8Q7kNvwEAF1vb&_nc_oc=AdpQaIe8bha7LKpxMjaQOzuLSO3jWxUXkLZDMoHjfDMf_n9uSVFwkyXwnOFsiCZxzfc&_nc_zt=23&_nc_ht=scontent.fcai19-7.fna&_nc_gid=i_QGFADVkO7fjwEANCJKKw&_nc_ss=7b2a8&oh=00_Af2RpNlqTtaPqxmYEJAQI92F3qxVpNPUe4gXNYNb53LxNg&oe=69F4EBC6"
    },
    {
      id: "LOG_02",
      date: "CYCLE_2026.1 - 2026.2",
      role: "Event Orgnizer ",
      company: "FCAI-GD",
      historyText: "As an event organizer, I was core event orgnizer for FCAI Game Developers Club, coordinating with teams to deliver memorable experiences for participants , and wining first place in the game jam along the way",
      image: log2Img
    },
    {
      id: "LOG_03",
      date: "CYCLE_2025.11 - 2025.12",
      role: "Course participant ",
      company: "FCAI-GD - game development course",
      historyText: "One of the best courses i have ever attended , it made me love game development and want to pursue it as a career , wining the 3st place in the course",
      image: log3Img
    },

    {
      id: "LOG_04",
      date: "CYCLE_2025.7 - 2025.10",
      role: "Pen testing & reverse engineering intern",
      company: "FIXED SOLUTIONS",
      historyText: "My curiosity about how software works led me to study reverse engineering and contribute to modding communities. Through this journey, I earned my first internship at FIXED SOLUTIONS, focusing on penetration testing and reverse engineering.",
      image: log4Img
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
