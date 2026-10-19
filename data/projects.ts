export interface ProjectFeature {
  name: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  features: ProjectFeature[];
  architecture?: string;
  highlights?: string[]; // resume bullet points
  tech: string[];
  domains: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  category: "fullstack" | "ai" | "research" | "tool" | "ml" | "dl";
}

export const projects: Project[] = [
  // ── 01 Zerko ──────────────────────────────────────────────────
  {
    slug: "zerko",
    title: "Zerko",
    tagline: "AI mock-interview platform",
    description:
      "End-to-end AI screening platform that automates first-round interviews — candidates upload a resume, pick a role, speak or type, and receive structured scored feedback.",
    problem:
      "First-round screening is slow and inconsistent. Zerko automates it so every candidate gets the same style of interview, available at any time, with a written evaluation recruiters can compare.",
    highlights: [
      "Engineered an end-to-end AI screening platform using LangChain and Gemini 2.5 Pro for context-aware, multi-turn technical interviews with dynamic question generation.",
      "Designed an automated resume-parsing pipeline in FastAPI and Python that extracts candidate technical skills from uploaded PDFs to auto-generate personalized assessment criteria.",
      "Built an AI evaluation metrics engine that delivers structured quantitative scores and qualitative insights per answer, backed by PostgreSQL storage.",
    ],
    features: [
      {
        name: "Resume-aware questions",
        detail:
          "Questions are generated from the parsed resume and job role, adapt to earlier answers, and keep conversation context across turns.",
      },
      {
        name: "Voice interviews",
        detail:
          "Browser speech recognition with silence detection, exponential-backoff retry (3 attempts), browser-specific tuning including Brave, and automatic fallback to text input.",
      },
      {
        name: "Timed pacing",
        detail:
          "Time-based logic with 2-minute and 30-second thresholds, plus handling for candidates who give no answer.",
      },
      {
        name: "Scored feedback",
        detail:
          "Per-answer ratings on a 1–10 scale across technical competency and communication, with strengths, improvement areas, and recommendations.",
      },
      {
        name: "Authentication",
        detail:
          "NextAuth 5 with GitHub, Google OAuth, and credentials; bcrypt password hashing and middleware route protection.",
      },
    ],
    architecture:
      "A Next.js client and API layer talks to a separate FastAPI agent for all LLM work, and to PostgreSQL through Prisma. Client handles voice via Web Speech API; FastAPI hosts the interview agent, question generator, and feedback agent using LangChain + Gemini 2.5 Pro. Resumes are stored on Cloudinary; transcripts and feedback in Neon PostgreSQL.",
    tech: [
      "Next.js 15",
      "React 19",
      "FastAPI",
      "LangChain",
      "Gemini 2.5 Pro",
      "PostgreSQL",
      "Prisma",
      "NextAuth 5",
      "Cloudinary",
      "Docker",
    ],
    domains: ["AI / GenAI", "Full-stack"],
    githubUrl: "https://github.com/ABHI-Theq/Zerko",
    liveUrl: "https://zerko.vercel.app/",
    featured: true,
    category: "ai",
  },

  // ── 02 LiveCode ────────────────────────────────────────────────
  {
    slug: "livecode",
    title: "LiveCode",
    tagline: "Browser IDE with local AI assistance",
    description:
      "In-browser code editor and project playground — Monaco editor, WebContainer Node.js runtime, and context-aware AI suggestions served locally through Ollama for privacy.",
    problem:
      "Setting up a development environment is a barrier. LiveCode runs the editor, the terminal and a Node.js runtime entirely in the browser, and keeps AI assistance local through Ollama.",
    highlights: [
      "Developed a real-time collaborative code editor using React, Node.js, and Socket.IO to handle bi-directional document sync across concurrent user sessions.",
      "Integrated the remote Piston execution engine API to compile, execute, and stream output for 15+ programming languages in the browser.",
      "Designed an event-driven backend state manager in Express.js to track room membership, handle dropped connections, and preserve state synchronization.",
    ],
    features: [
      {
        name: "Multi-template projects",
        detail:
          "Start from React, Next.js, Express, Vue, Angular, or Hono templates with automatic framework detection.",
      },
      {
        name: "In-browser runtime",
        detail:
          "WebContainer provides a full Node.js environment, integrated terminal, and live preview — no server required.",
      },
      {
        name: "Editor workspace",
        detail:
          "Monaco Editor with IntelliSense, a Radix UI file explorer (create, edit, delete, rename), and resizable panels.",
      },
      {
        name: "AI code suggestions",
        detail:
          "Suggestions on typing, new lines, and trigger characters, framework-aware and togglable. Processing stays local through Ollama (CodeLlama).",
      },
      {
        name: "Accounts and projects",
        detail:
          "GitHub and Google sign-in with NextAuth v5 and a dashboard to manage saved projects.",
      },
    ],
    architecture:
      "A Next.js App Router application whose API routes handle projects, templates, and the AI suggestion endpoint. Monaco Editor with a Zustand-managed AI overlay sits client-side; WebContainer runs the Node.js runtime in the browser. Ollama serves CodeLlama locally. Data persisted via Prisma ORM on PostgreSQL.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "Monaco Editor",
      "WebContainer",
      "Ollama",
      "CodeLlama",
      "Prisma",
      "PostgreSQL",
      "NextAuth.js v5",
      "Zustand",
    ],
    domains: ["AI / GenAI", "Full-stack", "Developer tools"],
    githubUrl: "https://github.com/ABHI-Theq/LiveCode",
    liveUrl: "https://live-code-ss1v.vercel.app",
    featured: true,
    category: "tool",
  },

  // ── 03 Jerob ───────────────────────────────────────────────────
  {
    slug: "jerob",
    title: "Jerob",
    tagline: "Personal AI agent CLI",
    description:
      "Command-line AI assistant with 5 execution modes — Agent, Plan, Ask, Browse, Schedule — for autonomous end-to-end workflows driven in plain English.",
    problem:
      "Most AI tools live in a chat window. Jerob brings an agent into the terminal where code lives, keeps a human approval step for file changes, and moves recurring work off your machine.",
    highlights: [
      "Developed a modular CLI agent with 5 execution modes (Plan, Ask, Agent, Browse, Schedule) using TypeScript and Bun to orchestrate autonomous end-to-end workflows.",
      "Constructed an autonomous browser agent using Stagehand and Gemini for zero-intervention page navigation, structured data extraction, and self-evaluating retry loops.",
      "Implemented continuous 24/7 serverless research cycles via Supabase Edge Functions, secured by AES-256 credential encryption for multi-session operation.",
    ],
    features: [
      {
        name: "Agent mode",
        detail:
          "Describe a goal; the agent plans each step, stages file changes, shows a diff and waits for your approval before writing.",
      },
      {
        name: "Plan mode",
        detail:
          "Generates a multi-step plan you can review and edit before execution begins.",
      },
      {
        name: "Browser agent",
        detail:
          "Playwright automation with Gemini for DOM understanding, using your existing browser profile so you stay signed in to every site.",
      },
      {
        name: "Ask mode",
        detail:
          "Chat with workspace context, web search, and Gmail access in a single turn.",
      },
      {
        name: "Scheduler",
        detail:
          "Describe a recurring task in plain English; it is planned, saved to Supabase, and run via pg_cron + Edge Functions every minute.",
      },
      {
        name: "Telegram control",
        detail:
          "Run agent, ask, plan, and email commands from your phone; only the owner chat ID is accepted.",
      },
    ],
    architecture:
      "A Bun CLI that routes to five mode modules using the Vercel AI SDK for model calls. Providers include OpenRouter, Gemini, Anthropic, OpenAI, and Groq (last-resort fallback). Browser automation via Playwright + Stagehand with Gemini. Scheduled jobs run as Supabase Edge Functions triggered by pg_cron. Credentials encrypted locally with AES-256.",
    tech: [
      "TypeScript",
      "Bun",
      "Vercel AI SDK",
      "Playwright",
      "Stagehand",
      "Gemini",
      "Supabase",
      "pg_cron",
      "AES-256",
    ],
    domains: ["AI / GenAI", "Developer tools"],
    githubUrl: "https://github.com/ABHI-Theq/Jerob-Personal_AI_Operator",
    liveUrl: "https://www.npmjs.com/package/jerob",
    featured: true,
    category: "tool",
  },

  // ── 04 CodeSync ───────────────────────────────────────────────
  {
    slug: "codesync",
    title: "CodeSync",
    tagline: "Collaborative real-time code editor",
    description:
      "Shared browser editor for pair programming, interviews, and teaching — create a room, share the ID, and everyone edits live with group chat and multi-language code execution.",
    problem:
      "Pair programming, interviews, and teaching need a shared editor that can also run code, without anyone installing compilers. CodeSync provides both in the browser with no configuration.",
    highlights: [
      "Developed a real-time collaborative code editor using React, Node.js, and Socket.IO to handle bi-directional document sync across concurrent user sessions.",
      "Integrated the remote Piston execution engine API to compile, execute, and stream output for 15+ programming languages in the browser.",
      "Designed an event-driven backend state manager in Express.js to track room membership, handle dropped connections, and preserve state synchronization.",
    ],
    features: [
      {
        name: "Live collaboration",
        detail:
          "Changes appear instantly for everyone in the room, with user presence and typing indicators.",
      },
      {
        name: "Run code",
        detail:
          "Execution through Piston (default, free, no setup) or Judge0 as an optional premium engine, in a sandbox with timeout protection.",
      },
      {
        name: "Group chat",
        detail:
          "Built-in messaging so the team can discuss while coding, without leaving the editor.",
      },
      {
        name: "Language support",
        detail:
          "JavaScript, Python, Java, C++, C, C#, PHP, Ruby, Go, Rust, TypeScript, Kotlin, Swift, R, Bash, and SQL with syntax highlighting.",
      },
      {
        name: "Room management",
        detail:
          "Create or join rooms by unique ID; responsive layout for desktop, tablet, and mobile.",
      },
    ],
    architecture:
      "React 18 + Ace Editor client connected to an Express + Socket.IO server that fans events out per room and proxies code execution to Piston or Judge0. Backend uses UUID room IDs, express-rate-limit (10 req/min), CORS, and input validation.",
    tech: [
      "React 18",
      "Node.js",
      "Socket.IO",
      "Express.js",
      "Piston API",
      "Ace Editor",
      "Tailwind CSS",
    ],
    domains: ["Full-stack"],
    githubUrl: "https://github.com/ABHI-Theq/Code-Real-time-editor",
    liveUrl: "https://code-real-time-editor.vercel.app/",
    featured: false,
    category: "fullstack",
  },

  // ── 05 HitchAI (Agios) ────────────────────────────────────────
  {
    slug: "agios",
    title: "HitchAI",
    tagline: "Agentic technical blog generator",
    description:
      "Turns a single topic into a publication-ready technical blog post using a LangGraph multi-agent pipeline — adaptive research, parallel section writing, image generation, and format validation.",
    problem:
      "A single LLM call asked to research, plan, write, and format a long article tends to drift, repeat itself and be hard to debug. HitchAI splits the work into independent, typed stages so each step can be checked on its own.",
    features: [
      {
        name: "Adaptive research",
        detail:
          "Router classifies the topic as closed_book, hybrid, or open_book and dispatches 3–10 Tavily search queries. Results are deduplicated by URL into a typed evidence pack.",
      },
      {
        name: "Grounded parallel writing",
        detail:
          "LangGraph's Send API fans one worker out per section. Each worker only sees its own task and the evidence it is allowed to cite.",
      },
      {
        name: "Deterministic reducer",
        detail:
          "A subgraph sorts and concatenates sections with plain code, then plans images, generates them, and validates the result — no LLM for the merge step.",
      },
      {
        name: "Scarce, planned images",
        detail:
          "An image planner reads the whole article and chooses at most 3 diagrams; generation failures degrade to a visible warning, not a failed run.",
      },
      {
        name: "Format-only validation",
        detail:
          "Gemini repairs unclosed code fences, heading levels, malformed tables, and raw LaTeX at temperature 0 under a no-content-changes contract.",
      },
      {
        name: "Streamlit dashboard",
        detail:
          "Blog history, live progress, word count and reading time, preview, image gallery, and downloads — all backed by the file system.",
      },
    ],
    architecture:
      "Main LangGraph graph: Router (GPT-4.1 mini, structured output) → Research (Tavily) → Orchestrator (builds a 4–6 task Plan) → Workers (one section each via Send fan-out). Reducer subgraph: merge_content (no LLM) → decide_images (GPT-4.1 mini) → generate_and_place_images (GPT Image 1) → markdown_validator (Gemini). Typed state: Plan, Task, EvidenceItem, EvidencePack, RouterDecision, GlobalImagePlan.",
    tech: [
      "LangGraph",
      "LangChain",
      "GPT-4.1 mini",
      "GPT Image 1",
      "Gemini",
      "Tavily Search",
      "Pydantic",
      "Python 3.11",
      "Streamlit",
    ],
    domains: ["AI / GenAI"],
    githubUrl: "https://github.com/ABHI-Theq/Agios-AI_Blog_Writer",
    featured: false,
    category: "ai",
  },

  // ── 06 RanCC ──────────────────────────────────────────────────
  {
    slug: "rancc",
    title: "RanCC",
    tagline: "AI i18n automation CLI for React",
    description:
      "Fully automates react-i18next internationalization — scans JSX for hardcoded strings via Babel AST, translates with the model of your choice, and rewrites every component to call t().",
    problem:
      "Internationalizing a mid-sized app means hunting hardcoded strings across many components, inventing keys, editing each file by hand and keeping every locale in sync. RanCC automates each of those steps.",
    features: [
      {
        name: "Scan",
        detail:
          "Parses .js, .jsx, .ts, and .tsx with Babel to extract JSX text, translatable attributes, data-array keys, and alert/toast strings, then filters out CSS, SVG, and code. Supports --ai verification and --review approval.",
      },
      {
        name: "Translate",
        detail:
          "Translates the source locale into every target language. Only new keys are sent, so existing translations are preserved. Supports English, Hindi, French, German, Spanish, Italian, Portuguese, Russian, Japanese, Korean, and Chinese.",
      },
      {
        name: "Transform",
        detail:
          "Rewrites components fully through the AST: wraps strings in t(), adds useTranslation hook and import, honors your Prettier config, and is idempotent. Supports --dry-run and --backup.",
      },
      {
        name: "Maintenance commands",
        detail:
          "check lists untranslated keys, clean removes stale keys, stats shows coverage, modify-langs edits target languages, setup generates src/i18n.ts.",
      },
      {
        name: "Provider choice",
        detail:
          "Use different providers for scanning and translating — e.g. Groq for fast filtering and Claude for translation quality.",
      },
    ],
    architecture:
      "Commander-based CLI on Bun with a 3-layer scan pipeline: Babel AST extraction → optional LLM filter → optional interactive review. Translation is chunked and incremental. Transform uses @babel/parser, traverse, types, and generator to rewrite only strings already in the source locale. Provider adapters support Groq, OpenRouter, OpenAI, Anthropic, and Google Gemini.",
    tech: [
      "TypeScript",
      "Bun",
      "Babel AST",
      "Groq",
      "OpenRouter",
      "Anthropic",
      "React",
      "react-i18next",
      "Prettier",
    ],
    domains: ["AI / GenAI", "Developer tools"],
    githubUrl:
      "https://github.com/ABHI-Theq/RanCC-Scan_Translate_Transform_i18n_for_React_on_autopilot",
    liveUrl: "https://www.npmjs.com/package/rancc",
    featured: false,
    category: "tool",
  },

  // ── 07 Sign Action Recognition ────────────────────────────────
  {
    slug: "sign-action-recognition",
    title: "Sign Action Recognition",
    tagline: "Dynamic sign-language detection",
    description:
      "Recognizes sign-language actions that unfold over time — MediaPipe Holistic converts each webcam frame to landmark sequences, then a GRU recurrent network classifies the motion.",
    problem:
      "Static image classifiers miss signs defined by motion. Modeling a short sequence of body, hand, and face landmarks captures the movement itself rather than a single frozen pose.",
    features: [
      {
        name: "Landmark extraction",
        detail:
          "Each frame's pose, left hand, right hand, and face landmarks are flattened into one NumPy vector — 30 frames of 1,662 values per sample.",
      },
      {
        name: "Custom dataset",
        detail:
          "A collection script records action sequences from the webcam and saves them as .npy files. The notebook covers hello, thanks, and iloveyou.",
      },
      {
        name: "Recurrent model",
        detail:
          "A Keras Sequential model with GRU layers (LSTM variant also available) and a softmax output, trained with Adam and categorical cross-entropy.",
      },
      {
        name: "Training aids",
        detail:
          "TensorBoard logging, ModelCheckpoint on validation loss, and EarlyStopping to prevent overfitting.",
      },
      {
        name: "Live inference",
        detail:
          "A rolling buffer of frames is fed to the model and the predicted action is drawn on the video feed in real time.",
      },
    ],
    architecture:
      "Single notebook pipeline from capture to training to live prediction. Perception: OpenCV capture + MediaPipe Holistic landmarks. Features: flattened keypoints (1,662 per frame), 30-frame sequences. Model: GRU or LSTM layers → Dense softmax, evaluated on 70/30 train/test split.",
    tech: [
      "Python",
      "TensorFlow",
      "Keras",
      "MediaPipe",
      "OpenCV",
      "NumPy",
      "TensorBoard",
    ],
    domains: ["AI / GenAI", "Deep learning"],
    githubUrl:
      "https://github.com/ABHI-Theq/Sign-Action-Recognition--Dynamic-actions",
    featured: false,
    category: "dl",
  },

  // ── 09 ReckAir ────────────────────────────────────────────────
  {
    slug: "reckair",
    title: "ReckAir",
    tagline: "Predictive maintenance for wind energy",
    description:
      "Predictive-maintenance ML project for renewable energy machinery — covers cleaning, EDA, multi-model comparison, hyperparameter tuning, and export of the final model as a pickle file.",
    problem:
      "Unplanned breakdowns are expensive and failures are rare (~5.46%). The task is to flag the few failing cases early without drowning maintenance teams in false alarms.",
    features: [
      {
        name: "Imbalance-aware setup",
        detail:
          "Measures ~94.5% no-failure vs 5.46% failure and uses stratified 80/20 splitting to preserve class distribution.",
      },
      {
        name: "Model comparison",
        detail:
          "Six classifier families compared on a custom performance function covering accuracy, recall, precision, F1, and a minimum-vs-model cost ratio.",
      },
      {
        name: "Tuning",
        detail:
          "Grid search over estimators, learning rate, depth, scale_pos_weight, and sampling parameters for XGBoost.",
      },
      {
        name: "Feature importance",
        detail:
          "Anonymized features V18, V39, V36, V26, and V3 ranked as the top contributors to failure prediction.",
      },
      {
        name: "Export",
        detail:
          "Final model saved as ReckAir.pkl for deployment in a Flask or Streamlit monitoring app.",
      },
    ],
    architecture:
      "Python notebook pipeline: data loading → EDA → feature engineering → stratified split → model comparison (Logistic Regression, Decision Tree, Random Forest, SVM, XGBoost, others) → grid search tuning → joblib export. Reported results: ~99.2% accuracy (imbalance-inflated), recall ~0.88, precision ~0.97, F1 ~0.92 on best tuned XGBoost run.",
    tech: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "joblib",
    ],
    domains: ["Machine learning"],
    githubUrl: "https://github.com/ABHI-Theq/ReckAir",
    featured: false,
    category: "ml",
  },

  // ── 10 Sign Language Translation ──────────────────────────────
  {
    slug: "sign-language-translation",
    title: "Sign Language Translation",
    tagline: "Real-time hand-sign classifier",
    description:
      "Classifies static hand signs from a webcam — MediaPipe Hands extracts 21 landmarks per frame, and a classical tree-based classifier trained on those coordinates predicts the sign in real time.",
    problem:
      "Translating signs needs a lightweight model that runs in real time. Landmark features make the problem small enough for tree-based models instead of heavy image networks.",
    features: [
      {
        name: "Data capture",
        detail:
          "collect_imgs.py records webcam images into one folder per class; committed script collects 5 classes with 200 images each.",
      },
      {
        name: "Landmark dataset",
        detail:
          "create_dataset.py runs MediaPipe Hands and stores each hand's x and y coordinates, normalized by the minimum x and y, with class labels.",
      },
      {
        name: "Model comparison",
        detail:
          "ModelMaking.ipynb compares decision tree, random forest, gradient boosting, and XGBoost on an 80/20 stratified split.",
      },
      {
        name: "Live inference",
        detail:
          "inference.py loads the saved model and a label map covering A–Z, then overlays the predicted letter on the live video feed.",
      },
    ],
    architecture:
      "Three-script pipeline: collect_imgs.py (data capture) → create_dataset.py (MediaPipe landmark extraction → normalized .pkl dataset) → ModelMaking.ipynb (model comparison and export) → inference.py (live webcam prediction). Best result: Random Forest at 100% accuracy on the held-out 20% split (single-session data).",
    tech: [
      "Python",
      "MediaPipe",
      "OpenCV",
      "scikit-learn",
      "XGBoost",
      "Jupyter",
    ],
    domains: ["Machine learning"],
    githubUrl: "https://github.com/ABHI-Theq/Sign-language-Translation",
    featured: false,
    category: "ml",
  },

  // ── 11 Facial Emotion Recognition ─────────────────────────────
  {
    slug: "facial-emotion-recognition",
    title: "Facial Emotion Recognition",
    tagline: "CNN for six facial expressions",
    description:
      "TensorFlow/Keras CNN trained from scratch on a Kaggle facial-expression dataset to classify six categories: Ahegao, Angry, Happy, Neutral, Sad, and Surprise — with class-weighted loss for imbalanced data.",
    problem:
      "Emotion classes are imbalanced (Happy, Neutral, and Sad have roughly 3× more images than Angry, Ahegao, or Surprise), so the model needs a training setup that does not just favor the large classes.",
    features: [
      {
        name: "Architecture",
        detail:
          "Convolutional blocks of Conv2D, batch normalization, ReLU, and max pooling with filters rising 32→64→128→256→512→1024→2048, then global average pooling, dense layers with dropout, and a softmax output.",
      },
      {
        name: "Preprocessing",
        detail:
          "Images resized to 224×224 with horizontal flip, 15° rotation, up to 20% zoom, and up to 10% shifts.",
      },
      {
        name: "Training",
        detail:
          "Class-weighted loss, batch size 64, early stopping, learning-rate reduction on plateau, and best-model checkpointing (~32 epochs).",
      },
      {
        name: "Stratified splits",
        detail:
          "80% training, 10% validation, 10% test with class distribution preserved across all splits.",
      },
    ],
    architecture:
      "Keras Sequential model trained on a Kaggle dataset of 15,448 images across 6 classes. Reported results: ~83.14% training accuracy, ~82.52% validation accuracy, ~80.78% test accuracy. Dataset: Ahegao 1,205 · Angry 1,312 · Happy 3,739 · Neutral 4,025 · Sad 3,933 · Surprise 1,234 images.",
    tech: [
      "Python",
      "TensorFlow",
      "Keras",
      "NumPy",
      "Matplotlib",
      "Jupyter",
    ],
    domains: ["Deep learning"],
    githubUrl:
      "https://github.com/ABHI-Theq/Facial-emotion-Recognition-Model",
    featured: false,
    category: "dl",
  },

  // ── 12 Brain Tumor Detector ───────────────────────────────────
  {
    slug: "brain-tumor-detector",
    title: "Brain Tumor Detector",
    tagline: "MRI classification with CNNs",
    description:
      "Classifies MRI images into Tumour and No Tumour using two approaches: a CNN built from scratch, and a pre-trained backbone (VGG16/MobileNet) with fine-tuned final layers.",
    problem:
      "Medical image datasets are small. Comparing a from-scratch CNN with transfer learning shows how much a pre-trained backbone helps when data is limited.",
    features: [
      {
        name: "Custom CNN",
        detail:
          "Conv2D, MaxPooling2D, and Dense layers built in Keras. Demonstrates building a classifier without any pre-trained weights.",
      },
      {
        name: "Transfer learning",
        detail:
          "Pre-trained backbone (VGG16 or MobileNet) with replaced final layers and fine-tuning on the MRI dataset. Model and code included in the repository.",
      },
      {
        name: "Data preparation",
        detail:
          "Images resized and normalized, with augmentation applied to improve generalization on the small dataset.",
      },
    ],
    architecture:
      "Two parallel Keras experiments: (1) custom CNN — Conv2D + MaxPool + Dense layers trained from random initialization; (2) transfer learning — pre-trained VGG16 or MobileNet backbone with frozen base layers replaced by task-specific head, then fine-tuned end-to-end. Dataset: binary MRI images (Tumour / No Tumour).",
    tech: [
      "Python",
      "TensorFlow",
      "Keras",
      "VGG16",
      "MobileNet",
      "OpenCV",
      "NumPy",
      "Jupyter",
    ],
    domains: ["Deep learning"],
    githubUrl:
      "https://github.com/ABHI-Theq/Brain_Tumor_Detector_Model",
    featured: false,
    category: "dl",
  },

  // ── 13 Text Emotion Classification ────────────────────────────
  {
    slug: "text-emotion-classification",
    title: "Text Emotion Classification",
    tagline: "Fine-tuned Hugging Face transformers",
    description:
      "Notebook that fine-tunes and compares four pretrained transformer models — DistilBERT, BERT-base-uncased, BERT-base-cased, and RoBERTa — on the Hugging Face emotion dataset with six labels.",
    problem:
      "Choosing a pretrained model for emotion detection needs a like-for-like comparison. The notebook trains several models on the same data and evaluates them on the same metrics.",
    features: [
      {
        name: "Dataset exploration",
        detail:
          "Loads the emotion dataset with six labels — sadness, joy, love, anger, fear, and surprise — and plots the label distribution.",
      },
      {
        name: "Multi-model fine-tuning",
        detail:
          "Tokenizes and trains distilbert-base-uncased, bert-base-uncased, bert-base-cased, and roberta-base using Hugging Face Trainer and TrainingArguments.",
      },
      {
        name: "Evaluation",
        detail:
          "Accuracy, precision, recall, F1, a classification report, and confusion matrices for each model side by side.",
      },
      {
        name: "Reuse",
        detail:
          "Saves fine-tuned models with save_pretrained and reloads them with from_pretrained for inference without retraining.",
      },
    ],
    architecture:
      "Hugging Face Trainer API fine-tuning pipeline: load emotion dataset → tokenize with matching tokenizer → TrainingArguments → Trainer.train() → evaluate with classification report + confusion matrix → save_pretrained. Best model: BERT-base-uncased (exact scores in notebook outputs; joy and sadness score highest, surprise and love lower).",
    tech: [
      "Python",
      "Hugging Face Transformers",
      "PyTorch",
      "Datasets",
      "scikit-learn",
      "Pandas",
      "Matplotlib",
    ],
    domains: ["Deep learning", "AI / GenAI"],
    githubUrl:
      "https://github.com/ABHI-Theq/Text-Emotions-classification-using-HuggingFaceTransformers",
    featured: false,
    category: "dl",
  },
];
