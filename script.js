document.addEventListener('DOMContentLoaded', () => {
    // Loading screen functionality
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Hide loading screen after 2 seconds
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2000);
        }
    });

    // Hero Slider Functionality
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const totalSlides = dots.length;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // Start automatic sliding
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }, 3000);

    // Dot click functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    // Initialize AOS
    AOS.init({
        offset: 120,
        delay: 0,
        duration: 1000,
        easing: 'ease',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom',
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});


// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all modern cards
document.querySelectorAll('.modern-card').forEach(card => {
    observer.observe(card);
});

// Button ripple effect
document.querySelectorAll('.modern-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const cardTitle = this.closest('.modern-card').querySelector('h3').textContent;

        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        console.log(`Selected service: ${cardTitle}`);
    });
});


const buttons = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.portfolio-card');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {

    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      if (filter === 'all' || card.classList.contains(filter)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });

  });
});



// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Find all buttons/links that should scroll to portfolio
    const exploreButtons = document.querySelectorAll('a.modern-button');
    
    exploreButtons.forEach(button => {
        // Check if button text contains "Design" or "Explore" to target the right button
        if (button.textContent.includes('Design') || button.textContent.includes('Explore')) {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default link behavior
                
                // Find the portfolio section
                const portfolioSection = document.getElementById('portfolio');
                
                if (portfolioSection) {
                    // Smooth scroll to portfolio section
                    portfolioSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Optional: Highlight the portfolio section briefly
                    portfolioSection.style.backgroundColor = 'rgba(41, 90, 237, 0.1)';
                    setTimeout(() => {
                        portfolioSection.style.backgroundColor = '';
                    }, 1000);
                }
            });
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const exploreDesignBtn = document.getElementById('explore-design-btn');
    
    if (exploreDesignBtn) {
        exploreDesignBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const portfolioSection = document.getElementById('portfolio');
            
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});




