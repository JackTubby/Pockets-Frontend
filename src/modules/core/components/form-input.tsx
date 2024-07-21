import React, { memo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = memo(({ name, label, type = "text" }) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputText
            className="w-full"
            placeholder={label}
            {...field}
            type={type}
            aria-label={label}
            value={field.value ?? ""}
          />
        )}
      />
    </div>
  );
});

export default FormInput;
