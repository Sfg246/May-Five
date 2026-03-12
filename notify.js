const WEB3FORMS_ACCESS_KEY = "f2ee3f77-c57c-4160-b048-7e99a68eca08";

async function sendSiteNotification(type, extra = {}) {
  const payloads = {
    cancel: {
      subject: "May 5 site: she ended it",
      message:
        "She confirmed that she wanted to end the talking stage / break as a whole."
    },
    early_yes: {
      subject: "May 5 site: she wants to continue before May 5",
      message:
        "She used the early path and said she wanted to continue this before May 5."
    },
    secret_message: {
      subject: "May 5 site: new secret message",
      message:
        "A new secret message was submitted through the site."
    },
    may5_yes: {
      subject: "May 5 site: she said yes on May 5",
      message:
        "She waited until May 5, opened the final reveal, and pressed the final yes button."
    }
  };

  const selected = payloads[type];
  if (!selected) return { success: false };

  const body = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: selected.subject,
    from_name: "May 5 Countdown Site",
    message: selected.message,
    event_type: type,
    timestamp: new Date().toISOString(),
    page: window.location.href,
    user_agent: navigator.userAgent,
    ...extra
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Notification failed:", error);
    return { success: false, error: true };
  }
}
