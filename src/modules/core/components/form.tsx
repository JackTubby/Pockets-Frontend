// components/ReusableForm.tsx
import React, { useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./form-input";
import { Button } from "primereact/button";

interface InputConfig {
  name: string;
  label: string;
  type?: string;
  validation?: unknown;
}

interface ReusableFormProps {
  initialValues: Record<string, unknown>;
  onSubmit: SubmitHandler<Record<string, unknown>>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  validationSchema: yup.ObjectSchema;
  inputConfigs: InputConfig[];
}

const ReusableForm: React.FC<ReusableFormProps> = ({ initialValues, onSubmit, validationSchema, inputConfigs }) => {
  const methods = useForm<Record<string, unknown>>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = useCallback(methods.handleSubmit(onSubmit), [methods, onSubmit]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        {inputConfigs.map((config) => (
          <FormInput key={config.name} name={config.name} label={config.label} type={config.type} />
        ))}
        {/* TODO: Replace badge with amount of field errors */}
        <Button type="submit" label="Submit" icon="pi pi-pencil" iconPos="left" raised badge="" badgeClassName="p-badge-danger" />
      </form>
    </FormProvider>
  );
};

export default ReusableForm;
