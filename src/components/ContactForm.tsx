import React, { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'pending'|'success'|'error'>('idle');
  const [msg, setMsg] = useState<string>('');
  const functionsUrl = import.meta.env.PUBLIC_FUNCTIONS_URL;
  const siteKey = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!functionsUrl) { setStatus('error'); setMsg('Functions URL is not configured.'); return; }
    setStatus('pending');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      branch: data.get('branch'),
      message: data.get('message'),
      recaptchaToken: (window as any).grecaptcha ? await (window as any).grecaptcha.execute(siteKey, { action: 'submit' }) : ''
    };

    try {
      const res = await fetch(`${functionsUrl}/submitContact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMsg('Request failed. Please try again later.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input id="name" name="name" required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
          <input id="phone" name="phone" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
        </div>
      </div>
      <div>
        <label htmlFor="branch" className="block text-sm font-medium">Branch (optional)</label>
        <input id="branch" name="branch" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea id="message" name="message" required rows={5} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"></textarea>
      </div>
      <button type="submit" className="btn btn-primary" disabled={status==='pending'}>
        {status==='pending' ? 'Sending…' : 'Send Message'}
      </button>
      {status==='success' && <p className="text-green-700">Thanks! We’ve received your message.</p>}
      {status==='error' && <p className="text-red-700">{msg}</p>}
      {/* reCAPTCHA v3 script (optional) */}
      {siteKey && <script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}></script>}
    </form>
  );
}
