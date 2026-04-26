import React from 'react';

export default function Terms() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="max-w-none space-y-8 text-[#1D1D1F]">
        <p className="text-lg font-medium text-[#86868B]">Effective Date: April 26, 2026</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1D1D1F]">1. Agreement to Terms</h2>
          <p className="leading-relaxed text-[#424245]">
            By accessing or using ClearCut, you agree to be bound by these Terms of Service. If you do not agree 
            to these terms, please do not use the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1D1D1F]">2. Use of Service</h2>
          <p className="leading-relaxed text-[#424245]">
            ClearCut is a free tool provided "as is". You are free to use the tool for personal or commercial 
            purposes. You are responsible for ensuring you have the legal rights to the images you process 
            using this tool.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1D1D1F]">3. Intellectual Property</h2>
          <p className="leading-relaxed text-[#424245]">
            You retain all ownership rights to the images you process. ClearCut claims no ownership over any 
            content you use with our service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">4. Prohibited Uses</h2>
          <p>
            You agree not to use the service for any illegal purposes or to infringe upon the rights of others. 
            You may not attempt to reverse engineer or disrupt the operation of the website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">5. Limitation of Liability</h2>
          <p>
            ClearCut Labs shall not be liable for any indirect, incidental, or consequential damages resulting 
            from the use or inability to use our service. We provide the service without any warranties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the service after 
            any changes constitutes acceptance of the new terms.
          </p>
        </section>
      </div>
    </div>
  );
}
