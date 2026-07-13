/* app.js - Interactive Logic for the Shakespeare Authorship Hub */

// --- 1. TAB SYSTEM ---
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    
    // Toggle active tab buttons
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Toggle active content panel
    tabContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === `tab-${tabId}`) {
        content.classList.add('active');
      }
    });

    // Re-initialize SVG graph/map if switching tabs
    if (tabId === 'network') {
      setTimeout(initNetworkGraph, 100);
    } else if (tabId === 'travels') {
      setTimeout(initTravelMap, 100);
    }
  });
});


function switchTab(tabId) {
  const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (btn) {
    btn.click();
  }
}

// --- 2. CANDIDATES TAB MODALS ---
const modalOverlay = document.getElementById('detail-modal-overlay');
const modalTitle = document.getElementById('modal-title-text');
const modalBody = document.getElementById('modal-body-text');

const dossierData = {
  devere: {
    title: "Edward de Vere, 17th Earl of Oxford (1550–1604)",
    content: `
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h4 style="margin-bottom: 0.5rem; color: var(--color-devere);">Biographical Profile</h4>
          <p style="font-size: 0.95rem; margin-bottom: 1rem;">Edward de Vere was the 17th Earl of Oxford and Hereditary Lord Great Chamberlain of England. As a child, he became a royal ward in the home of William Cecil, Lord Burghley, where he received a superior classical education. He traveled extensively in France, Germany, and Italy, incurring massive debts and eventually squandering his ancestral estates. He patronized the theater, owned multiple acting companies (including Oxford's Boys), and was highly praised in his lifetime as a premier lyric poet and comic writer, though social stigma prevented noblemen from publishing under their own names.</p>
          <h4 style="margin-bottom: 0.5rem; color: var(--color-devere);">Key Oxfordian Arguments</h4>
          <ul style="margin-left: 1.5rem; font-size: 0.9rem; margin-bottom: 1rem;">
            <li><strong>Polonius Parody:</strong> Burghley's private maxims to his son match Polonius's advice to Laertes almost word-for-word.</li>
            <li><strong>The Pirate Incident:</strong> de Vere was captured and stripped by pirates in 1576 in the English Channel, mirroring Hamlet's sea capture.</li>
            <li><strong>Italian Geography:</strong> The plays set in Northern Italy display direct, sensory experience of Venice, Padua, and the regional canal systems.</li>
            <li><strong>Folger Geneva Bible:</strong> de Vere's personal Bible contains annotations that match Shakespeare's biblical allusions with high statistical correlation.</li>
          </ul>
        </div>
        <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.02); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color);">
          <h4 style="margin-bottom: 0.5rem; color: #fff;">Major Challenges</h4>
          <p style="font-size: 0.9rem; margin-bottom: 1rem; color: var(--color-muted);">Oxford died in 1604, whereas traditional dating places the composition of late plays like <em>The Tempest</em> (1611) and <em>Macbeth</em> (1606) years later. Oxfordians respond that these plays contain no post-1604 topical references and were published or performed posthumously from his manuscripts.</p>
          <h4 style="margin-bottom: 0.5rem; color: #fff;">Primary Advocates</h4>
          <p style="font-size: 0.9rem; color: var(--color-muted);">J. Thomas Looney (<em>Shakespeare Identified</em>, 1920), Bonner Miller Cutting, Dr. Roger Stritmatter, Tom Regnier, Alexander Waugh.</p>
        </div>
      </div>
    `
  },
  shakspere: {
    title: "William Shakspere of Stratford (1564–1616)",
    content: `
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h4 style="margin-bottom: 0.5rem; color: var(--color-shakspere);">Biographical Profile</h4>
          <p style="font-size: 0.95rem; margin-bottom: 1rem;">William Shakspere (spelled variably in Stratford records) was born to a local glover, John Shakspere. He married Anne Hathaway in 1582, and after the "Lost Years," emerged in London as an actor, shareholder in the Globe, and theatrical investor. He accumulated significant wealth, buying New Place in Stratford and investing in local tithes. He was also recorded as a merchant who sued local debtors and hoarded grain during times of famine. He died in 1616 and was buried in Holy Trinity Church.</p>
          <h4 style="margin-bottom: 0.5rem; color: var(--color-shakspere);">Mainstream Arguments</h4>
          <ul style="margin-left: 1.5rem; font-size: 0.9rem; margin-bottom: 1rem;">
            <li><strong>The Title Pages:</strong> His name (or a variant) appears on the title pages of published quartos and the 1623 First Folio.</li>
            <li><strong>Contemporary Dedications:</strong> Ben Jonson, Leonard Digges, and others write tributes dedicated directly to him in the Folio.</li>
            <li><strong>Stratford Monument:</strong> The monument at Holy Trinity Church references his death and includes a bust representing him as a writer (though the original layout is disputed).</li>
          </ul>
        </div>
        <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.02); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color);">
          <h4 style="margin-bottom: 0.5rem; color: #fff;">Major Challenges</h4>
          <p style="font-size: 0.9rem; margin-bottom: 1rem; color: var(--color-muted);">No records prove he ever attended the local grammar school or university. There are no letters written by or to him that mention literary matters, no records of travel, and his detailed 3-page will contains no mention of books, plays, library assets, or theater shares.</p>
          <h4 style="margin-bottom: 0.5rem; color: #fff;">Primary Advocates</h4>
          <p style="font-size: 0.9rem; color: var(--color-muted);">Mainstream Shakespearean academics, Folger Shakespeare Library, Shakespeare Birthplace Trust.</p>
        </div>
      </div>
    `
  },
  bacon: {
    title: "Francis Bacon, 1st Viscount St Alban (1561–1626)",
    content: `
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h4 style="margin-bottom: 0.5rem; color: var(--color-accent);">Biographical Profile</h4>
          <p style="font-size: 0.95rem; margin-bottom: 1rem;">Francis Bacon was the son of Sir Nicholas Bacon (Lord Keeper of the Great Seal) and nephew of William Cecil, Lord Burghley. Educated at Trinity College, Cambridge, and Gray's Inn, he became a brilliant jurist, philosopher of science, and statesman, rising to the rank of Lord Chancellor. He is famous for establishing the Baconian method of scientific inquiry and writing extensive essays on philosophy, science, and law.</p>
          <h4 style="margin-bottom: 0.5rem; color: var(--color-accent);">Key Baconian Arguments</h4>
          <ul style="margin-left: 1.5rem; font-size: 0.9rem; margin-bottom: 1rem;">
            <li><strong>Legal Terminology:</strong> The plays contain highly sophisticated, metaphorical legal jargon that only an elite common-law jurist like Bacon could employ naturally.</li>
            <li><strong>Ciphers:</strong> Bacon wrote extensively on ciphers (e.g., the biliteral cipher) and proponents claim to have found deep encryptions in the First Folio spelling "Bacon."</li>
            <li><strong>Promus of Formularies:</strong> Bacon's personal notebook (the <em>Promus</em>) contains hundreds of unusual phrases and idioms that appear in Shakespeare's plays.</li>
          </ul>
        </div>
        <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.02); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color);">
          <h4 style="margin-bottom: 0.5rem; color: #fff;">Major Challenges</h4>
          <p style="font-size: 0.9rem; margin-bottom: 1rem; color: var(--color-muted);">Bacon's acknowledged writings are highly structured, scientific prose. His verified translations of the Psalms are widely viewed as pedestrian and lack the poetic grace and dramatic lyricism of the Shakespearean sonnets.</p>
          <h4 style="margin-bottom: 0.5rem; color: #fff;">Primary Advocates</h4>
          <p style="font-size: 0.9rem; color: var(--color-muted);">Delia Bacon, Ignatius Donnelly, Sir Edwin Durning-Lawrence.</p>
        </div>
      </div>
    `
  },
  marlowe: {
    title: "Christopher Marlowe (1564–1593)",
    content: `
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h4 style="margin-bottom: 0.5rem; color: var(--color-hist);">Biographical Profile</h4>
          <p style="font-size: 0.95rem; margin-bottom: 1rem;">Christopher Marlowe was the son of a shoemaker in Canterbury, but attended Cambridge on a scholarship. He became the premier dramatist of the early London stage, pioneering the dramatic blank verse that defined Elizabethan tragedy (e.g., <em>Doctor Faustus</em>, <em>Tamburlaine</em>). He also operated as a secret service agent under Sir Francis Walsingham.</p>
          <h4 style="margin-bottom: 0.5rem; color: var(--color-hist);">Key Marlovian Arguments</h4>
          <ul style="margin-left: 1.5rem; font-size: 0.9rem; margin-bottom: 1rem;">
            <li><strong>Stylistic Congruence:</strong> Stylometric analysis shows that early Shakespearean history plays are incredibly close to Marlowe's style.</li>
            <li><strong>The Faked Death Theory:</strong> Facing arrest and potential execution for atheism in 1593, Marlowe supposedly faked his death in a tavern brawl with the help of Walsingham's agents, fleeing to the Continent where he sent his plays back to England under the "Shakespeare" pseudonym.</li>
          </ul>
        </div>
        <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.02); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color);">
          <h4 style="margin-bottom: 0.5rem; color: #fff;">Major Challenges</h4>
          <p style="font-size: 0.9rem; margin-bottom: 1rem; color: var(--color-muted);">Marlowe's death is recorded in an official coroner's inquest in 1593. Proving he survived and spent 20 years in exile writing plays requires accepting a complex state conspiracy with no primary documentary backing.</p>
          <h4 style="margin-bottom: 0.5rem; color: #fff;">Primary Advocates</h4>
          <p style="font-size: 0.9rem; color: var(--color-muted);">Calvin Hoffman, Wilbur G. Zeigler.</p>
        </div>
      </div>
    `
  }
};

