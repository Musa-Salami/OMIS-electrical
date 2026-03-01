const API_BASE = '/api';

const form = document.getElementById('serviceForm');
const alert = document.getElementById('alert');
const submitBtn = document.getElementById('submitBtn');

function showAlert(type, message) {
  alert.className = `alert alert-${type} show`;
  alert.textContent = message;
  alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setLoading(loading) {
  submitBtn.disabled = loading;
  submitBtn.innerHTML = loading
    ? '<span class="spinner"></span> Submitting…'
    : 'Submit Request';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    full_name:    form.full_name.value.trim(),
    email:        form.email.value.trim(),
    phone:        form.phone.value.trim(),
    address:      form.address.value.trim(),
    service_type: form.service_type.value,
    description:  form.description.value.trim(),
  };

  // Client-side validation
  if (!data.full_name || !data.email || !data.phone || !data.address || !data.service_type || !data.description) {
    showAlert('error', 'Please fill in all required fields.');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      showAlert('error', json.error || 'Something went wrong. Please try again.');
      return;
    }

    showAlert('success', `✅ Your service request has been submitted! Reference ID: #${json.id}. We'll contact you soon.`);
    form.reset();
  } catch {
    showAlert('error', 'Unable to connect to the server. Please try again later.');
  } finally {
    setLoading(false);
  }
});
