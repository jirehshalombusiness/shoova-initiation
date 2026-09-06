import Story from "../models/Story.js";


export const createStory = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      author,
      featured,
      status,
    } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, excerpt, and content are required",
      });
    }

    const storySlug =
      slug ||
      title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

    const existingStory = await Story.findOne({
      slug: storySlug,
    });

    if (existingStory) {
      return res.status(409).json({
        success: false,
        message: "A story with this slug already exists",
      });
    }

    
    if (featured) {
      await Story.updateMany(
        { featured: true },
        { $set: { featured: false } }
      );
    }

    const story = await Story.create({
      title,
      slug: storySlug,
      excerpt,
      content,
      coverImage: coverImage || "",
      category: category || "News",
      author: author || "Shoova Initiative",
      featured: featured || false,
      status: status || "draft",
      publishedAt:
        status === "published" ? new Date() : null,
    });

    res.status(201).json({
      success: true,
      message: "Story created successfully",
      story,
    });
  } catch (error) {
    console.error("Create story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create story",
    });
  }
};



export const getPublishedStories = async (req, res) => {
  try {
    const stories = await Story.find({
      status: "published",
    })
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    res.json({
      success: true,
      stories,
    });
  } catch (error) {
    console.error("Get published stories error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stories",
    });
  }
};



export const getPublishedStoryBySlug = async (req, res) => {
  try {
    const story = await Story.findOne({
      slug: req.params.slug,
      status: "published",
    }).lean();

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.json({
      success: true,
      story,
    });
  } catch (error) {
    console.error("Get story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch story",
    });
  }
};



export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      stories,
    });
  } catch (error) {
    console.error("Get all stories error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stories",
    });
  }
};



export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.json({
      success: true,
      story,
    });
  } catch (error) {
    console.error("Get story by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch story",
    });
  }
};



export const updateStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      author,
      featured,
      status,
    } = req.body;

    if (featured) {
      await Story.updateMany(
        {
          _id: { $ne: story._id },
          featured: true,
        },
        {
          $set: { featured: false },
        }
      );
    }

    story.title = title ?? story.title;
    story.slug = slug ?? story.slug;
    story.excerpt = excerpt ?? story.excerpt;
    story.content = content ?? story.content;
    story.coverImage = coverImage ?? story.coverImage;
    story.category = category ?? story.category;
    story.author = author ?? story.author;
    story.featured = featured ?? story.featured;

    if (status) {
      story.status = status;

      if (status === "published" && !story.publishedAt) {
        story.publishedAt = new Date();
      }

      if (status === "draft") {
        story.publishedAt = null;
      }
    }

    await story.save();

    res.json({
      success: true,
      message: "Story updated successfully",
      story,
    });
  } catch (error) {
    console.error("Update story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update story",
    });
  }
};



export const deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    await story.deleteOne();

    res.json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.error("Delete story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete story",
    });
  }
};



export const publishStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    story.status = "published";

    if (!story.publishedAt) {
      story.publishedAt = new Date();
    }

    await story.save();

    res.json({
      success: true,
      message: "Story published successfully",
      story,
    });
  } catch (error) {
    console.error("Publish story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to publish story",
    });
  }
};


 
export const unpublishStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    story.status = "draft";
    story.publishedAt = null;

    await story.save();

    res.json({
      success: true,
      message: "Story unpublished successfully",
      story,
    });
  } catch (error) {
    console.error("Unpublish story error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to unpublish story",
    });
  }
};