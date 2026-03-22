export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "fullstack" | "react" | "js";
  techStack: string[];
  liveLink: string;
  repoLink: string;
  featured?: boolean;
}

export const FullStackProjectsArray: Project[] = [
  {
    id: "fs-1",
    title: "SiteLense",
    description:
      "Enterprise-grade auditing SaaS powered by Lighthouse. Built with Next.js for scalable, real-time SEO and performance visualization.",
    image: "/projects/sitelense.png",
    category: "fullstack",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Framer Motion",
      "ApexCharts",
      "Zod",
      "Axios",
      "Bun",
      "Lighthouse",
    ],
    liveLink: "https://sitelense.lokeshwardewangan.in/",
    repoLink: "https://github.com/lokeshwardewangan/SiteLense",
    featured: true,
  },
  {
    id: "fs-2",
    title: "Trimly",
    description:
      "AWS-deployed URL shortening platform with robust click analytics. Architected with PostgreSQL and Next.js for high-throughput reliability.",
    image: "/projects/trimly.png",
    category: "fullstack",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "AWS",
      "TanStack Query",
      "Zod",
      "Bun",
    ],
    liveLink: "https://trimly.lokeshwardewangan.in/",
    repoLink: "https://github.com/lokeshwardewangan/Trimly",
    featured: true,
  },
  {
    id: "fs-3",
    title: "Budgetter",
    description:
      "Production financial dashboard actively managing expenses for 20+ users over two years. Built on an optimized Redux architecture.",
    image: "/projects/budgetter.png",
    category: "fullstack",
    techStack: [
      "React",
      "Tailwind",
      "Typescript",
      "Node.js",
      "google auth",
      "MongoDB",
      "Express",
      "Redux",
    ],
    liveLink: "https://budgetter.lokeshwardewangan.in/",
    repoLink: "https://github.com/lokeshwardewangan/Budgetter-Webapp",
    featured: true,
  },
  {
    id: "fs-4",
    title: "Qualifyrs – Mock Interview Platform",
    description:
      "AI-driven mock interview platform engineered for scalable, concurrent exam simulations and real-time AI evaluations.",
    image: "/projects/qualifyrs.jpg",
    category: "fullstack",
    techStack: [
      "Next.js",
      "MongoDB",
      "Redux",
      "zod",
      "otp signup",
      "googleauth",
      "Express.js",
      "AI SDK",
    ],
    liveLink: "https://qualifyrs.com",
    repoLink: "https://github.com/lokeshwardewangan/",
    featured: true,
  },
  {
    id: "fs-5",
    title: "PingPoint",
    description:
      "Low-latency real-time chat using WebSockets. Event-driven Node.js architecture designed to seamlessly handle high-concurrency sessions.",
    image: "/projects/chat-web-app.jpg",
    category: "fullstack",
    techStack: ["React", "Socket.io", "Node.js", "Material UI", "Express", "MongoDB"],
    liveLink: "https://pingpoint.lokeshwardewangan.in/",
    repoLink: "https://github.com/lokeshwardewangan/Real-Time-ChatApp",
  },
  {
    id: "fs-6",
    title: "AI Chat Studio",
    description:
      "High-performance conversational interface integrating Google Gemini. Optimized for rapid, stateful context generation at scale.",
    image: "/projects/chatbot.svg",
    category: "fullstack",
    techStack: ["Next.js", "AI SDK", "Google Gemini API", "Tailwind CSS"],
    liveLink: "https://assistant.lokeshwardewangan.in",
    repoLink: "https://github.com/lokeshwardewangan/AI-Chat-Studio-NextApp",
  },
  {
    id: "fs-7",
    title: "Birthday Wish Maker",
    description:
      "Interactive multimedia app delivering personalized animations for 20+ active users. Optimized for high-performance, cross-platform rendering.",
    image: "/projects/makebirthdaywish.png",
    category: "fullstack",
    techStack: ["React", "Tailwind", "Framer motion", "MongoDB", "Express"],
    liveLink: "https://wishmaker.lokeshwardewangan.in",
    repoLink: "https://github.com/lokeshwardewangan/MakeBirthdayWish",
  },
  {
    id: "fs-8",
    title: "College Canteen Project",
    description:
      "Scalable digital ordering system with Razorpay integration. Engineered to process high transaction volumes reliably during peak hours.",
    image: "/projects/smart-canteen.png",
    category: "fullstack",
    techStack: ["React", "ExpressJS", "Firebase", "Razorpay", "Bootstrap"],
    liveLink: "https://canteen-webapp.netlify.app/",
    repoLink: "https://github.com/lokeshwardewangan/Attendance-Management-WebApp",
  },
  {
    id: "fs-9",
    title: "Attendance Management",
    description:
      "Robust institutional administration platform with secure role-based access control and optimized data aggregation for dynamic reporting.",
    image: "/projects/attendance-management.png",
    category: "fullstack",
    techStack: ["React", "Node.js", "MongoDB", "ContextAPI"],
    liveLink: "https://college-attendances.netlify.app/",
    repoLink: "https://github.com/lokeshwardewangan/Attendance-Management-WebApp",
  },
  {
    id: "fs-10",
    title: "Real-Time Weather App",
    description:
      "Location-aware forecasting tool integrating scalable REST APIs. Engineered for highly efficient data fetching and real-time updates.",
    image: "/projects/real-time-weather.jpg",
    category: "fullstack",
    techStack: ["ExpressJS", "HBS", "OpenWeather API", "CSS Modules"],
    liveLink: "https://weather-report-lokeshwar.vercel.app/",
    repoLink: "https://github.com/lokeshwardewangan/Real-Time-Weather-App",
  },
];

