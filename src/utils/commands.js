
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

const AI_DEV_SNIPPETS = [
  'Prefer observable metrics over vibes when shipping models.',
  'Start with a tight eval harness, then iterate on the model.',
  'Chunk semantically for RAG—not only by character count.',
  'Version your prompts like APIs: document assumptions and defaults.',
  'Cache embeddings where safe; latency and cost both improve.'
]

const getAIResponse = async () =>
  AI_DEV_SNIPPETS[Math.floor(Math.random() * AI_DEV_SNIPPETS.length)]

const formatCowsay = (raw) => {
  const msg = (raw || 'moo').slice(0, 42)
  const top = ` ${'_'.repeat(Math.min(msg.length + 2, 44))} `
  const bot = ` ${'-'.repeat(Math.min(msg.length + 2, 44))} `
  return [
    top,
    `< ${msg} >`,
    bot,
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||'
  ]
}

const rigIdentity = () => {
  const first = ['Ada', 'Grace', 'Margaret', 'Katherine', 'Frances'][Math.floor(Math.random() * 5)]
  const last = ['Lovelace', 'Hopper', 'Hamilton', 'Johnson', 'Spence'][Math.floor(Math.random() * 5)]
  return [
    'rig: synthetic persona (not PII — unix nostalgia)',
    `${first} ${last}`,
    '742 Evergreen Terrace, /dev/zero',
    'Phone: 555-01337',
    ''
  ]
}

const fakeDf = () => ({
  output: [
    'Filesystem       Size  Used Avail Use% Mounted on',
    '/dev/brain0      1.8T  612G  1.1T  37%  /',
    'tmpfs             64G   12G   52G  19%  /dev/shm',
    '/dev/nvme0n1p2   932G  818G   67G  93%  /datasets',
    'overlay           16G   16G     0 100%  /var/lib/docker/ai-stuff',
    '',
    'Tip: when /datasets hits 100%, it is scientifically time to delete old checkpoints.'
  ],
  tabRecommend: true
})

const fakeFree = () => ({
  output: [
    '               total        used        free      shared  buff/cache   available',
    'Mem:           125Gi        98Gi       4.0Gi       2.1Gi        23Gi        24Gi',
    'Swap:          8.0Gi       102Mi       7.9Gi',
    '',
    '* includes attention weights accidentally resident in RAM'
  ],
  tabRecommend: true
})

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

// console.log(createBanner().join('\n'));

