/**
 * Submit form data to /api/contact and show result.
 * If the form has a `data-redirect` attribute, redirect on success.
 * Otherwise, show `successEl`.
 *
 * @param {HTMLFormElement} form
 * @param {HTMLElement} successEl
 */
export function initContactForm(form, successEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {};
    const inputs = form.querySelectorAll("input, textarea");
    for (const el of inputs) {
      const name = el.placeholder || el.name || el.type;
      if (el.value.trim()) {
        data[name] = el.value.trim();
      }
    }

    // Detect which page the form is on
    const path = window.location.pathname;
    data["Page"] = path;

    const redirectTo = form.dataset.redirect;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        if (redirectTo) {
          window.location.href = redirectTo;
        } else {
          successEl.hidden = false;
          form.reset();
        }
      } else {
        alert("Send failed. Please email us directly at mark@qixinghv.com");
      }
    } catch {
      alert("Network error. Please email us directly at mark@qixinghv.com");
    }
  });
}
