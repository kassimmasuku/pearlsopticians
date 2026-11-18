import { motion, useReducedMotion } from "framer-motion";
import CoverflowCarousel, {
  type CoverflowSlide,
} from "@/components/CoverflowCarousel";
import DidYouKnowBlock from "@/components/DidYouKnowBlock";

type FactSlide = CoverflowSlide & { detail: string };

const facts: FactSlide[] = [
  {
    id: "regular-exams",
    category: "Eye Care Tip",
    title: "Regular Eye Exams",
    summary:
      "Schedule comprehensive eye exams at least once every two years, or annually if you wear corrective lenses.",
    detail:
      "Routine eye exams help keep your prescription up to date and support early awareness of eye health concerns. At Pearls Opticians we use modern diagnostic equipment and take time to explain your results clearly, whether you need a check-up, new glasses or peace of mind about changes in your vision.",
    theme: {
      panel: "from-[#1e2a78] via-[#2f4fbf] to-[#5ec8f0]",
      blobA: "bg-[#7dd3fc]/35",
      blobB: "bg-[#312e81]/40",
      blobC: "bg-white/15",
      accent: "bg-white/90",
      text: "text-white",
      muted: "text-white/80",
    },
  },
  {
    id: "screen-protection",
    category: "Eye Care Tip",
    title: "Screen Protection",
    summary:
      "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds to reduce digital eye strain.",
    detail:
      "Long hours on screens can lead to dry eyes, headaches and blurred vision. Pair the 20-20-20 rule with a screen at arm's length, slightly below eye level, and good ambient lighting. Ask our team about practical lens options that can make extended screen use more comfortable.",
    theme: {
      panel: "from-[#0f766e] via-[#0891b2] to-[#bae6fd]",
      blobA: "bg-[#67e8f9]/30",
      blobB: "bg-[#134e4a]/45",
      blobC: "bg-white/20",
      accent: "bg-white/90",
      text: "text-white",
      muted: "text-white/80",
    },
  },
  {
    id: "signs-glasses",
    category: "Eye Care Tip",
    title: "Signs You Need Glasses",
    summary:
      "Frequent headaches, squinting, blurred vision, or difficulty seeing at night could mean it's time for an eye exam.",
    detail:
      "Changes in vision often appear gradually. If you notice headaches after reading, squinting to see distance, or struggling with night driving, a comprehensive exam can clarify whether you need correction and which lens options suit your lifestyle.",
    theme: {
      panel: "from-[#1e3a8a] via-[#2563eb] to-[#93c5fd]",
      blobA: "bg-[#bfdbfe]/35",
      blobB: "bg-[#1e40af]/40",
      blobC: "bg-white/15",
      accent: "bg-white/90",
      text: "text-white",
      muted: "text-white/80",
    },
  },
  {
    id: "healthy-habits",
    category: "Eye Care Tip",
    title: "Healthy Vision Habits",
    summary:
      "Eat a balanced diet rich in omega-3s, wear UV-protective sunglasses outdoors, and avoid smoking for long-term eye health.",
    detail:
      "Everyday habits support lifelong vision. Leafy greens, fish and citrus provide nutrients linked to eye health, while quality sunglasses with UV protection help guard against cumulative sun damage. Pair healthy habits with regular exams for the best outcomes.",
    theme: {
      panel: "from-[#164e63] via-[#0e7490] to-[#a5f3fc]",
      blobA: "bg-[#22d3ee]/25",
      blobB: "bg-[#083344]/50",
      blobC: "bg-white/18",
      accent: "bg-cyan-100",
      text: "text-white",
      muted: "text-cyan-50/85",
    },
  },
  {
    id: "how-eye-works",
    category: "Vision Science",
    title: "How the Eye Works",
    summary: "Your eyes are incredibly complex organs processing millions of signals.",
    detail:
      "Light enters through the cornea, passes through the pupil (controlled by the iris), is focused by the lens onto the retina, which converts it into electrical signals sent to the brain via the optic nerve. The entire process happens in milliseconds, allowing you to perceive the world in real time with remarkable clarity and depth.",
    theme: {
      panel: "from-[#312e81] via-[#4338ca] to-[#a5b4fc]",
      blobA: "bg-[#c7d2fe]/30",
      blobB: "bg-[#1e1b4b]/45",
      blobC: "bg-white/12",
      accent: "bg-indigo-100",
      text: "text-white",
      muted: "text-indigo-100/85",
    },
  },
  {
    id: "glaucoma",
    category: "Eye Health",
    title: "Glaucoma Awareness",
    summary: "Known as the 'silent thief of sight' — often has no early symptoms.",
    detail:
      "Glaucoma damages the optic nerve, usually due to elevated eye pressure. It's one of the leading causes of irreversible blindness worldwide. Early detection through regular eye exams is crucial because vision lost to glaucoma cannot be restored. Treatment options include eye drops, laser therapy, and surgery to lower eye pressure.",
    theme: {
      panel: "from-[#1e293b] via-[#334155] to-[#7dd3fc]",
      blobA: "bg-[#38bdf8]/25",
      blobB: "bg-[#0f172a]/55",
      blobC: "bg-white/10",
      accent: "bg-sky-100",
      text: "text-white",
      muted: "text-slate-200/85",
    },
  },
  {
    id: "uv-protection",
    category: "Prevention",
    title: "UV Protection Matters",
    summary: "Prolonged UV exposure can cause cataracts and macular damage.",
    detail:
      "UV rays from the sun can damage the cornea, lens, and retina. Long-term exposure increases the risk of cataracts, macular degeneration, and even eye cancer. Always wear sunglasses with 100% UV protection, even on cloudy days. Wraparound styles offer the best coverage. Children's eyes are especially vulnerable as their lenses are clearer.",
    theme: {
      panel: "from-[#075985] via-[#0284c7] to-[#e0f2fe]",
      blobA: "bg-[#7dd3fc]/40",
      blobB: "bg-[#0c4a6e]/40",
      blobC: "bg-white/25",
      accent: "bg-white",
      text: "text-white",
      muted: "text-sky-50/90",
    },
  },
  {
    id: "children-vision",
    category: "Family Care",
    title: "Children's Vision Development",
    summary: "Vision develops rapidly in the first few years of life.",
    detail:
      "Newborns can only see about 20-30 cm clearly. By 3-4 months, babies begin to develop depth perception and colour vision. Vision problems in children, such as amblyopia (lazy eye) or strabismus (crossed eyes), are highly treatable if caught early. Children should have eye exams at 6 months, 3 years, and before starting school.",
    theme: {
      panel: "from-[#1d4ed8] via-[#3b82f6] to-[#dbeafe]",
      blobA: "bg-[#93c5fd]/35",
      blobB: "bg-[#1e3a8a]/35",
      blobC: "bg-white/20",
      accent: "bg-blue-50",
      text: "text-white",
      muted: "text-blue-50/90",
    },
  },
  {
    id: "digital-strain",
    category: "Everyday Vision",
    title: "Digital Eye Strain",
    summary: "Screen time affects over 60% of regular computer users.",
    detail:
      "Symptoms include dry eyes, headaches, blurred vision, and neck pain. The 20-20-20 rule helps: every 20 minutes, look at something 20 feet away for 20 seconds. Position your screen at arm's length, slightly below eye level. Use proper lighting to reduce glare, and consider blue light filtering lenses for extended screen use.",
    theme: {
      panel: "from-[#0f172a] via-[#1e40af] to-[#67e8f9]",
      blobA: "bg-[#22d3ee]/30",
      blobB: "bg-[#172554]/50",
      blobC: "bg-white/15",
      accent: "bg-cyan-50",
      text: "text-white",
      muted: "text-cyan-50/85",
    },
  },
  {
    id: "dry-eye",
    category: "Eye Health",
    title: "Dry Eye Syndrome",
    summary: "A common condition that affects tear production and quality.",
    detail:
      "Dry eye occurs when tears evaporate too quickly or aren't produced enough. Causes include aging, medications, screen use, and environmental factors. Symptoms include burning, itching, redness, and paradoxically, excessive watering. Treatment ranges from artificial tears and warm compresses to prescription medications and in-office procedures.",
    theme: {
      panel: "from-[#155e75] via-[#06b6d4] to-[#ecfeff]",
      blobA: "bg-[#a5f3fc]/40",
      blobB: "bg-[#083344]/40",
      blobC: "bg-white/25",
      accent: "bg-white",
      text: "text-white",
      muted: "text-cyan-50/90",
    },
  },
  {
    id: "diabetes-eyes",
    category: "Eye Health",
    title: "Diabetes & Your Eyes",
    summary: "Diabetic retinopathy is a leading cause of blindness in adults.",
    detail:
      "High blood sugar damages blood vessels in the retina, causing them to leak or grow abnormally. This can lead to vision loss if untreated. All people with diabetes should have annual dilated eye exams. Early-stage diabetic retinopathy may have no symptoms, making regular screening essential. Managing blood sugar, blood pressure, and cholesterol helps protect your eyes.",
    theme: {
      panel: "from-[#4c1d95] via-[#6d28d9] to-[#c4b5fd]",
      blobA: "bg-[#ddd6fe]/30",
      blobB: "bg-[#2e1065]/45",
      blobC: "bg-white/12",
      accent: "bg-violet-100",
      text: "text-white",
      muted: "text-violet-100/85",
    },
  },
  {
    id: "eyes-brain",
    category: "Vision Science",
    title: "Eyes & Brain Connection",
    summary: "Nearly 50% of your brain is involved in visual processing.",
    detail:
      "The visual cortex occupies a large portion of the brain. Your eyes send about 10 million bits of data to the brain every second. Conditions like migraines, stroke, and traumatic brain injuries can affect vision. Conversely, eye exams can sometimes reveal neurological conditions, high blood pressure, and other systemic health issues before other symptoms appear.",
    theme: {
      panel: "from-[#1e1b4b] via-[#3730a3] to-[#818cf8]",
      blobA: "bg-[#a5b4fc]/30",
      blobB: "bg-[#312e81]/45",
      blobC: "bg-white/12",
      accent: "bg-indigo-100",
      text: "text-white",
      muted: "text-indigo-100/85",
    },
  },
  {
    id: "right-lenses",
    category: "Eyewear Guidance",
    title: "Choosing the Right Lenses",
    summary: "Modern lenses offer far more than simple vision correction.",
    detail:
      "Options include anti-reflective coatings to reduce glare, photochromic lenses that darken in sunlight, progressive lenses for multiple prescriptions in one, and blue light filtering for screen use. High-index lenses are thinner and lighter for strong prescriptions. Your optician can help you choose the best combination based on your lifestyle, work, and visual needs.",
    theme: {
      panel: "from-[#1e3a5f] via-[#2563eb] to-[#bfdbfe]",
      blobA: "bg-[#93c5fd]/35",
      blobB: "bg-[#172554]/40",
      blobC: "bg-white/18",
      accent: "bg-blue-50",
      text: "text-white",
      muted: "text-blue-50/90",
    },
  },
  {
    id: "warning-signs",
    category: "Urgent Care",
    title: "Warning Signs to Watch",
    summary: "Certain symptoms require immediate professional attention.",
    detail:
      "Seek urgent care if you experience sudden vision loss, flashing lights or new floaters, severe eye pain, seeing halos around lights, or a curtain-like shadow over your vision. These could indicate retinal detachment, acute glaucoma, or other emergencies. Early treatment can prevent permanent vision loss in many of these conditions.",
    theme: {
      panel: "from-[#7f1d1d] via-[#1e3a8a] to-[#93c5fd]",
      blobA: "bg-[#fca5a5]/20",
      blobB: "bg-[#1e3a8a]/50",
      blobC: "bg-white/12",
      accent: "bg-rose-100",
      text: "text-white",
      muted: "text-rose-50/85",
    },
  },
  {
    id: "night-vision",
    category: "Vision Science",
    title: "Night Vision Facts",
    summary: "Your eyes take up to 30 minutes to fully adapt to darkness.",
    detail:
      "Rod cells in your retina are responsible for night vision. When you move from bright light to darkness, a chemical called rhodopsin regenerates in the rods, gradually improving sensitivity. Full dark adaptation takes 20-30 minutes. Night blindness can be a sign of vitamin A deficiency, cataracts, or retinitis pigmentosa. Difficulty driving at night warrants an eye exam.",
    theme: {
      panel: "from-[#020617] via-[#1e3a8a] to-[#38bdf8]",
      blobA: "bg-[#0ea5e9]/25",
      blobB: "bg-[#020617]/60",
      blobC: "bg-white/10",
      accent: "bg-sky-100",
      text: "text-white",
      muted: "text-sky-100/80",
    },
  },
  {
    id: "nutrition",
    category: "Prevention",
    title: "Nutrition for Eye Health",
    summary: "Certain nutrients are essential for maintaining healthy vision.",
    detail:
      "Vitamins A, C, and E, along with zinc, lutein, and zeaxanthin, support eye health. Omega-3 fatty acids help prevent dry eye. Foods like leafy greens (spinach, kale), fish (salmon, tuna), eggs, nuts, and citrus fruits are excellent choices. The AREDS2 formula supplements may slow progression of age-related macular degeneration in at-risk individuals.",
    theme: {
      panel: "from-[#14532d] via-[#0f766e] to-[#99f6e4]",
      blobA: "bg-[#5eead4]/30",
      blobB: "bg-[#052e16]/45",
      blobC: "bg-white/18",
      accent: "bg-emerald-50",
      text: "text-white",
      muted: "text-emerald-50/90",
    },
  },
];

const EyeHealthFactsSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="eye-facts" className="overflow-x-clip bg-[#eef2f8] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10 mb-8 md:mb-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 font-body text-sm uppercase tracking-[0.22em] text-primary">
            Eye Health Education
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-[2.75rem]">
            Eye Health & Vision Facts
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-muted-foreground">
            Explore one insight at a time — swipe, drag or use the controls to move through our eye-health facts.
          </p>
        </motion.div>
      </div>

      <CoverflowCarousel
        slides={facts}
        ariaLabel="Eye health and vision facts"
        itemLabel="fact"
        renderExpanded={(slide) => {
          const fact = slide as FactSlide;
          return (
            <p className={`font-body text-sm leading-relaxed md:text-[0.95rem] ${fact.theme.muted}`}>
              {fact.detail}
            </p>
          );
        }}
      />

      <div className="container mt-4 md:mt-8">
        <DidYouKnowBlock />
      </div>
    </section>
  );
};

export default EyeHealthFactsSection;
