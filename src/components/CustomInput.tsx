import { forwardRef } from "react";

interface CustomInputProps {
  className?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className }, ref) => {
    return (
      <input
        ref={ref}
        className={className}
        type="text"
        name="name"
        id="name"
      />
    );
  }
);

export default CustomInput;
