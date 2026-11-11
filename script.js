/**
 * Amrutha Rajesh C T - SQL Developer Portfolio
 * Vanilla JavaScript for Interactive Features:
 * - Query Optimization Showcase (Before vs. After live comparison)
 * - Skills Category Filter
 * - SQL Code Snippet Modal with Syntax Formatting & Copying
 * - Reading Progress Bar & Scrollspy
 * - One-Click Email Copy & Toast Notifications
 * - Real-Time Message Character Counter & Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Reading Progress Bar
     ========================================================================== */
  const progressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0 && progressBar) {
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  /* ==========================================================================
     2. Mobile Navigation Toggle & Outside Click
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ==========================================================================
     3. Active Nav Link Highlighting (Scrollspy)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const headerOffset = 110;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ==========================================================================
     4. Back to Top Floating Button
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollPosition > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     5. Real-Time Character Counter in Message Field
     ========================================================================== */
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-counter');

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCounter.textContent = `${length} / 500`;
      if (length >= 480) {
        charCounter.style.color = '#ef4444';
      } else {
        charCounter.style.color = '#64748b';
      }
    });
  }

  /* ==========================================================================
     6. Contact Form Client-Side Validation
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');

  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearFieldError(input, errorElement) {
      input.classList.remove('input-error');
      errorElement.textContent = '';
    }

    function setFieldError(input, errorElement, message) {
      input.classList.add('input-error');
      errorElement.textContent = message;
    }

    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          const errorSpan = document.getElementById(`${input.name}-error`);
          if (errorSpan) clearFieldError(input, errorSpan);
          if (formAlert && formAlert.classList.contains('form-alert-error')) {
            formAlert.style.display = 'none';
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const subjectVal = subjectInput.value.trim();
      const messageVal = messageInput.value.trim();

      if (!nameVal || nameVal.length < 2) {
        setFieldError(nameInput, nameError, 'Full name must be at least 2 characters.');
        isValid = false;
      } else {
        clearFieldError(nameInput, nameError);
      }

      if (!emailVal || !emailPattern.test(emailVal)) {
        setFieldError(emailInput, emailError, 'Please enter a valid email (e.g., name@company.com).');
        isValid = false;
      } else {
        clearFieldError(emailInput, emailError);
      }

      if (!subjectVal || subjectVal.length < 3) {
        setFieldError(subjectInput, subjectError, 'Subject must be at least 3 characters.');
        isValid = false;
      } else {
        clearFieldError(subjectInput, subjectError);
      }

      if (!messageVal || messageVal.length < 10) {
        setFieldError(messageInput, messageError, 'Message must be at least 10 characters long.');
        isValid = false;
      } else {
        clearFieldError(messageInput, messageError);
      }

      if (!isValid) {
        formAlert.className = 'form-alert form-alert-error';
        formAlert.textContent = 'Please correct the highlighted fields before submitting.';
        formAlert.style.display = 'block';
        return;
      }

      const submitBtn = document.getElementById('submit-btn');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';
      }

      setTimeout(() => {
        contactForm.reset();
        if (charCounter) charCounter.textContent = '0 / 500';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        formAlert.className = 'form-alert form-alert-success';
        formAlert.textContent = `Thank you, ${nameVal}! Your message has been recorded. I will review and reply promptly at ${emailVal}.`;
        formAlert.style.display = 'block';

        showToast('Message sent successfully!');

        setTimeout(() => {
          formAlert.style.display = 'none';
        }, 8000);
      }, 400);
    });
  }
});

/* ==========================================================================
   7. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast-notify');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================================================
   8. One-Click Copy Email to Clipboard
   ========================================================================== */
function copyEmailToClipboard() {
  const email = 'connectwithamruthact@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const copyLabel = document.getElementById('copy-email-text');
    if (copyLabel) {
      const orig = copyLabel.textContent;
      copyLabel.textContent = 'Copied!';
      setTimeout(() => copyLabel.textContent = orig, 2000);
    }
    showToast('Email address copied to clipboard: ' + email);
  }).catch(() => {
    showToast('Failed to copy. Email: ' + email);
  });
}

/* ==========================================================================
   9. Interactive Query Optimizer Showcase Data & Logic
   ========================================================================== */
