"use client";

import { useState, useEffect, useCallback } from "react";

interface SessionTimeoutModalProps {
  timeoutMinutes?: number;
  onStaySignedIn?: () => void;
  onSignOut?: () => void;
  isOpen?: boolean;
}

export default function SessionTimeoutModal({
  timeoutMinutes = 2,
  onStaySignedIn,
  onSignOut,
  isOpen = true,
}: SessionTimeoutModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(timeoutMinutes * 60);
  const [visible, setVisible] = useState(isOpen);

  const handleStaySignedIn = useCallback(() => {
    setVisible(false);
    setSecondsLeft(timeoutMinutes * 60);
    onStaySignedIn?.();
  }, [timeoutMinutes, onStaySignedIn]);

  useEffect(() => {
    if (!visible) return;
    if (secondsLeft <= 0) {
      onSignOut?.();
      return;
    }
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [visible, secondsLeft, onSignOut]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fadeIn">
      <div className="w-full max-w-lg rounded-sm shadow-2xl overflow-hidden bg-white animate-slideUp">

        <div className="px-5 pt-8 pb-7">

          <h2 className="govuk-heading-l govuk-!-margin-bottom-2">
            You will be signed out
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            You have been inactive for some time and will be signed out in: {mins}:{secs}
          </p>

          <div className="flex items-center gap-6">
            <button type="submit" className="govuk-button"
              onClick={handleStaySignedIn} >
              Stay signed in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}