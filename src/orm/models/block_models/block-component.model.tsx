import { SqlDataType } from "../../../constants/sql";
import { BaseModel } from "../../base/base.model";
import { Column, Model, Relation } from "../../decarators/decorators";

@Model({ name: "block_component", alias: "bcomp", references: ["block", "component"] })
export class BlockComponent extends BaseModel {
    static TABLE = "block_component";
    static ALIAS = "bcomp";

    constructor() {
        super(BlockComponent);
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
        title: "block_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    @Relation({
        table_name: "block",
        column: "block_id",
        referenced_column: "id",
        foreign_key_name: "fk_bcomp_block_id",
        on_update: "CASCADE",
        on_delete: "CASCADE",
    })
    block_id?: number;

    @Column({
        title: "component_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    @Relation({
        table_name: "component",
        column: "component_id",
        referenced_column: "id",
        foreign_key_name: "fk_bcomp_component_id",
        on_update: "CASCADE",
        on_delete: "CASCADE",
    })
    component_id?: number;

    @Column({
        title: "belong_component_id",
        data_type: SqlDataType.INT,
        nullable: true,
        default_value: null,
        is_primary_key: false
    })
    @Relation({
        table_name: "component",
        column: "belong_component_id",
        referenced_column: "id",
        foreign_key_name: "fk_bcomp_belong_component_id",
        on_update: "CASCADE",
        on_delete: "CASCADE",
    })
    belong_component_id?: number;

    @Column({
        title: "depth",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    depth?: number;

    @Column({
        title: "order",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    order?: number;

}