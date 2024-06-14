"use client";

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { TextInput } from "@/app/_lib/components/Form";
import { User } from "@/app/_lib/types/user";

type Props = {
  data: User;
};

export default function Settings({ data: userData }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const newPassword = watch("new_password", "");

  const onSubmit = useCallback(
    async (payload: any) => {
      try {
        const response = await fetch(`/api/users/password/`, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (response.status === 200) {
          alert(`Success`);
          reset();
        } else {
          let message = "";
          data.data?.old_password?.forEach((msg: string) => {
            message += `\n${msg}`;
          });
          data.data?.new_password?.forEach((msg: string) => {
            message += `\n${msg}`;
          });
          alert(message || data.message);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [reset]
  );

  return (
    <div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <p className="block mb-2 text-xl font-light text-gray-900 dark:text-white">
            {userData.username}
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email Address
          </label>
          <p className="block mb-2 text-xl font-light text-gray-900 dark:text-white">
            {userData.email}
          </p>
        </div>
      </div>

      <form className="mt-24" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-xl text-center mb-6">Change Password</p>
        <p className="md:col-span-2 text-sm font-light text-red-600">
          Please send an email to hello@basel.ink if you forgot your password or
          need help with something else
        </p>
        <div className="grid gap-6 my-6 md:grid-cols-2">
          <div>
            <TextInput
              type="password"
              label="Old Password"
              {...register("old_password", {
                required: "Old password is required",
              })}
            />
            {errors.old_password && (
              <p className="text-sm text-red-500">
                {errors.old_password.message as string}
              </p>
            )}
          </div>
          <div></div>
          <div>
            <TextInput
              type="password"
              label="New Password"
              {...register("new_password", {
                required: "New password is required",
              })}
            />
            {errors.new_password && (
              <p className="text-sm text-red-500">
                {errors.new_password.message as string}
              </p>
            )}
          </div>
          <div>
            <TextInput
              type="password"
              label="New Password Confirmation"
              {...register("new_password_confirm", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            {errors.new_password_confirm && (
              <p className="text-sm text-red-500">
                {errors.new_password_confirm.message as string}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