function openCandidateModal(candidateId) {
  const data = dossierData[candidateId];
  if (data) {
    modalTitle.innerHTML = data.title;
    modalBody.innerHTML = data.content;
    modalOverlay.classList.add('active');
  }
}

function openMonumentDetails() {
  modalTitle.innerHTML = "Stratford Monument Alterations & Westminster Burial Codes";
  modalBody.innerHTML = `
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 280px;">
        <h4 style="margin-bottom: 0.5rem; color: var(--color-devere);">The Stratford Bust Alteration (1720s)</h4>
        <p style="font-size: 0.9rem; margin-bottom: 1rem;">Oxfordian researchers, particularly Alexander Waugh, argue that the original monument to Shakespeare at Holy Trinity Church did not show a writer holding a pen. The earliest engraving of the monument—sketched by William Dugdale in 1634 and published in 1656—depicts a downcast man clutching a sack of grain to his chest. Proponents argue that the monument was altered around 1720 by the Stratford church to create a 'writer' bust to support the tourist trade, replacing the merchant's grain sack with a writing cushion and quill.</p>
        <h4 style="margin-bottom: 0.5rem; color: var(--color-devere);">The Westminster Abbey 1740 Codes</h4>
        <p style="font-size: 0.9rem;">Waugh claimed that the Shakespeare monument in Westminster Abbey (built in 1740) was secretly designed by initiates (Pope, Burlington) who knew that de Vere was the true author. They placed the monument in Poets' Corner at the precise spot where de Vere's remains had been reinterred, using geometry, word alignments, and Masonic signatures (like the Triple Tau) to point to the truth.</p>
      </div>
      <div style="flex: 1; min-width: 280px; background: rgba(255,255,255,0.02); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <h4 style="margin-bottom: 0.5rem; color: #fff;">Leonard Digges's 'Moniment' Puns</h4>
        <p style="font-size: 0.9rem; margin-bottom: 1rem; color: var(--color-muted);">In the 1623 First Folio, Leonard Digges writes: <em>'When Time dissolves thy Stratford Moniment...'</em> Oxfordians point to the archaic spelling 'Moniment' (from the Latin verb <em>monere</em>, meaning 'to warn' or 'admonish'). They argue Digges was warning future readers that the Stratford monument was a decoy masking the real author's grave.</p>
        <h4 style="margin-bottom: 0.5rem; color: #fff;">Ben Jonson's 'Moniment' Echo</h4>
        <p style="font-size: 0.9rem; color: var(--color-muted);">Similarly, Jonson writes in the First Folio: <em>'Thou art a Moniment, without a tombe...'</em> indicating the author's real work is his monument, as he has no physical grave carrying his name.</p>
      </div>
    </div>
  `;
  modalOverlay.classList.add('active');
}

