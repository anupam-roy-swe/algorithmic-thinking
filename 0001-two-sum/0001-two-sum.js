/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum( nums, target) {
    const seen = new Map(); // Sonkhya ebong index rakhar jonno Map

    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const remaining = target - currentNum; // Amader baki sonkhyati dorkar

        // remaining sonkhyati jodi Map-e aggei thake
        if (seen.has(remaining)) {
            return [seen.get(remaining), i];
        }

        // Na thakle current sonkhyati ebong tar index Map-e save kori
        seen.set(currentNum, i);
    }
}

// Example usage:
console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
console.log(twoSum([3, 2, 4], 6));      // Output: [1, 2]
console.log(twoSum([3, 3], 6));         // Output: [0, 1]
