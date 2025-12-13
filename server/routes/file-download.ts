import { Router, Request, Response } from "express";

const router = Router();

router.post("/download", async (req: Request, res: Response) => {
  try {
    const { storagePath } = req.body;

    if (!storagePath) {
      return res.status(400).json({ error: "Storage path is required" });
    }

    console.log("Download request - storagePath:", storagePath);

    const firebaseStorageBucket = "keysystem-d0b86-8df89.firebasestorage.app";
    const encodedPath = encodeURIComponent(storagePath);
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseStorageBucket}/o/${encodedPath}?alt=media`;

    console.log("Generated download URL:", downloadUrl);

    res.json({ url: downloadUrl });
  } catch (error) {
    console.error("File download error:", error);
    const errorMsg = error instanceof Error ? error.message : "Unknown error";

    res.status(500).json({ error: `Download failed: ${errorMsg}` });
  }
});

export { router as fileDownloadRouter };
