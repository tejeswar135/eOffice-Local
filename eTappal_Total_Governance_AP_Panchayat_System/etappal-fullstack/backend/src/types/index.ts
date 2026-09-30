export interface UserPayload {
  userId: string;
  employeeCode: string;
  fullName: string;
  designation: string;
  activeSeat: string; // e.g. "PS-01"
  allowedSeats: string[];
  unitId: string;
}

export interface InwardDto {
  deliveryMode: string;
  senderType: string;
  senderName: string;
  senderMobile?: string;
  extRef?: string;
  deptCode: string;
  subjectCode: string;
  subject: string;
  targetSeat: string;
}

export interface FileDto {
  deptCode: string;
  subjectCode: string;
  subjectTitle: string;
  retentionClass: 'R. Dis' | 'D. Dis' | 'K. Dis' | 'L. Dis';
  custodySeat: string;
}
