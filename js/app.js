/**
 * Vistara Event Hub - Application Controller
 * Manages UI rendering (Grid/List views), search and filters,
 * countdown timers, dialogs, Indian Rupee (₹) pricing, and My Passes Vault.
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // State
  // =========================================================================
  const state = {
    events: [...EVENTS_DATA],
    filteredEvents: [...EVENTS_DATA],
    searchQuery: "",
    selectedCategory: "all",
    selectedFormat: "all",
    selectedPrice: "all",
    sortOrder: "date-asc",
    viewMode: "grid", // 'grid' | 'list'
    activeDetailEvent: null,
    lastConfirmedRecord: null,
    clockInterval: null
  };

  // =========================================================================
  // DOM References
  // =========================================================================
  const elements = {
    // Theme
    themeSwitcherBtn: document.getElementById("themeSwitcherBtn"),
    themeIcon: document.getElementById("themeIcon"),

    // Hero Bento
    heroQuickSearch: document.getElementById("heroQuickSearch"),
    heroSearchActionBtn: document.getElementById("heroSearchActionBtn"),
    flagshipImage: document.getElementById("flagshipImage"),
    flagshipFormat: document.getElementById("flagshipFormat"),
    flagshipCountdown: document.getElementById("flagshipCountdown"),
    flagshipTitle: document.getElementById("flagshipTitle"),
    flagshipSnippet: document.getElementById("flagshipSnippet"),
    flagshipPrice: document.getElementById("flagshipPrice"),
    flagshipRegisterBtn: document.getElementById("flagshipRegisterBtn"),

    // Catalog Controls
    catalogSearchInput: document.getElementById("catalogSearchInput"),
    formatFilterDropdown: document.getElementById("formatFilterDropdown"),
    pricingFilterDropdown: document.getElementById("pricingFilterDropdown"),
    sortOrderDropdown: document.getElementById("sortOrderDropdown"),
    viewGridModeBtn: document.getElementById("viewGridModeBtn"),
    viewListModeBtn: document.getElementById("viewListModeBtn"),
    categoryPills: document.querySelectorAll(".category-tag-pill"),
    matchingCountText: document.getElementById("matchingCountText"),
    resetFiltersActionBtn: document.getElementById("resetFiltersActionBtn"),
    eventsDeck: document.getElementById("eventsDeck"),

    // Detail Modal
    detailModalDialog: document.getElementById("detailModalDialog"),
    detailDismissBtn: document.getElementById("detailDismissBtn"),
    modalBannerImage: document.getElementById("modalBannerImage"),
    modalCategoryBadge: document.getElementById("modalCategoryBadge"),
    modalFormatBadge: document.getElementById("modalFormatBadge"),
    modalDetailHeading: document.getElementById("modalDetailHeading"),
    modalDateLine: document.getElementById("modalDateLine"),
    modalVenueLine: document.getElementById("modalVenueLine"),
    modalSpeakerLine: document.getElementById("modalSpeakerLine"),
    modalCountdownLine: document.getElementById("modalCountdownLine"),
    modalDescriptionParagraph: document.getElementById("modalDescriptionParagraph"),
    modalAgendaFlow: document.getElementById("modalAgendaFlow"),
    modalFeeDisplay: document.getElementById("modalFeeDisplay"),
    modalRegisterActionBtn: document.getElementById("modalRegisterActionBtn"),

    // Registration Modal
    registrationModalDialog: document.getElementById("registrationModalDialog"),
    regDismissBtn: document.getElementById("regDismissBtn"),
    participantForm: document.getElementById("participantForm"),
    regEventChoice: document.getElementById("regEventChoice"),
    regFullName: document.getElementById("regFullName"),
    regEmail: document.getElementById("regEmail"),
    regMobile: document.getElementById("regMobile"),
    regPassCount: document.getElementById("regPassCount"),
    regTotalCostDisplay: document.getElementById("regTotalCostDisplay"),
    regSpecialNotes: document.getElementById("regSpecialNotes"),
    regTermsAgreement: document.getElementById("regTermsAgreement"),

    // Confirmation Modal
    confirmationModalDialog: document.getElementById("confirmationModalDialog"),
    confirmDismissBtn: document.getElementById("confirmDismissBtn"),
    confirmDoneBtn: document.getElementById("confirmDoneBtn"),
    confirmBookingCode: document.getElementById("confirmBookingCode"),
    confirmEventTitle: document.getElementById("confirmEventTitle"),
    confirmAttendeeName: document.getElementById("confirmAttendeeName"),
    confirmTicketsCount: document.getElementById("confirmTicketsCount"),
    confirmDateSchedule: document.getElementById("confirmDateSchedule"),
    confirmTotalPaidDisplay: document.getElementById("confirmTotalPaidDisplay"),
    confirmVenueAddress: document.getElementById("confirmVenueAddress"),
    confirmOpenVaultBtn: document.getElementById("confirmOpenVaultBtn"),
    downloadIcsBtn: document.getElementById("downloadIcsBtn"),

    // Pass Vault (My Passes)
    vaultTriggerBtn: document.getElementById("vaultTriggerBtn"),
    passVaultSlideDrawer: document.getElementById("passVaultSlideDrawer"),
    vaultDismissBtn: document.getElementById("vaultDismissBtn"),
    vaultCardsList: document.getElementById("vaultCardsList"),
    vaultCountBadge: document.getElementById("vaultCountBadge"),
    vaultExportJsonBtn: document.getElementById("vaultExportJsonBtn"),

    // Toast Shelf
    toastShelf: document.getElementById("toastShelf")
  };

  // =========================================================================
  // Theme Toggle Engine
  // =========================================================================
  function initTheme() {
    const savedTheme = StorageManager.getTheme();
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemDark ? "dark" : "light");

    applyTheme(initialTheme);

    elements.themeSwitcherBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      StorageManager.saveTheme(next);
      showToast(`Switched to ${next} theme.`, "info");
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      elements.themeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      elements.themeSwitcherBtn.setAttribute("aria-label", "Switch to light theme");
    } else {
      elements.themeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      elements.themeSwitcherBtn.setAttribute("aria-label", "Switch to dark theme");
    }
  }

  // =========================================================================
  // Countdown Timer Calculations
  // =========================================================================
  function calculateRemaining(isoDate) {
    const diff = new Date(isoDate).getTime() - Date.now();
    if (diff <= 0) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return { total: diff, days, hours, minutes, seconds, expired: false };
  }

  function formatCountdownString(t) {
    if (t.expired) return "Session Started";
    const d = t.days > 0 ? `${t.days}d ` : "";
    const h = String(t.hours).padStart(2, "0");
    const m = String(t.minutes).padStart(2, "0");
    const s = String(t.seconds).padStart(2, "0");
    return `${d}${h}h ${m}m ${s}s`;
  }

  function startClocksLoop() {
    if (state.clockInterval) clearInterval(state.clockInterval);

    state.clockInterval = setInterval(() => {
      // 1. Flagship clock
      const flagship = state.events.find((e) => e.isSpotlight) || state.events[0];
      if (flagship && elements.flagshipCountdown) {
        const rem = calculateRemaining(flagship.date);
        elements.flagshipCountdown.textContent = formatCountdownString(rem);
      }

      // 2. Catalog card clocks
      document.querySelectorAll(".card-clock-val").forEach((node) => {
        const deadline = node.getAttribute("data-deadline");
        if (deadline) {
          const rem = calculateRemaining(deadline);
          node.textContent = formatCountdownString(rem);
        }
      });

      // 3. Detail modal clock
      if (state.activeDetailEvent && elements.detailModalDialog.classList.contains("is-open")) {
        const rem = calculateRemaining(state.activeDetailEvent.date);
        elements.modalCountdownLine.textContent = formatCountdownString(rem);
      }
    }, 1000);
  }

  // =========================================================================
  // Bento Hero Flagship Card
  // =========================================================================
  function initHeroFlagshipCard() {
    const flagship = state.events.find((e) => e.isSpotlight) || state.events[0];
    if (!flagship) return;

    elements.flagshipImage.src = flagship.image;
    elements.flagshipImage.alt = flagship.title;
    elements.flagshipImage.onerror = () => { elements.flagshipImage.src = FALLBACK_IMAGE; };

    elements.flagshipTitle.textContent = flagship.title;
    elements.flagshipSnippet.textContent = flagship.shortDescription;
    elements.flagshipPrice.textContent = flagship.price;

    if (flagship.isFree) {
      elements.flagshipFormat.textContent = "Free Entry";
      elements.flagshipFormat.className = "pill-badge price-free";
    } else {
      elements.flagshipFormat.textContent = flagship.price;
      elements.flagshipFormat.className = "pill-badge price-paid";
    }

    const rem = calculateRemaining(flagship.date);
    elements.flagshipCountdown.textContent = formatCountdownString(rem);

    elements.flagshipRegisterBtn.onclick = () => {
      openRegistrationDialog(flagship.id);
    };

    document.getElementById("heroRegisterDirectBtn")?.addEventListener("click", () => {
      openRegistrationDialog(flagship.id);
    });

    document.getElementById("closingCtaActionBtn")?.addEventListener("click", () => {
      openRegistrationDialog(flagship.id);
    });

    // Connect Hero search
    elements.heroSearchActionBtn.addEventListener("click", () => {
      const q = elements.heroQuickSearch.value.trim();
      state.searchQuery = q;
      elements.catalogSearchInput.value = q;
      applyFiltersAndSort();
      document.getElementById("eventsCatalogSection")?.scrollIntoView({ behavior: "smooth" });
    });

    elements.heroQuickSearch.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        elements.heroSearchActionBtn.click();
      }
    });
  }

  // =========================================================================
  // Catalog Rendering (Grid & List Views)
  // =========================================================================
  function renderEventsDeck() {
    elements.eventsDeck.innerHTML = "";
    elements.matchingCountText.textContent = state.filteredEvents.length;

    elements.eventsDeck.className = `events-deck view-${state.viewMode}`;

    if (state.filteredEvents.length === 0) {
      elements.eventsDeck.innerHTML = `
        <div class="empty-directory-card">
          <h3>No Matching Event Programs</h3>
          <p>No programs match the selected filter criteria or search keyword. Clear your filters to browse the complete directory.</p>
          <button class="btn btn-outline" id="emptyNoticeResetBtn">Reset All Filters</button>
        </div>
      `;
      document.getElementById("emptyNoticeResetBtn")?.addEventListener("click", resetAllFilters);
      return;
    }

    state.filteredEvents.forEach((evt) => {
      const remainingTime = calculateRemaining(evt.date);
      const timeStr = formatCountdownString(remainingTime);
      const seatPct = Math.max(5, Math.round((evt.seatsRemaining / evt.totalCapacity) * 100));
      const isCritical = seatPct <= 15;

      const card = document.createElement("article");
      card.className = "event-card-item";
      card.setAttribute("data-id", evt.id);

      card.innerHTML = `
        <div class="card-media-box">
          <img src="${evt.image}" alt="${evt.title}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'">
          
          <div class="card-badge-row">
            <span class="pill-badge cat">${evt.categoryLabel}</span>
            <span class="pill-badge ${evt.isFree ? 'price-free' : 'price-paid'}">${evt.isFree ? 'Free Entry' : evt.price}</span>
          </div>

          <div class="card-clock-banner">
            <span>Commences in:</span>
            <span class="card-clock-val" data-deadline="${evt.date}">${timeStr}</span>
          </div>
        </div>

        <div class="card-body-content">
          <div class="card-date-line">${evt.formattedDate} • ${evt.format}</div>
          <h3 class="card-title-text">${evt.title}</h3>
          
          <div class="card-location-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${evt.venue}</span>
          </div>

          <p class="card-snippet">${evt.shortDescription}</p>

          <div class="card-seat-tracker">
            <div class="seat-label-split">
              <span>Capacity Available: <strong>${evt.seatsRemaining}</strong> seats left</span>
              <span>${seatPct}%</span>
            </div>
            <div class="seat-track">
              <div class="seat-fill ${isCritical ? 'critical' : ''}" style="width: ${seatPct}%"></div>
            </div>
          </div>

          <div class="card-bottom-actions">
            <div class="card-price-display">${evt.price}</div>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button class="btn btn-secondary btn-sm btn-view-detail" data-id="${evt.id}">Details</button>
              <button class="btn btn-primary btn-sm btn-start-reg" data-id="${evt.id}">Register</button>
            </div>
          </div>
        </div>
      `;

      elements.eventsDeck.appendChild(card);
    });

    elements.eventsDeck.querySelectorAll(".btn-view-detail").forEach((btn) => {
      btn.addEventListener("click", () => openDetailDialog(btn.getAttribute("data-id")));
    });

    elements.eventsDeck.querySelectorAll(".btn-start-reg").forEach((btn) => {
      btn.addEventListener("click", () => openRegistrationDialog(btn.getAttribute("data-id")));
    });
  }

  // =========================================================================
  // Filtering & Sorting
  // =========================================================================
  function applyFiltersAndSort() {
    let list = state.events.filter((item) => {
      // Category
      const matchCat = state.selectedCategory === "all" || item.category === state.selectedCategory;

      // Format
      const matchFormat = state.selectedFormat === "all" || item.format === state.selectedFormat;

      // Price (Free vs Paid INR)
      const matchPrice = state.selectedPrice === "all" ||
        (state.selectedPrice === "free" && item.isFree) ||
        (state.selectedPrice === "paid" && !item.isFree);

      // Search
      const q = state.searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.venue.toLowerCase().includes(q) ||
        item.speaker.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);

      return matchCat && matchFormat && matchPrice && matchSearch;
    });

    // Sorting
    list.sort((a, b) => {
      if (state.sortOrder === "date-asc") return new Date(a.date) - new Date(b.date);
      if (state.sortOrder === "date-desc") return new Date(b.date) - new Date(a.date);
      if (state.sortOrder === "price-asc") return a.numericPrice - b.numericPrice;
      if (state.sortOrder === "title-asc") return a.title.localeCompare(b.title);
      return 0;
    });

    state.filteredEvents = list;
    renderEventsDeck();
  }

  function debounce(fn, delay = 200) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }

  elements.catalogSearchInput.addEventListener("input", debounce((e) => {
    state.searchQuery = e.target.value;
    applyFiltersAndSort();
  }, 180));

  elements.formatFilterDropdown.addEventListener("change", (e) => {
    state.selectedFormat = e.target.value;
    applyFiltersAndSort();
  });

  elements.pricingFilterDropdown.addEventListener("change", (e) => {
    state.selectedPrice = e.target.value;
    applyFiltersAndSort();
  });

  elements.sortOrderDropdown.addEventListener("change", (e) => {
    state.sortOrder = e.target.value;
    applyFiltersAndSort();
  });

  elements.categoryPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      elements.categoryPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      state.selectedCategory = pill.getAttribute("data-category");
      applyFiltersAndSort();
    });
  });

  // View Mode: Grid vs List
  elements.viewGridModeBtn.addEventListener("click", () => {
    state.viewMode = "grid";
    elements.viewGridModeBtn.classList.add("active");
    elements.viewListModeBtn.classList.remove("active");
    renderEventsDeck();
  });

  elements.viewListModeBtn.addEventListener("click", () => {
    state.viewMode = "list";
    elements.viewListModeBtn.classList.add("active");
    elements.viewGridModeBtn.classList.remove("active");
    renderEventsDeck();
  });

  function resetAllFilters() {
    state.searchQuery = "";
    state.selectedCategory = "all";
    state.selectedFormat = "all";
    state.selectedPrice = "all";
    state.sortOrder = "date-asc";

    elements.catalogSearchInput.value = "";
    elements.heroQuickSearch.value = "";
    elements.formatFilterDropdown.value = "all";
    elements.pricingFilterDropdown.value = "all";
    elements.sortOrderDropdown.value = "date-asc";

    elements.categoryPills.forEach((p) => {
      p.classList.toggle("active", p.getAttribute("data-category") === "all");
    });

    applyFiltersAndSort();
    showToast("Filters reset to default view.", "info");
  }

  elements.resetFiltersActionBtn?.addEventListener("click", resetAllFilters);

  // =========================================================================
  // Detail Dialog
  // =========================================================================
  function openDetailDialog(eventId) {
    const item = state.events.find((e) => e.id === eventId);
    if (!item) return;

    state.activeDetailEvent = item;

    elements.modalBannerImage.src = item.image;
    elements.modalBannerImage.alt = item.title;
    elements.modalBannerImage.onerror = () => { elements.modalBannerImage.src = FALLBACK_IMAGE; };

    elements.modalCategoryBadge.textContent = item.categoryLabel;
    elements.modalFormatBadge.textContent = item.format;
    elements.modalDetailHeading.textContent = item.title;
    elements.modalDateLine.textContent = item.formattedDate;
    elements.modalVenueLine.textContent = item.venue;
    elements.modalSpeakerLine.textContent = item.speaker;
    elements.modalFeeDisplay.textContent = item.price;
    elements.modalDescriptionParagraph.textContent = item.fullDescription;

    const rem = calculateRemaining(item.date);
    elements.modalCountdownLine.textContent = formatCountdownString(rem);

    // Populate agenda
    elements.modalAgendaFlow.innerHTML = item.agenda.map((ag) => `
      <div class="agenda-point">
        <span class="agenda-time">${ag.time}</span>
        <span style="color: var(--text-secondary);">${ag.session}</span>
      </div>
    `).join("");

    elements.modalRegisterActionBtn.onclick = () => {
      closeDetailDialog();
      openRegistrationDialog(item.id);
    };

    elements.detailModalDialog.classList.add("is-open");
    elements.detailModalDialog.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDetailDialog() {
    elements.detailModalDialog.classList.remove("is-open");
    elements.detailModalDialog.setAttribute("aria-hidden", "true");
    state.activeDetailEvent = null;
    document.body.style.overflow = "";
  }

  elements.detailDismissBtn.addEventListener("click", closeDetailDialog);
  elements.detailModalDialog.addEventListener("click", (e) => {
    if (e.target === elements.detailModalDialog) closeDetailDialog();
  });

  // =========================================================================
  // Registration Dialog & Indian Rupee (₹) Price Calculation
  // =========================================================================
  function populateRegistrationSelect(activeId) {
    elements.regEventChoice.innerHTML = state.events.map((e) => `
      <option value="${e.id}" ${e.id === activeId ? 'selected' : ''}>
        ${e.title} (${e.format} • ${e.price})
      </option>
    `).join("");
  }

  function updateRegistrationFeeDisplay() {
    const selectedEventId = elements.regEventChoice.value;
    const evt = state.events.find((e) => e.id === selectedEventId);
    const passQty = parseInt(elements.regPassCount.value, 10) || 1;

    if (evt) {
      if (evt.isFree) {
        elements.regTotalCostDisplay.textContent = "Free Access";
      } else {
        const total = evt.numericPrice * passQty;
        elements.regTotalCostDisplay.textContent = `₹${total.toLocaleString('en-IN')} (${passQty} × ${evt.price})`;
      }
    }
  }

  function openRegistrationDialog(eventId) {
    populateRegistrationSelect(eventId || state.events[0]?.id);
    updateRegistrationFeeDisplay();
    clearAllFormErrors();

    elements.registrationModalDialog.classList.add("is-open");
    elements.registrationModalDialog.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    elements.regFullName.focus();
  }

  function closeRegistrationDialog() {
    elements.registrationModalDialog.classList.remove("is-open");
    elements.registrationModalDialog.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    clearAllFormErrors();
  }

  elements.regDismissBtn.addEventListener("click", closeRegistrationDialog);
  elements.registrationModalDialog.addEventListener("click", (e) => {
    if (e.target === elements.registrationModalDialog) closeRegistrationDialog();
  });

  elements.regEventChoice.addEventListener("change", updateRegistrationFeeDisplay);
  elements.regPassCount.addEventListener("change", updateRegistrationFeeDisplay);

  function setFieldError(field, errorId, msg) {
    field.classList.add("has-err");
    field.classList.remove("is-valid");
    const label = document.getElementById(errorId);
    if (label) label.textContent = msg;
  }

  function clearFieldError(field, errorId) {
    field.classList.remove("has-err");
    field.classList.add("is-valid");
    const label = document.getElementById(errorId);
    if (label) label.textContent = "";
  }

  function clearAllFormErrors() {
    [
      elements.regFullName,
      elements.regEmail,
      elements.regMobile,
      elements.regEventChoice,
      elements.regPassCount
    ].forEach((f) => {
      if (f) f.classList.remove("has-err", "is-valid");
    });
    document.querySelectorAll(".field-error-msg").forEach((m) => { m.textContent = ""; });
  }

  // Real-time blur validation
  elements.regFullName.addEventListener("blur", () => {
    const res = FormValidator.validateName(elements.regFullName.value);
    if (!res.isValid) setFieldError(elements.regFullName, "nameErrorTip", res.message);
    else clearFieldError(elements.regFullName, "nameErrorTip");
  });

  elements.regEmail.addEventListener("blur", () => {
    const res = FormValidator.validateEmail(elements.regEmail.value);
    if (!res.isValid) setFieldError(elements.regEmail, "emailErrorTip", res.message);
    else clearFieldError(elements.regEmail, "emailErrorTip");
  });

  elements.regMobile.addEventListener("blur", () => {
    const res = FormValidator.validatePhone(elements.regMobile.value);
    if (!res.isValid) setFieldError(elements.regMobile, "mobileErrorTip", res.message);
    else clearFieldError(elements.regMobile, "mobileErrorTip");
  });

  // Submit registration
  elements.participantForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: elements.regFullName.value,
      email: elements.regEmail.value,
      phone: elements.regMobile.value,
      eventId: elements.regEventChoice.value,
      tickets: elements.regPassCount.value,
      notes: elements.regSpecialNotes.value,
      terms: elements.regTermsAgreement.checked
    };

    const audit = FormValidator.validateAll(data);

    if (!audit.isValid) {
      if (audit.errors.name) setFieldError(elements.regFullName, "nameErrorTip", audit.errors.name);
      if (audit.errors.email) setFieldError(elements.regEmail, "emailErrorTip", audit.errors.email);
      if (audit.errors.phone) setFieldError(elements.regMobile, "mobileErrorTip", audit.errors.phone);
      if (audit.errors.eventId) setFieldError(elements.regEventChoice, "eventErrorTip", audit.errors.eventId);
      if (audit.errors.tickets) setFieldError(elements.regPassCount, "passesErrorTip", audit.errors.tickets);
      if (audit.errors.terms) {
        const termsTip = document.getElementById("termsErrorTip");
        if (termsTip) termsTip.textContent = audit.errors.terms;
      }
      showToast("Please correct highlighted fields before submitting.", "error");
      return;
    }

    const matchedEvt = state.events.find((ev) => ev.id === data.eventId);
    const totalCost = matchedEvt.isFree ? "Free" : `₹${(matchedEvt.numericPrice * data.tickets).toLocaleString('en-IN')}`;

    const record = StorageManager.saveRegistration({
      participantName: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      eventId: data.eventId,
      eventTitle: matchedEvt.title,
      eventDate: matchedEvt.formattedDate,
      eventIsoDate: matchedEvt.date,
      eventVenue: matchedEvt.venue,
      tickets: data.tickets,
      totalCost,
      notes: data.notes.trim()
    });

    state.lastConfirmedRecord = record;

    elements.participantForm.reset();
    closeRegistrationDialog();

    openConfirmationDialog(record);
    updateVaultBadge();
    showToast("Registration saved successfully.", "success");
  });

  // =========================================================================
  // Confirmation Dialog & Calendar (.ics)
  // =========================================================================
  function openConfirmationDialog(record) {
    elements.confirmBookingCode.textContent = record.id;
    elements.confirmEventTitle.textContent = record.eventTitle;
    elements.confirmAttendeeName.textContent = record.participantName;
    elements.confirmTicketsCount.textContent = `${record.tickets} Pass(es)`;
    elements.confirmDateSchedule.textContent = record.eventDate;
    elements.confirmTotalPaidDisplay.textContent = record.totalCost;
    elements.confirmVenueAddress.textContent = record.eventVenue;

    elements.confirmationModalDialog.classList.add("is-open");
    elements.confirmationModalDialog.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeConfirmationDialog() {
    elements.confirmationModalDialog.classList.remove("is-open");
    elements.confirmationModalDialog.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  elements.confirmDismissBtn.addEventListener("click", closeConfirmationDialog);
  elements.confirmDoneBtn.addEventListener("click", closeConfirmationDialog);
  elements.confirmationModalDialog.addEventListener("click", (e) => {
    if (e.target === elements.confirmationModalDialog) closeConfirmationDialog();
  });

  elements.confirmOpenVaultBtn.addEventListener("click", () => {
    closeConfirmationDialog();
    openVaultDrawer();
  });

  // Download .ics Calendar File
  elements.downloadIcsBtn.addEventListener("click", () => {
    if (!state.lastConfirmedRecord) return;
    const r = state.lastConfirmedRecord;
    const start = new Date(r.eventIsoDate || Date.now());
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);

    const pad = (n) => String(n).padStart(2, "0");
    const toIcs = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const icsBody = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Vistara Event Hub//EN",
      "BEGIN:VEVENT",
      `UID:${r.id}@vistaraevents.org`,
      `DTSTAMP:${toIcs(new Date())}`,
      `DTSTART:${toIcs(start)}`,
      `DTEND:${toIcs(end)}`,
      `SUMMARY:${r.eventTitle}`,
      `LOCATION:${r.eventVenue}`,
      `DESCRIPTION:Vistara Admission Pass: ${r.id}\\nAttendee: ${r.participantName}\\nPasses: ${r.tickets}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsBody], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `pass-${r.id}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Downloaded calendar invitation (.ics).", "success");
  });

  // =========================================================================
  // Pass Vault (My Passes Drawer)
  // =========================================================================
  function updateVaultBadge() {
    const list = StorageManager.getRegistrations();
    elements.vaultCountBadge.textContent = list.length;
    elements.vaultCountBadge.style.display = list.length > 0 ? "inline-flex" : "none";
  }

  function renderVaultCards() {
    const list = StorageManager.getRegistrations();
    elements.vaultCardsList.innerHTML = "";

    if (list.length === 0) {
      elements.vaultCardsList.innerHTML = `
        <div class="empty-directory-card" style="border: none; padding: 3rem 1rem;">
          <h4>No Passes in Vault</h4>
          <p style="font-size: 0.85rem;">You do not currently have any event registrations saved on this browser.</p>
          <button class="btn btn-primary btn-sm" id="vaultExploreCatalogBtn">Browse Events</button>
        </div>
      `;
      document.getElementById("vaultExploreCatalogBtn")?.addEventListener("click", () => {
        closeVaultDrawer();
        document.getElementById("eventsCatalogSection")?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }

    list.forEach((reg) => {
      const card = document.createElement("div");
      card.className = "vault-record-card";
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <strong style="font-size: 0.98rem; color: var(--text-main);">${reg.eventTitle}</strong>
          <span class="pill-badge price-paid" style="font-size: 0.72rem;">${reg.id}</span>
        </div>
        <div style="font-size: 0.825rem; color: var(--text-muted);">Schedule: ${reg.eventDate}</div>
        <div style="font-size: 0.825rem; color: var(--text-muted);">Venue: ${reg.eventVenue}</div>
        <div style="font-size: 0.825rem; color: var(--text-muted);">Attendee: ${reg.participantName} • Passes: ${reg.tickets} • Paid: ${reg.totalCost}</div>
        <div class="vault-record-actions">
          <button class="btn btn-secondary btn-sm btn-print-ticket" data-id="${reg.id}">Print Pass</button>
          <button class="btn btn-danger btn-sm btn-cancel-ticket" data-id="${reg.id}">Cancel Pass</button>
        </div>
      `;
      elements.vaultCardsList.appendChild(card);
    });

    elements.vaultCardsList.querySelectorAll(".btn-cancel-ticket").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Cancel and release this admission pass?")) {
          StorageManager.deleteRegistration(id);
          renderVaultCards();
          updateVaultBadge();
          showToast("Pass released.", "info");
        }
      });
    });

    elements.vaultCardsList.querySelectorAll(".btn-print-ticket").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.print();
      });
    });
  }

  function openVaultDrawer() {
    renderVaultCards();
    elements.passVaultSlideDrawer.classList.add("is-open");
    elements.passVaultSlideDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeVaultDrawer() {
    elements.passVaultSlideDrawer.classList.remove("is-open");
    elements.passVaultSlideDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  elements.vaultTriggerBtn.addEventListener("click", openVaultDrawer);
  elements.vaultDismissBtn.addEventListener("click", closeVaultDrawer);
  elements.passVaultSlideDrawer.addEventListener("click", (e) => {
    if (e.target === elements.passVaultSlideDrawer) closeVaultDrawer();
  });

  elements.vaultExportJsonBtn?.addEventListener("click", () => {
    const list = StorageManager.getRegistrations();
    if (list.length === 0) {
      showToast("No passes to export.", "error");
      return;
    }
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list, null, 2));
    const dl = document.createElement("a");
    dl.setAttribute("href", jsonStr);
    dl.setAttribute("download", `vistara-passes-${Date.now()}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
    showToast("Exported passes to JSON.", "success");
  });

  // =========================================================================
  // Toast Shelf
  // =========================================================================
  function showToast(message, type = "info", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `toast-badge status-${type}`;
    const prefix = type === "success" ? "OK" : type === "error" ? "ERR" : "INFO";
    toast.innerHTML = `<span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800;">[${prefix}]</span><span>${message}</span>`;

    elements.toastShelf.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(40px)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  // Keyboard accessibility: ESC closes dialogs
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (elements.detailModalDialog.classList.contains("is-open")) closeDetailDialog();
      if (elements.registrationModalDialog.classList.contains("is-open")) closeRegistrationDialog();
      if (elements.confirmationModalDialog.classList.contains("is-open")) closeConfirmationDialog();
      if (elements.passVaultSlideDrawer.classList.contains("is-open")) closeVaultDrawer();
    }
  });

  // =========================================================================
  // Application Bootstrapping
  // =========================================================================
  initTheme();
  initHeroFlagshipCard();
  applyFiltersAndSort();
  startClocksLoop();
  updateVaultBadge();
});
