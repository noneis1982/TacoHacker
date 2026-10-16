import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy Policy - TacoHacker",
  description: "How TacoHacker handles your data, cookies, and advertising.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl px-4 py-10 flex-1">
      <h1 className="text-3xl font-extrabold gradient-text tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-zinc-400">Last updated: October 14, 2026</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-zinc-600">
        <section>
          <p>
            TacoHacker (&quot;we&quot;, &quot;us&quot;) is a free tool that helps
            you find the cheapest way to build a Taco Bell order using menu
            hacks. This policy explains what information we collect and how it is
            used.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-800">
            Information we collect
          </h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              <strong>Location input.</strong> When you enter a ZIP code, we use
              it to look up nearby Taco Bell stores and menus. We do not store it
              with any personal identifier.
            </li>
            <li>
              <strong>Usage data.</strong> We collect anonymous, aggregated usage
              events (for example, that a store search was submitted) to
              understand how the app is used and improve it.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-800">Cookies</h2>
          <p className="mt-2">
            TacoHacker and its partners may use cookies and similar technologies
            to operate the site, measure usage, and (where enabled) serve
            advertising.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-800">
            Advertising &amp; Google AdSense
          </h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              Third-party vendors, including Google, use cookies to serve ads
              based on a user&apos;s prior visits to this and other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its
              partners to serve ads to you based on your visit to this site
              and/or other sites on the Internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="text-purple-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              . You can also opt out of some third-party vendors&apos; use of
              cookies for personalized advertising at{" "}
              <a
                href="https://www.aboutads.info/choices/"
                className="text-purple-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                aboutads.info
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-800">Third-party data</h2>
          <p className="mt-2">
            Menu and store information is retrieved from Taco Bell. TacoHacker is
            not affiliated with, endorsed by, or sponsored by Taco Bell. Prices
            and availability may differ from the actual restaurant.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-800">
            Children&apos;s privacy
          </h2>
          <p className="mt-2">
            TacoHacker is not directed to children under 13 and does not
            knowingly collect personal information from them.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-800">
            Changes to this policy
          </h2>
          <p className="mt-2">
            We may update this policy from time to time. Changes will be posted
            on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-800">Contact</h2>
          <p className="mt-2">
            Questions? Email{" "}
            <a
              href="mailto:contact@tacohacker.com"
              className="text-purple-600 hover:underline"
            >
              contact@tacohacker.com
            </a>
            .
          </p>
        </section>
      </div>
      </main>
    </>
  );
}
