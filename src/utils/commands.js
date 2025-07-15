const getCurrentTime = () => {
  return new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Replace getRandomQuote with API-based version
const getRandomQuote = async () => {
  try {
    const res = await fetch('https://api.quotable.io/random');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return `${data.content} – ${data.author}`;
  } catch (e) {
    return 'Could not fetch quote. Try again later.';
  }
}

const getRandomJoke = async () => {
  try {
    const res = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode&type=single');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    if (data.type === 'single') {
      return [data.joke];
    } else if (data.type === 'twopart') {
      return [data.setup, data.delivery];
    } else {
      return ['No joke found.'];
    }
  } catch (e) {
    return ['Could not fetch joke. Try again later.'];
  }
}

const createBanner = () => {
  return [
    "    █████╗       ███╗   ███╗      ███╗   ███╗       ██╗   ██╗   ",
    "   ██╔══██╗      ████╗ ████║      ████╗ ████║       ╚██╗ ██╔╝   ",
    "   ███████║      ██╔████╔██║      ██╔████╔██║        ╚████╔╝    ",
    "   ██╔══██║      ██║╚██╔╝██║      ██║╚██╔╝██║         ╚██╔╝     ",
    "   ██║  ██║      ██║ ╚═╝ ██║      ██║ ╚═╝ ██║          ██║      ",
    "   ╚═╝  ╚═╝      ╚═╝     ╚═╝      ╚═╝     ╚═╝          ╚═╝      "
  ];
};

// console.log(createBanner().joins('\n'));

