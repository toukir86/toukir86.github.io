/**
 * publications.js
 * ===============
 * Automatically fetches and renders publications from the ORCID public API.
 *
 * HOW IT WORKS:
 *  1. Calls the ORCID public API for ORCID id 0000-0001-5111-7055
 *  2. Fetches work details (title, journal, year, DOI, contributors)
 *  3. Classifies each publication as first-author, co-author, or gbd
 *  4. Falls back to the FALLBACK_PUBLICATIONS list if the API is unavailable
 *
 * TO ADD A NEW PUBLICATION MANUALLY (fallback list):
 *  Add an entry to the FALLBACK_PUBLICATIONS array below following the same
 *  object structure. The page will use this list if ORCID is unreachable.
 *
 * ORCID NOTE:
 *  Make sure every new publication is added to your ORCID profile at
 *  https://orcid.org/0000-0001-5111-7055 — that's all you need to do
 *  for the auto-fetch to pick it up!
 */

const ORCID_ID = "0000-0001-5111-7055";
const ORCID_API = `https://pub.orcid.org/v3.0/${ORCID_ID}`;

// ─────────────────────────────────────────────────────────────────────────────
// FALLBACK PUBLICATIONS
// Used when ORCID API is unavailable (e.g. offline, CORS issues).
// Also used to enrich ORCID data with category/badge info.
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_PUBLICATIONS = [
  // ── 1st Author ─────────────────────────────────────────────────────────────
  {
    title: "Prevalence, determinants, and help-seeking behavior for major depressive disorder symptoms in the Lesotho population: A multilevel analysis from the Lesotho Demographic and Health Survey 2023–24",
    year: 2026,
    authors: "Noor STA, Yeasar S, Siddique S, Das O, Tanvir SU, & Islam RB",
    journal: "Social Psychiatry and Psychiatric Epidemiology",
    doi: "10.1007/s00127-026-03057-9",
    category: "first-author",
    badge: "1st Author",
  },
  {
    title: "Machine learning-based prediction of maternal continuum of care completion: Evidence from Bangladesh Demographic and Health Survey 2022",
    year: 2025,
    authors: "Noor STA, Islam RB, Yeasar S, & Siddique S",
    journal: "Array",
    doi: "10.1016/j.array.2025.100666",
    category: "first-author",
    badge: "1st Author",
  },
  {
    title: "Factors associated with early initiation of antenatal care in Bangladesh: a survival analysis using Bangladesh Demographic and Health Survey 2022",
    year: 2026,
    authors: "Islam MS, Noor STA, Asha RA, Islam RB, & Rahman F",
    journal: "BMJ Open",
    doi: "10.1136/bmjopen-2024-104709",
    category: "first-author",
    badge: "1st Author",
  },
  {
    title: "Prevalence, Determinants and Wealth-Related Inequality of Anxiety and Depression Symptoms Among Reproductive-Aged Women (15-49 Years) in Nepal: An Analysis of Nationally Representative Nepal Demographic and Health Survey Data 2022",
    year: 2025,
    authors: "Noor STA, Yeasar S, Siddique S, Banik R, & Raza S",
    journal: "Depression and Anxiety",
    doi: "10.1155/da/9942669",
    category: "first-author",
    badge: "1st Author",
  },
  {
    title: "Determinants of Multimorbidity in a Low-Resource Setting: A Population-Based Cross-Sectional Study in Bangladesh",
    year: 2025,
    authors: "Noor STA, Kawsar LA, & Bhuia MR",
    journal: "Global Health, Epidemiology and Genomics",
    doi: "10.1155/ghe3/2909466",
    category: "first-author",
    badge: "1st Author",
  },
  {
    title: "The association of cyberbullying with major depressive disorders among Bangladeshi female adolescents: findings from the Bangladesh adolescent health and wellbeing survey 2019-20",
    year: 2025,
    authors: "Noor STA, Islam MF, Hossain MS, Islam RB, Banik R, Shiblee SI, Nasrullah SM, & Raza S",
    journal: "BMC Psychiatry",
    doi: "10.1186/s12888-025-07234-z",
    category: "first-author",
    badge: "1st Author",
  },
  {
    title: "Exploring mental health disparities in Mozambique: Depression and anxiety symptoms among reproductive-aged women using data from Mozambique Demographic and Health Survey 2022-23",
    year: 2025,
    authors: "Noor STA, Siddique S, Das O, Yeasar S, & Islam RB",
    journal: "Global Epidemiology",
    doi: "10.1016/j.gloepi.2025.100223",
    category: "first-author",
    badge: "1st Author",
  },
  {
    title: "Exploring Factors Influencing Wealth-Related Disparities in Institutional Delivery: A Decomposition Analysis Using Bangladesh Multiple Indicator Cluster Survey (MICS) 2019",
    year: 2025,
    authors: "Noor STA, Shil P, Talukdar A, Aktar S, & Uddin MJ",
    journal: "Public Health Challenges",
    doi: "10.1002/puh2.70066",
    category: "first-author",
    badge: "1st Author",
  },
  // ── Co-author ───────────────────────────────────────────────────────────────
  {
    title: "Pregnancy loss in rural Bangladesh: An analysis of rates, proportions, timing, and determinants based on data from a Health and Demographic Surveillance System",
    year: 2026,
    authors: "Raza S, Banik R, Noor STA, Rahman QS, Zahan FN, Siddique MAB, Hasan MM, Majid T, Jahan E, Sayeed A, Hossain L, Ether ST, Rahman A, Huq N, El Arifeen S, Ahmed A, & Rahman AE",
    journal: "Journal of Global Health",
    doi: "10.7189/jogh.16.04101",
    category: "co-author",
    badge: "Co-author",
  },
  {
    title: "Assessing changes in the availability and readiness of health facilities to provide modern family planning services in Bangladesh: Insights from Bangladesh Health Facility Surveys, 2014 and 2017",
    year: 2025,
    authors: "Banik R, Noor STA, Siddique AB, et al.",
    journal: "PLoS One",
    doi: "10.1371/journal.pone.0334520",
    category: "co-author",
    badge: "Co-author",
  },
  {
    title: "Assessing health systems' capacities to provide post-abortion care: insights from seven low- and middle-income countries",
    year: 2025,
    authors: "Raza S, Banik R, Noor STA, Jahan E, Sayeed A, Huq N, El Arifeen S, Ahmed A, & Rahman AE",
    journal: "Journal of Global Health",
    doi: "10.7189/jogh.15.04020",
    category: "co-author",
    badge: "Co-author",
  },
  {
    title: "The proper application of logistic regression model in complex survey data: a systematic review",
    year: 2025,
    authors: "Dey D, Haque MS, Islam MM, Aishi UI, Shammy SS, Mayen MSA, Noor STA, & Uddin MJ",
    journal: "BMC Medical Research Methodology",
    doi: "10.1186/s12874-024-02454-5",
    category: "co-author",
    badge: "Co-author",
  },
  {
    title: "Anxiety and depression among reproductive-aged women in Bangladesh: burden, determinants, and care-seeking practices based on a nationally representative demographic and health survey",
    year: 2025,
    authors: "Raza S, Banik R, Noor STA, Sayeed A, Saha A, Jahan E, et al.",
    journal: "Archives of Women's Mental Health",
    doi: "10.1007/s00737-025-01564-3",
    category: "co-author",
    badge: "Co-author",
  },
  {
    title: "Association between Global Monkeypox Cases and Meteorological Factors",
    year: 2022,
    authors: "Islam MA, Sangkham S, Tiwari A, Vadiati M, Hasan MN, Noor STA, et al.",
    journal: "International Journal of Environmental Research and Public Health",
    doi: "10.3390/ijerph192315638",
    category: "co-author",
    badge: "Co-author",
  },
  {
    title: "Validation of modified COVID-19 Phobia Scale (MC19P-SE) to examine the relationships between corona anxiety and COVID-19 symptoms: A case-control study",
    year: 2025,
    authors: "Kawsar LA, Noor STA, Islam MA, & Bhuia MR",
    journal: "Journal of Mood & Anxiety Disorders",
    doi: "10.1016/j.xjmad.2025.100108",
    category: "co-author",
    badge: "Shared 1st Author",
  },
  {
    title: "An Estimation of Five-decade Long Monkeypox Case Fatality Rate: Systematic Review and Meta-analysis",
    year: 2022,
    authors: "Islam MA, Ahammed T, Noor STA, Hasan MN, et al.",
    journal: "Journal of Pure and Applied Microbiology",
    doi: "10.22207/JPAM.16.SPL1.16",
    category: "co-author",
    badge: "Shared 1st Author",
  },
  // ── GBD Collaborations ──────────────────────────────────────────────────────
  {
    title: "Global, regional, and national prevalence of child and adolescent overweight and obesity, 1990-2021, with forecasts to 2050: a forecasting study for the Global Burden of Disease Study 2021",
    year: 2025,
    authors: "GBD 2021 Adolescent BMI Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(25)00397-6",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global, regional, and national prevalence of adult overweight and obesity, 1990-2021, with forecasts to 2050: a forecasting study for the Global Burden of Disease Study 2021",
    year: 2025,
    authors: "GBD 2021 Adult BMI Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(25)00355-1",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "The global, regional, and national burden of cancer, 1990-2023, with forecasts to 2050: a systematic analysis for the Global Burden of Disease Study 2023",
    year: 2025,
    authors: "GBD 2023 Cancer Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(25)01635-6",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global, regional, and national trends in routine childhood vaccination coverage from 1980 to 2023 with forecasts to 2030: a systematic analysis for the Global Burden of Disease Study 2023",
    year: 2025,
    authors: "GBD 2023 Vaccine Coverage Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(25)01037-2",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Burden of disease scenarios by state in the USA, 2022-50: a forecasting analysis for the Global Burden of Disease Study 2021",
    year: 2024,
    authors: "GBD 2021 US Burden of Disease and Forecasting Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(24)02246-3",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global burden of vision impairment due to age-related macular degeneration, 1990-2021, with forecasts to 2050: a systematic analysis for the Global Burden of Disease Study 2021",
    year: 2025,
    authors: "GBD 2021 Global AMD Collaborators",
    journal: "The Lancet Global Health",
    doi: "10.1016/S2214-109X(25)00143-3",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global, regional, and national sepsis incidence and mortality, 1990-2021: a systematic analysis",
    year: 2025,
    authors: "GBD 2021 Global Sepsis Collaborators",
    journal: "The Lancet Global Health",
    doi: "10.1016/S2214-109X(25)00356-0",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global burden of 292 causes of death in 204 countries and territories and 660 subnational locations, 1990-2023: a systematic analysis for the Global Burden of Disease Study 2023",
    year: 2025,
    authors: "GBD 2023 Causes of Death Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(25)01917-8",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global age-sex-specific all-cause mortality and life expectancy estimates for 204 countries and territories and 660 subnational locations, 1950-2023: a demographic analysis for the Global Burden of Disease Study 2023",
    year: 2025,
    authors: "GBD 2023 Demographics Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(25)01330-3",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Burden of 375 diseases and injuries, risk-attributable burden of 88 risk factors, and healthy life expectancy in 204 countries and territories, including 660 subnational locations, 1990-2023: a systematic analysis for the Global Burden of Disease Study 2023",
    year: 2025,
    authors: "GBD 2023 Disease and Injury and Risk Factor Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(25)01637-X",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Asthma and Atopic Dermatitis in Asia, 1990-2021: The Global Burden of Disease Study 2021",
    year: 2025,
    authors: "GBD 2021 Asia Allergic Disorders Collaborators",
    journal: "Clinical & Experimental Allergy",
    doi: "10.1111/cea.70024",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global, regional and national burden of dietary iron deficiency from 1990 to 2021: a Global Burden of Disease study",
    year: 2025,
    authors: "GBD 2021 Dietary Iron Deficiency Collaborators",
    journal: "Nature Medicine",
    doi: "10.1038/s41591-025-03624-8",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global, regional, and national burden of asthma and atopic dermatitis, 1990-2021, and projections to 2050: a systematic analysis of the Global Burden of Disease Study 2021",
    year: 2025,
    authors: "GBD 2021 Asthma and Allergic Diseases Collaborators",
    journal: "The Lancet Respiratory Medicine",
    doi: "10.1016/S2213-2600(25)00003-7",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global, regional, and national burden of household air pollution, 1990-2021: a systematic analysis for the Global Burden of Disease Study 2021",
    year: 2025,
    authors: "GBD 2021 HAP Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(24)02840-X",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Changing life expectancy in European countries 1990-2021: a subanalysis of causes and risk factors from the Global Burden of Disease Study 2021",
    year: 2025,
    authors: "GBD 2021 Europe Life Expectancy Collaborators",
    journal: "The Lancet Public Health",
    doi: "10.1016/S2468-2667(25)00009-X",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global, regional, and national age-sex-specific burden of diarrhoeal diseases, their risk factors, and aetiologies, 1990-2021, for 204 countries and territories: a systematic analysis for the Global Burden of Disease Study 2021",
    year: 2025,
    authors: "GBD 2021 Diarrhoeal Diseases Collaborators",
    journal: "The Lancet Infectious Diseases",
    doi: "10.1016/S1473-3099(24)00691-1",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "The burden of diseases, injuries, and risk factors by state in the USA, 1990-2021: a systematic analysis for the Global Burden of Disease Study 2021",
    year: 2024,
    authors: "GBD 2021 US Burden of Disease Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(24)01446-6",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global, regional, and national burden of HIV/AIDS, 1990-2021, and forecasts to 2050, for 204 countries and territories: the Global Burden of Disease Study 2021",
    year: 2024,
    authors: "GBD 2021 HIV Collaborators",
    journal: "The Lancet HIV",
    doi: "10.1016/S2352-3018(24)00212-1",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "National-level and state-level prevalence of overweight and obesity among children, adolescents, and adults in the USA, 1990-2021, and forecasts up to 2050",
    year: 2024,
    authors: "GBD 2021 US Obesity Forecasting Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(24)01548-4",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Forecasting the effects of smoking prevalence scenarios on years of life lost and life expectancy from 2022 to 2050: a systematic analysis for the Global Burden of Disease Study 2021",
    year: 2024,
    authors: "GBD 2021 Tobacco Forecasting Collaborators",
    journal: "The Lancet Public Health",
    doi: "10.1016/S2468-2667(24)00166-X",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Global, regional, and national burden of stroke and its risk factors, 1990-2021: a systematic analysis for the Global Burden of Disease Study 2021",
    year: 2024,
    authors: "GBD 2021 Stroke Risk Factor Collaborators",
    journal: "The Lancet Neurology",
    doi: "10.1016/S1474-4422(24)00369-7",
    category: "gbd",
    badge: "GBD Collaborator",
  },
  {
    title: "Burden of disease scenarios for 204 countries and territories, 2022-2050: a forecasting analysis for the Global Burden of Disease Study 2021",
    year: 2024,
    authors: "GBD 2021 Forecasting Collaborators",
    journal: "The Lancet",
    doi: "10.1016/S0140-6736(24)00685-8",
    category: "gbd",
    badge: "GBD Collaborator",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DOI → category mapping for ORCID-fetched works
// (ORCID doesn't know if you're 1st author — we check DOI against fallback)
// ─────────────────────────────────────────────────────────────────────────────
const DOI_CATEGORY_MAP = {};
FALLBACK_PUBLICATIONS.forEach((p) => {
  if (p.doi) DOI_CATEGORY_MAP[p.doi.toLowerCase()] = { category: p.category, badge: p.badge };
});

// ─────────────────────────────────────────────────────────────────────────────
// ORCID API FETCHER
// ─────────────────────────────────────────────────────────────────────────────
async function fetchOrcidWorks() {
  const headers = { Accept: "application/json" };
  const res = await fetch(`${ORCID_API}/works`, { headers });
  if (!res.ok) throw new Error(`ORCID API error: ${res.status}`);
  const data = await res.json();
  return data.group || [];
}

async function fetchWorkDetail(putCode) {
  const headers = { Accept: "application/json" };
  const res = await fetch(`${ORCID_API}/work/${putCode}`, { headers });
  if (!res.ok) return null;
  return res.json();
}

function extractDoi(work) {
  const ids = work?.["external-ids"]?.["external-id"] || [];
  const doiEntry = ids.find((id) => id["external-id-type"] === "doi");
  return doiEntry ? doiEntry["external-id-value"].toLowerCase().replace("https://doi.org/", "") : null;
}

function extractYear(work) {
  return work?.["publication-date"]?.year?.value || null;
}

function extractJournal(work) {
  return work?.["journal-title"]?.value || "";
}

function extractTitle(work) {
  return work?.title?.title?.value || "Untitled";
}

function extractAuthors(work) {
  const contributors = work?.contributors?.contributor || [];
  if (!contributors.length) return "";
  return contributors
    .filter((c) => c["contributor-attributes"]?.["contributor-role"] === "author")
    .map((c) => {
      const name = c["credit-name"]?.value || "";
      return name;
    })
    .join(", ");
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────────────────────
function renderPublications(pubs, activeFilter = "all") {
  const container = document.getElementById("publicationsList");
  if (!container) return;

  const filtered = activeFilter === "all" ? pubs : pubs.filter((p) => p.category === activeFilter);

  if (!filtered.length) {
    container.innerHTML = `<p class="no-results">No publications found for this filter.</p>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      (p) => `
    <div class="publication-item" data-category="${p.category}">
      <div class="publication-header">
        <h3>${p.title}</h3>
        <span class="pub-year">${p.year || ""}</span>
      </div>
      <p class="pub-authors">${p.authors}</p>
      <p class="pub-journal"><strong>${p.journal}</strong></p>
      ${p.doi ? `<p class="pub-doi">DOI: ${p.doi}</p>` : ""}
      <div class="pub-footer">
        <span class="pub-badge ${p.category}">${p.badge}</span>
        ${
          p.doi
            ? `<span class="__dimensions_badge_embed__"
                  data-doi="${p.doi}"
                  data-style="small_rectangle"></span>`
            : ""
        }
        ${
          p.doi
            ? `<a href="https://doi.org/${p.doi}" target="_blank" class="pub-link">View Paper</a>`
            : ""
        }
      </div>
    </div>`
    )
    .join("");

  // Re-init Dimensions badges for newly rendered elements
  if (window.__dimensions_embed) window.__dimensions_embed.addBadges();
}

function showStatus(msg, isError = false) {
  const container = document.getElementById("publicationsList");
  if (!container) return;
  container.innerHTML = `<p class="pub-status ${isError ? "pub-error" : ""}">${msg}</p>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN INIT
// ─────────────────────────────────────────────────────────────────────────────
async function initPublications() {
  const container = document.getElementById("publicationsList");
  if (!container) return;

  let publications = [];
  let source = "fallback";

  showStatus("⏳ Loading publications from ORCID…");

  try {
    const groups = await fetchOrcidWorks();

    // Collect put-codes from all groups (take first work-summary per group)
    const putCodes = groups
      .map((g) => {
        const summary = g["work-summary"]?.[0];
        return summary?.["put-code"];
      })
      .filter(Boolean)
      .slice(0, 50); // cap to avoid rate-limiting

    // Batch fetch details (ORCID supports comma-separated put-codes)
    const batchSize = 10;
    const detailResults = [];
    for (let i = 0; i < putCodes.length; i += batchSize) {
      const batch = putCodes.slice(i, i + batchSize);
      const headers = { Accept: "application/json" };
      const res = await fetch(`${ORCID_API}/works/${batch.join(",")}`, { headers });
      if (res.ok) {
        const data = await res.json();
        const bulk = data?.bulk || [];
        bulk.forEach((item) => {
          if (item.work) detailResults.push(item.work);
        });
      }
    }

    if (detailResults.length > 0) {
      publications = detailResults.map((work) => {
        const doi = extractDoi(work);
        const meta = doi ? DOI_CATEGORY_MAP[doi] : null;
        return {
          title: extractTitle(work),
          year: extractYear(work),
          authors: extractAuthors(work) || "Noor STA et al.",
          journal: extractJournal(work),
          doi: doi || "",
          category: meta?.category || "co-author",
          badge: meta?.badge || "Co-author",
        };
      });

      // Sort by year descending
      publications.sort((a, b) => (b.year || 0) - (a.year || 0));
      source = "orcid";
    } else {
      throw new Error("No works returned from ORCID");
    }
  } catch (err) {
    console.warn("ORCID fetch failed, using fallback data:", err.message);
    publications = FALLBACK_PUBLICATIONS;
    source = "fallback";
  }

  // Update publication count badge if element exists
  const countEl = document.getElementById("pubCount");
  if (countEl) countEl.textContent = publications.length;

  // Show source indicator
  const sourceEl = document.getElementById("pubSource");
  if (sourceEl) {
    sourceEl.textContent =
      source === "orcid"
        ? `✓ Live data from ORCID (${publications.length} publications)`
        : `Publications list (${publications.length} total)`;
    sourceEl.className = source === "orcid" ? "pub-source orcid" : "pub-source fallback";
  }

  // Render with current active filter
  const activeBtn = document.querySelector(".filter-btn.active");
  const activeFilter = activeBtn ? activeBtn.dataset.filter : "all";
  renderPublications(publications, activeFilter);

  // Wire up filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderPublications(publications, btn.dataset.filter);
    });
  });

  // Wire up search
  const searchInput = document.getElementById("publicationSearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase();
      const activeFilter2 = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
      const base = activeFilter2 === "all" ? publications : publications.filter((p) => p.category === activeFilter2);
      const filtered = q
        ? base.filter((p) => p.title.toLowerCase().includes(q) || p.journal.toLowerCase().includes(q))
        : base;
      const container2 = document.getElementById("publicationsList");
      if (!container2) return;
      renderPublications(filtered, "all"); // already filtered
    });
  }
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPublications);
} else {
  initPublications();
}
