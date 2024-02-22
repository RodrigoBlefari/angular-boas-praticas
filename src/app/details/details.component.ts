import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { Housinglocation } from "../housing-location/housinglocation";

import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img [src]="housingLocation?.photo" alt="" class="listing-photo" />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="list-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Wifi available: {{ housingLocation?.wifi }}</li>
          <li>laundry available: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Aply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            formControlName="firstName"
            placeholder="First Name"
          />
          <label for="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            placeholder="Last Name"
            formControlName="lastName"
          />
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            formControlName="email"
          />
          <button type="submit" class="primary">Aply Now!</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  housingLocation!: Housinglocation | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);

  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = +this.route.snapshot.params["id"];
    // this.housingLocation =
    //   this.housingService.getHousingLocationById(housingLocationId);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
        console.log('aki', this.housingLocation);
      });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}
