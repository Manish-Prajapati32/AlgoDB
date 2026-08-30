[README.md](https://github.com/user-attachments/files/31619855/README.md)
# AlgoDB Master 🚀
### Interactive Visual Learning Platform for Data Structures, Algorithms & DBMS

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**AlgoDB Master** is an intuitive, all-in-one educational web application crafted to help computer science students, software engineers, and bootcamp learners master **Data Structures**, **Algorithms**, and **Database Management Systems (DBMS)** through step-by-step interactive visualizations, algorithm execution simulations, and hands-on SQL query playgrounds.

> 🤖 **Built with vibe coding** — this project was developed using AI-assisted ("vibe coded") workflows to accelerate iteration on the UI and visualizations.

---

## 🌟 Key Features

### 1. 🧩 Interactive DSA Visualizer
Understand how data structures work under the hood with step-by-step execution, pointer tracking, and real-time state visualization.
- **Array Operations**: Visualize contiguous memory allocation, insertions, deletions, and element shifts with index indicators.
- **Searching Algorithms**: Interactive Binary Search on sorted arrays with low, mid, and high pointer highlights.
- **Sorting Algorithms**: Step-by-step Bubble Sort with swap animations, comparison states, and sorted element locks.
- **Stacks (LIFO) & Queues (FIFO)**: Real-time push, pop, enqueue, and dequeue operations with dynamic capacity tracking.
- **Linked Lists**: Node-by-node traversal, pointer redirections, head/tail adjustments, and custom value insertion.
- **Binary Search Tree (BST)**: Visual tree node placement, recursive value comparisons, and dynamic branching.
- **Playback Controls**: Play, pause, step forward/backward, reset, and adjust playback speed dynamically.
- **Complexity Analysis & Pseudocode**: Synchronized code highlights with Big-O Time and Space complexities.

---

### 2. 🗄️ DBMS Master Class & Visual Modeling
Demystify core database architecture and theoretical concepts through intuitive graphical models.
- **DBMS Architecture & Fundamentals**: 3-Schema Architecture breakdown (External, Conceptual, and Internal levels) and Data vs. Information distinctions.
- **Entity-Relationship (ER) Modeling**: Visual ER diagrams representing Entities, Attributes, and Relationships.
- **Normalization Pipeline**: Step-by-step walk-through of **1NF** (Atomicity), **2NF** (Partial Dependency elimination), and **3NF** (Transitive Dependency removal) with practical golden rules.
- **ACID Properties**: Visual breakdown of **Atomicity**, **Consistency**, **Isolation**, and **Durability** in transactional databases.
- **Interactive Knowledge Quizzes**: Embedded concept check quizzes with instantaneous scoring, feedback, and comprehensive answer explanations.

---

### 3. 💻 SQL Query Playground
Practice database querying in a safe, interactive sandbox.
- **Query Editor**: Write and run standard SQL queries (`SELECT`, `WHERE`, filters, etc.).
- **Live Query Results**: Instant table render showing matched columns and rows.
- **Schema Explorer**: Interactive view of table structures (`students`, `enrollments`) with active column definitions.
- **Execution Logs & History**: Real-time console logs tracking execution timestamps and query statuses.
- **SQL Cheat Sheet**: Quick reference guide for essential SQL syntax and common queries.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Typography** | Inter & Fira Code (Google Fonts) |

---

## 📁 Project Structure

```text
├── components/
│   ├── dbms/
│   │   ├── DBMSViewer.tsx       # DBMS concepts, 3-schema, ER models & ACID
│   │   └── QuizComponent.tsx    # Interactive self-assessment quiz engine
│   ├── dsa/
│   │   ├── ArrayView.tsx        # Array operations visualizer
│   │   ├── DSAVisualizer.tsx    # Main DSA visualizer controller
│   │   ├── LinkedListView.tsx   # Linked list visualizer
│   │   ├── SearchView.tsx       # Binary Search visualizer
│   │   ├── SortView.tsx         # Sorting algorithms visualizer
│   │   ├── StackVisualizer.tsx  # Stacks & Queues visualizer
│   │   └── TreeView.tsx         # Binary Search Tree visualizer
│   ├── sql/
│   │   └── SQLPlayground.tsx    # SQL query editor, schema viewer & logs
│   ├── Sidebar.tsx              # Modular topic & category navigation
│   └── VisualizerShell.tsx      # Standard playback, pseudocode & complexity frame
├── App.tsx                      # Root application layout & module state
├── index.html                   # HTML entry point with styling & font links
├── index.tsx                    # React application mount
├── metadata.json                # Project metadata
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # TypeScript compiler configuration
├── types.ts                     # TypeScript shared interfaces and definitions
└── vite.config.ts               # Vite configuration
```

---

## 🚀 Getting Started

Follow these steps to run **AlgoDB Master** locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)

### 1. Clone the repository
```bash
git clone https://github.com/Manish-Prajapati32/AlgoDB.git
cd AlgoDB
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

### 3. Run the development server
```bash
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`** (or the port specified in your console).

### 4. Build for production
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🧭 Navigation & Modules

| Module | Topics Covered | Key Features |
|---|---|---|
| **DSA** | Arrays, Binary Search, Sorting, Stacks, Queues, Linked Lists, BST | Step-by-step playback, pointer indicators, Big-O metrics, pseudocode |
| **DBMS** | DBMS Basics, 3-Schema Architecture, ER Modeling, Normalization (1NF/2NF/3NF), ACID | Visual diagram representations, concept breakdowns, knowledge quizzes |
| **SQL** | Query Editor, Schema Inspector, Execution Console | Interactive query runner, table viewer, syntax cheat sheet |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 👤 Author

**Manish Prajapati**
B.E. Computer Science Engineering | AI/ML & Cybersecurity

- GitHub: [@Manish-Prajapati32](https://github.com/Manish-Prajapati32)
- LinkedIn: [Manish Prajapati](https://www.linkedin.com/in/manish-prajapati-863858324)
- Email: manishprajapati9563@gmail.com

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
