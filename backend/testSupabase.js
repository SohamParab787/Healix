const url = "https://hdnrndkgrhuxkiyvhgma.supabase.co";
fetch(url).then(res => {
  console.log("Status:", res.status);
}).catch(err => {
  console.error("Error connecting to Supabase:", err.message, "Cause:", err.cause);
});
