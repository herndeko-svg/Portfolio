/* =========================================================
   Portfolio NDEKO YOSHUA Héritier : interactions
   ========================================================= */

/* ---------- Liste des certifications ----------
   Pour ajouter un certificat : ajouter une ligne ici.
   "file" = chemin de l'image ou du PDF dans /certificats (laisser vide si pas encore scanné). */
const CERTIFICATIONS = [
  { group: "meal", icon: "fa-hand-holding-heart", fr: "Suivi, évaluation, redevabilité et apprentissage (MEAL) dans les situations d'urgence", en: "Monitoring, Evaluation, Accountability and Learning (MEAL) in Emergencies", issuer: "Save the Children / DisasterReady", date: "24/09/2026", file: "certificats/meal-urgence-save-the-children.jpg" },
  { group: "meal", icon: "fa-hand-holding-heart", fr: "Certificat sur les bases du MEAL", en: "MEAL Fundamentals Certificate", issuer: "DisasterReady (Cornerstone OnDemand Foundation)", date: "10/08/2026", file: "certificats/disasterready-bases-meal.jpg" },
  { group: "meal", icon: "fa-truck", fr: "Gestion des opérations de transport et de flotte", en: "Transport and fleet operations management", issuer: "Humanity & Inclusion (Atlas Logistique), financé par l'UE", date: "20/08/2026", file: "certificats/hi-atlas-transport-flotte.jpg" },
  { group: "meal", icon: "fa-mobile-screen", fr: "Collecte de données avec Google Forms, KoboToolbox, KoboCollect et ODK Collect", en: "Data collection with Google Forms, KoboToolbox, KoboCollect and ODK Collect", issuer: "Atelier des Savoirs (CFAS)", date: "03/2024", file: "certificats/cfas-collecte-kobo-odk.jpg" },
  { group: "meal", icon: "fa-mobile-screen", fr: "Collecte mobile de données avec KoboCollect et ODK", en: "Mobile data collection with KoboCollect and ODK", issuer: "Get Up International Academy", date: "10/2025", file: "certificats/getup-collecte-mobile.jpg" },

  { group: "data", icon: "fa-chart-simple", fr: "Microsoft Certified : Power BI Data Analyst Associate", en: "Microsoft Certified: Power BI Data Analyst Associate", issuer: "Microsoft", date: "31/07/2026", file: "certificats/microsoft-power-bi-associate.jpg" },
  { group: "data", icon: "fa-chart-simple", fr: "Certificate of Completion, Data Analysis", en: "Certificate of Completion, Data Analysis", issuer: "UNICEF Agora", date: "30/07/2026", file: "certificats/unicef-agora-data-analysis.jpg" },
  { group: "data", icon: "fa-square-root-variable", fr: "Analyse des données avec R, SPSS et Stata", en: "Data analysis with R, SPSS and Stata", issuer: "Eurêka Services", date: "03/06/2026", file: "certificats/eureka-r-spss-stata.jpg" },

  { group: "it", icon: "fa-shield-halved", fr: "Certified CSCSO : cybersécurité et protection des données", en: "Certified CSCSO: cybersecurity and data protection", issuer: "EU Cyber Academy", date: "11/03/2026", file: "certificats/eu-cyber-academy-cscso.jpg" },
  { group: "it", icon: "fa-satellite-dish", fr: "Les fondamentaux du VSAT et communication d'urgence", en: "VSAT fundamentals and emergency communication", issuer: "Fooka Academy", date: "27/05/2025", file: "certificats/fooka-vsat.jpg" },
  { group: "it", icon: "fa-walkie-talkie", fr: "Hands-On VHF/UHF Programming : Motorola, répéteurs et maintenance", en: "Hands-On VHF/UHF Programming: Motorola radios, repeaters & maintenance", issuer: "UNHCR (RETS)", date: "28/10/2025", file: "certificats/unhcr-vhf-uhf-programming.jpg" },
  { group: "it", icon: "fa-tower-broadcast", fr: "Long Range Security Communication Systems", en: "Long Range Security Communication Systems", issuer: "UNHCR (RETS)", date: "25/11/2025", file: "certificats/unhcr-long-range-security-comms.jpg" },
  { group: "it", icon: "fa-network-wired", fr: "Les fondements des réseaux : protocoles, outils et CLI", en: "Networking Foundations: protocols, tools and CLI", issuer: "LinkedIn Learning", date: "01/09/2026", file: "certificats/linkedin-reseaux-protocoles-cli.jpg" },
  { group: "it", icon: "fa-network-wired", fr: "Les fondements des réseaux : le dépannage", en: "Networking Foundations: troubleshooting", issuer: "LinkedIn Learning", date: "31/08/2026", file: "certificats/linkedin-reseaux-depannage.jpg" },
  { group: "it", icon: "fa-lock", fr: "Sécurité et administration réseaux (120 h)", en: "Network security and administration (120 h)", issuer: "CARS, Université Espoir d'Afrique", date: "20/08/2024", file: "certificats/cars-securite-admin-reseaux.jpg" },
  { group: "it", icon: "fa-network-wired", fr: "Réseaux informatiques (90 h)", en: "Computer networks (90 h)", issuer: "CARS, Université Espoir d'Afrique", date: "08/2024", file: "certificats/cars-reseaux-informatiques.jpg" },
  { group: "it", icon: "fa-server", fr: "Windows Server 2019 et son déploiement", en: "Windows Server 2019 and deployment", issuer: "CARS", date: "", file: "" },
  { group: "it", icon: "fa-phone-volume", fr: "Formation VoIP (voix sur IP)", en: "VoIP (Voice over IP) training", issuer: "Club EGNT", date: "09/2024", file: "certificats/voip.jpg" }
];

