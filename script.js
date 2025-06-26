// Modern LIC Website JavaScript - Jigisha Kiran Shah
// Professional interactive features for LIC agent website

document.addEventListener('DOMContentLoaded', function () {

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('hidden');
            navToggle.classList.toggle('active');

            // Animate hamburger lines
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navMenu.classList.contains('hidden') === false) {
                        navMenu.classList.add('hidden');
                        navToggle.classList.remove('active');
                        const spans = navToggle.querySelectorAll('span');
                        spans.forEach(span => {
                            span.style.transform = 'none';
                            span.style.opacity = '1';
                        });
                    }
                }
            }
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                faqAnswer.style.maxHeight = '0';
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Validate required fields
            const requiredFields = ['name', 'phone', 'interest', 'consent'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field] === '') {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                } else {
                    input.style.borderColor = '#10b981';
                    input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }
            });

            if (!isValid) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Phone number validation
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(data.phone)) {
                showNotification('Please enter a valid Indian mobile number.', 'error');
                return;
            }

            // Email validation (if provided)
            if (data.email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
            }
            // Submit button loading state
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting to WhatsApp...';
            submitBtn.disabled = true;            // Format WhatsApp message with user details
            setTimeout(() => {
                const whatsappMessage = formatWhatsAppMessage(data);
                const whatsappNumber = '+919824025432'; // Your WhatsApp number
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

                // Show success message and redirect
                showNotification('Redirecting you to WhatsApp with your details...', 'success');

                // Reset form and button
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Clear field styling
                const inputs = this.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                });

                // Redirect to WhatsApp after a short delay
                setTimeout(() => {
                    window.open(whatsappURL, '_blank');
                }, 1000);
            }, 2000);
        });
    }

    // Floating scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
                scrollToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Hero stats animation
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(statNumber => {
                        animateNumber(statNumber);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statsObserver.observe(statsSection);
    }

    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.service-card, .plan-card, .testimonial-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // WhatsApp floating button click tracking
    const whatsappBtn = document.querySelector('.fab-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function () {
            // You can add analytics tracking here
            console.log('WhatsApp button clicked');
        });
    }

    // Call button click tracking
    const callBtns = document.querySelectorAll('a[href^="tel:"]');
    callBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // You can add analytics tracking here
            console.log('Call button clicked');
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .plan-card, .testimonial-card, .about-image, .about-info');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Utility Functions

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Animate numbers (for statistics)
function animateNumber(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    const prefix = text.replace(/[0-9]/g, '');

    if (isNaN(number)) return;

    let current = 0;
    const increment = number / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }

        if (number >= 1000) {
            element.textContent = prefix.replace(/[0-9]/g, '') + Math.floor(current).toLocaleString('en-IN');
        } else {
            element.textContent = prefix.replace(/[0-9]/g, '') + Math.floor(current);
        }
    }, 20);
}

// Format phone number for display
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate Indian mobile number
function isValidIndianMobile(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// Get user's preferred contact time
function getContactTimePreference() {
    const hour = new Date().getHours();
    if (hour >= 9 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'any time';
}

// Feature detection
function supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// Lazy loading for images (if needed in future)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Format user data for WhatsApp message
function formatWhatsAppMessage(data) {
    const currentDate = new Date().toLocaleDateString('en-IN');
    const currentTime = new Date().toLocaleTimeString('en-IN');

    let message = `🔹 *NEW INSURANCE INQUIRY* 🔹\n\n`;
    message += `📅 Date: ${currentDate}\n`;
    message += `⏰ Time: ${currentTime}\n\n`;

    message += `👤 *Personal Details:*\n`;
    message += `Name: ${data.name}\n`;
    message += `Phone: ${data.phone}\n`;

    if (data.email) {
        message += `Email: ${data.email}\n`;
    }

    if (data.age) {
        message += `Age: ${data.age} years\n`;
    }

    message += `\n💼 *Insurance Requirements:*\n`;

    // Format interest field
    const interestMap = {
        'life-insurance': 'Life Insurance',
        'pension-plans': 'Pension Plans',
        'child-plans': 'Child Plans',
        'health-insurance': 'Health Insurance',
        'investment-plans': 'Investment Plans',
        'consultation': 'General Consultation'
    };
    message += `Service: ${interestMap[data.interest] || data.interest}\n`; if (data.income) {
        const incomeMap = {
            'below-3': 'Below ₹3 Lakhs',
            '3-5': '₹3-5 Lakhs',
            '5-10': '₹5-10 Lakhs',
            '10-20': '₹10-20 Lakhs',
            'above-20': 'Above ₹20 Lakhs'
        };
        message += `Annual Income: ${incomeMap[data.income]}\n`;
    }

    message += `\n🔗 Source: Jigisha Shah LIC Website\n`;
    message += `📝 Please provide me with a personalized insurance quotation based on the above details.\n\n`;
    message += `Thank you! 🙏`;

    return message;
}

// Console branding (optional fun addition)
console.log(`
%c🛡️ LIC Agent Website - Jigisha Kiran Shah %c
%cSecuring your family's financial future with expert guidance
%cBuilt with modern web technologies for optimal performance

`,
    'color: #1e40af; font-size: 16px; font-weight: bold;',
    '',
    'color: #f59e0b; font-size: 12px;',
    'color: #6b7280; font-size: 10px;'
);
