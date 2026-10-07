"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useEffect, useState } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount, useVerifyDoctorAccount } from "@/hooks";
import { toast } from "../ui/toast";

const RESEND_COOLDOWN = 90;
const VerifyAccountForm = ({ mode }: { mode: "doctor" | "patient" }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verifyPatient } = useVerifyAccount();
  const { mutate: verifyDoctor } = useVerifyDoctorAccount();

  const verify = mode === "doctor" ? verifyDoctor : verifyPatient;

  const email = searchParams.get("email");

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  if (!email) {
    router.push("/");
    return;
  }

  const handleOtp = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }
    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: () => {
        if (mode === "doctor") {
          toast.add({
            title: "Account Verified Successfully",
            description:
              "An Admin will apporve your account. This may take time, please check your email in few days.",
            type: "success",
          });

          router.push("/");

          return;
        }

        toast.add({
          title: "Account Verified Successfully",
          description: "Your account has beed verified",
          type: "success",
        });

        router.push("/");
      },
      onError: (err) => {
        toast.add({
          title: "Authorization Failure",
          description: err.message || "Something went wrong!",
          type: "error",
        });
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please provide the OTP we send in you email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOtp();
          }}
        >
          <Field>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid Code. Please try again" }]}
              />
            )}
            <FieldDescription>
              {resendTimer > 0 && `Resend in ${resendTimer}`}
            </FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter>
        <Button disabled={resendTimer > 0}>Resend</Button>
        <Button type="submit" form="otp-form">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyAccountForm;
