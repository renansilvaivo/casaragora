
document.addEventListener('DOMContentLoaded', () => {
  // menu toggle
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  btn && btn.addEventListener('click', () => {
    nav.style.display = (nav.style.display === 'flex' ? 'none' : 'flex');
  });

  // set year
  document.getElementById('ano') && (document.getElementById('ano').textContent = new Date().getFullYear());
  document.getElementById('ano2') && (document.getElementById('ano2').textContent = new Date().getFullYear());
  document.getElementById('ano3') && (document.getElementById('ano3').textContent = new Date().getFullYear());

  // RSVP localStorage
  const form = document.getElementById('rsvpForm') || document.querySelector('.rsvp');
  const listEl = document.getElementById('listaConfirmados');
  const STORAGE_KEY = 'casaragora_rsvps_v1';

  function render() {
    if(!listEl) return;
    const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    listEl.innerHTML = arr.map(i => `<li><strong>${escape(i.nome)}</strong> — ${i.presenca} — ${i.acompanhantes || 0} acompanhantes ${i.mensagem ? '<div class="muted">'+escape(i.mensagem)+'</div>' : ''}</li>`).join('');
  }

  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome')?.value || document.querySelector('input[id=nome]')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const presenca = document.getElementById('presenca')?.value || document.getElementById('confirmacao')?.value || 'sim';
      const acompanhantes = document.getElementById('acompanhantes')?.value || 0;
      const mensagem = document.getElementById('mensagem')?.value || '';
      if(!nome) { alert('Por favor informe o nome.'); return; }
      const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      arr.push({ nome, email, presenca, acompanhantes, mensagem, created: Date.now() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      alert('Confirmação enviada — obrigado!');
      form.reset();
      render();
    });
  }
  render();

  function escape(str){ return String(str).replace(/[&<>"']/g, function(m){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; }); }
});
