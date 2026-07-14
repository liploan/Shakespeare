# The Shakespeare Authorship Question: Interactive Research Hub

An interactive, academically grounded web application exploring the historical, biographical, and cryptographic evidence surrounding the Shakespeare authorship controversy. The project details the traditional Stratfordian attribution alongside the leading alternative candidates, with a focus on the Oxfordian theory (Edward de Vere, 17th Earl of Oxford), contemporary ciphers, and literary circles of the Elizabethan era.

---

## 🏛️ Core Features

### 1. Candidates Dossier & Characteristics Matrix
*   **Detailed Profiles**: Dossiers on the primary historical candidates: Edward de Vere, William Shakspere of Stratford, Sir Francis Bacon, and Christopher Marlowe.
*   **Looney's Evaluation Matrix**: An interactive matrix mapping each candidate against the 17 distinct personality traits and biographical criteria identified by J. Thomas Looney in *"Shakespeare" Identified* (1920). 

### 2. Comparative & Synchronized Timeline
*   **Parallel Timelines**: A unified chronological overlay mapping key life events of Oxford and Shakspere, major historical events in England, and the publication/performance dates of the plays and sonnets.
*   **Candidate Age Displays**: Each timeline card displays the age of both candidates at the time of the event (highlighting key discrepancies, such as the continuation of Shakespearean publications long after Oxford's death in 1604).
*   **Filters**: Category filters (Works, Historical Context, Edward de Vere, Stratford Shakspere) for modular reading.

### 3. Interactive Continental Travels Map
*   **Geolocated grand Tour**: An interactive Leaflet.js mapping interface detailing Edward de Vere's 1575–1576 continental journey through France, Germany, and Italy.
*   **Play Connections & Art**: Highlights how de Vere's travels match the local geography, settings, characters, and cultural milestones referenced in the Italian plays (e.g., Venice, Verona/Padua, Florence, Palermo).
*   **Directional Flow**: Uses a CSS-animated flowing route to indicate the chronological path of travel.

### 4. Literary Connectivity Network Graph
*   **Force-Directed Social Graph**: An interactive network mapping the social, familial, and literary connections between 18 prominent figures of the Elizabethan era.
*   **High-Detail Interconnections**: Illustrates the close-knit bonds between candidates, nobility (including de Vere's daughters and Robert Cecil), and contemporary writers (Ben Jonson, John Lyly).

### 5. Decryption & Cipher Panel
*   **Thomas Thorpe's Dedication**: A cryptographic examination of the famous 30-word dedication page of the 1609 Sonnets Quarto.
*   **6-2-4 Selection Analysis**: An interactive tool highlighting the specific line structure (6 lines, 2 lines, 4 lines) spelling out hidden names.
*   **Hidden Text Extractor**: Highlights the grid words that form the cipher message referencing Edward de Vere.

---

## 🛠️ Technology Stack
*   **Structure & Layout**: Semantic HTML5
*   **Styling**: Custom Vanilla CSS3 (curated parchment backgrounds, rich burgundy/gold accent palettes, and smooth transitions)
*   **Interactive Maps**: Leaflet.js (powered by CartoDB Voyager tiles)
*   **Data Visualization**: D3.js (force-directed network graph rendering)
*   **Logic & State**: Pure ES6+ JavaScript

---

## 🚀 Running the Project Locally

The application runs entirely in the browser as a static site. To run it locally:

1.  Clone or open the repository folder.
2.  Start a local development server (to bypass browser CORS policy for local files and image resources):
    ```bash
    # Using Python 3
    python3 -m http.server 8001
    ```
3.  Open your browser and navigate to:
    [http://localhost:8001](http://localhost:8001)

---

## 📜 Version Control & Public Hosting

This codebase is configured with Git version control and automated serverless hosting:

### 1. Push Code to GitHub
Ensure your local project is linked and pushed to your remote repository:
```bash
git add .
git commit -m "Configure automated GitHub Pages deployment"
git push -u origin main
```

### 2. Live Web Deployment (GitHub Pages)
The repository contains an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml` which deploys the static files on every push to the `main` branch.

To enable public hosting for your repository:
1. Go to your repository settings on GitHub.
2. Select **Pages** from the left sidebar.
3. Under **Build and deployment** ➔ **Source**, select **GitHub Actions** from the dropdown.

Once set, the site will be live and publicly accessible at:
➔ **[https://liploan.github.io/Shakespeare/](https://liploan.github.io/Shakespeare/)**

