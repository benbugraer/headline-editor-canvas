import React, { SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "options"> {
  options: Option[];
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  className = "",
  options,
  ...props
}) => {
  return (
    <select
      className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