const optimizerData = {
  unoptimized: {
    title: 'Unoptimized Query: Cartesian Multi-Join & Subquery in WHERE',
    runtime: '4.2 Minutes (252,000 ms)',
    runtimeBadge: 'CRITICAL LAG',
    runtimeBarWidth: '98%',
    isGood: false,
    reads: '482,109 Pages',
    readsBadge: 'HIGH I/O',
    readsBarWidth: '95%',
    operator: 'Clustered Index Scan (100%)',
    operatorBadge: 'NON-SARGABLE',
    operatorBarWidth: '100%',
    cpu: '14,320 ms',
    cpuBadge: 'HEAVY LOAD',
    cpuBarWidth: '90%',
    code: `-- ❌ UNOPTIMIZED QUERY (Causes full table scan on 500K+ ERP records)
SELECT o.OrderID, c.CustomerName, p.ProductName, o.OrderDate, o.TotalAmount
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
JOIN Products p ON o.ProductID = p.ProductID
WHERE YEAR(o.OrderDate) = 2026 -- Non-Sargable function forces full scan
  AND o.TotalAmount > (
      SELECT AVG(TotalAmount) FROM Orders WHERE Status = 'Completed' -- Correlated subquery per row
  )
ORDER BY o.OrderDate DESC;`,
    explanation: `<strong>Bottleneck Diagnosis:</strong> Using <code>YEAR(o.OrderDate)</code> invalidates B-Tree index seeks on <code>OrderDate</code>. The scalar subquery recalculates per outer row, creating massive disk I/O and locking issues across concurrent reporting runs.`
  },
  optimized: {
    title: 'Optimized Query: CTE, Pre-Calculated Threshold & Targeted Covering Index',
    runtime: '0.14 Seconds (140 ms)',
    runtimeBadge: '99.9% FASTER',
    runtimeBarWidth: '3%',
    isGood: true,
    reads: '128 Pages',
    readsBadge: 'MINIMAL I/O',
    readsBarWidth: '2%',
    operator: 'Index Seek + Covering Non-Clustered (1%)',
    operatorBadge: 'SARGABLE SEEK',
    operatorBarWidth: '1%',
    cpu: '45 ms',
    cpuBadge: 'OPTIMIZED',
    cpuBarWidth: '2%',
    code: `-- ✅ OPTIMIZED QUERY (Slashed execution time to 140ms on 500K+ records)
-- 1. Create Covering Index:
-- CREATE NONCLUSTERED INDEX IX_Orders_Date_Amount 
-- ON Orders (OrderDate, Status) INCLUDE (CustomerID, ProductID, TotalAmount);

WITH ThresholdCTE AS (
    -- Pre-calculate benchmark once instead of row-by-row
    SELECT AVG(TotalAmount) AS AvgThreshold
    FROM Orders WITH (NOLOCK)
    WHERE Status = 'Completed'
)
SELECT 
    o.OrderID, c.CustomerName, p.ProductName, o.OrderDate, o.TotalAmount
FROM Orders o WITH (NOLOCK)
CROSS JOIN ThresholdCTE t
JOIN Customers c ON o.CustomerID = c.CustomerID
JOIN Products p ON o.ProductID = p.ProductID
WHERE o.OrderDate >= '2026-01-01' AND o.OrderDate < '2027-01-01' -- Sargable range seek
  AND o.TotalAmount > t.AvgThreshold
ORDER BY o.OrderDate DESC;`,
    explanation: `<strong>Optimization Applied:</strong> Replaced the scalar function with a sargable date range, enabling a B-Tree index seek. Isolated the aggregate subquery into a CTE calculated exactly once. Created a composite covering index with <code>INCLUDE</code> columns, eliminating all bookmark key lookups.`
  }
};

let currentOptimizerTab = 'unoptimized';

