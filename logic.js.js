const FoodSutraLogic = {
    ingredients: ["milk", "fish", "lemon", "honey", "banana", "curd", "salt", "meat"],
    
    rules: [
        { pair: ["milk", "fish"], reason: "Causes extreme Ama (toxins) and skin issues." },
        { pair: ["milk", "lemon"], reason: "Acid curdles milk in the stomach, blocking channels." },
        { pair: ["milk", "banana"], reason: "Creates heaviness and slows down the mind." },
        { pair: ["honey", "hot_water"], reason: "Honey becomes toxic when heated." },
        { pair: ["curd", "milk"], reason: "Difficult to digest; causes congestion." }
    ],

    check: function(text) {
        const lowerText = text.toLowerCase();
        const found = this.ingredients.filter(item => lowerText.includes(item));
        let conflicts = [];

        for (let i = 0; i < found.length; i++) {
            for (let j = i + 1; j < found.length; j++) {
                const match = this.rules.find(r => 
                    r.pair.includes(found[i]) && r.pair.includes(found[j])
                );
                if (match) conflicts.push({ a: found[i], b: found[j], reason: match.reason });
            }
        }
        return { found, conflicts };
    }
};