// Utility function to group chats by date
export const groupChatsByDate = (session: { _id: string; title:string; created_at: string }[], sessionLoading: boolean, error: any) => {
  if (!session || sessionLoading || error) return [];

  const grouped: Record<string, { id: string; title: string; created_at: string }[]> = {};

  session.forEach((chat: { _id: string; title: string, created_at: string }) => {
    const date = new Date(chat.created_at).toLocaleDateString(); // Format date
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push({
      id: chat._id,
      title: chat.title,
      created_at: chat.created_at,
    });
  });

  // Convert the grouped object to an array and sort by date (latest first)
  return Object.entries(grouped)
    .map(([date, chats]) => ({
      date,
      chats: chats.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), // Sort chats by created_at (latest first)
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort groups by date (latest first)
};

  
  // Utility function to format date
  export const formatDate = (date: string): string => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
  
    const chatDate = new Date(date);
    if (chatDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (chatDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date; // Default to formatted date
  };
  