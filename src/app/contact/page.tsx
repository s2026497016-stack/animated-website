export default function ContactPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <form className="space-y-4 rounded-xl border border-white/10 bg-[#171717] p-6">
        <h1 className="text-3xl font-bold">Contact THRIFTEE</h1>
        <label className="block text-sm">
          <span className="mb-1 block text-zinc-300">Name</span>
          <input className="w-full rounded-md border border-white/20 bg-[#111111] px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-zinc-300">Email</span>
          <input type="email" className="w-full rounded-md border border-white/20 bg-[#111111] px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-zinc-300">Message</span>
          <textarea rows={4} className="w-full rounded-md border border-white/20 bg-[#111111] px-3 py-2" />
        </label>
        <button className="rounded-md bg-[#e8d9b8] px-5 py-2 font-semibold text-black">Send Message</button>
      </form>

      <aside className="space-y-4 rounded-xl border border-white/10 bg-[#171717] p-6 text-zinc-300">
        <h2 className="text-xl font-semibold text-white">Direct Contacts</h2>
        <a href="https://wa.me/923376430990" target="_blank" rel="noreferrer" className="block hover:text-white">
          WhatsApp: +92 337 643 0990
        </a>
        <a
          href="https://instagram.com/thriftee.wear"
          target="_blank"
          rel="noreferrer"
          className="block hover:text-white"
        >
          Instagram: @thriftee.wear
        </a>
        <a href="mailto:thriftee.wear2026@gmail.com" className="block hover:text-white">
          Email: thriftee.wear2026@gmail.com
        </a>
      </aside>
    </div>
  );
}
