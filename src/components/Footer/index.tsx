import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-sm bg-white/5 border-t border-black/10">
      <div className="w-full px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-black hover:text-yellow-200 transition-colors duration-200">
              Resumex
            </Link>
            <p className="text-black/70 mt-2 text-sm max-w-md">
              Build professional resumes that get you hired. Join thousands who&apos;ve transformed their careers with our industry-leading templates.
            </p>
          </div>

          <div className="flex col-span-2">
            <div className="flex-1">
              <h3 className="text-black font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-black/70 hover:text-black transition-colors duration-200 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="text-black/70 hover:text-black transition-colors duration-200 text-sm">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-black/70 hover:text-black transition-colors duration-200 text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-black/70 hover:text-black transition-colors duration-200 text-sm">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex-1">
              <h3 className="text-black font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-black/70 hover:text-black transition-colors duration-200 text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-black/70 hover:text-black transition-colors duration-200 text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-black/70 hover:text-black transition-colors duration-200 text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-black/70 hover:text-black transition-colors duration-200 text-sm">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black/60 text-sm">© 2025 Resumex. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-black/60 hover:text-black/80 transition-colors duration-200 text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-black/60 hover:text-black/80 transition-colors duration-200 text-sm">
              Terms
            </Link>
            <Link href="/contact" className="text-black/60 hover:text-black/80 transition-colors duration-200 text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
