// Custom JavaScript for Jointventure.ng Profile

document.addEventListener("DOMContentLoaded", () => {
  // Handle tab switching functionality for Edit Profile and Security
  const editProfileTab = document.getElementById("editProfileTab")
  const securityTab = document.getElementById("securityTab")
  const editProfileContent = document.getElementById("editProfileContent")
  const securityContent = document.getElementById("securityContent")

  // Handle Edit Profile tab click
  editProfileTab.addEventListener("click", function () {
    // Update tab styles
    this.className = "btn btn-dark d-flex align-items-center gap-2"
    securityTab.className = "btn btn-outline-secondary d-flex align-items-center gap-2"

    // Show/hide content
    editProfileContent.style.display = "block"
    securityContent.style.display = "none"
  })

  // Handle Security tab click
  securityTab.addEventListener("click", function () {
    // Update tab styles
    this.className = "btn btn-dark d-flex align-items-center gap-2"
    editProfileTab.className = "btn btn-outline-secondary d-flex align-items-center gap-2"

    // Show/hide content
    editProfileContent.style.display = "none"
    securityContent.style.display = "block"
  })

  // Handle form interactions
  const editIcons = document.querySelectorAll(".bi-pencil")
  const inputs = document.querySelectorAll(".form-control")

  // Add focus effects to inputs with edit icons
  inputs.forEach((input) => {
    const parentDiv = input.parentElement
    if (parentDiv.classList.contains("position-relative")) {
      input.addEventListener("focus", () => {
        const editIcon = parentDiv.querySelector(".bi-pencil")
        if (editIcon) {
          editIcon.style.color = "#eb1313"
        }
      })

      input.addEventListener("blur", () => {
        const editIcon = parentDiv.querySelector(".bi-pencil")
        if (editIcon) {
          editIcon.style.color = "#807d7d"
        }
      })
    }
  })

  // Handle save button click
  const saveButton = document.querySelector(".btn-danger.w-100")
  if (saveButton) {
    saveButton.addEventListener("click", function (e) {
      e.preventDefault()

      // Simple form validation
      const requiredFields = document.querySelectorAll('input[value=""], input:not([value])')
      let hasEmptyRequired = false

      // Check for required fields (marked with *)
      const labels = document.querySelectorAll("label")
      labels.forEach((label) => {
        if (label.textContent.includes("*")) {
          const input = label.parentElement.querySelector("input")
          if (input && !input.value.trim()) {
            hasEmptyRequired = true
            input.classList.add("is-invalid")
          } else if (input) {
            input.classList.remove("is-invalid")
          }
        }
      })

      if (hasEmptyRequired) {
        alert("Please fill in all required fields marked with *")
        return
      }

      // Simulate save action
      this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...'
      this.disabled = true

      setTimeout(() => {
        this.innerHTML = "Save Changes"
        this.disabled = false
        alert("Profile updated successfully!")
      }, 2000)
    })
  }

  // Handle sidebar navigation
  const sidebarLinks = document.querySelectorAll(".sidebar-link")
  const myProfileSection = document.querySelector(".my-profile-section") // Added reference to My Profile section

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links
      sidebarLinks.forEach((l) => l.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      if (myProfileSection) {
        myProfileSection.classList.add("inactive")
      }

      // Simple navigation simulation
      const linkText = this.textContent.trim()
      console.log(`[v0] Navigating to: ${linkText}`)
    })
  })

  const profileSection = document.querySelector(".bg-white.rounded.p-3.mb-4")
  if (profileSection) {
    profileSection.classList.add("active-profile")

    profileSection.addEventListener("click", (e) => {
      e.preventDefault()

      // Remove active class from all sidebar links
      sidebarLinks.forEach((l) => l.classList.remove("active"))

      // Remove inactive class from My Profile section
      if (myProfileSection) {
        myProfileSection.classList.remove("inactive")
      }

      console.log("[v0] My Profile section activated")
    })
  }

  // Handle dropdown toggle for mobile
  const dropdownToggle = document.querySelector(".dropdown-toggle")
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", () => {
      console.log("[v0] Account dropdown toggled")
    })
  }

  // Handle mobile dropdown toggle
  const toggler = document.querySelector(".custom-toggler-image")
  if (toggler) {
    toggler.addEventListener("click", toggleDropdown)
  }

  // Handle horizontal navigation scroll
  const horizontalNav = document.getElementById("horizontalNav")
  if (horizontalNav) {
    horizontalNav.addEventListener("click", scrollHorizontalNav)
  }

  // Image gallery functionality
  // Sample images for the gallery (you can replace with actual image URLs)
  const galleryImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/edit%20listing-7ndfWGbmBm2BBoNAGqH1AIUM1fLAxl.png",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-440113cc3d00?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1605146769289-45c003edd2be?w=800&h=600&fit=crop",
  ]

  let currentImageIndex = 0

  // Get gallery elements
  const mainImage = document.querySelector(".position-relative img")
  const leftArrow = document.querySelector(".btn-dark .bi-chevron-left").parentElement
  const rightArrow = document.querySelector(".btn-dark .bi-chevron-right").parentElement
  const thumbnails = document.querySelectorAll(".d-flex.gap-2.p-3 img")

  // Function to update main image and thumbnails
  function updateGallery(index) {
    if (mainImage) {
      mainImage.src = galleryImages[index]
      mainImage.alt = `Property Image ${index + 1}`
    }

    // Update thumbnails to show current images
    thumbnails.forEach((thumb, i) => {
      if (galleryImages[i]) {
        thumb.src = galleryImages[i]
        thumb.style.opacity = i === index ? "1" : "0.7"
        thumb.style.border = i === index ? "2px solid #eb1313" : "none"
      }
    })
  }

  // Left arrow click handler
  if (leftArrow) {
    leftArrow.addEventListener("click", (e) => {
      e.preventDefault()
      currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1
      updateGallery(currentImageIndex)
      console.log("[v0] Gallery: Previous image", currentImageIndex)
    })
  }

  // Right arrow click handler
  if (rightArrow) {
    rightArrow.addEventListener("click", (e) => {
      e.preventDefault()
      currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0
      updateGallery(currentImageIndex)
      console.log("[v0] Gallery: Next image", currentImageIndex)
    })
  }

  // Thumbnail click handlers
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", (e) => {
      e.preventDefault()
      if (galleryImages[index]) {
        currentImageIndex = index
        updateGallery(currentImageIndex)
        console.log("[v0] Gallery: Thumbnail clicked", currentImageIndex)
      }
    })

    // Add hover effect
    thumb.style.cursor = "pointer"
    thumb.addEventListener("mouseenter", () => {
      if (index !== currentImageIndex) {
        thumb.style.opacity = "0.9"
      }
    })

    thumb.addEventListener("mouseleave", () => {
      if (index !== currentImageIndex) {
        thumb.style.opacity = "0.7"
      }
    })
  })

  // Initialize gallery
  updateGallery(currentImageIndex)

  // Handle image upload functionality
  const imageFileInput = document.getElementById("imageFileInput")
  const imageUploadArea = document.getElementById("imageUploadArea")

  console.log("[v0] Image upload elements found:", {
    fileInput: !!imageFileInput,
    uploadArea: !!imageUploadArea,
  })

  // Handle click on upload area
  if (imageUploadArea) {
    imageUploadArea.addEventListener("click", (e) => {
      console.log("[v0] Upload area clicked")
      e.preventDefault()
      e.stopPropagation()
      if (imageFileInput) {
        console.log("[v0] Triggering file input click")
        imageFileInput.click()
      } else {
        console.log("[v0] File input not found!")
      }
    })

    // Handle click specifically for the browse files text
    const browseText = imageUploadArea.querySelector(".text-danger")
    if (browseText) {
      browseText.addEventListener("click", (e) => {
        console.log("[v0] Browse files text clicked")
        e.preventDefault()
        e.stopPropagation()
        if (imageFileInput) {
          imageFileInput.click()
        }
      })
    }
  }

  // Handle file input change
  if (imageFileInput) {
    imageFileInput.addEventListener("change", (event) => {
      console.log("[v0] File input changed, files:", event.target.files.length)
      const files = event.target.files
      if (files.length > 0) {
        handleImageUpload(files)
      }
    })
  }

  // Handle drag and drop for image upload
  if (imageUploadArea) {
    imageUploadArea.addEventListener("dragover", (e) => {
      e.preventDefault()
      e.stopPropagation()
      imageUploadArea.style.backgroundColor = "#f8f9fa"
      imageUploadArea.style.borderColor = "#eb1313"
      imageUploadArea.style.border = "2px dashed #eb1313"
      imageUploadArea.style.transform = "scale(1.02)"
      console.log("[v0] Drag over detected")
    })

    imageUploadArea.addEventListener("dragenter", (e) => {
      e.preventDefault()
      e.stopPropagation()
    })

    imageUploadArea.addEventListener("dragleave", (e) => {
      e.preventDefault()
      e.stopPropagation()
      // Only reset if we're leaving the upload area completely
      if (!imageUploadArea.contains(e.relatedTarget)) {
        imageUploadArea.style.backgroundColor = ""
        imageUploadArea.style.borderColor = ""
        imageUploadArea.style.border = ""
        imageUploadArea.style.transform = ""
        console.log("[v0] Drag leave detected")
      }
    })

    imageUploadArea.addEventListener("drop", (e) => {
      e.preventDefault()
      e.stopPropagation()
      imageUploadArea.style.backgroundColor = ""
      imageUploadArea.style.borderColor = ""
      imageUploadArea.style.border = ""
      imageUploadArea.style.transform = ""

      const files = e.dataTransfer.files
      console.log("[v0] Files dropped:", files.length)
      if (files.length > 0) {
        // File validation before processing
        const validFiles = Array.from(files).filter((file) => {
          const validTypes = ["image/jpeg", "image/jpg", "image/png"]
          return validTypes.includes(file.type)
        })

        if (validFiles.length > 0) {
          handleImageUpload(validFiles)
        } else {
          alert("Please drop only JPG or PNG image files.")
        }
      }
    })
  }

  // Function to handle image upload
  function handleImageUpload(files) {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!validTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}. Please upload JPG or PNG files only.`)
        return
      }

      // Validate file size
      if (file.size > maxSize) {
        alert(`File too large: ${file.name}. Please upload files smaller than 5MB.`)
        return
      }

      // Read and preview the image
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result

        // Add to gallery images array
        galleryImages.push(imageUrl)

        // Update gallery to show new image
        currentImageIndex = galleryImages.length - 1
        updateGallery(currentImageIndex)

        // Add new thumbnail to the gallery
        addThumbnailToGallery(imageUrl, galleryImages.length - 1)

        // Show success message
        showUploadSuccess(file.name)

        console.log("[v0] Image uploaded successfully:", file.name)
      }
      reader.readAsDataURL(file)
    })
  }

  // Function to add thumbnail to gallery
  function addThumbnailToGallery(imageUrl, index) {
    const thumbnailContainer = document.querySelector(".d-flex.gap-2.p-3")
    if (thumbnailContainer) {
      const thumbnailDiv = document.createElement("div")
      thumbnailDiv.className = "position-relative"

      thumbnailDiv.innerHTML = `
        <img src="${imageUrl}" alt="Thumbnail" class="rounded" style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;">
        <button class="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle" style="width: 20px; height: 20px; font-size: 10px;" onclick="removeImage(${index})">
          <i class="bi bi-trash"></i>
        </button>
      `

      thumbnailContainer.appendChild(thumbnailDiv)

      // Add click handler for new thumbnail
      const newThumbnail = thumbnailDiv.querySelector("img")
      newThumbnail.addEventListener("click", (e) => {
        e.preventDefault()
        currentImageIndex = index
        updateGallery(currentImageIndex)
        console.log("[v0] Gallery: New thumbnail clicked", currentImageIndex)
      })

      // Add hover effects
      newThumbnail.addEventListener("mouseenter", () => {
        if (index !== currentImageIndex) {
          newThumbnail.style.opacity = "0.9"
        }
      })

      newThumbnail.addEventListener("mouseleave", () => {
        if (index !== currentImageIndex) {
          newThumbnail.style.opacity = "0.7"
        }
      })
    }
  }

  // Function to show upload success message
  function showUploadSuccess(fileName) {
    const uploadArea = document.getElementById("imageUploadArea")
    const originalContent = uploadArea.innerHTML

    uploadArea.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-check-circle-fill text-success mb-3" style="font-size: 48px;"></i>
        <p class="mb-2 text-success fw-bold">${fileName} uploaded successfully!</p>
        <small class="text-muted">You can upload more images</small>
      </div>
    `

    // Reset to original content after 3 seconds
    setTimeout(() => {
      uploadArea.innerHTML = originalContent
    }, 3000)
  }

  // Make galleryImages accessible globally for image removal
  window.galleryImages = galleryImages
  window.currentImageIndex = currentImageIndex
  window.updateGallery = updateGallery
})