const fileContents = {
  'languages.txt': [
    "Programming Languages",
    "================",
    "",
    "• Python (Advanced) - ML, AI, Web Development",
    "• C/C++ (Advanced) - System Programming, Algorithms",
    "• JavaScript (Intermediate) - Frontend Development",
    "• SQL (Intermediate) - Database Management",
    "• Bash (Intermediate) - Scripting & Automation"
  ],
  'frameworks.txt': [
    "Frameworks & Libraries",
    "===================",
    "",
    "• Flask, Django - Web Development",
    "• React, Streamlit - Frontend & UI",
    "• PyTorch, TensorFlow - Machine Learning",
    "• Pandas, NumPy - Data Processing",
    "• Scikit-learn - ML Algorithms"
  ],
  'tools.txt': [
    "Development Tools",
    "===============",
    "",
    "• Git/GitHub - Version Control",
    "• Docker - Containerization",
    "• Linux - System Administration",
    "• JIRA - Project Management",
    "• AWS/GCP - Cloud Platforms"
  ],
  'infosys.txt': [
    "🏢 Infosys Limited",
    "Role: Specialist Programmer",
    "Duration: November 2024 – Present",
    "",
    "Key Responsibilities:",
    "• Developed and deployed ML models for return prediction with 87% accuracy, improving forecasting capabilities",
    "• Designed an LLM-based HR automation tool to streamline candidate screening and communication",
    "• Built a real-time ticketing system with AI-powered ticket categorization and prioritization",
    "• Applied NLP techniques for automated email parsing and sentiment analysis, enhancing customer support workflows",
    "• Worked on Generative AI projects involving LangChain, knowledge graphs, and multi-agent decision processes (MCP)",
    "• Utilized Docker and cloud platforms to deploy AI models efficiently"
  ],
  'ratna-sagar.txt': [
    "🏢 Ratna Sagar Pvt Ltd",
    "Role: Trainee Developer",
    "Duration: June 2024 – November 2024",
    "",
    "Key Responsibilities:",
    "• Developed an NLP-powered chatbot to enhance student engagement and automate FAQs",
    "• Digitized and integrated educational content into LMS using AI-based content tagging",
    "• Implemented interactive features that boosted user engagement by 25%",
    "• Optimized system performance, reducing latency by 30%"
  ],
  'masters.txt': [
    "🏫 Master of Science (M.Sc.) in Computer Science",
    "University: Sharda University",
    "Duration: 2022 – 2024",
    "",
    "Specialization: Software Development & AI",
    "CGPA: 9.075 / 10",
    "Key Courses: Machine Learning, Data Structures, Software Engineering, AI/ML, NLP, LLMs, RAG, Prompt Engineering, LangChain, Docker, FastAPI, Git/GitHub, Linux, REST APIs, Cloud Platforms (AWS/GCP)",
    "Thesis: Optimization of Network Mapping for Intrusion Detection"
  ],
  'bachelors.txt': [
    "🏫 Bachelor of Science (B.Sc.) in Computer Science",
    "University: DAV University",
    "Duration: 2019 – 2022",
    "",
    "Major: Computer Science",
    "CGPA: 7.4 / 10",
    "Key Courses: Programming, Database Systems, Web Development",
    "Project: E-commerce Web Application"
  ],
  'docai.txt': [
    "🤖 DocAI - AI-Powered PDF Q&A System",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "📋 Project Overview:",
    "Lightweight Streamlit application that allows you to upload documents and ask",
    "questions about their content using Cohere API for natural language processing.",
    "",
    "🛠️  Technology Stack:",
    "• Streamlit - Web application framework",
    "• Cohere API - Natural language processing",
    "• Python - Core programming language",
    "• PyPDF2/pdfplumber - PDF parsing",
    "• dotenv/streamlit.secrets - API key management",
    "",
    "⚡ Key Features:",
    "• Upload PDFs or text files for analysis",
    "• Ask natural language questions about content",
    "• Fast and contextual answers using Cohere",
    "• Dark mode Streamlit UI",
    "• Secure secrets management for API keys",
    "• Support for multiple document formats",
    "",
    "📈 Impact & Results:",
    "• 95% accuracy in document question-answering",
    "• 80% faster document analysis compared to manual review",
    "• Support for 100+ page documents efficiently",
    "• 1000+ documents processed successfully",
    "",
    "🔗 GitHub: https://github.com/ammyCodex/DocAI",
    "🌐 Live Demo: https://ammy-docai.streamlit.app/"
  ],
  'querygenie.txt': [
    "🔍 QueryGenie - Natural Language to SQL",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "📋 Project Overview:",
    "Streamlit-based AI-powered SQLite assistant that lets you upload databases",
    "and interact with them using natural language queries.",
    "",
    "🛠️  Technology Stack:",
    "• Streamlit - Web application framework",
    "• Cohere API - Natural language processing",
    "• SQLite - Database management",
    "• Pandas - Data manipulation",
    "• SQLParse - SQL parsing and validation",
    "",
    "⚡ Key Features:",
    "• Upload SQLite .sqlite or .db files for instant access",
    "• Natural language to SQL generation powered by Cohere's LLM",
    "• Read-only query execution with safety blocks",
    "• Modern dark-themed chat UI with timestamps",
    "• Automatic schema detection and foreign key display",
    "• Interactive chat interface with query history",
    "",
    "📈 Impact & Results:",
    "• 95% syntactic accuracy in SQL generation",
    "• 90% reduction in SQL learning time for non-technical users",
    "• 1000+ queries processed successfully",
    "• Support for 50+ different database schemas",
    "",
    "🔗 GitHub: https://github.com/ammyCodex/QueryGenie",
    "🌐 Live Demo: https://ammy-querygenie.streamlit.app/"
  ],
  'portpulse.txt': [
    "🛡️  PortPulse - AI-Powered TCP Port Scanner",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "📋 Project Overview:",
    "Sleek Streamlit app that performs TCP connect scans on IP addresses or domains,",
    "analyzes open ports, and predicts network vulnerability risk using AI models.",
    "",
    "🛠️  Technology Stack:",
    "• Streamlit - Web application framework",
    "• Scikit-learn - AI vulnerability prediction",
    "• Python - Core programming language",
    "• Plotly - Interactive network visualization",
    "• Censys API - Host data enrichment",
    "• Pandas/Numpy - Data processing",
    "",
    "⚡ Key Features:",
    "• Fast TCP Connect scanning of user-defined port ranges",
    "• AI-driven vulnerability risk prediction (Low, Medium, High)",
    "• Real-time progress and scan status updates",
    "• Interactive network node visualization",
    "• Download scan results in JSON or CSV format",
    "• Terminal-inspired UI with dark green hacking theme",
    "",
    "📈 Impact & Results:",
    "• 99% accuracy in port scanning and vulnerability detection",
    "• 85% faster vulnerability detection compared to manual scanning",
    "• 500+ hosts scanned successfully",
    "• 1000+ ports scanned per minute",
    "",
    "🔗 GitHub: https://github.com/ammyCodex/portPulse",
    "🌐 Live Demo: https://ammy-portpulse.streamlit.app/"
  ],
  'chatbot.txt': [
    "💬 Interactive NLP Chatbot",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "📋 Project Overview:",
    "An intelligent chatbot system that provides context-aware responses",
    "and sentiment analysis for enhanced user interaction and support.",
    "",
    "🛠️  Technology Stack:",
    "• Python - Core programming language",
    "• NLP Libraries - Natural language processing",
    "• Machine Learning - Response generation",
    "• TensorFlow/PyTorch - Deep learning frameworks",
    "• NLTK/SpaCy - Text processing",
    "• Flask/FastAPI - Web framework",
    "",
    "⚡ Key Features:",
    "• Context-aware response generation",
    "• Sentiment analysis capabilities",
    "• Multi-language support",
    "• Real-time conversation handling",
    "• Learning from user interactions",
    "• Integration with external APIs",
    "",
    "📈 Impact & Results:",
    "• 40% improvement in user engagement",
    "• Enhanced customer support efficiency",
    "• Reduced response time for common queries",
    "• Improved user satisfaction scores",
    "",
    "🔗 GitHub: https://github.com/ammyCodex/Interactive-Chatbot",
    "🌐 Live Demo: [Available on GitHub]"
  ],
  'contact.txt': [
    'Name: Amisha Sharma',
    'Location: Las Vegas, Nevada',
    'Phone: +1 (702) 403-3543',
    'Email: connect.amisha.usa@gmail.com',
    'LinkedIn: linkedin.com/in/ammycodex',
    'GitHub: github.com/ammycodex'
  ]
}

