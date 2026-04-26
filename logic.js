const FoodSutraLogic = {
    // Database: Keyword -> { Category, Calories, Bio-Nature }
    map: {
        "paneer": { cat: "DAIRY", cal: 180 },
        "dahi": { cat: "CURD", cal: 100 },
        "yogurt": { cat: "CURD", cal: 100 },
        "cheese": { cat: "DAIRY", cal: 200 },
        "milk": { cat: "DAIRY", cal: 150 },
        "fish": { cat: "FISH", cal: 250 },
        "chicken": { cat: "MEAT", cal: 300 },
        "meat": { cat: "MEAT", cal: 400 },
        "mutton": { cat: "MEAT", cal: 350 },
        "pizza": { cat: "STARCH", cal: 600 },
        "burger": { cat: "STARCH", cal: 500 },
        "noodles": { cat: "STARCH", cal: 350 },
        "lemon": { cat: "ACID", cal: 10 },
        "orange": { cat: "ACID", cal: 40 },
        "mango": { cat: "FRUIT", cal: 120 },
        "banana": { cat: "FRUIT", cal: 100 },
        "honey": { cat: "HONEY", cal: 60 }
    },

    // Incompatibility Rules
    rules: [
        { 
            a: "DAIRY", b: "FISH", severity: "TOXIC",
            msg: "Milk and Fish have opposite potencies. This combo clogs the body's channels.",
            antidote: "Avoid entirely, or use Ginger tea to detoxify."
        },
        { 
            a: "DAIRY", b: "FRUIT", severity: "POOR",
            msg: "Milk + Fruit ferments in the gut. This leads to gas and skin irritation.",
            antidote: "Wait 90 minutes between consuming these."
        },
        { 
            a: "MEAT", b: "DAIRY", severity: "HEAVY",
            msg: "Mixing two heavy animal proteins overloads your digestive fire (Agni).",
            antidote: "Use black pepper or buttermilk to assist digestion."
        },
        { 
            a: "CURD", b: "ACID", severity: "ACIDIC",
            msg: "Double sourness (Curd + Citrus) increases acidity and Pitta heat.",
            antidote: "A small piece of jaggery (Gud) helps balance the acid."
        }
    ],

    check: function(text) {
        const raw = text.toLowerCase();
        let detected = [];
        let totalCal = 0;
        let activeCats = {};

        // 1. Extract Info
        for (let [key, data] of Object.entries(this.map)) {
            if (raw.includes(key)) {
                detected.push(key.toUpperCase());
                totalCal += data.cal;
                activeCats[data.cat] = true;
            }
        }

        const catKeys = Object.keys(activeCats);
        let results = [];
        let harmony = 100;

        // 2. Run Compatibility Logic
        for (let i = 0; i < catKeys.length; i++) {
            for (let j = i + 1; j < catKeys.length; j++) {
                const clash = this.rules.find(r => 
                    (r.a === catKeys[i] && r.b === catKeys[j]) || (r.a === catKeys[j] && r.b === catKeys[i])
                );
                if (clash) {
                    results.push(clash);
                    harmony -= 25;
                }
            }
        }

        return {
            items: [...new Set(detected)],
            analysis: results,
            calories: totalCal, // Matches index.html request
            score: Math.max(harmony, 10)
        };
    }
};
