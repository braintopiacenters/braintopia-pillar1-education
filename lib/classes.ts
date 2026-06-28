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
  talkingPoints: string[];
}

export const classes: ClassData[] = [
  {
    slug: "the-guide",
    name: "The Guide",
    shortDescription:
      "Teachers, mentors, coaches, counselors, and academic leaders who carry the mental and emotional load of regulating learning environments. They constantly switch between instruction, correction, encouragement, discipline, planning, and problem-solving while managing attention, behavior, emotional tone, and expectations for many people at once.",
    whoItCovers:
      "Classroom teachers, school counselors, special education teachers, school administrators, tutors, homeschool parents, college professors, coaches, and academic mentors.",
    keyStruggles:
      "Classroom stress, mental overload, patience depletion, decision fatigue, burnout, end-of-day exhaustion, emotional carryover into home life, difficulty staying calm after repeated interruptions, trouble recovering after stressful school days, feeling responsible for everyone else's progress, and reduced capacity for family, rest, or personal time after work.",
    howBraintopiaHelps:
      "Neurofeedback supports decision fatigue and executive function, emotional regulation under sustained demand, sustained attention and mental switching, and nervous system recovery so Guides can build greater mental stamina, emotional steadiness, and recovery capacity without depleting their own brain resources.",
    talkingPoints: [
      "Teaching and mentoring carry a hidden brain load — exhaustion isn't a character flaw when you love the work.",
      "Constant interruptions and context switching drain the brain differently than a single focused task.",
      "Decision fatigue in education is real — clarity and patience depend on a regulated nervous system.",
      "When the school day follows you home, recovery and sleep matter as much as classroom skill.",
    ],
  },
  {
    slug: "the-caregiver",
    name: "The Caregiver",
    shortDescription:
      "Parents, grandparents, foster/adoptive families, and those managing blended households who carry the emotional, mental, and practical weight of family life. They constantly track schedules, meals, appointments, schoolwork, behavior, sleep, moods, and routines while managing the nervous system of the entire household — often serving as the emotional center of the family.",
    whoItCovers:
      "Moms and dads, single parents, blended families, grandparents raising children, foster and adoptive parents, parents of children with focus or regulation challenges, and caregivers balancing family needs with work responsibilities.",
    keyStruggles:
      "Mental load and constant anticipation, family stress and homework battles, screen-time struggles, sleep disruption, parent burnout, emotional reactivity at home, feeling overstimulated by constant needs, guilt from losing patience, difficulty staying calm during conflict, trouble balancing work and personal recovery, and managing a child's focus, behavior, or regulation challenges.",
    howBraintopiaHelps:
      "Neurofeedback helps reduce mental load and anticipatory stress, emotional reactivity and overstimulation, sleep disruption, and builds greater capacity for sustained regulation so Caregivers can better support their family while protecting their own brain health.",
    talkingPoints: [
      "The mental load of parenting is real — constant anticipation takes a neurological toll.",
      "When your child's stress becomes your stress, co-regulation works better from a steadier nervous system.",
      "Parent burnout is not a failure — it often reflects sustained overload, not a lack of caring.",
      "Family stress does not stop when the argument ends — sleep, patience, and regulation are connected.",
    ],
  },
  {
    slug: "the-learner",
    name: "The Learner",
    shortDescription:
      "Students and academic performers who are expected to focus, remember, study, test, adapt, and keep up with increasing pressure — from young children learning to sit still to college students managing independence and deadlines. The Learner is someone whose brain is being asked to perform, retain, recall, and regulate under sustained pressure.",
    whoItCovers:
      "Elementary, middle school, and high school students, college and graduate students, test-prep students, students with learning differences, and students who freeze during tests or lose confidence after repeated setbacks.",
    keyStruggles:
      "Focus during class and study fatigue, homework resistance and trouble starting or finishing assignments, test anxiety and memory recall under pressure, mental fatigue after school, difficulty following multi-step directions, feeling overwhelmed by deadlines, poor sleep before tests, frustration when effort does not match results, and losing confidence after repeated setbacks.",
    howBraintopiaHelps:
      "Neurofeedback supports focus and task initiation, memory recall under pressure, emotional regulation and stress response, and cognitive stamina and recovery so Learners can perform more consistently and feel capable again.",
    talkingPoints: [
      "Studying harder is not always the whole answer — stress can interfere with memory recall under pressure.",
      "Focus is not always about motivation — brain regulation affects how consistently students can show up.",
      "Smart students still struggle when academic pressure affects sleep, confidence, and emotional shutdown.",
      "Effort and performance do not always match — mental stamina and recovery are part of sustainable learning.",
    ],
  },
  {
    slug: "the-bridge",
    name: "The Bridge",
    shortDescription:
      "Individuals and families navigating major life and learning transitions — moving into new environments, roles, expectations, and routines while carrying the mental and emotional load of uncertainty, adaptation, and rebuilding stability.",
    whoItCovers:
      "Students and families navigating school transitions, families relocating, adults changing careers, new parents, people going through divorce or major relationship changes, empty nesters, military families, and anyone recalibrating to new demands after leaving behind what felt familiar.",
    keyStruggles:
      "Transition anxiety and overwhelm, difficulty adjusting to new routines, sleep disruption during change, emotional reactivity or shutdown, fear of failure or loss of identity, social stress and belonging concerns, trouble concentrating amid uncertainty, lingering stress even after the change settles, and resistance or avoidance of the new setting or role.",
    howBraintopiaHelps:
      "Neurofeedback supports nervous system regulation during uncertainty, emotional reactivity and stress response, focus and adaptability, and sleep and recovery during change so people can navigate transitions with more confidence and less overwhelm.",
    talkingPoints: [
      "Big transitions feel exhausting because uncertainty affects focus, sleep, and emotional regulation.",
      "Starting a new school year or life chapter carries a brain load that is often invisible from the outside.",
      "Adapting to new expectations can overwhelm the nervous system even when the change is positive.",
      "Building resilience through major transitions means supporting recovery, not just pushing through.",
    ],
  },
  {
    slug: "the-rebalancer",
    name: "The Rebalancer",
    shortDescription:
      "Children, teens, and adults who struggle with focus, emotional regulation, executive function, impulse control, frustration tolerance, or mental organization. They often know what they need to do but have trouble doing it consistently — not from lack of discipline, but because their brain may struggle to shift, settle, organize, focus, or recover under daily pressure.",
    whoItCovers:
      "People with attention struggles, emotional regulation challenges, executive function difficulties, impulsivity, trouble shifting between tasks, inconsistent performance, and those who start many things but finish few.",
    keyStruggles:
      "Focus problems and mental disorganization, impulsivity and emotional reactivity, frustration intolerance, difficulty with task initiation and follow-through, trouble calming down after stress, overwhelm from multi-step tasks, inconsistent performance from day to day, and family conflict around behavior, chores, homework, or routines.",
    howBraintopiaHelps:
      "Neurofeedback supports attention and focus networks, impulse control and emotional regulation, executive function and task management, and smoother shifting and recovery so Rebalancers can move from knowing what to do to actually doing it more reliably.",
    talkingPoints: [
      "Focus is not just a motivation problem — the gap between knowing and doing is often neurological.",
      "Executive function struggles are not laziness — task initiation can feel impossible under stress.",
      "When frustration takes over before logic can catch up, regulation support can help the brain settle.",
      "Impulsivity and scattered focus reflect brain load — reminders alone do not always solve follow-through.",
    ],
  },
  {
    slug: "the-different-thinker",
    name: "The Different Thinker",
    shortDescription:
      "Children, teens, and adults who process information, sensory input, routines, transitions, emotions, and expectations differently. Their brains may not fit neatly into traditional environments, and they often mask their stress in public and fall apart later at home.",
    whoItCovers:
      "People with ADHD-style attention patterns, autistic individuals, people with sensory processing challenges, learning differences, and those who feel mentally drained from adapting to environments not built for them.",
    keyStruggles:
      "Sensory overload, focus variability, emotional regulation challenges, difficulty with transitions and unexpected changes, mental fatigue from masking, feeling misunderstood or pressured to perform in mismatched ways, shutdowns or meltdowns after overload, and social fatigue around unpredictable environments.",
    howBraintopiaHelps:
      "Neurofeedback supports sensory regulation and recovery, emotional regulation and frustration tolerance, smoother transitions and cognitive flexibility, and focus without forcing conformity — while respecting how their brain works.",
    talkingPoints: [
      "Different processing is not broken processing — support should build regulation without shame.",
      "Masking can be exhausting — falling apart at home often follows holding it together all day.",
      "When sensory overload looks like behavior, the environment and nervous system both matter.",
      "Building confidence without forcing conformity means honoring how the brain actually works.",
    ],
  },
  {
    slug: "the-supporter",
    name: "The Supporter",
    shortDescription:
      "People who quietly carry the emotional and practical load of helping neurodivergent or challenged loved ones navigate daily life. They often co-regulate, advocate, and provide steady support while managing their own energy and needs — absorbing stress that frequently goes unseen.",
    whoItCovers:
      "Siblings of children with challenges, paraeducators, classroom aides, IEP/504 advocates, extended family members providing regular support, and mentors.",
    keyStruggles:
      "Emotional exhaustion from constant co-regulation, guilt when patience runs low, difficulty setting boundaries, absorbing stress from others, feeling invisible or undervalued, mental fatigue after long days of advocacy, and worry about the long-term future of the person they support.",
    howBraintopiaHelps:
      "Neurofeedback supports emotional regulation under sustained demand, reduces secondary stress absorption, improves mental fatigue and recovery, and helps Supporters maintain patience and energy without burning out.",
    talkingPoints: [
      "The invisible load of supporting a neurodivergent loved one is real emotional labor.",
      "Siblings and supporters need care too — constant co-regulation drains the nervous system.",
      "Setting boundaries while still showing up requires recovery, not just willpower.",
      "Advocacy work takes a mental toll — supporters rarely get recognized for what they carry.",
    ],
  },
];

export function getClassBySlug(slug: ClassSlug): ClassData | undefined {
  return classes.find((c) => c.slug === slug);
}

export function getAllClasses(): ClassData[] {
  return classes;
}