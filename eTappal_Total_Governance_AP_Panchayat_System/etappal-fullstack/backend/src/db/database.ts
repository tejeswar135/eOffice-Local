// In-Memory Database Layer with relational consistency & thread-safe counters
// Ready to bind to PostgreSQL via pg Pool or SQLite via better-sqlite3

export interface SequenceCounter {
  unitId: string;
  year: number;
  deptCode: string;
  subjectCode: string;
  lastInwardSeq: number;
  lastFileSeq: number;
  lastOutwardSeq: number;
}

export class AppDatabase {
  public users: any[] = [];
  public seats: any[] = [];
  public inwards: any[] = [];
  public files: any[] = [];
  public notes: any[] = [];
  public outwards: any[] = [];
  public postalLedger: any[] = [];
  public sequenceCounters: Map<string, SequenceCounter> = new Map();

  constructor() {
    this.seedDefaults();
  }

  private seedDefaults() {
    // 1. Seats & Users
    this.seats = [
      { seatCode: 'PS-01', title: 'Panchayat Secretary (Gr-V)', unitId: 'AP-SKLM-SRVK-MDPM' },
      { seatCode: 'DA-01', title: 'Digital Assistant (Gr-VI)', unitId: 'AP-SKLM-SRVK-MDPM' },
      { seatCode: 'EA-01', title: 'Engineering Assistant', unitId: 'AP-SKLM-SRVK-MDPM' },
      { seatCode: 'WEA-01', title: 'Welfare & Education Asst', unitId: 'AP-SKLM-SRVK-MDPM' },
    ];

    this.users = [
      {
        userId: 'usr-ps-01',
        employeeCode: 'PS-10492',
        fullName: 'Sri P. Tejeswara Rao',
        designation: 'Panchayat Secretary (Grade-V)',
        passwordHash: 'password123', // In production: bcrypt hash
        activeSeat: 'PS-01',
        allowedSeats: ['PS-01', 'DA-01'],
        unitId: 'AP-SKLM-SRVK-MDPM',
      },
      {
        userId: 'usr-da-01',
        employeeCode: 'DA-20814',
        fullName: 'Digital Assistant',
        designation: 'Panchayat Secretary (Grade-VI) / DA',
        passwordHash: 'password123',
        activeSeat: 'DA-01',
        allowedSeats: ['DA-01'],
        unitId: 'AP-SKLM-SRVK-MDPM',
      },
    ];

    // 2. Initial Sample File & Note
    const year = new Date().getFullYear();
    const sampleFile = {
      fileId: 'fil-001',
      fileNumber: `SKLM-SRVK-MDPM/PRRD/BLDG-0001/${year}`,
      subject: 'Permission for residential building in Gramakantam Sy No 18 - Sri P. Appala Naidu',
      retentionClass: 'R. Dis',
      currentSeat: 'PS-01',
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      linkedInwards: ['0001/' + year + '/MDPM-INW'],
    };
    this.files.push(sampleFile);

    this.notes.push({
      noteId: 'not-001',
      fileId: 'fil-001',
      seqNo: 1,
      type: 'GREEN_NOTE',
      content: 'Perused the application along with registered title deed. Verified spot boundaries in Sy No 18 with Engineering Assistant. No road encroachment observed. Panchayat building permit fee of Rs. 2,450/- remitted vide Challan #410.\n\nPut up for sanction.',
      authorSeat: 'EA-01',
      authorName: 'Engineering Assistant',
      timestamp: new Date().toISOString(),
    });
  }

  public getNextSequence(unitId: string, year: number, dept: string, subj: string, type: 'INWARD' | 'FILE' | 'OUTWARD'): number {
    const key = `${unitId}_${year}_${dept}_${subj}`;
    let counter = this.sequenceCounters.get(key);
    if (!counter) {
      counter = { unitId, year, deptCode: dept, subjectCode: subj, lastInwardSeq: 0, lastFileSeq: 1, lastOutwardSeq: 0 };
      this.sequenceCounters.set(key, counter);
    }
    if (type === 'INWARD') {
      counter.lastInwardSeq += 1;
      return counter.lastInwardSeq;
    } else if (type === 'FILE') {
      counter.lastFileSeq += 1;
      return counter.lastFileSeq;
    } else {
      counter.lastOutwardSeq += 1;
      return counter.lastOutwardSeq;
    }
  }
}

export const db = new AppDatabase();