document.addEventListener('DOMContentLoaded', function() {
    // Create notification styles
    const style = document.createElement('style');
    style.textContent = `
        .filter-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #295aed, #7808d0);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1000;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
            font-size: 14px;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Function to show notification
    function showFilterNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.filter-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'filter-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Get display name for filter
    function getFilterDisplayName(filter) {
        const filterNames = {
            'all': 'All Projects',
            'web': 'Web Projects',
            'ui': 'UI Projects',
            'app': 'Design Hub Projects'
        };
        return filterNames[filter] || `${filter} Projects`;
    }
    
    // Function to apply filter and show notification
    function applyFilterAndNotify(filter) {
        // 1. Update filter buttons
        document.querySelectorAll('.filters button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });
        
        // 2. Apply filter to portfolio cards
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // 3. Show notification message
        const message = `Showing ${getFilterDisplayName(filter)}`;
        showFilterNotification(message);
        
        // 4. Optional: Highlight matching cards briefly
        if (filter !== 'all') {
            const matchingCards = document.querySelectorAll(`.portfolio-card.${filter}`);
            matchingCards.forEach(card => {
                card.style.boxShadow = '0 0 25px rgba(120, 8, 208, 0.5)';
                setTimeout(() => {
                    card.style.boxShadow = '';
                }, 2000);
            });
        }
    }
    
    // Map service titles to filters
    const serviceToFilter = {
        // Visual Design Section → Design Hub
        'Graphic Design': 'app',
        'Vector Design': 'app',
        'Thumbnail Design': 'app',
        
        // Web & Development Section → Web
        'E-Commerce Solutions': 'web',
        'Shopify Development': 'web',
        'Portfolio Websites': 'web',
        
        // Growth & Marketing Section → UI (or keep as filtering)
        'Social Media Marketing': 'ui',
        'Paid Social Ads': 'ui',
        'Video Editing': 'ui'
    };
    
    // Handle all service buttons
    document.querySelectorAll('.modern-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent.trim();
            const card = this.closest('.modern-card');
            const serviceTitle = card?.querySelector('h3')?.textContent?.trim() || '';
            
            console.log('Clicked:', buttonText, 'Service:', serviceTitle);
            
            // SPECIAL CASES: Open in new tab (no filtering)
            if (buttonText.includes('Grow Your Following') || 
                buttonText.includes('Maximize Your ROI') || 
                buttonText.includes('Edit Your Content')) {
                
                let url = '';
                if (buttonText.includes('Grow Your Following') || buttonText.includes('Maximize Your ROI')) {
                    url = 'https://www.facebook.com/profile.php?id=100083770145211';
                } else if (buttonText.includes('Edit Your Content')) {
                    url = 'https://www.facebook.com/share/v/1ATiW7igXz/';
                }
                
                window.open(url, '_blank', 'noopener,noreferrer');
                return;
            }
            
            // ALL OTHER BUTTONS: Scroll + Filter + Notification
            let targetFilter = 'all';
            
            // Check if we have a mapping for this service
            for (const [service, filter] of Object.entries(serviceToFilter)) {
                if (serviceTitle.includes(service)) {
                    targetFilter = filter;
                    break;
                }
            }
            
            console.log('Target filter for', serviceTitle, 'is', targetFilter);
            
            // Scroll to portfolio
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Apply filter after scroll
                setTimeout(() => {
                    applyFilterAndNotify(targetFilter);
                }, 700);
            }
        });
    });
    
    // Make existing filter buttons work with notifications
    document.querySelectorAll('.filters button').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            applyFilterAndNotify(filter);
        });
    });
    
    // Initialize portfolio (show all by default)
    applyFilterAndNotify('all');
});



// Full Page Proposal Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const proposalForm = document.getElementById('fullpage-proposal');
    const closeBtn = document.getElementById('close-proposal');
    
    // Function to open proposal form
    function openProposalForm() {
        document.body.style.overflow = 'hidden';
        proposalForm.classList.remove('hidden');
        proposalForm.style.opacity = '0';
        proposalForm.style.transform = 'translateY(20px)';
        
        // Animate in
        setTimeout(() => {
            proposalForm.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            proposalForm.style.opacity = '1';
            proposalForm.style.transform = 'translateY(0)';
        }, 10);
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = proposalForm.querySelector('input, select, textarea');
            if (firstInput) firstInput.focus();
        }, 500);
    }
    
    // Function to close proposal form
    function closeProposalForm() {
        proposalForm.style.opacity = '0';
        proposalForm.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            proposalForm.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 400);
    }
    
    // 1. "Get a Proposal" buttons - Open full page form
    document.querySelectorAll('.animated-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openProposalForm();
        });
    });
    
    // 2. "Contact" navigation links - Open full page form
    document.getElementById('contact-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        openProposalForm();
    });
    
    document.getElementById('mobile-contact-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        openProposalForm();
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // 3. Close button
    closeBtn?.addEventListener('click', closeProposalForm);
    
    // 4. Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !proposalForm.classList.contains('hidden')) {
            closeProposalForm();
        }
    });
    
    // 5. Close on click outside form content
    proposalForm?.addEventListener('click', function(e) {
        if (e.target === proposalForm) {
            closeProposalForm();
        }
    });
    
    // 6. Form submission
    const form = document.getElementById('proposal-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                projectName: this.querySelector('input[placeholder*="Project Name"]').value,
                projectType: this.querySelector('select').value,
                description: this.querySelector('textarea').value,
                name: this.querySelector('input[placeholder*="John Smith"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                timestamp: new Date().toISOString()
            };
            
            // Show success message
            showProposalSuccess(formData.name);
            
            // Close form after success
            setTimeout(() => {
                closeProposalForm();
                form.reset();
            }, 3000);
            
            // Here you would normally send data to your server
            // Example: sendToEmail(formData);
        });
    }
    
    // Success notification
    function showProposalSuccess(name) {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 20px;
                border-radius: 16px;
                z-index: 99999;
                font-weight: 500;
                box-shadow: 0 10px 40px rgba(16,185,129,.4);
                animation: slideIn 0.5s ease;
                max-width: 400px;
                border-left: 5px solid #5f6cff;
            ">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="
                        width: 50px;
                        height: 50px;
                        background: rgba(255,255,255,.2);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                        flex-shrink: 0;
                    ">
                        🎉
                    </div>
                    <div>
                        <h4 style="font-size: 18px; font-weight: 700; margin-bottom: 5px;">
                            Proposal Request Sent!
                        </h4>
                        <p style="font-size: 14px; opacity: 0.9; line-height: 1.5;">
                            Thanks ${name || 'there'}! We'll review your project and 
                            send a detailed proposal within 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        #fullpage-proposal {
            transition: opacity 0.4s ease, transform 0.4s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        /* Form input focus effects */
        #proposal-form input:focus,
        #proposal-form select:focus,
        #proposal-form textarea:focus {
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        /* Custom scrollbar for form */
        #fullpage-proposal::-webkit-scrollbar {
            width: 8px;
        }
        
        #fullpage-proposal::-webkit-scrollbar-track {
            background: rgba(30, 41, 59, 0.5);
        }
        
        #fullpage-proposal::-webkit-scrollbar-thumb {
            background: rgba(99, 102, 241, 0.5);
            border-radius: 4px;
        }
        
        #fullpage-proposal::-webkit-scrollbar-thumb:hover {
            background: rgba(99, 102, 241, 0.8);
        }
    `;
    document.head.appendChild(style);
});