const commandRegistry = {
  welcome: () => ({
    output: [
      "Welcome to <span class='text-red-400'>Amisha's Portfolio Terminal!</span> 🚀",
      "",
      "Navigate my skills, projects, experience, and more.",
      "Play <span class='text-red-400'>games</span>, get jokes, <span class='text-red-400'>AI advice</span>, or download my resume.",
      "Use <span class='text-red-400'>'ls'</span> to list directories or <span class='text-red-400'>'cd &lt;dir&gt;'</span> to navigate.",
      "",
      "Type <span class='text-red-400'>'help'</span> for all commands.",
      ""
    ]
  }),
  help: () => ({
    output: [
      'Available Commands',
      '═══════════════════════════════════════════════════════════════════════════════',
      '',
      'Navigation:',
      '├── ls               : List directories',
      '├── cd <directory>   : Change directory',
      '├── pwd              : Show current path',
      '└── cd ..            : Go back',
      '',
      'Portfolio Sections:',
      '├── cd skills        : View technical skills',
      '├── cd projects      : View project portfolio',
      '├── cd experience    : View work experience',
      '├── cd education     : View educational background',
      '├── cd publications  : View research publications',
      '├── cd about         : Learn more about me',
      '└── cd sudo-commands : View available sudo commands',
      '',
      'System Commands:',
      '├── whoami           : Show current user',
      '├── date             : Show current date/time',
      '├── clear            : Clear terminal',
      '└── cat <filename>   : Read a text file',
      '',
      'Fun & System Info:',
      '├── neofetch         : Show system info',
      '├── ammy             : Show ASCII banner',
      '├── fortune          : Get a random quote',
      '├── joke             : Get a random joke',
      '├── open resume      : Open resume',
      '└── sleep <seconds>  : Delay output',
      '',
      'Sudo Commands:',
      '├── sudo hire-amisha     : Download resume',
      '├── sudo make-me-laugh  : AI stand-up routine',
      '├── sudo mentor         : Get coding advice',
      '├── sudo matrix-rain    : Launch matrix rain effect',
      '└── sudo play-snake     : Launch snake game',
      '',
      '═══════════════════════════════════════════════════════════════════════════════',
      '',
      'Tip: Use Tab for command completion!'
    ],
    tabRecommend: true
  }),
  ls: (currentPath) => {
    const directories = {
      '~': [
        'skills/',
        'projects/',
        'experience/',
        'education/',
        'publications/',
        'about/',
        'README.md',
        'contact.txt',
        'sudo-commands/'
      ],
      '~/skills': ['languages.txt', 'frameworks.txt', 'tools.txt'],
      '~/projects': ['docai/', 'querygenie/', 'portpulse/', 'README.md'],
      '~/experience': ['infosys.txt', 'ratna-sagar.txt'],
      '~/education': ['masters.txt', 'bachelors.txt'],
      '~/publications': ['springer-2024.pdf', 'research-notes.txt'],
      '~/about': ['bio.txt', 'interests.txt', 'goals.txt'],
      '~/sudo-commands': [
        'sudo make-me-laugh',
        'sudo mentor', 
        'sudo matrix-rain',
        'sudo play-snake',
        'sudo hire-amisha'
      ]
    }
    
    const items = directories[currentPath] || ['Directory not found']
    
    // Format the output as a proper directory listing with each item on its own line
    const formattedOutput = items
    
    return {
      output: formattedOutput,
      tabRecommend: true
    }
  },

  pwd: (currentPath) => ({
    output: [`/home/amisha${currentPath.replace('~', '')}`]
  }),

  whoami: () => ({
    output: ['amisha']
  }),

  date: () => ({
    output: [getCurrentTime()]
  }),

  clear: () => ({
    output: [],
    clear: true
  }),

  'cat README.md': () => ({
    output: [
      "# Amisha Sharma - Full Stack Developer",
      "",
      "Hi there! 👋 I'm Amisha, a passionate full-stack developer",
      "who loves building intelligent systems that solve real-world problems.",
      "",
      "## Quick Facts:",
      "- 🔭 Currently working at Infosys as Specialist Programmer",
      "- 🌱 Exploring AI/ML and Generative AI",
      "- 💬 Ask me about Python, React, or NLP",
      "- 📫 Reach me at: amishasharma0912@gmail.com",
      "- ⚡ Fun fact: I love turning complex problems into simple solutions"
    ]
  }),

  'touch contact.txt': () => ({
  output: 'Contact file created.'
}),
    // Remove the hardcoded 'cat contact.txt' command from commandRegistry

  fortune: async () => ({
    output: [await getAIResponse('Share a very short fortune cookie message.')]
  }),

  joke: async () => ({
    output: await getRandomJoke()
  }),

  neofetch: () => ({
    output: [
      "                   -`                    amisha@portfolio",
      "                  .o+`                   -----------------",
      "                 `ooo/                   OS: Portfolio OS",
      "                `+oooo:                  Host: Developer Machine",
      "               `+oooooo:                 Kernel: Skills-5.0",
      "               -+oooooo+:                Uptime: 2+ years coding",
      "             `/:-:++oooo+:               Packages: 50+ projects",
      "            `/++++/+++++++:              Shell: bash",
      "           `/++++++++++++++:             Resolution: Problem Solver",
      "          `/+++ooooooooo+++/             DE: VS Code",
      "         ./ooosssso++osssssso+`          WM: Git",
      "        .oossssso-````/ossssss+`         Theme: Dark Mode",
      "       -osssssso.      :ssssssso.        Icons: Lucide React",
      "      :osssssss/        osssso+++.       Terminal: Custom React",
      "     /ossssssss/        +ssssooo/-       CPU: Coffee-powered",
      "   `/ossssso+/:-        -:/+osssso+-     Memory: Unlimited creativity",
      "  `+sso+:-`                 `.-/+oso:    ",
      " `++:.                           `-/+/   ",
      " .`                                 `/   "
    ],
    tabRecommend: true
  }),

  'ammy': () => ({
    output: [
      '    █████╗    ███╗   ███╗ ███╗   ███╗██╗   ██╗',
      '   ██╔══██╗   ████╗ ████║ ████╗ ████║╚██╗ ██╔╝',
      '   ███████║   ██╔████╔██║ ██╔████╔██║ ╚████╔╝ ',
      '   ██╔══██║   ██║╚██╔╝██║ ██║╚██╔╝██║  ╚██╔╝  ',
      '   ██║  ██║   ██║ ╚═╝ ██║ ██║ ╚═╝ ██║   ██║   ',
      '   ╚═╝  ╚═╝   ╚═╝     ╚═╝ ╚═╝     ╚═╝   ╚═╝   ',
      '',
      '        Welcome to the AMMY ASCII Banner!',
      '',
      '═══════════════════════════════════════════════════════════════════════════════',
    ],
    tabRecommend: true
  }),

  'cd skills': () => ({
    output: [
      "Technical Skills",
      "",
      "",
      "Languages:",
      "  • Python (Advanced)",
      "  • C/C++ (Advanced)",
      "  • Bash, SQL (Intermediate)",
      "  • JavaScript (Beginner)",
      "  • React (Beginner)",
      "  ",
      "",
      "AI Frameworks & Libraries:",
      "  • PyTorch, TensorFlow, Keras",
      "  • Scikit-learn, XGBoost, LightGBM",
      "  • HuggingFace Transformers, LangChain, LangGraph",
      "  • OpenAI, Azure OpenAI, Anthropic APIs",
      "",
      "GenAI Tooling & Techniques:",
      "  • Retrieval-Augmented Generation (RAG)",
      "  • Prompt Engineering, Guardrails",
      "  • Vector Databases: Pinecone, FAISS, Chroma",
      "  • Multi-Agent Systems, Toolformer Concepts",
      "",
      "Data & Preprocessing Tools:",
      "  • Pandas, NumPy, Dask",
      "  • SpaCy, NLTK, OpenCV",
      "  • Label Studio, Weights & Biases",
      "",
      "MLOps & Infrastructure:",
      "  • Docker, FastAPI, MLflow",
      "  • Git/GitHub, Linux, REST APIs",
      "  • AWS Sagemaker, GCP Vertex AI",
      "",
      "Specializations:",
      "  • Generative AI (LLMs, RAG, Agentic Workflows)",
      "  • Natural Language Processing (NLP)",
      "  • AI Threat Simulation & Red Teaming",
      "  • Model Optimization & Deployment"
    ],
    newPath: '~/skills',
    tabRecommend: true
    
  }),

  'cd projects': () => ({
    output: [
      "✨ Featured Projects",
      "═══════════════════════════════════════════════════════════════════════════════",
      "",
      "🤖 DocAI - AI-Powered PDF Q&A System",
      "├── Tech     : Streamlit, Cohere API, Python, PyPDF2, dotenv",
      "├── Features : Document Q&A, 95% accuracy, dark mode UI",
      "├── Impact   : 80% faster document analysis, 100+ page support",
      "└── Demo     : https://ammy-docai.streamlit.app/",
      "",
      "🔍 QueryGenie - Natural Language to SQL",
      "├── Tech     : Streamlit, Cohere API, SQLite, Pandas, SQLParse",
      "├── Features : NL query processing, 95% accuracy, 50+ DB support",
      "├── Impact   : 90% reduction in SQL learning time, 1000+ queries processed",
      "└── Demo     : https://ammy-querygenie.streamlit.app/",
      "",
      "🛡️ PortPulse - AI-Powered TCP Port Scanner",
      "├── Tech     : Streamlit, Scikit-learn, Python, Plotly, Censys API",
      "├── Features : TCP scanning, 99% accuracy, 1000+ ports/minute",
      "├── Impact   : 85% faster vulnerability detection, 500+ hosts scanned",
      "└── Demo     : https://ammy-portpulse.streamlit.app/",
      "",
      "💬 Interactive NLP Chatbot",
      "├── Tech     : Python, NLP libraries, Machine Learning",
      "├── Features : Context-aware responses, sentiment analysis",
      "└── Impact   : 40% improvement in user engagement",
      "🎯 Commands:",
      "• 'cat docai.txt' - Detailed DocAI project info",
      "• 'cat querygenie.txt' - Detailed QueryGenie project info", 
      "• 'cat portpulse.txt' - Detailed PortPulse project info",
      "• 'cat chatbot.txt' - Detailed Chatbot project info",
      "• 'open github' - View all projects on GitHub",
      "🌟 Explore more projects: https://github.com/ammyCodex"
    ],
    newPath: '~/projects',
    tabRecommend: true
  }),

  'cd experience': () => ({
    output: [
      "💼 Professional Experience",
      "========",
      "",
      "🏢 Infosys Limited",
      "Role: Specialist Programmer",
      "Duration: November 2024 – Present",
      "├── Built ML model for return prediction (87% accuracy)",
      "├── Designed LLM-based HR automation tool",
      "├── Developed real-time ticketing system",
      "└── Collaborated with cross-functional teams",
      "",
      "🏢 Ratna Sagar Pvt Ltd",
      "Role: Trainee Developer",
      "Duration: June 2024 – November 2024",
      "├── Developed NLP-powered chatbot",
      "├── Digitized educational content into LMS",
      "├── Enhanced user engagement through interactive features",
      "└── Improved system performance by 30%",
      "",
      "Key Achievements:",
      "• Published research paper in Springer",
      "• Led team of 3 developers in chatbot project",
      "• Mentored 5+ junior developers"
    ],
    newPath: '~/experience',
    tabRecommend: true
  }),

  'cd education': () => ({
    output: [
      "🎓 Educational Background",
      "=======",
      "",
      "🏫 Master of Science (M.Sc.) in Computer Science",
      "   University: Sharda University",
      "   Duration: 2022 – 2024",
      "   ├── Specialization: Software Development & AI",
      "   ├── CGPA: 9.075 / 10",
      "   ├── Key Courses: Machine Learning, Data Structures, Software Engineering, AI/ML, NLP, LLMs, RAG, Prompt Engineering, LangChain, Docker, FastAPI, Git/GitHub, Linux, REST APIs, Cloud Platforms (AWS/GCP)",
      "   └── Thesis: Optimization of Network Mapping for Intrusion Detection",
      "",
      "🏫 Bachelor of Science (B.Sc.) in Computer Science",
      "   University: DAV University",
      "   Duration: 2019 – 2022",
      "   ├── Major: Computer Science",
      "   ├── CGPA: 7.4 / 10",
      "   ├── Key Courses: Programming, Database Systems, Web Development",
      "   └── Project: E-commerce Web Application",
      "",
      "📚 Certifications:",
      "• AWS Academy Cloud Foundations",
      "• Introduction to Generative AI – Google Cloud",
      "• Generative AI with LLMs – DeepLearning.AI",
      "• LangChain for LLM Application Development – DeepLearning.AI",
      "• Building Systems with the ChatGPT API – DeepLearning.AI",
      "• Prompt Engineering for Developers – DeepLearning.AI",
      "• Python (Basic) – HackerRank",
      "• SQL (Basic) – HackerRank"
    ],
    newPath: '~/education',
    tabRecommend: true
  }),

  'cd publications': () => ({
    output: [
      "📄 Research Publications",
      "═══════════════════════════════════════════════════════════════════════════════",
      "",
      "📋 Published Paper:",
      "├── Title     : 'Optimization of Network Mapping for Screening",
      "│              and Intrusion Sensing Devices'",
      "├── Publisher : Springer",
      "├── Date      : April 2024",
      "└── DOI       : 10.1007/978-XXX-XXX-XXXX-X_XX",
      "",
      "🔬 Research Focus:",
      "├── Network Security & Intrusion Detection",
      "├── Machine Learning Applications in Cybersecurity",
      "└── Optimization Algorithms for Network Systems",
      "",
      "📊 Citation Metrics:",
      "├── Citations        : 12+",
      "├── h-index          : 1",
      "└── Research Impact  : Network Security Community",
      "",
      "🎯 Current Research:",
      "├── AI-driven Security Analytics",
      "└── Automated Threat Detection Systems"
    ],
    newPath: '~/publications',
    tabRecommend: true
  }),

  'cd sudo-commands': () => ({
    output: [
      '🔐 Sudo Commands Directory',
      '==============================',
      '',
      'Available sudo commands:',
      '├── sudo make-me-laugh : AI stand-up routine',
      '├── sudo mentor        : Get coding advice',
      '├── sudo matrix-rain   : Launch matrix rain effect',
      '├── sudo play-snake    : Launch snake game',
      '└── sudo hire-amisha   : Download resume',
      '',
      'Type any command to execute it directly.'
    ],
    tabRecommend: true
  }),

  'cd about': () => ({
    output: [
      "👨‍💻 About Amisha Sharma",
      "=====",
      "",
      "Hello! I'm Amisha, a passionate full-stack developer who loves",
      "building intelligent systems that bridge the gap between complex",
      "technology and real-world solutions.",
      "",
      "🚀 What drives me:",
      "   • Creating tools that simplify complex workflows",
      "   • Exploring the intersection of AI and software engineering",
      "   • Building scalable systems that make a difference",
      "   • Contributing to open-source projects",
      "",
      "🎯 Current Focus:",
      "   • Generative AI applications",
      "   • Full-stack development with React & Python",
      "   • Machine Learning model deployment",
      "   • Network security research",
      "",
      "💡 Philosophy:",
      "   'Good code is like a good joke - it needs no explanation.'",
      "   I believe in writing clean, maintainable code that solves",
      "   real problems and creates value for users.",
      "",
      "🌟 When I'm not coding:",
      "   • Reading tech blogs and research papers",
      "   • Contributing to open-source projects",
      "   • Learning new technologies",
      "   • Mentoring aspiring developers"
    ],
    newPath: '~/about',
    tabRecommend: true
  }),

  'cd ..': (currentPath) => {
    const pathParts = currentPath.split('/')
    const newPath = pathParts.length > 1 ? 
      pathParts.slice(0, -1).join('/') || '~' : '~'
    
    return {
      output: [],
      newPath: newPath
    }
  },

  'sudo hire-amisha': () => ({
    output: [
      "[sudo] password for amisha: ●●●●●●●●",
      "Access granted...",
      "Initializing resume download...",
      "██████████ 100%",
      "Resume downloaded successfully!"
    ],
    downloadUrl: '/ammy-resume.pdf',
    downloadName: 'Amisha_Sharma_Resume.pdf',
    tabRecommend: true
  }),
  'open resume': () => ({
    output: ['You can view or download the resume here: ammy-resume.pdf']
  }),
  'download resume': () => ({
    output: ['Downloading resume from /public/ammy-resume.pdf']
  }),
  'sudo download-resume': () => ({
    output: ['Downloading resume from /public/ammy-resume.pdf']
  }),
  'open github': () => ({
    output: [
      "🚀 Opening GitHub Profile...",
      "",
      "📂 GitHub: https://github.com/ammyCodex",
      "👤 Username: ammyCodex",
      "📊 Repositories: 20+ projects",
      "⭐ Stars: 50+",
      "🔄 Contributions: Active",
      "",
      "🎯 Featured Repositories:",
      "• DocAI - AI-Powered PDF Q&A System",
      "• QueryGenie - Natural Language to SQL",
      "• PortPulse - Real-time Port Scanner",
      "• Interactive-Chatbot - NLP Chatbot",
      "",
      "🔗 Direct Link: https://github.com/ammyCodex",
      "Opening in new tab..."
    ],
    openUrl: 'https://github.com/ammyCodex'
  }),

  'open resume': () => ({
    output: [
      '┌───────────────────────────────────────────────────────────────┐',
      '│  1  Amisha Sharma                                            │',
      '│  2  Full Stack Developer | AI/ML Engineer                    │',
      '│  3                                                           │',
      '│  4  Email: connect.amisha.usa@gmail.com                      │',
      '│  5  LinkedIn: linkedin.com/in/ammycodex                      │',
      '│  6  GitHub: github.com/ammycodex                             │',
      '│  7                                                           │',
      '│  8  Skills:                                                  │',
      '│  9    - Python, JavaScript, React, C/C++, SQL                │',
      '│ 10    - Machine Learning, AI, NLP                            │',
      '│ 11    - Full Stack Development, REST APIs                    │',
      '│ 12    - Docker, Git, Linux                                   │',
      '│ 13                                                           │',
      '│ 14  Experience:                                              │',
      '│ 15    - Specialist Programmer, Infosys (2024-Present)        │',
      '│ 16    - Trainee Developer, Ratna Sagar (2024)                │',
      '│ 17                                                           │',
      '│ 18  Education:                                               │',
      '│ 19    - MSc(Comp science), Sharda University (2022-2024)     │',
      '│ 20    - BSc(Comp science), DAV University (2019-2022)        │',
      '│ 21                                                           │',
      '│ 22  Achievements:                                            │',
      '│ 23    - Published research in Springer                       │',
      '│ 24    - 87% accuracy ML model for return prediction          │',
      '│ 25    - Led development of AI-powered tools                  │',
      '└──────────────────────────────────────────────────────────────┘',
      ':q to quit'
    ],
    tabRecommend: true
  }),

  sleep: (currentPath, args) => {
    const seconds = parseInt(args[0]) || 2
    return {
      output: [`Sleeping for ${seconds} seconds...`],
      delay: seconds * 1000,
      showSpinner: true
    }
  },
  'sudo make-me-laugh': async () => ({
    output: await getRandomJoke()
  }),
  'sudo mentor': async () => ({
    output: [await getAIResponse('Give me a brief, one-sentence piece of coding advice.')]
  }),
  'sudo matrix-rain': () => ({
    output: [
      '💻 MATRIX RAIN!\n',
      'Initializing matrix simulation...\n',
      '01001000 01100001 01100011 01101011 01100101 01110010 00100000 01101101 01101111 01100100 01100101 00100001\n',
      'Matrix rain effect activated...'
    ],
    launchGame: 'matrix'
  }),

  'sudo play-snake': () => ({
    output: [],
    launchGame: 'snake'
  }),
  // Add generic cat command for .txt files
  ...Object.fromEntries([
    ['cat', (currentPath, args) => {
      const filename = args[0]
      if (!filename || !filename.endsWith('.txt')) {
        return { output: ['cat: Please specify a .txt file to read.'] }
      }
      if (fileContents[filename]) {
        // Add visual feedback for file reading
        return { 
          output: [
            `📁 Reading file: ${filename}`,
            `📊 File size: ${fileContents[filename].length} lines`,
            `⏱️  Processing...`,
            "",
            ...fileContents[filename]
          ],
          tabRecommend: true
        }
      }
      return { output: [`cat: ${filename}: No such file or not readable.`] }
    }]
  ]),
  ':q': () => ({
    output: [],
    clear: true
  })
}

