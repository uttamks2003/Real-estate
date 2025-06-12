import FormData from "form-data"; 

export const submit_form = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const formData = new FormData();
    formData.append("access_key", process.env.WEB3_FORM_API_KEY);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(), // Important to add form-data headers for Node.js
    });

    const data = await response.json();
    if (data.success) {
      return res
        .status(200)
        .json({ success: true, message: "Form submitted successfully!" });
    } else {
      return res.status(500).json({ success: false, message: data.message });
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong. Please try again.",
      });
  }
};
