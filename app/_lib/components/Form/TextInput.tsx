/* eslint-disable react/display-name */
import classNames from "classnames";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  noBorder?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, noBorder, ...rest }, ref) => {
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
        <input
          className={classNames(
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            noBorder && "border-0"
          )}
          id={name}
          name={name}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

export default TextInput;