// Social Media Growth Services Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle social media service button clicks
    document.querySelectorAll('[data-service]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const service = this.getAttribute('data-service');
            const buttonText = this.textContent.trim();
            
            // Define service details
            const serviceDetails = {
                'instagram': {
                    title: 'Instagram Growth Service',
                    description: 'Boost followers, likes, comments, and story views',
                    priceRange: '$50 - $500/month',
                    deliveryTime: '24-48 hours',
                    features: ['Real followers', 'Engaged comments', 'Story views', 'Reels promotion']
                },
                'tiktok': {
                    title: 'TikTok Growth Service',
                    description: 'Increase followers, views, likes, and shares',
                    priceRange: '$40 - $400/month',
                    deliveryTime: '24 hours',
                    features: ['FYP optimization', 'Video views', 'Likes & shares', 'Comments boost']
                },
                'facebook': {
                    title: 'Facebook Growth Service',
                    description: 'Grow page likes, post engagement, and group members',
                    priceRange: '$60 - $600/month',
                    deliveryTime: '48 hours',
                    features: ['Page likes', 'Post reactions', 'Comments', 'Group members']
                },
                'bundle': {
                    title: 'Triple Platform Bundle',
                    description: 'Complete growth package for all platforms',
                    priceRange: '$207/month (Save $90)',
                    deliveryTime: '24 hours',
                    features: ['All platforms', 'Priority support', 'Analytics', 'Content strategy']
                }
            };
            
            // Open proposal form with pre-filled service
            openProposalFormWithService(serviceDetails[service], buttonText);
        });
    });
    
    // Function to open proposal form with service pre-selected
    function openProposalFormWithService(serviceDetails, buttonText) {
        // First open the proposal form
        openProposalForm();
        
        // Wait for form to load, then pre-fill
        setTimeout(() => {
            const form = document.getElementById('proposal-form');
            if (form && serviceDetails) {
                // Set project name based on service
                const projectNameInput = form.querySelector('input[placeholder*="Project Name"]');
                if (projectNameInput) {
                    projectNameInput.value = serviceDetails.title;
                }
                
                // Set project type
                const projectTypeSelect = form.querySelector('select');
                if (projectTypeSelect) {
                    projectTypeSelect.value = 'Digital Marketing';
                }
                
                // Check relevant checkboxes
                if (serviceDetails.title.includes('Instagram')) {
                    const instagramCheckbox = form.querySelector('input[type="checkbox"] + span:contains("Social Media")')?.previousElementSibling;
                    if (instagramCheckbox) instagramCheckbox.checked = true;
                }
                
                if (serviceDetails.title.includes('TikTok')) {
                    const tiktokCheckbox = form.querySelector('input[type="checkbox"] + span:contains("Content")')?.previousElementSibling;
                    if (tiktokCheckbox) tiktokCheckbox.checked = true;
                }
                
                // Set description
                const descriptionTextarea = form.querySelector('textarea');
                if (descriptionTextarea) {
                    descriptionTextarea.value = `I'm interested in: ${serviceDetails.title}\n\n${serviceDetails.description}\n\nServices needed:\n${serviceDetails.features.map(f => `✓ ${f}`).join('\n')}\n\nBudget: ${serviceDetails.priceRange}\nDelivery: ${serviceDetails.deliveryTime}`;
                }
                
                // Set budget
                const budgetSelect = form.querySelector('select[placeholder*="budget"]') || 
                                   form.querySelector('select:nth-of-type(3)');
                if (budgetSelect) {
                    if (serviceDetails.priceRange.includes('$50')) budgetSelect.value = '$500 - $1,000';
                    else if (serviceDetails.priceRange.includes('$207')) budgetSelect.value = '$1,000 - $2,500';
                }
                
                // Show service-specific message
                showServiceMessage(serviceDetails.title);
            }
        }, 800);
    }
    
    // Show service-specific message
    function showServiceMessage(serviceTitle) {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #5f6cff, #7808d0);
                color: white;
                padding: 16px 20px;
                border-radius: 14px;
                z-index: 99999;
                font-weight: 500;
                box-shadow: 0 10px 30px rgba(95,108,255,.3);
                animation: slideIn 0.4s ease;
                max-width: 350px;
                border-left: 4px solid #ff6b6b;
            ">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: rgba(255,255,255,.2);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 20px;
                    ">
                        📱
                    </div>
                    <div>
                        <strong>${serviceTitle} Selected</strong>
                        <div style="font-size: 13px; opacity: 0.9; margin-top: 4px;">
                            Form pre-filled with service details
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.4s ease';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 400);
        }, 4000);
    }
    
    // Add social media options to proposal form services
    const proposalForm = document.getElementById('proposal-form');
    if (proposalForm) {
        // Update the services checklist to include social media
        const servicesGrid = proposalForm.querySelector('.grid.grid-cols-2.md\\:grid-cols-4');
        if (servicesGrid) {
            const socialMediaOption = document.createElement('label');
            socialMediaOption.className = 'flex items-center gap-2 p-3 bg-slate-900 border border-slate-700 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors';
            socialMediaOption.innerHTML = `
                <input type="checkbox" class="rounded text-indigo-500">
                <span class="text-slate-300">Social Media Growth</span>
            `;
            servicesGrid.appendChild(socialMediaOption);
        }
    }
});