export const ReactFrontendProjectsArray: Project[] = [
  {
    id: "react-1",
    title: "DSA Visualization",
    description:
      "Interactive visualization of Data Structures and Algorithms to help students understand complex concepts.",
    image: "/projects/dsa-visualization.jpg",
    category: "react",
    techStack: ["React", "Algorithms", "CSS Animations"],
    liveLink: "https://lokeshwar-dsa-visualize.netlify.app/",
    repoLink: "https://github.com/lokeshwardewangan/DSA-Visualization-Project",
  },
  {
    id: "react-2",
    title: "College Journal Research",
    description:
      "A digital repository for college research journals, facilitating easy access and submission of academic papers.",
    image: "/projects/ijsrgi.png",
    category: "react",
    techStack: ["React", "TailwindCSS"],
    liveLink: "https://ijsrgi.com",
    repoLink: "https://github.com/lokeshwardewangan/College-Journal-Web",
  },
  {
    id: "react-3",
    title: "Face Emotion Detector",
    description:
      "Uses browser-based AI to detect and classify facial emotions in real-time via webcam.",
    image: "/projects/emotion-detector.png",
    category: "react",
    techStack: ["React", "face-api.js"],
    liveLink: "https://livefacedetect.netlify.app",
    repoLink: "https://github.com/lokeshwardewangan/Live-Face-Insights",
  },
  {
    id: "react-4",
    title: "Text Utils",
    description:
      "A utility tool for text manipulation including case conversion, word counting, and formatting.",
    image: "/projects/text-utils.png",
    category: "react",
    techStack: ["React", "Bootstrap"],
    liveLink: "https://text-transform-tools.netlify.app/",
    repoLink: "https://github.com/lokeshwardewangan/Text-Utils-React-Webite",
  },
  {
    id: "react-5",
    title: "ToDo List in Typescript",
    description:
      "A robust task management app built to demonstrate TypeScript integration with React state management.",
    image: "/projects/todo-list.jpg",
    category: "react",
    techStack: ["React", "TypeScript", "Context API"],
    liveLink: "https://todo-list-lokeshwar.netlify.app/",
    repoLink:
      "https://github.com/lokeshwardewangan/my-portfolio-projects/blob/main/html/My-Todo-App.html",
  },
];