const CERT_GROUPS = [
  { id: "meal", profile: "meal", icon: "fa-hand-holding-heart", fr: "MEAL / Humanitaire", en: "MEAL / Humanitarian" },
  { id: "data", profile: "meal", icon: "fa-chart-pie", fr: "Data / Analyse", en: "Data / Analysis" },
  { id: "it", profile: "it", icon: "fa-network-wired", fr: "IT / Télécoms", en: "IT / Telecoms" }
];

/* ---------- Petites aides ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Lecture/écriture sécurisées du localStorage (peut être bloqué en navigation privée)
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignoré */ } }
};

let currentLang = "fr";
let currentProfile = "all";

/* ---------- Certifications : génération des cartes ---------- */
function renderCertifications() {
  const wrap = $("#cert-groups");
  const t = (fr, en) => (currentLang === "en" ? en : fr);
  wrap.innerHTML = CERT_GROUPS.map(g => {
    const cards = CERTIFICATIONS.filter(c => c.group === g.id).map(c => {
      const meta = [c.issuer, c.date].filter(Boolean).join(" · ");
      const action = c.file
        ? `<button class="cert-view" type="button" data-gallery="${c.file}" data-caption="${t(c.fr, c.en)}">
             <i class="fa-regular fa-eye" aria-hidden="true"></i> ${t("Voir le certificat", "View certificate")}
           </button>`
        : `<span class="cert-na">${t("Disponible sur demande", "Available on request")}</span>`;
      return `<article class="cert-card">
          <div class="cert-top">
            <span class="cert-logo"><i class="fa-solid ${c.icon}" aria-hidden="true"></i></span>
            <p class="cert-title">${t(c.fr, c.en)}</p>
          </div>
          ${meta ? `<p class="cert-meta">${meta}</p>` : ""}
          <div class="cert-actions">${action}</div>
        </article>`;
    }).join("");
    return `<div class="cert-group reveal visible" data-profile="${g.profile}">
        <h3><i class="fa-solid ${g.icon}" aria-hidden="true"></i> ${t(g.fr, g.en)}</h3>
        <div class="cert-grid">${cards}</div>
      </div>`;
  }).join("");
  applyProfile(currentProfile);
}

/* ---------- Langue FR / EN ----------
   Chaque élément traduisible porte l'attribut data-en ; le français d'origine est mémorisé dans data-fr. */
