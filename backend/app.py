import os
import io
import base64
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

from qiskit import QuantumCircuit, transpile
from qiskit_aer import Aer
from qiskit.visualization import plot_bloch_vector
from qiskit.quantum_info import Statevector, partial_trace, purity, DensityMatrix

import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

app = Flask(__name__) 
CORS(app)  

last_results = {}

def bloch_vector_from_density_matrix(rho):
    sigma_x = np.array([[0, 1], [1, 0]])
    sigma_y = np.array([[0, -1j], [1j, 0]])
    sigma_z = np.array([[1, 0], [0, -1]])
    x = np.real(np.trace(rho.data @ sigma_x))
    y = np.real(np.trace(rho.data @ sigma_y))
    z = np.real(np.trace(rho.data @ sigma_z))
    return np.array([x, y, z])

def render_matplotlib_fig(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight")
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode("utf-8")
    plt.close(fig)
    return img_base64

def render_circuit(qc):
    fig = qc.draw(output="mpl")
    return render_matplotlib_fig(fig)

def matrix_to_html(mat):
    html = "<table class='table table-sm table-bordered text-center'>"
    for row in mat:
        html += "<tr>"
        for val in row:
            html += f"<td>{val}</td>"
        html += "</tr>"
    html += "</table>"
    return html

@app.route("/")
def index():
    default_qasm = """OPENQASM 2.0;
include "qelib1.inc";
qreg q[3];
creg c[2];
h q[0];
cx q[0],q[1];
rx(0.5) q[2];
"""
    return render_template("index.html", default_qasm=default_qasm)

@app.route("/process", methods=["POST"])
def process():
    qasm_str = request.form["qasm_code"]
    if not qasm_str:
        return jsonify({"error": "QASM code is required"}), 400

    last_results["last_qasm"] = qasm_str

    try:
        qc = QuantumCircuit.from_qasm_str(qasm_str)
    except Exception as e:
        return jsonify({"error": f"QASM error: {str(e)}"})

    try:
        backend = Aer.get_backend("statevector_simulator")
        transpiled_qc = transpile(qc, backend)
        result = backend.run(transpiled_qc).result()
        statevector = result.get_statevector()

        full_density = DensityMatrix(statevector)
        num_qubits = qc.num_qubits

        circ_img = render_circuit(qc)

        qubit_data = []
        for qubit_idx in range(num_qubits):
            traced_rho = partial_trace(full_density, [i for i in range(num_qubits) if i != qubit_idx])
            purity_val = np.real(purity(traced_rho))
            bloch_vec = bloch_vector_from_density_matrix(traced_rho)

            fig = plot_bloch_vector(bloch_vec)
            fig.suptitle(f'Qubit {qubit_idx} Bloch Sphere')
            bloch_img = render_matplotlib_fig(fig)

            mat = np.array(traced_rho.data).round(4)
            mat_html = matrix_to_html(mat)

            full_math = f"""
            <b>Bloch vector calculation:</b><br>
            x = Tr(ρσₓ) = {np.real(np.trace(traced_rho.data @ np.array([[0, 1], [1, 0]]))):.4f}<br>
            y = Tr(ρσ_y) = {np.real(np.trace(traced_rho.data @ np.array([[0, -1j], [1j, 0]]))):.4f}<br>
            z = Tr(ρσ_z) = {np.real(np.trace(traced_rho.data @ np.array([[1, 0], [0, -1]]))):.4f}<br>
            <b>Density matrix:</b><br>
            {mat}<br>
            <b>Purity calculation:</b> Tr(ρ²) = {purity_val:.4f}<br>
            <b>Statevector:</b><br>
            {statevector}
            """

            qubit_data.append({
                "idx": qubit_idx,
                "bloch_img": bloch_img,
                "mat_html": mat_html,
                "purity": round(purity_val, 4),
                "bloch_vec": ", ".join([f"{x:.4f}" for x in bloch_vec]),
                "full_math": full_math
            })

        return jsonify({"circ_img": circ_img, "qubits": qubit_data})

    except Exception as e:
        return jsonify({"error": f"Processing error: {str(e)}"})

def matrix_to_html(mat):
    """Convert a 2D numpy array to an HTML table string with styling."""
    html = "<table style='border-collapse: collapse; width: auto;'>"
    for row in mat:
        html += "<tr>"
        for val in row:
            html += f"<td style='border: 1px solid #ddd; padding: 6px; text-align: center; font-family: monospace;'>{val}</td>"
        html += "</tr>"
    html += "</table>"
    return html

@app.route("/calculation/<int:qubit_idx>")
def calculation(qubit_idx):
    qasm_str = last_results.get("last_qasm", None)
    if qasm_str is None:
        return "No circuit data available—please run analysis first.", 404

    try:
        qc = QuantumCircuit.from_qasm_str(qasm_str)
        backend = Aer.get_backend("statevector_simulator")
        transpiled_qc = transpile(qc, backend)
        result = backend.run(transpiled_qc).result()
        statevector = result.get_statevector()

        full_density = DensityMatrix(statevector)
        num_qubits = qc.num_qubits
        if qubit_idx < 0 or qubit_idx >= num_qubits:
            return "Invalid qubit index.", 404

        reduced_rho = partial_trace(full_density, [i for i in range(num_qubits) if i != qubit_idx])
        purity_val = np.real(purity(reduced_rho))
        mat = np.array(reduced_rho.data).round(6)

        sigma_x = np.array([[0, 1], [1, 0]])
        sigma_y = np.array([[0, -1j], [1j, 0]])
        sigma_z = np.array([[1, 0], [0, -1]])

        x_val = np.real(np.trace(reduced_rho.data @ sigma_x))
        y_val = np.real(np.trace(reduced_rho.data @ sigma_y))
        z_val = np.real(np.trace(reduced_rho.data @ sigma_z))

        reduced_mat_html = matrix_to_html(mat)

        html = f"""
        <h1>Detailed Calculation for Qubit {qubit_idx} : </h1>
        <br/>
        <h3>Reduced Density Matrix (ρ):</h3><br/>
        {reduced_mat_html}
        <br/><br/>
        <h3>Pauli Matrices:</h3><br/>
        <pre>

    σₓ = [[0, 1],
        [1, 0]]

    σᵧ = [[0, -i],
        [i, 0]]

    σ𝓏 = [[1, 0],
        [0, -1]]
        </pre>
        <br/>
        <h2>Bloch Vector Components Calculation:</h2>
        <br/>
        <ul>
          <li><b>x = Tr(ρσₓ) =</b> {x_val:.6f}<br/></li>
          <br/>
          <li><b>y = Tr(​ρσᵧ) =</b> {y_val:.6f}<br/></li>
          <br/>
          <li><b>z = Tr(ρσ𝓏) =</b> {z_val:.6f}</li>
        </ul>
<br/><br/>
        <h2>Purity Calculation:</h2>
        <br/>
        <p>Purity = Tr(ρ²) = {purity_val:.6f}</p>
        
        """

        return html, 200, {"Content-Type": "text/html"}

    except Exception as e:
        return f"Error generating calculation details: {str(e)}", 500

if __name__ == "__main__":
    app.run(debug=True)
