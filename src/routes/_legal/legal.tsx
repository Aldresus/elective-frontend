import { H1, Large } from "@/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_legal/legal")({
  component: Legal,
});

function Legal() {
  return (
    <div className="h-full space-y-4">
      <H1 className="mb-9">Termes et conditions d'utilisation</H1>
      <section>
        <Large>Introduction</Large>
        <p>
          Les présentes conditions générales régissent l'utilisation de notre
          site web et de nos services. En accédant à notre site ou en utilisant
          nos services, vous acceptez d'être lié par ces termes et conditions.
        </p>
      </section>

      <section>
        <Large>Utilisation du site</Large>
        <p>
          Vous êtes autorisé à utiliser notre site web uniquement à des fins
          légales et conformément aux présentes conditions générales. Vous vous
          engagez à ne pas utiliser notre site à des fins illégales ou abusives.
        </p>
      </section>

      <section>
        <Large>Propriété intellectuelle</Large>
        <p>
          Tout le contenu présent sur notre site web, y compris les textes,
          images, logos et autres éléments, est protégé par les lois sur la
          propriété intellectuelle. Vous n'êtes pas autorisé à reproduire,
          distribuer ou modifier ce contenu sans notre autorisation écrite
          préalable.
        </p>
      </section>

      <section>
        <Large>Liens vers d'autres sites</Large>
        <p>
          Notre site web peut contenir des liens vers d'autres sites internet.
          Nous n'assumons aucune responsabilité quant au contenu de ces sites
          tiers ou à leur utilisation.
        </p>
      </section>

      <section>
        <Large>Limitation de responsabilité</Large>
        <p>
          Nous ne sommes pas responsables des dommages directs, indirects,
          accessoires ou consécutifs résultant de l'utilisation de notre site
          web ou de nos services.
        </p>
      </section>

      <section>
        <Large>Modifications des conditions</Large>
        <p>
          Nous nous réservons le droit de modifier ces conditions générales à
          tout moment. Les modifications entreront en vigueur dès leur
          publication sur notre site web.
        </p>
      </section>

      <section>
        <Large>Loi applicable</Large>
        <p>
          Ces conditions générales sont régies par les lois en vigueur dans
          notre pays. Tout litige sera soumis à la juridiction compétente de
          notre pays.
        </p>
      </section>
    </div>
  );
}
