
  export function needsUpdate(lastUpdateDate: Date): boolean {
    const today = new Date();
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return lastUpdateDate < currentDate;
  }

  export function parseLastUpdateDate(lastHistoryUpdate: string): Date | null {
    if (!lastHistoryUpdate) return null;

    const date = lastHistoryUpdate.split(",")[0];
    const lastMonthParts = date.split("/");

    const lastUpdateMonth = parseInt(lastMonthParts[0], 10);
    const lastUpdateDay = parseInt(lastMonthParts[1], 10);
    const lastUpdateYear = parseInt(lastMonthParts[2], 10);

    // Create a Date object for the last update
    return new Date(lastUpdateYear, lastUpdateMonth - 1, lastUpdateDay);
  }