const fileContents = {
  'languages.txt': [
    "Programming Languages",
    "================",
    "",
    "• Python — primary language for GenAI services, APIs, and ML pipelines",
    "• C / C++ — performance-sensitive components and algorithms",
    "• SQL — relational analytics (MySQL and similar)",
    "• JavaScript / TypeScript — dashboards and product UI (e.g. Next.js)"
  ],
  'frameworks.txt': [
    "Frameworks & AI stack",
    "====================",
    "",
    "• Flask, Django — backend APIs and enterprise integrations",
    "• Streamlit — rapid ML/GenAI demos and internal tools",
    "• LangChain — RAG, tool use, and LLM orchestration",
    "• Scikit-learn, Keras — classical ML and neural baselines",
    "• Next.js, React — role-based analytics and operator dashboards"
  ],
  'tools.txt': [
    "Platforms & MLOps",
    "================",
    "",
    "• Git, GitHub, Linux, Docker — delivery and reproducibility",
    "• REST APIs, AI inference pipelines, semantic / vector search",
    "• Vector DBs & retrieval: FAISS, Pinecone-class patterns",
    "• JIRA, Agile — delivery with cross-functional teams",
    "• Azure OpenAI, cloud ML platforms (AWS/GCP family)"
  ],
  'lab-notes.txt': [
    "Lab notebook — scratch",
    "===================",
    "",
    "e^(i*pi) + 1 = 0   // Euler says hi",
    "rank(T) <= min(m,n)  // tensors, not hype",
    "loss ↻ when learning_rate > curiosity_budget",
    "",
    "Sticker ideas:",
    "  [ ] my other car is a weight matrix",
    "  [x] I read the CUDA errata for fun",
    "",
    "Last weird bug: NaN gradients because someone logged softmax across batch dim. Again."
  ],
  'capgemini.txt': [
    "Capgemini — Bellevue, WA",
    "Role: Associate Data Scientist",
    "Duration: Mar 2026 – Present",
    "",
    "Highlights:",
    "• Architected an AI usage analytics platform across adoption, cost, and productivity for 2,800+ users.",
    "• Designed role-based dashboards (Next.js, TypeScript) so leaders see license and usage insights—reported ~40% better visibility.",
    "• Operationalized an LLM-powered assistant for role-aware insights, cutting manual analysis workload by about 30%."
  ],
  'infosys.txt': [
    "Infosys Limited",
    "Role: Specialist Programmer",
    "Duration: Nov 2024 – Feb 2026",
    "",
    "Highlights:",
    "• Delivered an AI-driven contract intelligence platform using RAG and vector embeddings for clause detection and risk scoring—~35% less manual document review.",
    "• Built high-throughput Flask REST APIs for real-time inference and ticket automation, improving backend throughput ~30%.",
    "• Led a multi-agent workforce allocation system across 100+ roles, reducing bench time by up to ~70%.",
    "• Raised LLM answer quality via prompt optimization and vector search pipelines for enterprise document retrieval."
  ],
  'masters.txt': [
    "Master of Computer Science",
    "University: Sharda University",
    "Duration: Aug 2022 – Jul 2024",
    "",
    "Focus: Software engineering, AI/ML, and security-oriented research",
    "CGPA: 9.075 / 10",
    "Key themes: ML, NLP, LLMs, RAG, prompt engineering, LangChain, Docker, FastAPI, cloud (AWS/GCP), REST APIs",
    "Thesis: Optimization of Network Mapping for Intrusion Detection"
  ],
  'bachelors.txt': [
    "Bachelor of Computer Science",
    "University: DAV University",
    "Duration: Aug 2019 – Jul 2022",
    "",
    "Major: Computer Science",
    "CGPA: 7.4 / 10",
    "Foundations: programming, database systems, web development",
    "Capstone: E-commerce web application"
  ],
  'docai.txt': [
    "DocAI — AI document intelligence",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "Overview:",
    "LLM-driven document Q&A over long PDFs with semantic chunking and embedding retrieval.",
    "",
    "Stack:",
    "• Streamlit, Python, LangChain, Azure OpenAI",
    "• Semantic chunking, contextual retrieval, summarization",
    "",
    "Outcomes (resume):",
    "• Handles 100+ page PDFs with strong answer accuracy (~92% in internal evals)",
    "",
    "Links:",
    "• GitHub: https://github.com/ammyCodex/DocAI",
    "• Live: https://ammy-docai.streamlit.app/"
  ],
  'querygenie.txt': [
    "QueryGenie — natural language to SQL",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "Overview:",
    "LLM-powered NL→SQLite engine with schema-aware prompts and safe read paths.",
    "",
    "Stack:",
    "• Streamlit, Cohere (or comparable LLM), SQLite, Pandas, SQLParse",
    "",
    "Outcomes (resume):",
    "• ~95% syntactic accuracy on generated SQL in benchmarks",
    "• Real-time querying via secure backend APIs",
    "",
    "Links:",
    "• GitHub: https://github.com/ammyCodex/QueryGenie",
    "• Live: https://ammy-querygenie.streamlit.app/"
  ],
  'clauzetta.txt': [
    "Clauzetta — AI contract intelligence",
    "═══════════════════════════════════════════════════════════════════════════════",
    "",
    "Overview:",
    "Contract analytics with LLMs, RAG pipelines, and FAISS vector search for clause extraction and compliance signals.",
    "",
    "Architecture:",
    "• Hybrid retrieval: vector similarity + keyword ranking for sharper answers",
    "",
    "Links:",
    "• Portfolio GitHub hub: https://github.com/ammyCodex",
    "• (Add repo + demo URLs when you publish the project page.)"
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
    'Location: 6296 Brave Voyager CT, Las Vegas, NV 89139',
    'Phone: +1 (702) 403-3543',
    'Email: connect.amisha.usa@gmail.com',
    'LinkedIn: linkedin.com/in/ammycodex',
    'GitHub: github.com/ammycodex',
    'LeetCode / Codeforces / Portfolio: see ID card links'
  ],
  // Added readme.md content here for generic handling
  'readme.md': [
    "# Amisha Sharma — Generative AI Engineer",
    "",
    "I design and ship production-grade systems around LLMs, RAG, semantic retrieval,",
    "and vector search—plus the Flask/FastAPI services and dashboards that make them usable.",
    "",
    "## Quick facts:",
    "- Now: Associate Data Scientist @ Capgemini (Bellevue, WA)",
    "- Previously: Specialist Programmer @ Infosys (GenAI / contracts / allocation)",
    "- Stack bias: Python, LangChain, Azure OpenAI, Next.js, Docker, Linux",
    "- Contact: connect.amisha.usa@gmail.com"
  ],
  tabRecommend: true
}

