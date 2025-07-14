// Portfolio JavaScript for HCS Website
class PortfolioApp {
    constructor() {
        this.data = null;
        console.log('PortfolioApp constructor called');
        this.init();
    }

    init() {
        console.log('Portfolio init started');
        
        // First, try to load data
        this.loadData()
            .then(() => {
                console.log('Data loaded successfully, populating sections...');
                this.populateAllSections();
                this.initializeFeatures();
                console.log('Portfolio initialization complete!');
            })
            .catch((error) => {
                console.error('Data loading failed:', error);
                console.log('Using fallback mode...');
                this.useFallbackMode();
            });
    }

    populateAllSections() {
        try {
            this.populateHeroSection();
            this.populateExperienceSection();
            this.populateEducationSection();
            this.populateSkillsSection();
            this.populateCertificationsSection();
            this.populateProjectsSection();
            this.populatePublicationsSection();
            this.populateContactSection();
        } catch (error) {
            console.error('Section population failed:', error);
        }
    }

    initializeFeatures() {
        try {
            this.initializeLazyLoading();
            this.initializeAnimations();
            this.initializeSmoothScrolling();
        } catch (error) {
            console.error('Feature initialization failed:', error);
        }
    }

    useFallbackMode() {
        console.log('Running in fallback mode with basic content');
        // Don't populate sections, let HTML default content show
        this.initializeFeatures();
    }

    async loadData() {
        console.log('Starting data fetch...');
        
        return new Promise((resolve, reject) => {
            // Set a timeout to prevent hanging
            const timeoutId = setTimeout(() => {
                console.log('Data loading timeout - using fallback');
                reject(new Error('Data loading timeout'));
            }, 5000);

            fetch('./Data.json')
                .then(response => {
                    console.log('Fetch response received:', response.status);
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    clearTimeout(timeoutId);
                    console.log('Data parsed successfully');
                    this.data = data;
                    resolve(data);
                })
                .catch(error => {
                    clearTimeout(timeoutId);
                    console.error('Fetch failed:', error);
                    reject(error);
                });
        });
    }

    // Simplified sections - removed complex loading logic

    preloadCriticalImages() {
        // Simplified image preloading
        try {
            console.log('Preloading critical images...');
        } catch (error) {
            console.log('Image preloading skipped');
        }
    }

    initializeLazyLoading() {
        try {
            console.log('Lazy loading initialized (simplified)');
        } catch (error) {
            console.log('Lazy loading skipped');
        }
    }

    populateHeroSection() {
        try {
            console.log('Populating hero section...');
            const { basics } = this.data;
            
            const nameEl = document.getElementById('hero-name');
            const titleEl = document.getElementById('hero-title');
            const summaryEl = document.getElementById('hero-summary');
            const philosophyEl = document.getElementById('hero-philosophy');
            
            if (nameEl) nameEl.textContent = basics?.name || '한충석';
            if (titleEl) titleEl.textContent = `${basics?.currentTitle || '책임매니저'}, ${basics?.currentCompany || '현대제철'}`;
            if (summaryEl) summaryEl.textContent = basics?.summary || '현대제철 HRD 전문가';
            if (philosophyEl) philosophyEl.textContent = basics?.philosophy || '사람은 바뀔 수 있다고 믿습니다.';
            
            console.log('Hero section populated successfully');
        } catch (error) {
            console.error('Hero section population failed:', error);
        }
    }

    populateExperienceSection() {
        const timelineContainer = document.getElementById('experience-timeline');
        const { experience } = this.data;

        // Add career summary section
        this.addCareerSummary();

        // Add filter controls
        this.addFilterControls();

        experience.forEach((exp, index) => {
            const timelineItem = this.createTimelineItem(exp, index);
            timelineContainer.appendChild(timelineItem);
        });
    }

    addCareerSummary() {
        const experienceSection = document.getElementById('experience');
        const { careerSummary } = this.data;
        
        if (!careerSummary) return;

        const summaryContainer = document.createElement('div');
        summaryContainer.className = 'career-summary';
        summaryContainer.innerHTML = `
            <div class="container">
                <div class="text-center mb-4">
                    <h3 class="fw-bold mb-2">경력 여정 한눈에 보기</h3>
                    <p class="text-muted">연도별 주요 테마와 핵심 성과를 요약했습니다</p>
                </div>
                <div class="summary-grid">
                    ${careerSummary.map(summary => this.createSummaryCard(summary)).join('')}
                </div>
            </div>
        `;
        
        const timelineContainer = document.getElementById('experience-timeline');
        timelineContainer.parentNode.insertBefore(summaryContainer, timelineContainer);
    }

