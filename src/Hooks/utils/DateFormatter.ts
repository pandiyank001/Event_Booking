export const formatDateTime = (timestamp: number) => {
    return {
      date: new Date(timestamp).toLocaleDateString(),
      time: new Date(timestamp).toLocaleTimeString(),
    };
  };