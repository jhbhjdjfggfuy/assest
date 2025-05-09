import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-24 bg-gradient-to-b from-primary to-primary/90 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-5xl md:text-7xl mb-8 font-bold animate-fade-in">
              Secure Trades. Trusted Deals.
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Trade properties, cars, and other assets with confidence on our secure platform.
            </p>
            <div className="space-x-4">
              <Link 
                href="/auth/register" 
                className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-accent hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Get Started
              </Link>
              <Link 
                href="/listings" 
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Browse Listings
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-4xl md:text-5xl text-center mb-16 text-gray-800">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-heading text-2xl mb-4 text-gray-800">List Your Property</h3>
                <p className="text-gray-600 leading-relaxed">
                  Add your property details, photos, and set your trade preferences with our easy-to-use listing system.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-heading text-2xl mb-4 text-gray-800">Find Matches</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse listings and find properties that match your interests using our smart matching system.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-heading text-2xl mb-4 text-gray-800">Secure Trading</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete trades safely with our secure verification system and escrow service.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">About Us</h4>
              <p className="text-gray-400">
                Your trusted platform for secure asset trading and property exchanges.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/listings" className="text-gray-400 hover:text-white transition-colors">Browse Listings</Link></li>
                <li><Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Asset Trading Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}