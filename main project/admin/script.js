// Global variables
let currentPage = 1
const itemsPerPage = 10

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeSidebar()
  initializeSearch()
  initializeTables()
  initializeCharts()
  initializeForms()
  initializeMobileMenu()
  initializeImageGallery()
  initializeVerificationControls()
  handleVerificationSubmit()
  initializeReportFilters()
  initializeListingActions()
  initializeImageZoom()
})

// Sidebar functionality
function initializeSidebar() {
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a")
  const currentPath = window.location.pathname

  sidebarLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath.split("/").pop()) {
      link.classList.add("active")
    }

    link.addEventListener("click", function (e) {
      sidebarLinks.forEach((l) => l.classList.remove("active"))
      this.classList.add("active")
    })
  })
}

// Search functionality
function initializeSearch() {
  const searchInput = document.querySelector(".search-box input")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      filterTableRows(searchTerm)
    })
  }
}

// Filter table rows based on search term
function filterTableRows(searchTerm) {
  const tableRows = document.querySelectorAll(".custom-table tbody tr")

  tableRows.forEach((row) => {
    const text = row.textContent.toLowerCase()
    if (text.includes(searchTerm)) {
      row.style.display = ""
    } else {
      row.style.display = "none"
    }
  })
}

// Table functionality
function initializeTables() {
  // Initialize sortable tables
  const tables = document.querySelectorAll(".custom-table")
  tables.forEach((table) => {
    const headers = table.querySelectorAll("th")
    headers.forEach((header, index) => {
      if (header.classList.contains("sortable")) {
        header.style.cursor = "pointer"
        header.addEventListener("click", () => sortTable(table, index))
      }
    })
  })

  // Initialize pagination
  initializePagination()
}

// Sort table by column
function sortTable(table, columnIndex) {
  const tbody = table.querySelector("tbody")
  const rows = Array.from(tbody.querySelectorAll("tr"))
  const isAscending = table.getAttribute("data-sort-direction") !== "asc"

  rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim()
    const bText = b.cells[columnIndex].textContent.trim()

    if (isAscending) {
      return aText.localeCompare(bText, undefined, { numeric: true })
    } else {
      return bText.localeCompare(aText, undefined, { numeric: true })
    }
  })

  // Clear tbody and append sorted rows
  tbody.innerHTML = ""
  rows.forEach((row) => tbody.appendChild(row))

  // Update sort direction
  table.setAttribute("data-sort-direction", isAscending ? "asc" : "desc")

  // Update header indicators
  const headers = table.querySelectorAll("th")
  headers.forEach((h) => h.classList.remove("sort-asc", "sort-desc"))
  headers[columnIndex].classList.add(isAscending ? "sort-asc" : "sort-desc")
}

// Pagination functionality
function initializePagination() {
  const paginationContainer = document.querySelector(".pagination")
  if (paginationContainer) {
    updatePagination()
  }
}

function updatePagination() {
  const totalItems = document.querySelectorAll(".custom-table tbody tr").length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginationContainer = document.querySelector(".pagination")

  if (!paginationContainer) return

  let paginationHTML = ""

  // Previous button
  paginationHTML += `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>
    `

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `
  }

  // Next button
  paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>
    `

  paginationContainer.innerHTML = paginationHTML
}

function changePage(page) {
  const totalItems = document.querySelectorAll(".custom-table tbody tr").length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (page < 1 || page > totalPages) return

  currentPage = page
  updateTableDisplay()
  updatePagination()
}

function updateTableDisplay() {
  const rows = document.querySelectorAll(".custom-table tbody tr")
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  rows.forEach((row, index) => {
    if (index >= startIndex && index < endIndex) {
      row.style.display = ""
    } else {
      row.style.display = "none"
    }
  })
}

// Chart initialization (using Chart.js if available)
function initializeCharts() {
  // Pie chart for user statistics
  const pieChartCanvas = document.getElementById("userStatsChart")
  if (pieChartCanvas) {
    const Chart = window.Chart // Using Chart.js from CDN instead
    new Chart(pieChartCanvas, {
      type: "doughnut",
      data: {
        labels: ["Agents/Landowners", "Developers", "Investors"],
        datasets: [
          {
            data: [30000, 25000, 2000],
            backgroundColor: ["#e74c3c", "#f39c12", "#27ae60"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    })
  }
}

// Form functionality
function initializeForms() {
  // Form validation
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!validateForm(this)) {
        e.preventDefault()
      }
    })
  })

  // Character counter for textareas
  const textareas = document.querySelectorAll("textarea[maxlength]")
  textareas.forEach((textarea) => {
    const maxLength = textarea.getAttribute("maxlength")
    const counter = document.createElement("div")
    counter.className = "character-counter"
    counter.style.textAlign = "right"
    counter.style.fontSize = "12px"
    counter.style.color = "#6c757d"
    counter.style.marginTop = "5px"

    textarea.parentNode.appendChild(counter)

    function updateCounter() {
      const remaining = maxLength - textarea.value.length
      counter.textContent = `${remaining} characters remaining`
    }

    textarea.addEventListener("input", updateCounter)
    updateCounter()
  })
}

