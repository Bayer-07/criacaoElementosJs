// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa todas as funcionalidades
    initSmoothScroll();
    initMobileMenu();
    initAnimations();
    initCounters();
    initFormInteractions();
    initServiceButtons();
});

// ==========================================
// NAVEGAÇÃO SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// MENU MOBILE
// ==========================================
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // Alterna ícone do hamburger
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fecha menu ao clicar em um link
        const mobileLinks = navMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// ==========================================
// ANIMAÇÕES DE SCROLL (AOS - Animate On Scroll)
// ==========================================
function initAnimations() {
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-aos-delay') || 0;

                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);

                // Para de observar o elemento após a animação
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observa todos os elementos com data-aos
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// CONTADORES ANIMADOS
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));

                animateCounter(counter, 0, target, 2000);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const suffix = end === 2.5 ? 'x' : end === 95 ? '%' : '+';

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Função de easing (ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easedProgress;

        // Formatação dos números
        if (end === 2.5) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// ==========================================
// INTERAÇÕES DO FORMULÁRIO
// ==========================================
function initFormInteractions() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.querySelector('.form-success');

    // Adiciona validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearInputError);
    });

    // Submit do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Valida todos os campos
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput({ target: input })) {
                isValid = false;
            }
        });

        if (isValid) {
            handleFormSubmit(form, submitBtn, successMessage);
        }
    });
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();

    // Remove erro anterior
    clearInputError(e);

    if (input.hasAttribute('required') && !value) {
        showInputError(input, 'Este campo é obrigatório');
        return false;
    }

    if (input.type === 'email' && value && !isValidEmail(value)) {
        showInputError(input, 'E-mail inválido');
        return false;
    }

    if (input.type === 'tel' && value && !isValidPhone(value)) {
        showInputError(input, 'Telefone inválido');
        return false;
    }

    return true;
}

function clearInputError(e) {
    const input = e.target;
    input.classList.remove('error');
    const errorMsg = input.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showInputError(input, message) {
    input.classList.add('error');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
}

function handleFormSubmit(form, submitBtn, successMessage) {
    // Estado de carregamento
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    form.classList.add('loading');

    // Simula envio (2 segundos)
    setTimeout(() => {
        // Esconde formulário
        form.style.display = 'none';

        // Mostra mensagem de sucesso com animação
        successMessage.style.display = 'block';
        successMessage.classList.add('aos-animate');

        // Log dos dados (em produção enviaria para servidor)
        const formData = new FormData(form);
        console.log('Formulário enviado:', Object.fromEntries(formData));

        // Reset após 5 segundos (opcional)
        setTimeout(() => {
            form.style.display = 'block';
            successMessage.style.display = 'none';
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.classList.remove('loading');
        }, 5000);

    }, 2000);
}

// ==========================================
// BOTÕES DE SERVIÇOS COM EFEITO RIPPLE
// ==========================================
function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-btn');

    serviceButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Efeito ripple
            createRippleEffect(e, this);

            // Navega para seção de contato após pequeno delay
            setTimeout(() => {
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 300);
        });
    });

    // Botões do hero também
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            createRippleEffect(e, this);

            if (this.classList.contains('btn-primary')) {
                setTimeout(() => {
                    document.querySelector('#contact').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 300);
            } else {
                setTimeout(() => {
                    document.querySelector('#testimonials').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
}

function createRippleEffect(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// ==========================================
// PARALLAX SUAVE NO HERO
// ==========================================
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const floatingCards = document.querySelector('.floating-cards');
        if (floatingCards) {
            floatingCards.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ==========================================
// HEADER TRANSPARÊNCIA NO SCROLL
// ==========================================
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset;

    if (scrollTop > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.8)';
        header.style.backdropFilter = 'blur(5px)';
    }
});

// ==========================================
// TECH STACK HOVER EFFECT
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// ==========================================
// LOADING SUAVE DA PÁGINA
// ==========================================
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


const reviews = [{
    nomeCLiente: "Ana Silva",
    cargo: "CEO - Tech corp Brasil",
    rating: 5,
    review: '"A TechFlow AI transformou completamente nossos processos. Conseguimos automatizar 80% das tarefas repetitivas e aumentar nossa produtividade em 150%. O ROI foi alcançado em apenas 4 meses."'
}, {
    nomeCLiente: "Carlos Santos",
    cargo: "Diretor de Operações - Manufatura Plus",
    rating: 5,
    review: '"A solução de visão computacional implementada pela equipe revolucionou nosso controle de qualidade. Reduzimos defeitos em 95% e economizamos milhões em retrabalho."'
}, {
    nomeCLiente: "Marina Costa",
    cargo: "Head of Analytics - RetailTech",
    rating: 4,
    review: '"As previsões de demanda ficaram 40% mais precisas com a IA preditiva. Isso resultou em melhor gestão de estoque e aumento de 25% nas vendas. Parceria excepcional!"'
}, {
    nomeCLiente: "Roberto Lima",
    cargo: "CTO - FinanceFlow",
    rating: 5,
    review: '"Implementamos automação inteligente em nossos processos financeiros. O resultado? 70% menos tempo em tarefas manuais e 99.8% de precisão nos cálculos."'
}, {
    nomeCLiente: "Julia Fernandes",
    cargo: "Diretora de Inovação - HealthTech Solutions",
    rating: 5,
    review: '"A consultoria em IA da TechFlow nos ajudou a desenvolver soluções que salvam vidas. A precisão diagnóstica aumentou 45% e os médicos agora têm mais tempo para o que realmente importa."'
}, {
    nomeCLiente: "Pedro Oliveira",
    cargo: "VP de Tecnologia - LogisticaMax",
    rating: 4,
    review: '"Otimização de rotas com IA reduziu nossos custos de transporte em 30% e melhorou a satisfação do cliente. A TechFlow AI entende realmente do negócio, não apenas de tecnologia."'
}]

const wrapper = document.querySelector('#grid')

for (let index = 0; index < 6; index++) {
    const review = reviews[index]

    const divRating = document.createElement("div")
    divRating.classList.add("rating")

    for (let indexRating = 0; indexRating < review.rating; indexRating++) {
        const star = document.createElement("i")
        star.classList.add("fas", "fa-star")
        divRating.appendChild(star)
    }

    const cargo = document.createElement("p")
    cargo.innerText = review.cargo

    const nome = document.createElement("h4")
    nome.innerText = review.nomeCLiente

    const divInformacao = document.createElement("div")
    divInformacao.classList.add("author-info")
    divInformacao.append(nome)
    divInformacao.append(cargo)
    divInformacao.append(divRating)

    const divAvatar = document.createElement("div")
    divAvatar.classList.add("author-avatar")
    const initials = "GB"
    divAvatar.innerText = initials

    const divAutor = document.createElement("div")
    divAutor.classList.add("testimonial-author")
    divAutor.append(divAvatar)
    divAutor.append(divInformacao)

    const divAvaliacao = document.createElement("div")
    divAvaliacao.classList.add("testimonial-quote")
    divAvaliacao.innerText = review.review

    const divCard = document.createElement("div")
    divCard.classList.add("testimonial-card")
    divCard.setAttribute('data-aos', 'zoom-in')
    divCard.setAttribute('data-aos-delay', (index * 100).toString())

    divCard.append(divAvaliacao)
    divCard.append(divAutor)

    wrapper.append(divCard)
}