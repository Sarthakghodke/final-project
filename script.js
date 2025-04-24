// Symptom data - 132 common symptoms
const symptoms = [
  "Abdominal pain", "Abnormal bleeding", "Anxiety", "Back pain", "Bad breath",
  "Bladder incontinence", "Bleeding gums", "Blisters", "Blood in stool",
  "Blood in urine", "Blurred vision", "Body aches", "Breast lump", "Bruising",
  "Burning sensation", "Chest pain", "Chills", "Cold hands and feet",
  "Confusion", "Constipation", "Cough", "Cramps", "Dark urine", "Dehydration",
  "Depression", "Diarrhea", "Difficulty concentrating", "Difficulty swallowing",
  "Dizziness", "Double vision", "Dry eyes", "Dry mouth", "Dry skin", "Ear pain",
  "Excessive hunger", "Excessive thirst", "Excessive urination", "Eye pain",
  "Eye redness", "Facial pain", "Fainting", "Fatigue", "Fever", "Flaking skin",
  "Flatulence", "Flu-like symptoms", "Food cravings", "Foot pain", "Frequent urination",
  "Gas", "Groin pain", "Hair loss", "Hand pain", "Headache", "Heart palpitations",
  "Heartburn", "Hip pain", "Hoarseness", "Hot flashes", "Increased appetite",
  "Indigestion", "Insomnia", "Irregular heartbeat", "Irritability", "Itching",
  "Joint pain", "Joint stiffness", "Joint swelling", "Knee pain", "Leg pain",
  "Leg swelling", "Lightheadedness", "Loss of appetite", "Loss of balance",
  "Loss of consciousness", "Loss of coordination", "Loss of taste", "Low energy",
  "Memory problems", "Menstrual irregularities", "Mood swings", "Morning sickness",
  "Mouth sores", "Muscle aches", "Muscle cramps", "Muscle weakness", "Nail changes",
  "Nasal congestion", "Nausea", "Neck pain", "Nervousness", "Night sweats",
  "Nipple discharge", "Numbness", "Pain during intercourse", "Painful urination",
  "Pale skin", "Pelvic pain", "Poor wound healing", "Postnasal drip", "Puffy face",
  "Rapid heartbeat", "Rash", "Rectal bleeding", "Rectal pain", "Red eyes",
  "Restlessness", "Runny nose", "Seizures", "Sensitivity to light", "Shortness of breath",
  "Shoulder pain", "Sinus pressure", "Skin discoloration", "Skin rash", "Sneezing",
  "Sore throat", "Stiff neck", "Stomach cramps", "Swallowing difficulty", "Swelling",
  "Swollen glands", "Taste changes", "Tenderness", "Thirst", "Tingling", "Toothache",
  "Tremors", "Trouble sleeping", "Unintentional weight gain", "Unintentional weight loss",
  "Urinary urgency", "Vaginal bleeding", "Vaginal discharge", "Vision changes",
  "Vomiting", "Watery eyes", "Weakness", "Wheezing", "Yellow skin"
];

// Initialize symptom predictor
function initSymptomPredictor() {
  const symptomSearch = document.getElementById('symptom-search');
  const symptomList = document.getElementById('symptom-list');
  const selectedSymptoms = document.getElementById('selected-symptoms');
  const symptomDescription = document.getElementById('symptom-description');

  if (!symptomSearch || !symptomList) return;

  // Filter symptoms based on search input
  symptomSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredSymptoms = symptoms.filter(symptom => 
      symptom.toLowerCase().includes(searchTerm)
    );
    renderSymptomList(filteredSymptoms);
  });

  // Show all symptoms when search box is clicked
  symptomSearch.addEventListener('focus', function() {
    renderSymptomList(symptoms);
    document.querySelector('.dropdown-content').classList.add('show');
  });

  // Hide dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.symptom-search-container')) {
      document.querySelector('.dropdown-content')?.classList.remove('show');
    }
  });

  // Render symptom list
  function renderSymptomList(symptomsToShow) {
    symptomList.innerHTML = '';
    
    if (symptomsToShow.length === 0) {
      symptomList.innerHTML = '<div class="symptom-item">No symptoms found</div>';
      return;
    }
    
    symptomsToShow.forEach(symptom => {
      const item = document.createElement('div');
      item.className = 'symptom-item';
      item.textContent = symptom;
      item.addEventListener('click', () => selectSymptom(symptom));
      symptomList.appendChild(item);
    });
  }

  // Select a symptom
  function selectSymptom(symptom) {
    // Add to selected symptoms area
    const tag = document.createElement('div');
    tag.className = 'symptom-tag';
    tag.innerHTML = `
      ${symptom}
      <i class="fas fa-times"></i>
    `;
    
    // Add click event to remove button
    tag.querySelector('i').addEventListener('click', (e) => {
      e.stopPropagation();
      tag.remove();
    });
    
    selectedSymptoms.appendChild(tag);
    
    // Add to textarea if not already there
    if (!symptomDescription.value.includes(symptom)) {
      const currentText = symptomDescription.value.trim();
      symptomDescription.value = currentText 
        ? `${currentText}, ${symptom}`
        : symptom;
    }
    
    // Clear search and hide dropdown
    symptomSearch.value = '';
    document.querySelector('.dropdown-content').classList.remove('show');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initSymptomPredictor();
  
  // Theme toggle functionality
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeSwitch) themeSwitch.checked = true;
  }
  
  if (themeSwitch) {
    themeSwitch.addEventListener('change', function() {
      if (this.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  }
});