function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  $$("[data-en]").forEach(el => {
    if (el.dataset.fr === undefined) el.dataset.fr = el.innerHTML;
    el.innerHTML = lang === "en" ? el.dataset.en : el.dataset.fr;
  });
  $$("[data-en-alt]").forEach(el => {
    if (el.dataset.frAlt === undefined) el.dataset.frAlt = el.alt;
    el.alt = lang === "en" ? el.dataset.enAlt : el.dataset.frAlt;
  });
  renderCertifications();
  store.set("lang", lang);
}

/* ---------- Thème clair / sombre ---------- */
function isDark() {
  const forced = document.documentElement.dataset.theme;
  if (forced) return forced === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function updateThemeIcon() {
  $("#theme-toggle i").className = isDark() ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

/* ---------- Filtre par profil (MEAL & Data / IT & Télécoms) ---------- */
function applyProfile(profile) {
  currentProfile = profile;
  $$("main [data-profile]").forEach(el => {
    if (el.classList.contains("tab")) return;
    const tags = el.dataset.profile.split(" ");
    el.classList.toggle("is-hidden", profile !== "all" && !tags.includes(profile));
  });
}

/* ---------- Lightbox ---------- */
const lb = { el: null, img: null, list: [], index: 0, opener: null };
function openLightbox(list, opener, captions, start = 0) {
  lb.list = list; lb.index = start; lb.opener = opener;
  const multiple = list.length > 1;
  $("#lb-prev").hidden = !multiple;
  $("#lb-next").hidden = !multiple;
  lb.captions = captions || [];
  showLightboxImage();
  lb.el.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lb-close").focus();
}
function showLightboxImage() {
  const src = lb.list[lb.index];
  // Un PDF s'ouvre dans un nouvel onglet ; les images s'affichent dans la lightbox
  lb.img.src = src;
  lb.img.alt = lb.captions[lb.index] || lb.captions[0] || src.split("/").pop();
}
function closeLightbox() {
  lb.el.hidden = true;
  document.body.style.overflow = "";
  if (lb.opener) lb.opener.focus();
}
function stepLightbox(d) {
  lb.index = (lb.index + d + lb.list.length) % lb.list.length;
  showLightboxImage();
}

/* ---------- Compteurs animés ---------- */
function animateCounter(el) {
  const target = +el.dataset.target;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { el.textContent = target; return; }
  const start = performance.now(), duration = 1400;
  const tick = now => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Initialisation ---------- */
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();

  // Thème mémorisé
  const savedTheme = store.get("theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  updateThemeIcon();
  $("#theme-toggle").addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    store.set("theme", next);
    updateThemeIcon();
  });

  // Langue mémorisée
  setLang(store.get("lang") === "en" ? "en" : "fr");
  $("#lang-toggle").addEventListener("click", () => setLang(currentLang === "fr" ? "en" : "fr"));

  // Menu mobile
  const menuBtn = $("#menu-toggle"), links = $("#nav-links");
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$("#nav-links a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }));

  // Onglets de profil
  $$(".tab").forEach(tab => tab.addEventListener("click", () => {
    $$(".tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    applyProfile(tab.dataset.profile);
  }));

  // Filtres des réalisations
  $$(".filter").forEach(btn => btn.addEventListener("click", () => {
    $$(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    $$(".project-card").forEach(card => {
      card.style.display = f === "all" || card.dataset.cat === f ? "" : "none";
    });
  }));

  // Lightbox : délégation pour les vignettes, diplômes et certificats (y compris ceux générés)
  lb.el = $("#lightbox"); lb.img = $("#lb-img");
  document.addEventListener("click", e => {
    const trigger = e.target.closest("[data-gallery]");
    if (!trigger) return;
    const caption = el => (currentLang === "en" && el.dataset.enCaption) || el.dataset.caption || "";
    // Photos d'un même groupe (ex. « terrain ») : navigation entre toutes les photos visibles du groupe
    if (trigger.dataset.group) {
      const members = $$(`[data-group="${trigger.dataset.group}"]`).filter(el => el.offsetParent !== null);
      openLightbox(members.map(el => el.dataset.gallery), trigger, members.map(caption), members.indexOf(trigger));
      return;
    }
    const list = trigger.dataset.gallery.split("|");
    if (list[0].toLowerCase().endsWith(".pdf")) { window.open(list[0], "_blank", "noopener"); return; }
    openLightbox(list, trigger, [caption(trigger)]);
  });
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", () => stepLightbox(-1));
  $("#lb-next").addEventListener("click", () => stepLightbox(1));
  lb.el.addEventListener("click", e => { if (e.target === lb.el) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (lb.el.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && lb.list.length > 1) stepLightbox(-1);
    if (e.key === "ArrowRight" && lb.list.length > 1) stepLightbox(1);
    if (e.key === "Tab") { // garder le focus dans la lightbox
      const f = $$(".lb-btn", lb.el).filter(b => !b.hidden);
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  // Apparition au défilement, compteurs et barres de langues
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("visible");
      $$(".counter", el).forEach(animateCounter);
      $$(".bar", el).forEach(b => b.classList.add("filled"));
      io.unobserve(el);
    });
  }, { threshold: 0.15 });
  // Seuls les blocs situés sous l'écran au chargement sont masqués puis animés :
  // la première vue de la page reste toujours complète.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  $$(".reveal").forEach(el => {
    if (!reduceMotion && el.getBoundingClientRect().top > window.innerHeight) el.classList.add("pending");
    else el.classList.add("visible");
    io.observe(el);
  });

  // Lien du menu actif selon la section visible
  const navMap = new Map($$("#nav-links a").map(a => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navMap.forEach(a => a.classList.remove("active"));
      const a = navMap.get(entry.target.id);
      if (a) a.classList.add("active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navMap.forEach((a, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  // LinkedIn : masqué tant que l'adresse n'est pas renseignée dans index.html
  const li = $("#linkedin-link");
  if (li.getAttribute("href") === "#") li.hidden = true;

  // Bouton « Coordonnées sur demande » : pré-remplit l'objet du formulaire
  $("[data-ref-request]").addEventListener("click", () => {
    $("#f-subject").value = currentLang === "en" ? "Request for reference contact details" : "Demande des coordonnées des références";
  });

  // Copie dans le presse-papiers (avec repli : sélection du texte si la copie est refusée)
  async function copyText(text, fallbackEl) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      if (fallbackEl) {
        const r = document.createRange(); r.selectNodeContents(fallbackEl);
        const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      }
      return false;
    }
  }
  $$(".copy-btn").forEach(btn => btn.addEventListener("click", async () => {
    const ok = await copyText(btn.dataset.copy, btn.previousElementSibling);
    btn.textContent = ok ? (currentLang === "en" ? "Copied" : "Copié") : (currentLang === "en" ? "Selected" : "Sélectionné");
    setTimeout(() => { btn.textContent = currentLang === "en" ? "Copy" : "Copier"; }, 2000);
  }));

  // Formulaire de contact : prépare le message (WhatsApp ou copie pour un email)
  let preparedMessage = "";
  $("#contact-form").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#f-name").value.trim();
    const email = $("#f-email").value.trim();
    const subject = $("#f-subject").value.trim() || (currentLang === "en" ? "Contact from portfolio" : "Contact depuis le portfolio");
    const message = $("#f-message").value.trim();
    const err = $("#form-error");
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.textContent = currentLang === "en"
        ? "Please fill in your name, a valid email and a message."
        : "Merci d'indiquer votre nom, un email valide et un message.";
      err.hidden = false;
      return;
    }
    err.hidden = true;
    preparedMessage = `${subject}\n\n${message}\n\n${name}\n${email}`;
    $("#wa-send").href = `https://wa.me/243990156143?text=${encodeURIComponent(preparedMessage)}`;
    $("#copy-status").textContent = "";
    $("#form-ready").hidden = false;
  });
  $("#copy-msg").addEventListener("click", async () => {
    const ok = await copyText(preparedMessage, null);
    $("#copy-status").textContent = ok
      ? (currentLang === "en" ? "Message copied. Paste it into an email to herndeko@gmail.com." : "Message copié. Collez-le dans un email à herndeko@gmail.com.")
      : (currentLang === "en" ? "Your browser blocked the copy. Select your message text and copy it yourself." : "Votre navigateur a bloqué la copie. Sélectionnez le texte de votre message et copiez-le vous-même.");
  });
});
