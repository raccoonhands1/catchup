import { create } from 'zustand';
import { ITopic } from '@/lib/types';

interface TopicStore {
	selectedTopic: ITopic | null;
	setTopic: (topic: ITopic) => void;
	clearTopic: () => void;
}
// TODO: move to next path query param
const useTopicStore = create<TopicStore>(set => ({
	// The currently selected topic
	selectedTopic: null,

	// Set the selected topic
	setTopic: (topic: ITopic) => set({ selectedTopic: topic }),

	// Clear the selected topic
	clearTopic: () => set({ selectedTopic: null }),
}));

export default useTopicStore;