const commandRegistry = {
  welcome: () => ({
    output: [
      "Welcome to <span style='color:#22d3ee;font-weight:600;'>tensor-core</span> — Amisha's <span style='color:#e879f9;'>GenAI</span> portfolio shell.",
      "",
      "Model weights not included; <span style='color:#22d3ee'>skills</span>, <span style='color:#22d3ee'>projects</span>, and <span style='color:#22d3ee'>experience</span> are on disk.",
      "Try <span style='color:#e879f9'>games</span>, <span style='color:#e879f9'>fortune</span> / <span style='color:#e879f9'>sudo mentor</span>, or <span style='color:#22d3ee'>sudo hire-amisha</span> for the PDF résumé.",
      "Geek knobs: <span style='color:#22d3ee'>uname -a</span> · <span style='color:#22d3ee'>nvidia-smi</span> · <span style='color:#22d3ee'>htop</span> · <span style='color:#22d3ee'>cowsay hello</span> · <span style='color:#22d3ee'>man portfolio</span>",
      "Use <span style='color:#22d3ee'>'ls'</span> and <span style='color:#22d3ee'>'cd &lt;dir&gt;'</span> like a real workspace.",
      "",
      "Type <span style='color:#22d3ee'>'help'</span> for the command table.",
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
      'Unix cosplay (fake but fun):',
      '├── uname / uname -a : Kernel string',
      '├── uptime           : Load averages + uptime',
      '├── df / df -h       : Disk layout',
      '├── free / free -h   : RAM / swap joke',
      '├── env              : “Environment” variables',
      '├── dmesg            : Kernel ring buffer snippets',
      '├── htop             : ASCII process “viewer”',
      '├── lspci            : PCI devices (fiction)',
      '├── nvidia-smi       : GPU status (fiction)',
      '├── id / w           : Identity / who is logged in',
      '├── rig              : Random identity (BSD rig)',
      '├── cowsay <msg>     : ASCII cow wrapper',
      '├── hexdump          : Hex view of a secret string',
      '├── history          : Fake shell history',
      '├── sysctl ai        : One tunable knob',
      '├── man portfolio    : Manual page for this shell',
      '├── ping …           : ICMP-ish localhost (try ping -c 1 127.0.0.1)',
      '└── alias            : Fake shell aliases',
      '',
      'Sudo Commands:',
      '├── sudo hire-amisha    : Download resume',
      '├── sudo become-amisha  : Downloading... charisma.dll',
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
        'lab-notes.txt',
        'contact.txt',
        'sudo-commands/'
      ],
      '~/skills': ['languages.txt', 'frameworks.txt', 'tools.txt'],
      '~/projects': ['docai/', 'querygenie/', 'clauzetta/', 'portpulse/', 'README.md'],
      '~/experience': ['capgemini.txt', 'infosys.txt'],
      '~/education': ['masters.txt', 'bachelors.txt'],
      '~/publications': ['springer-2024.pdf', 'research-notes.txt'],
      '~/about': ['bio.txt', 'interests.txt', 'goals.txt'],
      '~/sudo-commands': [
        'sudo make-me-laugh',
        'sudo mentor', 
        'sudo matrix-rain',
        'sudo play-snake',
        'sudo hire-amisha',
        'sudo become-amisha'
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

  'touch contact.txt': () => ({
    output: 'Contact file created.'
  }),

  fortune: async () => ({
    output: [await getAIResponse('Share a very short fortune cookie message.')]
  }),

  joke: async () => ({
    output: await getRandomJoke()
  }),

  uname: () => ({
    output: ['Linux']
  }),

  'uname -a': () => ({
    output: [
      'Linux tensor-core 6.12.14-geneal #1 SMP PREEMPT_DYNAMIC portfolio ttyJS',
      'x86_64 x86_64 x86_64 GNU/Linux',
      '',
      '// “geneal” kernel: generalization bound included in .config'
    ],
    tabRecommend: true
  }),

  uptime: () => ({
    output: [
      `${getCurrentTime()} up 428 days,  3:14,  1 user,  load average: 0.41, 0.19, 0.08`,
      '',
      'Notes:',
      '• load average is suspiciously low because half the jobs are waiting on GPU',
      '• token throughput: ask your provider’s rate limit, not this shell'
    ],
    tabRecommend: true
  }),

  df: fakeDf,

  'df -h': fakeDf,

  free: fakeFree,

  'free -h': fakeFree,

  env: () => ({
    output: [
      'SHELL=/bin/bash',
      'TERM=xterm-256color',
      'USER=amisha',
      'HOME=/home/amisha',
      'PATH=/usr/local/cuda/bin:/opt/conda/bin:~/bin:/usr/bin:/bin',
      'HF_HOME=/home/amisha/.cache/huggingface',
      'TRANSFORMERS_VERBOSITY=error',
      'PYTHONHASHSEED=random',
      'OPENAI_API_KEY=sk-••••••••REDACTED',
      'AZURE_OPENAI_ENDPOINT=https://eastus.api.cognitive.microsoft.com/…',
      'CUDA_VISIBLE_DEVICES=0',
      'OMP_NUM_THREADS=8',
      'LC_TELEMETRY=off',
      'PORTFOLIO_MODE=inference_ready'
    ],
    tabRecommend: true
  }),

  dmesg: () => ({
    output: [
      '[    0.000000] Linux version 6.12.14-geneal (portfolio@tensor-core)',
      '[    2.718281] ACPI: TPM2 found — trusting hardware more than prompts',
      '[   12.345678] nvme nvme0: 2^N queues; queue depth set to “yes”',
      '[   42.000000] random: crng init done (entropy from unread arXiv tabs)',
      '[  133.713370] attention_block: considered OOM; negotiated with scheduler',
      '[  256.000000] docker0: bridge is up; impostor syndrome still attached',
      '[  512.512512] WARNING: GIL spotted in the wild (python3, PID familiar)'
    ],
    tabRecommend: true
  }),

  htop: () => ({
    output: [
      '  CPU[||||||||||||||||||||||||||||||||||||||||||||||||||||||   78.2%]   Tasks: 42, 128 thr; 1 running',
      '  Mem[|||||||||||||||||||||||||||||||||||||||||||||||||||||||||| 98.1G/125G]',
      '  Swp[|                                                            0.1G/8G]',
      '',
      '    PID USER      PRI  NI  VIRT   RES   SHR S  CPU% MEM%   TIME+  COMMAND',
      '  1337 amisha     20   0  82.4g  71.2g  12.3g R 412.  56.8  14:02:11 python3 train.py',
      '  9001 root       20   0  12.1g  11.0g  512m S  12.3  8.8   2:22:01 embedding_server',
      '  4040 amisha     20   0   2.1g  1.8g  128m S   3.1  1.4   0:41:12 node bundle.js',
      '  7    nobody     20   0  128m  12m   8m  S   0.0  0.0   0:00:01 [ksoftirqd/0]',
      '',
      'F1Help  F2Setup F3Search F4Filter F5Tree F6SortBy F7Nice - F8Nice + F9Kill'
    ],
    tabRecommend: true
  }),

  lspci: () => ({
    output: [
      '00:00.0 Host bridge: Synthetic Intel “ThinkBridge” 2000 (rev 02)',
      '00:02.0 VGA compatible controller: Imaginary RTX 5090 Ti SUPER (Marketing Edition)',
      '00:1f.2 SATA controller: NVMe pretending to be SATA for legacy BIOS vibes',
      '03:00.0 Ethernet controller: Fiber to the Coffee Machine',
      '04:00.0 Audio device: PulseAudio loopback of impostor syndrome',
      '06:00.0 Co-processor: TPM 2.0 storing only good git commit messages'
    ],
    tabRecommend: true
  }),

  'nvidia-smi': () => ({
    output: [
      '+-----------------------------------------------------------------------------------------+',
      '| NVIDIA-SMI 555.42                 Driver Version: 555.42         CUDA Version: 12.5     |',
      '|-----------------------------------------+------------------------+----------------------+',
      '| GPU  Name                  Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC     |',
      '| Fan  Temp  Perf          Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M.   |',
      '|=========================================+========================+======================|',
      '|   0  TensorCore Portfolio GPU    On    | 00000000:03:00.0  On  |                  N/A |',
      '| 42%   38C    P2             73W / 350W |  14231MiB / 16384MiB |      0%      Default |',
      '|-----------------------------------------+------------------------+----------------------+',
      '|  Processes:                                                                              |',
      '|  python3  .../embedding_server.py                      12034MiB |  “one core because GIL” |',
      '+-----------------------------------------------------------------------------------------+'
    ],
    tabRecommend: true
  }),

  id: () => ({
    output: [
      'uid=1000(amisha) gid=1000(developers) groups=1000(developers),27(sudo),994(docker),1337(ml-wizards)'
    ]
  }),

  w: () => ({
    output: [
      ' 14:32:01 up 428 days,  3:14,  1 user,  load average: 0.41, 0.19, 0.08',
      'USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT',
      'amisha   pts/0    127.0.0.1        14:31    0.00s  0.12s  0.05s -bash',
      'amisha   pts/1    ::1              14:31    0.00s  0.00s  0.00s sshd: amisha [priv]',
      '',
      '// second line is your browser pretending to be ssh. meta, not security.'
    ],
    tabRecommend: true
  }),

  rig: () => ({
    output: rigIdentity(),
    tabRecommend: true
  }),

  hexdump: () => ({
    output: [
      '00000000  48 45 4c 4c 4f 5f 57 4f  52 4c 44 0a  |HELLO_WORLD.|',
      '0000000c  64 6f 6e 74 20 70 61 6e  69 63 0a     |dont panic.|',
      '',
      '// strings are UTF-8-ish; offsets are decimal-ish; vibes are hex.'
    ],
    tabRecommend: true
  }),

  history: () => ({
    output: [
      '  501  cd ~/projects && cat docai.txt',
      '  502  python -c "import this"',
      '  503  git commit -am "fix: off-by-one in universe"',
      '  504  docker compose up -d --build 2>&1 | tee build.log',
      '  505  curl -s https://api.github.com/zen',
      '  506  export CUDA_VISIBLE_DEVICES=""  # courage mode',
      '  507  man strace   # reading for pleasure',
      '  508  sudo hire-amisha',
      '  509  neofetch',
      '  510  history'
    ],
    tabRecommend: true
  }),

  'sysctl ai': () => ({
    output: [
      'ai.overthinking = 1',
      'ai.context_window = “bigger than my calendar”',
      'ai.temperature = 0.7   // metaphorical and literal',
      '',
      'sysctl: use /proc/sys/ai/* at own risk (not a real sysctl namespace).'
    ],
    tabRecommend: true
  }),

  'man portfolio': () => ({
    output: [
      'PORTFOLIO(1)                   Ammy Manual                  PORTFOLIO(1)',
      '',
      'NAME',
      '       portfolio — interactive résumé disguised as a login shell',
      '',
      'SYNOPSIS',
      '       portfolio [OPTION]...  # there are no real options. this is the web.',
      '',
      'DESCRIPTION',
      '       A React terminal that runs entirely client-side. Commands are',
      '       JavaScript handlers, not fork(2). Still: typing feels powerful.',
      '',
      'FILES',
      '       ~/skills, ~/projects, ~/experience, … — explore with cd and cat.',
      '',
      'BUGS',
      '       Cannot actually chmod your impostor syndrome.',
      '',
      'SEE ALSO',
      '       neofetch(1), cowsay(6), real jobs(1), sleep(1)'
    ],
    tabRecommend: true
  }),

  neofetch: () => ({
    output: [
      "                   -`                    amisha@tensor-core",
      "                  .o+`                   -------------------",
      "                 `ooo/                   OS: GenAI workstation",
      "                `+oooo:                  Host: NVMe + caffeine",
      "               `+oooooo:                 Kernel: attention-5.0",
      "               -+oooooo+:                Shell: bash  (inference_ready)",
      "             `/:-:++oooo+:               Role: Generative AI Engineer",
      "            `/++++/+++++++:              Stack: Python · LangChain · RAG",
      "           `/++++++++++++++:             UI: Next.js / Streamlit",
      "          `/+++ooooooooo+++/             Vector: FAISS-class retrieval",
      "         ./ooosssso++osssssso+`          DE: VS Code + notebooks",
      "        .oossssso-    `/ossssss+`        Theme: midnight cyan / violet",
      "       -osssssso.      :ssssssso.        Terminal: this React TTY",
      "      :osssssss/        osssso+++.       GPU: [REDACTED] ;)",
      "     /ossssssss/        +ssssooo/-       Jobs: Capgemini · Infosys",
      "   `/ossssso+/:-        -:/+osssso+-     Papers: Springer 2024",
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
      "  -  Python (Advanced)",
      "  -  C/C++ (Advanced)",
      "  -  Bash, SQL (Intermediate)",
      "  -  JavaScript (Beginner)",
      "  -  React (Beginner)",
      "  ",
      "",
      "AI Frameworks & Libraries:",
      "  -  PyTorch, TensorFlow, Keras",
      "  -  Scikit-learn, XGBoost, LightGBM",
      "  -  HuggingFace Transformers, LangChain, LangGraph",
      "  -  OpenAI, Azure OpenAI, Anthropic APIs",
      "",
      "GenAI Tooling & Techniques:",
      "  -  Retrieval-Augmented Generation (RAG)",
      "  -  Prompt Engineering, Guardrails",
      "  -  Vector Databases: Pinecone, FAISS, Chroma",
      "  -  Multi-Agent Systems, Toolformer Concepts",
      "",
      "Data & Preprocessing Tools:",
      "  -  Pandas, NumPy, Dask",
      "  -  SpaCy, NLTK, OpenCV",
      "  -  Label Studio, Weights & Biases",
      "",
      "MLOps & Infrastructure:",
      "  -  Docker, FastAPI, MLflow",
      "  -  Git/GitHub, Linux, REST APIs",
      "  -  AWS Sagemaker, GCP Vertex AI",
      "",
      "Specializations:",
      "  -  Generative AI (LLMs, RAG, Agentic Workflows)",
      "  -  Natural Language Processing (NLP)",
      "  -  AI Threat Simulation & Red Teaming",
      "  -  Model Optimization & Deployment"
    ],
    newPath: '~/skills',
    tabRecommend: true
    
  }),

  'cd projects': () => ({
    output: [
      "Featured projects (résumé + lab)",
      "═══════════════════════════════════════════════════════════════════════════════",
      "",
      "DocAI — LLM document Q&A (100+ page PDFs, semantic chunking, ~92% accuracy)",
      "├── Stack: Streamlit, LangChain, Azure OpenAI, Python",
      "└── Demo: https://ammy-docai.streamlit.app/",
      "",
      "QueryGenie — NL → SQL with schema-aware prompts (~95% syntactic SQL accuracy)",
      "├── Stack: Streamlit, SQLite, Pandas, LLM APIs",
      "└── Demo: https://ammy-querygenie.streamlit.app/",
      "",
      "Clauzetta — contract analytics (LLM + RAG + FAISS hybrid retrieval)",
      "└── Details: cat clauzetta.txt",
      "",
      "PortPulse — AI-assisted TCP port scanner / risk visualization (Streamlit lab)",
      "└── Demo: https://ammy-portpulse.streamlit.app/",
      "",
      "Deep dives: cat docai.txt | cat querygenie.txt | cat clauzetta.txt | cat portpulse.txt",
      "More repos: open github"
    ],
    newPath: '~/projects',
    tabRecommend: true
  }),

  'cd experience': () => ({
    output: [
      "Professional experience",
      "(synced to public/ammy-resume.pdf)",
      "=======================",
      "",
      "Capgemini — Bellevue, WA",
      "Associate Data Scientist · Mar 2026 – Present",
      "├── AI usage analytics across 2,800+ users (adoption, cost, productivity)",
      "├── Next.js / TypeScript dashboards for license + usage visibility (~40% lift)",
      "└── LLM assistant for role-aware insights (~30% less manual analysis)",
      "",
      "Infosys",
      "Specialist Programmer · Nov 2024 – Feb 2026",
      "├── Contract intelligence: RAG + embeddings; ~35% less manual legal review",
      "├── Flask REST APIs for inference + ticket automation (~30% throughput gain)",
      "├── Multi-agent workforce placement across 100+ roles (~70% bench reduction)",
      "└── Prompt + vector retrieval tuning for enterprise document Q&A",
      "",
      "Files: cat capgemini.txt   cat infosys.txt"
    ],
    newPath: '~/experience',
    tabRecommend: true
  }),

  'cd education': () => ({
    output: [
      "Educational background",
      "=======",
      "",
      "Master of Computer Science — Sharda University",
      "   Duration: Aug 2022 – Jul 2024",
      "   ├── CGPA: 9.075 / 10",
      "   ├── Focus: software engineering, AI/ML, security-oriented thesis work",
      "   └── Thesis: Optimization of Network Mapping for Intrusion Detection",
      "",
      "Bachelor of Computer Science — DAV University",
      "   Duration: Aug 2019 – Jul 2022",
      "   ├── CGPA: 7.4 / 10",
      "   └── Capstone: E-commerce web application",
      "",
      "Certifications (selected):",
      "-  AWS Academy Cloud Foundations",
      "-  Introduction to Generative AI – Google Cloud",
      "-  Generative AI with LLMs – DeepLearning.AI",
      "-  LangChain for LLM Application Development – DeepLearning.AI",
      "-  Building Systems with the ChatGPT API – DeepLearning.AI",
      "-  Prompt Engineering for Developers – DeepLearning.AI",
      "-  Python (Basic) – HackerRank",
      "-  SQL (Basic) – HackerRank",
      "",
      "Hackathons & recognition:",
      "-  Finalist — Smart India Hackathon",
      "-  4th among 200+ teams — IBM HackOn (agentic AI, Watsonx Orchestrate)"
    ],
    newPath: '~/education',
    tabRecommend: true
  }),

  'cd publications': () => ({
    output: [
      "Research publications",
      "═══════════════════════════════════════════════════════════════════════════════",
      "",
      "Springer chapter (Apr 2024):",
      "'Optimization of Network Mapping for Screening and Intrusion Sensing Devices'",
      "",
      "Authors:",
      "Haritima Atri, Amisha Sharma, Tushar Mehrotra, Sandeep Saxena",
      "",
      "Themes: network security, intrusion detection, ML for cyber systems",
      "File: cat springer-2024.pdf (if mirrored locally) or see résumé PDF for citation."
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
      '├── sudo hire-amisha   : Download resume',
      '└── sudo become-amisha : Downloading... charisma.dll',
      '',
      'Type any command to execute it directly.'
    ],
    tabRecommend: true
  }),

  'cd about': () => ({
    output: [
      "About — Amisha Sharma",
      "=====",
      "",
      "Generative AI engineer shipping retrieval systems, LLM orchestration,",
      "and the APIs/dashboards that make models safe to run in production.",
      "",
      "What I optimize for:",
      "   -  Measurable lift (latency, cost, manual time removed)",
      "   -  Observable pipelines: evals, logging, human-in-the-loop where needed",
      "   -  Clean interfaces for operators: Next.js dashboards, Streamlit labs",
      "",
      "Current focus:",
      "   -  Usage & cost analytics for enterprise AI rollouts",
      "   -  Contract / document intelligence (RAG + vector search)",
      "   -  Multi-agent workflows for planning and allocation",
      "",
      "Offline:",
      "   -  Papers, hackathons, mentoring, and low-level C/C++ when the problem demands it"
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
  'sudo become-amisha': () => ({
    output: [
      "🧠 Installing Amisha.sh...",
      '👩‍💻 Attempting transformation...',
      '🔁 Cloning full-stack DNA...',
      '💡 Injecting intelligence...',
      "⚙️ Loading skills: Python, NLP, Full-Stack Dev, AI...",
      '✅ Transformation complete!',
      "🌟 Success! You are now 1% as awesome as Amisha 😄"
    ],
    tabRecommend: true
  }),
  'download resume': () => ({
    output: ['Downloading resume from /public/ammy-resume.pdf'],
    tabRecommend: true
  }),
  'sudo download-resume': () => ({
    output: ['Downloading resume from /public/ammy-resume.pdf'],
    tabRecommend: true
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
      "🎯 Featured repositories:",
      "-  DocAI, QueryGenie, Clauzetta, PortPulse, Interactive-Chatbot",
      "",
      "🔗 Direct Link: https://github.com/ammyCodex",
      "Opening in new tab..."
    ],
    openUrl: 'https://github.com/ammyCodex',
    tabRecommend: true
  }),

  'open resume': () => ({
    output: [
      'Opening résumé PDF (public/ammy-resume.pdf) in a new browser tab…',
      '',
      'Snapshot:',
      '• Generative AI Engineer — LLMs, RAG, vector search, production APIs',
      '• Capgemini (Associate Data Scientist) · Infosys (Specialist Programmer)',
      '• DocAI · QueryGenie · Clauzetta (+ Streamlit labs such as PortPulse)',
      '',
      'Tip: sudo hire-amisha — force-download the same file.'
    ],
    openUrl: '/ammy-resume.pdf',
    tabRecommend: true
  }),

  sleep: (currentPath, args) => {
    const seconds = parseInt(args) || 2
    return {
      output: [`Sleeping for ${seconds} seconds...`],
      delay: seconds * 1000,
      showSpinner: true
    }
  },
  'sudo make-me-laugh': async () => ({
    output: await getRandomJoke(),
    tabRecommend: true
  }),
  'sudo mentor': async () => ({
    output: [await getAIResponse('Give me a brief, one-sentence piece of coding advice.')],
    tabRecommend: true
  }),
  'sudo matrix-rain': () => ({
    output: [
      '💻 MATRIX RAIN!\n',
      'Initializing matrix simulation...\n',
      '01001000 01100001 01100011 01101011 01100101 01110010 00100000 01101101 01101111 01100100 01100101 00100001\n',
      'Matrix rain effect activated...'
    ],
    launchGame: 'matrix',
    tabRecommend: true
  }),

  'sudo play-snake': () => ({
    output: [],
    launchGame: 'snake',
    tabRecommend: true
  }),

  ...Object.fromEntries([
    ['cat', (currentPath, args) => {
      const filename = args.join(' ').trim().toLowerCase();
      if (!filename) {
        return { output: ['cat: Please specify a file to read.'] };
      }
      if (!filename.endsWith('.txt') && !filename.endsWith('.md')) {
        return { output: ['cat: Please specify a .txt or .md file to read.'] };
      }
      if (fileContents[filename]) {
        return { 
          output: [
            `📁 Reading file: ${filename}`,
            `📊 File size: ${fileContents[filename].length} lines`,
            `⏱️  Processing...`,
            "",
            ...fileContents[filename]
          ],
          tabRecommend: true
        };
      }
      return { output: [`cat: ${filename}: No such file or not readable.`] };
    }]
  ]),
  ':q': () => ({
    output: [],
    clear: true
  })
}

export const executeCommand = (input, currentPath) => {
  const loweredInput = input.toLowerCase().trim(); // Added trim() to handle leading/trailing spaces in full input
  const [command, ...args] = loweredInput.split(' ');

  // Support: sleep <seconds> <any command>
  if (command === 'sleep' && args.length > 0 && !isNaN(Number(args)) && args.length > 1) {
    const seconds = parseInt(args) || 2;
    const restCommand = args.slice(1).join(' ');
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

  // Check for exact full command match (lowered and trimmed)
  if (commandRegistry[loweredInput]) {
    return commandRegistry[loweredInput](currentPath, args);
  }

  // Handle generic 'cat <filename>' command
  if (command === 'cat' && args.length > 0) {
    return commandRegistry['cat'](currentPath, args);
  }

  if (command === 'cowsay') {
    const msg = args.join(' ').trim();
    return { output: formatCowsay(msg || 'moo — try: cowsay I love logits'), tabRecommend: true };
  }

  if (command === 'ping') {
    const rest = args.join(' ');
    const target = rest.replace(/^-c\s+\d+\s+/i, '').trim() || '127.0.0.1';
    return {
      output: [
        `PING ${target} (${target}) 56(84) bytes of data.`,
        `64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.042 ms`,
        '',
        '--- ping statistics ---',
        '1 packets transmitted, 1 received, 0% packet loss, time 0ms',
        'rtt min/avg/max/mdev = 0.042/0.042/0.042/0.000 ms',
        '',
        '// localhost always answers. unlike some production APIs.'
      ],
      tabRecommend: true
    };
  }

  if (command === 'alias') {
    return {
      output: [
        'alias please=git commit -m "please"',
        'alias coffee=sudo systemctl start caffeine',
        'alias ship-it="pytest -q && git push"',
        'alias tensorcore=ssh amisha@tensor-core',
        'alias reality=exit  # not recommended'
      ],
      tabRecommend: true
    };
  }

  return {
    output: [
      `Command '${input}' not found. `,
      "Type 'help' for a list of available commands."
    ]
  };
};

export const getAvailableCommands = () => [
  'help', 'ls', 'cd skills', 'cd projects', 'cd experience', 'cd education', 'cd publications', 'cd about', 'cd ..', 'pwd',
  'whoami', 'date', 'clear',
  'sudo hire-amisha', 'sudo become-amisha', 'ammy', 'fortune', 'neofetch', 'open resume', 'open github', 'sleep 1', 'sleep 2', 'sleep 3', 'joke',
  'sudo make-me-laugh', 'sudo mentor', 'sudo matrix-rain', 'sudo play-snake',
  'uname', 'uname -a', 'uptime', 'df', 'df -h', 'free', 'free -h', 'env', 'dmesg', 'htop', 'lspci', 'nvidia-smi',
  'id', 'w', 'rig', 'hexdump', 'history', 'sysctl ai', 'man portfolio', 'cowsay hello world', 'ping -c 1 127.0.0.1', 'alias'
];
