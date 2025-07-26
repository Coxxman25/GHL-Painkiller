Of course. Here is a thorough and detailed Product Requirements Document (PRD) that synthesizes all the provided information. It's designed to be passed directly to an AI IDE to guide the development of the "GHL Painkiller" by adapting the existing `spark-stack` codebase.

---

## **Product Requirements Document: GHL Painkiller**

### **1. Executive Summary**

**Product Vision:** To create an AI-powered application that serves as an indispensable companion for GoHighLevel (GHL) users. [cite_start]The product, **GHL Painkiller**, will not be a generic app builder; it will be a dedicated GHL problem-solver[cite: 32].

**Core Concept:** The application will use a dual-mode interface built upon the `spark-stack` foundation. [cite_start]Users will first diagnose issues in **Companion Mode** through an AI chat, and then seamlessly transition to **Builder Mode** where the AI generates a "Micro App" to solve the identified problem[cite: 6, 24, 25]. [cite_start]The tagline is: "Tell the AI your GHL pain. It fixes it or builds you the tool to do it"[cite: 4].

**Foundation:** We will use the **Spark Stack** codebase as our foundation. The goal is to adapt its existing three-panel UI with minimal structural changes to accelerate development, while delivering the full GHL Painkiller experience.

***

### **2. Adapting the Spark Stack Foundation**

The core strategy is to map the GHL Painkiller's dual-mode functionality directly onto Spark Stack's existing three-panel interface. This minimizes the need for a complete UI overhaul.

* [cite_start]**Left Panel (Spark Stack: Chat/Prompt):** This will be the heart of our **Companion Mode** for AI-driven pain discovery[cite: 19]. In **Builder Mode**, this panel will serve as the "AI Prompt" box for making iterative changes to the generated app.
* **Middle Panel (Spark Stack: File Tree):** This panel will be repurposed. [cite_start]In **Builder Mode**, it will become the **Micro App Blocks Library** and the **Quick AI Apps** panel[cite: 36, 52]. In **Companion Mode**, this panel can be collapsed or hidden to focus the user on the chat.
* **Right Panel (Spark Stack: Live Preview):** This is the most versatile panel.
    * In **Companion Mode**, it will display the "Detected Bottlenecks" and "Suggested Solutions" cards from our wireframe.
    * [cite_start]In **Builder Mode**, it becomes the **Live Canvas**, rendering a real-time preview of the internal tool or app being built[cite: 47, 48].

This approach preserves the core architecture of Spark Stack while delivering a bespoke and intuitive user experience for the GHL Painkiller.

***

### **3. Detailed Feature Breakdown**

#### **3.1. Global UI & Theming**

* **Theme:** We will adopt the clean, modern, dark-themed UI of the Spark Stack. All new components should match this existing aesthetic.
* [cite_start]**Mode Toggle:** A simple, clear toggle will be placed in the header, allowing users to switch between "Companion" and "Builder" modes[cite: 64, 74]. The application will default to **Companion Mode** on startup.

---

#### **3.2. Companion Mode (Diagnose the Pain)**

This mode is focused on understanding the user's problem.

* **Left Panel (AI Assistant):**
    * [cite_start]A chat interface where the user describes their GHL-related issues in natural language (e.g., "My leads are going cold")[cite: 20].
    * [cite_start]The AI will ask targeted follow-up questions to understand the user's business type, GHL setup, and existing workflows[cite: 21, 22].
* **Right Panel (Diagnosis & Solutions):**
    * **Detected Bottlenecks:** A section where the AI summarizes the core problems it has identified.
    * [cite_start]**Suggested Solutions:** The AI will offer 2-3 solution paths presented as interactive cards[cite: 23]. Each card will contain:
        * A clear title (e.g., "Automated Missed Call Manager").
        * A brief description of how it solves the pain point.
        * [cite_start]A primary call-to-action button: **"Generate This App"**[cite: 24].

---

#### **3.3. Builder Mode (Build the Solution)**

This mode is focused on generating and customizing the tool that solves the user's problem.

* [cite_start]**Transition:** When the user clicks "Generate This App," the UI transitions to Builder Mode, and the AI pre-populates the canvas with the solution[cite: 24, 26].
* **Middle Panel (Blocks & Quick Apps):**
    * [cite_start]**Micro App Blocks:** The file tree is replaced with a library of draggable, GHL-specific tool blocks like a "To-Do Manager," "Missed Call Manager," or "Funnel Health Dashboard"[cite: 37, 38, 40, 42]. [cite_start]This shifts the user's mindset from abstract "logic" to tangible "tools"[cite: 45].
    * [cite_start]**Quick AI Apps Panel:** This section contains preset cards for common solutions like "Fix lead tagging logic" or "Build custom funnel stats dashboard"[cite: 52, 54, 58]. [cite_start]Dragging one onto the canvas instantly scaffolds the tool, removing the "blank canvas" problem[cite: 59, 62].
* **Right Panel (Live Canvas & Configuration):**
    * [cite_start]The canvas renders a live, interactive UI preview of the internal tool being built[cite: 48].
    * [cite_start]When no component is selected, this panel can display a prompt to "Select a component on the canvas to configure its properties"[cite: 92].
    * [cite_start]Clicking a block on the canvas will open its configuration properties in a side drawer or inspector panel[cite: 49, 67].

***

### **4. Technical & MVP Requirements**

* [cite_start]**GHL Integration:** All deployments and interactions with the user's account must use the **GHL API 2.0** and webhooks to ensure future compatibility[cite: 30].
* **Authentication:** Implement a secure OAuth 2.0 flow for connecting to a user's GHL account.
* **MVP Scope:**
    1.  Implement the dual-mode UI toggle and panel structure on top of Spark Stack.
    2.  Develop the full **Companion Mode** flow: AI chat for diagnosis and generation of solution cards.
    3.  Develop the **Builder Mode** canvas and implement 3-4 core **Micro App Blocks** (e.g., Send SMS, Add Tag, Wait).
    4.  Implement the "Generate This App" functionality, allowing the AI to auto-populate the Builder canvas.
    5.  Achieve one-click deployment to a connected GHL account for a simple, single workflow.