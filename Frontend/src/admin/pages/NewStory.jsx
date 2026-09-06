import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ImagePlus,
    Save,
    Send,
    Star,
    FileText,
} from "lucide-react";
import { toast } from "react-hot-toast";

const API_URL = "https://shoova-initiation-nf6m.onrender.com";

const categories = [
    "News",
    "Field Notes",
    "People",
    "Insights",
    "Impact",
];

const slugify = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

export default function NewStory() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [slugEdited, setSlugEdited] = useState(false);
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("News");
    const [author, setAuthor] = useState("Shoova Initiative");
    const [featured, setFeatured] = useState(false);

    const [coverImage, setCoverImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);

    const generatedSlug = useMemo(() => {
        return slugify(title);
    }, [title]);

    const handleTitleChange = (e) => {
        const value = e.target.value;

        setTitle(value);

        if (!slugEdited) {
            setSlug(slugify(value));
        }
    };

    const handleSlugChange = (e) => {
        setSlugEdited(true);
        setSlug(slugify(e.target.value));
    };

    const handleResetSlug = () => {
        setSlugEdited(false);
        setSlug(generatedSlug);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // 5MB limit
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be less than 5MB");
            e.target.value = null;
            return;
        }

        // Show local preview immediately
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "newsletter_upload");

        try {
            toast.loading("Uploading cover image...", {
                id: "story-upload",
            });

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/stanarthur/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (!res.ok || !data.secure_url) {
                throw new Error(data.error?.message || "Image upload failed");
            }

            // IMPORTANT:
            // Store the Cloudinary URL, not the File object
            setCoverImage(data.secure_url);

            toast.success("Cover image uploaded successfully ✅", {
                id: "story-upload",
            });
        } catch (error) {
            console.error("Cloudinary upload error:", error);

            setCoverImage("");
            setImagePreview("");

            toast.error("Cover image upload failed", {
                id: "story-upload",
            });
        } finally {
            e.target.value = null;
        }
    };

    const validateStory = () => {
        if (!title.trim()) {
            toast.error("Please enter a story title.");
            return false;
        }

        if (!excerpt.trim()) {
            toast.error("Please enter an excerpt.");
            return false;
        }

        if (!content.trim()) {
            toast.error("Please write the story content.");
            return false;
        }

        return true;
    };

    const createStory = async (status) => {
        if (!validateStory()) return;

        const token = localStorage.getItem("adminToken");

        if (!token) {
            toast.error("Your admin session has expired. Please log in again.");
            navigate("/admin/login");
            return;
        }

        if (status === "draft") {
            setSaving(true);
        } else {
            setPublishing(true);
        }

        try {
            const storyData = {
                title: title.trim(),
                slug: slug.trim() || slugify(title),
                excerpt: excerpt.trim(),
                content: content.trim(),
                coverImage,
                category,
                author: author.trim() || "Shoova Initiative",
                featured,
                status,
            };


            const res = await fetch(`${API_URL}/stories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(storyData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to create story");
            }

            if (status === "draft") {
                toast.success("Story saved as draft.");
            } else {
                toast.success("Story published successfully.");
            }

            navigate("/admin/stories");

        } catch (error) {
            console.error("Create story error:", error);
            toast.error(error.message || "Something went wrong.");
        } finally {
            setSaving(false);
            setPublishing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            <div>
                <Link
                    to="/admin/stories"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition mb-4"
                >
                    <ArrowLeft size={17} />
                    Back to Stories
                </Link>

                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0f172a] text-white flex items-center justify-center">
                        <FileText size={24} />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Create New Story
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Create and publish a new Shoova story.
                        </p>
                    </div>
                </div>
            </div>


            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Story Information
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Add the basic information for your story.
                    </p>
                </div>

                <div className="space-y-6">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Enter your story title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition"
                        />
                    </div>


                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Slug
                            </label>

                            {slugEdited && (
                                <button
                                    type="button"
                                    onClick={handleResetSlug}
                                    className="text-xs text-gray-500 hover:text-gray-900"
                                >
                                    Reset to title
                                </button>
                            )}
                        </div>

                        <div className="flex items-center">
                            <span className="bg-gray-100 border border-r-0 border-gray-300 px-4 py-3 rounded-l-xl text-sm text-gray-500">
                                /stories/
                            </span>

                            <input
                                type="text"
                                value={slug}
                                onChange={handleSlugChange}
                                placeholder="story-slug"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition"
                            />
                        </div>

                        <p className="text-xs text-gray-400 mt-2">
                            This becomes the public URL for your story.
                        </p>
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Excerpt
                        </label>

                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={4}
                            placeholder="Write a short summary of the story..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition"
                        />

                        <p className="text-xs text-gray-400 mt-2">
                            A short description used on story cards and previews.
                        </p>
                    </div>


                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition"
                            >
                                {categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Author
                            </label>

                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Author name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition"
                            />
                        </div>

                    </div>

                </div>
            </section>


            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Cover Image
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Choose the main image that represents this story.
                    </p>
                </div>

                {!imagePreview ? (
                    <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-gray-500 hover:bg-gray-50 transition">

                            <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <ImagePlus size={26} className="text-gray-500" />
                            </div>

                            <p className="font-semibold text-gray-800">
                                Upload image
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                PNG, JPG, JPEG or WEBP
                            </p>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </div>
                    </label>
                ) : (
                    <div className="relative rounded-2xl overflow-hidden bg-gray-100">

                        <img
                            src={imagePreview}
                            alt="Story cover preview"
                            className="w-full max-h-[500px] object-cover"
                        />

                        <label className="absolute bottom-4 right-4 cursor-pointer">

                            <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur px-4 py-2.5 rounded-lg shadow-lg text-sm font-semibold text-gray-800 hover:bg-white transition">
                                <ImagePlus size={17} />
                                Change Image
                            </span>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </label>

                    </div>
                )}

            </section>
            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Article Content
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Write the full story that visitors will read.
                    </p>
                </div>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={20}
                    placeholder="Start writing your story..."
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl outline-none resize-y focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition leading-7 text-gray-800"
                />

                <p className="text-xs text-gray-400 mt-2">
                    Rich-text formatting will be added next.
                </p>

            </section>


            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Publishing
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Decide how this story should appear on the website.
                    </p>
                </div>

                <label className="flex items-start gap-4 cursor-pointer">

                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="mt-1 w-5 h-5"
                    />

                    <div>
                        <div className="flex items-center gap-2 font-semibold text-gray-800">
                            <Star size={17} />
                            Feature this story
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                            Make this story the featured story on the public Stories page.
                        </p>
                    </div>

                </label>

            </section>


            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row justify-between gap-4">

                <button
                    type="button"
                    onClick={() => navigate("/admin/stories")}
                    disabled={saving || publishing}
                    className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                >
                    Cancel
                </button>

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        type="button"
                        onClick={() => createStory("draft")}
                        disabled={saving || publishing}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                    >
                        <Save size={18} />

                        {saving ? "Saving..." : "Save Draft"}
                    </button>

                    <button
                        type="button"
                        onClick={() => createStory("published")}
                        disabled={saving || publishing}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-semibold hover:bg-[#1e293b] transition disabled:opacity-50"
                    >
                        <Send size={18} />

                        {publishing ? "Publishing..." : "Publish Story"}
                    </button>

                </div>

            </div>

        </div>
    );
}