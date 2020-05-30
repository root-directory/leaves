export interface JournalEntry {
  id: number,
  plantID: string,
  eventType: string,
  timestamp: string,
  info: {
    imgUrl?: string,
    notes: string
  }
}
export interface Journal {
  id: number,
  journalEntries:JournalEntry[]
}