document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');
    const body = document.body;

    if (menuToggle && menuNav) {
        // Toggle menu when hamburger is clicked
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Toggle body scroll
            if (menuNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // AUTO-CLOSE FUNCTION - This is the key fix
        function closeMobileMenu() {
            menuNav.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        }

        // Close menu when clicking on ANY nav link
        const navLinks = menuNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Prevent default only for smooth scroll or hash links
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    // Close menu first
                    closeMobileMenu();
                    
                    // Then scroll to target
                    setTimeout(() => {
                        if (targetElement) {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }, 300); // Wait for menu animation to complete
                } else {
                    // For external links or non-hash links
                    closeMobileMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !menuNav.contains(event.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu on window resize (if resized to larger screen)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
});document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');
    const body = document.body;

    if (menuToggle && menuNav) {
        // Function to close menu
        function closeMenu() {
            menuNav.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = 'visible';
        }

        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuNav.classList.toggle('active');
            this.classList.toggle('active');
            body.style.overflow = menuNav.classList.contains('active') ? 'hidden' : 'visible';
        });

        // Close menu when ANY link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuNav.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeMenu();
        });
    }
});


// Mobile Menu with Auto-Close - Works with your existing HTML
document.addEventListener('DOMContentLoaded', function() {
    // Find the menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');
    
    // If using different class names, find them
    if (!menuToggle) {
        // Try to find mobile menu button by ID
        menuToggle = document.getElementById('mobile-menu-btn');
    }
    
    if (!menuNav) {
        // Try to find mobile menu by ID
        menuNav = document.getElementById('mobile-menu');
    }
    
    // If still not found, look for common patterns
    if (!menuToggle) {
        menuToggle = document.querySelector('[class*="menu-toggle"], [class*="mobile-btn"], [class*="hamburger"]');
    }
    
    if (!menuNav) {
        menuNav = document.querySelector('[class*="menu-nav"], [class*="mobile-menu"], [class*="nav-menu"]');
    }
    
    // Proceed only if elements are found
    if (menuToggle && menuNav) {
        console.log('Mobile menu elements found:', menuToggle, menuNav);
        
        // Function to open menu
        function openMenu() {
            menuNav.classList.add('active');
            document.body.classList.add('menu-open');
        }
        
        // Function to close menu
        function closeMenu() {
            menuNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        
        // Toggle menu on button click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            if (menuNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // AUTO-CLOSE: Close menu when any link inside menu is clicked
        const navLinks = menuNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Close menu immediately
                closeMenu();
                
                // Handle hash links for smooth scrolling
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    // Wait for menu to close, then scroll
                    setTimeout(() => {
                        const targetId = href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }, 300);
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (menuNav.classList.contains('active') && 
                !menuNav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuNav.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && menuNav.classList.contains('active')) {
                closeMenu();
            }
        });
    } else {
        console.log('Mobile menu elements not found. Looking for common patterns...');
        
        // Alternative approach: look for any navigation that might be mobile menu
        const allNavs = document.querySelectorAll('nav, .nav, .navbar, .navigation');
        allNavs.forEach(nav => {
            if (nav.offsetWidth > 0) {
                console.log('Found navigation:', nav);
                // You might need to manually add 'menu-nav' class to your mobile menu
            }
        });
    }
});

// Keep all your existing JavaScript functions below this line
// Your existing code for slider, filters, etc. remains unchanged

