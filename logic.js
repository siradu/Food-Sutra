const FoodSutraLogic = {
    // Map of keywords
    database: {
        "paneer": { type: "DAIRY", cal: 180 },
        "cheese": { type: "DAIRY", cal: 200 },
        "milk": { type: "DAIRY", cal: 150 },
        "dahi": { type: "CURD", cal: 100 },
        "fish": { type: "FISH", cal: 250 },
        "chicken": { type: "MEAT", cal: 300 },
        "meat": { type: "MEAT", cal: 400 },
        "pizza": { type: "STARCH", cal: 600 },
        "burger": { type: "STARCH", cal: 500 },
        "mango": { type: "FRUIT", cal: 120 },
        "banana": { type: "FRUIT", cal: 100 },
        "lemon": { type: "ACID", cal: 10 }
    },

    // Rules
    rules: [
        { a: "DAIRY", b: "FISH", severity: "TOXIC", msg: "Milk and Fish cause skin toxicity." },
        { a: "DAIRY", b: "FRUIT", severity: "BAD", msg: "Milk and Fruit cause gut fermentation." },
        { a: "MEAT", b: "DAIRY", severity: "HEAVY", msg: "Conflicting animal proteins overload liver." }
    ],

    calculate: function(text) {
        const input = text.toLowerCase();
        let foundItems = [];
        let totalKcal = 0;
        let activeTypes = new Set();

        for (let [key, val] of Object.entries(this.database)) {
            if (input.includes(key)) {
                foundItems.push(key.toUpperCase());
                totalKcal += val.cal;
                activeTypes.add(val.type);
            }
        }

        const typeList = Array.from(activeTypes);
        let clashes = [];
        let finalScore = 100;

        for (let i = 0; i < typeList.length; i++) {
            for (let j = i + 1; j < typeList.length; j++) {
                const match = this.rules.find(r => 
                    (r.a === typeList[i] && r.b === typeList[j]) || 
                    (r.a === typeList[j] && r.b === typeList[i])
                );
                if (match) {
                    clashes.push(match);
                    finalScore -= 30;
                }
            }
        }

        return {
            foundItems: [...new Set(foundItems)],
            clashes: clashes,
            totalKcal: totalKcal, // Matches index.html exactly
            finalScore: Math.max(finalScore, 10)
        };
    }
};
