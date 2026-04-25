export const PORTFOLIO_DATA = {
  // Global Operator Data
  operator: {
    name: "OPERATOR_042",
    status: "STATUS: OPERATIONAL",
    id: "ID_OP_042",
  },

  // Home Page Data
  home: {
    title: "M_a_h_m_o_u_d// DEV",
    subtitle: "SYSTEM DESIGNER & GAME DEVELOPER",
    bio: "Crafting digital experiences through technical precision and artistic intent.",
  },

  // Personnel Profile (About)
  about: {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb3oqYrohHM1mhQTCUxCWvuwnIDFePgVmH-BdQXdGxNpebOhe1uSBGY1MkFt3Scae-DisUP9axtWfOKsjyo7Fiy1yCMQyHSudaPTWCsld9mnVoNFKtyF-Jg_10jsIbLwNNg69AoBUXKYLG6_JUOOsiFiit6BL2R8qISB01FexaFUDpVrGrqAyHeKpXakWR3t5PvG-Bonp8l_X7PDQM6p1AzgHCKZxUFUtEiszSXIriSvMBAU3KMF4imfrwwRAUGW6BthAPnicCUZo",
    dataEntry01: {
      label: "UNIT_DESIGNATION",
      value: "DEVELOPER"
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
      title: "VELOCITY_PROTOCOL",
      category: "Racing",
      status: "ACTIVE", // ACTIVE or ARCHIVED
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVaZHFgD-mqQ6hW8OlpgaOjLCQ0jhwXT_clpOeh24dNpW5DOY6HPf_qT_9y10mieiW3TqbQIw-p6hDcIookDpa5YLeFPbOsPV7TcHsEhFjeLIBhh0-VdbRU9paoaR-od3hcaxzZe3fUE01OljYVMtchrfTi4vJd8fpzHz8_vY6PbqZl57thjb1QELY8EfcqnCouih7Wc8uzLYWovGKsrWZ4gCGyvU_M_mXMXASeDz_VqgfgY4J2u3YgD4bHUQN9glJzXo02q3-h4k",
      detail: {
        cycle: "2023.4",
        classType: "SIMULATION",
        overview: "A high-speed racing simulation focusing on hyper-realistic physics and dynamic weather systems to test player reaction times under variable cognitive loads.",
        objective: "Achieve a consistent 120fps physics simulation loop on mid-tier hardware while maintaining visual fidelity.",
        operatorRole: "Lead Gameplay Engineer",
        techStack: ["Unity Engine", "C#", "DOTS", "FMOD"],
        detailImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBt0rD9H0S0WBQFpHTEhdnSyxk7jRHiBwCpvlBpLKvA88_tSM79dWg15wJGn7FCAGl4QUnh0KVInXVteLrwN3Q3FddqUyixPmCCD-YZ1ZA_xOh1urdQCNH3Dip74Vnj39SZMReCg14_i5BJtdguljPJLtSi6_1jlsQnK6u5CWrtRaVTN-uR8e4GCyEPJKkrVU1mTlxCSritJDcqpelmya3Cvn_DjQa4ZiAsxrBOXsmRaU4DhxuF61eKAyvBhBT6axzbJpgc6-MFsU",
        anomalyReport: "Initial wheel collision meshes caused severe jittering at high speeds.",
        resolution: "Implemented a custom raycast-based suspension system to decouple wheel rendering from strict physics collisions."
      }
    },
    {
      id: "002",
      title: "OPERATION_AEGIS",
      category: "Action",
      status: "ARCHIVED",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFVZiFwcYtbI4DYAwbgGV6Lobo0azhtbqygMdBqGT3oGPZRx4A0Lff0mHE2_4Rv8s1X9zDmrgn3binyx8DPEfwqqmxc8vljUVfwAohS4QCKdFl8RvNd5jAm9tamaaYXtAhUarb2DULWs-x4RtUvywUDLrHpMHoinYy3b1TxGoxeOqL-puDYpftuehxWSrjP2uHrpq97oRPIx7eSJYK7oPNzR8jamq_So7rfeYbZ5D7SPdE2acIjR30D9fkqrp1E1_QRhO18XF-HVg",
      detail: {
        cycle: "2022.1",
        classType: "COMBAT",
        overview: "A tactical action prototype utilizing defensive shield mechanics and parry-based combat loops.",
        objective: "Design a combat system that rewards precise timing over button mashing.",
        operatorRole: "Systems Designer",
        techStack: ["Unreal Engine", "Blueprints", "C++"],
        detailImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFVZiFwcYtbI4DYAwbgGV6Lobo0azhtbqygMdBqGT3oGPZRx4A0Lff0mHE2_4Rv8s1X9zDmrgn3binyx8DPEfwqqmxc8vljUVfwAohS4QCKdFl8RvNd5jAm9tamaaYXtAhUarb2DULWs-x4RtUvywUDLrHpMHoinYy3b1TxGoxeOqL-puDYpftuehxWSrjP2uHrpq97oRPIx7eSJYK7oPNzR8jamq_So7rfeYbZ5D7SPdE2acIjR30D9fkqrp1E1_QRhO18XF-HVg",
        anomalyReport: "Animation state machine became overly complex and difficult to debug.",
        resolution: "Refactored logic into a structured State Pattern in C++."
      }
    },
    {
      id: "003",
      title: "NEXUS_CORE",
      category: "Infrastructure",
      status: "ACTIVE",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP-uZ2sxwlqQ4Q2SWEej8fGgiBzdGwLFhgYk9kwhlbFER2aON0fzzviq75bc7tXfsxPdxgZR6F9Ia9T6YuVS6dS5s31dpsS-9VAY--EPN9dwaY0abK9P5vyieN0zynICxN1gj6cYpQEFxQOboNtlDjBi8-vz_0F0oI85etIRt5NWGknMgFvDo5cuHq8EQag7fSqkULKc6WmX3wBoInoleBtrmoha4VCw2ogaCTmvX0yU4hXKrhc-6xTd4NP6BGSE1ZbIvtlKibqdE",
      detail: {
        cycle: "2024.2",
        classType: "NETWORKING",
        overview: "A scalable multiplayer backend solution for coordinating player interactions across distributed servers.",
        objective: "Reduce server communication latency below 50ms for global interactions.",
        operatorRole: "Backend Engineer",
        techStack: ["Node.js", "WebSockets", "Redis", "Docker"],
        detailImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP-uZ2sxwlqQ4Q2SWEej8fGgiBzdGwLFhgYk9kwhlbFER2aON0fzzviq75bc7tXfsxPdxgZR6F9Ia9T6YuVS6dS5s31dpsS-9VAY--EPN9dwaY0abK9P5vyieN0zynICxN1gj6cYpQEFxQOboNtlDjBi8-vz_0F0oI85etIRt5NWGknMgFvDo5cuHq8EQag7fSqkULKc6WmX3wBoInoleBtrmoha4VCw2ogaCTmvX0yU4hXKrhc-6xTd4NP6BGSE1ZbIvtlKibqdE",
        anomalyReport: "Redis cache memory leaks during high concurrency tests.",
        resolution: "Optimized connection pooling and TTL settings for ephemeral session data."
      }
    },
    {
      id: "004",
      title: "ECHO_SYSTEM",
      category: "Simulation",
      status: "ACTIVE",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBt0rD9H0S0WBQFpHTEhdnSyxk7jRHiBwCpvlBpLKvA88_tSM79dWg15wJGn7FCAGl4QUnh0KVInXVteLrwN3Q3FddqUyixPmCCD-YZ1ZA_xOh1urdQCNH3Dip74Vnj39SZMReCg14_i5BJtdguljPJLtSi6_1jlsQnK6u5CWrtRaVTN-uR8e4GCyEPJKkrVU1mTlxCSritJDcqpelmya3Cvn_DjQa4ZiAsxrBOXsmRaU4DhxuF61eKAyvBhBT6axzbJpgc6-MFsU", // Using the Neural Net Visualizer image from original as fallback
      detail: {
        cycle: "2023.4",
        classType: "SIMULATION",
        overview: "The Neural Net Visualizer is a high-fidelity rendering environment designed to map complex algorithmic decision trees into observable 3D spatial geometry.",
        objective: "To construct a stable, 60fps navigable interface capable of processing and visualizing up to 100,000 active neural connections simultaneously.",
        operatorRole: "Lead Technical Architect",
        techStack: ["Unity Engine", "C#", "HLSL Shaders", "Compute Pipelines"],
        detailImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBt0rD9H0S0WBQFpHTEhdnSyxk7jRHiBwCpvlBpLKvA88_tSM79dWg15wJGn7FCAGl4QUnh0KVInXVteLrwN3Q3FddqUyixPmCCD-YZ1ZA_xOh1urdQCNH3Dip74Vnj39SZMReCg14_i5BJtdguljPJLtSi6_1jlsQnK6u5CWrtRaVTN-uR8e4GCyEPJKkrVU1mTlxCSritJDcqpelmya3Cvn_DjQa4ZiAsxrBOXsmRaU4DhxuF61eKAyvBhBT6axzbJpgc6-MFsU",
        anomalyReport: "Initial compilation iterations experienced severe frame dropping when node counts exceeded 25,000.",
        resolution: "Migrated spatial calculations to GPU Compute Shaders using Unity DOTS."
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
