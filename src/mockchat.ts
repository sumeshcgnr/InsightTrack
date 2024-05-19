
export interface message {
    UserName: string;
    UserEmail: string;
    Date: string;
    Text: string;
    Type: string;
    Anonymous?: boolean;
}

export interface topicMessages {
    Id: number;
    Messages: message[];
}

export let topicMsgs: topicMessages[];

let new_Date: Date = new Date();

topicMsgs = [{
    Id: 1,
    Messages: [
        {
            UserName: "John",
            UserEmail: "john@example.com",
            Date: new_Date.toLocaleString(),
            Text: "Hello World!",
            Type: "thought"
        },
        {
            UserName: "Alice",
            UserEmail: "alice@example.com",
            Date: new_Date.toLocaleString(),
            Text: "Hi there!",
            Type: "question"
        },
        {
            UserName: "Bob",
            UserEmail: "bob@example.com",
            Date: new_Date.toLocaleString(),
            Text: "Nice to meet you!",
            Type: "insight",
            Anonymous: true
        },
        {
            UserName: "Sarah",
            UserEmail: "sarah@example.com",
            Date: new_Date.toLocaleString(),
            Text: "How are you?",
            Type: "question"
        },
        {
            UserName: "Mike",
            UserEmail: "mike@example.com",
            Date: new_Date.toLocaleString(),
            Text: "I have a suggestion.",
            Type: "insight"
        },
        {
            UserName: "Emily",
            UserEmail: "emily@example.com",
            Date: new_Date.toLocaleString(),
            Text: "What's the weather like today?",
            Type: "thought",
            Anonymous: true
        },
        {
            UserName: "David",
            UserEmail: "david@example.com",
            Date: new_Date.toLocaleString(),
            Text: "I need help with a coding problem.",
            Type: "question"
        },
        {
            UserName: "Alex",
            UserEmail: "alex@example.com",
            Date: new_Date.toLocaleString(),
            Text: "I have a question.",
            Type: "question"
        },
        {
            UserName: "Olivia",
            UserEmail: "olivia@example.com",
            Date: new_Date.toLocaleString(),
            Text: "I like this topic.",
            Type: "insight"
        },
        {
            UserName: "Daniel",
            UserEmail: "daniel@example.com",
            Date: new_Date.toLocaleString(),
            Text: "What's your opinion?",
            Type: "thought"
        },
        {
            UserName: "Sophia",
            UserEmail: "sophia@example.com",
            Date: new_Date.toLocaleString(),
            Text: "I need some help.",
            Type: "question"
        },
        {
            UserName: "Ethan",
            UserEmail: "ethan@example.com",
            Date: new_Date.toLocaleString(),
            Text: "I have an insight to share.",
            Type: "insight"
        }
    ]
}];

function getEntryCountByUserName(userName: string): number {
    let count = 0;
    for (const topic of topicMsgs) {
        for (const message of topic.Messages) {
            if (message.UserName === userName) {
                count++;
            }
        }
    }
    return count;
}

console.log(getEntryCountByUserName("John")); // Output: 1
console.log(getEntryCountByUserName("Alice")); // Output: 1
console.log(getEntryCountByUserName("Bob")); // Output: 1
console.log(getEntryCountByUserName("Sarah")); // Output: 1
console.log(getEntryCountByUserName("Mike")); // Output: 1
console.log(getEntryCountByUserName("Emily")); // Output: 1
console.log(getEntryCountByUserName("David")); // Output: 1