export const FrontendProjectsArray: Project[] = [
  {
    id: "js-1",
    title: "Online Notes",
    description: "Simple browser-based note-taking app using LocalStorage for persistence.",
    image: "/projects/online-notes.jpg", // Placeholder
    category: "js",
    techStack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    liveLink: "https://lokeshwar-creatives-v0.netlify.app/html/online-notes",
    repoLink:
      "https://github.com/lokeshwardewangan/my-portfolio-projects/blob/main/html/Online-Notes.html",
  },
  {
    id: "js-2",
    title: "Music Web App",
    description: "A clone of a music streaming interface with custom audio player controls.",
    image: "/projects/music-web-app.jpg", // Placeholder
    category: "js",
    techStack: ["HTML", "CSS", "JavaScript", "Audio API"],
    liveLink: "#",
    repoLink: "https://github.com/lokeshwardewangan/Clone-Music-Website",
  },
  {
    id: "js-3",
    title: "QR Code Generator",
    description: "Generates downloadable QR codes for any given URL or text input.",
    image: "/projects/qr-code-generator.jpg", // Placeholder
    category: "js",
    techStack: ["JavaScript", "QR Library", "DOM Manipulation"],
    liveLink: "https://lokeshwar-creatives-v0.netlify.app/html/qr-code-generator",
    repoLink:
      "https://github.com/lokeshwardewangan/my-portfolio-projects/blob/main/html/QR-code-generator.html",
  },
  {
    id: "js-4",
    title: "Set Timer",
    description: "A countdown timer and alarm clock with custom sound alerts.",
    image: "/projects/set-timer.jpg", // Placeholder
    category: "js",
    techStack: ["JavaScript", "Date Object", "Intervals"],
    liveLink: "https://lokeshwar-creatives-v0.netlify.app/html/alarm-clock",
    repoLink:
      "https://github.com/lokeshwardewangan/my-portfolio-projects/blob/main/html/Alarm-Clock.html",
  },
  {
    id: "js-5",
    title: "Calculator",
    description: "Fully functional standard calculator supporting basic arithmetic operations.",
    image: "/projects/calculator.jpg", // Placeholder
    category: "js",
    techStack: ["JavaScript", "CSS Grid", "Event Handling"],
    liveLink: "https://lokeshwar-creatives-v0.netlify.app/html/my-calculator",
    repoLink:
      "https://github.com/lokeshwardewangan/my-portfolio-projects/blob/main/html/My-Calculator.html",
  },
  {
    id: "js-6",
    title: "Random Joke",
    description: "Fetches and displays random programming jokes from a public API.",
    image: "/projects/joke.jpg", // Placeholder
    category: "js",
    techStack: ["JavaScript", "Fetch API", "Async/Await"],
    liveLink: "https://lokeshwar-creatives-v0.netlify.app/html/random-joke-app",
    repoLink:
      "https://github.com/lokeshwardewangan/my-portfolio-projects/blob/main/html/Random-Joke-App.html",
  },
  {
    id: "js-7",
    title: "Digital Clock",
    description: "A neon-styled digital clock showing current time with seconds.",
    image: "/projects/digital-clock.jpg", // Placeholder
    category: "js",
    techStack: ["JavaScript", "Date API", "CSS Effects"],
    liveLink: "https://lokeshwar-creatives-v0.netlify.app/html/clock-watch",
    repoLink:
      "https://github.com/lokeshwardewangan/my-portfolio-projects/blob/main/html/Clock-Watch.html",
  },
  {
    id: "js-8",
    title: "Password Generator",
    description: "Create strong, random passwords with customizable parameters.",
    image: "/projects/password-generator.jpg", // Placeholder
    category: "js",
    techStack: ["JavaScript", "String Manipulation", "Clipboard API"],
    liveLink: "https://lokeshwar-password-generator.netlify.app/",
    repoLink: "https://lokeshwar-password-generator.netlify.app/",
  },
  {
    id: "js-9",
    title: "Find Your Public IP",
    description: "Simple utility to display the user's current public IP address.",
    image: "/projects/find-your-ip.jpg", // Placeholder
    category: "js",
    techStack: ["JavaScript", "IP API", "XHR"],
    liveLink: "https://lokeshwar-creatives-v0.netlify.app/html/show-my-ip",
    repoLink:
      "https://github.com/lokeshwardewangan/my-portfolio-projects/blob/main/html/Show-My-IP.html",
  },
];
