import { useEffect, useState, forwardRef } from "react";
import { InputText } from "primereact/inputtext";
import { KeyFilterType } from "primereact/keyfilter"; // Import KeyFilterType

interface ReusableInputProps {
  name: string;
  value?: string | number | boolean;
  type: string;
  size?: string;
  label: string;
  invalid?: boolean;
  disabled?: boolean;
  keyfilter?: KeyFilterType; // Use KeyFilterType for keyfilter prop
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void; // Added onBlur to prop types
}

const ReusableInput = forwardRef<HTMLInputElement, ReusableInputProps>(({
  name, value: initialValue, type, size, label, invalid, disabled, keyfilter, onChange, onBlur
}, ref) => {
  const [value, setValue] = useState<string>(initialValue ? String(initialValue) : "");

  useEffect(() => {
    setValue(initialValue ? String(initialValue) : "");
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e); // Call the onChange passed by Controller
    }
  };

  return (
    <InputText
      ref={ref}
      name={name}
      value={value}
      type={type}
      onChange={handleChange}
      onBlur={onBlur} // Call the onBlur passed by Controller
      placeholder={size}
      aria-label={label}
      className={invalid ? 'p-invalid' : ''}
      disabled={disabled}
      keyfilter={keyfilter} // Apply keyfilter prop
    />
  );
});

export default ReusableInput;

// TYPE OF KEYFILTERS AVAILABLE IN PRIMEREACT INPUTTEXT COMPONENT (https://primefaces.org/primereact/showcase/#/inputtext)
// <InputText keyfilter="int" />
// <InputText keyfilter="pint" />
// <InputText keyfilter="num" />
// <InputText keyfilter="pnum" />
// <InputText keyfilter="money" />
// <InputText keyfilter="hex" />
// <InputText keyfilter="alpha" />
// <InputText keyfilter="alphanum" />
// <InputText keyfilter="email" />
