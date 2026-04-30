import Media from '../models/Media.js';

export async function getMedia(req, res) {
  try {
    const media = await Media.find().sort({ uploadedAt: -1 });
    res.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
}

export async function getMediaByCategory(req, res) {
  try {
    const { category } = req.params;
    const media = await Media.find({ category }).sort({ uploadedAt: -1 });
    res.json(media);
  } catch (error) {
    console.error('Error fetching media by category:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
}

export async function createMedia(req, res) {
  try {
    const { title, description, category, fileUrl, fileType } = req.body;
    const media = new Media({ title, description, category, fileUrl, fileType });
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    console.error('Error creating media:', error);
    res.status(500).json({ error: 'Failed to create media' });
  }
}

export async function updateMedia(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const media = await Media.findByIdAndUpdate(id, updates, { new: true });
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.json(media);
  } catch (error) {
    console.error('Error updating media:', error);
    res.status(500).json({ error: 'Failed to update media' });
  }
}

export async function deleteMedia(req, res) {
  try {
    const { id } = req.params;
    const media = await Media.findByIdAndDelete(id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
}