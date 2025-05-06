import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg text-gray-800">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b pb-2">
        Privacy Policy
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Effective Date: [14th July 2003]
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          1. Introduction
        </h2>
        <p>
          We value your privacy and are committed to protecting your personal
          information. This Privacy Policy outlines how we collect, use, and
          safeguard your data when you use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          2. Information We Collect
        </h2>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Personal Information: Name, email address, phone number, etc.</li>
          <li>
            Usage Data: Pages visited, time spent on pages, click behavior.
          </li>
          <li>
            Device & Browser Data: IP address, operating system, browser type.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          3. How We Use Your Information
        </h2>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Provide and improve our services</li>
          <li>Personalize your user experience</li>
          <li>Send important updates and communications</li>
          <li>Analyze user trends and behavior</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          4. Cookies and Tracking
        </h2>
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience, remember your preferences, and analyze website traffic.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          5. How We Share Your Information
        </h2>
        <p>We do not sell your data. We may share your information with:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            Trusted service providers who assist in operating our services
          </li>
          <li>Law enforcement when legally required</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          6. Data Security
        </h2>
        <p>
          We implement appropriate technical and organizational security
          measures to protect your personal data from unauthorized access, loss,
          or misuse.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          7. Your Rights
        </h2>
        <p>
          You have the right to access, correct, or delete your personal data.
          To exercise these rights, contact us at [Insert Contact Email].
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          8. Children's Privacy
        </h2>
        <p>
          Our services are not intended for children under 13. We do not
          knowingly collect data from children.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          9. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with a revised effective date.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          10. Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-500 underline"
          >
            support@example.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
