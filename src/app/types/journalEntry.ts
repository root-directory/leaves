export interface JournalEntry {
  id?: number;
  plantID: string;
  entryType: string;
  timestamp?: string;
  info: {
    imgUrl?: string,
    notes: string
  };
}
export interface Journal {
  journalEntries: JournalEntry[];
}
