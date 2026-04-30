export type Category =
  | "Full Stack"
  | "GenAI"
  | "AI/ML"
  | "Low Level Development"
  | "Automation"
  | "Game Development";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectData {
  slug: string;
  name: string;
  category: Category;
  about: string;
  techStack: string[];
  features: ProjectFeature[];
  architecture?: ProjectFeature[];
  futureImprovements: ProjectFeature[];
  githubLink: string;
  liveDemo?: string;
  researchPaper?: string;
}

export const CATEGORIES: Category[] = [
  "Full Stack",
  "GenAI",
  "AI/ML",
  "Low Level Development",
  "Automation",
  "Game Development",
];

export const projects: ProjectData[] = [
  // ─── Full Stack ───────────────────────────────────────────────
  {
    slug: "code-x",
    name: "Code-X",
    category: "Full Stack",
    about:
      "Code-X is a full-stack collaborative web IDE platform built for seamless developer workflows and instant coding. It empowers users to authenticate, manage project files, and collaborate on code changes in near real-time. By providing an in-browser terminal experience and isolated, per-user runtime environments powered by Kubernetes, Code-X delivers a complete, cloud-native development experience directly in the browser.",
    techStack: [
      "React",
      "Vite",
      "Monaco Editor",
      "Xterm.js",
      "Node.js",
      "Socket.IO",
      "node-pty",
      "PostgreSQL",
      "Drizzle ORM",
      "Azure Blob Storage",
      "Kubernetes",
      "Nginx",
      "JWT",
    ],
    features: [
      {
        title: "Real-Time Collaboration",
        description:
          "Multi-user editing and synchronization via Socket.IO delta events.",
      },
      {
        title: "In-Browser Terminal",
        description: "Interactive terminal streaming powered by node-pty.",
      },
      {
        title: "Isolated Cloud Workspaces",
        description: "Kubernetes-managed, per-user runtime environments.",
      },
      {
        title: "Secure File Storage",
        description:
          "Durable project file storage backed by Azure Blob Storage.",
      },
      {
        title: "Robust Authentication",
        description:
          "JWT-based authentication and protected APIs with PostgreSQL user management.",
      },
      {
        title: "Advanced Routing",
        description:
          "Nginx-based routing for API, sockets, and user container proxying.",
      },
      {
        title: "Multi-Language Support",
        description:
          "Comprehensive code editing support through the Monaco Editor.",
      },
    ],
    architecture: [
      {
        title: "Client Layer",
        description:
          "A React + Vite SPA hosting the Monaco editor, Xterm terminal, file explorer, and authentication screens.",
      },
      {
        title: "Gateway Layer",
        description:
          "Nginx acts as a single traffic entry point, routing API requests, WebSocket connections, and container lifecycle events without exposing internal cluster topology.",
      },
      {
        title: "Main API Service",
        description:
          "Handles user authentication, protected APIs, database operations via Drizzle/Postgres, and Azure Blob integration. It also hosts the socket hub for editor deltas.",
      },
      {
        title: "Runtime Service",
        description:
          "Manages local workspace files, applies editor deltas, and runs shell sessions via node-pty for terminal interactivity.",
      },
      {
        title: "Orchestrator Service",
        description:
          "Creates, proxies, and deletes per-user Kubernetes deployments and services.",
      },
      {
        title: "Data Flow (Editing)",
        description:
          "Code edits in Monaco emit delta events via sockets → broadcasted to clients → applied to local files → saved and persisted to Azure Blob Storage.",
      },
      {
        title: "Data Flow (Execution)",
        description:
          "Frontend requests a spawn → K8s orchestrator creates a user pod → an Init container hydrates the workspace from Azure Blob → terminal/editor sockets connect.",
      },
    ],
    futureImprovements: [
      {
        title: "Advanced Collaboration Tools",
        description:
          "Implement features like active user cursors, presence indicators, and inline commenting for a richer collaborative experience.",
      },
      {
        title: "Enhanced Compute Management",
        description:
          "Introduce auto-hibernation or scaling policies for Kubernetes pods to optimize resource usage and reduce infrastructure costs during idle periods.",
      },
      {
        title: "Version Control Integration",
        description:
          "Integrate native Git commands directly into the UI, allowing users to commit, push, and pull directly from their web workspaces.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/Code-X",
    liveDemo: "https://drive.google.com/file/d/1gZSHdLYahxIj5aiVlP_lRTlljK6RzXO7/view",
  },
  {
    slug: "collab-x",
    name: "Collab-X",
    category: "Full Stack",
    about:
      "Collab-X is a modern, Google Docs-style collaborative text editor that enables multiple users to create and edit documents simultaneously in real-time. Built with a focus on seamless collaboration and robust performance, the application provides a rich text editing experience alongside secure user authentication and highly optimized real-time data synchronization.",
    techStack: [
      "Next.js 15",
      "Tailwind CSS",
      "Tiptap Editor",
      "Liveblocks",
      "Clerk",
      "Convex",
    ],
    features: [
      {
        title: "Real-Time Collaboration",
        description:
          "Synchronized document editing across multiple active users using Liveblocks.",
      },
      {
        title: "Rich Text Editing",
        description:
          "Comprehensive formatting options including text styling, lists, and image support powered by Tiptap.",
      },
      {
        title: "Secure Identity Management",
        description:
          "Seamless authentication and user session management handled securely via Clerk.",
      },
      {
        title: "High-Performance Backend",
        description:
          "Optimized real-time data updates, efficient retrieval, and scalable storage utilizing Convex.",
      },
      {
        title: "Responsive Design",
        description:
          "A mobile-friendly and intuitive user interface styled with Tailwind CSS.",
      },
    ],
    futureImprovements: [
      {
        title: "Document Version History",
        description:
          "Implement a snapshot system to allow users to view past versions and restore previous states of their documents.",
      },
      {
        title: "Inline Comments and Mentions",
        description:
          "Enable users to leave contextual comments on specific text blocks and tag collaborators using @ mentions for better communication.",
      },
      {
        title: "Offline Support",
        description:
          "Introduce local caching mechanisms to allow users to continue editing without an internet connection, automatically syncing their changes once reconnected.",
      },
      {
        title: "Export and Sharing Options",
        description:
          "Allow users to export documents to PDF or Markdown formats and generate granular permission-based sharing links.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/Collab-X",
    liveDemo: "https://tushar-collab-x.vercel.app/",
  },
  {
    slug: "udaan-ai",
    name: "UDAAN_AI",
    category: "Full Stack",
    about:
      "UDAAN_AI is a unified, AI-powered GPS, drone, and air traffic intelligence platform designed to revolutionize how government and aviation agencies manage real-time logistics. By seamlessly integrating high-frequency telemetry data into a single ecosystem, the platform delivers real-time tracking, predictive analytics, and smart alerting. It bridges the gap between ground fleets and unmanned aerial vehicles (UAVs), providing next-generation transparency, efficiency, and automation for complex operational systems.",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Leaflet.js",
      "Recharts",
      "Node.js",
      "Express.js",
      "Apache Kafka",
      "MySQL",
      "Drizzle ORM",
      "Redis",
      "TensorFlow",
      "XGBoost",
      "Scikit-learn",
      "Docker",
      "Nginx",
      "Vercel",
      "Firebase",
    ],
    features: [
      {
        title: "AI-Based Collision & Delay Prediction",
        description:
          "Utilizes trajectory and weather data to forecast flight path conflicts and air traffic congestion.",
      },
      {
        title: "Real-Time UAV Traffic Dashboard",
        description:
          "Visualizes active drones, air routes, and historical trail playbacks with timestamped coordinates via interactive maps.",
      },
      {
        title: "Smart Geofence & Intrusion Detection",
        description:
          "Instantly detects boundary violations and unauthorized drones entering restricted no-fly zones using ML and computer vision.",
      },
      {
        title: "Predictive Maintenance",
        description:
          "Forecasts vehicle and drone component failures by analyzing telemetry data (e.g., battery levels, vibration metrics).",
      },
      {
        title: "High-Throughput Ingestion",
        description:
          "Capable of handling over 1 million GPS/UAV events per day while maintaining 99.99% uptime.",
      },
      {
        title: "Enterprise Security",
        description:
          "Features Role-Based Access Control (RBAC), JWT authentication, and multi-agency data isolation.",
      },
    ],
    architecture: [
      {
        title: "Data Ingestion Pipeline",
        description:
          "An Apache Kafka event streaming layer captures and buffers massive volumes of real-time GPS and telemetry data from ground fleets and UAVs.",
      },
      {
        title: "Backend Services",
        description:
          "Scalable Node.js and Express APIs process operational logic and interact with a MySQL database optimized by Drizzle ORM (achieving 70% faster query execution). Redis is used for caching active session and geospatial data.",
      },
      {
        title: "AI Integration Layer",
        description:
          "Specialized ML models consume aggregated event data to perform predictive maintenance, anomaly detection, and collision predictions asynchronously.",
      },
      {
        title: "Client Layer",
        description:
          "A responsive Next.js frontend dynamically renders real-time tracking data using Leaflet and visually graphs analytics via Recharts, tailored precisely to the user's RBAC role.",
      },
    ],
    futureImprovements: [
      {
        title: "Edge AI Integration",
        description:
          "Deploy lightweight anomaly detection and collision avoidance models directly onto drone hardware to reduce latency.",
      },
      {
        title: "Live Weather API Integration",
        description:
          "Dynamically overlay real-time meteorological data onto the dashboard to enable automated, safe rerouting of UAVs in transit.",
      },
      {
        title: "Automated Dispatch System",
        description:
          "Implement an autonomous dispatch engine that can automatically assign and route drones based on battery life, payload capacity, and proximity to an incident.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/Udaan_AI",
    liveDemo: "https://www.youtube.com/watch?v=Wvbfp_NW3Bc",
  },
  {
    slug: "marg",
    name: "MARG",
    category: "Full Stack",
    about:
      "MARG is a unified GPS platform designed to transform government logistics through real-time fleet tracking, predictive analytics, and seamless data integration. Built to operate at an enterprise scale, it handles over 1 million daily location updates with 99.99% uptime. By providing smart geofencing, dynamic ETAs, and comprehensive role-based access, MARG enables smarter, more transparent, and highly efficient data-driven logistics management.",
    techStack: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Apache Kafka",
      "MySQL",
      "Drizzle ORM",
    ],
    features: [
      {
        title: "Real-Time Analytics",
        description:
          "Live tracking of ETAs, vehicle stoppages, speed, and drive time.",
      },
      {
        title: "Smart Geofencing & Overlays",
        description:
          "Fullscreen satellite maps with dynamic geofenced overlays for precise tracking.",
      },
      {
        title: "Automated Smart Alerts",
        description:
          "Seven distinct alerts (including speeding, GPS loss, and route deviation) tied to automatic email notifications.",
      },
      {
        title: "Historical Trip Replay",
        description:
          "Path plotting with exact speed, address, and timestamp data.",
      },
      {
        title: "Enterprise Security",
        description:
          "Strict Role-Based Access Control (RBAC) with page and group-specific permissions.",
      },
      {
        title: "Bulk Data Operations",
        description:
          "Support for bulk Excel upload, edit, delete, and multi-select actions.",
      },
      {
        title: "Comprehensive Reporting",
        description:
          "Five distinct report types with filter-based Excel exports across all analytics views.",
      },
    ],
    architecture: [
      {
        title: "Client Layer",
        description:
          "A highly responsive React and Tailwind CSS frontend optimized with lazy loading, code-splitting, and dark/light mode support.",
      },
      {
        title: "API & Business Logic",
        description:
          "A Node.js and Express backend handling over 50,000 GPS and shipment events per day via RESTful APIs and external TMS triggers.",
      },
      {
        title: "Event Streaming Pipeline",
        description:
          "A high-throughput Kafka-based pipeline processes over 1 million location updates daily, ensuring extremely low latency and 99.99% uptime.",
      },
      {
        title: "Data Storage",
        description:
          "A MySQL database heavily indexed and optimized using Drizzle ORM, resulting in a 70% improvement in query performance.",
      },
    ],
    futureImprovements: [
      {
        title: "AI-Driven Route Optimization",
        description:
          "Integrate machine learning algorithms to dynamically suggest the most fuel-efficient and time-saving routes.",
      },
      {
        title: "Dedicated Driver Mobile App",
        description:
          "Develop a companion mobile application for fleet drivers to provide turn-by-turn navigation and digital proof of delivery.",
      },
      {
        title: "Predictive Fleet Maintenance",
        description:
          "Utilize vehicle telemetry data to forecast engine wear and tear, automatically alerting admins when maintenance is needed.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/Marg-Gps",
    liveDemo: "https://www.youtube.com/watch?v=Dya2MEnw0RQ",
  },
  {
    slug: "fire-tv",
    name: "FireTV",
    category: "Full Stack",
    about:
      "FireTV is a cutting-edge, AI-driven video streaming platform built to highly personalize and socialize the viewing experience. It goes beyond traditional streaming by utilizing AI to detect a user's current mood and instantly recommending content tailored to their emotional state. Additionally, FireTV features intelligent video summarization for long-form content and robust real-time synchronization, allowing friends to host watch parties and stream videos together in perfect sync.",
    techStack: ["Vite", "FastAPI", "Python", "Google Gemini Flash API", "WebSockets"],
    features: [
      {
        title: "Mood-Based Recommendations",
        description:
          "Analyzes user signals (text, audio, or video) to detect emotions and suggests contextually matching videos.",
      },
      {
        title: "AI Video Summarizer",
        description:
          "Automatically generates concise text summaries and highlights key moments of long videos using Gemini.",
      },
      {
        title: "Synchronized Group Watching",
        description:
          "Supports real-time, multi-user watch parties with perfectly synced play, pause, and seek controls.",
      },
      {
        title: "Live Social Interaction",
        description:
          "WebSocket integration broadcasts chat messages, mood shifts, and playback state changes instantly to all users in a viewing room.",
      },
    ],
    architecture: [
      {
        title: "Client Layer",
        description:
          "A blazing-fast frontend built with Vite handles the UI, video player logic, and capturing user signals for mood detection.",
      },
      {
        title: "Real-Time Streaming Layer",
        description:
          "A Python-based FastAPI backend manages active WebSocket connections, acting as the central hub for playback events and chat messages.",
      },
      {
        title: "AI Integration Layer",
        description:
          "The backend securely communicates with the Gemini Flash API to process video transcripts for summarization and evaluate user inputs for real-time emotional state classification.",
      },
    ],
    futureImprovements: [
      {
        title: "Integrated Voice Chat",
        description:
          "Add WebRTC-based voice channels to the watch parties so users can talk to each other in real-time.",
      },
      {
        title: "Granular Emotion Tracking",
        description:
          "Introduce continuous emotion tracking via webcam that dynamically adjusts the recommended queue as the user's mood shifts.",
      },
      {
        title: "Smart Chapter Segmentation",
        description:
          "Expand the AI summarizer to automatically inject clickable visual chapters onto the video scrubber based on topic changes.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/HackonAmazon",
    liveDemo: "https://www.youtube.com/watch?v=5vkd3C3EMcg",
  },
  {
    slug: "hotel-search",
    name: "Hotel Search Application",
    category: "Full Stack",
    about:
      "The Hotel Search Application is a full-stack web platform designed to streamline the process of finding accommodations. It allows users to intuitively search and filter hotels based on specific, custom criteria. By integrating Natural Language Processing (NLP) capabilities using SpaCy on the backend, the application intelligently processes user queries to extract meaning and intent, delivering highly relevant search results within a modern, responsive user interface.",
    techStack: ["React", "Node.js", "Python", "Flask", "SpaCy"],
    features: [
      {
        title: "Advanced Hotel Search",
        description:
          "Robust search functionality that allows users to seamlessly filter and narrow down hotel options based on various criteria.",
      },
      {
        title: "NLP-Powered Processing",
        description:
          "Utilizes the SpaCy library to understand and process natural language search inputs, significantly enhancing accuracy and relevance.",
      },
      {
        title: "Responsive Modern UI",
        description:
          "A highly user-friendly, cleanly designed frontend built with React that ensures a smooth experience across both desktop and mobile devices.",
      },
    ],
    architecture: [
      {
        title: "Client Layer",
        description:
          "A responsive React application that captures user search inputs, filter preferences, and displays the structured hotel data.",
      },
      {
        title: "API & Logic Layer",
        description:
          "A lightweight Python/Flask backend that serves as the bridge between the client and the data, handling incoming RESTful API requests.",
      },
      {
        title: "NLP Processing Engine",
        description:
          "Before querying the hotel database, the backend routes raw search strings through SpaCy to intelligently extract entities and context to form a more accurate search query.",
      },
    ],
    futureImprovements: [
      {
        title: "Interactive Map Integration",
        description:
          "Incorporate Google Maps or Mapbox APIs to allow users to visualize hotel locations geographically and perform bounding-box searches.",
      },
      {
        title: "Live Pricing Aggregation",
        description:
          "Connect to third-party travel APIs to pull in real-time pricing, availability, and dynamic booking links.",
      },
      {
        title: "User Accounts & Favorites",
        description:
          "Implement authentication so users can save their favorite hotels to a wishlist, leave reviews, and track their booking history.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/Hotel-Search-new",
  },
  {
    slug: "blog-space",
    name: "Blog Space",
    category: "Full Stack",
    about:
      "Blog Space is a modern, dynamic, and fully responsive blogging platform designed to provide a seamless writing and reading experience. Utilizing a block-style editor and a robust notification system, the platform empowers users to create rich content, manage their publications, and interact deeply with the community through likes and nested comments. With comprehensive user profiles and analytics, Blog Space serves as a complete ecosystem for digital publishing.",
    techStack: [
      "React",
      "Next.js",
      "Editor.js",
      "Node.js",
      "Express.js",
      "Google OAuth",
      "Firebase Auth",
      "Tailwind CSS",
    ],
    features: [
      {
        title: "Modern Block Editor",
        description:
          "Utilizes Editor.js to provide a clean, block-based rich text editing experience for drafting articles.",
      },
      {
        title: "Comprehensive Dashboard & Analytics",
        description:
          "A dedicated user dashboard to manage published and draft blogs, complete with post analytics.",
      },
      {
        title: "Dynamic Interaction Engine",
        description:
          "Features a nested comment system (allowing replies to comments) and a like mechanism to drive user engagement.",
      },
      {
        title: "Smart Notification System",
        description:
          "Stores all site interactions as notifications, intelligently separating recent highlights from older alerts.",
      },
      {
        title: "Robust User Profiles",
        description:
          "Dedicated profile pages featuring social links, bios, customized usernames, and a showcase of written blogs.",
      },
      {
        title: "Secure Authentication",
        description:
          "Google OAuth for seamless login, alongside profile settings for updating credentials, social links, and passwords.",
      },
    ],
    architecture: [
      {
        title: "Client Layer",
        description:
          "A mobile-responsive frontend built with a modern design system, featuring smooth fade-in page transitions and dynamic URL routing.",
      },
      {
        title: "Content Management System",
        description:
          "The backend handles complex state changes between draft and published posts, feeding analytics data back to the user's dashboard.",
      },
      {
        title: "Authentication Layer",
        description:
          "OAuth integration handles secure session management and identity verification, linking user IDs directly to their authored content.",
      },
      {
        title: "Data Layer",
        description:
          "Manages deeply nested data structures for the multi-threaded comment system and mapping of likes/notifications to user accounts.",
      },
    ],
    futureImprovements: [
      {
        title: "Auto-Save & Version History",
        description:
          "Implement an automated draft-saving feature and a version history system to prevent data loss during writing.",
      },
      {
        title: "SEO Optimization Engine",
        description:
          "Add built-in metadata generation and Open Graph tag injection for dynamic blog URLs.",
      },
      {
        title: "Personalized Content Feed",
        description:
          "Introduce an algorithmic recommendation feed based on reading history, liked tags, and followed authors.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/blog-space",
  },
  {
    slug: "cpp-online-compiler",
    name: "C++ Online Compiler",
    category: "Full Stack",
    about:
      "The C++ Online Compiler is a full-stack, web-based development environment that allows users to write, compile, and execute C++ code directly within their browser. Built entirely from scratch, it removes the friction of local compiler setups by providing a seamless, real-time coding experience with instant output feedback and isolated execution.",
    techStack: ["React", "Tailwind CSS", "Node.js", "Express.js"],
    features: [
      {
        title: "Real-Time Execution",
        description:
          "Write C++ code and execute it instantly with results streamed directly to the browser.",
      },
      {
        title: "Comprehensive Error Handling",
        description:
          "Captures and cleanly displays both standard output (stdout) and compilation/runtime errors (stderr).",
      },
      {
        title: "Isolated Processing",
        description:
          "Executes user-submitted code securely utilizing Node.js child processes.",
      },
      {
        title: "Dynamic File Management",
        description:
          "Uses the fs module to handle the creation and cleanup of temporary .cpp files on the server automatically.",
      },
      {
        title: "Modern Interface",
        description:
          "A responsive, developer-friendly UI built with React.",
      },
    ],
    architecture: [
      {
        title: "Client Layer",
        description:
          "The React frontend acts as the user interface, capturing code input and sending it to the backend via a REST API payload.",
      },
      {
        title: "File Processing",
        description:
          "Upon receiving the request, the Express backend uses the fs module to write the raw string into a temporary .cpp file on the server.",
      },
      {
        title: "Compilation & Execution Pipeline",
        description:
          "The child_process module is used to spawn a system shell command. It first runs the compiler (like g++) on the .cpp file. If successful, it executes the resulting binary file.",
      },
      {
        title: "Feedback Loop",
        description:
          "The backend listens to the child process's data streams, captures the output or compilation errors, and sends it back to the React frontend as a structured JSON response.",
      },
    ],
    futureImprovements: [
      {
        title: "Docker Sandboxing",
        description:
          "Wrap the execution layer in isolated, ephemeral Docker containers to provide strict security limits on memory, CPU, and network access to prevent malicious code execution.",
      },
      {
        title: "Monaco Editor Integration",
        description:
          "Upgrade the code input area with the Monaco Editor (the engine behind VS Code) to provide syntax highlighting, line numbers, and intelligent auto-completion.",
      },
      {
        title: "Execution Timeout Limits",
        description:
          "Implement strict timeout rules on the child processes to automatically kill programs that enter infinite loops, preventing server resource exhaustion.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/Cpp-Compiler",
  },
  {
    slug: "pravah-x",
    name: "Pravah-X",
    category: "Full Stack",
    about:
      "Pravah-X is a comprehensive, full-stack web platform designed specifically for beginner and intermediate competitive programmers. It eliminates the friction of environment setup by unifying a personalized IDE, an AI debugging assistant, daily problem tracking, and live Codeforces analytics into a single, intuitive interface. By streamlining the workflow, Pravah-X allows developers to focus entirely on algorithmic problem-solving rather than boilerplate configuration.",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "PostgreSQL",
      "Prisma ORM",
      "NextAuth.js v4",
      "Recharts",
      "Chart.js",
    ],
    features: [
      {
        title: "Codeforces Analytics Dashboard",
        description:
          "Real-time synchronization with the Codeforces API to display user rating history, an activity heatmap, and recent submission verdicts.",
      },
      {
        title: "Personalized IDE & AI Assistant",
        description:
          "An integrated coding environment pre-loaded with standard C++ templates, coupled with an AI chatbot to help debug code and explain complex algorithmic concepts.",
      },
      {
        title: "Structured Progression",
        description:
          "Features a curated Problem of the Day, a topic-wise learning roadmap, and a 30-day visual streak tracker to build consistency.",
      },
      {
        title: "Contest Management",
        description:
          "A real-time feed of upcoming Codeforces rounds complete with countdowns so users never miss a competition.",
      },
      {
        title: "Secure Authentication",
        description:
          "Robust credential and OAuth support handled via NextAuth.js, with protected routes managed by Next.js middleware.",
      },
    ],
    architecture: [
      {
        title: "Client Layer",
        description:
          "Built on the Next.js App Router using React 19 and Tailwind CSS, featuring a responsive UI with smooth framer-motion transitions and dynamic data visualization via Recharts.",
      },
      {
        title: "Serverless Backend",
        description:
          "Utilizes Next.js API routes to handle custom backend logic, user registration, and secure communication with external APIs.",
      },
      {
        title: "Data Persistence",
        description:
          "A PostgreSQL database managed by Prisma ORM ensures type-safe querying and reliable storage for user sessions, profiles, and learning path progress.",
      },
      {
        title: "External Integrations",
        description:
          "Directly interfaces with the official Codeforces API to fetch and cache live user statistics, contest schedules, and submission data.",
      },
    ],
    futureImprovements: [
      {
        title: "In-Browser Code Execution",
        description:
          "Integrate a secure sandboxed backend (e.g., using Docker or a third-party compilation API) to allow users to compile and run their code directly within the Pravah-X IDE.",
      },
      {
        title: "Multi-Platform Support",
        description:
          "Expand the analytics and problem-tracking capabilities to include other major competitive programming platforms like LeetCode and AtCoder.",
      },
      {
        title: "Advanced AI Code Review",
        description:
          "Upgrade the AI assistant to perform automated full-code analysis, providing detailed feedback on time and space complexity and suggesting optimal algorithmic approaches.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/Pravah-X",
  },

  // ─── AI/ML ────────────────────────────────────────────────────
  {
    slug: "alzheimer-detection",
    name: "Multi-Modal Alzheimer's Detection from Speech",
    category: "AI/ML",
    about:
      "This project is an advanced, multi-modal machine learning pipeline designed to detect Alzheimer's Disease (AD) from spontaneous speech. By combining deep acoustic representations, contextual linguistic embeddings, and handcrafted prosodic and paralinguistic features, the system holistically analyzes both what a patient says and how they say it. It leverages a novel co-attention mechanism to align verbal content with vocal cues, making it highly effective at identifying the subtle cognitive and linguistic markers of dementia in clinical audio samples.",
    techStack: [
      "PyTorch",
      "Hugging Face Transformers",
      "Wav2Vec2",
      "BERT",
      "Librosa",
      "spaCy",
      "Python",
    ],
    features: [
      {
        title: "Multi-Modal Integration",
        description:
          "Combines raw speech audio, text transcripts, prosodic metrics (pitch, jitter), and paralinguistic traits (speech rate, pauses).",
      },
      {
        title: "Cross-Modal Co-Attention Fusion",
        description:
          "Uses 3 stacked Co-Attention blocks to dynamically align acoustic cues with text.",
      },
      {
        title: "Optimized for Small Medical Datasets",
        description:
          "Utilizes frozen, large pre-trained encoders (~144M parameters) paired with a lightweight, trainable fusion layer (~6M parameters) to prevent overfitting.",
      },
      {
        title: "Engineered Feature Extraction",
        description:
          "Automatically extracts and normalizes handcrafted voice rhythm and linguistic fluency metrics.",
      },
      {
        title: "Robust Training Pipeline",
        description:
          "Includes 10-fold cross-validation, mixed precision (FP16) training, and advanced learning rate scheduling.",
      },
    ],
    architecture: [
      {
        title: "Input Layer",
        description:
          "Ingests raw audio waveforms (16kHz), CHAT-formatted transcripts, 6 prosodic features, and 4 paralinguistic features.",
      },
      {
        title: "Feature Encoding",
        description:
          "Utilizes a frozen wav2vec2-base-960h model for acoustic embeddings and bert-base-uncased for contextual word embeddings.",
      },
      {
        title: "Co-Attention Fusion Layer",
        description:
          "Instead of simple concatenation, the model uses stacked Multi-Head Cross-Modal Attention, allowing the audio stream to attend to the text stream and vice versa.",
      },
      {
        title: "Feature Aggregation & Projection",
        description:
          "Summarizes outputs via acoustic pooling and linguistic pooling. These 768-dim vectors are concatenated with prosodic/paralinguistic features (totaling 1546 dimensions) and compressed via a dense projection layer.",
      },
      {
        title: "Classification Head",
        description:
          "A final linear layer with softmax outputs binary logits representing the probability of Control (0) vs. Dementia (1).",
      },
    ],
    futureImprovements: [
      {
        title: "Real-Time Clinical Inference",
        description:
          "Develop a lightweight streaming API to process patient audio and provide live diagnostic probabilities during clinical assessments.",
      },
      {
        title: "Multi-Class Cognitive Profiling",
        description:
          "Expand the binary classifier to detect and categorize varying stages of cognitive decline.",
      },
      {
        title: "Explainability Dashboard",
        description:
          "Build a visualization tool for clinicians that highlights the exact transcript words and audio segments that contributed most to the prediction.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/AlzeimerSpeechDetection",
  },
  {
    slug: "skin-cancer-detection",
    name: "Deep Learning-Based Skin Cancer Detection",
    category: "AI/ML",
    about:
      "This project presents a comprehensive, automated dermatological diagnosis system designed to detect and classify seven distinct types of skin lesions. Trained on the benchmark HAM10000 dataset, the system tackles major challenges inherent in medical imaging—such as severe class imbalance (58x difference between majority and minority classes) and visual occlusions. By combining an advanced preprocessing pipeline with a custom, highly efficient Convolutional Neural Network (CNN), the model delivers accurate, multi-class skin cancer detection without requiring massive computational overhead.",
    techStack: [
      "Python",
      "TensorFlow/Keras",
      "PyTorch",
      "OpenCV",
      "NumPy",
      "Pandas",
    ],
    features: [
      {
        title: "Advanced Image Preprocessing",
        description:
          "Automatically removes occluding hairs using morphological black-hat filtering and inpainting, and improves lesion visibility using CLAHE.",
      },
      {
        title: "Targeted Data Balancing",
        description:
          "Mitigates massive dataset imbalances using a two-phase data augmentation strategy specifically targeted at minority classes.",
      },
      {
        title: "Lightweight Efficiency",
        description:
          "The entire CNN model contains only ~1.28 million parameters, offering an optimal trade-off between discriminative power and speed.",
      },
      {
        title: "Multi-Class Classification",
        description:
          "Capable of categorizing seven different diagnostic classes, ranging from severe Melanoma to Benign keratosis-like lesions.",
      },
    ],
    architecture: [
      {
        title: "Input Pipeline",
        description:
          "Images are resized to 224x224 pixels and normalized using ImageNet mean and standard deviation metrics.",
      },
      {
        title: "Convolutional Feature Extractor",
        description:
          "Four sequential blocks with 3x3 convolutions, batch normalization, ReLU activation, and max-pooling. Filter sizes progressively increase (32 → 64 → 128 → 256).",
      },
      {
        title: "Classification Head",
        description:
          "Extracted features are flattened and passed through dense layers (256 → 128 → 64 → 32) with batch normalization.",
      },
      {
        title: "Regularization & Output",
        description:
          "A dropout layer (rate 0.2) reduces overfitting, leading into a final 7-unit Softmax activation layer.",
      },
    ],
    futureImprovements: [
      {
        title: "Explainable AI (XAI) Integration",
        description:
          "Implement Grad-CAM to generate heatmaps highlighting the exact visual features the model used for its prediction.",
      },
      {
        title: "Mobile Point-of-Care App",
        description:
          "Convert and optimize using TensorFlow Lite or CoreML for deployment as a real-time, offline smartphone application.",
      },
      {
        title: "Ensemble Learning & ViTs",
        description:
          "Explore integrating Vision Transformers alongside the CNN to better capture both local textures and global context.",
      },
    ],
    githubLink: "",
    researchPaper: "https://ieeexplore.ieee.org/document/11383744",
  },
  {
    slug: "event-vision",
    name: "EventVision",
    category: "AI/ML",
    about:
      "EventVision is an AI-powered automated video editing system designed to seamlessly transform raw footage into polished, cinematic short-form videos (10-20 seconds). By leveraging advanced deep learning models to analyze the emotional context and themes of the footage, it intelligently applies professional visual filters, smooth transitions, and mood-matching background music. This creates production-ready content automatically, eliminating the need for manual video editing.",
    techStack: [
      "PyTorch",
      "Hugging Face Transformers",
      "VideoMAE",
      "MoviePy",
      "OpenCV",
      "Python",
    ],
    features: [
      {
        title: "Intelligent Emotion Recognition",
        description:
          "Utilizes the VideoMAE model (trained on Kinetics-400) to analyze video frames and detect underlying emotional themes.",
      },
      {
        title: "Context-Aware Audio",
        description:
          "Automatically selects and aligns background music that perfectly matches the detected emotion.",
      },
      {
        title: "Cinematic Visual Filters",
        description:
          "Applies fast OpenCV filters or optional ML-based Neural Style Transfer for a professional, cinematic look.",
      },
      {
        title: "Automated Transitions",
        description:
          "Programmatically applies smooth fade-in and fade-out effects for seamless scene progression.",
      },
      {
        title: "Hardware Accelerated",
        description:
          "Fully supports CUDA for rapid, GPU-accelerated video rendering and model inference.",
      },
    ],
    architecture: [
      {
        title: "Ingestion Layer",
        description:
          "Raw video files are loaded and parsed into frame sequences using MoviePy.",
      },
      {
        title: "Analysis Layer",
        description:
          "A sampled subset of frames is passed through the VideoMAE model to classify the dominant action and emotional context.",
      },
      {
        title: "Processing Layer",
        description:
          "Based on the AI analysis, OpenCV or Neural Style Transfer algorithms apply specific color grading and cinematic filters.",
      },
      {
        title: "Audio-Visual Assembly Layer",
        description:
          "The system retrieves an appropriate audio track, applies transition effects, and multiplexes the processed video with the new audio track.",
      },
    ],
    futureImprovements: [
      {
        title: "Audio Beat Synchronization",
        description:
          "Implement an audio analysis module to detect musical beats, ensuring video cuts happen exactly on the beat.",
      },
      {
        title: "Multi-Clip Narrative Stitching",
        description:
          "Expand the pipeline to ingest multiple raw clips and intelligently stitch the best moments into a cohesive narrative.",
      },
      {
        title: "Web-Based Cloud Rendering",
        description:
          "Wrap the core engine in a scalable backend framework to allow users to upload videos and render cinematic shorts via a web browser.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/shorts_maker",
  },
  {
    slug: "pso-ai-optimization",
    name: "PSO-AI-Optimization",
    category: "AI/ML",
    about:
      "PSO-AI-Optimization is an experimental research project that applies Particle Swarm Optimization (PSO)—a bio-inspired metaheuristic algorithm—to the complex problem of autonomous robot path planning. Instead of relying on traditional algorithms like A* or Dijkstra, this project utilizes swarm intelligence to discover near-optimal, collision-free routes across diverse, structured grid environments (like warehouses and mazes). The goal is to dynamically find the shortest, safest, and most energy-efficient paths using collective swarm behavior.",
    techStack: ["Python", "NumPy", "Matplotlib", "Jupyter Notebook"],
    features: [
      {
        title: "Custom PSO Engine",
        description:
          "A from-scratch implementation of Particle Swarm Optimization featuring configurable swarm sizes, iteration counts, and customizable weights.",
      },
      {
        title: "Multi-Objective Fitness Evaluation",
        description:
          "Calculates composite scores for paths based on distance, travel time, energy expenditure, and collision penalties.",
      },
      {
        title: "Environment Simulation",
        description:
          "Pre-configured to test the algorithm across 4 distinct layouts: Original, Maze, Corridor, and Warehouse.",
      },
      {
        title: "Adaptive Path Mutation",
        description:
          "Employs a path mutation operator that dynamically perturbs waypoints to ensure diversified exploration of the solution space.",
      },
      {
        title: "Analytical Visualization",
        description:
          "Features fitness convergence tracking to analyze algorithm behavior over time, paired with clear, color-coded Matplotlib grid visualizations.",
      },
    ],
    architecture: [
      {
        title: "Initialization",
        description:
          "Generates a swarm of N particles, where each particle holds a randomly generated path through the grid.",
      },
      {
        title: "Fitness Evaluation",
        description:
          "Every path is scored using a configurable fitness formula combining weighted distance, time, energy, and collision penalties.",
      },
      {
        title: "Best-State Tracking",
        description:
          "Each particle remembers its personal best path, while the system tracks the swarm's overall global best.",
      },
      {
        title: "Mutation & Exploration",
        description:
          "To explore new routes, the algorithm randomly mutates (perturbs) waypoints in the personal best paths rather than using standard velocity vectors.",
      },
      {
        title: "Convergence",
        description:
          "This loop repeats for a set number of iterations, continuously refining the routes until the global best path is finalized and returned.",
      },
    ],
    futureImprovements: [
      {
        title: "True Velocity-Based PSO",
        description:
          "Upgrade the path mutation operator to utilize proper continuous or discrete PSO velocity vectors for mathematically strict swarm movement.",
      },
      {
        title: "Dynamic Obstacles",
        description:
          "Implement real-time moving obstacles during the optimization phase to simulate unpredictable agents (like moving forklifts or human workers) on a warehouse floor.",
      },
      {
        title: "Hybridization & Benchmarking",
        description:
          "Combine the PSO algorithm with an A* algorithm for better initial population seeding, and build a benchmarking suite to directly compare performance against Genetic Algorithms and Ant Colony Optimization (ACO).",
      },
      {
        title: "Multi-Robot Coordination",
        description:
          "Expand the mathematical model to solve multi-agent path planning, ensuring collision avoidance not just with walls, but between multiple robots operating simultaneously.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/PSO-ai-optimization",
  },

  // ─── GenAI ────────────────────────────────────────────────────
  {
    slug: "ai-video-summarizer",
    name: "AI Video Summarizer",
    category: "GenAI",
    about:
      "AI Video Summarizer is an intelligent video analysis tool designed to extract meaningful, concise summaries from long-form video content. By leveraging advanced multimodal Large Language Models (LLMs), the application processes both the audio track and the visual frames. This dual-analysis ensures a comprehensive understanding of the video's context, allowing the system to generate highly accurate, AI-driven summaries through an intuitive, easy-to-use interface.",
    techStack: [
      "Python",
      "Multimodal LLMs",
      "Video Processing Libraries",
      "AI/ML Frameworks",
    ],
    features: [
      {
        title: "Multimodal Analysis",
        description:
          "Analyzes both the audio and visual components of a video to capture the full context.",
      },
      {
        title: "Automatic Summarization",
        description:
          "Instantly generates concise, accurate text summaries of long-form videos.",
      },
      {
        title: "AI-Driven Content Extraction",
        description:
          "Intelligently identifies key topics, themes, and critical data points.",
      },
      {
        title: "Streamlined UI",
        description:
          "Provides a simple, user-friendly interface for seamless video uploading and processing.",
      },
    ],
    futureImprovements: [
      {
        title: "Timestamped Highlights",
        description:
          "Automatically generate clickable timestamps that link directly to the most important moments in the video.",
      },
      {
        title: "Direct URL Integration",
        description:
          "Allow users to simply paste a YouTube or external web video URL to generate a summary.",
      },
      {
        title: "Multi-Language Translation",
        description:
          "Integrate translation models to instantly translate the generated summary into multiple languages.",
      },
      {
        title: "Export Options",
        description:
          "Add functionality to export summaries and transcripts to PDF, Notion, or Markdown formats.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/AI-vedio-Summarizer/",
  },
  {
    slug: "legalease-ai",
    name: "LegalEase AI",
    category: "GenAI",
    about:
      "LegalEase AI is a comprehensive, AI-powered platform designed to demystify complex legal documents by translating them into plain English using Google's cutting-edge Gemini 2.0 model. The platform goes beyond static document analysis by offering a built-in Chrome extension for real-time Google Meet transcription, a RAG-enhanced interactive AI chat for contextual querying, and multilingual voice support. It effectively makes enterprise-grade legal analysis and risk assessment accessible to everyone.",
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Google Gemini 2.0 Flash",
      "Vertex AI Vector Search",
      "text-embedding-004",
      "Firebase Firestore",
      "NextAuth.js",
      "Socket.IO",
      "Google STT & TTS",
      "Chrome Extension API (Manifest V3)",
    ],
    features: [
      {
        title: "RAG-Powered Document Analysis",
        description:
          "Upload contracts and agreements for AI analysis, automatic risk assessment, and plain English translation.",
      },
      {
        title: "Real-Time Meet Transcription",
        description:
          "A custom Chrome extension captures Google Meet audio and streams it via WebSockets for live legal topic analysis.",
      },
      {
        title: "Interactive Contextual Chat",
        description:
          "Query your documents using Retrieval-Augmented Generation (RAG). The AI remembers uploaded documents and their semantic content.",
      },
      {
        title: "Semantic Vector Search",
        description:
          "Find highly specific legal clauses across your entire document library using advanced vector similarity search.",
      },
      {
        title: "Multilingual Voice Capabilities",
        description:
          "Ask questions naturally using Speech-to-Text and listen to AI responses via Text-to-Speech, optimized for complex legal terminology.",
      },
    ],
    architecture: [
      {
        title: "Client Layer",
        description:
          "A Next.js web dashboard paired with a custom Manifest V3 Chrome Extension that injects into Google Meet for live audio capture.",
      },
      {
        title: "Real-Time Pipeline",
        description:
          "Socket.IO manages low-latency WebSocket connections, streaming transcription data instantly from the extension to the user's dashboard.",
      },
      {
        title: "AI & Retrieval Engine",
        description:
          "Document text is chunked, vectorized using Google's text-embedding-004, and indexed in Vertex AI. User queries trigger a hybrid search to feed into Gemini 2.0 for generation.",
      },
      {
        title: "Data Layer",
        description:
          "Firebase Firestore stores user profiles, document metadata, and chat histories, operating in tandem with the Vertex AI vector index.",
      },
      {
        title: "API Routing",
        description:
          "Robust backend endpoints (/api/analyze, /api/rag-query, /api/vector-search) orchestrate the flow between the UI, the vector database, and the Gemini APIs.",
      },
    ],
    futureImprovements: [
      {
        title: "Automated Contract Generation",
        description:
          "Introduce a feature to generate standard legal agreements based on conversational prompts and dynamically retrieve approved clauses.",
      },
      {
        title: "Multi-User Collaborative Workspaces",
        description:
          "Enable teams to simultaneously annotate, review, and interact with the AI on the same document in real-time.",
      },
      {
        title: "External Legal Database Integration",
        description:
          "Connect the RAG pipeline to public legal databases to cross-reference clauses with active laws and provide citation checking.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/LegalEase-AI",
    liveDemo: "https://www.youtube.com/watch?v=t88iDX4M7sQ",
  },

  // ─── Low Level Development ────────────────────────────────────
  {
    slug: "server-x",
    name: "Server-X",
    category: "Low Level Development",
    about:
      "Server-X is a highly performant, fully self-contained custom HTTP server and URL shortener built completely from scratch in modern C++23. Bypassing high-level web frameworks and external databases, the project relies purely on raw socket programming and file handling to serve HTTP requests, manage user sessions, and resolve shortened URLs. It demonstrates a deep understanding of network protocols, memory management, and low-level system design.",
    techStack: [
      "C++23",
      "Raw Sockets",
      "OpenSSL (SHA-256)",
      "CMake",
      "File System I/O",
      "HTML",
      "JavaScript",
      "Tailwind CSS",
    ],
    features: [
      {
        title: "Custom HTTP Server",
        description:
          "Serves static files and handles RESTful API endpoints natively without relying on external libraries.",
      },
      {
        title: "Secure Authentication Engine",
        description:
          "User registration and login utilizing SHA-256 password hashing with cryptographic salts.",
      },
      {
        title: "URL Shortening & Redirection",
        description:
          "Generates 8-character random collision-resistant hashes, tracks user-specific URL history, and detects duplicates.",
      },
      {
        title: "Custom Session Management",
        description:
          "Implements proprietary cookie-based session tokens for stateful user authentication over stateless HTTP.",
      },
      {
        title: "Zero-Dependency Database",
        description:
          "Persists user data, session states, and URL mappings entirely through highly structured, raw text file storage.",
      },
    ],
    architecture: [
      {
        title: "Networking Layer",
        description:
          "A custom socket listener binds to a specified port, accepting incoming TCP connections and parsing raw HTTP request headers.",
      },
      {
        title: "Routing Layer",
        description:
          "Decoupled logic maps specific HTTP methods and URIs to dedicated C++ handler functions.",
      },
      {
        title: "Storage & Data Access Layer",
        description:
          "database.txt acts as the user table, storing comma-separated records. url-mapping.txt functions as a fast key-value store linking hashes to destination URLs.",
      },
      {
        title: "Response Generation",
        description:
          "The server dynamically constructs valid HTTP response headers (status codes, content types, cookies) and appends HTML payloads or redirect locations.",
      },
    ],
    futureImprovements: [
      {
        title: "Thread Pooling & Concurrency",
        description:
          "Implement a thread pool or an asynchronous event loop (using epoll or kqueue) to handle thousands of concurrent TCP connections.",
      },
      {
        title: "In-Memory Caching (LRU)",
        description:
          "Build an in-memory hash map cache for frequently accessed short URLs to minimize disk I/O reads.",
      },
      {
        title: "Rate Limiting & Security",
        description:
          "Add IP-based and user-based rate limiting natively at the socket layer to protect from DDoS attacks.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/Server-X",
  },

  // ─── Automation ───────────────────────────────────────────────
  {
    slug: "codeforces-scraper",
    name: "Codeforces Scraper",
    category: "Automation",
    about:
      "The Codeforces Scraper is an automated data extraction tool designed to scrape competitive programming problem descriptions directly from the Codeforces platform. Once the raw HTML or text is extracted, the application leverages the Google Gemini API to intelligently parse the messy, unstructured data and convert it into a clean, highly structured format (such as JSON or Markdown). This makes it incredibly easy to index, store, or migrate competitive programming problems into custom databases or study platforms.",
    techStack: [
      "Python",
      "BeautifulSoup",
      "Playwright",
      "Google Gemini API",
      "JSON",
      "Pydantic",
    ],
    features: [
      {
        title: "Automated Problem Extraction",
        description:
          "Reliably fetches problem statements, input/output constraints, and test cases directly from Codeforces URLs.",
      },
      {
        title: "AI-Powered Parsing",
        description:
          "Utilizes the Gemini API to understand the context of scraped text, separating description from constraints and examples.",
      },
      {
        title: "Structured Output Generation",
        description:
          "Converts raw, unstructured webpage data into clean, machine-readable formats for seamless downstream integration.",
      },
    ],
    architecture: [
      {
        title: "Scraping Layer",
        description:
          "A web crawler navigates to the target Codeforces problem URL and extracts the raw DOM elements containing the problem statement.",
      },
      {
        title: "AI Processing Pipeline",
        description:
          "The raw text is passed to the Gemini API using a carefully engineered prompt to identify and categorize specific fields.",
      },
      {
        title: "Formatting & Output Layer",
        description:
          "The response from Gemini is validated and serialized into a structured format, ready to be saved or pushed to a database.",
      },
    ],
    futureImprovements: [
      {
        title: "Batch Scraping",
        description:
          "Implement a queue system to scrape and structure all problems from a specific contest in one go.",
      },
      {
        title: "Test Case Auto-Runner Generation",
        description:
          "Expand the AI prompt to automatically generate boilerplate test-runner code for instant local testing.",
      },
      {
        title: "Markdown/PDF Export",
        description:
          "Add formatting options to beautifully render structured JSON data into clean Markdown files or PDF documents.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/codeforces-scrapper",
  },

  // ─── Game Development ────────────────────────────────────────
  {
    slug: "pacman-x",
    name: "Pacman-X",
    category: "Game Development",
    about:
      "Pacman-X is a modern, from-scratch recreation of the classic arcade hit, Pac-Man, built entirely in C++ using the Simple and Fast Multimedia Library (SFML). It faithfully captures the nostalgic arcade experience, challenging players to navigate the iconic maze, collect pellets, evade dynamic ghosts, and strategically use power-ups to achieve high scores.",
    techStack: ["C++", "SFML"],
    features: [
      {
        title: "Classic Gameplay Mechanics",
        description:
          "Navigate the maze using arrow keys to consume all pellets while dodging enemies to progress.",
      },
      {
        title: "Dynamic Ghost AI",
        description:
          "Features distinct, dynamic behaviors for ghosts, making evasion challenging and requiring strategic movement.",
      },
      {
        title: "Power-Ups & Scoring System",
        description:
          "Includes regular pellets (10 points), power pellets (50 points) that render ghosts vulnerable, and combo-scoring for consecutive ghosts.",
      },
      {
        title: "Game State Management",
        description:
          "Accurately tracks player lives, real-time score, and handles win and loss conditions.",
      },
    ],
    architecture: [
      {
        title: "Core Game Loop",
        description:
          "A standard game loop continuously handles user inputs, updates entity states, and renders graphical frames.",
      },
      {
        title: "Entity Management",
        description:
          "An object-oriented design separates the player, enemies, and static items into distinct programmable components.",
      },
      {
        title: "Collision Detection",
        description:
          "Implements grid-based spatial logic to detect boundary hits and entity interactions.",
      },
      {
        title: "Rendering Engine",
        description:
          "Leverages SFML's hardware-accelerated graphics and window modules to draw 2D shapes, sprites, and UI text.",
      },
    ],
    futureImprovements: [
      {
        title: "Advanced Ghost AI",
        description:
          "Implement classic Pac-Man ghost algorithms (Blinky, Pinky, Inky, Clyde) for a more authentic experience.",
      },
      {
        title: "Level Progression",
        description:
          "Add multiple levels with increasing difficulty, faster ghost speeds, and diverse maze layouts.",
      },
      {
        title: "Audio-Visual Enhancements",
        description:
          "Integrate polished graphics, smooth sprite animations, and classic arcade sound effects.",
      },
      {
        title: "Social & Competitive Features",
        description:
          "Build a persistent leaderboard system and introduce local co-op or competitive multiplayer mode.",
      },
    ],
    githubLink: "https://github.com/TusharSachdeva29/Pacman-X",
  },
];
