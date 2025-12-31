// Configuration for Google Form submission
// 1) Replace `formUrl` with your form's formResponse endpoint (use /formResponse, not viewform).
// 2) Replace the entry IDs with your form's field entry.* names (see instructions below).
// How to find entry IDs:
// - Open the Google Form in a browser, click the three dots -> "Get pre-filled link" -> fill sample values and submit.
// - Inspect the resulting URL or view the page source for inputs named "entry.xxxxx".

export const GOOGLE_FORM = {
  // Example uses your provided form; change if needed
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfh32ie73JYj8RgEbE4V9uBjfq7eo1IWSXKgfsl3977pEx1Lw/formResponse",
  entries: {
    // Replace these example keys with the actual entry IDs from your form
    name: "entry.1234567890",
    email: "entry.0987654321",
    message: "entry.5555555555",
  },
};
