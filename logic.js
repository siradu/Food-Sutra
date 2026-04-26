const FoodSutraLogic = {
    // CATEGORIES: Mapping keywords to their Ayurvedic & Nutritional profile
    map: {
        "paneer": { type: "DAIRY", cal: 180, bio: "Heavy/Cooling" },
        "dahi": { type: "CURD", cal: 100, bio: "Sour/Heavy" },
        "cheese": { type: "DAIRY", cal: 200, bio: "Heavy" },
        "milk": { type: "DAIRY", cal: 150, bio: "Cooling" },
        "fish": { type: "FISH", cal: 250, bio: "Heating" },
        "chicken": { type: "MEAT", cal: 300, bio: "Heavy" },
        "meat": { type: "MEAT", cal: 400, bio: "Very Heavy" },
        "noodles": { type: "STARCH", cal: 350, bio: "Slow" },
        "pizza": { type: "STARCH", cal: 600, bio: "Slow/Heavy" },
        "burger": { type: "STARCH", cal: 500, bio: "Heavy" },
        "lemon": { type: "ACID", cal: 10, bio: "Sharp" },
        "honey": { type: "HONEY", cal: 60, bio: "Dry" },
        "mango": { type: "FRUIT", cal: 120, bio: "Sweet" },
        "banana": { type: "FRUIT", cal: 100, bio: "Heavy Sweet" },
        "thali": { type: "MEAL", cal: 800, bio: "Mixed" }
    },

    // INTELLIGENT RULES with "Antidotes"
    rules: [
        { 
            a: "DAIRY", b: "FISH", 
            score: "TOXIC",
            msg: "Severe incompatibility. These create 'Ama' (toxins) that clog blood channels.",
            antidote: "Drink warm ginger water if consumed." 
        },
        { 
            a: "DAIRY", b: "FRUIT", 
            score: "POOR",
            msg: "Milk and fruit have different digestion speeds. This leads to gut fermentation.",
            antidote: "Wait 2 hours between milk and fruit." 
        },
        { 
            a: "MEAT", b: "DAIRY", 
            score: "HEAVY",
            msg: "Mixing two different animal proteins overloads the liver.",
            antidote: "Add black pepper or cumin to aid digestion." 
        },
        { 
            a: "CURD", b: "ACID", 
            score: "ACIDIC",
            msg: "Excessive sourness can aggravate Pitta (body heat).",
            antidote: "A bit of jaggery (Gud) can help balance this." 
        }
    ],

    check: function(text) {
        const input = text.toLowerCase();
        let detected = [];
        let totalCal = 0;
        let activeTypes = {};

        // Smart Detection
        for (let [key, data] of Object.entries(this.map)) {
            if (input.includes(key)) {
                detected.push(key.toUpperCase());
                totalCal += data.cal;
                activeTypes[data.type] = true;
            }
        }

        const types = Object.keys(activeTypes);
        let results = [];
        let harmonyScore = 100;

        // Harmony Calculation
        for (let i = 0; i < types.length; i++) {
            for (let j = i + 1; j < types.length; j++) {
                const match = this.rules.find(r => 
                    (r.a === types[i] && r.b === types[j]) || (r.a === types[j] && r.b === types[i])
                );
                if (match) {
                    results.push(match);
                    harmonyScore -= 30;
                }
            }
        }

        return {
            items: [...new Set(detected)],
            analysis: results,
            calories: totalCal,
            score: Math.max(harmonyScore, 10)
        };
    }
};
