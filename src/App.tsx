import React, { useState, useEffect } from "react";
import {
  Brain,
  Clock,
  Sparkles,
  Copy,
  Check,
  CheckSquare,
  AlertTriangle,
  Code,
  Terminal,
  Play,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Cpu,
  Search,
  CheckCircle2,
  ChevronRight,
  Bookmark,
  Share2,
  Download,
  Flame,
  MousePointer,
  HelpCircle,
  FileSpreadsheet,
  FileText,
  UploadCloud,
  X
} from "lucide-react";

// Academic presets for fast demos with no API key or rapid preview
const PRESETS = [
  {
    name: "Quantum Computing (Qubit State Controls)",
    rawText: `SYLLABUS & EVALUATION: QUANTUM INFORMATION SCIENCE 401
Course Objectives:
- Derive Bloch sphere physics, mathematical density matrix representations, and trace operations under mixed states.
- Understand single qubit gates: Pauli-X, Y, Z, Hadamard, Phase Shift gates. Understand non-cloning theorem.
- Deep dive on 2-qubit CNOT, SWAP, CZ gates and entanglement generation.
- Implement Grover's unstructured search circuit and quantum teleportation protocols.

ASSIGNMENTS:
Project 1: Qubit Decoherence Simulation. Design a numerical solver in Python modeling T1 (relaxation) and T2 (dephasing) decoherence envelopes under noise. Must output Lindblad master equations. Submit a 2000-word LaTeX report containing full mathematical derivation and comparison between superconducting transmon loops and ion trap processors. Due week 8.

EXAM STRUCTURE:
Final consists of 50% analytical circuit transformation proofs and 50% complexity boundaries. Warning: students often miscalculate CNOT phase kickback signs; remember that the target's phase status feeds back to the control qubit when the control is put into superposition! Many fail on Bloch normal vectors calculation.`,
    data: {
      precisionSheet: [
        {
          topic: "Bloch Sphere & Qubit State Controls",
          yieldRating: "CRITICAL",
          keyInsights: [
            "Pure state of a single qubit represented as vector: |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩.",
            "Density matrix representation ρ = |ψ⟩⟨ψ| is mandatory for mixed states; trace of ρ^2 = 1 for pure, < 1 for mixed.",
            "Visualized on Bloch sphere where θ represents latitude angle and φ represents longitude angle."
          ],
          examWarnings: [
            "Ensure coordinates lie on the surface of the sphere for pure state, and inside for mixed states.",
            "Common error: forgetting the dividing factor of 2 in θ/2 angle which alters physical outcomes."
          ]
        },
        {
          topic: "Quantum Gate Operations & Hadamards",
          yieldRating: "CRITICAL",
          keyInsights: [
            "Hadamard Gate (H) maps absolute basis states index into a 50/50 superposition: |0⟩ → (|0⟩+|1⟩)/√2.",
            "Applying H twice reverts to the original state, serving as its own inverse operator.",
            "Pauli-X behaves as a traditional NOT gate, rotating 180° around the X-axis of the Bloch sphere."
          ],
          examWarnings: [
            "Hadamard does NOT change the |i⟩ state or general complex states in the same manner. Draw out the sphere!",
            "Never construct a copy operator; the Non-Cloning Theorem proves copy operations of unknown states are mathematically impossible."
          ]
        },
        {
          topic: "Controlled-NOT Entanglement & Phase Kickback",
          yieldRating: "HIGH",
          keyInsights: [
            "CNOT Gate acts as conditional NOT; target state is inverted only if control qubit is in active state |1⟩.",
            "Phase kickback trick: putting a CNOT target in state |−⟩ results in transferring target's phase shift back to control.",
            "Enables physical entanglement, representing complex multi-particle wave functions that cannot be factored."
          ],
          examWarnings: [
            "Always check sign directions on phase kickback; students lose key exam points of 50% value on reverse operations."
          ]
        },
        {
          topic: "Unstructured Search (Grover's Algorithm)",
          yieldRating: "HIGH",
          keyInsights: [
            "Implements quadratic search speedup from O(N) to O(√N) using amplitude amplification.",
            "Repeatedly applies Oracle reflection followed by Diffusion operator to flip and stretch target state amplitude."
          ],
          examWarnings: [
            "Overshooting the optimal iterations turns search probability back down. Stop precisely at ~ π/4 * √N."
          ]
        }
      ],
      assignmentFrameworkCopilot: [
        {
          assignmentName: "Qubit Decoherence Simulation",
          description: "Numerical solver in Python modeling T1/T2 decoherence with a 2000-word LaTeX report.",
          suggestedOutline: [
            "1. Introduction: T1 Relaxation (Thermalization) vs T2 Dephasing (Phase Loss) physics.",
            "2. Mathematical Framework: Formulating Lindblad density matrix operator master equations.",
            "3. Numerical Solver: Python ODE implementation of state decay over time.",
            "4. Hardware Comparison Study: Superconducting transmon loops vs Trapped Ion processors.",
            "5. Discussion: Quantum Error Correction & Surface Codes mapping."
          ],
          checklist: [
            "Model density matrix trace over time (verify it remains ≤ 1).",
            "Generate clean matplotlib curves for superconducting loop decoherence vs trapped-ion.",
            "Incorporate Lindblad mathematical proofs with explicit jump operators.",
            "Address T2 ≤ 2*T1 physical limits in the comparative discussion."
          ],
          actionPlan: [
            "Use SciPy's solve_ivp for instant numerical simulation of Lindblad matrix equations.",
            "Avoid rewriting Bloch-Redfield code from scratch; leverage Qiskit Dynamics library.",
            "Focus LaTeX page count on physical transmon comparison; use ready-made schematics."
          ]
        }
      ],
      timeFlip: {
        traditionalStudyHours: 24,
        acamixStudyHours: 3.5,
        reclaimedHours: 20.5,
        reclaimedPercentage: 85,
        calculationExplanation: "By stripping academic administrative jargon, focusing only on high-intensity tested math theorems, and employing a clear numerical outline for week-8 simulations, study cycles drop by more than 20 hours."
      },
      techSkillRoadmap: [
        {
          stepNumber: 1,
          skill: "Master Qiskit (Python Quantum SDK)",
          actionableProject: "Build & simulate custom noisy circuits modeling quantum state collapse under simulated noise.",
          durationEstimate: "6 Hours of Practice",
          resources: [
            { title: "Qiskit SDK Documentation", type: "Documentation", url: "https://docs.quantum.ibm.com/" },
            { title: "IBM Quantum Learning Paths", type: "Course", url: "https://learning.quantum.ibm.com/" }
          ]
        },
        {
          stepNumber: 2,
          skill: "Grover's Search Implementation",
          actionableProject: "Deploy unstructured query optimization solver script mapping quadratic acceleration scenarios.",
          durationEstimate: "8 Hours of Practice",
          resources: [
            { title: "Grover's Algorithm Guide", type: "Guide", url: "https://learning.quantum.ibm.com/course/fundamentals/quantum-algorithms" },
            { title: "Introduction to Quantum Algorithms", type: "Video Playlist", url: "https://www.youtube.com/playlist?list=PLOFEBzvs-Vvp2xg9-POLJhQwtVktlYGbY" }
          ]
        },
        {
          stepNumber: 3,
          skill: "Quantum Mechanics UI Dashboard",
          actionableProject: "Build a React-based interactive Bloch Sphere vector simulator with custom rotational controls.",
          durationEstimate: "6 Hours of Practice",
          resources: [
            { title: "Three.js React Canvas Docs", type: "Documentation", url: "https://r3f.docs.pmnd.rs/getting-started/introduction" },
            { title: "Interactive Bloch Sphere Simulation", type: "Guide", url: "https://github.com/topics/bloch-sphere" }
          ]
        }
      ]
    }
  },
  {
    name: "Compiler Construction & Context-Free Grammars",
    rawText: `CSE 310: PROGRAMMING LANGUAGES AND COMPILERS
OBJECTIVES & EVALUATION SYLLABUS:
- Study Lexical Analysis: DFA/NFA conversions, regular expressions, and lexer generators like Lex/Flex.
- Syntax Analysis parsing: LL(1) parsing, LR(0), SLR(1), LALR(1) and LR(1) canonical parsers.
- Symbol Table management; static vs dynamic scoping. Types checking.
- Code generation: Abstract Syntax Trees (ASTs), 3-address intermediate representational code (3AC).

ASSIGNMENTS:
Course Project: Syntax Analyzer and Compiler Frontend. Write a recursive descent parser or LALR(1) compiler backend in Python or Java to parse a mock algebraic language with nested conditional scopes, and convert it to runnable 3AC. Must compile.

EXAMINATIONS:
Midterm consists heavily of LL(1) parse table derivation, finding FIRST and FOLLOW sets, and proving grammar ambiguity. Pitfall: Students confuse conflict resolution on shift-reduce conflicts in LALR tables! High yield questions cover canonical item sets count.`,
    data: {
      precisionSheet: [
        {
          topic: "Syntax Parsing & CFG Grammar Selection",
          yieldRating: "CRITICAL",
          keyInsights: [
            "FIRST set of a non-terminal are terminals starting sentences derived. FOLLOW sets are terminals appearing directly next to non-terminals.",
            "LL(1) is top-down parsing (one token lookahead left-to-right, leftmost derivation); LR parser is bottom-up (rightmost in reverse).",
            "LALR(1) merges states with matching core items from LR(1) to reduce overall table sizing."
          ],
          examWarnings: [
            "Check for left-recursion prior to deriving LL(1) tables; left recursive grammars can never be processed top-down.",
            "Common trap: FIRST(X) can contain empty token ε, but FOLLOW(X) will NEVER contain ε. Apply this rule in every exam proof."
          ]
        },
        {
          topic: "Lexical DFA-NFA Conversion Theory",
          yieldRating: "HIGH",
          keyInsights: [
            "Lexer scans text into tokens; parser converts linear token list to nested tree structure.",
            "NFAs are converted to DFAs via subset construction, eliminating non-deterministic state transitions and e-closures."
          ],
          examWarnings: [
            "DFAs have exactly one state output per character transition; never write duplicate path lines in exam state diagrams."
          ]
        },
        {
          topic: "AST & Intermediate Code (3AC)",
          yieldRating: "HIGH",
          keyInsights: [
            "Abstract Syntax Tree (AST) preserves semantic hierarchy, ignoring pure syntax tokens like structural semicolons or parentheses.",
            "Three-Address Code (3AC) linearizes complex mathematical nested formula trees into single operations: t1 = x + y; t2 = t1 * z."
          ],
          examWarnings: [
            "Ensure temp registers (t0, t1) are clearly declared uniquely inside target assembly simulations."
          ]
        }
      ],
      assignmentFrameworkCopilot: [
        {
          assignmentName: "LALR(1) Custom Compiler Frontend",
          description: "Python syntax analyzer compiling algebra expressions to runnable 3-address codes.",
          suggestedOutline: [
            "1. Lexer Module: Token definitions using Python regex dictionaries.",
            "2. Parser Logic: Recursive descent or parsing table mapping matching expressions.",
            "3. Symbol Table: Hierarchical dictionary resolving scope constraints & typed objects.",
            "4. Intermediate Generator: Generating sequential 3-Address Code statements (3AC)."
          ],
          checklist: [
            "Support parenthesized operations properly nested.",
            "Throw formatted syntax exceptions specifying correct line index numbers.",
            "Ensure nested if/else logic works perfectly with correct goto markers.",
            "Optimize redundant assignment declarations during compilation."
          ],
          actionPlan: [
            "Use the Python 'PLY' (Python Lex-Yacc) library or 'lark' parser; do not implement from scratch.",
            "Create a clean dictionary of scoped variable environments for symbol table fast access.",
            "Represent variable addresses with global counter: 't_counter' to simplify intermediate representation."
          ]
        }
      ],
      timeFlip: {
        traditionalStudyHours: 35,
        acamixStudyHours: 4.5,
        reclaimedHours: 30.5,
        reclaimedPercentage: 87,
        calculationExplanation: "By using PLY parser libraries, practicing canonical merge states, and bypassing administrative syllabus formatting, overall CSE compile project lifecycle code drops from days to hours."
      },
      techSkillRoadmap: [
        {
          stepNumber: 1,
          skill: "Lexical parser engineering (ANTLR)",
          actionableProject: "Build an interactive JSON parser utility in Go or TypeScript supporting nested schemas.",
          durationEstimate: "8 Hours of Practice",
          resources: [
            { title: "Official ANTLR v4 Mega Tutorial", type: "Guide", url: "https://www.antlr.org/api/index.html" },
            { title: "Writing a Parser from Scratch", type: "Course", url: "https://parser-from-scratch.thecourses.dev/" }
          ]
        },
        {
          stepNumber: 2,
          skill: "AST Visualization Tools",
          actionableProject: "Create a beautiful React-based SVG visualizer that takes clean code text and renders the AST parser object.",
          durationEstimate: "10 Hours of Practice",
          resources: [
            { title: "D3.js Tree Layout Docs", type: "Documentation", url: "https://d3js.org/d3-hierarchy/tree" },
            { title: "React Flow Interactive Canvas", type: "Interactive", url: "https://reactflow.dev/learn" }
          ]
        },
        {
          stepNumber: 3,
          skill: "WASM Compiler Play",
          actionableProject: "Compile raw math commands down to WebAssembly targets to speed calculations by 500%.",
          durationEstimate: "12 Hours of Practice",
          resources: [
            { title: "WebAssembly Developer Guide - MDN", type: "Documentation", url: "https://developer.mozilla.org/en-US/docs/WebAssembly" },
            { title: "WASM Explorer Playground", type: "Guide", url: "https://mbebenita.github.io/WasmExplorer/" }
          ]
        }
      ]
    }
  },
  {
    name: "Organic Chemistry: Carbonyl Addition & Synthesis Pathways",
    rawText: `CHEM_OB 302: ORGANIC CHEMICAL REACTIONS
Topic Areas:
- Addition of nucleophiles to aldehydes and ketones (Grignard reactions, hemiacetals, acetals).
- Nucleophilic acyl substitutions of carboxylic acid derivatives.
- Enols, enolate anions, and Aldol condensation reactions (conjugate additions, Michael reaction, Robinson annulation).
- Spectroscopic interpretation of structures: Proton NMR chemical shifts, splitting patterns, carbon-13 analysis.

ASSIGNMENTS:
Problem Sheet 3: Multi-step organic synthesis paths. Write a detailed mechanisms sheet for synthesized complex structures from standard starting chemicals (e.g. converting benzene to pharmaceutical precursors).

EXAM INFORMATION:
Highly tested areas include Grignard moisture sensitivity (zero hydration rule), oxygen-18 trace mechanism tracking, and enolate regiochemistry (kinetic vs thermodynamic enolates). Pitfalls: forgetting acid-catalyst states when shifting hemiacetals to full acetal compounds.`,
    data: {
      precisionSheet: [
        {
          topic: "Thermodynamic vs Kinetic Enolate Regiochemistry",
          yieldRating: "CRITICAL",
          keyInsights: [
            "Kinetic Enolate: Formed rapidly using strong bulky base (LDA, -78°C). Deprotonates at the least hindered α-carbon.",
            "Thermodynamic Enolate: Formed under equilibrium conditions (weak base like NaOEt, room temperature or above). Deprotonates at the more substituted α-carbon to produce a highly alkylated, stable alkene."
          ],
          examWarnings: [
            "Using LDA with protic solvent destroys kinetic selection immediately! Keep temperatures below -78°C.",
            "Remember that bulkiness of base controls kinetic deprotonation selectively."
          ]
        },
        {
          topic: "Grignard Reactions (Nucleophilic Additions)",
          yieldRating: "CRITICAL",
          keyInsights: [
            "Grignard reagent (R-MgBr) behaves as strong carbanion nucleophile, targeting carbonyl carbon.",
            "Grignard carbon addition maps ketone → tertiary alcohol, and aldehyde → secondary alcohol structures."
          ],
          examWarnings: [
            "Grignards react instantly with water/alcohol to form alkanes. Reaction containers must be 100% anhydrous (dry).",
            "In problems, do not draw Grignard reacting with compound containing acidic protons (carboxylic acid, water, alcohols)."
          ]
        },
        {
          topic: "Aldol Condensation & Michael Additions",
          yieldRating: "HIGH",
          keyInsights: [
            "Aldol Condensation links enolate with active carbonyl to form β-hydroxy carbonyl, which dehydrates to α,β-unsaturated carbonyl.",
            "Michael addition is conjugate 1,4-addition of nucleophilic enolates to α,β-unsaturated carbonyl systems."
          ],
          examWarnings: [
            "Always count your carbons explicitly before drawing products! It is incredibly easy to lose a carbon during cyclizations."
          ]
        }
      ],
      assignmentFrameworkCopilot: [
        {
          assignmentName: "Multi-Step Organic Synthesis Pathway",
          description: "Reaction mechanism outlines map converting standard starting materials into complex target pharmaceutical precursors.",
          suggestedOutline: [
            "1. Retrosynthetic Analysis: Working backwards from final product to identify key functional bonds.",
            "2. Reagent Matrix: Table showing reagents, temperatures, catalysts, and intermediates formed.",
            "3. Mechanistic Arrows: Step-by-step electron flow diagrams detailing charges and transition structures.",
            "4. Impurity analysis: Minimizing side-reactions (such as competing E2 eliminations vs SN2 substitutions)."
          ],
          checklist: [
            "Track all formal charges on oxygen and carbon in each intermediate state.",
            "Label Grignard steps anhydrous / diethyl ether conditions absolutely.",
            "Indicate kinetic enolate selection explicitly using base temperature modifiers.",
            "Verify complete carbon-count preservation between retrosynthetic fragments."
          ],
          actionPlan: [
            "Use structural abbreviations (Ph for phenyl, Ac for acetyl) to save blueprint drafting time.",
            "Categorize your reactions strictly by nucleophile activity level to pick optimal solvents easily.",
            "Utilize ready-made retrosynthetic databases (like ChemSpider) to check established industrial yields."
          ]
        }
      ],
      timeFlip: {
        traditionalStudyHours: 18,
        acamixStudyHours: 2.5,
        reclaimedHours: 15.5,
        reclaimedPercentage: 86,
        calculationExplanation: "By mapping enolate thermodynamics visually, utilizing retrospective logic matrices, and stripping narrative chemistry texts, you skip hundreds of textbook scanning minutes."
      },
      techSkillRoadmap: [
        {
          stepNumber: 1,
          skill: "Python RDKit & Molecular Graph Mining",
          actionableProject: "Write a script to parse SMILES notations and classify structural elements of target organic assets.",
          durationEstimate: "7 Hours of Practice",
          resources: [
            { title: "RDKit Official Getting Started Guide", type: "Documentation", url: "https://www.rdkit.org/docs/GettingStartedInPython.html" },
            { title: "Chemistry-Informed Machine Learning", type: "Guide", url: "https://deepchem.io/" }
          ]
        },
        {
          stepNumber: 2,
          skill: "Molecular Property Prediction ML Model",
          actionableProject: "Train a simple scikit-learn model to predict compound boiling points directly from polar surface area properties.",
          durationEstimate: "9 Hours of Practice",
          resources: [
            { title: "Scikit-Learn Regression Estimators", type: "Documentation", url: "https://scikit-learn.org/stable/supervised_learning.html" },
            { title: "Machine Learning for Chemistry Tutorial", type: "Video Playlist", url: "https://www.youtube.com/watch?v=fXvU7nre1_A" }
          ]
        },
        {
          stepNumber: 3,
          skill: "Chemical API visualizer UI",
          actionableProject: "Deploy a frontend fetching PubChem coordinates dynamically and rendering active reactive centers inside the browser.",
          durationEstimate: "8 Hours of Practice",
          resources: [
            { title: "PubChem PUG REST API Docs", type: "Documentation", url: "https://pubchem.ncbi.nlm.nih.gov/pug_rest/PUG_REST.html" },
            { title: "MDN Fetch API Guidelines", type: "Guide", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" }
          ]
        }
      ]
    }
  }
];

export default function App() {
  // State elements
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [rawTextInput, setRawTextInput] = useState<string>(PRESETS[0].rawText);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileError, setCompileError] = useState<string | null>(null);

  // Active compiled data (Defaults to Quantum Computing preset)
  const [activeData, setActiveData] = useState<typeof PRESETS[0]["data"]>(PRESETS[0].data);

  // PDF import state options
  const [selectedFile, setSelectedFile] = useState<{ name: string; mimeType: string; data: string } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isQuickScanning, setIsQuickScanning] = useState<boolean>(false);
  const [quickScanData, setQuickScanData] = useState<{
    courseTitle: string;
    instructor: string;
    chaptersCount: string;
    gradingBreakdown: string;
    scopeVerification: string;
    keyInterests: string[];
  } | null>(null);

  // Search filter for topics
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYieldRating, setSelectedYieldRating] = useState<string>("ALL");

  // Interaction highlights
  const [checkedInsights, setCheckedInsights] = useState<Record<string, boolean>>({});
  const [checkedCopilotItems, setCheckedCopilotItems] = useState<Record<string, boolean>>({});
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Self-test quiz state
  const [activeQuizTopicIndex, setActiveQuizTopicIndex] = useState<number>(-1);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizShowAnswer, setQuizShowAnswer] = useState<boolean>(false);
  const [customUserAnswer, setCustomUserAnswer] = useState<string>("");
  const [submittedQuizQuestionsCount, setSubmittedQuizQuestionsCount] = useState<number>(0);

  // Custom simulation slider (adjust reclaimed time to see the dynamic output graph representation)
  const [simulatedHoursFactor, setSimulatedHoursFactor] = useState<number>(1);

  // Terminal tool active state
  const [activeTerminalCommand, setActiveTerminalCommand] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<string>("Select a step in the modern tech-skill roadmap below to launch sandbox details...");

  // Synchronize state when custom text preset changes
  const handlePresetSelect = (index: number) => {
    setSelectedPresetIndex(index);
    setRawTextInput(PRESETS[index].rawText);
    setActiveData(PRESETS[index].data);
    setSelectedFile(null);
    setIsDragging(false);
    setQuickScanData(null);
    setIsQuickScanning(false);
    setCheckedInsights({});
    setCheckedCopilotItems({});
    setSearchQuery("");
    setSelectedYieldRating("ALL");
    setActiveQuizTopicIndex(-1);
    setQuizShowAnswer(false);
    setCustomUserAnswer("");
    setIsCompiling(false);
    setCompileError(null);
  };

  // Helper trigger to scan the uploaded PDF details instantly
  const handleTriggerQuickScan = async (fileObj: { name: string; mimeType: string; data: string }) => {
    setIsQuickScanning(true);
    setCompileError(null);
    setQuickScanData(null);
    try {
      const response = await fetch("/api/quick-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdfFile: fileObj })
      });

      if (!response.ok) {
        const errorRes = await response.json().catch(() => ({}));
        throw new Error(errorRes?.error || "Unable to parse syllabus structural layout.");
      }

      const scanResult = await response.json();
      setQuickScanData(scanResult);
    } catch (e: any) {
      console.error("Quick-scan error:", e);
      setCompileError(e?.message || "Failed to complete instant verification scan. You can still compile the full high-yield summary below.");
    } finally {
      setIsQuickScanning(false);
    }
  };

  // Helper file selector reader
  const handleFileSelect = (file: File) => {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      setCompileError("Only PDF syllabus files are supported currently.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setCompileError("PDF file size exceeds 20MB limit.");
      return;
    }

    setCompileError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(",")[1];
      const fileObj = {
        name: file.name,
        mimeType: file.type || "application/pdf",
        data: base64Data
      };
      setSelectedFile(fileObj);
      // Clear manual text to prioritize PDF analysis mode
      setRawTextInput("");
      // Automatically trigger instant structural quick scan
      handleTriggerQuickScan(fileObj);
    };
    reader.onerror = () => {
      setCompileError("Failed to read the PDF file successfully.");
    };
    reader.readAsDataURL(file);
  };

  // Compile Raw Academic Material via server model /api/process
  const handleCompile = async () => {
    setIsCompiling(true);
    setCompileError(null);
    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText: rawTextInput,
          pdfFile: selectedFile ? {
            name: selectedFile.name,
            mimeType: selectedFile.mimeType,
            data: selectedFile.data
          } : null
        }),
      });

      if (!response.ok) {
        const errMessage = await response.json();
        throw new Error(errMessage?.error || "Server compiler failure");
      }

      const parsedJSONResult = await response.json();
      setActiveData(parsedJSONResult);
      setCheckedInsights({});
      setCheckedCopilotItems({});
      setActiveQuizTopicIndex(-1);
      setQuizShowAnswer(false);
      setCustomUserAnswer("");
    } catch (error: any) {
      console.error(error);
      setCompileError(error?.message || "Failed to process academic assets. Please check backend log details.");
    } finally {
      setIsCompiling(false);
    }
  };

  // Quick Action: Pre-populate text area with empty/custom template to start from scratch
  const handleResetToBlank = () => {
    setRawTextInput(`CLASS / EXAM TITLE: [e.g. Intro to Artificial Intelligence]

SYLLABUS CONTENT:
[Paste your complex syllabus concepts, slides, text material, or lecture lists here]

ASSIGNMENT ASSIGNED:
[Paste your active project specs, instructions or homework statements here]

ADDITIONAL GUIDELINES:
[Any extra professor focus codes, guidelines, warnings or pitfalls]`);
    setSelectedFile(null);
    setIsDragging(false);
    setQuickScanData(null);
    setIsQuickScanning(false);
    setCompileError(null);
  };

  // Copy structured layout template helpers
  const handleCopyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(title);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleLaunchTerminal = (stepNumber: number, skillName: string, projectGoal: string) => {
    const formattedCommand = `npm install --save-dev ${skillName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-toolset`;
    setActiveTerminalCommand(formattedCommand);
    setTerminalOutput(`[SYSTEM SHELL]: Running virtual sandbox for ACAMIX Roadmap Step ${stepNumber}
$ ${formattedCommand}
[SUCCESS]: Installed local dependency hooks for "${skillName}"
$ acamix-forge generate-project --target="${projectGoal.replace(/["']/g, "")}"
[INFO]: Initializing modern workspace configuration structure.
[INFO]: Successfully initialized sandbox build logs.
[SUGGESTED EXERCISE]: Implement local data models representing student milestones. Ready to code!`);
  };

  // Filter topics
  const filteredTopics = activeData.precisionSheet.filter((item) => {
    const matchesSearch = item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyInsights.some(insight => insight.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedYieldRating === "ALL") return matchesSearch;
    return matchesSearch && item.yieldRating.toUpperCase() === selectedYieldRating.toUpperCase();
  });

  return (
    <div id="acamix-root" className="min-h-screen bg-[#0A0C10] text-[#E2E8F0] font-sans flex flex-col p-4 sm:p-6 md:p-8">
      {/* Visual background atmospheric elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full"></div>
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[180px] pointer-events-none rounded-full"></div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col gap-6 relative z-10">
        
        {/* Header Block according to Elite Style specifications */}
        <header id="acamix-header" className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500 text-black px-2.5 py-0.5 rounded font-black text-sm tracking-widest font-display shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                ACAMIX
              </span>
              <span className="font-light text-slate-700 text-2xl">/</span>
              <h1 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white flex items-center gap-2">
                ACADEMIC EFFICIENCY ENGINE
              </h1>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-500 font-bold mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              High-Yield Academic Compression Model Active — Verified Server-Side Gemini AI
            </p>
          </div>
          
          <div className="text-left md:text-right flex flex-col gap-1 bg-slate-900/40 p-2.5 sm:px-4 rounded-lg border border-slate-800/80">
            <div className="text-[9px] text-slate-500 uppercase tracking-widest">Active Engine Pipeline</div>
            <div className="font-mono text-xs text-slate-300 flex items-center gap-2">
              <span className="text-blue-400 font-extrabold">•</span> gemini-3.5-flash <span className="text-slate-600">|</span> 
              <span className="text-emerald-400 text-[10px]">AX-2026-DELTA</span>
            </div>
          </div>
        </header>

        {/* Input Console / Syllabus paste Area (Universal collapse drawer block) */}
        <section id="acamix-input-section" className="bg-slate-900/60 rounded-xl border border-slate-800 p-5 md:p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <Brain className="w-5 h-5 text-emerald-400" />
                University Material Deconstruction Console
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Paste complex syllabus modules, assignments documentation, past exams, or chaotic slides to synthesize high-yield resources instantly.
              </p>
            </div>

            {/* Presets and template triggers */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <span className="text-xs font-semibold text-slate-400">Load Course Preset:</span>
              <select
                id="preset-selector"
                value={selectedPresetIndex}
                onChange={(e) => handlePresetSelect(Number(e.target.value))}
                className="bg-slate-950 text-xs sm:text-sm text-emerald-400 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 font-mono flex-1 lg:flex-none cursor-pointer"
              >
                {PRESETS.map((p, i) => (
                  <option key={i} value={i}>
                    {p.name}
                  </option>
                ))}
              </select>
              <button
                id="btn-clear-blank"
                onClick={handleResetToBlank}
                className="bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs border border-slate-800 rounded px-2.5 py-1.5 transition-colors"
                title="Clear content to generate custom study sheets"
              >
                Clear / Blank
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-4">
            {/* Clear-text payload textarea */}
            <div className="lg:col-span-8 flex flex-col gap-1.5">
              <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
                Option A: Paste Syllabus or Academic Text
              </label>
              <div className="relative flex-1">
                <textarea
                  id="academic-raw-input"
                  value={rawTextInput}
                  onChange={(e) => {
                    setRawTextInput(e.target.value);
                    if (e.target.value.trim() && selectedFile) {
                      setSelectedFile(null); // Clear selected PDF to focus on manual input
                    }
                  }}
                  placeholder="Paste raw syllabus chapters, difficult lecture paragraphs, exam guides, study questions, or evaluation criteria guidelines..."
                  className="w-full h-44 bg-slate-950 text-slate-200 font-mono text-xs p-4 rounded-lg border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all leading-relaxed"
                />
                {rawTextInput.trim().length > 0 && (
                  <span className="absolute bottom-3 right-3 text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-indigo-400 font-mono">
                    {rawTextInput.trim().length} chars loaded
                  </span>
                )}
              </div>
            </div>

            {/* Drag & Drop PDF syllabus zone */}
            <div className="lg:col-span-4 flex flex-col gap-1.5">
              <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
                Option B: Import Syllabus PDF File
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileSelect(file);
                }}
                onClick={() => document.getElementById("syllabus-file-input")?.click()}
                className={`flex-1 min-h-[176px] rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-4 text-center transition-all cursor-pointer relative bg-slate-950 group ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-500/5"
                    : selectedFile
                    ? "border-emerald-500 bg-emerald-500/5"
                    : "border-slate-800 hover:border-slate-700 hover:bg-slate-900/40"
                }`}
              >
                <input
                  id="syllabus-file-input"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="flex flex-col items-center gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                    <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 animate-pulse">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="text-xs font-semibold text-white truncate max-w-[200px]" title={selectedFile.name}>
                      {selectedFile.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Ready to Analyze with Multimodal AI
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      className="mt-2 text-[10.5px] text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 px-2.5 py-1 rounded flex items-center gap-1 font-mono transition-colors"
                    >
                      <X className="w-3.5 h-3.5" /> Remove PDF
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-full bg-slate-900 group-hover:bg-slate-850 text-emerald-500 transition-colors">
                      <UploadCloud className="w-8 h-8 animate-pulse text-emerald-400" />
                    </div>
                    <div className="text-xs font-bold text-slate-300">
                      Drag & Drop Syllabus PDF Here
                    </div>
                    <div className="text-[10px] text-slate-500">
                      or click to explore files
                    </div>
                    <div className="text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded mt-1">
                      PDF, Max 20MB
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PDF Syllabus Instant Verification Preview */}
          {isQuickScanning && (
            <div className="mt-4 p-4 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-950/10 flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin shrink-0"></div>
                <div>
                  <div className="text-xs font-bold text-emerald-400 font-mono tracking-wide uppercase">Performing Instant Structural Quick-Scan...</div>
                  <div className="text-[11px] text-slate-400">Gemini is reading course codes, chapters count, grading structure, and keywords.</div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 shrink-0">
                Evaluating source integrity...
              </div>
            </div>
          )}

          {quickScanData && (
            <div className="mt-4 p-5 bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-ping shrink-0"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] absolute shrink-0"></span>
                  <h3 className="text-sm font-bold text-white font-display tracking-wide uppercase flex items-center gap-1.5 ml-1.5">
                    ✓ Syllabus Verified & Extracted Successfully
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickScanData(null)}
                  className="text-xs text-slate-400 hover:text-slate-200 hover:underline px-2 py-0.5 rounded border border-slate-800 bg-slate-900 transition-colors font-mono cursor-pointer"
                >
                  Clear Preview
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/50 flex flex-col gap-1 min-w-0">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono font-bold">Course Title</span>
                  <span className="text-xs font-bold text-white truncate" title={quickScanData.courseTitle}>
                    {quickScanData.courseTitle || "Not Found"}
                  </span>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/50 flex flex-col gap-1 min-w-0">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono font-bold">Instructor</span>
                  <span className="text-xs font-semibold text-slate-300 truncate" title={quickScanData.instructor}>
                    {quickScanData.instructor || "Not Listed"}
                  </span>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/50 flex flex-col gap-1 min-w-0">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono font-bold">Chapters / Duration</span>
                  <span className="text-xs font-semibold text-slate-300 truncate" title={quickScanData.chaptersCount}>
                    {quickScanData.chaptersCount || "Not Found"}
                  </span>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/50 flex flex-col gap-1 min-w-0">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono font-bold">Grading Breakdown</span>
                  <span className="text-xs font-semibold text-emerald-400 truncate" title={quickScanData.gradingBreakdown}>
                    {quickScanData.gradingBreakdown || "No weights specified"}
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/40 mb-3">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono font-bold block mb-1">Scope Synopsis</span>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{quickScanData.scopeVerification}"
                </p>
              </div>

              {quickScanData.keyInterests && quickScanData.keyInterests.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono font-bold mr-1">Identified Major Themes:</span>
                  {quickScanData.keyInterests.map((interest, iIdx) => (
                    <span key={iIdx} className="bg-emerald-950/40 text-emerald-300 border border-emerald-900/50 rounded-md px-2.5 py-0.5 text-[10px] font-mono shadow-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {compileError && (
            <div id="compiler-error-banner" className="mt-3 p-3 bg-red-950/40 border border-red-800/50 rounded-lg flex items-start gap-2.5 text-xs text-red-300">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Extraction Error:</span> {compileError}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Uses <span className="font-mono text-slate-400">gemini-3.5-flash</span> with optimized JSON response schemas.
            </div>

            <button
              id="btn-process-compiler"
              onClick={handleCompile}
              disabled={isCompiling || (!rawTextInput.trim() && !selectedFile)}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold font-display text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                isCompiling
                  ? "bg-emerald-800/40 text-emerald-300 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 cursor-pointer"
              }`}
            >
              {isCompiling ? (
                <>
                  <div className="w-4.5 h-4.5 border-2 border-slate-950 border-t-emerald-300 rounded-full animate-spin"></div>
                  Synthesizing & Purging Administrative Fluff...
                </>
              ) : (
                <>
                  <Sparkles className="w-4.5 h-4.5 text-black animate-pulse" />
                  Compress Academic Material with ACAMIX AI
                </>
              )}
            </button>
          </div>
        </section>

        {/* 2-Column Core Interface Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          
          {/* Column A: Precision Cheat Sheet (🎯) - size ratio: 7/12 */}
          <section id="acamix-precision-panel" className="lg:col-span-7 flex flex-col gap-4">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-slate-950/40 p-2 rounded-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                <h2 className="text-xs uppercase tracking-widest font-extrabold text-white font-display">
                  🎯 Precision Cheat Sheet
                </h2>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 rounded-full font-mono">
                  {filteredTopics.length} Highly Tested Topics
                </span>
              </div>

              {/* Filter tools */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 pr-2 py-1 bg-slate-905 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 focus:outline-none focus:border-emerald-500 w-full sm:w-36"
                  />
                </div>
                <select
                  value={selectedYieldRating}
                  onChange={(e) => setSelectedYieldRating(e.target.value)}
                  className="bg-slate-900 text-[10px] text-slate-300 border border-slate-800 rounded p-1"
                >
                  <option value="ALL">All Levels</option>
                  <option value="CRITICAL">🔴 Critical Only</option>
                  <option value="HIGH">🟡 High Only</option>
                  <option value="MEDIUM">🟢 Medium Only</option>
                </select>
              </div>
            </div>

            <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-800 p-4 min-h-[350px] flex flex-col justify-between">
              
              {/* Active list container */}
              <div className="space-y-4">
                {filteredTopics.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-2 opacity-40" />
                    <p className="text-sm text-slate-400">No high-yield elements match your active filter scope.</p>
                    <button
                      onClick={() => { setSearchQuery(""); setSelectedYieldRating("ALL"); }}
                      className="text-xs text-emerald-400 hover:underline mt-1"
                    >
                      Clear search filters
                    </button>
                  </div>
                ) : (
                  filteredTopics.map((topicItem, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-4 bg-slate-950/80 rounded-lg border border-slate-800/80 relative hover:border-slate-700 transition-all flex flex-col gap-3 group"
                    >
                      {/* Topic Title & Badging */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-white font-bold text-sm tracking-tight flex items-center gap-1.5">
                            <span className="text-slate-500 text-xs font-mono">#{tIdx + 1}</span> {topicItem.topic}
                          </h3>
                        </div>
                        
                        <span className={`text-[9px] px-2 py-0.5 rounded font-extrabold uppercase tracking-widest ${
                          topicItem.yieldRating === "CRITICAL"
                            ? "bg-red-500/15 text-red-400 border border-red-500/30"
                            : topicItem.yieldRating === "HIGH"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        }`}>
                          {topicItem.yieldRating} YIELD
                        </span>
                      </div>

                      {/* Key Insights bullets */}
                      <div className="space-y-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">CORE HIGH-INTENSITY INSIGHTS:</div>
                        <ul className="text-xs space-y-2 text-slate-300">
                          {topicItem.keyInsights.map((insight, iIdx) => {
                            const key = `topic-${tIdx}-insight-${iIdx}`;
                            const isChecked = !!checkedInsights[key];
                            return (
                              <li
                                key={iIdx}
                                className={`flex items-start gap-3 p-1.5 rounded transition-all cursor-pointer ${
                                  isChecked ? "bg-emerald-500/5 text-slate-400 line-through" : "hover:bg-slate-900"
                                }`}
                                onClick={() => setCheckedInsights(prev => ({ ...prev, [key]: !prev[key] }))}
                              >
                                <div className="mt-0.5 shrink-0">
                                  {isChecked ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <div className="w-3.5 h-3.5 rounded border border-slate-700 group-hover:border-slate-500"></div>
                                  )}
                                </div>
                                <span>{insight}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Exam Day Warnings alerts - very helpful for exams */}
                      {topicItem.examWarnings && topicItem.examWarnings.length > 0 && (
                        <div className="bg-red-500/5 border border-red-900/30 rounded p-3 text-xs text-red-300">
                          <div className="font-mono text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            CRUCIAL EXAM PITFALL WATCH / TRAP WARNING:
                          </div>
                          <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed text-slate-300">
                            {topicItem.examWarnings.map((warning, wIdx) => (
                              <li key={wIdx}>{warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Mini Interactive Self-Test Widget to promote genuine practice retention */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="bg-slate-950/90 rounded-lg p-4 border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs uppercase tracking-widest text-[#E2E8F0] font-bold flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
                      ACAMIX Active Retention Trainer
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500">
                      Verify Real Comprehension
                    </span>
                  </div>

                  {activeQuizTopicIndex === -1 ? (
                    <div>
                      <p className="text-xs text-slate-400 mb-3">
                        Convert the extracted high-yield topics into an instant recall trial simulation.
                      </p>
                      <button
                        onClick={() => {
                          const validIdxs = filteredTopics.length > 0 ? filteredTopics : activeData.precisionSheet;
                          if (validIdxs.length > 0) {
                            setActiveQuizTopicIndex(Math.floor(Math.random() * validIdxs.length));
                            setQuizShowAnswer(false);
                            setCustomUserAnswer("");
                          }
                        }}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs py-1.5 px-3 rounded font-bold tracking-wide w-full flex items-center justify-center gap-2 transition-all"
                      >
                        Launch Direct Micro-Recall Test
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-850">
                        <span className="text-[10px] text-slate-500 uppercase block tracking-wider">TOPIC CHALLENGE QUESTION:</span>
                        <p className="text-xs text-white font-semibold mt-0.5">
                          "Explain key concepts and exam pitfalls regarding: <span className="text-emerald-400 font-bold">{ (filteredTopics[activeQuizTopicIndex] || activeData.precisionSheet[activeQuizTopicIndex])?.topic }</span>?"
                        </p>
                      </div>

                      <textarea
                        value={customUserAnswer}
                        onChange={(e) => setCustomUserAnswer(e.target.value)}
                        placeholder="Draft your mental recall or equations summary here to test retention accuracy..."
                        className="w-full h-16 bg-slate-900 border border-slate-800 rounded text-xs p-2.5 text-slate-300 focus:outline-none focus:border-emerald-500"
                      />

                      {quizShowAnswer && (
                        <div className="bg-slate-900 p-3 rounded border-l-4 border-emerald-500 text-xs text-slate-300 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">ACAMIX VERIFIED TARGET ANSWER KEYS:</span>
                          <ul className="list-disc pl-4 space-y-1 text-[11px]">
                            {(filteredTopics[activeQuizTopicIndex] || activeData.precisionSheet[activeQuizTopicIndex])?.keyInsights.map((ins, i) => (
                              <li key={i}>{ins}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex justify-between items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveQuizTopicIndex(-1);
                            setQuizShowAnswer(false);
                            setCustomUserAnswer("");
                          }}
                          className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" /> Stop Training
                        </button>

                        <div className="flex gap-2">
                          {!quizShowAnswer ? (
                            <button
                              onClick={() => setQuizShowAnswer(true)}
                              className="bg-emerald-500 text-black font-extrabold text-[11px] px-3 py-1 rounded"
                            >
                              Show Verification Answers
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setQuizScore(prev => prev + 1);
                                  setSubmittedQuizQuestionsCount(prev => prev + 1);
                                  // Pick new topic
                                  const totalCount = filteredTopics.length || activeData.precisionSheet.length;
                                  setActiveQuizTopicIndex(Math.floor(Math.random() * totalCount));
                                  setQuizShowAnswer(false);
                                  setCustomUserAnswer("");
                                }}
                                className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2.5 py-1 rounded hover:bg-emerald-900"
                              >
                                ✅ I nailed this!
                              </button>
                              <button
                                onClick={() => {
                                  setSubmittedQuizQuestionsCount(prev => prev + 1);
                                  // Pick new topic
                                  const totalCount = filteredTopics.length || activeData.precisionSheet.length;
                                  setActiveQuizTopicIndex(Math.floor(Math.random() * totalCount));
                                  setQuizShowAnswer(false);
                                  setCustomUserAnswer("");
                                }}
                                className="bg-slate-800 text-slate-300 text-[10px] px-2.5 py-1 rounded hover:bg-slate-700"
                              >
                                ❌ Review more later
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {submittedQuizQuestionsCount > 0 && (
                        <div className="text-[10px] text-slate-500 font-mono text-center">
                          Cumulative Trainer Score: <span className="text-emerald-400 font-bold">{quizScore}</span> / {submittedQuizQuestionsCount} ({Math.round((quizScore / submittedQuizQuestionsCount) * 100)}%)
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>

            </div>
          </section>

          {/* Column B: Assignment Framework Co-Pilot (📝) - size ratio: 5/12 */}
          <section id="acamix-assignment-panel" className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="flex items-center gap-2.5 bg-slate-950/40 p-2 rounded-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
              <h2 className="text-xs uppercase tracking-widest font-extrabold text-white font-display">
                📝 Assignment Framework Co-Pilot
              </h2>
            </div>

            <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-800 p-5 flex flex-col gap-4 min-h-[350px] justify-between">
              
              <div className="space-y-4">
                {activeData.assignmentFrameworkCopilot.length === 0 ? (
                  <div className="text-center py-10">
                    <FileSpreadsheet className="w-12 h-12 text-slate-600 mx-auto mb-2 opacity-45" />
                    <p className="text-xs text-slate-400">No active assignment metrics compiled.</p>
                  </div>
                ) : (
                  activeData.assignmentFrameworkCopilot.map((assign, aIdx) => (
                    <div key={aIdx} className="space-y-4">
                      
                      {/* Assignment header information */}
                      <div className="border-b border-slate-800 pb-3">
                        <div className="text-[10px] text-blue-400 font-mono uppercase tracking-wide">DETECTOR IDENTIFIED WORK-ITEM:</div>
                        <h3 className="text-white text-sm font-bold tracking-tight font-display mt-0.5">
                          {assign.assignmentName}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {assign.description}
                        </p>
                      </div>

                      {/* Structuring Scaffolder */}
                      <div className="border border-slate-800 rounded-lg p-3.5 relative bg-slate-950/60">
                        <div className="absolute -top-2 left-3 bg-slate-900 border border-slate-800 px-2 py-0.2 text-[9px] text-blue-400 font-bold uppercase tracking-wider">
                          Strategic Submission Outline Scaffold
                        </div>
                        
                        <div className="mt-2 space-y-2.5">
                          <ol className="text-xs space-y-2.5">
                            {assign.suggestedOutline.map((outlineLine, oIdx) => (
                              <li key={oIdx} className="flex gap-2 text-slate-300">
                                <span className="text-blue-500 font-mono font-bold shrink-0">{String(oIdx + 1).padStart(2, "0")}</span>
                                <div>{outlineLine}</div>
                              </li>
                            ))}
                          </ol>

                          {/* Fast Action helper for outline */}
                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={() => {
                                const formattedText = `## ASSIGNMENT Scaffolder: ${assign.assignmentName}\n\nOutline Strategy:\n${assign.suggestedOutline.map((line, i) => `${i + 1}. ${line}`).join("\n")}`;
                                handleCopyToClipboard(formattedText, "outline-" + aIdx);
                              }}
                              className="text-[10px] bg-slate-900 border border-slate-850 hover:bg-slate-850 text-slate-300 hover:text-white py-1 px-2.5 rounded font-mono flex items-center gap-1 transition-colors"
                            >
                              {copiedSection === "outline-" + aIdx ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" /> Scaffold Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" /> Copy LaTeX/Markdown Outline
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Perfect 100% Checklist */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">100% GRADE COMPLIANCE CHECKLIST:</h4>
                        
                        <div className="grid grid-cols-1 gap-2">
                          {assign.checklist.map((checkItem, cIdx) => {
                            const key = `assign-${aIdx}-check-${cIdx}`;
                            const isDone = !!checkedCopilotItems[key];
                            return (
                              <div
                                key={cIdx}
                                onClick={() => setCheckedCopilotItems(prev => ({ ...prev, [key]: !prev[key] }))}
                                className={`flex items-start gap-2.5 p-2 rounded border transition-colors cursor-pointer text-xs ${
                                  isDone
                                    ? "bg-slate-900/40 text-slate-500 border-slate-900"
                                    : "bg-slate-950/75 text-slate-300 border-slate-800/80 hover:border-slate-700"
                                }`}
                              >
                                <div className="mt-0.5 shrink-0">
                                  {isDone ? (
                                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <div className="w-4 h-4 rounded border border-slate-700"></div>
                                  )}
                                </div>
                                <span className={isDone ? "line-through text-slate-500" : ""}>{checkItem}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Fast shortcuts & Hacks to speed dev efforts */}
                      <div className="bg-blue-500/10 rounded-lg border border-blue-500/20 p-4">
                        <div className="text-[10px] text-blue-400 font-mono uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1">
                          <Code className="w-3.5 h-3.5" /> Fast Implementation Hacks / Hacks:
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1.5 pl-3 list-disc">
                          {assign.actionPlan.map((hack, hIdx) => (
                            <li key={hIdx} className="leading-normal">{hack}</li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Informative Tip Box on outline execution */}
              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Co-Pilot Strategy:</strong> Rely on structural templates directly to bypass introductory narrative fluff. Focus your energy strictly on proving theoretical formulas or building functional test codes.
                </span>
              </div>

            </div>
          </section>

        </div>

        {/* Dynamic calculations & Reclaimed Time flips section */}
        <section id="acamix-calculation-dashboard" className="bg-slate-900/60 rounded-xl border border-slate-800 p-5 md:p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-slate-800/80">
            <div>
              <h3 className="text-white text-base font-bold font-display flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                ⏱️ Reclaimed-Time Calculation Engine & Skill Investment Tracker
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing physical hours recaptured from low-yield academic fluff and mapping them into target industrial portfolios.
              </p>
            </div>

            {/* Quick interactive parameters adjusting */}
            <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 w-full md:w-auto">
              <span className="text-[10px] uppercase font-bold text-slate-400 text-right">Study Cycles multiplier:</span>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.5"
                value={simulatedHoursFactor}
                onChange={(e) => setSimulatedHoursFactor(Number(e.target.value))}
                className="w-24 accent-emerald-500 cursor-pointer"
              />
              <span className="font-mono text-xs text-emerald-400 font-bold w-10">
                {simulatedHoursFactor}x semesters
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Hour meter panel - block 1 (cols 5) */}
            <div id="reclaimed-meter-container" className="lg:col-span-5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 md:p-6 text-black flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform"></div>
              
              <div className="flex justify-between items-start">
                <h3 className="font-black text-xs uppercase tracking-widest text-emerald-900">
                  ⚡ Reclaimed Modern Human Hours
                </h3>
                <span className="bg-black/90 text-emerald-400 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Delta Compound Max
                </span>
              </div>

              <div className="my-6">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-6xl sm:text-7xl font-black tracking-tighter">
                    {Math.round(activeData.timeFlip.reclaimedHours * simulatedHoursFactor * 10) / 10}
                  </span>
                  <span className="font-bold text-xl uppercase tracking-wider text-emerald-950">
                    Syllabus Hours Saved
                  </span>
                </div>
                
                {/* Traditional comparison metric */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-emerald-700/40 text-xs text-emerald-950 font-medium">
                  <div>
                    <span className="text-[10px] uppercase text-emerald-900 block font-bold">Traditional Methods:</span>
                    <span className="font-bold text-sm block">
                      {Math.round(activeData.timeFlip.traditionalStudyHours * simulatedHoursFactor * 10) / 10} hrs of unguided memorization
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-emerald-900 block font-bold">ACAMIX Compact Focus:</span>
                    <span className="font-bold text-sm block text-black">
                      {Math.round(activeData.timeFlip.acamixStudyHours * simulatedHoursFactor * 10) / 10} hrs of deep core review
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-black/10 px-3 py-2 rounded-lg text-xs">
                <span id="efficiency-rate-indicator" className="font-bold uppercase tracking-tight text-emerald-950">
                  {activeData.timeFlip.reclaimedPercentage}% STUDY EFFICIENCY MULTIPLE IMPROVEMENT
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-950" />
              </div>
            </div>

            {/* Tech Skill Roadmap - block 2 (cols 7) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-5 md:p-6 flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 font-display">
                    <span className="w-1 h-3 bg-blue-500 block"></span>
                    Immediate High-Yield Tech-Skill Investment Roadmap ({Math.round(activeData.timeFlip.reclaimedHours * simulatedHoursFactor)} Free Hours)
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">ROADMAP // REDIRECT</span>
                </div>
                
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Avoid squandering your newly reclaimed hours! Below is an immediate 3-step modern technology path recommended by the compiler logic to convert university time into real industry capital.
                </p>

                {/* Steps Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeData.techSkillRoadmap.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      onClick={() => handleLaunchTerminal(step.stepNumber, step.skill, step.actionableProject)}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/50 p-4 rounded-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group relative"
                    >
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="text-blue-400 font-mono text-[9px] mb-1 font-bold tracking-wider">
                          STEP 0{step.stepNumber} – PRACTICE
                        </div>
                        <div className="text-white font-bold text-xs group-hover:text-blue-400 transition-colors">
                          {step.skill}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed flex-1">
                          {step.actionableProject}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-slate-800/80 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                        <span>EST. PRACTICE:</span>
                        <span className="text-emerald-400 font-bold">{step.durationEstimate}</span>
                      </div>

                      {/* Recommended Resources List */}
                      {step.resources && step.resources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-800/50 flex flex-col gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-bold">
                            Recommended Resources:
                          </div>
                          <div className="flex flex-col gap-1">
                            {step.resources.map((res, rIdx) => (
                              <a
                                key={rIdx}
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1.5 truncate"
                              >
                                <span className="bg-emerald-950/80 border border-emerald-900 text-emerald-400 px-1 py-0.2 rounded text-[8px] uppercase tracking-wide font-mono shrink-0 font-extrabold">
                                  {res.type || "Link"}
                                </span>
                                <span className="truncate text-slate-300 hover:text-emerald-400 transition-colors" title={res.title}>{res.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Terminal output simulation to help direct practice steps */}
              <div className="mt-5 bg-slate-900 rounded-lg p-3.5 border border-slate-800 font-mono">
                <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-800 pb-1.5 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-1 text-slate-400 font-semibold uppercase">Practice Sandbox Console</span>
                  </div>
                  <span>100% Client Simulated</span>
                </div>
                
                {activeTerminalCommand && (
                  <div className="text-xs text-blue-400 mb-1 font-bold">
                    $ {activeTerminalCommand}
                  </div>
                )}
                <pre className="text-[11px] text-emerald-400/90 leading-tight whitespace-pre-wrap break-all max-h-24 overflow-y-auto">
                  {terminalOutput}
                </pre>
              </div>

            </div>

          </div>

          <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-slate-850/80 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="font-bold text-white uppercase tracking-wider block sm:inline mr-2">Core Formula Logic:</span>
              <span>{activeData.timeFlip.calculationExplanation}</span>
            </div>
            
            <button
              onClick={() => {
                const bundle = JSON.stringify(activeData, null, 2);
                handleCopyToClipboard(bundle, "json-bundle");
              }}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded py-1.5 px-3 font-mono text-xs flex items-center gap-1.5 self-stretch sm:self-auto justify-center transition-all cursor-pointer shrink-0"
            >
              {copiedSection === "json-bundle" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Compiled Schema Copied!
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> Export Clean JSON Schema
                </>
              )}
            </button>
          </div>
        </section>

        {/* Global Footer and documentation credits */}
        <footer className="text-center text-slate-600 text-xs mt-6 mb-8 border-t border-slate-900 pt-6 space-y-2">
          <p>
            ACAMIX Academic Compression Engine — Build absolute premium study assets. Powered by Antigravity and server-side Gemini.
          </p>
          <div className="flex justify-center gap-4 text-slate-500">
            <span>Platform Status: <span className="text-emerald-400 uppercase font-bold text-[10px]">● Online</span></span>
            <span>•</span>
            <span>Local Time: {new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
