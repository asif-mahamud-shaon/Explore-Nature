import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Minimal no-op submit
      setStatus('Thanks! We will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="input" placeholder="Your Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <textarea className="input h-36" placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
      <div className="flex items-center gap-3">
        <button type="submit" className="btn-primary">Send Message</button>
        {status && <span className="text-sand-600 dark:text-sand-400">{status}</span>}
      </div>
    </form>
  );
};

export default ContactForm;



