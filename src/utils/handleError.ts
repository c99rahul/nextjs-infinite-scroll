// utils/handleResponseError.ts

export async function handleError(response: Response): Promise<Error> {
  const errorText = await response.text(); // Read the response body if possible
  const status = response.status;

  // Define a lookup table for error messages
  const errorMessages: { [key: number]: string } = {
    400: `Bad request.`,
    401: `Unauthorized.`,
    404: `Not found.`,
    500: `Internal server error.`,
  };

  // Create a common error object with a base message
  const error = new Error(`HTTP error ${status}`);

  // Get the specific error message from the lookup table, if available
  const errorMessage = errorMessages[status];

  // Set the error message with specific details if found, otherwise use a generic message
  error.message = errorMessage
    ? `${error.message}: ${errorMessage} ${errorText}`
    : `${error.message}: Network response was ${status}. ${errorText}`;

  // Log the error for debugging
  console.error("Error fetching data:", error.message);

  // You can optionally add additional logic here, like:
  // - Throwing a specific error type based on the status code
  // - Triggering retry logic
  // - Redirecting the user to an error page

  return error;
}
