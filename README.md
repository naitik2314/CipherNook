# CipherNook

CipherNook combines “cipher” (implying strong encryption and security) with “nook,” which suggests a safe, secluded spot for your sensitive data.

## Features
- Securely store and manage your passwords.
- Generate strong, customizable passwords.
- User-friendly interface with dark mode support.
- Categorize and search passwords easily.

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Python](https://www.python.org/) (for the backend)

## Getting Started

### Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Create a virtual environment (optional but recommended):
   - Using Python's `venv`:
     ```bash
     python -m venv env
     source env/bin/activate  # On Windows: env\Scripts\activate
     ```
   - Using Conda:
     ```bash
     conda create -n ciphernook python=3.9
     conda activate ciphernook
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the backend server:
   ```bash
   python main.py
   ```
5. Run the backend server using Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the `FrontEnd` directory:
   ```bash
   cd FrontEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### SQLCipher Setup

To enable database encryption using SQLCipher, follow these steps:

1. Install SQLCipher:
   - On Windows, download and install SQLCipher from the official website or use a package manager like `choco`.
   - On Linux, use your package manager (e.g., `apt install sqlcipher`).
   - On macOS, use Homebrew: `brew install sqlcipher`.

2. Update the backend to use SQLCipher:
   - Ensure the `PRAGMA key` statement is included in the database connection code.
   - Replace `your-encryption-key` with a secure key of your choice.

3. Test the setup:
   - Run the backend and ensure the database is encrypted by attempting to open it with a standard SQLite client (it should fail without the key).

### Frontend Decryption

The frontend automatically decrypts passwords fetched from the backend. Ensure the backend sends encrypted passwords in Base64 format for compatibility.

### Accessing the Application
- Open your browser and navigate to `http://localhost:3000` (or the port shown in the terminal).

## Offline Usage

CipherNook can be run offline for enhanced security. Follow these steps:

### Backend Setup (Offline)
1. Ensure Python is installed on your system.
2. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
3. Start the backend server:
   ```bash
   python main.py
   ```
4. Run the backend server using Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup (Offline)
1. Navigate to the `FrontEnd` directory:
   ```bash
   cd FrontEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the frontend for production:
   ```bash
   npm run build
   ```
4. Serve the built files locally using a static file server:
   ```bash
   npx serve dist
   ```

### Accessing the Application Offline
- Open your browser and navigate to `http://localhost:5000` (or the port shown in the terminal).

## Running on Raspberry Pi Zero 2W

CipherNook can be deployed on a Raspberry Pi Zero 2W for a compact and secure setup.

### Prerequisites
- Raspberry Pi OS installed on the Pi Zero 2W.
- Python and Node.js installed on the Pi.

### Steps
1. Clone the repository onto the Pi:
   ```bash
   git clone <repository-url>
   cd CipherNook
   ```
2. Follow the [Backend Setup](#backend-setup) and [Frontend Setup](#frontend-setup) instructions.
3. Use the Pi's IP address to access the application from other devices on the same network.

## Folder Structure
- `Backend/`: Contains the backend code (FastAPI-based).
- `FrontEnd/`: Contains the frontend code (React + TypeScript).
- `src/components/`: Organized components for the frontend.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
