# Installing Node.js and npm on Windows

npm comes bundled with Node.js, so you only need to install Node.js.

## Method 1: Official Installer (Recommended)

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version (recommended)
   - Choose the Windows Installer (.msi) for your system (64-bit or 32-bit)

2. **Run the Installer:**
   - Double-click the downloaded `.msi` file
   - Follow the installation wizard
   - **Important:** Make sure to check "Add to PATH" option (usually checked by default)
   - Click "Next" through the installation steps
   - Click "Install" and wait for completion

3. **Verify Installation:**
   - Open a **new** PowerShell or Command Prompt window (important: restart your terminal)
   - Run these commands:
     ```powershell
     node --version
     npm --version
     ```
   - You should see version numbers (e.g., `v20.11.0` and `10.2.4`)

## Method 2: Using Chocolatey (If you have it)

If you have Chocolatey package manager installed:
```powershell
choco install nodejs-lts
```

## Method 3: Using Winget (Windows Package Manager)

If you have winget installed (Windows 10/11):
```powershell
winget install OpenJS.NodeJS.LTS
```

## After Installation

1. **Restart your terminal** (PowerShell/Command Prompt) to refresh PATH
2. Navigate to your project directory:
   ```powershell
   cd C:\Users\Genn\WebstormProjects\aquawise-frontend
   ```
3. Install project dependencies:
   ```powershell
   npm install
   ```
4. Start the development server:
   ```powershell
   npm run dev
   ```

## Troubleshooting

- **"node is not recognized"** after installation:
  - Close and reopen your terminal/PowerShell window
  - If still not working, restart your computer
  - Verify Node.js is in PATH: Check `C:\Program Files\nodejs\` exists

- **Need to update npm:**
  ```powershell
  npm install -g npm@latest
  ```

## Recommended Node.js Version

For this Next.js 14 project, use **Node.js 18.17 or later** (LTS version recommended).


