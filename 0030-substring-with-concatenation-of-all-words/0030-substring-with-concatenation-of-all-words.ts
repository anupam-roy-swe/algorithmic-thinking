function findSubstring(s: string, words: string[]): number[] {
    const result: number[] = [];
    if (!s || words.length === 0) return result;

    const wordLen = words[0].length;
    const wordCount = words.length;
    const sLen = s.length;

    // ১. শব্দের ফ্রিকোয়েন্সি ট্র্যাক করার জন্য Map বা Object-এর বদলে একটি "Flat Counter" অ্যারে ব্যবহার
    const wordFrequency = new Map<string, number>();
    for (let i = 0; i < wordCount; i++) {
        wordFrequency.set(words[i], (wordFrequency.get(words[i]) || 0) + 1);
    }

    // উইন্ডো ট্র্যাকিংয়ের জন্য একটি মাত্র প্লেইন অবজেক্ট (লুপের বাইরে), যাতে নতুন করে মেমোরি এলোকেশন না হয়
    const windowFrequency: Record<string, number> = {};

    for (let i = 0; i < wordLen; i++) {
        let left = i;
        let right = i;
        let count = 0;

        // প্রতি উইন্ডো শুরুর আগে মেমোরি ক্লিন করার সবচেয়ে দ্রুততম উপায় (delete ব্যবহার না করে)
        for (const key in windowFrequency) {
            windowFrequency[key] = 0;
        }

        while (right + wordLen <= sLen) {
            const word = s.substring(right, right + wordLen);
            right += wordLen;

            const targetCount = wordFrequency.get(word);

            if (targetCount !== undefined) {
                windowFrequency[word] = (windowFrequency[word] || 0) + 1;
                
                if (windowFrequency[word] <= targetCount) {
                    count++;
                }

                while (windowFrequency[word] > targetCount) {
                    const leftWord = s.substring(left, left + wordLen);
                    windowFrequency[leftWord]--;
                    if (windowFrequency[leftWord] < (wordFrequency.get(leftWord) || 0)) {
                        count--;
                    }
                    left += wordLen;
                }

                if (count === wordCount) {
                    result.push(left);
                }
            } else {
                // অবৈধ শব্দ পেলে ডিলিট (delete) না করে শুধু ভ্যালু ০ করে দেওয়া হলো, এতে মেমোরি বাড়ে না
                if (count > 0) {
                    for (const key in windowFrequency) {
                        windowFrequency[key] = 0;
                    }
                    count = 0;
                }
                left = right;
            }
        }
    }

    return result;
}
