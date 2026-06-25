# College Balanza

AI-powered college comparison platform developed by **Anushiv Prakash** as the capstone project for the **Kaggle × Google 5-Day Intensive Course**.

## Project Overview

College Balanza helps students compare colleges side-by-side using structured data and AI-powered insights. The platform aggregates information from official sources and trusted public platforms to compare colleges across placements, fees, faculty, ROI, industry value, campus life, and more.

⚠️ This project is currently under active development. Features and data sources are being expanded as part of the Kaggle × Google 5-Day Intensive capstone.

The long-term goal is to provide transparent, data-driven college comparisons instead of relying on scattered information across multiple websites.

## Preview

### ☀️ Light Mode

![Light Mode](docs/assets/homepage1.png)

### 🌙 Dark Mode

![Dark Mode](docs/assets/homepage2.png)
## Features

* **Side-by-side college comparison**
* **AI-generated comparison summaries**
* **Real-time data aggregation from multiple sources**
* **Modern responsive UI with Dark/Light mode**
* **Anonymous UUID-based sessions**
* **Privacy-focused architecture**
* **Deployed on Vercel**

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* tRPC
* Framer Motion

### Backend

* Node.js
* Express
* Drizzle ORM
* PostgreSQL (Supabase / Neon compatible)
* Vercel Serverless Functions

## Data Aggregation & AI

### Data Sources

College Balanza collects information from multiple publicly available sources including:

* Official college websites
* Placement reports
* Government datasets
* Educational portals
* Community discussions (where appropriate)

Data is cleaned, normalized, and merged before presentation.

### AI Integration

The platform uses Large Language Models to:

* Generate comparison summaries
* Explain trade-offs between colleges
* Synthesize large amounts of information
* Provide data-driven comparison insights to assist decision-making.

AI responses are designed to supplement—not replace—source data.

## Development Principles

* Spec-Driven Development
* Behavior-Driven Development (BDD)
* Privacy by Design
* Secure-by-default architecture
* AI guardrails
* Minimal hallucination
* Accessible and responsive UI

## Project Structure

```text
client/
server/
shared/
drizzle/
docs/
features/
api/
```

## Getting Started

```bash
pnpm install
pnpm db:push
pnpm dev
```

## Deployment

The application is designed to be deployed on **Vercel** using serverless functions.

Required environment variables:

* DATABASE_URL
* OPENAI_API_KEY
* OPENAI_MODEL (optional)
* OPENAI_BASE_URL (optional)

## Roadmap

* Live web data aggregation
* Advanced filtering
* College recommendation engine
* Saved comparisons
* User accounts
* Analytics dashboard

## Acknowledgements

Initial project scaffolding and portions of the infrastructure migration were assisted using Loveable.dev.
The overall application architecture, feature development, deployment, and ongoing maintenance are the work of Anushiv Prakash.
## License

Licensed under the MIT License.
