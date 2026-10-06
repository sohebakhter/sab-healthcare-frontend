"use client";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { FileText, FileUp, Plus, X } from "lucide-react";
import {
  isAcceptedFileSize,
  isAcceptedFileType,
  MAX_ADDITIONAL_FILES,
  MAX_FILE_SIZE,
} from "@/validation/doctor-application.validation";
import { formatFileSize } from "@/utils";
import { DoctorApplicationData } from "@/types";
import { useApplyAsDoctor } from "@/hooks";
const DoctorApplyForm = () => {
  const router = useRouter();

  const { mutate: apply, isPending: applyPending } = useApplyAsDoctor();

  const form = useForm({
    defaultValues: {
      name: "Soheb",
      email: "",
      phone: "01797101644",
      address: "Dhaka",
      specialization: "Development",
      licenseNumber: "A-123",
      qualifications: "JAVASCRIPT",
      experienceYears: "2",
      consultationFee: "999",
      bio: "I care about the code.",
      resume: null as File | null,
      additionalFiles: [] as File[],
    },
    // validators: {
    //   onSubmit: loginSchema,
    // },
    onSubmit: ({ value }) => {
      const doctorData: DoctorApplicationData = {
        user: {
          name: value.name.trim(),
          email: value.email.trim(),
        },
        doctor: {
          specialization: value.specialization.trim(),
          licenseNumber: value.licenseNumber.trim(),
          qualifications: value.qualifications.trim(),
          experienceYears: Number(value.experienceYears),
          contactNumber: value.phone.trim(),
          address: value.address.trim(),
          consultationFee: value.consultationFee.trim()
            ? Number(value.consultationFee)
            : undefined,
          bio: value.bio.trim(),
        },
      };

      // console.log(doctorData);
      apply(
        {
          data: doctorData,
          resume: value.resume as File,
          additionalFiles: value.additionalFiles,
        },
        {
          onSuccess: (res) => {
            console.log(res);
          },
          onError: () => {},
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className=" flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center">
          Apply to join SAB Healthcare
        </h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder={`Dr. Soheb`}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Email"
                      type="email"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Contact number</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="+880 1712 345678"
                      type={"text"}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Practice address
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Dhaka or hospital address"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="specialization">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Specialization</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Cardiology"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="licenseNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      BMDC registration number
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="A-12345"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="qualifications">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Qualifications</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="MBBS, FCPS (medicine)"
                      type={"text"}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="experienceYears">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Years of experience
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="10"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="consultationFee">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Consultation fee (BDT)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="1000"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="bio">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Professional bio{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    placeholder="Share your background, areas of interest and patient care philosophy..."
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    aria-invalid={isInvalid}
                  />
                  <div className="flex justify-between items-center gap-2 ">
                    <FieldDescription>
                      Shown on your public profile after approval
                    </FieldDescription>
                    <span className="text-xs text-muted-foreground">
                      {field.state.value.length}/1000
                    </span>
                  </div>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}></FieldError>
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="resume">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const file = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="resume-field">Resume</FieldLabel>

                  <div>
                    <Button
                      onClick={() =>
                        document.getElementById("resume-field")?.click()
                      }
                      type="button"
                      variant="outline"
                    >
                      <FileUp size="4" />
                      Upload resume
                    </Button>
                    <input
                      id="resume-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        if (
                          selected &&
                          (!isAcceptedFileSize(selected.size) ||
                            !isAcceptedFileType(selected?.type))
                        ) {
                          field.handleBlur();
                          return;
                        }
                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <div className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm">
                        <FileText className="size-4 shrink-0 text-primary"></FileText>
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          type="button"
                          onClick={() => field.handleChange(null)}
                          className="hover:text-destructive"
                        >
                          <X></X>
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground hover:text-destructive">
                        PDF, DOC, DOCX or image up to {MAX_FILE_SIZE}MB
                      </span>
                    )}
                  </div>

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}></FieldError>
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="additionalFiles">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const files = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="additional-file-field">
                    Additional Files
                  </FieldLabel>

                  <div>
                    <Button
                      onClick={() =>
                        document
                          .getElementById("additional-file-field")
                          ?.click()
                      }
                      type="button"
                      variant="outline"
                    >
                      <Plus size="4" />
                      Add Files
                    </Button>
                    <input
                      id="additional-file-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      multiple
                      onChange={(e) => {
                        const incoming = Array.from(e.target.files ?? []);

                        if (incoming.length === 0) {
                          return;
                        }
                        const invalid = incoming.some(
                          (file) =>
                            !isAcceptedFileSize(file.size) ||
                            !isAcceptedFileType(file.type),
                        );

                        if (invalid) {
                          field.handleBlur();
                          e.target.value = "";
                          return;
                        }

                        field.handleChange([...files, ...incoming]);
                      }}
                    />
                    {files.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {" "}
                        {files.length} of {MAX_ADDITIONAL_FILES} added
                      </span>
                    )}

                    {files.length > 0 && (
                      <ul className="flex flex-col gap-2">
                        {files.map((file, index) => (
                          <li
                            key={`${file.name}-${index}`}
                            className="flex justify-between items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm"
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              <FileText className="size-4 shrink-0 text-primary"></FileText>
                              <span className="truncate">{file.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </span>
                            </div>
                            <button
                              type="button"
                              aria-label={`Remove ${file.name}`}
                              onClick={() => {
                                field.handleChange(
                                  files.filter((_, i) => i !== index),
                                );
                                field.handleBlur();
                              }}
                              className="hover:text-destructive"
                            >
                              <X></X>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}></FieldError>
                  )}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <div className="flex justify-end w-full mt-5">
          <Button type="submit">{"Submit"}</Button>
        </div>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Already an approved doctor?{" "}
        <Link
          href={"/login"}
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Sign in to the doctor portal.
        </Link>
        <span>
          {" "}
          Patient applications should use the{" "}
          <Link
            href={"/register"}
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            patient ragistration
          </Link>{" "}
          form instead.
        </span>
      </div>
    </div>
  );
};

export default DoctorApplyForm;
