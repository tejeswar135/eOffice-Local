export interface AuthUser {
  userId: string;
  employeeCode: string;
  fullName: string;
  designation: string;
  activeSeat: string;
  allowedSeats: string[];
  unitId: string;
}

export interface InwardTappal {
  id: string;
  diary_no: string;
  date: string;
  mode: string;
  sender_name: string;
  sender_mobile?: string;
  dept: string;
  head: string;
  subject: string;
  seat: string;
  status: 'PENDING_ACCEPTANCE' | 'PR_ACCEPTED' | 'PUT_IN_FILE' | 'DISPOSED';
  attachment?: { name: string; size: number };
}

export interface EFile {
  id: string;
  file_no: string;
  subject: string;
  retention: 'R. Dis' | 'D. Dis' | 'K. Dis' | 'L. Dis';
  seat: string;
  created_at: string;
  linked_inwards: string[];
}

export interface FileNote {
  id: string;
  file_id: string;
  seq: number;
  type: 'GREEN_NOTE' | 'YELLOW_NOTE';
  text: string;
  author: string;
  date: string;
}

export interface OutwardRecord {
  id: string;
  out_no: string;
  date: string;
  to: string;
  sub: string;
  mode: string;
  stamp: number;
  consignment: string;
}
