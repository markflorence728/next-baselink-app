/* eslint-disable react/display-name */
import { SelectHTMLAttributes, forwardRef } from "react";

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: { value: any; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, InputProps>(
  ({ label, name, options, ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id={name}
          name={name}
          ref={ref}
          {...rest}
        >
          {options.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