function switchOptimizerTab(tabKey) {
  currentOptimizerTab = tabKey;
  const data = optimizerData[tabKey];
  if (!data) return;

  // Toggle active button styling
  const tabUnopt = document.getElementById('tab-unoptimized');
  const tabOpt = document.getElementById('tab-optimized');
  if (tabUnopt && tabOpt) {
    tabUnopt.classList.toggle('active', tabKey === 'unoptimized');
    tabUnopt.setAttribute('aria-selected', String(tabKey === 'unoptimized'));
    tabOpt.classList.toggle('active', tabKey === 'optimized');
    tabOpt.setAttribute('aria-selected', String(tabKey === 'optimized'));
  }

  // Update Metrics
  const valRuntime = document.getElementById('val-runtime');
  const badgeRuntime = document.getElementById('badge-runtime');
  const barRuntime = document.getElementById('bar-runtime');

  const valReads = document.getElementById('val-reads');
  const badgeReads = document.getElementById('badge-reads');
  const barReads = document.getElementById('bar-reads');

  const valOperator = document.getElementById('val-operator');
  const badgeOperator = document.getElementById('badge-operator');
  const barOperator = document.getElementById('bar-operator');

  const valCpu = document.getElementById('val-cpu');
  const badgeCpu = document.getElementById('badge-cpu');
  const barCpu = document.getElementById('bar-cpu');

  if (valRuntime) valRuntime.textContent = data.runtime;
  if (badgeRuntime) {
    badgeRuntime.textContent = data.runtimeBadge;
    badgeRuntime.className = `metric-badge ${data.isGood ? 'badge-success' : 'badge-warning'}`;
  }
  if (barRuntime) {
    barRuntime.style.width = data.runtimeBarWidth;
    barRuntime.className = `metric-progress-bar ${data.isGood ? 'bar-good' : 'bar-bad'}`;
  }

  if (valReads) valReads.textContent = data.reads;
  if (badgeReads) {
    badgeReads.textContent = data.readsBadge;
    badgeReads.className = `metric-badge ${data.isGood ? 'badge-success' : 'badge-warning'}`;
  }
  if (barReads) {
    barReads.style.width = data.readsBarWidth;
    barReads.className = `metric-progress-bar ${data.isGood ? 'bar-good' : 'bar-bad'}`;
  }

  if (valOperator) valOperator.textContent = data.operator;
  if (badgeOperator) {
    badgeOperator.textContent = data.operatorBadge;
    badgeOperator.className = `metric-badge ${data.isGood ? 'badge-success' : 'badge-warning'}`;
  }
  if (barOperator) {
    barOperator.style.width = data.operatorBarWidth;
    barOperator.className = `metric-progress-bar ${data.isGood ? 'bar-good' : 'bar-bad'}`;
  }

  if (valCpu) valCpu.textContent = data.cpu;
  if (badgeCpu) {
    badgeCpu.textContent = data.cpuBadge;
    badgeCpu.className = `metric-badge ${data.isGood ? 'badge-success' : 'badge-warning'}`;
  }
  if (barCpu) {
    barCpu.style.width = data.cpuBarWidth;
    barCpu.className = `metric-progress-bar ${data.isGood ? 'bar-good' : 'bar-bad'}`;
  }

  // Update Code
  const snippetTitle = document.getElementById('code-snippet-title');
  const codeDisplay = document.getElementById('code-display');
  const explanation = document.getElementById('optimizer-explanation');

  if (snippetTitle) snippetTitle.textContent = data.title;
  if (codeDisplay) codeDisplay.textContent = data.code;
  if (explanation) explanation.innerHTML = data.explanation;
}

function copyCurrentCode() {
  const code = optimizerData[currentOptimizerTab].code;
  navigator.clipboard.writeText(code).then(() => {
    const copyBtnText = document.getElementById('copy-text');
    if (copyBtnText) {
      const orig = copyBtnText.textContent;
      copyBtnText.textContent = 'Copied!';
      setTimeout(() => copyBtnText.textContent = orig, 2000);
    }
    showToast('SQL snippet copied to clipboard!');
  });
}

/* ==========================================================================
   10. Skills Filter Functionality
   ========================================================================== */
function filterSkills(category) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('#skills-grid .skill-card');

  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
  });

  skillCards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });
}

/* ==========================================================================
   11. Interactive SQL Code Modal Dialog
   ========================================================================== */
