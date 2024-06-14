/* eslint-disable react/display-name */
import { TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ label, name, ...rest }, ref) => {
    return (
      <>
        {label && (
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id={name}
          name={name}
          ref={ref}
          {...rest}
        />
      </>
    );
  }
);

export default TextArea;
