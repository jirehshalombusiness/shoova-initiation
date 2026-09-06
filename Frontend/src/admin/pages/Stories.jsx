import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  FileText
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const API_URL = "https://shoova-initiation-nf6m.onrender.com";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchStories = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/stories/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch stories");
      }

      setStories(data.stories || []);
    } catch (error) {
      console.error("Fetch stories error:", error);
      toast.error(error.message || "Failed to load stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handlePublish = async (id) => {
    try {
      const res = await fetch(`${API_URL}/stories/${id}/publish`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to publish story");
      }

      toast.success("Story published");
      fetchStories();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to publish story");
    }
  };

  const handleUnpublish = async (id) => {
    try {
      const res = await fetch(`${API_URL}/stories/${id}/unpublish`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to unpublish story");
      }

      toast.success("Story moved to draft");
      fetchStories();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to unpublish story");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this story?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/stories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete story");
      }

      toast.success("Story deleted");
      fetchStories();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete story");
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const publishedCount = stories.filter(
    (story) => story.status === "published"
  ).length;

  const draftCount = stories.filter(
    (story) => story.status === "draft"
  ).length;

  if (loading) {
    return (
      <div className="p-10 text-gray-600">
        Loading stories...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Stories
          </h1>

          <p className="text-gray-500 mt-1">
            Create, manage and publish Shoova stories.
          </p>
        </div>

        <Link
          to="/admin/stories/new"
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          <Plus size={20} />
          New Story
        </Link>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gray-100">
              <FileText size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Stories
              </p>

              <p className="text-2xl font-bold text-gray-800">
                {stories.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-100">
              <Eye size={22} className="text-green-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Published
              </p>

              <p className="text-2xl font-bold text-gray-800">
                {publishedCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-100">
              <FileText size={22} className="text-yellow-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Drafts
              </p>

              <p className="text-2xl font-bold text-gray-800">
                {draftCount}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* STORIES TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        {stories.length === 0 ? (

          <div className="py-20 text-center">

            <FileText
              size={48}
              className="mx-auto text-gray-300 mb-4"
            />

            <h2 className="text-xl font-semibold text-gray-700">
              No stories yet
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Create your first Shoova story.
            </p>

            <Link
              to="/admin/stories/new"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg font-semibold"
            >
              <Plus size={18} />
              Create Story
            </Link>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Story
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Category
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody className="divide-y">

                {stories.map((story) => (

                  <tr
                    key={story._id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* STORY */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        {story.coverImage ? (
                          <img
                            src={story.coverImage}
                            alt={story.title}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                            <FileText
                              size={20}
                              className="text-gray-400"
                            />
                          </div>
                        )}

                        <div className="min-w-0">

                          <p className="font-semibold text-gray-800 truncate max-w-[300px]">
                            {story.title}
                          </p>

                          <p className="text-sm text-gray-500 truncate max-w-[300px]">
                            {story.excerpt}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* CATEGORY */}
                    <td className="px-6 py-5">

                      <span className="text-sm text-gray-600">
                        {story.category}
                      </span>

                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">

                      {story.status === "published" ? (

                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Published
                        </span>

                      ) : (

                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          Draft
                        </span>

                      )}

                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {formatDate(
                        story.publishedAt || story.createdAt
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5">

                      <div className="flex justify-end items-center gap-2">

                        <Link
                          to={`/admin/stories/${story._id}/edit`}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>

                        {story.status === "published" ? (

                          <button
                            onClick={() =>
                              handleUnpublish(story._id)
                            }
                            className="p-2 rounded-lg hover:bg-yellow-50 text-yellow-600"
                            title="Unpublish"
                          >
                            <EyeOff size={18} />
                          </button>

                        ) : (

                          <button
                            onClick={() =>
                              handlePublish(story._id)
                            }
                            className="p-2 rounded-lg hover:bg-green-50 text-green-600"
                            title="Publish"
                          >
                            <Eye size={18} />
                          </button>

                        )}

                        <button
                          onClick={() =>
                            handleDelete(story._id)
                          }
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}