    createSummaryCard(summary) {
        const categoriesHtml = summary.categories.map(category => 
            `<span class="category-tag category-${category}">${category}</span>`
        ).join('');
        
        const achievementsHtml = summary.keyAchievements.map(achievement => 
            `<div class="achievement-item">${achievement}</div>`
        ).join('');

        return `
            <div class="summary-card impact-${summary.impactLevel} animate-on-scroll">
                <div class="summary-icon">${summary.icon}</div>
                <span class="summary-period">${summary.period}</span>
                <h4 class="summary-theme">${summary.theme}</h4>
                <p class="summary-description">${summary.description}</p>
                <div class="summary-achievements">
                    <h6>주요 성과</h6>
                    ${achievementsHtml}
                </div>
                <div class="summary-categories">
                    ${categoriesHtml}
                </div>
            </div>
        `;
    }

    addFilterControls() {
        const experienceSection = document.getElementById('experience');
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-controls mb-4 text-center';
        filterContainer.innerHTML = `
            <div class="btn-group mb-3" role="group">
                <button type="button" class="btn btn-outline-primary active" data-filter="all">전체</button>
                <button type="button" class="btn btn-outline-primary" data-filter="리더십개발">리더십개발</button>
                <button type="button" class="btn btn-outline-primary" data-filter="인재관리">인재관리</button>
                <button type="button" class="btn btn-outline-primary" data-filter="교육기획">교육기획</button>
                <button type="button" class="btn btn-outline-primary" data-filter="시스템혁신">시스템혁신</button>
                <button type="button" class="btn btn-outline-primary" data-filter="조직개발">조직개발</button>
                <button type="button" class="btn btn-outline-primary" data-filter="채용관리">채용관리</button>
            </div>
        `;
        
        const timelineContainer = document.getElementById('experience-timeline');
        timelineContainer.parentNode.insertBefore(filterContainer, timelineContainer);
        
        // Add filter event listeners
        filterContainer.addEventListener('click', (e) => {
            if (e.target.matches('[data-filter]')) {
                this.filterAchievements(e.target.dataset.filter);
                
                // Update active button
                filterContainer.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    filterAchievements(category) {
        const achievementCards = document.querySelectorAll('.achievement-card');
        
        achievementCards.forEach(card => {
            if (category === 'all' || card.classList.contains(`category-${category}`)) {
                card.style.display = 'block';
                card.parentElement.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Hide timeline items that have no visible achievements
        document.querySelectorAll('.timeline-item').forEach(item => {
            const visibleAchievements = item.querySelectorAll('.achievement-card[style*="block"], .achievement-card:not([style*="none"])');
            if (category === 'all' || visibleAchievements.length > 0) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    createTimelineItem(exp, index) {
        const item = document.createElement('div');
        item.className = 'timeline-item animate-on-scroll';
        
        // Get dominant category for timeline icon
        const dominantCategory = this.getDominantCategory(exp.achievements);
        
        const achievementsHtml = exp.achievements.map(achievement => {
            const categoryClass = achievement.category ? `category-${achievement.category}` : '';
            const impactClass = achievement.impactLevel ? `impact-${achievement.impactLevel}` : '';
            const innovationClass = achievement.innovationType ? `innovation-${achievement.innovationType}` : '';
            const collaborationClass = achievement.collaborationScope ? `collaboration-${achievement.collaborationScope}` : '';
            
            return `
                <div class="achievement-card ${categoryClass} ${collaborationClass}">
                    <div class="impact-indicator ${impactClass}"></div>
                    <div class="innovation-badge ${innovationClass}">${this.getInnovationIcon(achievement.innovationType)}</div>
                    <h6 class="fw-bold text-primary mb-2">${achievement.name}</h6>
                    <p class="text-muted small mb-2">${achievement.duration}</p>
                    <p class="mb-0">${achievement.details}</p>
                </div>
            `;
        }).join('');

        item.innerHTML = `
            <div class="timeline-icon category-${dominantCategory}">
                <i class="bi ${this.getCategoryIcon(dominantCategory)}"></i>
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

    getDominantCategory(achievements) {
        const categoryCount = {};
        achievements.forEach(achievement => {
            const category = achievement.category || '기타';
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        });
        
        return Object.keys(categoryCount).reduce((a, b) => 
            categoryCount[a] > categoryCount[b] ? a : b
        );
    }

    getCategoryIcon(category) {
        const iconMap = {
            '리더십개발': 'bi-person-badge',
            '인재관리': 'bi-people',
            '교육기획': 'bi-mortarboard',
            '시스템혁신': 'bi-gear',
            '조직개발': 'bi-diagram-3',
            '채용관리': 'bi-person-plus'
        };
        return iconMap[category] || 'bi-building';
    }

    getInnovationIcon(type) {
        const iconMap = {
            '혁신': '🚀',
            '개선': '⚡',
            '최적화': '🔧'
        };
        return iconMap[type] || '';
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

        if (certifications && certifications.length > 0) {
            certifications.forEach(cert => {
                const certCard = this.createCertificationCard(cert);
                certificationsGrid.appendChild(certCard);
            });
        }
    }

    populateProjectsSection() {
        const projectsGrid = document.getElementById('projects-grid');
        const { projects } = this.data;

        if (projects && projects.length > 0) {
            projects.forEach(project => {
                const projectCard = this.createProjectCard(project);
                projectsGrid.appendChild(projectCard);
            });
        }
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

    createProjectCard(project) {
        const col = document.createElement('div');
        col.className = 'col-lg-6 mb-4';
        
        const techStack = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        const highlights = project.highlights.map(highlight => 
            `<li class="project-highlight">${highlight}</li>`
        ).join('');
        
        const githubLink = project.github ? 
            `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm me-2">
                <i class="bi bi-github"></i> GitHub
            </a>` : '';
            
        const demoLink = project.demo ? 
            `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                <i class="bi bi-play-circle"></i> Demo
            </a>` : '';
        
        col.innerHTML = `
            <div class="project-card animate-on-scroll">
                <div class="project-header">
                    <div class="project-category ${project.category}">${project.category}</div>
                    <div class="project-status ${project.status}">${project.status}</div>
                </div>
                <div class="project-icon">
                    <i class="bi ${this.getProjectIcon(project.category)}"></i>
                </div>
                <h5 class="fw-bold mb-2">${project.name}</h5>
                <p class="text-muted mb-3">${project.description}</p>
                <div class="tech-stack mb-3">
                    ${techStack}
                </div>
                <div class="project-highlights mb-3">
                    <h6 class="fw-semibold mb-2">주요 성과</h6>
                    <ul class="highlights-list">
                        ${highlights}
                    </ul>
                </div>
                <div class="project-period mb-3">
                    <small class="text-muted">
                        <i class="bi bi-calendar"></i> ${project.startDate} ~ ${project.endDate}
                    </small>
                </div>
                <div class="project-links">
                    ${githubLink}
                    ${demoLink}
                </div>
            </div>
        `;
        
        return col;
    }

    getProjectIcon(category) {
        const iconMap = {
            '웹개발': 'bi-code-slash',
            '데이터분석': 'bi-graph-up',
            '자동화': 'bi-robot',
            '머신러닝': 'bi-cpu',
            '연구': 'bi-journal-text'
        };
        return iconMap[category] || 'bi-folder';
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
        // High-performance Intersection Observer for scroll animations
        const observerOptions = {
            threshold: [0, 0.1, 0.5, 1],
            rootMargin: '0px 0px -50px 0px'
        };

        // Performance-optimized observer with requestAnimationFrame
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                    // Use RAF for smooth animations
                    requestAnimationFrame(() => {
                        entry.target.classList.add('animated');
                        
                        // Animate skill progress bars with staggered timing
                        const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                        progressBars.forEach((bar, index) => {
                            const width = bar.dataset.width;
                            setTimeout(() => {
                                bar.style.width = width + '%';
                            }, 100 + (index * 50)); // Staggered animation
                        });
                        
                        // Animate timeline items with enhanced performance
                        if (entry.target.classList.contains('timeline-item')) {
                            entry.target.classList.add('animate');
                        }
                        
                        // Unobserve animated elements to improve performance
                        if (!entry.target.classList.contains('timeline-item')) {
                            animationObserver.unobserve(entry.target);
                        }
                    });
                }
            });
        }, observerOptions);

        // Lazy loading observer for images and heavy content
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    // Load images
                    if (target.dataset.src) {
                        target.src = target.dataset.src;
                        target.removeAttribute('data-src');
                    }
                    
                    // Load background images
                    if (target.dataset.bgSrc) {
                        target.style.backgroundImage = `url(${target.dataset.bgSrc})`;
                        target.removeAttribute('data-bg-src');
                    }
                    
                    // Stop observing loaded elements
                    lazyLoadObserver.unobserve(target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '100px 0px' // Preload 100px before entering viewport
        });

        // Navigation highlight observer
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    // Update active navigation
                    this.updateActiveNavigation(entry.target.id);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        });

        // Observe elements with batching for better performance
        const animationElements = document.querySelectorAll('.animate-on-scroll, .timeline-item');
        const lazyElements = document.querySelectorAll('[data-src], [data-bg-src]');
        const sections = document.querySelectorAll('section[id]');

        // Batch DOM queries
        setTimeout(() => {
            animationElements.forEach(el => animationObserver.observe(el));
            lazyElements.forEach(el => lazyLoadObserver.observe(el));
            sections.forEach(section => navObserver.observe(section));
        }, 100);

        // Store observers for cleanup
        this.observers = {
            animation: animationObserver,
            lazyLoad: lazyLoadObserver,
            navigation: navObserver
        };
    }

    updateActiveNavigation(activeId) {
        // Throttled navigation update
        if (this.navigationUpdateTimeout) return;
        
        this.navigationUpdateTimeout = setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                }
            });
            this.navigationUpdateTimeout = null;
        }, 100);
    }

    initializeSmoothScrolling() {
        // High-performance smooth scrolling with requestAnimationFrame
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    // Use native smooth scrolling with fallback
                    if ('scrollBehavior' in document.documentElement.style) {
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        // Polyfill for older browsers
                        this.smoothScrollTo(offsetPosition);
                    }
                }
            });
        });
    }

    smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Enhanced cleanup method
    cleanup() {
        if (this.observers) {
            Object.values(this.observers).forEach(observer => {
                if (observer && observer.disconnect) {
                    observer.disconnect();
                }
            });
        }
        
        if (this.navigationUpdateTimeout) {
            clearTimeout(this.navigationUpdateTimeout);
        }
    }

    showErrorMessage() {
        console.error('Portfolio initialization failed');
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.innerHTML = `
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 text-center">
                            <div class="alert alert-warning" role="alert">
                                <h4 class="alert-heading">로딩 중...</h4>
                                <p>포트폴리오 데이터를 불러오고 있습니다. 잠시만 기다려주세요.</p>
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <button class="btn btn-primary mt-3" onclick="location.reload()">
                                <i class="bi bi-arrow-clockwise"></i> 새로고침
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Fallback data loading attempt
        setTimeout(() => {
            this.loadFallbackData();
        }, 3000);
    }

    loadFallbackData() {
        // Provide basic fallback data if fetch fails
        this.data = {
            basics: {
                name: "한충석",
                currentTitle: "현대제철 성장디자인팀 책임매니저",
                currentCompany: "현대제철",
                email: "brienz311@gmail.com",
                location: "대한민국 경기도 안산시",
                summary: "현대제철에서 10년 이상 인적자원개발(HRD) 전문가로 재직하며 리더십 개발, 핵심인재 양성, 교육 프로세스 혁신 등의 분야에서 성과를 창출했습니다.",
                philosophy: "사람은 바뀔 수 있다고 믿으며, 누구나 적절한 지원과 학습 기회가 주어지면 성장할 수 있다는 것을 업무 철학으로 삼고 있습니다."
            },
            experience: [],
            education: [],
            skills: [],
            certifications: [],
            projects: [],
            publications: [],
            externalLinks: []
        };

        this.populateHeroSection();
        console.log('Fallback data loaded');
    }
}

// DOM이 로드되면 애플리케이션 시작
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing portfolio...');
    
    // Add loading timeout
    setTimeout(() => {
        console.log('Checking if portfolio loaded...');
        const nameEl = document.getElementById('hero-name');
        if (nameEl && nameEl.textContent === '한충석') {
            console.log('Portfolio content is visible - success!');
        }
    }, 2000);
    
    try {
        new PortfolioApp();
    } catch (error) {
        console.error('Failed to initialize PortfolioApp:', error);
    }
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

// Enhanced scroll performance optimization
class ScrollPerformanceManager {
    constructor() {
        this.ticking = false;
        this.scrollTimeout = null;
        this.scrollCallbacks = new Set();
        this.init();
    }

    init() {
        // Use passive scroll listeners for better performance
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Handle scroll end events
        window.addEventListener('scroll', this.handleScrollEnd.bind(this), { passive: true });
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.executeScrollCallbacks();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    handleScrollEnd() {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            // Scroll ended - perform cleanup or optimization tasks
            this.onScrollEnd();
        }, 150);
    }

    addScrollCallback(callback) {
        this.scrollCallbacks.add(callback);
    }

    removeScrollCallback(callback) {
        this.scrollCallbacks.delete(callback);
    }

    executeScrollCallbacks() {
        this.scrollCallbacks.forEach(callback => {
            try {
                callback();
            } catch (error) {
                console.warn('Scroll callback error:', error);
            }
        });
    }

    onScrollEnd() {
        // Optimize performance when scrolling stops
        setTimeout(() => {
            // Perform non-critical tasks during idle time
            this.performIdleTasks();
        }, 200);
    }

    performIdleTasks() {
        // Cleanup unnecessary DOM nodes, optimize images, etc.
        document.querySelectorAll('.animated').forEach(el => {
            if (el.getBoundingClientRect().bottom < -200) {
                // Element is far above viewport - could be cleaned up
                el.classList.add('can-cleanup');
            }
        });
    }

    destroy() {
        this.scrollCallbacks.clear();
        clearTimeout(this.scrollTimeout);
    }
}

// Initialize scroll performance manager
const scrollManager = new ScrollPerformanceManager();

// Mobile Performance Optimizations
class MobilePerformanceOptimizer {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isLowEndDevice = this.detectLowEndDevice();
        this.init();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    detectLowEndDevice() {
        // Detect low-end devices based on various factors
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        
        return memory <= 2 || cores <= 2 || (connection && connection.effectiveType === '2g');
    }

    init() {
        if (this.isMobile) {
            this.optimizeForMobile();
        }
        
        if (this.isLowEndDevice) {
            this.optimizeForLowEndDevice();
        }
        
        // Network-aware loading
        this.setupNetworkAwareLoading();
    }

    optimizeForMobile() {
        // Disable transform3d on mobile if performance is poor
        document.documentElement.classList.add('mobile-device');
        
        // Reduce animation complexity
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.15s !important;
                    transition-duration: 0.15s !important;
                }
                .will-change {
                    will-change: auto !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Optimize touch interactions
        this.optimizeTouchInteractions();
    }

    optimizeForLowEndDevice() {
        document.documentElement.classList.add('low-end-device');
        
        // Disable expensive visual effects
        const style = document.createElement('style');
        style.textContent = `
            .low-end-device * {
                animation: none !important;
                transition: none !important;
                transform: none !important;
                box-shadow: none !important;
                backdrop-filter: none !important;
                filter: none !important;
            }
            .low-end-device .timeline::before {
                background: var(--primary-color) !important;
            }
        `;
        document.head.appendChild(style);
    }

    optimizeTouchInteractions() {
        // Add touch-action CSS for better scroll performance
        document.body.style.touchAction = 'manipulation';
        
        // Optimize click delay
        document.addEventListener('touchstart', () => {}, { passive: true });
        
        // Prevent zooming on form inputs
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                const viewport = document.querySelector('meta[name="viewport"]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            });
            
            input.addEventListener('blur', () => {
                const viewport = document.querySelector('meta[name="viewport"]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
            });
        });
    }

    setupNetworkAwareLoading() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection) {
            // Adjust loading strategy based on connection
            if (connection.effectiveType === '2g' || connection.saveData) {
                // Defer non-essential loading
                document.documentElement.classList.add('slow-connection');
                
                // Disable auto-playing content
                const videos = document.querySelectorAll('video');
                videos.forEach(video => {
                    video.autoplay = false;
                    video.preload = 'none';
                });
            }
            
            // Monitor connection changes
            connection.addEventListener('change', () => {
                this.handleConnectionChange();
            });
        }
    }

    handleConnectionChange() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection.effectiveType === '2g' || connection.saveData) {
            // Switch to data-saving mode
            document.documentElement.classList.add('data-saver-mode');
        } else {
            document.documentElement.classList.remove('data-saver-mode');
        }
    }
}

// Initialize mobile performance optimizer
const mobileOptimizer = new MobilePerformanceOptimizer();