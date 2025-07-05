import Link from "next/link";

interface FooterProps {
  variant?: 'light' | 'dark';
}

const Footer = ({ variant = 'light' }: FooterProps) => {
  const isDark = variant === 'dark';
  
  return (
    <footer className={`w-full backdrop-blur-sm ${isDark ? 'bg-white/10 border-t border-white/10' : 'bg-white/5 border-t border-black/10'}`}>
      <div className="w-full px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className={`text-2xl font-bold transition-colors duration-200 ${isDark ? 'text-white hover:text-yellow-200' : 'text-black hover:text-yellow-200'}`}>
              Resumex
            </Link>
            <p className={`mt-2 text-sm max-w-md ${isDark ? 'text-white/70' : 'text-black/70'}`}>
              Build professional resumes that get you hired. Join thousands who&apos;ve transformed their careers with our industry-leading templates.
            </p>
          </div>

          <div className="flex col-span-2">
            <div className="flex-1">
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex-1">
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`mt-8 pt-6 flex flex-col md:flex-row justify-between items-center ${isDark ? 'border-t border-white/10' : 'border-t border-black/10'}`}>
          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>© 2025 Resumex. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/60 hover:text-white/80' : 'text-black/60 hover:text-black/80'}`}>
              Privacy
            </Link>
            <Link href="/terms" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/60 hover:text-white/80' : 'text-black/60 hover:text-black/80'}`}>
              Terms
            </Link>
            <Link href="/contact" className={`transition-colors duration-200 text-sm ${isDark ? 'text-white/60 hover:text-white/80' : 'text-black/60 hover:text-black/80'}`}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
