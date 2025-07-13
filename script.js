// Portfolio JavaScript for HCS Website
class PortfolioApp {
    constructor() {
        this.data = null;
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.populateHeroSection();
            this.populateExperienceSection();
            this.populateEducationSection();
            this.populateSkillsSection();
            this.populateCertificationsSection();
            this.populatePublicationsSection();
            this.populateContactSection();
            this.initializeAnimations();
            this.initializeSmoothScrolling();
        } catch (error) {
            console.error('Portfolio 초기화 중 오류:', error);
            this.showErrorMessage();
        }
    }

    async loadData() {
        try {
            const response = await fetch('Data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
            throw error;
        }
    }

    populateHeroSection() {
        const { basics } = this.data;
        
        document.getElementById('hero-name').textContent = basics.name;
        document.getElementById('hero-title').textContent = `${basics.currentTitle}, ${basics.currentCompany}`;
        document.getElementById('hero-summary').textContent = basics.summary;
        document.getElementById('hero-philosophy').textContent = basics.philosophy;
    }

    populateExperienceSection() {
        const timelineContainer = document.getElementById('experience-timeline');
        const { experience } = this.data;

        experience.forEach((exp, index) => {
            const timelineItem = this.createTimelineItem(exp, index);
            timelineContainer.appendChild(timelineItem);
        });
    }

    createTimelineItem(exp, index) {
        const item = document.createElement('div');
        item.className = 'timeline-item animate-on-scroll';
        
        const achievementsHtml = exp.achievements.map(achievement => `
            <div class="achievement-card">
                <h6 class="fw-bold text-primary mb-2">${achievement.name}</h6>
                <p class="text-muted small mb-2">${achievement.duration}</p>
                <p class="mb-0">${achievement.details}</p>
            </div>
        `).join('');

        item.innerHTML = `
            <div class="timeline-icon">
                <i class="bi bi-building"></i>
            </div>
            <div class="timeline-content">
                <span class="timeline-period">${exp.period}</span>
                <h4 class="fw-bold mb-2">${exp.company}</h4>
                <h5 class="text-primary mb-2">${exp.title}</h5>
                <p class="text-muted mb-2">${exp.team} | ${exp.location}</p>
                <p class="mb-3">${exp.description}</p>
                <div class="achievements">
                    <h6 class="fw-bold mb-3">주요 성과</h6>
                    ${achievementsHtml}
                </div>
            </div>
        `;
        
        return item;
    }

    populateEducationSection() {
        const educationGrid = document.getElementById('education-grid');
        const { education } = this.data;

        education.forEach(edu => {
            const educationCard = this.createEducationCard(edu);
            educationGrid.appendChild(educationCard);
        });
    }

    createEducationCard(edu) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';
        
        const gpaText = edu.GPA ? `<p class="text-muted mb-2">GPA: ${edu.GPA}</p>` : '';
        
        col.innerHTML = `
            <div class="education-card animate-on-scroll">
                <div class="education-icon">
                    <i class="bi bi-mortarboard"></i>
                </div>
                <h5 class="fw-bold mb-2">${edu.institution}</h5>
                <h6 class="text-primary mb-2">${edu.degree}</h6>
                <p class="mb-2">${edu.major}</p>
                <p class="text-muted mb-2">${edu.period}</p>
                <p class="text-muted mb-2">${edu.location}</p>
                ${gpaText}
            </div>
        `;
        
        return col;
    }

    populateSkillsSection() {
        const skillsGrid = document.getElementById('skills-grid');
        const { skills } = this.data;

        skills.forEach(skill => {
            const skillCard = this.createSkillCard(skill);
            skillsGrid.appendChild(skillCard);
        });
    }

    createSkillCard(skill) {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6 mb-4';
        
        const levelPercentage = this.getLevelPercentage(skill.level);
        
        col.innerHTML = `
            <div class="skill-card animate-on-scroll">
                <h5 class="fw-bold mb-2">${skill.name}</h5>
                <p class="text-muted small mb-3">${skill.description}</p>
                <div class="skill-level">
                    <div class="d-flex justify-content-between mb-1">
                        <span class="skill-level-text">${skill.level}</span>
                        <span class="skill-level-text">${levelPercentage}%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-bar" data-width="${levelPercentage}"></div>
                    </div>
                </div>
            </div>
        `;
        
        return col;
    }

    getLevelPercentage(level) {
        const levelMap = {
            '최상': 95,
            '상': 85,
            '중상': 75,
            '중': 65,
            '하': 45
        };
        return levelMap[level] || 50;
    }

    populateCertificationsSection() {
        const certificationsGrid = document.getElementById('certifications-grid');
        const { certifications } = this.data;

        certifications.forEach(cert => {
            const certCard = this.createCertificationCard(cert);
            certificationsGrid.appendChild(certCard);
        });
    }

    createCertificationCard(cert) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';
        
        col.innerHTML = `
            <div class="cert-card animate-on-scroll">
                <div class="cert-icon">
                    <i class="bi bi-award"></i>
                </div>
                <h6 class="fw-bold mb-2">${cert.name}</h6>
                <p class="text-primary mb-2">${cert.issuer}</p>
                <p class="text-muted mb-2">${cert.date}</p>
                <p class="mb-0"><strong>${cert.grade_score}</strong></p>
            </div>
        `;
        
        return col;
    }

    populatePublicationsSection() {
        const publicationsGrid = document.getElementById('publications-grid');
        const { publications } = this.data;

        publications.forEach(pub => {
            const pubCard = this.createPublicationCard(pub);
            publicationsGrid.appendChild(pubCard);
        });
    }

    createPublicationCard(pub) {
        const col = document.createElement('div');
        col.className = 'col-lg-6 mb-4';
        
        col.innerHTML = `
            <div class="publication-card animate-on-scroll">
                <div class="publication-icon">
                    <i class="bi bi-journal-text"></i>
                </div>
                <h6 class="fw-bold mb-2">${pub.title}</h6>
                <p class="text-primary mb-2">${pub.publication}</p>
                ${pub.publisher ? `<p class="text-muted mb-2">${pub.publisher}</p>` : ''}
                <p class="text-muted mb-2">${pub.date}</p>
                <p class="small mb-0">저자: ${pub.author}</p>
            </div>
        `;
        
        return col;
    }

    populateContactSection() {
        const { basics, externalLinks } = this.data;
        
        document.getElementById('contact-email').textContent = basics.email;
        document.getElementById('contact-location').textContent = basics.location;
        
        const externalLinksContainer = document.getElementById('external-links');
        externalLinks.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.className = 'external-link';
            linkElement.innerHTML = `<i class="bi bi-link-45deg"></i> ${link.name}`;
            externalLinksContainer.appendChild(linkElement);
        });
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate skill progress bars
                    const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                    progressBars.forEach(bar => {
                        const width = bar.dataset.width;
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 200);
                    });
                    
                    // Animate timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        entry.target.classList.add('animate');
                    }
                }
            });
        }, observerOptions);

        // Observe all animation elements
        document.querySelectorAll('.animate-on-scroll, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    initializeSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionHeight = section.clientHeight;
                if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    showErrorMessage() {
        const heroSection = document.getElementById('home');
        heroSection.innerHTML = `
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center">
                        <div class="alert alert-danger" role="alert">
                            <h4 class="alert-heading">데이터 로딩 오류</h4>
                            <p>죄송합니다. 포트폴리오 데이터를 불러오는 중 문제가 발생했습니다.</p>
                            <hr>
                            <p class="mb-0">페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
                        </div>
                        <button class="btn btn-primary" onclick="location.reload()">
                            <i class="bi bi-arrow-clockwise"></i> 새로고침
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// DOM이 로드되면 애플리케이션 시작
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// 추가 유틸리티 함수들
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 페이지 로딩 애니메이션
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 스크롤 성능 최적화
let ticking = false;
function updateScrollPosition() {
    // 스크롤 관련 업데이트 로직
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
});