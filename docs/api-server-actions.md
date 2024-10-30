# Next.js Server Actions Documentation

## Overview

Next.js server actions are the preferred method for handling data manipulation tasks, such as form submissions. They provide a seamless way to manage data on the server side without needing to create separate API endpoints for JSON responses.

## Key Points

- **Form Submissions:** Server actions are used for form submissions that require JSON responses. For example, we currently use server actions for the feedback form submission.
- **Limitations:** Server actions should be avoided for tasks that require non-JSON responses, such as file downloads.

## Example Usage

- **Feedback Form Submission:**
  - Use a server action to handle the submission of feedback forms, allowing for easy management and processing of user input.

## Conclusion

In our Next.js application, server actions serve a distinct purpose that helps streamline data manipulation.