export const executeCommand = (input, currentPath) => {
  const [command, ...args] = input.toLowerCase().split(' ');

  // Support: sleep <seconds> <any command>
  if (command === 'sleep' && args.length > 0 && !isNaN(Number(args[0])) && args.length > 1) {
    const seconds = parseInt(args[0]) || 2;
    const restCommand = input.split(' ').slice(2).join(' ');
    return {
      output: [`Sleeping for ${seconds} seconds...`],
      delay: seconds * 1000,
      showSpinner: true,
      afterDelay: { restCommand, currentPath }
    };
  }

  if (command === 'cd') {
    const target = args.join(' ');
    if (commandRegistry[`cd ${target}`]) {
      return commandRegistry[`cd ${target}`](currentPath);
    }
    return {
      output: [`cd: ${target}: No such file or directory`]
    };
  }

  if (commandRegistry[input.toLowerCase()]) {
    return commandRegistry[input.toLowerCase()](currentPath, args);
  }

  // Handle generic 'cat <filename>' command
  if (command === 'cat' && args.length > 0) {
    return commandRegistry['cat'](currentPath, args);
  }

  return {
    output: [
      `Command '${input}' not found.`,
      "Type 'help' for a list of available commands."
    ]
  };
};

export const getAvailableCommands = () => [
  'help', 'ls', 'cd skills', 'cd projects', 'cd experience', 'cd education', 'cd publications', 'cd about', 'cd ..', 'pwd',
  'whoami', 'date', 'clear',
  'sudo hire-amisha', 'ammy', 'fortune', 'neofetch', 'open resume', 'open github', 'sleep 1', 'sleep 2', 'sleep 3', 'joke',
  'sudo make-me-laugh', 'sudo mentor', 'sudo matrix-rain', 'sudo play-snake'
];