import * as functions from 'firebase-functions';
  import * as admin from 'firebase-admin';
  import fetch from 'node-fetch';
  import nodemailer from 'nodemailer';

  admin.initializeApp();
  const db = admin.firestore();

  const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || '';
  const SMTP_HOST = process.env.SMTP_HOST || '';
  const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
  const SMTP_SECURE = (process.env.SMTP_SECURE || 'true') === 'true';
  const SMTP_USER = process.env.SMTP_USER || '';
  const SMTP_PASS = process.env.SMTP_PASS || '';
  const NOTIFY_TO = process.env.NOTIFY_TO || 'ops@example.com';
  const NOTIFY_FROM = process.env.NOTIFY_FROM || 'Website <no-reply@example.com>';

  const transporter = SMTP_HOST ? nodemailer.createTransport({
    host: SMTP_HOST, port: SMTP_PORT, secure: SMTP_SECURE,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
  }) : null;

  export const submitContact = functions
    .region('asia-southeast1')
    .https.onRequest(async (req, res) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      if (req.method === 'OPTIONS') return res.status(204).send('');

      if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

      try {
        const { name, email, phone, branch, message, recaptchaToken } = req.body || {};
        if (!name || !message) return res.status(400).json({ error: 'Missing required fields' });

        // Verify reCAPTCHA if secret provided
        if (RECAPTCHA_SECRET) {
          const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: recaptchaToken || '' })
          });
          const vr = await verify.json();
          if (!vr.success) return res.status(400).json({ error: 'reCAPTCHA failed' });
        }

        const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString();
        const lead = {
          name, email: email || null, phone: phone || null, branch: branch || null, message,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          ipHash: await admin.firestore().collection('util').doc('_').id // dummy; replace with hash if needed
        };

        await db.collection('leads').add(lead);

        // Send notification email (optional SMTP)
        if (transporter) {
          await transporter.sendMail({
            from: NOTIFY_FROM,
            to: NOTIFY_TO,
            subject: `[Conor] New Contact Lead — ${name}`,
            text: `Name: ${name}
Email: ${email || '-'}
Phone: ${phone || '-'}
Branch: ${branch || '-'}

${message}`
          });
        }

        return res.status(200).json({ ok: true });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal error' });
      }
    });
