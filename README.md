# The Shakespeare Authorship Question: Interactive Research Hub

An interactive, academically grounded web application exploring the historical, biographical, and cryptographic evidence surrounding the Shakespeare authorship controversy. The project details the traditional Stratfordian attribution alongside the leading alternative candidates, with a focus on the Oxfordian theory (Edward de Vere, 17th Earl of Oxford), contemporary ciphers, and literary circles of the Elizabethan era.

---

## 🏛️ Core Features

### 1. Scholarly Mission Statement
*   **Elizabethan Welcome**: The page header features an elegantly styled, italicized mission statement framed by golden rule dividers, detailing the academic scope and objective of the research hub.

### 2. Candidates Dossier & Characteristics Matrix
*   **Detailed Profiles**: Dynamic biographical cards for the primary candidates: Edward de Vere, William Shakspere, Sir Francis Bacon, and Christopher Marlowe.
*   **Looney's Evaluation Matrix**: An interactive matrix matching each candidate against the 17 criteria established by J. Thomas Looney in *“Shakespeare” Identified* (1920).
*   **Typographic Legend**: A color-coded map key explaining the match status indicators: **Y** (Strong Match), **P** (Partial/Incomplete Match), and **N** (No Match).

### 3. Comparative & Synchronized Timeline
*   **Parallel Timelines**: A unified chronological overlay mapping key life events of Oxford and Shakspere, major historical events in England, and the publication/performance dates of the plays and sonnets.
*   **Candidate Age Displays**: Each timeline card displays the age of both candidates at the time of the event (highlighting key discrepancies, such as the continuation of Shakespearean publications long after Oxford's death in 1604).
*   **Filters**: Category filters (Works, Historical Context, Edward de Vere, Stratford Shakspere) for modular reading.

### 4. Interactive Continental Travels Map
*   **Leaflet.js Engine**: A fully interactive map using the high-contrast CartoDB Voyager tile system, geolocated with real-world lat/lon coordinates.
*   **Chronological Itinerary**: Maps de Vere's grand tour (Paris ➔ Strasbourg ➔ Italy ➔ France) with automated panning, displaying play connections, notable artworks, and people met at each stop.
*   **Animated Direction Flow**: Features a CSS-animated dashed line that dynamically flows in the direction of the historic journey.

### 5. Literary Connectivity Network Graph
*   **D3.js Social Network**: A force-directed network graph visualizing the social, familial, and literary connections between 18 key figures of the Elizabethan court and theater.
*   **Occlusion-Free Layout**: Custom-spaced links and interactive node highlighting.

### 6. Decryption & Cipher Panel
*   **1609 Sonnets Quarto**: Analyzes the original 30-word dedication page side-by-side with the digital layout.
*   **6-2-4 Selection & Grid Extraction**: Highlights the cryptographic structure and reveals the hidden reference to Edward de Vere.

---

## 🎨 Authentic Historical Assets
Rather than using modern AI-generated illustrations or generic placeholders, all visual media in this project are authentic historical portraits, prints, and site photographs:
*   **Edward de Vere Portrait**: The Welbeck Abbey portrait of de Vere, painted in Paris in 1575.
*   **William Shakspere Portrait**: The Chandos Portrait by John Taylor, dated to the early 17th century.
*   **Francis Bacon Portrait**: The 1617 portrait by Paul van Somer.
*   **Christopher Marlowe Portrait**: The 1585 anonymous portrait from Corpus Christi College, Cambridge.
*   **Sonnets Dedication Page**: A high-resolution scan of the original 1609 Thomas Thorpe Quarto dedication.
*   **Stratford Monument**: Sir William Dugdale's 1656 engraving from *Antiquities of Warwickshire*, compared side-by-side with a 1904 photograph showing the post-restoration alterations.
*   **Juliet's Balcony**: A real photograph of the *Casa di Giulietta* courtyard in Verona, Italy.
*   **Titian's Venice Studio**: Titian's actual self-portrait from the Museo del Prado.

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

