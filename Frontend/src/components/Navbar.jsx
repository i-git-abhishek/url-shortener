import { Link as RouterLink } from '@tanstack/react-router';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'About', to: '/about' },
];

function Navbar() {
  return (
    <header className="border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <RouterLink
          to="/"
          className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text px-3 py-2 text-lg font-semibold tracking-wide text-transparent transition hover:opacity-90"
        >
          URL Shortener
        </RouterLink>

        <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
          {navLinks.map((link) => (
            <RouterLink
              key={link.to}
              to={link.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition duration-200 hover:bg-slate-800 hover:text-white"
              activeProps={{
                className:
                  'rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-slate-700',
              }}
            >
              {link.label}
            </RouterLink>
          ))}
        </div>

        <RouterLink
          to="/auth"
          className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-400/30"
        >
          Login
        </RouterLink>
      </nav>
    </header>
  );
}

export default Navbar;