import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Loader2,
  Newspaper,
} from "lucide-react";

const API_URL = "https://shoova-initiation-nf6m.onrender.com";

const categories = [
  "All",
  "News",
  "Field Notes",
  "People",
  "Insights",
  "Impact",
];

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getExcerpt = (text, length = 150) => {
  if (!text) return "";

  if (text.length <= length) return text;

  return `${text.substring(0, length).trim()}...`;
};

export default function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/stories`);

        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch stories");
        }

        setStories(data.stories || []);
      } catch (err) {
        console.error("Stories fetch error:", err);
        setError("We couldn't load the stories right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const filteredStories = useMemo(() => {
    if (activeCategory === "All") {
      return stories;
    }

    return stories.filter(
      (story) => story.category === activeCategory
    );
  }, [stories, activeCategory]);

  const featuredStory =
    stories.find((story) => story.featured) || stories[0];

  const latestStories = filteredStories.filter(
    (story) => story._id !== featuredStory?._id
  );

  return (
    <main className="min-h-screen bg-[#FDF6F0] text-[#0D1B2A]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0D1B2A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#ECD9B0]" />
          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full border border-[#ECD9B0]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3 text-[#ECD9B0]">
              <Newspaper size={18} strokeWidth={1.5} />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                Shoova Stories
              </span>
            </div>

            <h1 className="font-serif text-5xl leading-[1.05] text-white md:text-6xl lg:text-7xl">
              Stories from the
              <span className="block text-[#ECD9B0]">
                restoration movement.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              Discover the people, places, ideas, and moments shaping
              Shoova's work to restore land, livelihoods, and communities.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="border-b border-[#0D1B2A]/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-6 py-5 md:px-10 lg:px-16">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-[#0D1B2A] text-[#ECD9B0]"
                  : "bg-[#FDF6F0] text-[#0D1B2A]/70 hover:bg-[#ECD9B0]/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex items-center gap-3 text-[#0D1B2A]/60">
              <Loader2 className="animate-spin" size={22} />
              <span>Loading stories...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="max-w-md text-center">
              <p className="text-lg font-medium">{error}</p>
              <p className="mt-2 text-sm text-[#0D1B2A]/60">
                Please refresh the page and try again.
              </p>
            </div>
          </div>
        ) : stories.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <Newspaper
                size={40}
                strokeWidth={1}
                className="mx-auto mb-5 text-[#0D1B2A]/30"
              />

              <h2 className="font-serif text-3xl">
                No stories yet.
              </h2>

              <p className="mt-3 text-[#0D1B2A]/60">
                Check back soon for updates from Shoova.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* FEATURED STORY */}
            {activeCategory === "All" && featuredStory && (
              <div className="mb-20">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7C1C2E]">
                      Featured
                    </p>

                    <h2 className="mt-2 font-serif text-3xl md:text-4xl">
                      From the field
                    </h2>
                  </div>
                </div>

                <Link
                  to={`/stories/${featuredStory.slug}`}
                  className="group grid overflow-hidden rounded-2xl bg-[#0D1B2A] md:grid-cols-2"
                >
                  <div className="relative min-h-[320px] overflow-hidden md:min-h-[480px]">
                    {featuredStory.coverImage ? (
                      <img
                        src={featuredStory.coverImage}
                        alt={featuredStory.title}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#17283b]">
                        <Newspaper
                          size={60}
                          strokeWidth={1}
                          className="text-[#ECD9B0]/30"
                        />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute left-6 top-6 rounded-full bg-[#ECD9B0] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0D1B2A]">
                      {featuredStory.category}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                    <div className="mb-5 flex items-center gap-2 text-xs text-white/50">
                      <CalendarDays size={14} />
                      {formatDate(
                        featuredStory.publishedAt ||
                          featuredStory.createdAt
                      )}
                    </div>

                    <h3 className="font-serif text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
                      {featuredStory.title}
                    </h3>

                    <p className="mt-6 leading-7 text-white/65">
                      {getExcerpt(featuredStory.excerpt, 220)}
                    </p>

                    <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#ECD9B0]">
                      Read the story
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* LATEST STORIES */}
            <div>
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7C1C2E]">
                    Journal
                  </p>

                  <h2 className="mt-2 font-serif text-3xl md:text-4xl">
                    Latest stories
                  </h2>
                </div>

                {activeCategory !== "All" && (
                  <span className="hidden text-sm text-[#0D1B2A]/50 sm:block">
                    {filteredStories.length}{" "}
                    {filteredStories.length === 1
                      ? "story"
                      : "stories"}
                  </span>
                )}
              </div>

              {latestStories.length === 0 ? (
                <div className="rounded-2xl border border-[#0D1B2A]/10 bg-white p-12 text-center">
                  <p className="text-[#0D1B2A]/60">
                    No stories found in this category.
                  </p>
                </div>
              ) : (
                <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                  {latestStories.map((story) => (
                    <article key={story._id} className="group">
                      <Link to={`/stories/${story.slug}`}>
                        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl bg-[#E9DED5]">
                          {story.coverImage ? (
                            <img
                              src={story.coverImage}
                              alt={story.title}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Newspaper
                                size={42}
                                strokeWidth={1}
                                className="text-[#0D1B2A]/20"
                              />
                            </div>
                          )}

                          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0D1B2A]">
                            {story.category}
                          </div>
                        </div>

                        <div className="mb-3 flex items-center gap-2 text-xs text-[#0D1B2A]/45">
                          <CalendarDays size={13} />
                          {formatDate(
                            story.publishedAt || story.createdAt
                          )}
                        </div>

                        <h3 className="font-serif text-2xl leading-tight transition-colors group-hover:text-[#7C1C2E]">
                          {story.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-[#0D1B2A]/60">
                          {getExcerpt(story.excerpt)}
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#7C1C2E]">
                          Read story
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#0D1B2A]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center md:px-10 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ECD9B0]">
            Be part of the movement
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-white md:text-5xl">
            Restoration begins when we choose to act.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/60">
            Follow Shoova's work and help us restore land, build
            opportunity, and create lasting impact.
          </p>

          <Link
            to="/donate"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ECD9B0] px-7 py-3.5 text-sm font-semibold text-[#0D1B2A] transition hover:bg-white"
          >
            Support the work
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}