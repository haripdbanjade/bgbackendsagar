import React, { useState } from "react";

export default function PaymentLicenseCMS() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, src: "/images/Google.png", alt: "GPay", width: 60, height: 40 },
    { id: 2, src: "/images/Paytm.png", alt: "PayTM", width: 80, height: 40 },
    { id: 3, src: "/images/upi.png", alt: "UPI", width: 50, height: 30 },
  ]);

  const [contentList, setContentList] = useState([
    "We platform advocates fairness, justice, and openness. We mainly operate fair lottery, blockchain games, live casinos, and slot machine games.",
    "We work with more than 10,000 online live game dealers and slot games, all of which are fair and verified games.",
  ]);

  const [newMethod, setNewMethod] = useState({
    file: null,
    src: "",
    alt: "",
    width: 60,
    height: 40,
  });

  const [newContent, setNewContent] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setNewMethod({ ...newMethod, file, src: previewURL });
  };

  const addPaymentMethod = () => {
    if (!newMethod.src || !newMethod.alt.trim()) {
      alert("Please select an image and add alt text.");
      return;
    }
    setPaymentMethods([...paymentMethods, { ...newMethod, id: Date.now() }]);
    setNewMethod({ file: null, src: "", alt: "", width: 60, height: 40 });
  };

  const deletePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter((m) => m.id !== id));
  };

  const addContent = () => {
    if (!newContent.trim()) return;
    setContentList([...contentList, newContent]);
    setNewContent("");
  };

  const deleteContent = (index) => {
    setContentList(contentList.filter((_, i) => i !== index));
  };

  return (
    <section className="min-h-screen bg-white text-white py-12 px-6 md:pl-60 flex justify-center">
      <div className="w-full max-w-6xl bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-700 p-8 sm:p-12 space-y-10">

        {/* ===== Payment Methods ===== */}
        <div className="space-y-4">
          <h2 className="text-white text-2xl font-bold text-center md:text-left">
            Payment Methods
          </h2>

          {/* Existing Methods */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="relative group">
                <img
                  src={method.src}
                  alt={method.alt}
                  width={method.width}
                  height={method.height}
                  className="max-w-full h-auto rounded border border-gray-600"
                />
                <button
                  onClick={() => deletePaymentMethod(method.id)}
                  className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  aria-label={`Delete ${method.alt}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Add New Payment Method */}
          <div className="space-y-3 text-slate-300">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-gray-800 px-3 py-2 rounded w-full text-white text-sm sm:text-base"
            />
            {newMethod.src && (
              <img
                src={newMethod.src}
                alt="Preview"
                className="w-32 sm:w-40 h-auto rounded border border-gray-600 mx-auto md:mx-0"
              />
            )}
            <input
              type="text"
              placeholder="Alt text"
              value={newMethod.alt}
              onChange={(e) => setNewMethod({ ...newMethod, alt: e.target.value })}
              className="bg-gray-800 px-3 py-2 rounded w-full text-white text-sm sm:text-base"
            />
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="number"
                placeholder="Width"
                value={newMethod.width}
                onChange={(e) => setNewMethod({ ...newMethod, width: +e.target.value })}
                className="bg-gray-800 px-3 py-2 rounded w-full sm:w-1/2 text-white text-sm sm:text-base"
              />
              <input
                type="number"
                placeholder="Height"
                value={newMethod.height}
                onChange={(e) => setNewMethod({ ...newMethod, height: +e.target.value })}
                className="bg-gray-800 px-3 py-2 rounded w-full sm:w-1/2 text-white text-sm sm:text-base"
              />
            </div>
            <button
              onClick={addPaymentMethod}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-semibold transition w-full sm:w-auto"
            >
              Add Payment Method
            </button>
          </div>
        </div>

        {/* ===== License & Content ===== */}
        <div className="space-y-4 text-slate-300">
          <h2 className="text-white text-2xl font-bold text-center md:text-left">
            License & Content
          </h2>

          {contentList.map((text, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-green-400 mt-1">♦</span>
              <span className="flex-1">{text}</span>
              <button
                onClick={() => deleteContent(index)}
                className="ml-2 text-xs bg-red-600 hover:bg-red-700 text-white px-1.5 rounded"
                aria-label="Delete content"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add New Content */}
          <div className="pt-2">
            <textarea
              rows={2}
              placeholder="Add new point"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="bg-gray-800 text-white w-full p-2 rounded text-sm sm:text-base"
            />
            <button
              onClick={addContent}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-semibold transition w-full sm:w-auto"
            >
              Add Content
            </button>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm pt-4 leading-relaxed text-center md:text-left">
            Gambling can be addictive. Please play rationally. We only accept
            customers above the age of 18.
          </p>
        </div>
      </div>
    </section>
  );
}
