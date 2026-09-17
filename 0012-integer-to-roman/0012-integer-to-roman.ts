function intToRoman(num: number): string {
    // Map values to their Roman numeral symbols in descending order
    const romanMap: [number, string][] = [
        [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
        [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
        [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];
    
    let result = "";
    
    // Loop through the map and greedily subtract values
    for (const [value, symbol] of romanMap) {
        if (num === 0) break;
        
        // Determine how many times the symbol fits into the current number
        const count = Math.floor(num / value);
        if (count > 0) {
            result += symbol.repeat(count);
            num -= value * count;
        }
    }
    
    return result;
}

// --- Test Cases ---
console.log(intToRoman(3749)); // Output: "MMMDCCXLIX"
console.log(intToRoman(58));   // Output: "LVIII"
console.log(intToRoman(1994)); // Output: "MCMXCIV"
