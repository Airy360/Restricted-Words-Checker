// List of restricted keywords
const restrictedKeywords = [
    "brands", "Dishwasher safe", "Dishwasher-safe", "plants-based", "pro-biotics", "plastic", 
    "survival", "competitor", "eco-", "hygienic", "mental", "sanitation", "sanitary", "100% Natural", 
    "Chic", "Sustainable", "Eco-friendly", "Eco Friendly", "Biodegradable", "Skin-friendly", "free", "toxic", 
    "weight loss", "anxiety", "recovery", "cure", "relief", "compostable", "recyclable", "disposable", 
    "healthy", "furry", "FDA", "disease", "all-natural", "earth-friendly", "high-quality", "top-grade", 
    "best", "premium", "invincible", "indestructible", "insect", "pesticides", "chemical", 
    "toxin", "contamination", "contaminants", "detox", "certified", "tested", "guaranteed", 
    "validated", "bacteria", "germs", "treatment", "heal", "treat", "ADHD", "detoxify", "miracle", 
    "paraben", "sulphates", "drugs", "complaint", "cruelty-free", "vegan", "vegetarian", "therapy", 
    "allergens", "BPA-free", "hypoallergenic", "alleviate", "medical", "safe", "safety", "Non-GMO", 
    "assured", "proven", "fungus", "mold", "burn fat", "depression", "essential oils", "autistic", 
    "mildew", "virus", "viral", "remedy", "better", "allergies", "dust mites", "health", "irritant", 
    "irritation", "anxiety", "weighted", "stress", "earth friendly", "earth-friendly", "food-grade",
    "food grade", "pathogens", "dead", "acne", "treatments", "clinically", "naturally", "healthier", 
    "allergen", "ADHD", "flu", "environmentally friendly", "100% organic", "organic", "high quality",
    "chemicals", "planet-friendly", "planet friendly", "eco-conscious", "worry-free", "safer", "antibacterial",
    "inflammation", "bacterial", "recommended", "trusted", "paraben", "safely", "medicated", "sulfate",
    "alopecia", "ageing", "aging", "testing", "toxins", "toxin", "anti-bacterial", "germs", "bacterial",
    "illness", "safest", "antibiotics", "antibiotic", "healing", "eczema", "anti-biotic", "anti-biotics",
    "100% Cotton", "100% Pure Cotton",
];

