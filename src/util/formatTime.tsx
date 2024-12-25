export const formatTime = (seconds: any) =>
    [Math.floor(seconds / 60), seconds % 60]
      .map((v) => `0${Math.floor(v)}`.slice(-2))
      .join(":");
