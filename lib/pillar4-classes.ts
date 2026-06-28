export type Pillar4ClassSlug =
  | "the-recoverer"
  | "the-recalibrator"
  | "the-sharp-mind"
  | "the-overloaded";

export interface Pillar4ClassData {
  slug: Pillar4ClassSlug;
  name: string;
  shortDescription: string;
  whoItCovers: string;
  keyStruggles: string;
  howBraintopiaHelps: string;
  talkingPoints: string[];
}

export const pillar4Classes: Pillar4ClassData[] = [
  {
    slug: "the-recoverer",
    name: "The Recoverer",
    shortDescription:
      "People trying to regain cognitive function, emotional steadiness, stamina, confidence, and daily capacity after brain injury, concussion, accident, or neurological stress — often looking fine to others while still struggling to trust their own brain.",
    whoItCovers:
      "Athletes recovering from concussion, car accident survivors, people with mild traumatic brain injury, students and adults returning to school or work after injury, and families supporting someone in recovery.",
    keyStruggles:
      "Brain fog and mental fatigue, light and sound sensitivity, focus and memory changes after injury, emotional changes and irritability, sleep disruption, difficulty with screens or multitasking, trouble returning to school, work, or sports, feeling misunderstood because symptoms are invisible, and anxiety about whether they will feel normal again.",
    howBraintopiaHelps:
      "Neurofeedback supports brain regulation and cognitive stamina, sensory tolerance, emotional steadiness, sleep quality, and confidence during recovery so Recoverers can rebuild function and trust in their brain.",
    talkingPoints: [
      "When you look fine but your brain still feels off, recovery is more than waiting.",
      "Brain fog after injury is not imaginary — uneven recovery is common and valid.",
      "Screens, lights, and noise can become exhausting when the nervous system is still healing.",
      "Cognitive stamina and confidence matter as much as physical healing after concussion.",
    ],
  },
  {
    slug: "the-recalibrator",
    name: "The Recalibrator",
    shortDescription:
      "Women navigating midlife hormonal transition who experience brain fog, sleep disruption, mood shifts, and stress sensitivity while still carrying major responsibilities — often feeling dismissed when symptoms are blamed on age or stress alone.",
    whoItCovers:
      "Women in perimenopause, menopause, and postmenopause experiencing brain fog, sleep disruption, mood changes, increased stress sensitivity, or focus and memory shifts during hormonal transition.",
    keyStruggles:
      "Brain fog and difficulty focusing, sleep disruption and night sweats, mood shifts and reduced emotional resilience, increased stress sensitivity, memory lapses and word-finding challenges, feeling unlike themselves, juggling work and family while feeling dismissed, and frustration when symptoms are minimized.",
    howBraintopiaHelps:
      "Neurofeedback supports mental clarity and focus, sleep quality and stress recovery, emotional regulation and mood steadiness, and cognitive stamina so Recalibrators can feel more steady and like themselves during midlife transition.",
    talkingPoints: [
      "Midlife brain fog is not imaginary — hormonal transition can affect sleep, mood, and focus.",
      "When you do not feel like yourself anymore, validation and brain support both matter.",
      "Stress tolerance can change suddenly during perimenopause and menopause.",
      "Feeling sharp again starts with understanding the brain, not dismissing the experience.",
    ],
  },
  {
    slug: "the-sharp-mind",
    name: "The Sharp Mind",
    shortDescription:
      "Adults who want to protect memory, preserve mental clarity, maintain independence, and stay cognitively engaged as they age — focused on proactive brain health, confidence, and quality of life rather than fear of decline.",
    whoItCovers:
      "Adults concerned about memory or slower recall, retirees and aging professionals, seniors wanting to stay sharp, adults focused on cognitive wellness, and families supporting aging parents.",
    keyStruggles:
      "Memory concerns and slower recall, slower processing speed and trouble finding words, reduced mental sharpness in conversations, anxiety about cognitive decline or losing independence, reduced confidence in daily decision-making, difficulty keeping up with complex tasks, and feeling embarrassed about forgetfulness.",
    howBraintopiaHelps:
      "Neurofeedback supports memory confidence and mental clarity, focus and processing speed, cognitive wellness maintenance, emotional steadiness, and continued engagement so Sharp Minds can stay independent and mentally active as they age.",
    talkingPoints: [
      "Staying sharp is a proactive brain health goal — not just a fear of decline.",
      "Cognitive confidence matters as much as memory when it comes to independence.",
      "The difference between normal forgetfulness and feeling less sharp is worth understanding.",
      "Aging well includes cognitive wellness — brain support before crisis is valid.",
    ],
  },
  {
    slug: "the-overloaded",
    name: "The Overloaded",
    shortDescription:
      "People living with chronic stress, burnout, sleep disruption, and emotional depletion — mentally full, emotionally drained, and feeling like their brain will not fully shut off even when they desperately need rest.",
    whoItCovers:
      "Overworked adults, chronically stressed parents, people with long-term burnout or poor sleep, those with racing thoughts at night, and anyone who has lost the daily capacity they used to have.",
    keyStruggles:
      "Chronic stress and burnout, poor sleep quality and waking up tired, racing thoughts and difficulty shutting the brain off, mental fog and reduced focus, emotional exhaustion and reduced patience, difficulty relaxing between demands, feeling constantly behind or overwhelmed, and carrying pressure across work, home, and relationships.",
    howBraintopiaHelps:
      "Neurofeedback supports stress recovery and nervous system regulation, sleep quality, emotional steadiness, mental clarity, and rebuilding daily capacity so Overloaded individuals can move from simply functioning to feeling more restored and resilient.",
    talkingPoints: [
      "When your brain will not shut off, burnout is more than being tired.",
      "Chronic stress becomes a normal setting — but the nervous system can learn to recover.",
      "Waking up tired after sleeping often reflects nervous system strain, not just poor habits.",
      "The brain needs recovery, not just more discipline — capacity can be rebuilt over time.",
    ],
  },
];

export function getPillar4ClassBySlug(slug: Pillar4ClassSlug): Pillar4ClassData | undefined {
  return pillar4Classes.find((c) => c.slug === slug);
}

export function getAllPillar4Classes(): Pillar4ClassData[] {
  return pillar4Classes;
}