// Function to remove image from gallery
function removeImage(index) {
  if (confirm("Are you sure you want to remove this image?")) {
    // Remove from images array
    window.galleryImages.splice(index, 1)

    // Update current index if necessary
    if (window.currentImageIndex >= window.galleryImages.length) {
      window.currentImageIndex = Math.max(0, window.galleryImages.length - 1)
    }

    // Refresh the gallery
    window.updateGallery(window.currentImageIndex)

    // Remove thumbnail from DOM
    const thumbnails = document.querySelectorAll(".d-flex.gap-2.p-3 .position-relative")
    if (thumbnails[index]) {
      thumbnails[index].remove()
    }

    console.log("[v0] Image removed from gallery:", index)
  }
}

// Handle responsive sidebar toggle (for mobile)
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar")
  if (window.innerWidth <= 768) {
    sidebar.style.display = sidebar.style.display === "none" ? "block" : "none"
  }
}

// Handle window resize
window.addEventListener("resize", () => {
  const sidebar = document.querySelector(".sidebar")
  if (window.innerWidth > 768) {
    sidebar.style.display = "block"
  } else {
    sidebar.style.display = "none"
  }
})

// Handle mobile dropdown toggle
function toggleDropdown() {
  const dropdown = document.getElementById("mobileDropdown")
  dropdown.classList.toggle("show")
}

let scrollDirection = 1
function scrollHorizontalNav() {
  const navItems = document.getElementById("horizontalNavItems")
  const maxScroll = navItems.scrollWidth - navItems.clientWidth

  if (navItems.scrollLeft >= maxScroll && scrollDirection === 1) {
    scrollDirection = -1
  } else if (navItems.scrollLeft <= 0 && scrollDirection === -1) {
    scrollDirection = 1
  }

  navItems.scrollLeft += 150 * scrollDirection
}

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  const dropdown = document.getElementById("mobileDropdown")
  const toggler = document.querySelector(".custom-toggler-image")

  if (dropdown && toggler && !toggler.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove("show")
  }
})
