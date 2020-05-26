import { Component, OnInit, Input } from "@angular/core";
import { tableSymbol } from "../decorators/column";
import { ColumnModel } from "./../decorators/column.model";
import { TableModel } from "./../decorators/table.model";
import { sortBy, orderBy, cloneDeep } from "lodash";
import { Sort, SortDirection } from "@angular/material/sort";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  private _data = [];
  private _originalData: any[] = [];
  private _tableModel: TableModel;

  @Input() set data(values: any[]) {
    if (values && values.length > 0) {
      this._data = cloneDeep(values);
      this._tableModel = this._data[0][tableSymbol];
      this.buildColumns();
      if (!this._originalData.length) {
        // Keep original order of data
        this._originalData = cloneDeep(this._data);
      }
    }
  }
  get data(): any[] {
    return this._data;
  }
  @Input() instance: any;

  columns: ColumnModel[];
  displayedColumns: string[];

  constructor() {}

  ngOnInit() {}

  sortData(params: Sort) {
    const direction: SortDirection = params.direction;
    this.data = direction
      ? orderBy(this.data, [params.active], [direction])
      : this._originalData;
  }

  private buildColumns() {
    this.columns = this._tableModel.columns;
    this.sortColumns();
    this.displayedColumns = this.columns.map(col => col.key);
  }

  private sortColumns() {
    this.columns = sortBy(this.columns, ["order"]);
  }
}
