// Mock data for polls
const mockPolls = [
  {
    id: 1,
    title: 'Favorite Programming Language',
    description: 'What is your favorite programming language?',
    options: ['JavaScript', 'Python', 'Java', 'C++'],
    votes: [45, 30, 15, 10],
    createdBy: 'user1@example.com',
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Best Framework',
    description: 'Which web framework do you prefer?',
    options: ['React', 'Vue', 'Angular', 'Svelte'],
    votes: [50, 25, 15, 10],
    createdBy: 'user2@example.com',
    createdAt: '2024-03-15T11:00:00Z',
  },
  {
    id: 3,
    title: 'Favorite Database',
    description: 'Which database do you use most often?',
    options: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    votes: [35, 30, 25, 10],
    createdBy: 'user3@example.com',
    createdAt: '2024-03-15T12:00:00Z',
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const api = {
  // Get all polls
  getPolls: async () => {
    await delay(500); // Simulate network delay
    return [...mockPolls];
  },

  // Get a single poll by ID
  getPoll: async (id) => {
    await delay(300);
    const poll = mockPolls.find(p => p.id === id);
    if (!poll) throw new Error('Poll not found');
    return { ...poll };
  },

  // Create a new poll
  createPoll: async (pollData) => {
    await delay(500);
    const newPoll = {
      id: mockPolls.length + 1,
      ...pollData,
      votes: new Array(pollData.options.length).fill(0),
      createdAt: new Date().toISOString(),
    };
    mockPolls.push(newPoll);
    return { ...newPoll };
  },

  // Vote on a poll
  vote: async (pollId, optionIndex) => {
    await delay(300);
    const poll = mockPolls.find(p => p.id === pollId);
    if (!poll) throw new Error('Poll not found');
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      throw new Error('Invalid option');
    }
    poll.votes[optionIndex]++;
    return { ...poll };
  },

  // Get poll results
  getPollResults: async () => {
    await delay(500);
    return mockPolls.map(poll => ({
      id: poll.id,
      title: poll.title,
      totalVotes: poll.votes.reduce((a, b) => a + b, 0),
      options: poll.options.map((name, index) => ({
        name,
        votes: poll.votes[index],
        percentage: Math.round((poll.votes[index] / poll.votes.reduce((a, b) => a + b, 0)) * 100)
      }))
    }));
  }
}; 