import { DATABASE_TABLE, getDatabaseTable } from "@/config/general";
import { useAuth, useUser } from "@/hooks/useAuth";
import { translate } from "@/langs";
import React from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import FormInputFactory from "./form-input-factory";
import { useQuery } from "@tanstack/react-query";
import { getTableItem } from "@/services/panel";
import { DevTool } from "@hookform/devtools";

export default function BaseForm(props: {
  handleSubmit: any;
  onSubmit: any;
  table: DATABASE_TABLE;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  formType: "create" | "update";
  id?: number;
  setValue: any;
  watch?: any;
  control: any;
  customInput?: {
    for: string;
    component: React.FC<any>;
  }[];
}) {
  const {
    handleSubmit,
    onSubmit,
    table,
    errors,
    register,
    formType,
    id,
    setValue,
    customInput,
    watch,
    control,
  } = props;
  if (formType === "create") {
    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap w-full gap-4"
        >
          {table?.columns &&
            table.columns
              .filter((field) =>
                field[formType]?.hidden || field.hidden ? false : true
              )
              .map((field) => (
                <FormInputFactory
                  key={field.name}
                  formType={formType}
                  errors={errors}
                  field={field}
                  register={register}
                  table={table}
                  id={id}
                  watch={watch}
                  setValue={setValue}
                  customInput={customInput}
                  control={control}
                  defaultValue={field.default || ""}
                />
              ))}

          <button
            type="submit"
            onClick={() => {
              handleSubmit(onSubmit);
            }}
            className="w-full px-2 py-1 text-white bg-blue-500 rounded-md"
          >
            {translate("FORM_SUBMIT_" + formType?.toUpperCase())}
          </button>
        </form>
      </>
    );
  } else {
    if (!id) return null;
    return (
      <>
        <UpdateForm id={id} {...props} />
      </>
    );
  }

  function UpdateForm({
    handleSubmit,
    onSubmit,
    table,
    errors,
    register,
    formType,
    id,
    setValue,
    customInput,
    watch,
    control,
  }: {
    handleSubmit: any;
    onSubmit: any;
    table: DATABASE_TABLE;
    errors: FieldErrors;
    register: UseFormRegister<any>;
    formType: "create" | "update";
    id: number;
    setValue?: any;
    customInput?: {
      for: string;
      component: React.FC<any>;
    }[];
    watch?: any;
    control: any;
  }) {
    const tableOptions = getDatabaseTable(table.name);

    const { data, error } = useQuery([table.name + "/" + id], () =>
      tableOptions?.functions?.readSingle
        ? tableOptions.functions.readSingle({ id })
        : getTableItem({ tableName: table.name, id: Number(id) })
    );

    console.log("default values in updatefdorm", data);
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap w-full gap-4"
      >
        {table?.columns &&
          data &&
          table.columns
            .filter((field) =>
              field[formType]?.hidden || field.hidden ? false : true
            )
            .map((field) => (
              <FormInputFactory
                key={field.name}
                formType={formType}
                errors={errors}
                field={field}
                register={register}
                table={table}
                id={id}
                setValue={setValue}
                defaultValue={data[field.name] || ""}
                customInput={customInput}
                watch={watch}
                control={control}
              />
            ))}

        <button
          type="submit"
          className="w-full px-2 py-1 text-white bg-blue-500 rounded-md"
        >
          {translate("FORM_SUBMIT_" + formType?.toUpperCase())}
        </button>
      </form>
    );
  }
}
