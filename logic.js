const FoodSutraLogic = {
    ingredients: {
        "paneer": "DAIRY", "cheese": "DAIRY", "milk": "DAIRY",
        "dahi": "CURD", "yogurt": "CURD", "fish": "FISH",
        "chicken": "MEAT", "meat": "MEAT", "noodles": "STARCH",
        "pizza": "STARCH", "burger": "STARCH", "mango": "FRUIT",
        "banana": "FRUIT", "lemon": "ACID"
    },
    rules: [
        { a: "DAIRY", b: "FISH", severity: "TOXIC", msg: "Milk and Fish cause skin issues." },
        { a: "DAIRY", b: "FRUIT", severity: "BAD", msg: "Milk and Fruit cause fermentation." },
        { a: "MEAT", b: "DAIRY", severity: "HEAVY", msg: "Mixing proteins overloads the liver." }
    ],
    runAnalysis: function(text) {
        const input = text.toLowerCase();
        let itemsFound = [];
        let typesFound = new Set();
        for (let [key, type] of Object.entries(this.ingredients)) {
            if (input.includes(key)) {
                itemsFound.push(key.toUpperCase());
                typesFound.add(type);
            }
        }
        const typeList = Array.from(typesFound);
        let alerts = [];
        let score = 100;
        for (let i = 0; i < typeList.length; i++) {
            for (let j = i + 1; j < typeList.length; j++) {
                const match = this.rules.find(r => (r.a === typeList[i] && r.b === typeList[j]) || (r.a === typeList[j] && r.b === typeList[i]));
                if (match) { alerts.push(match); score -= 30; }
            }
        }
        return { itemsFound: [...new Set(itemsFound)], alerts: alerts, harmonyScore: Math.max(score, 10) };
    }
};
