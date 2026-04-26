const FoodSutraLogic = {
    // Ingredient Map: [Type, Avg Calories per serving, Ayurvedic Nature]
    data: {
        "milk": ["dairy", 150, "heavy"],
        "dahi": ["curd", 100, "heavy"],
        "yogurt": ["curd", 100, "heavy"],
        "cheese": ["dairy", 200, "heavy"],
        "paneer": ["dairy", 180, "heavy"],
        "pizza": ["starch", 600, "heavy"],
        "burger": ["starch", 500, "heavy"],
        "noodles": ["starch", 350, "heavy"],
        "rice": ["starch", 200, "light"],
        "fish": ["fish", 250, "hot"],
        "chicken": ["meat", 300, "heavy"],
        "meat": ["meat", 400, "heavy"],
        "banana": ["fruit", 100, "heavy"],
        "mango": ["fruit", 120, "heavy"],
        "lemon": ["acid", 10, "light"],
        "honey": ["honey", 60, "dry"],
        "fries": ["starch", 300, "heavy"],
        "thali": ["meal", 800, "balanced"]
    },
    
    rules: [
        { pair: ["dairy", "fish"], reason: "Causes skin toxicity and blocks micro-channels (Srotas)." },
        { pair: ["dairy", "fruit"], reason: "Causes fermentation and bloating. Avoid Shakes with heavy meals." },
        { pair: ["dairy", "acid"], reason: "Instantly curdles in the gut, causing acid reflux." },
        { pair: ["meat", "dairy"], reason: "Two conflicting animal proteins; very hard for the liver to process." },
        { pair: ["honey", "meat"], reason: "Incompatible potency; creates digestive metabolic waste (Ama)." }
    ],

    check: function(text) {
        const lowerText = text.toLowerCase();
        let foundTypes = new Set();
        let detectedNames = [];
        let totalCalories = 0;

        for (let [item, info] of Object.entries(this.data)) {
            if (lowerText.includes(item)) {
                foundTypes.add(info[0]);
                detectedNames.push(item.charAt(0).toUpperCase() + item.slice(1));
                totalCalories += info[1];
            }
        }

        const typeArray = Array.from(foundTypes);
        let conflicts = [];

        for (let i = 0; i < typeArray.length; i++) {
            for (let j = i + 1; j < typeArray.length; j++) {
                const match = this.rules.find(r => 
                    r.pair.includes(typeArray[i]) && r.pair.includes(typeArray[j])
                );
                if (match) conflicts.push({ a: typeArray[i], b: typeArray[j], reason: match.reason });
            }
        }

        return { 
            found: [...new Set(detectedNames)], 
            conflicts, 
            calories: totalCalories 
        };
    }
};
