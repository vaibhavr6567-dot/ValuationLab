// types/report.ts
export type Report = {
    _id?: any; // Mongo ObjectId
    title: string;
    subtitle?: string;
    fairValue?: string;
    upsideDownside?: string;
    driveLink?: string;
    excelLink?: string;
    createdAt: string | Date;
    updatedAt?: string | Date;
  };
  