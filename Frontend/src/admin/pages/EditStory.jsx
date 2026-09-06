import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ImagePlus,
  Save,
  Send,
  Star,
  FileText,
  Loader2,
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

export default function EditStory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

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

  const [status, setStatus] = useState("draft");

  // =========================
  // LOAD STORY
  // =========================

  useEffect(() => {
    const loadStory = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("adminToken");

        if (!token) {
          toast.error("Your admin session has expired.");
          navigate("/admin/login");
          return;
        }

        const res = await fetch(`${API_URL}/stories/admin/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load story");
        }

        const story = data.story;

        setTitle(story.title || "");
        setSlug(story.slug || "");
        setExcerpt(story.excerpt || "");
        setContent(story.content || "");
        setCategory(story.category || "News");
        setAuthor(story.author || "Shoova Initiative");
        setFeatured(story.featured || false);

        setCoverImage(story.coverImage || "");
        setImagePreview(story.coverImage || "");

        setStatus(story.status || "draft");

      } catch (error) {
        console.error("Load story error:", error);

        toast.error(
          error.message || "Failed to load story"
        );

        navigate("/admin/stories");

      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [id, navigate]);

  // =========================
  // IMAGE UPLOAD
  // =========================

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      e.target.value = null;
      return;
    }

    // Local preview
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
        throw new Error(
          data.error?.message || "Image upload failed"
        );
      }

      setCoverImage(data.secure_url);
      setImagePreview(data.secure_url);

      toast.success(
        "Cover image uploaded successfully ✅",
        {
          id: "story-upload",
        }
      );

    } catch (error) {
      console.error(
        "Cloudinary upload error:",
        error
      );

      toast.error(
        "Cover image upload failed",
        {
          id: "story-upload",
        }
      );

    } finally {
      e.target.value = null;
    }
  };

  // =========================
  // SAVE CHANGES
  // =========================

  const updateStory = async (newStatus = status) => {
    if (!title.trim()) {
      toast.error("Please enter a story title.");
      return;
    }

    if (!excerpt.trim()) {
      toast.error("Please enter an excerpt.");
      return;
    }

    if (!content.trim()) {
      toast.error("Please write the story content.");
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      toast.error("Your admin session has expired.");
      navigate("/admin/login");
      return;
    }

    if (newStatus === "published") {
      setPublishing(true);
    } else {
      setSaving(true);
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
        status: newStatus,
      };

      const res = await fetch(
        `${API_URL}/stories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(storyData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update story"
        );
      }

      setStatus(newStatus);

      if (newStatus === "published") {
        toast.success(
          "Story updated and published successfully."
        );
      } else {
        toast.success(
          "Story changes saved successfully."
        );
      }

      navigate("/admin/stories");

    } catch (error) {
      console.error(
        "Update story error:",
        error
      );

      toast.error(
        error.message ||
          "Something went wrong while saving."
      );

    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2
            size={22}
            className="animate-spin"
          />
          Loading story...
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}

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
              Edit Story
            </h1>

            <p className="text-gray-500 mt-1">
              Update and manage this Shoova story.
            </p>
          </div>

        </div>
      </div>


      {/* STORY INFORMATION */}

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Story Information
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Update the basic information for your story.
          </p>
        </div>

        <div className="space-y-6">

          {/* TITLE */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);

                if (!slugEdited) {
                  setSlug(slugify(value));
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition"
            />
          </div>


          {/* SLUG */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <label className="block text-sm font-semibold text-gray-700">
                Slug
              </label>

              {slugEdited && (
                <button
                  type="button"
                  onClick={() => {
                    setSlugEdited(false);
                    setSlug(slugify(title));
                  }}
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
                onChange={(e) => {
                  setSlugEdited(true);
                  setSlug(slugify(e.target.value));
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition"
              />

            </div>

            <p className="text-xs text-gray-400 mt-2">
              This becomes the public URL for your story.
            </p>

          </div>


          {/* EXCERPT */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt
            </label>

            <textarea
              value={excerpt}
              onChange={(e) =>
                setExcerpt(e.target.value)
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition"
            />

          </div>


          {/* CATEGORY + AUTHOR */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
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
                onChange={(e) =>
                  setAuthor(e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition"
              />

            </div>

          </div>

        </div>

      </section>


      {/* COVER IMAGE */}

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
                <ImagePlus
                  size={26}
                  className="text-gray-500"
                />
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


      {/* ARTICLE CONTENT */}

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

        <div className="mb-6">

          <h2 className="text-xl font-semibold text-gray-900">
            Article Content
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Edit the full story that visitors will read.
          </p>

        </div>

        <textarea
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          rows={20}
          className="w-full px-5 py-4 border border-gray-300 rounded-xl outline-none resize-y focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition leading-7 text-gray-800"
        />

      </section>


      {/* PUBLISHING */}

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
            onChange={(e) =>
              setFeatured(e.target.checked)
            }
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

        <div className="mt-6 text-sm text-gray-500">
          Current status:{" "}
          <span className="font-semibold text-gray-800">
            {status}
          </span>
        </div>

      </section>


      {/* ACTIONS */}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row justify-between gap-4">

        <button
          type="button"
          onClick={() =>
            navigate("/admin/stories")
          }
          disabled={saving || publishing}
          className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
        >
          Cancel
        </button>


        <div className="flex flex-col sm:flex-row gap-3">

          <button
            type="button"
            onClick={() => updateStory("draft")}
            disabled={saving || publishing}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>


          <button
            type="button"
            onClick={() =>
              updateStory("published")
            }
            disabled={saving || publishing}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-semibold hover:bg-[#1e293b] transition disabled:opacity-50"
          >
            <Send size={18} />

            {publishing
              ? "Publishing..."
              : status === "published"
                ? "Save & Publish"
                : "Publish Story"}
          </button>

        </div>

      </div>

    </div>
  );
}