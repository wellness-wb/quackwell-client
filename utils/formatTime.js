export const formatTime = (seconds) => {
  if (seconds < 60) {
    return seconds.toString();
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const remainder = seconds % 3600;
    const minutes = Math.floor(remainder / 60);
    const remainingSeconds = remainder % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }
};
