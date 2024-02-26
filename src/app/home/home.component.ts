import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { Housinglocation } from "../housing-location/housinglocation";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button type="button" (click)="filterResults(filter.value)">
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredHousingList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  housingLocationList: Housinglocation[] = [];
  filteredHousingList: Housinglocation[] = [];

  housingService: HousingService = inject(HousingService);
  constructor() {
    // this.housingLocationList = this.housingService.getAllHousingLocations();
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: Housinglocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredHousingList = housingLocationList;
      });
  }

  filterResults(textFilter: string) {
    if (!textFilter) this.filteredHousingList = this.housingLocationList;
    this.filteredHousingList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(textFilter.toLowerCase())
    );
  }
}
