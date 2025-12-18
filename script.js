const sb = window.supabaseClient;

document.addEventListener('DOMContentLoaded', () => {
    initAdminModal();
    carregarEventos();
});

async function carregarEventos() {
    const grid = document.getElementById('events-grid');
    if (!grid) return;

    const { data, error } = await sb
        .from('events')
        .select('*')
        .order('date', { ascending: true });

    if (error) {
        console.error('Erro ao buscar eventos:', error);
        grid.innerHTML = '<p>Não foi possível carregar os eventos.</p>';
        return;
    }

    grid.innerHTML = data.map(renderEventCard).join('');
}

function renderEventCard(event) {
    const dateObj = event.date ? new Date(event.date) : null;
    const day = dateObj ? String(dateObj.getDate()).padStart(2, '0') : '';
    const month = dateObj
        ? dateObj.toLocaleString('pt-BR', { month: 'short' }).toUpperCase()
        : '';

    return `
    <article class="event-card">
      ${event.banner_url ? `
        <div class="event-banner">
          <img src="${event.banner_url}" alt="${event.title}">
        </div>
      ` : ''}
      <div class="event-date">
        <span class="day">${day}</span>
        <span class="month">${month}</span>
      </div>
      <div class="event-info">
        <h3>${event.title}</h3>
        <p>${event.location}</p>
        <p>${event.time} – ${event.description}</p>
        <a href="${event.cta_url || '#'}" class="event-cta" target="_blank" rel="noopener">
            ${event.cta_label || 'Ver detalhes'}
        </a>
        </div>
    </article>
`;
}

function initAdminModal() {
    const adminLink = document.getElementById('admin-link');
    const modal = document.getElementById('admin-modal');
    const closeBtn = document.getElementById('close-modal');
    const loginForm = document.getElementById('admin-form');
    const newEventForm = document.getElementById('new-event-form');

    if (!adminLink || !modal || !closeBtn) return;

    adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });


    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login de admin ainda não conectado ao backend.');
    });


    newEventForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(newEventForm);
        const evento = {
            title: formData.get('title'),
            location: formData.get('location'),
            date: formData.get('date'),
            time: formData.get('time'),
            description: formData.get('description'),
            cta_label: formData.get('cta_label'),
            cta_url: formData.get('cta_url'),
            banner_url: formData.get('banner_url'),
        };

        const { data, error } = await sb
            .from('events')
            .insert([evento]);

        if (error) {
            console.error('Erro ao criar evento:', error);
            alert('Erro ao criar evento.');
            return;
        }

        newEventForm.reset();
        alert('Evento criado com sucesso!');

    });
}

