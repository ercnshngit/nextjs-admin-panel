import { SqlDataType } from "@/constants/sql";
import { Column, Model, Relation } from "../../decorators";

@Model({ name: "component_prop", alias: "bcomp_prop", references: ["prop", "component"] })
export class ComponentProp {
    static TABLE = "component_prop";
    static ALIAS = "comp_prop";

    @Column({
        title: "id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: true
    })
    id?: number;

    @Column({
        title: "component_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    component_id?: number;

    @Column({
        title: "prop_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    prop_id?: number;

    @Relation({
        table_name: "prop",
        column: "prop_id",
        referenced_column: "id",
        foreign_key_name: "fk_component_prop_prop_id",
        on_update: "CASCADE",
        on_delete: "CASCADE",
    })
    prop?: any;

    @Relation({
        table_name: "component",
        column: "component_id",
        referenced_column: "id",
        foreign_key_name: "fk_component_prop_component_id",
        on_update: "CASCADE",
        on_delete: "CASCADE",
    })
    component?: any;

}