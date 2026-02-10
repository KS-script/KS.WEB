// ==================== CUSTOM CURSOR ====================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
const mouseGlow = document.getElementById('mouseGlow');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Mouse glow follows immediately
    mouseGlow.style.left = mouseX + 'px';
    mouseGlow.style.top = mouseY + 'px';
});

function animateCursor() {
    // Smooth cursor follow
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, [data-hover-3d], [data-tilt], .nav-link');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
    });
});

// Cursor click effect
document.addEventListener('mousedown', () => {
    cursorFollower.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
    cursorFollower.classList.remove('clicking');
});

// ==================== 3D HOVER EFFECT FOR HEADER & BUTTONS ====================
const hover3DElements = document.querySelectorAll('[data-hover-3d]');

hover3DElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        el.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ==================== TILT EFFECT FOR CARDS ====================
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(el => {
    const maxTilt = parseFloat(el.dataset.tiltMax) || 10;
    
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        
        // 즉시 적용 (transition 없이)
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Move glow effect if exists
        const glow = el.querySelector('.feature-glow');
        if (glow) {
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
            glow.style.transform = 'translate(-50%, -50%)';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        
        const glow = el.querySelector('.feature-glow');
        if (glow) {
            glow.style.left = '50%';
            glow.style.top = '0';
            glow.style.transform = 'translateX(-50%)';
        }
    });
});

// ==================== RIPPLE EFFECT ====================
const rippleElements = document.querySelectorAll('[data-ripple]');

rippleElements.forEach(el => {
    el.addEventListener('click', function(e) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== PARTICLES ====================
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        container.appendChild(particle);
    }
}

createParticles();

// ==================== SCROLL INDICATOR HIDE ====================
const scrollIndicator = document.getElementById('scrollIndicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }
});

// ==================== HEADER SCROLL EFFECT ====================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== MOBILE MENU ====================
const mobileMenu = document.getElementById('mobileMenu');
const mobileNav = document.getElementById('mobileNav');

mobileMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
    const icon = mobileMenu.querySelector('i');
    icon.className = mobileNav.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
});

document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('show');
        mobileMenu.querySelector('i').className = 'fas fa-bars';
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== COPY SCRIPT ====================
function copyScript() {
    const scriptText = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KS-script/KS-RIVALS-HUB.Load/refs/heads/main/KS.Loader"))()';
    
    navigator.clipboard.writeText(scriptText).then(() => {
        showToast();
        
        const btn = document.querySelector('.copy-btn');
        const btnContent = btn.querySelector('.btn-content');
        const originalContent = btnContent.innerHTML;
        btnContent.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        btn.style.background = 'var(--success)';
        btn.style.color = 'white';
        
        setTimeout(() => {
            btnContent.innerHTML = originalContent;
            btn.style.background = 'var(--white)';
            btn.style.color = 'var(--black)';
        }, 2500);
    }).catch(err => {
        console.error('Failed to copy:', err);
        const textArea = document.createElement('textarea');
        textArea.value = scriptText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast();
    });
}

// ==================== TOAST ====================
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// ==================== EXECUTOR TOGGLE ====================
function toggleExecutors() {
    const executorList = document.getElementById('executorList');
    const toggleBtn = document.querySelector('.executor-toggle');
    
    executorList.classList.toggle('show');
    toggleBtn.classList.toggle('active');
}

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // visible 클래스가 추가된 후 transform transition 제거 (tilt 효과를 위해)
            setTimeout(() => {
                entry.target.classList.add('tilt-ready');
            }, 800); // 진입 애니메이션이 끝난 후
        }
    });
}, observerOptions);

// Add CSS for animation - transform transition을 분리
const style = document.createElement('style');
style.textContent = `
    .feature-card, .script-info-card, .social-card, .section-header {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    border-color 0.4s, box-shadow 0.4s;
    }
    
    .feature-card.visible, .script-info-card.visible, 
    .social-card.visible, .section-header.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* tilt-ready 클래스가 추가되면 transform transition 제거 */
    .feature-card.tilt-ready,
    .script-info-card.tilt-ready,
    .social-card.tilt-ready {
        transition: border-color 0.4s, box-shadow 0.4s;
    }
    
    .feature-card:nth-child(1) { transition-delay: 0s; }
    .feature-card:nth-child(2) { transition-delay: 0.1s; }
    .feature-card:nth-child(3) { transition-delay: 0.2s; }
    .feature-card:nth-child(4) { transition-delay: 0.3s; }
    
    .feature-card:nth-child(1).tilt-ready { transition-delay: 0s; }
    .feature-card:nth-child(2).tilt-ready { transition-delay: 0s; }
    .feature-card:nth-child(3).tilt-ready { transition-delay: 0s; }
    .feature-card:nth-child(4).tilt-ready { transition-delay: 0s; }
`;
document.head.appendChild(style);

document.querySelectorAll('.feature-card, .script-info-card, .social-card, .section-header').forEach(el => {
    observer.observe(el);
});

// ==================== PARALLAX ORBS ====================
let orbMouseX = 0;
let orbMouseY = 0;
let currentOrbX = 0;
let currentOrbY = 0;

document.addEventListener('mousemove', (e) => {
    orbMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    orbMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateOrbs() {
    currentOrbX += (orbMouseX - currentOrbX) * 0.03;
    currentOrbY += (orbMouseY - currentOrbY) * 0.03;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 40;
        orb.style.transform = `translate(${currentOrbX * speed}px, ${currentOrbY * speed}px)`;
    });
    
    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// ==================== INTERACTIVE SHAPES ====================
const shapes = document.querySelectorAll('.shape');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 15;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
    });
});

// ==================== PREVENT DISCORD CLICK ====================
document.querySelector('.social-card.discord').addEventListener('click', (e) => {
    e.preventDefault();
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});