const suggestionsMap = {
    "Brands": ["product lines", "collections"],
    "Dishwasher safe": ["compatible with dishwashers", "dishwasher-friendly"],
    "Dishwasher-safe": ["compatible with dishwashers", "dishwasher-friendly"],
    "Plants-based": ["plant-derived", "botanical"],
    "Pro-biotics": ["gut-friendly ingredients", "beneficial cultures"],
    "Plastic": ["synthetic materials", "durable polymers"],
    "Survival": ["outdoor-ready", "adventure-proof"],
    "Competitor": ["rivals"],
    "Eco-": ["Good for the planet", "the right choice", "make a difference"],
    "Hygienic": ["clean"],
    "Mental": ["cognitive", "emotional"],
    "Sanitation": ["cleanliness"],
    "Sanitary": ["clean"],
    "100% Natural": ["pure"],
    "Chic": ["stylish", "trendy"],
    "Sustainable": ["resource-friendly", "long-lasting"],
    "Eco-friendly": ["Good for the planet", "the right choice", "make a difference"],
    "Eco Friendly": ["Good for the planet", "the right choice", "make a difference"],
    "Biodegradable": ["decomposing", "break-down-friendly"],
    "Skin-friendly": ["gentle on skin", "skin-conscious"],
    "free": ["no added", "without", "does not contain"],
    "Toxic": ["unsafe"],
    "Weight loss": ["weight management", "body transformation"],
    "Anxiety": ["calming"],
    "Recovery": ["rejuvenation", "renewal"],
    "Cure": ["support", "improvement"],
    "Relief": ["soothing", "comfort"],
    "Compostable": ["waste-friendly"],
    "Recyclable": ["reuse-friendly", "repurposable material"],
    "Disposable": ["single-use", "convenient"],
    "Healthy": ["wellness-supporting", "vitality-boosting"],
    "Furry": ["plush", "soft-textured"],
    "FDA": ["regulatory-compliant"],
    "Disease": ["conditions", "under the weather"],
    "All-natural": ["sourced from the goodness of Earth"],
    "Earth-friendly": ["planet-friendly", "eco-conscious"],
    "High-quality": ["top-tier", "top-quality"],
    "Top-grade": ["quality", "top-tier", "top-quality"],
    "Best": ["leading"],
    "Premium": ["exceptional", "high-standard"],
    "Invincible": ["highly durable", "ultra-durable", "incredibly strong"],
    "Indestructible": ["long-lasting", "resilient"],
    "Insect": ["critter"],
    "Pesticides": ["critter-control solutions"],
    "Chemical": ["synthetic compounds", "artificial substances"],
    "Anti-": ["preventive", "resistant to"],
    "Toxin": ["unwanted substance"],
    "Contamination": ["impurities", "foreign particles"],
    "Contaminants": ["unwanted elements", "residues"],
    "Detox": ["cleanse", "refresh"],
    "Certified": ["verified", "authenticated"],
    "Tested": ["reviewed"],
    "Guaranteed": ["assured", "backed by results"],
    "Validated": ["confirmed", "substantiated"],
    "Bacteria": ["invisible agents"],
    "Germs": ["microscopic agents"],
    "Treatment": ["care", "solution"],
    "Heal": ["repair", "restore"],
    "Treat": ["care for", "manage"],
    "ADHD": ["focus-related challenges", "concentration issues"],
    "Detoxify": ["cleanse", "purify"],
    "Miracle": ["breakthrough", "exceptional"],
    "Paraben": ["preservative", "synthetic ingredient"],
    "Sulphates": ["cleansing agents", "foaming compounds"],
    "Drugs": ["medications", "substances"],
    "Complaint": ["concern", "issue"],
    "Cruelty-free": ["ethical production"],
    "Vegan": ["plant-based", "animal-free"],
    "Vegetarian": ["meat-free", "plant-rich"],
    "Therapy": ["support", "wellness regimen"],
    "Allergens": ["sensitivities", "irritants"],
    "BPA-free": ["BPA-absent", "without BPA"],
    "Hypoallergenic": ["gentle on sensitive skin"],
    "Alleviate": ["ease", "reduce"],
    "Medical": ["wellness-focused"],
    "Safe": ["secure", "non-harmful"],
    "Safety": ["protection", "risk-free"],
    "Non-GMO": ["genetically unmodified"],
    "Assured": ["backed", "promised"],
    "Proven": ["demonstrated", "shown"],
    "Fungus": ["fungal agents"],
    "Mold": ["mildew-related", "unwanted growth"],
    "Burn fat": ["fat management", "metabolism support"],
    "Depression": ["low mood", "emotional imbalance"],
    "Essential oils": ["extracts", "plant oils"],
    "Autistic": ["neurodiverse", "special needs"],
    "Mildew": ["unwanted growth"],
    "Virus": [], // No alternatives allowed
    "Viral": ["contagious", "spreadable"],
    "Remedy": ["support", "solution"],
    "Better": ["improved", "enhanced"],
    "Allergies": ["sensitivities", "reactions"],
    "Dust mites": ["tiny particles"],
    "Health": ["well-being", "wellness"],
    "Irritant": ["sensitivity-causing", "reactive"],
    "Irritation": ["discomfort", "sensitivity"],
    "Weighted": ["pressure-assisting", "comfort-enhancing"],
    "Stress": ["pressure"],
    "Earth-friendly": ["Good for the planet", "the right choice", "make a difference"],
    "Earth friendly": ["Good for the planet", "the right choice", "make a difference"],
    "Food-grade": ["suitable for consumption"],
    "Food grade": ["suitable for consumption"],
    "Pathogens": ["unwanted microscopic elements"],
    "Dead": ["expired", "inactive"],
  };

  function displaySuggestions(restrictedWordsFound) {
    const suggestionBox = document.getElementById('suggestion-box');
    const h3Suggestions = document.getElementById('h3suggestions');
    suggestionBox.innerHTML = ''; // Clear previous suggestions but keep the h3 element

    // Append the h3 element back to the suggestionBox
    suggestionBox.appendChild(h3Suggestions);

    // Normalize suggestionsMap keys to lowercase
    const normalizedSuggestionsMap = {};
    for (const key in suggestionsMap) {
        if (suggestionsMap.hasOwnProperty(key)) {
            normalizedSuggestionsMap[key.toLowerCase()] = suggestionsMap[key];
        }
    }

    restrictedWordsFound.forEach(keyword => {
        // Normalize keyword to lowercase
        const lowerCaseKeyword = keyword.toLowerCase();

        // Check if the normalized suggestionsMap has the key
        if (normalizedSuggestionsMap[lowerCaseKeyword]) {
            let suggestions = normalizedSuggestionsMap[lowerCaseKeyword].join(', ');
            let suggestionItem = document.createElement('p');
            suggestionItem.innerHTML = `<strong>${keyword}:</strong> ${suggestions}`;
            suggestionBox.appendChild(suggestionItem);
        } else {
            // Show message if no suggestions are found for the keyword
            let noSuggestionsItem = document.createElement('p');
            noSuggestionsItem.innerHTML = `<strong>${keyword}:</strong> No suggestions available.`;
            suggestionBox.appendChild(noSuggestionsItem);
        }
    });
}

document.querySelector(".submit-button").addEventListener("click", () => {
    const description = document.getElementById("product-description").value;
    let highlightedDescription = description;
    let restrictedWordsFound = [];
    
    restrictedKeywords.forEach(keyword => {
        const keywordRegex = new RegExp(`\\b${keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, "gi");
        if (keywordRegex.test(description)) {
            restrictedWordsFound.push(keyword);
            highlightedDescription = highlightedDescription.replace(keywordRegex, match => `<span class="highlight">${match}</span>`);
        }
    });

    if (restrictedWordsFound.length > 0) {
        document.getElementById("warning").innerHTML = 
            `Warning: Your product description contains restricted keywords: <strong>${restrictedWordsFound.join(', ')}</strong>`;
        document.getElementById("product-description").innerHTML = highlightedDescription;
        document.getElementById("warning").style.color = "red";
    } else {
        document.getElementById("warning").innerHTML = "Your product description is good to go!";
        document.getElementById("warning").style.color = "green";
    }
    displaySuggestions(restrictedWordsFound);
});
