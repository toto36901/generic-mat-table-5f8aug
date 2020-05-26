import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Car } from "./resources";
import { Observable } from "rxjs";
import { DeserializeArray, JsonArray } from "cerializr";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  cars$: Observable<Car[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cars$ = this.http.get("/assets/car.json").pipe(
      map((res: JsonArray) => DeserializeArray(res, Car)),
      tap(res => console.log(res))
    );
  }
}
