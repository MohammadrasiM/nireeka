import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { requestChangePassword } from "../../../app/api/auth";
import PrimaryButton from "../../Atoms/buttons/PrimaryButton";
import TextInput from "../../Atoms/inputs/TextInput";
import LoadingNireeka from "../../Atoms/LoadingNireeka";

const ChangePassword = () => {
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

  const handleCurrentPasswordChange = (e) => {
    setErrorMessage("");
    setCurrentPasswordValue(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setErrorMessage("");
    setNewPasswordValue(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setErrorMessage("");
    setConfirmPasswordValue(e.target.value);
  };

  useEffect(() => {
    if (currentPasswordValue === "" || newPasswordValue === "" || confirmPasswordValue === "")
      setIsSubmitButtonDisabled(true);
    else setIsSubmitButtonDisabled(false);
  }, [currentPasswordValue, newPasswordValue, confirmPasswordValue]);

  const resetInputs = () => {
    setCurrentPasswordValue("");
    setNewPasswordValue("");
    setConfirmPasswordValue("");
  };

  const handleSubmit = async () => {
    if (newPasswordValue !== confirmPasswordValue) {
      setErrorMessage("Error: Passwords do not match!");
      resetInputs();
      return;
    }

    /**
     * if statusCode === 402: "Old password is incorrect"
     * if statusCode === 400: "New password and old password are the same"
     */
    try {
      setIsSubmitButtonLoading(true);
      const res = await requestChangePassword(
        currentPasswordValue,
        newPasswordValue,
        confirmPasswordValue
      );

      toast.success("Your password has been changed successfully");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 402) {
          setErrorMessage("Error: Current password was incorrect!");
        } else if (error.response.status === 400) {
          setErrorMessage("Error: New password cannot be the same as your old password!");
        } else {
          setErrorMessage(error.response?.data?.data);
        }
      }
    } finally {
      resetInputs();
      setIsSubmitButtonLoading(false);
    }
  };

  return (
    <div className="my-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        {/* Invisible input to trick the browser to fill email into this field */}
        <input name="email" type="email" className="sr-only" />
        <TextInput
          value={currentPasswordValue}
          onChange={handleCurrentPasswordChange}
          type="password"
          autoComplete="old-password"
          id="old-password"
          inputMode="full-border"
          label="Current password"
          name="current_password"
        />
        <TextInput
          value={newPasswordValue}
          onChange={handleNewPasswordChange}
          type="password"
          inputMode="full-border"
          label="New password"
          name="new_password"
          autoComplete="off"
        />
        <TextInput
          value={confirmPasswordValue}
          onChange={handleConfirmPasswordChange}
          type="password"
          inputMode="full-border"
          label="Confirm new password"
          name="confirm_password"
          autoComplete="off"
        />
      </div>
      {!!errorMessage && (
        <div className="mt-6">
          <p className="text-red-600">{errorMessage}</p>
        </div>
      )}
      <div className="mt-6">
        <PrimaryButton
          onClick={handleSubmit}
          disabled={isSubmitButtonLoading || isSubmitButtonDisabled}
          className="space-x-3 ml-auto"
        >
          {isSubmitButtonLoading && <LoadingNireeka className="w-4 h-4" />}
          <span>{isSubmitButtonLoading ? "Processing..." : "Change password"}</span>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ChangePassword;
