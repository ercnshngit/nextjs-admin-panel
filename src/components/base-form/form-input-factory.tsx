import {
  DATABASE_TABLE,
  DATABASE_TABLE_COLUMN,
  INPUT_TYPE,
} from "@/config/general";
import React, { ComponentType } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Select from "./components/Select";
import Checkbox from "./components/Checkbox";
import Date from "./components/Date";
import Hidden from "./components/Hidden";
import MultiSelect from "./components/MultiSelect";
import Number from "./components/Number";
import String from "./components/String";
import TextArea from "./components/TextArea";
import Relation from "./components/Relation";
import ImagePicker from "./components/ImagePicker";
import RichTextBox from "./components/RichTextBox";

type FormInputFactoryProps = {
  field: DATABASE_TABLE_COLUMN;
  table: DATABASE_TABLE;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  formType: "create" | "update";
  defaultValue?: any;
  id?: number;
  setValue: any;
  watch?: any;
  control: any;
  customInput?: {
    for: string;
    component: React.FC<any>;
  }[];
};

export default function FormInputFactory({
  formType,
  id,
  customInput,
  ...props
}: FormInputFactoryProps) {
  const inputType =
    props.field?.[formType]?.inputType || props.field?.inputType;

  if (customInput) {
    const CustomInputItem = customInput.find(
      (item) => item.for === inputType
    )?.component;
    if (CustomInputItem) {
      return <CustomInputItem {...props} />;
    }
  }

  switch (inputType) {
    case "checkbox":
      return <Checkbox {...props} />;
    case "date":
      return <Date {...props} />;
    case "hidden":
      return <Hidden {...props} />;
    case "image":
      return <ImagePicker {...props} />;
    case "multi-select":
      return <MultiSelect {...props} />;
    case "number":
      return <Number {...props} />;
    case "relation":
      return <Relation formType={formType} id={id} {...props} />;
    case "select":
      return <Select {...props} />;
    case "textarea":
      return (
        <>
          <TextArea {...props} />
        </>
      );
    case "richtext":
      return (
        <>
          <RichTextBox {...props} />
        </>
      );

    default:
      return (
        <>
          <String {...props} />
        </>
      );
  }
}
