export interface Rental {
  id: number;
  brandName: string;
  firstName: string;
  lastName: string;
  companyName: string;
  rentDate: Date;
  returnDate: Date | null;
  dailyPrice: number;
}
