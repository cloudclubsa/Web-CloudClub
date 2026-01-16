document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initEventDetailsModal();
    initFaq();
});

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNavbar = document.querySelector('.menu-navbar');

    if (!menuToggle || !menuNavbar) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuNavbar.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const menuLinks = menuNavbar.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuNavbar.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!menuNavbar.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuNavbar.classList.remove('active');
        }
    });
}

function initEventDetailsModal() {
    const modal = document.getElementById('event-details-modal');
    const closeBtn = document.querySelector('.event-modal-close');
    const detailsButtons = document.querySelectorAll('.event-details-btn');

    if (!modal || !closeBtn) return;

    // Dados dos eventos (pode ser expandido para múltiplos eventos)
    const eventData = {
        1: {
            day: '19',
            month: 'JAN',
            title: 'Conhecendo AWS #1',
            location: 'Hub Goiás — Miniauditório (2º andar)',
            time: '19h30 às 22h · Presencial + online',
            description: `<p>Conhecendo AWS #1 é o primeiro encontro da nossa comunidade e foi pensado para mostrar, na prática, como a nuvem é usada em ambientes reais — do código à infraestrutura. Se você está começando em cloud ou quer evoluir para o próximo nível na carreira em tecnologia, este evento é para você.</p>

<p><strong>O que você vai ver:</strong></p>
<ul>
    <li>Experiências reais com AWS em cenários de produção</li>
    <li>Visão arquitetural aplicada ao desenvolvimento de software</li>
    <li>Infraestrutura como código (IaC) com Terraform em casos práticos</li>
</ul>

<p><strong>Data, horário e formato</strong><br>
19 de janeiro, das 19:30h às 22h<br>
Hub Goiás — Mini-auditório 2° Andar (Setor Leste Universitário), Goiânia/GO<br>
Presencial + transmissão ao vivo pelo Instagram <a href="https://www.instagram.com/cloudclub_sa" target="_blank">@cloudclub_sa</a></p>

<p><strong>Público-alvo (prioridade)</strong><br>
Este evento tem prioridade para estudantes:</p>
<ul>
    <li>Graduação/tecnólogo</li>
    <li>Ensino médio com interesse em tecnologia</li>
    <li>Pós-graduação, especialização ou mestrado</li>
</ul>

<p>Se você não for estudante, recomendamos acompanhar os eventos abertos da comunidade AWS Goiânia. Caso haja vagas remanescentes para o presencial, entre em contato pelo Instagram <a href="https://www.instagram.com/cloudclub_sa" target="_blank">@cloudclub_sa</a> para entrar na lista de espera.</p>

<p><strong>Inscrição</strong><br>
Evento gratuito<br>
Vagas presenciais limitadas<br>
Transmissão online pelo Instagram oficial</p>

<p>Inscreva-se pelo Sympla para receber lembretes, acesso à transmissão e materiais do evento por e-mail.</p>`,
            ctaUrl: 'https://www.sympla.com.br/evento/aws-cloud-club-sa-conhecendo-aws-cloud-club-1/3276397?share_id=copiarlink'
        }
    };

    function openModal(eventId) {
        const event = eventData[eventId];
        if (!event) return;

        // Preencher dados do modal
        document.querySelector('.event-modal-day').textContent = event.day;
        document.querySelector('.event-modal-month').textContent = event.month;
        document.querySelector('.event-modal-title').textContent = event.title;
        document.querySelector('.event-modal-location').textContent = event.location;
        document.querySelector('.event-modal-time').textContent = event.time;
        document.querySelector('.event-modal-description').innerHTML = event.description;
        document.querySelector('.event-modal-cta').href = event.ctaUrl;

        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        // Aguardar animação de saída antes de esconder completamente
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        }, 300);
    }

    // Abrir modal ao clicar no botão de detalhes
    detailsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const eventId = btn.getAttribute('data-event-id');
            openModal(eventId);
        });
    });

    // Fechar modal
    closeBtn.addEventListener('click', closeModal);

    // Fechar ao clicar no overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');

        if (!question) {
            return;
        }

        question.addEventListener('click', (e) => {
            e.preventDefault();

            // Fecha todos os outros itens abertos (opcional, para efeito acordeão único)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Alterna o estado do item atual
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
}