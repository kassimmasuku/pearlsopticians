import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Eye,
  Shield,
  Sun,
  Baby,
  Monitor,
  Droplets,
  Heart,
  Brain,
  Glasses,
  AlertTriangle,
  Zap,
  Leaf,
  CalendarCheck,
  Activity,
} from "lucide-react";
import { eyeFactImages, type ResponsiveImage } from "@/data/optimizedMedia";
import DidYouKnowBlock from "@/components/DidYouKnowBlock";
import tipVisionTesting from "@/assets/tip-vision-testing.webp";
import tipEyeglasses from "@/assets/tip-eyeglasses.webp";
import tipScreenProtection from "@/assets/tip-screen-protection.webp";
import tipSunglasses from "@/assets/tip-sunglasses.webp";

const tipImage = (src: string, width = 960, height = 640): ResponsiveImage => ({
  src,
  srcSet: `${src} ${width}w`,
  sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
  width,
  height,
});

const facts: {
  icon: typeof Eye;
  img: ResponsiveImage;
  alt: string;
  title: string;
  summary: string;
  detail: string;
}[] = [
  {
    icon: CalendarCheck,
    img: tipImage(tipVisionTesting),
    alt: "Precision optical camera lens representing clarity and accurate vision assessment",
    title: "Regular Eye Exams",
    summary: "Schedule comprehensive eye exams at least once every two years, or annually if you wear corrective lenses.",
    detail:
      "Routine eye exams help keep your prescription up to date and support early awareness of eye health concerns. At Pearls Opticians we use modern diagnostic equipment and take time to explain your results clearly, whether you need a check-up, new glasses or peace of mind about changes in your vision.",
  },
  {
    icon: Monitor,
    img: tipImage(tipScreenProtection),
    alt: "Bright computer workstation illustrating digital screen use and eye-strain awareness",
    title: "Screen Protection",
    summary:
      "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds to reduce digital eye strain.",
    detail:
      "Long hours on screens can lead to dry eyes, headaches and blurred vision. Pair the 20-20-20 rule with a screen at arm’s length, slightly below eye level, and good ambient lighting. Ask our team about practical lens options that can make extended screen use more comfortable.",
  },
  {
    icon: Glasses,
    img: tipImage(tipEyeglasses),
    alt: "Round wooden eyeglass frames on a teal surface, highlighting prescription eyewear",
    title: "Signs You Need Glasses",
    summary:
      "Frequent headaches, squinting, blurred vision, or difficulty seeing at night could mean it's time for an eye exam.",
    detail:
      "Changes in vision often appear gradually. If you notice headaches after reading, squinting to see distance, or struggling with night driving, a comprehensive exam can clarify whether you need correction and which lens options suit your lifestyle.",
  },
  {
    icon: Activity,
    img: tipImage(tipSunglasses),
    alt: "Reflective sunglasses resting on stone in bright sunlight for UV eye protection",
    title: "Healthy Vision Habits",
    summary:
      "Eat a balanced diet rich in omega-3s, wear UV-protective sunglasses outdoors, and avoid smoking for long-term eye health.",
    detail:
      "Everyday habits support lifelong vision. Leafy greens, fish and citrus provide nutrients linked to eye health, while quality sunglasses with UV protection help guard against cumulative sun damage. Pair healthy habits with regular exams for the best outcomes.",
  },
  {
    icon: Eye,
    img: eyeFactImages.eyeAnatomy,
    alt: "Scientific cross-section of the human eye labelling the cornea, iris, pupil, lens, retina and optic nerve",
    title: "How the Eye Works",
    summary: "Your eyes are incredibly complex organs processing millions of signals.",
    detail: "Light enters through the cornea, passes through the pupil (controlled by the iris), is focused by the lens onto the retina, which converts it into electrical signals sent to the brain via the optic nerve. The entire process happens in milliseconds, allowing you to perceive the world in real time with remarkable clarity and depth.",
  },
  {
    icon: Shield,
    img: eyeFactImages.glaucoma,
    alt: "Medical illustration comparing normal vision and drainage with glaucoma-related optic nerve damage and tunnel vision",
    title: "Glaucoma Awareness",
    summary: "Known as the 'silent thief of sight' — often has no early symptoms.",
    detail: "Glaucoma damages the optic nerve, usually due to elevated eye pressure. It's one of the leading causes of irreversible blindness worldwide. Early detection through regular eye exams is crucial because vision lost to glaucoma cannot be restored. Treatment options include eye drops, laser therapy, and surgery to lower eye pressure.",
  },
  {
    icon: Sun,
    img: eyeFactImages.uvWear,
    alt: "Aviator sunglasses resting on sunlit beach sand, representing quality UV eye protection",
    title: "UV Protection Matters",
    summary: "Prolonged UV exposure can cause cataracts and macular damage.",
    detail: "UV rays from the sun can damage the cornea, lens, and retina. Long-term exposure increases the risk of cataracts, macular degeneration, and even eye cancer. Always wear sunglasses with 100% UV protection, even on cloudy days. Wraparound styles offer the best coverage. Children's eyes are especially vulnerable as their lenses are clearer.",
  },
  {
    icon: Baby,
    img: eyeFactImages.childExam,
    alt: "Classic Snellen eye chart used to measure visual acuity during children's vision exams",
    title: "Children's Vision Development",
    summary: "Vision develops rapidly in the first few years of life.",
    detail: "Newborns can only see about 20-30 cm clearly. By 3-4 months, babies begin to develop depth perception and colour vision. Vision problems in children, such as amblyopia (lazy eye) or strabismus (crossed eyes), are highly treatable if caught early. Children should have eye exams at 6 months, 3 years, and before starting school.",
  },
  {
    icon: Monitor,
    img: eyeFactImages.digitalStrain,
    alt: "Dual computer monitors glowing in a dark workspace, illustrating digital screen use and eye-strain awareness",
    title: "Digital Eye Strain",
    summary: "Screen time affects over 60% of regular computer users.",
    detail: "Symptoms include dry eyes, headaches, blurred vision, and neck pain. The 20-20-20 rule helps: every 20 minutes, look at something 20 feet away for 20 seconds. Position your screen at arm's length, slightly below eye level. Use proper lighting to reduce glare, and consider blue light filtering lenses for extended screen use.",
  },
  {
    icon: Droplets,
    img: eyeFactImages.tearFilm,
    alt: "Educational diagram of the tear film showing lipid, aqueous and mucin layers over the cornea surface",
    title: "Dry Eye Syndrome",
    summary: "A common condition that affects tear production and quality.",
    detail: "Dry eye occurs when tears evaporate too quickly or aren't produced enough. Causes include aging, medications, screen use, and environmental factors. Symptoms include burning, itching, redness, and paradoxically, excessive watering. Treatment ranges from artificial tears and warm compresses to prescription medications and in-office procedures.",
  },
  {
    icon: Heart,
    img: eyeFactImages.diabetes,
    alt: "Medical illustration comparing a healthy retina with diabetic retinopathy and a magnified fundus view of retinal damage",
    title: "Diabetes & Your Eyes",
    summary: "Diabetic retinopathy is a leading cause of blindness in adults.",
    detail: "High blood sugar damages blood vessels in the retina, causing them to leak or grow abnormally. This can lead to vision loss if untreated. All people with diabetes should have annual dilated eye exams. Early-stage diabetic retinopathy may have no symptoms, making regular screening essential. Managing blood sugar, blood pressure, and cholesterol helps protect your eyes.",
  },
  {
    icon: Brain,
    img: eyeFactImages.brainPathway,
    alt: "Scientific diagram of the human visual pathway from the eyes through the optic nerves to the visual cortex",
    title: "Eyes & Brain Connection",
    summary: "Nearly 50% of your brain is involved in visual processing.",
    detail: "The visual cortex occupies a large portion of the brain. Your eyes send about 10 million bits of data to the brain every second. Conditions like migraines, stroke, and traumatic brain injuries can affect vision. Conversely, eye exams can sometimes reveal neurological conditions, high blood pressure, and other systemic health issues before other symptoms appear.",
  },
  {
    icon: Glasses,
    img: eyeFactImages.lenses,
    alt: "Studio product photograph of prescription eyeglasses with clear lenses on a teal background",
    title: "Choosing the Right Lenses",
    summary: "Modern lenses offer far more than simple vision correction.",
    detail: "Options include anti-reflective coatings to reduce glare, photochromic lenses that darken in sunlight, progressive lenses for multiple prescriptions in one, and blue light filtering for screen use. High-index lenses are thinner and lighter for strong prescriptions. Your optician can help you choose the best combination based on your lifestyle, work, and visual needs.",
  },
  {
    icon: AlertTriangle,
    img: eyeFactImages.warning,
    alt: "Close-up of a slit-lamp tonometer with cobalt-blue light, representing urgent clinical eye assessment",
    title: "Warning Signs to Watch",
    summary: "Certain symptoms require immediate professional attention.",
    detail: "Seek urgent care if you experience sudden vision loss, flashing lights or new floaters, severe eye pain, seeing halos around lights, or a curtain-like shadow over your vision. These could indicate retinal detachment, acute glaucoma, or other emergencies. Early treatment can prevent permanent vision loss in many of these conditions.",
  },
  {
    icon: Zap,
    img: eyeFactImages.nightVision,
    alt: "City highway at night with headlight glare and light trails, illustrating low-light and night-driving vision challenges",
    title: "Night Vision Facts",
    summary: "Your eyes take up to 30 minutes to fully adapt to darkness.",
    detail: "Rod cells in your retina are responsible for night vision. When you move from bright light to darkness, a chemical called rhodopsin regenerates in the rods, gradually improving sensitivity. Full dark adaptation takes 20-30 minutes. Night blindness can be a sign of vitamin A deficiency, cataracts, or retinitis pigmentosa. Difficulty driving at night warrants an eye exam.",
  },
  {
    icon: Leaf,
    img: eyeFactImages.nutrition,
    alt: "Fresh eye-health foods including leafy greens, orange vegetables and avocado in a colourful meal presentation",
    title: "Nutrition for Eye Health",
    summary: "Certain nutrients are essential for maintaining healthy vision.",
    detail: "Vitamins A, C, and E, along with zinc, lutein, and zeaxanthin, support eye health. Omega-3 fatty acids help prevent dry eye. Foods like leafy greens (spinach, kale), fish (salmon, tuna), eggs, nuts, and citrus fruits are excellent choices. The AREDS2 formula supplements may slow progression of age-related macular degeneration in at-risk individuals.",
  },
];

const EyeHealthFactsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="eye-facts" className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3">Eye Health Education</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Eye Health & Vision Facts</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Explore practical eye care tips and click any card to learn more about your vision and how to protect it.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facts.map((fact, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.article
                key={fact.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: reduceMotion ? 0 : i * 0.05, duration: 0.45 }}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className={`group bg-card rounded-xl shadow-card overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-teal hover:-translate-y-0.5 ${
                  isExpanded ? "ring-2 ring-primary sm:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <div className={`overflow-hidden bg-muted ${isExpanded ? "aspect-[21/9] md:aspect-[24/9]" : "aspect-[16/10]"}`}>
                  <img
                    src={fact.img.src}
                    srcSet={fact.img.srcSet}
                    sizes={fact.img.sizes}
                    width={fact.img.width}
                    height={fact.img.height}
                    alt={fact.alt}
                    className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      fact.title === "Dry Eye Syndrome" || fact.title === "Eyes & Brain Connection"
                        ? "object-contain bg-background p-3 md:p-4"
                        : ""
                    } ${fact.title === "Diabetes & Your Eyes" || fact.title === "Glaucoma Awareness" ? "object-contain bg-white p-2" : ""}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 rounded-lg gradient-teal flex items-center justify-center shrink-0">
                      <fact.icon size={20} className="text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{fact.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{fact.summary}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-foreground text-sm leading-relaxed">{fact.detail}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>

        <DidYouKnowBlock />
      </div>
    </section>
  );
};

export default EyeHealthFactsSection;
