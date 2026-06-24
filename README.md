# College Balanza

## Project Overview

"College Balanza" is a web platform designed for the Kaggle x Google 5-Day Intensive Course's capstone project. Its primary goal is to enable users to compare two or more colleges based on various criteria such as placements, location, faculty reviews, fees, Return on Investment (ROI), industry value, brand value, and college life. The platform will aggregate data from diverse web sources and leverage an integrated Large Language Model (LLM) to oversee the comparison process.

## Features

- **Interactive College Comparison:** Users can select multiple colleges and view a detailed comparison across key metrics.
- **Dynamic UI/UX:** Inspired by modern web applications, featuring motion graphics, responsive design, and interactive components.
- **Dark/Light Mode Toggle:** Seamless theme switching with preference persistence across the website.
- **Robust Data Aggregation:** Utilizes a Custom Model Context Protocol (MCP) to fetch and process college data from various online sources.
- **AI-Powered Comparison Oversight:** An integrated LLM will ensure comprehensive and insightful comparisons.
- **Secure User Management:** UUID-based authentication with Supabase for database management.
- **Privacy-Focused:** Includes a dedicated privacy policy page.

## Technical Architecture

### Frontend

The frontend will be built using a modern JavaScript framework (e.g., React with Vite and TypeScript) and styled with TailwindCSS for a responsive and aesthetically pleasing user interface. Key UI/UX elements will draw inspiration from `steep.app` for motion graphics, `whereby.com` and `resend.com` for comparison layouts, and `componentry.fun` for interactive components.

### Backend

The backend will leverage Supabase for database management, handling user data (UUIDs) and potentially cached college information. Vercel will be used for deployment, ensuring a scalable and performant application.

### Data Aggregation & AI Integration (MCP & LLM)

#### Custom Model Context Protocol (MCP)

A custom MCP will be developed to handle the complex task of fetching college data from disparate web sources. This involves:

- **Web Scraping:** Utilizing libraries or custom scripts to extract information from college official websites, educational portals, forums (Quora, Reddit), and review sites.
- **Data Cleaning & Normalization:** Processing raw, unstructured data into a consistent format suitable for comparison.
- **Data Storage:** Temporarily storing fetched data for efficient retrieval and LLM processing.

#### Large Language Model (LLM) Integration

An LLM will be integrated to provide intelligent oversight and enhance the comparison process. Its responsibilities will include:

- **Contextual Analysis:** Understanding the nuances of college data and user queries to provide more relevant comparisons.
- **Comparison Generation:** Assisting in synthesizing information and generating insightful comparison summaries.
- **Guardrail Enforcement:** Ensuring that comparisons adhere to predefined guardrails (e.g., avoiding bias, maintaining factual accuracy).

#### LLM for Code Generation

Antigravity and Gemma via Gemini CLI will be explored for potential code generation assistance, adhering to spec-driven development and BDD principles.

## Development Principles & Guardrails

This project will adhere to strict development principles and guardrails to ensure quality, security, and ethical AI usage. These include:

- **Spec-Driven Development:** All features will be developed based on clear, YAML-formatted specifications.
- **Behavior-Driven Development (BDD):** Gherkin syntax will be used for defining features and scenarios, particularly for AI agent interactions.
- **Zero-Trust Security:** Implementing robust security measures, including UUID-based authentication and adherence to the principle of least privilege.
- **Minimal Hallucination:** Strategies will be employed to minimize LLM hallucination, focusing on factual accuracy.
- **Context Management:** Techniques to avoid context rot and context drought for AI agents.
- **No Security Shortcomings:** Proactive measures to prevent vulnerabilities.
- **Professional UI/UX:** Avoiding a "vibe-coded" appearance through careful design and component selection.
- **Confused Deputy Problem Mitigation:** Ensuring secure interactions between system components and agents.

## Project Structure

```
college_balanza/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.tsx
├── features/
│   └── college_comparison.feature
├── project_spec.yaml
├── guardrails.yaml
├── README.md
├── package.json
└── tsconfig.json
```

## Getting Started

Further instructions for setting up the development environment, running the application, and contributing will be provided here upon project initialization.
