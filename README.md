# Quantum Computing Web Application

A full-stack quantum computing analysis suite built with React (frontend) and Flask (backend). This application allows users to input QASM code, visualize quantum circuits, and analyze qubit states with detailed mathematical calculations.

## Features

- **QASM Code Input**: Text input with file upload support
- **Circuit Visualization**: Real-time quantum circuit diagram generation
- **Qubit Analysis**: Bloch sphere visualization, density matrices, and purity calculations
- **Detailed Calculations**: In-depth mathematical breakdowns for each qubit
- **Responsive Design**: Modern UI with quantum-themed animations

## Architecture

### Frontend (React + TypeScript + Vite)
- Modern React application with TypeScript
- TailwindCSS for styling
- React Router for navigation
- Context API for state management
- Quantum-themed animated background

### Backend (Flask + Qiskit)
- Flask REST API with CORS support
- Qiskit for quantum circuit processing
- Matplotlib for visualization generation
- Real-time quantum state analysis

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask server:
   ```bash
   python app.py
   ```
   The backend will run on http://localhost:5000

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173

## Usage

1. **Input QASM Code**: Enter your quantum assembly code in the text area or upload a .qasm file
2. **Run Analysis**: Click the "Run Analysis" button to process the circuit
3. **View Results**: 
   - See the circuit diagram in the top-right panel
   - Analyze individual qubits in the bottom panel with Bloch spheres and properties
4. **Detailed Calculations**: Click "View Full Calculation" for mathematical breakdowns

## API Endpoints

- `POST /process`: Process QASM code and return circuit analysis
- `GET /calculation/<qubit_idx>`: Get detailed calculation for specific qubit

## Sample QASM Code

```qasm
OPENQASM 2.0;
include "qelib1.inc";
qreg q[3];
creg c[1];
h q;
cx q,q[2];
rx(0.5) q[1];
```

## Technologies

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- Lucide React for icons

**Backend:**
- Flask web framework
- Qiskit for quantum computing
- NumPy for numerical computations
- Matplotlib for visualization
- Flask-CORS for cross-origin requests

## Note

This application requires both the Flask backend and React frontend to be running simultaneously. The backend handles quantum circuit processing while the frontend provides the user interface and visualization.