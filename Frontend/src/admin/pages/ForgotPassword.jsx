export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    await fetch("/admin/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    alert("If email exists, reset link sent");
  };

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Send Reset Link</button>
    </div>
  );
}