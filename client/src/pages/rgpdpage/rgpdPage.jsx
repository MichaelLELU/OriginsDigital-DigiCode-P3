import { Scale, Cookie, PenLine, FolderClosed } from "lucide-react";
import { useEffect } from "react";
import setPageTitle from "../../utils/setPageTitle";

export default function RgpdPage() {
  useEffect(() => {
    setPageTitle("RGPD");
  });

  return (
    <>
      <h1> RGPD</h1>
      <section>
        <h2> Origins Digital Privacy Policy. </h2>
        <h3>
          In accordance with article 6 of law n° 2004-575 du 21 juin 2004{" "}
          <Scale color="#1FD360" strokeWidth={1.75} />
        </h3>
        <p>
          Last updated: [23/07/2024] This Privacy Policy describes how Origins
          Digital (the "Site", "we", "us", or "our") collects, uses, and
          discloses your personal information when you visit, use our services,
          or make a purchase from "Origins Digital" (the "Site") or otherwise
          communicate with us (collectively, the "Services"). For purposes of
          this Privacy Policy, "you" and "your" means you as the user of the
          Services, whether you are a customer, website visitor, or another
          individual whose information we have collected pursuant to this
          Privacy Policy. Please read this Privacy Policy carefully. By using
          and accessing any of the Services, you agree to the collection, use,
          and disclosure of your information as described in this Privacy
          Policy. If you do not agree to this Privacy Policy, please do not use
          or access any of the Services. Changes to This Privacy Policy We may
          update this Privacy Policy from time to time, including to reflect
          changes to our practices or for other operational, legal, or
          regulatory reasons. We will post the revised Privacy Policy on the
          Site, update the "Last updated" date and take any other steps required
          by applicable law.
        </p>

        <h3>
          How We Collect and Use Your Personal Information{" "}
          <PenLine color="#1FD360" strokeWidth={1.75} />
        </h3>
        <p>
          To provide the Services, we collect and have collected over the past
          12 months personal information about you from a variety of sources, as
          set out below. The information that we collect and use varies
          depending on how you interact with us. In addition to the specific
          uses set out below, we may use information we collect about you to
          communicate with you, provide the Services, comply with any applicable
          legal obligations, enforce any applicable terms of service, and to
          protect or defend the Services, our rights, and the rights of our
          users or others.
        </p>

        <h3>
          What Personal Information We Collect{" "}
          <FolderClosed color="#1FD360" strokeWidth={1.75} />
        </h3>

        <p>
          Basic contact details including your name and email. - Order
          information including your name, billing address, shipping address,
          payment confirmation, email address, phone number. - Account
          information including your username, password, security questions. -
          Shopping information including the items you view, put in your cart or
          add to your wishlist. Some features of the Services may require you to
          directly provide us with certain information about yourself. You may
          elect not to provide this information, but doing so may prevent you
          from using or accessing certain features
        </p>
        <h3>
          Cookies <Cookie color="#1FD360" strokeWidth={1.75} />
        </h3>
        <p>
          Like many websites, we use Cookies on our Site. Most browsers
          automatically accept Cookies by default, but you can choose to set
          your browser to remove or reject Cookies through your browser
          controls. Please keep in mind that removing or blocking Cookies can
          negatively impact your user experience and may cause some of the
          Services, including certain features and general functionality, to
          work incorrectly or no longer be available. Additionally, blocking
          Cookies may not completely prevent how we share information with third
          parties such as our advertising partners.
        </p>
      </section>
    </>
  );
}
