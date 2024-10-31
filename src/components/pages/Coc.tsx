import "./Coc.css";
import { AstroLinkURL } from "../AstroLink";

export type CocPageProps = {
  url: URL;
};
export const CocPage = ({ url }: CocPageProps) => (
  <AstroLinkURL url={url}>
    <section className="coc">
      <div className="coc-content">
        <h1 className="coc-title">Code of Conduct</h1>
        <div className="coc-description-container">
          <p>The OWDDM・KWDDM community is made up of a mixture of professionals and volunteers from all over the world, working on every aspect of the whole - including mentorship, teaching, and connecting people.</p>
          <p>
            Diversity is one of our huge strengths, but it can also lead to communication issues and unhappiness. To that end, we have a few ground rules that we ask people to adhere to. This code applies to anyone interacting in community spaces equally, including organizing
            members.
          </p>
          <p>This isn’t an exhaustive list of things that you can’t do. Rather, take it in the spirit in which it’s intended - a guide to make it easier to enrich all of us and the technical communities in which we participate.</p>
          <p>
            This code of conduct applies to all spaces (real or digital) managed by the OWDDM・KWDDM group. This includes but is not limited to the our physical events, Discord Chat, Github, LinkedIn, and any other system created or maintained by the group. In addition,
            violations of this code outside these spaces may affect a person's ability to participate within them.
          </p>
          <p>
            If you believe someone is violating the code of conduct, we ask that you report it to <a href="mailto:owddm@proton.me">owddm@proton.me</a> and follow the <a href="/coc-report">Reporting Guide</a>.
          </p>
          <ul>
            <li>
              <h4>Be friendly and patient.</h4>
            </li>
            <li>
              <h4>Be welcoming.</h4>
              <p>
                We strive to be a community that welcomes and supports people of all backgrounds and identities. This includes, but is not limited to members of any race, ethnicity, culture, national origin, color, immigration status, social and economic class, educational level,
                sex, sexual orientation, gender identity and expression, age, size, family status, political belief, religion, and mental and physical ability.
              </p>
            </li>
            <li>
              <h4>Be considerate.</h4>
              <p>
                Your work will be used by other people, and you in turn will depend on the work of others. Any decision you take will affect users and colleagues, and you should take those consequences into account when making decisions. Remember that we're a world-wide
                community, so you might not be communicating in someone else's primary language.
              </p>
            </li>
            <li>
              <h4>Be respectful.</h4>
              <p>
                Not all of us will agree all the time, but disagreement is no excuse for poor behavior and poor manners. We might all experience some frustration now and then, but we cannot allow that frustration to turn into a personal attack. It’s important to remember that a
                community where people feel uncomfortable or threatened is not a productive one. Members of the OWDDM・KWDDM community should be respectful when dealing with other members as well as with people outside the OWDDM・KWDDM community.
              </p>
            </li>
            <li>
              <h4>Be careful in the words that you choose.</h4>
              <p>We are a community of professionals, and we conduct ourselves professionally. Be kind to others. Do not insult or put down other participants. Harassment and other exclusionary behavior aren't acceptable. This includes, but is not limited to:</p>
              <ul>
                <li>Violent threats or language directed against another person.</li>
                <li>Discriminatory jokes and language.</li>
                <li>Posting sexually explicit or violent material.</li>
                <li>Posting (or threatening to post) other people's personally identifying information ("doxing").</li>
                <li>Personal insults, especially those using racist or sexist terms.</li>
                <li>Unwelcome sexual attention.</li>
                <li>Advocating for, or encouraging, any of the above behavior.</li>
                <li>Repeated harassment of others. In general, if someone asks you to stop, then stop.</li>
              </ul>
            </li>
            <li>
              <h4>When we disagree, try to understand why.</h4>
              <p>
                Disagreements, both social and technical, happen all the time and the OWDDM・KWDDM community is no exception. It is important that we resolve disagreements and differing views constructively. Remember that we’re different. The strength of the OWDDM・KWDDM
                community comes from its varied community, people from a wide range of backgrounds. Different people have different perspectives on issues. Being unable to understand why someone holds a viewpoint doesn’t mean that they’re wrong. Don’t forget that it is human to
                err and blaming each other doesn’t get us anywhere. Instead, focus on helping to resolve issues and learning from mistakes.
              </p>
            </li>
          </ul>
          <p>
            Adapted from the <a href="https://web.archive.org/web/20141109123859/http://speakup.io/coc.html">Speak Up! project</a>.
          </p>
        </div>
      </div>
    </section>
  </AstroLinkURL>
);
