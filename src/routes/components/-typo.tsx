import { Blockquote, H1, H2, H3, H4, Li, Ul } from "@/components/typography";

export default function TypoExample() {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="text-accent">Les typos</div>
      <div>
        h1
        <H1>Titre 1</H1>
      </div>
      <div>
        h2
        <H2>Titre 2</H2>
      </div>
      <div>
        h3
        <H3>Titre 3</H3>
      </div>
      <div>
        h4
        <H4>Titre 4</H4>
      </div>
      <div>
        p<p>Paragraphe</p>
      </div>
      <div>
        blockquote
        <Blockquote>Quote</Blockquote>
      </div>
      <div>
        listes
        <Ul>
          <Li>Un</Li>
          <Li>Deux</Li>
          <Li>Trois</Li>
        </Ul>
      </div>
    </div>
  );
}
