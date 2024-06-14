"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { TextInput, TextArea } from "@/app/_lib/components/Form";
import { User } from "@/app/_lib/types/user";
import Image from "next/image";

type Props = {
  data: User;
};

export default function Profile({ data }: Props) {
  const [userData, setUserData] = useState<User>(data);
  const [imagePreview, setImagePreview] = useState<string | null>(
    data.userprofile.image
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      display_name: userData.userprofile.display_name,
      industry: userData.userprofile.industry,
      description: userData.userprofile.description,
      legal_url: userData.userprofile.legal_url,
      background_color: userData.userprofile.background_color,
      text_color: userData.userprofile.text_color,
      button_color: userData.userprofile.button_color,
      button_text_color: userData.userprofile.button_text_color,
    },
  });

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = useCallback(
    async (formData: any) => {
      try {
        const dataToSend = new FormData();
        dataToSend.append("display_name", formData.display_name);
        dataToSend.append("industry", formData.industry);
        dataToSend.append("description", formData.description);
        dataToSend.append("legal_url", formData.legal_url);
        dataToSend.append("background_color", formData.background_color);
        dataToSend.append("text_color", formData.text_color);
        dataToSend.append("button_color", formData.button_color);
        dataToSend.append("button_text_color", formData.button_text_color);

        const fileInput = document.querySelector<HTMLInputElement>(
          'input[name="image"]'
        );
        if (fileInput?.files?.[0]) {
          dataToSend.append("image", fileInput.files[0]);
        }

        const response = await fetch(`/api/users/${userData.id}`, {
          method: "PATCH",
          body: dataToSend,
        });

        const data = await response.json();
        if (response.status === 200) {
          alert(`Success`);
          setUserData(data);
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [userData]
  );

  return (
    <div>
      {/* <div className="grid gap-6 mb-6 md:grid-cols-2">
        <TextInput
          label="Username"
          name="username"
          defaultValue={userData.username}
          disabled
        />
        <TextInput
          label="Email Address"
          name="email"
          defaultValue={userData.email}
          disabled
        />
        <p className="md:col-span-2 text-sm font-light text-red-600">
          Please send an email to hello@basel.ink if you forgot your password or
          need help with something else.
        </p>
      </div> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Profile Preview"
                className="mt-2 h-[150px] w-[150px] object-cover rounded-md"
                width={150}
                height={150}
              />
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={onImageChange}
              className="mt-1 block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />
          </div>
          <div>
            <TextArea
              label="Description"
              rows={7}
              {...register("description")}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div>
            <TextInput
              label="Display Name"
              {...register("display_name", { required: true })}
            />
            {errors.display_name && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div>
            <TextInput label="Industry" {...register("industry")} />
          </div>
          <div className="md:col-span-2">
            <TextInput label="Legal url" {...register("legal_url")} />
            {errors.legal_url && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div>
            <TextInput
              label="Background color"
              {...register("background_color")}
            />
            {errors.background_color && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div>
            <TextInput label="Text color" {...register("text_color")} />
            {errors.text_color && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div>
            <TextInput label="Button color" {...register("button_color")} />
            {errors.button_color && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div>
            <TextInput
              label="Button text color"
              {...register("button_text_color")}
            />
            {errors.button_text_color && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
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
