import React from 'react';

export default function Privacy() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="max-w-none space-y-8 text-[#1D1D1F]">
        <p className="text-lg font-medium text-[#86868B]">Last Updated: April 26, 2026</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1D1D1F]">1. Our Commitment to Privacy</h2>
          <p className="leading-relaxed text-[#424245]">
            ClearCut is designed with privacy as its core principle. Unlike traditional online photo editors, 
            ClearCut does not use server-side processing for background removal. This means your images are 
            <strong className="text-[#1D1D1F]"> never uploaded to our servers</strong>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1D1D1F]">2. Local Browser Processing</h2>
          <p className="leading-relaxed text-[#424245]">
            Background removal is performed entirely within your web browser using WebAssembly (WASM) and client-side 
            scripts. All image data remains in your device's memory and is discarded once the tab is closed or 
            the image is cleared.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1D1D1F]">3. Data Collection</h2>
          <div className="space-y-4 leading-relaxed text-[#424245]">
            <p><strong className="text-[#1D1D1F]">No Personal Data:</strong> We do not collect names, email addresses, or any personal identification details.</p>
            <p><strong className="text-[#1D1D1F]">No Image Storage:</strong> We do not store, view, or share the images you process.</p>
            <p><strong className="text-[#1D1D1F]">Analytics:</strong> We may collect anonymous usage statistics (e.g., number of visitors) to improve the performance of our website. This data is aggregated and does not identify individuals.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">4. Third Parties</h2>
          <p>
            Since no data is sent to us, we have no data to sell or share with third parties, advertisers, or AI training labs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">5. Contact Us</h2>
          <p>
            If you have any questions about this privacy statement, you can contact us at privacy@removethebackground.fun.
          </p>
        </section>
      </div>
    </div>
  );
}
