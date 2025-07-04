"use client";

import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Templates', href: '/templates' },
  { name: 'Pricing', href: '/pricing' },
];

const Header = () => {
  return (
    <Disclosure as="header" className="w-full backdrop-blur-sm bg-white/5 border-b border-white/10">
      {({ open }) => (
        <>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-white hover:text-yellow-200 transition-colors duration-200">
                  Resumex
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Desktop Auth Links */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Disclosure.Button className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden bg-white/10 backdrop-blur-md border-b border-white/10">
            <div className="px-6 py-4 space-y-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <hr className="border-white/20 my-2" />
              <Disclosure.Button
                as={Link}
                href="/login"
                className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
              >
                Sign In
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/register"
                className="block px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all duration-200 text-center"
              >
                Get Started
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
