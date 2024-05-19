export interface topic {
    Id: number;
    Name: string;
    Abstract: string;
    ShortName: string;
    ShortDesc: string;
    Speaker: string;
    Moderator: string;
    Venue: string;
    Date: string;
    Active: boolean;
  }

export let topicMockList: topic[];
topicMockList = [
    {
        Id: 1,
        Name: "Identifying Stratergies to Promote a Stronger Learning Experience by Reducing the Stressors Specific to First Year Practical Nursing Students",
        Abstract: "This research explored first year Practical nursing students’ experiences in the Practical Nursing(RPC) program at Centennial College. The central objective of this research was to identify the challenges (particularly related to teaching and learning) that students enrolled in the RPN program encounter as they progress. Surveys and interviews were conducted with students enrolled in an introductory anatomy class of the RPN program, Social, demographic, economic and cultural factors as well as information on preferred methods of teaching and learning were taken into account to determine their influence on students experiences and performance in the program. The focus of this research was to identify challenges and barriers to 1st year RPN students with the aim to recommend supports and strategies that can effectively reduce and or eliminates these barriers and challenges, and subsequently improve the quality of the RPN program at Centennial College",
        ShortName: "RPC Program at Centennial College",
        ShortDesc: "This research explored first year Practical nursing students’ experiences in the Practical Nursing(RPC) program at Centennial College.",
        Speaker: "Coleen Karr",
        Moderator: "Michelle Connell",
        Venue: "L1 - 10",
        Date: "2.00PM - 3.00 PM, 2022-01-01",
        Active: true
    },
    {
        Id: 2,
        Name: "Stronger Learning Experience by Reducing the Stressors Specific to First Year Practical Nu",
        Abstract: "This research explored first year Practical nursing students’ experiences in the Practical Nursing(RPC) program at Centennial College. The central objective of this research was to identify the challenges (particularly related to teaching and learning) that students enrolled in the RPN program encounter as they progress. Surveys and interviews were conducted with students enrolled in an introductory anatomy class of the RPN program, Social, demographic, ",
        ShortName: "Toptic 2",
        ShortDesc: "Short description 2",
        Speaker: "Speaker 2",
        Moderator: "Moderator 2",
        Venue: "Venue 2",
        Date: "2022-02-02",
        Active: true
    },
    {
        Id: 3,
        Name: "Topic 3",
        Abstract: "Abstract 3",
        ShortName: "Topic 3",
        ShortDesc: "Short description 3",
        Speaker: "Speaker 3",
        Moderator: "Moderator 3",
        Venue: "Venue 3",
        Date: "2022-03-03",
        Active: true
    }
];