function closeModal() {
  modalOverlay.classList.remove('active');
}

// Close modal when clicking overlay
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Matrix highlighting logic
function highlightMatrixColumn(candidate, element) {
  // Reset matrix highlighting
  const table = document.getElementById('matrix-evaluation-table');
  if (!table) return;
  const cells = table.querySelectorAll('th, td');
  cells.forEach(c => c.style.backgroundColor = '');
  
  // Highlight active buttons
  const buttons = document.querySelectorAll('.matrix-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (candidate === 'devere') {
    const devereCells = table.querySelectorAll('.col-devere');
    devereCells.forEach(c => c.style.backgroundColor = 'rgba(197, 168, 128, 0.15)'); // soft gold highlight
    if (element) element.classList.add('active');
  } else if (candidate === 'shakspere') {
    const shakspereCells = table.querySelectorAll('.col-shakspere');
    shakspereCells.forEach(c => c.style.backgroundColor = 'rgba(28, 61, 39, 0.08)'); // forest green highlight
    if (element) element.classList.add('active');
  } else {
    if (element) element.classList.add('active');
    else if (buttons.length > 0) buttons[0].classList.add('active');
  }
}


// --- 3. TIMELINE SYSTEM ---
const timelineEvents = [
  { year: 1550, cat: "devere", title: "Edward de Vere Born", desc: "Born April 12 at Castle Hedingham, heir to the premier earldom of England.", detail: "His ancient lineage and feudal family background gave him the aristocratic vocabulary and perspective that saturates the history plays and tragedies." },
  { year: 1558, cat: "hist", title: "Elizabeth I Crowned", desc: "Elizabeth I accedes the throne, launching the Golden Age of English literature.", detail: "Her reign would see a boom in theater patronage and the rise of courtly entertainments managed by noblemen." },
  { year: 1562, cat: "devere", title: "Burghley Wardship Begins", desc: "de Vere's father dies; he becomes a royal ward in Lord Burghley's household.", detail: "In Cecil House, de Vere is raised by the Master of the Court of Wards, Lord Burghley (who matches Polonius). de Vere's tutor Arthur Golding translates Ovid's Metamorphoses here." },
  { year: 1564, cat: "shakspere", title: "William Shakspere Born", desc: "Born and baptized in Stratford-upon-Avon, son of John Shakspere.", detail: "Mainstream scholars place his education at the local grammar school, though no documentation exists proving he attended or received university training." },
  { year: 1575, cat: "devere", title: "Italian Travels", desc: "de Vere embarks on a 15-month continental tour, spending most of his time in Italy.", detail: "He stays in Venice, Padua, Siena, Florence, Genoa, and Palermo. He accumulates massive debts to Italian merchants, mirroring the spendthrift plot of Bassanio." },
  { year: 1576, cat: "devere", title: "Pirates and Return", desc: "Returning to England, de Vere's ship is attacked by Channel pirates.", detail: "He is stripped and released on the shores of England. This highly specific personal experience is later written word-for-word into Hamlet's letter to Horatio describing his voyage to England." },
  { year: 1581, cat: "devere", title: "Vavasour Feud", desc: "Affair with Anne Vavasour leads to imprisonment and street warfare in London.", detail: "A series of violent street sword-fights between de Vere's retinue and Vavasour's uncle, Sir Thomas Knyvet, breaks out in London. This street war directly mirrors the Montague-Capulet street battles." },
  { year: 1582, cat: "shakspere", title: "Marriage to Anne Hathaway", desc: "Shakspere marries Anne Hathaway under a hasty marriage bond in Worcester.", detail: "Susanna, their first daughter, is born just six months later in 1583." },
  { year: 1585, cat: "shakspere", title: "Twins Born / 'Lost Years' Begin", desc: "Twins Hamnet and Judith born. Shakspere disappears from records for 7 years.", detail: "This gap is labeled the 'Lost Years' by mainstream biographers who hypothesize he worked as a schoolmaster, sailor, or actor." },
  { year: 1586, cat: "devere", title: "£1,000 Annual Annuity", desc: "Queen Elizabeth I grants de Vere a massive £1,000 annual pension.", detail: "The pension, paid under the Privy Seal, required no accounting. Oxfordian scholars argue this served as a state-sponsored theater grant for Oxford's Boys to perform patriotic histories." },
  { year: 1588, cat: "hist", title: "Spanish Armada Defeated", desc: "England defeats the Spanish Armada, securing the nation from invasion.", detail: "de Vere commands a military force during the emergency; his wife Anne Cecil (daughter of Burghley) dies this same year." },
  { year: 1592, cat: "shakspere", title: "Green's 'Upstart Crow' attack", desc: "Robert Greene publishes a pamphlet warning of an 'upstart crow' in London.", detail: "This pamphlet contains the line 'an upstart Crow, beautified with our feathers... is in his owne conceit the onely Shake-scene in a countrey.' Oxfordians view this as a warning that Shakspere was a front-man acting as a broker for hidden aristocratic writers." },
  { year: 1593, cat: "works", title: "Venus & Adonis (First 'Shakespeare')", desc: "The name 'William Shakespeare' appears in print for the first time.", detail: "The narrative poem is dedicated to the young Earl of Southampton. de Vere was Southampton's prospective father-in-law at the time (Southampton refused the marriage)." },
  { year: 1597, cat: "shakspere", title: "New Place Purchase", desc: "Shakspere purchases New Place, the second-largest home in Stratford.", detail: "Records in Stratford show him lending money, buying land, and hoarding grain during a local food crisis." },
  { year: 1598, cat: "works", title: "Love's Labour's Lost Q1", desc: "First play published carrying the name 'W. Shakespere' on the title page.", detail: "Francis Meres publishes Palladis Tamia, listing Shakespeare's plays for comedy and tragedy, while separately listing the Earl of Oxford as 'best for comedy.'" },
  { year: 1601, cat: "hist", title: "Essex Rebellion", desc: "The Earl of Essex rebels against Elizabeth. Richard II is played to incite the crowd.", detail: "Essex's supporters paid the Globe players to stage Richard II. de Vere sat as a peer at Essex's trial, where Essex was executed and Southampton imprisoned." },
  { year: 1603, cat: "hist", title: "Accession of James I / Hamlet Q1", desc: "Elizabeth dies; James I accedes. First Quarto of Hamlet is published.", detail: "The theater troupe becomes the King's Men. Hamlet Q1 is published containing the name 'Corambis' for Polonius, parodying Burghley's motto." },
  { year: 1604, cat: "devere", title: "Edward de Vere Dies", desc: "Dies June 24 in Hackney. Buried at St. Augustine's.", detail: "This death date forms the major timeline boundary. Play staging continues at court, and several major plays are published for the first time after this date." },
  { year: 1609, cat: "works", title: "Sonnets Published", desc: "Thomas Thorpe publishes Shake-speares Sonnets.", detail: "The dedication page references the author as 'our ever-living poet.' This was a traditional Elizabethan euphemism for a deceased person, supporting de Vere's 1604 death over Shakspere's 1616 survival." },
  { year: 1616, cat: "shakspere", title: "William Shakspere Dies", desc: "Dies April 23 in Stratford. Buried in Holy Trinity Church.", detail: "His 3-page will lists household goods but mentions no books, manuscripts, library assets, or theater shares." },
  { year: 1623, cat: "works", title: "The First Folio", desc: "Ben Jonson and others compile the 36 plays of the First Folio.", detail: "The folio contains 18 plays that had never been published before (e.g. Macbeth, The Tempest). It is dedicated to the Earls of Pembroke and Montgomery, de Vere's sons-in-law." }
];

