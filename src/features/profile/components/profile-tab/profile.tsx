"use client";

import { useEffect, useRef } from "react";

import { User } from "better-auth/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { DynamicForm, FormFieldConfig } from "@/components/ui/dynamic-form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import {
  UpdateProfileInput,
  updateProfileResolver,
} from "@/lib/validations/auth-validator";

import ProfileAvatar from "./profile-avatar";

type MessageTypeProps = "nameAndEmailChanges" | "nameOnly" | "default";
type MessageTypeMap = Readonly<Record<MessageTypeProps, string>>;
type ChangesProps = {
  name?: boolean;
  email?: boolean;
};
const Profile = () => {
  const { data } = authClient.useSession();

  const form = useForm<UpdateProfileInput>({
    resolver: updateProfileResolver,
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { isDirty, isSubmitting } = form.formState;
  const user: User | null = data && data.user;
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, form]);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (formRef && formRef.current) {
      formRef.current.focus();
    }
  }, []);

  const profileFields: FormFieldConfig<UpdateProfileInput>[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "",
      autocomplete: "name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "",
      description: "We'll send a verification email to your new email address.",
      autocomplete: "email",
    },
  ];

  const onSubmit = async (data: UpdateProfileInput): Promise<void> => {
    try {
      const updates: Promise<unknown>[] = [];
      const changes = {
        name: data.name && data.name !== user?.name,
        email: data.email && data.email !== user?.email,
      } as ChangesProps;

      if (changes.name) {
        updates.push(authClient.updateUser({ name: data.name! }));
      }

      if (changes.email) {
        updates.push(
          authClient.changeEmail({
            newEmail: data.email!,
            callbackURL: "/dashboard",
          })
        );
      }

      await Promise.all(updates);
      const messageMap = {
        nameAndEmailChanges:
          "Profile name updated and a verification link has been sent to your new email.",
        nameOnly: "Profile name updated successfully.",
        default:
          "We've sent a verification link to your new email. Please check your inbox to confirm the change.",
      } satisfies MessageTypeMap;

      const messageType = getMessageType(changes);
      const message = messageMap[messageType];
      const nameToRender = data.name ? data.name : user?.name || "";
      form.reset({
        name: nameToRender,
        email: user?.email || "",
      });
      toast.success(message);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while updating your profile."
      );

      form.reset({
        name: user?.name,
        email: user?.email || "",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <ProfileAvatar user={user} />
        <DynamicForm
          formRef={formRef}
          form={form}
          fields={profileFields}
          onSubmit={onSubmit}
          submitLabel="Save Changes"
          buttons={
            isDirty
              ? [
                  {
                    label: "Cancel",
                    type: "button",
                    variant: "secondary",
                    onClick: () => {
                      form.reset({
                        name: user?.name || "",
                        email: user?.email || "",
                      });
                    },
                  },
                  {
                    label: "Save Changes",
                    type: "submit",
                    variant: "default",
                    className: "text-white",
                    loadingComponent: (
                      <LoadingSwap isLoading={isSubmitting}>
                        Saving...
                      </LoadingSwap>
                    ),
                  },
                ]
              : undefined
          }
          buttonsClassName={
            isDirty ? "flex justify-end gap-3 pt-4 border-t" : "hidden"
          }
        />
      </div>
    </div>
  );
};

const getMessageType = (changes: ChangesProps): MessageTypeProps => {
  if (changes.name && changes.email) return "nameAndEmailChanges";
  if (changes.name) return "nameOnly";
  return "default";
};

export default Profile;
