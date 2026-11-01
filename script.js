/**
 * ============================================================================
 * MediBot – Healthcare Information Assistant
 * Client-Side JavaScript (script.js)
 * 
 * IMPORTANT ARCHITECTURAL & MEDICAL NOTICE:
 * This chatbot operates strictly on the client side using a local, rule-based
 * keyword matching engine and a curated educational knowledge base.
 * It does NOT connect to external AI services, third-party medical APIs,
 * or remote databases.
 * 
 * Medical Safety Guardrails:
 * - MediBot does NOT diagnose conditions or prescribe medications/dosages.
 * - Emergency keywords trigger immediate high-priority warning alerts.
 * - Educational answers clearly explain when users must seek qualified care.
 * ============================================================================
 */

'use strict';

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Health Topics Educational Database (For Modals & Exploration)
     ========================================================================== */
  const HEALTH_TOPICS_DATA = {
    symptoms: {
      category: 'Symptom Checker & Education',
      title: 'Common Symptoms & Triage Guidance',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
        </svg>
      `,
      content: `
        <p>Symptoms are sensations or changes in bodily function that signal that something may be out of balance. While many common symptoms (such as mild tension headaches or minor sniffles) resolve with rest and hydration, learning how to monitor their severity and duration is essential.</p>
        
        <h4>Frequent Everyday Symptoms</h4>
        <ul>
          <li><strong>Headaches:</strong> Often caused by muscle tension, eye strain, dehydration, or poor sleep. Persistent, abrupt, or unusually severe headaches warrant formal medical review.</li>
          <li><strong>Fever:</strong> An elevated body temperature (typically &ge; 38.0&deg;C / 100.4&deg;F) indicating an active immune response against an infection.</li>
          <li><strong>Cough &amp; Sore Throat:</strong> Usually secondary to viral upper respiratory tract infections (like colds). Warm salt water gargles and staying hydrated often provide temporary comfort.</li>
          <li><strong>Fatigue:</strong> Persistent exhaustion can stem from sleep deficiencies, chronic stress, nutritional gaps (like iron deficiency), or underlying endocrine changes.</li>
        </ul>

        <h4>General Home Care &amp; Monitoring</h4>
        <ul>
          <li>Keep an accurate symptom diary noting when symptoms began, what eases them, and any accompanying signs.</li>
          <li>Prioritize continuous hydration with water, herbal teas, or electrolyte solutions.</li>
          <li>Ensure adequate rest to permit the immune system to recover.</li>
        </ul>

        <div class="modal-warning-box">
          <strong>When to Seek Prompt Medical Attention:</strong>
          Symptoms that worsen progressively over 48&ndash;72 hours, high fevers unresponsive to over-the-counter antipyretics, severe unyielding pain, confusion, or difficulty breathing require immediate clinical evaluation.
        </div>
      `
    },
    conditions: {
      category: 'Chronic & Acute Conditions',
      title: 'Diseases and Conditions Overview',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      `,
      content: `
        <p>Chronic conditions affect millions worldwide and are often manageable through a synthesis of medical oversight, lifestyle modifications, and early detection.</p>
        
        <h4>Common Non-Communicable Diseases</h4>
        <ul>
          <li><strong>Hypertension (High Blood Pressure):</strong> Known as a "silent condition" because it rarely produces overt early symptoms. Regular blood pressure screenings are vital for cardiovascular protection.</li>
          <li><strong>Type 2 Diabetes:</strong> Characterized by insulin resistance and elevated blood glucose levels. Preventive habits include balanced meals, limiting refined sugars, and daily physical movement.</li>
          <li><strong>Asthma &amp; Bronchitis:</strong> Chronic inflammatory airway conditions requiring an individualized management action plan and allergen avoidance.</li>
          <li><strong>Osteoarthritis:</strong> Degenerative joint cartilage wear leading to stiffness; low-impact exercises like swimming and cycling support joint mobility.</li>
        </ul>

        <h4>Foundational Management Principles</h4>
        <ul>
          <li>Schedule routine preventive health checkups and age-appropriate screenings.</li>
          <li>Follow prescribed therapeutic regimens faithfully and never discontinue prescribed medication without physician consultation.</li>
          <li>Adopt an anti-inflammatory dietary pattern rich in colorful vegetables, omega-3 fatty acids, and unrefined grains.</li>
        </ul>

        <div class="modal-warning-box">
          <strong>Doctor Consultation Reminder:</strong>
          Managing chronic diseases requires personalized partnership with a licensed physician or specialist. Never self-prescribe or stop medications based on online guides.
        </div>
      `
    },
    nutrition: {
      category: 'Nutrition & Dietetics',
      title: 'Nutrition and Balanced Dietary Habits',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18a1 1 0 0 1-2 0v-1.07A6 6 0 0 1 6.07 12H5a1 1 0 0 1 0-2h1.07A6 6 0 0 1 11 4.07V3a1 1 0 0 1 2 0v1.07A6 6 0 0 1 17.93 10H19a1 1 0 0 1 0 2h-1.07A6 6 0 0 1 13 16.93z"/>
        </svg>
      `,
      content: `
        <p>Proper nutrition is the cornerstone of lifelong wellness, supporting cell repair, metabolic vitality, immune resilience, and psychological stability.</p>
        
        <h4>Building a Balanced Plate</h4>
        <ul>
          <li><strong>Half the Plate:</strong> Non-starchy vegetables and whole fruits of diverse colors to ensure a broad spectrum of polyphenols and vitamins.</li>
          <li><strong>One-Quarter of the Plate:</strong> Quality protein sources such as legumes, lentils, tofu, poultry, eggs, and omega-3 rich fish.</li>
          <li><strong>One-Quarter of the Plate:</strong> Intact whole grains including quinoa, brown rice, oats, barley, or whole-wheat products.</li>
          <li><strong>Healthy Fats:</strong> Extra virgin olive oil, avocados, seeds, and unsalted nuts in moderation.</li>
        </ul>

        <h4>Hydration &amp; Mindful Intake</h4>
        <ul>
          <li>Aim for adequate daily water intake (typically 2 to 3 liters depending on body weight, climate, and exercise).</li>
          <li>Minimize ultra-processed foods containing high concentrations of sodium, refined high-fructose corn syrups, and trans fats.</li>
          <li>Prioritize dietary fiber (25&ndash;35g per day) to nourish the gut microbiome and maintain steady glycemic levels.</li>
        </ul>

        <div class="modal-warning-box">
          <strong>Specialized Diets:</strong>
          Individuals with metabolic disorders, renal concerns, or gastrointestinal diseases (like Crohn's or Celiac) should consult a Registered Dietitian (RD) for customized medical nutrition therapy.
        </div>
      `
    },
    fitness: {
      category: 'Physical Activity',
      title: 'Fitness, Exercise & Active Living',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="5" r="3"/>
          <path d="m9 20 3-6 3 6m-6-11 3 5 3-5M6 8l6 3 6-3"/>
        </svg>
      `,
      content: `
        <p>Physical activity promotes cardiovascular efficiency, maintains muscle mass, enhances bone density, and triggers the release of mood-elevating neurotransmitters (endorphins and dopamine).</p>
        
        <h4>World Health Organization (WHO) Guidelines</h4>
        <ul>
          <li><strong>Cardiovascular Exercise:</strong> At least 150&ndash;300 minutes of moderate-intensity aerobic physical activity (e.g., brisk walking, swimming, cycling) or 75&ndash;150 minutes of vigorous activity weekly.</li>
          <li><strong>Strength Training:</strong> Muscle-strengthening activities involving all major muscle groups at least 2 or more days per week.</li>
          <li><strong>Flexibility &amp; Balance:</strong> Yoga, stretching, or balance exercises, particularly important for joint mobility and fall prevention.</li>
        </ul>

        <h4>Tips for Sustainable Habits</h4>
        <ul>
          <li><strong>Combat Sedentary Behavior:</strong> Stand up, stretch, or walk for 2&ndash;5 minutes after every 45&ndash;60 minutes of seated computer work.</li>
          <li>Start with manageable increments: three 10-minute walks per day deliver meaningful metabolic benefits.</li>
          <li>Warm up before training and cool down afterwards to prevent ligamentous and muscular injuries.</li>
        </ul>

        <div class="modal-warning-box">
          <strong>Medical Precaution:</strong>
          If you have a history of heart disease, uncontrolled hypertension, or orthopedic limitations, obtain clinical clearance before beginning vigorous new exercise programs.
        </div>
      `
    },
    mental: {
      category: 'Psychological Wellbeing',
      title: 'Mental Wellness & Stress Management',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"/>
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/>
        </svg>
      `,
      content: `
        <p>Mental wellness and physical health are deeply interconnected. Managing psychological strain and prioritizing restful sleep directly improves immune function and cognitive clarity.</p>
        
        <h4>Evidence-Based Stress Reduction</h4>
        <ul>
          <li><strong>Box Breathing (4-4-4-4):</strong> Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. This down-regulates the sympathetic nervous system.</li>
          <li><strong>Mindful Awareness:</strong> Dedicating 5&ndash;10 minutes daily to mindfulness meditation or journaling helps detach from reactive thought patterns.</li>
          <li><strong>Boundaries &amp; Downtime:</strong> Establish clear boundaries between work obligations and personal restorative time to safeguard against burnout.</li>
        </ul>

        <h4>Sleep Hygiene Essentials</h4>
        <ul>
          <li>Maintain a consistent bedtime and wake-up schedule, including on weekends.</li>
          <li>Avoid screen exposure (blue light) 60 minutes before bedtime or utilize night-shift screen filters.</li>
          <li>Keep the sleeping environment quiet, dark, and comfortably cool (around 18&ndash;20&deg;C / 65&ndash;68&deg;F).</li>
        </ul>

        <div class="modal-warning-box">
          <strong>Crisis Support Resources:</strong>
          If you or someone you know is experiencing overwhelming distress or thoughts of self-harm, please dial or text <strong>988</strong> (in the US/Canada) or reach out to your local crisis hotline immediately. Free, confidential support is available 24/7.
        </div>
      `
    },
    medications: {
      category: 'Pharmacology Safety',
      title: 'Medication Information & Safe Usage',
      iconSvg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="10" rx="5"/>
          <line x1="12" y1="7" x2="12" y2="17"/>
        </svg>
      `,
      content: `
        <p>Prescription drugs and over-the-counter (OTC) products are powerful therapeutic tools. Using them safely requires knowledge, vigilance, and clear communication with your pharmacist and physician.</p>
        
        <h4>Core Medication Safety Rules</h4>
        <ul>
          <li><strong>Adhere to Prescriptions:</strong> Take doses exactly as directed. Never skip doses, double up after a missed dose, or discontinue early (especially with antibiotics).</li>
          <li><strong>Never Share Medications:</strong> Drugs prescribed for one individual can cause severe adverse reactions or toxic interactions in another.</li>
          <li><strong>Disclose All Supplements:</strong> Always inform your medical team about vitamins, herbal supplements, and OTC pain relievers, as herbs (e.g. St. John's Wort) can interact significantly with pharmaceuticals.</li>
          <li><strong>Safe Home Storage:</strong> Keep medicines in their original labeled containers away from heat and moisture (avoid humid bathroom medicine cabinets). Ensure child-resistant closures.</li>
        </ul>

        <h4>Questions to Ask Your Pharmacist</h4>
        <ul>
          <li>What is the brand and generic name of this medication?</li>
          <li>Should this be taken with meals or on an empty stomach?</li>
          <li>Are there specific foods, beverages, or alcohol to avoid?</li>
          <li>What are the most common side effects, and what signs require immediate attention?</li>
        </ul>

        <div class="modal-warning-box">
          <strong>No Tailored Dosages:</strong>
          MediBot will never calculate, recommend, or adjust drug dosages. For all questions regarding personal medications, contact your pharmacist or prescribing clinician.
        </div>
      `
    }
  };

  /* ==========================================================================
     2. Predefined Rule-Based Chatbot Response Engine
     ========================================================================== 
     * HOW THIS WORKS:
     * Responses are generated locally using pattern matching and keyword heuristics.
     * To extend the chatbot, simply add new objects to the `RULES_DATABASE` below.
     * Each rule defines:
     *   - keywords: array of strings or regex patterns to look for
     *   - isEmergency: boolean flag for urgent clinical symptoms
     *   - response: formatted HTML string delivering educational information
     */
  const RULES_DATABASE = [
    // ---------------- Emergency & Urgent Red Flags ----------------
    {
      id: 'emergency_cardiac',
      keywords: ['chest pain', 'heart attack', 'chest pressure', 'chest tightness', 'radiating pain in arm', 'crushing chest'],
      isEmergency: true,
      response: `
        <p><strong>URGENT MEDICAL WARNING:</strong> Symptoms such as chest pain, tightness, squeezing pressure, or pain radiating to the jaw, neck, back, or left arm can indicate a <strong>cardiovascular emergency (such as a myocardial infarction / heart attack)</strong>.</p>
        <div class="emergency-callout">
          <strong>What You Must Do Immediately:</strong>
          <ul>
            <li>Call your local emergency number (e.g., <strong>911, 112, 999</strong>) or have someone drive you to the nearest emergency department right away.</li>
            <li>Do not attempt to drive yourself.</li>
            <li>Rest in a comfortable, seated position while waiting for emergency responders.</li>
          </ul>
        </div>
        <p><em>Do not wait to see if symptoms improve. Immediate emergency care saves lives.</em></p>
      `
    },
    {
      id: 'emergency_respiratory',
      keywords: ['cant breathe', "can't breathe", 'severe shortness of breath', 'gasping for air', 'blue lips', 'choking', 'suffocating'],
      isEmergency: true,
      response: `
        <p><strong>URGENT MEDICAL WARNING:</strong> Acute or severe difficulty breathing, blue or pale lips, or gasping for air is a <strong>critical medical emergency</strong>.</p>
        <div class="emergency-callout">
          <strong>Action Required:</strong>
          <ul>
            <li>Call emergency medical services (e.g., <strong>911, 112, 999</strong>) immediately.</li>
            <li>If you have a prescribed quick-relief rescue inhaler (for asthma or COPD), administer it now according to your emergency action plan.</li>
            <li>Remain in an upright sitting posture to ease airway expansion.</li>
          </ul>
        </div>
      `
    },
    {
      id: 'emergency_stroke',
      keywords: ['stroke', 'face drooping', 'arm weakness', 'slurred speech', 'sudden numbness', 'loss of speech'],
      isEmergency: true,
      response: `
        <p><strong>URGENT MEDICAL WARNING:</strong> These signs strongly suggest a possible <strong>acute stroke</strong>. Remember the <strong>F.A.S.T.</strong> protocol:</p>
        <div class="emergency-callout">
          <ul>
            <li><strong>F - Face:</strong> Is one side of the face drooping when smiling?</li>
            <li><strong>A - Arms:</strong> Does one arm drift downward when raising both?</li>
            <li><strong>S - Speech:</strong> Is speech slurred or difficult to understand?</li>
            <li><strong>T - Time:</strong> Call emergency services (<strong>911 / 112 / 999</strong>) IMMEDIATELY.</li>
          </ul>
        </div>
        <p><em>Every minute counts in stroke treatment to prevent permanent neurological injury.</em></p>
      `
    },
    {
      id: 'emergency_mental_crisis',
      keywords: ['suicide', 'kill myself', 'end my life', 'want to die', 'self harm', 'hurt myself'],
      isEmergency: true,
      response: `
        <p><strong>YOU ARE NOT ALONE &ndash; IMMEDIATE HELP IS AVAILABLE:</strong> If you are experiencing overwhelming emotional pain or thoughts of hurting yourself, please know there is compassionate, confidential help available right now.</p>
        <div class="emergency-callout">
          <strong>Free 24/7 Crisis Support:</strong>
          <ul>
            <li><strong>United States &amp; Canada:</strong> Call or text <strong>988</strong> to connect with the Suicide &amp; Crisis Lifeline.</li>
            <li><strong>Crisis Text Line:</strong> Text <em>HOME</em> to <strong>741741</strong>.</li>
            <li><strong>United Kingdom:</strong> Call <strong>111</strong> or Samaritans at <strong>116 123</strong>.</li>
            <li><strong>International:</strong> Contact your local emergency service or visit <em>findahelpline.com</em>.</li>
          </ul>
        </div>
        <p>Please reach out to one of these free services or a trusted loved one right now.</p>
      `
    },

    // ---------------- Core Suggested Questions ----------------
    {
      id: 'dehydration',
      keywords: ['dehydration', 'dehydrated', 'symptoms of dehydration', 'lack of water', 'not enough water'],
      isEmergency: false,
      response: `
        <p><strong>Understanding Dehydration:</strong> Dehydration occurs when the body loses more fluids and electrolytes than it takes in, impairing normal cellular function.</p>
        <h4>Common Mild to Moderate Symptoms:</h4>
        <ul>
          <li>Noticeable thirst and dry or sticky mouth</li>
          <li>Dark yellow or amber-colored urine, and infrequent urination</li>
          <li>Mild dizziness or lightheadedness upon standing</li>
          <li>Fatigue, headache, and reduced concentration</li>
        </ul>
        <h4>Effective Rehydration Steps:</h4>
        <ul>
          <li>Sip cool water or oral rehydration solutions (ORS) in small, frequent amounts.</li>
          <li>Incorporate fluids containing electrolytes (diluted natural fruit juices or light broths).</li>
          <li>Avoid alcohol and highly caffeinated beverages, which can act as mild diuretics.</li>
        </ul>
        <p><em>Medical Red Flag: If someone has sunken eyes, extreme lethargy, inability to keep fluids down, or confusion, seek immediate medical care.</em></p>
      `
    },
    {
      id: 'healthy_diet',
      keywords: ['healthy diet', 'maintain a healthy diet', 'nutrition', 'balanced diet', 'eating healthy', 'what should i eat', 'diet tips'],
      isEmergency: false,
      response: `
        <p><strong>Maintaining a Healthy, Balanced Diet:</strong> A nutritious dietary pattern focuses on nutrient-dense whole foods rather than severe calorie restriction.</p>
        <h4>Key Dietary Foundations:</h4>
        <ul>
          <li><strong>Half Your Plate with Plants:</strong> Load up on colorful vegetables and whole fruits to supply essential micronutrients, polyphenols, and dietary fiber.</li>
          <li><strong>Lean Protein Sources:</strong> Include beans, lentils, chickpeas, fish, poultry, eggs, tofu, and unsweetened yogurt for tissue repair and satiety.</li>
          <li><strong>Complex Whole Grains:</strong> Choose oats, brown rice, whole wheat, and quinoa over ultra-refined flours.</li>
          <li><strong>Healthy Unsaturated Fats:</strong> Moderate portions of extra virgin olive oil, nuts, seeds, and avocados support heart and brain health.</li>
        </ul>
        <h4>Practical Habits:</h4>
        <ul>
          <li>Limit added sugars, sugary beverages, and excess sodium.</li>
          <li>Cook meals at home more frequently to control ingredients and portion sizes.</li>
        </ul>
        <p><em>Note: Individuals with specific medical conditions should consult a registered dietitian for an individualized nutrition plan.</em></p>
      `
    },
    {
      id: 'improve_sleep',
      keywords: ['improve sleep', 'better sleep', 'sleep tips', 'insomnia', 'cant sleep', "can't sleep", 'sleep hygiene', 'sleeping better'],
      isEmergency: false,
      response: `
        <p><strong>Proven Strategies for Optimal Sleep Hygiene:</strong> Quality sleep is essential for cognitive performance, metabolic health, and emotional resilience.</p>
        <h4>Evidence-Aligned Sleep Habits:</h4>
        <ul>
          <li><strong>Consistent Schedule:</strong> Go to bed and wake up at the exact same time every day &ndash; even on weekends &ndash; to reinforce your circadian rhythm.</li>
          <li><strong>Curb Blue Light:</strong> Turn off computers, tablets, and smartphones at least 45&ndash;60 minutes prior to sleep, as blue spectrum light suppresses melatonin production.</li>
          <li><strong>Optimize Your Bedroom:</strong> Keep your room cool (approx. 18&ndash;20&deg;C / 65&ndash;68&deg;F), completely dark, and quiet.</li>
          <li><strong>Mind Caffeine Timing:</strong> Avoid caffeine (coffee, energy drinks, tea) within 6 to 8 hours of bedtime.</li>
          <li><strong>Wind-Down Ritual:</strong> Engage in relaxing practices such as reading a physical book, light stretching, or listening to calm music.</li>
        </ul>
        <p><em>Consult a physician if you experience chronic insomnia, loud snoring accompanied by gasping (signs of sleep apnea), or severe daytime sleepiness.</em></p>
      `
    },
    {
      id: 'manage_stress',
      keywords: ['manage stress', 'everyday stress', 'stress relief', 'anxiety', 'stressed', 'feeling stressed', 'stress management'],
      isEmergency: false,
      response: `
        <p><strong>Managing Everyday Stress &amp; Nervous System Balance:</strong> While short-term stress is a natural reaction, chronic unmanaged stress can compromise immune and heart health.</p>
        <h4>Practical Stress Management Techniques:</h4>
        <ul>
          <li><strong>4-7-8 Breathing Technique:</strong> Inhale silently through the nose for 4 seconds, hold your breath for 7 seconds, and exhale audibly through the mouth for 8 seconds. Repeat 4 cycles to stimulate the parasympathetic nervous system.</li>
          <li><strong>Physical Activity:</strong> A 20-minute brisk walk outdoors helps metabolize circulating cortisol and adrenaline.</li>
          <li><strong>Cognitive Reframing:</strong> Focus on variables within your control, write down your priorities, and break large tasks into bite-sized steps.</li>
          <li><strong>Social Connection:</strong> Sharing your feelings with a trusted friend, family member, or counselor provides valuable emotional perspective.</li>
        </ul>
        <p><em>If stress feels unmanageable or develops into persistent anxiety or depressive episodes, consider reaching out to a licensed mental health professional.</em></p>
      `
    },
    {
      id: 'common_cold',
      keywords: ['common cold', 'cold symptoms', 'runny nose', 'sniffles', 'have a cold', 'cold vs flu', 'stuffy nose'],
      isEmergency: false,
      response: `
        <p><strong>Common Cold Overview &amp; Self-Care:</strong> The common cold is a mild viral upper respiratory tract infection, most frequently caused by rhinoviruses.</p>
        <h4>Typical Symptoms:</h4>
        <ul>
          <li>Runny or congested nose</li>
          <li>Sore, scratchy throat and sneezing</li>
          <li>Mild, hacking cough</li>
          <li>Low-grade fever (more common in children) and mild body aches</li>
        </ul>
        <h4>Supportive Home Care:</h4>
        <ul>
          <li><strong>Hydration &amp; Rest:</strong> Warm broths, water, and herbal teas with honey (for adults and children over 1 year) help soothe the throat.</li>
          <li><strong>Saline Nasal Sprays &amp; Steam:</strong> Loosen nasal secretions naturally without medication side effects.</li>
          <li><strong>Antibiotics Do NOT Work:</strong> Because colds are caused by viruses, antibiotics will not cure them or accelerate recovery.</li>
        </ul>
        <p><em>When to see a doctor: If symptoms persist beyond 10&ndash;14 days, fever spikes above 38.5&deg;C (101.3&deg;F), or you develop ear pain or shortness of breath.</em></p>
      `
    },

    // ---------------- Additional Common Health Topics ----------------
    {
      id: 'fever',
      keywords: ['fever', 'high temperature', 'chills', 'thermometer', 'feeling hot', 'body temp'],
      isEmergency: false,
      response: `
        <p><strong>Understanding Fever:</strong> A fever is defined medically as a core body temperature of <strong>38.0&deg;C (100.4&deg;F) or higher</strong>. It is the body's natural defense mechanism to fight viral or bacterial invaders.</p>
        <h4>General Home Guidance:</h4>
        <ul>
          <li>Drink plenty of fluids to avoid dehydration caused by sweating.</li>
          <li>Dress in light, breathable clothing and rest in a comfortably cool room.</li>
          <li>Consult a pharmacist regarding over-the-counter antipyretics (like acetaminophen or ibuprofen) if discomfort is high. <em>Never give aspirin to children or teenagers due to the risk of Reye's syndrome.</em></li>
        </ul>
        <p><em>Red Flags: Seek emergency care if a fever is accompanied by a stiff neck, confusion, unexplained rash, or in infants under 3 months of age.</em></p>
      `
    },
    {
      id: 'headache',
      keywords: ['headache', 'migraine', 'head hurts', 'throbbing head', 'tension headache', 'head pain'],
      isEmergency: false,
      response: `
        <p><strong>Headache Guidance &amp; Prevention:</strong> The vast majority of headaches are primary headaches, such as tension headaches or migraines.</p>
        <h4>Helpful Self-Care Measures:</h4>
        <ul>
          <li>Drink 1&ndash;2 tall glasses of water; dehydration is a frequent headache trigger.</li>
          <li>Rest in a dim, quiet room with a cold or warm compress placed on your forehead or back of the neck.</li>
          <li>Take regular visual breaks if working on screens (follow the 20-20-20 rule).</li>
        </ul>
        <div class="emergency-callout">
          <strong>Emergency Warning:</strong> If you experience a sudden, explosive headache (often called a "thunderclap headache"), or a headache accompanied by confusion, high fever, numbness, or weakness, call emergency services immediately.
        </div>
      `
    },
    {
      id: 'blood_pressure',
      keywords: ['blood pressure', 'hypertension', 'high bp', 'low bp', 'systolic', 'diastolic'],
      isEmergency: false,
      response: `
        <p><strong>Blood Pressure Fundamentals:</strong> Blood pressure measures the lateral force exerted by circulating blood against the walls of the arteries.</p>
        <h4>General Standard Categories (Adults):</h4>
        <ul>
          <li><strong>Normal:</strong> Less than 120/80 mmHg</li>
          <li><strong>Elevated:</strong> Systolic between 120&ndash;129 AND diastolic less than 80</li>
          <li><strong>Hypertension Stage 1:</strong> Systolic 130&ndash;139 OR diastolic 80&ndash;89 mmHg</li>
        </ul>
        <h4>Heart-Healthy Habits:</h4>
        <ul>
          <li>Follow the DASH dietary pattern (rich in fruits, vegetables, potassium, and low in sodium).</li>
          <li>Engage in regular aerobic physical activity.</li>
          <li>Limit alcohol consumption and avoid tobacco products.</li>
        </ul>
        <p><em>Note: If home blood pressure readings exceed 180/120 mmHg, or if high readings are accompanied by chest pain or vision changes, seek immediate emergency care.</em></p>
      `
    },
    {
      id: 'diabetes',
      keywords: ['diabetes', 'blood sugar', 'glucose', 'insulin', 'type 2', 'type 1', 'hba1c'],
      isEmergency: false,
      response: `
        <p><strong>Diabetes &amp; Blood Glucose Overview:</strong> Diabetes is a metabolic disorder characterized by sustained elevated blood glucose levels.</p>
        <h4>Core Distinctions:</h4>
        <ul>
          <li><strong>Type 1 Diabetes:</strong> An autoimmune condition where the pancreas produces little to no insulin; requires lifelong insulin therapy.</li>
          <li><strong>Type 2 Diabetes:</strong> More common; involves cellular insulin resistance and progressive insulin secretion deficiency. Often managed with lifestyle modifications, oral medications, and insulin when indicated.</li>
        </ul>
        <h4>Protective Lifestyle Measures:</h4>
        <ul>
          <li>Choose complex, high-fiber carbohydrates over refined sugars and sweet drinks.</li>
          <li>Maintain regular physical activity, which improves cellular insulin sensitivity.</li>
          <li>Attend routine clinical appointments for HbA1c testing, renal checks, and eye exams.</li>
        </ul>
      `
    },
    {
      id: 'exercise_fitness',
      keywords: ['exercise', 'fitness', 'workout', 'walking', 'gym', 'cardio', 'strength training', '10000 steps'],
      isEmergency: false,
      response: `
        <p><strong>Physical Fitness &amp; Longevity:</strong> Consistent, moderate physical activity is one of the most effective interventions for preventing cardiovascular disease, metabolic syndrome, and depression.</p>
        <h4>Practical Guidelines:</h4>
        <ul>
          <li>Aim for at least 150 minutes of moderate aerobic exercise (like brisk walking or swimming) per week.</li>
          <li>Include 2 strength-training sessions per week targeting major muscle groups.</li>
          <li>Break up sedentary time: even standing up and walking for 2 minutes every hour improves glucose metabolism.</li>
        </ul>
        <p><em>Always listen to your body and speak with a healthcare provider before beginning a vigorous new training regimen.</em></p>
      `
    },
    {
      id: 'medication_safety',
      keywords: ['medication', 'medicine', 'pill', 'pills', 'antibiotic', 'antibiotics', 'prescription', 'dosage', 'drugs'],
      isEmergency: false,
      response: `
        <p><strong>Safe Medication Principles:</strong> Pharmaceuticals and supplements should always be used responsibly and strictly under clinical supervision.</p>
        <h4>Essential Safety Guidelines:</h4>
        <ul>
          <li><strong>Take as Directed:</strong> Follow prescription instructions accurately; never stop antibiotics prematurely even if you feel better.</li>
          <li><strong>Never Guess Dosages:</strong> MediBot cannot calculate or recommend medication dosages. Always consult your pharmacist or prescribing doctor.</li>
          <li><strong>Avoid Drug Sharing:</strong> Never share prescription drugs with others, as identical symptoms can have entirely different underlying causes.</li>
          <li><strong>Storage:</strong> Store medications in a cool, dry place away from children and pets.</li>
        </ul>
      `
    },

    // ---------------- Bot Identity, Help & Greetings ----------------
    {
      id: 'greeting',
      keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
      isEmergency: false,
      response: `
        <p>Hello! I am <strong>MediBot</strong>, your healthcare information assistant. How can I help you today?</p>
        <p>You can ask me about common symptoms, balanced nutrition, sleep habits, stress reduction, or explore our health topic guides below.</p>
      `
    },
    {
      id: 'bot_identity',
      keywords: ['who are you', 'what are you', 'what is medibot', 'what can you do', 'help me', 'about you'],
      isEmergency: false,
      response: `
        <p>I am <strong>MediBot</strong>, a client-side educational healthcare assistant created with vanilla HTML, CSS, and JavaScript.</p>
        <h4>What I Can Do:</h4>
        <ul>
          <li>Provide evidence-aligned educational summaries on symptoms, nutrition, fitness, and sleep.</li>
          <li>Highlight recognized red-flag symptoms that require emergency medical intervention.</li>
          <li>Guide you to appropriate lifestyle resources and topics.</li>
        </ul>
        <h4>What I Cannot Do:</h4>
        <ul>
          <li>I cannot provide a clinical diagnosis or replace a doctor's examination.</li>
          <li>I cannot prescribe medications or recommend specific dosages.</li>
        </ul>
      `
    },
    {
      id: 'thanks',
      keywords: ['thank you', 'thanks', 'thx', 'appreciate it', 'helpful', 'awesome'],
      isEmergency: false,
      response: `
        <p>You are very welcome! I'm glad I could provide helpful educational information.</p>
        <p>Remember, if you ever have personal health concerns or persistent symptoms, always verify them with a qualified healthcare professional. Stay well!</p>
      `
    },
    {
      id: 'bye',
      keywords: ['bye', 'goodbye', 'see you', 'cya', 'exit', 'quit'],
      isEmergency: false,
      response: `
        <p>Goodbye! Take good care of your health, stay hydrated, and feel free to return whenever you have health information questions.</p>
      `
    }
  ];

  /**
   * Fallback response when no matching keywords are identified
   */
  const FALLBACK_RESPONSE = `
    <p>Thank you for your question. As an educational healthcare assistant, I don't have a specific predefined answer matching those exact words.</p>
    <p>Here are some topics I can provide clear information on:</p>
    <ul>
      <li><strong>Dehydration:</strong> <em>"What are common symptoms of dehydration?"</em></li>
      <li><strong>Nutrition:</strong> <em>"How can I maintain a healthy diet?"</em></li>
      <li><strong>Sleep:</strong> <em>"What are some ways to improve sleep?"</em></li>
      <li><strong>Stress:</strong> <em>"How can I manage everyday stress?"</em></li>
      <li><strong>Illness:</strong> <em>"What are common cold symptoms?"</em> or <em>"Fever guidance"</em></li>
    </ul>
    <p><em>Please rephrase your query, or explore the Health Topics section above. For personal diagnostic questions, please consult a qualified physician.</em></p>
  `;

  /**
   * Match user query against the rule database
   * Returns: { response: string, isEmergency: boolean }
   */
  function matchUserQuery(userText) {
    const cleanText = userText.toLowerCase().trim();

    // 1. First Priority: Check for Emergency Keywords
    for (const rule of RULES_DATABASE) {
      if (rule.isEmergency) {
        for (const kw of rule.keywords) {
          if (cleanText.includes(kw)) {
            return {
              response: rule.response,
              isEmergency: true
            };
          }
        }
      }
    }

    // 2. Second Priority: Check for Standard Educational Topics
    for (const rule of RULES_DATABASE) {
      if (!rule.isEmergency) {
        for (const kw of rule.keywords) {
          if (cleanText.includes(kw)) {
            return {
              response: rule.response,
              isEmergency: false
            };
          }
        }
      }
    }

    // 3. Fallback when no keywords matched
    return {
      response: FALLBACK_RESPONSE,
      isEmergency: false
    };
  }

  /* ==========================================================================
     3. Chatbot DOM Elements & Interaction Logic
     ========================================================================== */
  const chatMessagesContainer = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const typingIndicator = document.getElementById('typing-indicator');
  const clearChatBtn = document.getElementById('clear-chat-btn');
  const suggestionsList = document.getElementById('suggestions-list');
  const initialBotTime = document.getElementById('initial-bot-time');

  // Format dynamic time string (e.g. "11:45 AM")
  function formatTime(date = new Date()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Update initial welcome message timestamp
  if (initialBotTime) {
    initialBotTime.textContent = formatTime();
  }

  // Scroll chat messages smoothly to bottom
  function scrollChatToBottom() {
    if (chatMessagesContainer) {
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  }

  /**
   * Append a message bubble to the chat container
   * @param {string} sender - 'user' | 'bot'
   * @param {string} text - message content (HTML supported for bot)
   * @param {boolean} isEmergency - whether to style as an urgent warning
   */
  function appendMessage(sender, text, isEmergency = false) {
    const isUser = sender === 'user';
    const messageRow = document.createElement('div');
    messageRow.className = `message-row ${isUser ? 'user-row' : 'bot-row'}`;

    const avatar = document.createElement('div');
    avatar.className = `message-avatar ${isUser ? 'user-avatar' : ''}`;
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = isUser ? 'You' : 'MB';

    const bubble = document.createElement('div');
    let bubbleClass = isUser ? 'message-bubble user-bubble' : 'message-bubble bot-bubble';
    if (isEmergency) {
      bubbleClass += ' warning-bubble';
    }
    bubble.className = bubbleClass;

    const header = document.createElement('div');
    header.className = 'bubble-header';

    const name = document.createElement('strong');
    name.className = 'sender-name';
    if (isEmergency) {
      name.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
        </svg>
        <span>MediBot Emergency Notice</span>
        <span class="warning-badge-tag">Urgent</span>
      `;
    } else {
      name.textContent = isUser ? 'You' : 'MediBot';
    }

    const time = document.createElement('span');
    time.className = 'timestamp';
    time.textContent = formatTime();

    header.appendChild(name);
    header.appendChild(time);

    const content = document.createElement('div');
    content.className = 'bubble-content';
    if (isUser) {
      // Escape user input text to prevent XSS
      const p = document.createElement('p');
      p.textContent = text;
      content.appendChild(p);
    } else {
      content.innerHTML = text;
    }

    bubble.appendChild(header);
    bubble.appendChild(content);

    messageRow.appendChild(avatar);
    messageRow.appendChild(bubble);

    chatMessagesContainer.appendChild(messageRow);
    scrollChatToBottom();
  }

  /**
   * Process a question from the user (simulate typing delay and reply)
   */
  function handleUserQuestion(questionText) {
    const trimmed = questionText.trim();
    if (!trimmed) return;

    // Display user message in chat
    appendMessage('user', trimmed);

    // Disable input while typing
    userInput.value = '';
    userInput.disabled = true;

    // Show typing indicator
    if (typingIndicator) {
      typingIndicator.style.display = 'flex';
      scrollChatToBottom();
    }

    // Brief simulated thinking delay (650ms) for realistic UX
    setTimeout(() => {
      // Hide typing indicator
      if (typingIndicator) {
        typingIndicator.style.display = 'none';
      }

      // Match query in local rule engine
      const result = matchUserQuery(trimmed);

      // Display bot response
      appendMessage('bot', result.response, result.isEmergency);

      // Re-enable and refocus input field
      userInput.disabled = false;
      userInput.focus();
    }, 650);
  }

  // Handle Chat Form Submit
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const question = userInput.value;
      handleUserQuestion(question);
    });
  }

  // Handle Suggested Question Chips Click
  if (suggestionsList) {
    suggestionsList.addEventListener('click', (e) => {
      const button = e.target.closest('.suggestion-chip');
      if (button) {
        const question = button.getAttribute('data-question');
        if (question) {
          handleUserQuestion(question);
        }
      }
    });
  }

  // Handle Clear Chat Button
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      // Keep only initial welcome greeting
      chatMessagesContainer.innerHTML = `
        <div class="message-row bot-row">
          <div class="message-avatar" aria-hidden="true">MB</div>
          <div class="message-bubble bot-bubble">
            <div class="bubble-header">
              <strong class="sender-name">MediBot</strong>
              <span class="timestamp">${formatTime()}</span>
            </div>
            <div class="bubble-content">
              <p>Chat history cleared. I am <strong>MediBot</strong>, ready to assist your healthcare learning.</p>
              <p><em>What health or wellness question can I answer for you?</em></p>
            </div>
          </div>
        </div>
      `;
      scrollChatToBottom();
      userInput.focus();
    });
  }

  /* ==========================================================================
     4. Health Topics Modal Logic & Keyboard Accessibility
     ========================================================================== */
  const modalBackdrop = document.getElementById('topic-modal');
  const modalTopicTitle = document.getElementById('modal-topic-title');
  const modalCategoryText = document.getElementById('modal-category-text');
  const modalIconContainer = document.getElementById('modal-icon-container');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalAskBtn = document.getElementById('modal-ask-btn');

  let activeModalTopicId = null;
  let lastFocusedElement = null;

  /**
   * Open the educational modal with topic details
   */
  function openTopicModal(topicId) {
    const topicData = HEALTH_TOPICS_DATA[topicId];
    if (!topicData) return;

    activeModalTopicId = topicId;
    lastFocusedElement = document.activeElement;

    // Populate modal contents
    modalCategoryText.textContent = topicData.category;
    modalTopicTitle.textContent = topicData.title;
    modalIconContainer.innerHTML = topicData.iconSvg;
    modalBodyContent.innerHTML = topicData.content;

    // Show modal & set ARIA states
    modalBackdrop.style.display = 'flex';
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll

    // Focus close button for keyboard accessibility
    modalCloseBtn.focus();
  }

  /**
   * Close the modal and restore focus
   */
  function closeTopicModal() {
    modalBackdrop.style.display = 'none';
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scroll

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
    activeModalTopicId = null;
  }

  // Topic Buttons Click Handlers (In cards and footer)
  document.querySelectorAll('[data-topic]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const topicId = btn.getAttribute('data-topic');
      if (topicId) {
        openTopicModal(topicId);
      }
    });
  });

  // Modal Close & Dismiss Buttons
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeTopicModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeTopicModal);

  // Close when clicking modal backdrop overlay outside the card
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeTopicModal();
      }
    });
  }

  // "Ask MediBot About This" Button inside Modal
  if (modalAskBtn) {
    modalAskBtn.addEventListener('click', () => {
      const topicId = activeModalTopicId;
      closeTopicModal();

      // Scroll smoothly to chatbot section
      const chatbotSection = document.getElementById('chatbot');
      if (chatbotSection) {
        chatbotSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Pre-fill query based on topic
      let promptQuery = 'Tell me about healthy lifestyle habits';
      if (topicId === 'symptoms') promptQuery = 'What are common cold symptoms?';
      else if (topicId === 'conditions') promptQuery = 'What are normal blood pressure ranges?';
      else if (topicId === 'nutrition') promptQuery = 'How can I maintain a healthy diet?';
      else if (topicId === 'fitness') promptQuery = 'What are recommendations for daily exercise?';
      else if (topicId === 'mental') promptQuery = 'How can I manage everyday stress?';
      else if (topicId === 'medications') promptQuery = 'What are key medication safety principles?';

      setTimeout(() => {
        handleUserQuestion(promptQuery);
      }, 400);
    });
  }

  // Trap Focus & Escape Key inside Modal
  document.addEventListener('keydown', (e) => {
    if (modalBackdrop.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') {
        closeTopicModal();
      }

      // Focus trap within modal
      if (e.key === 'Tab') {
        const focusableElements = modalBackdrop.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  });

  /* ==========================================================================
     5. Mobile Navigation Menu Toggle & Link Handling
     ========================================================================== */
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', () => {
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('is-open', !isExpanded);
    });

    // Close mobile nav when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
      });
    });
  }

  /* ==========================================================================
     6. Active Navigation Link on Scroll
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], header[id]');
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}` || (currentSectionId === 'top' && href === '#top')) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  /* ==========================================================================
     7. Contact Form Client-Side Validation
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const contactName = document.getElementById('contact-name');
  const contactEmail = document.getElementById('contact-email');
  const contactMessage = document.getElementById('contact-message');
  const formFeedback = document.getElementById('form-feedback');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');

  // Simple, standard RFC 5322-compliant email regex
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /**
   * Set field validation state and error message
   */
  function setFieldState(field, errorEl, isValid, message = '') {
    if (isValid) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      errorEl.classList.remove('visible');
      errorEl.textContent = '';
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
      errorEl.classList.add('visible');
      errorEl.textContent = message;
    }
  }

  // Real-time input validation cleanups
  if (contactName) {
    contactName.addEventListener('input', () => {
      if (contactName.value.trim().length >= 2) {
        setFieldState(contactName, errorName, true);
      }
    });
  }

  if (contactEmail) {
    contactEmail.addEventListener('input', () => {
      if (EMAIL_REGEX.test(contactEmail.value.trim())) {
        setFieldState(contactEmail, errorEmail, true);
      }
    });
  }

  if (contactMessage) {
    contactMessage.addEventListener('input', () => {
      if (contactMessage.value.trim().length >= 10) {
        setFieldState(contactMessage, errorMessage, true);
      }
    });
  }

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let formIsValid = true;

      // 1. Validate Name
      const nameVal = contactName.value.trim();
      if (!nameVal) {
        setFieldState(contactName, errorName, false, 'Please enter your full name.');
        formIsValid = false;
      } else if (nameVal.length < 2) {
        setFieldState(contactName, errorName, false, 'Name must be at least 2 characters.');
        formIsValid = false;
      } else {
        setFieldState(contactName, errorName, true);
      }

      // 2. Validate Email
      const emailVal = contactEmail.value.trim();
      if (!emailVal) {
        setFieldState(contactEmail, errorEmail, false, 'Please enter your email address.');
        formIsValid = false;
      } else if (!EMAIL_REGEX.test(emailVal)) {
        setFieldState(contactEmail, errorEmail, false, 'Please provide a valid email format (e.g., name@domain.com).');
        formIsValid = false;
      } else {
        setFieldState(contactEmail, errorEmail, true);
      }

      // 3. Validate Message
      const messageVal = contactMessage.value.trim();
      if (!messageVal) {
        setFieldState(contactMessage, errorMessage, false, 'Please enter your message.');
        formIsValid = false;
      } else if (messageVal.length < 10) {
        setFieldState(contactMessage, errorMessage, false, 'Message must be at least 10 characters long.');
        formIsValid = false;
      } else {
        setFieldState(contactMessage, errorMessage, true);
      }

      // Handle Feedback Banner
      if (formIsValid) {
        formFeedback.className = 'form-feedback-banner success';
        formFeedback.style.display = 'block';
        formFeedback.innerHTML = `
          <strong>✓ Form Successfully Validated!</strong>
          <p>Thank you, <strong>${escapeHtml(nameVal)}</strong>. Your message was validated client-side.</p>
          <p style="font-size: 0.8125rem; margin-top: 6px; opacity: 0.9;">
            <em>Note: Because MediBot is a pure front-end demonstration, no backend email server was contacted. Your message was safely checked in your local browser.</em>
          </p>
        `;

        // Reset form fields
        contactForm.reset();
        [contactName, contactEmail, contactMessage].forEach((f) => {
          f.classList.remove('is-valid', 'is-invalid');
        });

        // Scroll feedback banner into view
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        formFeedback.className = 'form-feedback-banner error';
        formFeedback.style.display = 'block';
        formFeedback.innerHTML = `
          <strong>Please correct the highlighted fields above.</strong>
        `;
      }
    });
  }

  // Helper function to escape HTML special characters
  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }

  /* ==========================================================================
     8. Footer Dynamic Current Year
     ========================================================================== */
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