const timelineWrapper = document.getElementById('timeline-events-wrapper');
const timelineFilterButtons = document.querySelectorAll('.filter-btn');

function getCandidateAges(year) {
  let devereAge = "";
  if (year < 1550) devereAge = "Not yet born";
  else if (year === 1550) devereAge = "Born (Age 0)";
  else if (year > 1550 && year < 1604) devereAge = `Age ${year - 1550}`;
  else if (year === 1604) devereAge = "Dies (Age 54)";
  else devereAge = "Deceased";

  let shakspereAge = "";
  if (year < 1564) shakspereAge = "Not yet born";
  else if (year === 1564) shakspereAge = "Born (Age 0)";
  else if (year > 1564 && year < 1616) shakspereAge = `Age ${year - 1564}`;
  else if (year === 1616) shakspereAge = "Dies (Age 52)";
  else shakspereAge = "Deceased";

  return `Oxford: ${devereAge} | Shakspere: ${shakspereAge}`;
}

function renderTimeline(filter = 'all') {
  timelineWrapper.innerHTML = '';
  
  timelineEvents.forEach(evt => {
    if (filter !== 'all' && evt.cat !== filter) return;
    
    const item = document.createElement('div');
    item.className = `timeline-item cat-${evt.cat}`;
    const ageString = getCandidateAges(evt.year);
    
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-panel" onclick="toggleTimelineExpand(this)">
        <div class="timeline-date">
          <span>${evt.year}</span>
          <span class="timeline-cat-label">${evt.cat === 'devere' ? 'Oxford' : evt.cat === 'shakspere' ? 'Stratford' : evt.cat === 'works' ? 'Works' : 'History'}</span>
        </div>
        <div style="font-size: 0.8rem; color: var(--color-muted); margin-bottom: 0.5rem; font-weight: 500;">
          ${ageString}
        </div>
        <h4 class="timeline-title">${evt.title}</h4>
        <p class="timeline-desc">${evt.desc}</p>
        <div class="timeline-detail">
          <p>${evt.detail}</p>
        </div>
      </div>
    `;
    
    timelineWrapper.appendChild(item);
  });
}

function toggleTimelineExpand(panel) {
  panel.classList.toggle('expanded');
}

timelineFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    timelineFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    renderTimeline(filter);
  });
});

// Render initial timeline
renderTimeline('all');


// --- 4. CONNECTIVITY GRAPH SYSTEM (SVG) ---
// --- 4. CONNECTIVITY GRAPH SYSTEM (SVG) ---
const nodes = [
  { id: "devere", label: "Edward de Vere", x: 200, y: 360, r: 24, cat: "candidate", info: "<strong>Edward de Vere, 17th Earl of Oxford</strong><br>The central candidate. Royal Ward to Lord Burghley, Cecil House upbringing, son-in-law to Burghley, father-in-law to Derby and Pembroke. Praised as a premier poet and dramatist." },
  { id: "shakspere", label: "William Shakspere", x: 820, y: 360, r: 24, cat: "candidate", info: "<strong>William Shakspere of Stratford</strong><br>The traditional candidate. Actor and shareholder in the Globe, grain merchant, and properties investor. Dedicated poems to Southampton." },
  { id: "bacon", label: "Francis Bacon", x: 150, y: 220, r: 18, cat: "candidate", info: "<strong>Francis Bacon, 1st Viscount St Alban</strong><br>Philosopher and jurist. Nephew to Burghley, cousin to Robert Cecil and Anne Cecil. Gray's Inn associate. Had Ben Jonson as secretary." },
  { id: "marlowe", label: "Christopher Marlowe", x: 600, y: 80, r: 18, cat: "candidate", info: "<strong>Christopher Marlowe</strong><br>Playwright and secret agent. Employed by Walsingham, part of the School of Night with Walter Raleigh. Stylistically influenced early Shakespeare plays." },
  { id: "derby", label: "Earl of Derby", x: 740, y: 480, r: 18, cat: "candidate", info: "<strong>William Stanley, 6th Earl of Derby</strong><br>Derby's Men patron. de Vere's son-in-law. Jesuit spy reports in 1599 noted he was 'busy penning comedies for common players.'" },
  
  { id: "burghley", label: "Lord Burghley", x: 100, y: 480, r: 18, cat: "court", info: "<strong>William Cecil, Lord Burghley</strong><br>Elizabeth's Principal Secretary. de Vere's guardian/father-in-law, Robert Cecil's father. Parodied as Polonius in Hamlet." },
  { id: "robertcecil", label: "Robert Cecil", x: 350, y: 80, r: 16, cat: "court", info: "<strong>Robert Cecil, 1st Earl of Salisbury</strong><br>Burghley's son, de Vere's brother-in-law, Bacon's first cousin. Succeeded his father as Principal Secretary." },
  { id: "elizabeth", label: "Queen Elizabeth I", x: 500, y: 200, r: 20, cat: "court", info: "<strong>Queen Elizabeth I</strong><br>Elizabethan monarch. Granted de Vere his £1,000 pension in 1586. Main patron of court plays." },
  { id: "southampton", label: "Earl of Southampton", x: 880, y: 220, r: 18, cat: "court", info: "<strong>Henry Wriothesley, 3rd Earl of Southampton</strong><br>Patron of Shakespeare's narrative poems. Close ally to Essex; proposed husband to de Vere's daughter Elizabeth." },
  { id: "essex", label: "Earl of Essex", x: 720, y: 220, r: 18, cat: "court", info: "<strong>Robert Devereux, 2nd Earl of Essex</strong><br>Favorite of Elizabeth, leader of 1601 rebellion, close friend to Southampton. Rival to Robert Cecil." },
  { id: "walsingham", label: "Sir Francis Walsingham", x: 480, y: 80, r: 18, cat: "court", info: "<strong>Sir Francis Walsingham</strong><br>Elizabeth's spy master. Employed Christopher Marlowe. Father-in-law to Philip Sidney." },
  
  { id: "jonson", label: "Ben Jonson", x: 500, y: 360, r: 20, cat: "literary", info: "<strong>Ben Jonson</strong><br>Playwright and First Folio editor. Friend/rival to Shakspere; secretary/translator to Francis Bacon; patronized by Pembroke brothers." },
  { id: "marysidney", label: "Mary Sidney", x: 500, y: 480, r: 18, cat: "literary", info: "<strong>Mary Sidney, Countess of Pembroke</strong><br>Sister to Philip Sidney, mother to William and Philip Herbert. Major literary circle patron." },
  { id: "philipsidney", label: "Sir Philip Sidney", x: 760, y: 80, r: 16, cat: "literary", info: "<strong>Sir Philip Sidney</strong><br>Soldier, poet, and courtier. Brother of Mary Sidney, son-in-law to Walsingham, uncle to Pembroke brothers." },
  { id: "williamherbert", label: "William Herbert", x: 380, y: 560, r: 16, cat: "literary", info: "<strong>William Herbert, 3rd Earl of Pembroke</strong><br>First Folio dedicator. Betrothed to Bridget de Vere (de Vere's daughter); nephew to Philip Sidney." },
  { id: "philipherbert", label: "Philip Herbert", x: 500, y: 560, r: 16, cat: "literary", info: "<strong>Philip Herbert, 4th Earl of Pembroke</strong><br>First Folio dedicator. Married Susan de Vere (de Vere's daughter), making Oxford his father-in-law." },
  
  { id: "elizabethvere", label: "Elizabeth de Vere", x: 120, y: 360, r: 16, cat: "court", info: "<strong>Elizabeth de Vere, Countess of Derby</strong><br>de Vere's daughter, Burghley's granddaughter. Married William Stanley, Earl of Derby, in 1595." },
  { id: "susanvere", label: "Susan de Vere", x: 250, y: 560, r: 16, cat: "court", info: "<strong>Susan de Vere, Countess of Montgomery</strong><br>de Vere's daughter, Burghley's granddaughter. Married Philip Herbert, 4th Earl of Pembroke." }
];

const links = [
  { source: "devere", target: "burghley", label: "Ward / Son-in-Law" },
  { source: "devere", target: "elizabeth", label: "Royal Ward / Pensioner" },
  { source: "devere", target: "bacon", label: "Gray's Inn / Cecil Cousins" },
  { source: "devere", target: "jonson", label: "Patron / Associate" },
  { source: "devere", target: "robertcecil", label: "Brother-in-Law" },
  { source: "devere", target: "elizabethvere", label: "Father" },
  { source: "devere", target: "susanvere", label: "Father" },
  { source: "devere", target: "southampton", label: "Proposed Father-in-Law" },
  { source: "devere", target: "essex", label: "Court Rival" },
  
  { source: "elizabethvere", target: "derby", label: "Married (1595)" },
  { source: "susanvere", target: "philipherbert", label: "Married (1604)" },
  
  { source: "shakspere", target: "jonson", label: "Rival / Associate" },
  { source: "shakspere", target: "southampton", label: "Dedicated poems to" },
  { source: "shakspere", target: "williamherbert", label: "Dedicated First Folio" },
  { source: "shakspere", target: "philipherbert", label: "Dedicated First Folio" },
  
  { source: "bacon", target: "burghley", label: "Nephew" },
  { source: "bacon", target: "robertcecil", label: "First Cousin" },
  { source: "bacon", target: "essex", label: "Friend / Prosecutor" },
  { source: "bacon", target: "jonson", label: "Secretary / Translator" },
  
  { source: "robertcecil", target: "burghley", label: "Son" },
  
  { source: "marlowe", target: "walsingham", label: "Spy / Employer" },
  { source: "marlowe", target: "shakspere", label: "Literary Influence" },
  
  { source: "philipsidney", target: "marysidney", label: "Brother" },
  { source: "philipsidney", target: "walsingham", label: "Son-in-Law" },
  
  { source: "marysidney", target: "williamherbert", label: "Mother" },
  { source: "marysidney", target: "philipherbert", label: "Mother" },
  
  { source: "williamherbert", target: "jonson", label: "Patron / First Folio dedication" },
  { source: "philipherbert", target: "jonson", label: "Patron / First Folio dedication" },
  
  { source: "derby", target: "devere", label: "Son-in-Law" }
];

const svg = document.getElementById('relationship-svg');
const detailsPanel = document.getElementById('network-details-panel');

function initNetworkGraph() {
  if (!svg) return;
  svg.innerHTML = ''; // Clear SVG
  svg.setAttribute("viewBox", "0 0 1020 620");
  
  // 1. Draw Links (Lines)
  links.forEach((link, idx) => {
    const sourceNode = nodes.find(n => n.id === link.source);
    const targetNode = nodes.find(n => n.id === link.target);
    
    if (sourceNode && targetNode) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", sourceNode.x);
      line.setAttribute("y1", sourceNode.y);
      line.setAttribute("x2", targetNode.x);
      line.setAttribute("y2", targetNode.y);
      line.setAttribute("stroke", "rgba(94, 80, 63, 0.18)");
      line.setAttribute("stroke-width", "1.5");
      line.setAttribute("class", "link-line");
      line.setAttribute("id", `link-${link.source}-${link.target}`);
      line.dataset.source = link.source;
      line.dataset.target = link.target;
      line.dataset.label = link.label;
      
      svg.appendChild(line);
    }
  });

  // 2. Draw Nodes (Circles)
  nodes.forEach(node => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Circle element
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", node.r);
    circle.setAttribute("class", "node-circle");
    circle.setAttribute("id", `node-${node.id}`);
    
    // Styling nodes by category
    if (node.cat === 'candidate') {
      circle.setAttribute("fill", node.id === 'devere' ? 'var(--color-devere)' : node.id === 'shakspere' ? 'var(--color-shakspere)' : 'var(--color-accent)');
      circle.setAttribute("stroke", "#fff");
      circle.setAttribute("stroke-width", "2");
    } else if (node.cat === 'court') {
      circle.setAttribute("fill", "var(--bg-card)");
      circle.setAttribute("stroke", "var(--color-hist)");
      circle.setAttribute("stroke-width", "1.5");
    } else {
      circle.setAttribute("fill", "var(--bg-card)");
      circle.setAttribute("stroke", "var(--color-works)");
      circle.setAttribute("stroke-width", "1.5");
    }
    
    // Add interactions
    group.addEventListener('click', () => highlightNode(node.id));
    group.appendChild(circle);
    
    // Text element
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y + node.r + 14);
    text.setAttribute("class", "node-text");
    text.textContent = node.label;
    group.appendChild(text);
    
    svg.appendChild(group);
  });
}

function highlightNode(nodeId) {
  const node = nodes.find(n => n.id === nodeId);
  if (!node) return;
  
  // Highlight node circles
  const circles = svg.querySelectorAll('.node-circle');
  circles.forEach(c => {
    c.setAttribute("opacity", "0.3");
  });
  const activeCircle = svg.getElementById(`node-${nodeId}`);
  if (activeCircle) activeCircle.setAttribute("opacity", "1");
  
  // Highlight links connected to this node
  const lines = svg.querySelectorAll('.link-line');
  lines.forEach(l => {
    l.setAttribute("stroke", "rgba(94, 80, 63, 0.08)");
    l.setAttribute("stroke-width", "1.5");
    l.classList.remove('active');
  });
  
  let relationshipsHTML = `<h4 style="color: #fff; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">${node.label} Connections</h4>`;
  relationshipsHTML += `<p style="font-size: 0.9rem; margin-bottom: 1rem; color: #cbd5e1;">${node.info}</p>`;
  relationshipsHTML += `<ul style="margin-left: 1.2rem; font-size: 0.85rem; color: var(--color-muted); display: flex; flex-direction: column; gap: 0.5rem;">`;
  
  links.forEach(l => {
    if (l.source === nodeId || l.target === nodeId) {
      const line = svg.getElementById(`link-${l.source}-${l.target}`);
      if (line) {
        line.setAttribute("stroke", l.source === 'devere' || l.target === 'devere' ? 'var(--color-devere)' : 'var(--color-accent)');
        line.setAttribute("stroke-width", "3");
        line.classList.add('active');
      }
      
      const otherNodeId = l.source === nodeId ? l.target : l.source;
      const otherNode = nodes.find(n => n.id === otherNodeId);
      relationshipsHTML += `<li><strong>${l.label}:</strong> with <span style="color: #fff; font-weight: 600;">${otherNode.label}</span></li>`;
      
      // Also highlight the connected nodes
      const targetCircle = svg.getElementById(`node-${otherNodeId}`);
      if (targetCircle) targetCircle.setAttribute("opacity", "0.9");
    }
  });
  
  relationshipsHTML += `</ul>`;
  detailsPanel.innerHTML = relationshipsHTML;
}

// Reset graph highlighting when clicking empty areas of SVG
if (svg) {
  svg.addEventListener('click', (e) => {
    if (e.target === svg) {
      const circles = svg.querySelectorAll('.node-circle');
      circles.forEach(c => c.setAttribute("opacity", "1"));
      
      const lines = svg.querySelectorAll('.link-line');
      lines.forEach(l => {
        l.setAttribute("stroke", "rgba(94, 80, 63, 0.18)");
        l.setAttribute("stroke-width", "1.5");
        l.classList.remove('active');
      });
      
      detailsPanel.innerHTML = `
        <div class="network-info-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p><strong>Interactive Relationship Map</strong></p>
          <p>Click or hover over any node in the relationship network graph to view familial, literary, and court connections.</p>
        </div>
      `;
    }
  });
}


// --- 5. CIPHERS SYSTEM ---
const dedicationWords = [
  "TO.", "THE.", "ONLIE.", "BEGETTER.", "OF.", "THESE.", "INSVING.", "SONNETS.",
  "Mr.", "W.", "H.", "ALL.", "HAPPINESSE.", "AND.", "THAT.", "ETERNITIE.",
  "PROMISED.", "BY.", "OVR.", "EVER-LIVING.", "POET.", "WISHETH.", "THE.",
  "WELL-WISHING.", "ADVENTVRER.", "IN.", "SETTING.", "FORTH.", "T.", "T."
];

const dedicationContainer = document.getElementById('dedication-text-container');
let cipherStep = 0;

function initDedication() {
  if (!dedicationContainer) return;
  dedicationContainer.innerHTML = '';
  
  dedicationWords.forEach((word, idx) => {
    const span = document.createElement('span');
    span.textContent = word + " ";
    span.id = `dedication-word-${idx}`;
    dedicationContainer.appendChild(span);
  });
}

function toggle624Cipher() {
  initDedication();
  
  // Highlight words based on 6-2-4 layout lines
  // Line counts: 6 lines, 2 lines, 4 lines (Edward de Vere)
  // Highlight group 1 (First 8 words, approx lines 1-6)
  for (let i = 0; i < 8; i++) {
    document.getElementById(`dedication-word-${i}`).classList.add('highlight-6');
  }
  // Highlight group 2 (Words 8-12, approx lines 7-8)
  for (let i = 8; i < 13; i++) {
    document.getElementById(`dedication-word-${i}`).classList.add('highlight-2');
  }
  // Highlight group 3 (Words 13-21, approx lines 9-12)
  for (let i = 13; i < 22; i++) {
    document.getElementById(`dedication-word-${i}`).classList.add('highlight-4');
  }
}

function revealHiddenMessage() {
  toggle624Cipher();
  
  // Highlight the specific words that form the grid message:
  // "THESE SONNETS ALL BY EVER THE FORTH T"
  // Words: THESE (idx 5), SONNETS (idx 7), ALL (idx 11), BY (idx 17), EVER-LIVING (idx 19), THE (idx 22), FORTH (idx 27), T (idx 28)
  const codeIndices = [5, 7, 11, 17, 19, 22, 27, 28];
  
  // Remove basic highlights and apply code highlight
  dedicationWords.forEach((_, idx) => {
    const el = document.getElementById(`dedication-word-${idx}`);
    el.className = '';
    if (codeIndices.includes(idx)) {
      el.style.backgroundColor = 'var(--color-devere)';
      el.style.color = '#000';
      el.style.fontWeight = 'bold';
      el.style.boxShadow = '0 0 10px var(--color-devere)';
    } else {
      el.style.opacity = '0.3';
    }
  });
  
  document.getElementById('cipher-message-box').classList.add('active');
}

// --- 6. TRAVEL MAP SYSTEM ---
const travelCities = [
  { 
    id: "paris", 
    label: "Paris", 
    lat: 48.8566, 
    lng: 2.3522, 
    dates: "February – March 1575", 
    desc: "Oxford arrives in France with a retinue, meeting French King Henry III and the English Ambassador Valentine Dale.", 
    plays: "<strong>Shakespeare Connection:</strong> Setting of <em>All's Well That Ends Well</em> (the French court) and <em>Henry VI Part 1</em>.",
    locations: "Louvre Palace, Cathedral of Notre-Dame",
    art: "French Royal Portrait collections",
    people: "French King Henry III, Valentine Dale (Ambassador)",
    img: ""
  },
  { 
    id: "strasbourg", 
    label: "Strasbourg", 
    lat: 48.5734, 
    lng: 7.7521, 
    dates: "March 1575", 
    desc: "Stops here to meet the prominent Protestant humanist scholar and educator Johannes Sturm, whose educational ideas heavily influenced Hamlet's university background.", 
    plays: "<strong>Intellectual Context:</strong> Johannes Sturm's academy served as the model for elite education referenced in <em>Love's Labour's Lost</em>.",
    locations: "Strasbourg Cathedral, Sturm's Academy",
    art: "Early Strasbourg prints & architectural stone carvings",
    people: "Johannes Sturm (rector/philosopher)",
    img: ""
  },
  { 
    id: "venice", 
    label: "Venice", 
    lat: 45.4408, 
    lng: 12.3155, 
    dates: "May – June 1575 / Nov 1575", 
    desc: "Oxford rents a house, recovers from a severe illness, and borrows large sums of money from local Italian bankers (including Baptista Nigrone). He absorbs the local culture, language, and geography of the canals.", 
    plays: "<strong>Shakespeare Connection:</strong> Setting of <em>The Merchant of Venice</em> and <em>Othello</em>. The play displays direct knowledge of the Venetian Rialto and ferry systems.",
    locations: "Titian's Studio (San Canciano), St. Mark's Basilica, The Rialto Bridge",
    art: "Titian's late oil paintings (e.g., <em>Pietà</em>)",
    people: "Master painter Titian, banker Baptista Nigrone, local silk merchants",
    img: "images/titians_venice_studio.jpg"
  },
  { 
    id: "padua", 
    label: "Padua", 
    lat: 45.4064, 
    lng: 11.8768, 
    dates: "June – August 1575", 
    desc: "Stays near the University of Padua. Proponents suggest de Vere visited the local academic halls, botanical gardens, and courts.", 
    plays: "<strong>Shakespeare Connection:</strong> Setting of <em>The Taming of the Shrew</em> and closely connected to Verona settings of <em>Romeo and Juliet</em> and <em>Two Gentlemen of Verona</em>.",
    locations: "Romeo and Juliet's Balcony (Verona, short travel), University of Padua, Giotto's Arena Chapel",
    art: "Giotto's frescoes, Donatello's equestrian statue of Gattamelata",
    people: "Scholars at the University of Padua, local counts and merchants",
    img: "images/romeo_juliet_balcony.jpg"
  },
  { 
    id: "genoa", 
    label: "Genoa", 
    lat: 44.4056, 
    lng: 8.9463, 
    dates: "August 1575", 
    desc: "Meets local merchant-bankers to arrange further credit lines. Proponents trace the name of Shylock's creditor Tubal to Genoese families.", 
    plays: "<strong>Shakespeare Connection:</strong> Mentioned in <em>The Merchant of Venice</em> (Genoa travels of Tubal) and <em>The Taming of the Shrew</em>.",
    locations: "Palazzo Doria-Tursi, Genoa Harbor, local banking houses",
    art: "Genoese Renaissance palaces architecture",
    people: "Genoese money lenders, shippers, and cargo brokers",
    img: ""
  },
  { 
    id: "florence", 
    label: "Florence", 
    lat: 43.7696, 
    lng: 11.2558, 
    dates: "September 1575", 
    desc: "Visits the Grand Duke of Tuscany. Takes in the local theater and courtly pageantry.", 
    plays: "<strong>Shakespeare Connection:</strong> Setting of <em>All's Well That Ends Well</em> (the Florentine wars) and referenced in <em>Othello</em> (Michael Cassio as a Florentine).",
    locations: "Palazzo Pitti, Boboli Gardens, Uffizi Palace",
    art: "Michelangelo's David, Botticelli's masterpieces",
    people: "Grand Duke of Tuscany Francesco I de' Medici, local artists",
    img: ""
  },
  { 
    id: "siena", 
    label: "Siena", 
    lat: 43.3188, 
    lng: 11.3308, 
    dates: "October 1575", 
    desc: "Visits the local cathedral and courtly circles. Absorbs regional history.", 
    plays: "<strong>Shakespeare Connection:</strong> Setting elements and characters in Italian plays.",
    locations: "Siena Cathedral, Piazza del Campo",
    art: "Duccio's Maestà, Pinturicchio's Piccolomini Library frescoes",
    people: "Piccolomini family heirs, local nobility",
    img: ""
  },
  { 
    id: "palermo", 
    label: "Palermo", 
    lat: 38.1157, 
    lng: 13.3615, 
    dates: "December 1575 – January 1576", 
    desc: "Travels south to Sicily. Rents a villa in Palermo and issues a chivalric challenge to duel any challenger to represent the honor of Queen Elizabeth.", 
    plays: "<strong>Shakespeare Connection:</strong> Setting of <em>The Winter's Tale</em> (Sicilia) and <em>Much Ado About Nothing</em> (Messina, Sicily).",
    locations: "Palazzo dei Normanni, Capella Palatina",
    art: "Byzantine gold mosaics of Capella Palatina",
    people: "Viceroy of Sicily Marcantonio Colonna",
    img: ""
  },
  { 
    id: "lyon", 
    label: "Lyon", 
    lat: 45.7640, 
    lng: 4.8357, 
    dates: "March 1576", 
    desc: "Begins the journey back to England. Meets agents to arrange travel logs.", 
    plays: "<strong>Shakespeare Connection:</strong> Traversed in French history plays.",
    locations: "Lyon Roman Amphitheatre, Cathedral of Saint John",
    art: "Lyon Renaissance textiles and weaving art",
    people: "Local silk merchants, post riders",
    img: ""
  }
];

const travelDetailsPanel = document.getElementById('travel-details-panel');
let travelMapInstance = null;
let travelMarkers = {};

function initTravelMap() {
  const mapContainer = document.getElementById('travel-map');
  if (!mapContainer) return;

  // If map already initialized, invalidate size to refresh rendering on tab toggle
  if (travelMapInstance) {
    setTimeout(() => {
      travelMapInstance.invalidateSize();
    }, 100);
    return;
  }

  // Initialize Leaflet Map centered in Northern Italy / France
  travelMapInstance = L.map('travel-map', {
    center: [44.8, 8.5],
    zoom: 5,
    zoomControl: true
  });

  // Soft Voyager cream-blue basemap layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(travelMapInstance);

  // Itinerary chronological ordering
  const pathOrder = ["paris", "strasbourg", "venice", "padua", "genoa", "florence", "siena", "palermo", "lyon", "paris"];
  const latlngs = pathOrder.map(id => {
    const city = travelCities.find(c => c.id === id);
    return [city.lat, city.lng];
  });

  // Flow line polyline using CSS flow animation class
  L.polyline(latlngs, {
    color: 'var(--color-devere)',
    weight: 3.5,
    opacity: 0.8,
    className: 'travel-flow-line'
  }).addTo(travelMapInstance);


  // Draw node circle markers
  travelCities.forEach(city => {
    const marker = L.circleMarker([city.lat, city.lng], {
      radius: 8,
      fillColor: 'var(--bg-card)',
      color: 'var(--color-devere)',
      weight: 2.5,
      fillOpacity: 1.0
    }).addTo(travelMapInstance);

    marker.on('click', () => selectCity(city.id));
    travelMarkers[city.id] = marker;
  });

  // Select initial city (Paris) on load
  selectCity("paris");
}

function selectCity(cityId) {
  const city = travelCities.find(c => c.id === cityId);
  if (!city) return;

  // Reset highlight styles
  Object.keys(travelMarkers).forEach(key => {
    const m = travelMarkers[key];
    m.setStyle({
      fillColor: 'var(--bg-card)',
      color: 'var(--color-devere)',
      radius: 8
    });
  });

  // Highlight selected node
  const selectedMarker = travelMarkers[cityId];
  if (selectedMarker) {
    selectedMarker.setStyle({
      fillColor: 'var(--color-hist)',
      color: 'var(--color-accent)',
      radius: 10
    });
    
    if (travelMapInstance) {
      travelMapInstance.panTo([city.lat, city.lng]);
    }
  }

  // Update info panel
  let cityHtml = `<h4 style="color: var(--color-hist); margin-bottom: 0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.25rem; font-family: var(--font-serif); font-size: 1.6rem;">${city.label}</h4>`;
  cityHtml += `<div style="font-family: var(--font-serif); font-style: italic; color: var(--color-muted); font-size: 1.1rem; margin-bottom: 1rem; font-weight: 700;">${city.dates}</div>`;
  
  if (city.img) {
    cityHtml += `<div style="margin-bottom: 1.2rem; border-radius: 8px; overflow: hidden; border: 1.5px solid var(--border-color); box-shadow: 0 4px 10px rgba(0,0,0,0.1);"><img src="${city.img}" alt="${city.label} Detail" style="width: 100%; display: block; filter: sepia(0.05);"></div>`;
  }

  cityHtml += `<p style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--color-text); line-height: 1.6;">${city.desc}</p>`;
  
  // Historical Interactions list
  cityHtml += `<div style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.5; color: var(--color-muted); background: rgba(94, 80, 63, 0.03); border: 1px solid rgba(197, 168, 128, 0.15); padding: 1rem; border-radius: 6px;">`;
  cityHtml += `<div style="margin-bottom: 0.4rem;"><strong>Notable Locations:</strong> ${city.locations}</div>`;
  cityHtml += `<div style="margin-bottom: 0.4rem;"><strong>Works of Art:</strong> ${city.art}</div>`;
  cityHtml += `<div><strong>People Interacted With:</strong> ${city.people}</div>`;
  cityHtml += `</div>`;

  cityHtml += `<div style="background: #ebdcb9; border-left: 4px solid var(--color-devere); padding: 1rem; border-radius: 0 8px 8px 0; font-size: 1.05rem; color: var(--color-text); font-style: italic;">${city.plays}</div>`;
  
  travelDetailsPanel.innerHTML = cityHtml;
}

// Initialize on page load
initDedication();
initNetworkGraph();
initTravelMap();
