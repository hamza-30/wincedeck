export function todayErrorFilter(date) {
  let errorDate = new Date(date);
  let today = new Date();

  return (
    errorDate.getFullYear() === today.getFullYear() &&
    errorDate.getMonth() === today.getMonth() &&
    errorDate.getDate() === today.getDate()
  );
}

export function last24HoursFilter(date) {
  const now = Date.now();
  const inputTime = new Date(date).getTime();
  const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

  return inputTime >= twentyFourHoursAgo && inputTime <= now;
}

export function convertToUpdatedAgoTime(date) {
  let today = new Date();
  let repoDate = new Date(date);

  let diffInSeconds = Math.floor((today - repoDate) / 1000);

  const years = Math.floor(diffInSeconds / 31536000);
  if (years >= 1) {
    return years > 1 ? `${years} yrs ago` : `${years} yr ago`;
  }

  const months = Math.floor(diffInSeconds / 2592000);
  if (months >= 1) {
    return months > 1 ? `${months} months ago` : `${months} month ago`;
  }

  const weeks = Math.floor(diffInSeconds / 604800);
  if (weeks >= 1) {
    return weeks > 1 ? `${weeks} wks ago` : `${weeks} wk ago`;
  }

  const days = Math.floor(diffInSeconds / 86400);
  if (days >= 1) {
    return days > 1 ? `${days} days ago` : `${days} day ago`;
  }

  const hours = Math.floor(diffInSeconds / 3600);
  if (hours >= 1) {
    return hours > 1 ? `${hours} hrs ago` : `${hours} hr ago`;
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes >= 1) {
    return minutes > 1 ? `${minutes} mins ago` : `${minutes} min ago`;
  }

  return `just now`;
}
