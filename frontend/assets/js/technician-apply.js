const API_BASE = '/api';

const form = document.getElementById('technicianForm');
const alertEl = document.getElementById('alert');
const submitBtn = document.getElementById('submitBtn');

function showAlert(type, message) {
  alertEl.className = `alert alert-${type} show`;
  alertEl.textContent = message;
  alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setLoading(loading) {
  submitBtn.disabled = loading;
  submitBtn.innerHTML = loading
    ? '<span class="spinner"></span> Submitting…'
    : 'Submit Application';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    full_name:        form.full_name.value.trim(),
    email:            form.email.value.trim(),
    phone:            form.phone.value.trim(),
    specialization:   form.specialization.value,
    years_experience: form.years_experience.value,
    certifications:   form.certifications.value.trim() || undefined,
    cover_letter:     form.cover_letter.value.trim(),
  };

  // Client-side validation
  if (!data.full_name || !data.email || !data.phone || !data.specialization || !data.years_experience || !data.cover_letter) {
    showAlert('error', 'Please fill in all required fields.');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/technicians`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      showAlert('error', json.error || 'Something went wrong. Please try again.');
      return;
    }

    showAlert('success', `✅ Your application has been submitted! Reference ID: #${json.id}. We'll review it and get back to you.`);
    form.reset();
  } catch {
    showAlert('error', 'Unable to connect to the server. Please try again later.');
  } finally {
    setLoading(false);
  }
});
