export interface Rental {
  id: number;
  carId:number;
  brandName: string;
  firstName: string;
  lastName: string;
  companyName: string;
  rentDate: Date;
  returnDate: Date | null;
  dailyPrice: number;
}
