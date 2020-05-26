import { Column } from "../decorators/column";
import { autoserializeAs } from "cerializr";

export class Car {
  @autoserializeAs(Number)
  id: number;
  @autoserializeAs(String)
  @Column()
  maker: string;
  @autoserializeAs(String)
  @Column({
    order: 1,
    canSort: true,
  })
  model: string;
  @autoserializeAs(Number)
  @Column({
    canSort: true,
  })
  year: number;
}