// Update just the mobile menu section in your JavaScript
// ===== 4. MOBILE MENU WITH AUTO-CLOSE =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    console.log('Mobile menu initialized');
    
    // Function to open menu
    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        document.body.classList.add('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        
        // Add overlay to prevent scrolling
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 998;
        `;
        document.body.appendChild(overlay);
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Function to close menu
    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        
        // Remove overlay
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
    
    // Toggle menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (mobileMenu.classList.contains('hidden')) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });
    
    // AUTO-CLOSE: Close menu when any link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close menu immediately
            closeMobileMenu();
            
            // Handle hash links
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                setTimeout(() => {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 300);
            }
        });
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
    
    // Close on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
}

// Rest of your existing JavaScript code continues below...
// CLEAN JAVASCRIPT FOR YOUR WEBSITE
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded - initializing functionality');
    
    // ===== 1. LOADING SCREEN =====
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2000);
        }
    });

    // ===== 2. HERO SLIDER =====
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    if (slides && dots.length > 0) {
        let currentIndex = 0;
        const totalSlides = dots.length;

        function showSlide(index) {
            slides.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        }

        // Auto slider
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }, 3000);

        // Dot click functionality
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
            });
        });
    }

    // ===== 3. INITIALIZE AOS =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            offset: 120,
            delay: 0,
            duration: 1000,
            easing: 'ease',
            once: false,
            mirror: true,
            anchorPlacement: 'top-bottom',
        });
    }

    // ===== 4. SIMPLE MOBILE MENU FIX =====
    // Try different selectors to find the mobile menu button
    let mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (!mobileMenuBtn) {
        // Try alternative selectors
        mobileMenuBtn = document.querySelector('button[aria-label*="menu"], button[class*="hamburger"], .lg\\:hidden button');
    }
    
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        console.log('Found mobile menu elements');
        
        // Simple toggle function
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            // Toggle body scroll
            if (mobileMenu.classList.contains('hidden')) {
                document.body.style.overflow = 'auto';
                mobileMenuBtn.classList.remove('active');
            } else {
                document.body.style.overflow = 'hidden';
                mobileMenuBtn.classList.add('active');
            }
        });
        
        // Close menu when clicking links
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
                mobileMenuBtn.classList.remove('active');
            });
        });
        
        // Close on window resize (desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
                mobileMenuBtn.classList.remove('active');
            }
        });
    } else {
        console.log('Mobile menu elements not found');
        // Debug: Log all buttons to find the correct one
        const allButtons = document.querySelectorAll('button');
        console.log('All buttons on page:', allButtons);
    }

    // ===== 5. PORTFOLIO FILTERING =====
    const filterButtons = document.querySelectorAll('.filters button');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    if (filterButtons.length > 0 && portfolioCards.length > 0) {
        function applyFilter(filter) {
            // Update buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === filter) {
                    btn.classList.add('active');
                }
            });
            
            // Filter cards
            portfolioCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                applyFilter(filter);
            });
        });
        
        // Initialize with all projects
        applyFilter('all');
    }

    // ===== 6. EXPLORE DESIGN BUTTON =====
    const exploreDesignBtn = document.getElementById('explore-design-btn');
    if (exploreDesignBtn) {
        exploreDesignBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ===== 7. PROPOSAL FORM =====
    const proposalForm = document.getElementById('fullpage-proposal');
    const closeBtn = document.getElementById('close-proposal');
    
    function openProposalForm() {
        if (proposalForm) {
            document.body.style.overflow = 'hidden';
            proposalForm.classList.remove('hidden');
        }
    }
    
    function closeProposalForm() {
        if (proposalForm) {
            proposalForm.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Get Proposal buttons
    document.querySelectorAll('.animated-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openProposalForm();
        });
    });
    
    // Contact links
    document.getElementById('contact-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        openProposalForm();
    });
    
    // Close button
    closeBtn?.addEventListener('click', closeProposalForm);
    
    // Close on ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && proposalForm && !proposalForm.classList.contains('hidden')) {
            closeProposalForm();
        }
    });
    
    // Form submission
    const form = document.getElementById('proposal-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Proposal submitted successfully!');
            closeProposalForm();
            form.reset();
        });
    }
    
    // ===== 8. FLOATING BUTTON =====
    document.getElementById('floating-proposal-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        openProposalForm();
    });
    
    console.log('All functionality initialized');
});

// Floating button
document.getElementById('floating-proposal-btn')?.addEventListener('click', openProposalForm);







