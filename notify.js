const WEB3FORMS_ACCESS_KEY = "f2ee3f77-c57c-4160-b048-7e99a68eca08";

async function sendSiteNotification(type) {
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
    }
  };

  const selected = payloads[type];
  if (!selected) return;

  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: selected.subject,
        from_name: "May 5 Countdown Site",
        message: selected.message,
        event_type: type,
        timestamp: new Date().toISOString(),
        page: window.location.href,
        user_agent: navigator.userAgent
      })
    });
  } catch (error) {
    console.error("Notification failed:", error);
  }
}
