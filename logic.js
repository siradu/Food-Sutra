const FoodSutraLogic = {
    // Basic category mapping
    ingredients: {
        "paneer": "DAIRY", "cheese": "DAIRY", "milk": "DAIRY",
        "dahi": "CURD", "yogurt": "CURD",
        "fish": "FISH",
        "chicken": "MEAT", "meat": "MEAT", "mutton": "MEAT",
        "pizza": "STARCH", "burger": "STARCH", "noodles": "STARCH", "fries": "STARCH",
        "mango": "FRUIT", "banana": "FRUIT", "apple": "FRUIT",
        "lemon": "ACID", "lime": "ACID"
    },

    // Harmony rules
    rules: [
        { a: "DAIRY", b: "FISH", severity: "TOXIC CLASH", msg: "Milk and Fish together create deep toxins in the blood." },
        { a: "DAIRY", b: "FRUIT", severity: "DIGESTIVE CLASH", msg: "Milk and Fruit have different speeds, causing gut fermentation." },
        { a: "MEAT", b: "DAIRY", severity: "HEAVY LOAD", msg: "Mixing different animal proteins overloads the digestive fire." },
        { a: "CURD", b: "ACID", severity: "ACIDITY ALERT", msg: "Double sourness (Curd + Citrus) causes sharp spikes in body heat." }
    ],

    runAnalysis: function(text) {
        const input = text.toLowerCase();
        let itemsFound = [];
        let typesFound = new Set();

        for (let [keyword, type] of Object.entries(this.ingredients)) {
            if (input.includes(keyword)) {
                itemsFound.push(keyword.toUpperCase());
                typesFound.add(type);
            }
        }

        const typeList = Array.from(typesFound);
        let alerts = [];
        let score = 100;

        for (let i = 0; i < typeList.length; i++) {
            for (let j = i + 1; j < typeList.length; j++) {
                const match = this.rules.find(r => 
                    (r.a === typeList[i] && r.b === typeList[j]) || 
                    (r.a === typeList[j] && r.b === typeList[i])
                );
                if (match) {
                    alerts.push(match);
                    score -= 30;
                }
            }
        }

        return {
            itemsFound: [...new Set(itemsFound)],
            alerts: alerts,
            harmonyScore: Math.max(score, 10)
        };
    }
};
