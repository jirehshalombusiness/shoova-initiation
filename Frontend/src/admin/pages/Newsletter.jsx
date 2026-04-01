import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function NewsletterPage() {

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (file) => {

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "newsletter_upload");

    try {
      toast.loading("Uploading image...", { id: "upload" });

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/stanarthur/image/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();

      if (!data.secure_url) throw new Error();

      setImageUrl(data.secure_url);

      toast.success("Image uploaded ✅", { id: "upload" });

    } catch (err) {
      console.error(err);
      toast.error("Upload failed", { id: "upload" });
    }
  };


  /* ================= AUTO SAVE ================= */
  useEffect(() => {
    if (!subject && !message && !imageUrl) return;

    const timer = setTimeout(() => {
      saveDraft(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [subject, message, imageUrl]);


  const loadDraft = async () => {
    try {
      const res = await fetch("https://shoova-initiation-yjg3.onrender.com/draft/get");
      const data = await res.json();

      if (data.draft) {
        setSubject(data.draft.subject || "");
        setMessage(data.draft.message || "");
        setImageUrl(data.draft.imageUrl || "");
        toast.success("Draft loaded 📄");
      } else {
        toast("No saved draft");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load draft");
    }
  };

  /* ================= SAVE ================= */
  const saveDraft = async (silent = false) => {
    try {
      const res = await fetch("https://shoova-initiation-yjg3.onrender.com/draft/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject,
          message,
          imageUrl
        })
      });

      const data = await res.json();

      if (data.success && !silent) {
        toast.success("Draft saved ✍️");
      }

    } catch (error) {
      console.error(error);
      if (!silent) toast.error("Error saving draft");
    }
  };

  /* ================= EMAIL TEMPLATE ================= */
  const buildHTML = () => {
    return `
  <div style="margin:0;padding:0;background:#f4f4f4;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;font-family:Arial,sans-serif;">
            
            ${imageUrl
        ? `
                <tr>
                  <td>
                    <img src="${imageUrl}" width="100%" style="display:block;max-height:320px;object-fit:cover;" />
                  </td>
                </tr>
              `
        : ""
      }

            <tr>
              <td style="padding:30px;">
                
                <h2 style="margin:0 0 15px 0;color:#111;font-size:22px;">
                  ${subject}
                </h2>

                <div style="font-size:15px;color:#444;line-height:1.7;">
                  ${message.replace(/\n/g, "<br/>")}
                </div>

              </td>
            </tr>

            <tr>
              <td style="padding:20px;background:#fafafa;text-align:center;font-size:12px;color:#888;">
                You’re receiving this email because you subscribed to Shoova.
              </td>
            </tr>

          </table>

          <p style="font-size:12px;color:#888;text-align:center;margin-top:20px;">
        If you no longer wish to receive these emails,
        <a href="https://shoova-initiation-yjg3.onrender.com/newsletter/unsubscribe?email={{EMAIL}}" style="color:#888;text-decoration:underline;">
          unsubscribe here
        </a>.
      </p>
        </td>
      </tr>
    </table>

  </div>
  `;
  };

  /* ================= SEND ================= */
  const sendNewsletter = async () => {

    if (!subject || !message) {
      toast.error("Please fill subject and message");
      return;
    }

    try {
      setSending(true);

      toast.loading("Sending newsletter...", { id: "send" });

      const res = await fetch("https://shoova-initiation-yjg3.onrender.com/newsletter-send/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject,
          html: buildHTML()
        })
      });

      const data = await res.json();

      if (data.success) {

        toast.success("Newsletter sent successfully 🚀", { id: "send" });

        // ✅ CLEAR DRAFT FROM DB
        await fetch("https://shoova-initiation-yjg3.onrender.com/draft/clear", {
          method: "DELETE"
        });

        // ✅ RESET UI
        setSubject("");
        setMessage("");
        setImageUrl("");
        setShowPreview(false);

      } else {
        toast.error("Failed to send newsletter", { id: "send" });
      }

    } catch (error) {
      console.error(error);
      toast.error("Error sending newsletter", { id: "send" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">

      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold text-gray-800">
        Send Newsletter
      </h1>

      {/* SUBJECT */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject..."
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* IMAGE */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Upload Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleImageUpload(e.target.files[0]);
            e.target.value = null; // 🔥 reset input
          }}
        />

        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt="preview"
              className="mt-3 rounded-lg max-h-40 object-cover border"
            />
          </>
        )}
      </div>

      {/* MESSAGE */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={12}
          placeholder="Write your newsletter..."
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">

        <button
          onClick={() => saveDraft(false)}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Save Draft
        </button>
        <button
          onClick={loadDraft}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Load Draft
        </button>

        <button
          onClick={() => setShowPreview(true)}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Preview
        </button>

        <button
          onClick={sendNewsletter}
          disabled={sending}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {sending ? "Sending..." : "Send Now"}
        </button>

      </div>

      {/* PREVIEW */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-2xl rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              Email Preview
            </h2>

            <div className="border p-4 max-h-[400px] overflow-y-auto">
              <h3 className="font-bold mb-3">{subject}</h3>
              <div dangerouslySetInnerHTML={{ __html: buildHTML() }} />
            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Close
              </button>

              <button
                onClick={sendNewsletter}
                className="px-5 py-2 bg-green-600 text-white rounded"
              >
                Confirm & Send
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
