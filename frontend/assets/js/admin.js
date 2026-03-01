const API_BASE = '/api';

// ===== Sidebar Navigation =====
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('.admin-section');

sidebarLinks.forEach((link) => {
  link.addEventListener('click', () => {
    sidebarLinks.forEach((l) => l.classList.remove('active'));
    sections.forEach((s) => s.classList.remove('active'));
    link.classList.add('active');
    document.getElementById(`section-${link.dataset.section}`).classList.add('active');
  });
});

// ===== Status Helpers =====
const SERVICE_STATUSES = ['pending', 'in_progress', 'completed', 'cancelled'];
const TECH_STATUSES = ['pending', 'reviewing', 'accepted', 'rejected'];

function badgeHtml(status) {
  return `<span class="badge badge-${status}">${status.replace('_', ' ')}</span>`;
}

function serviceStatusSelect(id, current) {
  const opts = SERVICE_STATUSES.map(
    (s) => `<option value="${s}"${s === current ? ' selected' : ''}>${s.replace('_', ' ')}</option>`
  ).join('');
  return `<select class="status-select" data-id="${id}" data-type="service">${opts}</select>`;
}

function techStatusSelect(id, current) {
  const opts = TECH_STATUSES.map(
    (s) => `<option value="${s}"${s === current ? ' selected' : ''}>${s}</option>`
  ).join('');
  return `<select class="status-select" data-id="${id}" data-type="technician">${opts}</select>`;
}

function formatDate(str) {
  if (!str) return '—';
  return new Date(str + 'Z').toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

function truncate(str, n = 60) {
  if (!str) return '—';
  return str.length > n ? str.slice(0, n) + '…' : str;
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str ?? '';
  return d.innerHTML;
}

// ===== Status Change Listener =====
document.addEventListener('change', async (e) => {
  const sel = e.target;
  if (!sel.classList.contains('status-select')) return;

  const { id, type } = sel.dataset;
  const status = sel.value;
  const endpoint = type === 'service' ? 'services' : 'technicians';

  try {
    const res = await fetch(`${API_BASE}/${endpoint}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      alert('Failed to update status. Please try again.');
    }
  } catch {
    alert('Network error. Please try again.');
  }
});

// ===== Load Service Requests =====
async function loadServices() {
  const tbody = document.getElementById('servicesTableBody');
  tbody.innerHTML = '<tr><td colspan="9" class="table-empty">Loading…</td></tr>';

  try {
    const res = await fetch(`${API_BASE}/services`);
    const data = await res.json();

    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="9" class="table-empty">No service requests yet.</td></tr>';
      return data;
    }

    tbody.innerHTML = data.map((r) => `
      <tr>
        <td>#${r.id}</td>
        <td>${esc(r.full_name)}</td>
        <td>${esc(r.email)}</td>
        <td>${esc(r.phone)}</td>
        <td><span class="badge badge-${r.service_type}">${r.service_type}</span></td>
        <td title="${esc(r.address)}">${truncate(esc(r.address), 30)}</td>
        <td title="${esc(r.description)}">${truncate(esc(r.description))}</td>
        <td>${serviceStatusSelect(r.id, r.status)}</td>
        <td>${formatDate(r.created_at)}</td>
      </tr>
    `).join('');

    return data;
  } catch {
    tbody.innerHTML = '<tr><td colspan="9" class="table-empty">Error loading data.</td></tr>';
    return [];
  }
}

// ===== Load Technician Applications =====
async function loadTechnicians() {
  const tbody = document.getElementById('techniciansTableBody');
  tbody.innerHTML = '<tr><td colspan="9" class="table-empty">Loading…</td></tr>';

  try {
    const res = await fetch(`${API_BASE}/technicians`);
    const data = await res.json();

    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="9" class="table-empty">No applications yet.</td></tr>';
      return data;
    }

    tbody.innerHTML = data.map((r) => `
      <tr>
        <td>#${r.id}</td>
        <td>${esc(r.full_name)}</td>
        <td>${esc(r.email)}</td>
        <td>${esc(r.phone)}</td>
        <td>${esc(r.specialization)}</td>
        <td>${r.years_experience} yr${r.years_experience !== 1 ? 's' : ''}</td>
        <td title="${esc(r.certifications)}">${truncate(esc(r.certifications || ''), 30) || '—'}</td>
        <td>${techStatusSelect(r.id, r.status)}</td>
        <td>${formatDate(r.created_at)}</td>
      </tr>
    `).join('');

    return data;
  } catch {
    tbody.innerHTML = '<tr><td colspan="9" class="table-empty">Error loading data.</td></tr>';
    return [];
  }
}

// ===== Load Stats for Overview =====
async function loadStats() {
  const [services, technicians] = await Promise.all([
    fetch(`${API_BASE}/services`).then((r) => r.json()).catch(() => []),
    fetch(`${API_BASE}/technicians`).then((r) => r.json()).catch(() => []),
  ]);

  document.getElementById('stat-total-requests').textContent = services.length;
  document.getElementById('stat-pending-requests').textContent = services.filter((s) => s.status === 'pending').length;
  document.getElementById('stat-completed-requests').textContent = services.filter((s) => s.status === 'completed').length;
  document.getElementById('stat-total-applications').textContent = technicians.length;
  document.getElementById('stat-accepted-applications').textContent = technicians.filter((t) => t.status === 'accepted').length;
}

// ===== Refresh Buttons =====
document.getElementById('refreshServices').addEventListener('click', loadServices);
document.getElementById('refreshTechnicians').addEventListener('click', loadTechnicians);

// ===== Initial Load =====
loadStats();
loadServices();
loadTechnicians();

// Auto-refresh stats every 30 seconds
setInterval(loadStats, 30000);
