import React, { useState } from 'react';

export default function PaymentLicenseCMS() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, src: '/images/Google.png', alt: 'GPay', width: 60, height: 40 },
    { id: 2, src: '/images/Paytm.png', alt: 'PayTM', width: 80, height: 40 },
    { id: 4, src: '/images/upi.png', alt: 'UPI', width: 50, height: 30 },
  ]);

  const [contentList, setContentList] = useState([
    "We platform advocates fairness, justice, and openness. We mainly operate fair lottery, blockchain games, live casinos, and slot machine games.",
    "We work with more than 10,000 online live game dealers and slot games, all of which are fair and verified games.",
  ]);

  const [newMethod, setNewMethod] = useState({ file: null, src: '', alt: '', width: 60, height: 40 });
  const [newContent, setNewContent] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setNewMethod({ ...newMethod, file, src: previewURL });
  };

  const addPaymentMethod = () => {
    if (!newMethod.src || !newMethod.alt) {
      alert("Please select an image and add alt text.");
      return;
    }
    setPaymentMethods([...paymentMethods, { ...newMethod, id: Date.now() }]);
    setNewMethod({ file: null, src: '', alt: '', width: 60, height: 40 });
  };

  const deletePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== id));
  };

  const addContent = () => {
    if (!newContent) return;
    setContentList([...contentList, newContent]);
    setNewContent('');
  };

  const deleteContent = (index) => {
    setContentList(contentList.filter((_, i) => i !== index));
  };

  return (
    <section className="py-12 px-4 bg-[#0b0e15] min-h-screen">
      <div className="max-w-7xl mx-auto bg-[#111827] rounded-xl border border-gray-700 p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">

        {/* Payment Method Block */}
        <div>
          <h3 className="text-white text-lg md:text-xl font-semibold mb-4">Payment Method</h3>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6">
            {paymentMethods.map(method => (
              <div key={method.id} className="relative inline-block">
                <img
                  src={method.src}
                  alt={method.alt}
                  width={method.width}
                  height={method.height}
                  className="max-w-full h-auto"
                />
                <button
                  onClick={() => deletePaymentMethod(method.id)}
                  className="absolute top-0 right-0 text-xs bg-red-600 text-white px-1 rounded"
                  aria-label={`Delete ${method.alt}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Add New Payment Method Form */}
          <div className="space-y-2 text-slate-300">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-gray-800 px-2 py-1 rounded w-full text-white"
            />
            {newMethod.src && (
              <img
                src={newMethod.src}
                alt="preview"
                className="my-2 rounded border border-gray-600 max-w-full h-auto"
              />
            )}
            <input
              className="bg-gray-800 px-2 py-1 rounded w-full"
              type="text"
              placeholder="Alt text"
              value={newMethod.alt}
              onChange={e => setNewMethod({ ...newMethod, alt: e.target.value })}
            />
            <div className="flex gap-2">
              <input
                className="bg-gray-800 px-2 py-1 rounded w-1/2"
                type="number"
                placeholder="Width"
                value={newMethod.width}
                onChange={e => setNewMethod({ ...newMethod, width: +e.target.value })}
              />
              <input
                className="bg-gray-800 px-2 py-1 rounded w-1/2"
                type="number"
                placeholder="Height"
                value={newMethod.height}
                onChange={e => setNewMethod({ ...newMethod, height: +e.target.value })}
              />
            </div>
            <button
              onClick={addPaymentMethod}
              className="mt-2 bg-green-600 px-4 py-1 rounded text-white w-full md:w-auto"
            >
              Add Payment Method
            </button>
          </div>
        </div>

        {/* Content Block */}
        <div className="text-slate-300 space-y-4 md:space-y-6 text-sm md:text-base">
          {contentList.map((text, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-green-400 mt-1">♦</span>
              <span className="flex-1">{text}</span>
              <button
                onClick={() => deleteContent(index)}
                className="ml-2 text-xs bg-red-600 text-white px-1 rounded"
                aria-label="Delete content"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add new content */}
          <div className="pt-2 md:pt-4">
            <textarea
              rows={2}
              className="bg-gray-800 text-white w-full p-2 rounded"
              placeholder="Add new point"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
            />
            <button
              onClick={addContent}
              className="mt-2 bg-green-600 px-4 py-1 rounded text-white w-full md:w-auto"
            >
              Add Content
            </button>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm pt-4">
            Gambling can be addictive, please play rationally. We only accept customers above the age of 18.
          </p>
        </div>
      </div>
    </section>
  );
}
