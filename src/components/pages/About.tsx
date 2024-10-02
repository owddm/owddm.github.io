import { AstroLinkURL } from "../AstroLink";
import "./About.css";

export type AboutPageProps = {
  url: URL;
};
export const AboutPage = ({ url }: AboutPageProps) => (
  <AstroLinkURL url={url}>
    <section className="about">
      <img className="about-group-banner" src="https://owddm.github.io/public/images/discord/event-photos/1089404389707481099/1089404385362186250/P1004543@l.webp" alt="" />
      <div className="about-content">
        <h1 className="about-title" id="osaka-kyoto-web-designers-and-developers-meetup">
          Osaka/Kyoto Web Designers and Developers Meetup
        </h1>
        <div className="about-description-container">
          <p>Wow! This 👆 is a mouthful! We chose this name long ago to make the group easy to find. We have gotten to like it, but it is a tad long! For short, we go by “OWDDM” - for those able to pronounce it.</p>
          <p>わぁーい！ この👆は口癖です！ 私たちは、グループを見つけやすくするために、ずっと前にこの名前を選びました。 この名前を気に入っていますが、ちょっと長いです！ 略して、私たちは「OWDDM」で通っています… 発音できる人たちのために「オー・ダブルユー・ディ・ディ・エム」。</p>
          <p>
            The "O" stands for <em>Osaka</em>, the vibrant, second-largest metropolis in Japan. This is where the meetup group started and where we still do most of our events. Recently, we have also been in <em>Kyoto</em> quite a bit. For that reason, we opened the "KWDDM". For
            brevity, we tend to call the group <em>OWDDM</em> and use "O" for “owesome”. 😛
          </p>
          <p>
            「O」は大阪を意味します。 ミートアップグループが始まった場所であり、今でもほとんどのイベントをここで行っています。 最近は、京都にもよく行くようになりました。 そのため、「KWDDM」をオープンしました。 簡潔にするために、私たちはこのグループを OWDDM
            と呼び、「O」の意味を「オーサム」と傾向があります。 😛
          </p>
          <p>
            <em>Alright,</em> the OWDDM is a volunteer, non-profit group that organizes meetups in Kansai. We usually have one meetup per month and region. Usually, during the meetups, one or two community members present about a topic of their choosing. Occasionally, we hold
            other events such as Hanami’s, hikes, and other get-togethers.
          </p>
          <p>
            さて、OWDDM は関西でミートアップを開催するボランティアで非営利のグループです。 私たちは通常、月と地域に1回のミートアップを開催しています。 通常、ミートアップでは、1人または2人のコミュニティメンバーが、自分の選んだトピックについて発表します。
            時には、花見、ハイキング、その他の集まりなどのイベントも開催しています。
          </p>
          <p>
            Our events are in English and about a broad range of topics. We want to <em>invite people from all walks of web-life</em> and ask them to present things they enjoy. Frontend, Backend, Design, SEO, Cloud management, Games... many topics got a bit of time in the past.
            While its not part of the main events, often the members go out for dinner after the meetup.
          </p>
          <p>
            イベントは、英語で、幅広いトピックについて行われます。 私たちは、ウェブライフのあらゆる分野から人々を招き、彼らが楽しんでいることを発表してもらいたいと考えています。
            フロントエンド、バックエンド、デザイン、SEO、クラウド管理、ゲーム…様々なトピックが過去に少し時間を割いたことがあります。formatDate イベントの内容ではないですが、ミートアップ後に参加者は居酒屋に行くこともよくあります。
          </p>
        </div>
        <h2 className="about-title" id="organization">
          Organization
        </h2>
        <div className="about-single-container">
          <p>（英語のみ）</p>
          <p>
            This in a non-profit effort. The current organizer of the OWDDM・KWDDM is <a href="https://leichtgewicht.at">Martin Heidegger</a>. He carries the final responsibility for all issues and has final say, but he does not work by himself. Volunteers can, and have been,
            taking care of accounting; organizing meetups; work on the homepage; moderating the Discord and other things such as sending out announcements of events. The current volunteers can be recognized by their <em>"Volunteer"</em> role in the{" "}
            <a href="/discord">Discord chat</a>.
          </p>
          <p>
            Volunteering is done proactively. Volunteers can bring up tasks and topics and can work on them directly. All questions are discussed through Volunteer-only Discord chats rooms. The reason for restricting this to Volunteers is to avoid spamming other members of the
            Discord chat. To become a Volunteer yourself, please join the Discord and make yourself known to the organizer of a Meetup.
          </p>
          <p>
            Considering the <a href="https://en.wikipedia.org/wiki/Bus_factor">Bus factor</a>, biases in judgments and to avoid bottle neck situations, it is our goal to increase the number of official organizers. If you feel like you want to share the responsibility and have a
            bigger say in the meetup, first become a Volunteer, then help out for a bit and afterwards talk to the organizers.
          </p>
        </div>
      </div>
    </section>
  </AstroLinkURL>
);
