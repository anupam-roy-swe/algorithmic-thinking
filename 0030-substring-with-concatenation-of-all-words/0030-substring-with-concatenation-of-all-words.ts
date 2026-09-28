function findSubstring(s: string, words: string[]): number[] {
    const result: number[] = [];
    if (!s || words.length === 0) return result;

    const wordLen = words[0].length; // Fixed to target the length of the string item
    const wordCount = words.length;
    const totalLen = wordLen * wordCount;
    const sLen = s.length;

    // Step 1: Create a frequency map for the given words
    const wordMap = new Map<string, number>();
    for (const word of words) {
        wordMap.set(word, (wordMap.get(word) || 0) + 1);
    }

    // Step 2: Slide the window over the string
    // Fixed: Changed 'const' to 'let' so offset can increment properly
    for (let offset = 0; offset < wordLen; offset++) {
        let left = offset;
        let right = offset;
        const currentMap = new Map<string, number>();
        let matchedWordsCount = 0;

        // Keep expanding the window to the right by one word length at a time
        while (right + wordLen <= sLen) {
            const word = s.substring(right, right + wordLen);
            right += wordLen;

            if (wordMap.has(word)) {
                currentMap.set(word, (currentMap.get(word) || 0) + 1);
                matchedWordsCount++;

                // If a word's count exceeds what's required, shrink the window from the left
                while ((currentMap.get(word) || 0) > (wordMap.get(word) || 0)) {
                    const leftWord = s.substring(left, left + wordLen);
                    currentMap.set(leftWord, currentMap.get(leftWord)! - 1);
                    matchedWordsCount--;
                    left += wordLen;
                }

                // If the number of correctly matched words equals wordCount, we found a valid index
                if (matchedWordsCount === wordCount) {
                    result.push(left);
                }
            } else {
                // If the word is invalid, reset the current tracking window completely
                currentMap.clear();
                matchedWordsCount = 0;
                left = right;
            }
        }
    }

    return result;
}
