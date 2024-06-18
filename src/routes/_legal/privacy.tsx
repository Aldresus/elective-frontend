import { H1, H2, H3, Large, Li, Ul } from "@/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_legal/privacy")({
  component: Privacy,
});

function Privacy() {
  return (
    <div className="h-full space-y-4">
      <H1 className="mb-9">Politique de confidentialité</H1>
      <div className="flex justify-start gap-2">
        <Large>cesieats.fr</Large>
        <Large>CESI Eats</Large>
      </div>

      <section>
        <H2>Le but de cette politique de confidentialité</H2>

        <p>
          Le but de cette politique de confidentialité est d'informer les
          utilisateurs de notre site des données personnelles que nous
          recueillerons ainsi que les informations suivantes, le cas échéant :
        </p>

        <Ul>
          <Li>Les données personnelles que nous recueillerons</Li>
          <Li>L'utilisation des données recueillies</Li>
          <Li>Qui a accès aux données recueillies</Li>
          <Li>Les droits des utilisateurs du site</Li>
          <Li>La politique de cookies du site</Li>
        </Ul>

        <p>
          Cette politique de confidentialité fonctionne parallèlement aux
          conditions générales d'utilisation de notre site.
        </p>
      </section>

      <section>
        <H2>Lois applicables</H2>

        <p>
          Conformément au Règlement général sur la protection des données
          (RGPD), cette politique de confidentialité est conforme aux règlements
          suivants.
        </p>

        <p>Les données à caractère personnel doivent être :</p>

        <Ul>
          <Li>
            traitées de manière licite, loyale et transparente au regard de la
            personne concernée (licéité, loyauté, transparence) ;
          </Li>
          <Li>
            collectées pour des finalités déterminées, explicites et légitimes,
            et ne pas être traitées ultérieurement d'une manière incompatible
            avec ces finalités; le traitement ultérieur à des fins
            archivistiques dans l'intérêt public, à des fins de recherche
            scientifique ou historique ou à des fins statistiques n'est pas
            considéré, conformément à l'article 89, paragraphe 1, comme
            incompatible avec les finalités initiales (limitation des finalités)
            ;
          </Li>
          <Li>
            adéquates, pertinentes et limitées à ce qui est nécessaire au regard
            des finalités pour lesquelles elles sont traitées (minimisation des
            données) ;
          </Li>
          <Li>
            exactes et, si nécessaire, tenues à jour; toutes les mesures
            raisonnables doivent être prises pour que les données à caractère
            personnel qui sont inexactes, eu égard aux finalités pour lesquelles
            elles sont traitées, soient effacées ou rectifiées sans tarder
            (exactitude) ;
          </Li>
          <Li>
            conservées sous une forme permettant l'identification des personnes
            concernées pendant une durée n'excédant pas celle nécessaire au
            regard des finalités pour lesquelles elles sont traitées; les
            données à caractère personnel peuvent être conservées pour des
            durées plus longues dans la mesure où elles seront traitées
            exclusivement à des fins archivistiques dans l'intérêt public, à des
            fins de recherche scientifique ou historique ou à des fins
            statistiques conformément à l'article 89, paragraphe 1, pour autant
            que soient mises en œuvre les mesures techniques et
            organisationnelles appropriées requises par le règlement afin de
            garantir les droits et libertés de la personne concernée (limitation
            de la conservation) ;
          </Li>
          <Li>
            traitées de façon à garantir une sécurité appropriée des données à
            caractère personnel, y compris la protection contre le traitement
            non autorisé ou illicite et contre la perte, la destruction ou les
            dégâts d'origine accidentelle, à l'aide de mesures techniques ou
            organisationnelles appropriées (intégrité et confidentialité).
          </Li>
        </Ul>

        <p>
          Le traitement n'est licite que si, et dans la mesure où, au moins une
          des conditions suivantes est remplie :
        </p>

        <Ul>
          <Li>
            la personne concernée a consenti au traitement de ses données à
            caractère personnel pour une ou plusieurs finalités spécifiques ;
          </Li>
          <Li>
            le traitement est nécessaire à l'exécution d'un contrat auquel la
            personne concernée est partie ou à l'exécution de mesures
            précontractuelles prises à la demande de celle-ci ;
          </Li>
          <Li>
            le traitement est nécessaire au respect d'une obligation légale à
            laquelle le responsable du traitement est soumis ;
          </Li>
          <Li>
            le traitement est nécessaire à la sauvegarde des intérêts vitaux de
            la personne concernée ou d'une autre personne physique ;
          </Li>
          <Li>
            le traitement est nécessaire à l'exécution d'une mission d'intérêt
            public ou relevant de l'exercice de l'autorité publique dont est
            investi le responsable du traitement ;
          </Li>
          <Li>
            le traitement est nécessaire aux fins des intérêts légitimes
            poursuivis par le responsable du traitement ou par un tiers, à moins
            que ne prévalent les intérêts ou les libertés et droits fondamentaux
            de la personne concernée qui exigent une protection des données à
            caractère personnel, notamment lorsque la personne concernée est un
            enfant.
          </Li>
        </Ul>
        <p>
          Pour les résidents de l'État de Californie, cette politique de
          confidentialité vise à se conformer à la California Consumer Privacy
          Act (CCPA). S'il y a des incohérences entre ce document et la CCPA, la
          législation de l'État s'appliquera. Si nous constatons des
          incohérences, nous modifierons notre politique pour nous conformer à
          la loi pertinente.
        </p>
      </section>

      <section>
        <H2>Consentement</H2>

        <p>
          Les utilisateurs conviennent qu'en utilisant notre site, ils
          consentent à :
        </p>

        <Ul>
          <Li>
            les conditions énoncées dans la présente politique de
            confidentialité et
          </Li>
          <Li>
            la collecte, l'utilisation et la conservation des données énumérées
            dans la présente politique.
          </Li>
        </Ul>
      </section>

      <section>
        <H2>Données personnelles que nous collectons</H2>

        <H3>Données collectées automatiquement</H3>

        <p>Nous ne collectons aucune donnée automatiquement sur notre site.</p>

        <H3>Données recueillies de façon non automatique</H3>

        <p>
          Nous pouvons également collecter les données suivantes lorsque vous
          effectuez certaines fonctions sur notre site :
        </p>

        <Ul>
          <Li>Prénom et nom</Li>
          <Li>Âge</Li>
          <Li>Date de naissance</Li>
          <Li>Sexe</Li>
          <Li>Email</Li>
          <Li>Numéro de téléphone</Li>
          <Li>Domicile</Li>
        </Ul>

        <p>
          Ces données peuvent être recueillies au moyen des méthodes suivantes :
        </p>

        <p>Enregistrement d'un compte</p>

        <p>
          Veuillez noter que nous ne collectons que les données qui nous aident
          à atteindre l'objectif énoncé dans cette politique de confidentialité.
          Nous ne recueillerons pas de données supplémentaires sans vous en
          informer au préalable.
        </p>
      </section>

      <section>
        <H2>Comment nous utilisons les données personnelles</H2>

        <p>
          Les données personnelles recueillies sur notre site seront utilisées
          uniquement aux fins précisées dans la présente politique ou indiquées
          sur les pages pertinentes de notre site. Nous n'utiliserons pas vos
          données au-delà de ce que nous divulguerons.
        </p>

        <p>
          Les données que nous recueillons lorsque l'utilisateur exécute
          certaines fonctions peuvent être utilisées aux fins suivantes :
        </p>

        <Ul>
          <Li>fonctionement du site</Li>
        </Ul>
      </section>

      <section>
        <H2>Avec qui nous partageons les données personnelles</H2>

        <H3>Employés</H3>

        <p>
          Nous pouvons divulguer à tout membre de notre organisation les données
          utilisateur dont il a raisonnablement besoin pour réaliser les
          objectifs énoncés dans la présente politique.
        </p>

        <H3>Tierces parties</H3>

        <p>
          Nous pouvons partager les données utilisateur avec les tiers suivants
          :
        </p>

        <p>
          Nous pouvons partager les données utilisateur avec des tiers aux fins
          suivantes :
        </p>

        <p>
          Les tiers ne seront pas en mesure d'accéder aux données des
          utilisateurs au-delà de ce qui est raisonnablement nécessaire pour
          atteindre l'objectif donné.
        </p>

        <H3>Autres divulgations</H3>

        <p>
          Nous nous engageons à ne pas vendre ou partager vos données avec des
          tiers, sauf dans les cas suivants :
        </p>

        <Ul>
          <Li>si la loi l'exige</Li>
          <Li>si elle est requise pour toute procédure judiciaire</Li>
          <Li>pour prouver ou protéger nos droits légaux</Li>
          <Li>
            à des acheteurs ou des acheteurs potentiels de cette société dans le
            cas où nous cherchons à la vendre la société
          </Li>
        </Ul>

        <p>
          Si vous suivez des hyperliens de notre site vers un autre site,
          veuillez noter que nous ne sommes pas responsables et n'avons pas de
          contrôle sur leurs politiques et pratiques de confidentialité.
        </p>
      </section>

      <section>
        <H2>Combien de temps nous stockons les données personnelles</H2>

        <p>
          Nous ne conservons pas les données des utilisateurs au-delà de ce qui
          est nécessaire pour atteindre les fins pour lesquelles elles sont
          recueillies.
        </p>
      </section>

      <section>
        <H2>Comment nous protégeons vos données personnelles</H2>

        <p>
          Afin d'assurer la protection de votre sécurité, nous utilisons le
          protocole de sécurité de la couche transport pour transmettre des
          renseignements personnels dans notre système.
        </p>

        <p>
          Toutes les données stockées dans notre système sont bien sécurisées et
          ne sont accessibles qu'à nos employés. Nos employés sont liés par des
          accords de confidentialité stricts et une violation de cet accord
          entraînerait le licenciement de l'employé.
        </p>

        <p>
          Alors que nous prenons toutes les précautions raisonnables pour nous
          assurer que nos données d'utilisateur sont sécurisées et que les
          utilisateurs sont protégés, il reste toujours du risque de préjudice.
          L'Internet en sa totalité peut être, parfois, peu sûr et donc nous
          sommes incapables de garantir la sécurité des données des utilisateurs
          au-delà de ce qui est raisonnablement pratique.
        </p>
      </section>

      <section>
        <H2>Mineurs</H2>

        <p>
          Le RGPD précise que les personnes de moins de 15 ans sont considérées
          comme des mineurs aux fins de la collecte de données. Les mineurs
          doivent avoir le consentement d'un représentant légal pour que leurs
          données soient recueillies, traitées et utilisées.
        </p>
      </section>
      <section>
        <H2>Vos droits en tant qu'utilisateur</H2>

        <p>
          En vertu du RGPD, les utilisateurs ont les droits suivants en tant que
          personnes concernées :
        </p>

        <Ul>
          <Li>droit d'accès</Li>
          <Li>droit de rectification</Li>
          <Li>droit à l'effacement</Li>
          <Li>droit de restreindre le traitement</Li>
          <Li>droit à la portabilité des données</Li>
          <Li>droit d'objection</Li>
        </Ul>

        <p>
          Vous trouverez de plus amples informations sur ces droits au chapitre
          3 (art 12-23) du RGPD.
        </p>
      </section>

      <section>
        <H2>
          Comment modifier, supprimer ou contester les données recueillies
        </H2>

        <p>
          Si vous souhaitez que vos renseignements soient supprimés ou modifiés
          d'une façon ou d'une autre, veuillez communiquer avec notre agent de
          protection de la vie privée ici :
        </p>

        <p>
          John Doe
          <br />
          Parc des Tanneries, 2 All. des Foulons, 67380 Lingolsheim
          <br />
          john.doe@cesieat.fr
          <br />
          12 34 56 78 90
        </p>
      </section>

      <section>
        <H2>Politique sur les cookies</H2>

        <p>
          Un cookie est un petit fichier, stocké sur le disque dur d'un
          utilisateur par le site Web. Son but est de recueillir des données
          relatives aux habitudes de navigation de l'utilisateur.
        </p>

        <p>Nous utilisons les types de cookies suivants sur notre site :</p>

        <Ul>
          <Li>
            <strong>Cookies fonctionnels</strong>
            <br />
            Nous les utilisons pour mémoriser toutes les sélections que vous
            faites sur notre site afin qu'elles soient sauvegardées pour vos
            prochaines visites.
          </Li>
        </Ul>

        <p>
          Vous pouvez choisir d'être averti chaque fois qu'un cookie est
          transmis. Vous pouvez également choisir de désactiver les cookies
          entièrement dans votre navigateur Internet, mais cela peut diminuer la
          qualité de votre expérience d'utilisation.
        </p>
      </section>

      <section>
        <H2>Modifications</H2>

        <p>
          Cette politique de confidentialité peut être modifiée à l'occasion
          afin de maintenir la conformité avec la loi et de tenir compte de tout
          changement à notre processus de collecte de données. Nous recommandons
          à nos utilisateurs de vérifier notre politique de temps à autre pour
          s'assurer qu'ils soient informés de toute mise à jour. Au besoin, nous
          pouvons informer les utilisateurs par courriel des changements
          apportés à cette politique.
        </p>
      </section>

      <section>
        <H2>Contact</H2>

        <p>
          Si vous avez des questions à nous poser, n'hésitez pas à communiquer
          avec nous en utilisant ce qui suit :<br />
          12 34 56 78 90
          <br />
          contact@cesieats.fr
          <br />
          Parc des Tanneries, 2 All. des Foulons, 67380 Lingolsheim
        </p>

        <p>
          <em>Date d'entrée en vigueur : le 12 juin 2024</em>
        </p>
      </section>
    </div>
  );
}
