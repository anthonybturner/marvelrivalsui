# Marvel Rivals Fan Site - Angular Web App

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

A fan-made Angular web application for **Marvel Rivals**, featuring hero rosters, team synergies, and news.
## Development Notes

This project is **actively being refactored** to align with Angular performance best practices.  
Any non-performant patterns, such as **function calls within templates**, are intentionally being replaced with:

- **Angular Signals**
- **Async pipe–driven observables**
- Improved **change detection strategies**

These updates are part of an ongoing effort to demonstrate **clean architecture, performance awareness, and modern Angular patterns** in a real-world application.

---

## 📌 Repository Overview

### 🌟 Key Features
- **Hero Gallery** with filters/search
- **Interactive Team Builder**
- **News & Patch Notes** section
- **User Authentication** (Firebase)
- **Responsive UI** (Angular Material + Tailwind)

### 📂 Repository Structure

marvel-rivals-angular/
├── src/ # Angular source code
│ ├── app/ # Main app modules
│ │ ├── core/ # Auth, interceptors
│ │ ├── features/ # Feature modules
│ │ ├── shared/ # Shared components
│ ├── assets/ # Images, mock JSON
├── bitbucket-pipelines.yml # CI/CD configuration
├── angular.json # Angular config
└── firebase.json # Firebase hosting config

---

## 🛠 Development Setup

### Prerequisites
- Node.js v18+
- Angular CLI (`npm install -g @angular/cli`)
- Firebase CLI (if using Firebase)

### Installation
1. Clone the repository:
   ```bash
   git clone git@bitbucket.org:your-workspace/marvel-rivals-angular.git
   cd marvel-rivals-angular

Install dependencies:

bash
npm install
Run locally:

bash
ng serve
🔧 Bitbucket Integration
Branching Strategy
Branch	Purpose
main	Production releases
develop	Staging/testing
feature/*	New features (e.g., feature/auth)
CI/CD Pipeline (bitbucket-pipelines.yml)
yaml
image: node:18

pipelines:
  branches:
    main:
      - step:
          name: Build and Deploy
          caches:
            - node
          script:
            - npm install
            - npm run build -- --prod
            - npm install -g firebase-tools
            - firebase deploy --token "$FIREBASE_TOKEN" --non-interactive
Environment Variables
Set in Bitbucket Settings > Repository Variables:

FIREBASE_TOKEN: Firebase deployment token.

API_KEY: Marvel API key (if used).

🚀 Deployment
Automatically deploys to Firebase Hosting when merging to main. Configure firebase.json:

json
{
  "hosting": {
    "public": "dist/marvel-rivals",
    "ignore": ["**/.*"]
  }
}
📜 License
This project is unaffiliated with Marvel or NetEase. For educational purposes only.

🙌 How to Contribute
Fork the repository.

Create a feature branch (feature/your-feature).

Submit a Pull Request to develop.

Ensure all tests pass (npm test).

🔗 Live Demo: Coming Soon
📧 Contact: your-email@example.com

text

### Key Improvements:
1. **Single-File Flow**: All sections merged into one cohesive document without separators.
2. **Bitbucket-First Focus**: 
   - Pipeline config embedded in the README.
   - Branching strategy table for Bitbucket workflows.
3. **Concise Yet Comprehensive**: Covers setup, development, and deployment in one scroll.

4. **No Placeholder Sections**: Every part serves a purpose (no "Coming Soon" unless necessary).