// Form validation
function validateForm(form) {
  let isValid = true
  const requiredFields = form.querySelectorAll("[required]")

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      showFieldError(field, "This field is required")
      isValid = false
    } else {
      clearFieldError(field)
    }
  })

  // Email validation
  const emailFields = form.querySelectorAll('input[type="email"]')
  emailFields.forEach((field) => {
    if (field.value && !isValidEmail(field.value)) {
      showFieldError(field, "Please enter a valid email address")
      isValid = false
    }
  })

  return isValid
}

function showFieldError(field, message) {
  clearFieldError(field)
  field.classList.add("is-invalid")

  const errorDiv = document.createElement("div")
  errorDiv.className = "invalid-feedback"
  errorDiv.textContent = message
  field.parentNode.appendChild(errorDiv)
}

function clearFieldError(field) {
  field.classList.remove("is-invalid")
  const errorDiv = field.parentNode.querySelector(".invalid-feedback")
  if (errorDiv) {
    errorDiv.remove()
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function initializeMobileMenu() {
  const mobileToggle = document.querySelector(".mobile-menu-toggle")
  const sidebar = document.querySelector(".sidebar")

  // Create overlay element for mobile
  let overlay = document.querySelector(".sidebar-overlay")
  if (!overlay) {
    overlay = document.createElement("div")
    overlay.className = "sidebar-overlay"
    document.body.appendChild(overlay)
  }

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      toggleMobileSidebar()
    })

    // Close sidebar when clicking overlay
    overlay.addEventListener("click", () => {
      closeMobileSidebar()
    })

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
          closeMobileSidebar()
        }
      }
    })

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMobileSidebar()
      }
    })

    // Close sidebar when clicking on sidebar links (mobile)
    const sidebarLinks = sidebar.querySelectorAll(".sidebar-nav a")
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          setTimeout(() => closeMobileSidebar(), 150)
        }
      })
    })

    // Handle escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar.classList.contains("show")) {
        closeMobileSidebar()
      }
    })
  }
}

function toggleMobileSidebar() {
  const sidebar = document.querySelector(".sidebar")
  const overlay = document.querySelector(".sidebar-overlay")

  if (sidebar.classList.contains("show")) {
    closeMobileSidebar()
  } else {
    openMobileSidebar()
  }
}

function openMobileSidebar() {
  const sidebar = document.querySelector(".sidebar")
  const overlay = document.querySelector(".sidebar-overlay")

  sidebar.classList.add("show")
  overlay.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeMobileSidebar() {
  const sidebar = document.querySelector(".sidebar")
  const overlay = document.querySelector(".sidebar-overlay")

  sidebar.classList.remove("show")
  overlay.classList.remove("show")
  document.body.style.overflow = ""
}

// Utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} alert-dismissible fade show`
  notification.style.position = "fixed"
  notification.style.top = "20px"
  notification.style.right = "20px"
  notification.style.zIndex = "9999"
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 5000)
}

function confirmAction(message, callback) {
  if (confirm(message)) {
    callback()
  }
}

// Export functions for global use
window.changePage = changePage
window.showNotification = showNotification
window.confirmAction = confirmAction

// Modal functionality
function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("show")
    document.body.style.overflow = "hidden"
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = ""
  }
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    hideModal(e.target.id)
  }
})

// Image gallery functionality
function initializeImageGallery() {
  const mainImage = document.querySelector(".main-image")
  const thumbnails = document.querySelectorAll(".thumbnail")

  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        // Remove active class from all thumbnails
        thumbnails.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked thumbnail
        this.classList.add("active")

        // Update main image
        mainImage.src = this.src
        mainImage.alt = this.alt
      })
    })

    // Set first thumbnail as active by default
    if (thumbnails[0]) {
      thumbnails[0].classList.add("active")
    }
  }
}

