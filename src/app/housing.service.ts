import { Injectable } from "@angular/core";
import { Housinglocation } from "./housing-location/housinglocation";
@Injectable({
  providedIn: "root",
})
export class HousingService {
  url = "http://localhost:3000/locations";

  constructor() {}

  async getAllHousingLocations(): Promise<Housinglocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getHousingLocationById(
    id: Number
  ): Promise<Housinglocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    console.log("data", data);
    return (await data.json()) ?? {};
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName + " " + lastName + " " + email + " " + email);
  }
  // constructor() {}
  // getAllHousingLocations(): Housinglocation[] {
  //   return this.housingLocationList;
  // }

  // getHousingLocationById(id: number): Housinglocation | undefined {
  //   return this.housingLocationList.find(
  //     (housingLocation) => housingLocation.id === id
  //   );
  // }
  // submitApplication(firstName: string, lastName: string, email: string) {
  //   console.log(firstName + " " + lastName + " " + email + " " + email);
  // }
}
