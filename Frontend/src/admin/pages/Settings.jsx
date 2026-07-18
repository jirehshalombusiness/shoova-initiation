import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/api";

export default function Settings() {

  const [settings, setSettings] = useState({
    organizationName: "",
    contactEmail: "",
    phone: "",
    currency: "",
    donationTiers: []
  });

  useEffect(() => {

    fetchWithAuth("https://shoova-initiation-nf6m.onrender.com/admin/settings")
      .then(res => res.json())
      .then(data => setSettings(data));

  }, []);

  const handleChange = (e) => {

    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });

  };

  const handleSave = async () => {

    await fetch("https://shoova-initiation-nf6m.onrender.com/admin/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(settings)
    });

    alert("Settings saved");

  };

  return (

    <div className="bg-white rounded-xl shadow border p-8 space-y-8">

      <h1 className="text-3xl font-bold">
        Shoova Settings
      </h1>
      <div>

        <label className="block text-sm font-medium mb-2">
          Organization Name
        </label>

        <input
          name="organizationName"
          value={settings.organizationName}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full"
        />

      </div>
      <div>

        <label className="block text-sm font-medium mb-2">
          Contact Email
        </label>

        <input
          name="contactEmail"
          value={settings.contactEmail}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full"
        />

      </div>
      <div>

        <label className="block text-sm font-medium mb-2">
          Phone
        </label>

        <input
          name="phone"
          value={settings.phone}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full"
        />

      </div>
      <div>

        <label className="block text-sm font-medium mb-2">
          Currency
        </label>

        <input
          name="currency"
          value={settings.currency}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full"
        />

      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Save Settings
      </button>

    </div>

  );
}
