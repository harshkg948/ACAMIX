import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));

  const PORT = 3000;

  // ACAMIX Syllabus Instant Verification Preview Endpoint
  app.post("/api/quick-scan", async (req, res) => {
    try {
      const { rawText, pdfFile } = req.body;
      if ((!rawText || !rawText.trim()) && (!pdfFile || !pdfFile.data)) {
        return res.status(400).json({ error: "Syllabus text or a PDF file is required for quick scanning." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY environment variable is missing. Please add it in the Secrets panel."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const parts: any[] = [];
      let documentContext = "";

      if (pdfFile && pdfFile.data) {
        parts.push({
          inlineData: {
            mimeType: pdfFile.mimeType || "application/pdf",
            data: pdfFile.data
          }
        });
        documentContext = `(Note: A syllabus PDF document titled "${pdfFile.name || 'uploaded_syllabus.pdf'}" has been attached.)\n`;
      }

      const promptText = `
You are a precise academic parser. Perform an ultra-fast structural scan of the provided academic material/syllabus:
${documentContext ? `Use the attached PDF document as the primary syllabus source.` : ''}

Extract the following summary structure to help the student verify we have read the material accurately:
1. Course/Document Title (e.g., "CHEM 202: Advanced Organic Chemistry II") - if not found, make a highly educated guess.
2. Instructor Name / Department (e.g., "Dr. Marie S. Curie") - if not found, specify "Not Listed".
3. Estimated Chapters/Modules count (expressed as a short string or number, e.g., "14 Chapters" or "6 Modules").
4. Grading Breakdown summary (e.g., "Midterm Exam (30%), Term Project (20%), Final Exam (45%), Attendance (5%)").
5. Scope Verification: A concise, executive 2-3 sentence overview highlighting the academic level, pacing, and core focus area of this class.
6. Key Interests/Major Themes: A clean array of 4-6 specific technical terms, core programming tools, concepts, or theories highlighted prominently in this syllabus.

${rawText ? `ACCOMPANYING TEXT:\n"""\n${rawText}\n"""` : 'Please scan and parse the attached PDF syllabus to extract this summary.'}

Ensure you formulate your extraction and output precisely using the response schema structure.
`;

      parts.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: parts,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              courseTitle: { type: Type.STRING, description: "Descriptive course title or subject name" },
              instructor: { type: Type.STRING, description: "Lead instructor or professor name, or 'Not Listed'" },
              chaptersCount: { type: Type.STRING, description: "Approximate count of chapters, weekly milestones or modules" },
              gradingBreakdown: { type: Type.STRING, description: "Short inline summary of grading weights" },
              scopeVerification: { type: Type.STRING, description: "2-3 sentence executive synopsis of the course scope" },
              keyInterests: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "4-6 prominent technical topics or core concepts highlighted"
              }
            },
            required: ["courseTitle", "instructor", "chaptersCount", "gradingBreakdown", "scopeVerification", "keyInterests"]
          }
        }
      });

      if (!response.text) {
        throw new Error("No response returned from the GenAI model");
      }

      const parsedData = JSON.parse(response.text.trim());
      res.json(parsedData);
    } catch (e: any) {
      console.error("Backend quick-scan error:", e);
      res.status(500).json({ error: e?.message || "Internal syllabus quick scanning failure." });
    }
  });

  // ACAMIX Academic material compiler endpoint
  app.post("/api/process", async (req, res) => {
    try {
      const { rawText, pdfFile } = req.body;
      if ((!rawText || !rawText.trim()) && (!pdfFile || !pdfFile.data)) {
        return res.status(400).json({ error: "Academic material text or a PDF file is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY environment variable is missing. Please add it in the Secrets panel."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare multimodal parts
      const parts: any[] = [];
      let documentContext = "";

      if (pdfFile && pdfFile.data) {
        parts.push({
          inlineData: {
            mimeType: pdfFile.mimeType || "application/pdf",
            data: pdfFile.data
          }
        });
        documentContext = `(Note: A syllabus PDF document titled "${pdfFile.name || 'uploaded_syllabus.pdf'}" has been attached as an inline multimodal input.)\n`;
      }

      const promptText = `
You are the core AI backend for ACAMIX (Academic Efficiency Engine).
Deconstruct the raw, unorganized academic material provided ${documentContext ? `via the attached PDF and any accompanying text` : ''}. Strip away all low-efficiency filler, academic fluff, administrative boilerplate, and general "filler text".
Optimize and compress this material into a high-efficiency execution bundle for the student containing:
1. High-yield core exam concepts with "yield rating" (Critical, High, Medium), concise bullet points, and high-intensity tested warnings or pitfalls.
2. Formulate outlines / scaffolds for any assignment, task, laboratory, or final project mentioned (and if none are mentioned, infer typical high-yield assignments for the subject).
3. Reclaimed Time calculation modeling estimated Traditional Study Hours vs Optimized ACAMIX Study Hours, expressing an objective assessment of hours saved and efficiency gains.
4. Integrate a highly practical 3-step Tech Skill learning roadmap (such as React, Python libraries, SQL, Docker, etc.) designed list-by-list to invest the newly reclaimed study time into real-world skill development.

For each of the 3 steps in the skill roadmap, recommend 2-3 genuine, high-quality reference learning resources (such as official documentation, tutorials, courses, YouTube playlists, etc.). Provide real, recognizable URLs (such as devdocs.io, docs.python.org, react.dev, freecodecamp.org, etc.) rather than made-up placeholder domains.

${rawText ? `RAW UNIVERSITY DATA:\n"""\n${rawText}\n"""` : 'Please scan and parse the attached PDF syllabus to extract everything.'}

Ensure you formulate your extraction and output precisely using the response schema structure.
`;

      parts.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: parts,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              precisionSheet: {
                type: Type.ARRAY,
                description: "Array of core high-yield exam topics and compact high-yield summaries",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    topic: { type: Type.STRING, description: "A high-efficiency topic title" },
                    yieldRating: { type: Type.STRING, description: "CRITICAL, HIGH, or MEDIUM" },
                    keyInsights: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "List of compact, punchy bullet points detailing the core concept logic"
                    },
                    examWarnings: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Tested pitfall warnings or exam-day gotchas"
                    }
                  },
                  required: ["topic", "yieldRating", "keyInsights", "examWarnings"]
                }
              },
              assignmentFrameworkCopilot: {
                type: Type.ARRAY,
                description: "Outlines and structures for deliverables",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    assignmentName: { type: Type.STRING, description: "Title of delivery item" },
                    description: { type: Type.STRING, description: "Brief delivery objective" },
                    suggestedOutline: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Strategic sections and header layout"
                    },
                    checklist: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Checklist of items to get a grade of 100%"
                    },
                    actionPlan: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Fast implementation hacks or shortcuts"
                    }
                  },
                  required: ["assignmentName", "description", "suggestedOutline", "checklist", "actionPlan"]
                }
              },
              timeFlip: {
                type: Type.OBJECT,
                description: "Comparison metrics",
                properties: {
                  traditionalStudyHours: { type: Type.INTEGER, description: "Typical baseline hours spent without ACAMIX" },
                  acamixStudyHours: { type: Type.INTEGER, description: "Optimized time spent with ACAMIX summaries" },
                  reclaimedHours: { type: Type.INTEGER, description: "Hours saved" },
                  reclaimedPercentage: { type: Type.INTEGER, description: "Percentage increase in study efficiency" },
                  calculationExplanation: { type: Type.STRING, description: "Compact description of how high-yield compression saves these hours" }
                },
                required: ["traditionalStudyHours", "acamixStudyHours", "reclaimedHours", "reclaimedPercentage", "calculationExplanation"]
              },
              techSkillRoadmap: {
                type: Type.ARRAY,
                description: "Exact 3-step technology skill learning sequence to fill the reclaimed hours",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepNumber: { type: Type.INTEGER },
                    skill: { type: Type.STRING, description: "Specific tech topic, tool or library" },
                    actionableProject: { type: Type.STRING, description: "A portfolio-worthy asset they should build" },
                    durationEstimate: { type: Type.STRING, description: "Time to master (e.g. 10 Hours of practice)" },
                    resources: {
                      type: Type.ARRAY,
                      description: "Specific reference learning resources recommended for this technical step",
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING, description: "Name/title of the course, guide, or documentation (e.g. Official React Tutorials)" },
                          type: { type: Type.STRING, description: "Type of learning format (e.g. Documentation, Video Playlist, Interactive Course, Guide)" },
                          url: { type: Type.STRING, description: "A highly accurate external link to access this resource directly" }
                        },
                        required: ["title", "type", "url"]
                      }
                    }
                  },
                  required: ["stepNumber", "skill", "actionableProject", "durationEstimate", "resources"]
                }
              }
            },
            required: ["precisionSheet", "assignmentFrameworkCopilot", "timeFlip", "techSkillRoadmap"]
          }
        }
      });

      if (!response.text) {
        throw new Error("No response returned from the GenAI model");
      }

      const resText = response.text.trim();
      const parsedData = JSON.parse(resText);
      res.json(parsedData);
    } catch (e: any) {
      console.error("Backend compiler error:", e);
      res.status(500).json({ error: e?.message || "Internal Academic compiler failure." });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", time: new Date() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched successfully on port ${PORT}`);
  });
}

startServer();
