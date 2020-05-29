export interface JournalEntry {
  id: number,
  plantID: string,
  eventType: string,
  timestamp: string,
  info?: {
    imageURL: string,
    notes: string
  }
}
