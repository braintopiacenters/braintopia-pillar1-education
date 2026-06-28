export type ClassSlug =
  | "the-guide"
  | "the-caregiver"
  | "the-learner"
  | "the-bridge"
  | "the-rebalancer"
  | "the-different-thinker"
  | "the-supporter";

export interface ClassData {
  slug: ClassSlug;
  name: string;
  shortDescription: string;
  whoItCovers: string;
  keyStruggles: string;
  howBraintopiaHelps: string;
}

export const classes: ClassData[] = [
  {
    slug: "the-guide",
    name: "The Guide",
    shortDescription: "Teachers, mentors, coaches, counselors, and academic leaders who carry the mental and emotional load of regulating learning environments. They constantly switch between instruction, correction, encouragement, and problem-solving while managing many people at once.",
    whoItCovers: "Classroom teachers, school counselors, special education teachers, administrators, tutors, homeschool parents, professors, and coaches.",
    keyStruggles: "Classroom stress, mental overload, patience depletion, decision fatigue, burnout, emotional carryover into home life, and difficulty recovering after high-demand days.",
    howBraintopiaHelps: "Neurofeedback supports decision fatigue & executive function, emotional regulation under sustained demand, sustained attention & mental switching, and nervous system recovery so Guides can lead without depleting their own resources."
  },
  {
    slug: "the-caregiver",
    name: "The Caregiver",
    shortDescription: "Parents, grandparents, foster/adoptive families, and those managing blended households who carry the emotional, mental, and practical weight of family life while often serving as the emotional center of the household.",
    whoItCovers: "Moms, dads, single parents, blended families, grandparents raising children, foster and adoptive parents, and caregivers balancing family needs with work.",
    keyStruggles: "Mental load and constant anticipation, family stress, homework battles, screen-time struggles, sleep disruption, parent burnout, emotional reactivity, guilt from losing patience, and difficulty balancing work and personal recovery.",
    howBraintopiaHelps: "Neurofeedback helps reduce mental load & anticipatory stress, emotional reactivity & overstimulation, sleep disruption, and builds greater capacity for sustained regulation so caregivers can support their family while protecting their own brain health."
  },
  {
    slug: "the-learner",
    name: "The Learner",
    shortDescription: "Students and academic performers who are expected to focus, remember, study, test, and keep up with increasing pressure — from young children learning to sit still to college students managing heavy workloads and deadlines.",
    whoItCovers: "Elementary, middle school, and high school students, college and graduate students, test-prep students, and students with learning differences under academic pressure.",
    keyStruggles: "Focus during class, homework resistance, test anxiety, memory recall under pressure, mental fatigue, feeling overwhelmed by deadlines, poor sleep before tests, and losing confidence after repeated setbacks.",
    howBraintopiaHelps: "Neurofeedback supports focus & task initiation, memory recall under pressure, emotional regulation & stress response, and cognitive stamina & recovery so Learners can perform more consistently and feel capable again."
  },
  {
    slug: "the-bridge",
    name: "The Bridge",
    shortDescription: "Individuals and families navigating major life and learning transitions — moving into new environments, roles, expectations, and routines while managing the stress of uncertainty and adaptation.",
    whoItCovers: "Students and families navigating school transitions, families relocating, adults changing careers, new parents, people going through divorce or major relationship changes, empty nesters, and military families.",
    keyStruggles: "Transition anxiety and overwhelm, difficulty adjusting to new routines, sleep disruption, emotional reactivity, fear of failure or loss of identity, social stress, and lingering stress even after the change settles.",
    howBraintopiaHelps: "Neurofeedback supports nervous system regulation during uncertainty, emotional reactivity & stress response, focus & adaptability, and sleep & recovery during change so people can navigate transitions with more confidence and less overwhelm."
  },
  {
    slug: "the-rebalancer",
    name: "The Rebalancer",
    shortDescription: "Children, teens, and adults who struggle with focus, emotional regulation, executive function, impulse control, frustration tolerance, or mental organization. They often know what they need to do but have trouble doing it consistently.",
    whoItCovers: "People with attention struggles, emotional regulation challenges, executive function difficulties, impulsivity, trouble shifting between tasks, and inconsistent performance.",
    keyStruggles: "Focus problems and mental disorganization, impulsivity and emotional reactivity, frustration intolerance, difficulty with task initiation and follow-through, and inconsistent performance from day to day.",
    howBraintopiaHelps: "Neurofeedback supports attention and focus networks, impulse control and emotional regulation, executive function and task management, and smoother shifting & recovery so Rebalancers can move from knowing what to do to actually doing it more reliably."
  },
  {
    slug: "the-different-thinker",
    name: "The Different Thinker",
    shortDescription: "Children, teens, and adults who process information, sensory input, routines, transitions, and emotions differently. Their brains may not fit neatly into traditional environments, and they often mask their stress in public and fall apart later at home.",
    whoItCovers: "People with ADHD-style attention patterns, autistic individuals, people with sensory processing challenges, learning differences, and those who feel mentally drained from adapting to environments not built for them.",
    keyStruggles: "Sensory overload, focus variability, emotional regulation challenges, difficulty with transitions, mental fatigue from masking, feeling misunderstood, and shutdowns or meltdowns after overload.",
    howBraintopiaHelps: "Neurofeedback supports sensory regulation and recovery, emotional regulation and frustration tolerance, smoother transitions and cognitive flexibility, and focus without forcing conformity — while respecting how their brain works."
  },
  {
    slug: "the-supporter",
    name: "The Supporter",
    shortDescription: "People who quietly carry the emotional and practical load of helping neurodivergent or challenged loved ones navigate daily life. They often co-regulate, advocate, and provide steady support while managing their own energy and needs.",
    whoItCovers: "Siblings of children with challenges, paraeducators, classroom aides, IEP/504 advocates, extended family members providing regular support, and mentors.",
    keyStruggles: "Emotional exhaustion from constant co-regulation, guilt when patience runs low, difficulty setting boundaries, absorbing stress from others, feeling invisible or undervalued, and mental fatigue after long days of advocacy.",
    howBraintopiaHelps: "Neurofeedback supports emotional regulation under sustained demand, reduces secondary stress absorption, improves mental fatigue and recovery, and helps Supporters maintain patience and energy without burning out."
  }
];

export function getClassBySlug(slug: ClassSlug): ClassData | undefined {
  return classes.find((c) => c.slug === slug);
}

export function getAllClasses(): ClassData[] {
  return classes;
}
