/**
 * Vistara Event Hub - Form Validation Module
 * Client-side syntax validation for attendee registrations.
 */

const FormValidator = (() => {
  const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  const NAME_PATTERN = /^[A-Za-z\s'’\-]{2,60}$/;

  return {
    validateName(value) {
      const trimmed = (value || "").trim();
      if (!trimmed) {
        return { isValid: false, message: "Full name is required." };
      }
      if (trimmed.length < 2) {
        return { isValid: false, message: "Name must be at least 2 characters." };
      }
      if (!NAME_PATTERN.test(trimmed)) {
        return { isValid: false, message: "Enter a valid name (letters, spaces, and hyphens only)." };
      }
      return { isValid: true, message: "" };
    },

    validateEmail(value) {
      const trimmed = (value || "").trim();
      if (!trimmed) {
        return { isValid: false, message: "Email address is required." };
      }
      if (!EMAIL_PATTERN.test(trimmed)) {
        return { isValid: false, message: "Please provide a valid email address (e.g., student@college.edu)." };
      }
      return { isValid: true, message: "" };
    },

    validatePhone(value) {
      const trimmed = (value || "").trim();
      if (!trimmed) {
        return { isValid: false, message: "10-digit mobile number is required." };
      }
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15) {
        return { isValid: false, message: "Mobile number must be at least 10 digits." };
      }
      return { isValid: true, message: "" };
    },

    validateEvent(value) {
      if (!value || value === "") {
        return { isValid: false, message: "Please select an event." };
      }
      return { isValid: true, message: "" };
    },

    validateTickets(value) {
      const parsed = parseInt(value, 10);
      if (isNaN(parsed) || parsed < 1 || parsed > 5) {
        return { isValid: false, message: "Passes must be between 1 and 5." };
      }
      return { isValid: true, message: "" };
    },

    validateTerms(accepted) {
      if (!accepted) {
        return { isValid: false, message: "Please accept the admission and participation guidelines." };
      }
      return { isValid: true, message: "" };
    },

    validateAll(fields) {
      const errors = {};

      const nameCheck = this.validateName(fields.name);
      if (!nameCheck.isValid) errors.name = nameCheck.message;

      const emailCheck = this.validateEmail(fields.email);
      if (!emailCheck.isValid) errors.email = emailCheck.message;

      const phoneCheck = this.validatePhone(fields.phone);
      if (!phoneCheck.isValid) errors.phone = phoneCheck.message;

      const eventCheck = this.validateEvent(fields.eventId);
      if (!eventCheck.isValid) errors.eventId = eventCheck.message;

      const ticketsCheck = this.validateTickets(fields.tickets);
      if (!ticketsCheck.isValid) errors.tickets = ticketsCheck.message;

      const termsCheck = this.validateTerms(fields.terms);
      if (!termsCheck.isValid) errors.terms = termsCheck.message;

      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    }
  };
})();
