export type Pillar3ClassSlug =
  | "the-competitor"
  | "the-performer"
  | "the-strategist"
  | "the-advocate"
  | "the-closer"
  | "the-creator"
  | "the-team";

export interface Pillar3ClassData {
  slug: Pillar3ClassSlug;
  name: string;
  shortDescription: string;
  whoItCovers: string;
  keyStruggles: string;
  howBraintopiaHelps: string;
  talkingPoints: string[];
}

export const pillar3Classes: Pillar3ClassData[] = [
  {
    slug: "the-competitor",
    name: "The Competitor",
    shortDescription:
      "Athletes and competitors who need consistency, recovery, and mental edge when performance is measured and the pressure is always on.",
    whoItCovers:
      "Athletes, student athletes, esports competitors, and anyone whose results are scored, ranked, or compared under sustained pressure.",
    keyStruggles:
      "Performance anxiety before big moments, inconsistency when stakes are highest, slow recovery after losses or setbacks, mental fatigue during long seasons, difficulty switching off a competitive mindset, and fear of plateauing when training harder no longer helps.",
    howBraintopiaHelps:
      "Neurofeedback supports focus under pressure, faster recovery between performances, emotional regulation after setbacks, and the mental consistency Competitors need to show up reliably when it counts.",
    talkingPoints: [
      "Mental edge isn't only willpower — brain patterns influence how consistently you perform.",
      "Recovery between performances matters as much as physical training.",
      "Neurofeedback can support focus and reset without adding more pressure to your routine.",
      "Many competitors notice improved emotional recovery after losses or high-stress events.",
    ],
  },
  {
    slug: "the-performer",
    name: "The Performer",
    shortDescription:
      "Musicians, speakers, actors, and public-facing professionals who must deliver under lights, cameras, and live scrutiny.",
    whoItCovers:
      "Musicians, actors, speakers, presenters, broadcasters, and professionals who perform in front of audiences or evaluators.",
    keyStruggles:
      "Stage fright and performance anxiety, mental blanking under observation, exhaustion after high-visibility events, difficulty accessing flow on demand, overstimulation from lights and crowds, and carrying nerves long after the performance ends.",
    howBraintopiaHelps:
      "Neurofeedback helps reduce performance anxiety, supports presence and focus under observation, improves recovery after high-visibility demands, and helps Performers access their best state when others are watching.",
    talkingPoints: [
      "Being watched changes how the brain performs — regulation can help you stay present.",
      "Recovery after visible demands is part of sustainable performance, not a luxury.",
      "Neurofeedback supports calm focus without dulling the energy you need on stage.",
      "Many Performers report feeling more grounded when the pressure to deliver is highest.",
    ],
  },
  {
    slug: "the-strategist",
    name: "The Strategist",
    shortDescription:
      "Executives, analysts, and planners making complex, high-stakes decisions that require sustained clarity and cognitive stamina.",
    whoItCovers:
      "Executives, managers, analysts, planners, and leaders responsible for decisions that shape teams, outcomes, and long-term direction.",
    keyStruggles:
      "Decision fatigue and mental fog under complexity, difficulty sustaining clarity across long days, carrying responsibility for outcomes that affect many people, burnout from constant strategic demand, poor sleep from an always-on mind, and trouble disconnecting from work.",
    howBraintopiaHelps:
      "Neurofeedback supports executive function, decision clarity under complexity, sustained cognitive stamina, and nervous system recovery so Strategists can lead with focus without burning out.",
    talkingPoints: [
      "Leadership clarity depends on a regulated nervous system, not just experience.",
      "Sustained decision-making drains the brain differently than short bursts of focus.",
      "Neurofeedback can support executive function and recovery between high-demand periods.",
      "Many Strategists benefit from improved sleep and mental shutoff after long days.",
    ],
  },
  {
    slug: "the-advocate",
    name: "The Advocate",
    shortDescription:
      "Lawyers, negotiators, and advocates who argue, persuade, and hold their ground under intense mental and emotional demand.",
    whoItCovers:
      "Attorneys, negotiators, lobbyists, debaters, and professionals who must argue, present, or defend positions persuasively under pressure.",
    keyStruggles:
      "Mental sharpness fading during long negotiations or trials, emotional reactivity in adversarial settings, difficulty leaving work conflict at the office, verbal fluency under stress, sleep disruption before high-stakes presentations, and secondary stress from intense professional conflict.",
    howBraintopiaHelps:
      "Neurofeedback supports mental sharpness during advocacy, emotional regulation in adversarial settings, sustained verbal fluency under stress, and recovery after intense negotiation or courtroom demands.",
    talkingPoints: [
      "Advocacy requires both mental agility and emotional steadiness under opposition.",
      "Adversarial environments can keep the nervous system activated long after the meeting ends.",
      "Neurofeedback may help you stay clear and composed without losing persuasive edge.",
      "Many Advocates notice better recovery after emotionally charged professional battles.",
    ],
  },
  {
    slug: "the-closer",
    name: "The Closer",
    shortDescription:
      "Sales professionals, deal-makers, and deadline-driven finishers who need focus and composure when results matter most.",
    whoItCovers:
      "Sales professionals, account executives, fundraisers, recruiters, and deal-makers who persuade and follow through under quota pressure.",
    keyStruggles:
      "Rejection sensitivity and motivation dips, difficulty staying focused across many conversations, pressure from quotas and deadlines, emotional whiplash after lost deals, mental fatigue from constant follow-up, and trouble recharging when results define your worth.",
    howBraintopiaHelps:
      "Neurofeedback supports focus during high-stakes conversations, resilience after rejection, sustained motivation without burnout, and the composure Closers need when every interaction counts toward results.",
    talkingPoints: [
      "Closing well depends on focus and emotional resilience as much as skill.",
      "Rejection and quota pressure can dysregulate the nervous system over time.",
      "Neurofeedback can support steady motivation without relying on adrenaline alone.",
      "Many Closers feel more composed and present in conversations that matter most.",
    ],
  },
  {
    slug: "the-creator",
    name: "The Creator",
    shortDescription:
      "Artists, writers, designers, and innovators who rely on mental clarity, creative flow, and the stamina to bring ideas to life.",
    whoItCovers:
      "Writers, artists, designers, filmmakers, entrepreneurs, and innovators who depend on originality, flow, and consistent creative output.",
    keyStruggles:
      "Creative blocks and inconsistent flow, overstimulation from busy environments, difficulty initiating or finishing projects, self-doubt under deadlines, mental fatigue from sustained originality demands, and pressure to produce on demand.",
    howBraintopiaHelps:
      "Neurofeedback supports creative focus without forcing conformity, reduces mental blocks and overstimulation, improves task initiation and follow-through, and helps Creators sustain flow across demanding projects.",
    talkingPoints: [
      "Creative flow is a brain state — regulation can help you access it more reliably.",
      "Overstimulation and mental noise are common barriers to original work.",
      "Neurofeedback supports focus and follow-through without flattening creative personality.",
      "Many Creators notice improved ability to start, sustain, and finish meaningful projects.",
    ],
  },
  {
    slug: "the-team",
    name: "The Team",
    shortDescription:
      "Coaches, managers, and captains who synchronize group performance — reading the room, adjusting strategy, and leading under pressure.",
    whoItCovers:
      "Coaches, team captains, managers, and leaders who shape group morale, communication, focus, and performance under collective stress.",
    keyStruggles:
      "Absorbing team stress and morale swings, decision-making under collective pressure, communication breakdowns during high-stress periods, difficulty balancing empathy with authority, exhaustion from seasons or projects, and feeling responsible for everyone's performance.",
    howBraintopiaHelps:
      "Neurofeedback supports emotional regulation under team pressure, improved focus during coordination, stress recovery after intense seasons or projects, and the steadiness Team leaders need to lift everyone's performance.",
    talkingPoints: [
      "Team leadership requires reading people while managing your own nervous system.",
      "Collective stress can land on the person holding the group together.",
      "Neurofeedback can support steadiness, focus, and recovery across long seasons.",
      "Many team leaders notice improved calm and clarity when the group needs direction most.",
    ],
  },
];

export function getPillar3ClassBySlug(slug: Pillar3ClassSlug): Pillar3ClassData | undefined {
  return pillar3Classes.find((c) => c.slug === slug);
}

export function getAllPillar3Classes(): Pillar3ClassData[] {
  return pillar3Classes;
}