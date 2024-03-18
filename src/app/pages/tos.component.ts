import { Component } from '@angular/core';

@Component({
  selector: 'app-tos',
  standalone: true,
  imports: [],
  template: `
    <main class="my-20">
    <div class="container mx-auto">
      <h1 class="text-3xl font-semibold text-center">Terms of Service</h1>
      <section class="mt-6  p-4">
        <h2 class="text-xl font-semibold">1. Introduction</h2>
        <p class="mt-2 ">
          Welcome to StarterkitHub! These Terms of Service ("Terms") , governed by Ajit Singh, oversee your use of StarterkitHub's
          services, including our content, and any software provided on or in connection with the services
          (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms and our
          Privacy Policy.
        </p>

        <h2 class="mt-6 text-xl font-semibold">2. Account Registration</h2>
        <p class="mt-2 ">
          You may need to create ab account to access some features of our Service. You must provide accurate and
          complete information and keep your account information updated. You are responsible for maintaining the
          confidentiality of your account and password.
        </p>

        <h2 class="mt-6 text-xl font-semibold">3. Prohibited Activities</h2>
        <p class="mt-2 ">
          In using our Service, you must not: violate any laws, infringe upon any third-party rights, distribute malware
          or harmful code, send unsolicited communications, or engage in any deceptive or unethical practices.
        </p>

        <h2 class="mt-6 text-xl font-semibold">4. Intellectual Property Rights</h2>
        <p class="mt-2 ">
          All intellectual property rights in the Service, including design, text, graphics, and other content, belong
          to StarterkitHub or its licensors. Your use of the Service does not grant you any rights to our intellectual
          property except for the limited rights of use granted under these Terms.
        </p>

        <h2 class="mt-6 text-xl font-semibold">5. User Content</h2>
        <p class="mt-2 ">
          Our Service may allow you to post or upload content. You retain all rights to any content you submit, post, or
          display on or through the Service but grant us a license to use, modify, publicly perform, publicly display,
          reproduce, and distribute such content.
        </p>

        <h2 class="mt-6 text-xl font-semibold">6. Termination</h2>
        <p class="mt-2 ">
          We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any
          reason, including without limitation if you breach the Terms. Upon termination, your right to use the Service
          will immediately cease.
        </p>

        <h2 class="mt-6 text-xl font-semibold">7. Disclaimer and Limitation of Liability</h2>
        <p class="mt-2 ">
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. StarterkitHub makes no representations or warranties
          of any kind, express or implied, as to the operation of their services, or the information, content, or
          materials included therein. You expressly agree that your use of the Service is at your sole risk.
        </p>

        <h2 class="mt-6 text-xl font-semibold">8. Governing Law</h2>
        <p class="mt-2 ">
          These Terms shall be governed by the laws of the country where StarterkitHub is headquartered, without regard to its
          conflict of law provisions.
        </p>

        <h2 class="mt-6 text-xl font-semibold">9. Changes to Terms</h2>
        <p class="mt-2 ">
          We reserve the right to modify or replace these Terms at any time in our sole discretion. Your continued use
          of the Service after any changes indicates your acceptance of the new Terms.
        </p>

        <h2 class="mt-6 text-xl font-semibold">10. Contact Information</h2>
        <p class="mt-2 ">
          If you have any questions about these Terms, please contact us at <a
            href="mailto:help@aicygnus.com">{{"help@aicygnus.com"}}</a>.
        </p>
      </section>
    </div>
  </main>
  `,
  styles: ``
})
export class TosComponent {

}
