import PrimaryButton from "@/components/Atoms/buttons/PrimaryButton";
import Input from "@/components/common/Input";
import { setInitialPassword } from "app/api/auth";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

const InitialPasswordForm = () => {
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();

  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(null);

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const resetErrors = useCallback(() => {
    setPasswordError("");
    setPasswordConfirmationError("");
  }, []);

  const handleSubmitClick = useCallback(async () => {
    resetErrors();

    const passwordValue = passwordInputRef.current.value;
    const passwordConfirmationValue = passwordConfirmationInputRef.current.value;

    if (passwordValue.length === 0) {
      setPasswordError("Enter your new password");
      return;
    }

    if (passwordValue.length < 8) {
      setPasswordError("You password must be at least 8 characters");
      return;
    }

    if (passwordConfirmationValue.length === 0) {
      setPasswordConfirmationError("Repeat your password");
      return;
    }

    if (passwordValue !== passwordConfirmationValue) {
      setPasswordConfirmationError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitLoading(true);
      const res = await setInitialPassword(passwordValue, passwordConfirmationValue);
      toast.success("Your new password is set. You can login with this password from now on.");
    } catch (error) {
      if (error?.response?.status === 400) toast.error("You already have a password.");
      setIsSubmitLoading(false);
    }
  }, [resetErrors]);

  return (
    <div className="my-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <span className="text-sm">You don&apos;t have a password. You can set one from here:</span>
        <Input
          noFormik
          ref={passwordInputRef}
          name="password"
          label="New Password"
          type="password"
          autoComplete="new-password"
          onChange={resetErrors}
        />
        {passwordError && <span className="text-sm text-red-600">{passwordError}</span>}

        <Input
          noFormik
          ref={passwordConfirmationInputRef}
          name="password_confirmation"
          label="Password Confirmation"
          type="password"
          autoComplete="new-password"
          onChange={resetErrors}
        />
        {passwordConfirmationError && (
          <span className="text-sm text-red-600">{passwordConfirmationError}</span>
        )}
        <PrimaryButton className="ml-auto" onClick={handleSubmitClick}>
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
};

export default InitialPasswordForm;
