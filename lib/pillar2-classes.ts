export type Pillar2ClassSlug =
  | "the-protector"
  | "the-anchor"
  | "the-healer"
  | "the-night-watch";

export interface Pillar2ClassData {
  slug: Pillar2ClassSlug;
  name: string;
  shortDescription: string;
  whoItCovers: string;
  keyStruggles: string;
  howBraintopiaHelps: string;
  talkingPoints: string[];
}

export const pillar2Classes: Pillar2ClassData[] = [
  {
    slug: "the-protector",
    name: "The Protector",
    shortDescription:
      "People who serve, defend, respond, intervene, and stay ready when others are in danger or crisis. They are trained to act under pressure and make fast decisions with serious consequences — often carrying the weight of what they have seen, handled, or survived long after the shift ends.",
    whoItCovers:
      "Veterans, active-duty military, police officers, firefighters, EMTs, paramedics, dispatchers, correctional officers, first responder families, and public safety professionals in high-alert or high-risk environments.",
    keyStruggles:
      "Chronic stress load and hypervigilance, sleep disruption and difficulty turning off after work or service, emotional regulation after high-stakes events, irritability or emotional numbing, reintegration into family or civilian life, relationship strain, fatigue from sustained readiness, trouble recovering after intense calls or deployments, and pressure to stay strong without asking for support.",
    howBraintopiaHelps:
      "Neurofeedback supports shifting out of high-alert mode, sleep quality and recovery, emotional regulation after high-stress events, and transition from work mode to home mode so Protectors can rebuild calm after chaos while respecting their strength and service.",
    talkingPoints: [
      "When the shift ends but the brain stays on duty, recovery is not weakness.",
      "High-alert work makes rest harder — the nervous system cost of always being ready is real.",
      "Service stress follows people home — sleep disruption is common in high-alert roles.",
      "When the body is home but the brain is still scanning, regulation can help rebuild calm.",
    ],
  },
  {
    slug: "the-anchor",
    name: "The Anchor",
    shortDescription:
      "Families who hold life together around service, deployment, relocation, uncertainty, transition, and reintegration. They manage the home front, support the person who serves, help children adjust, and absorb stress that often goes unseen.",
    whoItCovers:
      "Military spouses, children of service members, families managing deployment or relocation, caregivers of veterans, spouses and children of first responders, and families supporting someone returning from high-alert service environments.",
    keyStruggles:
      "Deployment, relocation, and reintegration stress, family uncertainty and constant anticipation, emotional strain and self-suppression, sleep disruption, parenting alone during absences, feeling invisible or unsupported, difficulty reconnecting after separation, secondary trauma or emotional spillover, and losing a sense of personal identity outside the support role.",
    howBraintopiaHelps:
      "Neurofeedback supports emotional resilience under uncertainty, sleep quality and stress recovery, family regulation and capacity, and adjustment during transition and reintegration so Anchors can hold life together with more support for their own nervous system.",
    talkingPoints: [
      "Military and service families carry hidden stress that affects sleep, patience, and regulation.",
      "Holding the home front together takes a brain load that is often invisible to others.",
      "Reintegration can be harder than expected — the whole family needs recovery, not just the service member.",
      "Being the steady one for everyone else has an emotional cost that deserves real support.",
    ],
  },
  {
    slug: "the-healer",
    name: "The Healer",
    shortDescription:
      "People who care for others while carrying the emotional, cognitive, and physical demands of healthcare and caregiving work. They are expected to stay calm, compassionate, and competent while dealing with pain, fear, urgency, grief, and high-stakes decisions — often delaying their own recovery.",
    whoItCovers:
      "Doctors, nurses, therapists, mental health professionals, physical and occupational therapists, hospice workers, medical assistants, home health aides, emergency department staff, and support staff in high-stress clinical settings.",
    keyStruggles:
      "Compassion fatigue and emotional overload, secondary traumatic stress, decision fatigue and shift stress, burnout and sleep disruption, mental fatigue after long shifts, difficulty disconnecting after work, carrying other people's pain and outcomes, irritability at home, and loss of emotional capacity despite caring deeply.",
    howBraintopiaHelps:
      "Neurofeedback supports stress recovery and emotional regulation, compassion fatigue and decision fatigue, sleep quality after intense work, and long-term resilience so Healers can continue caring for others without depleting their own resources.",
    talkingPoints: [
      "Caring for others takes brain capacity — compassion fatigue is not a lack of compassion.",
      "The hidden brain load of healthcare work often follows healers home after the shift ends.",
      "Constant urgency and high-responsibility care create a neurological cost over time.",
      "Healthcare burnout affects sleep, patience, and regulation — recovery is part of sustainable care.",
    ],
  },
  {
    slug: "the-night-watch",
    name: "The Night Watch",
    shortDescription:
      "People whose schedules, sleep patterns, alertness demands, and recovery cycles do not follow a normal rhythm. They are expected to stay sharp when the body wants rest and often make good decisions while tired — working against the natural recovery rhythm most people take for granted.",
    whoItCovers:
      "Overnight workers, nurses on shift rotation, firefighters, police officers, pilots, truck drivers, dispatchers, security personnel, on-call professionals, and anyone who regularly sleeps during daylight hours.",
    keyStruggles:
      "Sleep disruption and circadian rhythm strain, mental fatigue and brain fog, reduced reaction time and decision fatigue, emotional reactivity from sleep debt, trouble recovering between shifts, difficulty sleeping during the day, feeling disconnected from family routines, burnout from long-term schedule disruption, and feeling wired and tired at the same time.",
    howBraintopiaHelps:
      "Neurofeedback supports sleep quality and recovery despite irregular schedules, alertness and reaction time, emotional regulation under fatigue, and transition between work and rest so Night Watch professionals can function safely and sustainably.",
    talkingPoints: [
      "When your schedule fights your brain, fatigue affects patience, focus, and reaction time.",
      "Overnight workers can feel tired even after sleeping — sleep quantity and quality are not the same.",
      "Shift work creates nervous system strain that makes full recovery between shifts difficult.",
      "The people who stay alert while others sleep need real recovery, not just more caffeine.",
    ],
  },
];

export function getPillar2ClassBySlug(slug: Pillar2ClassSlug): Pillar2ClassData | undefined {
  return pillar2Classes.find((c) => c.slug === slug);
}

export function getAllPillar2Classes(): Pillar2ClassData[] {
  return pillar2Classes;
}