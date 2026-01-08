// Helper function to format date
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const getDateRange = (start: string, end: string): string => {
  const endDate = new Date(end);
  const now = new Date();
  const isPresent = endDate >= now;
  return `${formatDate(start)} - ${isPresent ? "Present" : formatDate(end)}`;
};