// Verification status change functionality
function initializeVerificationControls() {
  const verifyBtn = document.querySelector(".verify-user-btn")
  const rejectBtn = document.querySelector(".reject-user-btn")
  const changeStatusBtn = document.querySelector(".change-status-btn")

  if (verifyBtn) {
    verifyBtn.addEventListener("click", () => {
      showModal("verificationModal")
      // Pre-select verify option
      const verifyRadio = document.querySelector('input[value="verify"]')
      if (verifyRadio) {
        verifyRadio.checked = true
      }
    })
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      showModal("verificationModal")
      // Pre-select reject option
      const rejectRadio = document.querySelector('input[value="reject"]')
      if (rejectRadio) {
        rejectRadio.checked = true
      }
    })
  }

  if (changeStatusBtn) {
    changeStatusBtn.addEventListener("click", () => {
      showModal("verificationModal")
    })
  }
}

// Handle verification form submission
function handleVerificationSubmit() {
  const form = document.querySelector("#verificationForm")
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const selectedOption = document.querySelector('input[name="verificationStatus"]:checked')
      if (selectedOption) {
        // Hide the verification modal
        hideModal("verificationModal")

        // Show success modal
        setTimeout(() => {
          showModal("successModal")
        }, 300)

        // Auto-hide success modal after 3 seconds
        setTimeout(() => {
          hideModal("successModal")
        }, 3300)

        // Update UI based on selection
        updateVerificationStatus(selectedOption.value)
      }
    })
  }
}

// Update verification status in UI
function updateVerificationStatus(status) {
  const statusBtns = document.querySelector(".verification-status")
  if (statusBtns) {
    if (status === "verify") {
      statusBtns.innerHTML = '<button class="status-btn verified"><i class="fas fa-check"></i> Verified User</button>'
      showNotification("User verified successfully", "success")
    } else if (status === "reject") {
      statusBtns.innerHTML = '<button class="status-btn rejected"><i class="fas fa-times"></i> Rejected</button>'
      showNotification("User verification rejected", "warning")
    }
  }
}

// Filter functionality for reports
function initializeReportFilters() {
  const filterLinks = document.querySelectorAll(".filter-options a")

  filterLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links
      filterLinks.forEach((l) => l.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      // Filter reports based on selection
      const filterType = this.textContent.toLowerCase()
      filterReports(filterType)
    })
  })
}

// Filter reports based on type
function filterReports(filterType) {
  const reportItems = document.querySelectorAll(".report-item, .notification-item")

  reportItems.forEach((item) => {
    const itemText = item.textContent.toLowerCase()

    if (filterType === "all" || itemText.includes(filterType)) {
      item.style.display = ""
    } else {
      item.style.display = "none"
    }
  })
}

// Property listing actions
function initializeListingActions() {
  const publishBtns = document.querySelectorAll(".publish-btn")
  const unpublishBtns = document.querySelectorAll(".unpublish-btn")

  publishBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr")
      if (row) {
        this.textContent = "Unpublish"
        this.classList.remove("btn-success")
        this.classList.add("btn-danger", "unpublish-btn")
        showNotification("Listing published successfully", "success")
      }
    })
  })

  unpublishBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      confirmAction("Are you sure you want to unpublish this listing?", () => {
        const row = this.closest("tr")
        if (row) {
          this.textContent = "Publish"
          this.classList.remove("btn-danger", "unpublish-btn")
          this.classList.add("btn-success", "publish-btn")
          showNotification("Listing unpublished successfully", "info")
        }
      })
    })
  })
}

// Image zoom functionality
function initializeImageZoom() {
  const zoomImages = document.querySelectorAll(".image-zoom")

  zoomImages.forEach((img) => {
    img.addEventListener("click", function () {
      // Create zoom overlay
      const overlay = document.createElement("div")
      overlay.className = "zoom-overlay"
      overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: zoom-out;
            `

      // Create zoomed image
      const zoomedImg = document.createElement("img")
      zoomedImg.src = this.src
      zoomedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            `

      overlay.appendChild(zoomedImg)
      document.body.appendChild(overlay)

      // Close on click
      overlay.addEventListener("click", () => {
        document.body.removeChild(overlay)
      })

      // Close on escape key
      const handleEscape = (e) => {
        if (e.key === "Escape") {
          document.body.removeChild(overlay)
          document.removeEventListener("keydown", handleEscape)
        }
      }
      document.addEventListener("keydown", handleEscape)
    })
  })
}

// Export new functions for global use
window.showModal = showModal
window.hideModal = hideModal
window.updateVerificationStatus = updateVerificationStatus
