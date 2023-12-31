import { SqlDataType } from "../../../constants/sql";
import { BaseModel } from "../../base/base.model";
import { Column, Model, Relation } from "../../decarators/decorators";

@Model({ name: "component", alias: "comp", references: ["types"] })
export class Component extends BaseModel {
    static TABLE = "component";
    static ALIAS = "comp";

    constructor() {
        super(Component);
    }

    @Column({
        title: "id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: true
    })
    id?: number;

    @Column({
        title: "name",
        data_type: SqlDataType.VARCHAR,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    title?: string;

    @Column({
        title: "tag",
        data_type: SqlDataType.VARCHAR,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    tag?: string;

    @Column({
        title: "type_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    @Relation({
        table_name: "types",
        column: "type_id",
        referenced_column: "id",
        foreign_key_name: "fk_component_type_id",
        on_update: "CASCADE",
        on_delete: "CASCADE",
    })
    type_id?: number;
}