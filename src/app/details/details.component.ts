import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule],
  template: ` <p>details works! id = {{ housingLocationId }}</p> `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId: number = 0;

  constructor() {
    this.housingLocationId = +this.route.snapshot.params["id"];
  }
}