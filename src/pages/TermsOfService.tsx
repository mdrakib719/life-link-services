import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        <strong>Effective Date:</strong> [18th October 2025]
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or using our Service, you agree to be bound by these
          Terms. If you do not agree, do not use our Service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
        <p>
          You must be at least 18 years old (or the age of majority in your
          jurisdiction) to use our Service. By using the Service, you represent
          and warrant that you meet these requirements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. User Accounts</h2>
        <p>
          You may be required to create an account. You agree to provide
          accurate information and to keep it up-to-date. You are responsible
          for maintaining the confidentiality of your account and password.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Use of the Service</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Do not use the Service for any unlawful purpose.</li>
          <li>Do not access or tamper with non-public areas of the Service.</li>
          <li>Do not interfere with or disrupt the Service or its servers.</li>
          <li>Comply with all applicable laws and regulations.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Payments and Refunds</h2>
        <p>
          You agree to provide accurate billing information. All payments are
          non-refundable unless otherwise specified.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
        <p>
          All content, logos, and trademarks on the Service are our property or
          licensed to us. You may not copy, modify, or distribute them without
          permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access at any time
          if you violate these Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          8. Disclaimer of Warranties
        </h2>
        <p>
          The Service is provided "as is". We make no warranties about its
          reliability or availability.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          9. Limitation of Liability
        </h2>
        <p>
          We are not liable for any indirect, incidental, or consequential
          damages arising from your use of the Service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">10. Changes to Terms</h2>
        <p>
          We may update these Terms at any time. Updates will be posted with an
          updated effective date.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">11. Governing Law</h2>
        <p>These Terms are governed by the laws of [Your Jurisdiction].</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">12. Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at [Your
          Contact Info].
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
