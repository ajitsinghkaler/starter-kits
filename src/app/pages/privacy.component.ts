import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  template: `
    <main class="my-20">
      <div class="container mx-auto">
        <h1 class="text-3xl font-semibold text-center">Privacy Policy</h1>
        <section class="mt-6 p-4">
          <h2 class="text-xl font-semibold">1. Introduction</h2>
          <p class="mt-2">
            At [name], managed by Ajit Singh, we are committed to protecting
            your privacy. This Privacy Policy outlines the types of personal
            information we collect, how we use, share, and protect that
            information, and your rights regarding your personal information.
          </p>

          <h2 class="mt-6 text-xl font-semibold">
            2. Information Collection and Use
          </h2>
          <p class="mt-2">
            We collect information you provide directly to us when you use our
            services, create an account, participate in any interactive
            features, or communicate with us. This information may include your
            name, email address, and any other information you choose to
            provide.
          </p>

          <h2 class="mt-6 text-xl font-semibold">
            3. Information We Collect Automatically
          </h2>
          <p class="mt-2">
            When you access or use our services, we automatically collect
            certain information, including but not limited to, log information,
            device information, and usage data.
          </p>

          <h2 class="mt-6 text-xl font-semibold">
            4. Cookies and Tracking Technologies
          </h2>
          <p class="mt-2">
            We use cookies and similar tracking technologies to collect
            information about your interactions with our website and services,
            as well as to analyze trends and administer the site.
          </p>

          <h2 class="mt-6 text-xl font-semibold">5. Use of Information</h2>
          <p class="mt-2">
            We use the information we collect to provide, maintain, and improve
            our services, to communicate with you, to monitor and analyze trends
            and usage, and for other business purposes.
          </p>

          <h2 class="mt-6 text-xl font-semibold">6. Sharing of Information</h2>
          <p class="mt-2">
            We may share your information with third parties in certain
            circumstances, including to comply with legal requirements, to
            protect our rights and those of others, and with your consent.
          </p>

          <h2 class="mt-6 text-xl font-semibold">7. Data Security</h2>
          <p class="mt-2">
            We take reasonable measures to protect your personal information
            from loss, theft, misuse, and unauthorized access, disclosure,
            alteration, and destruction.
          </p>

          <h2 class="mt-6 text-xl font-semibold">8. Your Privacy Rights</h2>
          <p class="mt-2">
            Depending on your location, you may have certain rights regarding
            your personal information, such as the right to access, update, or
            delete the information we have on you.
          </p>

          <h2 class="mt-6 text-xl font-semibold">
            9. Changes to Our Privacy Policy
          </h2>
          <p class="mt-2">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2 class="mt-6 text-xl font-semibold">10. Contact Us</h2>
          <p class="mt-2">
            If you have any questions about this Privacy Policy, please contact
            us at
            <a href="mailto:help@aicygnus.com">{{ 'help@aicygnus.com' }}</a
            >.
          </p>
        </section>
      </div>
    </main>
  `,
  styles: ``,
})
export class PrivacyComponent {}
