/**
 * ============================================================================
 * ALEX MORGAN - MYSQL DEVELOPER PORTFOLIO
 * Main JavaScript Controller
 * ============================================================================
 * Features:
 *  1. Header Scroll Styling & Sticky Shadow
 *  2. Responsive Mobile Navigation Menu & Backdrop
 *  3. Scrollspy / Active Navigation Highlighting
 *  4. Smooth Scrolling with Offset Calculation
 *  5. Scroll Reveal Animations (IntersectionObserver)
 *  6. Project Details Modal with SQL Architecture Previews
 *  7. Contact Form Real-time & Submit Validation (Frontend Only)
 *  8. Back to Top Button
 *  9. Dynamic Year in Footer
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. DOM Element Cache
     -------------------------------------------------------------------------- */
  const header = document.getElementById('site-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');
  const currentYearSpan = document.getElementById('current-year');

  // Modal elements
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseAction = document.getElementById('modal-close-action');
  const projectDetailButtons = document.querySelectorAll('.btn-project-details');

  // Contact Form elements
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-counter');
  const formFeedback = document.getElementById('form-feedback');

  /* --------------------------------------------------------------------------
     2. Dynamic Year in Footer
     -------------------------------------------------------------------------- */
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     3. Header Scroll Effect (Shadow & Transparency)
     -------------------------------------------------------------------------- */
  const handleHeaderScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* --------------------------------------------------------------------------
     4. Mobile Navigation Menu Toggle
     -------------------------------------------------------------------------- */
  const toggleMobileMenu = (forceState) => {
    const isOpening = forceState !== undefined ? forceState : !mainNav.classList.contains('open');

    if (isOpening) {
      mainNav.classList.add('open');
      mobileMenuBtn.classList.add('active');
      navBackdrop.classList.add('show');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      mainNav.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      navBackdrop.classList.remove('show');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Close mobile navigation on clicking any nav item
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. Active Navigation Highlighting (Scrollspy)
     -------------------------------------------------------------------------- */
  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 120; // Offset for fixed header + padding

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* --------------------------------------------------------------------------
     6. Scroll Animations (.reveal with IntersectionObserver)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Once revealed, stay visible
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if browser does not support IntersectionObserver
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     7. Back to Top Button
     -------------------------------------------------------------------------- */
  const handleBackToTopVisibility = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. Project Details Modal Content & Handlers
     -------------------------------------------------------------------------- */
  const projectDatabase = {
    erp: {
      category: 'Enterprise ERP Database Optimization',
      title: 'ERP Database Optimization & Support',
      github: 'https://github.com/amrutharajeshct',
      htmlContent: `
        <h4>Project Architecture &amp; Challenge</h4>
        <p>Enterprise ERP reporting procedures were stalling under tables containing 500,000+ active records, causing report execution runtimes to exceed several minutes and locking production user workflows.</p>
        
        <h4>Key Technical Implementations</h4>
        <ul>
          <li><strong>Execution Plan Profiling:</strong> Utilized SQL Server Profiler and Query Store to diagnose high-cost operators, key lookups, and missing indexes.</li>
          <li><strong>Covering Index Design:</strong> Designed targeted non-clustered covering indexes with <code>INCLUDE</code> columns, allowing critical financial reports to be satisfied completely within the index leaf pages.</li>
          <li><strong>CTE Refactoring:</strong> Replaced slow cursor-based row-by-row iteration with set-based Common Table Expressions (CTEs) and window functions.</li>
          <li><strong>Quantifiable Result:</strong> Reduced business-critical report execution times from several minutes down to under 15 seconds.</li>
        </ul>

        <h4>Sample T-SQL Optimization Snippet</h4>
        <pre class="modal-code-block"><code>-- Create covering index to eliminate expensive Key Lookups on 500K+ ERP table
CREATE NONCLUSTERED INDEX IX_ERP_Transactions_Reporting
ON dbo.ERP_FinancialTransactions (TenantID, TransactionDate, StatusID)
INCLUDE (AccountID, DebitAmount, CreditAmount, ReferenceNo);

-- Optimized set-based CTE report routine replacing row-by-row cursors
WITH FilteredTransactions AS (
    SELECT 
        AccountID,
        DebitAmount,
        CreditAmount,
        ROW_NUMBER() OVER (PARTITION BY AccountID ORDER BY TransactionDate DESC) AS RowSeq
    FROM dbo.ERP_FinancialTransactions WITH (NOLOCK)
    WHERE TenantID = @TenantID
      AND TransactionDate >= @StartDate
      AND StatusID = 1 -- Approved
)
SELECT 
    AccountID,
    SUM(DebitAmount) AS TotalDebit,
    SUM(CreditAmount) AS TotalCredit
FROM FilteredTransactions
GROUP BY AccountID;</code></pre>
      `,
    },
    'mysql-tuning': {
      category: 'MySQL & MariaDB Optimization',
      title: 'Multi-Table Query Tuning & HeidiSQL Routine Suite',
      github: 'https://github.com/amrutharajeshct',
      htmlContent: `
        <h4>Project Architecture &amp; Challenge</h4>
        <p>At PopIT Solutions, high-volume production web applications encountered latency spikes due to complex multi-table joins across MySQL and MariaDB databases.</p>
        
        <h4>Key Technical Implementations</h4>
        <ul>
          <li><strong>Multi-Table Query Refactoring:</strong> Analyzed slow query logs, eliminated Cartesian products, and restructured nested joins into optimized indexed lookups.</li>
          <li><strong>HeidiSQL Object Maintenance:</strong> Authored and maintained stored procedures, triggers, views, and indexes directly using HeidiSQL to align database logic with business rules.</li>
          <li><strong>Production Debugging &amp; Integrity:</strong> Debugged SQL logic in real time, identified data-related defects, and ran dataset validation checks to maintain zero data discrepancies.</li>
        </ul>

        <h4>Sample MySQL Stored Routine</h4>
        <pre class="modal-code-block"><code>DELIMITER $$
CREATE PROCEDURE sp_ValidateAndAggregateOrders(
    IN in_merchant_id INT,
    IN in_start_date DATE,
    OUT out_total_volume DECIMAL(14,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET out_total_volume = 0.00;
    END;

    START TRANSACTION;

    -- Validate dataset integrity before aggregation
    INSERT INTO audit_validation_log (merchant_id, checked_at, check_type)
    VALUES (in_merchant_id, NOW(), 'MULTI_TABLE_AGGREGATION');

    SELECT IFNULL(SUM(oi.quantity * oi.unit_price), 0.00) INTO out_total_volume
    FROM orders o
    INNER JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.merchant_id = in_merchant_id
      AND o.order_date >= in_start_date
      AND o.order_status = 'COMPLETED';

    COMMIT;
END $$
DELIMITER ;</code></pre>
      `,
    },
    migration: {
      category: 'Data Engineering & Cleansing',
      title: 'Enterprise Data Migration & Quality Pipeline',
      github: 'https://github.com/amrutharajeshct',
      htmlContent: `
        <h4>Project Architecture &amp; Challenge</h4>
        <p>Led data migration projects between legacy database architectures and modern Microsoft SQL Server enterprise databases at Perfect Software Solutions, requiring zero data loss and strict schema integrity.</p>
        
        <h4>Key Technical Implementations</h4>
        <ul>
          <li><strong>Source-to-Target Reconciliation:</strong> Mapped legacy database structures to normalized 3NF schemas with foreign key relationships and integrity constraints.</li>
          <li><strong>Automated Data Quality Checks:</strong> Built automated verification scripts for duplicate detection, NULL/empty-value validation, and record-count reconciliation.</li>
          <li><strong>Rollback &amp; Version Control:</strong> Documented technical solutions, deployed with Git version control, and established transactional rollback safety nets.</li>
        </ul>

        <h4>Sample Data Quality Reconciliation Query</h4>
        <pre class="modal-code-block"><code>-- Source-to-Target Record Count and Data Quality Check
SELECT 
    'Customer_Migration_Check' AS ReconciliationTask,
    (SELECT COUNT(*) FROM Legacy_DB.dbo.Customers) AS SourceRecordCount,
    (SELECT COUNT(*) FROM Target_DB.dbo.DimCustomers) AS TargetRecordCount,
    (SELECT COUNT(*) FROM Target_DB.dbo.DimCustomers WHERE Email IS NULL OR LTRIM(RTRIM(Email)) = '') AS NullEmptyEmailCount,
    (SELECT COUNT(*) - COUNT(DISTINCT CustomerUUID) FROM Target_DB.dbo.DimCustomers) AS DuplicateKeyAnomalyCount;</code></pre>
      `,
    },
    medaid: {
      category: 'Full-Stack Database Architecture',
      title: "MedAid – Women's Health Companion",
      github: 'https://github.com/amrutharajeshct',
      htmlContent: `
        <h4>Project Architecture &amp; Challenge</h4>
        <p>Final Year Engineering Project (2025): Developed a healthcare platform with a robust relational database backend managing sensitive patient profiles, appointment schedules, and continuous symptom tracking.</p>
        
        <h4>Key Technical Implementations</h4>
        <ul>
          <li><strong>3NF Normalized PostgreSQL Schema:</strong> Modeled relational entities avoiding update anomalies and ensuring strict patient data privacy and auditability.</li>
          <li><strong>Django ORM &amp; REST APIs:</strong> Built scalable REST API endpoints using Django ORM and serialized querysets for frontend consumption.</li>
          <li><strong>Pandas Aggregation &amp; ACID Updates:</strong> Utilized Pandas for clinical symptom trend aggregation and enforced ACID database transactions during appointment booking.</li>
        </ul>

        <h4>Sample PostgreSQL Schema &amp; Constraint Definition</h4>
        <pre class="modal-code-block"><code>-- 3NF Normalized Schema with Referential Integrity
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    patient_uuid UUID DEFAULT gen_random_uuid() UNIQUE,
    full_name VARCHAR(120) NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE symptom_logs (
    log_id BIGSERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES patients(patient_id) ON DELETE CASCADE,
    symptom_code VARCHAR(30) NOT NULL,
    severity_level INT CHECK (severity_level BETWEEN 1 AND 5),
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_symptom_patient_time ON symptom_logs(patient_id, logged_at DESC);</code></pre>
      `,
    },
  };

  const openProjectModal = (projectId) => {
    const project = projectDatabase[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalBodyContent.innerHTML = project.htmlContent;
    modalGithubLink.setAttribute('href', project.github);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      modalCloseBtn.focus();
    }, 100);
  };

  const closeProjectModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  projectDetailButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      openProjectModal(targetId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  // Close modal or mobile menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('is-open')) {
        closeProjectModal();
      }
      if (mainNav && mainNav.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    }
  });

  /* --------------------------------------------------------------------------
     9. Contact Form Real-Time & Submit Validation (Frontend Only)
     -------------------------------------------------------------------------- */
  // Validation Helper Rules
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const setFieldError = (inputEl, errorId, message) => {
    const formGroup = inputEl.closest('.form-group');
    const errorSpan = document.getElementById(errorId);

    if (formGroup) {
      formGroup.classList.add('has-error');
      formGroup.classList.remove('is-valid');
    }
    inputEl.setAttribute('aria-invalid', 'true');
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  };

  const clearFieldError = (inputEl, errorId) => {
    const formGroup = inputEl.closest('.form-group');
    const errorSpan = document.getElementById(errorId);

    if (formGroup) {
      formGroup.classList.remove('has-error');
      formGroup.classList.add('is-valid');
    }
    inputEl.setAttribute('aria-invalid', 'false');
    if (errorSpan) {
      errorSpan.textContent = '';
    }
  };

  // Field Specific Validators
  const validateName = () => {
    const val = nameInput.value.trim();
    if (!val) {
      setFieldError(nameInput, 'error-name', 'Please enter your name.');
      return false;
    }
    if (val.length < 2) {
      setFieldError(nameInput, 'error-name', 'Name must be at least 2 characters.');
      return false;
    }
    clearFieldError(nameInput, 'error-name');
    return true;
  };

  const validateEmail = () => {
    const val = emailInput.value.trim();
    if (!val) {
      setFieldError(emailInput, 'error-email', 'Please enter your email address.');
      return false;
    }
    if (!emailRegex.test(val)) {
      setFieldError(emailInput, 'error-email', 'Please enter a valid email address (e.g. name@domain.com).');
      return false;
    }
    clearFieldError(emailInput, 'error-email');
    return true;
  };

  const validateSubject = () => {
    const val = subjectInput.value.trim();
    if (!val) {
      setFieldError(subjectInput, 'error-subject', 'Please enter a subject.');
      return false;
    }
    if (val.length < 3) {
      setFieldError(subjectInput, 'error-subject', 'Subject must be at least 3 characters.');
      return false;
    }
    clearFieldError(subjectInput, 'error-subject');
    return true;
  };

  const validateMessage = () => {
    const val = messageInput.value.trim();
    if (!val) {
      setFieldError(messageInput, 'error-message', 'Please enter your message.');
      return false;
    }
    if (val.length < 10) {
      setFieldError(messageInput, 'error-message', 'Message must be at least 10 characters.');
      return false;
    }
    if (val.length > 1000) {
      setFieldError(messageInput, 'error-message', 'Message cannot exceed 1000 characters.');
      return false;
    }
    clearFieldError(messageInput, 'error-message');
    return true;
  };

  // Live Real-Time Validation Listeners
  if (nameInput) {
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', () => {
      if (nameInput.closest('.form-group').classList.contains('has-error')) {
        validateName();
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.closest('.form-group').classList.contains('has-error')) {
        validateEmail();
      }
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('blur', validateSubject);
    subjectInput.addEventListener('input', () => {
      if (subjectInput.closest('.form-group').classList.contains('has-error')) {
        validateSubject();
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      if (charCounter) {
        charCounter.textContent = `${len} / 1000`;
        if (len > 1000) {
          charCounter.style.color = 'var(--status-red)';
        } else {
          charCounter.style.color = 'var(--text-muted)';
        }
      }
      if (messageInput.closest('.form-group').classList.contains('has-error')) {
        validateMessage();
      }
    });
  }

  // Form Submit Handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Run all validations
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (!isFormValid) {
        // Find first invalid input and focus it
        const firstInvalid = contactForm.querySelector('.form-group.has-error input, .form-group.has-error textarea');
        if (firstInvalid) {
          firstInvalid.focus();
        }

        formFeedback.className = 'form-feedback error';
        formFeedback.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>
            <strong>Validation Error:</strong> Please correct the highlighted fields above before submitting.
          </div>
        `;
        formFeedback.style.display = 'flex';
        return;
      }

      // Successful Frontend Validation
      const submittedName = nameInput.value.trim();
      const submittedSubject = subjectInput.value.trim();

      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <div>
          <strong>Message Validated Successfully!</strong><br>
          Thank you, <em>${escapeHtml(submittedName)}</em>. Your inquiry regarding "<em>${escapeHtml(submittedSubject)}</em>" passed all client-side validation checks.<br>
          <span style="font-size: 0.82rem; opacity: 0.9; display: inline-block; margin-top: 4px;">
            ℹ️ <strong>Frontend Demo Notice:</strong> As specified in project requirements, backend persistence (Node.js/Express &amp; MySQL database) will be connected in Phase 2.
          </span>
        </div>
      `;
      formFeedback.style.display = 'flex';

      // Reset form fields and validation classes
      contactForm.reset();
      document.querySelectorAll('.form-group').forEach((group) => {
        group.classList.remove('is-valid');
        group.classList.remove('has-error');
      });
      if (charCounter) {
        charCounter.textContent = '0 / 1000';
      }

      // Smooth scroll back to feedback message
      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // Security Helper: Escape HTML to prevent injection into feedback banner
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
