import { useForm, Controller } from "react-hook-form";
import ReusableInput from "./form-input";

type Inputs = {
  [key: string]: string | number | boolean;
};

type Field = {
  name: string;
  label: string;
  type: string;
};

interface ReusableFormProps {
  inputConfig: Field[];
  data?: any;
}

const ReusableForm = ({ inputConfig, data = {} }: ReusableFormProps) => {
  const { control, handleSubmit, watch } = useForm<Inputs>();

  const onSubmit = (formData: Inputs) => {
    console.log(formData);
  };

  console.log(watch("name"));

  const renderFields = () => {
    return inputConfig.map((field: Field) => {
      if (field.type === "inputText") {
        return (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            defaultValue={data[field.name] || ""}
            render={({ field: controllerField, fieldState }) => (
              <ReusableInput
                {...controllerField}
                type="text"
                label={field.label}
                invalid={!!fieldState.error}
              />
            )}
          />
        );
      }
      return null;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderFields()}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReusableForm;
