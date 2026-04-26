# Project Guide: Continue Context Ruleset

## 📚 Project Overview

### Purpose
This project is a comprehensive, full-stack Enterprise Resource Planning (ERP) system, exemplified by the **Document Management Module**. Its primary goal is to provide a robust, scalable, and feature-rich platform for managing organizational documents, handling versioning, metadata, access control, and file storage.

### Key Technologies Used
*   **Backend API:** PHP (Laravel Framework)
*   **Backend Logic:** Object-Oriented Programming (OOP), Service Layer Pattern, Eloquent ORM.
*   **Frontend UI:** React (TypeScript), Vite, and a component-based architecture.
*   **Styling:** SCSS/CSS modules, utilizing a utility-first approach (inferred).
*   **Tooling/Infra:** TypeScript, Vite, ESLint, Prettier.

### High-Level Architecture
The application follows a decoupled, multi-tier architecture:
1.  **Client Tier (Frontend):** A modern SPA built with React/TS handles all UI interactions, making API calls to the backend.
2.  **API Gateway (Backend Routing):** Laravel routes manage endpoint dispatching.
3.  **Business Logic Tier (Service Layer):** The `DocumentService` is the single source of truth for business rules, orchestrating actions across models and storage.
4.  **Data Tier (Model/Database):** The `Document` model interacts with the underlying SQL database via Eloquent.

---

## 🚀 Getting Started

### Prerequisites
*   PHP (Version 8.1+ recommended)
*   Composer
*   Node.js & npm/yarn
*   Database credentials configured in the environment file (`.env.*`).

### Installation Instructions
1.  **Backend Setup:**
    ```bash
    composer install
    php artisan migrate --seed # Run migrations and seed initial data
    ```
2.  **Frontend Setup:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Environment Variables:** Ensure `.env` matches production requirements (e.g., `DB_CONNECTION`, `APP_KEY`).

### Running Tests
*   **Backend (API Logic):** Test the service and model logic in isolation.
    ```bash
    php artisan test --filter App\Modules\Document\DocumentService
    ```
*   **Frontend (UI/Integration):** Run the comprehensive unit/component tests.
    ```bash
    npm run test:unit # or yarn test:unit
    ```
*   **Full Integration Test:** To test the entire flow (Frontend $\rightarrow$ API $\rightarrow$ DB), use the provided integration test suite located in the `tests/` directory.

---

## 📁 Project Structure

### Main Directories & Purpose
*   **`src/` (Frontend Source):** Contains the entire client-side application.
    *   `components/`: Reusable, isolated UI components.
    *   `hooks/`: Custom React Hooks for managing state and side effects.
    *   `layouts/`: Defines the overall page structure wrappers.
    *   `features/`: Feature modules grouping related components and logic (e.g., `DocumentFeature/`).
    *   `routes/`, `router.tsx`: Defines the frontend navigation structure.
*   **`app/Modules/` (Backend Source):** Core PHP domain logic structure.
    *   `Document/`: The specific module being worked on.
    *   `Services/`: **Critical.** Houses the primary business logic orchestrators (e.g., `DocumentService.php`).
    *   `Models/`: Database representations (e.g., `Document.php`).
    *   `Controllers/`: Handles HTTP request ingress.
*   **`public/`:** Web-accessible assets (compiled JS/CSS, images).
*   **`.continue/rules/`:** Contains this context file, guiding AI agents.

### Key Files & Roles
*   **`app/Modules/Document/Document/Services/DocumentService.php`:** **The central business workflow engine.** Never modify direct database access here; always use methods provided by the model or repository abstraction.
*   **`app/Modules/Document/Document/Models/Document.php`:** Manages data persistence, relationships, and core data integrity checks.
*   **`src/api-router.tsx` / `src/router.tsx`:** Define the frontend navigation graph.

### Important Configuration Files
*   **`package.json` & `tsconfig.json`:** Define frontend dependencies and TypeScript compilation targets.
*   **`.env.*`:** Contains environment-specific secrets (database credentials, API keys). **Never commit secrets.**

---

## ⚙️ Development Workflow

### Coding Standards & Conventions
*   **PHP:** Adhere to PSR-12 standards. Utilize proper Laravel Service/Repository patterns for logic isolation. Favor immutability where state modification is complex.
*   **TypeScript/React:** Use functional components with hooks. Type safety must be maintained across all data flow boundaries (especially between API calls and component props).

### Testing Approach
The application requires a **Three-Tier Testing Strategy**:
1.  **Unit Tests (Mocking):** Test individual components/functions (e.g., a specific utility function or component rendering). Mock all external services (Auth, Storage).
2.  **Service Tests (Isolation):** Test the `DocumentService` in isolation by mocking Model/Storage layer interactions to verify the correct business path execution flow.
3.  **Integration Tests (E2E):** Test the entire stack by making a real API call from the frontend test runner to ensure all layers communicate correctly.

### Build and Deployment Process
*   **Frontend Build:** `npm run build` (This compiles the TypeScript into optimized, static assets placed in `public/`).
*   **Backend Build:** Typically involves running `composer install` and ensuring environment variables are set before starting the server: `php artisan serve`.
*   **Deployment:** Follow CI/CD pipeline guidelines which involves building the frontend assets *before* deploying the PHP backend code.

### Contribution Guidelines
1.  Branching must occur from `develop` or `main`.
2.  All new features must implement a corresponding test case.
3.  Code reviews are mandatory, paying close attention to any logic added directly to the Service Layer vs. Model Layer.

---

## 🧩 Key Concepts

### Domain-Specific Terminology
*   **Document:** An abstract record in the system, regardless of whether it is physical content (`document_type = file`) or a container (`document_type = folder`).
*   **Parent ID (`parent_id`):** Defines the hierarchical relationship (Folder structure).
*   **Service Layer:** The dedicated code space for *what* the system does (business rules); it is independent of *how* the request arrived (HTTP/API).

### Core Abstractions & Patterns
*   **Service Layer Pattern:** Centralization of complex logic (e.g., `DocumentService`).
*   **Repository Pattern (Implied):** While not explicitly seen, the Service Layer should wrap Model interactions to abstract the database details.
*   **Component Pattern (Frontend):** UI concerns are broken down into small, reusable, and highly testable units.

---

## 📋 Common Tasks

### 1. Creating a New Module/Feature (Backend)
1.  Generate required files using scaffolding (e.g., `php artisan module:generate Document`).
2.  Implement the core logic in `Services/` first.
3.  Update the routing definitions (`api.php`) in the relevant module.
4.  Write a comprehensive service unit test.

### 2. Adding a New UI Component (Frontend)
1.  Create the structure within `src/components/`.
2.  Define its props and state management logic using a custom hook (`src/hooks/`).
3.  Wire it into the appropriate layout or feature page in `src/features/`.

---

## 🚨 Troubleshooting

*   **Error: Service methods failing unexpectedly:** **Check the unit tests for the service layer first.** This indicates a business logic gap or dependency failure, not an HTTP issue.
*   **Error: 500 on API call:** Check the Laravel logs (`storage/logs/laravel.log`) and the backend service logs. The issue is likely PHP/DB related.
*   **Error: Blank page or routing loop on frontend:** Check `src/router.tsx` and ensure that all API endpoints documented in the backend are accounted for in the frontend routes.

## 🔗 References
*   **Laravel Documentation:** [Official Laravel Docs] (For core framework mechanics).
*   **React/TypeScript:** [Official React Documentation] (For best practices in hooks and components).

***