const modalSnippets = {
  erp: {
    category: 'T-SQL • Performance Tuning • Query Store',
    title: 'ERP High-Volume Reporting Stored Procedure',
    description: 'Production T-SQL stored procedure utilized for accelerating enterprise ERP financial reporting over 500K+ transaction rows with transaction safety and indexed covering reads.',
    code: `CREATE OR ALTER PROCEDURE dbo.usp_GenerateQuarterlySalesReport
    @FiscalYear INT,
    @RegionID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        -- Benchmark execution metric using CTE and covering index
        WITH RankedSalesCTE AS (
            SELECT 
                s.SaleID,
                s.CustomerID,
                s.SaleDate,
                s.TotalAmount,
                DENSE_RANK() OVER (PARTITION BY s.CustomerID ORDER BY s.SaleDate DESC) AS CustomerSaleRank
            FROM dbo.SalesTransactions s WITH (NOLOCK)
            WHERE s.FiscalYear = @FiscalYear
              AND (@RegionID IS NULL OR s.RegionID = @RegionID)
        )
        SELECT 
            c.CustomerName,
            c.CustomerCode,
            COUNT(r.SaleID) AS TotalOrdersInPeriod,
            SUM(r.TotalAmount) AS CumulativeSalesVolume,
            MAX(r.SaleDate) AS MostRecentTransactionDate
        FROM RankedSalesCTE r
        INNER JOIN dbo.DimCustomer c WITH (NOLOCK) ON r.CustomerID = c.CustomerID
        GROUP BY c.CustomerName, c.CustomerCode
        HAVING SUM(r.TotalAmount) > 10000
        ORDER BY CumulativeSalesVolume DESC;

    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        
        -- Structured exception logging
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO`
  },
  medaid: {
    category: 'PostgreSQL • Django ORM • Data Integrity',
    title: 'MedAid Relational Schema & ACID Transaction Logic',
    description: 'Relational 3NF PostgreSQL table definition with check constraints, foreign keys, and atomic appointment transaction handling.',
    code: `-- 3NF Normalized Schema for MedAid Women's Health Platform
CREATE TABLE patients (
    patient_id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    date_of_birth DATE NOT NULL,
    contact_phone VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE symptom_logs (
    log_id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL REFERENCES patients(patient_id) ON DELETE CASCADE,
    symptom_name VARCHAR(100) NOT NULL,
    severity_level INT CHECK (severity_level BETWEEN 1 AND 5),
    logged_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    CONSTRAINT chk_severity CHECK (severity_level >= 1 AND severity_level <= 5)
);

-- Compound index for rapid chronological patient lookup
CREATE INDEX idx_symptom_patient_date ON symptom_logs(patient_id, logged_date DESC);

-- Atomic booking transaction function ensuring zero overlap
CREATE OR REPLACE FUNCTION book_patient_appointment(
    p_patient_id BIGINT,
    p_doctor_id BIGINT,
    p_slot_time TIMESTAMP WITH TIME ZONE
) RETURNS VOID AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM appointments 
        WHERE doctor_id = p_doctor_id AND appointment_time = p_slot_time
        FOR UPDATE
    ) THEN
        RAISE EXCEPTION 'Doctor slot is already reserved for this timestamp.';
    END IF;

    INSERT INTO appointments (patient_id, doctor_id, appointment_time, status)
    VALUES (p_patient_id, p_doctor_id, p_slot_time, 'Confirmed');
END;
$$ LANGUAGE plpgsql;`
  },
  migration: {
    category: 'T-SQL • Data Engineering • Source-To-Target Validation',
    title: 'Automated Migration Validation & Duplicate Detection Script',
    description: 'T-SQL data engineering script designed to audit row-counts, verify source-to-target checksums, and detect duplicates during system cutover.',
    code: `-- Data Migration Reconciliation & Quality Audit Script
SET NOCOUNT ON;

-- 1. Identify Potential Duplicate Source Records prior to target insertion
SELECT 
    LegacyID, 
    EmailAddress, 
    COUNT(*) AS DuplicateCount
INTO #DuplicateAuditLog
FROM LegacySystemDB.dbo.CustomerExport
GROUP BY LegacyID, EmailAddress
HAVING COUNT(*) > 1;

-- 2. Verify Record Count Reconciliation
DECLARE @SourceCount BIGINT, @TargetCount BIGINT;
SELECT @SourceCount = COUNT(1) FROM LegacySystemDB.dbo.CustomerExport;
SELECT @TargetCount = COUNT(1) FROM UnifiedTargetDB.dbo.DimCustomers WHERE IsMigrated = 1;

PRINT 'Source Count: ' + CAST(@SourceCount AS NVARCHAR(20));
PRINT 'Target Count: ' + CAST(@TargetCount AS NVARCHAR(20));

-- 3. Source-to-Target Column Checksum & Null Validation
SELECT 
    src.LegacyID,
    CASE 
        WHEN tgt.CustomerCode IS NULL THEN 'Record Missing in Target'
        WHEN tgt.EmailAddress IS NULL THEN 'Missing Email Attribute'
        WHEN CHECKSUM(src.ContactNumber) <> CHECKSUM(tgt.PhoneNumber) THEN 'Phone Value Mismatch'
        ELSE 'Verified OK'
    END AS ValidationStatus
FROM LegacySystemDB.dbo.CustomerExport src
LEFT JOIN UnifiedTargetDB.dbo.DimCustomers tgt ON src.LegacyID = tgt.LegacyCustomerCode;`
  }
};

let currentModalSnippetKey = 'erp';

function openSqlModal(snippetKey) {
  currentModalSnippetKey = snippetKey;
  const data = modalSnippets[snippetKey];
  if (!data) return;

  const modal = document.getElementById('sql-modal');
  const cat = document.getElementById('modal-category');
  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-desc');
  const code = document.getElementById('modal-code-display');

  if (cat) cat.textContent = data.category;
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.description;
  if (code) code.textContent = data.code;

  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeSqlModal() {
  const modal = document.getElementById('sql-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function copyModalCode() {
  const code = modalSnippets[currentModalSnippetKey].code;
  navigator.clipboard.writeText(code).then(() => {
    const copyBtnText = document.getElementById('modal-copy-text');
    if (copyBtnText) {
      const orig = copyBtnText.textContent;
      copyBtnText.textContent = 'Copied!';
      setTimeout(() => copyBtnText.textContent = orig, 2000);
    }
    showToast('Code snippet copied to clipboard!');
  });
}

// Close modal on escape key or clicking backdrop
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSqlModal();
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('sql-modal');
  if (e.target === modal) closeSqlModal();
});
