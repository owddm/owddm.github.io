<template>
  <section>
    <img class="about-group-banner" src="https://owddm.github.io/public/images/discord/event-photos/1089404389707481099/1089404385362186250/P1004543@l.webp" alt="" />
    <h1 class="about-title">Osaka/Kyoto Web Designers and Developers Meetup</h1>
    <div class="about-description-container">
      <div>
        <p>Wow! This 👆 is a mouthful! We choose this name a long time ago to make the group easy to find and we have since gotten to like. It is a tad long however and for those able to pronounce it we go by “OWDDM” for short.</p>
        <br />
        <p>
          The O for Osaka is the vibrant, second-largest metropolis in Japan. We this meetup group started and where we still do most of the events there. Recently, we have also been in Kyoto quite a bit, which is why there also is a KWDDM. Though that K can also stand for
          Kobe/Kyoto/Kansai. 🤯 For brevity we tend to call the group OWDDM and use O as “owesome”. 😛
        </p>
        <br />
        <p>
          Alright, the OWDDM is a volunteer non-profit group that organizes Meetups in Kansai. We try to have 1 meetup per month and Region with one or two presenters talking about a topic related to either making things in the Web. Occasionally we hold other events such as
          Hanami’s, hikes and other get-togethers.
        </p>
        <br />
        <p>
          Our events are held in english with a broad range of topics. We want to invite people from all walks of web-life and ask them to present topics that they are interested in. Frontend, Backend, Design, SEO, Cloud management, Games... all have had their time a bit in the
          past. It is not really part of the event, but often the members go out for dinner & drinks after the meetup.
        </p>
      </div>
      <div>
        <p>長いね！この👆は口癖です！私たちはずっと前に、グループを見つけやすくするためにこの名前を選び、それ以来気に入っています。しかし、ちょっと長すぎですので、発音できる人は「OWDDM」と略して呼ぶことにしています。</p>
        <br />
        <p>
          このミートアップグループは大阪で始まり、今でもほとんどのイベントをここで行っています。最近は京都にもよく行くので、KWDDM というのもあります。Kは 京都、神戸、関西略でもあるんですけどね。🤯 簡略化するために、私たちはグループを OWDDM
          と呼び、「O」を「オーサム」と使うことが多い。
        </p>
        <br />
        <p>OWDDM は、関西でMeetupを開催する非営利のボランティアグループです。月1回のペースで開催し、1～2人のプレゼンターがWebでのものづくりに関連したトピックを話すリージョンを目指しています。時々、お花見やハイキングなどのイベントも開催しています。</p>
        <br />
        <p>
          イベントは英語で行われ、トピックは多岐にわたります。ウェブライフのあらゆる分野から人を招き、彼らが興味を持つトピックを発表してもらいたいと考えています。フロントエンド、バックエンド、デザイン、SEO、クラウド管理、ゲームなど、どれも過去に少しはあったことです。イベントの一環というわけではありませんが、ミートアップの後、メンバーでディナー＆ドリンクに出かけることもしばしばです。
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-group-banner {
  clip-path: inset(180px 0px 180px 0px);
  margin-top: -10rem;
  margin-bottom: -9rem;
}

.about-title {
  margin-left: 2rem;
  margin-bottom: 2rem;
  line-height: normal;
}

.about-description-container {
  display: flex;
  flex-direction: row;
}

.about-description-container div:nth-child(1) {
  margin-left: 2rem;
  margin-right: 1rem;
}
.about-description-container div:nth-child(2) {
  margin-left: 1rem;
  margin-right: 2rem;
}

@media only screen and (max-width: 768px) {
  .about-group-banner {
    clip-path: inset(160px 0px 160px 0px);
    margin-top: -9rem;
    margin-bottom: -8rem;
  }
}

@media only screen and (max-width: 420px) {
  .about-group-banner {
    clip-path: inset(50px 0px 20px 0px);
    margin-top: -2rem;
    margin-bottom: 0.8rem;
  }
  .about-description-container {
    flex-direction: column;
  }

  .about-description-container div:nth-child(1) {
    margin-left: 2rem;
    margin-right: 2rem;
  }
  .about-description-container div:nth-child(2) {
    margin-top: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }
}
</style>
