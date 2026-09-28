function findSubstring(s: string, words: string[]): number[] {
    const result: number[] = [];
    if (!s || words.length === 0) return result;

    const wordLen = words[0].length; // একটি শব্দের দৈর্ঘ্য
    const wordCount = words.length;   // মোট শব্দের সংখ্যা
    const sLen = s.length;

    // ১. Map এর বদলে মেমোরি-ফ্রেন্ডলি প্লেইন অবজেক্ট ({}) ব্যবহার করা
    const wordFrequency: Record<string, number> = {};
    for (let i = 0; i < wordCount; i++) {
        wordFrequency[words[i]] = (wordFrequency[words[i]] || 0) + 1;
    }

    // ২. স্লাইডিং উইন্ডো
    for (let i = 0; i < wordLen; i++) {
        let left = i;
        let right = i;
        const windowFrequency: Record<string, number> = {};
        let count = 0;

        while (right + wordLen <= sLen) {
            // স্ট্রিং এর একটি অংশ নেওয়া
            const word = s.substring(right, right + wordLen);
            right += wordLen;

            // যদি শব্দটি আমাদের টার্গেট লিস্টে থাকে
            if (wordFrequency[word] !== undefined) {
                windowFrequency[word] = (windowFrequency[word] || 0) + 1;
                
                if (windowFrequency[word] <= wordFrequency[word]) {
                    count++;
                }

                // যদি কোনো শব্দের সংখ্যা প্রয়োজনের চেয়ে বেশি হয়ে যায়, তবে বাম দিক থেকে উইন্ডো ছোট করা
                while (windowFrequency[word] > wordFrequency[word]) {
                    const leftWord = s.substring(left, left + wordLen);
                    windowFrequency[leftWord]--;
                    if (windowFrequency[leftWord] < wordFrequency[leftWord]) {
                        count--;
                    }
                    left += wordLen;
                }

                // যখন সব শব্দ ঠিকঠাক মিলে যাবে
                if (count === wordCount) {
                    result.push(left);
                }
            } else {
                // অবৈধ শব্দ পেলে পুরো উইন্ডো মেমোরি খালি না করে শুধু কাউন্টার রিসেট করা
                for (const key in windowFrequency) {
                    delete windowFrequency[key];
                }
                count = 0;
                left = right;
            }
        }
    }

    return result;
}
