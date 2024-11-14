"use client";

import React, { FormEvent, useState } from "react";
import { Navbar } from "@/components/navbar";

export default function Feature() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userEmail: "",
    priority: "low",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:nicosejohnsoriano@gmail.com?subject=Feature Request: ${formData.title}&body=Description: ${formData.description}%0D%0APriority: ${formData.priority}%0D%0A%0D%0ARequester's Email: ${formData.userEmail}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 py-14">
        <h1 className="font-raceSport text-2xl font-bold mb-6">Request a Feature</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="font-montserrat block mb-2">
              Feature Title
            </label>
            <input
              type="text"
              id="title"
              required
              className="font-montserrat w-full p-2 border rounded"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="description" className="font-montserrat block mb-2">
              Feature Description
            </label>
            <textarea
              id="description"
              required
              className="font-montserrat w-full p-2 border rounded h-32"
              placeholder="Describe the feature you'd like to see..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="priority" className="font-montserrat block mb-2">
              Priority Level
            </label>
            <select
              id="priority"
              className="font-montserrat w-full p-2 border rounded"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="font-montserrat block mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="font-montserrat w-full p-2 border rounded"
              value={formData.userEmail}
              onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="font-montserrat bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            Submit Feature Request
          </button>
        </form>
      </div>
    </>
  );
}
